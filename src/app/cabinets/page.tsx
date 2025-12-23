"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    User, Shield, Briefcase,
    Globe, Newspaper, TrendingUp,
    Settings, CheckCircle2, AlertCircle,
    FileText, BarChart3, Users,
    MessageSquare, Download, Share2,
    Lock, Unlock, Zap, Droplets
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

type Role = 'activist' | 'media' | 'investor' | 'gov' | 'business' | 'admin';

interface CabinetRole {
    id: Role;
    label: string;
    icon: any;
    color: string;
    description: string;
}

export default function CabinetsPage() {
    const { t, isRTL } = useLanguage();
    const [selectedRole, setSelectedRole] = useState<Role>('activist');
    const [isVerified, setIsVerified] = useState(false);

    const roles: CabinetRole[] = [
        { id: 'activist', label: "Общественный деятель", icon: Users, color: "text-emerald-400", description: "Инструменты для мониторинга, петиций и голосования в DAO." },
        { id: 'media', label: "СМИ и Журналисты", icon: Newspaper, color: "text-blue-400", description: "Доступ к верифицированным данным, пресс-релизам и экспорт аналитики." },
        { id: 'investor', label: "Инвестор", icon: TrendingUp, color: "text-cyan-400", description: "Управление портфелем, ROI аналитика и доступ к меморандумам." },
        { id: 'gov', label: "Гос. структуры", icon: Globe, color: "text-purple-400", description: "Региональная статистика, контроль комплаенса и экстренные оповещения." },
        { id: 'business', label: "Бизнес и ESG", icon: Briefcase, color: "text-amber-400", description: "ESG отчетность, B2B маркетплейс и оптимизация ресурсов." },
        { id: 'admin', label: "Администратор", icon: Shield, color: "text-rose-400", description: "Управление системой, верификация пользователей и глобальные параметры." },
    ];

    const renderCabinetContent = () => {
        if (!isVerified && selectedRole !== 'activist') {
            return (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                        <Lock className="text-slate-500" size={32} />
                    </div>
                    <h2 className="text-2xl font-black text-white mb-2">Требуется верификация</h2>
                    <p className="text-slate-400 max-w-md mb-8">
                        Для доступа к кабинету {roles.find(r => r.id === selectedRole)?.label} необходимо подтвердить вашу личность или статус организации.
                    </p>
                    <button
                        onClick={() => setIsVerified(true)}
                        className="px-8 py-3 bg-cyan-500 text-ocean-deep font-black rounded-xl hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20"
                    >
                        Начать верификацию
                    </button>
                </div>
            );
        }

        switch (selectedRole) {
            case 'activist':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-6">
                            <div className="glass-card p-6 border-white/5">
                                <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
                                    <MessageSquare size={20} className="text-emerald-400" />
                                    Активные петиции
                                </h3>
                                <div className="space-y-4">
                                    {[1, 2].map(i => (
                                        <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-emerald-500/30 transition-all">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-sm">Очистка бассейна реки Амударья</h4>
                                                <span className="text-[10px] font-black text-emerald-400 uppercase">85% собрано</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-4">
                                                <div className="h-full bg-emerald-500 w-[85%]" />
                                            </div>
                                            <button className="text-[10px] font-black text-slate-500 uppercase hover:text-white transition-colors">Поддержать</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="glass-card p-6 border-white/5">
                                <h3 className="text-sm font-black text-slate-500 uppercase mb-4 tracking-widest">Ваш вклад</h3>
                                <div className="text-3xl font-black text-white mb-1">1,240 VOD</div>
                                <div className="text-[10px] text-emerald-400 font-bold">+12% за месяц</div>
                            </div>
                        </div>
                    </div>
                );
            case 'investor':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="glass-card p-6 border-white/5 bg-cyan-500/[0.02]">
                            <TrendingUp className="text-cyan-400 mb-4" size={24} />
                            <div className="text-[10px] font-black text-slate-500 uppercase mb-1">Портфель</div>
                            <div className="text-2xl font-black text-white">$1.2M</div>
                        </div>
                        <div className="glass-card p-6 border-white/5">
                            <BarChart3 className="text-purple-400 mb-4" size={24} />
                            <div className="text-[10px] font-black text-slate-500 uppercase mb-1">ROI (YTD)</div>
                            <div className="text-2xl font-black text-white">+18.4%</div>
                        </div>
                        <div className="md:col-span-2 glass-card p-6 border-white/5">
                            <h3 className="text-sm font-black text-slate-500 uppercase mb-4">Доступные меморандумы</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                                    <span className="text-xs font-bold">Civilization Protocol Core Series A</span>
                                    <Download size={16} className="text-cyan-400 cursor-pointer" />
                                </div>
                                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                                    <span className="text-xs font-bold">Water Infrastructure Fund</span>
                                    <Download size={16} className="text-cyan-400 cursor-pointer" />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="glass-card p-20 text-center border-white/5">
                        <Zap className="text-cyan-400 mx-auto mb-6 animate-pulse" size={48} />
                        <h2 className="text-2xl font-black text-white mb-2">Кабинет в разработке</h2>
                        <p className="text-slate-400">Этот раздел будет доступен в следующем обновлении экосистемы Civilization Protocol.</p>
                    </div>
                );
        }
    };

    return (
        <div className={cn("min-h-screen bg-ocean-deep py-24 px-4", isRTL && "text-right")}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                    <div>
                        <h1 className="text-5xl font-black text-white mb-4 tracking-tighter">
                            Профессиональные Кабинеты
                        </h1>
                        <p className="text-slate-400 text-lg max-w-2xl">
                            Специализированные инструменты для каждой роли в экосистеме Civilization Protocol.
                        </p>
                    </div>
                    {isVerified && (
                        <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                            <CheckCircle2 className="text-emerald-400" size={18} />
                            <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">Верифицирован</span>
                        </div>
                    )}
                </div>

                {/* Role Selector */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
                    {roles.map(role => (
                        <button
                            key={role.id}
                            onClick={() => {
                                setSelectedRole(role.id);
                                if (role.id === 'activist') setIsVerified(false);
                            }}
                            className={cn(
                                "p-6 glass-card border-white/5 transition-all flex flex-col items-center text-center gap-4 group",
                                selectedRole === role.id ? "bg-white/10 border-white/20 shadow-xl" : "bg-white/[0.01] hover:bg-white/[0.03]"
                            )}
                        >
                            <role.icon className={cn("transition-transform group-hover:scale-110", selectedRole === role.id ? role.color : "text-slate-600")} size={32} />
                            <div>
                                <div className={cn("text-[10px] font-black uppercase tracking-tighter mb-1", selectedRole === role.id ? "text-white" : "text-slate-500")}>
                                    {role.label}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Cabinet Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedRole + (isVerified ? '-v' : '-u')}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {renderCabinetContent()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
