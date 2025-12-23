"use client";

import { motion } from "framer-motion";
import { MessageSquare, Users, Share2, Globe, MessageCircle, Target, Vote, User, Shield, Award, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function SocialPage() {
    const socialHub = [
        {
            title: "Сообщения",
            desc: "Личные и групповые чаты с экспертами и участниками сообщества.",
            icon: MessageSquare,
            href: "/social/messages",
            color: "text-cyan-400",
            bg: "bg-cyan-500/5",
            stats: "12 новых"
        },
        {
            title: "Друзья и Контакты",
            desc: "Ваша сеть профессиональных контактов и единомышленников.",
            icon: Users,
            href: "/social/friends",
            color: "text-emerald-400",
            bg: "bg-emerald-500/5",
            stats: "156 контактов"
        },
        {
            title: "DAO Governance",
            desc: "Участвуйте в голосовании и определяйте будущее водных ресурсов планеты.",
            icon: Vote,
            href: "/dao",
            color: "text-purple-400",
            bg: "bg-purple-500/5",
            stats: "1,245 предложений"
        },
        {
            title: "Группы и Сообщества",
            desc: "Объединяйтесь с единомышленниками для решения локальных проблем.",
            icon: Globe,
            href: "/groups",
            color: "text-blue-400",
            bg: "bg-blue-500/5",
            stats: "156 активных групп"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16 text-center"
            >
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-indigo-500/10 text-indigo-500 mb-8 border border-indigo-500/20 shadow-2xl shadow-indigo-500/10">
                    <Users size={48} />
                </div>
                <h1 className="text-6xl font-black mb-4 text-glow-indigo tracking-tighter">Социальный Слой</h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    Центральный хаб взаимодействия сообщества Civilization Protocol. Здесь рождаются идеи и принимаются решения.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {socialHub.map((item, i) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Link href={item.href} className="block group">
                            <div className="glass-card p-8 h-full border-white/5 bg-white/[0.02] hover:border-indigo-500/30 transition-all relative overflow-hidden">
                                <div className={cn("absolute top-0 right-0 w-32 h-32 blur-3xl opacity-10", item.bg)} />
                                <div className="flex items-start gap-6 relative z-10">
                                    <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 shrink-0 group-hover:scale-110 transition-transform", item.bg, item.color)}>
                                        <item.icon size={32} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-2xl font-black text-white group-hover:text-indigo-400 transition-colors">{item.title}</h3>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 bg-white/5 px-2 py-1 rounded-lg">{item.stats}</span>
                                        </div>
                                        <p className="text-slate-400 leading-relaxed mb-6">{item.desc}</p>
                                        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-500 group-hover:translate-x-2 transition-transform">
                                            Перейти <ChevronRight size={16} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Discussion Preview */}
            <div className="glass-card p-10 border-white/5 bg-white/[0.02]">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl font-black flex items-center gap-4">
                        <MessageSquare className="text-indigo-500" size={32} />
                        Актуальные обсуждения
                    </h2>
                    <button className="text-xs font-black uppercase tracking-widest text-indigo-500 hover:underline">Все темы</button>
                </div>
                <div className="space-y-4">
                    {[
                        { title: "Технологии очистки 2025: Мембранные системы", replies: 156, category: "Технологии", author: "Alex_Tech" },
                        { title: "Мониторинг в Центральной Азии: Новые вызовы", replies: 89, category: "Экология", author: "Eco_Guard" },
                        { title: "Предложения по DAO #VOD-124: Обсуждение", replies: 234, category: "Управление", author: "VOD_Admin" }
                    ].map((topic) => (
                        <div key={topic.title} className="p-6 bg-white/[0.03] rounded-2xl border border-white/5 hover:bg-white/[0.05] hover:border-indigo-500/20 transition-all cursor-pointer flex items-center justify-between group">
                            <div className="flex items-center gap-6">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-indigo-400 transition-colors">
                                    <User size={20} />
                                </div>
                                <div>
                                    <div className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mb-1">{topic.category} • {topic.author}</div>
                                    <div className="font-bold text-lg text-slate-200 group-hover:text-white transition-colors">{topic.title}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 text-[10px] text-slate-500 font-black uppercase tracking-widest">
                                <span className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-xl"><MessageCircle size={14} className="text-indigo-500" /> {topic.replies}</span>
                                <span className="flex items-center gap-2 hover:text-white transition-colors"><Share2 size={14} /></span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
