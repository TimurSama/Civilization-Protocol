"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users, FolderKanban, Database, Radio, Activity,
  ArrowRight, Globe, Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import LiveMetric from "./LiveMetric";
import Globe3D from "./Globe3D";

interface PlatformMetrics {
  activeUsers: number;
  projects: number;
  blockchainData: number; // TB
  iotSensors: number;
  waterQuality: number; // индекс 0-100
}

// Демо-данные (в реальности будут из API)
const initialMetrics: PlatformMetrics = {
  activeUsers: 12456,
  projects: 23,
  blockchainData: 4.2,
  iotSensors: 2456,
  waterQuality: 72,
};

export default function PlatformHeroSection() {
  const [metrics, setMetrics] = useState<PlatformMetrics>(initialMetrics);

  // Симуляция обновления метрик (в реальности будет WebSocket или polling)
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10),
        projects: prev.projects,
        blockchainData: prev.blockchainData + Math.random() * 0.01,
        iotSensors: prev.iotSensors + Math.floor(Math.random() * 5),
        waterQuality: Math.max(0, Math.min(100, prev.waterQuality + (Math.random() - 0.5) * 2)),
      }));
    }, 30000); // Обновление каждые 30 секунд

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden py-20">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep via-ocean-deep/90 to-ocean-deep z-10" />
        <div className="absolute inset-0 opacity-30">
          <Globe3D />
        </div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Title and Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 mb-4">
              <Zap className="text-cyan-400" size={16} />
              <span className="text-sm font-medium text-cyan-400">Децентрализованная платформа</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                CivilizationProtocol
              </span>
              <br />
              <span className="text-white">Управление водными ресурсами</span>
            </h1>

            <p className="text-xl text-slate-300 leading-relaxed">
              Децентрализованная кибер-физическая платформа для прозрачного, 
              основанного на данных управления водными ресурсами через блокчейн, 
              IoT и AI-технологии.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/interactive-presentation"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 text-ocean-deep font-black rounded-xl hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 hover:scale-105"
              >
                Исследовать платформу
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 glass border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-all"
              >
                <Globe size={20} />
                Открыть Dashboard
              </Link>
            </div>
          </motion.div>

          {/* Right: Live Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <LiveMetric
              value={metrics.activeUsers}
              label="Активных пользователей"
              icon={<Users size={24} />}
              color="cyan"
              trend="up"
              trendValue="+127 за час"
              animate={true}
            />
            <LiveMetric
              value={metrics.projects}
              label="Проектов в TokenHub"
              icon={<FolderKanban size={24} />}
              color="emerald"
              trend="up"
              trendValue="+2 за неделю"
              animate={true}
            />
            <LiveMetric
              value={metrics.blockchainData}
              label="Данных в блокчейне"
              unit="TB"
              icon={<Database size={24} />}
              color="blue"
              trend="up"
              trendValue="+0.1 TB/день"
              animate={true}
            />
            <LiveMetric
              value={metrics.iotSensors}
              label="IoT-датчиков онлайн"
              icon={<Radio size={24} />}
              color="purple"
              trend="up"
              trendValue="+5 за час"
              animate={true}
            />
            <LiveMetric
              value={Math.round(metrics.waterQuality)}
              label="Качество воды"
              unit="/100"
              icon={<Activity size={24} />}
              color="amber"
              trend="stable"
              trendValue="±0"
              animate={true}
              className="col-span-2"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

