import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { 
  createSession, 
  generateReferralCode,
  processWelcomeBonus
} from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { walletAddress, referralCode } = body;

    // Валидация
    if (!walletAddress) {
      return NextResponse.json(
        { success: false, error: 'Адрес кошелька обязателен' },
        { status: 400 }
      );
    }

    // Находим или создаём пользователя
    let user = await prisma.user.findUnique({
      where: { walletAddress },
    });

    let isNewUser = false;

    if (!user) {
      // Проверяем Pioneer статус
      const userCount = await prisma.user.count();
      const isPioneer = userCount < 1000;

      // Создаём нового пользователя
      user = await prisma.user.create({
        data: {
          walletAddress,
          name: `User_${walletAddress.slice(2, 8)}`,
          avatar: walletAddress.slice(2, 4).toUpperCase(),
          referralCode: generateReferralCode(),
          isPioneer,
          vodBalance: isPioneer ? 200 : 100,
        },
      });

      isNewUser = true;

      // Обрабатываем реферальный код если есть
      if (referralCode) {
        const referrer = await prisma.user.findUnique({
          where: { referralCode },
        });

        if (referrer) {
          await prisma.user.update({
            where: { id: user.id },
            data: { referredBy: referrer.id },
          });

          // Бонус рефереру
          await prisma.user.update({
            where: { id: referrer.id },
            data: {
              vodBalance: { increment: 50 },
              xp: { increment: 100 },
            },
          });
        }
      }

      // Приветственный бонус
      await processWelcomeBonus(user.id);
    }

    // Создаём сессию
    const userAgent = request.headers.get('user-agent') || undefined;
    const token = await createSession(user.id, userAgent);

    // Возвращаем пользователя без пароля
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      token,
      isNewUser,
    });
  } catch (error) {
    console.error('Wallet login error:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}



