"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import {
  Globe, Shield, Zap, Droplets, ArrowRight, CheckCircle2, Cpu,
  Database, Network, Building2, Landmark, TrendingUp, Users,
  ChevronDown, BookOpen, Gamepad2, Layers, Lock, GraduationCap,
  Smartphone, BarChart3, Wallet, Vote, FileText, Play, Pause,
  MapPin, Activity, Leaf, Heart, Beaker, Settings, UserCheck,
  Coins, Gift, Star, Trophy, Target, Clock, DollarSign, Percent,
  X, ChevronRight, ExternalLink, AlertTriangle, Waves, Sparkles,
  Box, Cpu as CpuIcon, Share2, Radio, Satellite, FlaskConical,
  Package, Wrench, Award, Droplet, Factory, Ruler, Thermometer,
  TestTube, Bluetooth, Battery, Timer, CircleDollarSign
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import BuyTokenWidget from "@/components/BuyTokenWidget";

// Динамический импорт Globe3D для избежания SSR проблем
const Globe3D = dynamic(() => import("@/components/Globe3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
    </div>
  ),
});

// Система наград Learn-to-Earn
interface LearnReward {
  stage: number;
  xp: number;
  vod: number;
  badge?: string;
  description: string;
}

const learnRewards: LearnReward[] = [
  { stage: 0, xp: 1, vod: 0, description: "Начало путешествия" },
  { stage: 1, xp: 2, vod: 0, description: "Капли жизни" },
  { stage: 2, xp: 3, vod: 0, description: "Глобальный масштаб" },
  { stage: 3, xp: 5, vod: 0, description: "Статистика ресурсов" },
  { stage: 4, xp: 5, vod: 0, description: "Осознание кризиса" },
  { stage: 5, xp: 10, vod: 0, description: "Погружение в блокчейн" },
  { stage: 6, xp: 10, vod: 0, description: "Изучение технологий" },
  { stage: 7, xp: 20, vod: 30, badge: "Водный Исследователь", description: "Полное прохождение" },
];

// Типы
interface InfoPoint {
  id: string;
  x: number;
  y: number;
  title: string;
  shortDesc: string;
  fullDesc: string;
  stats?: { label: string; value: string }[];
  icon: any;
  color: string;
}

// Данные о воде для статистики
const waterStats = {
  total: "1.386 млрд км³",
  freshwater: "2.5%",
  accessible: "0.007%",
  consumption: "4 трлн м³/год",
  population_no_access: "2.2 млрд",
  deficit_by_2030: "40%",
  infrastructure_loss: "$500 млрд/год",
  investment_gap: "$114 млрд/год",
};

// Регионы с проблемами воды
const problemRegions = [
  { name: "Ближний Восток", severity: "critical", color: "#8B0000", lat: 30, lng: 45, issue: "Острый дефицит" },
  { name: "Северная Африка", severity: "critical", color: "#B22222", lat: 25, lng: 15, issue: "Опустынивание" },
  { name: "Центральная Азия", severity: "high", color: "#CD5C5C", lat: 42, lng: 65, issue: "Аральский кризис" },
  { name: "Южная Азия", severity: "high", color: "#F08080", lat: 20, lng: 78, issue: "Загрязнение" },
  { name: "Австралия", severity: "medium", color: "#FFA07A", lat: -25, lng: 135, issue: "Засухи" },
];

// Слои блокчейн-сети
const blockchainLayers = [
  { id: "physical", name: "Физический слой", desc: "Реальные водные объекты, станции, очистные сооружения", icon: Globe, color: "#3B82F6" },
  { id: "iot", name: "IoT & Data", desc: "Датчики, телеметрия, спутниковые данные, VOD Check", icon: Radio, color: "#06B6D4" },
  { id: "blockchain", name: "Блокчейн", desc: "Неизменяемое хранение, хэширование, смарт-контракты", icon: Shield, color: "#8B5CF6" },
  { id: "economic", name: "Экономика", desc: "Токеномика VOD, стейкинг, инвестиционные пулы", icon: Coins, color: "#EAB308" },
  { id: "dao", name: "DAO", desc: "Децентрализованное управление, голосования, казначейство", icon: Vote, color: "#22C55E" },
  { id: "ai", name: "AI Analytics", desc: "Машинное обучение, прогнозирование, оптимизация", icon: Cpu, color: "#EC4899" },
];

// Инструменты и технологии
const technologies = [
  { name: "VOD Check", desc: "Мобильное приложение для гражданского мониторинга воды", icon: Smartphone, status: "В разработке" },
  { name: "Digital Twins", desc: "3D-модели объектов с синхронизацией блокчейна", icon: Box, status: "Проектирование" },
  { name: "AI Engine", desc: "Предиктивные модели для анализа дефицита и загрязнения", icon: CpuIcon, status: "Сбор данных" },
  { name: "DAO Governance", desc: "Система голосования с делегированием и казной", icon: Vote, status: "MVP готов" },
  { name: "TokenHub", desc: "Инвестиционная платформа для проектов", icon: Coins, status: "Реализация" },
  { name: "Integration SDK", desc: "Инструменты для подключения IoT и гос. систем", icon: Share2, status: "Архитектура" },
];

// Карточки проектов - Выполненные
const completedProjects = [
  { title: "Концепция платформы", cost: 15000, desc: "Архитектура, документация, бизнес-модель", status: "100%" },
  { title: "UI/UX дизайн", cost: 12000, desc: "Дизайн-система, прототипы всех страниц", status: "100%" },
  { title: "Frontend MVP", cost: 25000, desc: "Next.js приложение, 20+ страниц", status: "80%" },
  { title: "Whitepaper v1", cost: 8000, desc: "Техническая документация, токеномика", status: "100%" },
  { title: "DAO система (демо)", cost: 10000, desc: "Голосования, предложения, награды", status: "70%" },
  { title: "Социальная сеть (демо)", cost: 15000, desc: "Посты, сообщения, друзья, группы", status: "60%" },
  { title: "Исследования рынка", cost: 8000, desc: "Анализ конкурентов, целевой аудитории", status: "100%" },
  { title: "Юридическая база", cost: 7000, desc: "Регистрация, compliance, структура", status: "50%" },
];

// Карточки проектов - Планируемые
const plannedProjects = [
  { title: "TON Blockchain интеграция", cost: 45000, desc: "Смарт-контракты, токен VOD на блокчейне", icon: Shield },
  { title: "IoT датчики v1", cost: 35000, desc: "Прототип датчиков с блокчейн-интеграцией", icon: Radio },
  { title: "Экспедитор Воды 3.0", cost: 25000, desc: "Карманный набор анализа воды с приложением", icon: FlaskConical },
  { title: "AI Analytics Engine", cost: 40000, desc: "ML модели прогнозирования дефицита", icon: Cpu },
  { title: "Backend Infrastructure", cost: 30000, desc: "Серверы, API, базы данных, real-time", icon: Database },
  { title: "Security & Audit", cost: 20000, desc: "Аудит безопасности, penetration testing", icon: Lock },
  { title: "Маркетинг & PR", cost: 35000, desc: "Запуск, партнёрства, сообщество", icon: TrendingUp },
  { title: "Поддержка & Развитие", cost: 20000, desc: "Техподдержка, обновления, хостинг", icon: Wrench },
];

// Детальная информация об Экспедиторе Воды 3.0
const expeditorInfo = {
  name: "Экспедитор Воды 3.0",
  subtitle: "Карманный набор анализа воды",
  price: 169,
  preorderPrice: 99,
  discount: 40,
  parameters: [
    { name: "pH", range: "0-14", accuracy: "±0.1", icon: TestTube },
    { name: "TDS", range: "0-9999 ppm", accuracy: "±5 ppm", icon: Droplet },
    { name: "Температура", range: "0-60°C", accuracy: "±0.5°C", icon: Thermometer },
    { name: "Хлор", range: "0-10 mg/L", accuracy: "±0.1 mg/L", icon: Beaker },
    { name: "Жёсткость", range: "0-500 ppm", accuracy: "±10 ppm", icon: Factory },
  ],
  specs: [
    { label: "Точность", value: "Профессиональная" },
    { label: "Автономность", value: "100+ измерений" },
    { label: "Время анализа", value: "10 секунд" },
    { label: "Синхронизация", value: "Bluetooth + TON" },
    { label: "Награды", value: "1-5 VOD/измерение" },
    { label: "Вес", value: "120 грамм" },
  ],
  included: [
    "Датчик-анализатор (5 параметров)",
    "USB-C кабель зарядки",
    "Калибровочные растворы (3 шт)",
    "Пробирки (10 шт)",
    "Водонепроницаемый кейс",
    "QR-инструкция",
  ],
};

// Полная информация о 12 архитектурных слоях
const architectureLayers = [
  {
    id: "physical",
    name: "1. Физический слой",
    icon: Globe,
    color: "#3B82F6",
    shortDesc: "Реальные водные объекты и инфраструктура",
    fullDesc: `КОМПОНЕНТЫ:
• Реки, озёра, водохранилища
• Плотины и дамбы
• Насосные станции
• Станции водоподготовки
• Очистные сооружения
• Трубопроводы и магистрали
• Мелиоративные системы
• Каналы и акведуки

СОБИРАЕМЫЕ ДАННЫЕ:
• Уровень воды (м)
• Температура (°C)
• Скорость потока (м³/сек)
• Давление (бар)
• Объём (м³)
• Износ оборудования (%)`,
    stats: [
      { label: "Объектов в мире", value: "1+ млн" },
      { label: "Длина трубопроводов", value: "2.5 млн км" },
      { label: "Станций подготовки", value: "500,000+" },
    ],
  },
  {
    id: "iot",
    name: "2. IoT & Data слой",
    icon: Radio,
    color: "#06B6D4",
    shortDesc: "Датчики, телеметрия, спутниковые данные",
    fullDesc: `ТИПЫ УСТРОЙСТВ:
• VOD Check — ручные анализаторы
• Стационарные датчики качества
• Расходомеры и датчики давления
• Уровнемеры и датчики уровня
• Спутниковые системы (Sentinel, Landsat)
• Дроны для визуального мониторинга
• Мобильные приложения

ПРОТОКОЛЫ:
• MQTT для IoT устройств
• LoRaWAN для дальней связи
• HTTP/HTTPS для мобильных
• WebSocket для real-time

ЧАСТОТА ДАННЫХ:
• Критические: каждую минуту
• Стандартные: каждый час
• Периодические: ежедневно`,
    stats: [
      { label: "Типов датчиков", value: "15+" },
      { label: "Параметров воды", value: "25+" },
      { label: "Частота сбора", value: "1 мин - 1 день" },
    ],
  },
  {
    id: "blockchain",
    name: "3. Блокчейн слой (TON)",
    icon: Shield,
    color: "#8B5CF6",
    shortDesc: "Неизменяемое хранение, смарт-контракты",
    fullDesc: `СЕТЬ: TON (The Open Network)

СМАРТ-КОНТРАКТЫ:
• Регистрация объектов инфраструктуры
• Запись данных с хэшированием
• DAO голосования и решения
• Управление токенами VOD
• Эскроу для инвестиций
• NFT паспорта объектов

L2-РЕШЕНИЕ: zkSync Rollup
• Масштабируемость до 100,000 TPS
• Низкие комиссии (<$0.01)
• Ethereum совместимость

ИНТЕГРАЦИИ:
• Telegram Mini App
• TON Connect для кошельков
• Jettons для токенов`,
    stats: [
      { label: "TPS сети", value: "100,000+" },
      { label: "Комиссия", value: "<$0.01" },
      { label: "Финальность", value: "~5 сек" },
    ],
  },
  {
    id: "economic",
    name: "4. Экономический слой",
    icon: Coins,
    color: "#EAB308",
    shortDesc: "Токеномика VOD, стейкинг, пулы",
    fullDesc: `ТОКЕН VOD:
• Тип: Utility + Governance
• Эмиссия: 1,000,000,000 VOD
• Сеть: TON Network

РАСПРЕДЕЛЕНИЕ:
• 40% — Экосистема и награды
• 20% — Команда (4-летний vesting)
• 15% — Инвесторы
• 10% — DAO Treasury
• 10% — Маркетинг
• 5% — Советники

ДОПОЛНИТЕЛЬНЫЕ ТОКЕНЫ:
• R-VOD — награды за активность
• P-VOD — привязка к проектам
• VODG — governance голосование
• VODP — participation
• VODU — utility

СТЕЙКИНГ ПУЛЫ:
• Governance: APY 15%, лок 6 мес
• Data Access: APY 12%, лок 3 мес
• Project: APY 20-30%`,
    stats: [
      { label: "Эмиссия", value: "1 млрд VOD" },
      { label: "APY стейкинг", value: "12-30%" },
      { label: "Вестинг команды", value: "4 года" },
    ],
  },
  {
    id: "dao",
    name: "5. DAO слой",
    icon: Vote,
    color: "#22C55E",
    shortDesc: "Децентрализованное управление",
    fullDesc: `СТРУКТУРА DAO VOD:
• Общее собрание (все держатели)
• Совет директоров (топ-100 стейкеров)
• Рабочие группы по темам
• Независимые аудиторы
• Мультисиг казначейство

ТИПЫ ГОЛОСОВАНИЙ:
• Распределение бюджета
• Одобрение новых проектов
• Изменение параметров системы
• Стратегические партнёрства
• Кризисные решения

ВОЗНАГРАЖДЕНИЯ:
• За голосование: +5 VOD
• За принятое предложение: +100 VOD
• За активность: +10% APY

КВОРУМ: 10% от стейка
ПЕРИОД ГОЛОСОВАНИЯ: 7 дней`,
    stats: [
      { label: "Кворум", value: "10%" },
      { label: "За голосование", value: "+5 VOD" },
      { label: "Период", value: "7 дней" },
    ],
  },
  {
    id: "interface",
    name: "6. Пользовательский слой",
    icon: Smartphone,
    color: "#F97316",
    shortDesc: "7 кабинетов, дашборды",
    fullDesc: `7 СПЕЦИАЛИЗИРОВАННЫХ КАБИНЕТОВ:

👤 ГРАЖДАНСКИЙ:
• Мониторинг воды в районе
• Подача жалоб и инициатив
• DAO голосования
• Геймификация и награды

🏛️ ПРАВИТЕЛЬСТВЕННЫЙ:
• Региональная аналитика
• Кризисные панели
• KPI и отчётность

🏗️ ИНФРАСТРУКТУРНЫЙ:
• Управление объектами
• IoT интеграция
• Цифровые двойники

💼 ИНВЕСТИЦИОННЫЙ:
• ESG метрики
• ROI калькулятор
• Портфель проектов

🔬 НАУЧНЫЙ:
• OpenData API
• ML модели
• Публикации

⚙️ ОПЕРАТОРСКИЙ:
• Мониторинг 24/7
• Техподдержка

🔐 АДМИНИСТРАТИВНЫЙ:
• Управление ролями
• Безопасность`,
    stats: [
      { label: "Кабинетов", value: "7" },
      { label: "Ролей", value: "12+" },
      { label: "Языков", value: "3 (RU/EN/AR)" },
    ],
  },
  {
    id: "ai",
    name: "7. AI слой",
    icon: Cpu,
    color: "#EC4899",
    shortDesc: "ML-модели, прогнозы, оптимизация",
    fullDesc: `ML МОДЕЛИ:
• Прогноз потребления воды
• Обнаружение аномалий
• Предсказание аварий
• Оптимизация распределения
• Анализ качества воды
• Детекция утечек

ТЕХНОЛОГИИ:
• Python + FastAPI
• TensorFlow / PyTorch
• Time Series Forecasting
• Computer Vision для спутников
• NLP для анализа жалоб

ВОЗМОЖНОСТИ:
• Прогноз на 7 дней вперёд
• Точность >90% на известных объектах
• Рекомендации по оптимизации
• Автоматические алерты`,
    stats: [
      { label: "Точность прогноза", value: ">90%" },
      { label: "Горизонт", value: "7 дней" },
      { label: "Моделей", value: "10+" },
    ],
  },
  {
    id: "security",
    name: "8. Слой безопасности",
    icon: Lock,
    color: "#EF4444",
    shortDesc: "Шифрование, аудит, защита",
    fullDesc: `ЗАЩИТА ДАННЫХ:
• End-to-end шифрование
• AES-256 для хранения
• TLS 1.3 для передачи
• Хэширование на блокчейне

АУТЕНТИФИКАЦИЯ:
• JWT токены
• Wallet Connect (TON)
• 2FA для критических операций
• Биометрия (мобильные)

АУДИТ:
• Логирование всех действий
• Регулярный penetration testing
• Bug bounty программа
• Внешний аудит смарт-контрактов

СООТВЕТСТВИЕ:
• GDPR (ЕС)
• ISO 27001
• SOC 2 Type II`,
    stats: [
      { label: "Шифрование", value: "AES-256" },
      { label: "Стандарты", value: "ISO 27001" },
      { label: "Bug Bounty", value: "До $10,000" },
    ],
  },
  {
    id: "education",
    name: "9. Образовательный слой",
    icon: GraduationCap,
    color: "#06B6D4",
    shortDesc: "Курсы, гранты, исследования",
    fullDesc: `ОБРАЗОВАТЕЛЬНЫЕ ПРОГРАММЫ:
• Онлайн-курсы по воде
• Сертификации VODeco
• Вебинары и мастер-классы
• Детские программы

НАУЧНОЕ СООБЩЕСТВО:
• OpenData API для исследователей
• Публикации в журналах
• Совместные проекты с университетами
• Научные конференции

ГРАНТЫ:
• Исследовательские гранты
• Стартап-программы
• Конкурсы инноваций
• Стипендии для студентов

НАГРАДЫ ЗА ОБУЧЕНИЕ:
• XP за прохождение курсов
• Бейджи за сертификаты
• VOD за исследования`,
    stats: [
      { label: "Курсов", value: "20+" },
      { label: "Грантов/год", value: "$100,000" },
      { label: "Партнёров-вузов", value: "10+" },
    ],
  },
  {
    id: "gaming",
    name: "10. Игровой слой",
    icon: Gamepad2,
    color: "#A855F7",
    shortDesc: "Геймификация, NFT, квесты",
    fullDesc: `МЕХАНИКИ ГЕЙМИФИКАЦИИ:
• XP за активность
• Уровни и ранги
• Лидерборды
• Ежедневные миссии
• Еженедельные челленджи

NFT СИСТЕМА:
• Бейджи достижений
• Коллекционные карточки
• Уникальные награды
• Торговля на маркетплейсе

КВЕСТЫ:
• Образовательные квесты
• Мониторинг в своём районе
• Социальные задания
• Сезонные события

НАГРАДЫ:
• VOD токены
• Эксклюзивные NFT
• Ранний доступ
• Голоса в DAO`,
    stats: [
      { label: "Типов миссий", value: "50+" },
      { label: "NFT бейджей", value: "25+" },
      { label: "XP за день", value: "до 100" },
    ],
  },
  {
    id: "social",
    name: "11. Социальный слой",
    icon: Users,
    color: "#06B6D4",
    shortDesc: "Сообщества, форумы, совместные проекты",
    fullDesc: `СОЦИАЛЬНЫЕ ФУНКЦИИ:
• Лента постов
• Личные сообщения
• Друзья и подписки
• Группы по интересам
• Форумы обсуждений

СООБЩЕСТВА:
• Региональные группы
• Профессиональные (учёные, инженеры)
• Тематические (IoT, блокчейн, экология)
• Языковые

СОВМЕСТНЫЕ ПРОЕКТЫ:
• Краудсорсинг мониторинга
• Гражданская наука
• Коллективные инвестиции
• Волонтёрство

МОДЕРАЦИЯ:
• Репутационная система
• Верификация экспертов
• Автомодерация AI`,
    stats: [
      { label: "Групп", value: "100+" },
      { label: "Активных юзеров", value: "10,000+" },
      { label: "Постов/день", value: "1,000+" },
    ],
  },
  {
    id: "integration",
    name: "12. Интеграционный слой",
    icon: Share2,
    color: "#14B8A6",
    shortDesc: "API, SDK, партнёрства",
    fullDesc: `ИНТЕГРАЦИИ С ГОСУДАРСТВАМИ:
• Министерства водных ресурсов
• Агентства по охране окружающей среды
• Муниципальные системы
• Национальные кадастры

МЕЖДУНАРОДНЫЕ ОРГАНИЗАЦИИ:
• ООН (SDG мониторинг)
• Всемирный банк
• Евразийский банк развития
• Greenpeace, Water.org

API & SDK:
• REST API для разработчиков
• GraphQL для сложных запросов
• Webhook для событий
• SDK для IoT устройств

ДОКУМЕНТАЦИЯ:
• OpenAPI спецификация
• Примеры кода
• Песочница для тестов
• Техподдержка разработчиков`,
    stats: [
      { label: "API endpoints", value: "100+" },
      { label: "SDK языков", value: "5" },
      { label: "Партнёров", value: "20+" },
    ],
  },
];

// Участники экосистемы
const stakeholders = [
  {
    id: "government",
    name: "Государство",
    icon: Landmark,
    color: "#3B82F6",
    receives: [
      "Онлайн-мониторинг всей системы водоснабжения",
      "Аналитические прогнозы и сценарные модели",
      "Подсказки ИИ для стратегического планирования",
      "Оценка эффективности ведомств",
      "Контроль исполнения госпрограмм",
    ],
    provides: [
      "Нормативно-правовая база и регламенты",
      "Целевые показатели и KPI",
      "Бюджетные средства и субсидии",
      "Технические задания на модернизацию",
      "Интеграция с национальными системами",
    ],
  },
  {
    id: "infrastructure",
    name: "Объекты инфраструктуры",
    icon: Factory,
    color: "#06B6D4",
    receives: [
      "Рекомендации ИИ по оптимизации работы",
      "Инвестиционные сигналы от DAO",
      "Цифровые регламенты и стандарты",
      "Рейтинги и оценки эффективности",
    ],
    provides: [
      "Операционные данные в реальном времени",
      "Технико-экономические показатели",
      "Экологические параметры",
      "Запросы на модернизацию",
    ],
  },
  {
    id: "investors",
    name: "Инвесторы",
    icon: TrendingUp,
    color: "#22C55E",
    receives: [
      "Прозрачная аналитика по объектам",
      "Доступ к DAO-голосованиям",
      "Смарт-контракты для инвестиций",
      "Токенизированная модель дохода",
    ],
    provides: [
      "Инвестиции в проекты",
      "Экспертиза и due diligence",
      "Партнёрские инициативы",
      "Участие в DAO управлении",
    ],
  },
  {
    id: "citizens",
    name: "Граждане",
    icon: Users,
    color: "#A855F7",
    receives: [
      "Информация о качестве воды",
      "Участие в принятии решений",
      "Вознаграждение токенами VOD",
      "Образовательные материалы",
    ],
    provides: [
      "Локальный мониторинг и жалобы",
      "Общественный контроль",
      "Голосование в DAO",
      "Краудсорсинг данных",
    ],
  },
  {
    id: "scientists",
    name: "Научное сообщество",
    icon: Beaker,
    color: "#EC4899",
    receives: [
      "Доступ к массивам данных",
      "Гранты через DAO",
      "Возможность публикаций",
      "Совместные исследования",
    ],
    provides: [
      "Научные модели и алгоритмы",
      "ML-модели для ИИ",
      "Верификация данных",
      "Экспертиза проектов",
    ],
  },
];

// Компонент мигающей точки "Узнать подробнее"
const InfoPointButton = ({ 
  point, 
  onClick, 
  style 
}: { 
  point: InfoPoint; 
  onClick: () => void; 
  style?: React.CSSProperties;
}) => (
  <motion.button
    className="absolute z-20 group"
    style={{ left: `${point.x}%`, top: `${point.y}%`, ...style }}
    onClick={onClick}
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
  >
    <motion.div
      className={cn("w-4 h-4 rounded-full flex items-center justify-center", point.color)}
      animate={{
        boxShadow: [
          "0 0 0 0 rgba(6, 182, 212, 0.4)",
          "0 0 0 15px rgba(6, 182, 212, 0)",
        ],
      }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <div className="w-2 h-2 rounded-full bg-white" />
    </motion.div>
    <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/80 px-2 py-1 rounded text-xs">
      {point.title}
    </div>
  </motion.button>
);

// Модальное окно с подробной информацией
const DetailModal = ({ 
  point, 
  onClose 
}: { 
  point: InfoPoint | null; 
  onClose: () => void;
}) => {
  if (!point) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="max-w-2xl w-full max-h-[80vh] overflow-y-auto bg-gradient-to-br from-ocean-medium to-ocean-deep rounded-3xl border border-cyan-500/30 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-ocean-medium/90 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", point.color)}>
              <point.icon size={24} />
            </div>
            <h3 className="text-2xl font-black">{point.title}</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <p className="text-lg text-slate-300 leading-relaxed">{point.shortDesc}</p>
          
          {point.stats && (
            <div className="grid grid-cols-2 gap-4">
              {point.stats.map((stat, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-2xl font-black text-cyan-400">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
          
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
            <h4 className="font-bold mb-4 text-cyan-400">Подробное описание</h4>
            <p className="text-slate-400 leading-relaxed whitespace-pre-line">{point.fullDesc}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Компонент капли воды
const WaterDrop = ({ 
  delay = 0, 
  onComplete 
}: { 
  delay?: number; 
  onComplete?: () => void;
}) => {
  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 w-8 h-12"
      initial={{ top: "-10%", scale: 0.5, opacity: 0 }}
      animate={{ 
        top: ["0%", "45%"],
        scale: [0.5, 1, 1.5, 2],
        opacity: [0, 1, 1, 1],
      }}
      transition={{ 
        delay, 
        duration: 2,
        times: [0, 0.3, 0.7, 1],
        ease: "easeIn",
      }}
      onAnimationComplete={onComplete}
    >
      <svg viewBox="0 0 32 48" className="w-full h-full">
        <defs>
          <linearGradient id="dropGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
        </defs>
        <path
          d="M16 0 C16 0 32 24 32 36 C32 42.627 24.837 48 16 48 C7.163 48 0 42.627 0 36 C0 24 16 0 16 0 Z"
          fill="url(#dropGradient)"
          opacity="0.9"
        />
        <ellipse cx="12" cy="32" rx="4" ry="6" fill="white" opacity="0.3" />
      </svg>
    </motion.div>
  );
};

// 3D Планета (упрощённая SVG версия)
const Planet = ({ 
  stage, 
  problemColors = false 
}: { 
  stage: number; 
  problemColors?: boolean;
}) => {
  const rotateY = useMotionValue(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      rotateY.set(rotateY.get() + 0.5);
    }, 50);
    return () => clearInterval(interval);
  }, [rotateY]);

  return (
    <motion.div
      className="relative"
      style={{ perspective: 1000 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: stage >= 2 ? 1 : 0,
        opacity: stage >= 2 ? 1 : 0,
      }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <motion.div
        className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full relative overflow-hidden"
        style={{
          background: problemColors 
            ? "radial-gradient(circle at 30% 30%, #1e3a5f, #0f172a)"
            : "radial-gradient(circle at 30% 30%, #1e88e5, #0d47a1)",
          boxShadow: problemColors
            ? "inset -20px -20px 60px rgba(139, 0, 0, 0.4), 0 0 60px rgba(6, 182, 212, 0.3)"
            : "inset -20px -20px 60px rgba(0, 0, 0, 0.4), 0 0 60px rgba(6, 182, 212, 0.3)",
        }}
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        {/* Континенты */}
        <div className="absolute inset-0 opacity-40">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Упрощённые континенты */}
            <ellipse cx="25" cy="35" rx="12" ry="15" fill={problemColors ? "#CD5C5C" : "#22c55e"} />
            <ellipse cx="55" cy="30" rx="18" ry="20" fill={problemColors ? "#8B0000" : "#22c55e"} />
            <ellipse cx="75" cy="45" rx="10" ry="12" fill={problemColors ? "#F08080" : "#22c55e"} />
            <ellipse cx="40" cy="70" rx="15" ry="10" fill={problemColors ? "#B22222" : "#22c55e"} />
            <ellipse cx="80" cy="70" rx="8" ry="10" fill={problemColors ? "#FFA07A" : "#22c55e"} />
          </svg>
        </div>
        
        {/* Облака */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <ellipse cx="20" cy="25" rx="15" ry="5" fill="white" />
            <ellipse cx="60" cy="40" rx="20" ry="6" fill="white" />
            <ellipse cx="35" cy="60" rx="12" ry="4" fill="white" />
            <ellipse cx="75" cy="75" rx="10" ry="4" fill="white" />
          </svg>
        </motion.div>
        
        {/* Свечение атмосферы */}
        <div className="absolute inset-0 rounded-full" 
          style={{
            background: "radial-gradient(circle at 30% 30%, transparent 50%, rgba(6, 182, 212, 0.1) 100%)",
          }}
        />
      </motion.div>
      
      {/* Орбита */}
      <motion.div
        className="absolute inset-0 rounded-full border border-cyan-500/20"
        style={{ transform: "rotateX(70deg)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute w-3 h-3 bg-cyan-400 rounded-full -top-1.5 left-1/2 -translate-x-1/2" />
      </motion.div>
    </motion.div>
  );
};

// Компонент блокчейн-сети под водой
const BlockchainNetwork = ({ visible }: { visible: boolean }) => {
  const nodes = [
    { x: 20, y: 30 }, { x: 50, y: 20 }, { x: 80, y: 35 },
    { x: 15, y: 60 }, { x: 45, y: 50 }, { x: 75, y: 55 },
    { x: 30, y: 80 }, { x: 60, y: 75 }, { x: 85, y: 80 },
  ];

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      {/* Фон под водой */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/50 via-blue-900/70 to-ocean-deep" />
      
      {/* Частицы воды */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-cyan-400/30"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
      
      {/* Связи между узлами */}
      <svg className="absolute inset-0 w-full h-full">
        {nodes.map((node1, i) =>
          nodes.slice(i + 1).map((node2, j) => {
            const distance = Math.sqrt(
              Math.pow(node2.x - node1.x, 2) + Math.pow(node2.y - node1.y, 2)
            );
            if (distance < 40) {
              return (
                <motion.line
                  key={`${i}-${j}`}
                  x1={`${node1.x}%`}
                  y1={`${node1.y}%`}
                  x2={`${node2.x}%`}
                  y2={`${node2.y}%`}
                  stroke="rgba(6, 182, 212, 0.3)"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                />
              );
            }
            return null;
          })
        )}
      </svg>
      
      {/* Узлы сети */}
      {nodes.map((node, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 rounded-full bg-cyan-400/50 border-2 border-cyan-400"
          style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 + i * 0.1 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-cyan-400"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default function InteractivePresentationPage() {
  const [stage, setStage] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [showProblems, setShowProblems] = useState(false);
  const [isUnderwater, setIsUnderwater] = useState(false);
  const [showBlockchain, setShowBlockchain] = useState(false);
  const [showTechnologies, setShowTechnologies] = useState(false);
  const [showProjectHub, setShowProjectHub] = useState(false);
  const [showExpeditor, setShowExpeditor] = useState(false);
  const [showArchitecture, setShowArchitecture] = useState(false);
  const [showStakeholders, setShowStakeholders] = useState(false);
  const [selectedInfoPoint, setSelectedInfoPoint] = useState<InfoPoint | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [use3DGlobe, setUse3DGlobe] = useState(true);
  
  // Learn-to-Earn система наград
  const [earnedXP, setEarnedXP] = useState(0);
  const [earnedVOD, setEarnedVOD] = useState(0);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const [popupsOpened, setPopupsOpened] = useState(0);
  const [stagesCompleted, setStagesCompleted] = useState<number[]>([]);
  const [showRewardNotification, setShowRewardNotification] = useState(false);
  const [lastReward, setLastReward] = useState<{ xp: number; vod: number; badge?: string } | null>(null);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const { user, isAuthenticated } = useAuth();
  
  // Функция начисления награды за этап
  const awardStageReward = useCallback((stageNum: number) => {
    if (stagesCompleted.includes(stageNum)) return;
    
    const reward = learnRewards.find(r => r.stage === stageNum);
    if (reward) {
      setEarnedXP(prev => prev + reward.xp);
      setEarnedVOD(prev => prev + reward.vod);
      if (reward.badge) {
        setEarnedBadges(prev => [...prev, reward.badge!]);
      }
      setStagesCompleted(prev => [...prev, stageNum]);
      setLastReward({ xp: reward.xp, vod: reward.vod, badge: reward.badge });
      setShowRewardNotification(true);
      setTimeout(() => setShowRewardNotification(false), 3000);
    }
  }, [stagesCompleted]);
  
  // Награда за открытие попапа
  const handlePopupOpen = useCallback((point: InfoPoint) => {
    setSelectedInfoPoint(point);
    setPopupsOpened(prev => {
      const newCount = prev + 1;
      // Бонус за каждые 3 попапа
      if (newCount % 3 === 0) {
        setEarnedXP(p => p + 5);
        setLastReward({ xp: 5, vod: 0 });
        setShowRewardNotification(true);
        setTimeout(() => setShowRewardNotification(false), 2000);
      }
      return newCount;
    });
  }, []);

  // Информационные точки для каждого этапа
  const waterInfoPoints: InfoPoint[] = [
    {
      id: "total",
      x: 15,
      y: 30,
      title: "Общий объём воды",
      shortDesc: "1.386 миллиарда кубических километров воды на Земле",
      fullDesc: `Вода покрывает около 71% поверхности Земли. Однако 97.5% этой воды — солёная, находящаяся в океанах и морях.

Из оставшихся 2.5% пресной воды:
• 68.7% заморожено в ледниках и полярных шапках
• 30.1% находится в подземных водах
• 0.3% — в реках и озёрах (доступная вода)

Это означает, что лишь 0.007% от всей воды на Земле доступно для непосредственного использования человечеством.`,
      stats: [
        { label: "Океаны и моря", value: "97.5%" },
        { label: "Пресная вода", value: "2.5%" },
        { label: "Доступная вода", value: "0.007%" },
        { label: "В ледниках", value: "68.7%" },
      ],
      icon: Droplets,
      color: "bg-blue-500",
    },
    {
      id: "consumption",
      x: 85,
      y: 25,
      title: "Мировое потребление",
      shortDesc: "Человечество потребляет 4 триллиона м³ воды ежегодно",
      fullDesc: `Глобальное потребление воды распределяется следующим образом:

• Сельское хозяйство: 70% (орошение, животноводство)
• Промышленность: 20% (производство, охлаждение)
• Бытовое потребление: 10% (питьё, санитария)

Потребление воды выросло в 6 раз за последние 100 лет и продолжает расти на 1% ежегодно.

К 2030 году мировой спрос на воду превысит доступное предложение на 40%.`,
      stats: [
        { label: "Сельское хозяйство", value: "70%" },
        { label: "Промышленность", value: "20%" },
        { label: "Бытовое", value: "10%" },
        { label: "Рост спроса/год", value: "+1%" },
      ],
      icon: TrendingUp,
      color: "bg-cyan-500",
    },
    {
      id: "prices",
      x: 15,
      y: 70,
      title: "Разница в ценах",
      shortDesc: "Цены на воду различаются в 1000 раз между регионами",
      fullDesc: `Стоимость воды драматически различается по миру:

• США: $2.00 за 1000 литров
• Германия: $4.50 за 1000 литров
• Израиль: $3.20 за 1000 литров
• Индия: $0.10 за 1000 литров
• Африка (из бочек): $5-30 за 1000 литров

В развивающихся странах бедные домохозяйства платят в 5-10 раз больше за литр воды, чем богатые, имеющие подключение к водопроводу.`,
      stats: [
        { label: "США", value: "$2.00/м³" },
        { label: "Германия", value: "$4.50/м³" },
        { label: "Африка (бутилир.)", value: "$30/м³" },
        { label: "Разброс цен", value: "1000x" },
      ],
      icon: DollarSign,
      color: "bg-green-500",
    },
  ];

  const problemInfoPoints: InfoPoint[] = [
    {
      id: "deficit",
      x: 85,
      y: 35,
      title: "Водный дефицит",
      shortDesc: "2.2 миллиарда человек не имеют доступа к чистой воде",
      fullDesc: `Водный кризис — это реальность для миллиардов людей:

• 2.2 млрд человек без доступа к безопасной питьевой воде
• 4.2 млрд без надёжной санитарии
• 785 млн без базового водоснабжения
• 3 млрд не могут помыть руки дома

К 2025 году половина населения мира будет жить в условиях водного стресса.

Изменение климата усугубляет ситуацию: засухи становятся чаще и продолжительнее.`,
      stats: [
        { label: "Без чистой воды", value: "2.2 млрд" },
        { label: "Без санитарии", value: "4.2 млрд" },
        { label: "Смерти/год", value: "485,000" },
        { label: "Под угрозой к 2050", value: "5.7 млрд" },
      ],
      icon: AlertTriangle,
      color: "bg-red-500",
    },
    {
      id: "investment",
      x: 15,
      y: 65,
      title: "Инвестиционный разрыв",
      shortDesc: "Дефицит инвестиций составляет $114 млрд в год",
      fullDesc: `Водный сектор хронически недофинансирован:

• Необходимые инвестиции: $150 млрд/год
• Текущие инвестиции: $36 млрд/год
• Дефицит: $114 млрд/год

Потери от неэффективной инфраструктуры:
• 30-50% воды теряется при транспортировке
• $500 млрд ежегодных экономических потерь
• 80% сточных вод сбрасывается без очистки

ROI водных проектов: $4-12 на каждый вложенный $1`,
      stats: [
        { label: "Нужно инвестиций", value: "$150 млрд/год" },
        { label: "Дефицит", value: "$114 млрд/год" },
        { label: "Потери воды", value: "30-50%" },
        { label: "ROI проектов", value: "4-12x" },
      ],
      icon: TrendingUp,
      color: "bg-orange-500",
    },
  ];

  // Автоматическое прохождение стадий
  useEffect(() => {
    if (!autoPlay) return;
    
    const timers: NodeJS.Timeout[] = [];
    
    // Стадия 1: Капли (0-3 сек)
    timers.push(setTimeout(() => setStage(1), 500));
    
    // Стадия 2: Планета появляется (3-5 сек)
    timers.push(setTimeout(() => setStage(2), 3500));
    
    // Стадия 3: Статистика (5-8 сек)
    timers.push(setTimeout(() => {
      setShowStats(true);
      setStage(3);
    }, 5500));
    
    // Стадия 4: Проблемы (8-12 сек)
    timers.push(setTimeout(() => {
      setShowProblems(true);
      setStage(4);
    }, 9000));
    
    return () => timers.forEach(clearTimeout);
  }, [autoPlay]);

  // Ручное управление стадиями с наградами
  const nextStage = () => {
    if (stage === 0) {
      setStage(1);
      awardStageReward(0);
    } else if (stage === 1) {
      setStage(2);
      awardStageReward(1);
    } else if (stage === 2) {
      setShowStats(true);
      setStage(3);
      awardStageReward(2);
    } else if (stage === 3) {
      setShowProblems(true);
      setStage(4);
      awardStageReward(3);
    } else if (stage === 4) {
      setIsUnderwater(true);
      setShowBlockchain(true);
      setStage(5);
      awardStageReward(4);
    } else if (stage === 5) {
      setShowArchitecture(true);
      setStage(6);
      awardStageReward(5);
    } else if (stage === 6) {
      setShowTechnologies(true);
      setShowExpeditor(true);
      setStage(7);
      awardStageReward(6);
    } else if (stage === 7) {
      setShowProjectHub(true);
      setStage(8);
      awardStageReward(7);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Аудио элемент для звуков */}
      <audio ref={audioRef} />
      
      {/* Панель Learn-to-Earn наград */}
      <motion.div 
        className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-6 py-3 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center gap-2">
          <Star className="text-yellow-400" size={18} />
          <span className="font-bold">{earnedXP} XP</span>
        </div>
        <div className="w-px h-6 bg-white/20" />
        <div className="flex items-center gap-2">
          <Coins className="text-cyan-400" size={18} />
          <span className="font-bold">{earnedVOD} VOD</span>
        </div>
        <div className="w-px h-6 bg-white/20" />
        <div className="flex items-center gap-2">
          <Trophy className="text-purple-400" size={18} />
          <span className="font-bold">{earnedBadges.length}</span>
        </div>
        <div className="w-px h-6 bg-white/20" />
        <div className="text-xs text-slate-400">
          Попапов: {popupsOpened}
        </div>
      </motion.div>
      
      {/* Уведомление о награде */}
      <AnimatePresence>
        {showRewardNotification && lastReward && (
          <motion.div
            className="fixed top-40 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/30 backdrop-blur-md"
            initial={{ y: -50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -50, opacity: 0, scale: 0.9 }}
          >
            <Award className="text-green-400" size={24} />
            <div>
              <div className="font-bold text-green-400">Награда получена!</div>
              <div className="text-sm text-slate-300">
                {lastReward.xp > 0 && `+${lastReward.xp} XP `}
                {lastReward.vod > 0 && `+${lastReward.vod} VOD `}
                {lastReward.badge && `🏆 ${lastReward.badge}`}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Кнопки управления */}
      <div className="fixed top-24 right-4 z-50 flex flex-col gap-2">
        <button
          onClick={() => setAutoPlay(!autoPlay)}
          className={cn(
            "p-3 rounded-xl backdrop-blur-md transition-all",
            autoPlay ? "bg-cyan-500 text-ocean-deep" : "bg-white/10 hover:bg-white/20"
          )}
        >
          {autoPlay ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button
          onClick={nextStage}
          disabled={stage >= 8}
          className="p-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all disabled:opacity-50"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      {/* Индикатор прогресса */}
      <div className="fixed top-24 left-4 z-50 flex flex-col gap-2">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
          <motion.div
            key={s}
            className={cn(
              "w-3 h-3 rounded-full transition-all cursor-pointer",
              stage >= s ? "bg-cyan-400" : "bg-white/20",
              stagesCompleted.includes(s) && "ring-2 ring-green-400"
            )}
            animate={{ scale: stage === s ? 1.5 : 1 }}
            onClick={() => {
              if (s <= stage) {
                // Можно вернуться к предыдущим стадиям
              }
            }}
            title={`Стадия ${s}`}
          />
        ))}
      </div>

      {/* СТАДИЯ 0: Тёмный экран */}
      <AnimatePresence>
        {stage === 0 && (
          <motion.div
            className="absolute inset-0 bg-black flex items-center justify-center z-40"
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                VODeco
              </h1>
              <p className="text-slate-400 mb-8">Интерактивная презентация</p>
              <motion.button
                onClick={() => setStage(1)}
                className="px-8 py-4 bg-cyan-500 text-ocean-deep font-bold rounded-2xl hover:scale-105 transition-transform"
                whileHover={{ boxShadow: "0 0 30px rgba(6, 182, 212, 0.5)" }}
              >
                Начать путешествие
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* СТАДИЯ 1: Капли воды */}
      {stage >= 1 && stage < 2 && (
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <WaterDrop delay={0} />
          <WaterDrop delay={0.5} />
          <WaterDrop delay={1} onComplete={() => setTimeout(() => setStage(2), 500)} />
          
          {/* Пульсации "сердцебиения" */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              backgroundColor: ["rgba(6, 182, 212, 0)", "rgba(6, 182, 212, 0.05)", "rgba(6, 182, 212, 0)"],
            }}
            transition={{ duration: 0.8, repeat: 3, repeatDelay: 0.4 }}
          />
        </div>
      )}

      {/* СТАДИИ 2-4: Планета и статистика */}
      {stage >= 2 && stage <= 4 && !isUnderwater && (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          {/* Фон космоса */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black">
            {/* Звёзды */}
            {[...Array(100)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-px h-px bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Three.js 3D Планета или SVG fallback */}
          <div className="relative z-10">
            {use3DGlobe ? (
              <motion.div
                className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px]"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <Suspense fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
                  </div>
                }>
                  <Globe3D />
                </Suspense>
              </motion.div>
            ) : (
              <Planet stage={stage} problemColors={showProblems} />
            )}
            
            {/* Переключатель 3D/2D */}
            <motion.button
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold"
              onClick={() => setUse3DGlobe(!use3DGlobe)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              {use3DGlobe ? "Упрощённый вид" : "3D Globe"}
            </motion.button>
            
            {/* Мигающая точка для погружения */}
            {stage >= 4 && (
              <motion.button
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
                onClick={() => {
                  setIsUnderwater(true);
                  setShowBlockchain(true);
                  setStage(5);
                  awardStageReward(4);
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}
              >
                <motion.div
                  className="w-10 h-10 rounded-full bg-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/50"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(6, 182, 212, 0.7)",
                      "0 0 0 25px rgba(6, 182, 212, 0)",
                    ],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Waves size={20} className="text-ocean-deep" />
                </motion.div>
                <motion.div
                  className="absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-bold text-cyan-400 bg-black/50 px-3 py-1 rounded-lg"
                  animate={{ opacity: [0.5, 1, 0.5], y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🌊 Погрузиться глубже
                </motion.div>
              </motion.button>
            )}
          </div>

          {/* Статистика слева */}
          <AnimatePresence>
            {showStats && (
              <motion.div
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 space-y-4 max-w-xs z-20"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-lg font-bold text-cyan-400">Мировые водные ресурсы</h3>
                <div className="space-y-3">
                  <div className="glass-card p-3 rounded-xl">
                    <div className="text-2xl font-black">{waterStats.total}</div>
                    <div className="text-xs text-slate-500">Общий объём воды</div>
                  </div>
                  <div className="glass-card p-3 rounded-xl">
                    <div className="text-2xl font-black text-cyan-400">{waterStats.freshwater}</div>
                    <div className="text-xs text-slate-500">Пресная вода</div>
                  </div>
                  <div className="glass-card p-3 rounded-xl">
                    <div className="text-2xl font-black text-green-400">{waterStats.accessible}</div>
                    <div className="text-xs text-slate-500">Доступная вода</div>
                  </div>
                </div>
                
                {/* Информационные точки */}
                {waterInfoPoints.map((point) => (
                  <InfoPointButton
                    key={point.id}
                    point={point}
                    onClick={() => setSelectedInfoPoint(point)}
                    style={{ position: 'relative', left: 'auto', top: 'auto' }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Проблемы справа */}
          <AnimatePresence>
            {showProblems && (
              <motion.div
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 space-y-4 max-w-xs z-20"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-lg font-bold text-red-400">Водный кризис</h3>
                <div className="space-y-3">
                  <div className="glass-card p-3 rounded-xl border-red-500/30">
                    <div className="text-2xl font-black text-red-400">{waterStats.population_no_access}</div>
                    <div className="text-xs text-slate-500">Без доступа к чистой воде</div>
                  </div>
                  <div className="glass-card p-3 rounded-xl border-orange-500/30">
                    <div className="text-2xl font-black text-orange-400">{waterStats.deficit_by_2030}</div>
                    <div className="text-xs text-slate-500">Дефицит к 2030 году</div>
                  </div>
                  <div className="glass-card p-3 rounded-xl border-yellow-500/30">
                    <div className="text-2xl font-black text-yellow-400">{waterStats.investment_gap}</div>
                    <div className="text-xs text-slate-500">Недоинвестирование/год</div>
                  </div>
                </div>
                
                {/* Информационные точки */}
                {problemInfoPoints.map((point) => (
                  <InfoPointButton
                    key={point.id}
                    point={point}
                    onClick={() => setSelectedInfoPoint(point)}
                    style={{ position: 'relative', left: 'auto', top: 'auto' }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* СТАДИЯ 5: Погружение под воду и блокчейн */}
      {isUnderwater && stage >= 5 && (
        <div className="absolute inset-0">
          <BlockchainNetwork visible={showBlockchain} />
          
          {/* Контент поверх сети */}
          <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <h2 className="text-3xl md:text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Цифровая инфраструктура доверия
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                VODeco объединяет реальный мир водных ресурсов с блокчейн-технологиями, 
                создавая прозрачную и неизменяемую систему управления данными.
              </p>
            </motion.div>
            
            {/* Слои архитектуры */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl">
              {blockchainLayers.map((layer, i) => (
                <motion.div
                  key={layer.id}
                  className="glass-card p-4 rounded-xl border-white/10 hover:border-cyan-500/30 transition-all cursor-pointer group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 + i * 0.1 }}
                  onClick={() => setSelectedInfoPoint({
                    id: layer.id,
                    x: 0,
                    y: 0,
                    title: layer.name,
                    shortDesc: layer.desc,
                    fullDesc: `${layer.name} — это ключевой компонент архитектуры VODeco.\n\n${layer.desc}\n\nЭтот слой обеспечивает интеграцию между физическим миром водных ресурсов и цифровой экосистемой, позволяя создавать прозрачную и доверенную среду для всех участников.`,
                    icon: layer.icon,
                    color: `bg-[${layer.color}]`,
                  })}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: layer.color + '20', color: layer.color }}>
                      <layer.icon size={20} />
                    </div>
                    <span className="font-bold text-sm">{layer.name}</span>
                  </div>
                  <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                    {layer.desc}
                  </p>
                  <motion.div
                    className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(6, 182, 212, 0.4)",
                        "0 0 0 8px rgba(6, 182, 212, 0)",
                      ],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.div>
              ))}
            </div>
            
            {/* Кнопка продолжения */}
            <motion.button
              className="mt-12 px-8 py-4 bg-cyan-500 text-ocean-deep font-bold rounded-2xl hover:scale-105 transition-transform"
              onClick={() => {
                setShowTechnologies(true);
                setStage(6);
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
            >
              Продолжить <ChevronRight className="inline ml-2" size={18} />
            </motion.button>
          </div>
        </div>
      )}

      {/* СТАДИЯ 6: Полная архитектура (12 слоёв) */}
      {showArchitecture && stage >= 6 && !showTechnologies && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-ocean-deep via-slate-900 to-black overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="min-h-screen p-4 md:p-8 pt-32">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl md:text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                12-уровневая Архитектура VODeco
              </h2>
              <p className="text-slate-400 max-w-3xl mx-auto">
                Комплексная экосистема от физического мира до глобальных интеграций. 
                Нажмите на любой слой, чтобы узнать подробности.
              </p>
            </motion.div>
            
            {/* Визуализация слоёв как здание */}
            <div className="max-w-4xl mx-auto space-y-2 mb-12">
              {architectureLayers.slice().reverse().map((layer, i) => (
                <motion.div
                  key={layer.id}
                  className="relative p-4 rounded-xl border cursor-pointer group"
                  style={{
                    background: `linear-gradient(90deg, ${layer.color}10, transparent)`,
                    borderColor: `${layer.color}30`,
                  }}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02, borderColor: layer.color }}
                  onClick={() => handlePopupOpen({
                    id: layer.id,
                    x: 0,
                    y: 0,
                    title: layer.name,
                    shortDesc: layer.shortDesc,
                    fullDesc: layer.fullDesc,
                    stats: layer.stats,
                    icon: layer.icon,
                    color: `bg-[${layer.color}]`,
                  })}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="p-3 rounded-xl" 
                      style={{ backgroundColor: `${layer.color}20`, color: layer.color }}
                    >
                      <layer.icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg" style={{ color: layer.color }}>
                        {layer.name}
                      </h3>
                      <p className="text-sm text-slate-400">{layer.shortDesc}</p>
                    </div>
                    <motion.div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: layer.color }}
                      animate={{
                        boxShadow: [
                          `0 0 0 0 ${layer.color}60`,
                          `0 0 0 10px ${layer.color}00`,
                        ],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Кнопка к технологиям */}
            <motion.button
              className="block mx-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-2xl hover:scale-105 transition-transform"
              onClick={() => {
                setShowTechnologies(true);
                setShowExpeditor(true);
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              Продукты и Инструменты <ChevronRight className="inline ml-2" size={18} />
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* СТАДИЯ 7: Технологии и Экспедитор Воды 3.0 */}
      {showTechnologies && stage >= 7 && !showProjectHub && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-ocean-deep via-slate-900 to-black overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="min-h-screen p-4 md:p-8 pt-32">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl md:text-5xl font-black mb-4">
                Инструменты и Технологии
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Полный стек решений для управления водными ресурсами
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
              {technologies.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  className="glass-card p-6 rounded-2xl border-white/10 hover:border-cyan-500/30 transition-all group cursor-pointer relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
                      <tech.icon size={24} />
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">
                      {tech.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{tech.name}</h3>
                  <p className="text-sm text-slate-500">{tech.desc}</p>
                  
                  {/* Мигающая точка */}
                  <motion.div
                    className="absolute top-4 right-4 w-2 h-2 rounded-full bg-cyan-400"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(6, 182, 212, 0.4)",
                        "0 0 0 8px rgba(6, 182, 212, 0)",
                      ],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  />
                </motion.div>
              ))}
            </div>
            
            {/* ЭКСПЕДИТОР ВОДЫ 3.0 - Детальный чертёж */}
            {showExpeditor && (
              <motion.div
                className="max-w-4xl mx-auto mb-12"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="glass-card p-8 rounded-3xl border-2 border-cyan-500/30 bg-gradient-to-br from-cyan-500/5 to-purple-500/5">
                  <div className="text-center mb-8">
                    <motion.div
                      className="inline-block p-4 rounded-2xl bg-cyan-500/20 mb-4"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <FlaskConical size={48} className="text-cyan-400" />
                    </motion.div>
                    <h3 className="text-3xl font-black mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      {expeditorInfo.name}
                    </h3>
                    <p className="text-slate-400">{expeditorInfo.subtitle}</p>
                  </div>
                  
                  {/* Чертёж устройства */}
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {/* Левая сторона - Визуализация */}
                    <div className="relative p-6 rounded-2xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-white/10">
                      <div className="text-center mb-4">
                        <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Чертёж устройства</div>
                      </div>
                      
                      {/* SVG чертёж */}
                      <div className="relative h-64 flex items-center justify-center">
                        <svg viewBox="0 0 200 300" className="h-full w-auto">
                          {/* Корпус датчика */}
                          <rect x="60" y="80" width="80" height="150" rx="10" fill="#1e3a5f" stroke="#06b6d4" strokeWidth="2"/>
                          
                          {/* Экран */}
                          <rect x="70" y="90" width="60" height="40" rx="5" fill="#0f172a" stroke="#22d3ee" strokeWidth="1"/>
                          <text x="100" y="110" textAnchor="middle" fill="#22d3ee" fontSize="8">pH: 7.2</text>
                          <text x="100" y="122" textAnchor="middle" fill="#22d3ee" fontSize="6">TDS: 342</text>
                          
                          {/* Кнопки */}
                          <circle cx="85" cy="150" r="6" fill="#22c55e" opacity="0.8"/>
                          <circle cx="100" cy="150" r="6" fill="#facc15" opacity="0.8"/>
                          <circle cx="115" cy="150" r="6" fill="#ef4444" opacity="0.8"/>
                          
                          {/* Индикаторы датчиков */}
                          <rect x="75" y="165" width="20" height="20" rx="3" fill="#06b6d4" opacity="0.3"/>
                          <text x="85" y="178" textAnchor="middle" fill="white" fontSize="6">pH</text>
                          <rect x="105" y="165" width="20" height="20" rx="3" fill="#06b6d4" opacity="0.3"/>
                          <text x="115" y="178" textAnchor="middle" fill="white" fontSize="6">TDS</text>
                          
                          {/* Зонд */}
                          <line x1="100" y1="230" x2="100" y2="280" stroke="#06b6d4" strokeWidth="4"/>
                          <circle cx="100" cy="285" r="8" fill="#06b6d4"/>
                          
                          {/* Bluetooth иконка */}
                          <path d="M135 100 L145 110 L140 115 L145 120 L135 130 L140 120 L135 115 L140 110 Z" fill="#3b82f6" opacity="0.8"/>
                          
                          {/* USB-C порт */}
                          <rect x="90" y="225" width="20" height="5" rx="2" fill="#666"/>
                        </svg>
                        
                        {/* Аннотации */}
                        <motion.div
                          className="absolute top-4 right-4 text-xs text-cyan-400"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Bluetooth size={16} />
                        </motion.div>
                      </div>
                      
                      {/* Легенда */}
                      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded bg-green-500/50" />
                          <span>Измерение</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded bg-yellow-500/50" />
                          <span>Калибровка</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded bg-red-500/50" />
                          <span>Питание</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded bg-blue-500/50" />
                          <span>Bluetooth</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Правая сторона - Характеристики */}
                    <div className="space-y-4">
                      <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-4">Параметры измерения</div>
                      {expeditorInfo.parameters.map((param, i) => (
                        <motion.div
                          key={param.name}
                          className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1 + i * 0.1 }}
                        >
                          <div className="flex items-center gap-3">
                            <param.icon size={18} className="text-cyan-400" />
                            <span className="font-bold">{param.name}</span>
                          </div>
                          <div className="text-right text-sm">
                            <div className="text-slate-400">{param.range}</div>
                            <div className="text-green-400 text-xs">{param.accuracy}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Характеристики и комплектация */}
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-4">Характеристики</div>
                      <div className="grid grid-cols-2 gap-3">
                        {expeditorInfo.specs.map((spec, i) => (
                          <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10">
                            <div className="text-xs text-slate-500">{spec.label}</div>
                            <div className="font-bold text-sm">{spec.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-4">Комплектация</div>
                      <div className="space-y-2">
                        {expeditorInfo.included.map((item, i) => (
                          <motion.div
                            key={i}
                            className="flex items-center gap-2 text-sm"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.5 + i * 0.1 }}
                          >
                            <CheckCircle2 size={16} className="text-green-400" />
                            <span>{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Цена и предзаказ */}
                  <div className="flex flex-wrap items-center justify-center gap-6 p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30">
                    <div className="text-center">
                      <div className="text-sm text-slate-400 line-through">${expeditorInfo.price}</div>
                      <div className="text-4xl font-black text-cyan-400">${expeditorInfo.preorderPrice}</div>
                      <div className="text-xs text-green-400">Скидка {expeditorInfo.discount}%</div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <motion.button
                        className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-2xl shadow-lg shadow-cyan-500/30"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        🛒 Предзаказать
                      </motion.button>
                      <button className="px-6 py-4 border border-white/20 rounded-2xl hover:bg-white/10 transition-colors">
                        📖 Подробнее
                      </button>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center gap-2 text-sm">
                        <Gift className="text-purple-400" size={18} />
                        <span>+50 VOD за предзаказ</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Timer className="text-yellow-400" size={18} />
                        <span>Доставка: Q2 2025</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Кнопка к ProjectHub */}
            <motion.button
              className="block mx-auto px-8 py-4 bg-cyan-500 text-ocean-deep font-bold rounded-2xl hover:scale-105 transition-transform"
              onClick={() => {
                setShowProjectHub(true);
                setStage(8);
                awardStageReward(7);
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              Перейти к ProjectHub <ChevronRight className="inline ml-2" size={18} />
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* СТАДИЯ 8: ProjectHub с карточками */}
      {showProjectHub && stage >= 8 && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black via-slate-900 to-ocean-deep overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="min-h-screen p-4 md:p-8 pt-24">
            {/* Планета наверху - 3D Globe */}
            <motion.div
              className="flex justify-center mb-8"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <div className="w-40 h-40 md:w-48 md:h-48">
                <Suspense fallback={
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 animate-pulse" />
                }>
                  <Globe3D />
                </Suspense>
              </div>
            </motion.div>
            
            <motion.h2
              className="text-3xl md:text-4xl font-black text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              ProjectHub: Инвестиционная дорожная карта
            </motion.h2>
            
            {/* Два столбика карточек */}
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Левый столбик: Выполненные */}
              <div>
                <motion.div
                  className="flex items-center gap-3 mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="p-2 rounded-lg bg-green-500/20 text-green-400">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Выполненные работы</h3>
                    <p className="text-green-400 font-black text-2xl">
                      ${completedProjects.reduce((acc, p) => acc + p.cost, 0).toLocaleString()}
                    </p>
                  </div>
                </motion.div>
                
                <div className="space-y-4">
                  {completedProjects.map((project, i) => (
                    <motion.div
                      key={project.title}
                      className="glass-card p-4 rounded-xl border-green-500/20 hover:border-green-500/40 transition-all"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold">{project.title}</span>
                        <span className="text-green-400 font-mono">${project.cost.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-slate-500 mb-2">{project.desc}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-green-500"
                            initial={{ width: 0 }}
                            animate={{ width: project.status }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                          />
                        </div>
                        <span className="text-xs text-green-400">{project.status}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Правый столбик: Планируемые */}
              <div>
                <motion.div
                  className="flex items-center gap-3 mb-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                    <Target size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Дальнейшее развитие</h3>
                    <p className="text-purple-400 font-black text-2xl">
                      ${plannedProjects.reduce((acc, p) => acc + p.cost, 0).toLocaleString()}
                    </p>
                  </div>
                </motion.div>
                
                <div className="space-y-4">
                  {plannedProjects.map((project, i) => (
                    <motion.div
                      key={project.title}
                      className="glass-card p-4 rounded-xl border-purple-500/20 hover:border-purple-500/40 transition-all cursor-pointer group"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <project.icon size={16} className="text-purple-400" />
                          <span className="font-bold">{project.title}</span>
                        </div>
                        <span className="text-purple-400 font-mono">${project.cost.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-slate-500">{project.desc}</p>
                      
                      {/* Мигающая точка */}
                      <motion.div
                        className="absolute top-3 right-3 w-2 h-2 rounded-full bg-purple-400"
                        animate={{
                          boxShadow: [
                            "0 0 0 0 rgba(168, 85, 247, 0.4)",
                            "0 0 0 8px rgba(168, 85, 247, 0)",
                          ],
                        }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Общий итог и награды */}
            <motion.div
              className="max-w-4xl mx-auto mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              {/* Финансовый итог */}
              <div className="glass-card p-8 rounded-2xl border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 mb-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-black text-green-400">$100,000</div>
                    <div className="text-sm text-slate-500">Выполненных работ</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-purple-400">$250,000</div>
                    <div className="text-sm text-slate-500">Необходимо инвестиций</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-cyan-400">$350,000</div>
                    <div className="text-sm text-slate-500">Общий бюджет</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-yellow-400">28%</div>
                    <div className="text-sm text-slate-500">Выполнено</div>
                  </div>
                </div>
              </div>
              
              {/* Ваши награды за прохождение */}
              <div className="glass-card p-8 rounded-2xl border-green-500/30 bg-gradient-to-r from-green-500/10 to-cyan-500/10 mb-8">
                <h3 className="text-2xl font-black text-center mb-6 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                  🎉 Вы завершили путешествие!
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-6">
                  <div className="p-4 rounded-xl bg-white/5">
                    <Star className="mx-auto text-yellow-400 mb-2" size={32} />
                    <div className="text-2xl font-black text-yellow-400">{earnedXP}</div>
                    <div className="text-xs text-slate-500">XP заработано</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5">
                    <Coins className="mx-auto text-cyan-400 mb-2" size={32} />
                    <div className="text-2xl font-black text-cyan-400">{earnedVOD}</div>
                    <div className="text-xs text-slate-500">VOD получено</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5">
                    <Trophy className="mx-auto text-purple-400 mb-2" size={32} />
                    <div className="text-2xl font-black text-purple-400">{earnedBadges.length}</div>
                    <div className="text-xs text-slate-500">Бейджей</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5">
                    <BookOpen className="mx-auto text-green-400 mb-2" size={32} />
                    <div className="text-2xl font-black text-green-400">{popupsOpened}</div>
                    <div className="text-xs text-slate-500">Попапов изучено</div>
                  </div>
                </div>
                
                {earnedBadges.length > 0 && (
                  <div className="text-center">
                    <div className="text-sm text-slate-400 mb-2">Полученные бейджи:</div>
                    <div className="flex flex-wrap justify-center gap-2">
                      {earnedBadges.map((badge, i) => (
                        <span key={i} className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-400 text-sm font-bold">
                          🏆 {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {!isAuthenticated && (
                  <div className="mt-6 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-center">
                    <p className="text-yellow-400 text-sm mb-2">
                      ⚠️ Зарегистрируйтесь, чтобы сохранить награды!
                    </p>
                    <p className="text-xs text-slate-500">
                      Pioneer бонус: +50% к наградам для первых 1000 пользователей
                    </p>
                  </div>
                )}
              </div>
              
              {/* Buy Token Widget */}
              <div className="mb-8">
                <BuyTokenWidget variant="banner" source="presentation" />
              </div>

              {/* CTA кнопки */}
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/invest"
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-2xl hover:scale-105 transition-transform shadow-lg shadow-cyan-500/30"
                >
                  💰 Стать инвестором
                </Link>
                <Link
                  href="/landing"
                  className="px-8 py-4 border-2 border-cyan-500 text-cyan-400 font-bold rounded-2xl hover:bg-cyan-500/10 transition-colors"
                >
                  📝 Регистрация (Pioneer)
                </Link>
                <button
                  onClick={() => {
                    // Поделиться
                    if (navigator.share) {
                      navigator.share({
                        title: 'VODeco - Интерактивная презентация',
                        text: 'Узнайте о революции в управлении водными ресурсами',
                        url: window.location.href,
                      });
                    }
                  }}
                  className="px-8 py-4 border border-white/20 text-white font-bold rounded-2xl hover:bg-white/10 transition-colors"
                >
                  🔗 Поделиться (+10 VOD)
                </button>
                <button
                  onClick={() => {
                    setStage(0);
                    setShowStats(false);
                    setShowProblems(false);
                    setIsUnderwater(false);
                    setShowBlockchain(false);
                    setShowTechnologies(false);
                    setShowProjectHub(false);
                    setShowArchitecture(false);
                    setShowExpeditor(false);
                  }}
                  className="px-8 py-4 text-slate-400 hover:text-white transition-colors"
                >
                  🔄 Начать заново
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Модальное окно с подробностями */}
      <AnimatePresence>
        {selectedInfoPoint && (
          <DetailModal point={selectedInfoPoint} onClose={() => setSelectedInfoPoint(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

