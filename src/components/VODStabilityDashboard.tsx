"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp, TrendingDown, Minus, DollarSign, Droplets,
  ArrowRight, LineChart, Shield, Activity, Info, RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";
import InfoPopup from "./InfoPopup";
import Link from "next/link";

interface StabilityMechanism {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  details: React.ReactNode;
}

const stabilityMechanisms: StabilityMechanism[] = [
  {
    id: "water-backing",
    name: "Обеспечение водой",
    description: "Каждый VOD обеспечен реальным объёмом воды в системе",
    icon: Droplets,
    color: "cyan",
    details: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          VOD токен обеспечен реальным объёмом воды, зарегистрированным в системе CivilizationProtocol. 
          Это обеспечивает стабильность цены и защиту от спекуляций.
        </p>
        <div>
          <h4 className="font-bold mb-2">Механизм:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li>1 VOD = 1 литр воды в системе</li>
            <li>Цена привязана к стоимости воды ($0.005/литр)</li>
            <li>Эмиссия происходит только при добавлении воды</li>
            <li>Сжигание токенов при удалении данных о воде</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Текущее обеспечение:</h4>
          <div className="p-3 bg-slate-800/50 rounded-lg">
            <div className="text-2xl font-black text-cyan-400">4.5 млрд м³</div>
            <div className="text-sm text-slate-400">Воды в системе</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "arbitrage",
    name: "Арбитражные механизмы",
    description: "Автоматическая корректировка цены через арбитраж",
    icon: RefreshCw,
    color: "emerald",
    details: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          Арбитражные механизмы автоматически корректируют цену VOD, 
          поддерживая её стабильность относительно базовой стоимости воды.
        </p>
        <div>
          <h4 className="font-bold mb-2">Как это работает:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li>Если цена VOD выше базовой → автоматическая эмиссия</li>
            <li>Если цена VOD ниже базовой → автоматическое сжигание</li>
            <li>Арбитражные боты поддерживают паритет</li>
            <li>DAO контролирует параметры арбитража</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Преимущества:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li>Защита от волатильности</li>
            <li>Предсказуемая стоимость</li>
            <li>Пригодность для использования в реальной экономике</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "liquidity-pools",
    name: "Пулы ликвидности",
    description: "Стабильные пулы ликвидности для поддержания торговли",
    icon: Activity,
    color: "blue",
    details: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          Пулы ликвидности обеспечивают стабильную торговлю VOD и защищают от резких колебаний цены.
        </p>
        <div>
          <h4 className="font-bold mb-2">Текущие пулы:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li>VOD/USDT: $2.5M ликвидности</li>
            <li>VOD/USDC: $1.8M ликвидности</li>
            <li>VOD/ETH: $1.2M ликвидности</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Механизм:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li>Автоматическое пополнение при необходимости</li>
            <li>Защита от манипуляций</li>
            <li>Минимальный slippage</li>
          </ul>
        </div>
        <div className="pt-4 border-t border-white/10">
          <Link
            href="/exchange"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors text-sm font-medium"
          >
            Торговать
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    ),
  },
  {
    id: "dao-control",
    name: "Контроль DAO",
    description: "Децентрализованное управление параметрами стабильности",
    icon: Shield,
    color: "purple",
    details: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          DAO контролирует все параметры стабильности VOD через голосование держателей токенов.
        </p>
        <div>
          <h4 className="font-bold mb-2">Управляемые параметры:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li>Базовая цена VOD</li>
            <li>Параметры арбитража</li>
            <li>Размер пулов ликвидности</li>
            <li>Механизмы эмиссии и сжигания</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Процесс:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li>Предложения от сообщества</li>
            <li>Голосование держателей VOD</li>
            <li>Автоматическое исполнение через смарт-контракты</li>
            <li>Прозрачность всех решений</li>
          </ul>
        </div>
        <div className="pt-4 border-t border-white/10">
          <Link
            href="/dao"
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg transition-colors text-sm font-medium"
          >
            Управление DAO
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    ),
  },
];

// Демо-данные курса (в реальности будут из API)
const generatePriceHistory = () => {
  const basePrice = 0.005;
  const history = [];
  const now = Date.now();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now - i * 24 * 60 * 60 * 1000);
    const variation = (Math.random() - 0.5) * 0.0001; // ±0.0001 колебание
    history.push({
      date: date.toISOString().split('T')[0],
      price: basePrice + variation,
    });
  }
  
  return history;
};

export default function VODStabilityDashboard() {
  const [currentPrice, setCurrentPrice] = useState(0.005);
  const [priceHistory, setPriceHistory] = useState(generatePriceHistory());
  const [priceChange, setPriceChange] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Симуляция обновления цены
    const interval = setInterval(() => {
      setIsUpdating(true);
      setTimeout(() => {
        const variation = (Math.random() - 0.5) * 0.00005;
        const newPrice = 0.005 + variation;
        setCurrentPrice(newPrice);
        setPriceChange(((newPrice - 0.005) / 0.005) * 100);
        setIsUpdating(false);
      }, 500);
    }, 30000); // Обновление каждые 30 секунд

    return () => clearInterval(interval);
  }, []);

  const trend = priceChange > 0.01 ? "up" : priceChange < -0.01 ? "down" : "stable";
  const trendIcon = {
    up: TrendingUp,
    down: TrendingDown,
    stable: Minus,
  }[trend];
  const TrendIcon = trendIcon;
  const trendColor = {
    up: "text-emerald-400",
    down: "text-red-400",
    stable: "text-slate-400",
  }[trend];

  const maxPrice = Math.max(...priceHistory.map(h => h.price));
  const minPrice = Math.min(...priceHistory.map(h => h.price));

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
            Стабильность VOD
          </h2>
          <p className="text-slate-400 text-lg">
            Интерактивный дашборд стабильности токена VOD и механизмов поддержания цены
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Current Price */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-8 border border-white/10 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black flex items-center gap-2">
                <DollarSign className="text-emerald-400" size={24} />
                Текущий курс
              </h3>
              {isUpdating && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <RefreshCw size={16} className="text-slate-400" />
                </motion.div>
              )}
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-4xl font-black text-emerald-400 mb-2">
                  ${currentPrice.toFixed(4)}
                </div>
                <div className="text-sm text-slate-400">за 1 VOD</div>
              </div>
              <div className={cn("flex items-center gap-2 text-sm font-medium", trendColor)}>
                <TrendIcon size={16} />
                <span>
                  {priceChange > 0 ? "+" : ""}
                  {priceChange.toFixed(3)}% за 24ч
                </span>
              </div>
              <div className="pt-4 border-t border-white/10">
                <div className="text-xs text-slate-500 mb-2">Базовая цена</div>
                <div className="text-lg font-black text-slate-400">$0.0050</div>
              </div>
            </div>
          </motion.div>

          {/* Price Range */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-8 border border-white/10 rounded-2xl"
          >
            <h3 className="text-lg font-black mb-4 flex items-center gap-2">
              <LineChart className="text-blue-400" size={24} />
              Диапазон (30 дней)
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-slate-400 mb-2">Максимум</div>
                <div className="text-2xl font-black text-emerald-400">
                  ${maxPrice.toFixed(4)}
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-400 mb-2">Минимум</div>
                <div className="text-2xl font-black text-red-400">
                  ${minPrice.toFixed(4)}
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-400 mb-2">Волатильность</div>
                <div className="text-2xl font-black text-slate-400">
                  {((maxPrice - minPrice) / 0.005 * 100).toFixed(2)}%
                </div>
              </div>
            </div>
          </motion.div>

          {/* Water Reserves */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-8 border border-white/10 rounded-2xl"
          >
            <h3 className="text-lg font-black mb-4 flex items-center gap-2">
              <Droplets className="text-cyan-400" size={24} />
              Обеспечение водой
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-slate-400 mb-2">Воды в системе</div>
                <div className="text-2xl font-black text-cyan-400">
                  4.5 млрд м³
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-400 mb-2">Обеспечение VOD</div>
                <div className="text-2xl font-black text-emerald-400">
                  4.5T VOD
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-400 mb-2">Коэффициент</div>
                <div className="text-2xl font-black text-slate-400">
                  1:1
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Price Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 border border-white/10 rounded-2xl mb-8"
        >
          <h3 className="text-xl font-black mb-6 flex items-center gap-2">
            <LineChart className="text-cyan-400" size={24} />
            График курса (последние 30 дней)
          </h3>
          <div className="h-64 relative">
            <svg viewBox="0 0 800 200" className="w-full h-full">
              {/* Grid lines */}
              {[0, 25, 50, 75, 100].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={y * 2}
                  x2="800"
                  y2={y * 2}
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeWidth="1"
                />
              ))}
              
              {/* Price line */}
              <polyline
                points={priceHistory.map((point, index) => {
                  const x = (index / (priceHistory.length - 1)) * 800;
                  const y = 200 - ((point.price - minPrice) / (maxPrice - minPrice)) * 200;
                  return `${x},${y}`;
                }).join(" ")}
                fill="none"
                stroke="#22d3ee"
                strokeWidth="2"
              />
              
              {/* Area under curve */}
              <polygon
                points={`0,200 ${priceHistory.map((point, index) => {
                  const x = (index / (priceHistory.length - 1)) * 800;
                  const y = 200 - ((point.price - minPrice) / (maxPrice - minPrice)) * 200;
                  return `${x},${y}`;
                }).join(" ")} 800,200`}
                fill="url(#gradient)"
                opacity="0.2"
              />
              
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </motion.div>

        {/* Stability Mechanisms */}
        <div>
          <h3 className="text-xl font-black mb-6 flex items-center gap-2">
            <Shield className="text-purple-400" size={24} />
            Механизмы поддержания стабильности
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stabilityMechanisms.map((mechanism, index) => (
              <motion.div
                key={mechanism.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <InfoPopup
                  title={mechanism.name}
                  content={mechanism.details}
                  trigger={
                    <div
                      className={cn(
                        "glass-card p-6 border rounded-2xl cursor-pointer hover:scale-105 transition-all group relative overflow-hidden",
                        mechanism.color === "cyan" && "bg-cyan-500/10 border-cyan-500/30 hover:border-cyan-500/50 text-cyan-400",
                        mechanism.color === "emerald" && "bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500/50 text-emerald-400",
                        mechanism.color === "blue" && "bg-blue-500/10 border-blue-500/30 hover:border-blue-500/50 text-blue-400",
                        mechanism.color === "purple" && "bg-purple-500/10 border-purple-500/30 hover:border-purple-500/50 text-purple-400",
                      )}
                    >
                      <motion.div
                        className={cn(
                          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity",
                          mechanism.color === "cyan" && "bg-gradient-to-br from-cyan-500/10 to-transparent",
                          mechanism.color === "emerald" && "bg-gradient-to-br from-emerald-500/10 to-transparent",
                          mechanism.color === "blue" && "bg-gradient-to-br from-blue-500/10 to-transparent",
                          mechanism.color === "purple" && "bg-gradient-to-br from-purple-500/10 to-transparent",
                        )}
                      />
                      <div className="relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <mechanism.icon size={24} />
                        </div>
                        <h4 className="text-lg font-black mb-2 group-hover:text-white transition-colors">
                          {mechanism.name}
                        </h4>
                        <p className="text-sm text-slate-400 line-clamp-2 group-hover:text-slate-300 transition-colors">
                          {mechanism.description}
                        </p>
                      </div>
                    </div>
                  }
                  size="lg"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

