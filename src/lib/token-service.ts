/**
 * VOD Token Service
 * Сервис для работы с внутренней тестовой токеномикой
 * 
 * Токены:
 * - VOD: Основной токен управления и участия
 * - R-VOD: Ресурсный токен (заблокированный для стейкинга)
 * - P-VOD: Проектный токен (привязан к конкретным проектам)
 */

// Типы транзакций
export type TransactionType = 
  | 'transfer' 
  | 'stake' 
  | 'unstake' 
  | 'reward' 
  | 'purchase' 
  | 'vote_reward'
  | 'referral'
  | 'mission'
  | 'airdrop';

// Типы токенов
export type TokenType = 'VOD' | 'R-VOD' | 'P-VOD';

// Интерфейс баланса
export interface TokenBalance {
  vod: number;
  rVod: number;
  pVod: number;
  staked: number;
  locked: number;
  pendingRewards: number;
  totalValue: number; // в USD
}

// Интерфейс транзакции
export interface TokenTransaction {
  id: string;
  type: TransactionType;
  tokenType: TokenType;
  amount: number;
  from: string;
  to: string;
  status: 'pending' | 'confirmed' | 'failed';
  hash: string;
  timestamp: string;
  description: string;
  fee?: number;
}

// Интерфейс стейкинг пула
export interface StakingPool {
  id: string;
  name: string;
  type: 'governance' | 'data' | 'project';
  apy: number;
  minStake: number;
  maxStake: number;
  lockPeriod: number; // в днях
  totalStaked: number;
  participants: number;
  rewards: {
    vod: number;
    governance?: number; // вес голоса
    access?: string[]; // дополнительный доступ
  };
}

// Константы токеномики
export const TOKENOMICS = {
  // Общее количество токенов
  TOTAL_SUPPLY: 1_000_000_000,
  
  // Распределение
  DISTRIBUTION: {
    ECOSYSTEM: 0.25, // 25%
    TEAM: 0.20, // 20%
    PRIVATE_SALE: 0.15, // 15%
    PUBLIC_SALE: 0.10, // 10%
    DAO_TREASURY: 0.10, // 10%
    SEED: 0.10, // 10%
    LIQUIDITY: 0.05, // 5%
    PARTNERSHIPS: 0.05, // 5%
  },
  
  // Курс (тестовый)
  EXCHANGE_RATE: {
    VOD_USD: 0.10,
    RVOD_USD: 0.12,
    PVOD_USD: 0.08,
  },
  
  // Награды
  REWARDS: {
    DAILY_LOGIN: 5,
    REPORT_SUBMIT: 150,
    VOTE_PARTICIPATION: 20,
    POST_CREATE: 25,
    COMMENT: 5,
    REFERRAL_L1: 50,
    REFERRAL_L2: 25,
    REFERRAL_L3: 10,
    MISSION_WEEKLY: 500,
    ACHIEVEMENT: 100,
  },
  
  // Стейкинг APY
  STAKING_APY: {
    GOVERNANCE: 0.12, // 12%
    DATA_ACCESS: 0.08, // 8%
    PROJECT: 0.18, // 18%
  },
};

// Стейкинг пулы
export const STAKING_POOLS: StakingPool[] = [
  {
    id: 'pool-governance',
    name: 'Governance Pool',
    type: 'governance',
    apy: 12,
    minStake: 100,
    maxStake: 1000000,
    lockPeriod: 90,
    totalStaked: 15_000_000,
    participants: 1234,
    rewards: {
      vod: 12,
      governance: 1.5, // 1.5x вес голоса
    },
  },
  {
    id: 'pool-data',
    name: 'Data Access Pool',
    type: 'data',
    apy: 8,
    minStake: 50,
    maxStake: 500000,
    lockPeriod: 30,
    totalStaked: 8_000_000,
    participants: 2345,
    rewards: {
      vod: 8,
      access: ['raw-data', 'api-extended'],
    },
  },
  {
    id: 'pool-project',
    name: 'Project Pool',
    type: 'project',
    apy: 18,
    minStake: 500,
    maxStake: 2000000,
    lockPeriod: 180,
    totalStaked: 25_000_000,
    participants: 567,
    rewards: {
      vod: 18,
      access: ['project-voting', 'early-access'],
    },
  },
];

// Класс сервиса токенов
class TokenService {
  private balances: Map<string, TokenBalance> = new Map();
  private transactions: TokenTransaction[] = [];
  private stakes: Map<string, { poolId: string; amount: number; startDate: string }[]> = new Map();

  // Получение баланса пользователя
  getBalance(userId: string): TokenBalance {
    if (!this.balances.has(userId)) {
      // Начальный баланс для нового пользователя
      this.balances.set(userId, {
        vod: 100, // Приветственный бонус
        rVod: 0,
        pVod: 0,
        staked: 0,
        locked: 0,
        pendingRewards: 0,
        totalValue: 10, // 100 VOD * $0.10
      });
    }
    return this.balances.get(userId)!;
  }

  // Обновление баланса
  updateBalance(userId: string, updates: Partial<TokenBalance>): TokenBalance {
    const current = this.getBalance(userId);
    const updated = { ...current, ...updates };
    
    // Пересчёт общей стоимости
    updated.totalValue = 
      updated.vod * TOKENOMICS.EXCHANGE_RATE.VOD_USD +
      updated.rVod * TOKENOMICS.EXCHANGE_RATE.RVOD_USD +
      updated.pVod * TOKENOMICS.EXCHANGE_RATE.PVOD_USD;
    
    this.balances.set(userId, updated);
    return updated;
  }

  // Перевод токенов
  transfer(
    fromUserId: string,
    toUserId: string,
    amount: number,
    tokenType: TokenType = 'VOD'
  ): TokenTransaction | null {
    const fromBalance = this.getBalance(fromUserId);
    const tokenKey = tokenType === 'VOD' ? 'vod' : tokenType === 'R-VOD' ? 'rVod' : 'pVod';
    
    if (fromBalance[tokenKey] < amount) {
      return null; // Недостаточно средств
    }

    // Списание
    this.updateBalance(fromUserId, {
      [tokenKey]: fromBalance[tokenKey] - amount,
    } as Partial<TokenBalance>);

    // Зачисление
    const toBalance = this.getBalance(toUserId);
    this.updateBalance(toUserId, {
      [tokenKey]: toBalance[tokenKey] + amount,
    } as Partial<TokenBalance>);

    // Создание транзакции
    const tx: TokenTransaction = {
      id: `tx-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'transfer',
      tokenType,
      amount,
      from: fromUserId,
      to: toUserId,
      status: 'confirmed',
      hash: `0x${Math.random().toString(16).substr(2, 64)}`,
      timestamp: new Date().toISOString(),
      description: `Transfer ${amount} ${tokenType}`,
    };

    this.transactions.push(tx);
    return tx;
  }

  // Начисление награды
  addReward(
    userId: string,
    amount: number,
    type: TransactionType,
    description: string
  ): TokenTransaction {
    const balance = this.getBalance(userId);
    this.updateBalance(userId, {
      pendingRewards: balance.pendingRewards + amount,
    });

    const tx: TokenTransaction = {
      id: `tx-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      tokenType: 'VOD',
      amount,
      from: 'system',
      to: userId,
      status: 'confirmed',
      hash: `0x${Math.random().toString(16).substr(2, 64)}`,
      timestamp: new Date().toISOString(),
      description,
    };

    this.transactions.push(tx);
    return tx;
  }

  // Получение накопленных наград
  claimRewards(userId: string): { amount: number; tx: TokenTransaction } | null {
    const balance = this.getBalance(userId);
    
    if (balance.pendingRewards <= 0) {
      return null;
    }

    const amount = balance.pendingRewards;
    this.updateBalance(userId, {
      vod: balance.vod + amount,
      pendingRewards: 0,
    });

    const tx: TokenTransaction = {
      id: `tx-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'reward',
      tokenType: 'VOD',
      amount,
      from: 'rewards-pool',
      to: userId,
      status: 'confirmed',
      hash: `0x${Math.random().toString(16).substr(2, 64)}`,
      timestamp: new Date().toISOString(),
      description: `Claimed ${amount} VOD rewards`,
    };

    this.transactions.push(tx);
    return { amount, tx };
  }

  // Стейкинг
  stake(
    userId: string,
    poolId: string,
    amount: number
  ): { success: boolean; message: string; tx?: TokenTransaction } {
    const pool = STAKING_POOLS.find(p => p.id === poolId);
    if (!pool) {
      return { success: false, message: 'Pool not found' };
    }

    if (amount < pool.minStake) {
      return { success: false, message: `Minimum stake is ${pool.minStake} VOD` };
    }

    if (amount > pool.maxStake) {
      return { success: false, message: `Maximum stake is ${pool.maxStake} VOD` };
    }

    const balance = this.getBalance(userId);
    if (balance.vod < amount) {
      return { success: false, message: 'Insufficient balance' };
    }

    // Перевод в стейк
    this.updateBalance(userId, {
      vod: balance.vod - amount,
      staked: balance.staked + amount,
    });

    // Сохранение информации о стейке
    const userStakes = this.stakes.get(userId) || [];
    userStakes.push({
      poolId,
      amount,
      startDate: new Date().toISOString(),
    });
    this.stakes.set(userId, userStakes);

    const tx: TokenTransaction = {
      id: `tx-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'stake',
      tokenType: 'VOD',
      amount,
      from: userId,
      to: poolId,
      status: 'confirmed',
      hash: `0x${Math.random().toString(16).substr(2, 64)}`,
      timestamp: new Date().toISOString(),
      description: `Staked ${amount} VOD in ${pool.name}`,
    };

    this.transactions.push(tx);
    return { success: true, message: 'Staking successful', tx };
  }

  // Получение истории транзакций
  getTransactions(
    userId: string,
    limit: number = 20
  ): TokenTransaction[] {
    return this.transactions
      .filter(tx => tx.from === userId || tx.to === userId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }

  // Получение стейков пользователя
  getUserStakes(userId: string) {
    const userStakes = this.stakes.get(userId) || [];
    return userStakes.map(stake => {
      const pool = STAKING_POOLS.find(p => p.id === stake.poolId);
      const startDate = new Date(stake.startDate);
      const now = new Date();
      const daysPassed = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      const dailyReward = (stake.amount * (pool?.apy || 0) / 100) / 365;
      const earnedRewards = dailyReward * daysPassed;

      return {
        ...stake,
        pool,
        daysPassed,
        earnedRewards: Math.round(earnedRewards * 100) / 100,
        unlockDate: new Date(startDate.getTime() + (pool?.lockPeriod || 0) * 24 * 60 * 60 * 1000),
      };
    });
  }

  // Расчёт общей статистики
  getGlobalStats() {
    return {
      totalSupply: TOKENOMICS.TOTAL_SUPPLY,
      circulatingSupply: 250_000_000, // Примерное значение
      totalStaked: STAKING_POOLS.reduce((sum, pool) => sum + pool.totalStaked, 0),
      totalParticipants: STAKING_POOLS.reduce((sum, pool) => sum + pool.participants, 0),
      price: TOKENOMICS.EXCHANGE_RATE.VOD_USD,
      marketCap: 250_000_000 * TOKENOMICS.EXCHANGE_RATE.VOD_USD,
    };
  }
}

// Singleton instance
export const tokenService = new TokenService();

// Хелперы для расчётов
export const calculateStakingRewards = (
  amount: number,
  apy: number,
  days: number
): number => {
  return (amount * apy / 100) * (days / 365);
};

export const formatTokenAmount = (
  amount: number,
  decimals: number = 2
): string => {
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(decimals)}M`;
  }
  if (amount >= 1_000) {
    return `${(amount / 1_000).toFixed(decimals)}K`;
  }
  return amount.toFixed(decimals);
};

export const getRewardAmount = (actionType: keyof typeof TOKENOMICS.REWARDS): number => {
  return TOKENOMICS.REWARDS[actionType] || 0;
};










