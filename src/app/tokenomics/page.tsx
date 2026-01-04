"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Droplets, Calculator, TrendingUp, Shield, Globe, Coins,
  BarChart3, PieChart, LineChart, Target, Zap, Lock,
  CheckCircle2, AlertCircle, Info, ArrowRight, Download,
  Copy, Check, Sparkles, Award, Gift, Users, Building2,
  Cpu, Database, Network, Eye, Play, Pause
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import BuyTokenWidget from "@/components/BuyTokenWidget";

// Constants
const EARTH_WATER_VOLUME = 1_386_000_000; // km³
const FRESH_WATER_VOLUME = 35_000_000; // km³
const ACCESSIBLE_WATER = 10_500_000; // km³
const DRINKABLE_WATER = 105_000; // km³ (1% of fresh)
const LITERS_PER_KM3 = 1_000_000_000_000; // 1 trillion liters

const MAX_SUPPLY = DRINKABLE_WATER * LITERS_PER_KM3; // 105 quadrillion VOD

const BASE_PRICE = 0.005; // $0.005 per VOD (per liter)

// Presale tiers
const presaleTiers = [
  {
    name: "Seed Round",
    price: 0.0025,
    min: 10000,
    max: 500000,
    bonus: 50,
    lock: "12 months + 24 months linear",
    color: "from-purple-500 to-pink-600",
    available: true,
  },
  {
    name: "Private Round",
    price: 0.0035,
    min: 5000,
    max: 1000000,
    bonus: 30,
    lock: "6 months + 18 months linear",
    color: "from-blue-500 to-cyan-600",
    available: true,
  },
  {
    name: "Public Sale",
    price: 0.0045,
    min: 100,
    max: null,
    bonus: 10,
    lock: "No lock",
    color: "from-green-500 to-emerald-600",
    available: true,
  },
];

// Staking pools
const stakingPools = [
  {
    name: "Governance Pool",
    apy: 10,
    min: 10000,
    lock: "30-365 days",
    rights: "DAO Voting",
    color: "cyan",
  },
  {
    name: "Data Access Pool",
    apy: 12,
    min: 50000,
    lock: "90-365 days",
    rights: "Premium Data",
    color: "blue",
  },
  {
    name: "Project Participation",
    apy: 15,
    min: 100000,
    lock: "180-365 days",
    rights: "TokenHub Access",
    color: "purple",
  },
];

export default function TokenomicsPage() {
  const [version, setVersion] = useState<"v1" | "v2">("v2");
  const [investment, setInvestment] = useState(50000);
  const [selectedTier, setSelectedTier] = useState(0);
  const [earlyBird, setEarlyBird] = useState(true);
  const [referral, setReferral] = useState(false);
  const [volume, setVolume] = useState(0);
  const [stakeAmount, setStakeAmount] = useState(100000);
  const [stakeDays, setStakeDays] = useState(365);
  const [selectedPool, setSelectedPool] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);

  // Calculate investment returns
  const calculateInvestment = () => {
    const tier = presaleTiers[selectedTier];
    const baseTokens = investment / tier.price;
    
    const bonuses = {
      tier: baseTokens * (tier.bonus / 100),
      earlyBird: earlyBird ? baseTokens * 0.2 : 0,
      volume: baseTokens * (volume / 100),
      referral: referral ? baseTokens * 0.05 : 0,
    };
    
    const totalBonus = Object.values(bonuses).reduce((a, b) => a + b, 0);
    const totalTokens = baseTokens + totalBonus;
    const effectivePrice = investment / totalTokens;
    const discount = ((tier.price - effectivePrice) / tier.price) * 100;
    
    return {
      baseTokens,
      bonuses,
      totalTokens,
      effectivePrice,
      discount,
    };
  };

  // Calculate staking returns
  const calculateStaking = () => {
    const pool = stakingPools[selectedPool];
    const annualReward = (stakeAmount * pool.apy) / 100;
    const dailyReward = annualReward / 365;
    const totalReward = (annualReward * stakeDays) / 365;
    const finalBalance = stakeAmount + totalReward;
    const roi = (totalReward / stakeAmount) * 100;
    
    return {
      annualReward,
      dailyReward,
      totalReward,
      finalBalance,
      roi,
    };
  };

  const investmentResult = calculateInvestment();
  const stakingResult = calculateStaking();

  // Volume bonus calculation
  useEffect(() => {
    if (investment >= 1000000) setVolume(25);
    else if (investment >= 500000) setVolume(20);
    else if (investment >= 100000) setVolume(15);
    else if (investment >= 50000) setVolume(10);
    else if (investment >= 10000) setVolume(5);
    else setVolume(0);
  }, [investment]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-deep via-slate-900 to-ocean-deep py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Droplets className="text-cyan-glow" size={48} />
            <h1 className="text-5xl md:text-6xl font-black">VOD Tokenomics</h1>
          </div>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
            Революционная модель токеномики, обеспеченная реальным ресурсом — водой.
            Стабильная цена, независимая от спекуляций.
          </p>

          {/* Version Switcher */}
          <div className="flex justify-center mb-8">
            <div className="glass-card p-2 rounded-xl inline-flex gap-2">
              <button
                onClick={() => setVersion("v1")}
                className={cn(
                  "px-6 py-3 rounded-lg font-bold transition-all",
                  version === "v1"
                    ? "bg-cyan-500 text-ocean-deep"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Версия 1.0
              </button>
              <button
                onClick={() => setVersion("v2")}
                className={cn(
                  "px-6 py-3 rounded-lg font-bold transition-all",
                  version === "v2"
                    ? "bg-cyan-500 text-ocean-deep"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Версия 2.0
              </button>
            </div>
          </div>

          {/* Version-specific stats */}
          <div className="flex flex-wrap justify-center gap-4">
            {version === "v1" ? (
              <>
                <div className="px-4 py-2 glass rounded-xl">
                  <div className="text-sm text-slate-500">Базовая цена</div>
                  <div className="text-2xl font-black text-cyan-glow">$1.3 / VOD</div>
                </div>
                <div className="px-4 py-2 glass rounded-xl">
                  <div className="text-sm text-slate-500">Макс. эмиссия</div>
                  <div className="text-2xl font-black text-purple-400">1.386 млрд</div>
                </div>
                <div className="px-4 py-2 glass rounded-xl">
                  <div className="text-sm text-slate-500">1 VOD =</div>
                  <div className="text-2xl font-black text-emerald-400">1 м³ воды</div>
                </div>
              </>
            ) : (
              <>
                <div className="px-4 py-2 glass rounded-xl">
                  <div className="text-sm text-slate-500">Базовая цена</div>
                  <div className="text-2xl font-black text-cyan-glow">$0.005 / VOD</div>
                </div>
                <div className="px-4 py-2 glass rounded-xl">
                  <div className="text-sm text-slate-500">Макс. эмиссия</div>
                  <div className="text-2xl font-black text-purple-400">105 квадр.</div>
                </div>
                <div className="px-4 py-2 glass rounded-xl">
                  <div className="text-sm text-slate-500">1 VOD =</div>
                  <div className="text-2xl font-black text-emerald-400">1 литр воды</div>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Key Principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { icon: <Shield size={32} />, title: "Обеспечен водой", desc: "1 VOD = 1 литр чистой воды" },
            { icon: <TrendingUp size={32} />, title: "Стабильная цена", desc: "$0.005, не зависит от спекуляций" },
            { icon: <Globe size={32} />, title: "Глобальная доступность", desc: "Одинаковая цена для всех" },
            { icon: <Lock size={32} />, title: "Физический предел", desc: "Эмиссия = объём воды на Земле" },
          ].map((principle, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="glass-card p-6 text-center"
            >
              <div className="text-cyan-glow mb-4 flex justify-center">{principle.icon}</div>
              <h3 className="font-bold text-lg mb-2">{principle.title}</h3>
              <p className="text-sm text-slate-400">{principle.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Water Volume Visualization */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-black mb-8 text-center">Объём воды на Земле</h2>
          <div className="glass-card p-8">
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {[
                { label: "Вся вода", value: EARTH_WATER_VOLUME, unit: "км³", color: "blue", percent: 100 },
                { label: "Пресная вода", value: FRESH_WATER_VOLUME, unit: "км³", color: "cyan", percent: 2.5 },
                { label: "Доступная", value: ACCESSIBLE_WATER, unit: "км³", color: "green", percent: 0.76 },
                { label: "Питьевая", value: DRINKABLE_WATER, unit: "км³", color: "emerald", percent: 0.0076 },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className={`text-4xl font-black text-${item.color}-400 mb-2`}>
                    {item.value.toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-500 mb-2">{item.label}</div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2, duration: 1 }}
                      className={`h-full bg-${item.color}-500`}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-6 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-slate-500">Максимальная эмиссия VOD</div>
                  <div className="text-3xl font-black text-cyan-glow">
                    {MAX_SUPPLY.toLocaleString()} VOD
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-500">1 VOD =</div>
                  <div className="text-2xl font-black text-emerald-400">1 литр</div>
                </div>
              </div>
              <p className="text-sm text-slate-400">
                Эмиссия ограничена физическим объёмом питьевой воды на планете. 
                Токен не даёт право на воду, а служит средством контроля и прозрачности.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Price Model */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-black mb-8 text-center">Модель ценообразования</h2>
          <div className="glass-card p-8">
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {[
                { label: "Источник", value: "$0.001", color: "blue" },
                { label: "Очистка", value: "$0.002", color: "cyan" },
                { label: "Доставка", value: "$0.001", color: "green" },
                { label: "Верификация", value: "$0.001", color: "purple" },
              ].map((item, i) => (
                <div key={i} className="text-center p-4 rounded-xl bg-white/5">
                  <div className={`text-2xl font-black text-${item.color}-400 mb-2`}>
                    {item.value}
                  </div>
                  <div className="text-sm text-slate-400">{item.label}</div>
                </div>
              ))}
            </div>
            
            <div className="p-6 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 text-center">
              <div className="text-sm text-slate-500 mb-2">Итоговая цена</div>
              <div className="text-5xl font-black text-emerald-400 mb-4">$0.005 / VOD</div>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Стабильная цена, привязанная к реальной себестоимости воды. 
                Не зависит от спекуляций и рыночных колебаний.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Investment Calculator */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-black mb-8 text-center flex items-center justify-center gap-3">
            <Calculator className="text-cyan-glow" size={32} />
            Калькулятор инвестиций
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="glass-card p-8 space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2">Раунд</label>
                <div className="grid grid-cols-3 gap-3">
                  {presaleTiers.map((tier, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedTier(i)}
                      className={cn(
                        "p-4 rounded-xl border-2 transition-all text-left",
                        selectedTier === i
                          ? `border-cyan-500 bg-gradient-to-r ${tier.color} text-white`
                          : "border-white/10 bg-white/5 hover:border-white/20"
                      )}
                    >
                      <div className="font-bold text-sm">{tier.name}</div>
                      <div className="text-xs opacity-75">${tier.price.toFixed(4)}/VOD</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">
                  Сумма инвестиции: ${investment.toLocaleString()}
                </label>
                <input
                  type="range"
                  min={presaleTiers[selectedTier].min}
                  max={presaleTiers[selectedTier].max || 10000000}
                  value={investment}
                  onChange={e => setInvestment(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>${presaleTiers[selectedTier].min.toLocaleString()}</span>
                  <span>${presaleTiers[selectedTier].max?.toLocaleString() || "∞"}</span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={earlyBird}
                    onChange={e => setEarlyBird(e.target.checked)}
                    className="w-5 h-5 rounded"
                  />
                  <span className="text-sm">Early Bird Bonus (+20%)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={referral}
                    onChange={e => setReferral(e.target.checked)}
                    className="w-5 h-5 rounded"
                  />
                  <span className="text-sm">Referral Bonus (+5%)</span>
                </label>
              </div>

              {volume > 0 && (
                <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="text-yellow-400" size={18} />
                    <span className="font-bold text-yellow-400">Volume Bonus: +{volume}%</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    При инвестиции ${investment.toLocaleString()}
                  </div>
                </div>
              )}
            </div>

            {/* Results */}
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold mb-6">Результаты расчёта</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center p-4 rounded-xl bg-white/5">
                  <span className="text-slate-400">Базовые токены</span>
                  <span className="text-2xl font-black text-cyan-400">
                    {investmentResult.baseTokens.toLocaleString(undefined, { maximumFractionDigits: 0 })} VOD
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-slate-500 mb-2">Бонусы:</div>
                  {Object.entries(investmentResult.bonuses).map(([key, value]) => (
                    value > 0 && (
                      <div key={key} className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                        <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="font-bold text-emerald-400">
                          +{value.toLocaleString(undefined, { maximumFractionDigits: 0 })} VOD
                        </span>
                      </div>
                    )
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
                  <div className="text-sm text-slate-500 mb-1">Итого токенов</div>
                  <div className="text-4xl font-black text-cyan-glow mb-2">
                    {investmentResult.totalTokens.toLocaleString(undefined, { maximumFractionDigits: 0 })} VOD
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Эффективная цена</span>
                    <span className="font-bold text-emerald-400">
                      ${investmentResult.effectivePrice.toFixed(6)} / VOD
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-slate-400">Скидка</span>
                    <span className="font-bold text-yellow-400">
                      {investmentResult.discount.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => copyToClipboard(
                  `Инвестиция: $${investment.toLocaleString()}\nТокенов: ${investmentResult.totalTokens.toLocaleString(undefined, { maximumFractionDigits: 0 })} VOD\nЭффективная цена: $${investmentResult.effectivePrice.toFixed(6)}/VOD`,
                  "investment"
                )}
                className="w-full py-3 bg-cyan-500 text-ocean-deep font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-cyan-400 transition-colors"
              >
                {copied === "investment" ? <Check size={18} /> : <Copy size={18} />}
                {copied === "investment" ? "Скопировано!" : "Копировать расчёт"}
              </button>
            </div>
          </div>
        </motion.section>

        {/* Staking Calculator */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-black mb-8 text-center flex items-center justify-center gap-3">
            <Zap className="text-yellow-400" size={32} />
            Калькулятор стейкинга
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="glass-card p-8 space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2">Staking Pool</label>
                <div className="space-y-3">
                  {stakingPools.map((pool, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedPool(i)}
                      className={cn(
                        "w-full p-4 rounded-xl border-2 transition-all text-left",
                        selectedPool === i
                          ? `border-${pool.color}-500 bg-${pool.color}-500/20`
                          : "border-white/10 bg-white/5 hover:border-white/20"
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold">{pool.name}</span>
                        <span className={`text-${pool.color}-400 font-bold`}>{pool.apy}% APY</span>
                      </div>
                      <div className="text-xs text-slate-500">
                        Мин: {pool.min.toLocaleString()} VOD • {pool.lock}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">
                  Сумма стейка: {stakeAmount.toLocaleString()} VOD
                </label>
                <input
                  type="range"
                  min={stakingPools[selectedPool].min}
                  max={10000000}
                  value={stakeAmount}
                  onChange={e => setStakeAmount(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">
                  Период: {stakeDays} дней
                </label>
                <input
                  type="range"
                  min={30}
                  max={365}
                  value={stakeDays}
                  onChange={e => setStakeDays(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>30 дней</span>
                  <span>365 дней</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold mb-6">Прогноз наград</h3>
              
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5">
                  <div className="text-sm text-slate-500 mb-1">Дневная награда</div>
                  <div className="text-2xl font-black text-cyan-400">
                    {stakingResult.dailyReward.toLocaleString(undefined, { maximumFractionDigits: 2 })} VOD
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5">
                  <div className="text-sm text-slate-500 mb-1">Годовая награда</div>
                  <div className="text-2xl font-black text-emerald-400">
                    {stakingResult.annualReward.toLocaleString(undefined, { maximumFractionDigits: 0 })} VOD
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30">
                  <div className="text-sm text-slate-500 mb-1">Награда за период</div>
                  <div className="text-4xl font-black text-yellow-400 mb-2">
                    {stakingResult.totalReward.toLocaleString(undefined, { maximumFractionDigits: 0 })} VOD
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Итоговый баланс</span>
                    <span className="font-bold text-white">
                      {stakingResult.finalBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })} VOD
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-slate-400">ROI</span>
                    <span className="font-bold text-emerald-400">
                      {stakingResult.roi.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Distribution Chart */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-black mb-8 text-center">Распределение Genesis (5%)</h2>
          <div className="glass-card p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Pie chart visualization */}
              <div className="space-y-4">
                {[
                  { label: "Public Sale", value: 20, color: "emerald" },
                  { label: "Private Round", value: 15, color: "blue" },
                  { label: "Seed Round", value: 10, color: "purple" },
                  { label: "Liquidity Pool", value: 15, color: "cyan" },
                  { label: "Reserve", value: 20, color: "yellow" },
                  { label: "Team & Advisors", value: 10, color: "orange" },
                  { label: "Community & Rewards", value: 10, color: "pink" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`w-4 h-4 rounded bg-${item.color}-500`} />
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">{item.label}</span>
                        <span className="text-sm font-bold">{item.value}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.value}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1, duration: 0.5 }}
                          className={`h-full bg-${item.color}-500`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5">
                  <div className="text-sm text-slate-500 mb-2">Общий объём Genesis</div>
                  <div className="text-3xl font-black text-cyan-glow">
                    5.25 квадр. VOD
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    5% от максимальной эмиссии
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5">
                  <div className="text-sm text-slate-500 mb-2">Стоимость Genesis</div>
                  <div className="text-2xl font-black text-emerald-400">
                    $18.375 трлн
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    При средней цене $0.0035/VOD
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Blockchain Specs */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-black mb-8 text-center flex items-center justify-center gap-3">
            <Network className="text-purple-400" size={32} />
            VOD Chain — Собственный блокчейн
          </h2>
          
          <div className="glass-card p-8">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                { label: "TPS", value: "10,000+", icon: <Zap size={24} />, color: "cyan" },
                { label: "Block Time", value: "1-2 сек", icon: <CheckCircle2 size={24} />, color: "blue" },
                { label: "Finality", value: "5-10 сек", icon: <CheckCircle2 size={24} />, color: "green" },
                { label: "Shards", value: "64", icon: <Database size={24} />, color: "purple" },
                { label: "Validators", value: "10,000+", icon: <Users size={24} />, color: "orange" },
                { label: "Gas Fee", value: "0.001 VOD", icon: <Coins size={24} />, color: "yellow" },
              ].map((spec, i) => (
                <div key={i} className="p-6 rounded-xl bg-white/5 text-center">
                  <div className={`text-${spec.color}-400 mb-3 flex justify-center`}>
                    {spec.icon}
                  </div>
                  <div className="text-sm text-slate-500 mb-1">{spec.label}</div>
                  <div className={`text-2xl font-black text-${spec.color}-400`}>
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20">
              <h3 className="font-bold text-lg mb-4">Hybrid Consensus: PoS + PoA</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="font-bold text-cyan-400 mb-2">Proof of Stake (80%)</div>
                  <ul className="text-sm text-slate-400 space-y-1">
                    <li>• Для токенов и транзакций</li>
                    <li>• Мин. стейк: 100,000 VOD</li>
                    <li>• Валидаторы: 1,000-5,000</li>
                    <li>• APY: 8-12%</li>
                  </ul>
                </div>
                <div>
                  <div className="font-bold text-purple-400 mb-2">Proof of Authority (20%)</div>
                  <ul className="text-sm text-slate-400 space-y-1">
                    <li>• Для данных и IoT</li>
                    <li>• Авторизованные узлы</li>
                    <li>• Гос., научные, инфраструктурные</li>
                    <li>• Фиксированные награды</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Buy Token Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <BuyTokenWidget variant="banner" source="tokenomics" />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass-card p-12">
            <h2 className="text-3xl font-black mb-4">Готовы инвестировать?</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Присоединяйтесь к революции в управлении водными ресурсами. 
              Токен, обеспеченный реальным ресурсом — водой.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/invest"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2"
              >
                <Coins size={20} /> Инвестировать
              </Link>
              <a
                href="/docs/TOKENOMICS_V2.md"
                download
                className="px-8 py-4 glass font-bold rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <Download size={20} /> Скачать документ
              </a>
              <Link
                href="/presentations/investors"
                className="px-8 py-4 glass font-bold rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <Eye size={20} /> Investor Deck
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


