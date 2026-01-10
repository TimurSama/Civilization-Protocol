"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users, Droplets, TrendingUp, AlertTriangle,
  Globe, Activity, MapPin, BarChart3
} from "lucide-react";
import StatisticCard from "./StatisticCard";
import InfoPopup from "./InfoPopup";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface GlobalMetric {
  id: string;
  value: string | number;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  color: string;
  source: { name: string; url?: string; year?: number };
  popupContent: React.ReactNode;
  linkTo?: string;
}

// Данные глобальных метрик (будут обновляться из API)
const globalMetricsData: GlobalMetric[] = [
  {
    id: "no-access",
    value: "2.2B",
    label: "Люди без доступа к чистой воде",
    icon: Users,
    trend: "down",
    trendValue: "-5% за год",
    color: "rose",
    source: { name: "WHO/UNICEF", url: "https://www.who.int", year: 2023 },
    popupContent: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          По данным ВОЗ и ЮНИСЕФ, 2.2 миллиарда человек во всём мире не имеют доступа к безопасно управляемым услугам водоснабжения.
        </p>
        <div>
          <h4 className="font-bold mb-2">Региональная разбивка:</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span>Африка к югу от Сахары:</span>
              <span className="font-bold text-rose-400">418 млн</span>
            </li>
            <li className="flex justify-between">
              <span>Центральная и Южная Азия:</span>
              <span className="font-bold text-rose-400">610 млн</span>
            </li>
            <li className="flex justify-between">
              <span>Восточная и Юго-Восточная Азия:</span>
              <span className="font-bold text-rose-400">456 млн</span>
            </li>
            <li className="flex justify-between">
              <span>Латинская Америка и Карибы:</span>
              <span className="font-bold text-rose-400">106 млн</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Тренд:</h4>
          <p className="text-sm text-slate-400">
            За последний год количество людей без доступа к чистой воде снизилось на 5%, 
            но прогресс замедляется из-за роста населения и климатических изменений.
          </p>
        </div>
        <div className="pt-4 border-t border-white/10">
          <Link
            href="/map?filter=water-access"
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg transition-colors text-sm font-medium"
          >
            <MapPin size={16} />
            Открыть на карте
          </Link>
        </div>
      </div>
    ),
    linkTo: "/map?filter=water-access",
  },
  {
    id: "market-size",
    value: "$8.6T",
    label: "Объём мирового водного рынка к 2030",
    icon: TrendingUp,
    trend: "up",
    trendValue: "+8.5% CAGR",
    color: "emerald",
    source: { name: "Global Water Intelligence", url: "https://www.globalwaterintel.com", year: 2024 },
    popupContent: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          Глобальный рынок водных ресурсов растёт со среднегодовым темпом роста (CAGR) 8.5% 
          и достигнет $8.6 триллионов к 2030 году.
        </p>
        <div>
          <h4 className="font-bold mb-2">Сегменты рынка:</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span>Водоснабжение и очистка:</span>
              <span className="font-bold text-emerald-400">$2.1T</span>
            </li>
            <li className="flex justify-between">
              <span>Управление сточными водами:</span>
              <span className="font-bold text-emerald-400">$1.8T</span>
            </li>
            <li className="flex justify-between">
              <span>Ирригация и сельское хозяйство:</span>
              <span className="font-bold text-emerald-400">$1.5T</span>
            </li>
            <li className="flex justify-between">
              <span>Промышленное использование:</span>
              <span className="font-bold text-emerald-400">$1.2T</span>
            </li>
            <li className="flex justify-between">
              <span>Технологии и инновации:</span>
              <span className="font-bold text-emerald-400">$2.0T</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Прогноз роста:</h4>
          <p className="text-sm text-slate-400">
            Ожидается, что наибольший рост будет в сегменте технологий и инноваций, 
            включая IoT, AI и блокчейн-решения для управления водными ресурсами.
          </p>
        </div>
        <div className="pt-4 border-t border-white/10">
          <Link
            href="/tokenomics"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg transition-colors text-sm font-medium"
          >
            <BarChart3 size={16} />
            Изучить экономическую модель
          </Link>
        </div>
      </div>
    ),
    linkTo: "/tokenomics",
  },
  {
    id: "water-deficit",
    value: "40%",
    label: "Дефицит воды к 2030 году",
    icon: AlertTriangle,
    trend: "up",
    trendValue: "+15% к 2024",
    color: "amber",
    source: { name: "UN Water", url: "https://www.unwater.org", year: 2023 },
    popupContent: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          К 2030 году ожидается глобальный дефицит воды в 40% при текущих темпах потребления 
          и без принятия срочных мер по сохранению и оптимизации.
        </p>
        <div>
          <h4 className="font-bold mb-2">Региональная разбивка дефицита:</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span>Ближний Восток и Северная Африка:</span>
              <span className="font-bold text-amber-400">85%</span>
            </li>
            <li className="flex justify-between">
              <span>Центральная Азия:</span>
              <span className="font-bold text-amber-400">60%</span>
            </li>
            <li className="flex justify-between">
              <span>Южная Азия:</span>
              <span className="font-bold text-amber-400">50%</span>
            </li>
            <li className="flex justify-between">
              <span>Африка к югу от Сахары:</span>
              <span className="font-bold text-amber-400">45%</span>
            </li>
            <li className="flex justify-between">
              <span>Европа:</span>
              <span className="font-bold text-emerald-400">15%</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Факторы дефицита:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li>Рост населения (ожидается +2 млрд к 2050)</li>
            <li>Урбанизация (68% населения в городах к 2050)</li>
            <li>Изменение климата (засухи, наводнения)</li>
            <li>Загрязнение водных источников</li>
            <li>Неэффективное использование воды</li>
          </ul>
        </div>
        <div className="pt-4 border-t border-white/10">
          <Link
            href="/map?filter=deficit"
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 rounded-lg transition-colors text-sm font-medium"
          >
            <MapPin size={16} />
            Открыть на карте
          </Link>
        </div>
      </div>
    ),
    linkTo: "/map?filter=deficit",
  },
  {
    id: "climate-migrants",
    value: "700M",
    label: "Климатических мигрантов к 2030",
    icon: Globe,
    trend: "up",
    trendValue: "+200M к 2024",
    color: "purple",
    source: { name: "World Bank", url: "https://www.worldbank.org", year: 2023 },
    popupContent: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          К 2030 году ожидается до 700 миллионов климатических мигрантов, 
          многие из которых будут вынуждены покинуть свои дома из-за водного кризиса.
        </p>
        <div>
          <h4 className="font-bold mb-2">Регионы с наибольшим риском:</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span>Африка к югу от Сахары:</span>
              <span className="font-bold text-purple-400">250M</span>
            </li>
            <li className="flex justify-between">
              <span>Южная Азия:</span>
              <span className="font-bold text-purple-400">180M</span>
            </li>
            <li className="flex justify-between">
              <span>Латинская Америка:</span>
              <span className="font-bold text-purple-400">120M</span>
            </li>
            <li className="flex justify-between">
              <span>Ближний Восток:</span>
              <span className="font-bold text-purple-400">80M</span>
            </li>
            <li className="flex justify-between">
              <span>Центральная Азия:</span>
              <span className="font-bold text-purple-400">70M</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Основные причины:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li>Засухи и нехватка воды для сельского хозяйства</li>
            <li>Наводнения и подтопления</li>
            <li>Деградация почв из-за нехватки воды</li>
            <li>Конфликты из-за водных ресурсов</li>
          </ul>
        </div>
        <div className="pt-4 border-t border-white/10">
          <Link
            href="/presentations/diplomatic"
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg transition-colors text-sm font-medium"
          >
            <Globe size={16} />
            Узнать о решениях CivilizationProtocol
          </Link>
        </div>
      </div>
    ),
    linkTo: "/presentations/diplomatic",
  },
  {
    id: "water-quality",
    value: "72",
    label: "Глобальный индекс качества воды",
    icon: Activity,
    trend: "stable",
    trendValue: "±0 за год",
    color: "blue",
    source: { name: "CivilizationProtocol Platform", year: 2024 },
    popupContent: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          Глобальный индекс качества воды CivilizationProtocol составляет 72 из 100, 
          что указывает на средний уровень качества воды во всём мире.
        </p>
        <div>
          <h4 className="font-bold mb-2">Региональные показатели:</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span>Европа:</span>
              <span className="font-bold text-emerald-400">92</span>
            </li>
            <li className="flex justify-between">
              <span>Северная Америка:</span>
              <span className="font-bold text-emerald-400">88</span>
            </li>
            <li className="flex justify-between">
              <span>Азия:</span>
              <span className="font-bold text-amber-400">75</span>
            </li>
            <li className="flex justify-between">
              <span>Центральная Азия:</span>
              <span className="font-bold text-amber-400">72</span>
            </li>
            <li className="flex justify-between">
              <span>Африка:</span>
              <span className="font-bold text-rose-400">52</span>
            </li>
            <li className="flex justify-between">
              <span>Ближний Восток:</span>
              <span className="font-bold text-rose-400">68</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Критерии оценки:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li>Химический состав (pH, минералы, загрязнители)</li>
            <li>Бактериологическая безопасность</li>
            <li>Доступность и инфраструктура</li>
            <li>Управление и мониторинг</li>
          </ul>
        </div>
        <div className="pt-4 border-t border-white/10">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors text-sm font-medium"
          >
            <Activity size={16} />
            Открыть Dashboard
          </Link>
        </div>
      </div>
    ),
    linkTo: "/dashboard",
  },
  {
    id: "water-losses",
    value: "30%",
    label: "Потери воды в инфраструктуре",
    icon: Droplets,
    trend: "down",
    trendValue: "-5% за 5 лет",
    color: "cyan",
    source: { name: "International Water Association", year: 2023 },
    popupContent: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          В среднем по миру теряется 30% воды из-за протечек, устаревшей инфраструктуры 
          и неэффективного управления. Это эквивалентно $500 миллиардам в год.
        </p>
        <div>
          <h4 className="font-bold mb-2">Региональная разбивка потерь:</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span>Развивающиеся страны:</span>
              <span className="font-bold text-rose-400">45-60%</span>
            </li>
            <li className="flex justify-between">
              <span>Развитые страны:</span>
              <span className="font-bold text-amber-400">15-25%</span>
            </li>
            <li className="flex justify-between">
              <span>Центральная Азия:</span>
              <span className="font-bold text-rose-400">30-40%</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Основные причины потерь:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li>Устаревшие трубопроводы (протечки)</li>
            <li>Неэффективные насосные станции</li>
            <li>Отсутствие мониторинга в реальном времени</li>
            <li>Недостаточное обслуживание инфраструктуры</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Решения CivilizationProtocol:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li>IoT-мониторинг для раннего обнаружения протечек</li>
            <li>AI-оптимизация работы насосных станций</li>
            <li>Предиктивное обслуживание инфраструктуры</li>
            <li>Прозрачность данных через блокчейн</li>
          </ul>
        </div>
        <div className="pt-4 border-t border-white/10">
          <Link
            href="/presentations/ecology-transformation"
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg transition-colors text-sm font-medium"
          >
            <Droplets size={16} />
            Узнать о трансформации
          </Link>
        </div>
      </div>
    ),
    linkTo: "/presentations/ecology-transformation",
  },
];

export default function GlobalMetricsSection() {
  const [metrics, setMetrics] = useState(globalMetricsData);

  // Симуляция обновления данных (в реальности будет API)
  useEffect(() => {
    const interval = setInterval(() => {
      // Обновление метрик каждые 5 минут
      setMetrics(prev => prev.map(metric => {
        // Симуляция небольших изменений
        if (typeof metric.value === "string" && metric.value.includes("B")) {
          // Для демонстрации - в реальности данные будут из API
          return metric;
        }
        return metric;
      }));
    }, 300000); // 5 минут

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Глобальные метрики протокола цивилизации
          </h2>
          <p className="text-slate-400 text-lg">
            Реальные данные о состоянии экосистемы CivilizationProtocol и её влиянии на планету
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <StatisticCard
                value={metric.value}
                label={metric.label}
                icon={metric.icon}
                trend={metric.trend}
                trendValue={metric.trendValue}
                source={metric.source}
                popupContent={metric.popupContent}
                className={cn(
                  "cursor-pointer hover:scale-105 transition-transform",
                  metric.color === "rose" && "border-rose-500/30 hover:border-rose-500/50",
                  metric.color === "emerald" && "border-emerald-500/30 hover:border-emerald-500/50",
                  metric.color === "amber" && "border-amber-500/30 hover:border-amber-500/50",
                  metric.color === "purple" && "border-purple-500/30 hover:border-purple-500/50",
                  metric.color === "blue" && "border-blue-500/30 hover:border-blue-500/50",
                  metric.color === "cyan" && "border-cyan-500/30 hover:border-cyan-500/50",
                )}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

