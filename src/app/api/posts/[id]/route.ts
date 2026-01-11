import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserIdFromRequest } from '@/lib/api-utils';

// GET - Получение поста по ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const post = await prisma.post.findUnique({
      where: { id },
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
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });
    
    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Пост не найден' },
        { status: 404 }
      );
    }
    
    // Увеличиваем счётчик просмотров
    await prisma.post.update({
      where: { id },
      data: { viewsCount: { increment: 1 } },
    });
    
    // Проверяем лайк текущего пользователя
    const userId = getUserIdFromRequest(request);
    let isLiked = false;
    
    if (userId) {
      const like = await prisma.like.findUnique({
        where: {
          userId_postId: { userId, postId: id },
        },
      });
      isLiked = !!like;
    }
    
    return NextResponse.json({
      success: true,
      post: {
        ...post,
        tags: post.tags ? JSON.parse(post.tags) : [],
        images: post.images ? JSON.parse(post.images) : [],
        isLiked,
        likesCount: post._count.likes,
        commentsCount: post._count.comments,
      },
    });
  } catch (error) {
    console.error('Get post error:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}

// DELETE - Удаление поста
export async function DELETE(
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
    
    const { id } = await params;
    
    const post = await prisma.post.findUnique({
      where: { id },
    });
    
    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Пост не найден' },
        { status: 404 }
      );
    }
    
    if (post.authorId !== userId) {
      return NextResponse.json(
        { success: false, error: 'Нет прав на удаление' },
        { status: 403 }
      );
    }
    
    await prisma.post.delete({
      where: { id },
    });
    
    return NextResponse.json({
      success: true,
      message: 'Пост удалён',
    });
  } catch (error) {
    console.error('Delete post error:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}
























