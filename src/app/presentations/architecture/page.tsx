"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Layers, Database, Network, Shield, Cpu, Globe, Smartphone,
  Building2, Users, Droplets, Coins, Vote, Lock, GraduationCap,
  Gamepad2, CheckCircle2, Clock, DollarSign, Calendar, ArrowRight,
  Zap, Target, Activity, TrendingUp, MapPin, Leaf, Heart, Beaker,
  Settings, BarChart3, Wallet, FileText, Rocket, Code, Server,
  Cloud, GitBranch, Package, Monitor, Smartphone as PhoneIcon
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface RoadmapStage {
  id: string;
  phase: string;
  title: string;
  period: string;
  cost: number;
  status: "completed" | "in-progress" | "planned";
  milestones: string[];
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
}

const roadmapStages: RoadmapStage[] = [
  {
    id: "phase1",
    phase: "Фаза 1",
    title: "MVP и базовая инфраструктура",
    period: "Q3 2023 - Q2 2024",
    cost: 120000,
    status: "completed",
    milestones: [
      "Разработка Next.js приложения",
      "12-уровневая архитектура",
      "Базовая блокчейн интеграция",
      "7 специализированных кабинетов",
      "UI/UX дизайн-система"
    ],
    icon: Rocket,
    color: "cyan"
  },
  {
    id: "phase2",
    phase: "Фаза 2",
    title: "Расширение функционала",
    period: "Q3 2024 - Q1 2025",
    cost: 250000,
    status: "in-progress",
    milestones: [
      "DAO Governance система",
      "Токеномика и стейкинг",
      "Интеграция IoT датчиков",
      "Цифровые двойники",
      "Мобильное приложение"
    ],
    icon: Zap,
    color: "blue"
  },
  {
    id: "phase3",
    phase: "Фаза 3",
    title: "Масштабирование и оптимизация",
    period: "Q2 2025 - Q4 2025",
    cost: 500000,
    status: "planned",
    milestones: [
      "Масштабирование блокчейна",
      "AI/ML интеграция",
      "Международная экспансия",
      "Партнерства с правительствами",
      "Экосистема разработчиков"
    ],
    icon: TrendingUp,
    color: "purple"
  },
  {
    id: "phase4",
    phase: "Фаза 4",
    title: "Глобальная платформа",
    period: "Q1 2026 - Q4 2026",
    cost: 1000000,
    status: "planned",
    milestones: [
      "Планетарное управление (PEGP)",
      "Межпротокольная коммуникация",
      "Суперинтеллект для управления",
      "Глобальная сеть датчиков",
      "Международные стандарты"
    ],
    icon: Globe,
    color: "emerald"
  },
  {
    id: "phase5",
    phase: "Фаза 5",
    title: "Устойчивое развитие",
    period: "2027+",
    cost: 2000000,
    status: "planned",
    milestones: [
      "Автономная экосистема",
      "Самофинансирование",
      "Глобальное влияние",
      "Цивилизационный протокол",
      "Устойчивое будущее"
    ],
    icon: Target,
    color: "yellow"
  }
];

export default function ArchitecturePresentationPage() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const totalCost = roadmapStages.reduce((sum, stage) => sum + stage.cost, 0);
  const completedCost = roadmapStages
    .filter(s => s.status === "completed")
    .reduce((sum, s) => sum + s.cost, 0);
  const inProgressCost = roadmapStages
    .filter(s => s.status === "in-progress")
    .reduce((sum, s) => sum + s.cost, 0);

  return (
    <div className="min-h-screen bg-ocean-deep relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-cyan-glow/3 rounded-full blur-[200px]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 flex">
        {/* Main Content - Left Side */}
        <div ref={containerRef} className="flex-1 overflow-y-auto" style={{ maxHeight: '100vh' }}>
          <div className="max-w-5xl mx-auto px-6 py-20 space-y-32">
            {/* Hero Section */}
            <section className="text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-white via-cyan-200 to-cyan-glow bg-clip-text text-transparent">
                  Архитектура платформы
                </h1>
                <p className="text-2xl text-slate-400 max-w-3xl mx-auto">
                  Подробное описание архитектуры, приложения и экосистемы CivilizationProtocol
                </p>
              </motion.div>
            </section>

            {/* Architecture Overview */}
            <ArchitectureSection />

            {/* Application Description */}
            <ApplicationSection />

            {/* Ecosystem Description */}
            <EcosystemSection />

            {/* Technology Stack */}
            <TechnologyStackSection />

            {/* Integration Points */}
            <IntegrationSection />

            {/* CTA Section */}
            <section className="text-center space-y-6 py-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-4xl font-black text-cyan-glow">Готовы начать?</h2>
                <p className="text-xl text-slate-400">Присоединяйтесь к революции в управлении водными ресурсами</p>
                <div className="flex gap-4 justify-center">
                  <Link
                    href="/dashboard"
                    className="px-8 py-4 bg-cyan-glow text-ocean-deep font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_30px_rgba(34,211,238,0.3)]"
                  >
                    Начать работу <ArrowRight size={20} />
                  </Link>
                  <Link
                    href="/whitepaper"
                    className="px-8 py-4 glass text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
                  >
                    White Paper
                  </Link>
                </div>
              </motion.div>
            </section>
          </div>
        </div>

        {/* Roadmap Sidebar - Right Side */}
        <RoadmapSidebar
          stages={roadmapStages}
          totalCost={totalCost}
          completedCost={completedCost}
          inProgressCost={inProgressCost}
          scrollProgress={scrollYProgress}
        />
      </div>
    </div>
  );
}

// Architecture Section
function ArchitectureSection() {
  const layers = [
    {
      name: "Презентационный слой",
      desc: "Web и мобильные интерфейсы, визуализация данных",
      icon: Monitor,
      color: "bg-blue-500",
      components: ["Next.js 16", "React", "TypeScript", "Tailwind CSS", "Framer Motion"]
    },
    {
      name: "API Gateway",
      desc: "RESTful API, GraphQL, WebSocket для real-time данных",
      icon: Server,
      color: "bg-cyan-500",
      components: ["Next.js API Routes", "REST API", "WebSocket", "GraphQL"]
    },
    {
      name: "Бизнес-логика",
      desc: "Обработка данных, валидация, бизнес-правила",
      icon: Code,
      color: "bg-purple-500",
      components: ["TypeScript Services", "Validation", "Business Rules", "Workflows"]
    },
    {
      name: "База данных",
      desc: "PostgreSQL с Prisma ORM, геопространственные данные",
      icon: Database,
      color: "bg-green-500",
      components: ["PostgreSQL", "Prisma ORM", "PostGIS", "Redis Cache"]
    },
    {
      name: "Блокчейн слой",
      desc: "VOD Chain, смарт-контракты, Web3 интеграция",
      icon: Network,
      color: "bg-yellow-500",
      components: ["Ethereum L2", "Solidity", "Web3.js", "IPFS"]
    },
    {
      name: "IoT и датчики",
      desc: "Интеграция с IoT устройствами, сбор данных в реальном времени",
      icon: Activity,
      color: "bg-orange-500",
      components: ["MQTT", "IoT Protocols", "Sensor Networks", "Data Streaming"]
    },
    {
      name: "AI/ML слой",
      desc: "Машинное обучение, прогнозирование, аналитика",
      icon: Cpu,
      color: "bg-pink-500",
      components: ["TensorFlow", "ML Models", "Predictive Analytics", "AI Services"]
    },
    {
      name: "Безопасность",
      desc: "Аутентификация, авторизация, шифрование",
      icon: Shield,
      color: "bg-red-500",
      components: ["JWT", "OAuth2", "Encryption", "Security Policies"]
    },
    {
      name: "Цифровые двойники",
      desc: "Виртуальные модели водных объектов и инфраструктуры",
      icon: Layers,
      color: "bg-indigo-500",
      components: ["Digital Twins", "3D Models", "Simulation", "Visualization"]
    },
    {
      name: "DAO Governance",
      desc: "Децентрализованное управление, голосование, предложения",
      icon: Vote,
      color: "bg-teal-500",
      components: ["DAO Contracts", "Voting System", "Proposals", "Governance"]
    },
    {
      name: "Токеномика",
      desc: "VOD токены, стейкинг, награды, экономика платформы",
      icon: Coins,
      color: "bg-amber-500",
      components: ["Token Contracts", "Staking", "Rewards", "Economics"]
    },
    {
      name: "Интеграции",
      desc: "Внешние API, партнерские системы, экспорт данных",
      icon: GitBranch,
      color: "bg-rose-500",
      components: ["External APIs", "Partner Systems", "Data Export", "Webhooks"]
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div className="text-center mb-12">
        <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          12-уровневая архитектура
        </h2>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          Многослойная архитектура платформы обеспечивает масштабируемость, безопасность и гибкость
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {layers.map((layer, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 hover:border-cyan-glow/50 transition-all group"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-12 h-12 ${layer.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <layer.icon size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">{layer.name}</h3>
                <p className="text-sm text-slate-400">{layer.desc}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {layer.components.map((comp, j) => (
                <span key={j} className="text-xs px-2 py-1 bg-white/5 rounded text-slate-400">
                  {comp}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// Application Section
function ApplicationSection() {
  const features = [
    {
      title: "7 Специализированных кабинетов",
      desc: "Уникальные интерфейсы для разных типов пользователей",
      items: [
        "Кабинет пользователя - личный профиль и активность",
        "Кабинет правительства - управление ресурсами",
        "Кабинет инвестора - инвестиционные возможности",
        "Кабинет корпорации - корпоративное управление",
        "Кабинет ученого - исследовательские инструменты",
        "Кабинет администратора - системное управление",
        "Кабинет безопасности - защита данных"
      ],
      icon: Building2,
      color: "cyan"
    },
    {
      title: "Социальная сеть",
      desc: "Встроенная социальная платформа для взаимодействия",
      items: [
        "Лента новостей и постов",
        "Система сообщений",
        "Группы и сообщества",
        "Друзья и подписки",
        "Реакции и комментарии",
        "Медиа-контент"
      ],
      icon: Users,
      color: "blue"
    },
    {
      title: "DAO Governance",
      desc: "Децентрализованное управление платформой",
      items: [
        "Создание и голосование по предложениям",
        "Делегирование голосов",
        "Управление бюджетом",
        "Избрание представителей",
        "Прозрачное голосование",
        "История решений"
      ],
      icon: Vote,
      color: "purple"
    },
    {
      title: "Токеномика",
      desc: "Экономическая система платформы",
      items: [
        "VOD токены - нативная валюта",
        "Стейкинг и получение наград",
        "Токен-хаб для проектов",
        "Транзакции и переводы",
        "Инвестиционные возможности",
        "Эмиссия и распределение"
      ],
      icon: Coins,
      color: "yellow"
    },
    {
      title: "Карта и визуализация",
      desc: "Интерактивная карта водных ресурсов",
      items: [
        "3D глобус с точками данных",
        "Геопространственная визуализация",
        "Слои карты и фильтры",
        "Детальная информация об объектах",
        "Исторические данные",
        "Прогнозы и аналитика"
      ],
      icon: MapPin,
      color: "green"
    },
    {
      title: "Образование и геймификация",
      desc: "Обучение и вовлечение через игры",
      items: [
        "Интерактивные презентации",
        "Обучающие игры",
        "Квесты и миссии",
        "Достижения и награды",
        "Рейтинги и лидеры",
        "Образовательный контент"
      ],
      icon: GraduationCap,
      color: "indigo"
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div className="text-center mb-12">
        <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Описание приложения
        </h2>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          Многофункциональная платформа для управления водными ресурсами с социальными, экономическими и образовательными возможностями
        </p>
      </div>

      <div className="space-y-8">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-8"
          >
            <div className="flex items-start gap-6 mb-6">
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0",
                feature.color === "cyan" && "bg-cyan-500/20",
                feature.color === "blue" && "bg-blue-500/20",
                feature.color === "purple" && "bg-purple-500/20",
                feature.color === "yellow" && "bg-yellow-500/20",
                feature.color === "green" && "bg-green-500/20",
                feature.color === "indigo" && "bg-indigo-500/20"
              )}>
                <feature.icon size={32} className={cn(
                  feature.color === "cyan" && "text-cyan-400",
                  feature.color === "blue" && "text-blue-400",
                  feature.color === "purple" && "text-purple-400",
                  feature.color === "yellow" && "text-yellow-400",
                  feature.color === "green" && "text-green-400",
                  feature.color === "indigo" && "text-indigo-400"
                )} />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                <p className="text-slate-400 mb-4">{feature.desc}</p>
                <ul className="space-y-2">
                  {feature.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 size={16} className={cn(
                        "flex-shrink-0",
                        feature.color === "cyan" && "text-cyan-400",
                        feature.color === "blue" && "text-blue-400",
                        feature.color === "purple" && "text-purple-400",
                        feature.color === "yellow" && "text-yellow-400",
                        feature.color === "green" && "text-green-400",
                        feature.color === "indigo" && "text-indigo-400"
                      )} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// Ecosystem Section
function EcosystemSection() {
  const ecosystemComponents = [
    {
      name: "Водные объекты",
      desc: "Регистрация и управление реками, озерами, водохранилищами",
      icon: Droplets,
      color: "cyan"
    },
    {
      name: "Инфраструктура",
      desc: "Водоочистные сооружения, насосные станции, трубопроводы",
      icon: Building2,
      color: "blue"
    },
    {
      name: "Датчики и IoT",
      desc: "Сеть датчиков для мониторинга качества и количества воды",
      icon: Activity,
      color: "green"
    },
    {
      name: "Цифровые двойники",
      desc: "Виртуальные модели реальных водных объектов",
      icon: Layers,
      color: "purple"
    },
    {
      name: "Пользователи",
      desc: "Правительства, корпорации, инвесторы, ученые, граждане",
      icon: Users,
      color: "yellow"
    },
    {
      name: "Проекты",
      desc: "Инвестиционные проекты в области водных ресурсов",
      icon: Target,
      color: "orange"
    },
    {
      name: "Партнерства",
      desc: "Международные организации, правительства, НПО",
      icon: Globe,
      color: "indigo"
    },
    {
      name: "Исследования",
      desc: "Научные исследования и разработки",
      icon: Beaker,
      color: "pink"
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div className="text-center mb-12">
        <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Экосистема платформы
        </h2>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          Комплексная экосистема, объединяющая технологии, людей и ресурсы для устойчивого управления водой
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ecosystemComponents.map((component, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 text-center hover:border-cyan-glow/50 transition-all group"
          >
            <div className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors",
              component.color === "cyan" && "bg-cyan-500/20 group-hover:bg-cyan-500/30",
              component.color === "blue" && "bg-blue-500/20 group-hover:bg-blue-500/30",
              component.color === "green" && "bg-green-500/20 group-hover:bg-green-500/30",
              component.color === "purple" && "bg-purple-500/20 group-hover:bg-purple-500/30",
              component.color === "yellow" && "bg-yellow-500/20 group-hover:bg-yellow-500/30",
              component.color === "orange" && "bg-orange-500/20 group-hover:bg-orange-500/30",
              component.color === "indigo" && "bg-indigo-500/20 group-hover:bg-indigo-500/30",
              component.color === "pink" && "bg-pink-500/20 group-hover:bg-pink-500/30"
            )}>
              <component.icon size={32} className={cn(
                component.color === "cyan" && "text-cyan-400",
                component.color === "blue" && "text-blue-400",
                component.color === "green" && "text-green-400",
                component.color === "purple" && "text-purple-400",
                component.color === "yellow" && "text-yellow-400",
                component.color === "orange" && "text-orange-400",
                component.color === "indigo" && "text-indigo-400",
                component.color === "pink" && "text-pink-400"
              )} />
            </div>
            <h3 className="font-bold text-lg mb-2">{component.name}</h3>
            <p className="text-sm text-slate-400">{component.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// Technology Stack Section
function TechnologyStackSection() {
  const stacks = [
    {
      category: "Frontend",
      technologies: ["Next.js 16", "React 18", "TypeScript", "Tailwind CSS", "Framer Motion", "Zustand"]
    },
    {
      category: "Backend",
      technologies: ["Next.js API Routes", "Prisma ORM", "PostgreSQL", "Redis", "Node.js"]
    },
    {
      category: "Blockchain",
      technologies: ["Ethereum L2", "Solidity", "Web3.js", "IPFS", "Hardhat"]
    },
    {
      category: "DevOps",
      technologies: ["Vercel", "Docker", "GitHub Actions", "CI/CD", "Monitoring"]
    },
    {
      category: "AI/ML",
      technologies: ["TensorFlow", "Python", "ML Models", "Predictive Analytics"]
    },
    {
      category: "IoT",
      technologies: ["MQTT", "IoT Protocols", "Sensor Networks", "Data Streaming"]
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div className="text-center mb-12">
        <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Технологический стек
        </h2>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          Современные технологии для построения масштабируемой и надежной платформы
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stacks.map((stack, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6"
          >
            <h3 className="font-bold text-xl mb-4 text-cyan-glow">{stack.category}</h3>
            <div className="flex flex-wrap gap-2">
              {stack.technologies.map((tech, j) => (
                <span key={j} className="px-3 py-1 bg-white/5 rounded-lg text-sm text-slate-300">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// Integration Section
function IntegrationSection() {
  const integrations = [
    {
      name: "Правительственные системы",
      desc: "Интеграция с государственными системами управления водными ресурсами",
      icon: Building2
    },
    {
      name: "Международные организации",
      desc: "Партнерства с UN-Water, World Bank, Green Climate Fund",
      icon: Globe
    },
    {
      name: "Научные институты",
      desc: "Интеграция с исследовательскими центрами и университетами",
      icon: Beaker
    },
    {
      name: "IoT платформы",
      desc: "Подключение к различным IoT платформам и датчикам",
      icon: Activity
    },
    {
      name: "Блокчейн сети",
      desc: "Интеграция с другими блокчейн сетями и протоколами",
      icon: Network
    },
    {
      name: "Финансовые системы",
      desc: "Интеграция с платежными системами и банками",
      icon: Wallet
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div className="text-center mb-12">
        <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Точки интеграции
        </h2>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          Платформа интегрируется с различными системами и сервисами для расширения функциональности
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 hover:border-cyan-glow/50 transition-all"
          >
            <integration.icon className="text-cyan-glow mb-4" size={32} />
            <h3 className="font-bold text-lg mb-2">{integration.name}</h3>
            <p className="text-sm text-slate-400">{integration.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// Roadmap Sidebar Component
interface RoadmapSidebarProps {
  stages: RoadmapStage[];
  totalCost: number;
  completedCost: number;
  inProgressCost: number;
  scrollProgress: any;
}

function RoadmapSidebar({ stages, totalCost, completedCost, inProgressCost, scrollProgress }: RoadmapSidebarProps) {
  const [expandedStage, setExpandedStage] = useState<string | null>(null);

  const progressBarHeight = useTransform(scrollProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="w-96 bg-black/40 backdrop-blur-xl border-l border-white/10 fixed right-0 top-0 bottom-0 overflow-y-auto">
      <div className="sticky top-0 bg-black/60 backdrop-blur-xl border-b border-white/10 z-10 p-6">
        <h2 className="text-2xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Дорожная карта
        </h2>
        
        {/* Progress Bar */}
        <div className="relative h-2 bg-white/10 rounded-full mb-4 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-glow to-blue-500"
            style={{ height: progressBarHeight }}
          />
        </div>

        {/* Cost Summary */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">Общая стоимость:</span>
            <span className="font-bold text-cyan-glow">${(totalCost / 1000).toFixed(0)}K</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Завершено:</span>
            <span className="font-bold text-green-400">${(completedCost / 1000).toFixed(0)}K</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">В процессе:</span>
            <span className="font-bold text-yellow-400">${(inProgressCost / 1000).toFixed(0)}K</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {stages.map((stage, i) => (
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "glass-card p-5 cursor-pointer transition-all",
              expandedStage === stage.id && "border-cyan-glow/50",
              stage.status === "completed" && "border-green-500/30",
              stage.status === "in-progress" && "border-yellow-500/30"
            )}
            onClick={() => setExpandedStage(expandedStage === stage.id ? null : stage.id)}
          >
            {/* Stage Header */}
            <div className="flex items-start gap-4 mb-3">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                stage.color === "cyan" && "bg-cyan-500/20",
                stage.color === "blue" && "bg-blue-500/20",
                stage.color === "purple" && "bg-purple-500/20",
                stage.color === "emerald" && "bg-emerald-500/20",
                stage.color === "yellow" && "bg-yellow-500/20"
              )}>
                <stage.icon size={24} className={cn(
                  stage.color === "cyan" && "text-cyan-400",
                  stage.color === "blue" && "text-blue-400",
                  stage.color === "purple" && "text-purple-400",
                  stage.color === "emerald" && "text-emerald-400",
                  stage.color === "yellow" && "text-yellow-400"
                )} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-slate-400">{stage.phase}</span>
                  {stage.status === "completed" && (
                    <CheckCircle2 size={14} className="text-green-400" />
                  )}
                  {stage.status === "in-progress" && (
                    <Activity size={14} className="text-yellow-400 animate-pulse" />
                  )}
                  {stage.status === "planned" && (
                    <Clock size={14} className="text-slate-400" />
                  )}
                </div>
                <h3 className="font-bold text-lg mb-1">{stage.title}</h3>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    <span>{stage.period}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign size={12} />
                    <span>${(stage.cost / 1000).toFixed(0)}K</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Expanded Milestones */}
            {expandedStage === stage.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-white/10"
              >
                <h4 className="font-bold text-sm mb-3 text-cyan-glow">Основные этапы:</h4>
                <ul className="space-y-2">
                  {stage.milestones.map((milestone, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle2 size={14} className={cn(
                        "mt-0.5 flex-shrink-0",
                        stage.color === "cyan" && "text-cyan-400",
                        stage.color === "blue" && "text-blue-400",
                        stage.color === "purple" && "text-purple-400",
                        stage.color === "emerald" && "text-emerald-400",
                        stage.color === "yellow" && "text-yellow-400"
                      )} />
                      <span>{milestone}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

