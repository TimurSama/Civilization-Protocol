"use client";

import { motion } from "framer-motion";
import {
    Zap, Sun, Battery,
    TrendingUp, ShieldCheck,
    Globe, ArrowRight, ExternalLink,
    Activity, Cpu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

export default function EnergyPage() {
    const { t, isRTL } = useLanguage();

    const features = [
        {
            title: t("energy.p2p_trading"),
            desc: "Direct energy exchange between producers and consumers using smart contracts.",
            icon: Zap,
            color: "text-amber-400",
            bg: "bg-amber-400/10",
            partner: "Power Ledger"
        },
        {
            title: t("energy.solar_farms"),
            desc: "Fractional ownership of solar energy projects with real-time yield tracking.",
            icon: Sun,
            color: "text-orange-400",
            bg: "bg-orange-400/10",
            partner: "Sun Exchange"
        },
        {
            title: t("energy.efficiency"),
            desc: "AI-driven optimization of energy consumption for industrial and residential nodes.",
            icon: Battery,
            color: "text-emerald-400",
            bg: "bg-emerald-400/10",
            partner: "Energy Web"
        }
    ];

    return (
        <div className={cn("min-h-screen bg-ocean-deep py-24 px-4", isRTL && "text-right")}>
            <div className="max-w-7xl mx-auto">
                {/* Hero */}
                <div className="mb-24 text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-black uppercase tracking-widest mb-8">
                            <Zap size={14} className="fill-current" /> {t("nav.energy")} Grid
                        </div>
                        <h1 className="text-6xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
                            Decentralized <span className="text-glow-amber">Energy</span> Future
                        </h1>
                        <p className="text-xl text-slate-400 leading-relaxed">
                            {t("energy.subtitle")}
                        </p>
                    </motion.div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {features.map((feat, i) => (
                        <motion.div
                            key={feat.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-10 border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all relative overflow-hidden group"
                        >
                            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/5 blur-3xl rounded-full group-hover:bg-amber-500/10 transition-colors" />
                            <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8", feat.bg, feat.color)}>
                                <feat.icon size={32} />
                            </div>
                            <h3 className="text-2xl font-black mb-4">{feat.title}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed mb-8">
                                {feat.desc}
                            </p>
                            <div className={cn("flex items-center justify-between mt-auto pt-6 border-t border-white/5", isRTL && "flex-row-reverse")}>
                                <div className="text-[10px] font-black text-slate-500 uppercase">Protocol</div>
                                <div className="text-xs font-bold text-white flex items-center gap-2">
                                    {feat.partner} <ExternalLink size={12} className="text-slate-500" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Live Grid Status */}
                <div className="glass-card p-12 border-amber-500/20 bg-amber-500/[0.02] relative overflow-hidden">
                    <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-amber-500/10 blur-3xl rounded-full" />
                    <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-12 items-center", isRTL && "direction-rtl")}>
                        <div>
                            <h2 className="text-4xl font-black mb-6 flex items-center gap-4">
                                <Activity className="text-amber-400" /> {t("energy.grid_status")}
                            </h2>
                            <p className="text-lg text-slate-400 leading-relaxed mb-8">
                                Real-time monitoring of the Civilization Protocol decentralized energy network. Track production, consumption, and P2P trades across all connected nodes.
                            </p>
                            <div className={cn("flex flex-wrap gap-4", isRTL && "flex-row-reverse")}>
                                <button className="px-8 py-4 bg-amber-500 text-ocean-deep rounded-2xl font-black flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-amber-500/20">
                                    Open Trading Terminal <ArrowRight size={20} className={cn(isRTL && "rotate-180")} />
                                </button>
                            </div>
                        </div>
                        <div className="space-y-6">
                            {[
                                { label: "Total Production", val: "1.2 GW", progress: 75 },
                                { label: "Renewable Share", val: "92%", progress: 92 },
                                { label: "Active Trades", val: "14,250", progress: 60 },
                            ].map(item => (
                                <div key={item.label}>
                                    <div className={cn("flex justify-between text-xs font-black uppercase mb-2", isRTL && "flex-row-reverse")}>
                                        <span className="text-slate-500">{item.label}</span>
                                        <span className="text-amber-400">{item.val}</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.progress}%` }}
                                            className="h-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
