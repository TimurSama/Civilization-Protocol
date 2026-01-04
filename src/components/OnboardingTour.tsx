"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, ChevronRight, ChevronLeft, Sparkles, Target, Users, Vote, 
  Wallet, Map, BarChart3, Award, Droplets, Check, Zap, Globe,
  GraduationCap, Shield, Rocket, Gift
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const translations = {
  ru: {
    welcome: "Добро пожаловать в VODeco!",
    welcomeDesc: "Первая DAO-платформа для управления водными ресурсами человечества",
    skip: "Пропустить",
    next: "Далее",
    prev: "Назад",
    finish: "Начать",
    step: "Шаг",
    of: "из",
    letsStart: "Давайте познакомимся с платформой",
    bonusEarned: "Бонус получен",
    vodReward: "VOD токенов",
    steps: [
      {
        title: "Ваш профиль и награды",
        description: "Создайте профиль, выберите роль и начните зарабатывать VOD токены за активность. Первые 10,000 пионеров получают эксклюзивные бонусы!",
        highlight: "profile",
        icon: "user",
        reward: 100
      },
      {
        title: "Интерактивная карта",
        description: "Изучайте водные ресурсы планеты в реальном времени. IoT-датчики передают данные о качестве воды, уровне загрязнения и критических точках.",
        highlight: "map",
        icon: "map",
        reward: 50
      },
      {
        title: "Dashboard аналитики",
        description: "3D-визуализация планеты с данными о водных ресурсах. Фильтры по регионам, типам объектов и временным периодам.",
        highlight: "dashboard",
        icon: "chart",
        reward: 50
      },
      {
        title: "DAO голосования",
        description: "Участвуйте в принятии решений! Голосуйте за проекты, распределение средств и развитие экосистемы. Каждый голос имеет значение.",
        highlight: "dao",
        icon: "vote",
        reward: 75
      },
      {
        title: "TokenHub - проекты",
        description: "Инвестируйте в водные проекты по всему миру. Отслеживайте прогресс, ESG-показатели и получайте rewards за поддержку.",
        highlight: "tokenhub",
        icon: "rocket",
        reward: 50
      },
      {
        title: "Миссии и достижения",
        description: "Выполняйте миссии, зарабатывайте XP и VOD токены. От простых задач до экспедиций — каждое действие приближает нас к цели.",
        highlight: "missions",
        icon: "target",
        reward: 100
      },
      {
        title: "Социальная сеть",
        description: "Общайтесь с экспертами, учёными и активистами. Создавайте группы, обсуждайте проекты и находите единомышленников.",
        highlight: "social",
        icon: "users",
        reward: 50
      },
      {
        title: "Специализированные кабинеты",
        description: "7 типов кабинетов для разных ролей: гражданин, правительство, инвестор, учёный, оператор и другие. Выберите свой путь!",
        highlight: "cabinets",
        icon: "shield",
        reward: 75
      }
    ],
    totalReward: "Общий бонус за прохождение",
    claimBonus: "Получить бонус",
    bonusClaimed: "Бонус зачислен!",
    startExploring: "Начать исследование"
  },
  en: {
    welcome: "Welcome to VODeco!",
    welcomeDesc: "The first DAO platform for managing humanity's water resources",
    skip: "Skip",
    next: "Next",
    prev: "Back",
    finish: "Start",
    step: "Step",
    of: "of",
    letsStart: "Let's explore the platform",
    bonusEarned: "Bonus earned",
    vodReward: "VOD tokens",
    steps: [
      {
        title: "Your Profile & Rewards",
        description: "Create a profile, choose your role, and start earning VOD tokens for activity. The first 10,000 pioneers get exclusive bonuses!",
        highlight: "profile",
        icon: "user",
        reward: 100
      },
      {
        title: "Interactive Map",
        description: "Explore the planet's water resources in real-time. IoT sensors transmit water quality data, pollution levels, and critical points.",
        highlight: "map",
        icon: "map",
        reward: 50
      },
      {
        title: "Analytics Dashboard",
        description: "3D planet visualization with water resource data. Filters by region, object type, and time period.",
        highlight: "dashboard",
        icon: "chart",
        reward: 50
      },
      {
        title: "DAO Voting",
        description: "Participate in decision-making! Vote for projects, fund allocation, and ecosystem development. Every vote matters.",
        highlight: "dao",
        icon: "vote",
        reward: 75
      },
      {
        title: "TokenHub - Projects",
        description: "Invest in water projects worldwide. Track progress, ESG indicators, and earn rewards for support.",
        highlight: "tokenhub",
        icon: "rocket",
        reward: 50
      },
      {
        title: "Missions & Achievements",
        description: "Complete missions, earn XP and VOD tokens. From simple tasks to expeditions — every action brings us closer to our goal.",
        highlight: "missions",
        icon: "target",
        reward: 100
      },
      {
        title: "Social Network",
        description: "Connect with experts, scientists, and activists. Create groups, discuss projects, and find like-minded people.",
        highlight: "social",
        icon: "users",
        reward: 50
      },
      {
        title: "Specialized Cabinets",
        description: "7 cabinet types for different roles: citizen, government, investor, scientist, operator, and more. Choose your path!",
        highlight: "cabinets",
        icon: "shield",
        reward: 75
      }
    ],
    totalReward: "Total completion bonus",
    claimBonus: "Claim Bonus",
    bonusClaimed: "Bonus credited!",
    startExploring: "Start Exploring"
  },
  ar: {
    welcome: "مرحباً بك في VODeco!",
    welcomeDesc: "أول منصة DAO لإدارة موارد المياه للبشرية",
    skip: "تخطي",
    next: "التالي",
    prev: "السابق",
    finish: "ابدأ",
    step: "خطوة",
    of: "من",
    letsStart: "دعنا نستكشف المنصة",
    bonusEarned: "المكافأة المكتسبة",
    vodReward: "توكنات VOD",
    steps: [
      {
        title: "ملفك الشخصي والمكافآت",
        description: "أنشئ ملفك الشخصي، اختر دورك، وابدأ في كسب توكنات VOD. أول 10,000 رائد يحصلون على مكافآت حصرية!",
        highlight: "profile",
        icon: "user",
        reward: 100
      },
      {
        title: "الخريطة التفاعلية",
        description: "استكشف موارد المياه على الكوكب في الوقت الفعلي. أجهزة IoT تنقل بيانات جودة المياه.",
        highlight: "map",
        icon: "map",
        reward: 50
      },
      {
        title: "لوحة التحليلات",
        description: "تصور ثلاثي الأبعاد للكوكب مع بيانات موارد المياه.",
        highlight: "dashboard",
        icon: "chart",
        reward: 50
      },
      {
        title: "تصويت DAO",
        description: "شارك في صنع القرار! صوّت للمشاريع وتوزيع الأموال.",
        highlight: "dao",
        icon: "vote",
        reward: 75
      },
      {
        title: "TokenHub - المشاريع",
        description: "استثمر في مشاريع المياه حول العالم.",
        highlight: "tokenhub",
        icon: "rocket",
        reward: 50
      },
      {
        title: "المهام والإنجازات",
        description: "أكمل المهام واكسب XP وتوكنات VOD.",
        highlight: "missions",
        icon: "target",
        reward: 100
      },
      {
        title: "الشبكة الاجتماعية",
        description: "تواصل مع الخبراء والعلماء والناشطين.",
        highlight: "social",
        icon: "users",
        reward: 50
      },
      {
        title: "الكابينات المتخصصة",
        description: "7 أنواع كابينات لأدوار مختلفة.",
        highlight: "cabinets",
        icon: "shield",
        reward: 75
      }
    ],
    totalReward: "إجمالي مكافأة الإكمال",
    claimBonus: "المطالبة بالمكافأة",
    bonusClaimed: "تم إضافة المكافأة!",
    startExploring: "ابدأ الاستكشاف"
  }
};

const iconMap = {
  user: Award,
  map: Map,
  chart: BarChart3,
  vote: Vote,
  rocket: Rocket,
  target: Target,
  users: Users,
  shield: Shield,
};

interface OnboardingTourProps {
  onComplete: () => void;
}

export default function OnboardingTour({ onComplete }: OnboardingTourProps) {
  const { language } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const t = translations[language as keyof typeof translations] || translations.ru;
  
  const [currentStep, setCurrentStep] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [earnedRewards, setEarnedRewards] = useState(0);
  const [showFinalReward, setShowFinalReward] = useState(false);
  const [bonusClaimed, setBonusClaimed] = useState(false);

  const totalReward = t.steps.reduce((sum, step) => sum + step.reward, 0);
  const isLastStep = currentStep === t.steps.length - 1;

  const handleNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps(prev => [...prev, currentStep]);
      setEarnedRewards(prev => prev + t.steps[currentStep].reward);
    }
    
    if (isLastStep) {
      setShowFinalReward(true);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const handleClaimBonus = () => {
    setBonusClaimed(true);
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  const handleStartExploring = () => {
    onComplete();
  };

  const CurrentIcon = iconMap[t.steps[currentStep]?.icon as keyof typeof iconMap] || Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
    >
      <AnimatePresence mode="wait">
        {showWelcome ? (
          <motion.div
            key="welcome"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="max-w-lg w-full text-center"
          >
            {/* Animated water drop logo */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mb-8"
            >
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center relative overflow-hidden">
                <Droplets className="w-12 h-12 text-white" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent"
                  animate={{ y: ["100%", "-100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-4xl font-black text-white mb-4"
            >
              {t.welcome}
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-slate-300 mb-8"
            >
              {t.welcomeDesc}
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="glass-card p-6 mb-8"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <Gift className="text-yellow-400" size={24} />
                <span className="text-lg font-bold text-yellow-400">
                  {totalReward} VOD {t.vodReward}
                </span>
              </div>
              <p className="text-slate-400 text-sm">{t.letsStart}</p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex gap-4"
            >
              <button
                onClick={handleSkip}
                className="flex-1 px-6 py-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-slate-400"
              >
                {t.skip}
              </button>
              <button
                onClick={() => setShowWelcome(false)}
                className="flex-1 px-6 py-3 bg-cyan-glow text-ocean-deep font-bold rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
              >
                {t.next} <ChevronRight size={20} />
              </button>
            </motion.div>
          </motion.div>
        ) : showFinalReward ? (
          <motion.div
            key="final"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="max-w-lg w-full text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="mb-8"
            >
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center relative">
                <Sparkles className="w-16 h-16 text-white" />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ border: "2px solid rgba(255,200,0,0.5)" }}
                />
              </div>
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-black text-white mb-4"
            >
              🎉 {t.totalReward}
            </motion.h2>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="glass-card p-8 mb-8"
            >
              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
                {earnedRewards} VOD
              </div>
              <div className="flex items-center justify-center gap-2 text-slate-400">
                <Check className="text-emerald-400" size={16} />
                {completedSteps.length} / {t.steps.length} {t.step}
              </div>
            </motion.div>

            {!bonusClaimed ? (
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={handleClaimBonus}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
              >
                <Gift size={20} /> {t.claimBonus}
              </motion.button>
            ) : (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-xl"
              >
                <Check size={24} /> {t.bonusClaimed}
              </motion.div>
            )}

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              onClick={handleStartExploring}
              className="mt-4 text-slate-400 hover:text-white transition-colors"
            >
              {t.startExploring} →
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key={`step-${currentStep}`}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className="max-w-2xl w-full"
          >
            {/* Progress bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-slate-400">
                <span>{t.step} {currentStep + 1} {t.of} {t.steps.length}</span>
              </div>
              <button
                onClick={handleSkip}
                className="text-slate-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Step progress dots */}
            <div className="flex gap-2 mb-8">
              {t.steps.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors",
                    i < currentStep ? "bg-cyan-glow" :
                    i === currentStep ? "bg-cyan-glow animate-pulse" :
                    "bg-white/10"
                  )}
                />
              ))}
            </div>

            {/* Content card */}
            <div className="glass-card p-8">
              <div className="flex items-start gap-6">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center flex-shrink-0">
                  <CurrentIcon className="w-8 h-8 text-cyan-glow" />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {t.steps[currentStep].title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    {t.steps[currentStep].description}
                  </p>

                  {/* Reward badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 rounded-full">
                    <Zap className="text-yellow-400" size={16} />
                    <span className="text-yellow-400 font-bold">
                      +{t.steps[currentStep].reward} VOD
                    </span>
                  </div>
                </div>
              </div>

              {/* Earned so far */}
              <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-slate-400">{t.bonusEarned}:</span>
                <span className="text-cyan-glow font-bold">{earnedRewards} VOD</span>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className={cn(
                  "px-6 py-3 rounded-xl flex items-center gap-2 transition-colors",
                  currentStep === 0 
                    ? "bg-white/5 text-slate-600 cursor-not-allowed"
                    : "bg-white/10 hover:bg-white/20 text-white"
                )}
              >
                <ChevronLeft size={20} /> {t.prev}
              </button>
              <button
                onClick={handleNext}
                className="flex-1 px-6 py-3 bg-cyan-glow text-ocean-deep font-bold rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
              >
                {isLastStep ? t.finish : t.next} <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}










