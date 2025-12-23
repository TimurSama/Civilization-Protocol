"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Vote, MessageSquare, TrendingUp, Users, Clock, CheckCircle2, AlertCircle, ChevronRight, Wallet } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Proposal {
    id: string;
    title: string;
    desc: string;
    status: "active" | "passed" | "rejected" | "pending";
    votesFor: number;
    votesAgainst: number;
    endTime: string;
    category: "Infrastructure" | "Economic" | "Ecological" | "Integration" | "Science" | "Technology" | "Partnership" | "Education" | "Governance";
    author: string;
}

export default function GovernancePage() {
    const [activeTab, setActiveTab] = useState<"active" | "all" | "history">("active");
    const [categoryFilter, setCategoryFilter] = useState<string>("all");
    const [sortBy, setSortBy] = useState<"newest" | "votes" | "ending">("newest");

    const categories = ["all", "Infrastructure", "Economic", "Ecological", "Integration", "Science", "Technology", "Partnership", "Education", "Governance"];
    
    const proposals: Proposal[] = [
        {
            id: "VOD-124",
            title: "Модернизация очистных сооружений в Бухаре",
            desc: "Предложение по замене старых фильтров на новые мембранные системы с IoT-датчиками для снижения энергопотребления на 15%.",
            status: "active",
            votesFor: 125400,
            votesAgainst: 12000,
            endTime: "2 дня",
            category: "Infrastructure",
            author: "Alex_Guardian"
        },
        {
            id: "VOD-123",
            title: "Введение регионального коэффициента для Азии",
            desc: "Корректировка стоимости VOD токена в азиатском регионе с учетом текущих экологических показателей и дефицита ресурсов.",
            status: "passed",
            votesFor: 450000,
            votesAgainst: 45000,
            endTime: "Завершено",
            category: "Economic",
            author: "Eco_Gov_UZ"
        },
        {
            id: "VOD-122",
            title: "Программа восстановления малых рек Ферганы",
            status: "active",
            desc: "Выделение гранта в размере 50,000 Civilization Protocol на очистку русел рек силами волонтеров и местных сообществ.",
            votesFor: 85000,
            votesAgainst: 5000,
            endTime: "5 дней",
            category: "Ecological",
            author: "Science_Hub"
        },
        {
            id: "VOD-125",
            title: "Интеграция с UN-Water для SDG 6",
            desc: "Подключение платформы Civilization Protocol к системам ООН для автоматической генерации отчетов по Целям устойчивого развития.",
            status: "active",
            votesFor: 680000,
            votesAgainst: 12000,
            endTime: "4 дня",
            category: "Integration",
            author: "Civilization Protocol Global"
        },
        {
            id: "VOD-126",
            title: "Запуск программы стейкинга",
            desc: "Введение системы стейкинга VOD токенов с APY 5-25% в зависимости от срока блокировки.",
            status: "pending",
            votesFor: 0,
            votesAgainst: 0,
            endTime: "Ожидает начала",
            category: "Economic",
            author: "TokenHub"
        },
        {
            id: "VOD-127",
            title: "Создание научного фонда",
            desc: "Выделение 500,000 VOD на создание фонда для финансирования научных исследований в области водных ресурсов.",
            status: "active",
            votesFor: 420000,
            votesAgainst: 25000,
            endTime: "6 дней",
            category: "Science",
            author: "Civilization Protocol Science"
        },
        {
            id: "VOD-128",
            title: "Модернизация IoT сети в ЦА",
            desc: "Установка 500 новых IoT датчиков на ключевых водных объектах Центральной Азии.",
            status: "active",
            votesFor: 380000,
            votesAgainst: 28000,
            endTime: "8 дней",
            category: "Infrastructure",
            author: "Civilization Protocol Infrastructure"
        },
        {
            id: "VOD-129",
            title: "Разработка мобильного приложения VOD Check",
            desc: "Создание мобильного приложения для гражданского мониторинга качества воды на iOS и Android.",
            status: "active",
            votesFor: 290000,
            votesAgainst: 18000,
            endTime: "9 дней",
            category: "Technology",
            author: "Civilization Protocol Mobile"
        },
        {
            id: "VOD-130",
            title: "Партнерство с Regen Network",
            desc: "Интеграция системы углеродных кредитов Regen Network в экосистему Civilization Protocol.",
            status: "passed",
            votesFor: 750000,
            votesAgainst: 22000,
            endTime: "Завершено",
            category: "Partnership",
            author: "Civilization Protocol Partnerships"
        },
        {
            id: "VOD-131",
            title: "Запуск образовательной платформы",
            desc: "Создание образовательной платформы с курсами по устойчивому водопользованию. NFT-сертификаты для студентов.",
            status: "active",
            votesFor: 340000,
            votesAgainst: 19000,
            endTime: "10 дней",
            category: "Education",
            author: "Civilization Protocol Education"
        },
        {
            id: "VOD-132",
            title: "Реформа казначейства DAO",
            desc: "Изменение правил управления казной DAO: увеличение порога для крупных трат до 1M VOD.",
            status: "active",
            votesFor: 210000,
            votesAgainst: 35000,
            endTime: "7 дней",
            category: "Governance",
            author: "DAO Council"
        },
        {
            id: "VOD-133",
            title: "Программа восстановления Аральского моря",
            desc: "Комплексная программа восстановления экосистемы Аральского моря. Бюджет: 500M VOD.",
            status: "pending",
            votesFor: 0,
            votesAgainst: 0,
            endTime: "Ожидает начала",
            category: "Ecological",
            author: "EcoGuard Community"
        }
    ];

    const filteredProposals = proposals
        .filter(p => {
            if (activeTab === "active") return p.status === "active";
            if (activeTab === "history") return p.status === "passed" || p.status === "rejected";
            return true;
        })
        .filter(p => categoryFilter === "all" || p.category === categoryFilter)
        .sort((a, b) => {
            if (sortBy === "newest") return 0; // Уже отсортированы по дате
            if (sortBy === "votes") return (b.votesFor + b.votesAgainst) - (a.votesFor + a.votesAgainst);
            return 0;
        });

    const stats = [
        { label: "Всего предложений", value: "1,245", icon: MessageSquare },
        { label: "Активных участников", value: "45.2k", icon: Users },
        { label: "Казначейство", value: "12.4M VOD", icon: Wallet },
        { label: "Уровень участия", value: "68%", icon: TrendingUp },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-glow-cyan mb-2">DAO Governance</h1>
                        <p className="text-slate-400">Управляйте будущим экосистемы через децентрализованные предложения</p>
                    </div>
                    <button className="px-8 py-4 bg-cyan-500 text-ocean-deep font-black rounded-xl hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2">
                        Создать предложение <ChevronRight size={18} />
                    </button>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6"
                    >
                        <stat.icon className="text-cyan-500 mb-4" size={24} />
                        <div className="text-2xl font-black">{stat.value}</div>
                        <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* Proposals Section */}
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setActiveTab("active")}
                            className={cn(
                                "px-4 py-2 text-sm font-bold transition-all relative",
                                activeTab === "active" ? "text-cyan-400" : "text-slate-500 hover:text-slate-300"
                            )}
                        >
                            Активные
                            {activeTab === "active" && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500" />}
                        </button>
                        <button
                            onClick={() => setActiveTab("all")}
                            className={cn(
                                "px-4 py-2 text-sm font-bold transition-all relative",
                                activeTab === "all" ? "text-cyan-400" : "text-slate-500 hover:text-slate-300"
                            )}
                        >
                            Все
                            {activeTab === "all" && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500" />}
                        </button>
                        <button
                            onClick={() => setActiveTab("history")}
                            className={cn(
                                "px-4 py-2 text-sm font-bold transition-all relative",
                                activeTab === "history" ? "text-cyan-400" : "text-slate-500 hover:text-slate-300"
                            )}
                        >
                            История
                            {activeTab === "history" && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500" />}
                        </button>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold focus:outline-none focus:border-cyan-500/50"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>
                                    {cat === "all" ? "Все категории" : cat}
                                </option>
                            ))}
                        </select>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold focus:outline-none focus:border-cyan-500/50"
                        >
                            <option value="newest">Новые</option>
                            <option value="votes">По голосам</option>
                            <option value="ending">Заканчиваются</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {filteredProposals.map((proposal) => (
                        <motion.div
                            key={proposal.id}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="glass-card p-6 hover:border-cyan-500/30 transition-all group"
                        >
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className={cn(
                                            "text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded border",
                                            proposal.category === "Infrastructure" ? "text-blue-400 border-blue-500/20 bg-blue-500/5" :
                                                proposal.category === "Economic" ? "text-purple-400 border-purple-500/20 bg-purple-500/5" :
                                                    "text-emerald-400 border-emerald-500/20 bg-emerald-500/5"
                                        )}>
                                            {proposal.category}
                                        </span>
                                        <span className="text-[10px] text-slate-500 font-mono">{proposal.id}</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{proposal.title}</h3>
                                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">{proposal.desc}</p>
                                    <div className="flex items-center gap-4 text-xs text-slate-500">
                                        <div className="flex items-center gap-1"><Clock size={14} /> Осталось: {proposal.endTime}</div>
                                        <div className="flex items-center gap-1"><Users size={14} /> Автор: {proposal.author}</div>
                                    </div>
                                </div>

                                <div className="w-full md:w-64 flex flex-col justify-between gap-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold mb-1">
                                            <span className="text-emerald-500">ЗА</span>
                                            <span className="text-rose-500">ПРОТИВ</span>
                                        </div>
                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden flex">
                                            <div
                                                className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                                                style={{ width: `${(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100}%` }}
                                            />
                                            <div
                                                className="h-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]"
                                                style={{ width: `${(proposal.votesAgainst / (proposal.votesFor + proposal.votesAgainst)) * 100}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                                            <span>{proposal.votesFor.toLocaleString()}</span>
                                            <span>{proposal.votesAgainst.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-cyan-500 hover:text-ocean-deep transition-all">
                                        Голосовать
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
