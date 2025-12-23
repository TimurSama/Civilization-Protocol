"use client";

import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Award, Search, FileText } from "lucide-react";

export default function EducationPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16 text-center"
            >
                <h1 className="text-5xl font-black mb-4 text-glow-gold">Наука и Образование</h1>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    Развитие знаний о воде через гранты, исследования и международные публикации.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {[
                    { title: "Гранты", icon: Award, color: "text-yellow-400" },
                    { title: "Публикации", icon: BookOpen, color: "text-blue-400" },
                    { title: "Исследования", icon: Search, color: "text-green-400" },
                    { title: "Курсы", icon: GraduationCap, color: "text-purple-400" }
                ].map((item, i) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 text-center group hover:border-white/20 transition-all"
                    >
                        <item.icon className={`${item.color} mx-auto mb-4 group-hover:scale-110 transition-transform`} size={40} />
                        <h3 className="font-bold">{item.title}</h3>
                    </motion.div>
                ))}
            </div>

            <div className="glass-card p-8">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                    <FileText className="text-gold-glow" />
                    Активные грантовые программы
                </h2>
                <div className="space-y-4">
                    {[
                        { name: "W-01: Стандарты мониторинга", budget: "$15,000", status: "Прием заявок" },
                        { name: "D-02: Citizen Science", budget: "$10,000", status: "В процессе" },
                        { name: "T-01: IoT Edge Computing", budget: "$25,000", status: "Планируется" }
                    ].map((g) => (
                        <div key={g.name} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                            <div>
                                <div className="font-bold">{g.name}</div>
                                <div className="text-xs text-slate-500">Бюджет: {g.budget}</div>
                            </div>
                            <div className="text-xs font-black uppercase tracking-widest text-gold-glow">{g.status}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
