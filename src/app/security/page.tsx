"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, Key, Terminal } from "lucide-react";

export default function SecurityPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16"
            >
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                        <Shield size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-glow-blue">Слой Безопасности</h1>
                        <p className="text-slate-400">Защита данных и аудит экосистемы</p>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-card p-8">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Lock className="text-blue-500" size={24} />
                        Протоколы защиты
                    </h2>
                    <div className="space-y-4">
                        {[
                            "Многофакторная аутентификация (MFA)",
                            "Сквозное шифрование данных IoT",
                            "Аппаратные ключи доступа для операторов",
                            "Непрерывный ончейн-аудит транзакций"
                        ].map((item) => (
                            <div key={item} className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                                <Key size={16} className="text-blue-500" />
                                <span className="text-sm font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card p-8 bg-slate-900/50 border-blue-500/20">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Terminal className="text-blue-500" size={24} />
                        Мониторинг угроз
                    </h2>
                    <div className="font-mono text-xs text-blue-400/80 space-y-2">
                        <p>[SYSTEM] Инициализация системы безопасности...</p>
                        <p>[INFO] Проверка целостности блокчейн-узлов: OK</p>
                        <p>[INFO] Мониторинг трафика IoT: Активен</p>
                        <p>[WARN] Попытка несанкционированного доступа: Заблокировано (IP: 192.168.1.42)</p>
                        <p>[SYSTEM] Все системы работают в штатном режиме.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
