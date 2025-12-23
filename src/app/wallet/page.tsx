"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Wallet, ArrowUpRight, ArrowDownLeft,
    Gift, History, Coins, CreditCard,
    ArrowLeftRight, X, Search,
    CheckCircle2, AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const balances = [
    { name: "VODG", amount: "1,247.50", usd: "$1,247.50", color: "text-cyan-400", icon: Coins },
    { name: "VODP", amount: "5,680.25", usd: "$5,680.25", color: "text-blue-400", icon: CreditCard },
    { name: "VODU", amount: "12,450.75", usd: "$12,450.75", color: "text-emerald-400", icon: Gift },
];

const transactions = [
    { type: "Получение", amount: "+500 VODG", date: "2 часа назад", icon: ArrowDownLeft, color: "text-emerald-400" },
    { type: "Отправка", amount: "-100 VODP", date: "1 день назад", icon: ArrowUpRight, color: "text-rose-400" },
    { type: "Награда", amount: "+50 VODU", date: "3 дня назад", icon: Gift, color: "text-cyan-400" },
];

export default function WalletPage() {
    const [isSendModalOpen, setIsSendModalOpen] = useState(false);
    const [sendStep, setSendStep] = useState(1);

    return (
        <div className="max-w-7xl mx-auto px-4 py-24">
            <div className="mb-12">
                <h1 className="text-5xl font-black mb-4 tracking-tighter text-white">Кошелек</h1>
                <p className="text-slate-400 text-lg">Управление вашими цифровыми активами Civilization Protocol</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Balances */}
                <div className="lg:col-span-2 space-y-8">
                    <h2 className="text-2xl font-black text-white flex items-center gap-3">
                        <Wallet className="text-cyan-400" /> Ваши балансы
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {balances.map((balance, i) => (
                            <motion.div
                                key={balance.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card p-6 border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all"
                            >
                                <div className={cn("w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6", balance.color)}>
                                    <balance.icon size={24} />
                                </div>
                                <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">{balance.name}</div>
                                <div className="text-3xl font-black text-white mb-1">{balance.amount}</div>
                                <div className="text-sm text-slate-500">{balance.usd}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Transaction History */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-black text-white flex items-center gap-3 mb-8">
                            <History className="text-cyan-400" /> История транзакций
                        </h2>
                        <div className="space-y-4">
                            {transactions.map((tx, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="glass-card p-6 flex items-center justify-between border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={cn("w-12 h-12 rounded-full bg-white/5 flex items-center justify-center", tx.color)}>
                                            <tx.icon size={20} />
                                        </div>
                                        <div>
                                            <div className="text-lg font-bold text-white">{tx.type}</div>
                                            <div className="text-xs text-slate-500">{tx.date}</div>
                                        </div>
                                    </div>
                                    <div className={cn("text-xl font-black", tx.color)}>{tx.amount}</div>
                                </motion.div>
                            ))}
                        </div>
                        <button className="w-full mt-8 py-4 glass border-white/10 rounded-2xl text-sm font-black uppercase tracking-widest text-slate-500 hover:text-white transition-all">
                            Показать все транзакции
                        </button>
                    </div>
                </div>

                {/* Actions Sidebar */}
                <div className="space-y-8">
                    <div className="glass-card p-8 bg-cyan-500/[0.02] border-cyan-500/20">
                        <h3 className="text-xl font-black text-white mb-8">Быстрые действия</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => {
                                    setIsSendModalOpen(true);
                                    setSendStep(1);
                                }}
                                className="flex flex-col items-center justify-center p-6 rounded-2xl glass border-white/5 hover:bg-white/10 transition-all group"
                            >
                                <ArrowUpRight className="text-cyan-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
                                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Отправить</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-6 rounded-2xl glass border-white/5 hover:bg-white/10 transition-all group">
                                <ArrowDownLeft className="text-emerald-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
                                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Получить</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-6 rounded-2xl glass border-white/5 hover:bg-white/10 transition-all group">
                                <ArrowLeftRight className="text-purple-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
                                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Обменять</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-6 rounded-2xl glass border-white/5 hover:bg-white/10 transition-all group">
                                <Gift className="text-amber-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
                                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Стейкинг</span>
                            </button>
                        </div>
                    </div>

                    <div className="glass-card p-8 border-white/5 bg-white/[0.01]">
                        <h3 className="text-xl font-black text-white mb-6">Безопасность</h3>
                        <p className="text-sm text-slate-400 leading-relaxed mb-8">
                            Ваш кошелек защищен технологией мультиподписи и аппаратным шифрованием. Никогда не передавайте свою сид-фразу третьим лицам.
                        </p>
                        <button className="w-full py-4 glass border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest text-cyan-400 hover:bg-cyan-500/10 transition-all">
                            Резервное копирование
                        </button>
                    </div>
                </div>
            </div>

            {/* Send Modal */}
            <AnimatePresence>
                {isSendModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSendModalOpen(false)}
                            className="absolute inset-0 bg-ocean-deep/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-md glass-card p-8 border-white/10 bg-slate-900 shadow-2xl"
                        >
                            <button
                                onClick={() => setIsSendModalOpen(false)}
                                className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>

                            {sendStep === 1 && (
                                <div className="space-y-8">
                                    <h2 className="text-2xl font-black text-white">Отправить VOD</h2>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Адрес получателя</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    placeholder="0x..."
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-sm focus:outline-none focus:border-cyan-500/50"
                                                />
                                                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Сумма</label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    placeholder="0.00"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-sm focus:outline-none focus:border-cyan-500/50"
                                                />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400 font-black text-xs">VODG</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSendStep(2)}
                                        className="w-full py-4 bg-cyan-500 text-ocean-deep font-black rounded-xl hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20"
                                    >
                                        Продолжить
                                    </button>
                                </div>
                            )}

                            {sendStep === 2 && (
                                <div className="text-center py-8 space-y-8">
                                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto">
                                        <CheckCircle2 className="text-emerald-400" size={40} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-white mb-2">Транзакция отправлена</h2>
                                        <p className="text-slate-400 text-sm">Ваши средства поступят получателю в течение нескольких секунд.</p>
                                    </div>
                                    <button
                                        onClick={() => setIsSendModalOpen(false)}
                                        className="w-full py-4 glass border-white/10 text-white font-black rounded-xl hover:bg-white/5 transition-all"
                                    >
                                        Закрыть
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
