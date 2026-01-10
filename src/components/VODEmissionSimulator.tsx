"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Droplets, Calculator, TrendingUp, Info, ArrowRight,
  BarChart3, LineChart, Zap, Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import InfoPopup from "./InfoPopup";
import Link from "next/link";

// Константы для расчёта эмиссии
const EMISSION_RATE_PER_M3 = 1000; // VOD за м³ воды
const MAX_DAILY_EMISSION = 1000000; // Максимальная эмиссия в день
const CURRENT_WATER_DATA = 4500000; // Текущий объём данных в м³
const CURRENT_VOD_SUPPLY = 4500000000; // Текущее предложение VOD

interface EmissionData {
  waterVolume: number; // м³
  vodEmitted: number;
  dailyEmission: number;
  monthlyEmission: number;
  annualEmission: number;
}

export default function VODEmissionSimulator() {
  const [waterVolume, setWaterVolume] = useState(CURRENT_WATER_DATA);
  const [emissionData, setEmissionData] = useState<EmissionData | null>(null);

  useEffect(() => {
    calculateEmission();
  }, [waterVolume]);

  const calculateEmission = () => {
    // Формула эмиссии: VOD = (объём воды в м³) × коэффициент эмиссии
    const vodEmitted = Math.min(waterVolume * EMISSION_RATE_PER_M3, MAX_DAILY_EMISSION);
    const dailyEmission = vodEmitted;
    const monthlyEmission = dailyEmission * 30;
    const annualEmission = dailyEmission * 365;

    setEmissionData({
      waterVolume,
      vodEmitted,
      dailyEmission,
      monthlyEmission,
      annualEmission,
    });
  };

  const formatNumber = (num: number): string => {
    if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
    return num.toFixed(0);
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
          <h2 className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Механизмы эмиссии VOD
          </h2>
          <p className="text-slate-400 text-lg">
            Интерактивный симулятор эмиссии токенов VOD на основе данных о воде
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Simulator */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 border border-white/10 rounded-2xl"
          >
            <h3 className="text-xl font-black mb-6 flex items-center gap-2">
              <Calculator className="text-cyan-400" size={24} />
              Симулятор эмиссии
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Объём данных о воде (м³)
                </label>
                <input
                  type="number"
                  value={waterVolume}
                  onChange={(e) => setWaterVolume(Number(e.target.value))}
                  min={0}
                  max={10000000}
                  step={1000}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white font-bold text-lg focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
                <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                  <span>Текущий объём: {formatNumber(CURRENT_WATER_DATA)} м³</span>
                  <span>Максимум: {formatNumber(10000000)} м³</span>
                </div>
              </div>

              {emissionData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl">
                    <div className="text-sm text-cyan-400 mb-2">Эмитировано VOD</div>
                    <div className="text-3xl font-black text-cyan-400">
                      {formatNumber(emissionData.vodEmitted)}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-3 bg-slate-800/50 rounded-lg">
                      <div className="text-xs text-slate-500 mb-1">В день</div>
                      <div className="text-lg font-black">
                        {formatNumber(emissionData.dailyEmission)}
                      </div>
                    </div>
                    <div className="p-3 bg-slate-800/50 rounded-lg">
                      <div className="text-xs text-slate-500 mb-1">В месяц</div>
                      <div className="text-lg font-black">
                        {formatNumber(emissionData.monthlyEmission)}
                      </div>
                    </div>
                    <div className="p-3 bg-slate-800/50 rounded-lg">
                      <div className="text-xs text-slate-500 mb-1">В год</div>
                      <div className="text-lg font-black">
                        {formatNumber(emissionData.annualEmission)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <InfoPopup
                title="Формула эмиссии VOD"
                content={
                  <div className="space-y-4">
                    <p className="text-sm text-slate-300">
                      Эмиссия токенов VOD происходит автоматически при добавлении данных о воде в систему.
                    </p>
                    <div>
                      <h4 className="font-bold mb-2">Формула:</h4>
                      <div className="p-4 bg-slate-800/50 rounded-lg font-mono text-sm">
                        VOD = (Объём воды в м³) × {EMISSION_RATE_PER_M3}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Ограничения:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
                        <li>Максимальная эмиссия в день: {formatNumber(MAX_DAILY_EMISSION)} VOD</li>
                        <li>Эмиссия происходит только при верификации данных через AI</li>
                        <li>Данные должны быть записаны в блокчейн</li>
                        <li>Эмиссия контролируется смарт-контрактом</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Механизмы контроля:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
                        <li>Верификация данных через AI перед эмиссией</li>
                        <li>Ограничение максимальной эмиссии в день</li>
                        <li>Прозрачность всех эмиссий в блокчейне</li>
                        <li>Голосование DAO для изменения параметров</li>
                      </ul>
                    </div>
                    <div className="pt-4 border-t border-white/10">
                      <Link
                        href="/whitepaper"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg transition-colors text-sm font-medium"
                      >
                        Читать White Paper
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                }
                trigger={
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg transition-colors text-sm font-medium">
                    <Info size={16} />
                    Подробнее о механизме эмиссии
                  </button>
                }
                size="lg"
              />
            </div>
          </motion.div>

          {/* Current Status & Graph */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass-card p-8 border border-white/10 rounded-2xl">
              <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                <Activity className="text-emerald-400" size={24} />
                Текущий статус
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-slate-800/50 rounded-xl">
                  <div className="text-sm text-slate-400 mb-2">Объём данных в системе</div>
                  <div className="text-2xl font-black text-white">
                    {formatNumber(CURRENT_WATER_DATA)} м³
                  </div>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-xl">
                  <div className="text-sm text-slate-400 mb-2">Текущее предложение VOD</div>
                  <div className="text-2xl font-black text-emerald-400">
                    {formatNumber(CURRENT_VOD_SUPPLY)} VOD
                  </div>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-xl">
                  <div className="text-sm text-slate-400 mb-2">Средняя эмиссия в день</div>
                  <div className="text-2xl font-black text-cyan-400">
                    {formatNumber((CURRENT_WATER_DATA * EMISSION_RATE_PER_M3) / 365)} VOD
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 border border-white/10 rounded-2xl">
              <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                <LineChart className="text-blue-400" size={24} />
                Прогноз эмиссии
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((year) => {
                    const projectedVolume = CURRENT_WATER_DATA * (1 + 0.2 * year);
                    const projectedEmission = projectedVolume * EMISSION_RATE_PER_M3;
                    return (
                      <div key={year} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                        <span className="text-sm font-medium">
                          Через {year} {year === 1 ? "год" : year < 5 ? "года" : "лет"}
                        </span>
                        <span className="font-black text-cyan-400">
                          {formatNumber(projectedEmission)} VOD
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Прогноз основан на росте 20% в год</span>
                    <TrendingUp className="text-emerald-400" size={16} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}





