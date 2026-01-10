"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp, Shield, Globe, Users, Coins, Target, Zap, Award,
  CheckCircle2, ArrowRight, Download, Play, Mail, Calendar,
  Building2, Percent, DollarSign, Lock, ChevronDown, Star,
  BarChart3, FileText, Rocket, Clock, PieChart
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import BuyTokenWidget from "@/components/BuyTokenWidget";

const investmentTiers = [
  {
    tier: "Seed",
    minAmount: 10000,
    currency: "VOD",
    price: "$100",
    discount: "90%",
    benefits: [
      "Ранний доступ к платформе",
      "Базовые права голосования",
      "Pioneer Badge NFT",
      "x2 награды за активность",
      "Доступ к закрытому Telegram",
    ],
    allocation: "5%",
    vesting: "6 мес cliff, 12 мес линейно",
  },
  {
    tier: "Private",
    minAmount: 50000,
    currency: "VOD",
    price: "$450",
    discount: "70%",
    benefits: [
      "Все из Seed",
      "Приоритетный доступ к стейкингу",
      "Участие в Advisory Board",
      "Ежемесячные отчёты",
      "Прямая связь с командой",
    ],
    allocation: "10%",
    vesting: "3 мес cliff, 18 мес линейно",
    featured: true,
  },
  {
    tier: "Strategic",
    minAmount: 250000,
    currency: "VOD",
    price: "$2,000",
    discount: "50%",
    benefits: [
      "Все из Private",
      "Участие в DAO Council",
      "Эксклюзивные инвест-проекты",
      "Региональные права",
      "Белая этикетка решений",
    ],
    allocation: "15%",
    vesting: "1 мес cliff, 24 мес линейно",
  },
];

const tokenMetrics = [
  { label: "Название", value: "VOD Token" },
  { label: "Тикер", value: "VOD" },
  { label: "Сеть", value: "EVM-compatible" },
  { label: "Стандарт", value: "ERC-20" },
  { label: "Общее предложение", value: "1,000,000,000 VOD" },
  { label: "Initial Market Cap", value: "$5,000,000" },
  { label: "FDV", value: "$100,000,000" },
  { label: "Цена TGE", value: "$0.10" },
];

const tokenDistribution = [
  { name: "Ecosystem & Community", percent: 25, color: "bg-cyan-500" },
  { name: "Team & Advisors", percent: 20, color: "bg-purple-500" },
  { name: "Private Sale", percent: 15, color: "bg-blue-500" },
  { name: "Public Sale", percent: 10, color: "bg-green-500" },
  { name: "DAO Treasury", percent: 10, color: "bg-yellow-500" },
  { name: "Seed Round", percent: 10, color: "bg-pink-500" },
  { name: "Liquidity", percent: 5, color: "bg-orange-500" },
  { name: "Partnerships", percent: 5, color: "bg-red-500" },
];

const useOfFunds = [
  { name: "Product Development", percent: 40, icon: Rocket },
  { name: "Marketing & Growth", percent: 25, icon: TrendingUp },
  { name: "Operations", percent: 15, icon: Building2 },
  { name: "Legal & Compliance", percent: 10, icon: Shield },
  { name: "Reserve", percent: 10, icon: Lock },
];

const keyMetrics = [
  { label: "Целевой рынок", value: "$700B", desc: "Глобальный рынок воды" },
  { label: "TAM 2030", value: "$1T+", desc: "Прогноз роста" },
  { label: "Рост сегмента", value: "8.5%", desc: "CAGR" },
  { label: "ROI потенциал", value: "10-50x", desc: "При достижении целей" },
];

const milestones = [
  { date: "Q4 2023", title: "Концепция и исследование", status: "done" },
  { date: "Q1 2024", title: "MVP разработка", status: "done" },
  { date: "Q2 2024", title: "Seed раунд", status: "current" },
  { date: "Q3 2024", title: "Private Sale + TGE", status: "upcoming" },
  { date: "Q4 2024", title: "Экосистема запуск", status: "upcoming" },
  { date: "2025", title: "Масштабирование", status: "upcoming" },
];

const team = [
  { name: "Core Team", count: "8+", focus: "Блокчейн, AI, Water Tech" },
  { name: "Advisors", count: "5+", focus: "Инвестиции, GovTech, ESG" },
  { name: "Partners", count: "10+", focus: "TIIAME, UN SDG, VC" },
];

export default function InvestPage() {
  const [selectedTier, setSelectedTier] = useState<string | null>("Private");
  const [email, setEmail] = useState("");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400 mb-6">
          <Zap size={16} /> Инвестиционный раунд открыт
        </div>
        <h1 className="text-5xl md:text-6xl font-black mb-6">
          Инвестируйте в будущее
          <br />
          <span className="bg-gradient-to-r from-cyan-glow via-blue-400 to-purple-500 bg-clip-text text-transparent">
            управления водой
          </span>
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
          CivilizationProtocol создаёт глобальную децентрализованную экосистему для прозрачного 
          и эффективного управления водными ресурсами планеты
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => document.getElementById('tiers')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-cyan-glow to-blue-500 text-white font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_30px_rgba(34,211,238,0.3)]"
          >
            <Coins size={20} /> Инвестировать
          </button>
          <Link href="/presentation" className="px-8 py-4 glass rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2">
            <Play size={20} /> Pitch Deck
          </Link>
          <a href="/docs/whitepaper.pdf" className="px-8 py-4 glass rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2">
            <Download size={20} /> White Paper
          </a>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
      >
        {keyMetrics.map((metric, i) => (
          <div key={i} className="glass-card p-6 text-center">
            <div className="text-3xl font-black text-cyan-glow mb-1">{metric.value}</div>
            <div className="font-bold mb-1">{metric.label}</div>
            <div className="text-xs text-slate-500">{metric.desc}</div>
          </div>
        ))}
      </motion.div>

      {/* Problem & Solution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-2 gap-8 mb-16"
      >
        <div className="glass-card p-8 border-red-500/20">
          <h3 className="text-2xl font-black mb-4 text-red-400">Проблема</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 mt-2" />
              <span>5+ млрд человек столкнутся с дефицитом воды к 2030</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 mt-2" />
              <span>$500 млрд ежегодных потерь из-за неэффективности</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 mt-2" />
              <span>60% водных систем без мониторинга</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 mt-2" />
              <span>Отсутствие прозрачности и доверия к данным</span>
            </li>
          </ul>
        </div>
        <div className="glass-card p-8 border-green-500/20">
          <h3 className="text-2xl font-black mb-4 text-green-400">Решение CivilizationProtocol</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
              <span>IoT + Blockchain для верифицируемых данных</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
              <span>AI аналитика для прогнозирования и оптимизации</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
              <span>DAO управление для децентрализованных решений</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
              <span>Токеномика для мотивации участников</span>
            </li>
          </ul>
        </div>
      </motion.div>

      {/* Investment Tiers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        id="tiers"
        className="mb-16"
      >
        <h2 className="text-3xl font-black text-center mb-8">Инвестиционные уровни</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {investmentTiers.map((tier, i) => (
            <div
              key={i}
              onClick={() => setSelectedTier(tier.tier)}
              className={cn(
                "glass-card p-6 cursor-pointer transition-all relative",
                tier.featured && "border-cyan-glow/50 scale-105",
                selectedTier === tier.tier && "ring-2 ring-cyan-glow"
              )}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-glow to-blue-500 rounded-full text-xs font-bold text-white">
                  RECOMMENDED
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-black mb-2">{tier.tier}</h3>
                <div className="text-4xl font-black text-cyan-glow mb-1">
                  {tier.minAmount.toLocaleString()} {tier.currency}
                </div>
                <div className="text-slate-400">от {tier.price}</div>
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-bold mt-2">
                  <Percent size={14} /> Скидка {tier.discount}
                </div>
              </div>
              <ul className="space-y-2 mb-6">
                {tier.benefits.map((benefit, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 size={14} className="text-green-500 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <div className="p-3 bg-white/5 rounded-xl text-sm">
                <div className="flex justify-between mb-1">
                  <span className="text-slate-400">Аллокация</span>
                  <span className="font-bold">{tier.allocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Vesting</span>
                  <span className="font-bold text-xs">{tier.vesting}</span>
                </div>
              </div>
              <button className={cn(
                "w-full mt-4 py-3 rounded-xl font-bold transition-all",
                tier.featured || selectedTier === tier.tier
                  ? "bg-gradient-to-r from-cyan-glow to-blue-500 text-white hover:scale-105"
                  : "bg-white/5 hover:bg-white/10"
              )}>
                Выбрать
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Token Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid md:grid-cols-2 gap-8 mb-16"
      >
        <div className="glass-card p-6">
          <h3 className="text-xl font-black mb-4 flex items-center gap-2">
            <Coins className="text-cyan-glow" size={20} />
            Метрики токена
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {tokenMetrics.map((metric, i) => (
              <div key={i} className="p-3 bg-white/5 rounded-xl">
                <div className="text-xs text-slate-500 mb-1">{metric.label}</div>
                <div className="font-bold">{metric.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card p-6">
          <h3 className="text-xl font-black mb-4 flex items-center gap-2">
            <PieChart className="text-purple-400" size={20} />
            Распределение токенов
          </h3>
          <div className="space-y-3">
            {tokenDistribution.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={cn("w-3 h-3 rounded-full", item.color)} />
                <span className="flex-1 text-sm">{item.name}</span>
                <span className="font-bold">{item.percent}%</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Use of Funds */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-8 mb-16"
      >
        <h3 className="text-xl font-black mb-6 text-center">Использование средств</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {useOfFunds.map((item, i) => (
            <div key={i} className="text-center p-4 bg-white/5 rounded-xl">
              <item.icon className="mx-auto mb-2 text-cyan-glow" size={28} />
              <div className="text-2xl font-black mb-1">{item.percent}%</div>
              <div className="text-xs text-slate-400">{item.name}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Milestones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-16"
      >
        <h3 className="text-xl font-black mb-6 text-center">Ключевые этапы</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {milestones.map((milestone, i) => (
            <div
              key={i}
              className={cn(
                "px-6 py-4 rounded-xl text-center min-w-[140px]",
                milestone.status === "done" && "bg-green-500/20 border border-green-500/30",
                milestone.status === "current" && "bg-cyan-glow/20 border border-cyan-glow/30",
                milestone.status === "upcoming" && "bg-white/5 border border-white/10"
              )}
            >
              <div className={cn(
                "text-sm font-bold mb-1",
                milestone.status === "done" && "text-green-400",
                milestone.status === "current" && "text-cyan-glow",
                milestone.status === "upcoming" && "text-slate-400"
              )}>{milestone.date}</div>
              <div className="text-sm">{milestone.title}</div>
              {milestone.status === "current" && (
                <div className="mt-2 text-xs text-cyan-glow animate-pulse">● В процессе</div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Team */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid md:grid-cols-3 gap-6 mb-16"
      >
        {team.map((item, i) => (
          <div key={i} className="glass-card p-6 text-center">
            <div className="text-4xl font-black text-cyan-glow mb-2">{item.count}</div>
            <div className="font-bold mb-1">{item.name}</div>
            <div className="text-sm text-slate-400">{item.focus}</div>
          </div>
        ))}
      </motion.div>

      {/* Quick Buy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mb-8"
      >
        <BuyTokenWidget variant="banner" source="invest" />
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-card p-8 bg-gradient-to-r from-cyan-glow/10 via-transparent to-purple-500/10 text-center"
      >
        <h2 className="text-3xl font-black mb-4">Готовы инвестировать?</h2>
        <p className="text-slate-400 max-w-2xl mx-auto mb-8">
          Свяжитесь с нами для обсуждения условий инвестирования и получения дополнительной информации
        </p>
        <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto mb-6">
          <input
            type="email"
            placeholder="Ваш email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-glow/50 focus:outline-none"
          />
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-glow to-blue-500 text-white font-bold rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2">
            <Mail size={20} /> Связаться
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
          <a href="mailto:invest@vodprom.org" className="hover:text-cyan-glow">invest@vodprom.org</a>
          <span>•</span>
          <a href="https://t.me/vodeco" className="hover:text-cyan-glow">Telegram</a>
          <span>•</span>
          <Link href="/presentation" className="hover:text-cyan-glow">Pitch Deck</Link>
        </div>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 p-4 bg-white/5 rounded-xl text-xs text-slate-500 text-center"
      >
        <strong>Disclaimer:</strong> Данная информация не является инвестиционным советом. 
        Инвестиции в криптовалюты и токены связаны с высокими рисками. 
        Проводите собственное исследование перед принятием инвестиционных решений.
      </motion.div>
    </div>
  );
}

