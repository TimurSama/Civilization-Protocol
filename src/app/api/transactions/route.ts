import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserIdFromRequest, getPagination } from '@/lib/api-utils';

// GET - Получение транзакций пользователя
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
    const type = searchParams.get('type');
    const tokenType = searchParams.get('tokenType');
    
    const where: any = { userId };
    if (type) where.type = type;
    if (tokenType) where.tokenType = tokenType;
    
    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.transaction.count({ where }),
    ]);
    
    return NextResponse.json({
      success: true,
      transactions,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}

// POST - Перевод токенов
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
    const { toAddress, amount, tokenType = 'VOD' } = body;
    
    if (!toAddress || !amount || amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Адрес и сумма обязательны' },
        { status: 400 }
      );
    }
    
    // Находим отправителя
    const sender = await prisma.user.findUnique({
      where: { id: userId },
    });
    
    if (!sender) {
      return NextResponse.json(
        { success: false, error: 'Пользователь не найден' },
        { status: 404 }
      );
    }
    
    // Проверяем баланс
    const balanceField = tokenType === 'VOD' ? 'vodBalance' : tokenType === 'R-VOD' ? 'rVodBalance' : 'pVodBalance';
    const currentBalance = sender[balanceField as keyof typeof sender] as number;
    
    if (currentBalance < amount) {
      return NextResponse.json(
        { success: false, error: 'Недостаточно средств' },
        { status: 400 }
      );
    }
    
    // Находим получателя (по адресу кошелька или referralCode)
    const receiver = await prisma.user.findFirst({
      where: {
        OR: [
          { walletAddress: toAddress },
          { referralCode: toAddress },
          { id: toAddress },
        ],
      },
    });
    
    if (!receiver) {
      return NextResponse.json(
        { success: false, error: 'Получатель не найден' },
        { status: 404 }
      );
    }
    
    if (receiver.id === userId) {
      return NextResponse.json(
        { success: false, error: 'Нельзя переводить самому себе' },
        { status: 400 }
      );
    }
    
    // Выполняем перевод
    const fee = amount * 0.01; // 1% комиссия
    const netAmount = amount - fee;
    
    await prisma.$transaction([
      // Списываем у отправителя
      prisma.user.update({
        where: { id: userId },
        data: { [balanceField]: { decrement: amount } },
      }),
      // Начисляем получателю
      prisma.user.update({
        where: { id: receiver.id },
        data: { [balanceField]: { increment: netAmount } },
      }),
      // Транзакция отправителя
      prisma.transaction.create({
        data: {
          userId,
          type: 'transfer',
          tokenType,
          amount: -amount,
          fee,
          toAddress: receiver.id,
          description: `Transfer to ${receiver.name}`,
        },
      }),
      // Транзакция получателя
      prisma.transaction.create({
        data: {
          userId: receiver.id,
          type: 'transfer',
          tokenType,
          amount: netAmount,
          fromAddress: userId,
          description: `Transfer from ${sender.name}`,
        },
      }),
    ]);
    
    return NextResponse.json({
      success: true,
      message: `Отправлено ${netAmount} ${tokenType} (комиссия: ${fee})`,
    });
  } catch (error) {
    console.error('Transfer error:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}



