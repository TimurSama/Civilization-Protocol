"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, X, Check, CheckCheck, Trash2, Settings, 
  Vote, Award, MessageSquare, Users, Zap, Target,
  TrendingUp, AlertTriangle, Info, Gift, Star
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

const translations = {
  ru: {
    title: "Уведомления",
    markAllRead: "Отметить все как прочитанные",
    clearAll: "Очистить все",
    settings: "Настройки",
    noNotifications: "Нет новых уведомлений",
    all: "Все",
    unread: "Непрочитанные",
    dao: "DAO",
    social: "Социальные",
    rewards: "Награды",
    system: "Система",
    justNow: "только что",
    minutesAgo: "мин. назад",
    hoursAgo: "ч. назад",
    daysAgo: "дн. назад"
  },
  en: {
    title: "Notifications",
    markAllRead: "Mark all as read",
    clearAll: "Clear all",
    settings: "Settings",
    noNotifications: "No new notifications",
    all: "All",
    unread: "Unread",
    dao: "DAO",
    social: "Social",
    rewards: "Rewards",
    system: "System",
    justNow: "just now",
    minutesAgo: "min ago",
    hoursAgo: "h ago",
    daysAgo: "d ago"
  },
  ar: {
    title: "الإشعارات",
    markAllRead: "تحديد الكل كمقروء",
    clearAll: "مسح الكل",
    settings: "الإعدادات",
    noNotifications: "لا توجد إشعارات جديدة",
    all: "الكل",
    unread: "غير مقروء",
    dao: "DAO",
    social: "اجتماعي",
    rewards: "المكافآت",
    system: "النظام",
    justNow: "الآن",
    minutesAgo: "دقيقة مضت",
    hoursAgo: "ساعة مضت",
    daysAgo: "يوم مضى"
  }
};

interface Notification {
  id: string;
  type: "dao" | "social" | "rewards" | "system";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  link?: string;
  icon?: string;
  priority?: "low" | "medium" | "high";
}

// Demo notifications
const demoNotifications: Notification[] = [
  {
    id: "1",
    type: "dao",
    title: "Новое голосование",
    message: "DAO Proposal #VOD-125: Финансирование проекта в Таджикистане открыто для голосования",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
    link: "/dao",
    priority: "high"
  },
  {
    id: "2",
    type: "rewards",
    title: "Награда получена!",
    message: "Вы получили 150 VOD за выполнение миссии 'Первый отчёт'",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: false,
    link: "/rewards",
    priority: "medium"
  },
  {
    id: "3",
    type: "social",
    title: "Новый подписчик",
    message: "Alex_Tech теперь подписан на вас",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false,
    link: "/social/friends"
  },
  {
    id: "4",
    type: "dao",
    title: "Результаты голосования",
    message: "Proposal #VOD-124 принят! 78% поддержали инициативу",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    read: true,
    link: "/dao"
  },
  {
    id: "5",
    type: "system",
    title: "Обновление платформы",
    message: "Добавлены новые функции в Dashboard и улучшена производительность",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    read: true
  },
  {
    id: "6",
    type: "rewards",
    title: "Новый уровень!",
    message: "Поздравляем! Вы достигли уровня 'Исследователь' (Level 5)",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    read: true,
    link: "/profile"
  },
  {
    id: "7",
    type: "social",
    title: "Упоминание в обсуждении",
    message: "Eco_Guard упомянул вас в теме 'Мониторинг водных ресурсов'",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    read: true,
    link: "/social"
  },
];

const iconMap = {
  dao: Vote,
  social: Users,
  rewards: Gift,
  system: Info,
};

const colorMap = {
  dao: "text-purple-400 bg-purple-500/10",
  social: "text-cyan-400 bg-cyan-500/10",
  rewards: "text-yellow-400 bg-yellow-500/10",
  system: "text-slate-400 bg-slate-500/10",
};

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.ru;
  
  const [notifications, setNotifications] = useState<Notification[]>(demoNotifications);
  const [filter, setFilter] = useState<"all" | "unread" | "dao" | "social" | "rewards" | "system">("all");

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications.filter(n => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.read;
    return n.type === filter;
  });

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return t.justNow;
    if (diffMins < 60) return `${diffMins} ${t.minutesAgo}`;
    if (diffHours < 24) return `${diffHours} ${t.hoursAgo}`;
    return `${diffDays} ${t.daysAgo}`;
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-[80]"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="absolute right-0 top-0 h-full w-full max-w-md glass border-l border-white/10"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Bell className="text-cyan-glow" size={24} />
                  <h2 className="text-xl font-bold">{t.title}</h2>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg">
                  <X size={20} />
                </button>
              </div>

              {/* Filter tabs */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {(["all", "unread", "dao", "social", "rewards", "system"] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors",
                      filter === f 
                        ? "bg-cyan-glow text-ocean-deep font-bold" 
                        : "bg-white/5 hover:bg-white/10"
                    )}
                  >
                    {t[f as keyof typeof t]}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="p-2 border-b border-white/10 flex gap-2">
              <button
                onClick={markAllAsRead}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-white/5 rounded-lg hover:bg-white/10"
              >
                <CheckCheck size={14} /> {t.markAllRead}
              </button>
              <button
                onClick={clearAll}
                className="flex items-center justify-center gap-2 px-3 py-2 text-sm bg-white/5 rounded-lg hover:bg-red-500/20 text-red-400"
              >
                <Trash2 size={14} />
              </button>
              <button className="flex items-center justify-center gap-2 px-3 py-2 text-sm bg-white/5 rounded-lg hover:bg-white/10">
                <Settings size={14} />
              </button>
            </div>

            {/* Notifications list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2" style={{ maxHeight: "calc(100vh - 180px)" }}>
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="mx-auto mb-4 text-slate-500" size={48} />
                  <p className="text-slate-400">{t.noNotifications}</p>
                </div>
              ) : (
                filteredNotifications.map(notification => {
                  const Icon = iconMap[notification.type];
                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className={cn(
                        "p-4 rounded-xl transition-colors relative group",
                        notification.read ? "bg-white/5" : "bg-white/10 border border-cyan-glow/20"
                      )}
                    >
                      <div className="flex gap-3">
                        {/* Icon */}
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                          colorMap[notification.type]
                        )}>
                          <Icon size={20} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className={cn(
                              "font-medium text-sm",
                              !notification.read && "text-white"
                            )}>
                              {notification.title}
                            </h4>
                            <span className="text-xs text-slate-500 whitespace-nowrap">
                              {formatTime(notification.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-slate-400 mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          
                          {/* Priority indicator */}
                          {notification.priority === "high" && (
                            <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded">
                              <AlertTriangle size={10} /> Важно
                            </span>
                          )}

                          {/* Link */}
                          {notification.link && (
                            <Link
                              href={notification.link}
                              onClick={onClose}
                              className="inline-block mt-2 text-xs text-cyan-glow hover:underline"
                            >
                              Подробнее →
                            </Link>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1.5 hover:bg-white/10 rounded-lg"
                              title="Отметить как прочитанное"
                            >
                              <Check size={14} className="text-emerald-400" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1.5 hover:bg-red-500/20 rounded-lg"
                            title="Удалить"
                          >
                            <Trash2 size={14} className="text-red-400" />
                          </button>
                        </div>
                      </div>

                      {/* Unread indicator */}
                      {!notification.read && (
                        <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-glow" />
                      )}
                    </motion.div>
                  );
                })
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
























