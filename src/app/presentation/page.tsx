"use client";

import { useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import {
  Globe, Shield, Zap, Droplets, ArrowRight, CheckCircle2, Cpu,
  Database, Network, Building2, Landmark, TrendingUp, Users,
  ChevronDown, BookOpen, Gamepad2, Layers, Lock, GraduationCap,
  Smartphone, BarChart3, Wallet, Vote, FileText, Play, Pause,
  MapPin, Activity, Leaf, Heart, Beaker, Settings, UserCheck,
  Coins, Gift, Star, Trophy, Target, Clock, DollarSign, Percent
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function PresentationPage() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 15 экранов презентации с полным контентом
  const screens = useMemo(() => {
    const s = t("presentation.screens");
    return [
      {
        id: 1,
        title: s.screen1.title,
        subtitle: s.screen1.subtitle,
        description: s.screen1.description,
        stats: [
          { value: s.screen1.stats.stat1.value, label: s.screen1.stats.stat1.label },
          { value: s.screen1.stats.stat2.value, label: s.screen1.stats.stat2.label },
          { value: s.screen1.stats.stat3.value, label: s.screen1.stats.stat3.label },
        ],
        visual: "globe",
        cta: s.screen1.cta,
      },
      {
        id: 2,
        title: s.screen2.title,
        subtitle: s.screen2.subtitle,
        description: s.screen2.description,
        problems: [
          { icon: Droplets, text: s.screen2.problems.p1, color: "text-red-400" },
          { icon: Building2, text: s.screen2.problems.p2, color: "text-orange-400" },
          { icon: Database, text: s.screen2.problems.p3, color: "text-yellow-400" },
          { icon: Users, text: s.screen2.problems.p4, color: "text-amber-400" },
        ],
        visual: "problems",
      },
      {
        id: 3,
        title: s.screen3.title,
        subtitle: s.screen3.subtitle,
        description: s.screen3.description,
        layers: [
          s.screen3.layers.l1,
          s.screen3.layers.l2,
          s.screen3.layers.l3,
          s.screen3.layers.l4,
          s.screen3.layers.l5,
          s.screen3.layers.l6,
        ],
        visual: "transition",
      },
      {
        id: 4,
        title: s.screen4.title,
        subtitle: s.screen4.subtitle,
        description: s.screen4.description,
        features: [
          { icon: Globe, text: s.screen4.features.f1.text, desc: s.screen4.features.f1.desc },
          { icon: Shield, text: s.screen4.features.f2.text, desc: s.screen4.features.f2.desc },
          { icon: Cpu, text: s.screen4.features.f3.text, desc: s.screen4.features.f3.desc },
          { icon: Vote, text: s.screen4.features.f4.text, desc: s.screen4.features.f4.desc },
        ],
        sdg: ["SDG 6", "SDG 9", "SDG 11", "SDG 13", "SDG 16"],
        visual: "vodeco",
      },
      {
        id: 5,
        title: s.screen5.title,
        subtitle: s.screen5.subtitle,
        description: s.screen5.description,
        architecture: [
          { name: s.screen5.architecture.layer1.name, desc: s.screen5.architecture.layer1.desc, icon: Globe, color: "bg-blue-500" },
          { name: s.screen5.architecture.layer2.name, desc: s.screen5.architecture.layer2.desc, icon: Database, color: "bg-cyan-500" },
          { name: s.screen5.architecture.layer3.name, desc: s.screen5.architecture.layer3.desc, icon: Shield, color: "bg-purple-500" },
          { name: s.screen5.architecture.layer4.name, desc: s.screen5.architecture.layer4.desc, icon: Coins, color: "bg-yellow-500" },
          { name: s.screen5.architecture.layer5.name, desc: s.screen5.architecture.layer5.desc, icon: Vote, color: "bg-green-500" },
          { name: s.screen5.architecture.layer6.name, desc: s.screen5.architecture.layer6.desc, icon: Smartphone, color: "bg-indigo-500" },
          { name: s.screen5.architecture.layer7.name, desc: s.screen5.architecture.layer7.desc, icon: Cpu, color: "bg-pink-500" },
          { name: s.screen5.architecture.layer8.name, desc: s.screen5.architecture.layer8.desc, icon: Lock, color: "bg-red-500" },
          { name: s.screen5.architecture.layer9.name, desc: s.screen5.architecture.layer9.desc, icon: GraduationCap, color: "bg-orange-500" },
          { name: s.screen5.architecture.layer10.name, desc: s.screen5.architecture.layer10.desc, icon: Gamepad2, color: "bg-violet-500" },
          { name: s.screen5.architecture.layer11.name, desc: s.screen5.architecture.layer11.desc, icon: Users, color: "bg-rose-500" },
          { name: s.screen5.architecture.layer12.name, desc: s.screen5.architecture.layer12.desc, icon: Network, color: "bg-teal-500" },
        ],
        visual: "architecture",
      },
      {
        id: 6,
        title: s.screen6.title,
        subtitle: s.screen6.subtitle,
        description: s.screen6.description,
        dataFlow: [
          { step: s.screen6.dataflow.step1.step, desc: s.screen6.dataflow.step1.desc, icon: Activity },
          { step: s.screen6.dataflow.step2.step, desc: s.screen6.dataflow.step2.desc, icon: CheckCircle2 },
          { step: s.screen6.dataflow.step3.step, desc: s.screen6.dataflow.step3.desc, icon: Shield },
          { step: s.screen6.dataflow.step4.step, desc: s.screen6.dataflow.step4.desc, icon: Database },
        ],
        visual: "dataflow",
      },
      {
        id: 7,
        title: s.screen7.title,
        subtitle: s.screen7.subtitle,
        description: s.screen7.description,
        twinTypes: [
          { type: s.screen7.types.t1.type, examples: s.screen7.types.t1.examples, icon: Droplets },
          { type: s.screen7.types.t2.type, examples: s.screen7.types.t2.examples, icon: Building2 },
          { type: s.screen7.types.t3.type, examples: s.screen7.types.t3.examples, icon: Activity },
          { type: s.screen7.types.t4.type, examples: s.screen7.types.t4.examples, icon: Target },
        ],
        visual: "twins",
      },
      {
        id: 8,
        title: s.screen8.title,
        subtitle: s.screen8.subtitle,
        description: s.screen8.description,
        nexusModules: [
          { name: s.screen8.modules.m1.name, desc: s.screen8.modules.m1.desc, fee: s.screen8.modules.m1.fee },
          { name: s.screen8.modules.m2.name, desc: s.screen8.modules.m2.desc, apy: s.screen8.modules.m2.apy },
          { name: s.screen8.modules.m3.name, desc: s.screen8.modules.m3.desc, dao: s.screen8.modules.m3.dao },
          { name: s.screen8.modules.m4.name, desc: s.screen8.modules.m4.desc, rewards: s.screen8.modules.m4.rewards },
        ],
        visual: "nexus",
      },
      {
        id: 9,
        title: s.screen9.title,
        subtitle: s.screen9.subtitle,
        description: s.screen9.description,
        phases: [
          { phase: s.screen9.phases.phase1.phase, name: s.screen9.phases.phase1.name, desc: s.screen9.phases.phase1.desc, status: s.screen9.phases.phase1.status },
          { phase: s.screen9.phases.phase2.phase, name: s.screen9.phases.phase2.name, desc: s.screen9.phases.phase2.desc, status: s.screen9.phases.phase2.status },
          { phase: s.screen9.phases.phase3.phase, name: s.screen9.phases.phase3.name, desc: s.screen9.phases.phase3.desc, status: s.screen9.phases.phase3.status },
          { phase: s.screen9.phases.phase4.phase, name: s.screen9.phases.phase4.name, desc: s.screen9.phases.phase4.desc, status: s.screen9.phases.phase4.status },
        ],
        tokenDistribution: [
          { name: s.screen9.distribution.d1.name, percent: s.screen9.distribution.d1.percent },
          { name: s.screen9.distribution.d2.name, percent: s.screen9.distribution.d2.percent },
          { name: s.screen9.distribution.d3.name, percent: s.screen9.distribution.d3.percent },
          { name: s.screen9.distribution.d4.name, percent: s.screen9.distribution.d4.percent },
          { name: s.screen9.distribution.d5.name, percent: s.screen9.distribution.d5.percent },
          { name: s.screen9.distribution.d6.name, percent: s.screen9.distribution.d6.percent },
          { name: s.screen9.distribution.d7.name, percent: s.screen9.distribution.d7.percent },
          { name: s.screen9.distribution.d8.name, percent: s.screen9.distribution.d8.percent },
        ],
        visual: "tokenomics",
      },
      {
        id: 10,
        title: s.screen10.title,
        subtitle: s.screen10.subtitle,
        description: s.screen10.description,
        daoFeatures: [
          { feature: s.screen10.features.f1.feature, desc: s.screen10.features.f1.desc, icon: FileText },
          { feature: s.screen10.features.f2.feature, desc: s.screen10.features.f2.desc, icon: Vote },
          { feature: s.screen10.features.f3.feature, desc: s.screen10.features.f3.desc, icon: Users },
          { feature: s.screen10.features.f4.feature, desc: s.screen10.features.f4.desc, icon: Wallet },
          { feature: s.screen10.features.f5.feature, desc: s.screen10.features.f5.desc, icon: Zap },
          { feature: s.screen10.features.f6.feature, desc: s.screen10.features.f6.desc, icon: CheckCircle2 },
        ],
        participants: [
          { role: s.screen10.participants.p1.role, weight: s.screen10.participants.p1.weight, focus: s.screen10.participants.p1.focus },
          { role: s.screen10.participants.p2.role, weight: s.screen10.participants.p2.weight, focus: s.screen10.participants.p2.focus },
          { role: s.screen10.participants.p3.role, weight: s.screen10.participants.p3.weight, focus: s.screen10.participants.p3.focus },
          { role: s.screen10.participants.p4.role, weight: s.screen10.participants.p4.weight, focus: s.screen10.participants.p4.focus },
        ],
        visual: "dao",
      },
      {
        id: 11,
        title: s.screen11.title,
        subtitle: s.screen11.subtitle,
        description: s.screen11.description,
        cabinets: [
          { name: s.screen11.cabinets.c1.name, icon: UserCheck, color: "bg-blue-500", features: s.screen11.cabinets.c1.features },
          { name: s.screen11.cabinets.c2.name, icon: Landmark, color: "bg-purple-500", features: s.screen11.cabinets.c2.features },
          { name: s.screen11.cabinets.c3.name, icon: TrendingUp, color: "bg-green-500", features: s.screen11.cabinets.c3.features },
          { name: s.screen11.cabinets.c4.name, icon: Building2, color: "bg-orange-500", features: s.screen11.cabinets.c4.features },
          { name: s.screen11.cabinets.c5.name, icon: Beaker, color: "bg-cyan-500", features: s.screen11.cabinets.c5.features },
          { name: s.screen11.cabinets.c6.name, icon: Settings, color: "bg-red-500", features: s.screen11.cabinets.c6.features },
          { name: s.screen11.cabinets.c7.name, icon: Lock, color: "bg-slate-500", features: s.screen11.cabinets.c7.features },
        ],
        visual: "cabinets",
      },
      {
        id: 12,
        title: s.screen12.title,
        subtitle: s.screen12.subtitle,
        description: s.screen12.description,
        projects: [
          { name: s.screen12.projects.p1.name, type: s.screen12.projects.p1.type, irr: s.screen12.projects.p1.irr, status: s.screen12.projects.p1.status, desc: s.screen12.projects.p1.desc },
          { name: s.screen12.projects.p2.name, type: s.screen12.projects.p2.type, irr: s.screen12.projects.p2.irr, status: s.screen12.projects.p2.status, desc: s.screen12.projects.p2.desc },
          { name: s.screen12.projects.p3.name, type: s.screen12.projects.p3.type, irr: s.screen12.projects.p3.irr, status: s.screen12.projects.p3.status, desc: s.screen12.projects.p3.desc },
          { name: s.screen12.projects.p4.name, type: s.screen12.projects.p4.type, irr: s.screen12.projects.p4.irr, status: s.screen12.projects.p4.status, desc: s.screen12.projects.p4.desc },
          { name: s.screen12.projects.p5.name, type: s.screen12.projects.p5.type, irr: s.screen12.projects.p5.irr, status: s.screen12.projects.p5.status, desc: s.screen12.projects.p5.desc },
          { name: s.screen12.projects.p6.name, type: s.screen12.projects.p6.type, irr: s.screen12.projects.p6.irr, status: s.screen12.projects.p6.status, desc: s.screen12.projects.p6.desc },
        ],
        visual: "tokenhub",
      },
      {
        id: 13,
        title: s.screen13.title,
        subtitle: s.screen13.subtitle,
        description: s.screen13.description,
        sdgAlignment: [
          { sdg: "SDG 6", name: s.screen13.sdg.sdg6.name, contribution: s.screen13.sdg.sdg6.contribution },
          { sdg: "SDG 9", name: s.screen13.sdg.sdg9.name, contribution: s.screen13.sdg.sdg9.contribution },
          { sdg: "SDG 11", name: s.screen13.sdg.sdg11.name, contribution: s.screen13.sdg.sdg11.contribution },
          { sdg: "SDG 13", name: s.screen13.sdg.sdg13.name, contribution: s.screen13.sdg.sdg13.contribution },
          { sdg: "SDG 16", name: s.screen13.sdg.sdg16.name, contribution: s.screen13.sdg.sdg16.contribution },
        ],
        partners: ["UN-Water", "UNEP", "World Bank", "EBRD", "Green Climate Fund", "Water.org"],
        visual: "international",
      },
      {
        id: 14,
        title: s.screen14.title,
        subtitle: s.screen14.subtitle,
        description: s.screen14.description,
        roadmap: [
          { year: s.screen14.roadmap.r1.year, quarter: s.screen14.roadmap.r1.quarter, title: s.screen14.roadmap.r1.title, items: s.screen14.roadmap.r1.items, status: s.screen14.roadmap.r1.status },
          { year: s.screen14.roadmap.r2.year, quarter: s.screen14.roadmap.r2.quarter, title: s.screen14.roadmap.r2.title, items: s.screen14.roadmap.r2.items, status: s.screen14.roadmap.r2.status },
          { year: s.screen14.roadmap.r3.year, quarter: s.screen14.roadmap.r3.quarter, title: s.screen14.roadmap.r3.title, items: s.screen14.roadmap.r3.items, status: s.screen14.roadmap.r3.status },
          { year: s.screen14.roadmap.r4.year, quarter: s.screen14.roadmap.r4.quarter, title: s.screen14.roadmap.r4.title, items: s.screen14.roadmap.r4.items, status: s.screen14.roadmap.r4.status },
          { year: s.screen14.roadmap.r5.year, quarter: s.screen14.roadmap.r5.quarter, title: s.screen14.roadmap.r5.title, items: s.screen14.roadmap.r5.items, status: s.screen14.roadmap.r5.status },
        ],
        visual: "roadmap",
      },
      {
        id: 15,
        title: s.screen15.title,
        subtitle: s.screen15.subtitle,
        description: s.screen15.description,
        investmentTiers: [
          { tier: s.screen15.tiers.t1.tier, amount: s.screen15.tiers.t1.amount, benefits: s.screen15.tiers.t1.benefits },
          { tier: s.screen15.tiers.t2.tier, amount: s.screen15.tiers.t2.amount, benefits: s.screen15.tiers.t2.benefits },
          { tier: s.screen15.tiers.t3.tier, amount: s.screen15.tiers.t3.amount, benefits: s.screen15.tiers.t3.benefits },
          { tier: s.screen15.tiers.t4.tier, amount: s.screen15.tiers.t4.amount, benefits: s.screen15.tiers.t4.benefits },
        ],
        contacts: {
          website: "vodprom.org",
          email: "info@vodprom.org",
          social: "@vodprom",
        },
        visual: "cta",
      },
  ];
  }, [t]);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

  const [activeScreen, setActiveScreen] = useState(0);

    return (
    <div ref={containerRef} className="relative">
            {/* Progress Bar */}
            <motion.div
        className="fixed top-[80px] left-0 right-0 h-1 bg-gradient-to-r from-cyan-glow via-blue-500 to-purple-500 z-[90] origin-left"
                style={{ scaleX }}
            />

      {/* Screen Navigation */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2">
        {screens.map((screen, i) => (
          <button
            key={i}
            onClick={() => {
              document.getElementById(`screen-${i}`)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === activeScreen 
                ? 'bg-cyan-glow scale-125' 
                : 'bg-white/20 hover:bg-white/40'
            }`}
            title={screen.title}
          />
                ))}
            </div>

      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-cyan-glow/3 rounded-full blur-[200px]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[180px]" />
                    </div>

      {/* Screens */}
      <div className="relative z-10">
        {screens.map((screen, i) => (
          <ScreenComponent 
            key={i} 
            screen={screen} 
            index={i} 
            total={screens.length}
            onInView={() => setActiveScreen(i)}
          />
        ))}
            </div>
        </div>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ScreenComponent({ screen, index, total, onInView }: { screen: any; index: number; total: number; onInView: (index: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

    return (
        <motion.section
            ref={ref}
      id={`screen-${index}`}
      style={{ opacity }}
      onViewportEnter={() => onInView(index)}
      className="min-h-screen flex items-center justify-center py-20 px-4 relative"
    >
      <motion.div style={{ y }} className="max-w-7xl w-full">
        {/* Screen Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="text-cyan-glow font-bold">{String(index + 1).padStart(2, '0')}</span>
            <div className="w-8 h-px bg-white/20" />
            <span className="text-slate-400 text-sm uppercase tracking-wider">из {total}</span>
          </div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-white via-cyan-200 to-cyan-glow bg-clip-text text-transparent"
          >
            {screen.title}
          </motion.h2>
          
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-cyan-glow/80 mb-6"
          >
            {screen.subtitle}
          </motion.h3>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-slate-400 max-w-3xl mx-auto"
          >
            {screen.description}
          </motion.p>
        </div>

        {/* Screen Content */}
        <ScreenContent screen={screen} index={index} />
      </motion.div>

      {/* Scroll Indicator */}
      {index < total - 1 && (
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs text-slate-500 uppercase tracking-widest">Scroll</span>
          <ChevronDown className="text-slate-500" size={20} />
        </motion.div>
      )}
    </motion.section>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ScreenContent({ screen, index }: { screen: any; index: number }) {
  switch (index) {
    case 0: // Welcome
      return <WelcomeScreen screen={screen} />;
    case 1: // Problems
      return <ProblemsScreen screen={screen} />;
    case 2: // Transition
      return <TransitionScreen screen={screen} />;
    case 3: // What is CivilizationProtocol
      return <CivilizationProtocolScreen screen={screen} />;
    case 4: // Architecture
      return <ArchitectureScreen screen={screen} />;
    case 5: // Data & Trust
      return <DataFlowScreen screen={screen} />;
    case 6: // Digital Twins
      return <TwinsScreen screen={screen} />;
    case 7: // Nexus
      return <NexusScreen screen={screen} />;
    case 8: // Tokenomics
      return <TokenomicsScreen screen={screen} />;
    case 9: // DAO
      return <DAOScreen screen={screen} />;
    case 10: // Cabinets
      return <CabinetsScreen screen={screen} />;
    case 11: // TokenHub
      return <TokenHubScreen screen={screen} />;
    case 12: // International
      return <InternationalScreen screen={screen} />;
    case 13: // Roadmap
      return <RoadmapScreen screen={screen} />;
    case 14: // CTA
      return <CTAScreen screen={screen} />;
    default:
      return null;
  }
}

// Screen 1: Welcome
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function WelcomeScreen({ screen }: { screen: any }) {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
        <div className="grid grid-cols-3 gap-4">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {screen.stats.map((stat: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="glass-card p-6 text-center"
            >
              <div className="text-3xl font-black text-cyan-glow mb-2">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex gap-4"
        >
          <Link href="/dashboard" className="px-8 py-4 bg-cyan-glow text-ocean-deep font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
            {screen.cta} <ArrowRight size={20} />
          </Link>
          <Link href="/whitepaper" className="px-8 py-4 glass text-white font-bold rounded-xl hover:bg-white/10 transition-colors">
            White Paper
          </Link>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="relative aspect-square"
      >
        {/* Animated Globe Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="w-80 h-80 rounded-full border-2 border-cyan-glow/20 relative"
          >
            <div className="absolute inset-4 rounded-full border border-cyan-glow/30" />
            <div className="absolute inset-8 rounded-full border border-cyan-glow/40" />
            <div className="absolute inset-12 rounded-full bg-gradient-to-br from-cyan-glow/20 to-blue-500/20 flex items-center justify-center">
              <Globe className="text-cyan-glow" size={80} />
            </div>
            {/* Orbiting dots */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-cyan-glow rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 60}deg) translateX(140px)`,
                }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

// Screen 2: Problems
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ProblemsScreen({ screen }: { screen: any }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {screen.problems.map((problem: any, i: number) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.1 }}
          className="glass-card p-8 text-center hover:scale-105 transition-transform cursor-pointer group"
        >
          <div className={`w-16 h-16 mx-auto rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors ${problem.color}`}>
            <problem.icon size={32} />
          </div>
          <p className="text-lg font-medium">{problem.text}</p>
        </motion.div>
      ))}
                    </div>
  );
}

// Screen 3: Transition
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TransitionScreen({ screen }: { screen: any }) {
  return (
    <div className="flex justify-center">
      <div className="relative">
        {screen.layers.map((layer: string, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -50, rotateY: -20 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ delay: 0.1 * i }}
            className="glass-card px-8 py-4 mb-4 flex items-center gap-4 min-w-[300px]"
            style={{ marginLeft: i * 20 }}
          >
            <div className="w-10 h-10 rounded-full bg-cyan-glow/20 flex items-center justify-center text-cyan-glow font-bold">
              {i + 1}
                    </div>
            <span className="text-lg font-medium">{layer}</span>
            {i < screen.layers.length - 1 && (
              <ArrowRight className="text-slate-500 ml-auto" size={20} />
            )}
          </motion.div>
        ))}
                    </div>
                </div>
  );
}

// Screen 4: What is CivilizationProtocol
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CivilizationProtocolScreen({ screen }: { screen: any }) {
  return (
    <div className="space-y-12">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {screen.features.map((feature: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="glass-card p-6 text-center hover:border-cyan-glow/50 transition-colors"
          >
            <div className="w-14 h-14 mx-auto rounded-xl bg-cyan-glow/10 flex items-center justify-center mb-4 text-cyan-glow">
              <feature.icon size={28} />
            </div>
            <h4 className="font-bold mb-2">{feature.text}</h4>
            <p className="text-sm text-slate-400">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap justify-center gap-3"
      >
        {screen.sdg.map((sdg: string, i: number) => (
          <span key={i} className="px-4 py-2 rounded-full bg-green-500/20 text-green-400 font-medium text-sm">
            {sdg}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// Screen 5: Architecture
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ArchitectureScreen({ screen }: { screen: any }) {
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);
  
  return (
    <div className="grid lg:grid-cols-3 gap-4">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {screen.architecture.map((layer: any, i: number) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05 * i }}
          onMouseEnter={() => setHoveredLayer(i)}
          onMouseLeave={() => setHoveredLayer(null)}
          className={`glass-card p-4 flex items-center gap-4 cursor-pointer transition-all duration-300 ${
            hoveredLayer === i ? 'scale-105 border-cyan-glow/50' : ''
          }`}
        >
          <div className={`w-12 h-12 rounded-xl ${layer.color} flex items-center justify-center text-white flex-shrink-0`}>
            <layer.icon size={24} />
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-sm truncate">{layer.name}</h4>
            <p className="text-xs text-slate-400 truncate">{layer.desc}</p>
          </div>
          <span className="text-xs text-slate-500 ml-auto">{i + 1}</span>
        </motion.div>
      ))}
    </div>
  );
}

// Screen 6: Data Flow
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DataFlowScreen({ screen }: { screen: any }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 items-center">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {screen.dataFlow.map((step: any, i: number) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 * i }}
          className="flex items-center gap-4"
        >
          <div className="glass-card p-6 text-center min-w-[160px]">
            <div className="w-14 h-14 mx-auto rounded-xl bg-cyan-glow/10 flex items-center justify-center mb-3 text-cyan-glow">
              <step.icon size={28} />
            </div>
            <h4 className="font-bold mb-1">{step.step}</h4>
            <p className="text-xs text-slate-400">{step.desc}</p>
          </div>
          {i < screen.dataFlow.length - 1 && (
            <ArrowRight className="text-cyan-glow" size={24} />
          )}
        </motion.div>
      ))}
    </div>
  );
}

// Screen 7: Digital Twins
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TwinsScreen({ screen }: { screen: any }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {screen.twinTypes.map((twin: any, i: number) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, rotateY: -15 }}
          whileInView={{ opacity: 1, rotateY: 0 }}
          transition={{ delay: 0.15 * i }}
          className="glass-card p-6 relative overflow-hidden group hover:border-cyan-glow/50 transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-glow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <twin.icon className="text-cyan-glow mb-4" size={40} />
            <h4 className="font-bold mb-2">{twin.type}</h4>
            <p className="text-sm text-slate-400">{twin.examples}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Screen 8: Nexus
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function NexusScreen({ screen }: { screen: any }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {screen.nexusModules.map((module: any, i: number) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 * i }}
          className="glass-card p-6 hover:border-cyan-glow/50 transition-all"
        >
          <h4 className="font-bold text-lg mb-2 text-cyan-glow">{module.name}</h4>
          <p className="text-slate-400 mb-4">{module.desc}</p>
          <div className="flex gap-2">
            {module.fee && <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm">{module.fee}</span>}
            {module.apy && <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">{module.apy}</span>}
            {module.dao && <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm">{module.dao}</span>}
            {module.rewards && <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm">{module.rewards}</span>}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Screen 9: Tokenomics
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TokenomicsScreen({ screen }: { screen: any }) {
  return (
    <div className="space-y-12">
      {/* Phases */}
      <div className="grid md:grid-cols-4 gap-4">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {screen.phases.map((phase: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className={`glass-card p-6 relative ${
              phase.status === 'current' ? 'border-cyan-glow/50' : ''
            }`}
          >
            {phase.status === 'current' && (
              <span className="absolute -top-3 left-4 px-3 py-1 bg-cyan-glow text-ocean-deep text-xs font-bold rounded-full">
                CURRENT
              </span>
            )}
            <h5 className="text-cyan-glow font-bold mb-1">{phase.phase}</h5>
            <h4 className="font-bold mb-2">{phase.name}</h4>
            <p className="text-sm text-slate-400">{phase.desc}</p>
          </motion.div>
        ))}
      </div>
      
      {/* Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-6"
      >
        <h4 className="font-bold mb-6 text-center">Распределение токенов (1,000,000,000 VOD)</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {screen.tokenDistribution.map((item: any, i: number) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-black text-cyan-glow">{item.percent}%</div>
              <div className="text-sm text-slate-400">{item.name}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// Screen 10: DAO
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DAOScreen({ screen }: { screen: any }) {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {screen.daoFeatures.map((feature: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * i }}
            className="glass-card p-4 text-center"
          >
            <feature.icon className="mx-auto mb-2 text-cyan-glow" size={24} />
            <h5 className="font-bold text-sm mb-1">{feature.feature}</h5>
            <p className="text-xs text-slate-400">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card p-6"
      >
        <h4 className="font-bold mb-4 text-center">Участники DAO</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {screen.participants.map((p: any, i: number) => (
            <div key={i} className="text-center p-4 bg-white/5 rounded-xl">
              <div className="font-bold">{p.role}</div>
              <div className="text-xs text-cyan-glow">{p.weight}</div>
              <div className="text-xs text-slate-400">{p.focus}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// Screen 11: Cabinets
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CabinetsScreen({ screen }: { screen: any }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {screen.cabinets.slice(0, 4).map((cabinet: any, i: number) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * i }}
          className="glass-card p-5 hover:scale-105 transition-transform cursor-pointer"
        >
          <div className={`w-12 h-12 ${cabinet.color} rounded-xl flex items-center justify-center mb-4`}>
            <cabinet.icon size={24} className="text-white" />
          </div>
          <h4 className="font-bold mb-3">{cabinet.name}</h4>
          <ul className="space-y-1">
            {cabinet.features.map((f: string, j: number) => (
              <li key={j} className="text-xs text-slate-400 flex items-center gap-2">
                <CheckCircle2 size={12} className="text-cyan-glow" />
                {f}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
      <div className="lg:col-span-4 grid md:grid-cols-3 gap-4">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {screen.cabinets.slice(4).map((cabinet: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + 0.1 * i }}
            className="glass-card p-5 hover:scale-105 transition-transform cursor-pointer"
          >
            <div className={`w-12 h-12 ${cabinet.color} rounded-xl flex items-center justify-center mb-4`}>
              <cabinet.icon size={24} className="text-white" />
            </div>
            <h4 className="font-bold mb-3">{cabinet.name}</h4>
            <ul className="space-y-1">
              {cabinet.features.map((f: string, j: number) => (
                <li key={j} className="text-xs text-slate-400 flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-cyan-glow" />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Screen 12: TokenHub Projects
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TokenHubScreen({ screen }: { screen: any }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {screen.projects.map((project: any, i: number) => (
                    <motion.div
          key={i}
          initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * i }}
          className="glass-card p-5 hover:border-cyan-glow/50 transition-all cursor-pointer"
        >
          <div className="flex justify-between items-start mb-3">
            <h4 className="font-bold">{project.name}</h4>
            <span className={`px-2 py-1 rounded text-xs font-bold ${
              project.status === 'Active' ? 'bg-green-500/20 text-green-400' :
              project.status === 'Funding' ? 'bg-yellow-500/20 text-yellow-400' :
              project.status === 'Pilot' ? 'bg-blue-500/20 text-blue-400' :
              'bg-slate-500/20 text-slate-400'
            }`}>{project.status}</span>
          </div>
          <p className="text-sm text-slate-400 mb-3">{project.desc}</p>
          <div className="flex gap-3">
            <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">{project.type}</span>
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">IRR {project.irr}</span>
                        </div>
                    </motion.div>
      ))}
    </div>
  );
}

// Screen 13: International
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function InternationalScreen({ screen }: { screen: any }) {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-5 gap-4">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {screen.sdgAlignment.map((sdg: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="glass-card p-4 text-center"
          >
            <div className="text-2xl font-black text-green-400 mb-2">{sdg.sdg}</div>
            <h5 className="font-bold text-sm mb-2">{sdg.name}</h5>
            <p className="text-xs text-slate-400">{sdg.contribution}</p>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-wrap justify-center gap-4"
      >
        {screen.partners.map((partner: string, i: number) => (
          <span key={i} className="px-4 py-2 glass rounded-full text-sm font-medium">
            {partner}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// Screen 14: Roadmap
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function RoadmapScreen({ screen }: { screen: any }) {
  return (
    <div className="relative">
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-glow/50 via-cyan-glow to-cyan-glow/50 hidden lg:block" />
      
      <div className="space-y-8">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {screen.roadmap.map((item: any, i: number) => (
                        <motion.div
                            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 * i }}
            className={`flex items-center gap-8 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
          >
            <div className={`flex-1 glass-card p-6 ${
              item.status === 'done' ? 'border-green-500/50' :
              item.status === 'current' ? 'border-cyan-glow/50' : ''
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl font-black text-cyan-glow">{item.year}</span>
                <span className="text-slate-400">{item.quarter}</span>
                {item.status === 'done' && <CheckCircle2 className="text-green-500" size={20} />}
                {item.status === 'current' && <Activity className="text-cyan-glow animate-pulse" size={20} />}
              </div>
              <h4 className="font-bold mb-3">{item.title}</h4>
              <ul className="space-y-1">
                {item.items.map((it: string, j: number) => (
                  <li key={j} className="text-sm text-slate-400 flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      item.status === 'done' ? 'bg-green-500' : 'bg-slate-500'
                    }`} />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="hidden lg:block w-4 h-4 rounded-full bg-cyan-glow" />
            
            <div className="flex-1 hidden lg:block" />
          </motion.div>
                    ))}
                </div>
    </div>
  );
}

// Screen 15: CTA
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CTAScreen({ screen }: { screen: any }) {
  return (
    <div className="space-y-12">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {screen.investmentTiers.map((tier: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="glass-card p-6 text-center hover:scale-105 transition-transform cursor-pointer hover:border-cyan-glow/50"
          >
            <h4 className="font-bold text-lg mb-1">{tier.tier}</h4>
            <div className="text-cyan-glow font-bold mb-4">{tier.amount}</div>
            <ul className="space-y-2 text-sm text-slate-400">
              {tier.benefits.map((b: string, j: number) => (
                <li key={j} className="flex items-center gap-2 justify-center">
                  <CheckCircle2 size={14} className="text-green-500" />
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
            </div>

                <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center space-y-6"
      >
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/dashboard" className="px-10 py-5 bg-gradient-to-r from-cyan-glow to-blue-500 text-white font-bold rounded-2xl hover:scale-105 transition-transform flex items-center gap-3 shadow-[0_0_40px_rgba(34,211,238,0.4)]">
            <Play size={20} /> Explore the Platform
          </Link>
          <Link href="/whitepaper" className="px-10 py-5 glass text-white font-bold rounded-2xl hover:bg-white/10 transition-colors flex items-center gap-3">
            <FileText size={20} /> Read White Paper
          </Link>
        </div>
        
        <div className="flex justify-center gap-8 text-slate-400">
          <a href={`https://${screen.contacts.website}`} className="hover:text-cyan-glow transition-colors">
            🌐 {screen.contacts.website}
          </a>
          <a href={`mailto:${screen.contacts.email}`} className="hover:text-cyan-glow transition-colors">
            ✉️ {screen.contacts.email}
          </a>
          <span className="hover:text-cyan-glow transition-colors cursor-pointer">
            📱 {screen.contacts.social}
          </span>
        </div>
                </motion.div>
            </div>
    );
}
