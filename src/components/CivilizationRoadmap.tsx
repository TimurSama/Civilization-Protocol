"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2, Clock, Target, Zap, Network, Users, Building2,
  Cpu, Database, Shield, Globe, Droplets, Coins, ArrowRight,
  Rocket, Layers, Settings, Code, Smartphone, Activity, TrendingUp,
  FileText, BookOpen, Car
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface RoadmapItem {
  id: string;
  title: string;
  category: "system" | "object" | "subject" | "tool" | "mechanism" | "product";
  status: "completed" | "in-progress" | "planned";
  description: string;
  cost?: number;
  progress?: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  details: {
    components: string[];
    technologies: string[];
    timeline: string;
  };
}

const roadmapData: RoadmapItem[] = [
  // Протокол водного ресурса (в разработке)
  {
    id: "water-protocol-core",
    title: "Ядро протокола водного ресурса",
    category: "system",
    status: "in-progress",
    description: "Децентрализованная система управления водными ресурсами на базе блокчейна",
    cost: 500000,
    progress: 65,
    icon: Network,
    color: "cyan",
    details: {
      components: [
        "Блокчейн инфраструктура (VOD Chain)",
        "Смарт-контракты управления ресурсами",
        "DAO Governance для водных объектов",
        "Система токенизации водных прав"
      ],
      technologies: ["Ethereum L2", "Solidity", "IPFS", "Web3.js"],
      timeline: "Q2 2024 - Q4 2024"
    }
  },
  {
    id: "water-objects",
    title: "Водные объекты",
    category: "object",
    status: "in-progress",
    description: "Регистрация и управление водными объектами (реки, озёра, водохранилища)",
    cost: 200000,
    progress: 45,
    icon: Droplets,
    color: "blue",
    details: {
      components: [
        "Реестр водных объектов",
        "Геопространственная база данных",
        "Система мониторинга состояния",
        "Интеграция с IoT датчиками"
      ],
      technologies: ["PostGIS", "GeoJSON", "IoT Protocols", "MQTT"],
      timeline: "Q3 2024 - Q1 2025"
    }
  },
  {
    id: "water-subjects",
    title: "Субъекты управления",
    category: "subject",
    status: "in-progress",
    description: "Регистрация и управление участниками экосистемы (пользователи, организации, государства)",
    cost: 150000,
    progress: 80,
    icon: Users,
    color: "emerald",
    details: {
      components: [
        "Система идентификации (DID)",
        "Роли и права доступа",
        "KYC/AML интеграция",
        "Репутационная система"
      ],
      technologies: ["DID Protocol", "OAuth 2.0", "JWT", "GraphQL"],
      timeline: "Q2 2024 - Q3 2024"
    }
  },
  {
    id: "iot-tools",
    title: "IoT инструменты мониторинга",
    category: "tool",
    status: "in-progress",
    description: "Инструменты для сбора и анализа данных с IoT датчиков",
    cost: 300000,
    progress: 55,
    icon: Activity,
    color: "purple",
    details: {
      components: [
        "VOD Check (карманный анализатор)",
        "Стационарные IoT датчики",
        "Платформа телеметрии",
        "AI аналитический движок"
      ],
      technologies: ["Embedded Systems", "LoRaWAN", "TensorFlow", "Time Series DB"],
      timeline: "Q3 2024 - Q2 2025"
    }
  },
  {
    id: "governance-mechanism",
    title: "Механизм управления (DAO)",
    category: "mechanism",
    status: "in-progress",
    description: "Децентрализованное автономное управление экосистемой",
    cost: 250000,
    progress: 70,
    icon: Shield,
    color: "amber",
    details: {
      components: [
        "Система голосования",
        "Предложения и инициативы",
        "Казначейство DAO",
        "Делегирование голосов"
      ],
      technologies: ["Snapshot", "Gnosis Safe", "Aragon", "OpenZeppelin"],
      timeline: "Q2 2024 - Q4 2024"
    }
  },
  {
    id: "tokenhub-product",
    title: "TokenHub - платформа проектов",
    category: "product",
    status: "in-progress",
    description: "Платформа для запуска и финансирования экологических проектов",
    cost: 400000,
    progress: 50,
    icon: Coins,
    color: "rose",
    details: {
      components: [
        "Маркетплейс проектов",
        "ESG рейтинговая система",
        "Краудфандинг механизм",
        "Система распределения токенов"
      ],
      technologies: ["Next.js", "Web3", "Chainlink Oracles", "The Graph"],
      timeline: "Q3 2024 - Q1 2025"
    }
  },
  // Выполнено
  {
    id: "app-mvp",
    title: "MVP веб-приложения",
    category: "product",
    status: "completed",
    description: "Минимально жизнеспособный продукт платформы",
    cost: 80000,
    progress: 100,
    icon: Smartphone,
    color: "green",
    details: {
      components: [
        "12-уровневая архитектура",
        "7 специализированных кабинетов",
        "UI/UX дизайн-система",
        "Базовая блокчейн интеграция"
      ],
      technologies: ["Next.js 16", "Prisma", "Tailwind CSS", "Framer Motion"],
      timeline: "Q3 2023 - Q2 2024 (Завершено)"
    }
  },
  {
    id: "documentation",
    title: "Документация",
    category: "system",
    status: "completed",
    description: "Полная техническая и пользовательская документация",
    cost: 15000,
    progress: 100,
    icon: FileText,
    color: "blue",
    details: {
      components: [
        "White Paper v1.0 и v2.0",
        "Техническая документация",
        "API документация",
        "Руководства по развертыванию"
      ],
      technologies: ["Markdown", "OpenAPI", "Swagger", "GitBook"],
      timeline: "Q4 2023 - Q1 2024 (Завершено)"
    }
  },
  // Планируется - расширение протокола цивилизации
  {
    id: "energy-protocol",
    title: "Протокол энергетики",
    category: "system",
    status: "planned",
    description: "Децентрализованное управление энергетическими ресурсами",
    cost: 800000,
    progress: 0,
    icon: Zap,
    color: "yellow",
    details: {
      components: [
        "Реестр энергообъектов",
        "Система торговли энергией (P2P)",
        "Интеграция возобновляемых источников",
        "Управление энергосетями"
      ],
      technologies: ["Energy Blockchain", "Smart Grid", "IoT Energy", "AI Optimization"],
      timeline: "Q2 2025 - Q4 2025"
    }
  },
  {
    id: "health-protocol",
    title: "Протокол здравоохранения",
    category: "system",
    status: "planned",
    description: "Децентрализованная система управления здоровьем населения",
    cost: 600000,
    progress: 0,
    icon: Activity,
    color: "red",
    details: {
      components: [
        "Реестр медицинских учреждений",
        "Система медицинских данных",
        "Управление вакцинацией",
        "Эпидемиологический мониторинг"
      ],
      technologies: ["HIPAA Compliance", "FHIR", "Blockchain Health", "AI Diagnostics"],
      timeline: "Q3 2025 - Q1 2026"
    }
  },
  {
    id: "education-protocol",
    title: "Протокол образования",
    category: "system",
    status: "planned",
    description: "Децентрализованная образовательная экосистема",
    cost: 500000,
    progress: 0,
    icon: BookOpen,
    color: "indigo",
    details: {
      components: [
        "Реестр образовательных учреждений",
        "Система сертификатов (NFT)",
        "Платформа онлайн-обучения",
        "Управление образовательными грантами"
      ],
      technologies: ["NFT Certificates", "Learning Management System", "Blockchain Credentials"],
      timeline: "Q4 2025 - Q2 2026"
    }
  },
  {
    id: "transport-protocol",
    title: "Протокол транспорта",
    category: "system",
    status: "planned",
    description: "Децентрализованное управление транспортной инфраструктурой",
    cost: 700000,
    progress: 0,
    icon: Car,
    color: "orange",
    details: {
      components: [
        "Реестр транспортных объектов",
        "Система управления трафиком",
        "Экологический мониторинг транспорта",
        "Управление общественным транспортом"
      ],
      technologies: ["IoT Transport", "Traffic AI", "Emission Tracking", "Smart Cities"],
      timeline: "Q1 2026 - Q3 2026"
    }
  },
  {
    id: "civilization-core",
    title: "Ядро протокола цивилизации",
    category: "system",
    status: "planned",
    description: "Объединяющий протокол для всех направлений цивилизации",
    cost: 2000000,
    progress: 0,
    icon: Globe,
    color: "cyan",
    details: {
      components: [
        "Межпротокольная коммуникация",
        "Единая система идентификации",
        "Кросс-доменная аналитика",
        "Планетарное управление (PEGP)"
      ],
      technologies: ["Interoperability Protocol", "Cross-Chain", "Planetary Governance", "AI Superintelligence"],
      timeline: "Q4 2026 - Q4 2027"
    }
  }
];

const categoryLabels = {
  system: "Система",
  object: "Объект",
  subject: "Субъект",
  tool: "Инструмент",
  mechanism: "Механизм",
  product: "Продукт"
};

const statusLabels = {
  completed: "Выполнено",
  "in-progress": "В разработке",
  planned: "В плане"
};

export default function CivilizationRoadmap() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "completed" | "in-progress" | "planned">("all");

  const filteredData = filter === "all" 
    ? roadmapData 
    : roadmapData.filter(item => item.status === filter);

  const selectedItemData = roadmapData.find(item => item.id === selectedItem);

  const totalCost = roadmapData.reduce((sum, item) => sum + (item.cost || 0), 0);
  const completedCost = roadmapData
    .filter(item => item.status === "completed")
    .reduce((sum, item) => sum + (item.cost || 0), 0);
  const inProgressCost = roadmapData
    .filter(item => item.status === "in-progress")
    .reduce((sum, item) => sum + (item.cost || 0), 0);
  const plannedCost = roadmapData
    .filter(item => item.status === "planned")
    .reduce((sum, item) => sum + (item.cost || 0), 0);

  return (
    <section className="py-12 relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 mb-4">
            <Rocket className="text-cyan-400" size={16} />
            <span className="text-sm font-medium text-cyan-400">Протокол цивилизации DAO экосистема</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              CivilizationProtocol
            </span>
            <br />
            <span className="text-white">Дорожная карта развития</span>
          </h1>

          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl">
            Децентрализованная DAO экосистема для управления всеми аспектами цивилизации. 
            Сейчас активно разрабатывается протокол водного ресурса, далее — расширение 
            на энергетику, здравоохранение, образование, транспорт и другие направления.
          </p>
        </motion.div>

        {/* Финансовые метрики */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="glass-card p-6 border border-green-500/30 bg-green-500/5">
            <div className="text-xs text-slate-500 mb-1">Выполнено</div>
            <div className="text-2xl font-black text-green-400">${completedCost.toLocaleString()}</div>
            <div className="text-xs text-slate-500 mt-1">{(completedCost / totalCost * 100).toFixed(1)}% от общего</div>
          </div>
          <div className="glass-card p-6 border border-cyan-500/30 bg-cyan-500/5">
            <div className="text-xs text-slate-500 mb-1">В разработке</div>
            <div className="text-2xl font-black text-cyan-400">${inProgressCost.toLocaleString()}</div>
            <div className="text-xs text-slate-500 mt-1">{(inProgressCost / totalCost * 100).toFixed(1)}% от общего</div>
          </div>
          <div className="glass-card p-6 border border-yellow-500/30 bg-yellow-500/5">
            <div className="text-xs text-slate-500 mb-1">В плане</div>
            <div className="text-2xl font-black text-yellow-400">${plannedCost.toLocaleString()}</div>
            <div className="text-xs text-slate-500 mt-1">{(plannedCost / totalCost * 100).toFixed(1)}% от общего</div>
          </div>
          <div className="glass-card p-6 border border-purple-500/30 bg-purple-500/5">
            <div className="text-xs text-slate-500 mb-1">Общий бюджет</div>
            <div className="text-2xl font-black text-purple-400">${totalCost.toLocaleString()}</div>
            <div className="text-xs text-slate-500 mt-1">Всего направлений: {roadmapData.length}</div>
          </div>
        </motion.div>

        {/* Фильтры */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(["all", "completed", "in-progress", "planned"] as const).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={cn(
                "px-4 py-2 rounded-xl font-bold text-sm transition-all",
                filter === filterType
                  ? "bg-cyan-500 text-ocean-deep"
                  : "glass hover:bg-white/10 text-slate-400"
              )}
            >
              {filterType === "all" ? "Все" : statusLabels[filterType]}
            </button>
          ))}
        </div>

        {/* Дорожная карта */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredData.map((item, index) => {
              const Icon = item.icon;
              const statusColors = {
                completed: { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/30" },
                "in-progress": { bg: "bg-cyan-500/20", text: "text-cyan-400", border: "border-cyan-500/30" },
                planned: { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/30" }
              };
              const colors = statusColors[item.status];

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedItem(item.id === selectedItem ? null : item.id)}
                  className={cn(
                    "glass-card p-6 border-2 rounded-2xl cursor-pointer transition-all",
                    colors.border,
                    selectedItem === item.id && "ring-2 ring-cyan-500 ring-offset-2 ring-offset-ocean-deep",
                    "hover:scale-105"
                  )}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", colors.bg)}>
                      <Icon size={24} className={colors.text} />
                    </div>
                    <span className={cn("px-3 py-1 rounded-full text-xs font-bold", colors.bg, colors.text)}>
                      {statusLabels[item.status]}
                    </span>
                  </div>

                  <div className="mb-2">
                    <span className="text-xs text-slate-500 uppercase tracking-wider">
                      {categoryLabels[item.category]}
                    </span>
                  </div>

                  <h3 className="text-xl font-black mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400 mb-4">{item.description}</p>

                  {item.cost && (
                    <div className="mb-4">
                      <div className="text-xs text-slate-500 mb-1">Бюджет</div>
                      <div className={cn("text-xl font-black", colors.text)}>
                        ${item.cost.toLocaleString()}
                      </div>
                    </div>
                  )}

                  {item.progress !== undefined && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-500">Прогресс</span>
                        <span className={colors.text}>{item.progress}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.progress}%` }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className={cn("h-full", colors.bg)}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-cyan-400 text-sm font-bold mt-4">
                    Подробнее <ArrowRight size={14} />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Попап с деталями */}
        <AnimatePresence>
          {selectedItemData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-2xl w-full max-h-[80vh] overflow-y-auto glass-card p-8 border-2 border-cyan-500/30 rounded-3xl"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">
                      {categoryLabels[selectedItemData.category]}
                    </div>
                    <h2 className="text-3xl font-black mb-2">{selectedItemData.title}</h2>
                    <p className="text-slate-400">{selectedItemData.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="text-slate-500 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {selectedItemData.cost && (
                    <div className="glass p-4 rounded-xl">
                      <div className="text-xs text-slate-500 mb-1">Бюджет</div>
                      <div className="text-2xl font-black text-cyan-400">
                        ${selectedItemData.cost.toLocaleString()}
                      </div>
                    </div>
                  )}
                  {selectedItemData.progress !== undefined && (
                    <div className="glass p-4 rounded-xl">
                      <div className="text-xs text-slate-500 mb-1">Прогресс</div>
                      <div className="text-2xl font-black text-cyan-400">
                        {selectedItemData.progress}%
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold mb-3 flex items-center gap-2">
                      <Layers size={18} className="text-cyan-400" />
                      Компоненты
                    </h3>
                    <ul className="space-y-2">
                      {selectedItemData.details.components.map((component, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                          <CheckCircle2 size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                          {component}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold mb-3 flex items-center gap-2">
                      <Code size={18} className="text-cyan-400" />
                      Технологии
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedItemData.details.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold mb-3 flex items-center gap-2">
                      <Clock size={18} className="text-cyan-400" />
                      Сроки
                    </h3>
                    <p className="text-slate-300">{selectedItemData.details.timeline}</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <Link
                    href="/roadmap"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 text-ocean-deep font-bold rounded-xl hover:bg-cyan-400 transition-all"
                  >
                    Открыть полную дорожную карту
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

