"use client";

import { motion } from "framer-motion";
import { ArrowLeftRight, TrendingUp, TrendingDown, Search, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const pairs = [
    { name: "VODG/USDT", price: "1.00", change: "+2.5%", positive: true },
    { name: "VODP/USDT", price: "1.00", change: "-1.2%", positive: false },
    { name: "VODU/USDT", price: "1.00", change: "+0.8%", positive: true },
];

export default function ExchangePage() {
    const { t } = useLanguage();
    return (
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Trading Interface */}
                <div className="flex-[2] space-y-8">
                    {/* Pair Info */}
                    <div className="glass-card flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-cyan-glow/10 flex items-center justify-center text-cyan-glow">
                                <ArrowLeftRight size={20} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h2 className="text-xl font-black">VODG/USDT</h2>
                                    <ChevronDown size={16} className="text-slate-500" />
                                </div>
                                <div className="text-sm font-bold text-cyan-glow">$1.00 <span className="text-xs text-green-400 font-normal ml-2">+2.5%</span></div>
                            </div>
                        </div>
                        <div className="hidden md:flex gap-4 sm:gap-8 text-right">
                            <div>
                                <div className="text-[10px] text-slate-500 uppercase font-bold">{t("exchange.stats.high_24h")}</div>
                                <div className="text-xs sm:text-sm font-bold">$1.05</div>
                            </div>
                            <div>
                                <div className="text-[10px] text-slate-500 uppercase font-bold">{t("exchange.stats.low_24h")}</div>
                                <div className="text-xs sm:text-sm font-bold">$0.98</div>
                            </div>
                            <div>
                                <div className="text-[10px] text-slate-500 uppercase font-bold">{t("exchange.stats.volume_24h")}</div>
                                <div className="text-xs sm:text-sm font-bold">1.2M VODG</div>
                            </div>
                        </div>
                    </div>

                    {/* Chart Placeholder */}
                    <div className="glass-card h-64 sm:h-80 md:h-96 relative overflow-hidden">
                        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex gap-1.5 sm:gap-2">
                            {['1m', '5m', '15m', '1h', '4h', '1d'].map(t => (
                                <button key={t} className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] font-bold ${t === '1h' ? 'bg-cyan-glow text-ocean-deep' : 'glass text-slate-500'}`}>
                                    {t}
                                </button>
                            ))}
                        </div>
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="text-slate-700 font-black text-2xl sm:text-3xl md:text-4xl opacity-20 uppercase tracking-[10px] sm:tracking-[20px]">Trading View</div>
                            {/* Simple animated line for effect */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                <motion.path
                                    d="M0,200 L100,180 L200,220 L300,150 L400,190 L500,100 L600,130 L700,80 L800,120 L900,50 L1000,70"
                                    fill="none"
                                    stroke="rgba(34, 211, 238, 0.3)"
                                    strokeWidth="2"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Order Book & Trade Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                        <div className="glass-card p-4 sm:p-6">
                            <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">{t("exchange.order_book.title")}</h3>
                            <div className="space-y-1">
                                <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase mb-2">
                                    <span>{t("exchange.order_book.price")}</span>
                                    <span>{t("exchange.order_book.amount")}</span>
                                    <span>{t("exchange.order_book.total")}</span>
                                </div>
                                {[1.02, 1.01, 1.005].map(p => (
                                    <div key={p} className="flex justify-between text-xs py-1 text-red-400 bg-red-400/5 px-2 rounded">
                                        <span>{p.toFixed(3)}</span>
                                        <span>{(Math.random() * 1000).toFixed(0)}</span>
                                        <span>{(p * Math.random() * 1000).toFixed(2)}</span>
                                    </div>
                                ))}
                                <div className="text-center py-2 text-lg font-black text-cyan-glow">$1.000</div>
                                {[0.995, 0.99, 0.98].map(p => (
                                    <div key={p} className="flex justify-between text-xs py-1 text-green-400 bg-green-400/5 px-2 rounded">
                                        <span>{p.toFixed(3)}</span>
                                        <span>{(Math.random() * 1000).toFixed(0)}</span>
                                        <span>{(p * Math.random() * 1000).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass-card p-4 sm:p-6">
                            <div className="flex gap-3 sm:gap-4 mb-4 sm:mb-6">
                                <button className="flex-1 py-2 rounded-lg bg-green-500 text-ocean-deep font-bold text-xs sm:text-sm">{t("exchange.trade.buy")}</button>
                                <button className="flex-1 py-2 rounded-lg glass text-slate-400 font-bold text-xs sm:text-sm">{t("exchange.trade.sell")}</button>
                            </div>
                            <div className="space-y-3 sm:space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] text-slate-500 font-bold uppercase">{t("exchange.trade.price_label")}</label>
                                    <div className="relative">
                                        <input type="text" value="1.00" className="w-full glass p-2.5 sm:p-3 rounded-xl text-xs sm:text-sm focus:outline-none" />
                                        <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-[10px] sm:text-xs text-slate-500">USDT</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] text-slate-500 font-bold uppercase">{t("exchange.trade.amount_label")}</label>
                                    <div className="relative">
                                        <input type="text" placeholder="0.00" className="w-full glass p-2.5 sm:p-3 rounded-xl text-xs sm:text-sm focus:outline-none" />
                                        <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-[10px] sm:text-xs text-slate-500">VODG</span>
                                    </div>
                                </div>
                                <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                                    <span>{t("exchange.trade.available")}: 500.00 USDT</span>
                                    <span className="text-cyan-glow">{t("exchange.trade.max")}</span>
                                </div>
                                <button className="w-full py-3 sm:py-4 bg-green-500 text-ocean-deep font-black rounded-xl shadow-lg shadow-green-500/20 text-sm sm:text-base">
                                    {t("exchange.trade.buy_button").replace("{pair}", "VODG")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Market Sidebar */}
                <div className="flex-1 space-y-6">
                    <div className="glass-card p-4 sm:p-6">
                        <div className="relative mb-4 sm:mb-6">
                            <Search className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                            <input type="text" placeholder={t("exchange.trade.search_placeholder")} className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 glass rounded-xl text-xs focus:outline-none" />
                        </div>
                        <div className="space-y-4">
                            {pairs.map(pair => (
                                <div key={pair.name} className="flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-1 h-8 rounded-full ${pair.positive ? 'bg-green-400' : 'bg-red-400'} opacity-0 group-hover:opacity-100 transition-opacity`} />
                                        <div>
                                            <div className="text-sm font-bold">{pair.name}</div>
                                            <div className="text-[10px] text-slate-500">Vol: 1.2M</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-bold">${pair.price}</div>
                                        <div className={`text-[10px] font-bold ${pair.positive ? 'text-green-400' : 'text-red-400'}`}>{pair.change}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-card bg-gold-glow/5 border-gold-glow/20 p-4 sm:p-6">
                        <h3 className="font-bold mb-2 text-gold-glow text-sm sm:text-base">{t("exchange.liquidity.title")}</h3>
                        <p className="text-[10px] sm:text-xs text-slate-400 leading-relaxed">
                            {t("exchange.liquidity.description")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
