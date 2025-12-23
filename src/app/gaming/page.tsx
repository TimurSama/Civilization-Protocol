"use client";

import { motion } from "framer-motion";
import { Gamepad2, Trophy, Star, Target, Gift } from "lucide-react";

export default function GamingPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16 text-center"
            >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-pink-500/10 text-pink-500 mb-6 border border-pink-500/20">
                    <Gamepad2 size={40} />
                </div>
                <h1 className="text-5xl font-black mb-4 text-glow-pink">Игровой Слой</h1>
                <p className="text-xl text-slate-400">Геймификация экологии: играй, изучай, спасай планету.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {[
                    { title: "Квесты", desc: "Выполняйте задания по мониторингу воды в своем регионе.", icon: Target },
                    { title: "Достижения", desc: "Получайте уникальные NFT-награды за активность.", icon: Trophy },
                    { title: "Рейтинги", desc: "Соревнуйтесь с другими участниками за звание Хранителя Воды.", icon: Star },
                ].map((item, i) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-8 border-pink-500/10 hover:border-pink-500/30 transition-all"
                    >
                        <item.icon className="text-pink-500 mb-4" size={32} />
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                    </motion.div>
                ))}
            </div>

            <div className="glass-card p-8 bg-gradient-to-br from-pink-500/5 to-transparent">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Gift className="text-pink-500" />
                    Награды и бонусы
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-square rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center group cursor-pointer hover:bg-white/10 transition-all">
                            <div className="w-12 h-12 rounded-full bg-pink-500/20 mb-2 group-hover:scale-110 transition-transform" />
                            <div className="text-[10px] font-black uppercase text-slate-500">NFT Badge #{i}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
