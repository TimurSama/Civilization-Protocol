"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Gamepad2, Building2, TrendingUp, Map, BookOpen, Users, Leaf,
  Globe, ArrowRight, Play, Clock, Star, Award, ChevronRight,
  Sparkles, Target, Shield, Cpu, Heart
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Presentation {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  duration: string;
  difficulty: "easy" | "medium" | "advanced";
  audience: string[];
  features: string[];
  status: "ready" | "coming" | "beta";
  link: string;
}

const presentations: Presentation[] = [
  {
    id: "interactive",
    number: 0,
    title: "Интерактивное путешествие",
    subtitle: "Основная презентация",
    description: "Scroll-based storytelling с 3D глобусом, анимациями и Learn-to-Earn механикой. Погрузитесь в историю водного кризиса и решения VODeco.",
    icon: <Globe size={32} />,
    color: "cyan",
    gradient: "from-cyan-500 to-blue-600",
    duration: "15-20 мин",
    difficulty: "easy",
    audience: ["Все", "Новички"],
    features: ["3D Globe", "Learn-to-Earn", "Анимации", "Интерактив"],
    status: "ready",
    link: "/interactive-presentation",
  },
  {
    id: "game",
    number: 1,
    title: "Спаси экологию",
    subtitle: "Интерактивная игра",
    description: "Gamified experience с выбором роли, квестами, квизами и достижениями. Спасите планету от водного кризиса и заработайте XP.",
    icon: <Gamepad2 size={32} />,
    color: "emerald",
    gradient: "from-emerald-500 to-green-600",
    duration: "10-15 мин",
    difficulty: "easy",
    audience: ["Молодёжь", "Геймеры", "Широкая публика"],
    features: ["Выбор роли", "5 уровней", "Квизы", "Achievements"],
    status: "ready",
    link: "/presentations/game",
  },
  {
    id: "diplomatic",
    number: 2,
    title: "Стратегическая инициатива",
    subtitle: "Для политиков и ООН",
    description: "Формальная презентация с фокусом на SDG, геополитику воды, ROI для государств. Минимум анимаций, максимум данных.",
    icon: <Building2 size={32} />,
    color: "blue",
    gradient: "from-[#1a4d7c] to-[#0d2847]",
    duration: "20-30 мин",
    difficulty: "advanced",
    audience: ["Главы государств", "ООН", "Министерства"],
    features: ["SDG Alignment", "Карта конфликтов", "ROI калькулятор", "Меморандум"],
    status: "ready",
    link: "/presentations/diplomatic",
  },
  {
    id: "investors",
    number: 3,
    title: "Investor Pitch Deck",
    subtitle: "Для инвесторов",
    description: "Классический pitch deck: проблема → рынок → решение → трекшн → ask. 12 слайдов с ключевыми метриками.",
    icon: <TrendingUp size={32} />,
    color: "purple",
    gradient: "from-purple-500 to-pink-600",
    duration: "8-12 мин",
    difficulty: "medium",
    audience: ["VC", "Ангелы", "ESG-фонды"],
    features: ["TAM/SAM/SOM", "Unit economics", "Roadmap", "Token sale"],
    status: "ready",
    link: "/presentations/investors",
  },
  {
    id: "ecosystem",
    number: 4,
    title: "Карта экосистемы",
    subtitle: "Интерактивное исследование",
    description: "Путешествие по интерактивной карте: от глобального вида к конкретным проектам и IoT сенсорам в реальном времени.",
    icon: <Map size={32} />,
    color: "teal",
    gradient: "from-teal-500 to-cyan-600",
    duration: "15-20 мин",
    difficulty: "medium",
    audience: ["Экологи", "Учёные", "Операторы"],
    features: ["4 уровня zoom", "Слои данных", "Real-time IoT", "Прогнозы"],
    status: "ready",
    link: "/presentations/ecosystem",
  },
  {
    id: "whitepaper",
    number: 5,
    title: "Smart WhitePaper",
    subtitle: "Техническая документация",
    description: "Интерактивный технический документ с живыми примерами кода, диаграммами и калькуляторами токеномики.",
    icon: <BookOpen size={32} />,
    color: "slate",
    gradient: "from-slate-600 to-slate-800",
    duration: "30-60 мин",
    difficulty: "advanced",
    audience: ["Разработчики", "Исследователи", "Технические специалисты"],
    features: ["Accordion sections", "Live code", "Формулы", "API docs"],
    status: "ready",
    link: "/presentations/whitepaper",
  },
  {
    id: "human",
    number: 6,
    title: "История одной капли",
    subtitle: "Для обычного человека",
    description: "Простая и понятная история о воде, экологии и как каждый может помочь. Минимум технических терминов.",
    icon: <Heart size={32} />,
    color: "rose",
    gradient: "from-rose-500 to-red-600",
    duration: "5-8 мин",
    difficulty: "easy",
    audience: ["Широкая публика", "Семьи", "Школьники"],
    features: ["Storytelling", "Аналогии", "Простой язык", "Call to action"],
    status: "coming",
    link: "/presentations/human",
  },
  {
    id: "science",
    number: 7,
    title: "Научный подход",
    subtitle: "Для учёных и экологов",
    description: "Peer-reviewed данные, методологии исследований, открытые датасеты и возможности для научного сотрудничества.",
    icon: <Cpu size={32} />,
    color: "indigo",
    gradient: "from-indigo-500 to-violet-600",
    duration: "25-40 мин",
    difficulty: "advanced",
    audience: ["Учёные", "Исследователи", "Университеты"],
    features: ["Научные данные", "Методологии", "Датасеты", "Публикации"],
    status: "coming",
    link: "/presentations/science",
  },
];

const difficultyColors = {
  easy: "bg-emerald-500/20 text-emerald-400",
  medium: "bg-yellow-500/20 text-yellow-400",
  advanced: "bg-red-500/20 text-red-400",
};

const statusLabels = {
  ready: { label: "Доступно", color: "bg-emerald-500" },
  beta: { label: "Beta", color: "bg-yellow-500" },
  coming: { label: "Скоро", color: "bg-slate-500" },
};

export default function PresentationsPage() {
  const [filter, setFilter] = useState<"all" | "ready" | "coming">("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredPresentations = presentations.filter(p => 
    filter === "all" || p.status === filter
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-deep via-slate-900 to-ocean-deep py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="text-cyan-glow" size={40} />
            <h1 className="text-5xl md:text-6xl font-black">Презентации VODeco</h1>
          </div>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
            Выберите формат презентации, который лучше всего подходит для вашей аудитории
          </p>

          {/* Filters */}
          <div className="flex justify-center gap-2">
            {[
              { id: "all", label: "Все" },
              { id: "ready", label: "Доступно" },
              { id: "coming", label: "Скоро" },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as typeof filter)}
                className={cn(
                  "px-6 py-2 rounded-full font-bold transition-all",
                  filter === f.id
                    ? "bg-cyan-glow text-ocean-deep"
                    : "bg-white/5 hover:bg-white/10"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Presentations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPresentations.map((pres, i) => (
            <motion.div
              key={pres.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setHoveredId(pres.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={cn(
                "relative rounded-3xl overflow-hidden transition-all duration-300",
                pres.status === "coming" && "opacity-60",
                hoveredId === pres.id && "scale-[1.02]"
              )}
            >
              {/* Background gradient */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-20",
                pres.gradient
              )} />
              
              {/* Content */}
              <div className="relative p-6 border border-white/10 rounded-3xl bg-black/40 backdrop-blur-xl h-full flex flex-col">
                {/* Status badge */}
                <div className="absolute top-4 right-4">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-xs font-bold",
                    statusLabels[pres.status].color,
                    pres.status === "coming" ? "text-white" : "text-ocean-deep"
                  )}>
                    {statusLabels[pres.status].label}
                  </span>
                </div>

                {/* Number */}
                <div className="text-6xl font-black text-white/5 absolute top-4 left-4">
                  #{pres.number}
                </div>

                {/* Icon & Title */}
                <div className="flex items-start gap-4 mb-4 mt-8">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center",
                    `bg-${pres.color}-500/20 text-${pres.color}-400`
                  )}>
                    {pres.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{pres.title}</h3>
                    <p className="text-sm text-slate-500">{pres.subtitle}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-400 text-sm mb-4 flex-1">
                  {pres.description}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock size={12} />
                    {pres.duration}
                  </div>
                  <div className={cn(
                    "px-2 py-0.5 rounded-full text-xs",
                    difficultyColors[pres.difficulty]
                  )}>
                    {pres.difficulty === "easy" ? "Легко" : pres.difficulty === "medium" ? "Средне" : "Продвинуто"}
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-6">
                  {pres.features.map((feature, j) => (
                    <span key={j} className="px-2 py-1 bg-white/5 rounded-lg text-xs">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Audience */}
                <div className="text-xs text-slate-500 mb-4">
                  <span className="font-bold">Аудитория:</span> {pres.audience.join(", ")}
                </div>

                {/* CTA */}
                {pres.status === "ready" ? (
                  <Link
                    href={pres.link}
                    className={cn(
                      "w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all",
                      `bg-gradient-to-r ${pres.gradient} text-white hover:scale-105`
                    )}
                  >
                    <Play size={18} /> Смотреть
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full py-3 rounded-xl font-bold bg-white/5 text-slate-500 cursor-not-allowed"
                  >
                    Скоро
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Create your own */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 text-center"
        >
          <Award className="mx-auto text-cyan-glow mb-4" size={48} />
          <h2 className="text-2xl font-black mb-4">Нужна кастомная презентация?</h2>
          <p className="text-slate-400 mb-6 max-w-xl mx-auto">
            Мы можем создать уникальную презентацию для вашей конференции, 
            совета директоров или специфической аудитории
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-glow text-ocean-deep font-bold rounded-xl hover:scale-105 transition-transform"
          >
            Связаться с нами <ChevronRight size={18} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

