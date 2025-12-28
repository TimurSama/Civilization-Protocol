"use client";

import { motion } from "framer-motion";
import {
    User, Shield, HardHat,
    Globe, Beaker, TrendingUp,
    Settings, CheckCircle2, Building2,
    ArrowRight, Droplets, Activity,
    Lock, Sparkles, ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

interface CabinetType {
    id: string;
    label: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    color: string;
    bgColor: string;
    borderColor: string;
    description: string;
    features: string[];
    stats: { label: string; value: string }[];
    access: "public" | "verified" | "restricted";
}

export default function CabinetsPage() {
    const { isRTL } = useLanguage();

    const cabinets: CabinetType[] = [
        { 
            id: 'citizen', 
            label: "Гражданский кабинет", 
            icon: User, 
            color: "text-cyan-400",
            bgColor: "bg-cyan-500/10",
            borderColor: "border-cyan-500/30",
            description: "Мониторинг качества воды, участие в DAO голосованиях, миссии и достижения.", 
            features: ["Мониторинг воды", "Отчёты", "Миссии", "Достижения"],
            stats: [{ label: "Пользователей", value: "12,456" }],
            access: "public"
        },
        { 
            id: 'government', 
            label: "Правительственный кабинет", 
            icon: Building2, 
            color: "text-blue-400",
            bgColor: "bg-blue-500/10",
            borderColor: "border-blue-500/30",
            description: "Управление политиками, межрегиональная координация и SDG отчётность.", 
            features: ["Региональный обзор", "Политики", "Кризис-центр", "SDG отчёты"],
            stats: [{ label: "Регионов", value: "24" }],
            access: "verified"
        },
        { 
            id: 'infrastructure', 
            label: "Инфраструктурный кабинет", 
            icon: HardHat, 
            color: "text-orange-400",
            bgColor: "bg-orange-500/10",
            borderColor: "border-orange-500/30",
            description: "Мониторинг IoT-датчиков, предиктивное обслуживание и управление активами.", 
            features: ["Управление активами", "IoT мониторинг", "Обслуживание", "Оповещения"],
            stats: [{ label: "IoT узлов", value: "2,456" }],
            access: "verified"
        },
        { 
            id: 'investor', 
            label: "Инвестиционный кабинет", 
            icon: TrendingUp, 
            color: "text-emerald-400",
            bgColor: "bg-emerald-500/10",
            borderColor: "border-emerald-500/30",
            description: "ESG-портфель, доходность токенов VOD и анализ экологических рынков.", 
            features: ["Портфель", "Проекты", "Рынок", "ESG отчёт"],
            stats: [{ label: "Объём инвестиций", value: "$4.5M" }],
            access: "verified"
        },
        { 
            id: 'science', 
            label: "Научный кабинет", 
            icon: Beaker, 
            color: "text-purple-400",
            bgColor: "bg-purple-500/10",
            borderColor: "border-purple-500/30",
            description: "OpenData API, исследовательские проекты и коллаборации учёных.", 
            features: ["Исследования", "Data Lake", "ML модели", "API"],
            stats: [{ label: "Датасетов", value: "4.2 TB" }],
            access: "verified"
        },
        { 
            id: 'operator', 
            label: "Операторский кабинет", 
            icon: Settings, 
            color: "text-slate-400",
            bgColor: "bg-slate-500/10",
            borderColor: "border-slate-500/30",
            description: "Системный контроль, управление инцидентами и техническая поддержка.", 
            features: ["Контроль", "Алерты", "Логи", "Поддержка"],
            stats: [{ label: "Uptime", value: "99.99%" }],
            access: "restricted"
        },
        { 
            id: 'admin', 
            label: "Административный кабинет", 
            icon: Shield, 
            color: "text-red-400",
            bgColor: "bg-red-500/10",
            borderColor: "border-red-500/30",
            description: "Конфигурация системы, управление ролями и аудит безопасности.", 
            features: ["Пользователи", "Роли", "Аудит", "Настройки"],
            stats: [{ label: "Безопасность", value: "Max" }],
            access: "restricted"
        },
    ];

    return (
        <div className={cn("min-h-screen py-12 px-4", isRTL && "text-right")}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
                        <Sparkles className="text-cyan-400" size={16} />
                        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Специализированные инструменты</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter">
                        Профессиональные <span className="text-cyan-glow">Кабинеты</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-3xl mx-auto">
                        Каждый кабинет предоставляет специализированные инструменты и данные для вашей роли в экосистеме VODeco.
                        Выберите кабинет для доступа к персонализированному функционалу.
                    </p>
                </motion.div>

                {/* Cabinets Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {cabinets.map((cabinet, index) => (
                        <motion.div
                            key={cabinet.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={`/cabinets/${cabinet.id}`}>
                                <div className={cn(
                                    "glass-card p-6 h-full transition-all duration-300 group cursor-pointer",
                                    "hover:shadow-xl hover:shadow-cyan-500/10 hover:border-white/20",
                                    "relative overflow-hidden"
                                )}>
                                    {/* Background Glow */}
                                    <div className={cn("absolute top-0 right-0 w-40 h-40 blur-[80px] opacity-20 rounded-full transition-opacity group-hover:opacity-40", cabinet.bgColor)} />
                                    
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-4 relative">
                                        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center border", cabinet.bgColor, cabinet.borderColor)}>
                                            <cabinet.icon className={cabinet.color} size={28} />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {cabinet.access === "public" ? (
                                                <span className="px-2 py-1 bg-green-500/10 border border-green-500/20 rounded text-[10px] font-bold text-green-400 uppercase">
                                                    Открыт
                                                </span>
                                            ) : cabinet.access === "verified" ? (
                                                <span className="px-2 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded text-[10px] font-bold text-yellow-400 uppercase flex items-center gap-1">
                                                    <CheckCircle2 size={10} /> Верификация
                                                </span>
                                            ) : (
                                                <span className="px-2 py-1 bg-red-500/10 border border-red-500/20 rounded text-[10px] font-bold text-red-400 uppercase flex items-center gap-1">
                                                    <Lock size={10} /> Ограничен
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-black text-white mb-2 group-hover:text-cyan-glow transition-colors">
                                        {cabinet.label}
                                    </h3>
                                    <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                                        {cabinet.description}
                                    </p>

                                    {/* Features */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {cabinet.features.map((feature, i) => (
                                            <span key={i} className="px-2 py-1 bg-white/5 rounded text-[10px] font-bold text-slate-400">
                                                {feature}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Stats & Action */}
                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <div>
                                            <div className="text-[10px] text-slate-500 uppercase tracking-widest">{cabinet.stats[0].label}</div>
                                            <div className={cn("text-lg font-black", cabinet.color)}>{cabinet.stats[0].value}</div>
                                        </div>
                                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-all", cabinet.bgColor, "group-hover:scale-110")}>
                                            <ChevronRight className={cabinet.color} size={20} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Quick Access Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="glass-card p-8 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-80 h-80 blur-[120px] opacity-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500" />
                    
                    <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2">
                            <h3 className="text-2xl font-black text-white mb-4">
                                Быстрый доступ к ключевым функциям
                            </h3>
                            <p className="text-slate-400 mb-6">
                                Независимо от вашей роли, вы можете получить доступ к основным инструментам мониторинга 
                                и участия в экосистеме VODeco.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/dashboard" className="px-6 py-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl font-bold text-cyan-400 hover:bg-cyan-500/20 transition-colors flex items-center gap-2">
                                    <Activity size={18} /> Dashboard
                                </Link>
                                <Link href="/dao" className="px-6 py-3 bg-blue-500/10 border border-blue-500/30 rounded-xl font-bold text-blue-400 hover:bg-blue-500/20 transition-colors flex items-center gap-2">
                                    <Globe size={18} /> DAO Голосования
                                </Link>
                                <Link href="/missions" className="px-6 py-3 bg-purple-500/10 border border-purple-500/30 rounded-xl font-bold text-purple-400 hover:bg-purple-500/20 transition-colors flex items-center gap-2">
                                    <Sparkles size={18} /> Миссии
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-500/30 animate-pulse">
                                <Droplets className="text-cyan-400" size={48} />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
