"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Shield, Users, Vote, MessageSquare,
    ChevronRight, CheckCircle2, Clock,
    AlertCircle, Send, User, Plus, Wallet, TrendingUp, Filter
} from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

const initialProposals = [
    {
        id: "VOD-124",
        title: "Модернизация очистных сооружений в секторе A-1",
        desc: "Предложение по внедрению новых графеновых фильтров для повышения эффективности очистки на 25%. Это позволит снизить энергопотребление и улучшить качество воды в жилых районах.",
        status: "Active",
        votesFor: 124500,
        votesAgainst: 12000,
        timeLeft: "2 дня",
        author: "VODPROM",
        category: "Инфраструктура",
        comments: [
            { id: 1, user: "Alex_Eco", text: "Отличное решение, давно пора обновить этот сектор.", time: "1 час назад" },
            { id: 2, user: "WaterGuard", text: "Какие гарантии по срокам окупаемости?", time: "30 мин назад" },
        ]
    },
    {
        id: "VOD-123",
        title: "Снижение тарифов для социально значимых объектов",
        desc: "Инициатива по субсидированию водных ресурсов для школ и больниц через фонд DAO. Мы предлагаем выделить 5M VODG на покрытие разницы в тарифах.",
        status: "Active",
        votesFor: 450000,
        votesAgainst: 5000,
        timeLeft: "5 дней",
        author: "Gov_Dept",
        category: "Социальное",
        comments: []
    },
    {
        id: "VOD-122",
        title: "Запуск спутникового мониторинга ледников",
        desc: "Проект по развертыванию группировки микроспутников для сверхточного отслеживания таяния льдов и прогнозирования уровня воды в мировом океане.",
        status: "Passed",
        votesFor: 890000,
        votesAgainst: 45000,
        timeLeft: "Завершено",
        author: "EcoSpace",
        category: "Технологии",
        comments: [
            { id: 1, user: "Orbit_Watcher", text: "Спутники уже на орбите, данные поступают в реальном времени.", time: "1 день назад" }
        ]
    },
    {
        id: "VOD-125",
        title: "Модернизация очистных сооружений в Бухаре",
        desc: "Предложение по замене старых фильтров на новые мембранные системы с IoT-датчиками для снижения энергопотребления на 15%. Бюджет: 2.5M VOD.",
        status: "Active",
        votesFor: 245000,
        votesAgainst: 18000,
        timeLeft: "3 дня",
        author: "VODPROM",
        category: "Инфраструктура",
        comments: [
            { id: 1, user: "WaterTech", text: "Мембранные системы показали отличные результаты в пилоте. Поддерживаю!", time: "2 часа назад" },
            { id: 2, user: "EcoGuard", text: "Какой срок окупаемости проекта?", time: "1 час назад" }
        ]
    },
    {
        id: "VOD-126",
        title: "Программа восстановления малых рек Ферганы",
        desc: "Выделение гранта в размере 50,000 VOD на очистку русел рек силами волонтеров и местных сообществ. Проект включает посадку деревьев и восстановление экосистемы.",
        status: "Active",
        votesFor: 125000,
        votesAgainst: 8000,
        timeLeft: "5 дней",
        author: "EcoGuard Community",
        category: "Экология",
        comments: [
            { id: 1, user: "Volunteer_UZ", text: "Уже зарегистрировались 120 волонтеров! Готовы начать работу.", time: "5 часов назад" }
        ]
    },
    {
        id: "VOD-127",
        title: "Введение регионального коэффициента для Азии",
        desc: "Корректировка стоимости VOD токена в азиатском регионе с учетом текущих экологических показателей и дефицита ресурсов. Коэффициент: 1.15x.",
        status: "Active",
        votesFor: 320000,
        votesAgainst: 45000,
        timeLeft: "7 дней",
        author: "DAO Governance",
        category: "Экономика",
        comments: [
            { id: 1, user: "Investor_Asia", text: "Это справедливо учитывает региональные особенности.", time: "3 часа назад" },
            { id: 2, user: "TokenAnalyst", text: "Нужно детально проработать механизм расчета.", time: "1 час назад" }
        ]
    },
    {
        id: "VOD-128",
        title: "Интеграция с UN-Water для SDG 6 отчетности",
        desc: "Подключение платформы Civilization Protocol к системам ООН для автоматической генерации отчетов по Целям устойчивого развития (SDG 6). Бюджет: 150,000 VOD.",
        status: "Active",
        votesFor: 680000,
        votesAgainst: 12000,
        timeLeft: "4 дня",
        author: "Civilization Protocol Global",
        category: "Интеграция",
        comments: [
            { id: 1, user: "UN_Partner", text: "Это откроет новые возможности для международного сотрудничества.", time: "6 часов назад" }
        ]
    },
    {
        id: "VOD-129",
        title: "Запуск программы стейкинга для ранних участников",
        desc: "Введение системы стейкинга VOD токенов с APY 5-25% в зависимости от срока блокировки. Минимальный порог: 1,000 VOD.",
        status: "Pending",
        votesFor: 0,
        votesAgainst: 0,
        timeLeft: "Ожидает начала",
        author: "TokenHub",
        category: "Экономика",
        comments: []
    },
    {
        id: "VOD-130",
        title: "Создание научного фонда для исследований",
        desc: "Выделение 500,000 VOD на создание фонда для финансирования научных исследований в области водных ресурсов. Гранты от 10,000 до 50,000 VOD.",
        status: "Active",
        votesFor: 420000,
        votesAgainst: 25000,
        timeLeft: "6 дней",
        author: "Civilization Protocol Science",
        category: "Наука",
        comments: [
            { id: 1, user: "Researcher_UZ", text: "Отличная инициатива! Это поможет развитию науки в регионе.", time: "4 часа назад" }
        ]
    },
    {
        id: "VOD-131",
        title: "Модернизация IoT сети в Центральной Азии",
        desc: "Установка 500 новых IoT датчиков на ключевых водных объектах Центральной Азии. Проект включает обучение операторов и техническую поддержку.",
        status: "Active",
        votesFor: 380000,
        votesAgainst: 28000,
        timeLeft: "8 дней",
        author: "Civilization Protocol Infrastructure",
        category: "Технологии",
        comments: [
            { id: 1, user: "IoT_Engineer", text: "Это значительно улучшит качество данных.", time: "2 часа назад" }
        ]
    },
    {
        id: "VOD-132",
        title: "Снижение тарифов для социально значимых объектов",
        desc: "Инициатива по субсидированию водных ресурсов для школ и больниц через фонд DAO. Мы предлагаем выделить 5M VOD на покрытие разницы в тарифах.",
        status: "Active",
        votesFor: 560000,
        votesAgainst: 15000,
        timeLeft: "2 дня",
        author: "Gov_Dept",
        category: "Социальное",
        comments: [
            { id: 1, user: "School_Admin", text: "Это поможет многим образовательным учреждениям.", time: "1 час назад" }
        ]
    },
    {
        id: "VOD-133",
        title: "Разработка мобильного приложения VOD Check",
        desc: "Создание мобильного приложения для гражданского мониторинга качества воды. Приложение будет доступно на iOS и Android. Бюджет: 80,000 VOD.",
        status: "Active",
        votesFor: 290000,
        votesAgainst: 18000,
        timeLeft: "9 дней",
        author: "Civilization Protocol Mobile",
        category: "Технологии",
        comments: [
            { id: 1, user: "MobileDev", text: "Готов участвовать в разработке!", time: "3 часа назад" }
        ]
    },
    {
        id: "VOD-134",
        title: "Партнерство с Regen Network для углеродных кредитов",
        desc: "Интеграция системы углеродных кредитов Regen Network в экосистему Civilization Protocol. Это позволит отслеживать экологические инициативы на EarthMap.",
        status: "Passed",
        votesFor: 750000,
        votesAgainst: 22000,
        timeLeft: "Завершено",
        author: "Civilization Protocol Partnerships",
        category: "Партнерство",
        comments: [
            { id: 1, user: "Regen_Team", text: "Рады сотрудничеству! Интеграция уже началась.", time: "2 дня назад" }
        ]
    },
    {
        id: "VOD-135",
        title: "Запуск образовательной платформы Civilization Protocol Academy",
        desc: "Создание образовательной платформы с курсами по устойчивому водопользованию, блокчейн-технологиям и DAO-управлению. Первые 1000 студентов получат NFT-сертификаты.",
        status: "Active",
        votesFor: 340000,
        votesAgainst: 19000,
        timeLeft: "10 дней",
        author: "Civilization Protocol Education",
        category: "Образование",
        comments: [
            { id: 1, user: "Student_UZ", text: "Очень жду запуска! Это отличная возможность для обучения.", time: "5 часов назад" }
        ]
    }
];

export default function DAOPage() {
    const { balances, isConnected } = useWallet();
    const { t } = useLanguage();
    const [proposals, setProposals] = useState(initialProposals);
    const [selectedProposal, setSelectedProposal] = useState(proposals[0]);
    const [newComment, setNewComment] = useState("");
    const [activeFilter, setActiveFilter] = useState("Все");
    const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

    const categories = ["Все", "Инфраструктура", "Экология", "Экономика", "Технологии", "Социальное", "Наука", "Интеграция", "Партнерство", "Образование"];
    
    const filteredProposals = categoryFilter 
        ? proposals.filter(p => p.category === categoryFilter)
        : proposals;

    const totalVotes = selectedProposal.votesFor + selectedProposal.votesAgainst;
    const forPercent = Math.round((selectedProposal.votesFor / totalVotes) * 100);

    const handleAddComment = () => {
        if (!newComment.trim()) return;
        const comment = {
            id: Date.now(),
            user: isConnected ? "You" : "Anonymous",
            text: newComment,
            time: "Только что"
        };

        const updatedProposals = proposals.map(p =>
            p.id === selectedProposal.id
                ? { ...p, comments: [...p.comments, comment] }
                : p
        );

        setProposals(updatedProposals);
        setSelectedProposal(updatedProposals.find(p => p.id === selectedProposal.id)!);
        setNewComment("");
    };

    const stats = [
        { label: t("dao.treasury"), value: "$42.5M", icon: Wallet, color: "text-emerald-400" },
        { label: t("dao.voters"), value: "12,840", icon: Users, color: "text-blue-400" },
        { label: t("dao.active_proposals"), value: "24", icon: Vote, color: "text-cyan-400" },
        { label: "Participation", value: "68%", icon: TrendingUp, color: "text-purple-400" },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16"
            >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                    <div>
                        <h1 className="text-6xl font-black mb-4 text-glow-cyan tracking-tighter">{t("dao.title")}</h1>
                        <p className="text-xl text-slate-400 max-w-2xl">{t("dao.subtitle")}</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-8 py-4 bg-cyan-500 text-ocean-deep rounded-2xl font-black hover:scale-105 active:scale-95 transition-all shadow-lg shadow-cyan-500/20">
                            + {t("dao.add_comment")}
                        </button>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 border-white/5 bg-white/[0.02]"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={cn("p-3 rounded-xl bg-white/5", stat.color)}>
                                <stat.icon size={24} />
                            </div>
                        </div>
                        <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</div>
                        <div className="text-3xl font-black text-white">{stat.value}</div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-black flex items-center gap-2">
                            <Vote className="text-cyan-500" /> {t("dao.proposals")}
                        </h2>
                    </div>

                    {/* Category Filter */}
                    <div className="mb-6">
                        <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Категории</div>
                        <div className="flex flex-wrap gap-2">
                            {categories.slice(0, 5).map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setCategoryFilter(cat === "Все" ? null : cat)}
                                    className={cn(
                                        "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                                        categoryFilter === (cat === "Все" ? null : cat)
                                            ? "bg-cyan-500 text-ocean-deep"
                                            : "bg-white/5 text-slate-500 hover:bg-white/10"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        {categories.length > 5 && (
                            <button
                                onClick={() => setCategoryFilter(null)}
                                className="mt-2 text-[10px] text-cyan-400 hover:text-cyan-300 font-bold"
                            >
                                Показать все ({categories.length - 1})
                            </button>
                        )}
                    </div>

                    <div className="space-y-4">
                        {filteredProposals.map((p) => (
                            <motion.button
                                key={p.id}
                                layout
                                onClick={() => setSelectedProposal(p)}
                                className={cn(
                                    "w-full text-left p-6 rounded-3xl border transition-all group",
                                    selectedProposal.id === p.id
                                        ? "bg-cyan-500/10 border-cyan-500/40"
                                        : "bg-white/[0.02] border-white/5 hover:border-white/20"
                                )}
                            >
                                <h3 className="font-bold text-lg mb-3 group-hover:text-cyan-400 transition-colors leading-tight">{p.title}</h3>
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                    <span className="text-slate-500">{p.category}</span>
                                    <span className="text-slate-400">{p.status}</span>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedProposal.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="glass-card p-8 border-white/5 bg-white/[0.02]"
                        >
                            <h2 className="text-3xl font-black mb-4 leading-tight">{selectedProposal.title}</h2>
                            <p className="text-slate-400 mb-10 text-lg leading-relaxed">
                                {selectedProposal.desc}
                            </p>

                            <div className="space-y-6 mb-12 p-8 rounded-3xl bg-white/[0.03] border border-white/5">
                                <div className="flex justify-between text-xs font-black tracking-widest mb-2">
                                    <span className="text-cyan-400 uppercase">FOR ({selectedProposal.votesFor.toLocaleString()})</span>
                                    <span className="text-rose-500 uppercase">AGAINST ({selectedProposal.votesAgainst.toLocaleString()})</span>
                                </div>
                                <div className="h-6 w-full bg-white/5 rounded-full overflow-hidden flex p-1 border border-white/10">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${forPercent}%` }}
                                        className="h-full bg-cyan-500 rounded-full"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="flex-1 py-5 bg-cyan-500 text-ocean-deep font-black rounded-2xl hover:scale-[1.02] transition-all shadow-xl shadow-cyan-500/20 text-sm uppercase tracking-widest">
                                    {t("common.vote")} FOR
                                </button>
                                <button className="flex-1 py-5 glass text-white font-black rounded-2xl hover:bg-white/10 transition-all text-sm uppercase tracking-widest border-white/10">
                                    {t("common.vote")} AGAINST
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="glass-card p-8 border-white/5 bg-white/[0.02]">
                        <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                            <MessageSquare className="text-cyan-500" size={24} />
                            {t("dao.discussion")}
                        </h3>

                        <div className="space-y-8 mb-10">
                            {selectedProposal.comments.map((comment) => (
                                <div key={comment.id} className="flex gap-6 group">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                        <User size={24} className="text-slate-500" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-black text-slate-300">{comment.user}</span>
                                            <span className="text-[10px] text-slate-600 font-mono uppercase">{comment.time}</span>
                                        </div>
                                        <p className="text-slate-400 leading-relaxed bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                                            {comment.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="relative group">
                            <input
                                type="text"
                                placeholder={t("dao.add_comment")}
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                                className="w-full bg-white/5 border border-white/10 rounded-3xl py-5 pl-8 pr-20 text-sm focus:outline-none focus:border-cyan-500/50 transition-all"
                            />
                            <button
                                onClick={handleAddComment}
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-cyan-500 text-ocean-deep rounded-2xl flex items-center justify-center hover:scale-110 transition-all"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
