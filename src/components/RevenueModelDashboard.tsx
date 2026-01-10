"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Database, Coins, Building2, TrendingUp, Handshake,
  ArrowRight, BarChart3, PieChart, LineChart
} from "lucide-react";
import { cn } from "@/lib/utils";
import InfoPopup from "./InfoPopup";
import Link from "next/link";

interface RevenueSource {
  id: string;
  name: string;
  percent: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  description: string;
  forecast: { year: number; revenue: number }[];
  examples: string[];
  linkTo?: string;
}

const revenueSources: RevenueSource[] = [
  {
    id: "data-access",
    name: "Data Access Fees",
    percent: 35,
    icon: Database,
    color: "cyan",
    description: "Плата за доступ к премиум данным о водных ресурсах через API и платформу",
    forecast: [
      { year: 2025, revenue: 2.5 },
      { year: 2026, revenue: 5.8 },
      { year: 2027, revenue: 12.4 },
      { year: 2028, revenue: 24.6 },
      { year: 2029, revenue: 48.2 },
    ],
    examples: [
      "API доступ для исследовательских институтов",
      "Премиум подписки для корпораций",
      "Исторические данные и аналитика",
      "Real-time мониторинг для операторов",
    ],
    linkTo: "/api/docs",
  },
  {
    id: "token-transactions",
    name: "Token Transactions",
    percent: 25,
    icon: Coins,
    color: "emerald",
    description: "Комиссии с транзакций токенов VOD и CivilizationProtocol на платформе и биржах",
    forecast: [
      { year: 2025, revenue: 1.8 },
      { year: 2026, revenue: 4.2 },
      { year: 2027, revenue: 8.9 },
      { year: 2028, revenue: 17.6 },
      { year: 2029, revenue: 34.4 },
    ],
    examples: [
      "Комиссии с обмена токенов (0.1-0.5%)",
      "Комиссии со стейкинга",
      "Комиссии с переводов",
      "Листинговые сборы на биржах",
    ],
    linkTo: "/exchange",
  },
  {
    id: "enterprise",
    name: "Enterprise Licenses",
    percent: 20,
    icon: Building2,
    color: "blue",
    description: "Корпоративные лицензии на использование платформы и технологий CivilizationProtocol",
    forecast: [
      { year: 2025, revenue: 1.4 },
      { year: 2026, revenue: 3.3 },
      { year: 2027, revenue: 7.1 },
      { year: 2028, revenue: 14.1 },
      { year: 2029, revenue: 27.5 },
    ],
    examples: [
      "Корпоративные лицензии на платформу",
      "White-label решения",
      "Интеграция с корпоративными системами",
      "Техническая поддержка и консалтинг",
    ],
    linkTo: "/integration",
  },
  {
    id: "staking",
    name: "Staking Rewards",
    percent: 15,
    icon: TrendingUp,
    color: "purple",
    description: "Часть доходов от стейкинга распределяется в казначейство DAO",
    forecast: [
      { year: 2025, revenue: 1.1 },
      { year: 2026, revenue: 2.5 },
      { year: 2027, revenue: 5.3 },
      { year: 2028, revenue: 10.6 },
      { year: 2029, revenue: 20.6 },
    ],
    examples: [
      "Процент от стейкинг-пулов",
      "Комиссии за управление пулами",
      "Доходы от ликвидности",
    ],
    linkTo: "/nexus",
  },
  {
    id: "grants",
    name: "Grants & Partnerships",
    percent: 5,
    icon: Handshake,
    color: "amber",
    description: "Гранты от международных организаций и партнёрства",
    forecast: [
      { year: 2025, revenue: 0.4 },
      { year: 2026, revenue: 0.8 },
      { year: 2027, revenue: 1.8 },
      { year: 2028, revenue: 3.5 },
      { year: 2029, revenue: 6.9 },
    ],
    examples: [
      "Гранты от UN-Water",
      "Партнёрства с правительствами",
      "Исследовательские гранты",
      "Экологические фонды",
    ],
    linkTo: "/presentations/diplomatic",
  },
];

export default function RevenueModelDashboard() {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  const totalRevenue = revenueSources.reduce((sum, source) => {
    return sum + source.forecast[source.forecast.length - 1].revenue;
  }, 0);

  const getColorClasses = (color: string) => {
    const colors = {
      cyan: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      emerald: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      blue: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      purple: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      amber: "bg-amber-500/20 text-amber-400 border-amber-500/30",
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
          <h2 className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-emerald-500 bg-clip-text text-transparent">
            Модель доходов платформы
          </h2>
          <p className="text-slate-400 text-lg">
            Интерактивная визуализация источников дохода и прогнозов на 5 лет
          </p>
        </motion.div>

        {/* Interactive Pie Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-8 border border-white/10 rounded-2xl"
          >
            <h3 className="text-xl font-black mb-6 flex items-center gap-2">
              <PieChart className="text-cyan-400" size={24} />
              Распределение доходов
            </h3>
            <div className="relative w-full h-64 flex items-center justify-center">
              {/* Pie Chart Visualization */}
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {revenueSources.map((source, index) => {
                  const startAngle = revenueSources
                    .slice(0, index)
                    .reduce((sum, s) => sum + (s.percent / 100) * 360, 0);
                  const angle = (source.percent / 100) * 360;
                  const endAngle = startAngle + angle;

                  const startAngleRad = (startAngle * Math.PI) / 180;
                  const endAngleRad = (endAngle * Math.PI) / 180;

                  const x1 = 100 + 80 * Math.cos(startAngleRad - Math.PI / 2);
                  const y1 = 100 + 80 * Math.sin(startAngleRad - Math.PI / 2);
                  const x2 = 100 + 80 * Math.cos(endAngleRad - Math.PI / 2);
                  const y2 = 100 + 80 * Math.sin(endAngleRad - Math.PI / 2);

                  const largeArc = angle > 180 ? 1 : 0;

                  const pathData = [
                    `M 100 100`,
                    `L ${x1} ${y1}`,
                    `A 80 80 0 ${largeArc} 1 ${x2} ${y2}`,
                    `Z`,
                  ].join(" ");

                  const colorMap = {
                    cyan: "#22d3ee",
                    emerald: "#10b981",
                    blue: "#3b82f6",
                    purple: "#a855f7",
                    amber: "#f59e0b",
                  };

                  return (
                    <path
                      key={source.id}
                      d={pathData}
                      fill={colorMap[source.color as keyof typeof colorMap]}
                      fillOpacity={0.7}
                      stroke="rgba(255, 255, 255, 0.1)"
                      strokeWidth="2"
                      className="cursor-pointer hover:opacity-100 transition-opacity"
                      onClick={() => setSelectedSource(source.id)}
                    />
                  );
                })}
              </svg>
            </div>
            <div className="mt-6 space-y-2">
              {revenueSources.map((source) => (
                <div
                  key={source.id}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all hover:scale-[1.02]",
                    getColorClasses(source.color),
                    selectedSource === source.id && "ring-2 ring-white/50"
                  )}
                  onClick={() => setSelectedSource(selectedSource === source.id ? null : source.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("w-4 h-4 rounded", getColorClasses(source.color))} />
                    <span className="font-medium">{source.name}</span>
                  </div>
                  <span className="font-black">{source.percent}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Forecast Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-8 border border-white/10 rounded-2xl"
          >
            <h3 className="text-xl font-black mb-6 flex items-center gap-2">
              <LineChart className="text-emerald-400" size={24} />
              Прогноз доходов (млн $)
            </h3>
            <div className="space-y-4">
              {revenueSources.map((source) => (
                <div key={source.id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{source.name}</span>
                    <span className="font-black">
                      ${source.forecast[source.forecast.length - 1].revenue.toFixed(1)}M
                    </span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className={cn(
                        "h-full",
                        source.color === "cyan" && "bg-cyan-500",
                        source.color === "emerald" && "bg-emerald-500",
                        source.color === "blue" && "bg-blue-500",
                        source.color === "purple" && "bg-purple-500",
                        source.color === "amber" && "bg-amber-500",
                      )}
                      style={{
                        width: `${(source.forecast[source.forecast.length - 1].revenue / totalRevenue) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-white/10 mt-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold">Общий доход к 2029:</span>
                  <span className="text-2xl font-black text-emerald-400">
                    ${totalRevenue.toFixed(1)}M
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Detailed Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {revenueSources.map((source, index) => (
            <motion.div
              key={source.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <InfoPopup
                title={source.name}
                content={
                  <div className="space-y-4">
                    <p className="text-sm text-slate-300">{source.description}</p>
                    <div>
                      <h4 className="font-bold mb-2">Прогноз доходов (млн $):</h4>
                      <div className="space-y-2">
                        {source.forecast.map((f) => (
                          <div key={f.year} className="flex justify-between text-sm">
                            <span className="text-slate-400">{f.year}:</span>
                            <span className="font-bold">${f.revenue.toFixed(1)}M</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Примеры использования:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
                        {source.examples.map((example, i) => (
                          <li key={i}>{example}</li>
                        ))}
                      </ul>
                    </div>
                    {source.linkTo && (
                      <div className="pt-4 border-t border-white/10">
                        <Link
                          href={source.linkTo}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg transition-colors text-sm font-medium"
                        >
                          Узнать больше
                          <ArrowRight size={16} />
                        </Link>
                      </div>
                    )}
                  </div>
                }
                trigger={
                  <div
                    className={cn(
                      "glass-card p-6 border rounded-2xl cursor-pointer hover:scale-105 transition-all group relative overflow-hidden",
                      getColorClasses(source.color)
                    )}
                  >
                    <motion.div
                      className={cn(
                        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity",
                        source.color === "cyan" && "bg-gradient-to-br from-cyan-500/10 to-transparent",
                        source.color === "emerald" && "bg-gradient-to-br from-emerald-500/10 to-transparent",
                        source.color === "blue" && "bg-gradient-to-br from-blue-500/10 to-transparent",
                        source.color === "purple" && "bg-gradient-to-br from-purple-500/10 to-transparent",
                        source.color === "amber" && "bg-gradient-to-br from-amber-500/10 to-transparent",
                      )}
                    />
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", getColorClasses(source.color))}>
                          <source.icon size={24} />
                        </div>
                        <span className="text-2xl font-black">{source.percent}%</span>
                      </div>
                      <h3 className="text-lg font-black mb-2 group-hover:text-white transition-colors">
                        {source.name}
                      </h3>
                      <p className="text-sm text-slate-400 mb-4 line-clamp-2 group-hover:text-slate-300 transition-colors">
                        {source.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                        <BarChart3 size={14} />
                        Прогноз: ${source.forecast[source.forecast.length - 1].revenue.toFixed(1)}M к 2029
                      </div>
                    </div>
                  </div>
                }
                size="lg"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

