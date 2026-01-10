"use client";

import { motion } from "framer-motion";
import {
    ShieldCheck, Cpu, Factory,
    Globe, Users, Zap,
    Settings, Layers, Database,
    CheckCircle2, ArrowRight,
    Droplets
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

export default function StandardsPage() {
    const { t, isRTL } = useLanguage();

    const sections = [
        {
            title: t("standards.tech_stack"),
            icon: Cpu,
            items: [
                "IoT Sensor Network (VOD-S1)",
                "Satellite Telemetry Integration",
                "Blockchain Consensus (VOD-Chain)",
                "AI Predictive Engine (Hydro-ML)"
            ]
        },
        {
            title: t("standards.equipment"),
            icon: Factory,
            items: [
                "Modular Treatment Plants",
                "Smart Pumping Systems",
                "Automated Filtration Units",
                "Energy-Efficient Desalination"
            ]
        },
        {
            title: t("standards.software"),
            icon: Settings,
            items: [
                "Civilization Protocol OS (Core Control)",
                "Citizen Mobile App",
                "Government Dashboard",
                "Investor ProjectHub"
            ]
        }
    ];

    const targets = [
        {
            title: t("standards.for_states"),
            desc: "National water security, infrastructure modernization, and transnational resource management.",
            icon: Globe,
            color: "text-blue-400"
        },
        {
            title: t("standards.for_business"),
            desc: "ESG compliance, water footprint optimization, and industrial efficiency solutions.",
            icon: Zap,
            color: "text-amber-400"
        },
        {
            title: t("standards.for_society"),
            desc: "Equitable water access, community governance, and transparent resource tracking.",
            icon: Users,
            color: "text-emerald-400"
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
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-8">
                            <ShieldCheck size={14} /> {t("nav.whitepaper")} • Standards
                        </div>
                        <h1 className="text-6xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
                            Civilization Protocol <span className="text-glow-cyan">Earth Standards</span>
                        </h1>
                        <p className="text-xl text-slate-400 leading-relaxed">
                            {t("standards.subtitle")}
                        </p>
                    </motion.div>
                </div>

                {/* Targets Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {targets.map((target, i) => (
                        <motion.div
                            key={target.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-10 border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all relative overflow-hidden group"
                        >
                            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/5 blur-3xl rounded-full group-hover:bg-cyan-500/10 transition-colors" />
                            <div className={cn("w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8", target.color)}>
                                <target.icon size={32} />
                            </div>
                            <h3 className="text-2xl font-black mb-4">{target.title}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                {target.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Detailed Sections */}
                <div className="space-y-12">
                    {sections.map((section, idx) => (
                        <div key={section.title} className={cn("grid grid-cols-1 lg:grid-cols-12 gap-12 items-center", isRTL && "direction-rtl")}>
                            <div className={cn("lg:col-span-4", isRTL && "order-last")}>
                                <div className={cn("flex items-center gap-4 mb-6", isRTL && "flex-row-reverse")}>
                                    <div className="p-4 rounded-2xl bg-cyan-500/10 text-cyan-400">
                                        <section.icon size={32} />
                                    </div>
                                    <h2 className="text-3xl font-black leading-tight">{section.title}</h2>
                                </div>
                                <p className="text-slate-400 leading-relaxed">
                                    Comprehensive solutions designed for global scalability and seamless integration into existing infrastructure.
                                </p>
                            </div>
                            <div className={cn("lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4", isRTL && "order-first")}>
                                {section.items.map((item) => (
                                    <div key={item} className={cn("p-6 glass-card border-white/5 bg-white/[0.02] flex items-center gap-4 group hover:border-cyan-500/30 transition-all", isRTL && "flex-row-reverse")}>
                                        <CheckCircle2 className="text-cyan-500 shrink-0" size={20} />
                                        <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Transnational Regulation Section */}
                <div className="mt-24 glass-card p-12 border-purple-500/20 bg-purple-500/[0.02] relative overflow-hidden">
                    <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full" />
                    <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-12 items-center", isRTL && "direction-rtl")}>
                        <div>
                            <h2 className="text-4xl font-black mb-6">{t("standards.regulation")}</h2>
                            <p className="text-lg text-slate-400 leading-relaxed mb-8">
                                Civilization Protocol Earth establishes a new paradigm for transnational water resource management, utilizing blockchain for immutable data sharing and AI for equitable distribution across borders.
                            </p>
                            <div className={cn("flex flex-wrap gap-4", isRTL && "flex-row-reverse")}>
                                <button className="px-8 py-4 bg-purple-500 text-white rounded-2xl font-black flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-purple-500/20">
                                    Certification Portal <ArrowRight size={20} className={cn(isRTL && "rotate-180")} />
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: "Compliance", icon: ShieldCheck },
                                { label: "Transparency", icon: Globe },
                                { label: "Efficiency", icon: Zap },
                                { label: "Governance", icon: Users },
                            ].map(item => (
                                <div key={item.label} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
                                    <item.icon className="text-purple-400 mb-4" size={24} />
                                    <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
