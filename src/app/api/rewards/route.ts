import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserIdFromRequest, getPagination } from '@/lib/api-utils';

// GET - Получение наград пользователя
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
    const { limit, skip } = getPagination(searchParams);
    const status = searchParams.get('status');
    
    const where: { userId: string; status?: string } = { userId };
    if (status) where.status = status;
    
    const [rewards, total, pendingCount, totalEarned] = await Promise.all([
      prisma.reward.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.reward.count({ where }),
      prisma.reward.count({ where: { userId, status: 'pending' } }),
      prisma.reward.aggregate({
        where: { userId, status: 'claimed', currency: 'VOD' },
        _sum: { amount: true },
      }),
    ]);
    
    return NextResponse.json({
      success: true,
      rewards,
      stats: {
        pendingCount,
        totalEarned: totalEarned._sum.amount || 0,
      },
      pagination: {
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get rewards error:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}

// POST - Получить награду
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
    const { rewardId } = body;
    
    if (!rewardId) {
      return NextResponse.json(
        { success: false, error: 'ID награды обязателен' },
        { status: 400 }
      );
    }
    
    const reward = await prisma.reward.findUnique({
      where: { id: rewardId },
    });
    
    if (!reward) {
      return NextResponse.json(
        { success: false, error: 'Награда не найдена' },
        { status: 404 }
      );
    }
    
    if (reward.userId !== userId) {
      return NextResponse.json(
        { success: false, error: 'Это не ваша награда' },
        { status: 403 }
      );
    }
    
    if (reward.status !== 'pending') {
      return NextResponse.json(
        { success: false, error: 'Награда уже получена' },
        { status: 400 }
      );
    }
    
    // Обновляем награду
    await prisma.reward.update({
      where: { id: rewardId },
      data: {
        status: 'claimed',
        claimedAt: new Date(),
      },
    });
    
    // Начисляем токены
    if (reward.currency === 'VOD') {
      await prisma.user.update({
        where: { id: userId },
        data: { vodBalance: { increment: reward.amount } },
      });
    } else if (reward.currency === 'XP') {
      await prisma.user.update({
        where: { id: userId },
        data: { xp: { increment: Math.round(reward.amount) } },
      });
    }
    
    // Создаём транзакцию
    await prisma.transaction.create({
      data: {
        userId,
        type: 'reward',
        tokenType: reward.currency,
        amount: reward.amount,
        description: reward.description,
      },
    });
    
    return NextResponse.json({
      success: true,
      message: `+${reward.amount} ${reward.currency}!`,
    });
  } catch (error) {
    console.error('Claim reward error:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}
