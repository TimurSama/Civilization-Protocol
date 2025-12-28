"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Target, Clock, Users, ChevronRight, CheckCircle2, Award, Zap, TrendingUp, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const missions = [
    {
        id: 1,
        title: "Мониторинг качества воды в реке Волга",
        desc: "Установка и настройка датчиков для мониторинга качества воды в реке Волга. Требуется отчет с фотографиями и данными с датчиков.",
        reward: "500 Civilization Protocol",
        xp: "+1200 XP",
        sbt: "Water Guardian I",
        deadline: "15 марта 2025",
        participants: "12/20",
        status: "Активна",
        category: "Экология",
        difficulty: "Medium",
        color: "text-cyan-400",
        bg: "bg-cyan-500/5"
    },
    {
        id: 2,
        title: "Разработка AI-алгоритма оптимизации",
        desc: "Создание алгоритма машинного обучения для оптимизации использования водных ресурсов в промышленности на базе открытых данных VOD API.",
        reward: "1500 Civilization Protocol",
        xp: "+3000 XP",
        sbt: "Tech Pioneer",
        deadline: "30 апреля 2025",
        participants: "5/10",
        status: "Активна",
        category: "Технологии",
        difficulty: "Hard",
        color: "text-purple-400",
        bg: "bg-purple-500/5"
    },
    {
        id: 3,
        title: "Образовательная программа",
        desc: "Проведение образовательных семинаров по водной экологии в школах и университетах. Требуется подтверждение от учебного заведения.",
        reward: "300 Civilization Protocol",
        xp: "+500 XP",
        sbt: "Eco Educator",
        deadline: "Завершено",
        participants: "25/25",
        status: "Завершена",
        category: "Социальное",
        difficulty: "Easy",
        color: "text-emerald-400",
        bg: "bg-emerald-500/5"
    },
    {
        id: 4,
        title: "Восстановление Аральского моря - Фаза 1",
        desc: "Сбор данных о текущем состоянии Аральского моря. Установка IoT датчиков и спутниковый мониторинг. Подготовка отчета для DAO.",
        reward: "2000 Civilization Protocol",
        xp: "+5000 XP",
        sbt: "Aral Sea Guardian",
        deadline: "20 мая 2025",
        participants: "8/15",
        status: "Активна",
        category: "Экология",
        difficulty: "Hard",
        color: "text-cyan-400",
        bg: "bg-cyan-500/5"
    },
    {
        id: 5,
        title: "Разработка мобильного приложения VOD Check",
        desc: "Создание iOS и Android приложения для гражданского мониторинга воды. Интеграция с блокчейном и NFT-сертификаты.",
        reward: "3000 Civilization Protocol",
        xp: "+6000 XP",
        sbt: "Mobile Developer",
        deadline: "1 июня 2025",
        participants: "3/5",
        status: "Активна",
        category: "Технологии",
        difficulty: "Hard",
        color: "text-purple-400",
        bg: "bg-purple-500/5"
    },
    {
        id: 6,
        title: "Волонтерская акция: Очистка берегов",
        desc: "Организация и проведение акции по очистке берегов рек и озер. Фотоотчет и данные о собранном мусоре.",
        reward: "400 Civilization Protocol",
        xp: "+800 XP",
        sbt: "Cleanup Hero",
        deadline: "10 апреля 2025",
        participants: "45/50",
        status: "Активна",
        category: "Социальное",
        difficulty: "Easy",
        color: "text-emerald-400",
        bg: "bg-emerald-500/5"
    },
    {
        id: 7,
        title: "Интеграция с UN-Water для SDG 6",
        desc: "Разработка модуля автоматической генерации отчетов по Целям устойчивого развития ООН. API интеграция.",
        reward: "2500 Civilization Protocol",
        xp: "+4500 XP",
        sbt: "UN Partner",
        deadline: "25 мая 2025",
        participants: "2/3",
        status: "Активна",
        category: "Интеграция",
        difficulty: "Hard",
        color: "text-amber-400",
        bg: "bg-amber-500/5"
    },
    {
        id: 8,
        title: "Исследование подземных вод Центральной Азии",
        desc: "Проведение гидрогеологических исследований. Сбор проб, анализ данных, публикация научной статьи.",
        reward: "1800 Civilization Protocol",
        xp: "+3500 XP",
        sbt: "Hydrogeologist",
        deadline: "15 июня 2025",
        participants: "6/8",
        status: "Активна",
        category: "Наука",
        difficulty: "Hard",
        color: "text-indigo-400",
        bg: "bg-indigo-500/5"
    },
    {
        id: 9,
        title: "Создание образовательного курса",
        desc: "Разработка онлайн-курса по устойчивому водопользованию. Видео, тесты, NFT-сертификаты для студентов.",
        reward: "1200 Civilization Protocol",
        xp: "+2500 XP",
        sbt: "Course Creator",
        deadline: "5 мая 2025",
        participants: "7/10",
        status: "Активна",
        category: "Образование",
        difficulty: "Medium",
        color: "text-yellow-400",
        bg: "bg-yellow-500/5"
    },
    {
        id: 10,
        title: "Пилотный проект: P2P торговля водой",
        desc: "Тестирование системы P2P торговли водными ресурсами между домохозяйствами. Сбор обратной связи.",
        reward: "800 Civilization Protocol",
        xp: "+1500 XP",
        sbt: "P2P Pioneer",
        deadline: "30 апреля 2025",
        participants: "15/20",
        status: "Активна",
        category: "Экономика",
        difficulty: "Medium",
        color: "text-rose-400",
        bg: "bg-rose-500/5"
    },
    {
        id: 11,
        title: "Разработка смарт-контракта для DAO",
        desc: "Создание и аудит смарт-контракта для управления казной DAO. Интеграция с EVM-сетями.",
        reward: "2200 Civilization Protocol",
        xp: "+4000 XP",
        sbt: "Smart Contract Dev",
        deadline: "12 мая 2025",
        participants: "4/6",
        status: "Активна",
        category: "Технологии",
        difficulty: "Hard",
        color: "text-purple-400",
        bg: "bg-purple-500/5"
    },
    {
        id: 12,
        title: "Контент-майнинг: Научные статьи",
        desc: "Публикация верифицированных научных статей о водных ресурсах. Минимум 3 статьи с рецензированием.",
        reward: "600 Civilization Protocol",
        xp: "+1200 XP",
        sbt: "Science Writer",
        deadline: "Онлайн",
        participants: "18/∞",
        status: "Активна",
        category: "Наука",
        difficulty: "Medium",
        color: "text-indigo-400",
        bg: "bg-indigo-500/5"
    },
    {
        id: 13,
        title: "Геймификация: Квест по очистке воды",
        desc: "Создание игрового квеста в игровом слое Civilization Protocol. NFT-награды за выполнение миссий.",
        reward: "1000 Civilization Protocol",
        xp: "+2000 XP",
        sbt: "Game Designer",
        deadline: "20 мая 2025",
        participants: "9/12",
        status: "Активна",
        category: "Игры",
        difficulty: "Medium",
        color: "text-pink-400",
        bg: "bg-pink-500/5"
    },
    {
        id: 14,
        title: "Партнерство с Regen Network",
        desc: "Интеграция системы углеродных кредитов. Разработка механизма конвертации экологических достижений.",
        reward: "1800 Civilization Protocol",
        xp: "+3500 XP",
        sbt: "Carbon Credits Expert",
        deadline: "28 апреля 2025",
        participants: "5/7",
        status: "Активна",
        category: "Партнерство",
        difficulty: "Hard",
        color: "text-teal-400",
        bg: "bg-teal-500/5"
    },
    {
        id: 15,
        title: "Перевод документации на арабский",
        desc: "Перевод технической документации и интерфейса на арабский язык. Проверка качества перевода.",
        reward: "500 Civilization Protocol",
        xp: "+1000 XP",
        sbt: "Translator",
        deadline: "15 апреля 2025",
        participants: "12/15",
        status: "Активна",
        category: "Социальное",
        difficulty: "Easy",
        color: "text-emerald-400",
        bg: "bg-emerald-500/5"
    },
];

export default function MissionsPage() {
    const { t } = useLanguage();
    const [activeCategory, setActiveCategory] = useState("Все");

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16">
                <div>
                    <h1 className="text-5xl font-black mb-3 text-glow-cyan">{t("missions.title")}</h1>
                    <p className="text-slate-400 text-lg">{t("missions.subtitle")}</p>
                </div>

                <div className="flex flex-wrap gap-3">
                    {["Все", "Экология", "Технологии", "Социальное", "Наука", "Образование", "Экономика", "Интеграция", "Партнерство", "Игры"].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={cn(
                                "px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-widest transition-all border",
                                activeCategory === cat
                                    ? "bg-cyan-500 text-ocean-deep border-cyan-500 shadow-lg shadow-cyan-500/20"
                                    : "glass border-white/5 text-slate-500 hover:text-white"
                            )}
                        >
                            {cat === "Все" ? t("common.active") : cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    <AnimatePresence mode="popLayout">
                        {missions.filter(m => activeCategory === "Все" || m.category === activeCategory).map((mission, i) => (
                            <motion.div
                                key={mission.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: i * 0.1 }}
                                className={cn(
                                    "glass-card p-8 group relative overflow-hidden",
                                    mission.status === 'Завершена' ? 'opacity-50 grayscale' : 'hover:border-cyan-500/30'
                                )}
                            >
                                <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-black mb-3 group-hover:text-cyan-400 transition-colors leading-tight">{mission.title}</h3>
                                        <p className="text-slate-400 text-sm leading-relaxed">{mission.desc}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <div className="text-2xl font-black text-white mb-1">{mission.reward}</div>
                                        <div className="text-xs font-black text-cyan-500 uppercase tracking-widest">{mission.xp}</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                                    <div className="space-y-1">
                                        <div className="text-[10px] text-slate-600 font-black uppercase tracking-widest">{t("missions.deadline")}</div>
                                        <div className="text-xs font-bold flex items-center gap-2"><Clock size={14} /> {mission.deadline}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[10px] text-slate-600 font-black uppercase tracking-widest">{t("missions.participants")}</div>
                                        <div className="text-xs font-bold flex items-center gap-2"><Users size={14} /> {mission.participants}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[10px] text-slate-600 font-black uppercase tracking-widest">{t("missions.sbt_reward")}</div>
                                        <div className="text-xs font-bold flex items-center gap-2 text-purple-400"><Award size={14} /> {mission.sbt}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[10px] text-slate-600 font-black uppercase tracking-widest">Status</div>
                                        <div className={cn("text-xs font-bold flex items-center gap-2", mission.status === 'Завершена' ? 'text-emerald-500' : 'text-cyan-400')}>
                                            {mission.status === 'Завершена' ? <CheckCircle2 size={14} /> : <Zap size={14} />} {mission.status === 'Завершена' ? t("common.completed") : t("common.active")}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    disabled={mission.status === 'Завершена'}
                                    className={cn(
                                        "w-full py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3",
                                        mission.status === 'Завершена'
                                            ? 'bg-white/5 text-slate-600 cursor-not-allowed'
                                            : 'bg-cyan-500 text-ocean-deep hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-cyan-500/20'
                                    )}
                                >
                                    {mission.status === 'Завершена' ? t("common.completed") : t("common.participate")}
                                    {mission.status !== 'Завершена' && <ChevronRight size={18} />}
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="space-y-8">
                    <div className="glass-card p-8 border-white/5 bg-white/[0.02]">
                        <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                            <TrendingUp className="text-cyan-500" /> {t("missions.leaderboard")}
                        </h3>
                        <div className="space-y-6">
                            {[
                                { name: "EcoWarrior", xp: "45,230 XP", rank: 1, avatar: "EW", missions: 28 },
                                { name: "WaterGuard", xp: "38,100 XP", rank: 2, avatar: "WG", missions: 24 },
                                { name: "AquaTech", xp: "32,450 XP", rank: 3, avatar: "AT", missions: 21 },
                                { name: "HydroMaster", xp: "28,900 XP", rank: 4, avatar: "HM", missions: 19 },
                                { name: "BluePlanet", xp: "25,600 XP", rank: 5, avatar: "BP", missions: 17 },
                            ].map((user, i) => (
                                <div key={user.name} className="flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black border",
                                            i === 0 ? "bg-cyan-500/20 border-cyan-500/30 text-cyan-400" : "bg-white/5 border-white/10 text-slate-500"
                                        )}>
                                            {user.avatar}
                                        </div>
                                        <div>
                                            <div className="text-sm font-black text-slate-200 group-hover:text-cyan-400 transition-colors">{user.name}</div>
                                            <div className="text-[10px] text-slate-600 font-black uppercase tracking-widest">#{user.rank} • {user.missions} миссий</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs font-black text-cyan-500">{user.xp}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-card p-8 border-purple-500/20 bg-purple-500/[0.02] relative overflow-hidden">
                        <h3 className="text-xl font-black mb-2 text-purple-400">{t("missions.progress")}</h3>
                        <div className="space-y-6 mt-6">
                            <div className="space-y-3">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                    <span className="text-slate-500">XP</span>
                                    <span className="text-purple-400">85%</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10">
                                    <div className="h-full w-[85%] bg-purple-500 rounded-full" />
                                </div>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                <div className="flex items-center gap-3 mb-2">
                                    <Shield size={16} className="text-purple-400" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t("profile.achievements")}</span>
                                </div>
                                <div className="text-xs font-bold text-slate-200">Guardian II</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
