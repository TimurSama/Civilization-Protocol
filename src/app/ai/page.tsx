"use client";

import { motion } from "framer-motion";
import { Brain, Cpu, TrendingUp, Zap } from "lucide-react";

const features = [
    { title: "Предиктивный анализ", desc: "Прогнозирование дефицита воды на основе исторических данных.", icon: TrendingUp },
    { title: "ML-модели очистки", desc: "Оптимизация процессов фильтрации через машинное обучение.", icon: Zap },
    { title: "Синхронизация с IoT", desc: "Обработка потоковых данных от сенсоров в реальном времени.", icon: Cpu },
];

export default function AIPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16 text-center"
            >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-cyan-glow/10 text-cyan-glow mb-6">
                    <Brain size={40} />
                </div>
                <h1 className="text-5xl font-black mb-4 text-glow-cyan">Слой ИИ (AI Layer)</h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                    Интеллектуальное ядро Civilization Protocol, обеспечивающее обработку данных, прогнозирование и автоматизацию управления водными ресурсами.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {features.map((f, i) => (
                    <motion.div
                        key={f.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-8"
                    >
                        <f.icon className="text-cyan-glow mb-4" size={32} />
                        <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                    </motion.div>
                ))}
            </div>

            <div className="glass-card p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-glow/5 blur-3xl rounded-full -mr-32 -mt-32" />
                <h2 className="text-3xl font-black mb-8">Статус разработки моделей</h2>
                <div className="space-y-8">
                    {[
                        { name: "Прогноз паводков", progress: "15%" },
                        { name: "Анализ качества (IoT)", progress: "10%" },
                        { name: "Оптимизация потребления", progress: "5%" }
                    ].map((m) => (
                        <div key={m.name}>
                            <div className="flex justify-between mb-2 text-sm font-bold">
                                <span>{m.name}</span>
                                <span className="text-cyan-glow">{m.progress}</span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-cyan-glow" style={{ width: m.progress }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
