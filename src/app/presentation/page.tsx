"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import {
  Globe, Shield, Zap, Droplets, ArrowRight, CheckCircle2, Cpu,
  Database, Network, Building2, Landmark, TrendingUp, Users,
  ChevronDown, BookOpen, Gamepad2, Layers, Lock, GraduationCap,
  Smartphone, BarChart3, Wallet, Vote, FileText, Play, Pause,
  MapPin, Activity, Leaf, Heart, Beaker, Settings, UserCheck,
  Coins, Gift, Star, Trophy, Target, Clock, DollarSign, Percent
} from "lucide-react";
import Link from "next/link";

// 15 экранов презентации с полным контентом
const screens = [
  {
    id: 1,
    title: "Welcome to VODeco",
    subtitle: "Value of Data — Water Ecosystem",
    description: "Water is the foundation of life, ecosystems and economies. Yet today, water is managed with fragmented data, outdated infrastructure and limited transparency.",
    stats: [
      { value: "1+ млрд", label: "людей без доступа к чистой воде" },
      { value: "5+ млрд", label: "столкнутся с дефицитом к 2030" },
      { value: "$500 млрд", label: "ежегодных потерь (1% ВВП)" },
    ],
    visual: "globe",
    cta: "Enter the Ecosystem",
  },
  {
    id: 2,
    title: "Глобальная Проблема",
    subtitle: "Водный кризис — это кризис данных и управления",
    description: "Water scarcity, pollution and infrastructure losses are not only environmental issues. They are governance and data problems. Decisions are often made without reliable, real-time information.",
    problems: [
      { icon: Droplets, text: "60% водных систем без мониторинга", color: "text-red-400" },
      { icon: Building2, text: "80% инфраструктуры устарело", color: "text-orange-400" },
      { icon: Database, text: "Фрагментированные данные", color: "text-yellow-400" },
      { icon: Users, text: "Отсутствие прозрачности", color: "text-amber-400" },
    ],
    visual: "problems",
  },
  {
    id: 3,
    title: "Переход к Решению",
    subtitle: "От проблемы к цифровой инфраструктуре",
    description: "To manage water sustainably, we need a new digital foundation. One that connects reality, data, economy and governance into a single transparent system.",
    layers: [
      "Физический мир",
      "Сбор данных",
      "Верификация",
      "Цифровые двойники",
      "Экономика",
      "Управление",
    ],
    visual: "transition",
  },
  {
    id: 4,
    title: "Что такое VODeco",
    subtitle: "Децентрализованная кибер-физическая платформа",
    description: "VODeco is a digital ecosystem for transparent, data-driven water resource governance. It integrates monitoring, data trust, economic mechanisms and decision-making.",
    features: [
      { icon: Globe, text: "Глобальный охват", desc: "От региона до планеты" },
      { icon: Shield, text: "Блокчейн доверие", desc: "Неизменяемость данных" },
      { icon: Cpu, text: "AI аналитика", desc: "Предиктивные модели" },
      { icon: Vote, text: "DAO управление", desc: "Децентрализованные решения" },
    ],
    sdg: ["SDG 6", "SDG 9", "SDG 11", "SDG 13", "SDG 16"],
    visual: "vodeco",
  },
  {
    id: 5,
    title: "12-Уровневая Архитектура",
    subtitle: "Полная вертикаль от физики до интеграций",
    description: "Each layer builds on the previous, creating a complete ecosystem for water governance.",
    architecture: [
      { name: "Physical Layer", desc: "Реальные водные объекты", icon: Globe, color: "bg-blue-500" },
      { name: "Data & IoT Layer", desc: "Сбор телеметрии, датчики", icon: Database, color: "bg-cyan-500" },
      { name: "Blockchain Layer", desc: "Хранение, смарт-контракты", icon: Shield, color: "bg-purple-500" },
      { name: "Economic Layer", desc: "Токеномика, стейкинг", icon: Coins, color: "bg-yellow-500" },
      { name: "DAO Layer", desc: "Децентрализованное управление", icon: Vote, color: "bg-green-500" },
      { name: "Interface Layer", desc: "7 специализированных кабинетов", icon: Smartphone, color: "bg-indigo-500" },
      { name: "AI Layer", desc: "ML, прогнозирование", icon: Cpu, color: "bg-pink-500" },
      { name: "Security Layer", desc: "Защита данных, аудит", icon: Lock, color: "bg-red-500" },
      { name: "Educational Layer", desc: "Обучение, гранты", icon: GraduationCap, color: "bg-orange-500" },
      { name: "Gaming Layer", desc: "Геймификация, NFT", icon: Gamepad2, color: "bg-violet-500" },
      { name: "Social Layer", desc: "Социальная сеть", icon: Users, color: "bg-rose-500" },
      { name: "Integration Layer", desc: "API, SDK, партнёры", icon: Network, color: "bg-teal-500" },
    ],
    visual: "architecture",
  },
  {
    id: 6,
    title: "Данные и Доверие",
    subtitle: "Reliable water governance begins with trusted data",
    description: "VODeco ensures transparency, traceability and integrity of environmental information through blockchain-based verification.",
    dataFlow: [
      { step: "Raw Data", desc: "IoT датчики, измерения", icon: Activity },
      { step: "Validation", desc: "Проверка и верификация", icon: CheckCircle2 },
      { step: "Hashing", desc: "Хэширование в блокчейн", icon: Shield },
      { step: "Trusted Data", desc: "Неизменяемое хранение", icon: Database },
    ],
    visual: "dataflow",
  },
  {
    id: 7,
    title: "Цифровые Двойники",
    subtitle: "Digital representation of real-world water assets",
    description: "Each water body and infrastructure element can be represented as a digital twin. This allows analysis, forecasting and informed decision-making.",
    twinTypes: [
      { type: "Водные объекты", examples: "Реки, озёра, водохранилища", icon: Droplets },
      { type: "Инфраструктура", examples: "Станции, насосы, очистные", icon: Building2 },
      { type: "Датчики IoT", examples: "Качество, уровень, расход", icon: Activity },
      { type: "Проекты", examples: "Модернизация, восстановление", icon: Target },
    ],
    visual: "twins",
  },
  {
    id: 8,
    title: "Экономика Воды — Nexus Exchange",
    subtitle: "Центральный хаб обмена токенов, данных и услуг",
    description: "Sustainable water management requires economic instruments. VODeco connects environmental data with investment transparency.",
    nexusModules: [
      { name: "Token & Data Exchange", desc: "Обмен VOD/R-VOD/P-VOD, торговля данными", fee: "0.1-0.3%" },
      { name: "Staking & Impact Pools", desc: "Stake-to-build, климатические пулы", apy: "5-25% APY" },
      { name: "Investment Marketplace", desc: "PPP проекты, R&D, стартапы", dao: "DAO-голосование" },
      { name: "Service & Partnership Hub", desc: "AI сервисы, консалтинг, SCADA", rewards: "Токен-награды" },
    ],
    visual: "nexus",
  },
  {
    id: 9,
    title: "Токеномика — 4 Фазы Эволюции",
    subtitle: "The VOD token evolves together with the platform",
    description: "Each phase builds on the previous one without breaking continuity. Token is not ownership of water — it is access, participation and governance interface.",
    phases: [
      { phase: "Phase 1", name: "Access & Participation", desc: "Доступ к платформе, участие в развитии, ранние бонусы", status: "current" },
      { phase: "Phase 2", name: "Staking & Governance", desc: "Стейкинг, участие в DAO, формирование веса доверия", status: "next" },
      { phase: "Phase 3", name: "Data Anchoring", desc: "Привязка к проверенным данным, смарт-контракты объектов", status: "future" },
      { phase: "Phase 4", name: "Resource-Linked Logic", desc: "Полная интеграция с цифровыми двойниками и IoT", status: "future" },
    ],
    tokenDistribution: [
      { name: "Ecosystem & Community", percent: 25 },
      { name: "Team & Advisors", percent: 20 },
      { name: "Private Sale", percent: 15 },
      { name: "Pre-Seed & Seed", percent: 10 },
      { name: "Public Sale", percent: 10 },
      { name: "DAO Treasury", percent: 10 },
      { name: "Liquidity", percent: 5 },
      { name: "Partnerships", percent: 5 },
    ],
    visual: "tokenomics",
  },
  {
    id: 10,
    title: "DAO Управление",
    subtitle: "Decisions made through transparent governance mechanisms",
    description: "VODeco supports collaboration between public institutions, experts, investors and society through decentralized autonomous organization.",
    daoFeatures: [
      { feature: "Предложения", desc: "Создание и обсуждение инициатив", icon: FileText },
      { feature: "Голосование", desc: "Взвешенное голосование токенами", icon: Vote },
      { feature: "Делегирование", desc: "Передача голосов экспертам", icon: Users },
      { feature: "Казначейство", desc: "Управление фондами DAO", icon: Wallet },
      { feature: "Исполнение", desc: "Автоматическое через смарт-контракты", icon: Zap },
      { feature: "Аудит", desc: "Прозрачный контроль решений", icon: CheckCircle2 },
    ],
    participants: [
      { role: "Государства", weight: "Высокий", focus: "Регуляция" },
      { role: "Инвесторы", weight: "По стейку", focus: "ROI/ESG" },
      { role: "Эксперты", weight: "Делегированный", focus: "Технологии" },
      { role: "Граждане", weight: "Базовый", focus: "Участие" },
    ],
    visual: "dao",
  },
  {
    id: 11,
    title: "7 Специализированных Кабинетов",
    subtitle: "Tailored interfaces for different stakeholders",
    description: "Different stakeholders interact with the ecosystem through specialized interfaces, tailored to their roles and responsibilities.",
    cabinets: [
      { name: "Гражданский", icon: UserCheck, color: "bg-blue-500", features: ["Мониторинг качества", "Геймификация", "DAO участие", "Награды"] },
      { name: "Правительственный", icon: Landmark, color: "bg-purple-500", features: ["Аналитика регионов", "Кризисные панели", "Отчётность SDG"] },
      { name: "Инвестиционный", icon: TrendingUp, color: "bg-green-500", features: ["ESG метрики", "ROI калькулятор", "Портфель проектов"] },
      { name: "Инфраструктурный", icon: Building2, color: "bg-orange-500", features: ["Управление активами", "IoT интеграция", "CMMS"] },
      { name: "Научный", icon: Beaker, color: "bg-cyan-500", features: ["Data Lake", "ML модели", "Публикации"] },
      { name: "Операторский", icon: Settings, color: "bg-red-500", features: ["Системный контроль", "Техподдержка", "Логи"] },
      { name: "Административный", icon: Lock, color: "bg-slate-500", features: ["Конфигурация", "Безопасность", "Роли"] },
    ],
    visual: "cabinets",
  },
  {
    id: 12,
    title: "Проекты TokenHub",
    subtitle: "Investment marketplace for water infrastructure",
    description: "Financing projects through tokenized mechanisms with transparent tracking and DAO governance.",
    projects: [
      { name: "VODeco Core", type: "O-VOD", irr: "12%", status: "Active", desc: "Global Data Infrastructure" },
      { name: "Smart Pumping Network", type: "P-VOD", irr: "18%", status: "Funding", desc: "IoT насосные станции" },
      { name: "Desalination 2.0", type: "P-VOD", irr: "22%", status: "Planning", desc: "Опреснение нового поколения" },
      { name: "Carbon Credits", type: "R-VOD", irr: "15%", status: "Active", desc: "Regen Network интеграция" },
      { name: "P2P Microgrids", type: "R-VOD", irr: "20%", status: "Pilot", desc: "Энергетические микросети" },
      { name: "Bio-Data Vault", type: "O-VOD", irr: "10%", status: "R&D", desc: "Хранилище биоданных" },
    ],
    visual: "tokenhub",
  },
  {
    id: 13,
    title: "Международный Контекст",
    subtitle: "Aligned with global sustainability frameworks",
    description: "VODeco is aligned with international sustainability frameworks and supports cross-border cooperation and institutional reporting.",
    sdgAlignment: [
      { sdg: "SDG 6", name: "Clean Water & Sanitation", contribution: "Основной фокус платформы" },
      { sdg: "SDG 9", name: "Industry & Innovation", contribution: "IoT, AI, Blockchain технологии" },
      { sdg: "SDG 11", name: "Sustainable Cities", contribution: "Городская инфраструктура" },
      { sdg: "SDG 13", name: "Climate Action", contribution: "Климатические пулы, Carbon Credits" },
      { sdg: "SDG 16", name: "Strong Institutions", contribution: "Прозрачность, DAO управление" },
    ],
    partners: ["UN-Water", "UNEP", "World Bank", "EBRD", "Green Climate Fund", "Water.org"],
    visual: "international",
  },
  {
    id: 14,
    title: "Дорожная Карта 2023-2026",
    subtitle: "The ecosystem evolves step by step",
    description: "From digital monitoring to smart-contract-based governance — a clear path to global water management transformation.",
    roadmap: [
      { year: "2023", quarter: "Q4", title: "MVP Development", items: ["Архитектура", "Прототип", "Дизайн UI/UX"], status: "done" },
      { year: "2024", quarter: "Q1-Q2", title: "Platform Launch", items: ["Beta платформы", "Токен VOD", "IoT интеграция"], status: "current" },
      { year: "2024", quarter: "Q3-Q4", title: "Ecosystem Growth", items: ["Mobile App", "DAO запуск", "Token Hub"], status: "next" },
      { year: "2025", quarter: "Full", title: "Expansion", items: ["TRINITY интеграция", "Международные партнёрства", "AI v2"], status: "future" },
      { year: "2026", quarter: "Full", title: "Global Scale", items: ["1M+ пользователей", "10000+ объектов", "Full DAO"], status: "future" },
    ],
    visual: "roadmap",
  },
  {
    id: 15,
    title: "Присоединяйтесь к Экосистеме",
    subtitle: "VODeco is not about controlling water",
    description: "It is about creating the digital infrastructure for responsible coexistence with it. Join the movement for transparent, sustainable water governance.",
    investmentTiers: [
      { tier: "Seed", amount: "от 10,000 VOD", benefits: ["Ранний доступ", "Базовые права голосования", "Pioneer Badge"] },
      { tier: "Strategic", amount: "от 100,000 VOD", benefits: ["Расширенные права", "Аналитика", "Приоритетная поддержка"] },
      { tier: "Infrastructure", amount: "от 500,000 VOD", benefits: ["Участие в проектах", "Доля в доходах", "Эксклюзивный доступ"] },
      { tier: "Institutional", amount: "от 1,000,000 VOD", benefits: ["Совет DAO", "Права на регионы", "Стратегическое партнёрство"] },
    ],
    contacts: {
      website: "vodprom.org",
      email: "info@vodprom.org",
      social: "@vodprom",
    },
    visual: "cta",
    },
];

export default function PresentationPage() {
  const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

  const [activeScreen, setActiveScreen] = useState(0);

    return (
    <div ref={containerRef} className="relative bg-ocean-deep">
            {/* Progress Bar */}
            <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-glow via-blue-500 to-purple-500 z-[60] origin-left"
                style={{ scaleX }}
            />

      {/* Screen Navigation */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2">
        {screens.map((screen, i) => (
          <button
            key={i}
            onClick={() => {
              document.getElementById(`screen-${i}`)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === activeScreen 
                ? 'bg-cyan-glow scale-125' 
                : 'bg-white/20 hover:bg-white/40'
            }`}
            title={screen.title}
          />
                ))}
            </div>

      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-cyan-glow/3 rounded-full blur-[200px]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[180px]" />
                    </div>

      {/* Screens */}
      <div className="relative z-10">
        {screens.map((screen, i) => (
          <ScreenComponent 
            key={i} 
            screen={screen} 
            index={i} 
            total={screens.length}
            onInView={() => setActiveScreen(i)}
          />
        ))}
            </div>
        </div>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ScreenComponent({ screen, index, total, onInView }: { screen: any; index: number; total: number; onInView: (index: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

    return (
        <motion.section
            ref={ref}
      id={`screen-${index}`}
      style={{ opacity }}
      onViewportEnter={() => onInView(index)}
      className="min-h-screen flex items-center justify-center py-20 px-4 relative"
    >
      <motion.div style={{ y }} className="max-w-7xl w-full">
        {/* Screen Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="text-cyan-glow font-bold">{String(index + 1).padStart(2, '0')}</span>
            <div className="w-8 h-px bg-white/20" />
            <span className="text-slate-400 text-sm uppercase tracking-wider">из {total}</span>
          </div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-white via-cyan-200 to-cyan-glow bg-clip-text text-transparent"
          >
            {screen.title}
          </motion.h2>
          
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-cyan-glow/80 mb-6"
          >
            {screen.subtitle}
          </motion.h3>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-slate-400 max-w-3xl mx-auto"
          >
            {screen.description}
          </motion.p>
        </div>

        {/* Screen Content */}
        <ScreenContent screen={screen} index={index} />
      </motion.div>

      {/* Scroll Indicator */}
      {index < total - 1 && (
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs text-slate-500 uppercase tracking-widest">Scroll</span>
          <ChevronDown className="text-slate-500" size={20} />
        </motion.div>
      )}
    </motion.section>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ScreenContent({ screen, index }: { screen: any; index: number }) {
  switch (index) {
    case 0: // Welcome
      return <WelcomeScreen screen={screen} />;
    case 1: // Problems
      return <ProblemsScreen screen={screen} />;
    case 2: // Transition
      return <TransitionScreen screen={screen} />;
    case 3: // What is VODeco
      return <VODecoScreen screen={screen} />;
    case 4: // Architecture
      return <ArchitectureScreen screen={screen} />;
    case 5: // Data & Trust
      return <DataFlowScreen screen={screen} />;
    case 6: // Digital Twins
      return <TwinsScreen screen={screen} />;
    case 7: // Nexus
      return <NexusScreen screen={screen} />;
    case 8: // Tokenomics
      return <TokenomicsScreen screen={screen} />;
    case 9: // DAO
      return <DAOScreen screen={screen} />;
    case 10: // Cabinets
      return <CabinetsScreen screen={screen} />;
    case 11: // TokenHub
      return <TokenHubScreen screen={screen} />;
    case 12: // International
      return <InternationalScreen screen={screen} />;
    case 13: // Roadmap
      return <RoadmapScreen screen={screen} />;
    case 14: // CTA
      return <CTAScreen screen={screen} />;
    default:
      return null;
  }
}

// Screen 1: Welcome
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function WelcomeScreen({ screen }: { screen: any }) {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
        <div className="grid grid-cols-3 gap-4">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {screen.stats.map((stat: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="glass-card p-6 text-center"
            >
              <div className="text-3xl font-black text-cyan-glow mb-2">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex gap-4"
        >
          <Link href="/dashboard" className="px-8 py-4 bg-cyan-glow text-ocean-deep font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
            {screen.cta} <ArrowRight size={20} />
          </Link>
          <Link href="/whitepaper" className="px-8 py-4 glass text-white font-bold rounded-xl hover:bg-white/10 transition-colors">
            White Paper
          </Link>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="relative aspect-square"
      >
        {/* Animated Globe Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="w-80 h-80 rounded-full border-2 border-cyan-glow/20 relative"
          >
            <div className="absolute inset-4 rounded-full border border-cyan-glow/30" />
            <div className="absolute inset-8 rounded-full border border-cyan-glow/40" />
            <div className="absolute inset-12 rounded-full bg-gradient-to-br from-cyan-glow/20 to-blue-500/20 flex items-center justify-center">
              <Globe className="text-cyan-glow" size={80} />
            </div>
            {/* Orbiting dots */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-cyan-glow rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 60}deg) translateX(140px)`,
                }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

// Screen 2: Problems
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ProblemsScreen({ screen }: { screen: any }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {screen.problems.map((problem: any, i: number) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.1 }}
          className="glass-card p-8 text-center hover:scale-105 transition-transform cursor-pointer group"
        >
          <div className={`w-16 h-16 mx-auto rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors ${problem.color}`}>
            <problem.icon size={32} />
          </div>
          <p className="text-lg font-medium">{problem.text}</p>
        </motion.div>
      ))}
                    </div>
  );
}

// Screen 3: Transition
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TransitionScreen({ screen }: { screen: any }) {
  return (
    <div className="flex justify-center">
      <div className="relative">
        {screen.layers.map((layer: string, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -50, rotateY: -20 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ delay: 0.1 * i }}
            className="glass-card px-8 py-4 mb-4 flex items-center gap-4 min-w-[300px]"
            style={{ marginLeft: i * 20 }}
          >
            <div className="w-10 h-10 rounded-full bg-cyan-glow/20 flex items-center justify-center text-cyan-glow font-bold">
              {i + 1}
                    </div>
            <span className="text-lg font-medium">{layer}</span>
            {i < screen.layers.length - 1 && (
              <ArrowRight className="text-slate-500 ml-auto" size={20} />
            )}
          </motion.div>
        ))}
                    </div>
                </div>
  );
}

// Screen 4: What is VODeco
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function VODecoScreen({ screen }: { screen: any }) {
  return (
    <div className="space-y-12">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {screen.features.map((feature: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="glass-card p-6 text-center hover:border-cyan-glow/50 transition-colors"
          >
            <div className="w-14 h-14 mx-auto rounded-xl bg-cyan-glow/10 flex items-center justify-center mb-4 text-cyan-glow">
              <feature.icon size={28} />
            </div>
            <h4 className="font-bold mb-2">{feature.text}</h4>
            <p className="text-sm text-slate-400">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap justify-center gap-3"
      >
        {screen.sdg.map((sdg: string, i: number) => (
          <span key={i} className="px-4 py-2 rounded-full bg-green-500/20 text-green-400 font-medium text-sm">
            {sdg}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// Screen 5: Architecture
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ArchitectureScreen({ screen }: { screen: any }) {
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);
  
  return (
    <div className="grid lg:grid-cols-3 gap-4">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {screen.architecture.map((layer: any, i: number) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05 * i }}
          onMouseEnter={() => setHoveredLayer(i)}
          onMouseLeave={() => setHoveredLayer(null)}
          className={`glass-card p-4 flex items-center gap-4 cursor-pointer transition-all duration-300 ${
            hoveredLayer === i ? 'scale-105 border-cyan-glow/50' : ''
          }`}
        >
          <div className={`w-12 h-12 rounded-xl ${layer.color} flex items-center justify-center text-white flex-shrink-0`}>
            <layer.icon size={24} />
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-sm truncate">{layer.name}</h4>
            <p className="text-xs text-slate-400 truncate">{layer.desc}</p>
          </div>
          <span className="text-xs text-slate-500 ml-auto">{i + 1}</span>
        </motion.div>
      ))}
    </div>
  );
}

// Screen 6: Data Flow
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DataFlowScreen({ screen }: { screen: any }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 items-center">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {screen.dataFlow.map((step: any, i: number) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 * i }}
          className="flex items-center gap-4"
        >
          <div className="glass-card p-6 text-center min-w-[160px]">
            <div className="w-14 h-14 mx-auto rounded-xl bg-cyan-glow/10 flex items-center justify-center mb-3 text-cyan-glow">
              <step.icon size={28} />
            </div>
            <h4 className="font-bold mb-1">{step.step}</h4>
            <p className="text-xs text-slate-400">{step.desc}</p>
          </div>
          {i < screen.dataFlow.length - 1 && (
            <ArrowRight className="text-cyan-glow" size={24} />
          )}
        </motion.div>
      ))}
    </div>
  );
}

// Screen 7: Digital Twins
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TwinsScreen({ screen }: { screen: any }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {screen.twinTypes.map((twin: any, i: number) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, rotateY: -15 }}
          whileInView={{ opacity: 1, rotateY: 0 }}
          transition={{ delay: 0.15 * i }}
          className="glass-card p-6 relative overflow-hidden group hover:border-cyan-glow/50 transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-glow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <twin.icon className="text-cyan-glow mb-4" size={40} />
            <h4 className="font-bold mb-2">{twin.type}</h4>
            <p className="text-sm text-slate-400">{twin.examples}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Screen 8: Nexus
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function NexusScreen({ screen }: { screen: any }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {screen.nexusModules.map((module: any, i: number) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 * i }}
          className="glass-card p-6 hover:border-cyan-glow/50 transition-all"
        >
          <h4 className="font-bold text-lg mb-2 text-cyan-glow">{module.name}</h4>
          <p className="text-slate-400 mb-4">{module.desc}</p>
          <div className="flex gap-2">
            {module.fee && <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm">{module.fee}</span>}
            {module.apy && <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">{module.apy}</span>}
            {module.dao && <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm">{module.dao}</span>}
            {module.rewards && <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm">{module.rewards}</span>}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Screen 9: Tokenomics
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TokenomicsScreen({ screen }: { screen: any }) {
  return (
    <div className="space-y-12">
      {/* Phases */}
      <div className="grid md:grid-cols-4 gap-4">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {screen.phases.map((phase: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className={`glass-card p-6 relative ${
              phase.status === 'current' ? 'border-cyan-glow/50' : ''
            }`}
          >
            {phase.status === 'current' && (
              <span className="absolute -top-3 left-4 px-3 py-1 bg-cyan-glow text-ocean-deep text-xs font-bold rounded-full">
                CURRENT
              </span>
            )}
            <h5 className="text-cyan-glow font-bold mb-1">{phase.phase}</h5>
            <h4 className="font-bold mb-2">{phase.name}</h4>
            <p className="text-sm text-slate-400">{phase.desc}</p>
          </motion.div>
        ))}
      </div>
      
      {/* Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-6"
      >
        <h4 className="font-bold mb-6 text-center">Распределение токенов (1,000,000,000 VOD)</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {screen.tokenDistribution.map((item: any, i: number) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-black text-cyan-glow">{item.percent}%</div>
              <div className="text-sm text-slate-400">{item.name}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// Screen 10: DAO
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DAOScreen({ screen }: { screen: any }) {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {screen.daoFeatures.map((feature: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * i }}
            className="glass-card p-4 text-center"
          >
            <feature.icon className="mx-auto mb-2 text-cyan-glow" size={24} />
            <h5 className="font-bold text-sm mb-1">{feature.feature}</h5>
            <p className="text-xs text-slate-400">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card p-6"
      >
        <h4 className="font-bold mb-4 text-center">Участники DAO</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {screen.participants.map((p: any, i: number) => (
            <div key={i} className="text-center p-4 bg-white/5 rounded-xl">
              <div className="font-bold">{p.role}</div>
              <div className="text-xs text-cyan-glow">{p.weight}</div>
              <div className="text-xs text-slate-400">{p.focus}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// Screen 11: Cabinets
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CabinetsScreen({ screen }: { screen: any }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {screen.cabinets.slice(0, 4).map((cabinet: any, i: number) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * i }}
          className="glass-card p-5 hover:scale-105 transition-transform cursor-pointer"
        >
          <div className={`w-12 h-12 ${cabinet.color} rounded-xl flex items-center justify-center mb-4`}>
            <cabinet.icon size={24} className="text-white" />
          </div>
          <h4 className="font-bold mb-3">{cabinet.name}</h4>
          <ul className="space-y-1">
            {cabinet.features.map((f: string, j: number) => (
              <li key={j} className="text-xs text-slate-400 flex items-center gap-2">
                <CheckCircle2 size={12} className="text-cyan-glow" />
                {f}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
      <div className="lg:col-span-4 grid md:grid-cols-3 gap-4">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {screen.cabinets.slice(4).map((cabinet: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + 0.1 * i }}
            className="glass-card p-5 hover:scale-105 transition-transform cursor-pointer"
          >
            <div className={`w-12 h-12 ${cabinet.color} rounded-xl flex items-center justify-center mb-4`}>
              <cabinet.icon size={24} className="text-white" />
            </div>
            <h4 className="font-bold mb-3">{cabinet.name}</h4>
            <ul className="space-y-1">
              {cabinet.features.map((f: string, j: number) => (
                <li key={j} className="text-xs text-slate-400 flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-cyan-glow" />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Screen 12: TokenHub Projects
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TokenHubScreen({ screen }: { screen: any }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {screen.projects.map((project: any, i: number) => (
                    <motion.div
          key={i}
          initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * i }}
          className="glass-card p-5 hover:border-cyan-glow/50 transition-all cursor-pointer"
        >
          <div className="flex justify-between items-start mb-3">
            <h4 className="font-bold">{project.name}</h4>
            <span className={`px-2 py-1 rounded text-xs font-bold ${
              project.status === 'Active' ? 'bg-green-500/20 text-green-400' :
              project.status === 'Funding' ? 'bg-yellow-500/20 text-yellow-400' :
              project.status === 'Pilot' ? 'bg-blue-500/20 text-blue-400' :
              'bg-slate-500/20 text-slate-400'
            }`}>{project.status}</span>
          </div>
          <p className="text-sm text-slate-400 mb-3">{project.desc}</p>
          <div className="flex gap-3">
            <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">{project.type}</span>
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">IRR {project.irr}</span>
                        </div>
                    </motion.div>
      ))}
    </div>
  );
}

// Screen 13: International
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function InternationalScreen({ screen }: { screen: any }) {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-5 gap-4">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {screen.sdgAlignment.map((sdg: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="glass-card p-4 text-center"
          >
            <div className="text-2xl font-black text-green-400 mb-2">{sdg.sdg}</div>
            <h5 className="font-bold text-sm mb-2">{sdg.name}</h5>
            <p className="text-xs text-slate-400">{sdg.contribution}</p>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-wrap justify-center gap-4"
      >
        {screen.partners.map((partner: string, i: number) => (
          <span key={i} className="px-4 py-2 glass rounded-full text-sm font-medium">
            {partner}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// Screen 14: Roadmap
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function RoadmapScreen({ screen }: { screen: any }) {
  return (
    <div className="relative">
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-glow/50 via-cyan-glow to-cyan-glow/50 hidden lg:block" />
      
      <div className="space-y-8">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {screen.roadmap.map((item: any, i: number) => (
                        <motion.div
                            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 * i }}
            className={`flex items-center gap-8 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
          >
            <div className={`flex-1 glass-card p-6 ${
              item.status === 'done' ? 'border-green-500/50' :
              item.status === 'current' ? 'border-cyan-glow/50' : ''
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl font-black text-cyan-glow">{item.year}</span>
                <span className="text-slate-400">{item.quarter}</span>
                {item.status === 'done' && <CheckCircle2 className="text-green-500" size={20} />}
                {item.status === 'current' && <Activity className="text-cyan-glow animate-pulse" size={20} />}
              </div>
              <h4 className="font-bold mb-3">{item.title}</h4>
              <ul className="space-y-1">
                {item.items.map((it: string, j: number) => (
                  <li key={j} className="text-sm text-slate-400 flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      item.status === 'done' ? 'bg-green-500' : 'bg-slate-500'
                    }`} />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="hidden lg:block w-4 h-4 rounded-full bg-cyan-glow" />
            
            <div className="flex-1 hidden lg:block" />
          </motion.div>
                    ))}
                </div>
    </div>
  );
}

// Screen 15: CTA
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CTAScreen({ screen }: { screen: any }) {
  return (
    <div className="space-y-12">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {screen.investmentTiers.map((tier: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="glass-card p-6 text-center hover:scale-105 transition-transform cursor-pointer hover:border-cyan-glow/50"
          >
            <h4 className="font-bold text-lg mb-1">{tier.tier}</h4>
            <div className="text-cyan-glow font-bold mb-4">{tier.amount}</div>
            <ul className="space-y-2 text-sm text-slate-400">
              {tier.benefits.map((b: string, j: number) => (
                <li key={j} className="flex items-center gap-2 justify-center">
                  <CheckCircle2 size={14} className="text-green-500" />
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
            </div>

                <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center space-y-6"
      >
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/dashboard" className="px-10 py-5 bg-gradient-to-r from-cyan-glow to-blue-500 text-white font-bold rounded-2xl hover:scale-105 transition-transform flex items-center gap-3 shadow-[0_0_40px_rgba(34,211,238,0.4)]">
            <Play size={20} /> Explore the Platform
          </Link>
          <Link href="/whitepaper" className="px-10 py-5 glass text-white font-bold rounded-2xl hover:bg-white/10 transition-colors flex items-center gap-3">
            <FileText size={20} /> Read White Paper
          </Link>
        </div>
        
        <div className="flex justify-center gap-8 text-slate-400">
          <a href={`https://${screen.contacts.website}`} className="hover:text-cyan-glow transition-colors">
            🌐 {screen.contacts.website}
          </a>
          <a href={`mailto:${screen.contacts.email}`} className="hover:text-cyan-glow transition-colors">
            ✉️ {screen.contacts.email}
          </a>
          <span className="hover:text-cyan-glow transition-colors cursor-pointer">
            📱 {screen.contacts.social}
          </span>
        </div>
                </motion.div>
            </div>
    );
}
