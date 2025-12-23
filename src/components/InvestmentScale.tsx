"use client";

import { motion } from "framer-motion";
import { TrendingUp, Target, Users, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface InvestmentScaleProps {
    className?: string;
}

export default function InvestmentScale({ className }: InvestmentScaleProps) {
    const { t, isRTL } = useLanguage();
    const goal = 2000000; // $2M for Alpha
    const current = 150000; // $150k already invested/spent
    const percent = (current / goal) * 100;

    const milestones = [
        { amount: 0, label: "Concept", reached: true },
        { amount: 150000, label: "Seed / MVP", reached: true },
        { amount: 500000, label: "Core Dev", reached: false },
        { amount: 1200000, label: "Beta Test", reached: false },
        { amount: 2000000, label: "Alpha Launch", reached: false },
    ];

    return (
        <div className={cn("glass-card p-8 border-cyan-500/20 bg-cyan-500/[0.02]", className)}>
            <div className={cn("flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10", isRTL && "md:flex-row-reverse")}>
                <div className={cn(isRTL && "text-right")}>
                    <h3 className="text-2xl font-black text-white mb-2 flex items-center gap-3">
                        <TrendingUp className="text-cyan-400" /> {t("investment.progress")}
                    </h3>
                    <p className="text-slate-400 text-sm">{t("investment.fund")}</p>
                </div>
                <div className={cn("text-right", isRTL && "text-left")}>
                    <div className="text-3xl font-black text-glow-cyan">${current.toLocaleString()}</div>
                    <div className="text-xs font-black text-slate-500 uppercase tracking-widest">{t("investment.raised")} $2,000,000</div>
                </div>
            </div>

            <div className="relative pt-10 pb-16">
                {/* Progress Bar Background */}
                <div className="h-4 w-full bg-white/5 rounded-full border border-white/10 p-1">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percent}%` }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className={cn(
                            "h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.3)] relative",
                            isRTL && "bg-gradient-to-l"
                        )}
                    >
                        <div className={cn(
                            "absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg shadow-cyan-500/50 animate-pulse",
                            isRTL ? "-left-2" : "-right-2"
                        )} />
                    </motion.div>
                </div>

                {/* Milestones */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    {milestones.map((m, i) => {
                        const mPercent = (m.amount / goal) * 100;
                        return (
                            <div
                                key={m.label}
                                className="absolute top-0 flex flex-col items-center"
                                style={{
                                    [isRTL ? 'right' : 'left']: `${mPercent}%`,
                                    transform: isRTL ? "translateX(50%)" : "translateX(-50%)"
                                }}
                            >
                                <div className={cn(
                                    "w-3 h-3 rounded-full border-2 mb-2 transition-colors duration-500",
                                    m.reached ? "bg-cyan-500 border-cyan-400" : "bg-ocean-deep border-white/20"
                                )} />
                                <div className={cn(
                                    "text-[10px] font-black uppercase tracking-tighter whitespace-nowrap",
                                    m.reached ? "text-cyan-400" : "text-slate-600"
                                )}>
                                    {m.label}
                                </div>
                                <div className="text-[9px] font-mono text-slate-700 mt-1">
                                    ${(m.amount / 1000)}k
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 pt-8 border-t border-white/5", isRTL && "text-right")}>
                <div className={cn("flex items-center gap-4", isRTL && "flex-row-reverse")}>
                    <div className="p-3 rounded-xl bg-white/5 text-cyan-400">
                        <Target size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-black text-slate-500 uppercase">{t("investment.current_phase")}</div>
                        <div className="text-sm font-bold">Seed / MVP Refinement</div>
                    </div>
                </div>
                <div className={cn("flex items-center gap-4", isRTL && "flex-row-reverse")}>
                    <div className="p-3 rounded-xl bg-white/5 text-purple-400">
                        <Users size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-black text-slate-500 uppercase">{t("investment.backers")}</div>
                        <div className="text-sm font-bold">Fractalix, UNICAP, VODPROM</div>
                    </div>
                </div>
                <div className={cn("flex items-center gap-4", isRTL && "flex-row-reverse")}>
                    <div className="p-3 rounded-xl bg-white/5 text-emerald-400">
                        <Rocket size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-black text-slate-500 uppercase">{t("investment.next_milestone")}</div>
                        <div className="text-sm font-bold">Core Dev ($500k)</div>
                    </div>
                </div>
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 text-center">
                <p className="text-xs text-slate-400 italic">
                    {t("investment.disclaimer")}
                </p>
            </div>
        </div>
    );
}
