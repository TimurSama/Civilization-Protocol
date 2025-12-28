"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Globe, Shield, Zap, Droplets, ArrowRight, CheckCircle2, Cpu,
  Database, Network, Building2, Landmark, TrendingUp, Users,
  ChevronDown, Play, Star, Gift, UserPlus, Coins, Lock,
  Smartphone, BarChart3, Activity, Mail, ExternalLink,
  Twitter, MessageCircle, Send, Copy, Check
} from "lucide-react";
import Link from "next/link";
import BuyTokenWidget from "@/components/BuyTokenWidget";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState({ days: 45, hours: 12, mins: 30, secs: 0 });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const copyReferral = () => {
    navigator.clipboard.writeText("https://vodeco.app/ref/PIONEER2024");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-ocean-deep">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep via-ocean-deep/90 to-ocean-deep z-10" />
          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(34, 211, 238, 0.15) 0%, transparent 50%),
                               radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 40%),
                               radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 40%)`,
              backgroundSize: "200% 200%",
            }}
          />
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-glow/30 rounded-full"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              }}
              animate={{
                y: [null, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="relative z-20 max-w-6xl mx-auto px-4 text-center">
          {/* Beta Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-glow/20 to-purple-500/20 border border-cyan-glow/30 mb-8"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium">Beta Launch — Ранний доступ</span>
            <Gift className="text-cyan-glow" size={16} />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black mb-6"
          >
            <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-glow bg-clip-text text-transparent">
              VODeco
            </span>
            <br />
            <span className="text-3xl md:text-5xl text-slate-300">
              Революция в управлении водой
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 max-w-3xl mx-auto mb-8"
          >
            Глобальная экосистема на основе блокчейн-технологий для прозрачного, 
            децентрализованного управления водными ресурсами планеты
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-10"
          >
            <div className="glass-card p-4">
              <div className="text-3xl font-black text-cyan-glow">$500B</div>
              <div className="text-sm text-slate-400">ежегодных потерь</div>
            </div>
            <div className="glass-card p-4">
              <div className="text-3xl font-black text-cyan-glow">5B+</div>
              <div className="text-sm text-slate-400">людей под угрозой</div>
            </div>
            <div className="glass-card p-4">
              <div className="text-3xl font-black text-cyan-glow">60%</div>
              <div className="text-sm text-slate-400">без мониторинга</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <Link href="/presentation" className="px-8 py-4 bg-gradient-to-r from-cyan-glow to-blue-500 text-white font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_30px_rgba(34,211,238,0.4)]">
              <Play size={20} /> Смотреть презентацию
            </Link>
            <button
              onClick={() => document.getElementById('beta-signup')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 glass text-white font-bold rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <UserPlus size={20} /> Присоединиться к Beta
            </button>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <p className="text-sm text-slate-500 mb-3">До окончания раннего доступа:</p>
            <div className="flex justify-center gap-4">
              {[
                { value: countdown.days, label: "дней" },
                { value: countdown.hours, label: "часов" },
                { value: countdown.mins, label: "мин" },
                { value: countdown.secs, label: "сек" },
              ].map((item, i) => (
                <div key={i} className="glass-card px-4 py-2 min-w-[70px]">
                  <div className="text-2xl font-black text-cyan-glow">{String(item.value).padStart(2, '0')}</div>
                  <div className="text-xs text-slate-500">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1, y: { duration: 2, repeat: Infinity } }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="text-slate-500" size={32} />
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black mb-4">Глобальная проблема</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Водный кризис — это не только экологическая проблема. 
              Это кризис данных и управления.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Droplets, title: "Дефицит воды", desc: "К 2030 году 5+ млрд человек столкнутся с нехваткой воды", color: "text-blue-400" },
              { icon: Building2, title: "Устаревшая инфраструктура", desc: "80% водных систем требуют модернизации", color: "text-orange-400" },
              { icon: Database, title: "Фрагментированные данные", desc: "Отсутствие единой системы мониторинга", color: "text-purple-400" },
              { icon: Lock, title: "Непрозрачность", desc: "Коррупция и неэффективное распределение ресурсов", color: "text-red-400" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="glass-card p-6 text-center hover:scale-105 transition-transform"
              >
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-white/5 flex items-center justify-center mb-4 ${item.color}`}>
                  <item.icon size={32} />
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-cyan-glow/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black mb-4">Решение VODeco</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Объединяем IoT, AI и Blockchain в единую экосистему прозрачного управления
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: Activity, title: "IoT Мониторинг", desc: "Датчики качества воды в реальном времени по всему миру", features: ["Качество воды", "Уровень", "Расход", "Загрязнения"] },
              { icon: Shield, title: "Blockchain Доверие", desc: "Неизменяемое хранение данных и прозрачные транзакции", features: ["Blockchain", "Смарт-контракты", "NFT объектов", "DAO"] },
              { icon: Cpu, title: "AI Аналитика", desc: "Предиктивные модели и рекомендации на основе данных", features: ["Прогнозы кризисов", "Оптимизация", "Аномалии", "ML модели"] },
              { icon: Users, title: "DAO Управление", desc: "Децентрализованное принятие решений всеми участниками", features: ["Голосование", "Делегирование", "Казначейство", "Аудит"] },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                className="glass-card p-8 hover:border-cyan-glow/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-cyan-glow/10 flex items-center justify-center text-cyan-glow flex-shrink-0">
                    <item.icon size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                    <p className="text-slate-400 mb-4">{item.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.features.map((f, j) => (
                        <span key={j} className="px-3 py-1 rounded-full bg-white/5 text-xs text-slate-300">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black mb-4">Как это работает</h2>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {[
              { step: 1, title: "Подключение", desc: "Датчики IoT собирают данные", icon: Activity },
              { step: 2, title: "Верификация", desc: "Данные проверяются и хэшируются", icon: Shield },
              { step: 3, title: "Анализ", desc: "AI обрабатывает и прогнозирует", icon: Cpu },
              { step: 4, title: "Управление", desc: "DAO принимает решения", icon: Users },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 * i }}
                className="flex items-center gap-4"
              >
                <div className="glass-card p-6 text-center min-w-[180px]">
                  <div className="w-12 h-12 mx-auto rounded-full bg-cyan-glow/20 flex items-center justify-center text-cyan-glow font-bold text-xl mb-3">
                    {item.step}
                  </div>
                  <item.icon className="mx-auto mb-2 text-cyan-glow" size={24} />
                  <h4 className="font-bold mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
                {i < 3 && <ArrowRight className="text-cyan-glow hidden md:block" size={24} />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Tiers */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black mb-4">Инвестиционные уровни</h2>
            <p className="text-xl text-slate-400">Присоединяйтесь на выгодных условиях раннего доступа</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { tier: "Seed", amount: "10,000 VOD", price: "$100", benefits: ["Ранний доступ", "Базовое голосование", "Pioneer Badge", "x2 награды"], popular: false },
              { tier: "Strategic", amount: "100,000 VOD", price: "$900", benefits: ["Все из Seed", "Расширенные права", "Аналитика Premium", "Приоритетная поддержка"], popular: true },
              { tier: "Infrastructure", amount: "500,000 VOD", price: "$4,000", benefits: ["Все из Strategic", "Доля в проектах", "Эксклюзивный доступ", "Участие в пулах"], popular: false },
              { tier: "Institutional", amount: "1,000,000 VOD", price: "$7,500", benefits: ["Все из Infrastructure", "Совет DAO", "Права на регионы", "Стратегическое партнёрство"], popular: false },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className={`glass-card p-6 relative ${item.popular ? 'border-cyan-glow/50 scale-105' : ''}`}
              >
                {item.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-glow to-blue-500 rounded-full text-xs font-bold text-white">
                    POPULAR
                  </div>
                )}
                <h3 className="font-bold text-xl mb-2">{item.tier}</h3>
                <div className="text-3xl font-black text-cyan-glow mb-1">{item.amount}</div>
                <div className="text-sm text-slate-400 mb-4">≈ {item.price}</div>
                <ul className="space-y-2 mb-6">
                  {item.benefits.map((b, j) => (
                    <li key={j} className="text-sm text-slate-300 flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-green-500" /> {b}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-bold transition-all ${
                  item.popular 
                    ? 'bg-gradient-to-r from-cyan-glow to-blue-500 text-white hover:scale-105' 
                    : 'bg-white/5 hover:bg-white/10 text-white'
                }`}>
                  Выбрать
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beta Signup */}
      <section id="beta-signup" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass-card p-8 md:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-glow/10 via-transparent to-purple-500/10" />
            
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400 mb-6">
                <Star size={16} /> Ранняя регистрация открыта
              </div>
              
              <h2 className="text-4xl font-black mb-4">Станьте Pioneer</h2>
              <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                Первые 1000 участников получают статус Pioneer с двойными наградами навсегда, 
                уникальный NFT и гарантированный airdrop
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-white/5 rounded-xl">
                  <div className="text-2xl font-black text-cyan-glow">x2</div>
                  <div className="text-sm text-slate-400">Награды навсегда</div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl">
                  <div className="text-2xl font-black text-purple-400">NFT</div>
                  <div className="text-sm text-slate-400">Founder Badge</div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl">
                  <div className="text-2xl font-black text-green-400">100%</div>
                  <div className="text-sm text-slate-400">Airdrop гарантия</div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto mb-6">
                <input
                  type="email"
                  placeholder="Ваш email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-glow/50 focus:outline-none transition-colors"
                />
                <button className="px-8 py-4 bg-gradient-to-r from-cyan-glow to-blue-500 text-white font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2 justify-center">
                  <UserPlus size={20} /> Присоединиться
                </button>
              </div>

              <div className="text-sm text-slate-500">
                <span className="text-green-400 font-bold">847</span> из 1000 мест Pioneer осталось
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Referral Program */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-cyan-glow/5 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-black mb-4">Реферальная программа</h2>
            <p className="text-xl text-slate-400 mb-8">
              Приглашайте друзей и получайте бонусы от их активности
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="glass-card p-6">
                <div className="text-3xl font-black text-cyan-glow mb-2">10%</div>
                <div className="text-sm text-slate-400">от наград уровень 1</div>
              </div>
              <div className="glass-card p-6">
                <div className="text-3xl font-black text-blue-400 mb-2">5%</div>
                <div className="text-sm text-slate-400">от наград уровень 2</div>
              </div>
              <div className="glass-card p-6">
                <div className="text-3xl font-black text-purple-400 mb-2">2%</div>
                <div className="text-sm text-slate-400">от наград уровень 3</div>
              </div>
            </div>

            <div className="glass-card p-6 inline-flex items-center gap-4 flex-wrap justify-center">
              <span className="text-slate-400">Ваша ссылка:</span>
              <code className="px-4 py-2 bg-white/5 rounded-lg text-cyan-glow font-mono text-sm">
                https://vodeco.app/ref/PIONEER2024
              </code>
              <button
                onClick={copyReferral}
                className={`p-2 rounded-lg transition-all ${copied ? 'bg-green-500/20 text-green-400' : 'bg-white/5 hover:bg-white/10'}`}
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Airdrop Programs */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black mb-4">Программы Airdrop</h2>
            <p className="text-xl text-slate-400">Зарабатывайте токены, помогая развивать экосистему</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { role: "Ambassador", reward: "1000-5000 VOD/мес", desc: "Ведение страницы/группы, представительство", icon: Users },
              { role: "Researcher", reward: "Грант + % данных", desc: "Проведение исследований, анализ данных", icon: Database },
              { role: "Media", reward: "500-2000 VOD/материал", desc: "СМИ контент, статьи, обзоры", icon: MessageCircle },
              { role: "Developer", reward: "Bounty от задачи", desc: "Код, интеграции, смарт-контракты", icon: Cpu },
              { role: "Translator", reward: "50-200 VOD/страница", desc: "Переводы документации и интерфейса", icon: Globe },
              { role: "Moderator", reward: "300 VOD/неделя", desc: "Модерация сообщества, поддержка", icon: Shield },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="glass-card p-6 hover:border-cyan-glow/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-glow/10 flex items-center justify-center text-cyan-glow flex-shrink-0">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{item.role}</h4>
                    <div className="text-cyan-glow text-sm font-medium mb-2">{item.reward}</div>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black mb-4">Дорожная карта</h2>
          </motion.div>

          <div className="space-y-6">
            {[
              { year: "2023", title: "MVP Development", status: "done", items: ["Архитектура", "Прототип", "Дизайн"] },
              { year: "2024", title: "Platform Launch", status: "current", items: ["Beta релиз", "Токен VOD", "IoT интеграция"] },
              { year: "2025", title: "Expansion", status: "future", items: ["Mobile App", "DAO", "Партнёрства"] },
              { year: "2026", title: "Global Scale", status: "future", items: ["1M+ пользователей", "Full DAO", "Международные интеграции"] },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                className={`glass-card p-6 flex items-center gap-6 ${
                  item.status === 'done' ? 'border-green-500/30' :
                  item.status === 'current' ? 'border-cyan-glow/50' : ''
                }`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black flex-shrink-0 ${
                  item.status === 'done' ? 'bg-green-500/20 text-green-400' :
                  item.status === 'current' ? 'bg-cyan-glow/20 text-cyan-glow' :
                  'bg-white/5 text-slate-400'
                }`}>
                  {item.year}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold mb-2">{item.title}</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.items.map((it, j) => (
                      <span key={j} className="px-3 py-1 rounded-full bg-white/5 text-sm text-slate-300">
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
                {item.status === 'done' && <CheckCircle2 className="text-green-500" size={24} />}
                {item.status === 'current' && <Activity className="text-cyan-glow animate-pulse" size={24} />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Buy Token Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <BuyTokenWidget variant="banner" source="landing" />
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-5xl font-black mb-6">
              Готовы изменить мир?
            </h2>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
              Присоединяйтесь к глобальному движению за устойчивое управление водными ресурсами
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/presentation" className="px-10 py-5 bg-gradient-to-r from-cyan-glow to-blue-500 text-white font-bold rounded-2xl hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_40px_rgba(34,211,238,0.4)]">
                <Play size={20} /> Смотреть презентацию
              </Link>
              <Link href="/whitepaper" className="px-10 py-5 glass text-white font-bold rounded-2xl hover:bg-white/10 transition-colors">
                White Paper
              </Link>
              <Link href="/dashboard" className="px-10 py-5 glass text-white font-bold rounded-2xl hover:bg-white/10 transition-colors">
                Платформа
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-xl mb-4">VODeco</h3>
              <p className="text-sm text-slate-400">
                Value of Data — Water Ecosystem. Децентрализованная платформа управления водными ресурсами.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Платформа</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/dashboard" className="hover:text-cyan-glow">Dashboard</Link></li>
                <li><Link href="/dao" className="hover:text-cyan-glow">DAO</Link></li>
                <li><Link href="/tokenhub" className="hover:text-cyan-glow">TokenHub</Link></li>
                <li><Link href="/nexus" className="hover:text-cyan-glow">Nexus</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Ресурсы</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/whitepaper" className="hover:text-cyan-glow">White Paper</Link></li>
                <li><Link href="/presentation" className="hover:text-cyan-glow">Презентация</Link></li>
                <li><a href="#" className="hover:text-cyan-glow">Документация</a></li>
                <li><a href="#" className="hover:text-cyan-glow">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center gap-2"><Mail size={14} /> info@vodprom.org</li>
                <li className="flex items-center gap-2"><Globe size={14} /> vodprom.org</li>
                <li className="flex items-center gap-2"><Twitter size={14} /> @vodprom</li>
                <li className="flex items-center gap-2"><Send size={14} /> Telegram</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-sm text-slate-500">
            <div>© 2024 VODeco. All rights reserved.</div>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">Terms</a>
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

