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
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-slate-950 via-[#0a1628] to-slate-950">
      {/* Formal Header - под главным Navbar */}
      <div className="sticky top-20 left-0 right-0 z-[90] bg-[#0a1628]/95 backdrop-blur-xl border-b border-[#1a3a5c]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1a4d7c] to-[#0d2847] flex items-center justify-center border border-[#2a5a8c]">
              <Globe className="text-[#4a9eff]" size={24} />
            </div>
            <div>
              <div className="font-bold text-lg tracking-wide">VODeco Initiative</div>
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
              <div className="grid md:grid-cols-4 gap-6">
                {globalStats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-2xl bg-gradient-to-b from-[#1a3a5c]/50 to-transparent border border-[#2a5a8c]/50"
                  >
                    <div className="text-4xl font-black text-[#4a9eff] mb-2">{stat.value}</div>
                    <div className="text-[#8aaccc] text-sm mb-3">{stat.label}</div>
                    <div className="text-xs text-[#5a7a9c]">Источник: {stat.source}</div>
                  </motion.div>
                ))}
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
                VODeco напрямую поддерживает 6 из 17 Целей устойчивого развития, 
                обеспечивая комплексный подход к глобальным вызовам
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {sdgGoals.map((goal, i) => (
                  <motion.button
                    key={goal.number}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setExpandedSDG(expandedSDG === goal.number ? null : goal.number)}
                    className={cn(
                      "p-6 rounded-2xl text-left transition-all",
                      "border-2",
                      expandedSDG === goal.number
                        ? "bg-[#1a3a5c]"
                        : "bg-transparent hover:bg-[#1a3a5c]/30"
                    )}
                    style={{ borderColor: goal.color }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: goal.color }}
                      >
                        <span className="text-2xl font-black text-white">{goal.number}</span>
                      </div>
                      <div>
                        <div className="font-bold text-lg">{goal.title}</div>
                        <div className="text-sm text-[#6a8caf]">SDG {goal.number}</div>
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {expandedSDG === goal.number && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-sm text-[#8aaccc]"
                        >
                          <p className="mb-3">{goal.description}</p>
                          <div className="flex items-center gap-2 text-[#4a9eff]">
                            <CheckCircle2 size={16} />
                            <span>Полное соответствие</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
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
                
                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    { icon: <Droplets size={24} />, title: "IoT сенсоры", desc: "Мониторинг в реальном времени" },
                    { icon: <Shield size={24} />, title: "Блокчейн", desc: "Неизменность данных" },
                    { icon: <Users size={24} />, title: "DAO", desc: "Децентрализованное управление" },
                    { icon: <TrendingUp size={24} />, title: "Токеномика", desc: "Экономические стимулы" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-6 rounded-xl bg-[#1a3a5c]/30 border border-[#2a5a8c]/30 text-center"
                    >
                      <div className="w-12 h-12 mx-auto rounded-xl bg-[#4a9eff]/20 flex items-center justify-center text-[#4a9eff] mb-4">
                        {item.icon}
                      </div>
                      <div className="font-bold mb-1">{item.title}</div>
                      <div className="text-sm text-[#6a8caf]">{item.desc}</div>
                    </motion.div>
                  ))}
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
                      icon: <Building2 size={32} />,
                      role: "Регулирование и надзор",
                      weight: "40%",
                    },
                    {
                      title: "Гражданское общество",
                      icon: <Users size={32} />,
                      role: "Мониторинг и участие",
                      weight: "35%",
                    },
                    {
                      title: "Экспертное сообщество",
                      icon: <Award size={32} />,
                      role: "Экспертиза и валидация",
                      weight: "25%",
                    },
                  ].map((stakeholder, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-center"
                    >
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-[#4a9eff]/20 flex items-center justify-center text-[#4a9eff] mb-4">
                        {stakeholder.icon}
                      </div>
                      <div className="font-bold text-lg mb-2">{stakeholder.title}</div>
                      <div className="text-sm text-[#6a8caf] mb-3">{stakeholder.role}</div>
                      <div className="inline-block px-4 py-2 rounded-full bg-[#4a9eff]/20 text-[#4a9eff] font-bold">
                        {stakeholder.weight} голосов
                      </div>
                    </motion.div>
                  ))}
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
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-[#6a8caf]">Сокращение расходов на мониторинг</span>
                        <span className="text-emerald-400 font-bold">-40%</span>
                      </div>
                      <div className="h-2 bg-[#1a3a5c] rounded-full overflow-hidden">
                        <div className="h-full w-[40%] bg-emerald-500" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-[#6a8caf]">Снижение потерь воды</span>
                        <span className="text-emerald-400 font-bold">-30%</span>
                      </div>
                      <div className="h-2 bg-[#1a3a5c] rounded-full overflow-hidden">
                        <div className="h-full w-[30%] bg-emerald-500" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-[#6a8caf]">Привлечение частных инвестиций</span>
                        <span className="text-[#4a9eff] font-bold">+250%</span>
                      </div>
                      <div className="h-2 bg-[#1a3a5c] rounded-full overflow-hidden">
                        <div className="h-full w-[75%] bg-[#4a9eff]" />
                      </div>
                    </div>
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
                присоединиться к инициативе VODeco для совместного решения водного кризиса
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









