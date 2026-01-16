"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Layers, Database, Network, Shield, Cpu, Globe, Smartphone,
  Building2, Users, Droplets, Coins, Vote, Lock, GraduationCap,
  Gamepad2, CheckCircle2, ArrowRight, Zap, Target, Activity,
  TrendingUp, MapPin, Leaf, Heart, Beaker, Settings, BarChart3,
  Wallet, FileText, Rocket, Code, Server, Monitor, Factory,
  Waves, FlaskConical, Package, Box, Satellite, Radio, Info
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import InfoPopup from "@/components/InfoPopup";
import dynamic from "next/dynamic";

// Динамический импорт Globe3D
const Globe3D = dynamic(() => import("@/components/Globe3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
    </div>
  ),
});

interface BlockData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  bgGradient: string;
  details: {
    overview: string;
    features: string[];
    technologies: string[];
    useCases: string[];
    metrics?: { label: string; value: string }[];
  };
  visualization?: "globe" | "layers" | "network" | "chart" | "diagram";
}

export default function ArchitecturePresentationPage() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeBlock, setActiveBlock] = useState<string | null>(null);

  const blocks: BlockData[] = [
    {
      id: "architecture",
      title: "12-уровневая архитектура",
      subtitle: "Многослойная система платформы",
      description: "Комплексная архитектура, обеспечивающая масштабируемость, безопасность и гибкость",
      icon: Layers,
      color: "cyan",
      bgGradient: "from-cyan-500/20 via-blue-500/20 to-purple-500/20",
      visualization: "layers",
      details: {
        overview: "Архитектура CivilizationProtocol построена на 12 взаимосвязанных уровнях, каждый из которых отвечает за определенный аспект функциональности платформы. Это обеспечивает модульность, масштабируемость и возможность независимого развития каждого компонента.",
        features: [
          "Модульная структура для легкого масштабирования",
          "Разделение ответственности между слоями",
          "API-first подход для интеграций",
          "Микросервисная архитектура",
          "Горизонтальное масштабирование",
          "Отказоустойчивость и резервирование"
        ],
        technologies: [
          "Next.js 16 (App Router)",
          "React 19 с TypeScript",
          "Prisma ORM",
          "PostgreSQL с PostGIS",
          "Redis для кеширования",
          "Ethereum L2 для блокчейна",
          "IPFS для децентрализованного хранения",
          "MQTT для IoT устройств"
        ],
        useCases: [
          "Обработка миллионов транзакций в день",
          "Подключение тысяч IoT датчиков",
          "Хранение и анализ больших данных",
          "Реальное время мониторинга",
          "Международные интеграции"
        ],
        metrics: [
          { label: "Уровней архитектуры", value: "12" },
          { label: "API endpoints", value: "50+" },
          { label: "Модулей", value: "25+" },
          { label: "Время отклика", value: "<200ms" }
        ]
      }
    },
    {
      id: "application",
      title: "Приложение платформы",
      subtitle: "Многофункциональная веб-платформа",
      description: "Полнофункциональное приложение с 7 специализированными кабинетами, социальной сетью, DAO и токеномикой",
      icon: Smartphone,
      color: "blue",
      bgGradient: "from-blue-500/20 via-indigo-500/20 to-purple-500/20",
      visualization: "network",
      details: {
        overview: "CivilizationProtocol App - это комплексная веб-платформа, объединяющая управление водными ресурсами, социальное взаимодействие, децентрализованное управление и экономические механизмы. Платформа предоставляет уникальные интерфейсы для разных типов пользователей через систему кабинетов.",
        features: [
          "7 специализированных кабинетов (Пользователь, Правительство, Инвестор, Корпорация, Ученый, Администратор, Безопасность)",
          "Встроенная социальная сеть с лентой, сообщениями, группами",
          "DAO Governance система с голосованием и предложениями",
          "Токеномика с VOD токенами, стейкингом и наградами",
          "Интерактивная карта с 3D визуализацией",
          "Образовательные игры и квесты",
          "Мобильная адаптация для всех устройств"
        ],
        technologies: [
          "Next.js 16 с App Router",
          "React 19 и TypeScript",
          "Tailwind CSS 4",
          "Framer Motion для анимаций",
          "Three.js для 3D визуализации",
          "WebSocket для real-time",
          "PWA поддержка"
        ],
        useCases: [
          "Управление водными ресурсами правительствами",
          "Инвестирование в водные проекты",
          "Научные исследования и анализ данных",
          "Социальное взаимодействие пользователей",
          "Образование и геймификация"
        ],
        metrics: [
          { label: "Кабинетов", value: "7" },
          { label: "Страниц", value: "50+" },
          { label: "Компонентов", value: "100+" },
          { label: "Поддерживаемых языков", value: "7" }
        ]
      }
    },
    {
      id: "ecosystem",
      title: "Экосистема платформы",
      subtitle: "Комплексная экосистема взаимодействия",
      description: "Объединение технологий, людей и ресурсов для устойчивого управления водными ресурсами",
      icon: Globe,
      color: "green",
      bgGradient: "from-green-500/20 via-emerald-500/20 to-teal-500/20",
      visualization: "globe",
      details: {
        overview: "Экосистема CivilizationProtocol объединяет различные компоненты: водные объекты, инфраструктуру, IoT датчики, пользователей разных типов, проекты, партнерства и исследования. Все компоненты взаимодействуют через единую платформу, создавая синергетический эффект.",
        features: [
          "Интеграция водных объектов и инфраструктуры",
          "Сеть IoT датчиков для мониторинга",
          "Цифровые двойники реальных объектов",
          "Многоуровневая система пользователей",
          "Инвестиционные проекты и финансирование",
          "Международные партнерства",
          "Научные исследования и разработки"
        ],
        technologies: [
          "Геопространственная база данных (PostGIS)",
          "IoT протоколы (MQTT, CoAP)",
          "3D моделирование (Three.js)",
          "Blockchain для прозрачности",
          "AI/ML для анализа",
          "API интеграции"
        ],
        useCases: [
          "Мониторинг водных ресурсов в реальном времени",
          "Управление инфраструктурой",
          "Инвестирование в проекты",
          "Научные исследования",
          "Международное сотрудничество"
        ],
        metrics: [
          { label: "Водных объектов", value: "500+" },
          { label: "IoT датчиков", value: "1000+" },
          { label: "Пользователей", value: "10K+" },
          { label: "Проектов", value: "50+" }
        ]
      }
    },
    {
      id: "objects",
      title: "Объекты платформы",
      subtitle: "Водные и инфраструктурные объекты",
      description: "Регистрация, управление и мониторинг всех типов объектов водной инфраструктуры",
      icon: Droplets,
      color: "cyan",
      bgGradient: "from-cyan-500/20 via-blue-500/20 to-teal-500/20",
      visualization: "diagram",
      details: {
        overview: "Платформа управляет различными типами объектов: водными объектами (реки, озера, водохранилища), инфраструктурными объектами (насосные станции, очистные сооружения, трубопроводы) и цифровыми объектами (NFT, токены, смарт-контракты). Каждый объект имеет цифрового двойника и может быть токенизирован.",
        features: [
          "Реестр водных объектов с геоданными",
          "Инфраструктурные объекты (насосные станции, очистные)",
          "Цифровые двойники для моделирования",
          "NFT представление активов",
          "Токенизация водных прав",
          "Мониторинг состояния в реальном времени",
          "Исторические данные и аналитика"
        ],
        technologies: [
          "PostGIS для геоданных",
          "IoT интеграция",
          "3D моделирование",
          "Blockchain для NFT",
          "Смарт-контракты",
          "Time-series базы данных"
        ],
        useCases: [
          "Регистрация новых водных объектов",
          "Мониторинг состояния инфраструктуры",
          "Токенизация прав на воду",
          "Торговля NFT активами",
          "Прогнозирование и планирование"
        ],
        metrics: [
          { label: "Водных объектов", value: "500+" },
          { label: "Инфраструктурных объектов", value: "200+" },
          { label: "NFT активов", value: "1000+" },
          { label: "Датчиков на объектах", value: "2000+" }
        ]
      }
    },
    {
      id: "subjects",
      title: "Субъекты платформы",
      subtitle: "Участники экосистемы",
      description: "Различные типы пользователей и их роли в управлении водными ресурсами",
      icon: Users,
      color: "purple",
      bgGradient: "from-purple-500/20 via-pink-500/20 to-rose-500/20",
      visualization: "network",
      details: {
        overview: "Платформа объединяет различные типы субъектов: правительства, корпорации, инвесторов, ученых, операторов инфраструктуры и граждан. Каждый субъект имеет свои права, обязанности и возможности в рамках экосистемы. Система ролей определяет доступ к функциям и уровень влияния на принятие решений.",
        features: [
          "7 типов ролей пользователей",
          "Система верификации и репутации",
          "Специализированные кабинеты для каждой роли",
          "Уровни доступа и разрешения",
          "Социальное взаимодействие",
          "Участие в DAO Governance",
          "Инвестиционные возможности"
        ],
        technologies: [
          "JWT аутентификация",
          "Role-Based Access Control (RBAC)",
          "Репутационная система",
          "Социальный граф",
          "DAO контракты",
          "Wallet интеграция"
        ],
        useCases: [
          "Управление ресурсами правительствами",
          "Инвестирование корпорациями",
          "Научные исследования учеными",
          "Оперативное управление операторами",
          "Участие граждан в управлении"
        ],
        metrics: [
          { label: "Типов ролей", value: "7" },
          { label: "Активных пользователей", value: "10K+" },
          { label: "Верифицированных", value: "2K+" },
          { label: "DAO участников", value: "5K+" }
        ]
      }
    },
    {
      id: "products",
      title: "Продукты экосистемы",
      subtitle: "Основные продукты платформы",
      description: "Ключевые продукты и сервисы, предоставляемые платформой",
      icon: Package,
      color: "yellow",
      bgGradient: "from-yellow-500/20 via-amber-500/20 to-orange-500/20",
      visualization: "chart",
      details: {
        overview: "CivilizationProtocol предлагает комплексный набор продуктов: основную платформу, мобильное приложение, DAO систему, Water Bank, Investment Hub, систему мониторинга и исследовательские инструменты. Каждый продукт решает специфические задачи в области управления водными ресурсами.",
        features: [
          "VODeco Platform - основная веб-платформа",
          "VODeco App - мобильное приложение",
          "VODeco DAO - децентрализованное управление",
          "VOD Water Bank - банк водных ресурсов",
          "VOD Investment Hub - инвестиционная платформа",
          "VOD Monitoring System - система мониторинга",
          "VOD Research & Analytics - исследовательские инструменты"
        ],
        technologies: [
          "Next.js для веб-платформы",
          "React Native для мобильного приложения",
          "Blockchain для DAO",
          "IoT для мониторинга",
          "AI/ML для аналитики",
          "3D визуализация"
        ],
        useCases: [
          "Управление водными ресурсами",
          "Инвестирование в проекты",
          "Мониторинг качества воды",
          "Научные исследования",
          "Образование и обучение"
        ],
        metrics: [
          { label: "Продуктов", value: "7" },
          { label: "Активных пользователей", value: "10K+" },
          { label: "Обработанных транзакций", value: "1M+" },
          { label: "Собранных данных", value: "10TB+" }
        ]
      }
    },
    {
      id: "projects",
      title: "Проекты экосистемы",
      subtitle: "Инвестиционные и инфраструктурные проекты",
      description: "Активные и планируемые проекты в области водных ресурсов",
      icon: Target,
      color: "orange",
      bgGradient: "from-orange-500/20 via-red-500/20 to-rose-500/20",
      visualization: "chart",
      details: {
        overview: "Платформа поддерживает различные типы проектов: инфраструктурные (строительство очистных сооружений, насосных станций), экологические (восстановление водных объектов), исследовательские (научные программы) и инвестиционные (коммерческие проекты). Каждый проект проходит через этапы анализа, финансирования, реализации и мониторинга.",
        features: [
          "Реестр инвестиционных проектов",
          "Финансирование через TokenHub",
          "DAO голосование по проектам",
          "Мониторинг реализации",
          "Расчет IRR и ROI",
          "Прозрачная отчетность",
          "Интеграция с цифровыми двойниками"
        ],
        technologies: [
          "Blockchain для финансирования",
          "Smart contracts для автоматизации",
          "IoT для мониторинга",
          "AI для прогнозирования",
          "3D моделирование",
          "Финансовые модели"
        ],
        useCases: [
          "Финансирование инфраструктурных проектов",
          "Экологические инициативы",
          "Научные исследования",
          "Коммерческие проекты",
          "Международное сотрудничество"
        ],
        metrics: [
          { label: "Активных проектов", value: "50+" },
          { label: "Привлечено инвестиций", value: "$50M+" },
          { label: "Завершенных проектов", value: "20+" },
          { label: "Средний IRR", value: "15-25%" }
        ]
      }
    }
  ];

  return (
    <div className="min-h-screen bg-ocean-deep relative overflow-x-hidden">
      {/* Full-screen blocks */}
      <div ref={containerRef} className="relative">
        {blocks.map((block, index) => (
          <FullScreenBlock
            key={block.id}
            block={block}
            index={index}
            total={blocks.length}
            isActive={activeBlock === block.id}
            onActivate={() => setActiveBlock(block.id)}
            onDeactivate={() => setActiveBlock(null)}
          />
        ))}
      </div>
    </div>
  );
}

interface FullScreenBlockProps {
  block: BlockData;
  index: number;
  total: number;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}

function FullScreenBlock({ block, index, total, isActive, onActivate, onDeactivate }: FullScreenBlockProps) {
  const blockRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);

  return (
    <motion.section
      ref={blockRef}
      style={{ opacity }}
      className="min-h-screen flex items-center justify-center px-4 md:px-6 lg:px-8 relative"
    >
      <motion.div
        style={{ y }}
        className={cn(
          "w-full max-w-7xl mx-auto",
          "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center",
          "min-h-[80vh] py-12 lg:py-20"
        )}
      >
        {/* Left side - Content */}
        <div className="space-y-6 lg:space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center",
                block.color === "cyan" && "bg-cyan-500/20",
                block.color === "blue" && "bg-blue-500/20",
                block.color === "green" && "bg-green-500/20",
                block.color === "purple" && "bg-purple-500/20",
                block.color === "yellow" && "bg-yellow-500/20",
                block.color === "orange" && "bg-orange-500/20"
              )}>
                <block.icon size={index % 2 === 0 ? 32 : 40} className={cn(
                  block.color === "cyan" && "text-cyan-400",
                  block.color === "blue" && "text-blue-400",
                  block.color === "green" && "text-green-400",
                  block.color === "purple" && "text-purple-400",
                  block.color === "yellow" && "text-yellow-400",
                  block.color === "orange" && "text-orange-400"
                )} />
              </div>
              <div>
                <div className="text-sm lg:text-base text-slate-400 mb-1">
                  Блок {index + 1} из {total}
                </div>
                <h2 className="text-3xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-r from-white via-cyan-200 to-cyan-glow bg-clip-text text-transparent">
                  {block.title}
                </h2>
              </div>
            </div>
            
            <h3 className="text-xl lg:text-2xl text-cyan-glow/80 font-bold">
              {block.subtitle}
            </h3>
            
            <p className="text-base lg:text-lg text-slate-400 leading-relaxed">
              {block.description}
            </p>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {block.details.features.slice(0, 4).map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-4 hover:border-cyan-glow/50 transition-all cursor-pointer group"
                onClick={onActivate}
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className={cn(
                    "flex-shrink-0 mt-0.5",
                    block.color === "cyan" && "text-cyan-400",
                    block.color === "blue" && "text-blue-400",
                    block.color === "green" && "text-green-400",
                    block.color === "purple" && "text-purple-400",
                    block.color === "yellow" && "text-yellow-400",
                    block.color === "orange" && "text-orange-400"
                  )} />
                  <p className="text-sm lg:text-base text-slate-300 group-hover:text-white transition-colors">
                    {feature}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Metrics */}
          {block.details.metrics && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {block.details.metrics.map((metric, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-4 text-center"
                >
                  <div className={cn(
                    "text-2xl lg:text-3xl font-black mb-1",
                    block.color === "cyan" && "text-cyan-400",
                    block.color === "blue" && "text-blue-400",
                    block.color === "green" && "text-green-400",
                    block.color === "purple" && "text-purple-400",
                    block.color === "yellow" && "text-yellow-400",
                    block.color === "orange" && "text-orange-400"
                  )}>
                    {metric.value}
                  </div>
                  <div className="text-xs lg:text-sm text-slate-400">
                    {metric.label}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* CTA Button */}
          <InfoPopup
            title={block.title}
            size="xl"
            content={
              <DetailedBlockContent block={block} />
            }
            trigger={
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "w-full lg:w-auto px-8 py-4 rounded-xl font-bold",
                  "bg-gradient-to-r from-cyan-glow to-blue-500 text-ocean-deep",
                  "hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all",
                  "flex items-center justify-center gap-2"
                )}
              >
                <Info size={20} />
                Подробное описание
              </motion.button>
            }
          />
        </div>

        {/* Right side - Visualization */}
        <div className="relative h-[400px] lg:h-[600px] xl:h-[700px]">
          <BlockVisualization block={block} />
        </div>
      </motion.div>

      {/* Scroll indicator */}
      {index < total - 1 && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs text-slate-500 uppercase tracking-widest">Scroll</span>
          <ArrowRight size={20} className="text-slate-500 rotate-90" />
        </motion.div>
      )}
    </motion.section>
  );
}

// Detailed content for popup
function DetailedBlockContent({ block }: { block: BlockData }) {
  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="bg-gradient-to-r rounded-lg p-4 border border-cyan-500/30" style={{
        background: `linear-gradient(90deg, ${block.color === 'cyan' ? '#22d3ee20' : block.color === 'blue' ? '#3b82f620' : block.color === 'green' ? '#10b98120' : block.color === 'purple' ? '#a855f720' : block.color === 'yellow' ? '#eab30820' : '#f9731620'}, transparent)`
      }}>
        <h4 className="font-bold mb-2 text-cyan-400">Обзор</h4>
        <p className="text-sm text-slate-300 leading-relaxed">{block.details.overview}</p>
      </div>

      {/* Features */}
      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
        <h4 className="font-bold mb-3 text-cyan-400">✨ Основные функции:</h4>
        <ul className="space-y-2">
          {block.details.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
              <CheckCircle2 size={16} className={cn(
                "flex-shrink-0 mt-0.5",
                block.color === "cyan" && "text-cyan-400",
                block.color === "blue" && "text-blue-400",
                block.color === "green" && "text-green-400",
                block.color === "purple" && "text-purple-400",
                block.color === "yellow" && "text-yellow-400",
                block.color === "orange" && "text-orange-400"
              )} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Technologies */}
      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
        <h4 className="font-bold mb-3 text-cyan-400">🔧 Технологии:</h4>
        <div className="flex flex-wrap gap-2">
          {block.details.technologies.map((tech, i) => (
            <span key={i} className="px-3 py-1 bg-white/5 rounded-lg text-xs text-slate-300">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
        <h4 className="font-bold mb-3 text-cyan-400">🎯 Применение:</h4>
        <ul className="space-y-2">
          {block.details.useCases.map((useCase, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
              <Target size={16} className={cn(
                "flex-shrink-0 mt-0.5",
                block.color === "cyan" && "text-cyan-400",
                block.color === "blue" && "text-blue-400",
                block.color === "green" && "text-green-400",
                block.color === "purple" && "text-purple-400",
                block.color === "yellow" && "text-yellow-400",
                block.color === "orange" && "text-orange-400"
              )} />
              <span>{useCase}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Metrics */}
      {block.details.metrics && (
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <h4 className="font-bold mb-3 text-cyan-400">📊 Метрики:</h4>
          <div className="grid grid-cols-2 gap-4">
            {block.details.metrics.map((metric, i) => (
              <div key={i} className="text-center p-3 bg-white/5 rounded-lg">
                <div className={cn(
                  "text-2xl font-black mb-1",
                  block.color === "cyan" && "text-cyan-400",
                  block.color === "blue" && "text-blue-400",
                  block.color === "green" && "text-green-400",
                  block.color === "purple" && "text-purple-400",
                  block.color === "yellow" && "text-yellow-400",
                  block.color === "orange" && "text-orange-400"
                )}>
                  {metric.value}
                </div>
                <div className="text-xs text-slate-400">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Visualization component
function BlockVisualization({ block }: { block: BlockData }) {
  switch (block.visualization) {
    case "globe":
      return (
        <div className="w-full h-full rounded-2xl overflow-hidden glass-card border border-white/10">
          <Globe3D />
        </div>
      );
    
    case "layers":
      return <LayersVisualization block={block} />;
    
    case "network":
      return <NetworkVisualization block={block} />;
    
    case "chart":
      return <ChartVisualization block={block} />;
    
    case "diagram":
      return <DiagramVisualization block={block} />;
    
    default:
      return <DefaultVisualization block={block} />;
  }
}

// Layers Visualization
function LayersVisualization({ block }: { block: BlockData }) {
  const layers = [
    { name: "Презентация", color: "bg-blue-500", height: "h-12" },
    { name: "API Gateway", color: "bg-cyan-500", height: "h-14" },
    { name: "Бизнес-логика", color: "bg-purple-500", height: "h-16" },
    { name: "База данных", color: "bg-green-500", height: "h-18" },
    { name: "Блокчейн", color: "bg-yellow-500", height: "h-20" },
    { name: "IoT", color: "bg-orange-500", height: "h-18" },
    { name: "AI/ML", color: "bg-pink-500", height: "h-16" },
    { name: "Безопасность", color: "bg-red-500", height: "h-14" },
    { name: "Двойники", color: "bg-indigo-500", height: "h-16" },
    { name: "DAO", color: "bg-teal-500", height: "h-18" },
    { name: "Токеномика", color: "bg-amber-500", height: "h-20" },
    { name: "Интеграции", color: "bg-rose-500", height: "h-14" },
  ];

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden glass-card border border-white/10 p-6 flex flex-col justify-center gap-2">
      {layers.map((layer, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className={cn("rounded-lg flex items-center px-4 text-white font-medium text-sm", layer.color, layer.height)}
          style={{ marginLeft: `${i * 8}px` }}
        >
          {layer.name}
        </motion.div>
      ))}
    </div>
  );
}

// Network Visualization
function NetworkVisualization({ block }: { block: BlockData }) {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden glass-card border border-white/10 p-6 relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          {/* Central node */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-cyan-500/30 rounded-full border-2 border-cyan-400 flex items-center justify-center"
          >
            <block.icon size={32} className="text-cyan-400" />
          </motion.div>
          
          {/* Connected nodes */}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = (i * 60) * Math.PI / 180;
            const radius = 150;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.2 }}
                className="absolute top-1/2 left-1/2 w-12 h-12 bg-blue-500/30 rounded-full border border-blue-400 flex items-center justify-center"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                }}
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
              </motion.div>
            );
          })}
          
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full">
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const angle = (i * 60) * Math.PI / 180;
              const radius = 150;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              return (
                <motion.line
                  key={i}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: i * 0.2, duration: 0.5 }}
                  x1="50%"
                  y1="50%"
                  x2={`calc(50% + ${x}px)`}
                  y2={`calc(50% + ${y}px)`}
                  stroke="rgba(34, 211, 238, 0.3)"
                  strokeWidth="2"
                />
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}

// Chart Visualization
function ChartVisualization({ block }: { block: BlockData }) {
  const data = [65, 72, 68, 80, 75, 85, 90];
  const maxValue = Math.max(...data);
  
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden glass-card border border-white/10 p-6">
      <div className="h-full flex items-end justify-center gap-2">
        {data.map((value, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${(value / maxValue) * 100}%` }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className={cn(
              "flex-1 rounded-t-lg",
              block.color === "cyan" && "bg-gradient-to-t from-cyan-500/50 to-cyan-400/30",
              block.color === "blue" && "bg-gradient-to-t from-blue-500/50 to-blue-400/30",
              block.color === "green" && "bg-gradient-to-t from-green-500/50 to-green-400/30",
              block.color === "purple" && "bg-gradient-to-t from-purple-500/50 to-purple-400/30",
              block.color === "yellow" && "bg-gradient-to-t from-yellow-500/50 to-yellow-400/30",
              block.color === "orange" && "bg-gradient-to-t from-orange-500/50 to-orange-400/30"
            )}
          />
        ))}
      </div>
    </div>
  );
}

// Diagram Visualization
function DiagramVisualization({ block }: { block: BlockData }) {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden glass-card border border-white/10 p-6">
      <div className="h-full flex flex-col justify-center gap-4">
        {[
          { label: "Водные объекты", value: 500, color: "cyan" },
          { label: "Инфраструктура", value: 200, color: "blue" },
          { label: "NFT активы", value: 1000, color: "purple" },
          { label: "Датчики", value: 2000, color: "green" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="space-y-2"
          >
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">{item.label}</span>
              <span className={cn(
                "font-bold",
                item.color === "cyan" && "text-cyan-400",
                item.color === "blue" && "text-blue-400",
                item.color === "green" && "text-green-400",
                item.color === "purple" && "text-purple-400",
                item.color === "yellow" && "text-yellow-400",
                item.color === "orange" && "text-orange-400"
              )}>{item.value}+</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                className={cn(
                  "h-full rounded-full",
                  item.color === "cyan" && "bg-cyan-500",
                  item.color === "blue" && "bg-blue-500",
                  item.color === "green" && "bg-green-500",
                  item.color === "purple" && "bg-purple-500",
                  item.color === "yellow" && "bg-yellow-500",
                  item.color === "orange" && "bg-orange-500"
                )}
                style={{ width: `${Math.min((item.value / 2000) * 100, 100)}%` }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Default Visualization
function DefaultVisualization({ block }: { block: BlockData }) {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden glass-card border border-white/10 p-6 flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className={cn(
          "w-32 h-32 lg:w-48 lg:h-48 rounded-full border-4",
          block.color === "cyan" && "border-cyan-500/30",
          block.color === "blue" && "border-blue-500/30",
          block.color === "green" && "border-green-500/30",
          block.color === "purple" && "border-purple-500/30",
          block.color === "yellow" && "border-yellow-500/30",
          block.color === "orange" && "border-orange-500/30"
        )}
      >
        <div className="w-full h-full flex items-center justify-center">
          <block.icon size={64} className={cn(
            block.color === "cyan" && "text-cyan-400",
            block.color === "blue" && "text-blue-400",
            block.color === "green" && "text-green-400",
            block.color === "purple" && "text-purple-400",
            block.color === "yellow" && "text-yellow-400",
            block.color === "orange" && "text-orange-400"
          )} />
        </div>
      </motion.div>
    </div>
  );
}
