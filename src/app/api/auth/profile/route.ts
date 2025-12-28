import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserFromToken, verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Токен не предоставлен' },
        { status: 401 }
      );
    }

    const user = await getUserFromToken(token);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Недействительный токен' },
        { status: 401 }
      );
    }

    // Получаем дополнительную статистику
    const [postsCount, friendsCount, badgesCount] = await Promise.all([
      prisma.post.count({ where: { authorId: user.id } }),
      prisma.friendship.count({ 
        where: { 
          OR: [
            { userId: user.id, status: 'accepted' },
            { friendId: user.id, status: 'accepted' },
          ]
        } 
      }),
      prisma.userBadge.count({ where: { userId: user.id } }),
    ]);

    return NextResponse.json({
      success: true,
      user: {
        ...user,
        stats: {
          posts: postsCount,
          friends: friendsCount,
          badges: badgesCount,
        },
      },
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Токен не предоставлен' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, error: 'Недействительный токен' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, bio, location, website, avatar, language, notifications, privacy, role } = body;

    // Обновляем только разрешённые поля
    const updateData: {
      name?: string;
      bio?: string;
      location?: string;
      website?: string;
      avatar?: string;
      language?: string;
      notifications?: boolean;
      privacy?: string;
      role?: string;
    } = {};
    if (name !== undefined) updateData.name = name;
    if (bio !== undefined) updateData.bio = bio;
    if (location !== undefined) updateData.location = location;
    if (website !== undefined) updateData.website = website;
    if (avatar !== undefined) updateData.avatar = avatar;
    if (language !== undefined) updateData.language = language;
    if (notifications !== undefined) updateData.notifications = notifications;
    if (privacy !== undefined) updateData.privacy = privacy;
    if (role !== undefined) updateData.role = role;

    const user = await prisma.user.update({
      where: { id: decoded.userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        walletAddress: true,
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
        vodBalance: true,
        rVodBalance: true,
        pVodBalance: true,
        stakedAmount: true,
        referralCode: true,
        language: true,
        notifications: true,
        privacy: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}



