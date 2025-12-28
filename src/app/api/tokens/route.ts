/**
 * API для внутреннего токена VODG
 * Токен для наград, стейкинга, голосования
 * Позже будет конвертирован в основной токен VOD
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

// Константы токеномики
const VODG_RATE = 0.01; // 1 VODG = $0.01 (тестовый курс)
const CONVERSION_RATE = 100; // 100 VODG = 1 VOD (при запуске)

// Награды в VODG
export const VODG_REWARDS = {
  // Регистрация и онбординг
  REGISTRATION: 1000,
  PROFILE_COMPLETE: 500,
  KYC_VERIFIED: 2500,
  WALLET_CONNECTED: 250,
  
  // Ежедневная активность
  DAILY_LOGIN: 10,
  STREAK_7_DAYS: 100,
  STREAK_30_DAYS: 500,
  
  // Контент
  POST_CREATE: 25,
  POST_LIKED: 5,
  COMMENT: 10,
  REPORT_SUBMIT: 150,
  REPORT_VERIFIED: 500,
  
  // DAO участие
  VOTE_CAST: 20,
  PROPOSAL_CREATE: 200,
  PROPOSAL_PASSED: 1000,
  
  // Социальные действия
  REFERRAL_L1: 500,
  REFERRAL_L2: 250,
  REFERRAL_L3: 100,
  FRIEND_ADDED: 15,
  GROUP_JOINED: 25,
  
  // Миссии и достижения
  MISSION_DAILY: 50,
  MISSION_WEEKLY: 250,
  MISSION_MONTHLY: 1000,
  ACHIEVEMENT_UNLOCK: 100,
  
  // Образование (Learn-to-Earn)
  PRESENTATION_VIEW: 50,
  WHITEPAPER_READ: 100,
  QUIZ_PASS: 75,
  TUTORIAL_COMPLETE: 150,
  
  // Стейкинг бонусы
  STAKING_DAILY: 1, // 1% от застейканного
};

// Пулы стейкинга VODG
export const VODG_STAKING_POOLS = [
  {
    id: 'governance-pool',
    name: 'Governance Pool',
    nameRu: 'Пул голосования',
    nameAr: 'مجمع الحوكمة',
    description: 'Stake VODG to increase your voting power',
    descriptionRu: 'Стейк VODG для увеличения веса голоса',
    minStake: 100,
    apy: 15,
    lockDays: 30,
    multiplier: 1.5, // Множитель веса голоса
    totalStaked: 2500000,
    participants: 1234,
  },
  {
    id: 'data-access-pool',
    name: 'Data Access Pool',
    nameRu: 'Пул доступа к данным',
    nameAr: 'مجمع الوصول إلى البيانات',
    description: 'Get access to premium data and analytics',
    descriptionRu: 'Доступ к премиум данным и аналитике',
    minStake: 500,
    apy: 12,
    lockDays: 14,
    multiplier: 1.0,
    totalStaked: 1800000,
    participants: 567,
  },
  {
    id: 'project-pool',
    name: 'Project Investment Pool',
    nameRu: 'Пул инвестиций в проекты',
    nameAr: 'مجمع الاستثمار في المشاريع',
    description: 'Participate in early project investments',
    descriptionRu: 'Участие в ранних инвестициях в проекты',
    minStake: 1000,
    apy: 25,
    lockDays: 90,
    multiplier: 2.0,
    totalStaked: 5000000,
    participants: 234,
  },
];

// GET - Получить баланс и статистику
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get('action');
    
    // Публичная статистика
    if (action === 'stats') {
      return NextResponse.json({
        success: true,
        data: {
          totalSupply: 100_000_000_000, // 100 млрд VODG
          circulatingSupply: 15_000_000_000,
          totalStaked: 9_300_000,
          totalParticipants: 2035,
          conversionRate: CONVERSION_RATE,
          vodgRate: VODG_RATE,
          pools: VODG_STAKING_POOLS,
          rewards: VODG_REWARDS,
        }
      });
    }
    
    if (action === 'pools') {
      return NextResponse.json({
        success: true,
        data: VODG_STAKING_POOLS,
      });
    }
    
    // Баланс пользователя (требуется авторизация)
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({
        success: true,
        data: {
          vodg: 0,
          staked: 0,
          pending: 0,
          totalEarned: 0,
          votingPower: 0,
          level: 1,
          xp: 0,
          nextLevelXp: 1000,
        }
      });
    }
    
    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);
    
    if (!payload) {
      return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 });
    }
    
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: {
        stakes: true,
        transactions: {
          where: { type: 'REWARD' },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });
    
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }
    
    const stakedAmount = user.stakes
      .filter((s: any) => s.status === 'ACTIVE')
      .reduce((sum: number, s: any) => sum + s.amount, 0);
    
    const pendingRewards = user.stakes
      .reduce((sum: number, s: any) => sum + (s.pendingRewards || 0), 0);
    
    const totalEarned = user.transactions
      .filter((t: any) => t.type === 'REWARD')
      .reduce((sum: number, t: any) => sum + t.amount, 0);
    
    // Расчёт уровня и XP
    const xp = user.xp || 0;
    const level = Math.floor(xp / 1000) + 1;
    const nextLevelXp = level * 1000;
    
    // Расчёт веса голоса
    const baseVotingPower = user.vodBalance || 0;
    const stakingMultiplier = stakedAmount > 0 ? 1.5 : 1;
    const votingPower = Math.floor((baseVotingPower + stakedAmount) * stakingMultiplier);
    
    return NextResponse.json({
      success: true,
      data: {
        vodg: user.vodBalance || 0,
        staked: stakedAmount,
        pending: pendingRewards,
        totalEarned,
        votingPower,
        level,
        xp,
        nextLevelXp,
        recentRewards: user.transactions,
      }
    });
  } catch (error) {
    console.error('Token API error:', error);
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
  }
}

// POST - Действия с токенами
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    
    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);
    
    if (!payload) {
      return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 });
    }
    
    const body = await request.json();
    const { action, amount, poolId, rewardType } = body;
    
    switch (action) {
      case 'claim_reward': {
        // Начисление награды
        const rewardAmount = VODG_REWARDS[rewardType as keyof typeof VODG_REWARDS] || 0;
        
        if (rewardAmount === 0) {
          return NextResponse.json({ success: false, error: 'Invalid reward type' }, { status: 400 });
        }
        
        const user = await prisma.user.update({
          where: { id: payload.userId },
          data: {
            vodBalance: { increment: rewardAmount },
            xp: { increment: Math.floor(rewardAmount / 10) },
          },
        });
        
        await prisma.transaction.create({
          data: {
            userId: payload.userId,
            type: 'REWARD',
            amount: rewardAmount,
            status: 'COMPLETED',
            description: `Reward: ${rewardType}`,
          },
        });
        
        return NextResponse.json({
          success: true,
          data: {
            amount: rewardAmount,
            newBalance: user.vodBalance,
            xpEarned: Math.floor(rewardAmount / 10),
          }
        });
      }
      
      case 'stake': {
        // Стейкинг VODG
        const pool = VODG_STAKING_POOLS.find(p => p.id === poolId);
        
        if (!pool) {
          return NextResponse.json({ success: false, error: 'Pool not found' }, { status: 404 });
        }
        
        if (amount < pool.minStake) {
          return NextResponse.json({ 
            success: false, 
            error: `Minimum stake is ${pool.minStake} VODG` 
          }, { status: 400 });
        }
        
        const user = await prisma.user.findUnique({
          where: { id: payload.userId },
        });
        
        if (!user || (user.vodBalance || 0) < amount) {
          return NextResponse.json({ success: false, error: 'Insufficient balance' }, { status: 400 });
        }
        
        // Создаём стейк
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + pool.lockDays);
        
        await prisma.user.update({
          where: { id: payload.userId },
          data: { vodBalance: { decrement: amount } },
        });
        
        const stake = await prisma.stake.create({
          data: {
            userId: payload.userId,
            poolId: poolId,
            poolName: pool.name,
            amount: amount,
            apy: pool.apy,
            endDate: endDate,
          },
        });
        
        await prisma.transaction.create({
          data: {
            userId: payload.userId,
            type: 'STAKE',
            amount: -amount,
            status: 'COMPLETED',
            description: `Staked ${amount} VODG in ${pool.name}`,
          },
        });
        
        return NextResponse.json({
          success: true,
          data: {
            stakeId: stake.id,
            amount,
            pool: pool.name,
            unlockDate,
            estimatedReward: Math.floor(amount * pool.apy / 100 * pool.lockDays / 365),
          }
        });
      }
      
      case 'unstake': {
        // Вывод из стейкинга
        const stake = await prisma.stake.findFirst({
          where: {
            userId: payload.userId,
            poolId: poolId,
            status: 'active',
          },
        });
        
        if (!stake) {
          return NextResponse.json({ success: false, error: 'Stake not found' }, { status: 404 });
        }
        
        const now = new Date();
        const isUnlocked = now >= stake.endDate;
        const penalty = isUnlocked ? 0 : 0.1; // 10% штраф за ранний вывод
        
        const returnAmount = Math.floor(stake.amount * (1 - penalty));
        const rewards = stake.earnedRewards || 0;
        
        await prisma.stake.update({
          where: { id: stake.id },
          data: { status: 'completed' },
        });
        
        await prisma.user.update({
          where: { id: payload.userId },
          data: { vodBalance: { increment: returnAmount + rewards } },
        });
        
        await prisma.transaction.create({
          data: {
            userId: payload.userId,
            type: 'UNSTAKE',
            amount: returnAmount + rewards,
            status: 'COMPLETED',
            description: `Unstaked ${returnAmount} VODG${penalty > 0 ? ' (early withdrawal penalty applied)' : ''}`,
          },
        });
        
        return NextResponse.json({
          success: true,
          data: {
            amount: returnAmount,
            rewards,
            penalty: penalty * 100,
            total: returnAmount + rewards,
          }
        });
      }
      
      case 'transfer': {
        // Перевод токенов
        const { toAddress } = body;
        
        if (!toAddress || !amount || amount <= 0) {
          return NextResponse.json({ success: false, error: 'Invalid transfer params' }, { status: 400 });
        }
        
        const sender = await prisma.user.findUnique({
          where: { id: payload.userId },
        });
        
        if (!sender || (sender.vodBalance || 0) < amount) {
          return NextResponse.json({ success: false, error: 'Insufficient balance' }, { status: 400 });
        }
        
        // Находим получателя по адресу кошелька
        const receiver = await prisma.user.findFirst({
          where: { walletAddress: toAddress },
        });
        
        if (!receiver) {
          return NextResponse.json({ success: false, error: 'Recipient not found' }, { status: 404 });
        }
        
        // Выполняем перевод
        await prisma.user.update({
          where: { id: payload.userId },
          data: { vodBalance: { decrement: amount } },
        });
        
        await prisma.user.update({
          where: { id: receiver.id },
          data: { vodBalance: { increment: amount } },
        });
        
        await prisma.transaction.create({
          data: {
            userId: payload.userId,
            type: 'TRANSFER',
            amount: -amount,
            status: 'COMPLETED',
            description: `Transfer to ${toAddress.slice(0, 8)}...`,
          },
        });
        
        await prisma.transaction.create({
          data: {
            userId: receiver.id,
            type: 'TRANSFER',
            amount: amount,
            status: 'COMPLETED',
            description: `Transfer from ${sender.walletAddress?.slice(0, 8) || 'user'}...`,
          },
        });
        
        return NextResponse.json({
          success: true,
          data: {
            amount,
            to: toAddress,
            txHash: `0x${Date.now().toString(16)}${Math.random().toString(16).slice(2, 10)}`,
          }
        });
      }
      
      default:
        return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Token action error:', error);
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
  }
}



