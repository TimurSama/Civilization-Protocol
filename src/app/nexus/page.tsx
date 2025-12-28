"use client";

import { motion } from "framer-motion";
import {
    Zap, Gift, Users,
    Share2, MessageSquare,
    Trophy, Rocket, Star,
    ChevronRight, ArrowUpRight,
    Coins, UserPlus, TrendingUp,
    Wallet, Database, Network,
    ArrowLeftRight, Lock, BarChart3,
    Building2, Handshake, Filter
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";

export default function NexusPage() {
    const { t, isRTL } = useLanguage();
    const [activeTab, setActiveTab] = useState<'exchange' | 'staking' | 'marketplace' | 'services'>('exchange');

    const rewardCards = [
        {
            title: t("nexus.early_bird"),
            desc: "Be among the first 10,000 users to register and receive an exclusive Genesis SBT and 500 VOD tokens.",
            reward: "500 VOD + Genesis SBT",
            icon: Rocket,
            color: "text-amber-400",
            bg: "bg-amber-400/10",
            border: "border-amber-400/20"
        },
        {
            title: t("nexus.referral"),
            desc: "Invite your friends and colleagues. Get 10% of their activity rewards and a unique 'Ambassador' badge.",
            reward: "10% Lifetime Bonus",
            icon: UserPlus,
            color: "text-purple-400",
            bg: "bg-purple-400/10",
            border: "border-purple-400/20"
        },
        {
            title: t("nexus.content_mining"),
            desc: "Submit verified news, research papers, or water infrastructure data. Earn rewards for every approved publication.",
            reward: "Up to 2000 VOD / post",
            icon: Share2,
            color: "text-cyan-400",
            bg: "bg-cyan-400/10",
            border: "border-cyan-400/20"
        }
    ];

    const tasks = [
        {
            id: 1,
            title: "Uzbekistan Infrastructure Audit",
            category: "Research",
            reward: "1500 VOD",
            difficulty: "Hard",
            participants: 12,
            deadline: "15 Jan 2026"
        },
        {
            id: 2,
            title: "IoT Sensor Calibration Guide",
            category: "Technical",
            reward: "800 VOD",
            difficulty: "Medium",
            participants: 45,
            deadline: "30 Dec 2025"
        },
        {
            id: 3,
            title: "Community Outreach: India",
            category: "Social",
            reward: "1200 VOD",
            difficulty: "Easy",
            participants: 89,
            deadline: "Ongoing"
        }
    ];

    return (
        <div className={cn("min-h-screen bg-ocean-deep py-24 px-4", isRTL && "text-right")}>
            <div className="max-w-7xl mx-auto">
                {/* Hero */}
                <div className="mb-16 text-center max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-widest mb-8">
                            <Zap size={14} className="fill-current" /> {t("nav.nexus")} Exchange
                        </div>
                        <h1 className="text-6xl font-black text-white mb-6 tracking-tighter leading-none">
                            Nexus <span className="text-glow-purple">Exchange</span>
                        </h1>
                        <p className="text-xl text-slate-400 mb-8">
                            Децентрализованная инфраструктура для обмена токенов, данных, стейкинга и инвестиций
                        </p>
                        
                        {/* Tabs */}
                        <div className="flex flex-wrap justify-center gap-2">
                            {[
                                { id: 'exchange', label: 'Token Exchange', icon: ArrowLeftRight },
                                { id: 'staking', label: 'Staking & Pools', icon: Lock },
                                { id: 'marketplace', label: 'Investment', icon: TrendingUp },
                                { id: 'services', label: 'Services Hub', icon: Handshake }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as 'exchange' | 'staking' | 'marketplace' | 'services')}
                                    className={cn(
                                        "px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all flex items-center gap-2",
                                        activeTab === tab.id
                                            ? "bg-purple-500 text-white shadow-lg shadow-purple-500/20"
                                            : "glass text-slate-500 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <tab.icon size={16} />
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Tab Content */}
                {activeTab === 'exchange' && (
                    <TokenExchangeSection isRTL={isRTL} />
                )}
                {activeTab === 'staking' && (
                    <StakingSection isRTL={isRTL} />
                )}
                {activeTab === 'marketplace' && (
                    <InvestmentMarketplaceSection isRTL={isRTL} />
                )}
                {activeTab === 'services' && (
                    <ServiceHubSection isRTL={isRTL} />
                )}

                {/* Reward Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 mt-24">
                    {rewardCards.map((card, i) => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={cn("glass-card p-8 border hover:bg-white/[0.03] transition-all group", card.border)}
                        >
                            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-8", card.bg, card.color)}>
                                <card.icon size={28} />
                            </div>
                            <h3 className="text-xl font-black mb-4">{card.title}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed mb-8">
                                {card.desc}
                            </p>
                            <div className="mt-auto">
                                <div className={cn("text-[10px] font-black uppercase tracking-widest mb-2", card.color)}>Reward</div>
                                <div className="text-lg font-black text-white flex items-center gap-2">
                                    {card.reward}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Tasks & Opportunities */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Active Tasks */}
                    <div className="lg:col-span-8">
                        <div className={cn("flex justify-between items-center mb-8", isRTL && "flex-row-reverse")}>
                            <h2 className="text-3xl font-black">{t("nexus.tasks")}</h2>
                            <button className="text-sm font-bold text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2">
                                View All <ChevronRight size={16} className={cn(isRTL && "rotate-180")} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {tasks.map((task) => (
                                <div
                                    key={task.id}
                                    className={cn(
                                        "glass-card p-6 border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all flex flex-col md:flex-row items-center gap-6",
                                        isRTL && "md:flex-row-reverse"
                                    )}
                                >
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                                        <Star className="text-purple-400" size={20} />
                                    </div>
                                    <div className={cn("flex-1", isRTL && "text-right")}>
                                        <div className={cn("flex items-center gap-3 mb-1", isRTL && "flex-row-reverse")}>
                                            <span className="text-xs font-black text-slate-500 uppercase">{task.category}</span>
                                            <span className="w-1 h-1 rounded-full bg-slate-700" />
                                            <span className="text-xs font-mono text-slate-600">{task.deadline}</span>
                                        </div>
                                        <h4 className="text-lg font-bold">{task.title}</h4>
                                    </div>
                                    <div className={cn("flex items-center gap-8", isRTL && "flex-row-reverse")}>
                                        <div className="text-center">
                                            <div className="text-[10px] font-black text-slate-500 uppercase">Reward</div>
                                            <div className="text-sm font-black text-purple-400">{task.reward}</div>
                                        </div>
                                        <button className="px-6 py-2.5 bg-purple-500 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-purple-500/20">
                                            Join
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Airdrop & Stats */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="glass-card p-8 border-cyan-500/20 bg-cyan-500/[0.02] relative overflow-hidden">
                            <div className="absolute -right-12 -top-12 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full" />
                            <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                                <Coins className="text-cyan-400" /> {t("nexus.airdrop")}
                            </h3>
                            <div className="space-y-6 mb-8">
                                <div className={cn("flex justify-between items-center", isRTL && "flex-row-reverse")}>
                                    <span className="text-sm text-slate-400">Your Points</span>
                                    <span className="text-xl font-black text-white">2,450 XP</span>
                                </div>
                                <div className={cn("flex justify-between items-center", isRTL && "flex-row-reverse")}>
                                    <span className="text-sm text-slate-400">Global Rank</span>
                                    <span className="text-xl font-black text-white">#1,204</span>
                                </div>
                            </div>
                            <button className="w-full py-4 bg-cyan-500 text-ocean-deep rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-all shadow-lg shadow-cyan-500/20">
                                {t("nexus.claim")} Rewards
                            </button>
                        </div>

                        <div className="glass-card p-8 border-white/5 bg-white/[0.01]">
                            <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                                <Trophy className="text-amber-400" /> Top Contributors
                            </h3>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className={cn("flex items-center gap-4", isRTL && "flex-row-reverse")}>
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-black">
                                            {i}
                                        </div>
                                        <div className={cn("flex-1", isRTL && "text-right")}>
                                            <div className="text-sm font-bold">User_{i}452</div>
                                            <div className="text-[10px] text-slate-500 font-mono">12,400 VOD earned</div>
                                        </div>
                                        <ArrowUpRight size={14} className="text-slate-600" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Token Exchange Section
function TokenExchangeSection({ isRTL }: { isRTL: boolean }) {
    const tokenPairs = [
        { from: 'VOD', to: 'R-VOD', rate: '1:1.05', volume: '2.4M', change: '+2.3%', color: 'text-cyan-400' },
        { from: 'VOD', to: 'P-VOD', rate: '1:0.98', volume: '1.8M', change: '-1.2%', color: 'text-purple-400' },
        { from: 'R-VOD', to: 'P-VOD', rate: '1:0.93', volume: '950K', change: '+0.8%', color: 'text-emerald-400' },
    ];

    return (
        <div className="mb-16">
            <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
                <ArrowLeftRight className="text-purple-400" size={32} />
                Token & Data Exchange Layer
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {tokenPairs.map((pair, i) => (
                    <motion.div
                        key={pair.from + pair.to}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 border-white/5 hover:border-purple-500/30 transition-all"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <div className="text-lg font-black text-white mb-1">
                                    {pair.from} / {pair.to}
                                </div>
                                <div className="text-xs text-slate-500 font-mono">Курс: {pair.rate}</div>
                            </div>
                            <div className={cn("text-sm font-black", pair.color)}>
                                {pair.change}
                            </div>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-white/5">
                            <span className="text-xs text-slate-500">Объем 24ч</span>
                            <span className="text-sm font-black">{pair.volume}</span>
                        </div>
                        <button className="w-full mt-4 py-2.5 bg-purple-500/20 text-purple-400 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-purple-500/30 transition-all">
                            Обменять
                        </button>
                    </motion.div>
                ))}
            </div>

            <div className="glass-card p-8 border-purple-500/20 bg-purple-500/[0.02]">
                <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                    <Database className="text-purple-400" size={24} />
                    Data Exchange
                </h3>
                <p className="text-slate-400 mb-6">
                    Обмен верифицированными данными IoT, результатами исследований и аналитикой. Данные токенизируются и могут быть обменены на NFT-сертификаты.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-2">IoT Данные</div>
                        <div className="text-sm font-bold">2.5TB доступно</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-2">NFT Сертификаты</div>
                        <div className="text-sm font-bold">1,245 выдано</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-2">Комиссия</div>
                        <div className="text-sm font-bold">0.1-0.3%</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Staking Section
function StakingSection({ isRTL }: { isRTL: boolean }) {
    const stakingPools = [
        {
            name: 'Governance Staking',
            apy: '5-12%',
            minStake: '1,000 VOD',
            totalStaked: '450M VOD',
            description: 'Право участия в голосованиях, вес голоса пропорционален стейкингу',
            color: 'text-purple-400',
            bg: 'bg-purple-500/10'
        },
        {
            name: 'Data Access Staking',
            apy: '8-18%',
            minStake: '5,000 VOD',
            totalStaked: '280M VOD',
            description: 'Доступ к расширенным аналитическим данным и научным уровням',
            color: 'text-cyan-400',
            bg: 'bg-cyan-500/10'
        },
        {
            name: 'Project Participation',
            apy: '12-25%',
            minStake: '10,000 VOD',
            totalStaked: '190M VOD',
            description: 'Участие в конкретных проектах, приоритет в TokenHub',
            color: 'text-emerald-400',
            bg: 'bg-emerald-500/10'
        },
        {
            name: 'Impact Pool',
            apy: '15-25%',
            minStake: '50,000 VOD',
            totalStaked: '120M VOD',
            description: 'Пул для экологических проектов, награды по KPI',
            color: 'text-amber-400',
            bg: 'bg-amber-500/10'
        }
    ];

    return (
        <div className="mb-16">
            <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
                <Lock className="text-purple-400" size={32} />
                Staking & Impact Pools
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {stakingPools.map((pool, i) => (
                    <motion.div
                        key={pool.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={cn("glass-card p-6 border-2", pool.bg)}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-black">{pool.name}</h3>
                            <div className={cn("text-2xl font-black", pool.color)}>
                                {pool.apy}
                            </div>
                        </div>
                        <p className="text-sm text-slate-400 mb-6">{pool.description}</p>
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-500">Минимальный стейк</span>
                                <span className="text-sm font-black">{pool.minStake}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-500">Всего застейкано</span>
                                <span className="text-sm font-black">{pool.totalStaked}</span>
                            </div>
                        </div>
                        <button className="w-full py-3 bg-purple-500 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-purple-400 transition-all">
                            Застейкать
                        </button>
                    </motion.div>
                ))}
            </div>

            <div className="glass-card p-8 border-purple-500/20 bg-purple-500/[0.02]">
                <h3 className="text-xl font-black mb-4">Ваш стейкинг</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <div className="text-xs text-slate-500 uppercase font-black tracking-widest mb-2">Активный стейк</div>
                        <div className="text-2xl font-black text-white">125,000 VOD</div>
                    </div>
                    <div>
                        <div className="text-xs text-slate-500 uppercase font-black tracking-widest mb-2">Доходность</div>
                        <div className="text-2xl font-black text-emerald-400">+8.5% APY</div>
                    </div>
                    <div>
                        <div className="text-xs text-slate-500 uppercase font-black tracking-widest mb-2">Награды</div>
                        <div className="text-2xl font-black text-cyan-400">10,625 VOD</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Investment Marketplace Section
function InvestmentMarketplaceSection({ isRTL }: { isRTL: boolean }) {
    const investments = [
        {
            title: 'Smart Pumping Network',
            type: 'PPP-проект',
            cost: '$45M',
            irr: '18%',
            status: 'Открыт',
            progress: 15,
            sector: 'Infrastructure'
        },
        {
            title: 'Desalination 2.0',
            type: 'R&D',
            cost: '$85M',
            irr: '22%',
            status: 'Открыт',
            progress: 5,
            sector: 'Water'
        },
        {
            title: 'Carbon Credits Marketplace',
            type: 'Marketplace',
            cost: '$120M',
            irr: '15%',
            status: 'Активен',
            progress: 85,
            sector: 'Ecology'
        }
    ];

    return (
        <div className="mb-16">
            <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
                <TrendingUp className="text-purple-400" size={32} />
                Investment Marketplace
            </h2>

            <div className="space-y-6 mb-8">
                {investments.map((inv, i) => (
                    <motion.div
                        key={inv.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 border-white/5 hover:border-purple-500/30 transition-all"
                    >
                        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-xs font-black text-purple-400 uppercase tracking-widest px-3 py-1 rounded-lg bg-purple-500/10">
                                        {inv.type}
                                    </span>
                                    <span className="text-xs text-slate-500">{inv.sector}</span>
                                </div>
                                <h3 className="text-xl font-black mb-2">{inv.title}</h3>
                                <div className="flex items-center gap-6 text-sm">
                                    <div>
                                        <span className="text-slate-500">Стоимость: </span>
                                        <span className="font-black">{inv.cost}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-500">IRR: </span>
                                        <span className="font-black text-emerald-400">{inv.irr}</span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="flex justify-between text-xs mb-2">
                                        <span className="text-slate-500">Прогресс</span>
                                        <span className="font-black">{inv.progress}%</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${inv.progress}%` }}
                                            className="h-full bg-purple-500"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <button className="px-6 py-3 bg-purple-500 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-purple-400 transition-all">
                                    Инвестировать
                                </button>
                                <button className="px-6 py-3 glass border-white/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                                    Детали
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="glass-card p-8 border-purple-500/20 bg-purple-500/[0.02]">
                <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                    <BarChart3 className="text-purple-400" size={24} />
                    DAO-управляемые инвестиции
                </h3>
                <p className="text-slate-400 mb-6">
                    Инвестиционные решения принимаются через DAO-голосование. Участники могут предлагать проекты и голосовать за распределение средств из казны.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-2">P-VOD</div>
                        <div className="text-sm font-bold">Проектные токены</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-2">NFT</div>
                        <div className="text-sm font-bold">Токенизированные активы</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-2">DAO</div>
                        <div className="text-sm font-bold">Управление через голосование</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Service Hub Section
function ServiceHubSection({ isRTL }: { isRTL: boolean }) {
    const services = [
        {
            name: 'AI-аналитика',
            provider: 'Civilization Protocol AI Lab',
            price: 'От 500 VOD/мес',
            category: 'Analytics',
            description: 'Предиктивные модели и анализ данных'
        },
        {
            name: 'SCADA интеграция',
            provider: 'Civilization Protocol Infrastructure',
            price: 'По запросу',
            category: 'Integration',
            description: 'Подключение промышленных систем'
        },
        {
            name: 'Консалтинг',
            provider: 'Civilization Protocol Partners',
            price: 'От 2,000 VOD',
            category: 'Consulting',
            description: 'Экспертные консультации по водным ресурсам'
        },
        {
            name: 'Разработка решений',
            provider: 'Civilization Protocol Dev',
            price: 'По договору',
            category: 'Development',
            description: 'Кастомные решения для вашего бизнеса'
        }
    ];

    return (
        <div className="mb-16">
            <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
                <Handshake className="text-purple-400" size={32} />
                Service & Partnership Hub
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {services.map((service, i) => (
                    <motion.div
                        key={service.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 border-white/5 hover:border-purple-500/30 transition-all"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <div className="text-xs font-black text-purple-400 uppercase tracking-widest mb-2">
                                    {service.category}
                                </div>
                                <h3 className="text-xl font-black mb-2">{service.name}</h3>
                                <div className="text-sm text-slate-500">{service.provider}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-lg font-black text-white">{service.price}</div>
                            </div>
                        </div>
                        <p className="text-sm text-slate-400 mb-6">{service.description}</p>
                        <div className="flex gap-3">
                            <button className="flex-1 py-2.5 bg-purple-500 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-purple-400 transition-all">
                                Заказать
                            </button>
                            <button className="px-4 py-2.5 glass border-white/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                                Детали
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="glass-card p-8 border-purple-500/20 bg-purple-500/[0.02]">
                <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                    <Network className="text-purple-400" size={24} />
                    Партнерства
                </h3>
                <p className="text-slate-400 mb-6">
                    DAO-управляемые партнерства для совместных проектов. Предлагайте услуги, находите партнеров, создавайте консорциумы.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left">
                        <div className="text-sm font-black mb-2">Предложить услугу</div>
                        <div className="text-xs text-slate-500">Разместите вашу услугу в маркетплейсе</div>
                    </button>
                    <button className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left">
                        <div className="text-sm font-black mb-2">Найти партнера</div>
                        <div className="text-xs text-slate-500">Поиск партнеров для совместных проектов</div>
                    </button>
                </div>
            </div>
        </div>
    );
}
