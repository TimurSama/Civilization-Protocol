"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Droplets, Factory, Wrench, Network, Users, Coins, TrendingUp,
  Leaf, CheckCircle2, ArrowRight, ZoomIn, ZoomOut, Play, Pause,
  Satellite, Radio, Database, Shield, Cpu, Building2, Ruler, Thermometer,
  Activity, Zap, BarChart3, Globe
} from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import InfoPopup from "@/components/InfoPopup";

interface Step {
  id: number;
  title: string;
  description: string;
  visual: "satellite" | "river" | "equipment" | "ecosystem" | "digitalization" | "solutions" | "investment" | "bloom";
}

// Переводы для шагов
const stepTranslations: Record<string, Record<string, { title: string; description: string }>> = {
  ru: {
    step1: {
      title: "Вид со спутника: Пересушенный регион",
      description: "Среднеазиатский регион (Узбекистан, Казахстан, Туркменистан) страдает от водного кризиса. Реки мелеют, Аральское море высыхает, поля превращаются в пустыню."
    },
    step2: {
      title: "Приближение к реке: Схема водозабора",
      description: "Река Сырдарья и её притоки. Вдоль реки расположены поля, интенсивно забирающие воду через старые ирригационные каналы. Схема показывает неэффективное распределение."
    },
    step3: {
      title: "Чертёж оборудования: Насосные станции и очистные",
      description: "Детальные чертежи старого оборудования: насосные станции с протечками (потери 30-40%), станции водоочистки с низкой эффективностью (45%), высокое энергопотребление (500 кВт на станцию)."
    },
    step4: {
      title: "Схема установки экосистемы CivilizationProtocol",
      description: "Архитектурная схема внедрения: IoT сенсоры на объектах, блокчейн узлы для хранения данных, AI аналитический центр, цифровые двойники объектов."
    },
    step5: {
      title: "Схема оцифровки и запечатывания данных",
      description: "Техническая схема процесса: сбор данных с IoT → верификация AI → хэширование → запись в блокчейн → автоматическая эмиссия токенов VOD."
    },
    step6: {
      title: "Схема взаимодействия: Специалисты и решения",
      description: "Сетевая схема: специалисты со всего мира предлагают решения через платформу, DAO голосование выбирает оптимальные проекты, формируются пакеты решений."
    },
    step7: {
      title: "Схема инвестиций и стейкинга",
      description: "Экономическая схема: инвесторы и фонды → TokenHub → пакеты решений → стейкинг токенов → пассивный доход и участие в управлении."
    },
    step8: {
      title: "Результат: Регион расцветает",
      description: "Сравнительная схема: до и после. Эффективность выросла с 45% до 95%, энергопотребление снизилось на 80%, потери воды уменьшились на 90%, экосистема восстановлена."
    }
  },
  en: {
    step1: {
      title: "Satellite View: Arid Region",
      description: "Central Asian region (Uzbekistan, Kazakhstan, Turkmenistan) suffers from water crisis. Rivers are drying up, Aral Sea is shrinking, fields are turning into desert."
    },
    step2: {
      title: "River Approach: Water Intake Scheme",
      description: "Syr Darya River and its tributaries. Fields along the river intensively draw water through old irrigation canals. The scheme shows inefficient distribution."
    },
    step3: {
      title: "Equipment Drawing: Pumping Stations and Treatment Plants",
      description: "Detailed drawings of old equipment: pumping stations with leaks (30-40% losses), water treatment plants with low efficiency (45%), high energy consumption (500 kW per station)."
    },
    step4: {
      title: "CivilizationProtocol Ecosystem Installation Scheme",
      description: "Architectural implementation scheme: IoT sensors on objects, blockchain nodes for data storage, AI analytics center, digital twins of objects."
    },
    step5: {
      title: "Data Digitization and Anchoring Scheme",
      description: "Technical process scheme: data collection from IoT → AI verification → hashing → blockchain recording → automatic VOD token emission."
    },
    step6: {
      title: "Interaction Scheme: Specialists and Solutions",
      description: "Network scheme: specialists from around the world propose solutions through the platform, DAO voting selects optimal projects, solution packages are formed."
    },
    step7: {
      title: "Investment and Staking Scheme",
      description: "Economic scheme: investors and funds → TokenHub → solution packages → token staking → passive income and participation in governance."
    },
    step8: {
      title: "Result: Region Blooms",
      description: "Comparative scheme: before and after. Efficiency increased from 45% to 95%, energy consumption decreased by 80%, water losses reduced by 90%, ecosystem restored."
    }
  },
  ar: {
    step1: {
      title: "منظر القمر الصناعي: المنطقة الجافة",
      description: "تعاني منطقة آسيا الوسطى (أوزبكستان، كازاخستان، تركمانستان) من أزمة مائية. تجف الأنهار، ينحسر بحر آرال، تتحول الحقول إلى صحراء."
    },
    step2: {
      title: "الاقتراب من النهر: مخطط سحب المياه",
      description: "نهر سير داريا وروافده. الحقول على طول النهر تسحب المياه بكثافة عبر قنوات الري القديمة. يظهر المخطط التوزيع غير الفعال."
    },
    step3: {
      title: "رسم المعدات: محطات الضخ ومحطات المعالجة",
      description: "رسومات تفصيلية للمعدات القديمة: محطات ضخ مع تسريبات (خسائر 30-40%)، محطات معالجة المياه بكفاءة منخفضة (45%)، استهلاك طاقة عالي (500 كيلوواط لكل محطة)."
    },
    step4: {
      title: "مخطط تثبيت نظام CivilizationProtocol",
      description: "مخطط التنفيذ المعماري: أجهزة استشعار IoT على الكائنات، عقد البلوك تشين لتخزين البيانات، مركز تحليلات AI، التوائم الرقمية للكائنات."
    },
    step5: {
      title: "مخطط رقمنة البيانات وختمها",
      description: "مخطط العملية التقنية: جمع البيانات من IoT → التحقق من AI → التجزئة → التسجيل في البلوك تشين → إصدار تلقائي لرموز VOD."
    },
    step6: {
      title: "مخطط التفاعل: المتخصصون والحلول",
      description: "مخطط الشبكة: المتخصصون من جميع أنحاء العالم يقترحون حلولاً عبر المنصة، التصويت في DAO يختار المشاريع المثلى، يتم تشكيل حزم الحلول."
    },
    step7: {
      title: "مخطط الاستثمار والرهان",
      description: "المخطط الاقتصادي: المستثمرون والصناديق → TokenHub → حزم الحلول → رهان الرموز → الدخل السلبي والمشاركة في الحوكمة."
    },
    step8: {
      title: "النتيجة: تزدهر المنطقة",
      description: "مخطط مقارن: قبل وبعد. زادت الكفاءة من 45% إلى 95%، انخفض استهلاك الطاقة بنسبة 80%، انخفضت خسائر المياه بنسبة 90%، تم استعادة النظام البيئي."
    }
  }
};

function getSteps(language: string): Step[] {
  const t = stepTranslations[language] || stepTranslations.en;
  return [
    {
      id: 1,
      title: t.step1.title,
      description: t.step1.description,
      visual: "satellite"
    },
    {
      id: 2,
      title: t.step2.title,
      description: t.step2.description,
      visual: "river"
    },
    {
      id: 3,
      title: t.step3.title,
      description: t.step3.description,
      visual: "equipment"
    },
    {
      id: 4,
      title: t.step4.title,
      description: t.step4.description,
      visual: "ecosystem"
    },
    {
      id: 5,
      title: t.step5.title,
      description: t.step5.description,
      visual: "digitalization"
    },
    {
      id: 6,
      title: t.step6.title,
      description: t.step6.description,
      visual: "solutions"
    },
    {
      id: 7,
      title: t.step7.title,
      description: t.step7.description,
      visual: "investment"
    },
    {
      id: 8,
      title: t.step8.title,
      description: t.step8.description,
      visual: "bloom"
    }
  ];
}

export default function EcologyTransformationPage() {
  const { language, t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [zoom, setZoom] = useState(1);
  
  const steps = getSteps(language);

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 6000);
      return () => clearTimeout(timer);
    } else if (isPlaying && currentStep === steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderVisual = (visual: Step["visual"]) => {
    switch (visual) {
      case "satellite":
        return <SatelliteView />;
      case "river":
        return <RiverView />;
      case "equipment":
        return <EquipmentView />;
      case "ecosystem":
        return <EcosystemView />;
      case "digitalization":
        return <DigitalizationView />;
      case "solutions":
        return <SolutionsView />;
      case "investment":
        return <InvestmentView />;
      case "bloom":
        return <BloomView />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen text-white">
      {/* Local Header - под главным Navbar */}
      <div className="sticky top-20 left-0 right-0 z-[90] bg-slate-900/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-cyan-400">
              {language === 'ru' ? 'Трансформация экологии' : language === 'ar' ? 'تحويل البيئة' : 'Ecology Transformation'}
            </h1>
            <p className="text-sm text-slate-400">
              {language === 'ru' ? 'Интерактивная презентация в стиле технических схем и чертежей' : 
               language === 'ar' ? 'عرض تفاعلي بأسلوب المخططات والرسومات التقنية' : 
               'Interactive presentation in technical schematics and drawings style'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 flex items-center gap-2 transition-all"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              <span>
                {isPlaying 
                  ? (language === 'ru' ? 'Пауза' : language === 'ar' ? 'إيقاف' : 'Pause')
                  : (language === 'ru' ? 'Автоплей' : language === 'ar' ? 'تشغيل تلقائي' : 'Autoplay')
                }
              </span>
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoom(prev => Math.max(0.5, prev - 0.1))}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-white/10 transition-all"
              >
                <ZoomOut size={20} />
              </button>
              <span className="text-sm text-slate-400 min-w-[60px] text-center">{Math.round(zoom * 100)}%</span>
              <button
                onClick={() => setZoom(prev => Math.min(2, prev + 0.1))}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-white/10 transition-all"
              >
                <ZoomIn size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">
                {language === 'ru' ? `Шаг ${currentStep + 1} из ${steps.length}` : 
                 language === 'ar' ? `الخطوة ${currentStep + 1} من ${steps.length}` : 
                 `Step ${currentStep + 1} of ${steps.length}`}
              </span>
              <span className="text-sm text-slate-400">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Step Info */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-1">
                <h2 className="text-4xl font-black mb-4 text-cyan-400">{steps[currentStep].title}</h2>
                <p className="text-xl text-slate-300 max-w-3xl">{steps[currentStep].description}</p>
              </div>
              <InfoPopup
                title={steps[currentStep].title}
                content={
                  <div className="space-y-3">
                    <p className="text-sm">{steps[currentStep].description}</p>
                    <div>
                      <h4 className="font-bold mb-2">
                        {language === 'ru' ? 'Детальная информация:' : 
                         language === 'ar' ? 'معلومات مفصلة:' : 
                         'Detailed Information:'}
                      </h4>
                      <div className="text-sm text-slate-400 space-y-2">
                        {currentStep === 0 && (
                          <>
                            <p>Среднеазиатский регион столкнулся с критическим водным кризисом. Аральское море потеряло 90% своего объёма, реки мелеют, сельскохозяйственные угодья превращаются в пустыню.</p>
                            <ul className="list-disc list-inside space-y-1">
                              <li>Аральское море: потеря 90% объёма с 1960 года</li>
                              <li>Сырдарья и Амударья: снижение стока на 40-60%</li>
                              <li>Деградация почв: 80% земель подвержены засолению</li>
                              <li>Экономические потери: $2-3 млрд ежегодно</li>
                            </ul>
                          </>
                        )}
                        {currentStep === 1 && (
                          <>
                            <p>Река Сырдарья — одна из крупнейших рек Центральной Азии. Интенсивное использование воды для ирригации привело к критическому снижению уровня воды.</p>
                            <ul className="list-disc list-inside space-y-1">
                              <li>Длина реки: 2,212 км</li>
                              <li>Бассейн: 219,000 км²</li>
                              <li>Потери воды в каналах: 30-40%</li>
                              <li>Неэффективное распределение между регионами</li>
                            </ul>
                          </>
                        )}
                        {currentStep === 2 && (
                          <>
                            <p>Устаревшая инфраструктура водного сектора приводит к огромным потерям воды и энергии. Необходима модернизация с использованием современных технологий.</p>
                            <ul className="list-disc list-inside space-y-1">
                              <li>Потери воды: 30-40% из-за протечек</li>
                              <li>Эффективность очистки: только 45%</li>
                              <li>Энергопотребление: 500 кВт на станцию</li>
                              <li>Срок службы оборудования: превышен в 2-3 раза</li>
                            </ul>
                          </>
                        )}
                        {currentStep === 3 && (
                          <>
                            <p>CivilizationProtocol экосистема интегрируется в существующую инфраструктуру, добавляя IoT-сенсоры, блокчейн-узлы и AI-аналитику для полной цифровизации водного сектора.</p>
                            <ul className="list-disc list-inside space-y-1">
                              <li>IoT-сенсоры: мониторинг в реальном времени</li>
                              <li>Блокчейн-узлы: неизменное хранение данных</li>
                              <li>AI-аналитика: прогнозирование и оптимизация</li>
                              <li>Цифровые двойники: виртуальные модели объектов</li>
                            </ul>
                          </>
                        )}
                        {currentStep === 4 && (
                          <>
                            <p>Процесс оцифровки и запечатывания данных в блокчейн обеспечивает прозрачность, доверие и автоматическую эмиссию токенов за предоставление данных.</p>
                            <ul className="list-disc list-inside space-y-1">
                              <li>Сбор данных: IoT-сенсоры → платформа</li>
                              <li>Верификация: AI проверяет качество данных</li>
                              <li>Хэширование: создание уникального идентификатора</li>
                              <li>Блокчейн: запись в распределённый реестр</li>
                              <li>Эмиссия токенов: автоматическая награда за данные</li>
                            </ul>
                          </>
                        )}
                        {currentStep === 5 && (
                          <>
                            <p>Глобальное сообщество специалистов предлагает решения через платформу CivilizationProtocol. DAO-голосование выбирает оптимальные проекты для реализации.</p>
                            <ul className="list-disc list-inside space-y-1">
                              <li>Специалисты: инженеры, экологи, экономисты</li>
                              <li>Предложения: технические решения, проекты</li>
                              <li>DAO-голосование: демократический выбор</li>
                              <li>Пакеты решений: комплексные проекты</li>
                            </ul>
                          </>
                        )}
                        {currentStep === 6 && (
                          <>
                            <p>Инвестиционная модель CivilizationProtocol привлекает капитал через токенизацию активов, стейкинг и инвестиционные пулы, обеспечивая финансирование проектов.</p>
                            <ul className="list-disc list-inside space-y-1">
                              <li>Токенизация: водные активы → токены</li>
                              <li>Стейкинг: пассивный доход до 17% годовых</li>
                              <li>Инвестиционные пулы: финансирование проектов</li>
                              <li>Управление: участие в DAO-голосованиях</li>
                            </ul>
                          </>
                        )}
                        {currentStep === 7 && (
                          <>
                            <p>Результаты трансформации показывают кардинальное улучшение всех показателей: эффективность, энергопотребление, потери воды и состояние экосистемы.</p>
                            <ul className="list-disc list-inside space-y-1">
                              <li>Эффективность: с 45% до 95% (+50%)</li>
                              <li>Энергопотребление: снижение на 80%</li>
                              <li>Потери воды: снижение на 90%</li>
                              <li>Экосистема: восстановление биоразнообразия</li>
                              <li>Экономика: рост на $500M+ ежегодно</li>
                            </ul>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                }
                trigger={
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 transition-all"
                  >
                    <CheckCircle2 className="text-cyan-400" size={24} />
                  </motion.button>
                }
                size="lg"
              />
            </div>
          </motion.div>

          {/* Visual Area */}
          <div className="relative bg-slate-900/80 rounded-2xl border-2 border-cyan-500/30 p-8 min-h-[700px] overflow-auto">
            <div 
              className="transition-transform duration-300"
              style={{ transform: `scale(${zoom})`, transformOrigin: "center top" }}
            >
              {renderVisual(steps[currentStep].visual)}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={cn(
                "px-6 py-3 rounded-lg flex items-center gap-2 transition-all",
                currentStep === 0
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                  : "bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50"
              )}
            >
              <ArrowRight className="rotate-180" size={20} />
              <span>{language === 'ru' ? 'Назад' : language === 'ar' ? 'رجوع' : 'Back'}</span>
            </button>

            <div className="flex items-center gap-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all",
                    index === currentStep
                      ? "bg-cyan-400 w-8"
                      : "bg-slate-700 hover:bg-slate-600"
                  )}
                />
              ))}
            </div>

            <button
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
              className={cn(
                "px-6 py-3 rounded-lg flex items-center gap-2 transition-all",
                currentStep === steps.length - 1
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                  : "bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50"
              )}
            >
              <span>{language === 'ru' ? 'Вперёд' : language === 'ar' ? 'التالي' : 'Next'}</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Компоненты визуализации в стиле технических чертежей

function SatelliteView() {
  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 1200 800" className="w-full h-full">
        {/* Фон - карта региона */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e3a5f" strokeWidth="0.5" opacity="0.3"/>
          </pattern>
        </defs>
        <rect x="0" y="0" width="1200" height="800" fill="#0f172a" />
        <rect x="0" y="0" width="1200" height="800" fill="url(#grid)" />
        
        {/* Заголовок чертежа */}
        <g transform="translate(50, 30)">
          <rect x="0" y="0" width="1100" height="50" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" rx="3" />
          <text x="550" y="20" fill="#06b6d4" fontSize="18" textAnchor="middle" fontWeight="bold">СПУТНИКОВАЯ КАРТА РЕГИОНА</text>
          <text x="550" y="38" fill="#94a3b8" fontSize="12" textAnchor="middle">Средняя Азия: Узбекистан, Казахстан, Туркменистан | Масштаб 1:500,000</text>
        </g>
        
        {/* Реки (пересохшие) - Сырдарья и Амударья */}
        <g stroke="#dc2626" strokeWidth="4" fill="none" strokeDasharray="8,4" opacity="0.7">
          {/* Сырдарья */}
          <path d="M 200 300 Q 300 280 400 300 Q 500 320 600 310 Q 700 300 800 320 Q 900 340 1000 350" />
          <text x="600" y="290" fill="#dc2626" fontSize="14" textAnchor="middle" fontWeight="bold">Сырдарья (пересохшая)</text>
          
          {/* Амударья */}
          <path d="M 150 200 Q 250 180 350 200 Q 450 220 550 210 Q 650 200 750 220" />
          <text x="450" y="190" fill="#dc2626" fontSize="14" textAnchor="middle" fontWeight="bold">Амударья (пересохшая)</text>
        </g>
        
        {/* Аральское море (высохшее) */}
        <ellipse cx="600" cy="250" rx="150" ry="80" fill="#991b1b" opacity="0.4" stroke="#dc2626" strokeWidth="3" strokeDasharray="5,5" />
        <text x="600" y="250" fill="#dc2626" fontSize="16" textAnchor="middle" fontWeight="bold">Аральское море</text>
        <text x="600" y="270" fill="#dc2626" fontSize="12" textAnchor="middle">(высохло на 90%)</text>
        
        {/* Поля (высохшие) - схематично */}
        {[
          { x: 250, y: 350, w: 120, h: 100, label: "Поле 1" },
          { x: 450, y: 380, w: 120, h: 100, label: "Поле 2" },
          { x: 650, y: 360, w: 120, h: 100, label: "Поле 3" },
          { x: 850, y: 400, w: 120, h: 100, label: "Поле 4" },
          { x: 300, y: 500, w: 120, h: 100, label: "Поле 5" },
          { x: 550, y: 520, w: 120, h: 100, label: "Поле 6" }
        ].map((field, i) => (
          <g key={i}>
            <rect 
              x={field.x} 
              y={field.y} 
              width={field.w} 
              height={field.h} 
              fill="#991b1b" 
              opacity="0.3" 
              stroke="#dc2626" 
              strokeWidth="2"
              strokeDasharray="4,4"
            />
            <text x={field.x + field.w/2} y={field.y - 5} fill="#dc2626" fontSize="11" textAnchor="middle" fontWeight="bold">{field.label}</text>
            <text x={field.x + field.w/2} y={field.y + field.h/2} fill="#dc2626" fontSize="10" textAnchor="middle">Высохшее</text>
          </g>
        ))}
        
        {/* Спутник */}
        <g transform="translate(1000, 50)">
          <rect x="-40" y="-25" width="80" height="50" fill="#1e3a5f" stroke="#06b6d4" strokeWidth="2" rx="5" />
          <circle cx="0" cy="0" r="18" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
          <rect x="-30" y="-8" width="60" height="16" fill="#06b6d4" opacity="0.3" />
          <text x="0" y="40" fill="#06b6d4" fontSize="12" textAnchor="middle" fontWeight="bold">Спутник Landsat</text>
          <text x="0" y="55" fill="#94a3b8" fontSize="10" textAnchor="middle">Мониторинг</text>
        </g>
        
        {/* Линии сканирования */}
        <motion.line
          x1="1000"
          y1="50"
          x2="1000"
          y2="800"
          stroke="#06b6d4"
          strokeWidth="2"
          strokeDasharray="15,10"
          opacity="0.4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        {/* Координатная сетка */}
        <g stroke="#1e3a5f" strokeWidth="1" opacity="0.5">
          {[0, 200, 400, 600, 800, 1000, 1200].map(x => (
            <line key={`v${x}`} x1={x} y1="100" x2={x} y2="800" />
          ))}
          {[100, 200, 300, 400, 500, 600, 700, 800].map(y => (
            <line key={`h${y}`} x1="0" y1={y} x2="1200" y2={y} />
          ))}
        </g>
        
        {/* Легенда */}
        <g transform="translate(50, 650)">
          <rect x="0" y="0" width="300" height="130" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" rx="5" />
          <text x="150" y="20" fill="#06b6d4" fontSize="14" textAnchor="middle" fontWeight="bold">ЛЕГЕНДА</text>
          
          <line x1="20" y1="35" x2="50" y2="35" stroke="#dc2626" strokeWidth="3" strokeDasharray="4,4" />
          <text x="60" y="40" fill="white" fontSize="11">Пересохшие реки</text>
          
          <rect x="20" y="50" width="30" height="20" fill="#991b1b" opacity="0.3" stroke="#dc2626" strokeWidth="1" strokeDasharray="2,2" />
          <text x="60" y="65" fill="white" fontSize="11">Высохшие поля</text>
          
          <ellipse cx="35" cy="90" rx="20" ry="10" fill="#991b1b" opacity="0.4" stroke="#dc2626" strokeWidth="1" strokeDasharray="3,3" />
          <text x="60" y="95" fill="white" fontSize="11">Аральское море (высохшее)</text>
          
          <circle cx="30" cy="115" r="8" fill="#06b6d4" opacity="0.5" />
          <text x="60" y="120" fill="white" fontSize="11">Зона мониторинга CivilizationProtocol</text>
        </g>
        
        {/* Масштаб */}
        <g transform="translate(950, 650)">
          <line x1="0" y1="0" x2="100" y2="0" stroke="#06b6d4" strokeWidth="2" />
          <line x1="0" y1="-5" x2="0" y2="5" stroke="#06b6d4" strokeWidth="2" />
          <line x1="100" y1="-5" x2="100" y2="5" stroke="#06b6d4" strokeWidth="2" />
          <text x="50" y="-10" fill="#06b6d4" fontSize="11" textAnchor="middle" fontWeight="bold">50 км</text>
        </g>
        
        {/* Метрики кризиса */}
        <g transform="translate(400, 650)">
          <rect x="0" y="0" width="400" height="130" fill="#991b1b" opacity="0.2" stroke="#dc2626" strokeWidth="2" rx="5" />
          <text x="200" y="20" fill="#dc2626" fontSize="14" textAnchor="middle" fontWeight="bold">МЕТРИКИ КРИЗИСА</text>
          <text x="20" y="45" fill="#dc2626" fontSize="11">• Потеря воды: 60% от нормы</text>
          <text x="20" y="65" fill="#dc2626" fontSize="11">• Высохшие поля: 45% территории</text>
          <text x="20" y="85" fill="#dc2626" fontSize="11">• Аральское море: -90% объёма</text>
          <text x="20" y="105" fill="#dc2626" fontSize="11">• Эффективность ирригации: 35%</text>
        </g>
      </svg>
    </div>
  );
}

function RiverView() {
  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 1200 800" className="w-full h-full">
        <defs>
          <pattern id="grid-river" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1e3a5f" strokeWidth="0.5" opacity="0.2"/>
          </pattern>
          <marker id="arrow-water" markerWidth="12" markerHeight="12" refX="6" refY="6" orient="auto">
            <polygon points="0,0 12,6 0,12" fill="#3b82f6" />
          </marker>
        </defs>
        <rect x="0" y="0" width="1200" height="800" fill="#0f172a" />
        <rect x="0" y="0" width="1200" height="800" fill="url(#grid-river)" />
        
        {/* Заголовок */}
        <g transform="translate(50, 30)">
          <rect x="0" y="0" width="1100" height="50" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" rx="3" />
          <text x="550" y="20" fill="#06b6d4" fontSize="18" textAnchor="middle" fontWeight="bold">СХЕМА ВОДОЗАБОРА И ИРРИГАЦИИ</text>
          <text x="550" y="38" fill="#94a3b8" fontSize="12" textAnchor="middle">Река Сырдарья и притоки | Вид сверху | Масштаб 1:10,000</text>
        </g>
        
        {/* Река (вид сверху) - детальная схема */}
        <path
          d="M 100 400 Q 250 380 400 400 Q 550 420 700 410 Q 850 400 1000 420 Q 1100 440 1150 450"
          fill="#1e40af"
          stroke="#3b82f6"
          strokeWidth="8"
          opacity="0.7"
        />
        <text x="600" y="380" fill="#3b82f6" fontSize="16" textAnchor="middle" fontWeight="bold">Река Сырдарья</text>
        
        {/* Притоки */}
        <path d="M 300 200 L 350 380" stroke="#3b82f6" strokeWidth="4" opacity="0.6" />
        <text x="320" y="280" fill="#3b82f6" fontSize="12" textAnchor="middle">Приток 1</text>
        <path d="M 600 200 L 650 400" stroke="#3b82f6" strokeWidth="4" opacity="0.6" />
        <text x="620" y="280" fill="#3b82f6" fontSize="12" textAnchor="middle">Приток 2</text>
        
        {/* Ирригационные каналы (старые) */}
        {[
          { x: 200, y: 400, angle: -45, label: "Канал 1", width: 60 },
          { x: 400, y: 400, angle: -30, label: "Канал 2", width: 80 },
          { x: 600, y: 410, angle: -20, label: "Канал 3", width: 70 },
          { x: 800, y: 420, angle: -15, label: "Канал 4", width: 90 }
        ].map((canal, i) => {
          const rad = (canal.angle * Math.PI) / 180;
          const endX = canal.x + Math.cos(rad) * canal.width;
          const endY = canal.y + Math.sin(rad) * canal.width;
          return (
            <g key={i}>
              <line
                x1={canal.x}
                y1={canal.y}
                x2={endX}
                y2={endY}
                stroke="#f59e0b"
                strokeWidth="3"
                strokeDasharray="5,3"
                opacity="0.7"
              />
              <text x={canal.x + (endX - canal.x) / 2} y={canal.y + (endY - canal.y) / 2 - 10} fill="#f59e0b" fontSize="10" textAnchor="middle">{canal.label}</text>
            </g>
          );
        })}
        
        {/* Поля вдоль реки - детальная схема */}
        {[
          { x: 150, y: 300, w: 100, h: 150, label: "Поле 1", crop: "Хлопок", efficiency: "35%" },
          { x: 350, y: 320, w: 120, h: 160, label: "Поле 2", crop: "Пшеница", efficiency: "30%" },
          { x: 550, y: 310, w: 110, h: 150, label: "Поле 3", crop: "Хлопок", efficiency: "32%" },
          { x: 750, y: 330, w: 130, h: 170, label: "Поле 4", crop: "Рис", efficiency: "28%" },
          { x: 950, y: 350, w: 120, h: 160, label: "Поле 5", crop: "Пшеница", efficiency: "33%" }
        ].map((field, i) => (
          <g key={i}>
            <rect
              x={field.x}
              y={field.y}
              width={field.w}
              height={field.h}
              fill="#dc2626"
              opacity="0.2"
              stroke="#dc2626"
              strokeWidth="2"
              strokeDasharray="4,4"
            />
            <text x={field.x + field.w/2} y={field.y - 5} fill="#dc2626" fontSize="12" textAnchor="middle" fontWeight="bold">{field.label}</text>
            <text x={field.x + field.w/2} y={field.y + 20} fill="#f59e0b" fontSize="10" textAnchor="middle">{field.crop}</text>
            <text x={field.x + field.w/2} y={field.y + field.h/2} fill="#dc2626" fontSize="11" textAnchor="middle" fontWeight="bold">Эфф: {field.efficiency}</text>
            
            {/* Стрелки забора воды */}
            <motion.path
              d={`M ${field.x + field.w/2} ${field.y} L ${field.x + field.w/2} ${field.y + 30}`}
              stroke="#f59e0b"
              strokeWidth="2"
              markerEnd="url(#arrow-water)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          </g>
        ))}
        
        {/* Насосные станции - детальные чертежи */}
        {[
          { x: 200, y: 500, id: "НС-1", power: "500 кВт", loss: "35%" },
          { x: 500, y: 520, id: "НС-2", power: "480 кВт", loss: "38%" },
          { x: 800, y: 540, id: "НС-3", power: "520 кВт", loss: "32%" }
        ].map((station, i) => (
          <g key={i} transform={`translate(${station.x}, ${station.y})`}>
            <rect x="-30" y="-30" width="60" height="60" fill="#1e293b" stroke="#dc2626" strokeWidth="2" />
            <circle cx="0" cy="0" r="12" fill="#dc2626" opacity="0.5" />
            <circle cx="0" cy="0" r="6" fill="#dc2626" />
            <text x="0" y="-40" fill="#dc2626" fontSize="11" textAnchor="middle" fontWeight="bold">{station.id}</text>
            <text x="0" y="45" fill="#dc2626" fontSize="9" textAnchor="middle">{station.power}</text>
            <text x="0" y="58" fill="#dc2626" fontSize="9" textAnchor="middle">Потери: {station.loss}</text>
          </g>
        ))}
        
        {/* Размеры (чертёжные линии) */}
        <g stroke="#06b6d4" strokeWidth="1.5" opacity="0.6">
          <line x1="50" y1="100" x2="1150" y2="100" />
          <line x1="50" y1="95" x2="50" y2="105" />
          <line x1="1150" y1="95" x2="1150" y2="105" />
          <text x="600" y="90" fill="#06b6d4" fontSize="13" textAnchor="middle" fontWeight="bold">1100 м (общая длина участка)</text>
        </g>
        
        {/* Легенда */}
        <g transform="translate(50, 650)">
          <rect x="0" y="0" width="250" height="130" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" rx="5" />
          <text x="125" y="20" fill="#06b6d4" fontSize="14" textAnchor="middle" fontWeight="bold">ЛЕГЕНДА</text>
          <line x1="20" y1="35" x2="50" y2="35" stroke="#3b82f6" strokeWidth="4" />
          <text x="60" y="40" fill="white" fontSize="11">Река</text>
          <line x1="20" y1="50" x2="50" y2="50" stroke="#f59e0b" strokeWidth="3" strokeDasharray="5,3" />
          <text x="60" y="55" fill="white" fontSize="11">Ирригационные каналы</text>
          <rect x="20" y="65" width="30" height="20" fill="#dc2626" opacity="0.2" stroke="#dc2626" strokeWidth="1" strokeDasharray="2,2" />
          <text x="60" y="78" fill="white" fontSize="11">Поля</text>
          <circle cx="30" cy="100" r="8" fill="#dc2626" />
          <text x="60" y="105" fill="white" fontSize="11">Насосные станции</text>
        </g>
        
        {/* Метрики */}
        <g transform="translate(350, 650)">
          <rect x="0" y="0" width="500" height="130" fill="#dc2626" opacity="0.15" stroke="#dc2626" strokeWidth="2" rx="5" />
          <text x="250" y="20" fill="#dc2626" fontSize="14" textAnchor="middle" fontWeight="bold">ПРОБЛЕМЫ СИСТЕМЫ</text>
          <text x="20" y="45" fill="#dc2626" fontSize="11">• Эффективность ирригации: 30-35% (норма: 70-80%)</text>
          <text x="20" y="65" fill="#dc2626" fontSize="11">• Потери воды в каналах: 40-50%</text>
          <text x="20" y="85" fill="#dc2626" fontSize="11">• Энергопотребление насосов: 500 кВт/станция (норма: 100 кВт)</text>
          <text x="20" y="105" fill="#dc2626" fontSize="11">• Утечки в насосных станциях: 30-38%</text>
        </g>
      </svg>
    </div>
  );
}

function EquipmentView() {
  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 1200 800" className="w-full h-full">
        <defs>
          <pattern id="grid-equip" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e3a5f" strokeWidth="0.5" opacity="0.2"/>
          </pattern>
        </defs>
        <rect x="0" y="0" width="1200" height="800" fill="#0f172a" />
        <rect x="0" y="0" width="1200" height="800" fill="url(#grid-equip)" />
        
        {/* Заголовок */}
        <g transform="translate(50, 30)">
          <rect x="0" y="0" width="1100" height="50" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" rx="3" />
          <text x="550" y="20" fill="#06b6d4" fontSize="18" textAnchor="middle" fontWeight="bold">ЧЕРТЕЖИ ОБОРУДОВАНИЯ</text>
          <text x="550" y="38" fill="#94a3b8" fontSize="12" textAnchor="middle">Насосные станции и станции водоочистки | Масштаб 1:50</text>
        </g>
        
        {/* Насосная станция - детальный чертёж */}
        <g transform="translate(150, 150)">
          <text x="0" y="-20" fill="#06b6d4" fontSize="16" textAnchor="middle" fontWeight="bold">НАСОСНАЯ СТАНЦИЯ (СТАРАЯ)</text>
          
          {/* Корпус насоса - вид сбоку */}
          <rect x="0" y="0" width="200" height="120" fill="#1e293b" stroke="#dc2626" strokeWidth="3" rx="5" />
          <rect x="20" y="20" width="160" height="80" fill="#0f172a" stroke="#dc2626" strokeWidth="2" strokeDasharray="3,3" />
          
          {/* Входной патрубок */}
          <rect x="-30" y="40" width="30" height="40" fill="#1e293b" stroke="#dc2626" strokeWidth="2" />
          <text x="-15" y="35" fill="#dc2626" fontSize="10" textAnchor="middle">Вход</text>
          
          {/* Выходной патрубок */}
          <rect x="200" y="50" width="30" height="30" fill="#1e293b" stroke="#dc2626" strokeWidth="2" />
          <text x="215" y="45" fill="#dc2626" fontSize="10" textAnchor="middle">Выход</text>
          
          {/* Протечки - детально */}
          {[
            { x: 30, y: 125, size: 4 },
            { x: 80, y: 130, size: 5 },
            { x: 130, y: 125, size: 4 },
            { x: 170, y: 128, size: 6 }
          ].map((leak, i) => (
            <motion.g key={i}>
              <circle cx={leak.x} cy={leak.y} r={leak.size} fill="#dc2626" />
              <motion.circle
                cx={leak.x}
                cy={leak.y}
                r={leak.size}
                fill="#dc2626"
                initial={{ opacity: 0.5, scale: 1 }}
                animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.8, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
              />
              {/* Капли */}
              <motion.circle
                cx={leak.x}
                cy={leak.y + 15}
                r="2"
                fill="#3b82f6"
                animate={{ cy: [leak.y + 15, leak.y + 25], opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.3 }}
              />
            </motion.g>
          ))}
          <text x="100" y="155" fill="#dc2626" fontSize="12" textAnchor="middle" fontWeight="bold">Протечки (потери 35%)</text>
          
          {/* Электродвигатель */}
          <rect x="60" y="-40" width="80" height="30" fill="#991b1b" stroke="#dc2626" strokeWidth="2" />
          <text x="100" y="-20" fill="#dc2626" fontSize="11" textAnchor="middle" fontWeight="bold">Электродвигатель</text>
          <text x="100" y="-5" fill="#dc2626" fontSize="10" textAnchor="middle">500 кВт</text>
          
          {/* Размеры */}
          <g stroke="#06b6d4" strokeWidth="1" opacity="0.6">
            <line x1="0" y1="140" x2="200" y2="140" />
            <line x1="0" y1="135" x2="0" y2="145" />
            <line x1="200" y1="135" x2="200" y2="145" />
            <text x="100" y="155" fill="#06b6d4" fontSize="10" textAnchor="middle">2000 мм</text>
          </g>
        </g>
        
        {/* Станция водоочистки - детальный чертёж */}
        <g transform="translate(600, 150)">
          <text x="0" y="-20" fill="#06b6d4" fontSize="16" textAnchor="middle" fontWeight="bold">СТАНЦИЯ ВОДООЧИСТКИ (СТАРАЯ)</text>
          
          {/* Резервуары - вид сверху */}
          {[
            { x: 0, y: 0, id: "Р-1", volume: "100 м³", efficiency: "40%" },
            { x: 80, y: 0, id: "Р-2", volume: "100 м³", efficiency: "45%" },
            { x: 160, y: 0, id: "Р-3", volume: "100 м³", efficiency: "50%" }
          ].map((tank, i) => (
            <g key={i}>
              <rect x={tank.x} y={tank.y} width="70" height="100" fill="#1e293b" stroke="#dc2626" strokeWidth="2" />
              <rect x={tank.x + 5} y={tank.y + 5} width="60" height="90" fill="#0f172a" />
              <text x={tank.x + 35} y={tank.y - 10} fill="#dc2626" fontSize="11" textAnchor="middle" fontWeight="bold">{tank.id}</text>
              <text x={tank.x + 35} y={tank.y + 50} fill="#dc2626" fontSize="9" textAnchor="middle">{tank.volume}</text>
              <text x={tank.x + 35} y={tank.y + 65} fill="#dc2626" fontSize="9" textAnchor="middle">Эфф: {tank.efficiency}</text>
            </g>
          ))}
          
          {/* Трубопроводы */}
          <line x1="70" y1="50" x2="80" y2="50" stroke="#3b82f6" strokeWidth="4" />
          <line x1="150" y1="50" x2="160" y2="50" stroke="#3b82f6" strokeWidth="4" />
          
          {/* Сброс непереработанной воды */}
          <motion.path
            d="M 230 50 L 280 150"
            stroke="#dc2626"
            strokeWidth="4"
            fill="none"
            strokeDasharray="8,4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <text x="255" y="30" fill="#dc2626" fontSize="12" textAnchor="middle" fontWeight="bold">Сброс</text>
          <text x="255" y="45" fill="#dc2626" fontSize="10" textAnchor="middle">55% воды</text>
          
          {/* Общая эффективность */}
          <g transform="translate(0, 150)">
            <rect x="0" y="0" width="230" height="50" fill="#991b1b" opacity="0.3" stroke="#dc2626" strokeWidth="2" />
            <text x="115" y="18" fill="#dc2626" fontSize="12" textAnchor="middle" fontWeight="bold">ОБЩАЯ ЭФФЕКТИВНОСТЬ</text>
            <text x="115" y="35" fill="#dc2626" fontSize="16" textAnchor="middle" fontWeight="bold">45%</text>
            <text x="115" y="48" fill="#dc2626" fontSize="9" textAnchor="middle">(55% воды сбрасывается без очистки)</text>
          </g>
        </g>
        
        {/* Сравнительная таблица */}
        <g transform="translate(200, 500)">
          <rect x="0" y="0" width="800" height="250" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" rx="5" />
          <text x="400" y="25" fill="#06b6d4" fontSize="16" textAnchor="middle" fontWeight="bold">ТЕХНИЧЕСКИЕ ХАРАКТЕРИСТИКИ</text>
          
          {/* Заголовки колонок */}
          <g fill="#06b6d4" fontSize="12" fontWeight="bold">
            <text x="50" y="55">Параметр</text>
            <text x="300" y="55">Насосная станция</text>
            <text x="550" y="55">Станция очистки</text>
            <text x="750" y="55">Норма</text>
          </g>
          
          {/* Данные */}
          {[
            { param: "Энергопотребление", pump: "500 кВт", clean: "300 кВт", norm: "100 кВт" },
            { param: "Эффективность", pump: "65%", clean: "45%", norm: "95%" },
            { param: "Потери/Сброс", pump: "35%", clean: "55%", norm: "5%" },
            { param: "Износ оборудования", pump: "85%", clean: "80%", norm: "20%" },
            { param: "Срок службы", pump: "25 лет", clean: "20 лет", norm: "50 лет" }
          ].map((row, i) => (
            <g key={i} fill="white" fontSize="11">
              <text x="50" y={80 + i * 30}>{row.param}</text>
              <text x="300" y={80 + i * 30} fill="#dc2626">{row.pump}</text>
              <text x="550" y={80 + i * 30} fill="#dc2626">{row.clean}</text>
              <text x="750" y={80 + i * 30} fill="#22c55e">{row.norm}</text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

// Остальные компоненты будут добавлены в следующем обновлении из-за ограничения размера
function EcosystemView() {
  return <div className="text-white p-8">Ecosystem View - в разработке</div>;
}

function DigitalizationView() {
  return <div className="text-white p-8">Digitalization View - в разработке</div>;
}

function SolutionsView() {
  return <div className="text-white p-8">Solutions View - в разработке</div>;
}

function InvestmentView() {
  return <div className="text-white p-8">Investment View - в разработке</div>;
}

function BloomView() {
  return <div className="text-white p-8">Bloom View - в разработке</div>;
}
