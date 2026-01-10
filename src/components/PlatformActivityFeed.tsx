"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket, Vote, Activity, UserPlus, Target, Zap,
  ArrowRight, Clock, TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import InfoPopup from "./InfoPopup";

interface ActivityItem {
  id: string;
  type: "project" | "dao" | "iot" | "user" | "mission";
  title: string;
  description: string;
  timestamp: string;
  link: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
}

// Демо-данные активности (в реальности будут из API)
const demoActivities: ActivityItem[] = [
  {
    id: "1",
    type: "project",
    title: "Новый проект в TokenHub",
    description: "Восстановление Аральского моря - Фаза 2",
    timestamp: "5 минут назад",
    link: "/tokenhub/1",
    icon: Rocket,
    color: "emerald",
  },
  {
    id: "2",
    type: "dao",
    title: "Новое голосование в DAO",
    description: "Финансирование системы мониторинга реки Нева",
    timestamp: "12 минут назад",
    link: "/dao",
    icon: Vote,
    color: "purple",
  },
  {
    id: "3",
    type: "iot",
    title: "Новые данные от IoT-датчиков",
    description: "2,456 новых записей из Центральной Азии",
    timestamp: "18 минут назад",
    link: "/dashboard",
    icon: Activity,
    color: "cyan",
  },
  {
    id: "4",
    type: "user",
    title: "Новые пользователи",
    description: "127 новых регистраций за последний час",
    timestamp: "25 минут назад",
    link: "/social",
    icon: UserPlus,
    color: "blue",
  },
  {
    id: "5",
    type: "mission",
    title: "Новая миссия",
    description: "Мониторинг качества воды в реке Волга",
    timestamp: "1 час назад",
    link: "/missions",
    icon: Target,
    color: "amber",
  },
];

export default function PlatformActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>(demoActivities);
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);

  // Симуляция обновления активности
  useEffect(() => {
    const interval = setInterval(() => {
      // В реальности будет запрос к API
      // setActivities(await fetchActivities());
    }, 60000); // Обновление каждую минуту

    return () => clearInterval(interval);
  }, []);

  const getActivityColor = (color: string) => {
    const colors = {
      emerald: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      purple: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      cyan: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      blue: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      amber: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    };
    return colors[color as keyof typeof colors] || colors.cyan;
  };

  return (
    <div className="glass-card p-6 border border-white/10 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-black text-white mb-1 flex items-center gap-2">
            <Zap className="text-cyan-400" size={20} />
            Активность платформы
          </h3>
          <p className="text-sm text-slate-400">События в реальном времени</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Clock size={14} />
          Обновляется каждую минуту
        </div>
      </div>

      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        <AnimatePresence>
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 }}
            >
              <InfoPopup
                title={activity.title}
                content={
                  <div className="space-y-4">
                    <p className="text-sm text-slate-300">{activity.description}</p>
                    <div>
                      <h4 className="font-bold mb-2">Детали:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
                        {activity.type === "project" && (
                          <>
                            <li>ESG-рейтинг: 98</li>
                            <li>Объём инвестиций: $45M</li>
                            <li>Прогресс: 15%</li>
                          </>
                        )}
                        {activity.type === "dao" && (
                          <>
                            <li>Бюджет: 5M VOD</li>
                            <li>Голосов: 1,420</li>
                            <li>Осталось: 2 дня</li>
                          </>
                        )}
                        {activity.type === "iot" && (
                          <>
                            <li>Регион: Центральная Азия</li>
                            <li>Тип данных: Качество воды</li>
                            <li>Покрытие: 245 объектов</li>
                          </>
                        )}
                        {activity.type === "user" && (
                          <>
                            <li>Новые пользователи: 127</li>
                            <li>Активные: 2,456</li>
                            <li>Онлайн: 892</li>
                          </>
                        )}
                        {activity.type === "mission" && (
                          <>
                            <li>Награда: 500 VOD</li>
                            <li>Участников: 12/20</li>
                            <li>Дедлайн: 15 марта 2025</li>
                          </>
                        )}
                      </ul>
                    </div>
                    <div className="pt-4 border-t border-white/10">
                      <Link
                        href={activity.link}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg transition-colors text-sm font-medium"
                      >
                        Перейти
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                }
                trigger={
                  <div
                    className={cn(
                      "p-4 rounded-xl border cursor-pointer hover:scale-[1.02] transition-all group",
                      getActivityColor(activity.color)
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                        getActivityColor(activity.color)
                      )}>
                        <activity.icon size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm mb-1 group-hover:text-white transition-colors">
                          {activity.title}
                        </div>
                        <div className="text-xs text-slate-400 mb-2 line-clamp-2">
                          {activity.description}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Clock size={12} />
                          {activity.timestamp}
                        </div>
                      </div>
                      <ArrowRight
                        size={16}
                        className="text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all shrink-0"
                      />
                    </div>
                  </div>
                }
                size="md"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-6 pt-6 border-t border-white/10">
        <Link
          href="/dashboard"
          className="flex items-center justify-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
        >
          <TrendingUp size={16} />
          Показать все события
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}





