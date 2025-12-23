"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Search, Plus, Globe, BookOpen, Briefcase, Droplets, ChevronRight } from "lucide-react";

const groups = [
    {
        id: 1,
        name: "Исследователи водной экологии",
        type: "Исследовательская",
        desc: "Группа ученых и исследователей, занимающихся изучением водных экосистем и разработкой инновационных решений.",
        members: 156,
        projects: 23,
        activity: "Высокая",
        icon: BookOpen,
        color: "text-cyan-glow",
    },
    {
        id: 2,
        name: "Экологический активизм",
        type: "Общественная",
        desc: "Сообщество активистов, борющихся за сохранение водных ресурсов и защиту окружающей среды.",
        members: 342,
        projects: 45,
        activity: "Очень высокая",
        icon: Globe,
        color: "text-green-400",
    },
    {
        id: 3,
        name: "Водоочистные сооружения Москвы",
        type: "Объект",
        desc: "Группа управления и мониторинга водоочистных сооружений в Москве. Интеграция с системой Civilization Protocol.",
        members: 28,
        projects: 8,
        activity: "Средняя",
        icon: Droplets,
        color: "text-blue-400",
    },
    {
        id: 4,
        name: "Инвесторы Civilization Protocol",
        type: "Бизнес",
        desc: "Сообщество инвесторов и стейкхолдеров платформы Civilization Protocol. Обсуждение проектов и инвестиционных возможностей.",
        members: 856,
        projects: 67,
        activity: "Очень высокая",
        icon: Briefcase,
        color: "text-amber-400",
    },
    {
        id: 5,
        name: "Центральная Азия Water Network",
        type: "Региональная",
        desc: "Сеть специалистов по водным ресурсам Центральной Азии. Совместные проекты и обмен опытом.",
        members: 234,
        projects: 34,
        activity: "Высокая",
        icon: Globe,
        color: "text-purple-400",
    },
    {
        id: 6,
        name: "IoT Sensors Operators",
        type: "Техническая",
        desc: "Группа операторов IoT датчиков. Обсуждение технических вопросов, калибровки и обслуживания.",
        members: 89,
        projects: 12,
        activity: "Средняя",
        icon: Droplets,
        color: "text-cyan-400",
    },
    {
        id: 7,
        name: "Aral Sea Restoration",
        type: "Экологическая",
        desc: "Программа восстановления Аральского моря. Координация усилий волонтеров и экспертов.",
        members: 567,
        projects: 15,
        activity: "Очень высокая",
        icon: Globe,
        color: "text-emerald-400",
    },
    {
        id: 8,
        name: "DAO Governance Council",
        type: "Управление",
        desc: "Совет по управлению DAO. Обсуждение предложений и координация голосований.",
        members: 124,
        projects: 8,
        activity: "Высокая",
        icon: Users,
        color: "text-indigo-400",
    },
    {
        id: 9,
        name: "Water Quality Analysts",
        type: "Профессиональная",
        desc: "Сообщество аналитиков качества воды. Обмен методиками и результатами исследований.",
        members: 198,
        projects: 28,
        activity: "Высокая",
        icon: BookOpen,
        color: "text-blue-400",
    },
    {
        id: 10,
        name: "Blockchain Developers VOD",
        type: "Техническая",
        desc: "Разработчики блокчейн решений для Civilization Protocol. Смарт-контракты, интеграции, SDK.",
        members: 67,
        projects: 19,
        activity: "Средняя",
        icon: Briefcase,
        color: "text-purple-400",
    },
    {
        id: 11,
        name: "Education & Training",
        type: "Образовательная",
        desc: "Образовательные программы и курсы по устойчивому водопользованию. Сертификация.",
        members: 423,
        projects: 14,
        activity: "Высокая",
        icon: BookOpen,
        color: "text-yellow-400",
    },
    {
        id: 12,
        name: "UN-Water Partnership",
        type: "Партнерство",
        desc: "Официальная группа партнерства с UN-Water. SDG 6 отчетность и координация.",
        members: 45,
        projects: 6,
        activity: "Средняя",
        icon: Globe,
        color: "text-cyan-400",
    },
    {
        id: 13,
        name: "Smart Cities Water",
        type: "Городская",
        desc: "Интеграция Civilization Protocol в умные города. Управление водной инфраструктурой мегаполисов.",
        members: 178,
        projects: 22,
        activity: "Высокая",
        icon: Briefcase,
        color: "text-indigo-400",
    },
    {
        id: 14,
        name: "Desalination Experts",
        type: "Профессиональная",
        desc: "Эксперты по опреснению воды. Технологии, экономика, экология опреснительных установок.",
        members: 92,
        projects: 11,
        activity: "Средняя",
        icon: Droplets,
        color: "text-blue-400",
    },
    {
        id: 15,
        name: "Carbon Credits & Ecology",
        type: "Экологическая",
        desc: "Углеродные кредиты и экологические инициативы. Интеграция с Regen Network.",
        members: 312,
        projects: 38,
        activity: "Очень высокая",
        icon: Globe,
        color: "text-emerald-400",
    },
    {
        id: 16,
        name: "AI & Machine Learning",
        type: "Техническая",
        desc: "ML модели для прогнозирования и анализа водных ресурсов. AI Analytics Engine.",
        members: 145,
        projects: 25,
        activity: "Высокая",
        icon: BookOpen,
        color: "text-purple-400",
    },
    {
        id: 17,
        name: "Mobile App Developers",
        type: "Разработка",
        desc: "Разработчики мобильных приложений Civilization Protocol. VOD Check и другие приложения.",
        members: 78,
        projects: 9,
        activity: "Средняя",
        icon: Briefcase,
        color: "text-cyan-400",
    },
    {
        id: 18,
        name: "Gaming & Gamification",
        type: "Игровая",
        desc: "Геймификация экологических инициатив. Квесты, NFT-награды, лидерборды.",
        members: 234,
        projects: 16,
        activity: "Высокая",
        icon: Users,
        color: "text-pink-400",
    },
    {
        id: 19,
        name: "Women in Water",
        type: "Социальная",
        desc: "Поддержка женщин в водном секторе. Наставничество, карьерные возможности.",
        members: 189,
        projects: 12,
        activity: "Средняя",
        icon: Users,
        color: "text-rose-400",
    },
    {
        id: 20,
        name: "Youth Water Leaders",
        type: "Молодежная",
        desc: "Молодежное лидерство в водном секторе. Образование, стажировки, проекты.",
        members: 456,
        projects: 31,
        activity: "Очень высокая",
        icon: Users,
        color: "text-cyan-400",
    },
    {
        id: 21,
        name: "Rural Water Solutions",
        type: "Социальная",
        desc: "Решения для сельских районов. Доступ к чистой воде в удаленных регионах.",
        members: 267,
        projects: 27,
        activity: "Высокая",
        icon: Globe,
        color: "text-emerald-400",
    },
    {
        id: 22,
        name: "Transboundary Water",
        type: "Международная",
        desc: "Управление трансграничными водными ресурсами. Международное сотрудничество.",
        members: 134,
        projects: 18,
        activity: "Средняя",
        icon: Globe,
        color: "text-blue-400",
    },
    {
        id: 23,
        name: "Water Finance & Economics",
        type: "Экономическая",
        desc: "Финансирование водных проектов. Экономические модели и инвестиции.",
        members: 201,
        projects: 33,
        activity: "Высокая",
        icon: Briefcase,
        color: "text-amber-400",
    },
    {
        id: 24,
        name: "Emergency Response",
        type: "Кризисная",
        desc: "Быстрое реагирование на водные кризисы. Координация помощи и ресурсов.",
        members: 89,
        projects: 7,
        activity: "Средняя",
        icon: Droplets,
        color: "text-red-400",
    },
    {
        id: 25,
        name: "Water Data Standards",
        type: "Стандартизация",
        desc: "Разработка стандартов данных о воде. ISO, ГОСТ, международные стандарты.",
        members: 112,
        projects: 13,
        activity: "Средняя",
        icon: BookOpen,
        color: "text-indigo-400",
    },
];

export default function GroupsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState<string>("all");
    const [activityFilter, setActivityFilter] = useState<string>("all");

    const filteredGroups = groups.filter(g => {
        const matchesSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            g.desc.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === "all" || g.type === categoryFilter;
        const matchesActivity = activityFilter === "all" || 
            (activityFilter === "high" && (g.activity === "Высокая" || g.activity === "Очень высокая")) ||
            (activityFilter === "medium" && g.activity === "Средняя");
        return matchesSearch && matchesCategory && matchesActivity;
    });

    const categories = Array.from(new Set(groups.map(g => g.type)));

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black mb-2">Группы и Сообщества</h1>
                    <p className="text-slate-400">Объединяйтесь в сообщества по интересам и проектам</p>
                </div>

                <button className="px-6 py-3 bg-cyan-glow text-ocean-deep font-bold rounded-xl flex items-center gap-2 hover:scale-105 transition-transform shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                    <Plus size={20} /> Создать группу
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Groups List */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="space-y-4 mb-8">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                            <input
                                type="text"
                                placeholder="Поиск групп по названию или типу..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 glass rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-cyan-glow/50"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold focus:outline-none focus:border-cyan-500/50"
                            >
                                <option value="all">Все категории</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <select
                                value={activityFilter}
                                onChange={(e) => setActivityFilter(e.target.value)}
                                className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold focus:outline-none focus:border-cyan-500/50"
                            >
                                <option value="all">Вся активность</option>
                                <option value="high">Высокая</option>
                                <option value="medium">Средняя</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredGroups.map((group, i) => (
                            <motion.div
                                key={group.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card group cursor-pointer hover:border-cyan-glow/30 transition-all"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${group.color}`}>
                                        <group.icon size={24} />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-white/5 text-slate-500">
                                        {group.type}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold mb-2 group-hover:text-cyan-glow transition-colors">{group.name}</h3>
                                <p className="text-xs text-slate-400 mb-6 line-clamp-2 leading-relaxed">{group.desc}</p>

                                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/5">
                                    <div className="text-center">
                                        <div className="text-sm font-black">{group.members}</div>
                                        <div className="text-[8px] text-slate-500 uppercase font-bold">Участников</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-sm font-black">{group.projects}</div>
                                        <div className="text-[8px] text-slate-500 uppercase font-bold">Проектов</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-sm font-black text-cyan-glow">{group.activity}</div>
                                        <div className="text-[8px] text-slate-500 uppercase font-bold">Активность</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Sidebar: Categories & Recommended */}
                <div className="space-y-6">
                    <div className="glass-card">
                        <h3 className="font-bold mb-6">Категории</h3>
                        <div className="space-y-2">
                            {[
                                { name: "Все группы", count: 124, active: true },
                                { name: "Исследовательские", count: 18 },
                                { name: "Общественные", count: 42 },
                                { name: "Бизнес-проекты", count: 35 },
                                { name: "Объекты", count: 29 },
                            ].map((cat) => (
                                <button
                                    key={cat.name}
                                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${cat.active ? 'bg-cyan-glow/10 text-cyan-glow border border-cyan-glow/20' : 'hover:bg-white/5 text-slate-400'
                                        }`}
                                >
                                    <span className="text-sm font-bold">{cat.name}</span>
                                    <span className="text-[10px] font-black opacity-50">{cat.count}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="glass-card">
                        <h3 className="font-bold mb-4">Рекомендации</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                                <div className="w-10 h-10 rounded-lg bg-blue-400/10 flex items-center justify-center text-blue-400">
                                    <Briefcase size={20} />
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs font-bold group-hover:text-cyan-glow transition-colors">Инвесторы Civilization Protocol</div>
                                    <div className="text-[10px] text-slate-500">856 участников</div>
                                </div>
                                <ChevronRight size={14} className="text-slate-600" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
