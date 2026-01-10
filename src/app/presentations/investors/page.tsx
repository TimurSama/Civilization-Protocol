"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp, DollarSign, Users, Globe, Shield, Zap, Target,
  ChevronRight, ChevronLeft, ArrowUpRight, BarChart3, PieChart,
  CheckCircle2, Award, Rocket, Building2, Cpu, LineChart,
  Play, Pause, ExternalLink, Download, ArrowRight, Star,
  Coins, Lock, Percent, Clock, Gift, AlertCircle, Info
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import BuyTokenWidget from "@/components/BuyTokenWidget";
import InfoPopup from "@/components/InfoPopup";
import StatisticCard from "@/components/StatisticCard";

// Slide data
const slides = [
  {
    id: 1,
    type: "hook",
    title: "$8.6 Trillion",
    subtitle: "Global Water Market by 2030",
    highlight: "The data infrastructure is broken",
  },
  {
    id: 2,
    type: "problem",
    title: "The Problem",
    points: [
      { icon: <AlertCircle />, text: "Fragmented data across 1000+ siloed systems" },
      { icon: <AlertCircle />, text: "No transparency in water resource management" },
      { icon: <AlertCircle />, text: "$260B annual losses from inefficiency" },
      { icon: <AlertCircle />, text: "40% of infrastructure data is outdated or wrong" },
    ],
  },
  {
    id: 3,
    type: "solution",
    title: "Our Solution",
    subtitle: "Decentralized Water Data Platform",
    features: [
      { icon: <Shield />, title: "Blockchain", desc: "Immutable data layer" },
      { icon: <Cpu />, title: "IoT Integration", desc: "Real-time monitoring" },
      { icon: <Users />, title: "DAO Governance", desc: "Stakeholder participation" },
      { icon: <Coins />, title: "Token Economy", desc: "Incentive alignment" },
    ],
  },
  {
    id: 4,
    type: "product",
    title: "The Platform",
    screens: ["Dashboard", "Map", "Governance", "TokenHub"],
  },
  {
    id: 5,
    type: "market",
    title: "Market Opportunity",
    tam: { value: "$8.6T", label: "Total Addressable Market" },
    sam: { value: "$240B", label: "Serviceable Market" },
    som: { value: "$12B", label: "Target Market (5 years)" },
  },
  {
    id: 6,
    type: "business",
    title: "Business Model",
    revenue: [
      { source: "Data Access Fees", percent: 35 },
      { source: "Token Transactions", percent: 25 },
      { source: "Enterprise Licenses", percent: 20 },
      { source: "Staking Rewards", percent: 15 },
      { source: "Grants & Partnerships", percent: 5 },
    ],
  },
  {
    id: 7,
    type: "traction",
    title: "Traction",
    metrics: [
      { value: "15+", label: "Pilot Partners" },
      { value: "$2M+", label: "Grants Secured" },
      { value: "50K+", label: "Beta Users" },
      { value: "3", label: "Countries Active" },
    ],
    logos: ["TIIAME", "UN Water", "World Bank", "Greenpeace"],
  },
  {
    id: 8,
    type: "competition",
    title: "Competitive Landscape",
    us: { name: "CivilizationProtocol", features: ["Blockchain", "DAO", "IoT", "Token", "Open Data"] },
    competitors: [
      { name: "AQUASTAT", features: ["Data", "", "", "", ""] },
      { name: "Xylem", features: ["", "", "IoT", "", ""] },
      { name: "Veolia", features: ["", "", "IoT", "", ""] },
    ],
  },
  {
    id: 9,
    type: "team",
    title: "The Team",
    members: [
      { name: "Founder & CEO", avatar: "AC", role: "Serial entrepreneur, 15+ years in water tech" },
      { name: "CTO", avatar: "VK", role: "Ex-Google, Blockchain expert" },
      { name: "COO", avatar: "MR", role: "Ex-World Bank, Water policy" },
      { name: "Head of DAO", avatar: "DP", role: "DeFi pioneer, DAO governance" },
    ],
  },
  {
    id: 10,
    type: "financials",
    title: "Use of Funds",
    allocation: [
      { category: "Product Development", percent: 40, color: "#22d3ee" },
      { category: "Marketing & Growth", percent: 25, color: "#a855f7" },
      { category: "Operations", percent: 20, color: "#f59e0b" },
      { category: "Legal & Compliance", percent: 10, color: "#10b981" },
      { category: "Reserve", percent: 5, color: "#6366f1" },
    ],
  },
  {
    id: 11,
    type: "roadmap",
    title: "Roadmap",
    milestones: [
      { quarter: "Q1 2025", items: ["Public Beta Launch", "Token Generation Event"] },
      { quarter: "Q2 2025", items: ["Mainnet Launch", "5 Country Expansion"] },
      { quarter: "Q3 2025", items: ["Enterprise Partnerships", "DAO Full Activation"] },
      { quarter: "Q4 2025", items: ["100K Users", "Series A"] },
    ],
  },
  {
    id: 12,
    type: "ask",
    title: "The Ask",
    round: "Seed Round",
    amount: "$5M",
    valuation: "$25M Pre-money",
    terms: ["20% equity", "SAFE + Token Warrant", "18-month runway"],
  },
];

export default function InvestorPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Auto-play
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen text-white overflow-hidden">
      {/* Header - под главным Navbar */}
      <div className="sticky top-20 left-0 right-0 z-[90] bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Rocket size={18} />
            </div>
            <span className="font-bold">CivilizationProtocol | Investor Deck</span>
          </Link>

          {/* Slide counter */}
          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-400">
              Slide {currentSlide + 1} / {slides.length}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
              <button className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex items-center gap-2">
                <Download size={16} /> Export PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="fixed top-16 left-0 right-0 h-1 bg-white/5 z-40">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        disabled={currentSlide === 0}
        className={cn(
          "fixed left-4 top-1/2 -translate-y-1/2 z-40 p-4 rounded-full bg-white/5 backdrop-blur-xl",
          "hover:bg-white/10 transition-colors border border-white/10",
          currentSlide === 0 && "opacity-30 cursor-not-allowed"
        )}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        disabled={currentSlide === slides.length - 1}
        className={cn(
          "fixed right-4 top-1/2 -translate-y-1/2 z-40 p-4 rounded-full bg-white/5 backdrop-blur-xl",
          "hover:bg-white/10 transition-colors border border-white/10",
          currentSlide === slides.length - 1 && "opacity-30 cursor-not-allowed"
        )}
      >
        <ChevronRight size={24} />
      </button>

      {/* Slides */}
      <div className="min-h-screen flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="w-full max-w-6xl"
          >
            {/* Slide 1: Hook */}
            {slides[currentSlide].type === "hook" && (
              <div className="text-center py-20 relative">
                {/* Анимированный фон */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                  />
                </div>
                
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                  className="mb-8 relative z-10"
                >
                  <motion.span
                    className="text-8xl md:text-[12rem] font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent block"
                    animate={{
                      backgroundPosition: ["0%", "100%"],
                    }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                    style={{
                      backgroundSize: "200%",
                    }}
                  >
                    {slides[currentSlide].title}
                  </motion.span>
                  {/* Свечение вокруг текста */}
                  <motion.div
                    className="absolute inset-0 blur-2xl opacity-30"
                    style={{
                      background: "linear-gradient(90deg, #22d3ee, #3b82f6, #a855f7)",
                    }}
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl md:text-3xl text-slate-300 mb-8 font-medium relative z-10"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>
                <motion.div
                  initial={{ y: 30, opacity: 0, scale: 0.9 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, type: "spring" }}
                  className="inline-block relative z-10"
                >
                  <motion.div
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 border-2 border-red-500/30 backdrop-blur-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        ⚠️
                      </motion.div>
                      <span className="text-red-300 font-bold text-lg">{slides[currentSlide].highlight}</span>
                    </div>
                  </motion.div>
                </motion.div>
                
                <InfoPopup
                  title="Рынок водных ресурсов к 2030"
                  trigger={
                    <motion.button
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="px-6 py-3 glass-card rounded-xl hover:bg-white/10 transition-all flex items-center gap-2 mx-auto"
                    >
                      <AlertCircle size={18} />
                      <span>Подробнее о рынке</span>
                    </motion.button>
                  }
                  content={
                    <div className="space-y-4">
                      <p>
                        Глобальный рынок водных ресурсов достигнет <strong>$8.6 триллионов</strong> к 2030 году, 
                        что делает его одним из крупнейших и наиболее быстрорастущих секторов экономики.
                      </p>
                      <div>
                        <h4 className="font-bold mb-2">Сегменты рынка:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Водоснабжение и очистка: $2.1 трлн</li>
                          <li>Управление водными ресурсами: $1.8 трлн</li>
                          <li>Водная инфраструктура: $1.5 трлн</li>
                          <li>Технологии и мониторинг: $1.2 трлн</li>
                          <li>Экологические услуги: $1.0 трлн</li>
                          <li>Другие сегменты: $1.0 трлн</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold mb-2">Факторы роста:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Рост населения: +1.1 млрд к 2030</li>
                          <li>Урбанизация: 60% населения в городах</li>
                          <li>Изменение климата: увеличение спроса</li>
                          <li>Цифровизация: внедрение IoT и AI</li>
                          <li>Регуляторные требования: ужесточение стандартов</li>
                        </ul>
                      </div>
                      <p className="text-xs text-slate-400">
                        Источник: World Bank, UN Water, McKinsey Global Institute, 2023
                      </p>
                    </div>
                  }
                  size="lg"
                  source={{ name: "World Bank / UN Water", year: 2023 }}
                />
              </div>
            )}

            {/* Slide 2: Problem */}
            {slides[currentSlide].type === "problem" && (
              <div className="py-12">
                <h2 className="text-5xl md:text-7xl font-black mb-12 text-center">
                  {slides[currentSlide].title}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {slides[currentSlide].points?.map((point, i) => {
                    const problemDetails = {
                      0: {
                        title: "Фрагментация данных",
                        content: (
                          <div className="space-y-3">
                            <p>
                              Данные о водных ресурсах разбросаны по <strong>1000+ изолированным системам</strong>, 
                              что делает невозможным комплексный анализ и принятие решений.
                            </p>
                            <div>
                              <h4 className="font-bold mb-2">Проблемы:</h4>
                              <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Отсутствие единого стандарта данных</li>
                                <li>Несовместимые форматы и протоколы</li>
                                <li>Дублирование информации</li>
                                <li>Отсутствие интеграции между системами</li>
                                <li>Высокие затраты на консолидацию данных</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-bold mb-2">Последствия:</h4>
                              <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Невозможность глобального анализа</li>
                                <li>Задержки в принятии решений</li>
                                <li>Потеря критической информации</li>
                                <li>Неэффективное использование ресурсов</li>
                              </ul>
                            </div>
                          </div>
                        ),
                      },
                      1: {
                        title: "Отсутствие прозрачности",
                        content: (
                          <div className="space-y-3">
                            <p>
                              Управление водными ресурсами страдает от <strong>отсутствия прозрачности</strong>, 
                              что приводит к коррупции, неэффективности и недоверию.
                            </p>
                            <div>
                              <h4 className="font-bold mb-2">Проблемы:</h4>
                              <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Закрытые данные о распределении воды</li>
                                <li>Отсутствие публичной отчетности</li>
                                <li>Непрозрачные контракты и тендеры</li>
                                <li>Коррупция в водном секторе</li>
                                <li>Отсутствие гражданского контроля</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-bold mb-2">Статистика:</h4>
                              <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>30% контрактов в водном секторе связаны с коррупцией</li>
                                <li>$50 млрд теряется ежегодно из-за непрозрачности</li>
                                <li>Только 20% стран публикуют данные о воде</li>
                              </ul>
                            </div>
                          </div>
                        ),
                      },
                      2: {
                        title: "Экономические потери",
                        content: (
                          <div className="space-y-3">
                            <p>
                              Неэффективность в управлении водными ресурсами приводит к <strong>$260 миллиардам</strong> 
                              ежегодных потерь по всему миру.
                            </p>
                            <div>
                              <h4 className="font-bold mb-2">Источники потерь:</h4>
                              <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Утечки в инфраструктуре: $140 млрд</li>
                                <li>Неэффективное использование: $60 млрд</li>
                                <li>Загрязнение и очистка: $40 млрд</li>
                                <li>Административные потери: $20 млрд</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-bold mb-2">Возможности улучшения:</h4>
                              <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Снижение потерь на 30-50% через мониторинг</li>
                                <li>Оптимизация распределения: экономия $80 млрд</li>
                                <li>Предотвращение загрязнения: экономия $40 млрд</li>
                                <li>ROI от инвестиций: 3-7x</li>
                              </ul>
                            </div>
                          </div>
                        ),
                      },
                      3: {
                        title: "Устаревшие данные",
                        content: (
                          <div className="space-y-3">
                            <p>
                              <strong>40% данных</strong> о водной инфраструктуре устарели или неверны, 
                              что делает невозможным эффективное планирование и управление.
                            </p>
                            <div>
                              <h4 className="font-bold mb-2">Проблемы:</h4>
                              <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Данные обновляются раз в 5-10 лет</li>
                                <li>Отсутствие real-time мониторинга</li>
                                <li>Ошибки в кадастрах и реестрах</li>
                                <li>Отсутствие верификации данных</li>
                                <li>Ручной ввод данных (человеческий фактор)</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-bold mb-2">Последствия:</h4>
                              <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Неправильные инвестиционные решения</li>
                                <li>Неэффективное распределение ресурсов</li>
                                <li>Задержки в реагировании на кризисы</li>
                                <li>Потеря доверия к данным</li>
                              </ul>
                            </div>
                          </div>
                        ),
                      },
                    };
                    
                    const detail = problemDetails[i as keyof typeof problemDetails];
                    
                    return (
                      <InfoPopup
                        key={i}
                        title={detail?.title || point.text}
                        content={detail?.content || <p>{point.text}</p>}
                        trigger={
                          <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-4 cursor-pointer hover:bg-red-500/15 transition-colors"
                          >
                            <div className="text-red-400">{point.icon}</div>
                            <span className="text-xl">{point.text}</span>
                          </motion.div>
                        }
                        size="lg"
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Slide 3: Solution */}
            {slides[currentSlide].type === "solution" && (
              <div className="py-12 text-center relative">
                {/* Декоративные элементы */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                  <motion.div
                    className="absolute top-20 left-20 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"
                    animate={{
                      x: [0, 50, 0],
                      y: [0, 30, 0],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"
                    animate={{
                      x: [0, -50, 0],
                      y: [0, -30, 0],
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                  />
                </div>
                
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl md:text-7xl font-black mb-4 relative z-10 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                >
                  {slides[currentSlide].title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl md:text-3xl text-cyan-400 mb-12 font-medium relative z-10"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                  {slides[currentSlide].features?.map((feature, i) => {
                    const solutionDetails = {
                      0: {
                        title: "Blockchain Technology",
                        content: (
                          <div className="space-y-3">
                            <p>
                              <strong>Блокчейн</strong> обеспечивает неизменяемое хранение данных, 
                              прозрачность и доверие через децентрализованную сеть.
                            </p>
                            <div>
                              <h4 className="font-bold mb-2">Преимущества:</h4>
                              <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Неизменяемость данных (immutability)</li>
                                <li>Прозрачность всех транзакций</li>
                                <li>Децентрализация (нет единой точки отказа)</li>
                                <li>Аудит и верификация в реальном времени</li>
                                <li>Снижение затрат на посредников</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-bold mb-2">Применение:</h4>
                              <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Хранение данных о водных объектах</li>
                                <li>Смарт-контракты для автоматизации</li>
                                <li>Токенизация водных активов</li>
                                <li>Прозрачное голосование DAO</li>
                              </ul>
                            </div>
                          </div>
                        ),
                      },
                      1: {
                        title: "IoT Integration",
                        content: (
                          <div className="space-y-3">
                            <p>
                              <strong>IoT интеграция</strong> позволяет собирать данные в реальном времени 
                              со всех водных объектов через сеть датчиков.
                            </p>
                            <div>
                              <h4 className="font-bold mb-2">Технологии:</h4>
                              <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Датчики качества воды (pH, температура, химический состав)</li>
                                <li>Спутниковый мониторинг (Landsat, Sentinel)</li>
                                <li>Телеметрия и SCADA системы</li>
                                <li>Беспилотные дроны для обследования</li>
                                <li>VOD Check — мобильное приложение</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-bold mb-2">Преимущества:</h4>
                              <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Real-time мониторинг 24/7</li>
                                <li>Раннее обнаружение проблем</li>
                                <li>Автоматизация сбора данных</li>
                                <li>Снижение затрат на мониторинг на 60%</li>
                              </ul>
                            </div>
                          </div>
                        ),
                      },
                      2: {
                        title: "DAO Governance",
                        content: (
                          <div className="space-y-3">
                            <p>
                              <strong>DAO управление</strong> обеспечивает децентрализованное принятие решений 
                              с участием всех заинтересованных сторон.
                            </p>
                            <div>
                              <h4 className="font-bold mb-2">Система ролей:</h4>
                              <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Citizen — граждане и пользователи</li>
                                <li>Investor — инвесторы и стейкхолдеры</li>
                                <li>Government — правительства и регуляторы</li>
                                <li>Scientist — учёные и исследователи</li>
                                <li>Operator — операторы инфраструктуры</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-bold mb-2">Преимущества:</h4>
                              <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Демократическое принятие решений</li>
                                <li>Прозрачность голосований</li>
                                <li>Участие всех заинтересованных сторон</li>
                                <li>Снижение коррупции</li>
                              </ul>
                            </div>
                          </div>
                        ),
                      },
                      3: {
                        title: "Token Economy",
                        content: (
                          <div className="space-y-3">
                            <p>
                              <strong>Токеномика</strong> создаёт экономические стимулы для всех участников 
                              экосистемы через двойную систему токенов.
                            </p>
                            <div>
                              <h4 className="font-bold mb-2">Токены:</h4>
                              <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>CivilizationProtocol (utility token) — для участия в экосистеме</li>
                                <li>VOD (stable token) — 1 VOD = 1 м³ воды</li>
                                <li>NFT — для представления долей в активах</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-bold mb-2">Механики:</h4>
                              <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Стейкинг с до 17% годовых</li>
                                <li>Learn-to-Earn награды</li>
                                <li>Инвестиционные пулы</li>
                                <li>Динамические коэффициенты (ЭК, ЭкК, СК)</li>
                              </ul>
                            </div>
                          </div>
                        ),
                      },
                    };
                    
                    const detail = solutionDetails[i as keyof typeof solutionDetails];
                    
                    return (
                      <InfoPopup
                        key={i}
                        title={detail?.title || feature.title}
                        content={detail?.content || <p>{feature.desc}</p>}
                        trigger={
                          <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                            whileHover={{ 
                              y: -8,
                              scale: 1.02,
                              transition: { duration: 0.2 }
                            }}
                            className="p-8 rounded-2xl glass-card border border-white/10 hover:border-cyan-500/50 transition-all cursor-pointer group relative overflow-hidden"
                          >
                            {/* Градиентный фон при hover */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 transition-all duration-300"
                            />
                            
                            {/* Иконка с анимацией */}
                            <motion.div
                              className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center text-cyan-400 mb-4 relative z-10 group-hover:scale-110 transition-transform"
                              whileHover={{ rotate: [0, -10, 10, 0] }}
                              transition={{ duration: 0.5 }}
                            >
                              <motion.div
                                animate={{ 
                                  boxShadow: [
                                    "0 0 0 0 rgba(34, 211, 238, 0.4)",
                                    "0 0 0 8px rgba(34, 211, 238, 0)",
                                  ]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 rounded-2xl"
                              />
                              {feature.icon}
                            </motion.div>
                            
                            <div className="font-bold text-xl mb-2 relative z-10 group-hover:text-cyan-300 transition-colors">
                              {feature.title}
                            </div>
                            <div className="text-slate-400 relative z-10 group-hover:text-slate-300 transition-colors">
                              {feature.desc}
                            </div>
                            
                            {/* Декоративные линии */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          </motion.div>
                        }
                        size="lg"
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Slide 4: Product */}
            {slides[currentSlide].type === "product" && (
              <div className="py-12 relative">
                {/* Декоративный фон */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <motion.div
                    className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                </div>
                
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl md:text-7xl font-black mb-12 text-center relative z-10 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                >
                  {slides[currentSlide].title}
                </motion.h2>
                
                <div className="relative z-10">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.02 }}
                    className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 border-2 border-white/10 p-2 shadow-2xl"
                  >
                    {/* Анимированная рамка */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.3), transparent)",
                      }}
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    
                    <div className="aspect-video rounded-2xl bg-gradient-to-br from-ocean-deep via-slate-900 to-slate-950 flex items-center justify-center relative overflow-hidden">
                      {/* Фоновые эффекты */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5"
                        animate={{
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ scale: 1.1 }}
                        className="text-center relative z-10 cursor-pointer"
                      >
                        <motion.div
                          animate={{
                            boxShadow: [
                              "0 0 0 0 rgba(34, 211, 238, 0.4)",
                              "0 0 0 20px rgba(34, 211, 238, 0)",
                            ],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="inline-block p-6 rounded-full bg-cyan-500/20 backdrop-blur-sm"
                        >
                          <Play size={64} className="text-cyan-400" />
                        </motion.div>
                        <p className="text-slate-300 mt-4 font-medium">Product Demo</p>
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  <div className="flex justify-center gap-4 mt-8">
                    {slides[currentSlide].screens?.map((screen, i) => {
                      const screenDetails: Record<string, any> = {
                        Dashboard: {
                          title: "Dashboard - Главная панель управления",
                          features: [
                            "Real-time мониторинг водных ресурсов в режиме 24/7",
                            "Интерактивные карты с данными IoT датчиков",
                            "Прогнозы качества воды на 7 дней (AI-powered)",
                            "Критические алерты и уведомления",
                            "Аналитика и отчёты в реальном времени",
                            "Интеграция со всеми 7 кабинетами пользователей",
                          ],
                          target: "Все типы пользователей (Citizen, Investor, Government, Operator, Scientist)",
                          status: "MVP готов, в разработке расширенной версии",
                        },
                        Map: {
                          title: "Map - Интерактивная карта водных ресурсов",
                          features: [
                            "3D визуализация водных объектов (Globe3D)",
                            "Интерактивные точки с данными о качестве воды",
                            "Фильтры по регионам, типам объектов, параметрам",
                            "Исторические данные и тренды",
                            "Интеграция со спутниковыми данными (Landsat, Sentinel)",
                            "Гражданская наука - добавление данных пользователями",
                          ],
                          target: "Все пользователи, особенно Citizen и Scientist",
                          status: "Бета версия активна, улучшение визуализации",
                        },
                        Governance: {
                          title: "Governance - DAO система управления",
                          features: [
                            "Децентрализованные голосования по предложениям",
                            "7 ролей пользователей (Citizen, Investor, Government, Scientist, Operator, Admin, Auditor)",
                            "Мультисиг казначейство (3 из 5 подписей)",
                            "Предложения и обсуждения с рейтингованием",
                            "История всех решений в блокчейне (TON)",
                            "Награды за участие (+5 VOD за голосование)",
                          ],
                          target: "Все держатели VOD токенов",
                          status: "MVP готов (70%), полный функционал к Q3 2025",
                        },
                        TokenHub: {
                          title: "TokenHub - Инвестиционная платформа",
                          features: [
                            "Фильтры проектов: регион, тип, IRR, стоимость, статус",
                            "Детальные страницы проектов с ROI калькулятором",
                            "Эскроу смарт-контракты для безопасности инвестиций",
                            "Портфель инвестора с аналитикой",
                            "ESG метрики и отчёты по проектам",
                            "Интеграция с DAO для утверждения проектов",
                          ],
                          target: "Инвесторы, Government, Corporate",
                          status: "В разработке (50%), планируется запуск в Q3 2025",
                        },
                      };
                      
                      const detail = screenDetails[screen] || {
                        title: `${screen} - Модуль платформы`,
                        features: ["Ключевой функционал модуля", "Интеграция с экосистемой"],
                        target: "Все пользователи",
                        status: "В разработке",
                      };
                      
                      return (
                        <InfoPopup
                          key={i}
                          title={detail.title}
                          content={
                            <div className="space-y-4">
                              <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg p-4 border border-cyan-500/30">
                                <p className="text-base leading-relaxed mb-3">
                                  <strong className="text-cyan-400">{screen}</strong> — ключевой модуль платформы CivilizationProtocol 
                                  для {detail.target.toLowerCase()}.
                                </p>
                              </div>
                              
                              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                <h4 className="font-bold mb-3 text-cyan-400">✨ Основные функции:</h4>
                                <ul className="list-disc list-inside space-y-2 text-sm text-slate-300">
                                  {detail.features.map((feature: string, idx: number) => (
                                    <li key={idx}>{feature}</li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/30">
                                <h4 className="font-bold mb-2 text-purple-400 text-sm">🎯 Целевая аудитория:</h4>
                                <p className="text-sm text-slate-300">{detail.target}</p>
                              </div>
                              
                              <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/30">
                                <h4 className="font-bold mb-2 text-yellow-400 text-sm">📊 Статус разработки:</h4>
                                <p className="text-sm text-slate-300">{detail.status}</p>
                              </div>
                              
                              <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
                                <h4 className="font-bold mb-2 text-green-400 text-sm">🔗 Интеграция:</h4>
                                <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                                  <li>Блокчейн TON для записи данных</li>
                                  <li>IoT датчики для real-time мониторинга</li>
                                  <li>AI Engine для прогнозов и аналитики</li>
                                  <li>DAO для управления и голосований</li>
                                </ul>
                              </div>
                            </div>
                          }
                          size="xl"
                          trigger={
                            <motion.div
                              initial={{ opacity: 0, y: 20, scale: 0.8 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ delay: 0.4 + i * 0.1, type: "spring" }}
                              whileHover={{ 
                                scale: 1.1,
                                y: -5,
                                transition: { duration: 0.2 }
                              }}
                              className="px-6 py-3 rounded-full glass-card border border-white/10 hover:border-cyan-500/50 transition-all cursor-pointer group relative"
                            >
                              <span className="font-medium text-sm group-hover:text-cyan-300 transition-colors">
                                {screen}
                              </span>
                              <Info size={12} className="absolute -top-1 -right-1 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                          }
                          source={{ name: "CivilizationProtocol Platform", year: 2024 }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Slide 5: Market */}
            {slides[currentSlide].type === "market" && (
              <div className="py-12 text-center relative">
                {/* Анимированный фон */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 6, repeat: Infinity }}
                  />
                </div>
                
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl md:text-7xl font-black mb-16 relative z-10 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                >
                  {slides[currentSlide].title}
                </motion.h2>
                
                <div className="flex flex-col items-center gap-8 relative z-10">
                  {/* TAM */}
                  <InfoPopup
                    title="Total Addressable Market (TAM)"
                    content={
                      <div className="space-y-3">
                        <p>
                          <strong>$8.6 триллионов</strong> — это общий размер рынка водных ресурсов к 2030 году, 
                          включая все потенциальные возможности без ограничений.
                        </p>
                        <div>
                          <h4 className="font-bold mb-2">Сегменты TAM:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Водоснабжение и очистка: $2.1 трлн</li>
                            <li>Управление водными ресурсами: $1.8 трлн</li>
                            <li>Инфраструктура: $1.5 трлн</li>
                            <li>Технологии и мониторинг: $1.2 трлн</li>
                            <li>Экологические услуги: $1.0 трлн</li>
                            <li>Другие: $1.0 трлн</li>
                          </ul>
                        </div>
                        <p className="text-xs text-slate-400">
                          Источник: World Bank, McKinsey Global Institute, 2023
                        </p>
                      </div>
                    }
                    trigger={
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        className="relative cursor-pointer"
                      >
                        {/* Внешнее кольцо с анимацией */}
                        <motion.div
                          className="absolute inset-0 rounded-full border-4 border-cyan-500/30"
                          animate={{
                            rotate: 360,
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                            scale: { duration: 3, repeat: Infinity },
                          }}
                        />
                        
                        <div className="w-80 h-80 rounded-full bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-cyan-500/20 border-2 border-cyan-500/50 flex items-center justify-center hover:border-cyan-400 transition-all shadow-2xl shadow-cyan-500/20 relative overflow-hidden">
                          {/* Внутреннее свечение */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-transparent"
                            animate={{
                              opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          
                          <div className="relative z-10">
                            <motion.div
                              className="text-6xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
                              animate={{
                                scale: [1, 1.05, 1],
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              {slides[currentSlide].tam?.value}
                            </motion.div>
                            <div className="text-slate-300 mt-2 font-medium">{slides[currentSlide].tam?.label}</div>
                          </div>
                        </div>
                      </motion.div>
                    }
                    size="lg"
                    source={{ name: "World Bank", year: 2023 }}
                  />
                    
                    {/* SAM */}
                    <InfoPopup
                      title="Serviceable Addressable Market (SAM)"
                      content={
                        <div className="space-y-3">
                          <p>
                            <strong>$240 миллиардов</strong> — это часть рынка, которую мы можем реально обслужить 
                            с нашими технологиями и ресурсами.
                          </p>
                          <div>
                            <h4 className="font-bold mb-2">Критерии SAM:</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                              <li>Регионы с доступом к интернету и блокчейн-инфраструктуре</li>
                              <li>Страны с развитой IoT-экосистемой</li>
                              <li>Рынки с потребностью в прозрачности данных</li>
                              <li>Регионы с поддержкой DAO-управления</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-bold mb-2">География:</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                              <li>Европа: $60 млрд</li>
                              <li>Северная Америка: $50 млрд</li>
                              <li>Азия: $70 млрд</li>
                              <li>Другие регионы: $60 млрд</li>
                            </ul>
                          </div>
                        </div>
                      }
                      trigger={
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-purple-500/10 border-2 border-purple-500/30 flex items-center justify-center cursor-pointer hover:bg-purple-500/15 transition-colors"
                        >
                          <div>
                            <div className="text-3xl font-black text-purple-400">{slides[currentSlide].sam?.value}</div>
                            <div className="text-xs text-slate-400">{slides[currentSlide].sam?.label}</div>
                          </div>
                        </motion.div>
                      }
                      size="lg"
                    />
                    
                    {/* SOM */}
                    <InfoPopup
                      title="Serviceable Obtainable Market (SOM)"
                      content={
                        <div className="space-y-3">
                          <p>
                            <strong>$12 миллиардов</strong> — это наш целевой рынок на первые 5 лет, 
                            реалистичная доля рынка, которую мы планируем занять.
                          </p>
                          <div>
                            <h4 className="font-bold mb-2">Стратегия захвата:</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                              <li>Год 1-2: $1.5 млрд (пилотные проекты, 3 страны)</li>
                              <li>Год 3: $3 млрд (расширение на 10 стран)</li>
                              <li>Год 4: $4 млрд (региональное доминирование)</li>
                              <li>Год 5: $3.5 млрд (глобальная экспансия)</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-bold mb-2">Ключевые сегменты:</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                              <li>Платформенные сборы: $4.8 млрд (40%)</li>
                              <li>Токен-транзакции: $3.6 млрд (30%)</li>
                              <li>Enterprise лицензии: $2.4 млрд (20%)</li>
                              <li>Другие: $1.2 млрд (10%)</li>
                            </ul>
                          </div>
                        </div>
                      }
                      trigger={
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.4 }}
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center cursor-pointer hover:bg-green-500/30 transition-colors"
                        >
                          <div>
                            <div className="text-xl font-black text-green-400">{slides[currentSlide].som?.value}</div>
                            <div className="text-[10px] text-slate-400">SOM</div>
                          </div>
                        </motion.div>
                      }
                      size="lg"
                    />
                </div>
              </div>
            )}

            {/* Slide 6: Business Model */}
            {slides[currentSlide].type === "business" && (
              <div className="py-12 relative">
                {/* Декоративный фон */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <motion.div
                    className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                </div>
                
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl md:text-7xl font-black mb-12 text-center relative z-10 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                >
                  {slides[currentSlide].title}
                </motion.h2>
                
                <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                  {/* Интерактивная Pie chart */}
                  <div className="relative w-80 h-80 mx-auto">
                    {/* Вращающееся внешнее кольцо */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-cyan-500/20"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    />
                    
                    {slides[currentSlide].revenue?.map((item, i, arr) => {
                      const startAngle = arr.slice(0, i).reduce((sum, r) => sum + r.percent, 0) * 3.6;
                      const endAngle = startAngle + item.percent * 3.6;
                      const colors = ['#22d3ee', '#a855f7', '#f59e0b', '#10b981', '#6366f1'];
                      
                      return (
                        <InfoPopup
                          key={i}
                          title={item.source}
                          content={
                            <div className="space-y-3">
                              <p>
                                <strong>{item.source}</strong> составляет <strong>{item.percent}%</strong> от общего дохода.
                              </p>
                              <div>
                                <h4 className="font-bold mb-2">Описание:</h4>
                                <p className="text-sm">
                                  {item.source === "Data Access Fees" && "Плата за доступ к данным о водных ресурсах через API и платформу"}
                                  {item.source === "Token Transactions" && "Комиссии с транзакций токенов CivilizationProtocol и VOD"}
                                  {item.source === "Enterprise Licenses" && "Корпоративные лицензии для крупных операторов и правительств"}
                                  {item.source === "Staking Rewards" && "Часть доходов от стейкинга распределяется в казначейство"}
                                  {item.source === "Grants & Partnerships" && "Гранты от международных организаций и партнёрства"}
                                </p>
                              </div>
                            </div>
                          }
                          trigger={
                            <motion.div
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.15, type: "spring" }}
                              whileHover={{ scale: 1.05 }}
                              className="absolute inset-0 cursor-pointer"
                              style={{
                                background: `conic-gradient(transparent ${startAngle}deg, ${colors[i]} ${startAngle}deg ${endAngle}deg, transparent ${endAngle}deg)`,
                                borderRadius: "50%",
                              }}
                            />
                          }
                          size="md"
                        />
                      );
                    })}
                    
                    {/* Центральный круг с анимацией */}
                    <motion.div
                      className="absolute inset-8 rounded-full bg-gradient-to-br from-slate-900 via-slate-950 to-black flex items-center justify-center border-2 border-cyan-500/20"
                      whileHover={{ scale: 1.05, borderColor: "rgba(34, 211, 238, 0.5)" }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="text-center"
                      >
                        <DollarSign className="mx-auto text-cyan-400 mb-2" size={32} />
                        <div className="text-sm text-slate-300 font-medium">Revenue<br />Streams</div>
                      </motion.div>
                    </motion.div>
                  </div>
                  
                  {/* Интерактивная легенда */}
                  <div className="space-y-4">
                    {slides[currentSlide].revenue?.map((item, i) => {
                      const colors = ['#22d3ee', '#a855f7', '#f59e0b', '#10b981', '#6366f1'];
                      
                      return (
                        <InfoPopup
                          key={i}
                          title={item.source}
                          content={
                            <div className="space-y-2">
                              <p className="text-sm">
                                <strong>{item.percent}%</strong> от общего дохода приходится на {item.source.toLowerCase()}.
                              </p>
                            </div>
                          }
                          trigger={
                            <motion.div
                              initial={{ opacity: 0, x: 30 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              whileHover={{ x: 5, scale: 1.02 }}
                              className="flex items-center justify-between p-4 rounded-xl glass-card border border-white/10 hover:border-cyan-500/50 transition-all cursor-pointer group"
                            >
                              <div className="flex items-center gap-3">
                                <motion.div
                                  className="w-5 h-5 rounded-lg shadow-lg"
                                  style={{ backgroundColor: colors[i] }}
                                  whileHover={{ scale: 1.2, rotate: 45 }}
                                />
                                <span className="font-medium group-hover:text-cyan-300 transition-colors">
                                  {item.source}
                                </span>
                              </div>
                              <motion.span
                                className="font-bold text-xl"
                                style={{ color: colors[i] }}
                                whileHover={{ scale: 1.1 }}
                              >
                                {item.percent}%
                              </motion.span>
                            </motion.div>
                          }
                          size="sm"
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Slide 7: Traction */}
            {slides[currentSlide].type === "traction" && (
              <div className="py-12 text-center relative">
                {/* Анимированный фон */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <motion.div
                    className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"
                    animate={{
                      y: [0, 50, 0],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"
                    animate={{
                      y: [0, -50, 0],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                  />
                </div>
                
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl md:text-7xl font-black mb-12 relative z-10 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                >
                  {slides[currentSlide].title}
                </motion.h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 relative z-10">
                  {slides[currentSlide].metrics?.map((metric, i) => {
                    const icons = [Users, DollarSign, Users, Globe];
                    const Icon = icons[i];
                    const gradients = [
                      "from-cyan-500/20 to-blue-500/10",
                      "from-purple-500/20 to-pink-500/10",
                      "from-green-500/20 to-emerald-500/10",
                      "from-orange-500/20 to-yellow-500/10",
                    ];
                    
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: i * 0.1, type: "spring" }}
                        whileHover={{ 
                          y: -8,
                          scale: 1.05,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <StatisticCard
                          value={metric.value}
                          label={metric.label}
                          icon={Icon}
                          className={`bg-gradient-to-br ${gradients[i]} border border-white/10 hover:border-cyan-500/50 transition-all cursor-pointer group relative overflow-hidden p-8`}
                          popupContent={
                            <div className="space-y-4">
                              <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg p-4 border border-cyan-500/30">
                                <p className="text-base leading-relaxed mb-3">
                                  <strong className="text-cyan-400">{metric.value}</strong> {metric.label.toLowerCase()}
                                </p>
                              </div>
                              
                              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                <h4 className="font-bold mb-3 text-cyan-400">📊 Детали:</h4>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                  {metric.label === "Pilot Partners" && "Активные партнёрства с водоканалами, операторами и экологическими организациями. Партнёрства включают техническую интеграцию, пилотные проекты и совместные исследования."}
                                  {metric.label === "Grants Secured" && "Финансирование от World Bank, UN Water и ESG фондов. Средства направлены на разработку платформы, пилотные проекты и исследования."}
                                  {metric.label === "Beta Users" && "Активные пользователи платформы с высоким retention rate (75%+). Пользователи активно участвуют в Learn-to-Earn программе и создают контент."}
                                  {metric.label === "Countries Active" && "Страны с запущенными пилотными проектами: Казахстан, Узбекистан, Туркменистан. Планируется расширение на 10+ стран в 2025 году."}
                                </p>
                              </div>
                              
                              <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
                                <h4 className="font-bold mb-2 text-green-400 text-sm">🎯 Влияние:</h4>
                                <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                                  {metric.label === "Pilot Partners" && (
                                    <>
                                      <li>Реальные данные для валидации платформы</li>
                                      <li>Возможность масштабирования на другие регионы</li>
                                      <li>Партнёрства для расширения функционала</li>
                                    </>
                                  )}
                                  {metric.label === "Grants Secured" && (
                                    <>
                                      <li>Финансирование разработки без размытия доли</li>
                                      <li>Международное признание проекта</li>
                                      <li>Возможность привлечения дополнительного финансирования</li>
                                    </>
                                  )}
                                  {metric.label === "Beta Users" && (
                                    <>
                                      <li>Валидация продукт-рыночного соответствия</li>
                                      <li>База для вирусного роста</li>
                                      <li>Feedback для улучшения продукта</li>
                                    </>
                                  )}
                                  {metric.label === "Countries Active" && (
                                    <>
                                      <li>Международное присутствие</li>
                                      <li>Разнообразие данных для AI моделей</li>
                                      <li>Возможность глобального масштабирования</li>
                                    </>
                                  )}
                                </ul>
                              </div>
                              
                              <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/30">
                                <h4 className="font-bold mb-2 text-purple-400 text-sm">📈 Прогноз на 12 месяцев:</h4>
                                <p className="text-sm text-slate-300">
                                  {metric.label === "Pilot Partners" && "Планируется увеличить до 50+ партнёрств через программу TokenHub и расширение на новые регионы."}
                                  {metric.label === "Grants Secured" && "Планируется привлечь дополнительно $3M+ грантов от международных организаций и ESG фондов."}
                                  {metric.label === "Beta Users" && "Планируется достичь 100,000+ активных пользователей к концу 2025 года через маркетинг и партнёрства."}
                                  {metric.label === "Countries Active" && "Планируется расширение на 10+ стран в 2025 году, включая Европу, Азию и Африку."}
                                </p>
                              </div>
                            </div>
                          }
                        />
                      </motion.div>
                    );
                  })}
                </div>
                <div className="flex flex-wrap justify-center gap-6">
                  {slides[currentSlide].logos?.map((logo, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 font-medium"
                    >
                      {logo}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Slide 8: Competition */}
            {slides[currentSlide].type === "competition" && (
              <div className="py-12 relative">
                {/* Декоративный фон */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <motion.div
                    className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
                    animate={{
                      x: [0, 50, 0],
                      y: [0, 30, 0],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
                    animate={{
                      x: [0, -50, 0],
                      y: [0, -30, 0],
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                  />
                </div>
                
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl md:text-7xl font-black mb-12 text-center relative z-10 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                >
                  {slides[currentSlide].title}
                </motion.h2>
                
                <div className="overflow-x-auto relative z-10">
                  <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                          <th className="p-4 text-left font-bold text-slate-300"></th>
                          {["Blockchain", "DAO", "IoT", "Token", "Open Data"].map((feature, i) => (
                            <th key={i} className="p-4 text-center text-slate-400 font-medium">
                              {feature}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <motion.tr
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 hover:from-cyan-500/15 hover:to-purple-500/15 transition-all"
                        >
                          <td className="p-4 font-bold text-cyan-400 flex items-center gap-2">
                            <motion.div
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="w-2 h-2 rounded-full bg-cyan-400"
                            />
                            CivilizationProtocol
                          </td>
                          {[true, true, true, true, true].map((has, i) => (
                            <td key={i} className="p-4 text-center">
                              <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: i * 0.1, type: "spring" }}
                                whileHover={{ scale: 1.2, rotate: 360 }}
                                className="inline-block"
                              >
                                <CheckCircle2 className="mx-auto text-cyan-400" size={28} />
                              </motion.div>
                            </td>
                          ))}
                        </motion.tr>
                        {slides[currentSlide].competitors?.map((comp, i) => {
                          const competitorDetails: Record<string, any> = {
                            AQUASTAT: {
                              title: "AQUASTAT - База данных ФАО",
                              description: "Глобальная база данных ФАО (Продовольственная и сельскохозяйственная организация ООН) о водных ресурсах.",
                              strengths: [
                                "Обширная база данных о водных ресурсах",
                                "Доступность для публики",
                                "Международное признание",
                              ],
                              weaknesses: [
                                "Данные обновляются раз в 5-10 лет",
                                "Нет real-time мониторинга",
                                "Нет блокчейн-интеграции",
                                "Нет токеномики",
                                "Нет DAO-управления",
                              ],
                              market: "$50M+",
                            },
                            Xylem: {
                              title: "Xylem - Водные технологии",
                              description: "Международная компания по водным технологиям и инфраструктуре, лидер рынка IoT решений для воды.",
                              strengths: [
                                "IoT решения для мониторинга воды",
                                "Крупная клиентская база (10,000+ клиентов)",
                                "Выручка: $5B+",
                              ],
                              weaknesses: [
                                "Централизованная система (нет блокчейна)",
                                "Нет прозрачности данных",
                                "Высокая стоимость решений",
                                "Нет токеномики",
                                "Нет DAO-управления",
                              ],
                              market: "$5B+",
                            },
                            Veolia: {
                              title: "Veolia - Управление водными ресурсами",
                              description: "Французская многонациональная корпорация по управлению водными ресурсами, энергетикой и отходами.",
                              strengths: [
                                "Крупнейший оператор водных услуг в мире",
                                "IoT интеграция",
                                "Выручка: $30B+",
                              ],
                              weaknesses: [
                                "Централизованная система",
                                "Нет блокчейн-прозрачности",
                                "Нет токеномики",
                                "Нет DAO-управления",
                                "Отсутствие гражданского участия",
                              ],
                              market: "$30B+",
                            },
                          };
                          
                          const detail = competitorDetails[comp.name] || {
                            title: comp.name,
                            description: "Конкурент в сфере управления водными ресурсами",
                            strengths: ["Сильные стороны конкурента"],
                            weaknesses: ["Слабые стороны конкурента"],
                            market: "Не указано",
                          };
                          
                          return (
                            <InfoPopup
                              key={i}
                              title={detail.title}
                              content={
                                <div className="space-y-4">
                                  <div className="bg-gradient-to-r from-slate-500/10 to-slate-600/10 rounded-lg p-4 border border-slate-500/30">
                                    <p className="text-base leading-relaxed mb-3">
                                      <strong className="text-slate-400">{comp.name}</strong> — {detail.description}
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">
                                      <span className="px-3 py-1 rounded-full bg-slate-500/20 text-slate-400 text-xs font-bold">
                                        Рыночная капитализация: {detail.market}
                                      </span>
                                    </div>
                                  </div>
                                  
                                  <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
                                    <h4 className="font-bold mb-3 text-green-400">✅ Сильные стороны:</h4>
                                    <ul className="list-disc list-inside space-y-2 text-sm text-slate-300">
                                      {detail.strengths.map((strength: string, idx: number) => (
                                        <li key={idx}>{strength}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  
                                  <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30">
                                    <h4 className="font-bold mb-3 text-red-400">❌ Слабые стороны:</h4>
                                    <ul className="list-disc list-inside space-y-2 text-sm text-slate-300">
                                      {detail.weaknesses.map((weakness: string, idx: number) => (
                                        <li key={idx}>{weakness}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  
                                  <div className="bg-cyan-500/10 rounded-lg p-4 border border-cyan-500/30">
                                    <h4 className="font-bold mb-2 text-cyan-400 text-sm">💡 Наше конкурентное преимущество:</h4>
                                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                                      <li>Блокчейн-прозрачность данных</li>
                                      <li>DAO-управление с участием всех заинтересованных сторон</li>
                                      <li>Токеномика для экономических стимулов</li>
                                      <li>Real-time мониторинг через IoT</li>
                                      <li>Гражданская наука и участие</li>
                                      <li>Децентрализованная архитектура</li>
                                    </ul>
                                  </div>
                                </div>
                              }
                              size="xl"
                              trigger={
                                <motion.tr
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.3 + i * 0.1 }}
                                  className="border-b border-white/10 hover:bg-white/5 transition-colors cursor-pointer group"
                                >
                                  <td className="p-4 text-slate-400 font-medium group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                                    {comp.name}
                                    <Info size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                                  </td>
                                  {comp.features.map((f, j) => (
                                    <td key={j} className="p-4 text-center">
                                      {f ? (
                                        <motion.div
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          transition={{ delay: 0.5 + i * 0.1 + j * 0.05 }}
                                        >
                                          <CheckCircle2 className="mx-auto text-slate-600" size={24} />
                                        </motion.div>
                                      ) : (
                                        <span className="text-slate-700 text-2xl">—</span>
                                      )}
                                    </td>
                                  ))}
                                </motion.tr>
                              }
                              source={{ name: "Market Research", year: 2024 }}
                            />
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 9: Team */}
            {slides[currentSlide].type === "team" && (
              <div className="py-12 text-center relative">
                {/* Декоративный фон */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <motion.div
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                  />
                </div>
                
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl md:text-7xl font-black mb-12 relative z-10 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                >
                  {slides[currentSlide].title}
                </motion.h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                  {slides[currentSlide].members?.map((member, i) => (
                    <InfoPopup
                      key={i}
                      title={member.name}
                      content={
                        <div className="space-y-3">
                          <p className="text-sm text-slate-400">{member.role}</p>
                          <div>
                            <h4 className="font-bold mb-2">Опыт:</h4>
                            <p className="text-sm">
                              {member.name === "Founder & CEO" && "15+ лет в водных технологиях, серийный предприниматель, основал 3 успешных стартапа"}
                              {member.name === "CTO" && "Бывший инженер Google, эксперт по блокчейн-технологиям, 10+ лет опыта в разработке"}
                              {member.name === "COO" && "Бывший сотрудник World Bank, специалист по водной политике, 12+ лет в международных проектах"}
                              {member.name === "Head of DAO" && "Пионер DeFi, эксперт по DAO-управлению, создал несколько успешных DAO"}
                            </p>
                          </div>
                        </div>
                      }
                      trigger={
                        <motion.div
                          initial={{ opacity: 0, y: 30, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: i * 0.1, type: "spring" }}
                          whileHover={{ 
                            y: -8,
                            scale: 1.05,
                            transition: { duration: 0.2 }
                          }}
                          className="p-6 rounded-2xl glass-card border border-white/10 hover:border-cyan-500/50 transition-all cursor-pointer group relative overflow-hidden"
                        >
                          {/* Градиентный фон при hover */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 transition-all duration-300"
                          />
                          
                          {/* Анимированный аватар */}
                          <motion.div
                            className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-2xl font-bold mb-4 relative z-10 group-hover:scale-110 transition-transform"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            {/* Пульсирующее кольцо */}
                            <motion.div
                              className="absolute inset-0 rounded-full border-2 border-cyan-400"
                              animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.5, 0, 0.5],
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                            <span className="relative z-10">{member.avatar}</span>
                          </motion.div>
                          
                          <div className="font-bold text-lg mb-1 relative z-10 group-hover:text-cyan-300 transition-colors">
                            {member.name}
                          </div>
                          <div className="text-sm text-slate-400 relative z-10 group-hover:text-slate-300 transition-colors">
                            {member.role}
                          </div>
                          
                          {/* Декоративные элементы */}
                          <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                      }
                      size="md"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Slide 10: Financials */}
            {slides[currentSlide].type === "financials" && (
              <div className="py-12 relative">
                {/* Декоративный фон */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 6, repeat: Infinity }}
                  />
                </div>
                
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl md:text-7xl font-black mb-12 text-center relative z-10 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                >
                  {slides[currentSlide].title}
                </motion.h2>
                
                <div className="max-w-2xl mx-auto space-y-6 relative z-10">
                  {slides[currentSlide].allocation?.map((item, i) => (
                    <InfoPopup
                      key={i}
                      title={item.category}
                      content={
                        <div className="space-y-3">
                          <p>
                            <strong>{item.percent}%</strong> инвестиций направляется на {item.category.toLowerCase()}.
                          </p>
                          <div>
                            <h4 className="font-bold mb-2">Использование:</h4>
                            <p className="text-sm text-slate-400">
                              {item.category === "Product Development" && "Разработка платформы, блокчейн-инфраструктуры, IoT интеграция, AI/ML алгоритмы"}
                              {item.category === "Marketing & Growth" && "Маркетинговая стратегия, партнёрства, конференции, реклама"}
                              {item.category === "Operations" && "Операционные расходы, команда, офисы, инфраструктура"}
                              {item.category === "Legal & Compliance" && "Юридические услуги, лицензирование, соответствие регуляциям"}
                              {item.category === "Reserve" && "Резервный фонд для непредвиденных расходов и возможностей"}
                            </p>
                          </div>
                        </div>
                      }
                      trigger={
                        <motion.div
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ x: 5 }}
                          className="cursor-pointer"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <motion.div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: item.color }}
                                animate={{
                                  scale: [1, 1.3, 1],
                                  boxShadow: [`0 0 0 0 ${item.color}40`, `0 0 0 8px ${item.color}00`, `0 0 0 0 ${item.color}40`],
                                }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                              />
                              <span className="font-medium text-lg hover:text-cyan-300 transition-colors">
                                {item.category}
                              </span>
                            </div>
                            <motion.span
                              className="font-bold text-2xl"
                              style={{ color: item.color }}
                              whileHover={{ scale: 1.1 }}
                            >
                              {item.percent}%
                            </motion.span>
                          </div>
                          <div className="h-6 bg-white/5 rounded-full overflow-hidden relative">
                            {/* Фоновый градиент */}
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-800/50 to-slate-900/50" />
                            
                            {/* Анимированная полоса прогресса */}
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.percent}%` }}
                              transition={{ delay: 0.5 + i * 0.1, duration: 0.8, type: "spring" }}
                              className="h-full rounded-full relative overflow-hidden"
                              style={{ backgroundColor: item.color }}
                            >
                              {/* Блестящий эффект */}
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                animate={{
                                  x: ["-100%", "100%"],
                                }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                              />
                              
                              {/* Свечение */}
                              <motion.div
                                className="absolute inset-0"
                                style={{
                                  boxShadow: `0 0 20px ${item.color}60`,
                                }}
                                animate={{
                                  opacity: [0.5, 1, 0.5],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            </motion.div>
                            
                            {/* Процент внутри полосы */}
                            <motion.div
                              className="absolute inset-0 flex items-center justify-end pr-2 text-xs font-bold text-white"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.8 + i * 0.1 }}
                            >
                              {item.percent >= 15 && `${item.percent}%`}
                            </motion.div>
                          </div>
                        </motion.div>
                      }
                      size="md"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Slide 11: Roadmap */}
            {slides[currentSlide].type === "roadmap" && (
              <div className="py-12 relative">
                {/* Декоративный фон */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <motion.div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>
                
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl md:text-7xl font-black mb-12 text-center relative z-10 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                >
                  {slides[currentSlide].title}
                </motion.h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                  {slides[currentSlide].milestones?.map((milestone, i) => (
                    <InfoPopup
                      key={i}
                      title={milestone.quarter}
                      content={
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-bold mb-2">Ключевые достижения:</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                              {milestone.items.map((item, j) => (
                                <li key={j}>{item}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-bold mb-2">Метрики:</h4>
                            <p className="text-sm text-slate-400">
                              {milestone.quarter === "Q1 2025" && "Запуск публичной беты, генерация токенов, первые 10K пользователей"}
                              {milestone.quarter === "Q2 2025" && "Запуск mainnet, расширение на 5 стран, 50K пользователей"}
                              {milestone.quarter === "Q3 2025" && "Партнёрства с предприятиями, полная активация DAO, 75K пользователей"}
                              {milestone.quarter === "Q4 2025" && "100K пользователей, Series A раунд, глобальная экспансия"}
                            </p>
                          </div>
                        </div>
                      }
                      trigger={
                        <motion.div
                          initial={{ opacity: 0, y: 30, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: i * 0.1, type: "spring" }}
                          whileHover={{ 
                            y: -8,
                            scale: 1.03,
                            transition: { duration: 0.2 }
                          }}
                          className="p-6 rounded-2xl glass-card border border-white/10 hover:border-cyan-500/50 transition-all cursor-pointer group relative overflow-hidden"
                        >
                          {/* Градиентный фон */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 transition-all duration-300"
                          />
                          
                          {/* Бейдж с кварталом */}
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: i * 0.1 + 0.2, type: "spring" }}
                            className="absolute -top-3 left-6 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-black text-sm font-bold shadow-lg shadow-cyan-500/30"
                          >
                            {milestone.quarter}
                          </motion.div>
                          
                          <ul className="mt-6 space-y-3 relative z-10">
                            {milestone.items.map((item, j) => (
                              <motion.li
                                key={j}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 + j * 0.05 + 0.3 }}
                                className="flex items-start gap-2 text-slate-300 group-hover:text-white transition-colors"
                              >
                                <motion.div
                                  whileHover={{ scale: 1.2, rotate: 360 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-1" />
                                </motion.div>
                                <span className="text-sm">{item}</span>
                              </motion.li>
                            ))}
                          </ul>
                          
                          {/* Декоративная линия */}
                          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                      }
                      size="md"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Slide 12: The Ask */}
            {slides[currentSlide].type === "ask" && (
              <div className="py-12 text-center relative">
                {/* Декоративный фон */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 6, repeat: Infinity }}
                  />
                </div>
                
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl md:text-7xl font-black mb-4 relative z-10 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                >
                  {slides[currentSlide].title}
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl text-cyan-400 mb-12 relative z-10 font-bold"
                >
                  {slides[currentSlide].round}
                </motion.div>

                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="inline-block p-12 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-2 border-cyan-500/30 mb-12 relative z-10 shadow-2xl shadow-cyan-500/20"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-8xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4"
                  >
                    {slides[currentSlide].amount}
                  </motion.div>
                  <div className="text-xl text-slate-300 font-medium mb-2">{slides[currentSlide].valuation}</div>
                  <div className="text-sm text-slate-400">Post-money: $30M</div>
                </motion.div>

                <div className="max-w-4xl mx-auto mb-12 relative z-10">
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {slides[currentSlide].terms?.map((term, i) => (
                      <InfoPopup
                        key={i}
                        title={term.includes("equity") ? "Equity" : term.includes("SAFE") ? "SAFE + Token Warrant" : "Runway"}
                        content={
                          <div className="space-y-3">
                            {term.includes("equity") && (
                              <>
                                <p className="text-base leading-relaxed">
                                  <strong>20% equity</strong> — инвесторы получают 20% доли в компании.
                                </p>
                                <div>
                                  <h4 className="font-bold mb-2">Права инвестора:</h4>
                                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
                                    <li>Право голоса на ключевых решениях</li>
                                    <li>Дивиденды от прибыли компании</li>
                                    <li>Участие в exit events (IPO, продажа)</li>
                                    <li>Информационные права (регулярные отчёты)</li>
                                    <li>Право на выкуп акций (optional)</li>
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="font-bold mb-2">Структура капитала:</h4>
                                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
                                    <li>Команда: 60% (4-летний vesting)</li>
                                    <li>Инвесторы Seed: 20%</li>
                                    <li>Резерв для будущих раундов: 20%</li>
                                  </ul>
                                </div>
                              </>
                            )}
                            {term.includes("SAFE") && (
                              <>
                                <p className="text-base leading-relaxed">
                                  <strong>SAFE + Token Warrant</strong> — гибкая структура инвестирования с правом на токены.
                                </p>
                                <div>
                                  <h4 className="font-bold mb-2">SAFE условия:</h4>
                                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
                                    <li>Конвертация в equity при следующем раунде</li>
                                    <li>Дисконт 20% для инвесторов Seed</li>
                                    <li>Valuation cap: $25M</li>
                                    <li>MFN clause (Most Favored Nation)</li>
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="font-bold mb-2">Token Warrant:</h4>
                                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
                                    <li>Право на покупку VOD токенов по льготной цене</li>
                                    <li>Размер warrant: 10% от инвестиции</li>
                                    <li>Цена покупки: $0.05/VOD (50% discount)</li>
                                    <li>Срок действия: 5 лет с момента листинга</li>
                                  </ul>
                                </div>
                              </>
                            )}
                            {term.includes("runway") && (
                              <>
                                <p className="text-base leading-relaxed">
                                  <strong>18-month runway</strong> — средства обеспечат работу компании на 18 месяцев.
                                </p>
                                <div>
                                  <h4 className="font-bold mb-2">Использование средств:</h4>
                                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
                                    <li>Product Development (40%): $2M</li>
                                    <li>Marketing & Growth (25%): $1.25M</li>
                                    <li>Operations (20%): $1M</li>
                                    <li>Legal & Compliance (10%): $0.5M</li>
                                    <li>Reserve (5%): $0.25M</li>
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="font-bold mb-2">Ключевые вехи за 18 месяцев:</h4>
                                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
                                    <li>Q1 2025: Public Beta Launch, TGE</li>
                                    <li>Q2 2025: Mainnet Launch, 5 Countries</li>
                                    <li>Q3 2025: Enterprise Partnerships, 75K Users</li>
                                    <li>Q4 2025: Series A Preparation, 100K Users</li>
                                  </ul>
                                </div>
                              </>
                            )}
                          </div>
                        }
                        size="lg"
                        trigger={
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ 
                              scale: 1.05,
                              y: -5,
                              transition: { duration: 0.2 }
                            }}
                            className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all cursor-pointer group relative"
                          >
                            <span className="font-medium text-sm group-hover:text-cyan-300 transition-colors">
                              {term}
                            </span>
                            <Info size={14} className="absolute -top-1 -right-1 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </motion.div>
                        }
                        source={{ name: "Investment Terms", year: 2024 }}
                      />
                    ))}
                  </div>
                  
                  {/* Дополнительная информация */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <InfoPopup
                      title="Использование инвестиций"
                      content={
                        <div className="space-y-4">
                          <div className="bg-cyan-500/10 rounded-lg p-4 border border-cyan-500/30">
                            <h4 className="font-bold mb-3 text-cyan-400">📊 Распределение $5M:</h4>
                            <div className="space-y-3 text-sm">
                              {[
                                { category: "Product Development", amount: "$2M (40%)", details: "Блокчейн интеграция, IoT датчики, AI Engine, Frontend/Backend" },
                                { category: "Marketing & Growth", amount: "$1.25M (25%)", details: "Запуск платформы, партнёрства, сообщество, PR" },
                                { category: "Operations", amount: "$1M (20%)", details: "Команда, офисы, инфраструктура, серверы" },
                                { category: "Legal & Compliance", amount: "$0.5M (10%)", details: "Лицензирование, соответствие регуляциям, аудит" },
                                { category: "Reserve", amount: "$0.25M (5%)", details: "Резерв для непредвиденных расходов и возможностей" },
                              ].map((item, i) => (
                                <div key={i} className="bg-white/5 rounded-lg p-3">
                                  <div className="flex items-center justify-between mb-1">
                                    <strong className="text-slate-300">{item.category}</strong>
                                    <span className="font-bold text-cyan-400">{item.amount}</span>
                                  </div>
                                  <p className="text-xs text-slate-400">{item.details}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      }
                      trigger={
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                          whileHover={{ scale: 1.02 }}
                          className="p-6 rounded-2xl glass-card border border-white/10 hover:border-cyan-500/50 transition-all cursor-pointer group"
                        >
                          <DollarSign className="mx-auto mb-3 text-cyan-400" size={32} />
                          <h4 className="font-bold text-lg mb-2 group-hover:text-cyan-300 transition-colors">Использование инвестиций</h4>
                          <p className="text-sm text-slate-400">Детальное распределение средств</p>
                          <Info size={14} className="absolute top-2 right-2 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                      }
                      size="lg"
                    />
                    
                    <InfoPopup
                      title="Ожидаемые результаты"
                      content={
                        <div className="space-y-4">
                          <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
                            <h4 className="font-bold mb-3 text-green-400">🎯 Ключевые метрики через 18 месяцев:</h4>
                            <div className="space-y-3 text-sm">
                              {[
                                { metric: "Пользователи", value: "100,000+", target: "100K" },
                                { metric: "Страны", value: "10+", target: "10" },
                                { metric: "Проекты в TokenHub", value: "50+", target: "50" },
                                { metric: "Выручка (ARR)", value: "$5M+", target: "$5M" },
                                { metric: "Партнёрства", value: "25+", target: "25" },
                                { metric: "Данные IoT (объекты)", value: "10,000+", target: "10K" },
                              ].map((item, i) => (
                                <div key={i} className="bg-white/5 rounded-lg p-3 flex items-center justify-between">
                                  <span className="text-slate-300">{item.metric}</span>
                                  <span className="font-bold text-green-400">{item.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/30">
                            <h4 className="font-bold mb-2 text-purple-400 text-sm">📈 Прогноз Series A:</h4>
                            <div className="text-sm text-slate-300 space-y-1">
                              <div>Целевая оценка: <span className="font-bold text-purple-400">$100M+</span></div>
                              <div>Целевая сумма: <span className="font-bold text-purple-400">$15M+</span></div>
                              <div>Timeline: <span className="font-bold text-purple-400">Q4 2025</span></div>
                            </div>
                          </div>
                        </div>
                      }
                      trigger={
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 }}
                          whileHover={{ scale: 1.02 }}
                          className="p-6 rounded-2xl glass-card border border-white/10 hover:border-green-500/50 transition-all cursor-pointer group"
                        >
                          <Target className="mx-auto mb-3 text-green-400" size={32} />
                          <h4 className="font-bold text-lg mb-2 group-hover:text-green-300 transition-colors">Ожидаемые результаты</h4>
                          <p className="text-sm text-slate-400">Ключевые метрики и прогнозы</p>
                          <Info size={14} className="absolute top-2 right-2 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                      }
                      size="lg"
                    />
                  </div>
                </div>

                {/* Buy Token Widget */}
                <div className="max-w-xl mx-auto relative z-10">
                  <BuyTokenWidget variant="banner" source="investor-presentation" />
                </div>
                
                {/* CTA кнопки */}
                <div className="flex flex-wrap justify-center gap-4 mt-8 relative z-10">
                  <Link
                    href="/contact"
                    className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-2xl hover:scale-105 transition-transform shadow-lg shadow-cyan-500/30"
                  >
                    📧 Связаться с нами
                  </Link>
                  <Link
                    href="/whitepaper"
                    className="px-8 py-4 border-2 border-cyan-500 text-cyan-400 font-bold rounded-2xl hover:bg-cyan-500/10 transition-colors"
                  >
                    📄 Whitepaper
                  </Link>
                  <button className="px-8 py-4 border border-white/20 text-white font-bold rounded-2xl hover:bg-white/10 transition-colors">
                    📊 Финансовая модель
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide dots */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-40">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              i === currentSlide 
                ? "w-8 bg-cyan-500" 
                : "bg-white/20 hover:bg-white/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}









