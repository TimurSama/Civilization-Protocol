import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserIdFromRequest } from '@/lib/api-utils';

// GET - Получение профиля пользователя
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        avatar: true,
        bio: true,
        location: true,
        website: true,
        role: true,
        verified: true,
        isPioneer: true,
        level: true,
        xp: true,
        reputation: true,
        referralCode: true,
        privacy: true,
        createdAt: true,
        lastActive: true,
      },
    });
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Пользователь не найден' },
        { status: 404 }
      );
    }
    
    // Получаем статистику
    const [postsCount, friendsCount, badgesCount, groupsCount] = await Promise.all([
      prisma.post.count({ where: { authorId: id } }),
      prisma.friendship.count({
        where: {
          OR: [
            { userId: id, status: 'accepted' },
            { friendId: id, status: 'accepted' },
          ],
        },
      }),
      prisma.userBadge.count({ where: { userId: id } }),
      prisma.groupMember.count({ where: { userId: id } }),
    ]);
    
    // Проверяем дружбу с текущим пользователем
    const currentUserId = getUserIdFromRequest(request);
    let friendshipStatus = null;
    
    if (currentUserId && currentUserId !== id) {
      const friendship = await prisma.friendship.findFirst({
        where: {
          OR: [
            { userId: currentUserId, friendId: id },
            { userId: id, friendId: currentUserId },
          ],
        },
      });
      friendshipStatus = friendship?.status || null;
    }
    
    return NextResponse.json({
      success: true,
      user: {
        ...user,
        stats: {
          posts: postsCount,
          friends: friendsCount,
          badges: badgesCount,
          groups: groupsCount,
        },
        friendshipStatus,
        isCurrentUser: currentUserId === id,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}










