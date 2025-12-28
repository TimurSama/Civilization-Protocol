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

const keyMetrics = [
  { label: "Целевые пользователи", current: "1,000+", target: "1,000,000", icon: Users },
  { label: "IoT датчики", current: "50", target: "10,000+", icon: Cpu },
  { label: "Водные объекты", current: "15", target: "5,000+", icon: Globe },
  { label: "Партнёры", current: "5", target: "100+", icon: Building2 },
];

export default function RoadmapPage() {
  const [selectedYear, setSelectedYear] = useState(2024);

  const statusColors = {
    completed: { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/30" },
    current: { bg: "bg-cyan-glow/20", text: "text-cyan-glow", border: "border-cyan-glow/30" },
    upcoming: { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/30" },
    future: { bg: "bg-slate-500/20", text: "text-slate-400", border: "border-slate-500/30" },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-black mb-4">Дорожная карта</h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          От концепции к глобальной экосистеме управления водными ресурсами
        </p>
      </motion.div>

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


