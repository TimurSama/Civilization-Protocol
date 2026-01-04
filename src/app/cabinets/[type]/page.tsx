"use client";

import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  User, Building2, HardHat, TrendingUp, Beaker, Settings, ShieldCheck,
  Droplets, Zap, Activity, Globe, MapPin, BarChart3, FileText, Users,
  AlertTriangle, CheckCircle2, Download, Search, Plus,
  Wallet, Target, Award, MessageSquare, Bell, Cpu, Database,
  Eye, Lock, Wrench,
  Waves, Leaf, History, Cog, Info, Edit, Save, LogIn
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

// Multilingual cabinet translations
const cabinetTranslations: Record<string, Record<string, string>> = {
  en: {
    viewMode: "View Mode",
    viewModeDesc: "You are viewing the cabinet in demo mode. Sign in and verify to access full functionality.",
    signIn: "Sign In",
    verify: "Verify Account",
    getFullAccess: "Get Full Access",
    quickActions: "Quick Actions",
    createReport: "Create Report",
    exportData: "Export Data",
    daoVoting: "DAO Voting",
    recentEvents: "Recent Events",
    needHelp: "Need Help?",
    docsAvailable: "Documentation and support available 24/7",
    openDocs: "Open Documentation",
    cabinetNotFound: "Cabinet not found",
    backToCabinets: "Back to Cabinets",
    active: "Active",
    search: "Search...",
    export: "Export"
  },
  ru: {
    viewMode: "Режим просмотра",
    viewModeDesc: "Вы просматриваете кабинет в демо-режиме. Войдите и пройдите верификацию для полного доступа.",
    signIn: "Войти",
    verify: "Верифицировать",
    getFullAccess: "Получить полный доступ",
    quickActions: "Быстрые действия",
    createReport: "Создать отчёт",
    exportData: "Экспорт данных",
    daoVoting: "Голосование DAO",
    recentEvents: "Последние события",
    needHelp: "Нужна помощь?",
    docsAvailable: "Документация и поддержка доступны 24/7",
    openDocs: "Открыть документацию",
    cabinetNotFound: "Кабинет не найден",
    backToCabinets: "К списку кабинетов",
    active: "Активен",
    search: "Поиск...",
    export: "Экспорт"
  },
  ar: {
    viewMode: "وضع العرض",
    viewModeDesc: "أنت تشاهد المكتب في الوضع التجريبي. قم بتسجيل الدخول والتحقق للوصول الكامل.",
    signIn: "تسجيل الدخول",
    verify: "تحقق من الحساب",
    getFullAccess: "الحصول على وصول كامل",
    quickActions: "إجراءات سريعة",
    createReport: "إنشاء تقرير",
    exportData: "تصدير البيانات",
    daoVoting: "تصويت DAO",
    recentEvents: "الأحداث الأخيرة",
    needHelp: "هل تحتاج مساعدة؟",
    docsAvailable: "التوثيق والدعم متاح على مدار الساعة",
    openDocs: "فتح التوثيق",
    cabinetNotFound: "المكتب غير موجود",
    backToCabinets: "العودة إلى المكاتب",
    active: "نشط",
    search: "بحث...",
    export: "تصدير"
  }
};

// Cabinet configurations with full content
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cabinetConfigs: Record<string, any> = {
  citizen: {
    title: "Гражданский кабинет",
    icon: User,
    color: "cyan",
    description: "Мониторинг качества воды, участие в DAO и персональная экологическая статистика",
    stats: [
      { label: "VOD Balance", value: "2,450", icon: Wallet, change: "+120" },
      { label: "Рейтинг", value: "Gold", icon: Award, change: "↑2" },
      { label: "Отчёты", value: "15", icon: FileText, change: "+3" },
      { label: "XP", value: "12,800", icon: Zap, change: "+500" }
    ],
    tabs: [
      { id: "monitor", label: "Мониторинг", icon: Activity },
      { id: "reports", label: "Мои отчёты", icon: FileText },
      { id: "missions", label: "Миссии", icon: Target },
      { id: "achievements", label: "Достижения", icon: Award }
    ],
    modules: {
      monitor: [
        { title: "Качество воды рядом", value: "92%", status: "good", location: "Ташкент", trend: "+2%", sensors: 12 },
        { title: "pH уровень", value: "7.2", status: "good", location: "Ваш район", trend: "0", sensors: 5 },
        { title: "Загрязнение", value: "Низкое", status: "good", location: "Регион", trend: "-5%", sensors: 8 },
        { title: "Температура", value: "18°C", status: "normal", location: "Река Чирчик", trend: "+1°", sensors: 3 },
        { title: "Уровень воды", value: "Норма", status: "good", location: "Водохранилище", trend: "+10см", sensors: 4 },
        { title: "Минерализация", value: "280 ppm", status: "good", location: "Ваш район", trend: "-2%", sensors: 2 }
      ],
      reports: [
        { id: 1, title: "Отчёт о качестве воды #127", date: "2024-12-25", status: "verified", reward: 50, views: 234 },
        { id: 2, title: "Анализ pH в р. Чирчик", date: "2024-12-20", status: "pending", reward: 30, views: 89 },
        { id: 3, title: "Загрязнение промзоны #45", date: "2024-12-15", status: "verified", reward: 100, views: 567 },
        { id: 4, title: "Мониторинг артезианских скважин", date: "2024-12-10", status: "rejected", reward: 0, views: 45 },
        { id: 5, title: "Сезонный анализ качества", date: "2024-12-05", status: "verified", reward: 75, views: 321 }
      ],
      missions: [
        { title: "Отправить первый отчёт", reward: "100 VOD", progress: 100, status: "completed", xp: 500 },
        { title: "Проголосовать в DAO", reward: "50 VOD", progress: 80, status: "active", xp: 250 },
        { title: "Пригласить 5 друзей", reward: "250 VOD", progress: 60, status: "active", xp: 750 },
        { title: "Достичь Gold рейтинга", reward: "500 VOD", progress: 100, status: "completed", xp: 1000 },
        { title: "Провести 10 замеров", reward: "150 VOD", progress: 40, status: "active", xp: 400 },
        { title: "Верифицировать профиль", reward: "200 VOD", progress: 100, status: "completed", xp: 300 }
      ],
      achievements: [
        { title: "Первопроходец", description: "Первый отчёт в системе", icon: "🌟", earned: true, date: "2024-01-15" },
        { title: "Эко-воин", description: "50 отчётов о качестве воды", icon: "⚔️", earned: true, date: "2024-06-20" },
        { title: "Золотой статус", description: "Достигнут Gold рейтинг", icon: "🥇", earned: true, date: "2024-10-01" },
        { title: "Влиятельный", description: "100 голосов в DAO", icon: "🗳️", earned: false, progress: 78 },
        { title: "Наставник", description: "Пригласить 10 новых участников", icon: "👥", earned: false, progress: 50 },
        { title: "Исследователь", description: "Проанализировать 20 источников воды", icon: "🔬", earned: false, progress: 35 }
      ]
    }
  },
  government: {
    title: "Правительственный кабинет",
    icon: Building2,
    color: "blue",
    description: "Управление политиками, межрегиональная координация и кризисное реагирование",
    stats: [
      { label: "Активные политики", value: "156", icon: FileText, change: "+12" },
      { label: "SDG Compliance", value: "94%", icon: Target, change: "+2%" },
      { label: "Регионы", value: "24", icon: MapPin, change: "" },
      { label: "Кризисы", value: "0", icon: AlertTriangle, change: "-1" }
    ],
    tabs: [
      { id: "dashboard", label: "Обзор", icon: BarChart3 },
      { id: "policies", label: "Политики", icon: FileText },
      { id: "crisis", label: "Кризис-центр", icon: AlertTriangle },
      { id: "reports", label: "SDG Отчёты", icon: Target }
    ],
    modules: {
      dashboard: [
        { region: "Ташкент", status: "normal", quality: 92, alerts: 0, population: "2.8M", budget: "$45M" },
        { region: "Самарканд", status: "warning", quality: 78, alerts: 2, population: "540K", budget: "$12M" },
        { region: "Бухара", status: "normal", quality: 88, alerts: 0, population: "280K", budget: "$8M" },
        { region: "Фергана", status: "normal", quality: 91, alerts: 1, population: "420K", budget: "$15M" },
        { region: "Андижан", status: "critical", quality: 65, alerts: 5, population: "480K", budget: "$18M" },
        { region: "Нукус", status: "warning", quality: 72, alerts: 3, population: "320K", budget: "$22M" }
      ],
      policies: [
        { id: 1, title: "Модернизация водоснабжения 2025", status: "active", priority: "high", budget: "$120M", progress: 45 },
        { id: 2, title: "Программа очистки Арала", status: "active", priority: "critical", budget: "$85M", progress: 28 },
        { id: 3, title: "IoT интеграция инфраструктуры", status: "draft", priority: "medium", budget: "$35M", progress: 0 },
        { id: 4, title: "Субсидирование сельского хоз-ва", status: "active", priority: "high", budget: "$50M", progress: 67 },
        { id: 5, title: "Экологический мониторинг", status: "active", priority: "medium", budget: "$15M", progress: 82 }
      ],
      crisis: [
        { id: 1, type: "засуха", region: "Каракалпакстан", severity: "high", date: "2024-12-20", status: "monitoring", resources: 12 },
        { id: 2, type: "загрязнение", region: "Андижан", severity: "critical", date: "2024-12-25", status: "active", resources: 24 },
        { id: 3, type: "авария", region: "Ташкент", severity: "medium", date: "2024-12-22", status: "resolved", resources: 8 }
      ],
      reports: [
        { id: 1, title: "SDG 6 - Чистая вода", score: 94, trend: "+3%", lastUpdate: "2024-12-20" },
        { id: 2, title: "SDG 9 - Инфраструктура", score: 87, trend: "+5%", lastUpdate: "2024-12-18" },
        { id: 3, title: "SDG 11 - Устойчивые города", score: 82, trend: "+2%", lastUpdate: "2024-12-15" },
        { id: 4, title: "SDG 13 - Климат", score: 78, trend: "-1%", lastUpdate: "2024-12-10" },
        { id: 5, title: "SDG 16 - Институты", score: 91, trend: "+4%", lastUpdate: "2024-12-01" }
      ]
    }
  },
  infrastructure: {
    title: "Инфраструктурный кабинет",
    icon: HardHat,
    color: "orange",
    description: "Мониторинг IoT-датчиков, предиктивное обслуживание и управление активами",
    stats: [
      { label: "Объекты", value: "156", icon: Building2, change: "+8" },
      { label: "IoT Узлы", value: "2,456", icon: Cpu, change: "+124" },
      { label: "Статус", value: "98%", icon: CheckCircle2, change: "" },
      { label: "Эффективность", value: "87%", icon: Activity, change: "+3%" }
    ],
    tabs: [
      { id: "assets", label: "Активы", icon: Building2 },
      { id: "iot", label: "IoT Мониторинг", icon: Cpu },
      { id: "maintenance", label: "Обслуживание", icon: HardHat },
      { id: "alerts", label: "Оповещения", icon: Bell }
    ],
    modules: {
      assets: [
        { name: "Насосная станция #1", type: "pump", status: "online", efficiency: 94, power: "250 кВт", location: "Ташкент" },
        { name: "Очистные сооружения Юг", type: "treatment", status: "online", efficiency: 91, capacity: "50 тыс м³/день", location: "Самарканд" },
        { name: "Резервуар A-1", type: "reservoir", status: "online", efficiency: 98, volume: "10 000 м³", location: "Бухара" },
        { name: "Датчик качества #12", type: "sensor", status: "maintenance", efficiency: 0, model: "VODSense Pro", location: "Фергана" },
        { name: "Насосная станция #2", type: "pump", status: "warning", efficiency: 78, power: "180 кВт", location: "Андижан" },
        { name: "Опреснительная станция", type: "desalination", status: "online", efficiency: 89, capacity: "25 тыс м³/день", location: "Нукус" }
      ],
      iot: [
        { id: "IOT-001", name: "Датчик pH Чирчик", type: "pH", value: 7.2, status: "online", battery: 89, lastUpdate: "2 мин назад" },
        { id: "IOT-002", name: "Температура Арал", type: "temp", value: "18.5°C", status: "online", battery: 76, lastUpdate: "5 мин назад" },
        { id: "IOT-003", name: "Уровень Чарвак", type: "level", value: "78%", status: "online", battery: 92, lastUpdate: "1 мин назад" },
        { id: "IOT-004", name: "Турбидность #45", type: "turbidity", value: "12 NTU", status: "warning", battery: 45, lastUpdate: "15 мин назад" },
        { id: "IOT-005", name: "Проводимость Сырдарья", type: "conductivity", value: "520 μS", status: "online", battery: 81, lastUpdate: "3 мин назад" },
        { id: "IOT-006", name: "Хлор станция #3", type: "chlorine", value: "0.8 ppm", status: "online", battery: 67, lastUpdate: "8 мин назад" }
      ],
      maintenance: [
        { id: 1, asset: "Насосная станция #1", task: "Плановое ТО", priority: "medium", scheduled: "2024-12-28", status: "scheduled", team: "Бригада А" },
        { id: 2, asset: "Очистные сооружения", task: "Замена фильтров", priority: "high", scheduled: "2024-12-26", status: "in_progress", team: "Бригада Б" },
        { id: 3, asset: "Датчик #12", task: "Калибровка", priority: "low", scheduled: "2024-12-30", status: "scheduled", team: "Технический отдел" },
        { id: 4, asset: "Резервуар A-1", task: "Очистка", priority: "medium", scheduled: "2025-01-05", status: "planned", team: "Бригада В" },
        { id: 5, asset: "Насосная #2", task: "Ремонт двигателя", priority: "critical", scheduled: "2024-12-25", status: "in_progress", team: "Аварийная служба" }
      ],
      alerts: [
        { id: 1, type: "critical", title: "Отказ насоса #2", asset: "Насосная станция #2", time: "30 мин назад", acknowledged: false },
        { id: 2, type: "warning", title: "Низкий заряд батареи IOT-004", asset: "Турбидность #45", time: "2 часа назад", acknowledged: true },
        { id: 3, type: "info", title: "Плановое обслуживание завтра", asset: "Очистные сооружения", time: "5 часов назад", acknowledged: true },
        { id: 4, type: "warning", title: "Снижение эффективности", asset: "Опреснительная станция", time: "1 день назад", acknowledged: false }
      ]
    }
  },
  investor: {
    title: "Инвестиционный кабинет",
    icon: TrendingUp,
    color: "emerald",
    description: "ESG-портфель, доходность токенов VOD и анализ экологических рынков",
    stats: [
      { label: "Портфель", value: "$125,000", icon: Wallet, change: "+$8,500" },
      { label: "VOD Токены", value: "87,450", icon: Droplets, change: "+2,340" },
      { label: "ROI", value: "18.7%", icon: TrendingUp, change: "+2.1%" },
      { label: "ESG Score", value: "A+", icon: Award, change: "" }
    ],
    tabs: [
      { id: "portfolio", label: "Портфель", icon: Wallet },
      { id: "projects", label: "Проекты", icon: Target },
      { id: "market", label: "Рынок", icon: TrendingUp },
      { id: "esg", label: "ESG Отчёт", icon: FileText }
    ],
    modules: {
      portfolio: [
        { name: "VODeco Core", allocation: 40, value: 50000, change: "+12%", type: "Token", risk: "medium" },
        { name: "Smart Pumping", allocation: 25, value: 31250, change: "+8%", type: "Project", risk: "low" },
        { name: "Carbon Credits", allocation: 20, value: 25000, change: "+15%", type: "ESG", risk: "low" },
        { name: "Desalination 2.0", allocation: 15, value: 18750, change: "+5%", type: "Infrastructure", risk: "high" }
      ],
      projects: [
        { id: 1, name: "Pilot Uzbekistan", status: "Active", irr: "22%", invested: "$15,000", target: "$50,000", progress: 30, esg: "A" },
        { id: 2, name: "IoT Network Expansion", status: "Funding", irr: "18%", invested: "$8,000", target: "$25,000", progress: 32, esg: "A+" },
        { id: 3, name: "AI Analytics v2", status: "Planning", irr: "25%", invested: "$0", target: "$100,000", progress: 0, esg: "A" },
        { id: 4, name: "Water Expeditioner 3.0", status: "Funding", irr: "35%", invested: "$12,000", target: "$80,000", progress: 15, esg: "A+" },
        { id: 5, name: "Carbon Offset Program", status: "Active", irr: "15%", invested: "$25,000", target: "$60,000", progress: 42, esg: "A+" }
      ],
      market: [
        { pair: "VOD/USDT", price: 0.0245, change24h: "+5.2%", volume: "$1.2M", mcap: "$4.5M" },
        { pair: "VOD/TON", price: 0.0089, change24h: "+3.8%", volume: "$450K", mcap: "-" },
        { pair: "R-VOD/VOD", price: 1.15, change24h: "+1.2%", volume: "$890K", mcap: "-" },
        { pair: "P-VOD/USDT", price: 0.0312, change24h: "+8.5%", volume: "$2.1M", mcap: "$8.2M" }
      ],
      esg: [
        { category: "Environmental", score: 92, metrics: ["Carbon Neutral", "Water Positive", "Renewable Energy 85%"], trend: "+5" },
        { category: "Social", score: 88, metrics: ["Community Impact", "Fair Labor", "Education Programs"], trend: "+3" },
        { category: "Governance", score: 95, metrics: ["Transparent DAO", "Open Source", "Regular Audits"], trend: "+2" }
      ]
    }
  },
  science: {
    title: "Научный кабинет",
    icon: Beaker,
    color: "purple",
    description: "OpenData API, исследовательские проекты и коллаборации учёных",
    stats: [
      { label: "Проекты", value: "12", icon: Beaker, change: "+2" },
      { label: "Датасеты", value: "4.2 TB", icon: Database, change: "+340 GB" },
      { label: "Публикации", value: "45", icon: FileText, change: "+5" },
      { label: "Точность AI", value: "99.2%", icon: Cpu, change: "+0.3%" }
    ],
    tabs: [
      { id: "research", label: "Исследования", icon: Beaker },
      { id: "data", label: "Data Lake", icon: Database },
      { id: "models", label: "ML Модели", icon: Cpu },
      { id: "api", label: "API", icon: Settings }
    ],
    modules: {
      research: [
        { id: 1, title: "Прогнозирование засух", status: "Active", team: 5, progress: 75, budget: "$45K", publications: 3 },
        { id: 2, title: "Качество грунтовых вод", status: "Active", team: 3, progress: 45, budget: "$28K", publications: 1 },
        { id: 3, title: "AI для аномалий", status: "Completed", team: 4, progress: 100, budget: "$65K", publications: 5 },
        { id: 4, title: "Спутниковый анализ", status: "Planning", team: 2, progress: 10, budget: "$80K", publications: 0 },
        { id: 5, title: "Микробиология водоёмов", status: "Active", team: 6, progress: 62, budget: "$55K", publications: 2 },
        { id: 6, title: "Климатическое моделирование", status: "Active", team: 8, progress: 38, budget: "$120K", publications: 4 }
      ],
      data: [
        { name: "Water Quality Dataset", size: "1.2 TB", records: "45M", format: "Parquet", updated: "2024-12-25", access: "public" },
        { name: "IoT Sensor Telemetry", size: "890 GB", records: "2.1B", format: "TimescaleDB", updated: "2024-12-26", access: "restricted" },
        { name: "Satellite Imagery", size: "2.1 TB", records: "125K", format: "GeoTIFF", updated: "2024-12-20", access: "public" },
        { name: "Historical Records", size: "340 GB", records: "12M", format: "PostgreSQL", updated: "2024-11-15", access: "public" },
        { name: "Research Publications", size: "45 GB", records: "8.5K", format: "PDF/JSON", updated: "2024-12-24", access: "public" }
      ],
      models: [
        { name: "WaterQualityPredictor v3", type: "LSTM", accuracy: 99.2, latency: "45ms", status: "production", version: "3.2.1" },
        { name: "AnomalyDetector", type: "Transformer", accuracy: 97.8, latency: "12ms", status: "production", version: "2.1.0" },
        { name: "DroughtForecaster", type: "XGBoost", accuracy: 94.5, latency: "8ms", status: "production", version: "1.5.3" },
        { name: "PollutionTracker", type: "CNN", accuracy: 96.3, latency: "120ms", status: "beta", version: "0.9.2" },
        { name: "ResourceOptimizer", type: "RL", accuracy: 91.2, latency: "250ms", status: "development", version: "0.4.0" }
      ],
      api: [
        { endpoint: "/api/v2/water-quality", method: "GET", calls: "1.2M/day", latency: "45ms", status: "stable" },
        { endpoint: "/api/v2/predictions", method: "POST", calls: "89K/day", latency: "120ms", status: "stable" },
        { endpoint: "/api/v2/datasets", method: "GET", calls: "25K/day", latency: "15ms", status: "stable" },
        { endpoint: "/api/v2/models/infer", method: "POST", calls: "450K/day", latency: "200ms", status: "stable" },
        { endpoint: "/api/v3/realtime", method: "WebSocket", calls: "15K active", latency: "5ms", status: "beta" }
      ]
    }
  },
  operator: {
    title: "Операторский кабинет",
    icon: Settings,
    color: "slate",
    description: "Системный контроль, управление инцидентами и техническая поддержка",
    stats: [
      { label: "Инциденты", value: "0", icon: AlertTriangle, change: "-2" },
      { label: "Нагрузка", value: "65%", icon: Activity, change: "" },
      { label: "Uptime", value: "99.99%", icon: CheckCircle2, change: "" },
      { label: "Тикеты", value: "12", icon: MessageSquare, change: "-5" }
    ],
    tabs: [
      { id: "control", label: "Контроль", icon: Settings },
      { id: "alerts", label: "Алерты", icon: Bell },
      { id: "logs", label: "Логи", icon: FileText },
      { id: "support", label: "Поддержка", icon: MessageSquare }
    ],
    modules: {
      control: [
        { service: "API Gateway", status: "healthy", latency: "12ms", requests: "1.2M/day", cpu: 45, memory: 62, instances: 4 },
        { service: "Blockchain Node", status: "healthy", latency: "45ms", requests: "89K/day", cpu: 72, memory: 85, instances: 3 },
        { service: "ML Pipeline", status: "healthy", latency: "120ms", requests: "15K/day", cpu: 88, memory: 92, instances: 2 },
        { service: "IoT Broker", status: "warning", latency: "89ms", requests: "4.5M/day", cpu: 91, memory: 78, instances: 6 },
        { service: "Database Cluster", status: "healthy", latency: "5ms", requests: "8.2M/day", cpu: 35, memory: 55, instances: 3 },
        { service: "Cache Layer", status: "healthy", latency: "1ms", requests: "25M/day", cpu: 28, memory: 72, instances: 5 }
      ],
      alerts: [
        { id: 1, type: "warning", title: "High CPU on IoT Broker", service: "IoT Broker", time: "15 мин назад", status: "investigating" },
        { id: 2, type: "info", title: "Scheduled maintenance", service: "Database Cluster", time: "2 часа назад", status: "scheduled" },
        { id: 3, type: "resolved", title: "Memory spike on ML Pipeline", service: "ML Pipeline", time: "5 часов назад", status: "resolved" },
        { id: 4, type: "info", title: "New deployment v0.5.3", service: "API Gateway", time: "1 день назад", status: "completed" }
      ],
      logs: [
        { timestamp: "2024-12-26 14:32:15", level: "INFO", service: "API Gateway", message: "Request processed successfully: /api/v2/water-quality" },
        { timestamp: "2024-12-26 14:32:10", level: "WARN", service: "IoT Broker", message: "Connection pool exhausted, scaling up instances" },
        { timestamp: "2024-12-26 14:31:55", level: "INFO", service: "Blockchain Node", message: "Block #1245678 validated and committed" },
        { timestamp: "2024-12-26 14:31:42", level: "DEBUG", service: "ML Pipeline", message: "Model inference completed in 112ms" },
        { timestamp: "2024-12-26 14:31:30", level: "INFO", service: "Cache Layer", message: "Cache hit ratio: 94.5%" },
        { timestamp: "2024-12-26 14:31:15", level: "ERROR", service: "IoT Broker", message: "Timeout on sensor IOT-004 connection" }
      ],
      support: [
        { id: "TKT-1234", title: "API rate limit exceeded", user: "enterprise_user", priority: "high", status: "open", created: "2 часа назад" },
        { id: "TKT-1230", title: "Data export issue", user: "researcher_01", priority: "medium", status: "in_progress", created: "5 часов назад" },
        { id: "TKT-1228", title: "Access permission request", user: "gov_agency", priority: "low", status: "pending", created: "1 день назад" },
        { id: "TKT-1225", title: "Integration documentation", user: "partner_corp", priority: "medium", status: "resolved", created: "2 дня назад" }
      ]
    }
  },
  admin: {
    title: "Административный кабинет",
    icon: ShieldCheck,
    color: "red",
    description: "Конфигурация системы, управление ролями и аудит безопасности",
    stats: [
      { label: "Пользователи", value: "12,456", icon: Users, change: "+234" },
      { label: "Безопасность", value: "Max", icon: ShieldCheck, change: "" },
      { label: "Узлы", value: "142", icon: Globe, change: "+8" },
      { label: "Версия", value: "v0.5.2", icon: Settings, change: "" }
    ],
    tabs: [
      { id: "users", label: "Пользователи", icon: Users },
      { id: "roles", label: "Роли", icon: ShieldCheck },
      { id: "audit", label: "Аудит", icon: FileText },
      { id: "config", label: "Настройки", icon: Settings }
    ],
    modules: {
      users: [
        { id: 1, name: "Alex_Tech", email: "alex@vodeco.io", role: "Researcher", status: "Active", joined: "2024-01", lastLogin: "2024-12-26", vod: 5420 },
        { id: 2, name: "Eco_Guard", email: "eco@vodeco.io", role: "Citizen", status: "Active", joined: "2024-02", lastLogin: "2024-12-25", vod: 2340 },
        { id: 3, name: "VOD_Admin", email: "admin@vodeco.io", role: "Admin", status: "Active", joined: "2023-12", lastLogin: "2024-12-26", vod: 15000 },
        { id: 4, name: "DataScientist", email: "data@vodeco.io", role: "Scientist", status: "Active", joined: "2024-01", lastLogin: "2024-12-24", vod: 8750 },
        { id: 5, name: "Gov_Agent", email: "gov@ministry.uz", role: "Government", status: "Active", joined: "2024-03", lastLogin: "2024-12-26", vod: 12500 },
        { id: 6, name: "Investor_Pro", email: "invest@fund.com", role: "Investor", status: "Pending", joined: "2024-12", lastLogin: "-", vod: 0 }
      ],
      roles: [
        { id: 1, name: "Admin", permissions: 42, users: 3, level: "critical", description: "Полный доступ к системе" },
        { id: 2, name: "Operator", permissions: 28, users: 12, level: "high", description: "Управление системой и мониторинг" },
        { id: 3, name: "Government", permissions: 22, users: 45, level: "high", description: "Правительственный доступ" },
        { id: 4, name: "Researcher", permissions: 18, users: 156, level: "medium", description: "Научный доступ к данным" },
        { id: 5, name: "Investor", permissions: 15, users: 234, level: "medium", description: "Инвестиционный кабинет" },
        { id: 6, name: "Citizen", permissions: 8, users: 12006, level: "basic", description: "Базовый доступ пользователя" }
      ],
      audit: [
        { id: 1, action: "User Login", user: "VOD_Admin", ip: "192.168.1.1", timestamp: "2024-12-26 14:32:15", status: "success" },
        { id: 2, action: "Role Modified", user: "VOD_Admin", ip: "192.168.1.1", timestamp: "2024-12-26 14:28:10", status: "success" },
        { id: 3, action: "Data Export", user: "DataScientist", ip: "10.0.0.45", timestamp: "2024-12-26 14:15:55", status: "success" },
        { id: 4, action: "Failed Login", user: "unknown", ip: "45.67.89.12", timestamp: "2024-12-26 14:10:42", status: "failed" },
        { id: 5, action: "Permission Request", user: "Investor_Pro", ip: "78.90.12.34", timestamp: "2024-12-26 13:45:30", status: "pending" },
        { id: 6, action: "Config Change", user: "VOD_Admin", ip: "192.168.1.1", timestamp: "2024-12-26 12:00:00", status: "success" }
      ],
      config: [
        { key: "system.version", value: "0.5.2", type: "string", editable: false, description: "Версия системы" },
        { key: "api.rate_limit", value: "1000", type: "number", editable: true, description: "Лимит API запросов/мин" },
        { key: "security.2fa_required", value: "true", type: "boolean", editable: true, description: "Обязательная 2FA" },
        { key: "blockchain.network", value: "TON Mainnet", type: "string", editable: false, description: "Блокчейн сеть" },
        { key: "storage.max_upload", value: "100MB", type: "string", editable: true, description: "Макс. размер загрузки" },
        { key: "notifications.email", value: "true", type: "boolean", editable: true, description: "Email уведомления" }
      ]
    }
  }
};

export default function CabinetPage() {
  const params = useParams();
  const type = params.type as string;
  const config = cabinetConfigs[type];
  const [activeTab, setActiveTab] = useState(config?.tabs?.[0]?.id || 'dashboard');
  const [searchQuery, setSearchQuery] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { language } = useLanguage();
  
  const t = cabinetTranslations[language] || cabinetTranslations.en;
  
  // Check if user is verified for this cabinet
  const isVerified = isAuthenticated && user?.role === type;
  const canFullAccess = isAuthenticated && isVerified;

  if (!config) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-4xl font-black text-red-500 mb-4">404</h1>
          <p className="text-slate-400">{t.cabinetNotFound}</p>
          <Link href="/cabinets" className="mt-4 inline-block px-6 py-3 bg-cyan-glow text-ocean-deep rounded-xl font-bold">
            {t.backToCabinets}
          </Link>
        </div>
      </div>
    );
  }

  const Icon = config.icon;
  const colorClasses: Record<string, { bg: string; text: string; border: string; glow: string }> = {
    cyan: { bg: "bg-cyan-500/20", text: "text-cyan-400", border: "border-cyan-500/30", glow: "shadow-cyan-500/20" },
    blue: { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/30", glow: "shadow-blue-500/20" },
    orange: { bg: "bg-orange-500/20", text: "text-orange-400", border: "border-orange-500/30", glow: "shadow-orange-500/20" },
    emerald: { bg: "bg-emerald-500/20", text: "text-emerald-400", border: "border-emerald-500/30", glow: "shadow-emerald-500/20" },
    purple: { bg: "bg-purple-500/20", text: "text-purple-400", border: "border-purple-500/30", glow: "shadow-purple-500/20" },
    slate: { bg: "bg-slate-500/20", text: "text-slate-400", border: "border-slate-500/30", glow: "shadow-slate-500/20" },
    red: { bg: "bg-red-500/20", text: "text-red-400", border: "border-red-500/30", glow: "shadow-red-500/20" },
  };
  const colors = colorClasses[config.color] || colorClasses.cyan;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* View Mode Banner - Always visible for non-authenticated or non-verified users */}
      {!canFullAccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-4 border-2 border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-blue-500/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-cyan-500/20">
                <Eye className="text-cyan-400" size={24} />
              </div>
              <div>
                <div className="font-bold text-cyan-400 flex items-center gap-2">
                  {t.viewMode}
                  <span className="px-2 py-0.5 bg-cyan-500/20 rounded text-xs">DEMO</span>
                </div>
                <p className="text-sm text-slate-400 max-w-lg">
                  {language === 'ru' 
                    ? 'Вы просматриваете кабинет в демо-режиме. Для полного доступа и работы в кабинете необходимо войти в систему и пройти верификацию.'
                    : language === 'ar'
                    ? 'أنت تشاهد المكتب في الوضع التجريبي. للوصول الكامل والعمل في المكتب، يجب تسجيل الدخول وإكمال التحقق.'
                    : 'You are viewing the cabinet in demo mode. To get full access and work in the cabinet, you need to sign in and complete verification.'
                  }
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              {!isAuthenticated ? (
                <Link href="/profile" className="px-6 py-3 bg-cyan-500 text-ocean-deep rounded-xl font-bold flex items-center gap-2 hover:bg-cyan-400 transition-colors">
                  <LogIn size={18} /> {t.signIn}
                </Link>
              ) : (
                <div className="flex flex-col items-end gap-2">
                  <button 
                    onClick={() => setShowAuthModal(true)}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    <ShieldCheck size={18} /> {t.verify}
                  </button>
                  <p className="text-xs text-slate-500 text-right max-w-[200px]">
                    {language === 'ru' 
                      ? 'Для работы в кабинете необходима верификация'
                      : language === 'ar'
                      ? 'التحقق مطلوب للعمل في المكتب'
                      : 'Verification required to work in the cabinet'
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Verification Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAuthModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card p-8 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className={cn("w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center", colors.bg, colors.text)}>
                  <ShieldCheck size={40} />
                </div>
                <h3 className="text-2xl font-black mb-2">{t.getFullAccess}</h3>
                <p className="text-slate-400 text-sm">
                  {language === 'ru' 
                    ? `Для полного доступа к ${config.title} необходимо пройти верификацию.`
                    : language === 'ar'
                    ? `للحصول على وصول كامل إلى ${config.title}، يجب عليك إكمال التحقق.`
                    : `To get full access to ${config.title}, you need to complete verification.`
                  }
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="text-green-400" size={20} />
                    <span className="font-medium">
                      {language === 'ru' ? 'Что вы получите:' : language === 'ar' ? 'ماذا ستحصل:' : 'What you get:'}
                    </span>
                  </div>
                  <ul className="text-sm text-slate-400 space-y-1 ml-8">
                    <li>• {language === 'ru' ? 'Полный функционал кабинета' : language === 'ar' ? 'وظائف المكتب الكاملة' : 'Full cabinet functionality'}</li>
                    <li>• {language === 'ru' ? 'Создание и отправка отчётов' : language === 'ar' ? 'إنشاء وإرسال التقارير' : 'Create and submit reports'}</li>
                    <li>• {language === 'ru' ? 'Участие в голосованиях DAO' : language === 'ar' ? 'المشاركة في تصويت DAO' : 'Participate in DAO voting'}</li>
                    <li>• {language === 'ru' ? 'Получение наград VODG' : language === 'ar' ? 'الحصول على مكافآت VODG' : 'Earn VODG rewards'}</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Info className="text-yellow-400 shrink-0" size={20} />
                    <p className="text-sm text-yellow-400/80">
                      {language === 'ru' 
                        ? 'Верификация требует подтверждения личности и может занять 1-3 дня.'
                        : language === 'ar'
                        ? 'يتطلب التحقق تأكيد الهوية وقد يستغرق 1-3 أيام.'
                        : 'Verification requires identity confirmation and may take 1-3 days.'
                      }
                    </p>
                  </div>
                </div>
                
                <div>
                  <button 
                    onClick={() => {
                      // Здесь будет логика начала верификации
                      setShowAuthModal(false);
                      // Можно перенаправить на страницу верификации
                    }}
                    className={cn("w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-105", colors.bg, colors.text)}
                  >
                    <ShieldCheck size={20} />
                    {language === 'ru' ? 'Начать верификацию' : language === 'ar' ? 'بدء التحقق' : 'Start Verification'}
                  </button>
                  <p className="text-xs text-center text-slate-500 mt-2">
                    {language === 'ru' 
                      ? 'Верификация необходима для работы в кабинете'
                      : language === 'ar'
                      ? 'التحقق مطلوب للعمل في المكتب'
                      : 'Verification is required to work in the cabinet'
                    }
                  </p>
                </div>
                
                <button 
                  onClick={() => setShowAuthModal(false)}
                  className="w-full py-3 glass rounded-xl font-medium text-slate-400 hover:text-white transition-colors"
                >
                  {language === 'ru' ? 'Продолжить просмотр' : language === 'ar' ? 'متابعة العرض' : 'Continue Viewing'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 relative overflow-hidden"
      >
        <div className={cn("absolute top-0 right-0 w-96 h-96 blur-[120px] opacity-20 rounded-full", colors.bg)} />
        
        <div className="relative flex flex-col md:flex-row items-center gap-8">
          <div className={cn("w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl", colors.bg, colors.text, colors.border, colors.glow, "border")}>
            <Icon size={48} />
          </div>
          <div className="text-center md:text-left flex-1">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <h1 className="text-3xl font-black">{config.title}</h1>
              <span className={cn("px-2 py-1 rounded-md text-xs font-bold border", colors.border, colors.text)}>
                {t.active}
              </span>
              {!canFullAccess && (
                <span className="px-2 py-1 rounded-md text-xs font-bold border border-yellow-500/30 text-yellow-400 bg-yellow-500/10">
                  {t.viewMode}
                </span>
              )}
            </div>
            <p className="text-slate-400 max-w-xl text-sm">{config.description}</p>
          </div>
          <div className="flex gap-3">
            <button className="p-3 glass rounded-xl hover:bg-white/10 transition-colors">
              <Bell size={20} />
            </button>
            <button className="p-3 glass rounded-xl hover:bg-white/10 transition-colors">
              <Settings size={20} />
            </button>
            <button className={cn("px-6 py-3 rounded-xl font-bold flex items-center gap-2", colors.bg, colors.text)}>
              <Download size={18} /> {t.export}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {config.stats.map((stat: { label: string; value: string; icon: React.ComponentType<{ size?: number; className?: string }>; change?: string }, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-5 hover:border-white/20 transition-all group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                {stat.icon && <stat.icon size={18} className={colors.text} />}
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{stat.label}</span>
            </div>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-black">{stat.value}</div>
              {stat.change && (
                <span className={cn("text-xs font-bold", stat.change.includes('+') || stat.change.includes('↑') ? "text-green-400" : stat.change.includes('-') ? "text-red-400" : "text-slate-400")}>
                  {stat.change}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
          {config.tabs?.map((tab: { id: string; label: string; icon?: React.ComponentType<{ size?: number; className?: string }> }) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all",
                activeTab === tab.id
                  ? cn(colors.bg, colors.text, "border", colors.border)
                  : "glass hover:bg-white/5"
              )}
            >
              {tab.icon && <tab.icon size={16} />}
              {tab.label}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder={t.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64 pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-glow/50 focus:outline-none"
          />
        </div>
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <CabinetContent type={type} tab={activeTab} modules={config.modules} colors={colors} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="glass-card p-6">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <Zap className={colors.text} size={18} />
                {t.quickActions}
              </h4>
              <div className="space-y-2">
                <button 
                  className={cn(
                    "w-full py-3 glass rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors",
                    canFullAccess ? "hover:bg-white/10" : "opacity-50 cursor-not-allowed"
                  )}
                  disabled={!canFullAccess}
                  onClick={() => !canFullAccess && setShowAuthModal(true)}
                >
                  <Plus size={16} /> {t.createReport}
                  {!canFullAccess && <Lock size={14} className="text-yellow-400" />}
                </button>
                <button className="w-full py-3 glass rounded-xl hover:bg-white/10 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                  <Download size={16} /> {t.exportData}
                </button>
                <Link href="/dao" className="w-full py-3 glass rounded-xl hover:bg-white/10 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                  <Target size={16} /> {t.daoVoting}
                </Link>
              </div>
            </div>

            {/* Activity Feed */}
            <div className="glass-card p-6">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <Activity className={colors.text} size={18} />
                {t.recentEvents}
              </h4>
              <div className="space-y-4">
                {[
                  { text: language === 'ru' ? "Новый отчёт о качестве воды" : language === 'ar' ? "تقرير جديد عن جودة المياه" : "New water quality report", time: language === 'ru' ? "2 мин назад" : language === 'ar' ? "قبل 2 دقائق" : "2 min ago" },
                  { text: language === 'ru' ? "Обновление IoT датчиков" : language === 'ar' ? "تحديث أجهزة استشعار IoT" : "IoT sensors update", time: language === 'ru' ? "15 мин назад" : language === 'ar' ? "قبل 15 دقيقة" : "15 min ago" },
                  { text: language === 'ru' ? "Завершено голосование #124" : language === 'ar' ? "اكتمل التصويت رقم 124" : "Voting #124 completed", time: language === 'ru' ? "1 час назад" : language === 'ar' ? "قبل ساعة" : "1 hour ago" },
                  { text: language === 'ru' ? "Синхронизация данных" : language === 'ar' ? "مزامنة البيانات" : "Data synchronization", time: language === 'ru' ? "3 часа назад" : language === 'ar' ? "قبل 3 ساعات" : "3 hours ago" },
                ].map((item: { text: string; time: string }, i: number) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-cyan-glow mt-1.5" />
                    <div>
                      <div className="text-slate-300">{item.text}</div>
                      <div className="text-xs text-slate-500">{item.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Help */}
            <div className={cn("glass-card p-6", colors.bg.replace('/20', '/10'))}>
              <h4 className="font-bold mb-2">{t.needHelp}</h4>
              <p className="text-sm text-slate-400 mb-4">{t.docsAvailable}</p>
              <button className={cn("w-full py-3 rounded-xl font-bold text-sm", colors.bg, colors.text)}>
                {t.openDocs}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Cabinet Content Component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CabinetContent({ type, tab, modules, colors }: { type: string; tab: string; modules: any; colors: { bg: string; text: string; border: string; glow: string } }) {
  // ========== CITIZEN CABINET ==========
  if (type === "citizen") {
    if (tab === "monitor" && modules?.monitor) {
      return (
        <div className="glass-card p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Activity size={18} className="text-cyan-400" />
            Качество воды в вашем регионе
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {modules.monitor.map((item: any, i: number) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm text-slate-400">{item.title}</span>
                  <span className={cn("px-2 py-0.5 rounded text-xs font-bold",
                    item.status === "good" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                  )}>{item.status === "good" ? "Хорошо" : "Норма"}</span>
                </div>
                <div className="text-2xl font-black mb-1">{item.value}</div>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin size={12} /> {item.location}
                  </div>
                  <span className={cn("text-xs", item.trend?.includes('+') ? "text-green-400" : item.trend?.includes('-') ? "text-red-400" : "text-slate-500")}>
                    {item.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (tab === "reports" && modules?.reports) {
      return (
        <div className="glass-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold flex items-center gap-2">
              <FileText size={18} className="text-cyan-400" />
              Мои отчёты
            </h3>
            <button className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm font-bold hover:bg-cyan-500/30 transition-colors flex items-center gap-2">
              <Plus size={16} /> Новый отчёт
            </button>
          </div>
          <div className="space-y-3">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {modules.reports.map((report: any) => (
              <div key={report.id} className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium">{report.title}</div>
                  <span className={cn("px-2 py-0.5 rounded text-xs font-bold",
                    report.status === "verified" ? "bg-green-500/20 text-green-400" :
                    report.status === "pending" ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"
                  )}>{report.status === "verified" ? "✓ Проверен" : report.status === "pending" ? "На проверке" : "Отклонён"}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>{report.date}</span>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1"><Eye size={12} /> {report.views}</span>
                    <span className="text-green-400">+{report.reward} VOD</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (tab === "missions" && modules?.missions) {
      return (
        <div className="glass-card p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Target size={18} className="text-cyan-400" />
            Активные миссии
          </h3>
          <div className="space-y-4">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {modules.missions.map((mission: any, i: number) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium">{mission.title}</span>
                  <span className={cn("px-2 py-0.5 rounded text-xs font-bold",
                    mission.status === "completed" ? "bg-green-500/20 text-green-400" : "bg-cyan-500/20 text-cyan-400"
                  )}>{mission.status === "completed" ? "✓ Выполнено" : "Активно"}</span>
                </div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-glow transition-all" style={{ width: `${mission.progress}%` }} />
                  </div>
                  <span className="text-sm text-slate-400">{mission.progress}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-400">Награда: {mission.reward}</span>
                  <span className="text-purple-400">+{mission.xp} XP</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (tab === "achievements" && modules?.achievements) {
      return (
        <div className="glass-card p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Award size={18} className="text-cyan-400" />
            Достижения
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {modules.achievements.map((achievement: any, i: number) => (
              <div key={i} className={cn("p-4 rounded-xl border transition-all",
                achievement.earned ? "bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/30" : "bg-white/5 border-white/10 opacity-60"
              )}>
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <div className="font-bold mb-1">{achievement.title}</div>
                <div className="text-xs text-slate-400 mb-2">{achievement.description}</div>
                {achievement.earned ? (
                  <div className="text-xs text-green-400">Получено: {achievement.date}</div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-glow" style={{ width: `${achievement.progress}%` }} />
                    </div>
                    <span className="text-xs text-slate-500">{achievement.progress}%</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }
  }

  // ========== GOVERNMENT CABINET ==========
  if (type === "government") {
    if (tab === "dashboard" && modules?.dashboard) {
      return (
        <div className="glass-card p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Globe size={18} className="text-blue-400" />
            Статус регионов
          </h3>
          <div className="space-y-4">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {modules.dashboard.map((region: any, i: number) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={cn("w-3 h-3 rounded-full",
                    region.status === "normal" ? "bg-green-500" : region.status === "warning" ? "bg-yellow-500" : "bg-red-500"
                  )} />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <div className="font-medium">{region.region}</div>
                      <div className={cn("text-sm font-bold",
                        region.quality >= 90 ? "text-green-400" : region.quality >= 75 ? "text-yellow-400" : "text-red-400"
                      )}>{region.quality}%</div>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className={cn("h-full transition-all",
                        region.quality >= 90 ? "bg-green-500" : region.quality >= 75 ? "bg-yellow-500" : "bg-red-500"
                      )} style={{ width: `${region.quality}%` }} />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-3 text-xs text-slate-500">
                  <span>Население: {region.population}</span>
                  <span>Бюджет: {region.budget}</span>
                  <span className={region.alerts > 0 ? "text-red-400" : ""}>{region.alerts} алертов</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (tab === "policies" && modules?.policies) {
      return (
        <div className="glass-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold flex items-center gap-2">
              <FileText size={18} className="text-blue-400" />
              Активные политики
            </h3>
            <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-bold">+ Новая политика</button>
          </div>
          <div className="space-y-3">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {modules.policies.map((policy: any) => (
              <div key={policy.id} className="p-4 bg-white/5 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium">{policy.title}</div>
                  <span className={cn("px-2 py-0.5 rounded text-xs font-bold",
                    policy.priority === "critical" ? "bg-red-500/20 text-red-400" :
                    policy.priority === "high" ? "bg-orange-500/20 text-orange-400" : "bg-slate-500/20 text-slate-400"
                  )}>{policy.priority}</span>
                </div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: `${policy.progress}%` }} />
                  </div>
                  <span className="text-sm text-slate-400">{policy.progress}%</span>
                </div>
                <div className="text-xs text-slate-500">Бюджет: {policy.budget}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (tab === "crisis" && modules?.crisis) {
      return (
        <div className="glass-card p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <AlertTriangle size={18} className="text-red-400" />
            Кризис-центр
          </h3>
          <div className="space-y-3">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {modules.crisis.map((crisis: any) => (
              <div key={crisis.id} className={cn("p-4 rounded-xl border",
                crisis.severity === "critical" ? "bg-red-500/10 border-red-500/30" :
                crisis.severity === "high" ? "bg-orange-500/10 border-orange-500/30" : "bg-yellow-500/10 border-yellow-500/30"
              )}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium capitalize">{crisis.type}</div>
                    <div className="text-xs text-slate-400">{crisis.region}</div>
                  </div>
                  <span className={cn("px-2 py-0.5 rounded text-xs font-bold",
                    crisis.status === "active" ? "bg-red-500/20 text-red-400" :
                    crisis.status === "monitoring" ? "bg-yellow-500/20 text-yellow-400" : "bg-green-500/20 text-green-400"
                  )}>{crisis.status}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>{crisis.date}</span>
                  <span>{crisis.resources} ресурсов задействовано</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (tab === "reports" && modules?.reports) {
      return (
        <div className="glass-card p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Target size={18} className="text-blue-400" />
            SDG Отчётность
          </h3>
          <div className="space-y-4">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {modules.reports.map((report: any) => (
              <div key={report.id} className="p-4 bg-white/5 rounded-xl">
                <div className="flex justify-between items-center mb-3">
                  <div className="font-medium">{report.title}</div>
                  <div className={cn("text-2xl font-black",
                    report.score >= 90 ? "text-green-400" : report.score >= 80 ? "text-yellow-400" : "text-orange-400"
                  )}>{report.score}%</div>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                  <div className={cn("h-full",
                    report.score >= 90 ? "bg-green-500" : report.score >= 80 ? "bg-yellow-500" : "bg-orange-500"
                  )} style={{ width: `${report.score}%` }} />
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Обновлено: {report.lastUpdate}</span>
                  <span className={report.trend.includes('+') ? "text-green-400" : "text-red-400"}>{report.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }

  // ========== INFRASTRUCTURE CABINET ==========
  if (type === "infrastructure") {
    if (tab === "assets" && modules?.assets) {
      return (
        <div className="glass-card p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Building2 size={18} className="text-orange-400" />
            Управление активами
          </h3>
          <div className="space-y-4">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {modules.assets.map((asset: any, i: number) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center",
                    asset.status === "online" ? "bg-green-500/20 text-green-400" : 
                    asset.status === "warning" ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"
                  )}>
                    {asset.type === "pump" && <Activity size={24} />}
                    {asset.type === "treatment" && <Droplets size={24} />}
                    {asset.type === "reservoir" && <Database size={24} />}
                    {asset.type === "sensor" && <Cpu size={24} />}
                    {asset.type === "desalination" && <Waves size={24} />}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{asset.name}</div>
                    <div className="text-xs text-slate-500">{asset.location} • {asset.power || asset.capacity || asset.volume || asset.model}</div>
                  </div>
                  <div className="text-right">
                    <div className={cn("text-sm font-bold",
                      asset.status === "online" ? "text-green-400" : asset.status === "warning" ? "text-yellow-400" : "text-red-400"
                    )}>{asset.status === "online" ? "Online" : asset.status === "warning" ? "Warning" : "Offline"}</div>
                    {asset.efficiency > 0 && <div className="text-xs text-slate-500">{asset.efficiency}% эффективность</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (tab === "iot" && modules?.iot) {
      return (
        <div className="glass-card p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Cpu size={18} className="text-orange-400" />
            IoT Мониторинг
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {modules.iot.map((sensor: any) => (
              <div key={sensor.id} className="p-4 bg-white/5 rounded-xl">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-medium text-sm">{sensor.name}</div>
                    <div className="text-xs text-slate-500">{sensor.id}</div>
                  </div>
                  <div className={cn("w-2 h-2 rounded-full animate-pulse",
                    sensor.status === "online" ? "bg-green-500" : "bg-yellow-500"
                  )} />
                </div>
                <div className="text-2xl font-black mb-2">{sensor.value}</div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <div className={cn("w-1.5 h-3 rounded-full",
                      sensor.battery > 50 ? "bg-green-500" : sensor.battery > 20 ? "bg-yellow-500" : "bg-red-500"
                    )} />
                    {sensor.battery}%
                  </span>
                  <span>{sensor.lastUpdate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (tab === "maintenance" && modules?.maintenance) {
      return (
        <div className="glass-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold flex items-center gap-2">
              <Wrench size={18} className="text-orange-400" />
              Обслуживание
            </h3>
            <button className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-lg text-sm font-bold">+ Новая задача</button>
          </div>
          <div className="space-y-3">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {modules.maintenance.map((task: any) => (
              <div key={task.id} className="p-4 bg-white/5 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium">{task.asset}</div>
                    <div className="text-sm text-slate-400">{task.task}</div>
                  </div>
                  <span className={cn("px-2 py-0.5 rounded text-xs font-bold",
                    task.priority === "critical" ? "bg-red-500/20 text-red-400" :
                    task.priority === "high" ? "bg-orange-500/20 text-orange-400" :
                    task.priority === "medium" ? "bg-yellow-500/20 text-yellow-400" : "bg-slate-500/20 text-slate-400"
                  )}>{task.priority}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>{task.scheduled}</span>
                  <span>{task.team}</span>
                  <span className={cn(
                    task.status === "in_progress" ? "text-orange-400" :
                    task.status === "scheduled" ? "text-blue-400" : "text-slate-400"
                  )}>{task.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (tab === "alerts" && modules?.alerts) {
      return (
        <div className="glass-card p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Bell size={18} className="text-orange-400" />
            Оповещения
          </h3>
          <div className="space-y-3">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {modules.alerts.map((alert: any) => (
              <div key={alert.id} className={cn("p-4 rounded-xl border flex items-start gap-4",
                alert.type === "critical" ? "bg-red-500/10 border-red-500/30" :
                alert.type === "warning" ? "bg-yellow-500/10 border-yellow-500/30" : "bg-blue-500/10 border-blue-500/30"
              )}>
                <AlertTriangle className={cn(
                  alert.type === "critical" ? "text-red-400" :
                  alert.type === "warning" ? "text-yellow-400" : "text-blue-400"
                )} size={20} />
                <div className="flex-1">
                  <div className="font-medium">{alert.title}</div>
                  <div className="text-xs text-slate-400">{alert.asset}</div>
                  <div className="text-xs text-slate-500 mt-1">{alert.time}</div>
                </div>
                {!alert.acknowledged && (
                  <button className="px-3 py-1 bg-white/10 rounded-lg text-xs font-bold hover:bg-white/20">
                    Принять
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }
  }

  // ========== INVESTOR CABINET ==========
  if (type === "investor") {
    if (tab === "portfolio" && modules?.portfolio) {
      return (
        <div className="glass-card p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Wallet size={18} className="text-emerald-400" />
            Инвестиционный портфель
          </h3>
          <div className="space-y-4">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {modules.portfolio.map((item: any, i: number) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-slate-500">{item.type} • {item.risk} risk</div>
                  </div>
                  <span className={cn("font-bold", item.change.includes('+') ? "text-green-400" : "text-red-400")}>
                    {item.change}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${item.allocation}%` }} />
                  </div>
                  <span className="text-sm font-bold">${item.value.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (tab === "projects" && modules?.projects) {
      return (
        <div className="glass-card p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Target size={18} className="text-emerald-400" />
            Инвестиционные проекты
          </h3>
          <div className="space-y-4">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {modules.projects.map((project: any) => (
              <div key={project.id} className="p-4 bg-white/5 rounded-xl">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-medium">{project.name}</div>
                    <div className="text-xs text-slate-500">IRR: {project.irr} • ESG: {project.esg}</div>
                  </div>
                  <span className={cn("px-2 py-0.5 rounded text-xs font-bold",
                    project.status === "Active" ? "bg-green-500/20 text-green-400" :
                    project.status === "Funding" ? "bg-yellow-500/20 text-yellow-400" : "bg-slate-500/20 text-slate-400"
                  )}>{project.status}</span>
                </div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${project.progress}%` }} />
                  </div>
                  <span className="text-sm text-slate-400">{project.progress}%</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Инвестировано: {project.invested}</span>
                  <span>Цель: {project.target}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (tab === "market" && modules?.market) {
      return (
        <div className="glass-card p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-emerald-400" />
            Рынок токенов
          </h3>
          <div className="space-y-3">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {modules.market.map((pair: any, i: number) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl flex items-center gap-4">
                <div className="flex-1">
                  <div className="font-medium">{pair.pair}</div>
                  <div className="text-xs text-slate-500">Vol: {pair.volume}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">${pair.price}</div>
                  <div className={cn("text-xs", pair.change24h.includes('+') ? "text-green-400" : "text-red-400")}>
                    {pair.change24h}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (tab === "esg" && modules?.esg) {
      return (
        <div className="glass-card p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Leaf size={18} className="text-emerald-400" />
            ESG Отчёт
          </h3>
          <div className="space-y-4">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {modules.esg.map((category: any, i: number) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl">
                <div className="flex justify-between items-center mb-3">
                  <div className="font-medium">{category.category}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-emerald-400">{category.score}</span>
                    <span className={cn("text-xs", category.trend > 0 ? "text-green-400" : "text-red-400")}>
                      {category.trend > 0 ? "+" : ""}{category.trend}%
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.metrics.map((metric: string, j: number) => (
                    <span key={j} className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs">
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }

  // ========== SCIENCE CABINET ==========
  if (type === "science") {
    if (tab === "research" && modules?.research) {
      return (
        <div className="glass-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold flex items-center gap-2">
              <Beaker size={18} className="text-purple-400" />
              Исследовательские проекты
            </h3>
            <button className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg text-sm font-bold">+ Новый проект</button>
          </div>
          <div className="space-y-4">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {modules.research.map((project: any) => (
              <div key={project.id} className="p-4 bg-white/5 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium">{project.title}</div>
                  <span className={cn("px-2 py-0.5 rounded text-xs font-bold",
                    project.status === "Completed" ? "bg-green-500/20 text-green-400" :
                    project.status === "Active" ? "bg-purple-500/20 text-purple-400" : "bg-slate-500/20 text-slate-400"
                  )}>{project.status}</span>
                </div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500" style={{ width: `${project.progress}%` }} />
                  </div>
                  <span className="text-sm text-slate-400">{project.progress}%</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Команда: {project.team} чел.</span>
                  <span>Бюджет: {project.budget}</span>
                  <span>Публикации: {project.publications}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (tab === "data" && modules?.data) {
      return (
        <div className="glass-card p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Database size={18} className="text-purple-400" />
            Data Lake
          </h3>
          <div className="space-y-3">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {modules.data.map((dataset: any, i: number) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl flex items-center gap-4">
                <Database className="text-purple-400" size={24} />
                <div className="flex-1">
                  <div className="font-medium">{dataset.name}</div>
                  <div className="text-xs text-slate-500">{dataset.records} записей • {dataset.format}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-purple-400">{dataset.size}</div>
                  <span className={cn("text-xs px-2 py-0.5 rounded",
                    dataset.access === "public" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                  )}>{dataset.access}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (tab === "models" && modules?.models) {
      return (
        <div className="glass-card p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Cpu size={18} className="text-purple-400" />
            ML Модели
          </h3>
          <div className="space-y-3">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {modules.models.map((model: any, i: number) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium">{model.name}</div>
                    <div className="text-xs text-slate-500">{model.type} • v{model.version}</div>
                  </div>
                  <span className={cn("px-2 py-0.5 rounded text-xs font-bold",
                    model.status === "production" ? "bg-green-500/20 text-green-400" :
                    model.status === "beta" ? "bg-yellow-500/20 text-yellow-400" : "bg-slate-500/20 text-slate-400"
                  )}>{model.status}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Точность: <span className="text-purple-400 font-bold">{model.accuracy}%</span></span>
                  <span>Latency: {model.latency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (tab === "api" && modules?.api) {
      return (
        <div className="glass-card p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Settings size={18} className="text-purple-400" />
            API Endpoints
          </h3>
          <div className="space-y-3">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {modules.api.map((endpoint: any, i: number) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl font-mono text-sm">
                <div className="flex items-center gap-3 mb-2">
                  <span className={cn("px-2 py-0.5 rounded text-xs font-bold",
                    endpoint.method === "GET" ? "bg-green-500/20 text-green-400" :
                    endpoint.method === "POST" ? "bg-blue-500/20 text-blue-400" : "bg-purple-500/20 text-purple-400"
                  )}>{endpoint.method}</span>
                  <span className="text-slate-300">{endpoint.endpoint}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>{endpoint.calls}</span>
                  <span>{endpoint.latency}</span>
                  <span className={endpoint.status === "stable" ? "text-green-400" : "text-yellow-400"}>{endpoint.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }

  // ========== OPERATOR CABINET ==========
  if (type === "operator") {
    if (tab === "control" && modules?.control) {
      return (
        <div className="glass-card p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Settings size={18} className="text-slate-400" />
            Системный мониторинг
          </h3>
          <div className="space-y-4">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {modules.control.map((service: any, i: number) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl">
                <div className="flex items-center gap-4 mb-3">
                  <div className={cn("w-3 h-3 rounded-full",
                    service.status === "healthy" ? "bg-green-500" : "bg-yellow-500"
                  )} />
                  <div className="flex-1">
                    <div className="font-medium">{service.service}</div>
                    <div className="text-xs text-slate-500">{service.instances} instances • {service.latency}</div>
                  </div>
                  <div className="text-right text-sm text-slate-400">{service.requests}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">CPU</div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className={cn("h-full",
                        service.cpu > 80 ? "bg-red-500" : service.cpu > 60 ? "bg-yellow-500" : "bg-green-500"
                      )} style={{ width: `${service.cpu}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Memory</div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className={cn("h-full",
                        service.memory > 80 ? "bg-red-500" : service.memory > 60 ? "bg-yellow-500" : "bg-green-500"
                      )} style={{ width: `${service.memory}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (tab === "alerts" && modules?.alerts) {
      return (
        <div className="glass-card p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Bell size={18} className="text-slate-400" />
            Системные алерты
          </h3>
          <div className="space-y-3">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {modules.alerts.map((alert: any) => (
              <div key={alert.id} className={cn("p-4 rounded-xl border",
                alert.type === "warning" ? "bg-yellow-500/10 border-yellow-500/30" :
                alert.type === "resolved" ? "bg-green-500/10 border-green-500/30" : "bg-blue-500/10 border-blue-500/30"
              )}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{alert.title}</div>
                    <div className="text-xs text-slate-400">{alert.service}</div>
                  </div>
                  <span className={cn("px-2 py-0.5 rounded text-xs font-bold",
                    alert.status === "investigating" ? "bg-yellow-500/20 text-yellow-400" :
                    alert.status === "resolved" ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"
                  )}>{alert.status}</span>
                </div>
                <div className="text-xs text-slate-500 mt-2">{alert.time}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (tab === "logs" && modules?.logs) {
      return (
        <div className="glass-card p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <FileText size={18} className="text-slate-400" />
            Системные логи
          </h3>
          <div className="space-y-2 font-mono text-xs">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {modules.logs.map((log: any, i: number) => (
              <div key={i} className="p-3 bg-black/40 rounded-lg flex items-start gap-3">
                <span className="text-slate-600 shrink-0">{log.timestamp}</span>
                <span className={cn("shrink-0 px-1.5 py-0.5 rounded font-bold",
                  log.level === "ERROR" ? "bg-red-500/20 text-red-400" :
                  log.level === "WARN" ? "bg-yellow-500/20 text-yellow-400" :
                  log.level === "DEBUG" ? "bg-purple-500/20 text-purple-400" : "bg-blue-500/20 text-blue-400"
                )}>{log.level}</span>
                <span className="text-slate-500">[{log.service}]</span>
                <span className="text-slate-300">{log.message}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (tab === "support" && modules?.support) {
      return (
        <div className="glass-card p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <MessageSquare size={18} className="text-slate-400" />
            Тикеты поддержки
          </h3>
          <div className="space-y-3">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {modules.support.map((ticket: any) => (
              <div key={ticket.id} className="p-4 bg-white/5 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium">{ticket.title}</div>
                    <div className="text-xs text-slate-500">{ticket.id} • {ticket.user}</div>
                  </div>
                  <span className={cn("px-2 py-0.5 rounded text-xs font-bold",
                    ticket.status === "open" ? "bg-red-500/20 text-red-400" :
                    ticket.status === "in_progress" ? "bg-yellow-500/20 text-yellow-400" :
                    ticket.status === "resolved" ? "bg-green-500/20 text-green-400" : "bg-slate-500/20 text-slate-400"
                  )}>{ticket.status}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span className={cn(
                    ticket.priority === "high" ? "text-red-400" :
                    ticket.priority === "medium" ? "text-yellow-400" : "text-slate-400"
                  )}>Priority: {ticket.priority}</span>
                  <span>{ticket.created}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }

  // ========== ADMIN CABINET ==========
  if (type === "admin") {
    if (tab === "users" && modules?.users) {
      return (
        <div className="glass-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold flex items-center gap-2">
              <Users size={18} className="text-red-400" />
              Управление пользователями
            </h3>
            <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm font-bold">+ Новый пользователь</button>
          </div>
          <div className="space-y-3">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {modules.users.map((user: any) => (
              <div key={user.id} className="p-4 bg-white/5 rounded-xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold">
                  {user.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs text-slate-500">{user.email}</div>
                </div>
                <div className="text-center px-4">
                  <div className="text-xs text-slate-500">Роль</div>
                  <div className="font-medium text-red-400">{user.role}</div>
                </div>
                <div className="text-center px-4">
                  <div className="text-xs text-slate-500">VOD</div>
                  <div className="font-medium">{user.vod.toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className={cn("text-sm font-bold", user.status === "Active" ? "text-green-400" : "text-yellow-400")}>
                    {user.status}
                  </div>
                  <div className="text-xs text-slate-500">Last: {user.lastLogin}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (tab === "roles" && modules?.roles) {
      return (
        <div className="glass-card p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <ShieldCheck size={18} className="text-red-400" />
            Управление ролями
          </h3>
          <div className="space-y-3">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {modules.roles.map((role: any) => (
              <div key={role.id} className="p-4 bg-white/5 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium">{role.name}</div>
                    <div className="text-xs text-slate-500">{role.description}</div>
                  </div>
                  <span className={cn("px-2 py-0.5 rounded text-xs font-bold",
                    role.level === "critical" ? "bg-red-500/20 text-red-400" :
                    role.level === "high" ? "bg-orange-500/20 text-orange-400" :
                    role.level === "medium" ? "bg-yellow-500/20 text-yellow-400" : "bg-slate-500/20 text-slate-400"
                  )}>{role.level}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>{role.permissions} разрешений</span>
                  <span>{role.users} пользователей</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (tab === "audit" && modules?.audit) {
      return (
        <div className="glass-card p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <History size={18} className="text-red-400" />
            Журнал аудита
          </h3>
          <div className="space-y-2">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {modules.audit.map((log: any) => (
              <div key={log.id} className="p-3 bg-white/5 rounded-xl flex items-center gap-4 text-sm">
                <div className={cn("w-2 h-2 rounded-full shrink-0",
                  log.status === "success" ? "bg-green-500" :
                  log.status === "failed" ? "bg-red-500" : "bg-yellow-500"
                )} />
                <span className="text-slate-500 shrink-0">{log.timestamp}</span>
                <span className="font-medium">{log.action}</span>
                <span className="text-slate-400">@{log.user}</span>
                <span className="text-xs text-slate-600 ml-auto">{log.ip}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (tab === "config" && modules?.config) {
      return (
        <div className="glass-card p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Cog size={18} className="text-red-400" />
            Системные настройки
          </h3>
          <div className="space-y-3">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {modules.config.map((setting: any, i: number) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl flex items-center gap-4">
                <div className="flex-1">
                  <div className="font-mono text-sm text-slate-300">{setting.key}</div>
                  <div className="text-xs text-slate-500">{setting.description}</div>
                </div>
                <div className="flex items-center gap-3">
                  {setting.type === "boolean" ? (
                    <div className={cn("w-12 h-6 rounded-full p-1 transition-colors cursor-pointer",
                      setting.value === "true" ? "bg-green-500" : "bg-slate-600"
                    )}>
                      <div className={cn("w-4 h-4 rounded-full bg-white transition-transform",
                        setting.value === "true" ? "translate-x-6" : ""
                      )} />
                    </div>
                  ) : (
                    <input
                      type="text"
                      defaultValue={setting.value}
                      disabled={!setting.editable}
                      className={cn("px-3 py-1.5 bg-black/30 border border-white/10 rounded-lg text-sm",
                        !setting.editable && "opacity-50 cursor-not-allowed"
                      )}
                    />
                  )}
                  {setting.editable && (
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <Save size={16} className="text-slate-400" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }

  // Default Content
  return (
    <div className="glass-card p-8 min-h-[400px] flex flex-col items-center justify-center text-center">
      <Activity className="text-slate-800 mb-6 animate-pulse" size={64} />
      <h3 className="text-2xl font-black mb-3">Модуль в разработке</h3>
      <p className="text-slate-400 max-w-sm text-sm mb-8">
        Функционал этой вкладки находится в активной разработке и будет доступен в ближайшем обновлении.
      </p>
      <div className="px-6 py-2 rounded-full border border-white/10 text-xs font-bold uppercase tracking-widest text-slate-600">
        Status: Development
      </div>
    </div>
  );
}
