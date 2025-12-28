import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserIdFromRequest, getPagination } from '@/lib/api-utils';

// GET - Получение постов
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const { limit, skip } = getPagination(searchParams);
    
    const type = searchParams.get('type');
    const authorId = searchParams.get('authorId');
    const tag = searchParams.get('tag');
    
    // Фильтры
    const where: { 
      status: string; 
      type?: string; 
      authorId?: string; 
      tags?: { contains: string } 
    } = { status: 'active' };
    if (type) where.type = type;
    if (authorId) where.authorId = authorId;
    if (tag) where.tags = { contains: tag };
    
    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              avatar: true,
              role: true,
              verified: true,
              isPioneer: true,
            },
          },
          _count: {
            select: {
              comments: true,
              likes: true,
            },
          },
        },
        orderBy: [
          { isPinned: 'desc' },
          { createdAt: 'desc' },
        ],
        skip,
        take: limit,
      }),
      prisma.post.count({ where }),
    ]);
    
    // Проверяем лайки текущего пользователя
    const userId = getUserIdFromRequest(request);
    let userLikes: string[] = [];
    
    if (userId) {
      const likes = await prisma.like.findMany({
        where: {
          userId,
          postId: { in: posts.map(p => p.id) },
        },
        select: { postId: true },
      });
      userLikes = likes.map(l => l.postId);
    }
    
    const formattedPosts = posts.map(post => ({
      ...post,
      tags: post.tags ? JSON.parse(post.tags) : [],
      images: post.images ? JSON.parse(post.images) : [],
      isLiked: userLikes.includes(post.id),
      likesCount: post._count.likes,
      commentsCount: post._count.comments,
    }));
    
    return NextResponse.json({
      success: true,
      posts: formattedPosts,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page: Math.floor(skip / limit) + 1,
        limit,
      },
    });
  } catch (error) {
    console.error('Get posts error:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}

// POST - Создание поста
export async function POST(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Требуется авторизация' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const { content, type = 'text', category, tags, images } = body;
    
    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Контент не может быть пустым' },
        { status: 400 }
      );
    }
    
    const post = await prisma.post.create({
      data: {
        authorId: userId,
        content,
        type,
        category,
        tags: tags ? JSON.stringify(tags) : null,
        images: images ? JSON.stringify(images) : null,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
            role: true,
            verified: true,
            isPioneer: true,
          },
        },
      },
    });
    
    // Начисляем XP за пост
    await prisma.user.update({
      where: { id: userId },
      data: { xp: { increment: 10 } },
    });
    
    return NextResponse.json({
      success: true,
      post: {
        ...post,
        tags: tags || [],
        images: images || [],
        isLiked: false,
        likesCount: 0,
        commentsCount: 0,
      },
    });
  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}
