import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserIdFromRequest } from '@/lib/api-utils';

// PUT - Принять/отклонить запрос на дружбу
export async function PUT(
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
    
    const { id: friendshipId } = await params;
    const body = await request.json();
    const { action } = body; // accept, reject, block
    
    if (!['accept', 'reject', 'block'].includes(action)) {
      return NextResponse.json(
        { success: false, error: 'Неверное действие' },
        { status: 400 }
      );
    }
    
    const friendship = await prisma.friendship.findUnique({
      where: { id: friendshipId },
    });
    
    if (!friendship) {
      return NextResponse.json(
        { success: false, error: 'Запрос не найден' },
        { status: 404 }
      );
    }
    
    // Только получатель может принять/отклонить
    if (friendship.friendId !== userId) {
      return NextResponse.json(
        { success: false, error: 'Нет прав на это действие' },
        { status: 403 }
      );
    }
    
    if (action === 'reject') {
      await prisma.friendship.delete({
        where: { id: friendshipId },
      });
      
      return NextResponse.json({
        success: true,
        message: 'Запрос отклонён',
      });
    }
    
    const newStatus = action === 'accept' ? 'accepted' : 'blocked';
    
    const updated = await prisma.friendship.update({
      where: { id: friendshipId },
      data: { status: newStatus },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });
    
    // XP за нового друга
    if (action === 'accept') {
      await prisma.user.updateMany({
        where: {
          id: { in: [friendship.userId, friendship.friendId] },
        },
        data: { xp: { increment: 20 } },
      });
    }
    
    return NextResponse.json({
      success: true,
      friendship: updated,
      message: action === 'accept' ? 'Друг добавлен!' : 'Пользователь заблокирован',
    });
  } catch (error) {
    console.error('Update friendship error:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}

// DELETE - Удалить из друзей
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
    
    const { id: friendshipId } = await params;
    
    const friendship = await prisma.friendship.findUnique({
      where: { id: friendshipId },
    });
    
    if (!friendship) {
      return NextResponse.json(
        { success: false, error: 'Дружба не найдена' },
        { status: 404 }
      );
    }
    
    // Оба участника могут удалить дружбу
    if (friendship.userId !== userId && friendship.friendId !== userId) {
      return NextResponse.json(
        { success: false, error: 'Нет прав на это действие' },
        { status: 403 }
      );
    }
    
    await prisma.friendship.delete({
      where: { id: friendshipId },
    });
    
    return NextResponse.json({
      success: true,
      message: 'Удалено из друзей',
    });
  } catch (error) {
    console.error('Delete friendship error:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}






















