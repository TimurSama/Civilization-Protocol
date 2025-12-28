import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserIdFromRequest } from '@/lib/api-utils';

// POST - Лайк/анлайк поста
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
    
    // Проверяем есть ли уже лайк
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: { userId, postId },
      },
    });
    
    if (existingLike) {
      // Убираем лайк
      await prisma.like.delete({
        where: { id: existingLike.id },
      });
      
      await prisma.post.update({
        where: { id: postId },
        data: { likesCount: { decrement: 1 } },
      });
      
      return NextResponse.json({
        success: true,
        liked: false,
        message: 'Лайк убран',
      });
    } else {
      // Ставим лайк
      await prisma.like.create({
        data: {
          userId,
          postId,
        },
      });
      
      await prisma.post.update({
        where: { id: postId },
        data: { likesCount: { increment: 1 } },
      });
      
      // XP за лайк
      await prisma.user.update({
        where: { id: userId },
        data: { xp: { increment: 1 } },
      });
      
      return NextResponse.json({
        success: true,
        liked: true,
        message: 'Лайк поставлен',
      });
    }
  } catch (error) {
    console.error('Like post error:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}



