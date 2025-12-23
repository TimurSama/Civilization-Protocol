"use client";

import { motion } from "framer-motion";
import { Puzzle, Box, Code, Layers, ExternalLink, Zap } from "lucide-react";

export default function IntegrationPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16"
            >
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
                        <Puzzle size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-glow-emerald">Интеграционный Слой</h1>
                        <p className="text-slate-400">API, SDK и инструменты для разработчиков и партнеров</p>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {[
                    { title: "VOD API", desc: "REST & WebSocket API для получения данных мониторинга в реальном времени.", icon: Code },
                    { title: "VOD SDK", desc: "Библиотеки для быстрой интеграции IoT-датчиков и мобильных приложений.", icon: Box },
                    { title: "Web3 Connect", desc: "Инструменты для взаимодействия со смарт-контрактами экосистемы.", icon: Layers },
                ].map((item, i) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-8 border-emerald-500/10"
                    >
                        <item.icon className="text-emerald-500 mb-4" size={32} />
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">{item.desc}</p>
                        <button className="flex items-center gap-2 text-xs font-black uppercase text-emerald-500 hover:text-emerald-400 transition-colors">
                            Документация <ExternalLink size={14} />
                        </button>
                    </motion.div>
                ))}
            </div>

            <div className="glass-card p-8 border-dashed border-emerald-500/20 bg-emerald-500/5">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                            <Zap className="text-emerald-500" size={24} />
                            Быстрый старт для партнеров
                        </h2>
                        <p className="text-slate-400 text-sm">Получите доступ к тестовой среде и начните интеграцию уже сегодня.</p>
                    </div>
                    <button className="px-8 py-4 bg-emerald-500 text-ocean-deep font-black rounded-xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20">
                        Стать партнером
                    </button>
                </div>
            </div>
        </div>
    );
}
