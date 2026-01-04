import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserIdFromRequest, getPagination } from '@/lib/api-utils';

// GET - Получение списка друзей
export async function GET(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Требуется авторизация' },
        { status: 401 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'accepted';
    const { limit, skip } = getPagination(searchParams);
    
    // Получаем дружбы где пользователь инициатор или получатель
    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [
          { userId, status },
          { friendId: userId, status },
        ],
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
            role: true,
            verified: true,
            isPioneer: true,
            lastActive: true,
            bio: true,
          },
        },
        friend: {
          select: {
            id: true,
            name: true,
            avatar: true,
            role: true,
            verified: true,
            isPioneer: true,
            lastActive: true,
            bio: true,
          },
        },
      },
      skip,
      take: limit,
    });
    
    // Форматируем - возвращаем информацию о друге (не о себе)
    const friends = friendships.map(f => ({
      friendshipId: f.id,
      status: f.status,
      createdAt: f.createdAt,
      friend: f.userId === userId ? f.friend : f.user,
      isInitiator: f.userId === userId,
    }));
    
    return NextResponse.json({
      success: true,
      friends,
    });
  } catch (error) {
    console.error('Get friends error:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}

// POST - Отправка запроса на дружбу
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
    const { friendId } = body;
    
    if (!friendId) {
      return NextResponse.json(
        { success: false, error: 'ID друга обязателен' },
        { status: 400 }
      );
    }
    
    if (friendId === userId) {
      return NextResponse.json(
        { success: false, error: 'Нельзя добавить себя в друзья' },
        { status: 400 }
      );
    }
    
    // Проверяем существует ли пользователь
    const friend = await prisma.user.findUnique({
      where: { id: friendId },
    });
    
    if (!friend) {
      return NextResponse.json(
        { success: false, error: 'Пользователь не найден' },
        { status: 404 }
      );
    }
    
    // Проверяем нет ли уже запроса
    const existingFriendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          { userId, friendId },
          { userId: friendId, friendId: userId },
        ],
      },
    });
    
    if (existingFriendship) {
      return NextResponse.json(
        { success: false, error: 'Запрос уже существует' },
        { status: 409 }
      );
    }
    
    const friendship = await prisma.friendship.create({
      data: {
        userId,
        friendId,
        status: 'pending',
      },
      include: {
        friend: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });
    
    return NextResponse.json({
      success: true,
      friendship,
      message: 'Запрос на дружбу отправлен',
    });
  } catch (error) {
    console.error('Add friend error:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}










