"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, Building2, Coins, Lock, Handshake, TrendingUp,
  ArrowRight, Calendar, ExternalLink, Info, Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import InfoPopup from "./InfoPopup";
import Link from "next/link";

interface TokenAllocation {
  id: string;
  name: string;
  percent: number;
  amount: number; // в миллионах
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  vesting: {
    cliff: number; // месяцев
    duration: number; // месяцев
    schedule: "linear" | "cliff" | "custom";
  };
  description: string;
  publicAddress?: string;
  details: React.ReactNode;
}

const tokenAllocations: TokenAllocation[] = [
  {
    id: "ecosystem",
    name: "Ecosystem & Community",
    percent: 25,
    amount: 250,
    icon: Users,
    color: "cyan",
    vesting: {
      cliff: 0,
      duration: 48,
      schedule: "linear",
    },
    description: "Распределение для развития экосистемы, наград пользователям, грантов и партнёрств",
    details: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          25% токенов выделено на развитие экосистемы и сообщества. Эти токены распределяются постепенно 
          в течение 4 лет для поддержки роста платформы.
        </p>
        <div>
          <h4 className="font-bold mb-2">Распределение:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li>Награды пользователям (Learn-to-Earn): 40%</li>
            <li>Гранты для проектов: 30%</li>
            <li>Партнёрства: 20%</li>
            <li>Маркетинг и рост: 10%</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Вестинг:</h4>
          <p className="text-sm text-slate-400">
            Линейный вестинг в течение 48 месяцев без cliff периода. 
            Ежемесячное разблокирование ~2.08% от общего объёма.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-2">Публичный адрес:</h4>
          <p className="text-xs font-mono text-slate-400 break-all">
            0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
          </p>
        </div>
        <div className="pt-4 border-t border-white/10">
          <Link
            href="/dao"
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg transition-colors text-sm font-medium"
          >
            Узнать о DAO
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    ),
  },
  {
    id: "team",
    name: "Team & Advisors",
    percent: 20,
    amount: 200,
    icon: Building2,
    color: "purple",
    vesting: {
      cliff: 12,
      duration: 36,
      schedule: "linear",
    },
    description: "Токены для команды и консультантов с длительным вестингом для выравнивания интересов",
    details: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          20% токенов выделено для команды и консультантов. Длительный вестинг обеспечивает 
          долгосрочную мотивацию и выравнивание интересов с успехом проекта.
        </p>
        <div>
          <h4 className="font-bold mb-2">Распределение:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li>Основатели: 50%</li>
            <li>Команда разработки: 30%</li>
            <li>Консультанты: 15%</li>
            <li>Резерв для найма: 5%</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Вестинг:</h4>
          <p className="text-sm text-slate-400">
            Cliff период 12 месяцев, затем линейный вестинг в течение 36 месяцев. 
            Первое разблокирование через 12 месяцев, затем ежемесячно ~2.78%.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-2">Публичный адрес:</h4>
          <p className="text-xs font-mono text-slate-400 break-all">
            0x8ba1f109551bD432803012645Hac136c22C1779
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "private",
    name: "Private Sale",
    percent: 15,
    amount: 150,
    icon: Coins,
    color: "blue",
    vesting: {
      cliff: 3,
      duration: 18,
      schedule: "linear",
    },
    description: "Токены для частных инвесторов с вестингом для защиты ранних инвесторов",
    details: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          15% токенов продано частным инвесторам на ранних этапах. Вестинг защищает 
          ранних инвесторов и обеспечивает стабильность рынка.
        </p>
        <div>
          <h4 className="font-bold mb-2">Условия:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li>Цена: $0.0035 за токен</li>
            <li>Минимальная инвестиция: $5,000</li>
            <li>Максимальная инвестиция: $1,000,000</li>
            <li>Бонус: 30%</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Вестинг:</h4>
          <p className="text-sm text-slate-400">
            Cliff период 3 месяца, затем линейный вестинг в течение 18 месяцев. 
            Первое разблокирование через 3 месяца, затем ежемесячно ~5.56%.
          </p>
        </div>
        <div className="pt-4 border-t border-white/10">
          <Link
            href="/invest"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors text-sm font-medium"
          >
            Инвестировать
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    ),
  },
  {
    id: "public",
    name: "Public Sale",
    percent: 10,
    amount: 100,
    icon: TrendingUp,
    color: "emerald",
    vesting: {
      cliff: 0,
      duration: 0,
      schedule: "cliff",
    },
    description: "Публичная продажа токенов без вестинга для широкой аудитории",
    details: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          10% токенов доступно для публичной продажи. Токены разблокируются сразу 
          после покупки, что обеспечивает ликвидность и доступность для всех.
        </p>
        <div>
          <h4 className="font-bold mb-2">Условия:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li>Цена: $0.0045 за токен</li>
            <li>Минимальная инвестиция: $100</li>
            <li>Бонус: 10%</li>
            <li>Вестинг: Нет</li>
          </ul>
        </div>
        <div className="pt-4 border-t border-white/10">
          <Link
            href="/invest"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg transition-colors text-sm font-medium"
          >
            Купить токены
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    ),
  },
  {
    id: "dao",
    name: "DAO Treasury",
    percent: 10,
    amount: 100,
    icon: Lock,
    color: "amber",
    vesting: {
      cliff: 0,
      duration: 60,
      schedule: "linear",
    },
    description: "Казначейство DAO для управления экосистемой и финансирования проектов",
    details: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          10% токенов выделено в казначейство DAO для управления экосистемой, 
          финансирования проектов и развития платформы.
        </p>
        <div>
          <h4 className="font-bold mb-2">Использование:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li>Финансирование проектов через TokenHub: 40%</li>
            <li>Развитие платформы: 30%</li>
            <li>Резерв на непредвиденные расходы: 20%</li>
            <li>Партнёрства и гранты: 10%</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Вестинг:</h4>
          <p className="text-sm text-slate-400">
            Линейный вестинг в течение 60 месяцев без cliff периода. 
            Ежемесячное разблокирование ~1.67% от общего объёма.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-2">Публичный адрес:</h4>
          <p className="text-xs font-mono text-slate-400 break-all">
            0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
          </p>
        </div>
        <div className="pt-4 border-t border-white/10">
          <Link
            href="/dao"
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 rounded-lg transition-colors text-sm font-medium"
          >
            Управление DAO
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    ),
  },
  {
    id: "seed",
    name: "Seed Round",
    percent: 10,
    amount: 100,
    icon: Zap,
    color: "pink",
    vesting: {
      cliff: 6,
      duration: 24,
      schedule: "linear",
    },
    description: "Токены для seed-инвесторов с максимальным вестингом",
    details: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          10% токенов продано seed-инвесторам на самом раннем этапе. 
          Максимальный вестинг защищает проект от ранних распродаж.
        </p>
        <div>
          <h4 className="font-bold mb-2">Условия:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li>Цена: $0.0025 за токен</li>
            <li>Минимальная инвестиция: $10,000</li>
            <li>Максимальная инвестиция: $500,000</li>
            <li>Бонус: 50%</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Вестинг:</h4>
          <p className="text-sm text-slate-400">
            Cliff период 6 месяцев, затем линейный вестинг в течение 24 месяцев. 
            Первое разблокирование через 6 месяцев, затем ежемесячно ~4.17%.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "liquidity",
    name: "Liquidity",
    percent: 5,
    amount: 50,
    icon: Coins,
    color: "orange",
    vesting: {
      cliff: 0,
      duration: 12,
      schedule: "linear",
    },
    description: "Ликвидность для бирж и DEX для обеспечения торговли",
    details: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          5% токенов выделено для обеспечения ликвидности на биржах и DEX. 
          Это обеспечивает стабильную торговлю и доступность токенов.
        </p>
        <div>
          <h4 className="font-bold mb-2">Распределение:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li>Централизованные биржи (CEX): 60%</li>
            <li>Децентрализованные биржи (DEX): 30%</li>
            <li>Резерв ликвидности: 10%</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Вестинг:</h4>
          <p className="text-sm text-slate-400">
            Линейный вестинг в течение 12 месяцев без cliff периода. 
            Ежемесячное разблокирование ~8.33% от общего объёма.
          </p>
        </div>
        <div className="pt-4 border-t border-white/10">
          <Link
            href="/exchange"
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded-lg transition-colors text-sm font-medium"
          >
            Торговать
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    ),
  },
  {
    id: "partnerships",
    name: "Partnerships",
    percent: 5,
    amount: 50,
    icon: Handshake,
    color: "red",
    vesting: {
      cliff: 0,
      duration: 36,
      schedule: "linear",
    },
    description: "Токены для стратегических партнёрств и интеграций",
    details: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          5% токенов выделено для стратегических партнёрств, интеграций 
          и сотрудничества с ключевыми игроками индустрии.
        </p>
        <div>
          <h4 className="font-bold mb-2">Типы партнёрств:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li>Технологические партнёрства: 40%</li>
            <li>Государственные партнёрства: 30%</li>
            <li>Международные организации: 20%</li>
            <li>Корпоративные партнёрства: 10%</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Вестинг:</h4>
          <p className="text-sm text-slate-400">
            Линейный вестинг в течение 36 месяцев без cliff периода. 
            Ежемесячное разблокирование ~2.78% от общего объёма.
          </p>
        </div>
        <div className="pt-4 border-t border-white/10">
          <Link
            href="/presentations/diplomatic"
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors text-sm font-medium"
          >
            Узнать о партнёрствах
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    ),
  },
];

export default function TokenDistributionDashboard() {
  const [selectedAllocation, setSelectedAllocation] = useState<string | null>(null);

  const getColorClasses = (color: string) => {
    const colors = {
      cyan: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      purple: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      blue: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      emerald: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      amber: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      pink: "bg-pink-500/20 text-pink-400 border-pink-500/30",
      orange: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      red: "bg-red-500/20 text-red-400 border-red-500/30",
    };
    return colors[color as keyof typeof colors] || colors.cyan;
  };

  const calculateUnlockSchedule = (allocation: TokenAllocation) => {
    const { cliff, duration, schedule } = allocation.vesting;
    if (schedule === "cliff" && duration === 0) {
      return [{ month: 0, percent: 100 }];
    }

    const scheduleData = [];
    if (cliff > 0) {
      scheduleData.push({ month: cliff, percent: 0 });
    }

    if (schedule === "linear" && duration > 0) {
      const monthlyPercent = 100 / duration;
      for (let i = cliff; i <= cliff + duration; i++) {
        const percent = Math.min(100, (i - cliff) * monthlyPercent);
        if (percent > 0) {
          scheduleData.push({ month: i, percent: Math.round(percent * 100) / 100 });
        }
      }
    }

    return scheduleData;
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
          <h2 className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Распределение токенов
          </h2>
          <p className="text-slate-400 text-lg">
            Интерактивная визуализация распределения и вестинга токенов CivilizationProtocol
          </p>
        </motion.div>

        {/* Distribution Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-8 border border-white/10 rounded-2xl"
          >
            <h3 className="text-xl font-black mb-6 flex items-center gap-2">
              <Coins className="text-purple-400" size={24} />
              Распределение (1,000M токенов)
            </h3>
            <div className="space-y-4">
              {tokenAllocations.map((allocation) => (
                <div key={allocation.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-4 h-4 rounded", getColorClasses(allocation.color))} />
                      <span className="font-medium">{allocation.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-black">{allocation.percent}%</span>
                      <span className="text-sm text-slate-500 ml-2">
                        ({allocation.amount}M)
                      </span>
                    </div>
                  </div>
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${allocation.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className={cn(
                        "h-full",
                        allocation.color === "cyan" && "bg-cyan-500",
                        allocation.color === "purple" && "bg-purple-500",
                        allocation.color === "blue" && "bg-blue-500",
                        allocation.color === "emerald" && "bg-emerald-500",
                        allocation.color === "amber" && "bg-amber-500",
                        allocation.color === "pink" && "bg-pink-500",
                        allocation.color === "orange" && "bg-orange-500",
                        allocation.color === "red" && "bg-red-500",
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Vesting Schedule */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-8 border border-white/10 rounded-2xl"
          >
            <h3 className="text-xl font-black mb-6 flex items-center gap-2">
              <Calendar className="text-amber-400" size={24} />
              График разблокировки
            </h3>
            <div className="space-y-6 max-h-[500px] overflow-y-auto">
              {tokenAllocations.map((allocation) => {
                const schedule = calculateUnlockSchedule(allocation);
                return (
                  <div key={allocation.id} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{allocation.name}</span>
                      <span className="text-slate-500">
                        {allocation.vesting.cliff > 0
                          ? `Cliff: ${allocation.vesting.cliff}м, затем ${allocation.vesting.duration}м`
                          : allocation.vesting.duration > 0
                          ? `${allocation.vesting.duration} месяцев`
                          : "Нет вестинга"}
                      </span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden relative">
                      {schedule.map((point, index) => (
                        <motion.div
                          key={index}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${point.percent}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className={cn(
                            "h-full absolute left-0",
                            allocation.color === "cyan" && "bg-cyan-500",
                            allocation.color === "purple" && "bg-purple-500",
                            allocation.color === "blue" && "bg-blue-500",
                            allocation.color === "emerald" && "bg-emerald-500",
                            allocation.color === "amber" && "bg-amber-500",
                            allocation.color === "pink" && "bg-pink-500",
                            allocation.color === "orange" && "bg-orange-500",
                            allocation.color === "red" && "bg-red-500",
                          )}
                          style={{ width: `${point.percent}%` }}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Detailed Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tokenAllocations.map((allocation, index) => (
            <motion.div
              key={allocation.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <InfoPopup
                title={allocation.name}
                content={allocation.details}
                trigger={
                  <div
                    className={cn(
                      "glass-card p-6 border rounded-2xl cursor-pointer hover:scale-105 transition-all group relative overflow-hidden",
                      getColorClasses(allocation.color)
                    )}
                  >
                    <motion.div
                      className={cn(
                        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity",
                        allocation.color === "cyan" && "bg-gradient-to-br from-cyan-500/10 to-transparent",
                        allocation.color === "purple" && "bg-gradient-to-br from-purple-500/10 to-transparent",
                        allocation.color === "blue" && "bg-gradient-to-br from-blue-500/10 to-transparent",
                        allocation.color === "emerald" && "bg-gradient-to-br from-emerald-500/10 to-transparent",
                        allocation.color === "amber" && "bg-gradient-to-br from-amber-500/10 to-transparent",
                        allocation.color === "pink" && "bg-gradient-to-br from-pink-500/10 to-transparent",
                        allocation.color === "orange" && "bg-gradient-to-br from-orange-500/10 to-transparent",
                        allocation.color === "red" && "bg-gradient-to-br from-red-500/10 to-transparent",
                      )}
                    />
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", getColorClasses(allocation.color))}>
                          <allocation.icon size={24} />
                        </div>
                        <span className="text-2xl font-black">{allocation.percent}%</span>
                      </div>
                      <h3 className="text-lg font-black mb-2 group-hover:text-white transition-colors">
                        {allocation.name}
                      </h3>
                      <p className="text-sm text-slate-400 mb-4 line-clamp-2 group-hover:text-slate-300 transition-colors">
                        {allocation.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                        <Calendar size={14} />
                        {allocation.vesting.cliff > 0
                          ? `Cliff: ${allocation.vesting.cliff}м`
                          : allocation.vesting.duration > 0
                          ? `${allocation.vesting.duration}м вестинг`
                          : "Нет вестинга"}
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

