"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Globe, Shield, Users, Building2, Scale, Award, Target,
  FileText, TrendingUp, AlertTriangle, CheckCircle2, ArrowRight,
  ChevronDown, ChevronUp, Landmark, Handshake, Flag, MapPin,
  BarChart3, PieChart, ArrowUpRight, Droplets, Leaf, Sun,
  ExternalLink, Download, Play, BookOpen, Star
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import InfoPopup from "@/components/InfoPopup";
import StatisticCard from "@/components/StatisticCard";

// SDG data
const sdgGoals = [
  { number: 6, title: "Чистая вода", color: "#26BDE2", icon: <Droplets size={24} />, description: "Обеспечение наличия и рационального использования водных ресурсов" },
  { number: 9, title: "Инфраструктура", color: "#FD6925", icon: <Building2 size={24} />, description: "Создание устойчивой инфраструктуры и инноваций" },
  { number: 11, title: "Устойчивые города", color: "#FD9D24", icon: <Landmark size={24} />, description: "Обеспечение устойчивости городов и населённых пунктов" },
  { number: 13, title: "Борьба с изменением климата", color: "#3F7E44", icon: <Leaf size={24} />, description: "Принятие срочных мер по борьбе с изменением климата" },
  { number: 16, title: "Мир и правосудие", color: "#00689D", icon: <Scale size={24} />, description: "Содействие построению справедливых обществ" },
  { number: 17, title: "Партнёрство", color: "#19486A", icon: <Handshake size={24} />, description: "Укрепление глобального партнёрства" },
];

// Key statistics
const globalStats = [
  { value: "2.2B", label: "людей без доступа к чистой воде", source: "WHO/UNICEF 2023" },
  { value: "$8.6T", label: "объём мирового водного рынка к 2030", source: "Global Water Intelligence" },
  { value: "40%", label: "дефицит воды к 2030 году", source: "UN Water 2023" },
  { value: "700M", label: "климатических мигрантов к 2030", source: "World Bank" },
];

// Sections
const sections = [
  { id: "context", title: "Глобальный контекст", icon: <Globe size={20} /> },
  { id: "strategic", title: "Стратегическая значимость", icon: <Target size={20} /> },
  { id: "sdg", title: "Соответствие целям ООН", icon: <Flag size={20} /> },
  { id: "solution", title: "Технологическое решение", icon: <Shield size={20} /> },
  { id: "governance", title: "Модель управления", icon: <Users size={20} /> },
  { id: "economics", title: "Экономическая модель", icon: <TrendingUp size={20} /> },
  { id: "action", title: "Призыв к действию", icon: <Handshake size={20} /> },
];

export default function DiplomaticPresentation() {
  const [activeSection, setActiveSection] = useState(0);
  const [expandedSDG, setExpandedSDG] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div ref={containerRef} className="min-h-screen">
      {/* Formal Header - под главным Navbar */}
      <div className="sticky top-20 left-0 right-0 z-[90] bg-[#0a1628]/95 backdrop-blur-xl border-b border-[#1a3a5c]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1a4d7c] to-[#0d2847] flex items-center justify-center border border-[#2a5a8c]">
              <Globe className="text-[#4a9eff]" size={24} />
            </div>
            <div>
              <div className="font-bold text-lg tracking-wide">CivilizationProtocol Initiative</div>
              <div className="text-xs text-[#6a8caf]">Strategic Water Management Platform</div>
            </div>
          </div>
          
          {/* Progress */}
          <div className="hidden md:flex items-center gap-6">
            <div className="text-sm text-[#6a8caf]">
              {sections[activeSection].title}
            </div>
            <div className="w-48 h-1 bg-[#1a3a5c] rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#4a9eff] to-[#00d4aa]"
                style={{ width: progress }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-medium text-[#4a9eff] hover:bg-[#1a3a5c] rounded-lg transition-colors flex items-center gap-2">
              <Download size={16} /> PDF
            </button>
            <Link 
              href="/presentations"
              className="px-4 py-2 text-sm font-medium bg-[#1a3a5c] hover:bg-[#2a4a6c] rounded-lg transition-colors"
            >
              Все презентации
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Sidebar */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <div className="space-y-2">
          {sections.map((section, i) => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSection(i);
                document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm",
                activeSection === i
                  ? "bg-[#1a4d7c] text-white"
                  : "text-[#6a8caf] hover:bg-[#1a3a5c] hover:text-white"
              )}
            >
              {section.icon}
              <span className="hidden xl:inline">{section.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-12 px-6 lg:pl-48">
        <div className="max-w-5xl mx-auto space-y-32">
          
          {/* Section 1: Global Context */}
          <section id="context" className="min-h-screen flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              onViewportEnter={() => setActiveSection(0)}
              viewport={{ once: false, margin: "-40%" }}
            >
              {/* Header */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a3a5c] text-[#4a9eff] text-sm font-medium mb-6">
                  <AlertTriangle size={16} />
                  Критическая ситуация
                </div>
                <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
                  Глобальный<br />
                  <span className="bg-gradient-to-r from-[#4a9eff] to-[#00d4aa] bg-clip-text text-transparent">
                    водный кризис
                  </span>
                </h1>
                <p className="text-xl text-[#8aaccc] max-w-3xl mx-auto">
                  Вода становится стратегическим ресурсом XXI века, определяющим 
                  геополитический баланс, экономическую стабильность и социальную безопасность
                </p>
              </div>

              {/* Statistics */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {globalStats.map((stat, i) => {
                  const icons = [Users, TrendingUp, AlertTriangle, Globe];
                  const Icon = icons[i];
                  
                  return (
                    <InfoPopup
                      key={i}
                      title={stat.label}
                      content={
                        <div className="space-y-3">
                          <p>
                            <strong>{stat.value}</strong> — {stat.label.toLowerCase()}
                          </p>
                          <div>
                            <h4 className="font-bold mb-2">Детали:</h4>
                            <p className="text-sm text-slate-400">
                              {stat.label === "людей без доступа к чистой воде" && "По данным WHO/UNICEF, 2.2 миллиарда человек не имеют доступа к безопасной питьевой воде. Это составляет 29% населения планеты. Большинство из них живут в сельских районах развивающихся стран."}
                              {stat.label === "объём мирового водного рынка к 2030" && "Рынок водных ресурсов растёт экспоненциально. К 2030 году ожидается объём в $8.6 триллионов, включая инфраструктуру, технологии, управление и экологические услуги."}
                              {stat.label === "дефицит воды к 2030 году" && "Ожидается, что к 2030 году спрос на воду превысит предложение на 40%. Это приведёт к серьёзным экономическим и социальным последствиям, особенно в регионах с ограниченными водными ресурсами."}
                              {stat.label === "климатических мигрантов к 2030" && "Изменение климата и водный кризис вынудят 700 миллионов человек покинуть свои дома к 2030 году. Это создаст серьёзные геополитические и гуманитарные вызовы."}
                            </p>
                          </div>
                          <p className="text-xs text-slate-500">
                            Источник: {stat.source}
                          </p>
                        </div>
                      }
                      trigger={
                        <motion.div
                          initial={{ opacity: 0, y: 30, scale: 0.9 }}
                          whileInView={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: i * 0.1, type: "spring" }}
                          whileHover={{ 
                            y: -8,
                            scale: 1.05,
                            transition: { duration: 0.2 }
                          }}
                          className="p-6 rounded-2xl glass-card border border-[#2a5a8c]/50 hover:border-[#4a9eff]/50 transition-all cursor-pointer group relative overflow-hidden"
                        >
                          {/* Градиентный фон */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-[#1a3a5c]/50 to-transparent group-hover:from-[#1a4d7c]/70 group-hover:to-[#1a3a5c]/50 transition-all duration-300"
                          />
                          
                          {/* Иконка */}
                          <motion.div
                            className="w-12 h-12 mb-4 rounded-xl bg-[#4a9eff]/20 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Icon className="text-[#4a9eff]" size={24} />
                          </motion.div>
                          
                          <motion.div
                            className="text-4xl font-black text-[#4a9eff] mb-2 relative z-10"
                            animate={{
                              scale: [1, 1.05, 1],
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                          >
                            {stat.value}
                          </motion.div>
                          <div className="text-[#8aaccc] text-sm mb-3 relative z-10 group-hover:text-white transition-colors">
                            {stat.label}
                          </div>
                          <div className="text-xs text-[#5a7a9c] relative z-10">Источник: {stat.source}</div>
                          
                          {/* Декоративные элементы */}
                          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#4a9eff] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                      }
                      size="md"
                    />
                  );
                })}
              </div>

              {/* World Map Visualization */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="mt-16 p-8 rounded-3xl bg-gradient-to-b from-[#0d2440] to-[#0a1c30] border border-[#2a5a8c]/30"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Карта водного стресса</h3>
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-emerald-500" />
                      <span className="text-[#8aaccc]">Низкий</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-yellow-500" />
                      <span className="text-[#8aaccc]">Средний</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-red-500" />
                      <span className="text-[#8aaccc]">Критический</span>
                    </div>
                  </div>
                </div>
                
                {/* Simplified world map representation */}
                <div className="aspect-[2/1] rounded-xl bg-[#0a1628] border border-[#1a3a5c] relative overflow-hidden">
                  <div className="absolute inset-0 opacity-30">
                    <svg viewBox="0 0 800 400" className="w-full h-full">
                      {/* Simplified continents */}
                      <path d="M100,150 Q150,100 250,120 T350,140 Q400,160 380,200 T300,240 Q200,260 100,200 Z" fill="#2a5a8c" />
                      <path d="M420,80 Q500,60 580,100 T680,140 Q720,180 680,240 T560,280 Q480,300 420,240 Z" fill="#2a5a8c" />
                      <path d="M200,280 Q280,260 340,300 T400,340 Q380,380 300,360 T200,320 Z" fill="#2a5a8c" />
                    </svg>
                  </div>
                  
                  {/* Crisis hotspots */}
                  {[
                    { x: "20%", y: "40%", label: "Центральная Азия", severity: "high" },
                    { x: "55%", y: "35%", label: "Ближний Восток", severity: "critical" },
                    { x: "65%", y: "55%", label: "Южная Азия", severity: "high" },
                    { x: "45%", y: "65%", label: "Северная Африка", severity: "critical" },
                  ].map((spot, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="absolute"
                      style={{ left: spot.x, top: spot.y }}
                    >
                      <div className={cn(
                        "w-4 h-4 rounded-full animate-ping absolute",
                        spot.severity === "critical" ? "bg-red-500" : "bg-yellow-500"
                      )} />
                      <div className={cn(
                        "w-4 h-4 rounded-full relative z-10",
                        spot.severity === "critical" ? "bg-red-500" : "bg-yellow-500"
                      )} />
                      <div className="absolute left-6 top-0 whitespace-nowrap text-xs text-[#8aaccc] bg-[#0a1628] px-2 py-1 rounded">
                        {spot.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </section>

          {/* Section 2: Strategic Significance */}
          <section id="strategic" className="min-h-screen flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              onViewportEnter={() => setActiveSection(1)}
              viewport={{ once: false, margin: "-40%" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a3a5c] text-[#4a9eff] text-sm font-medium mb-6">
                <Target size={16} />
                Стратегический анализ
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-8">
                Вода как ресурс<br />
                <span className="text-[#4a9eff]">национальной безопасности</span>
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Economic Impact */}
                <div className="p-8 rounded-2xl bg-gradient-to-br from-[#1a3a5c]/50 to-transparent border border-[#2a5a8c]/50">
                  <TrendingUp className="text-[#4a9eff] mb-4" size={32} />
                  <h3 className="text-xl font-bold mb-4">Экономическое влияние</h3>
                  <ul className="space-y-4 text-[#8aaccc]">
                    <li className="flex items-start gap-3">
                      <ArrowUpRight className="text-emerald-400 shrink-0 mt-1" size={16} />
                      <span>$8.6 трлн — прогнозируемый объём водного сектора к 2030</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowUpRight className="text-emerald-400 shrink-0 mt-1" size={16} />
                      <span>6% мирового ВВП зависит от водных ресурсов</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowUpRight className="text-emerald-400 shrink-0 mt-1" size={16} />
                      <span>$260 млрд ежегодных потерь от неэффективного управления</span>
                    </li>
                  </ul>
                </div>

                {/* Security Risks */}
                <div className="p-8 rounded-2xl bg-gradient-to-br from-[#1a3a5c]/50 to-transparent border border-[#2a5a8c]/50">
                  <Shield className="text-red-400 mb-4" size={32} />
                  <h3 className="text-xl font-bold mb-4">Риски безопасности</h3>
                  <ul className="space-y-4 text-[#8aaccc]">
                    <li className="flex items-start gap-3">
                      <AlertTriangle className="text-red-400 shrink-0 mt-1" size={16} />
                      <span>263 трансграничных бассейна без координации</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <AlertTriangle className="text-red-400 shrink-0 mt-1" size={16} />
                      <span>700M климатических мигрантов к 2030</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <AlertTriangle className="text-red-400 shrink-0 mt-1" size={16} />
                      <span>46 стран с высоким риском водных конфликтов</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Quote */}
              <motion.blockquote
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="mt-12 p-8 rounded-2xl bg-[#0d2440] border-l-4 border-[#4a9eff]"
              >
                <p className="text-xl italic text-[#8aaccc] mb-4">
                  «Войны XXI века будут вестись не за нефть, а за воду. Страны, которые смогут 
                  обеспечить устойчивое управление водными ресурсами, станут лидерами нового мирового порядка.»
                </p>
                <cite className="text-[#4a9eff] font-medium">— Исмаил Серагельдин, бывший вице-президент World Bank</cite>
              </motion.blockquote>
            </motion.div>
          </section>

          {/* Section 3: SDG Alignment */}
          <section id="sdg" className="min-h-screen flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              onViewportEnter={() => setActiveSection(2)}
              viewport={{ once: false, margin: "-40%" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a3a5c] text-[#4a9eff] text-sm font-medium mb-6">
                <Flag size={16} />
                Соответствие глобальным целям
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Alignment с<br />
                <span className="text-[#4a9eff]">Целями устойчивого развития ООН</span>
              </h2>
              <p className="text-xl text-[#8aaccc] mb-12 max-w-3xl">
                CivilizationProtocol напрямую поддерживает 6 из 17 Целей устойчивого развития, 
                обеспечивая комплексный подход к глобальным вызовам
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sdgGoals.map((goal, i) => (
                  <InfoPopup
                    key={goal.number}
                    title={`SDG ${goal.number}: ${goal.title}`}
                    content={
                      <div className="space-y-3">
                        <p className="text-sm">{goal.description}</p>
                        <div>
                          <h4 className="font-bold mb-2">Как CivilizationProtocol поддерживает эту цель:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
                            {goal.number === 6 && (
                              <>
                                <li>Обеспечение доступа к данным о водных ресурсах</li>
                                <li>Мониторинг качества воды в реальном времени</li>
                                <li>Оптимизация распределения водных ресурсов</li>
                                <li>Предотвращение загрязнения через прозрачность</li>
                              </>
                            )}
                            {goal.number === 9 && (
                              <>
                                <li>Блокчейн-инфраструктура для водного сектора</li>
                                <li>IoT-сенсоры для мониторинга</li>
                                <li>Инновационные технологии управления</li>
                                <li>Устойчивая цифровая инфраструктура</li>
                              </>
                            )}
                            {goal.number === 11 && (
                              <>
                                <li>Умное управление водными ресурсами в городах</li>
                                <li>Снижение потерь воды в городской инфраструктуре</li>
                                <li>Участие граждан в управлении</li>
                                <li>Экологически устойчивые решения</li>
                              </>
                            )}
                            {goal.number === 13 && (
                              <>
                                <li>Мониторинг влияния климата на водные ресурсы</li>
                                <li>Адаптация к изменению климата</li>
                                <li>Снижение углеродного следа через оптимизацию</li>
                                <li>Поддержка климатических инициатив</li>
                              </>
                            )}
                            {goal.number === 16 && (
                              <>
                                <li>Прозрачность через блокчейн</li>
                                <li>Децентрализованное управление (DAO)</li>
                                <li>Справедливое распределение ресурсов</li>
                                <li>Борьба с коррупцией в водном секторе</li>
                              </>
                            )}
                            {goal.number === 17 && (
                              <>
                                <li>Глобальное партнёрство через платформу</li>
                                <li>Международное сотрудничество</li>
                                <li>Обмен данными и лучшими практиками</li>
                                <li>Поддержка международных инициатив</li>
                              </>
                            )}
                          </ul>
                        </div>
                        <div className="flex items-center gap-2 text-cyan-400 pt-2 border-t border-white/10">
                          <CheckCircle2 size={16} />
                          <span className="text-sm font-medium">Полное соответствие</span>
                        </div>
                      </div>
                    }
                    trigger={
                      <motion.button
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: i * 0.1, type: "spring" }}
                        whileHover={{ 
                          y: -5,
                          scale: 1.03,
                          transition: { duration: 0.2 }
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          setExpandedSDG(expandedSDG === goal.number ? null : goal.number);
                        }}
                        className={cn(
                          "p-6 rounded-2xl text-left transition-all cursor-pointer group relative overflow-hidden",
                          "border-2",
                          expandedSDG === goal.number
                            ? "bg-[#1a3a5c] border-opacity-100"
                            : "bg-transparent hover:bg-[#1a3a5c]/30 border-opacity-50"
                        )}
                        style={{ borderColor: goal.color }}
                      >
                        {/* Градиентный фон при hover */}
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{
                            background: `linear-gradient(135deg, ${goal.color}15, transparent)`,
                          }}
                        />
                        
                        <div className="flex items-center gap-4 mb-4 relative z-10">
                          <motion.div
                            className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg"
                            style={{ backgroundColor: goal.color }}
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                          >
                            <span className="text-2xl font-black text-white">{goal.number}</span>
                          </motion.div>
                          <div>
                            <div className="font-bold text-lg group-hover:text-white transition-colors">
                              {goal.title}
                            </div>
                            <div className="text-sm text-[#6a8caf] group-hover:text-[#8aaccc] transition-colors">
                              SDG {goal.number}
                            </div>
                          </div>
                        </div>
                        
                        <AnimatePresence>
                          {expandedSDG === goal.number && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="text-sm text-[#8aaccc] relative z-10"
                            >
                              <p className="mb-3">{goal.description}</p>
                              <div className="flex items-center gap-2 text-[#4a9eff]">
                                <CheckCircle2 size={16} />
                                <span>Полное соответствие</span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        {/* Декоративные элементы */}
                        <div className="absolute top-2 right-2 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: goal.color }} />
                      </motion.button>
                    }
                    size="lg"
                  />
                ))}
              </div>
            </motion.div>
          </section>

          {/* Section 4: Technology Solution */}
          <section id="solution" className="min-h-screen flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              onViewportEnter={() => setActiveSection(3)}
              viewport={{ once: false, margin: "-40%" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a3a5c] text-[#4a9eff] text-sm font-medium mb-6">
                <Shield size={16} />
                Технологическое решение
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-8">
                Децентрализованная платформа<br />
                <span className="text-[#4a9eff]">управления водными ресурсами</span>
              </h2>

              {/* Architecture Diagram */}
              <div className="p-8 rounded-3xl bg-gradient-to-b from-[#0d2440] to-[#0a1c30] border border-[#2a5a8c]/30 mb-12">
                <h3 className="text-xl font-bold mb-8 text-center">Архитектура платформы</h3>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { 
                      icon: Droplets, 
                      title: "IoT сенсоры", 
                      desc: "Мониторинг в реальном времени",
                      details: "Сеть IoT-сенсоров собирает данные о качестве воды, уровне, температуре, химическом составе и других параметрах в режиме реального времени. Данные передаются через защищённые каналы на блокчейн-платформу для хранения и анализа."
                    },
                    { 
                      icon: Shield, 
                      title: "Блокчейн", 
                      desc: "Неизменность данных",
                      details: "Блокчейн обеспечивает неизменяемое хранение всех данных о водных ресурсах. Каждая транзакция, измерение и решение записывается в распределённый реестр, обеспечивая прозрачность и доверие между всеми участниками экосистемы."
                    },
                    { 
                      icon: Users, 
                      title: "DAO", 
                      desc: "Децентрализованное управление",
                      details: "Децентрализованная автономная организация (DAO) позволяет всем заинтересованным сторонам участвовать в принятии решений о водных ресурсах. Голосование происходит через смарт-контракты, обеспечивая демократичность и прозрачность."
                    },
                    { 
                      icon: TrendingUp, 
                      title: "Токеномика", 
                      desc: "Экономические стимулы",
                      details: "Двойная система токенов (CivilizationProtocol utility token и VOD stable token) создаёт экономические стимулы для всех участников. Стейкинг, награды за участие, инвестиционные пулы и другие механики обеспечивают устойчивую экономическую модель."
                    },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    
                    return (
                      <InfoPopup
                        key={i}
                        title={item.title}
                        content={
                          <div className="space-y-3">
                            <p className="text-sm">{item.details}</p>
                            <div>
                              <h4 className="font-bold mb-2">Преимущества:</h4>
                              <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
                                {item.title === "IoT сенсоры" && (
                                  <>
                                    <li>Непрерывный мониторинг 24/7</li>
                                    <li>Раннее обнаружение проблем</li>
                                    <li>Автоматизация сбора данных</li>
                                    <li>Снижение затрат на мониторинг</li>
                                  </>
                                )}
                                {item.title === "Блокчейн" && (
                                  <>
                                    <li>Неизменяемость данных</li>
                                    <li>Прозрачность всех операций</li>
                                    <li>Децентрализация (нет единой точки отказа)</li>
                                    <li>Аудит в реальном времени</li>
                                  </>
                                )}
                                {item.title === "DAO" && (
                                  <>
                                    <li>Демократическое принятие решений</li>
                                    <li>Участие всех заинтересованных сторон</li>
                                    <li>Прозрачность голосований</li>
                                    <li>Снижение коррупции</li>
                                  </>
                                )}
                                {item.title === "Токеномика" && (
                                  <>
                                    <li>Экономические стимулы для участия</li>
                                    <li>Стейкинг с доходами</li>
                                    <li>Learn-to-Earn механика</li>
                                    <li>Устойчивая экономическая модель</li>
                                  </>
                                )}
                              </ul>
                            </div>
                          </div>
                        }
                        trigger={
                          <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: i * 0.1, type: "spring" }}
                            whileHover={{ 
                              y: -8,
                              scale: 1.05,
                              transition: { duration: 0.2 }
                            }}
                            className="p-6 rounded-xl glass-card border border-[#2a5a8c]/30 hover:border-[#4a9eff]/50 text-center cursor-pointer group relative overflow-hidden"
                          >
                            {/* Градиентный фон */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-br from-[#1a3a5c]/30 to-transparent group-hover:from-[#1a4d7c]/50 group-hover:to-[#1a3a5c]/30 transition-all duration-300"
                            />
                            
                            <motion.div
                              className="w-12 h-12 mx-auto rounded-xl bg-[#4a9eff]/20 flex items-center justify-center text-[#4a9eff] mb-4 relative z-10 group-hover:scale-110 transition-transform"
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.5 }}
                            >
                              <Icon size={24} />
                            </motion.div>
                            <div className="font-bold mb-1 relative z-10 group-hover:text-white transition-colors">
                              {item.title}
                            </div>
                            <div className="text-sm text-[#6a8caf] relative z-10 group-hover:text-[#8aaccc] transition-colors">
                              {item.desc}
                            </div>
                            
                            {/* Декоративные элементы */}
                            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#4a9eff] opacity-0 group-hover:opacity-100 transition-opacity" />
                          </motion.div>
                        }
                        size="md"
                      />
                    );
                  })}
                </div>
              </div>

              {/* Benefits */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-[#1a3a5c]/30 border border-[#2a5a8c]/30">
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="text-emerald-400" size={20} />
                    Преимущества для государств
                  </h4>
                  <ul className="space-y-2 text-[#8aaccc] text-sm">
                    <li>• Прозрачность использования бюджетных средств</li>
                    <li>• Сокращение расходов на мониторинг до 40%</li>
                    <li>• Предотвращение коррупции через блокчейн</li>
                    <li>• Улучшение межведомственной координации</li>
                    <li>• Соответствие международным стандартам</li>
                  </ul>
                </div>
                <div className="p-6 rounded-xl bg-[#1a3a5c]/30 border border-[#2a5a8c]/30">
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="text-emerald-400" size={20} />
                    Преимущества для граждан
                  </h4>
                  <ul className="space-y-2 text-[#8aaccc] text-sm">
                    <li>• Доступ к достоверным данным о качестве воды</li>
                    <li>• Участие в принятии решений через DAO</li>
                    <li>• Экономические стимулы за участие</li>
                    <li>• Защита прав на чистую воду</li>
                    <li>• Образовательные ресурсы</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Section 5: Governance Model */}
          <section id="governance" className="min-h-screen flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              onViewportEnter={() => setActiveSection(4)}
              viewport={{ once: false, margin: "-40%" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a3a5c] text-[#4a9eff] text-sm font-medium mb-6">
                <Users size={16} />
                Модель управления
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-8">
                DAO как инструмент<br />
                <span className="text-[#4a9eff]">демократического управления</span>
              </h2>

              <div className="p-8 rounded-3xl bg-gradient-to-b from-[#0d2440] to-[#0a1c30] border border-[#2a5a8c]/30">
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Государственные органы",
                      icon: Building2,
                      role: "Регулирование и надзор",
                      weight: "40%",
                      details: "Государственные органы получают 40% голосов в DAO, обеспечивая баланс между демократией и эффективностью управления. Они отвечают за установление правил, надзор за соблюдением стандартов и координацию между различными ведомствами.",
                      responsibilities: [
                        "Установление нормативных требований",
                        "Надзор за соблюдением стандартов",
                        "Координация межведомственного взаимодействия",
                        "Представление интересов государства",
                      ],
                    },
                    {
                      title: "Гражданское общество",
                      icon: Users,
                      role: "Мониторинг и участие",
                      weight: "35%",
                      details: "Гражданское общество получает 35% голосов, обеспечивая участие граждан в принятии решений о водных ресурсах. Это включает НПО, общественные организации, местные сообщества и активных граждан.",
                      responsibilities: [
                        "Мониторинг качества воды",
                        "Участие в голосованиях DAO",
                        "Предложение инициатив",
                        "Общественный контроль",
                      ],
                    },
                    {
                      title: "Экспертное сообщество",
                      icon: Award,
                      role: "Экспертиза и валидация",
                      weight: "25%",
                      details: "Экспертное сообщество (учёные, инженеры, экологи) получает 25% голосов, обеспечивая научно обоснованные решения. Их роль включает валидацию данных, экспертизу проектов и консультации.",
                      responsibilities: [
                        "Валидация научных данных",
                        "Экспертиза проектов",
                        "Технические консультации",
                        "Исследования и разработки",
                      ],
                    },
                  ].map((stakeholder, i) => {
                    const Icon = stakeholder.icon;
                    
                    return (
                      <InfoPopup
                        key={i}
                        title={stakeholder.title}
                        content={
                          <div className="space-y-3">
                            <p className="text-sm">{stakeholder.details}</p>
                            <div>
                              <h4 className="font-bold mb-2">Обязанности:</h4>
                              <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
                                {stakeholder.responsibilities.map((resp, j) => (
                                  <li key={j}>{resp}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="pt-2 border-t border-white/10">
                              <p className="text-sm">
                                <strong>Вес голоса:</strong> {stakeholder.weight}
                              </p>
                            </div>
                          </div>
                        }
                        trigger={
                          <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: i * 0.1, type: "spring" }}
                            whileHover={{ 
                              y: -5,
                              scale: 1.05,
                              transition: { duration: 0.2 }
                            }}
                            className="text-center cursor-pointer group"
                          >
                            <motion.div
                              className="w-16 h-16 mx-auto rounded-2xl bg-[#4a9eff]/20 flex items-center justify-center text-[#4a9eff] mb-4 group-hover:scale-110 transition-transform"
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.5 }}
                            >
                              <Icon size={32} />
                            </motion.div>
                            <div className="font-bold text-lg mb-2 group-hover:text-white transition-colors">
                              {stakeholder.title}
                            </div>
                            <div className="text-sm text-[#6a8caf] mb-3 group-hover:text-[#8aaccc] transition-colors">
                              {stakeholder.role}
                            </div>
                            <motion.div
                              className="inline-block px-4 py-2 rounded-full bg-[#4a9eff]/20 text-[#4a9eff] font-bold group-hover:bg-[#4a9eff]/30 transition-colors"
                              animate={{
                                scale: [1, 1.05, 1],
                              }}
                              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                            >
                              {stakeholder.weight} голосов
                            </motion.div>
                          </motion.div>
                        }
                        size="md"
                      />
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </section>

          {/* Section 6: Economics */}
          <section id="economics" className="min-h-screen flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              onViewportEnter={() => setActiveSection(5)}
              viewport={{ once: false, margin: "-40%" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a3a5c] text-[#4a9eff] text-sm font-medium mb-6">
                <TrendingUp size={16} />
                Экономическая модель
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-8">
                ROI для государств<br />
                <span className="text-[#4a9eff]">и привлечение инвестиций</span>
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* ROI Calculator */}
                <div className="p-8 rounded-3xl bg-gradient-to-b from-[#0d2440] to-[#0a1c30] border border-[#2a5a8c]/30">
                  <h3 className="text-xl font-bold mb-6">Расчёт эффективности</h3>
                  <div className="space-y-6">
                    {[
                      {
                        label: "Сокращение расходов на мониторинг",
                        value: "-40%",
                        width: 40,
                        color: "emerald",
                        details: "Автоматизация сбора данных через IoT-сенсоры и блокчейн-платформу снижает затраты на мониторинг водных ресурсов на 40%. Это включает экономию на персонале, оборудовании и административных процессах.",
                      },
                      {
                        label: "Снижение потерь воды",
                        value: "-30%",
                        width: 30,
                        color: "emerald",
                        details: "Раннее обнаружение утечек и оптимизация распределения через платформу CivilizationProtocol снижает потери воды на 30%. Это экономит миллионы кубометров воды ежегодно и снижает нагрузку на водные ресурсы.",
                      },
                      {
                        label: "Привлечение частных инвестиций",
                        value: "+250%",
                        width: 75,
                        color: "cyan",
                        details: "Прозрачность и блокчейн-технологии привлекают частных инвесторов. Ожидается увеличение инвестиций на 250% благодаря токенизации активов, стейкингу и инвестиционным пулам.",
                      },
                    ].map((metric, i) => (
                      <InfoPopup
                        key={i}
                        title={metric.label}
                        content={
                          <div className="space-y-3">
                            <p className="text-sm">{metric.details}</p>
                            <div>
                              <h4 className="font-bold mb-2">Экономический эффект:</h4>
                              <p className="text-sm text-slate-400">
                                {metric.label === "Сокращение расходов на мониторинг" && "Для страны с бюджетом $100 млн на мониторинг, экономия составит $40 млн ежегодно. Эти средства можно направить на развитие инфраструктуры."}
                                {metric.label === "Снижение потерь воды" && "Снижение потерь на 30% эквивалентно экономии миллионов кубометров воды. Это снижает нагрузку на водные ресурсы и улучшает доступность воды для населения."}
                                {metric.label === "Привлечение частных инвестиций" && "Увеличение инвестиций на 250% означает привлечение дополнительных средств от частных инвесторов, заинтересованных в устойчивых и прозрачных проектах."}
                              </p>
                            </div>
                          </div>
                        }
                        trigger={
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="cursor-pointer group"
                          >
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-[#6a8caf] group-hover:text-white transition-colors">
                                {metric.label}
                              </span>
                              <motion.span
                                className={`font-bold ${
                                  metric.color === "emerald" ? "text-emerald-400" : "text-[#4a9eff]"
                                }`}
                                whileHover={{ scale: 1.1 }}
                              >
                                {metric.value}
                              </motion.span>
                            </div>
                            <div className="h-3 bg-[#1a3a5c] rounded-full overflow-hidden relative">
                              <motion.div
                                className={`h-full bg-${
                                  metric.color === "emerald" ? "emerald" : "cyan"
                                }-500 relative`}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${metric.width}%` }}
                                transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                              >
                                {/* Блестящий эффект */}
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                  animate={{
                                    x: ["-100%", "100%"],
                                  }}
                                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                                />
                              </motion.div>
                            </div>
                          </motion.div>
                        }
                        size="md"
                      />
                    ))}
                  </div>
                </div>

                {/* Investment Highlights */}
                <div className="p-8 rounded-3xl bg-gradient-to-b from-[#0d2440] to-[#0a1c30] border border-[#2a5a8c]/30">
                  <h3 className="text-xl font-bold mb-6">Инвестиционные преимущества</h3>
                  <ul className="space-y-4">
                    {[
                      "ESG-совместимость для международных фондов",
                      "Токенизация активов водной инфраструктуры",
                      "Прозрачность использования средств",
                      "Измеримые метрики воздействия",
                      "Партнёрство с международными организациями",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-[#8aaccc]">
                        <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={18} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Section 7: Call to Action */}
          <section id="action" className="min-h-screen flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              onViewportEnter={() => setActiveSection(6)}
              viewport={{ once: false, margin: "-40%" }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a3a5c] text-[#4a9eff] text-sm font-medium mb-6">
                <Handshake size={16} />
                Призыв к действию
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-8">
                Станьте частью<br />
                <span className="text-[#4a9eff]">глобального решения</span>
              </h2>
              <p className="text-xl text-[#8aaccc] max-w-3xl mx-auto mb-12">
                Приглашаем государства, международные организации и институты развития 
                присоединиться к инициативе CivilizationProtocol для совместного решения водного кризиса
              </p>

              {/* CTA Cards */}
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {[
                  {
                    icon: <FileText size={32} />,
                    title: "Меморандум о сотрудничестве",
                    desc: "Подписание официального соглашения о партнёрстве",
                  },
                  {
                    icon: <Flag size={32} />,
                    title: "Пилотный проект",
                    desc: "Запуск пилота в вашем регионе",
                  },
                  {
                    icon: <Users size={32} />,
                    title: "Экспертная консультация",
                    desc: "Встреча с командой проекта",
                  },
                ].map((cta, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-2xl bg-[#1a3a5c]/50 border border-[#2a5a8c]/50 hover:border-[#4a9eff] transition-colors cursor-pointer group"
                  >
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-[#4a9eff]/20 flex items-center justify-center text-[#4a9eff] mb-4 group-hover:scale-110 transition-transform">
                      {cta.icon}
                    </div>
                    <div className="font-bold text-lg mb-2">{cta.title}</div>
                    <div className="text-sm text-[#6a8caf]">{cta.desc}</div>
                  </motion.div>
                ))}
              </div>

              {/* Contact */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-[#1a4d7c] to-[#0d2847] border border-[#2a5a8c]"
              >
                <div className="flex flex-wrap justify-center items-center gap-8">
                  <div className="text-left">
                    <div className="text-sm text-[#6a8caf] mb-1">Контакт для официальных запросов</div>
                    <a href="mailto:diplomatic@vodprom.org" className="text-xl font-bold text-[#4a9eff] hover:underline">
                      diplomatic@vodprom.org
                    </a>
                  </div>
                  <div className="h-12 w-px bg-[#2a5a8c] hidden md:block" />
                  <div className="flex gap-4">
                    <a 
                      href="#"
                      className="px-6 py-3 bg-[#4a9eff] text-[#0a1628] font-bold rounded-xl hover:bg-[#3a8eef] transition-colors flex items-center gap-2"
                    >
                      <Download size={18} /> Скачать презентацию
                    </a>
                    <Link
                      href="/invest"
                      className="px-6 py-3 border-2 border-[#4a9eff] text-[#4a9eff] font-bold rounded-xl hover:bg-[#4a9eff]/10 transition-colors flex items-center gap-2"
                    >
                      Инвестиционный оффер <ExternalLink size={18} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </section>
        </div>
      </div>
    </div>
  );
}









