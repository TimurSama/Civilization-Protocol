"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar, CheckCircle2, Clock, ArrowRight, Rocket, Globe, Shield,
  Users, Coins, Cpu, Building2, Target, Zap, Activity, MapPin,
  Star, Award, TrendingUp, Database, Lock, Network, Smartphone
} from "lucide-react";
import { cn } from "@/lib/utils";
import BuyTokenWidget from "@/components/BuyTokenWidget";
import { useLanguage } from "@/context/LanguageContext";

// Пройденный путь с затратами
const completedPath = [
  {
    id: "app-alpha",
    title: "Разработка приложения альфа-версия",
    period: "Q3 2023 - Q2 2024",
    cost: 80000,
    status: "completed",
    technologies: [
      "Next.js 16 Framework",
      "12-уровневая архитектура",
      "7 специализированных кабинетов",
      "UI/UX дизайн-система",
      "Блокчейн интеграция (базовая)",
      "REST API",
      "База данных (Prisma)",
    ],
    results: [
      "MVP платформы запущен",
      "Web-приложение функционально",
      "Базовая интеграция с блокчейном",
    ],
    icon: Smartphone,
    color: "cyan",
  },
  {
    id: "documentation",
    title: "Документация",
    period: "Q4 2023 - Q1 2024",
    cost: 15000,
    status: "completed",
    technologies: [
      "White Paper v1.0 и v2.0",
      "Техническая документация",
      "API документация",
      "Руководства по развертыванию",
      "Документация токеномики",
    ],
    results: [
      "Полная техническая документация",
      "API docs с примерами",
      "Руководства для разработчиков",
    ],
    icon: Database,
    color: "blue",
  },
  {
    id: "research",
    title: "Научные исследования",
    period: "Q3 2023 - Q2 2024",
    cost: 25000,
    status: "completed",
    technologies: [
      "Исследование водных ресурсов",
      "Анализ экологических проблем",
      "Методология токенизации",
      "Научные публикации",
    ],
    results: [
      "Партнёрство с TIIAME",
      "Аналитические записки",
      "Научные публикации",
    ],
    icon: Cpu,
    color: "purple",
  },
  {
    id: "innovations",
    title: "Новаторские технологии и инструменты",
    period: "Q4 2023 - Q2 2024",
    cost: 20000,
    status: "completed",
    technologies: [
      "Карманный анализатор воды VOD Check (прототип)",
      "Система IoT датчиков (концепция)",
      "AI аналитический движок (базовая версия)",
      "Блокчейн инфраструктура (тестнет)",
      "Интеграционные API",
    ],
    results: [
      "Прототип VOD Check готов",
      "AI движок работает",
      "IoT концепция разработана",
    ],
    icon: Zap,
    color: "emerald",
  },
  {
    id: "sensors",
    title: "Системы датчиков",
    period: "Q1-Q2 2024",
    cost: 10000,
    status: "completed",
    technologies: [
      "Прототипы IoT датчиков",
      "Система мониторинга качества воды",
      "Интеграция с существующими системами",
      "Телеметрия и сбор данных",
    ],
    results: [
      "Прототипы датчиков созданы",
      "Система мониторинга работает",
      "Интеграция протестирована",
    ],
    icon: Activity,
    color: "orange",
  },
];

// Будущая дорожная карта
const roadmapData = [
  {
    year: 2023,
    quarters: [
      {
        quarter: "Q3-Q4",
        title: "Foundation & Research",
        status: "completed",
        description: "Исследование и проектирование архитектуры платформы",
        milestones: [
          { text: "Анализ водных ресурсов и проблематики", done: true },
          { text: "Разработка концепции и White Paper", done: true },
          { text: "Формирование команды", done: true },
          { text: "Партнёрство с научными институтами", done: true },
        ],
        achievements: ["Концепция VODeco", "White Paper v1.0", "Партнёрство TIIAME"],
      },
    ],
  },
  {
    year: 2024,
    quarters: [
      {
        quarter: "Q1",
        title: "MVP Development",
        status: "completed",
        description: "Разработка минимально жизнеспособного продукта",
        milestones: [
          { text: "Архитектура 12 уровней", done: true },
          { text: "UI/UX дизайн системы", done: true },
          { text: "Прототип Dashboard", done: true },
          { text: "Базовые смарт-контракты", done: true },
        ],
        achievements: ["MVP v0.1", "Дизайн-система", "PoC блокчейн"],
      },
      {
        quarter: "Q2",
        title: "Platform Alpha",
        status: "current",
        description: "Запуск альфа-версии платформы",
        milestones: [
          { text: "Web-приложение Beta", done: true },
          { text: "7 специализированных кабинетов", done: true },
          { text: "Интеграция IoT датчиков", done: false },
          { text: "Токен VOD (testnet)", done: false },
        ],
        achievements: ["Beta Platform", "Community 1000+"],
      },
      {
        quarter: "Q3",
        title: "Token Launch & DAO",
        status: "upcoming",
        description: "Запуск токена и системы управления",
        milestones: [
          { text: "Token Generation Event", done: false },
          { text: "Listing на DEX", done: false },
          { text: "DAO Governance запуск", done: false },
          { text: "Стейкинг программа", done: false },
        ],
        achievements: [],
        cost: 500000,
        category: "blockchain",
      },
      {
        quarter: "Q4",
        title: "Ecosystem Expansion",
        status: "upcoming",
        description: "Расширение экосистемы и партнёрств",
        milestones: [
          { text: "Mobile App iOS/Android", done: false },
          { text: "TokenHub запуск", done: false },
          { text: "Nexus Exchange v1", done: false },
          { text: "5+ пилотных проектов", done: false },
        ],
        achievements: [],
        cost: 300000,
        category: "marketing",
      },
    ],
  },
  {
    year: 2025,
    quarters: [
      {
        quarter: "Q1-Q2",
        title: "Regional Deployment",
        status: "future",
        description: "Развёртывание в целевых регионах",
        milestones: [
          { text: "Пилот Узбекистан (полный цикл)", done: false },
          { text: "AI аналитика v2", done: false },
          { text: "Интеграция с гос. системами", done: false },
          { text: "100+ IoT датчиков", done: false },
        ],
        achievements: [],
        cost: 400000,
        category: "integration",
      },
      {
        quarter: "Q3-Q4",
        title: "International Partnerships",
        status: "future",
        description: "Международные партнёрства и масштабирование",
        milestones: [
          { text: "Партнёрство UN-Water", done: false },
          { text: "Интеграция Regen Network", done: false },
          { text: "TRINITY Protocol запуск", done: false },
          { text: "10,000+ пользователей", done: false },
        ],
        achievements: [],
        cost: 2000000,
        category: "production",
      },
    ],
  },
  {
    year: 2026,
    quarters: [
      {
        quarter: "Full Year",
        title: "Global Scale",
        status: "future",
        description: "Глобальное масштабирование и полная автономия",
        milestones: [
          { text: "1M+ пользователей", done: false },
          { text: "10,000+ IoT объектов", done: false },
          { text: "Full DAO autonomy", done: false },
          { text: "Интеграция 50+ стран", done: false },
          { text: "Carbon Credits integration", done: false },
          { text: "PEGP Planetary Governance", done: false },
        ],
        achievements: [],
      },
    ],
  },
];

// keyMetrics will be defined inside component to use translations

export default function RoadmapPage() {
  const { t } = useLanguage();
  const [selectedYear, setSelectedYear] = useState(2024);
  const [showCompleted, setShowCompleted] = useState(true);

  const statusColors = {
    completed: { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/30" },
    current: { bg: "bg-cyan-glow/20", text: "text-cyan-glow", border: "border-cyan-glow/30" },
    upcoming: { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/30" },
    future: { bg: "bg-slate-500/20", text: "text-slate-400", border: "border-slate-500/30" },
  };

  const totalCompleted = completedPath.reduce((sum, item) => sum + item.cost, 0);

  const keyMetrics = [
    { label: t("roadmap.target_users"), current: "1,000+", target: "1,000,000", icon: Users },
    { label: t("roadmap.iot_sensors"), current: "50", target: "10,000+", icon: Cpu },
    { label: t("roadmap.water_objects"), current: "15", target: "5,000+", icon: Globe },
    { label: t("roadmap.partners"), current: "5", target: "100+", icon: Building2 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-black mb-4">{t("roadmap.title")}</h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          {t("roadmap.subtitle")}
        </p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="px-6 py-3 glass rounded-xl">
            <div className="text-sm text-slate-500">{t("roadmap.invested_today")}</div>
            <div className="text-3xl font-black text-cyan-glow">${totalCompleted.toLocaleString()}</div>
          </div>
        </div>
      </motion.div>

      {/* Пройденный путь */}
      {showCompleted && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black flex items-center gap-3">
              <CheckCircle2 className="text-green-400" size={32} />
              {t("roadmap.completed_path")}
            </h2>
            <button
              onClick={() => setShowCompleted(!showCompleted)}
              className="px-4 py-2 glass rounded-xl hover:bg-white/10 transition-colors"
            >
              {showCompleted ? t("roadmap.hide") : t("roadmap.show")}
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {completedPath.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={cn(
                    "glass-card p-6 border-2 rounded-2xl hover:scale-105 transition-all",
                    `border-${item.color}-500/30 bg-${item.color}-500/5`
                  )}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn(`w-12 h-12 rounded-xl bg-${item.color}-500/20 flex items-center justify-center`, `text-${item.color}-400`)}>
                      <Icon size={24} />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold">
                      ✓ Завершено
                    </span>
                  </div>

                  <h3 className="text-xl font-black mb-2">{item.title}</h3>
                  <div className="text-sm text-slate-500 mb-4">{item.period}</div>

                  <div className="mb-4">
                    <div className="text-xs text-slate-500 mb-1">Затраты</div>
                    <div className={cn("text-2xl font-black", `text-${item.color}-400`)}>
                      ${item.cost.toLocaleString()}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-xs text-slate-500 mb-2">Технологии:</div>
                    <div className="flex flex-wrap gap-1">
                      {item.technologies.slice(0, 3).map((tech, j) => (
                        <span key={j} className="px-2 py-1 bg-white/5 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                      {item.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-white/5 rounded text-xs">
                          +{item.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-500 mb-2">Результаты:</div>
                    <ul className="space-y-1">
                      {item.results.map((result, j) => (
                        <li key={j} className="text-xs text-slate-400 flex items-center gap-2">
                          <CheckCircle2 size={12} className="text-green-400" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="glass-card p-6 bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/30">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-500 mb-1">Общая сумма инвестиций</div>
                <div className="text-4xl font-black text-green-400">${totalCompleted.toLocaleString()}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-500 mb-1">Статус</div>
                <div className="text-xl font-black text-cyan-glow">Альфа-версия</div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        {keyMetrics.map((metric, i) => (
          <div key={i} className="glass-card p-6 text-center">
            <metric.icon className="mx-auto mb-3 text-cyan-glow" size={28} />
            <div className="text-xs text-slate-500 mb-1">{metric.label}</div>
            <div className="flex items-center justify-center gap-2">
              <span className="font-bold text-white">{metric.current}</span>
              <ArrowRight size={14} className="text-slate-500" />
              <span className="font-bold text-cyan-glow">{metric.target}</span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Year Selector */}
      <div className="flex justify-center gap-2 mb-8">
        {[2023, 2024, 2025, 2026].map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={cn(
              "px-6 py-3 rounded-xl font-bold transition-all",
              selectedYear === year
                ? "bg-cyan-glow text-ocean-deep"
                : "glass hover:bg-white/10"
            )}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-glow via-purple-500 to-slate-700" />

        {/* Roadmap Items */}
        <div className="space-y-12">
          {roadmapData
            .filter((year) => year.year === selectedYear)
            .map((yearData) =>
              yearData.quarters.map((quarter, qIndex) => {
                const colors = statusColors[quarter.status as keyof typeof statusColors];
                const isLeft = qIndex % 2 === 0;

                return (
                  <motion.div
                    key={`${yearData.year}-${quarter.quarter}`}
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: qIndex * 0.1 }}
                    className={cn(
                      "relative flex items-start gap-8",
                      "md:flex-row",
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    )}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4">
                      <div className={cn(
                        "w-4 h-4 rounded-full border-2",
                        colors.border,
                        quarter.status === "current" ? "bg-cyan-glow animate-pulse" : colors.bg
                      )} />
                    </div>

                    {/* Content */}
                    <div className={cn(
                      "ml-16 md:ml-0 md:w-[calc(50%-2rem)]",
                      isLeft ? "md:pr-8 md:text-right" : "md:pl-8"
                    )}>
                      <div className={cn(
                        "glass-card p-6 border",
                        colors.border,
                        quarter.status === "current" && "bg-cyan-glow/5"
                      )}>
                        {/* Header */}
                        <div className={cn("flex items-center gap-3 mb-4", isLeft && "md:justify-end")}>
                          <span className={cn("px-3 py-1 rounded-full text-xs font-bold", colors.bg, colors.text)}>
                            {quarter.quarter}
                          </span>
                          <span className={cn("text-xs font-bold uppercase", colors.text)}>
                            {quarter.status === "completed" && "✓ Завершено"}
                            {quarter.status === "current" && "🔵 В процессе"}
                            {quarter.status === "upcoming" && "⏳ Скоро"}
                            {quarter.status === "future" && "🔮 Планируется"}
                          </span>
                        </div>

                        <h3 className="text-xl font-black mb-2">{quarter.title}</h3>
                        <p className="text-slate-400 text-sm mb-4">{quarter.description}</p>

                        {/* Milestones */}
                        <div className={cn("space-y-2 mb-4", isLeft && "md:text-right")}>
                          {quarter.milestones.map((milestone, mIndex) => (
                            <div
                              key={mIndex}
                              className={cn(
                                "flex items-center gap-2 text-sm",
                                isLeft && "md:flex-row-reverse"
                              )}
                            >
                              {milestone.done ? (
                                <CheckCircle2 size={14} className="text-green-400 flex-shrink-0" />
                              ) : (
                                <Clock size={14} className="text-slate-500 flex-shrink-0" />
                              )}
                              <span className={milestone.done ? "text-slate-300" : "text-slate-500"}>
                                {milestone.text}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Achievements */}
                        {quarter.achievements.length > 0 && (
                          <div className={cn("flex flex-wrap gap-2", isLeft && "md:justify-end")}>
                            {quarter.achievements.map((achievement, aIndex) => (
                              <span
                                key={aIndex}
                                className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full"
                              >
                                ✓ {achievement}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Spacer for opposite side */}
                    <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                  </motion.div>
                );
              })
            )}
        </div>
      </div>

      {/* Будущие этапы с карточками */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-16 mb-16"
      >
        <h2 className="text-3xl font-black mb-8 text-center">Планируемые этапы развития</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Блокчейн */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 border-2 border-purple-500/30 bg-purple-500/5 rounded-2xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                <Shield size={28} />
              </div>
              <div>
                <h3 className="text-xl font-black">Блокчейн инфраструктура</h3>
                <div className="text-sm text-slate-500">Q3-Q4 2024</div>
              </div>
            </div>
            <div className="mb-4">
              <div className="text-xs text-slate-500 mb-1">Бюджет</div>
              <div className="text-3xl font-black text-purple-400">$500,000</div>
            </div>
            <div className="space-y-2">
              <div className="text-xs text-slate-500 mb-2">Технологии:</div>
              <ul className="space-y-1 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-purple-400" />
                  VOD Chain (собственный блокчейн)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-purple-400" />
                  Hybrid Consensus (PoS + PoA)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-purple-400" />
                  TPS: 10,000+ транзакций/сек
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-purple-400" />
                  Шардинг (64 шарда)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-purple-400" />
                  Валидаторная сеть (10,000+ узлов)
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Маркетинг */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 border-2 border-yellow-500/30 bg-yellow-500/5 rounded-2xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-yellow-500/20 flex items-center justify-center text-yellow-400">
                <TrendingUp size={28} />
              </div>
              <div>
                <h3 className="text-xl font-black">Маркетинг и продвижение</h3>
                <div className="text-sm text-slate-500">Q3 2024 - Q1 2025</div>
              </div>
            </div>
            <div className="mb-4">
              <div className="text-xs text-slate-500 mb-1">Бюджет</div>
              <div className="text-3xl font-black text-yellow-400">$300,000</div>
            </div>
            <div className="space-y-2">
              <div className="text-xs text-slate-500 mb-2">Направления:</div>
              <ul className="space-y-1 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-yellow-400" />
                  Контент-маркетинг
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-yellow-400" />
                  Социальные сети
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-yellow-400" />
                  Партнёрства с экологическими организациями
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-yellow-400" />
                  Конференции и мероприятия
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-yellow-400" />
                  PR кампании
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Интеграции */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 border-2 border-blue-500/30 bg-blue-500/5 rounded-2xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                <Network size={28} />
              </div>
              <div>
                <h3 className="text-xl font-black">Интеграции</h3>
                <div className="text-sm text-slate-500">Q4 2024 - Q2 2025</div>
              </div>
            </div>
            <div className="mb-4">
              <div className="text-xs text-slate-500 mb-1">Бюджет</div>
              <div className="text-3xl font-black text-blue-400">$400,000</div>
            </div>
            <div className="space-y-2">
              <div className="text-xs text-slate-500 mb-2">Партнёрства:</div>
              <ul className="space-y-1 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-blue-400" />
                  UN-Water, UNEP
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-blue-400" />
                  Regen Network
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-blue-400" />
                  Государственные системы
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-blue-400" />
                  API и SDK для разработчиков
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-blue-400" />
                  Кросс-чейн мосты
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Производство */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 border-2 border-emerald-500/30 bg-emerald-500/5 rounded-2xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Cpu size={28} />
              </div>
              <div>
                <h3 className="text-xl font-black">Производство технологий</h3>
                <div className="text-sm text-slate-500">Q1-Q4 2025</div>
              </div>
            </div>
            <div className="mb-4">
              <div className="text-xs text-slate-500 mb-1">Бюджет</div>
              <div className="text-3xl font-black text-emerald-400">$2,000,000</div>
            </div>
            <div className="space-y-2">
              <div className="text-xs text-slate-500 mb-2">Продукция:</div>
              <ul className="space-y-1 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-emerald-400" />
                  Карманные анализаторы VOD Check (массовое производство)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-emerald-400" />
                  IoT датчики (10,000+ единиц)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-emerald-400" />
                  Системы мониторинга для промышленности
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-emerald-400" />
                  Мобильные лаборатории
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-emerald-400" />
                  Оборудование для очистных станций
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        <div className="mt-8 glass-card p-6 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-emerald-500/10 border border-purple-500/30">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500 mb-1">Общий бюджет планируемых этапов</div>
              <div className="text-4xl font-black text-cyan-glow">$3,200,000</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-500 mb-1">Всего инвестиций</div>
              <div className="text-2xl font-black text-white">${(totalCompleted + 3200000).toLocaleString()}</div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* All Years Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-16"
      >
        <h2 className="text-2xl font-black mb-6 text-center">Обзор всех этапов</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {roadmapData.map((yearData, i) => {
            const completedCount = yearData.quarters.reduce(
              (acc, q) => acc + q.milestones.filter((m) => m.done).length,
              0
            );
            const totalCount = yearData.quarters.reduce(
              (acc, q) => acc + q.milestones.length,
              0
            );
            const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                onClick={() => setSelectedYear(yearData.year)}
                className={cn(
                  "glass-card p-6 cursor-pointer hover:border-cyan-glow/30 transition-all",
                  selectedYear === yearData.year && "border-cyan-glow/50"
                )}
              >
                <div className="text-3xl font-black mb-2">{yearData.year}</div>
                <div className="text-sm text-slate-400 mb-4">
                  {yearData.quarters.map((q) => q.quarter).join(", ")}
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Прогресс</span>
                    <span className="text-cyan-glow">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-glow to-purple-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                <div className="text-xs text-slate-500">
                  {completedCount} / {totalCount} задач
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Buy Token */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-16"
      >
        <BuyTokenWidget variant="banner" source="roadmap" />
      </motion.div>

      {/* Vision Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-16 glass-card p-8 bg-gradient-to-r from-cyan-glow/10 via-transparent to-purple-500/10 text-center"
      >
        <Rocket className="mx-auto mb-4 text-cyan-glow" size={48} />
        <h2 className="text-3xl font-black mb-4">Видение 2030</h2>
        <p className="text-slate-400 max-w-3xl mx-auto mb-8">
          К 2030 году VODeco станет глобальной платформой управления водными ресурсами,
          объединяющей миллионы пользователей, тысячи IoT устройств и сотни организаций
          для устойчивого развития планеты.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="px-6 py-3 bg-white/5 rounded-xl">
            <div className="text-2xl font-black text-cyan-glow">1M+</div>
            <div className="text-xs text-slate-500">Пользователей</div>
          </div>
          <div className="px-6 py-3 bg-white/5 rounded-xl">
            <div className="text-2xl font-black text-purple-400">50+</div>
            <div className="text-xs text-slate-500">Стран</div>
          </div>
          <div className="px-6 py-3 bg-white/5 rounded-xl">
            <div className="text-2xl font-black text-green-400">$100M+</div>
            <div className="text-xs text-slate-500">Инвестиции в проекты</div>
          </div>
          <div className="px-6 py-3 bg-white/5 rounded-xl">
            <div className="text-2xl font-black text-yellow-400">SDG 6</div>
            <div className="text-xs text-slate-500">Вклад в цели ООН</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


