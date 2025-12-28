import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'vodeco-super-secret-key-change-in-production';
const TOKEN_EXPIRY = '7d';

// Хэширование пароля
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

// Проверка пароля
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Генерация JWT токена
export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

// Проверка JWT токена
export function verifyToken(token: string): { userId: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded;
  } catch {
    return null;
  }
}

// Получение пользователя из токена
export async function getUserFromToken(token: string) {
  const decoded = verifyToken(token);
  if (!decoded) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        walletAddress: true,
        name: true,
        avatar: true,
        bio: true,
        location: true,
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
        lastActive: true,
      },
    });

    return user;
  } catch {
    return null;
  }
}

// Создание сессии
export async function createSession(userId: string, userAgent?: string, ip?: string) {
  const token = generateToken(userId);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 дней

  await prisma.session.create({
    data: {
      userId,
      token,
      expiresAt,
      userAgent,
      ip,
    },
  });

  // Обновляем lastActive
  await prisma.user.update({
    where: { id: userId },
    data: { lastActive: new Date() },
  });

  return token;
}

// Удаление сессии
export async function deleteSession(token: string) {
  try {
    await prisma.session.delete({
      where: { token },
    });
    return true;
  } catch {
    return false;
  }
}

// Генерация уникального реферального кода
export function generateReferralCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Начисление бонуса за реферала
export async function processReferralBonus(newUserId: string, referralCode: string) {
  try {
    const referrer = await prisma.user.findUnique({
      where: { referralCode },
    });

    if (!referrer) return;

    // Обновляем referredBy у нового пользователя
    await prisma.user.update({
      where: { id: newUserId },
      data: { referredBy: referrer.id },
    });

    // Начисляем бонус рефереру (50 VOD)
    await prisma.user.update({
      where: { id: referrer.id },
      data: {
        vodBalance: { increment: 50 },
        xp: { increment: 100 },
      },
    });

    // Создаём награду
    await prisma.reward.create({
      data: {
        userId: referrer.id,
        type: 'referral',
        amount: 50,
        currency: 'VOD',
        description: 'Реферальный бонус за приглашение друга',
        source: 'Referral Program',
        status: 'claimed',
        claimedAt: new Date(),
      },
    });

    // Создаём транзакцию
    await prisma.transaction.create({
      data: {
        userId: referrer.id,
        type: 'referral',
        tokenType: 'VOD',
        amount: 50,
        description: 'Referral bonus',
      },
    });
  } catch (error) {
    console.error('Referral bonus error:', error);
  }
}

// Начисление приветственного бонуса
export async function processWelcomeBonus(userId: string) {
  try {
    // Создаём награду
    await prisma.reward.create({
      data: {
        userId,
        type: 'achievement',
        amount: 100,
        currency: 'VOD',
        description: 'Приветственный бонус за регистрацию',
        source: 'Welcome Bonus',
        status: 'claimed',
        claimedAt: new Date(),
      },
    });

    // Создаём транзакцию
    await prisma.transaction.create({
      data: {
        userId,
        type: 'reward',
        tokenType: 'VOD',
        amount: 100,
        description: 'Welcome bonus',
      },
    });

    // Начисляем бейдж "Newcomer"
    const newcomerBadge = await prisma.badge.findUnique({
      where: { name: 'newcomer' },
    });

    if (newcomerBadge) {
      await prisma.userBadge.create({
        data: {
          userId,
          badgeId: newcomerBadge.id,
        },
      });
    }
  } catch (error) {
    console.error('Welcome bonus error:', error);
  }
}



