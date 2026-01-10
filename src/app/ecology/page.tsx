"use client";

import { motion } from "framer-motion";
import {
    TreePine, Wind, Recycle,
    Globe, ShieldCheck, TrendingUp,
    Leaf, CloudRain, ArrowRight,
    ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

export default function EcologyPage() {
    const { t, isRTL } = useLanguage();

    const modules = [
        {
            title: t("ecology.carbon_credits"),
            desc: "Tokenized carbon offsets verified by satellite monitoring and IoT sensors.",
            icon: Wind,
            color: "text-blue-400",
            bg: "bg-blue-400/10",
            partner: "Regen Network"
        },
        {
            title: t("ecology.biodiversity"),
            desc: "Tracking species and ecosystem health using AI and community-driven data.",
            icon: Leaf,
            color: "text-emerald-400",
            bg: "bg-emerald-400/10",
            partner: "Open Forest Protocol"
        },
        {
            title: t("ecology.plastic_waste"),
            desc: "Incentivizing plastic collection and recycling through blockchain rewards.",
            icon: Recycle,
            color: "text-cyan-400",
            bg: "bg-cyan-400/10",
            partner: "Plastic Bank"
        }
    ];

    return (
        <div className={cn("min-h-screen py-24 px-4", isRTL && "text-right")}>
            <div className="max-w-7xl mx-auto">
                {/* Hero */}
                <div className="mb-24 text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-8">
                            <TreePine size={14} /> {t("nav.ecology")} Hub
                        </div>
                        <h1 className="text-6xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
                            Natural <span className="text-glow-emerald">Capital</span> Management
                        </h1>
                        <p className="text-xl text-slate-400 leading-relaxed">
                            {t("ecology.subtitle")}
                        </p>
                    </motion.div>
                </div>

                {/* Modules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {modules.map((mod, i) => (
                        <motion.div
                            key={mod.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-10 border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all relative overflow-hidden group"
                        >
                            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/5 blur-3xl rounded-full group-hover:bg-emerald-500/10 transition-colors" />
                            <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8", mod.bg, mod.color)}>
                                <mod.icon size={32} />
                            </div>
                            <h3 className="text-2xl font-black mb-4">{mod.title}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed mb-8">
                                {mod.desc}
                            </p>
                            <div className={cn("flex items-center justify-between mt-auto pt-6 border-t border-white/5", isRTL && "flex-row-reverse")}>
                                <div className="text-[10px] font-black text-slate-500 uppercase">Partner</div>
                                <div className="text-xs font-bold text-white flex items-center gap-2">
                                    {mod.partner} <ExternalLink size={12} className="text-slate-500" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Climate Action Section */}
                <div className="glass-card p-12 border-cyan-500/20 bg-cyan-500/[0.02] relative overflow-hidden">
                    <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full" />
                    <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-12 items-center", isRTL && "direction-rtl")}>
                        <div>
                            <h2 className="text-4xl font-black mb-6 flex items-center gap-4">
                                <CloudRain className="text-cyan-400" /> Climate Resilience
                            </h2>
                            <p className="text-lg text-slate-400 leading-relaxed mb-8">
                                Civilization Protocol Earth integrates global climate data to help communities and businesses adapt to changing environmental conditions. Our AI models predict risks and suggest mitigation strategies.
                            </p>
                            <button className="px-8 py-4 bg-emerald-500 text-ocean-deep rounded-2xl font-black flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-emerald-500/20">
                                View Climate Map <ArrowRight size={20} className={cn(isRTL && "rotate-180")} />
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: "Air Quality", val: "Good", color: "text-emerald-400" },
                                { label: "CO2 Level", val: "415 ppm", color: "text-rose-400" },
                                { label: "Forest Cover", val: "31%", color: "text-emerald-400" },
                                { label: "Ocean Temp", val: "+1.2°C", color: "text-rose-400" },
                            ].map(item => (
                                <div key={item.label} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
                                    <div className={cn("text-xl font-black mb-2", item.color)}>{item.val}</div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
