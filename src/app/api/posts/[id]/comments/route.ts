import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserIdFromRequest, getPagination } from '@/lib/api-utils';

// GET - Получение комментариев к посту
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: postId } = await params;
    const { searchParams } = new URL(request.url);
    const { limit, skip } = getPagination(searchParams);
    
    const [comments, total] = await Promise.all([
      prisma.comment.findMany({
        where: { postId, parentId: null },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              avatar: true,
              role: true,
              verified: true,
            },
          },
          replies: {
            include: {
              author: {
                select: {
                  id: true,
                  name: true,
                  avatar: true,
                },
              },
            },
            orderBy: { createdAt: 'asc' },
            take: 3,
          },
          _count: {
            select: { replies: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.comment.count({ where: { postId, parentId: null } }),
    ]);
    
    return NextResponse.json({
      success: true,
      comments,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get comments error:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}

// POST - Создание комментария
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Требуется авторизация' },
        { status: 401 }
      );
    }
    
    const { id: postId } = await params;
    const body = await request.json();
    const { content, parentId } = body;
    
    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Комментарий не может быть пустым' },
        { status: 400 }
      );
    }
    
    // Проверяем существует ли пост
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    
    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Пост не найден' },
        { status: 404 }
      );
    }
    
    const comment = await prisma.comment.create({
      data: {
        postId,
        authorId: userId,
        content,
        parentId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
            role: true,
            verified: true,
          },
        },
      },
    });
    
    // Обновляем счётчик комментариев
    await prisma.post.update({
      where: { id: postId },
      data: { commentsCount: { increment: 1 } },
    });
    
    // XP за комментарий
    await prisma.user.update({
      where: { id: userId },
      data: { xp: { increment: 5 } },
    });
    
    return NextResponse.json({
      success: true,
      comment,
    });
  } catch (error) {
    console.error('Create comment error:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}










