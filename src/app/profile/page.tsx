"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    User, Settings, Shield,
    Trophy, Zap, Coins,
    Clock, MapPin, ExternalLink,
    ChevronRight, Star, UserPlus,
    CheckCircle2, Building2, Globe,
    Newspaper, Briefcase, Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { useWallet } from "@/context/WalletContext";
import { useState } from "react";

export default function ProfilePage() {
    const { t, isRTL } = useLanguage();
    const { address, isConnected } = useWallet();
    const [isRegistered, setIsRegistered] = useState(false);
    const [selectedRole, setSelectedRole] = useState<string | null>(null);

    const stats = [
        { label: "VOD Balance", val: "2,450", icon: Coins, color: "text-cyan-400" },
        { label: "Nexus XP", val: "12,800", icon: Zap, color: "text-purple-400" },
        { label: "Reputation", val: "94/100", icon: Shield, color: "text-emerald-400" },
        { label: "Rank", val: "#1,204", icon: Trophy, color: "text-amber-400" },
    ];

    const roles = [
        { id: 'activist', label: "Общественный деятель", icon: Users, color: "text-emerald-400" },
        { id: 'media', label: "СМИ", icon: Newspaper, color: "text-blue-400" },
        { id: 'investor', label: "Инвестор", icon: TrendingUp, color: "text-cyan-400" },
        { id: 'gov', label: "Гос. структуры", icon: Globe, color: "text-purple-400" },
        { id: 'business', label: "Бизнес", icon: Briefcase, color: "text-amber-400" },
    ];

    if (!isRegistered && !isConnected) {
        return (
            <div className="min-h-screen bg-ocean-deep flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-12 max-w-md w-full border-white/5 text-center"
                >
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 mx-auto mb-8 flex items-center justify-center shadow-2xl shadow-cyan-500/20">
                        <UserPlus className="text-white" size={32} />
                    </div>
                    <h1 className="text-3xl font-black text-white mb-4">Присоединяйтесь к Civilization Protocol</h1>
                    <p className="text-slate-400 mb-8">Создайте профиль, чтобы участвовать в управлении ресурсами планеты.</p>

                    <div className="space-y-4">
                        <button
                            onClick={() => setIsRegistered(true)}
                            className="w-full py-4 bg-cyan-500 text-ocean-deep font-black rounded-xl hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20"
                        >
                            Регистрация через Wallet
                        </button>
                        <button className="w-full py-4 glass border-white/10 text-white font-black rounded-xl hover:bg-white/5 transition-all">
                            Войти как Гость
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className={cn("min-h-screen bg-ocean-deep py-24 px-4", isRTL && "text-right")}>
            <div className="max-w-5xl mx-auto">
                {/* Profile Header */}
                <div className={cn("glass-card p-8 border-white/5 bg-white/[0.01] mb-8 flex flex-col md:flex-row items-center gap-8", isRTL && "md:flex-row-reverse")}>
                    <div className="relative">
                        <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-4xl font-black shadow-2xl shadow-cyan-500/20 border border-white/10">
                            FL
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-ocean-deep border border-white/10 flex items-center justify-center text-cyan-400">
                            <Shield size={20} />
                        </div>
                    </div>

                    <div className={cn("flex-1 text-center md:text-left", isRTL && "md:text-right")}>
                        <h1 className="text-3xl font-black text-white mb-2">Fractalix.lab</h1>
                        <p className="text-slate-500 font-mono text-sm mb-4">
                            {isConnected ? address : "0x71C...3942"}
                        </p>
                        <div className={cn("flex flex-wrap justify-center md:justify-start gap-3", isRTL && "md:justify-end")}>
                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                Level 12
                            </span>
                            {selectedRole && (
                                <span className={cn(
                                    "px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest flex items-center gap-2",
                                    "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
                                )}>
                                    <CheckCircle2 size={10} />
                                    {roles.find(r => r.id === selectedRole)?.label}
                                </span>
                            )}
                        </div>
                    </div>

                    <button className="px-6 py-3 glass border-white/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/5 transition-all">
                        Настройки
                    </button>
                </div>

                {/* Role Selection */}
                {!selectedRole && (
                    <div className="glass-card p-8 border-cyan-500/20 bg-cyan-500/[0.02] mb-8">
                        <h2 className="text-xl font-black text-white mb-6">Выберите вашу профессиональную роль</h2>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {roles.map(role => (
                                <button
                                    key={role.id}
                                    onClick={() => setSelectedRole(role.id)}
                                    className="p-4 glass-card border-white/5 hover:border-cyan-500/30 transition-all flex flex-col items-center gap-3 group"
                                >
                                    <role.icon className={cn("text-slate-600 group-hover:scale-110 transition-transform", role.color)} size={24} />
                                    <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400 group-hover:text-white">
                                        {role.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {stats.map((s) => (
                        <div key={s.label} className="glass-card p-6 border-white/5 bg-white/[0.01] text-center">
                            <div className={cn("w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4", s.color)}>
                                <s.icon size={20} />
                            </div>
                            <div className="text-xl font-black text-white mb-1">{s.val}</div>
                            <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{s.label}</div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Recent Activity */}
                        <div className="glass-card p-8 border-white/5 bg-white/[0.01]">
                            <h2 className={cn("text-xl font-black mb-6 flex items-center gap-3", isRTL && "flex-row-reverse")}>
                                <Clock className="text-cyan-400" /> Активность
                            </h2>
                            <div className="space-y-4">
                                {[
                                    { action: "Верификация роли", val: "Завершено", time: "2 часа назад" },
                                    { action: "Участие в аудите: Узбекистан", val: "В процессе", time: "5 часов назад" },
                                    { action: "Публикация исследования", val: "+1200 VOD", time: "1 день назад" },
                                ].map((act, i) => (
                                    <div key={i} className={cn("flex justify-between items-center p-4 rounded-xl hover:bg-white/5 transition-all", isRTL && "flex-row-reverse")}>
                                        <div className={cn(isRTL && "text-right")}>
                                            <div className="text-sm font-bold">{act.action}</div>
                                            <div className="text-[10px] text-slate-500">{act.time}</div>
                                        </div>
                                        <div className="text-sm font-black text-cyan-400">{act.val}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Referral Card */}
                        <div className="glass-card p-8 border-purple-500/20 bg-purple-500/[0.02] relative overflow-hidden">
                            <div className="absolute -right-12 -top-12 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full" />
                            <h3 className="text-xl font-black mb-4 flex items-center gap-3">
                                <UserPlus className="text-purple-400" size={20} /> Реферальная программа
                            </h3>
                            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                                Приглашайте друзей и получайте 10% от их наград.
                            </p>
                            <button className="w-full py-3 bg-purple-500 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:scale-[1.02] transition-all">
                                Копировать ссылку
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { TrendingUp } from "lucide-react";
