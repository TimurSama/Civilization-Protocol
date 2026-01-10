import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { 
  hashPassword, 
  createSession, 
  generateReferralCode,
  processReferralBonus,
  processWelcomeBonus
} from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name, referralCode } = body;

    // Валидация
    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, error: 'Email, пароль и имя обязательны' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Пароль должен быть не менее 6 символов' },
        { status: 400 }
      );
    }

    // Проверка существующего пользователя
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Пользователь с таким email уже существует' },
        { status: 409 }
      );
    }

    // Хэшируем пароль
    const hashedPassword = await hashPassword(password);

    // Проверяем, является ли пользователь одним из первых 1000 (Pioneer)
    const userCount = await prisma.user.count();
    const isPioneer = userCount < 1000;

    // Создаём пользователя
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        avatar: name.slice(0, 2).toUpperCase(),
        referralCode: generateReferralCode(),
        isPioneer,
        vodBalance: isPioneer ? 200 : 100, // Pioneer получают x2
      },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
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
        createdAt: true,
      },
    });

    // Обрабатываем реферальный бонус
    if (referralCode) {
      await processReferralBonus(user.id, referralCode);
    }

    // Начисляем приветственный бонус
    await processWelcomeBonus(user.id);

    // Создаём сессию
    const userAgent = request.headers.get('user-agent') || undefined;
    const token = await createSession(user.id, userAgent);

    return NextResponse.json({
      success: true,
      user,
      token,
      message: isPioneer 
        ? 'Добро пожаловать, Pioneer! Вы получили x2 приветственный бонус!' 
        : 'Регистрация успешна!',
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}






















