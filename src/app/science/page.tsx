"use client";

import { motion } from "framer-motion";
import {
    FlaskConical, Microscope, BookOpen,
    Globe, Users, Zap,
    ArrowRight, ExternalLink,
    Award, GraduationCap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

export default function SciencePage() {
    const { t, isRTL } = useLanguage();

    const modules = [
        {
            title: t("science.grants"),
            desc: "Decentralized funding for breakthrough research projects through community voting.",
            icon: Award,
            color: "text-purple-400",
            bg: "bg-purple-400/10",
            partner: "DeSci Foundation"
        },
        {
            title: t("science.peer_review"),
            desc: "Transparent and incentivized peer review process on the blockchain.",
            icon: Microscope,
            color: "text-cyan-400",
            bg: "bg-cyan-400/10",
            partner: "Orvium"
        },
        {
            title: t("science.open_access"),
            desc: "Universal access to scientific data and publications without paywalls.",
            icon: BookOpen,
            color: "text-amber-400",
            bg: "bg-amber-400/10",
            partner: "Frankl"
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
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-widest mb-8">
                            <FlaskConical size={14} /> {t("nav.science")} Lab
                        </div>
                        <h1 className="text-6xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
                            Decentralized <span className="text-glow-purple">Open</span> Science
                        </h1>
                        <p className="text-xl text-slate-400 leading-relaxed">
                            {t("science.subtitle")}
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
                            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/5 blur-3xl rounded-full group-hover:bg-purple-500/10 transition-colors" />
                            <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8", mod.bg, mod.color)}>
                                <mod.icon size={32} />
                            </div>
                            <h3 className="text-2xl font-black mb-4">{mod.title}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed mb-8">
                                {mod.desc}
                            </p>
                            <div className={cn("flex items-center justify-between mt-auto pt-6 border-t border-white/5", isRTL && "flex-row-reverse")}>
                                <div className="text-[10px] font-black text-slate-500 uppercase">Protocol</div>
                                <div className="text-xs font-bold text-white flex items-center gap-2">
                                    {mod.partner} <ExternalLink size={12} className="text-slate-500" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* DeSci Movement Section */}
                <div className="glass-card p-12 border-purple-500/20 bg-purple-500/[0.02] relative overflow-hidden">
                    <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full" />
                    <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-12 items-center", isRTL && "direction-rtl")}>
                        <div>
                            <h2 className="text-4xl font-black mb-6 flex items-center gap-4">
                                <GraduationCap className="text-purple-400" /> Join the DeSci Movement
                            </h2>
                            <p className="text-lg text-slate-400 leading-relaxed mb-8">
                                Civilization Protocol Earth is a core contributor to the Decentralized Science movement. We provide the infrastructure for researchers to share data, get funded, and collaborate without traditional institutional barriers.
                            </p>
                            <button className="px-8 py-4 bg-purple-500 text-white rounded-2xl font-black flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-purple-500/20">
                                Explore Research Projects <ArrowRight size={20} className={cn(isRTL && "rotate-180")} />
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: "Active Grants", val: "124", icon: Award },
                                { label: "Researchers", val: "8,450", icon: Users },
                                { label: "Papers Published", val: "1,204", icon: BookOpen },
                                { label: "Data Points", val: "12.4M", icon: Zap },
                            ].map(item => (
                                <div key={item.label} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
                                    <item.icon className="text-purple-400 mb-4" size={24} />
                                    <div className="text-sm font-black text-white mb-1">{item.val}</div>
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
