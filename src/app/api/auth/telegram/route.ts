import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { generateToken } from '@/lib/auth';
import { 
  validateTelegramWebAppData, 
  validateTelegramLoginData,
  TelegramLoginData 
} from '@/lib/telegram';

// Telegram Login Widget authentication
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data, referralCode } = body;

    // Handle Web App authentication
    if (type === 'webapp') {
      const validation = validateTelegramWebAppData(data);
      
      if (!validation.valid || !validation.data?.user) {
        return NextResponse.json({ error: 'Invalid Telegram data' }, { status: 401 });
      }

      const telegramUser = validation.data.user;
      return handleTelegramUser(telegramUser, referralCode);
    }

    // Handle Login Widget authentication
    if (type === 'widget') {
      const loginData = data as TelegramLoginData;
      
      if (!validateTelegramLoginData(loginData)) {
        return NextResponse.json({ error: 'Invalid Telegram login data' }, { status: 401 });
      }

      return handleTelegramUser({
        id: loginData.id,
        first_name: loginData.first_name,
        last_name: loginData.last_name,
        username: loginData.username,
        photo_url: loginData.photo_url,
      }, referralCode);
    }

    return NextResponse.json({ error: 'Invalid authentication type' }, { status: 400 });
  } catch (error) {
    console.error('Telegram auth error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function handleTelegramUser(
  telegramUser: {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
    photo_url?: string;
  },
  referralCode?: string
) {
  const telegramId = telegramUser.id.toString();
  
  // Check if user exists by Telegram ID
  let user = await prisma.user.findFirst({
    where: { telegramId }
  });

  const isNewUser = !user;
  let referrer = null;

  // Handle referral code
  if (isNewUser && referralCode) {
    referrer = await prisma.user.findFirst({
      where: { referralCode }
    });
  }

  if (!user) {
    // Create new user
    const name = [telegramUser.first_name, telegramUser.last_name].filter(Boolean).join(' ');
    const username = telegramUser.username || `tg_${telegramId}`;
    
    // Generate unique referral code for new user
    const newReferralCode = generateReferralCode(username);

    user = await prisma.user.create({
      data: {
        name,
        email: `${telegramId}@telegram.vodeco.org`, // Pseudo-email for Telegram users
        telegramId,
        telegramUsername: telegramUser.username,
        avatar: telegramUser.photo_url,
        role: 'citizen',
        isPioneer: true,
        verified: telegramUser.is_premium || false,
        referralCode: newReferralCode,
        referredBy: referrer?.id,
        vodBalance: 200, // Welcome bonus
        xp: 100,
        level: 1,
        reputation: 10,
        preferredLanguage: telegramUser.language_code || 'ru'
      }
    });

    // Create welcome bonus transaction
    await prisma.transaction.create({
      data: {
        userId: user.id,
        type: 'reward',
        amount: 200,
        tokenType: 'VOD',
        status: 'completed',
        description: 'Welcome bonus (Telegram registration)'
      }
    });

    // Award referrer bonus if applicable
    if (referrer) {
      await prisma.user.update({
        where: { id: referrer.id },
        data: {
          vodBalance: { increment: 100 },
          xp: { increment: 50 }
        }
      });

      await prisma.transaction.create({
        data: {
          userId: referrer.id,
          type: 'referral',
          amount: 100,
          tokenType: 'VOD',
          status: 'completed',
          description: `Referral bonus for inviting ${user.name}`
        }
      });
    }
  } else {
    // Update existing user's Telegram info
    user = await prisma.user.update({
      where: { id: user.id },
      data: {
        telegramUsername: telegramUser.username,
        avatar: telegramUser.photo_url || user.avatar,
        lastLogin: new Date()
      }
    });
  }

  // Generate JWT token
  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role
  });

  return NextResponse.json({
    success: true,
    isNewUser,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      isPioneer: user.isPioneer,
      verified: user.verified,
      vodBalance: user.vodBalance,
      xp: user.xp,
      level: user.level,
      reputation: user.reputation,
      referralCode: user.referralCode,
      telegramId: user.telegramId,
      telegramUsername: user.telegramUsername
    },
    token,
    rewards: isNewUser ? {
      welcome: 200,
      referral: referrer ? 100 : 0
    } : null
  });
}

function generateReferralCode(base: string): string {
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${base.toUpperCase().substring(0, 4)}${random}`;
}


