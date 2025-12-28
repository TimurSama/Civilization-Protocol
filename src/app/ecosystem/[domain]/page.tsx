"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Droplets, Zap, Heart, Beaker, Leaf, Globe, Building2, Users,
  TrendingUp, Target, CheckCircle2, Clock, ArrowRight, Bell, Rocket,
  Star, Sparkles, MapPin, BarChart3, Shield, Award, ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

// Domain configurations
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const domainConfigs: Record<string, any> = {
  ecology: {
    icon: Leaf,
    color: "emerald",
    gradient: "from-emerald-500 to-green-600",
    bgGradient: "from-emerald-500/20 to-green-600/20",
    en: {
      title: "VOD Ecology",
      subtitle: "Environmental Monitoring & Carbon Credits",
      description: "Comprehensive ecosystem for environmental data, carbon credit trading, biodiversity monitoring, and climate action tracking.",
      coming: "Coming Q2 2025"
    },
    ru: {
      title: "VOD Экология",
      subtitle: "Экологический мониторинг и углеродные кредиты",
      description: "Комплексная экосистема для экологических данных, торговли углеродными кредитами, мониторинга биоразнообразия и отслеживания климатических действий.",
      coming: "Запуск Q2 2025"
    },
    ar: {
      title: "VOD البيئة",
      subtitle: "المراقبة البيئية وأرصدة الكربون",
      description: "نظام بيئي شامل للبيانات البيئية، وتداول أرصدة الكربون، ومراقبة التنوع البيولوجي، وتتبع العمل المناخي.",
      coming: "قادم في الربع الثاني 2025"
    },
    features: [
      { icon: Leaf, key: "carbon", en: "Carbon Credit Trading", ru: "Торговля углеродными кредитами", ar: "تداول أرصدة الكربون" },
      { icon: Globe, key: "bio", en: "Biodiversity Tracking", ru: "Отслеживание биоразнообразия", ar: "تتبع التنوع البيولوجي" },
      { icon: BarChart3, key: "forest", en: "Forest Monitoring", ru: "Мониторинг лесов", ar: "مراقبة الغابات" },
      { icon: Shield, key: "climate", en: "Climate Action Reports", ru: "Отчёты о климатических действиях", ar: "تقارير العمل المناخي" },
    ],
    stats: [
      { value: "2.5M", labelEn: "Hectares Monitored", labelRu: "Гектаров под мониторингом", labelAr: "هكتار مراقب" },
      { value: "45K", labelEn: "Carbon Credits", labelRu: "Углеродных кредитов", labelAr: "أرصدة الكربون" },
      { value: "120+", labelEn: "Partner Organizations", labelRu: "Партнёрских организаций", labelAr: "المنظمات الشريكة" },
    ]
  },
  energy: {
    icon: Zap,
    color: "yellow",
    gradient: "from-yellow-500 to-orange-500",
    bgGradient: "from-yellow-500/20 to-orange-500/20",
    en: {
      title: "VOD Energy",
      subtitle: "Renewable Energy & Smart Grids",
      description: "Decentralized platform for renewable energy trading, smart grid management, and P2P electricity exchange.",
      coming: "Coming Q3 2025"
    },
    ru: {
      title: "VOD Энергия",
      subtitle: "Возобновляемая энергия и умные сети",
      description: "Децентрализованная платформа для торговли возобновляемой энергией, управления умными сетями и P2P обмена электроэнергией.",
      coming: "Запуск Q3 2025"
    },
    ar: {
      title: "VOD الطاقة",
      subtitle: "الطاقة المتجددة والشبكات الذكية",
      description: "منصة لا مركزية لتداول الطاقة المتجددة، وإدارة الشبكات الذكية، وتبادل الكهرباء بين الأقران.",
      coming: "قادم في الربع الثالث 2025"
    },
    features: [
      { icon: Zap, key: "p2p", en: "P2P Energy Trading", ru: "P2P торговля энергией", ar: "تداول الطاقة P2P" },
      { icon: Building2, key: "grid", en: "Smart Grid Integration", ru: "Интеграция умных сетей", ar: "تكامل الشبكة الذكية" },
      { icon: TrendingUp, key: "solar", en: "Solar/Wind Analytics", ru: "Аналитика солнца/ветра", ar: "تحليلات الطاقة الشمسية/الرياح" },
      { icon: Award, key: "cert", en: "Green Energy Certificates", ru: "Сертификаты зелёной энергии", ar: "شهادات الطاقة الخضراء" },
    ],
    stats: [
      { value: "15 GW", labelEn: "Connected Capacity", labelRu: "Подключённая мощность", labelAr: "السعة المتصلة" },
      { value: "8K+", labelEn: "P2P Transactions", labelRu: "P2P транзакций", labelAr: "معاملات P2P" },
      { value: "35%", labelEn: "Avg Cost Reduction", labelRu: "Сред. снижение затрат", labelAr: "متوسط تخفيض التكلفة" },
    ]
  },
  health: {
    icon: Heart,
    color: "rose",
    gradient: "from-rose-500 to-pink-600",
    bgGradient: "from-rose-500/20 to-pink-600/20",
    en: {
      title: "VOD Health",
      subtitle: "Medical Data & Health Ecosystem",
      description: "Secure platform for medical data management, health research collaboration, and water-health correlation studies.",
      coming: "Coming Q4 2025"
    },
    ru: {
      title: "VOD Здоровье",
      subtitle: "Медицинские данные и экосистема здоровья",
      description: "Безопасная платформа для управления медицинскими данными, совместных медицинских исследований и изучения связи воды и здоровья.",
      coming: "Запуск Q4 2025"
    },
    ar: {
      title: "VOD الصحة",
      subtitle: "البيانات الطبية ونظام الصحة البيئي",
      description: "منصة آمنة لإدارة البيانات الطبية، والتعاون في البحوث الصحية، ودراسات ارتباط المياه بالصحة.",
      coming: "قادم في الربع الرابع 2025"
    },
    features: [
      { icon: Heart, key: "health", en: "Health-Water Correlation", ru: "Связь здоровья и воды", ar: "ارتباط الصحة بالمياه" },
      { icon: Shield, key: "data", en: "Secure Medical Data", ru: "Защищённые медданные", ar: "بيانات طبية آمنة" },
      { icon: Beaker, key: "research", en: "Research Collaboration", ru: "Научная коллаборация", ar: "التعاون البحثي" },
      { icon: Users, key: "community", en: "Community Health Reports", ru: "Отчёты о здоровье населения", ar: "تقارير صحة المجتمع" },
    ],
    stats: [
      { value: "500K+", labelEn: "Health Records", labelRu: "Медицинских записей", labelAr: "السجلات الصحية" },
      { value: "45", labelEn: "Research Partners", labelRu: "Исследовательских партнёров", labelAr: "شركاء البحث" },
      { value: "12", labelEn: "Countries", labelRu: "Стран", labelAr: "الدول" },
    ]
  },
  science: {
    icon: Beaker,
    color: "purple",
    gradient: "from-purple-500 to-indigo-600",
    bgGradient: "from-purple-500/20 to-indigo-600/20",
    en: {
      title: "VOD Science",
      subtitle: "Scientific Research & Open Data",
      description: "Open science platform for data sharing, collaborative research, academic publications, and citizen science initiatives.",
      coming: "Coming Q1 2026"
    },
    ru: {
      title: "VOD Наука",
      subtitle: "Научные исследования и открытые данные",
      description: "Платформа открытой науки для обмена данными, совместных исследований, академических публикаций и гражданских научных инициатив.",
      coming: "Запуск Q1 2026"
    },
    ar: {
      title: "VOD العلم",
      subtitle: "البحث العلمي والبيانات المفتوحة",
      description: "منصة علمية مفتوحة لمشاركة البيانات، والبحث التعاوني، والمنشورات الأكاديمية، ومبادرات علم المواطن.",
      coming: "قادم في الربع الأول 2026"
    },
    features: [
      { icon: Beaker, key: "opendata", en: "Open Data Repository", ru: "Репозиторий открытых данных", ar: "مستودع البيانات المفتوحة" },
      { icon: Users, key: "collab", en: "Research Collaboration", ru: "Научная коллаборация", ar: "التعاون البحثي" },
      { icon: Award, key: "pubs", en: "Academic Publications", ru: "Академические публикации", ar: "المنشورات الأكاديمية" },
      { icon: Star, key: "citizen", en: "Citizen Science", ru: "Гражданская наука", ar: "علم المواطن" },
    ],
    stats: [
      { value: "4.2 TB", labelEn: "Research Data", labelRu: "Исследовательских данных", labelAr: "بيانات البحث" },
      { value: "850+", labelEn: "Publications", labelRu: "Публикаций", labelAr: "المنشورات" },
      { value: "200+", labelEn: "Universities", labelRu: "Университетов", labelAr: "الجامعات" },
    ]
  }
};

// Translations
const translations: Record<string, Record<string, string>> = {
  en: {
    comingSoon: "Coming Soon",
    inDevelopment: "This module is currently in active development",
    plannedFeatures: "Planned Features",
    expectedMetrics: "Expected Metrics",
    joinWaitlist: "Join Waitlist",
    notifyMe: "Notify Me When Ready",
    backToEcosystem: "Back to Ecosystem",
    domainNotFound: "Domain not found",
    beFirstToKnow: "Be the first to know when we launch",
    earlyAccessReward: "Early supporters will receive VODG token rewards",
    relatedModules: "Related Modules",
    viewWater: "View Water Module (Active)",
    learnMore: "Learn More",
    activeNow: "Active Now"
  },
  ru: {
    comingSoon: "Скоро",
    inDevelopment: "Этот модуль находится в активной разработке",
    plannedFeatures: "Планируемые функции",
    expectedMetrics: "Ожидаемые метрики",
    joinWaitlist: "Присоединиться к листу ожидания",
    notifyMe: "Уведомить о запуске",
    backToEcosystem: "Вернуться к экосистеме",
    domainNotFound: "Домен не найден",
    beFirstToKnow: "Будьте первым, кто узнает о запуске",
    earlyAccessReward: "Ранние сторонники получат награды в токенах VODG",
    relatedModules: "Связанные модули",
    viewWater: "Модуль Вода (Активен)",
    learnMore: "Узнать больше",
    activeNow: "Активен"
  },
  ar: {
    comingSoon: "قريباً",
    inDevelopment: "هذا الوحدة حالياً قيد التطوير النشط",
    plannedFeatures: "الميزات المخططة",
    expectedMetrics: "المقاييس المتوقعة",
    joinWaitlist: "انضم إلى قائمة الانتظار",
    notifyMe: "أعلمني عند الإطلاق",
    backToEcosystem: "العودة إلى النظام البيئي",
    domainNotFound: "النطاق غير موجود",
    beFirstToKnow: "كن أول من يعرف عند الإطلاق",
    earlyAccessReward: "سيحصل الداعمون الأوائل على مكافآت رمز VODG",
    relatedModules: "الوحدات ذات الصلة",
    viewWater: "عرض وحدة المياه (نشطة)",
    learnMore: "اعرف المزيد",
    activeNow: "نشط الآن"
  }
};

const colorClasses: Record<string, { text: string; bg: string; border: string }> = {
  emerald: { text: "text-emerald-400", bg: "bg-emerald-500/20", border: "border-emerald-500/30" },
  yellow: { text: "text-yellow-400", bg: "bg-yellow-500/20", border: "border-yellow-500/30" },
  rose: { text: "text-rose-400", bg: "bg-rose-500/20", border: "border-rose-500/30" },
  purple: { text: "text-purple-400", bg: "bg-purple-500/20", border: "border-purple-500/30" },
  cyan: { text: "text-cyan-400", bg: "bg-cyan-500/20", border: "border-cyan-500/30" },
};

export default function EcosystemDomainPage() {
  const params = useParams();
  const domain = params.domain as string;
  const config = domainConfigs[domain];
  const { language } = useLanguage();
  
  const t = translations[language] || translations.en;
  const colors = config ? colorClasses[config.color] : colorClasses.cyan;
  
  if (!config) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-4xl font-black text-red-500 mb-4">404</h1>
          <p className="text-slate-400">{t.domainNotFound}</p>
          <Link href="/" className="mt-4 inline-block px-6 py-3 bg-cyan-glow text-ocean-deep rounded-xl font-bold">
            {t.backToEcosystem}
          </Link>
        </div>
      </div>
    );
  }

  const Icon = config.icon;
  const content = config[language] || config.en;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn("glass-card p-8 md:p-12 relative overflow-hidden bg-gradient-to-br", config.bgGradient)}
      >
        <div className="absolute top-0 right-0 w-96 h-96 blur-[120px] opacity-30 rounded-full bg-gradient-to-br" />
        
        {/* Coming Soon Badge */}
        <div className="absolute top-6 right-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={cn("px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2", colors.bg, colors.text, colors.border, "border")}
          >
            <Rocket size={16} />
            {t.comingSoon}
          </motion.div>
        </div>
        
        <div className="relative flex flex-col md:flex-row items-center gap-8">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={cn("w-32 h-32 rounded-3xl flex items-center justify-center shadow-2xl bg-gradient-to-br", config.gradient)}
          >
            <Icon size={64} className="text-white" />
          </motion.div>
          
          <div className="text-center md:text-left flex-1">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-black mb-2"
            >
              {content.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={cn("text-xl font-bold mb-4", colors.text)}
            >
              {content.subtitle}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-slate-400 max-w-xl text-sm"
            >
              {content.description}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 flex items-center gap-2"
            >
              <Clock className={colors.text} size={20} />
              <span className="font-bold">{content.coming}</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* In Development Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6 border-2 border-yellow-500/30 bg-yellow-500/5"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-yellow-500/20 animate-pulse">
              <Sparkles className="text-yellow-400" size={24} />
            </div>
            <div>
              <div className="font-bold text-yellow-400">{t.inDevelopment}</div>
              <p className="text-sm text-slate-400">{t.beFirstToKnow}</p>
            </div>
          </div>
          <button className={cn("px-6 py-3 rounded-xl font-bold flex items-center gap-2 bg-gradient-to-r", config.gradient, "text-white hover:opacity-90 transition-opacity")}>
            <Bell size={18} />
            {t.notifyMe}
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Planned Features */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <CheckCircle2 className={colors.text} size={24} />
            {t.plannedFeatures}
          </h3>
          <div className="space-y-4">
            {config.features.map((feature, i: number) => (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-4"
              >
                <div className={cn("p-3 rounded-xl", colors.bg)}>
                  <feature.icon className={colors.text} size={24} />
                </div>
                <span className="font-medium">
                  {feature[language] || feature.en}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Expected Metrics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Target className={colors.text} size={24} />
            {t.expectedMetrics}
          </h3>
          <div className="space-y-4">
            {config.stats.map((stat, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="p-4 bg-white/5 rounded-xl"
              >
                <div className={cn("text-3xl font-black mb-1", colors.text)}>{stat.value}</div>
                <div className="text-sm text-slate-400">
                  {language === 'ru' ? stat.labelRu : language === 'ar' ? stat.labelAr : stat.labelEn}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Join Waitlist */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className={cn("glass-card p-8 text-center bg-gradient-to-br", config.bgGradient)}
      >
        <h3 className="text-2xl font-black mb-4">{t.joinWaitlist}</h3>
        <p className="text-slate-400 mb-6 max-w-lg mx-auto">{t.earlyAccessReward}</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Email"
            className="flex-1 px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:border-cyan-glow/50 focus:outline-none"
          />
          <button className={cn("px-8 py-3 rounded-xl font-bold bg-gradient-to-r flex items-center justify-center gap-2", config.gradient, "text-white hover:opacity-90 transition-opacity")}>
            <Bell size={18} />
            {t.notifyMe}
          </button>
        </div>
      </motion.div>

      {/* Related - Water Module */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="glass-card p-6"
      >
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Globe className="text-cyan-400" size={24} />
          {t.relatedModules}
        </h3>
        
        <Link href="/dashboard" className="block p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl hover:bg-cyan-500/20 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-cyan-500/20">
                <Droplets className="text-cyan-400" size={24} />
              </div>
              <div>
                <div className="font-bold flex items-center gap-2">
                  VODeco Water
                  <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs font-bold">
                    {t.activeNow}
                  </span>
                </div>
                <p className="text-sm text-slate-400">{t.viewWater}</p>
              </div>
            </div>
            <ArrowRight className="text-cyan-400" size={24} />
          </div>
        </Link>
      </motion.div>
    </div>
  );
}



