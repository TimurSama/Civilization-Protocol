"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gift, Star, Trophy, Users, Target, Zap, Coins, Award, Crown,
  TrendingUp, Clock, CheckCircle2, Share2, Copy, Check, ChevronRight,
  Flame, Medal, Sparkles, Heart, MessageSquare, FileText, Shield,
  UserPlus, Link2, Twitter, Send, Globe, Lock, Loader2, RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useRewards } from "@/hooks/useApi";
import Link from "next/link";

// Social Mining Tasks
const demoSocialMiningTasks = [
  { id: "1", title: "Ежедневный вход", reward: 5, type: "daily", icon: Clock, completed: true, streak: 15 },
  { id: "2", title: "Отправить отчёт о воде", reward: 150, type: "report", icon: FileText, completed: false, progress: 0 },
  { id: "3", title: "Проголосовать в DAO", reward: 20, type: "vote", icon: Shield, completed: true },
  { id: "4", title: "Написать пост", reward: 25, type: "social", icon: MessageSquare, completed: false, progress: 0 },
  { id: "5", title: "Прокомментировать 5 постов", reward: 15, type: "social", icon: Heart, completed: false, progress: 3, max: 5 },
  { id: "6", title: "Пригласить друга", reward: 50, type: "referral", icon: UserPlus, completed: false, progress: 0 },
];

// Weekly Challenges
const demoWeeklyChallenges = [
  { id: "w1", title: "Водный страж", desc: "Отправьте 7 отчётов за неделю", reward: 500, progress: 4, max: 7, icon: Shield },
  { id: "w2", title: "Голос народа", desc: "Проголосуйте в 5 предложениях DAO", reward: 300, progress: 3, max: 5, icon: Trophy },
  { id: "w3", title: "Социальная бабочка", desc: "Получите 50 лайков на постах", reward: 200, progress: 32, max: 50, icon: Heart },
];

// Achievements / Badges
const demoAchievements = [
  { id: "a1", name: "Pioneer", desc: "Первые 1000 пользователей", icon: Star, rarity: "legendary", earned: true, holders: 847 },
  { id: "a2", name: "First Drop", desc: "Первый пост в сообществе", icon: MessageSquare, rarity: "common", earned: true, holders: 5234 },
  { id: "a3", name: "Scientist", desc: "10 отчётов о качестве воды", icon: Target, rarity: "rare", earned: true, holders: 1456 },
  { id: "a4", name: "Democrat", desc: "50 голосований в DAO", icon: Shield, rarity: "epic", earned: false, holders: 324 },
  { id: "a5", name: "Influencer", desc: "100 подписчиков", icon: Users, rarity: "rare", earned: false, holders: 892 },
  { id: "a6", name: "Staker", desc: "Первый стейк токенов", icon: Lock, rarity: "common", earned: true, holders: 3421 },
  { id: "a7", name: "Ambassador", desc: "10 приглашённых друзей", icon: Crown, rarity: "epic", earned: false, holders: 156 },
  { id: "a8", name: "Whale", desc: "100,000+ VOD", icon: Coins, rarity: "legendary", earned: false, holders: 45 },
];

// Levels
const levels = [
  { level: 1, name: "Новичок", xp: 0, rewards: "Базовый доступ" },
  { level: 5, name: "Исследователь", xp: 5000, rewards: "+5% к наградам" },
  { level: 10, name: "Активист", xp: 15000, rewards: "+10% к наградам, Badge" },
  { level: 15, name: "Эксперт", xp: 35000, rewards: "+15% к наградам, Приоритет" },
  { level: 20, name: "Мастер", xp: 75000, rewards: "+20% к наградам, NFT" },
  { level: 25, name: "Легенда", xp: 150000, rewards: "+25% к наградам, Совет DAO" },
];

// Leaderboard
const demoLeaderboard = [
  { rank: 1, name: "WaterMaster", xp: 156000, level: 25, badge: "🏆" },
  { rank: 2, name: "EcoWarrior", xp: 134500, level: 24, badge: "🥈" },
  { rank: 3, name: "DataHunter", xp: 128900, level: 23, badge: "🥉" },
  { rank: 4, name: "BlueGuardian", xp: 98700, level: 20 },
  { rank: 5, name: "AquaScientist", xp: 87600, level: 19 },
];

export default function RewardsPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { getRewards, claimReward, loading: apiLoading } = useRewards();
  
  const [activeTab, setActiveTab] = useState("mining");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState(demoSocialMiningTasks);
  const [claiming, setClaiming] = useState<string | null>(null);

  const loadRewards = useCallback(async () => {
    try {
      const result = await getRewards();
      if (result && result.rewards) {
        // Merge with demo data
        setTasks(demoSocialMiningTasks);
      }
    } catch (error) {
      console.error('Error loading rewards:', error);
    } finally {
      setLoading(false);
    }
  }, [getRewards]);

  useEffect(() => {
    loadRewards();
  }, [loadRewards]);

  const handleClaimReward = async (rewardId: string) => {
    setClaiming(rewardId);
    const result = await claimReward(rewardId);
    if (result) {
      setTasks(prev => prev.map(t => 
        t.id === rewardId ? { ...t, completed: true } : t
      ));
    }
    setClaiming(null);
  };

  // User stats
  const currentXP = user?.xp || 0;
  const currentLevel = user?.level || 1;
  const nextLevel = levels.find(l => l.level > currentLevel) || levels[levels.length - 1];
  const prevLevel = levels.filter(l => l.level <= currentLevel).pop() || levels[0];
  const progress = nextLevel.level > currentLevel 
    ? ((currentXP - prevLevel.xp) / (nextLevel.xp - prevLevel.xp)) * 100 
    : 100;

  const copyReferral = () => {
    const refCode = user?.referralCode || 'PIONEER';
    navigator.clipboard.writeText(`https://vodeco.app/ref/${refCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const rarityColors: Record<string, any> = {
    common: { bg: "bg-slate-500/20", text: "text-slate-400", border: "border-slate-500/30" },
    rare: { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/30" },
    epic: { bg: "bg-purple-500/20", text: "text-purple-400", border: "border-purple-500/30" },
    legendary: { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/30" },
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
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-yellow-500 to-orange-600 mx-auto mb-8 flex items-center justify-center shadow-2xl shadow-yellow-500/20">
            <Gift className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-black mb-4">Награды и достижения</h1>
          <p className="text-slate-400 mb-8">Войдите в аккаунт для доступа к наградам</p>
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

  const userLeaderboardEntry = {
    rank: 847,
    name: `${user?.name || 'Вы'}`,
    xp: currentXP,
    level: currentLevel,
    isUser: true,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-black mb-2">Награды и достижения</h1>
        <p className="text-slate-400">Зарабатывайте VOD за активное участие в экосистеме</p>
      </motion.div>

      {/* Level Progress Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6 md:p-8 mb-8 bg-gradient-to-r from-purple-500/10 via-transparent to-cyan-500/10 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-3xl font-black shadow-2xl">
                {currentLevel}
              </div>
              <div className="absolute -bottom-2 -right-2 px-2 py-1 bg-purple-500 rounded-lg text-xs font-bold">
                Lv.{currentLevel}
              </div>
            </div>
            <div>
              <div className="text-2xl font-black mb-1">{currentXP.toLocaleString()} XP</div>
              <div className="text-slate-400">
                До уровня {nextLevel.level}: {(nextLevel.xp - currentXP).toLocaleString()} XP
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-slate-400">Уровень {currentLevel}</span>
              <span className="text-cyan-glow">Уровень {nextLevel.level}</span>
            </div>
            <div className="h-3 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
              />
            </div>
            <div className="text-xs text-slate-500 mt-2">
              Бонус за уровень: {nextLevel.rewards}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {[
          { id: "mining", label: "Social Mining", icon: Zap },
          { id: "achievements", label: "Достижения", icon: Trophy },
          { id: "referral", label: "Рефералы", icon: Users },
          { id: "leaderboard", label: "Рейтинг", icon: Crown },
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
      <AnimatePresence mode="wait">
        {activeTab === "mining" && (
          <motion.div
            key="mining"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid lg:grid-cols-3 gap-8"
          >
            {/* Daily Tasks */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                  <Clock className="text-cyan-400" /> Ежедневные задания
                </h3>
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="glass-card p-4 md:p-5 flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center",
                        task.completed ? "bg-green-500/20 text-green-400" : "bg-white/5 text-slate-400"
                      )}>
                        <task.icon size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{task.title}</span>
                          {task.streak && task.streak > 1 && (
                            <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 text-xs rounded-full flex items-center gap-1">
                              <Flame size={10} /> {task.streak} дней
                            </span>
                          )}
                        </div>
                        {task.max && (
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-cyan-500 rounded-full"
                                style={{ width: `${(task.progress || 0) / task.max * 100}%` }}
                              />
                            </div>
                            <span className="text-xs text-slate-500">{task.progress}/{task.max}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-cyan-400">+{task.reward} VOD</div>
                        {task.completed ? (
                          <span className="text-xs text-green-400 flex items-center gap-1 justify-end">
                            <CheckCircle2 size={12} /> Выполнено
                          </span>
                        ) : (
                          <button
                            onClick={() => handleClaimReward(task.id)}
                            disabled={claiming === task.id || (task.max !== undefined && task.max > 0 && (task.progress || 0) < task.max)}
                            className="text-xs text-cyan-glow hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {claiming === task.id ? <Loader2 size={12} className="animate-spin" /> : 'Забрать'}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Challenges */}
              <div>
                <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                  <Target className="text-purple-400" /> Недельные челленджи
                </h3>
                <div className="space-y-4">
                  {demoWeeklyChallenges.map((challenge) => (
                    <div key={challenge.id} className="glass-card p-5 hover:border-purple-500/30 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                          <challenge.icon size={24} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold">{challenge.title}</span>
                            <span className="text-purple-400 font-bold">+{challenge.reward} VOD</span>
                          </div>
                          <p className="text-sm text-slate-500 mb-3">{challenge.desc}</p>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${(challenge.progress / challenge.max) * 100}%` }}
                                className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                              />
                            </div>
                            <span className="text-sm font-bold">{challenge.progress}/{challenge.max}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h3 className="font-bold mb-4">Статистика</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Заработано сегодня</span>
                    <span className="font-bold text-green-400">+{tasks.filter(t => t.completed).reduce((acc, t) => acc + t.reward, 0)} VOD</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Заработано за неделю</span>
                    <span className="font-bold text-cyan-400">+1,250 VOD</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Серия входов</span>
                    <span className="font-bold flex items-center gap-1">
                      <Flame size={14} className="text-orange-400" /> 15 дней
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Множитель</span>
                    <span className="font-bold text-purple-400">x1.5</span>
                  </div>
                </div>
              </div>

              {user?.isPioneer && (
                <div className="glass-card p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Star className="text-yellow-400" size={24} />
                    <span className="font-bold text-yellow-400">Pioneer Bonus</span>
                  </div>
                  <p className="text-sm text-slate-400">
                    +20% ко всем наградам за активность как ранний участник!
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === "achievements" && (
          <motion.div
            key="achievements"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {demoAchievements.map((achievement, i) => {
                const colors = rarityColors[achievement.rarity];
                return (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className={cn(
                      "glass-card p-5 border transition-all hover:scale-105",
                      colors.border,
                      !achievement.earned && "opacity-50"
                    )}
                  >
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-3", colors.bg, colors.text)}>
                      <achievement.icon size={24} />
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold">{achievement.name}</span>
                      {achievement.earned && <CheckCircle2 size={14} className="text-green-400" />}
                    </div>
                    <p className="text-xs text-slate-500 mb-3">{achievement.desc}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className={cn("px-2 py-0.5 rounded capitalize", colors.bg, colors.text)}>
                        {achievement.rarity}
                      </span>
                      <span className="text-slate-500">{achievement.holders} владельцев</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {activeTab === "referral" && (
          <motion.div
            key="referral"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2 space-y-6">
              {/* Referral Link */}
              <div className="glass-card p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10">
                <h3 className="text-xl font-black mb-4">Ваша реферальная ссылка</h3>
                <div className="flex gap-3 mb-4">
                  <input
                    type="text"
                    readOnly
                    value={`https://vodeco.app/ref/${user?.referralCode || 'PIONEER'}`}
                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 font-mono text-sm"
                  />
                  <button
                    onClick={copyReferral}
                    className="px-6 py-3 bg-cyan-500 text-ocean-deep rounded-xl font-bold hover:bg-cyan-400 transition-colors flex items-center gap-2"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                    {copied ? 'Скопировано' : 'Копировать'}
                  </button>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 py-2 glass rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-sm">
                    <Twitter size={16} /> Twitter
                  </button>
                  <button className="flex-1 py-2 glass rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-sm">
                    <Send size={16} /> Telegram
                  </button>
                  <button className="flex-1 py-2 glass rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-sm">
                    <Share2 size={16} /> Поделиться
                  </button>
                </div>
              </div>

              {/* Referral Tiers */}
              <div className="glass-card p-6">
                <h3 className="text-xl font-black mb-4">Уровни вознаграждений</h3>
                <div className="space-y-4">
                  {[
                    { level: 1, rate: "10%", desc: "От активности ваших прямых рефералов" },
                    { level: 2, rate: "5%", desc: "От активности рефералов 2-го уровня" },
                    { level: 3, rate: "2%", desc: "От активности рефералов 3-го уровня" },
                  ].map((tier) => (
                    <div key={tier.level} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">
                        L{tier.level}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold">{tier.rate} от наград</div>
                        <div className="text-xs text-slate-500">{tier.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h3 className="font-bold mb-4">Статистика рефералов</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/[0.02] text-center">
                    <div className="text-3xl font-black text-cyan-400">0</div>
                    <div className="text-xs text-slate-500">Приглашено</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] text-center">
                    <div className="text-3xl font-black text-emerald-400">0</div>
                    <div className="text-xs text-slate-500">Активных</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] text-center">
                    <div className="text-3xl font-black text-purple-400">0 VOD</div>
                    <div className="text-xs text-slate-500">Заработано</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "leaderboard" && (
          <motion.div
            key="leaderboard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="glass-card overflow-hidden">
              <div className="p-6 border-b border-white/5">
                <h3 className="text-xl font-black">Глобальный рейтинг</h3>
              </div>
              <div className="divide-y divide-white/5">
                {[...demoLeaderboard, userLeaderboardEntry].map((entry, i) => (
                  <div 
                    key={entry.rank}
                    className={cn(
                      "flex items-center gap-4 p-4 md:p-6 transition-colors",
                      entry.isUser ? "bg-cyan-500/10" : "hover:bg-white/[0.02]"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center font-bold text-lg",
                      entry.rank === 1 ? "bg-yellow-500/20 text-yellow-400" :
                      entry.rank === 2 ? "bg-slate-400/20 text-slate-400" :
                      entry.rank === 3 ? "bg-orange-500/20 text-orange-400" :
                      "bg-white/5 text-slate-500"
                    )}>
                      {(entry as { badge?: string; rank: number }).badge || `#${entry.rank}`}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold truncate">{entry.name}</span>
                        {(entry as { isUser?: boolean }).isUser && (
                          <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-xs rounded-full">Вы</span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500">Уровень {entry.level}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-cyan-400">{entry.xp.toLocaleString()} XP</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
