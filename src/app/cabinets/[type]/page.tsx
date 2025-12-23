"use client";

import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
    User,
    Building2,
    HardHat,
    TrendingUp,
    Beaker,
    Settings,
    ShieldCheck,
    Droplets,
    Zap,
    Activity,
    Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

const cabinetConfigs: Record<string, any> = {
    citizen: {
        title: "Гражданский кабинет",
        icon: User,
        color: "cyan",
        description: "Мониторинг качества воды, участие в DAO и персональная экологическая статистика.",
        stats: [
            { label: "Ваш вклад", value: "120 VOD", icon: Droplets },
            { label: "Рейтинг", value: "Gold", icon: Activity },
            { label: "Отчеты", value: "15", icon: ShieldCheck },
            { label: "Награды", value: "8", icon: Zap }
        ],
        tabs: [
            { id: "monitor", label: "Мониторинг", icon: Activity },
            { id: "dao", label: "Голосование", icon: Globe },
            { id: "achievements", label: "Достижения", icon: Zap }
        ],
        content: {
            monitor: {
                title: "Отправить отчет о качестве воды",
                description: "Ваши данные помогают ИИ точнее прогнозировать состояние ресурсов.",
                action: "Создать отчет"
            },
            dao: {
                title: "Активные предложения DAO",
                description: "Голосуйте за инициативы по очистке и распределению ресурсов.",
                action: "Перейти к голосованию"
            }
        }
    },
    government: {
        title: "Правительственный кабинет",
        icon: Building2,
        color: "blue",
        description: "Управление политиками, межрегиональная координация и кризисное реагирование.",
        stats: [
            { label: "Активные политики", value: "156", icon: ShieldCheck },
            { label: "Соответствие", value: "94%", icon: Activity },
            { label: "Запросы", value: "47", icon: Droplets },
            { label: "Регионы", value: "24", icon: Globe }
        ],
        tabs: [
            { id: "policies", label: "Политики", icon: ShieldCheck },
            { id: "crisis", label: "Кризис", icon: Zap },
            { id: "analytics", label: "Аналитика", icon: TrendingUp }
        ],
        content: {
            policies: {
                title: "Управление государственными политиками",
                description: "Создание и мониторинг соблюдения экологических стандартов.",
                action: "Новая политика"
            }
        }
    },
    infrastructure: {
        title: "Инфраструктурный кабинет",
        icon: HardHat,
        color: "orange",
        description: "Мониторинг IoT-датчиков, предиктивное обслуживание и управление активами.",
        stats: [
            { label: "Объекты", value: "156", icon: Settings },
            { label: "IoT Узлы", value: "2.4k", icon: Zap },
            { label: "Статус", value: "98% OK", icon: ShieldCheck },
            { label: "Эффективность", value: "87%", icon: Activity }
        ],
        tabs: [
            { id: "assets", label: "Активы", icon: Settings },
            { id: "iot", label: "IoT Поток", icon: Zap },
            { id: "maintenance", label: "Обслуживание", icon: HardHat }
        ]
    },
    investor: {
        title: "Инвестиционный кабинет",
        icon: TrendingUp,
        color: "emerald",
        description: "ESG-портфель, доходность токенов VOD и анализ экологических рынков.",
        stats: [
            { label: "Баланс", value: "$125k", icon: TrendingUp },
            { label: "VOD Токены", value: "8.7k", icon: Droplets },
            { label: "ROI", value: "18.7%", icon: Activity },
            { label: "Проекты", value: "15", icon: Globe }
        ],
        tabs: [
            { id: "portfolio", label: "Портфель", icon: TrendingUp },
            { id: "market", label: "Рынок", icon: Globe },
            { id: "esg", label: "ESG Отчет", icon: ShieldCheck }
        ]
    },
    science: {
        title: "Научный кабинет",
        icon: Beaker,
        color: "purple",
        description: "OpenData API, исследовательские проекты и коллаборации ученых.",
        stats: [
            { label: "Проекты", value: "12", icon: Beaker },
            { label: "Данные", value: "4.2 TB", icon: Activity },
            { label: "Публикации", value: "45", icon: ShieldCheck },
            { label: "Точность ИИ", value: "99.2%", icon: Zap }
        ],
        tabs: [
            { id: "research", label: "Исследования", icon: Beaker },
            { id: "data", label: "Сырые данные", icon: Activity },
            { id: "api", label: "API Доступ", icon: Settings }
        ]
    },
    operator: {
        title: "Операторский кабинет",
        icon: Settings,
        color: "slate",
        description: "Системный контроль, управление инцидентами и техническая поддержка.",
        stats: [
            { label: "Инциденты", value: "0", icon: ShieldCheck },
            { label: "Нагрузка", value: "65%", icon: Zap },
            { label: "Uptime", value: "99.99%", icon: Activity },
            { label: "Тикеты", value: "12", icon: Settings }
        ],
        tabs: [
            { id: "control", label: "Контроль", icon: Settings },
            { id: "alerts", label: "Оповещения", icon: Zap },
            { id: "support", label: "Поддержка", icon: User }
        ]
    },
    admin: {
        title: "Административный кабинет",
        icon: ShieldCheck,
        color: "red",
        description: "Конфигурация системы, управление ролями и аудит безопасности.",
        stats: [
            { label: "Пользователи", value: "12.4k", icon: User },
            { label: "Безопасность", value: "Max", icon: ShieldCheck },
            { label: "Узлы", value: "142", icon: Globe },
            { label: "Версия", value: "v0.5.2", icon: Settings }
        ],
        tabs: [
            { id: "users", label: "Пользователи", icon: User },
            { id: "security", label: "Аудит", icon: ShieldCheck },
            { id: "config", label: "Настройки", icon: Settings }
        ]
    }
};

export default function CabinetPage() {
    const params = useParams();
    const type = params.type as string;
    const config = cabinetConfigs[type];
    const [activeTab, setActiveTab] = useState(config?.tabs?.[0]?.id || 'dashboard');

    if (!config) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <h1 className="text-4xl font-black text-red-500 mb-4">404</h1>
                    <p className="text-slate-400">Кабинет не найден</p>
                </div>
            </div>
        );
    }

    const Icon = config.icon;

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="relative p-8 rounded-[2rem] glass border-white/10 overflow-hidden">
                <div className={cn(
                    "absolute top-0 right-0 w-96 h-96 blur-[120px] opacity-20 rounded-full",
                    `bg-${config.color}-500`
                )} />

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className={cn(
                        "w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl",
                        `bg-${config.color}-500/20 text-${config.color}-400 border border-${config.color}-500/30`
                    )}>
                        <Icon size={48} />
                    </div>
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                            <h1 className="text-3xl font-black tracking-tight">{config.title}</h1>
                            <div className={cn("px-2 py-0.5 rounded-md text-[8px] font-black uppercase border", `border-${config.color}-500/30 text-${config.color}-400`)}>
                                Active
                            </div>
                        </div>
                        <p className="text-slate-400 max-w-xl text-sm leading-relaxed">{config.description}</p>
                    </div>
                </div>
            </div>

            {/* Tabs Navigation (Mobile Friendly) */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                {config.tabs?.map((tab: any) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs whitespace-nowrap transition-all border",
                            activeTab === tab.id
                                ? `bg-${config.color}-500 text-ocean-deep border-${config.color}-400 shadow-[0_0_20px_rgba(var(--${config.color}-glow),0.3)]`
                                : "glass text-slate-400 border-white/5 hover:bg-white/5"
                        )}
                    >
                        <tab.icon size={16} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {config.stats.map((stat: any, i: number) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="p-5 rounded-2xl glass border-white/5 hover:border-white/10 transition-all group"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                                <stat.icon size={18} className="text-slate-400" />
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{stat.label}</span>
                        </div>
                        <div className="text-xl font-black text-glow-cyan">{stat.value}</div>
                    </motion.div>
                ))}
            </div>

            {/* Content Area */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                    <div className="lg:col-span-2 space-y-6">
                        <div className="p-8 rounded-[2rem] glass border-white/10 min-h-[400px] flex flex-col items-center justify-center text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-glow/5 pointer-events-none" />

                            <Activity className="text-slate-800 mb-6 animate-pulse" size={64} />
                            <h3 className="text-2xl font-black mb-3">
                                {config.content?.[activeTab]?.title || "Интерактивный модуль"}
                            </h3>
                            <p className="text-slate-400 max-w-sm text-sm mb-8">
                                {config.content?.[activeTab]?.description || "Здесь будет располагаться основной функционал кабинета: графики, таблицы и инструменты управления."}
                            </p>

                            <button className={cn(
                                "px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-2xl",
                                `bg-${config.color}-500 text-ocean-deep hover:scale-105 active:scale-95`
                            )}>
                                {config.content?.[activeTab]?.action || "Запустить модуль"}
                            </button>

                            <div className="mt-12 px-6 py-2 rounded-full border border-white/5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-600">
                                Status: Concept 100% | Implementation 5%
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="p-8 rounded-[2rem] glass border-white/10">
                            <h4 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
                                Системный поток
                            </h4>
                            <div className="space-y-4">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/5 text-xs hover:border-white/10 transition-all">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="font-black text-slate-300">Update v0.5.{i}</div>
                                            <div className="text-[8px] text-slate-500">2h ago</div>
                                        </div>
                                        <div className="text-slate-500 leading-relaxed">Модуль аналитики успешно интегрирован в слой {type}. Ожидание синхронизации.</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
