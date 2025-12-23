"use client";

import { motion } from "framer-motion";
import { Calendar, TrendingUp, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

export default function NewsSidebar() {
    const { t, isRTL } = useLanguage();

    const trending = [
        { id: 1, tag: "Civilization ProtocolEarth", posts: "12.4k" },
        { id: 2, tag: "CleanWaterDAO", posts: "8.2k" },
        { id: 3, tag: "FractalixLab", posts: "5.1k" },
        { id: 4, tag: "SDG6", posts: "9.8k" },
        { id: 5, tag: "WaterCrisis", posts: "7.3k" },
        { id: 6, tag: "BlockchainWater", posts: "6.1k" },
        { id: 7, tag: "IoTMonitoring", posts: "4.9k" },
        { id: 8, tag: "AralSea", posts: "3.7k" },
    ];

    const upcomingEvents = [
        {
            id: 1,
            title: t("feed.eabr_title"),
            date: t("feed.eabr_date"),
            type: t("feed.grants"),
            color: "text-cyan-400"
        },
        {
            id: 2,
            title: t("feed.presale_title"),
            date: t("common.live_now"),
            type: t("feed.investments"),
            color: "text-emerald-400"
        },
        {
            id: 3,
            title: "UN-Water Summit 2025",
            date: "15 марта 2025",
            type: "Конференция",
            color: "text-blue-400"
        },
        {
            id: 4,
            title: "Запуск TON интеграции",
            date: "28 февраля 2025",
            type: "Технологии",
            color: "text-purple-400"
        },
        {
            id: 5,
            title: "DAO голосование #VOD-125",
            date: "До 15 января",
            type: "Управление",
            color: "text-rose-400"
        }
    ];

    return (
        <div className={cn("space-y-6 sticky top-24", isRTL && "text-right")}>
            {/* PreSale Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-6 border-emerald-500/20 bg-emerald-500/[0.02] relative overflow-hidden group"
            >
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 blur-3xl rounded-full group-hover:bg-emerald-500/20 transition-colors" />
                <div className={cn("flex items-center gap-2 text-emerald-400 mb-4", isRTL && "flex-row-reverse")}>
                    <Zap size={18} className="animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{t("common.live_now")}</span>
                </div>
                <h4 className="text-lg font-black mb-2">{t("feed.presale_title")}</h4>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                    {t("feed.presale_desc")}
                </p>
                <button className="w-full py-3 bg-emerald-500 text-ocean-deep rounded-xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-all shadow-lg shadow-emerald-500/20">
                    {t("common.participate")}
                </button>
            </motion.div>

            {/* Events */}
            <div className="glass-card p-6 border-white/5 bg-white/[0.01]">
                <h4 className={cn("text-sm font-black uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2", isRTL && "flex-row-reverse")}>
                    <Calendar size={16} /> {t("common.events")}
                </h4>
                <div className="space-y-6">
                    {upcomingEvents.map(event => (
                        <div key={event.id} className="group cursor-pointer">
                            <div className={cn("text-[10px] font-black uppercase tracking-widest mb-1", event.color)}>
                                {event.type}
                            </div>
                            <div className="text-sm font-bold group-hover:text-cyan-400 transition-colors leading-tight mb-1">
                                {event.title}
                            </div>
                            <div className="text-[10px] text-slate-600 font-mono italic">{event.date}</div>
                        </div>
                    ))}
                </div>
                <Link href="/missions" className={cn("mt-8 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-cyan-500 hover:text-cyan-400 transition-colors pt-6 border-t border-white/5", isRTL && "flex-row-reverse")}>
                    {t("nav.missions")} <ArrowRight size={14} className={cn(isRTL && "rotate-180")} />
                </Link>
            </div>

            {/* Trending */}
            <div className="glass-card p-6 border-white/5 bg-white/[0.01]">
                <h4 className={cn("text-sm font-black uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2", isRTL && "flex-row-reverse")}>
                    <TrendingUp size={16} /> {t("common.trending")}
                </h4>
                <div className="space-y-4">
                    {trending.map(item => (
                        <div key={item.id} className={cn("flex justify-between items-center group cursor-pointer", isRTL && "flex-row-reverse")}>
                            <div className={cn(isRTL && "text-right")}>
                                <div className="text-sm font-bold group-hover:text-white transition-colors">#{item.tag}</div>
                                <div className="text-[10px] text-slate-600 font-mono">{item.posts} {t("common.posts")}</div>
                            </div>
                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                                <ArrowRight size={14} className={cn("text-slate-500", isRTL && "rotate-180")} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Links */}
            <div className={cn("px-6 py-4 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-bold text-slate-600 uppercase tracking-tighter", isRTL && "flex-row-reverse")}>
                <Link href="/whitepaper" className="hover:text-slate-400 transition-colors">{t("nav.whitepaper")}</Link>
                <Link href="/about" className="hover:text-slate-400 transition-colors">About</Link>
                <Link href="/privacy" className="hover:text-slate-400 transition-colors">Privacy</Link>
                <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms</Link>
                <div className={cn("w-full mt-4 text-slate-700 font-black", isRTL && "text-right")}>
                    © 2025 Fractalix.lab
                </div>
            </div>
        </div>
    );
}
