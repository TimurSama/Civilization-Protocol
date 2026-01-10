"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard, Map, FolderKanban, Vote, Target, Users,
  ArrowRight, TrendingUp, Activity, BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import InfoPopup from "./InfoPopup";

interface QuickAccessCard {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  href: string;
  color: string;
  metrics: {
    primary: { value: string | number; label: string };
    secondary?: { value: string | number; label: string };
  };
  preview?: React.ReactNode;
}

const quickAccessCards: QuickAccessCard[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    description: "Глобальный мониторинг водных ресурсов",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "cyan",
    metrics: {
      primary: { value: "72", label: "Индекс качества воды" },
      secondary: { value: "2,456", label: "Активных объектов" },
    },
  },
  {
    id: "map",
    title: "Карта",
    description: "Интерактивная карта экосистемы",
    icon: Map,
    href: "/map",
    color: "blue",
    metrics: {
      primary: { value: "1,234", label: "Точек на карте" },
      secondary: { value: "45", label: "Кризисных зон" },
    },
  },
  {
    id: "tokenhub",
    title: "TokenHub",
    description: "Проекты и инвестиции",
    icon: FolderKanban,
    href: "/tokenhub",
    color: "emerald",
    metrics: {
      primary: { value: "23", label: "Активных проектов" },
      secondary: { value: "$4.5M", label: "Объём инвестиций" },
    },
  },
  {
    id: "dao",
    title: "DAO",
    description: "Децентрализованное управление",
    icon: Vote,
    href: "/dao",
    color: "purple",
    metrics: {
      primary: { value: "5", label: "Активных голосований" },
      secondary: { value: "1,420", label: "Участников" },
    },
  },
  {
    id: "missions",
    title: "Миссии",
    description: "Задания и награды",
    icon: Target,
    href: "/missions",
    color: "amber",
    metrics: {
      primary: { value: "12", label: "Активных миссий" },
      secondary: { value: "456", label: "Участников" },
    },
  },
  {
    id: "social",
    title: "Сообщество",
    description: "Социальная сеть платформы",
    icon: Users,
    href: "/social",
    color: "rose",
    metrics: {
      primary: { value: "12,456", label: "Участников" },
      secondary: { value: "2,340", label: "Постов сегодня" },
    },
  },
];

export default function QuickAccessCards() {
  const getColorClasses = (color: string) => {
    const colors = {
      cyan: "bg-cyan-500/10 border-cyan-500/30 hover:border-cyan-500/50 text-cyan-400",
      blue: "bg-blue-500/10 border-blue-500/30 hover:border-blue-500/50 text-blue-400",
      emerald: "bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500/50 text-emerald-400",
      purple: "bg-purple-500/10 border-purple-500/30 hover:border-purple-500/50 text-purple-400",
      amber: "bg-amber-500/10 border-amber-500/30 hover:border-amber-500/50 text-amber-400",
      rose: "bg-rose-500/10 border-rose-500/30 hover:border-rose-500/50 text-rose-400",
    };
    return colors[color as keyof typeof colors] || colors.cyan;
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">
            Быстрый доступ к функциям
          </h2>
          <p className="text-slate-400 text-lg">
            Интерактивные инструменты платформы CivilizationProtocol
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickAccessCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <InfoPopup
                title={card.title}
                content={
                  <div className="space-y-4">
                    <p className="text-sm text-slate-300">{card.description}</p>
                    <div>
                      <h4 className="font-bold mb-2">Метрики:</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 rounded-lg bg-slate-800/50">
                          <div className="text-2xl font-black text-white mb-1">
                            {card.metrics.primary.value}
                          </div>
                          <div className="text-xs text-slate-400">
                            {card.metrics.primary.label}
                          </div>
                        </div>
                        {card.metrics.secondary && (
                          <div className="p-3 rounded-lg bg-slate-800/50">
                            <div className="text-2xl font-black text-white mb-1">
                              {card.metrics.secondary.value}
                            </div>
                            <div className="text-xs text-slate-400">
                              {card.metrics.secondary.label}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="pt-4 border-t border-white/10">
                      <Link
                        href={card.href}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg transition-colors text-sm font-medium"
                      >
                        Открыть {card.title}
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                }
                trigger={
                  <Link
                    href={card.href}
                    className={cn(
                      "block glass-card p-6 border rounded-2xl transition-all group relative overflow-hidden",
                      getColorClasses(card.color)
                    )}
                  >
                    {/* Gradient overlay on hover */}
                    <motion.div
                      className={cn(
                        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity",
                        card.color === "cyan" && "bg-gradient-to-br from-cyan-500/10 to-transparent",
                        card.color === "blue" && "bg-gradient-to-br from-blue-500/10 to-transparent",
                        card.color === "emerald" && "bg-gradient-to-br from-emerald-500/10 to-transparent",
                        card.color === "purple" && "bg-gradient-to-br from-purple-500/10 to-transparent",
                        card.color === "amber" && "bg-gradient-to-br from-amber-500/10 to-transparent",
                        card.color === "rose" && "bg-gradient-to-br from-rose-500/10 to-transparent",
                      )}
                    />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className={cn(
                          "w-14 h-14 rounded-xl flex items-center justify-center",
                          getColorClasses(card.color)
                        )}>
                          <card.icon size={28} />
                        </div>
                        <ArrowRight
                          size={20}
                          className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all"
                        />
                      </div>

                      <h3 className="text-xl font-black mb-2 group-hover:text-white transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-sm text-slate-400 mb-4 group-hover:text-slate-300 transition-colors">
                        {card.description}
                      </p>

                      <div className="space-y-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-black group-hover:text-white transition-colors">
                            {card.metrics.primary.value}
                          </span>
                          <span className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors">
                            {card.metrics.primary.label}
                          </span>
                        </div>
                        {card.metrics.secondary && (
                          <div className="flex items-center gap-2 text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                            <TrendingUp size={12} />
                            {card.metrics.secondary.value} {card.metrics.secondary.label}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                }
                size="md"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

