"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Gamepad2, Building2, TrendingUp, Map, BookOpen, Users, Leaf,
  Globe, ArrowRight, Play, Clock, Star, Award, ChevronRight,
  Sparkles, Target, Shield, Cpu, Heart, Ruler
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

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

const difficultyColors = {
  easy: "bg-emerald-500/20 text-emerald-400",
  medium: "bg-yellow-500/20 text-yellow-400",
  advanced: "bg-red-500/20 text-red-400",
};

export default function PresentationsPage() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<"all" | "ready" | "coming">("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const presentations: Presentation[] = useMemo(() => {
    const pres = t("presentations.items");
    return [
      {
        id: "interactive",
        number: 0,
        title: pres.interactive.title,
        subtitle: pres.interactive.subtitle,
        description: pres.interactive.description,
        icon: <Globe size={32} />,
        color: "cyan",
        gradient: "from-cyan-500 to-blue-600",
        duration: pres.interactive.duration,
        difficulty: "easy",
        audience: pres.interactive.audience,
        features: pres.interactive.features,
        status: "ready",
        link: "/interactive-presentation",
      },
      {
        id: "game",
        number: 1,
        title: pres.game.title,
        subtitle: pres.game.subtitle,
        description: pres.game.description,
        icon: <Gamepad2 size={32} />,
        color: "emerald",
        gradient: "from-emerald-500 to-green-600",
        duration: pres.game.duration,
        difficulty: "easy",
        audience: pres.game.audience,
        features: pres.game.features,
        status: "ready",
        link: "/presentations/game",
      },
      {
        id: "diplomatic",
        number: 2,
        title: pres.diplomatic.title,
        subtitle: pres.diplomatic.subtitle,
        description: pres.diplomatic.description,
        icon: <Building2 size={32} />,
        color: "blue",
        gradient: "from-[#1a4d7c] to-[#0d2847]",
        duration: pres.diplomatic.duration,
        difficulty: "advanced",
        audience: pres.diplomatic.audience,
        features: pres.diplomatic.features,
        status: "ready",
        link: "/presentations/diplomatic",
      },
      {
        id: "investors",
        number: 3,
        title: pres.investors.title,
        subtitle: pres.investors.subtitle,
        description: pres.investors.description,
        icon: <TrendingUp size={32} />,
        color: "purple",
        gradient: "from-purple-500 to-pink-600",
        duration: pres.investors.duration,
        difficulty: "medium",
        audience: pres.investors.audience,
        features: pres.investors.features,
        status: "ready",
        link: "/presentations/investors",
      },
      {
        id: "ecosystem",
        number: 4,
        title: pres.ecosystem.title,
        subtitle: pres.ecosystem.subtitle,
        description: pres.ecosystem.description,
        icon: <Map size={32} />,
        color: "teal",
        gradient: "from-teal-500 to-cyan-600",
        duration: pres.ecosystem.duration,
        difficulty: "medium",
        audience: pres.ecosystem.audience,
        features: pres.ecosystem.features,
        status: "ready",
        link: "/presentations/ecosystem",
      },
      {
        id: "whitepaper",
        number: 5,
        title: pres.whitepaper.title,
        subtitle: pres.whitepaper.subtitle,
        description: pres.whitepaper.description,
        icon: <BookOpen size={32} />,
        color: "slate",
        gradient: "from-slate-600 to-slate-800",
        duration: pres.whitepaper.duration,
        difficulty: "advanced",
        audience: pres.whitepaper.audience,
        features: pres.whitepaper.features,
        status: "ready",
        link: "/presentations/whitepaper",
      },
      {
        id: "human",
        number: 6,
        title: pres.human.title,
        subtitle: pres.human.subtitle,
        description: pres.human.description,
        icon: <Heart size={32} />,
        color: "rose",
        gradient: "from-rose-500 to-red-600",
        duration: pres.human.duration,
        difficulty: "easy",
        audience: pres.human.audience,
        features: pres.human.features,
        status: "coming",
        link: "/presentations/human",
      },
      {
        id: "science",
        number: 7,
        title: pres.science.title,
        subtitle: pres.science.subtitle,
        description: pres.science.description,
        icon: <Cpu size={32} />,
        color: "indigo",
        gradient: "from-indigo-500 to-violet-600",
        duration: pres.science.duration,
        difficulty: "advanced",
        audience: pres.science.audience,
        features: pres.science.features,
        status: "coming",
        link: "/presentations/science",
      },
      {
        id: "ecology-transformation",
        number: 8,
        title: pres.ecology_transformation.title,
        subtitle: pres.ecology_transformation.subtitle,
        description: pres.ecology_transformation.description,
        icon: <Ruler size={32} />,
        color: "green",
        gradient: "from-green-500 to-emerald-600",
        duration: pres.ecology_transformation.duration,
        difficulty: "easy",
        audience: pres.ecology_transformation.audience,
        features: pres.ecology_transformation.features,
        status: "ready",
        link: "/presentations/ecology-transformation",
      },
    ];
  }, [t]);

  const statusLabels = useMemo(() => ({
    ready: { label: t("presentations.status.ready"), color: "bg-emerald-500" },
    beta: { label: t("presentations.status.beta"), color: "bg-yellow-500" },
    coming: { label: t("presentations.status.coming"), color: "bg-slate-500" },
  }), [t]);

  const filteredPresentations = presentations.filter(p => 
    filter === "all" || p.status === filter
  );

  const difficultyLabel = (difficulty: "easy" | "medium" | "advanced") => {
    return t(`presentations.difficulty.${difficulty}`);
  };

  return (
    <div className="min-h-screen py-12 sm:py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <Sparkles className="text-cyan-glow" size={32} />
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black">{t("presentations.title")}</h1>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
            {t("presentations.subtitle")}
          </p>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 px-4">
            {[
              { id: "all", label: t("presentations.filters.all") },
              { id: "ready", label: t("presentations.filters.ready") },
              { id: "coming", label: t("presentations.filters.coming") },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as typeof filter)}
                className={cn(
                  "px-4 sm:px-6 py-2 rounded-full font-bold transition-all text-sm sm:text-base",
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredPresentations.map((pres, i) => (
            <motion.div
              key={pres.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setHoveredId(pres.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={cn(
                "relative rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300",
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
              <div className="relative p-4 sm:p-6 border border-white/10 rounded-2xl sm:rounded-3xl bg-black/40 backdrop-blur-xl h-full flex flex-col">
                {/* Status badge */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                  <span className={cn(
                    "px-2 sm:px-3 py-1 rounded-full text-xs font-bold",
                    statusLabels[pres.status].color,
                    pres.status === "coming" ? "text-white" : "text-ocean-deep"
                  )}>
                    {statusLabels[pres.status].label}
                  </span>
                </div>

                {/* Number */}
                <div className="text-4xl sm:text-5xl md:text-6xl font-black text-white/5 absolute top-3 left-3 sm:top-4 sm:left-4">
                  #{pres.number}
                </div>

                {/* Icon & Title */}
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4 mt-6 sm:mt-8">
                  <div className={cn(
                    "w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0",
                    `bg-${pres.color}-500/20 text-${pres.color}-400`
                  )}>
                    {pres.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg sm:text-xl font-bold truncate">{pres.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-500 truncate">{pres.subtitle}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-400 text-xs sm:text-sm mb-3 sm:mb-4 flex-1 line-clamp-3 sm:line-clamp-none">
                  {pres.description}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock size={12} className="flex-shrink-0" />
                    <span>{pres.duration}</span>
                  </div>
                  <div className={cn(
                    "px-2 py-0.5 rounded-full text-xs",
                    difficultyColors[pres.difficulty]
                  )}>
                    {difficultyLabel(pres.difficulty)}
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-4 sm:mb-6">
                  {pres.features.slice(0, 4).map((feature, j) => (
                    <span key={j} className="px-2 py-1 bg-white/5 rounded-lg text-xs truncate max-w-[30%] sm:max-w-none">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Audience */}
                <div className="text-xs text-slate-500 mb-3 sm:mb-4">
                  <span className="font-bold">{t("presentations.audience_label")}</span>{" "}
                  <span className="line-clamp-1 sm:line-clamp-none">{pres.audience.join(", ")}</span>
                </div>

                {/* CTA */}
                {pres.status === "ready" ? (
                  <Link
                    href={pres.link}
                    className={cn(
                      "w-full py-2.5 sm:py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-sm sm:text-base",
                      `bg-gradient-to-r ${pres.gradient} text-white hover:scale-105`
                    )}
                  >
                    <Play size={16} className="sm:w-[18px] sm:h-[18px]" /> {t("presentations.watch")}
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full py-2.5 sm:py-3 rounded-xl font-bold bg-white/5 text-slate-500 cursor-not-allowed text-sm sm:text-base"
                  >
                    {t("presentations.status.coming")}
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
          className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 text-center"
        >
          <Award className="mx-auto text-cyan-glow mb-4" size={40} />
          <h2 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4">{t("presentations.custom_title")}</h2>
          <p className="text-slate-400 mb-4 sm:mb-6 max-w-xl mx-auto text-sm sm:text-base px-4">
            {t("presentations.custom_description")}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-cyan-glow text-ocean-deep font-bold rounded-xl hover:scale-105 transition-transform text-sm sm:text-base"
          >
            {t("presentations.contact_us")} <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px]" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
