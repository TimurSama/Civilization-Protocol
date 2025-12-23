"use client";

import { motion } from "framer-motion";
import { Brain, TrendingUp, AlertCircle, Sparkles, ChevronRight } from "lucide-react";
import { useState } from "react";

const predictions = [
    { month: "Янв", quality: 85, availability: 90, risk: "Low" },
    { month: "Фев", quality: 82, availability: 88, risk: "Low" },
    { month: "Мар", quality: 78, availability: 82, risk: "Medium" },
    { month: "Апр", quality: 75, availability: 70, risk: "High" },
    { month: "Май", quality: 70, availability: 65, risk: "High" },
    { month: "Июн", quality: 68, availability: 60, risk: "Critical" },
];

export default function AIAnalyticsEngine() {
    const [activeTab, setActiveTab] = useState("quality");

    return (
        <div className="glass-card overflow-hidden">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                        <Brain size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">Прогноз ИИ Civilization Protocol</h3>
                        <p className="text-xs text-slate-500">Анализ нейросетью на основе IoT и спутниковых данных</p>
                    </div>
                </div>
                <div className="flex p-1 glass rounded-lg">
                    <button
                        onClick={() => setActiveTab("quality")}
                        className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all ${activeTab === "quality" ? "bg-purple-500 text-white" : "text-slate-500"}`}
                    >
                        Качество
                    </button>
                    <button
                        onClick={() => setActiveTab("availability")}
                        className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all ${activeTab === "availability" ? "bg-purple-500 text-white" : "text-slate-500"}`}
                    >
                        Доступность
                    </button>
                </div>
            </div>

            <div className="relative h-64 flex items-end gap-4 px-4 mb-8">
                {/* Chart Grid */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-full h-px bg-white" />
                    ))}
                </div>

                {predictions.map((p, i) => {
                    const value = activeTab === "quality" ? p.quality : p.availability;
                    return (
                        <div key={p.month} className="flex-1 flex flex-col items-center gap-3 group relative">
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${value}%` }}
                                transition={{ delay: i * 0.1, type: "spring", stiffness: 50 }}
                                className={`w-full rounded-t-lg relative overflow-hidden ${p.risk === "Critical" ? "bg-red-500/40" :
                                        p.risk === "High" ? "bg-orange-500/40" :
                                            "bg-purple-500/40"
                                    } border-t border-purple-400/50`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10" />
                                <motion.div
                                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 bg-purple-400/20 blur-xl"
                                />
                            </motion.div>
                            <span className="text-[10px] font-bold text-slate-500">{p.month}</span>

                            {/* Tooltip */}
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 glass px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                                {value}% | Риск: {p.risk}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                        <AlertCircle size={18} />
                    </div>
                    <div>
                        <div className="text-xs font-bold mb-1">Рекомендация ИИ</div>
                        <p className="text-[10px] text-slate-400 leading-relaxed">
                            Ожидается критическое снижение уровня осадков в июне. Рекомендуется увеличить резервные запасы в узлах #12-45 и активировать протокол экономии "Aqua-Save 2.0".
                        </p>
                    </div>
                </div>

                <button className="w-full py-3 glass rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors group">
                    Подробный нейро-отчет <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
}
