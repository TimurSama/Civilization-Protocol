import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyPassword, createSession } from '@/lib/auth';

// Убеждаемся, что route динамический (не статический)
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Валидация
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email и пароль обязательны' },
        { status: 400 }
      );
    }

    // Проверяем доступность БД
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL is not set');
      return NextResponse.json(
        { success: false, error: 'Database configuration error' },
        { status: 500 }
      );
    }

    // Находим пользователя
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return NextResponse.json(
        { success: false, error: 'Неверный email или пароль' },
        { status: 401 }
      );
    }

    // Проверяем пароль
    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, error: 'Неверный email или пароль' },
        { status: 401 }
      );
    }

    // Создаём сессию
    const userAgent = request.headers.get('user-agent') || undefined;
    const token = await createSession(user.id, userAgent);

    // Возвращаем пользователя без пароля
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}



