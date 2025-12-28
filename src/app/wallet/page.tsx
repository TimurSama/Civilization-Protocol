"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet, ArrowUpRight, ArrowDownLeft, Gift, History, Coins, CreditCard,
  ArrowLeftRight, X, Search, CheckCircle2, AlertCircle, Copy, Check,
  Lock, TrendingUp, Percent, Clock, QrCode, ExternalLink, Shield,
  ChevronRight, Zap, Target, Award, Loader2, RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useTransactions } from "@/hooks/useApi";
import Link from "next/link";
import BuyTokenWidget from "@/components/BuyTokenWidget";

interface TokenBalance {
  name: string;
  fullName: string;
  amount: number;
  usd: number;
  color: string;
  bg: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  change: string;
  staked?: boolean;
}

interface StakingPool {
  id: string;
  name: string;
  apy: number;
  staked: number;
  rewards: number;
  duration: string;
  status: 'active' | 'locked';
}

interface Transaction {
  id: string;
  type: string;
  amount: number;
  tokenType: string;
  date: string;
  status: 'confirmed' | 'pending' | 'failed';
  hash?: string;
}

// Демо-данные стейкинга
const demoStakingPools: StakingPool[] = [
  { id: "1", name: "Governance Pool", apy: 12, staked: 5000, rewards: 125, duration: "90 дней", status: "active" },
  { id: "2", name: "Data Access Pool", apy: 8, staked: 2000, rewards: 48, duration: "30 дней", status: "active" },
  { id: "3", name: "Project Pool", apy: 18, staked: 1500, rewards: 67, duration: "180 дней", status: "locked" },
];

// Демо-награды
const demoPendingRewards = [
  { source: "Стейкинг Governance", amount: 125, claimable: true },
  { source: "Миссии", amount: 45, claimable: true },
  { source: "Реферальная программа", amount: 30, claimable: false, note: "Доступно через 2 дня" },
];

// Демо-транзакции
const demoTransactions: Transaction[] = [
  { id: "1", type: "Награда DAO", amount: 150, tokenType: "VOD", date: new Date(Date.now() - 30 * 60000).toISOString(), status: "confirmed", hash: "0x1a2b...3c4d" },
  { id: "2", type: "Стейкинг", amount: -2000, tokenType: "VOD", date: new Date(Date.now() - 2 * 3600000).toISOString(), status: "confirmed", hash: "0x5e6f...7g8h" },
  { id: "3", type: "Получение", amount: 500, tokenType: "VOD", date: new Date(Date.now() - 86400000).toISOString(), status: "confirmed", hash: "0x9i0j...1k2l" },
  { id: "4", type: "Отправка", amount: -100, tokenType: "VOD", date: new Date(Date.now() - 2 * 86400000).toISOString(), status: "confirmed", hash: "0x3m4n...5o6p" },
  { id: "5", type: "Реферальный бонус", amount: 50, tokenType: "VOD", date: new Date(Date.now() - 3 * 86400000).toISOString(), status: "confirmed", hash: "0x7q8r...9s0t" },
];

export default function WalletPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { getTransactions, transfer, loading: txLoading } = useTransactions();
  
  const [activeTab, setActiveTab] = useState("overview");
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);
  const [sendStep, setSendStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  // Send form
  const [sendAddress, setSendAddress] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [sendToken, setSendToken] = useState('VOD');
  const [sendSuccess, setSendSuccess] = useState(false);

  const loadTransactions = useCallback(async () => {
    try {
      const result = await getTransactions();
      if (result && result.transactions && result.transactions.length > 0) {
        setTransactions(result.transactions);
      } else {
        setTransactions(demoTransactions);
      }
    } catch (error) {
      console.error('Error loading transactions:', error);
      setTransactions(demoTransactions);
    } finally {
      setLoading(false);
    }
  }, [getTransactions]);

  useEffect(() => {
    if (isAuthenticated) {
      loadTransactions();
    }
  }, [isAuthenticated, loadTransactions]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadTransactions();
    setRefreshing(false);
  };

  // Get balances from user data
  const vodBalance = user?.vodBalance || 100;
  const stakedAmount = user?.stakedAmount || 0;
  
  const balances: TokenBalance[] = [
    { name: "VOD", fullName: "VOD Token", amount: vodBalance, usd: vodBalance, color: "text-cyan-400", bg: "bg-cyan-500/10", icon: Coins, change: "+5.2%" },
    { name: "R-VOD", fullName: "Resource VOD (Staked)", amount: stakedAmount, usd: stakedAmount, color: "text-purple-400", bg: "bg-purple-500/10", icon: Lock, change: "+2.8%", staked: true },
    { name: "P-VOD", fullName: "Project VOD", amount: 0, usd: 0, color: "text-green-400", bg: "bg-green-500/10", icon: Target, change: "0%" },
  ];

  const totalBalance = balances.reduce((acc, b) => acc + b.usd, 0);

  const copyAddress = () => {
    const address = user?.walletAddress || "0x71C7a5E22B8c3942...3E8F";
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = async () => {
    if (!sendAddress.trim() || !sendAmount.trim()) return;
    
    setSending(true);
    const result = await transfer(sendAddress, parseFloat(sendAmount), sendToken);
    
    if (result) {
      setSendSuccess(true);
      setTimeout(() => {
        setIsSendModalOpen(false);
        setSendSuccess(false);
        setSendStep(1);
        setSendAddress('');
        setSendAmount('');
        loadTransactions();
      }, 2000);
    }
    setSending(false);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 60) return `${diffMins} мин назад`;
    if (diffHours < 24) return `${diffHours} ч. назад`;
    if (diffDays < 7) return `${diffDays} дн. назад`;
    return date.toLocaleDateString('ru-RU');
  };

  const getTransactionIcon = (type: string) => {
    if (type.includes('Награда') || type.includes('DAO')) return Award;
    if (type.includes('Стейкинг')) return Lock;
    if (type.includes('Получение')) return ArrowDownLeft;
    if (type.includes('Отправка')) return ArrowUpRight;
    if (type.includes('Реферал')) return Gift;
    if (type.includes('Обмен')) return ArrowLeftRight;
    return Coins;
  };

  const getTransactionColor = (amount: number) => {
    return amount > 0 ? 'text-green-400' : 'text-red-400';
  };

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={48} className="animate-spin text-cyan-400" />
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 mx-auto mb-8 flex items-center justify-center shadow-2xl shadow-cyan-500/20">
            <Wallet className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-black mb-4">Кошелёк VODeco</h1>
          <p className="text-slate-400 mb-8">Войдите в аккаунт для доступа к кошельку</p>
          <Link
            href="/"
            className="block w-full py-4 bg-cyan-glow text-ocean-deep font-bold rounded-xl hover:scale-105 transition-transform text-center"
          >
            Войти / Регистрация
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black mb-2">Кошелёк</h1>
            <p className="text-slate-400">Управление вашими активами VODeco</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-3 glass rounded-xl hover:bg-white/10 transition-colors"
            >
              <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
            </button>
            <div className="glass-card px-3 py-2 flex items-center gap-2">
              <span className="text-slate-400 text-sm hidden sm:inline">Адрес:</span>
              <code className="text-cyan-glow font-mono text-sm">
                {user?.walletAddress?.slice(0, 6) || '0x71C7'}...{user?.walletAddress?.slice(-4) || '3E8F'}
              </code>
              <button onClick={copyAddress} className="p-1 hover:bg-white/10 rounded transition-colors">
                {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
              </button>
            </div>
            <button className="p-3 glass rounded-xl hover:bg-white/10 transition-colors">
              <QrCode size={20} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Total Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6 md:p-8 mb-8 bg-gradient-to-r from-cyan-glow/10 via-transparent to-purple-500/10 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-glow/10 rounded-full blur-[100px]" />
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-slate-400 mb-2">Общий баланс</p>
            <div className="text-4xl md:text-5xl font-black mb-2">{totalBalance.toLocaleString()} VOD</div>
            <div className="flex items-center gap-2 text-green-400">
              <TrendingUp size={16} />
              <span className="font-bold">+{Math.floor(totalBalance * 0.078)} VOD (7.8%)</span>
              <span className="text-slate-500 text-sm">за 30 дней</span>
            </div>
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            <button
              onClick={() => { setIsSendModalOpen(true); setSendStep(1); }}
              className="px-5 py-3 bg-cyan-glow text-ocean-deep font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2"
            >
              <ArrowUpRight size={18} /> Отправить
            </button>
            <button
              onClick={() => setIsReceiveModalOpen(true)}
              className="px-5 py-3 glass rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <ArrowDownLeft size={18} /> Получить
            </button>
            <Link href="/nexus" className="px-5 py-3 glass rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2">
              <ArrowLeftRight size={18} /> Обменять
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {[
          { id: "overview", label: "Обзор", icon: Wallet },
          { id: "staking", label: "Стейкинг", icon: Lock },
          { id: "history", label: "История", icon: History },
          { id: "rewards", label: "Награды", icon: Gift },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2 md:px-5 md:py-3 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all text-sm",
              activeTab === tab.id
                ? "bg-cyan-glow text-ocean-deep font-bold"
                : "glass hover:bg-white/10"
            )}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === "overview" && (
            <>
              {/* Token Balances */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <h3 className="font-bold text-lg">Токены</h3>
                {balances.map((balance, i) => (
                  <div key={i} className="glass-card p-4 md:p-5 flex items-center gap-4 hover:border-cyan-glow/30 transition-colors">
                    <div className={cn("w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center", balance.bg, balance.color)}>
                      <balance.icon size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold">{balance.name}</span>
                        <span className="text-xs text-slate-500 hidden sm:inline">{balance.fullName}</span>
                        {balance.staked && (
                          <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded-full">Staked</span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500">≈ ${balance.usd.toLocaleString()}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{balance.amount.toLocaleString()}</div>
                      <div className="text-xs text-green-400">{balance.change}</div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Recent Activity */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">Последние транзакции</h3>
                  <button onClick={() => setActiveTab("history")} className="text-sm text-cyan-glow hover:underline">
                    Все транзакции
                  </button>
                </div>
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 size={24} className="animate-spin text-cyan-400" />
                  </div>
                ) : (
                  <div className="space-y-3">
                    {transactions.slice(0, 4).map((tx) => {
                      const Icon = getTransactionIcon(tx.type);
                      const color = getTransactionColor(tx.amount);
                      return (
                        <div key={tx.id} className="glass-card p-4 flex items-center gap-4 hover:bg-white/5 transition-colors">
                          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center bg-white/5", color)}>
                            <Icon size={18} />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{tx.type}</div>
                            <div className="text-xs text-slate-500">{formatDate(tx.date)}</div>
                          </div>
                          <div className={cn("font-bold", color)}>
                            {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()} {tx.tokenType}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === "staking" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="glass-card p-6 bg-gradient-to-r from-purple-500/10 to-transparent">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">Общий стейк</h3>
                  <span className="text-2xl font-black text-purple-400">{stakedAmount.toLocaleString()} VOD</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 bg-white/5 rounded-xl text-center">
                    <div className="text-lg font-bold text-green-400">+{Math.floor(stakedAmount * 0.03)} VOD</div>
                    <div className="text-xs text-slate-500">Заработано</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl text-center">
                    <div className="text-lg font-bold">12.5%</div>
                    <div className="text-xs text-slate-500">Средний APY</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl text-center">
                    <div className="text-lg font-bold">{demoStakingPools.length}</div>
                    <div className="text-xs text-slate-500">Активных пулов</div>
                  </div>
                </div>
              </div>

              <h3 className="font-bold text-lg">Пулы стейкинга</h3>
              {demoStakingPools.map((pool) => (
                <div key={pool.id} className="glass-card p-5 hover:border-purple-500/30 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-bold">{pool.name}</div>
                      <div className="text-xs text-slate-500">Срок: {pool.duration}</div>
                    </div>
                    <span className={cn("px-3 py-1 rounded-full text-xs font-bold",
                      pool.status === "active" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                    )}>
                      {pool.status === "active" ? "Активен" : "Заблокирован"}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Застейкано</div>
                      <div className="font-bold">{pool.staked.toLocaleString()} VOD</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">APY</div>
                      <div className="font-bold text-green-400">{pool.apy}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Награды</div>
                      <div className="font-bold text-cyan-glow">+{pool.rewards} VOD</div>
                    </div>
                  </div>
                </div>
              ))}

              <button className="w-full py-4 glass rounded-xl hover:bg-white/10 transition-colors font-bold flex items-center justify-center gap-2">
                <Lock size={18} /> Добавить стейк
              </button>
            </motion.div>
          )}

          {activeTab === "history" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                <div className="flex-1 relative min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="text"
                    placeholder="Поиск транзакций..."
                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-glow/50 focus:outline-none"
                  />
                </div>
                <select className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none">
                  <option>Все типы</option>
                  <option>Отправка</option>
                  <option>Получение</option>
                  <option>Стейкинг</option>
                </select>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 size={32} className="animate-spin text-cyan-400" />
                </div>
              ) : (
                <>
                  {transactions.map((tx) => {
                    const Icon = getTransactionIcon(tx.type);
                    const color = getTransactionColor(tx.amount);
                    return (
                      <div key={tx.id} className="glass-card p-5 flex items-center gap-4 hover:bg-white/5 transition-colors">
                        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center bg-white/5", color)}>
                          <Icon size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold">{tx.type}</div>
                          <div className="text-xs text-slate-500">{formatDate(tx.date)}</div>
                          {tx.hash && (
                            <div className="text-xs text-slate-600 font-mono">{tx.hash}</div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className={cn("font-bold", color)}>
                            {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()} {tx.tokenType}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-green-400">
                            <CheckCircle2 size={12} /> Подтверждено
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <button className="w-full py-3 glass rounded-xl hover:bg-white/10 transition-colors text-sm">
                    Загрузить ещё
                  </button>
                </>
              )}
            </motion.div>
          )}

          {activeTab === "rewards" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="glass-card p-6 bg-gradient-to-r from-yellow-500/10 to-transparent">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">Доступные награды</h3>
                  <span className="text-2xl font-black text-yellow-400">
                    +{demoPendingRewards.filter(r => r.claimable).reduce((acc, r) => acc + r.amount, 0)} VOD
                  </span>
                </div>
                <button className="w-full py-3 bg-yellow-500 text-ocean-deep font-bold rounded-xl hover:bg-yellow-400 transition-colors">
                  Забрать все награды
                </button>
              </div>

              <h3 className="font-bold text-lg">Ожидающие награды</h3>
              {demoPendingRewards.map((reward, i) => (
                <div key={i} className="glass-card p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                    <Gift size={20} className="text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{reward.source}</div>
                    {reward.note && (
                      <div className="text-xs text-slate-500">{reward.note}</div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-yellow-400">+{reward.amount} VOD</div>
                    {reward.claimable ? (
                      <button className="text-xs text-cyan-glow hover:underline">Забрать</button>
                    ) : (
                      <span className="text-xs text-slate-500">Ожидание</span>
                    )}
                  </div>
                </div>
              ))}

              <Link href="/rewards" className="block w-full py-3 glass rounded-xl hover:bg-white/10 transition-colors font-bold text-center">
                Все награды и миссии
              </Link>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6"
          >
            <h3 className="font-bold mb-4">Быстрая статистика</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Уровень</span>
                <span className="font-bold">{user?.level || 1}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">XP</span>
                <span className="font-bold">{user?.xp?.toLocaleString() || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Репутация</span>
                <span className="font-bold text-emerald-400">{user?.reputation || 50}/100</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Транзакций</span>
                <span className="font-bold">{transactions.length}</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <h3 className="font-bold mb-4">Быстрые действия</h3>
            <div className="space-y-3">
              <Link href="/tokenhub" className="block w-full py-3 glass rounded-xl hover:bg-white/10 transition-colors text-center text-sm">
                Инвестировать в проекты
              </Link>
              <Link href="/dao" className="block w-full py-3 glass rounded-xl hover:bg-white/10 transition-colors text-center text-sm">
                Участвовать в DAO
              </Link>
              <Link href="/missions" className="block w-full py-3 glass rounded-xl hover:bg-white/10 transition-colors text-center text-sm">
                Выполнять миссии
              </Link>
            </div>
          </motion.div>

          {/* Pioneer Badge */}
          {user?.isPioneer && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20"
            >
              <div className="flex items-center gap-3 mb-3">
                <Award className="text-yellow-400" size={24} />
                <span className="font-bold text-yellow-400">Pioneer Badge</span>
              </div>
              <p className="text-sm text-slate-400">
                Вы один из первых участников VODeco! Бонус +20% к наградам за активность.
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Send Modal */}
      <AnimatePresence>
        {isSendModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsSendModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-gradient-to-br from-ocean-medium to-ocean-deep rounded-2xl border border-ocean-light/30 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h3 className="text-xl font-black">Отправить токены</h3>
                <button onClick={() => setIsSendModalOpen(false)} className="p-2 hover:bg-white/10 rounded-lg">
                  <X size={20} />
                </button>
              </div>
              
              {sendSuccess ? (
                <div className="p-8 text-center">
                  <CheckCircle2 size={64} className="mx-auto mb-4 text-green-400" />
                  <h4 className="text-xl font-bold mb-2">Отправлено!</h4>
                  <p className="text-slate-400">Транзакция успешно создана</p>
                </div>
              ) : sendStep === 1 ? (
                <div className="p-6 space-y-4">
                  <div>
                    <label className="text-xs text-slate-500 uppercase tracking-widest mb-2 block">Токен</label>
                    <select
                      value={sendToken}
                      onChange={(e) => setSendToken(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-500/50 outline-none"
                    >
                      <option value="VOD">VOD ({vodBalance.toLocaleString()} доступно)</option>
                      <option value="P-VOD">P-VOD (0 доступно)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-xs text-slate-500 uppercase tracking-widest mb-2 block">Адрес получателя</label>
                    <input
                      type="text"
                      value={sendAddress}
                      onChange={(e) => setSendAddress(e.target.value)}
                      placeholder="0x..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-500/50 outline-none font-mono"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs text-slate-500 uppercase tracking-widest mb-2 block">Сумма</label>
                    <input
                      type="number"
                      value={sendAmount}
                      onChange={(e) => setSendAmount(e.target.value)}
                      placeholder="0"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-500/50 outline-none"
                    />
                  </div>
                  
                  <button
                    onClick={() => setSendStep(2)}
                    disabled={!sendAddress.trim() || !sendAmount.trim()}
                    className="w-full py-3 bg-cyan-500 text-ocean-deep rounded-xl font-bold hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Продолжить
                  </button>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  <div className="p-4 rounded-xl bg-white/5 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Получатель</span>
                      <span className="font-mono text-sm">{sendAddress.slice(0, 10)}...{sendAddress.slice(-4)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Сумма</span>
                      <span className="font-bold">{sendAmount} {sendToken}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Комиссия</span>
                      <span className="text-slate-500">~0.01 VOD</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSendStep(1)}
                      className="flex-1 py-3 glass border-white/10 rounded-xl font-bold hover:bg-white/5"
                    >
                      Назад
                    </button>
                    <button
                      onClick={handleSend}
                      disabled={sending}
                      className="flex-1 py-3 bg-cyan-500 text-ocean-deep rounded-xl font-bold hover:bg-cyan-400 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {sending ? <Loader2 size={18} className="animate-spin" /> : <ArrowUpRight size={18} />}
                      Отправить
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Receive Modal */}
      <AnimatePresence>
        {isReceiveModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsReceiveModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm bg-gradient-to-br from-ocean-medium to-ocean-deep rounded-2xl border border-ocean-light/30 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h3 className="text-xl font-black">Получить токены</h3>
                <button onClick={() => setIsReceiveModalOpen(false)} className="p-2 hover:bg-white/10 rounded-lg">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 text-center">
                <div className="w-48 h-48 mx-auto mb-6 bg-white rounded-xl flex items-center justify-center">
                  <QrCode size={120} className="text-ocean-deep" />
                </div>
                
                <p className="text-slate-400 text-sm mb-4">Ваш адрес кошелька</p>
                <div className="flex items-center gap-2 justify-center p-3 rounded-xl bg-white/5">
                  <code className="text-cyan-glow font-mono text-sm break-all">
                    {user?.walletAddress || "0x71C7a5E22B8c3942...3E8F"}
                  </code>
                  <button onClick={copyAddress} className="p-1 hover:bg-white/10 rounded shrink-0">
                    {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
