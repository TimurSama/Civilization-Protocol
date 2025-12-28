"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  TrendingUp, DollarSign, Users, Globe, Shield, Zap, Target,
  ChevronRight, ChevronLeft, ArrowUpRight, BarChart3, PieChart,
  CheckCircle2, Award, Rocket, Building2, Cpu, LineChart,
  Play, Pause, ExternalLink, Download, ArrowRight, Star,
  Coins, Lock, Percent, Clock, Gift, AlertCircle
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import BuyTokenWidget from "@/components/BuyTokenWidget";

// Slide data
const slides = [
  {
    id: 1,
    type: "hook",
    title: "$8.6 Trillion",
    subtitle: "Global Water Market by 2030",
    highlight: "The data infrastructure is broken",
  },
  {
    id: 2,
    type: "problem",
    title: "The Problem",
    points: [
      { icon: <AlertCircle />, text: "Fragmented data across 1000+ siloed systems" },
      { icon: <AlertCircle />, text: "No transparency in water resource management" },
      { icon: <AlertCircle />, text: "$260B annual losses from inefficiency" },
      { icon: <AlertCircle />, text: "40% of infrastructure data is outdated or wrong" },
    ],
  },
  {
    id: 3,
    type: "solution",
    title: "Our Solution",
    subtitle: "Decentralized Water Data Platform",
    features: [
      { icon: <Shield />, title: "Blockchain", desc: "Immutable data layer" },
      { icon: <Cpu />, title: "IoT Integration", desc: "Real-time monitoring" },
      { icon: <Users />, title: "DAO Governance", desc: "Stakeholder participation" },
      { icon: <Coins />, title: "Token Economy", desc: "Incentive alignment" },
    ],
  },
  {
    id: 4,
    type: "product",
    title: "The Platform",
    screens: ["Dashboard", "Map", "Governance", "TokenHub"],
  },
  {
    id: 5,
    type: "market",
    title: "Market Opportunity",
    tam: { value: "$8.6T", label: "Total Addressable Market" },
    sam: { value: "$240B", label: "Serviceable Market" },
    som: { value: "$12B", label: "Target Market (5 years)" },
  },
  {
    id: 6,
    type: "business",
    title: "Business Model",
    revenue: [
      { source: "Data Access Fees", percent: 35 },
      { source: "Token Transactions", percent: 25 },
      { source: "Enterprise Licenses", percent: 20 },
      { source: "Staking Rewards", percent: 15 },
      { source: "Grants & Partnerships", percent: 5 },
    ],
  },
  {
    id: 7,
    type: "traction",
    title: "Traction",
    metrics: [
      { value: "15+", label: "Pilot Partners" },
      { value: "$2M+", label: "Grants Secured" },
      { value: "50K+", label: "Beta Users" },
      { value: "3", label: "Countries Active" },
    ],
    logos: ["TIIAME", "UN Water", "World Bank", "Greenpeace"],
  },
  {
    id: 8,
    type: "competition",
    title: "Competitive Landscape",
    us: { name: "VODeco", features: ["Blockchain", "DAO", "IoT", "Token", "Open Data"] },
    competitors: [
      { name: "AQUASTAT", features: ["Data", "", "", "", ""] },
      { name: "Xylem", features: ["", "", "IoT", "", ""] },
      { name: "Veolia", features: ["", "", "IoT", "", ""] },
    ],
  },
  {
    id: 9,
    type: "team",
    title: "The Team",
    members: [
      { name: "Founder & CEO", avatar: "AC", role: "Serial entrepreneur, 15+ years in water tech" },
      { name: "CTO", avatar: "VK", role: "Ex-Google, Blockchain expert" },
      { name: "COO", avatar: "MR", role: "Ex-World Bank, Water policy" },
      { name: "Head of DAO", avatar: "DP", role: "DeFi pioneer, DAO governance" },
    ],
  },
  {
    id: 10,
    type: "financials",
    title: "Use of Funds",
    allocation: [
      { category: "Product Development", percent: 40, color: "#22d3ee" },
      { category: "Marketing & Growth", percent: 25, color: "#a855f7" },
      { category: "Operations", percent: 20, color: "#f59e0b" },
      { category: "Legal & Compliance", percent: 10, color: "#10b981" },
      { category: "Reserve", percent: 5, color: "#6366f1" },
    ],
  },
  {
    id: 11,
    type: "roadmap",
    title: "Roadmap",
    milestones: [
      { quarter: "Q1 2025", items: ["Public Beta Launch", "Token Generation Event"] },
      { quarter: "Q2 2025", items: ["Mainnet Launch", "5 Country Expansion"] },
      { quarter: "Q3 2025", items: ["Enterprise Partnerships", "DAO Full Activation"] },
      { quarter: "Q4 2025", items: ["100K Users", "Series A"] },
    ],
  },
  {
    id: 12,
    type: "ask",
    title: "The Ask",
    round: "Seed Round",
    amount: "$5M",
    valuation: "$25M Pre-money",
    terms: ["20% equity", "SAFE + Token Warrant", "18-month runway"],
  },
];

export default function InvestorPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollXProgress } = useScroll({
    container: containerRef,
  });

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Auto-play
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Rocket size={18} />
            </div>
            <span className="font-bold">VODeco | Investor Deck</span>
          </Link>

          {/* Slide counter */}
          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-400">
              Slide {currentSlide + 1} / {slides.length}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
              <button className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex items-center gap-2">
                <Download size={16} /> Export PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="fixed top-16 left-0 right-0 h-1 bg-white/5 z-40">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        disabled={currentSlide === 0}
        className={cn(
          "fixed left-4 top-1/2 -translate-y-1/2 z-40 p-4 rounded-full bg-white/5 backdrop-blur-xl",
          "hover:bg-white/10 transition-colors border border-white/10",
          currentSlide === 0 && "opacity-30 cursor-not-allowed"
        )}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        disabled={currentSlide === slides.length - 1}
        className={cn(
          "fixed right-4 top-1/2 -translate-y-1/2 z-40 p-4 rounded-full bg-white/5 backdrop-blur-xl",
          "hover:bg-white/10 transition-colors border border-white/10",
          currentSlide === slides.length - 1 && "opacity-30 cursor-not-allowed"
        )}
      >
        <ChevronRight size={24} />
      </button>

      {/* Slides */}
      <div className="pt-20 min-h-screen flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="w-full max-w-6xl"
          >
            {/* Slide 1: Hook */}
            {slides[currentSlide].type === "hook" && (
              <div className="text-center py-20">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <span className="text-8xl md:text-[12rem] font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {slides[currentSlide].title}
                  </span>
                </motion.div>
                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl text-slate-400 mb-6"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="inline-block px-6 py-3 rounded-full bg-red-500/20 text-red-400 font-bold"
                >
                  ⚠️ {slides[currentSlide].highlight}
                </motion.div>
              </div>
            )}

            {/* Slide 2: Problem */}
            {slides[currentSlide].type === "problem" && (
              <div className="py-12">
                <h2 className="text-5xl md:text-7xl font-black mb-12 text-center">
                  {slides[currentSlide].title}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {slides[currentSlide].points?.map((point, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-4"
                    >
                      <div className="text-red-400">{point.icon}</div>
                      <span className="text-xl">{point.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Slide 3: Solution */}
            {slides[currentSlide].type === "solution" && (
              <div className="py-12 text-center">
                <h2 className="text-5xl md:text-7xl font-black mb-4">
                  {slides[currentSlide].title}
                </h2>
                <p className="text-2xl text-cyan-400 mb-12">{slides[currentSlide].subtitle}</p>
                <div className="grid md:grid-cols-4 gap-6">
                  {slides[currentSlide].features?.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-colors"
                    >
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
                        {feature.icon}
                      </div>
                      <div className="font-bold text-xl mb-2">{feature.title}</div>
                      <div className="text-slate-400">{feature.desc}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Slide 4: Product */}
            {slides[currentSlide].type === "product" && (
              <div className="py-12">
                <h2 className="text-5xl md:text-7xl font-black mb-12 text-center">
                  {slides[currentSlide].title}
                </h2>
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 p-2">
                  <div className="aspect-video rounded-2xl bg-gradient-to-br from-ocean-deep to-slate-900 flex items-center justify-center">
                    <div className="text-center">
                      <Play size={64} className="mx-auto mb-4 text-cyan-400" />
                      <p className="text-slate-400">Product Demo</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center gap-4 mt-8">
                  {slides[currentSlide].screens?.map((screen, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="px-6 py-3 rounded-full bg-white/5 border border-white/10 font-medium"
                    >
                      {screen}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Slide 5: Market */}
            {slides[currentSlide].type === "market" && (
              <div className="py-12 text-center">
                <h2 className="text-5xl md:text-7xl font-black mb-16">
                  {slides[currentSlide].title}
                </h2>
                <div className="flex flex-col items-center gap-8">
                  {/* TAM */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="relative"
                  >
                    <div className="w-80 h-80 rounded-full bg-cyan-500/10 border-2 border-cyan-500/30 flex items-center justify-center">
                      <div>
                        <div className="text-6xl font-black text-cyan-400">{slides[currentSlide].tam?.value}</div>
                        <div className="text-slate-400">{slides[currentSlide].tam?.label}</div>
                      </div>
                    </div>
                    
                    {/* SAM */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-purple-500/10 border-2 border-purple-500/30 flex items-center justify-center"
                    >
                      <div>
                        <div className="text-3xl font-black text-purple-400">{slides[currentSlide].sam?.value}</div>
                        <div className="text-xs text-slate-400">{slides[currentSlide].sam?.label}</div>
                      </div>
                    </motion.div>
                    
                    {/* SOM */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center"
                    >
                      <div>
                        <div className="text-xl font-black text-green-400">{slides[currentSlide].som?.value}</div>
                        <div className="text-[10px] text-slate-400">SOM</div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            )}

            {/* Slide 6: Business Model */}
            {slides[currentSlide].type === "business" && (
              <div className="py-12">
                <h2 className="text-5xl md:text-7xl font-black mb-12 text-center">
                  {slides[currentSlide].title}
                </h2>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  {/* Pie chart visualization */}
                  <div className="relative w-80 h-80 mx-auto">
                    {slides[currentSlide].revenue?.map((item, i, arr) => {
                      const startAngle = arr.slice(0, i).reduce((sum, r) => sum + r.percent, 0) * 3.6;
                      const endAngle = startAngle + item.percent * 3.6;
                      
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="absolute inset-0"
                          style={{
                            background: `conic-gradient(transparent ${startAngle}deg, ${['#22d3ee', '#a855f7', '#f59e0b', '#10b981', '#6366f1'][i]} ${startAngle}deg ${endAngle}deg, transparent ${endAngle}deg)`,
                            borderRadius: "50%",
                          }}
                        />
                      );
                    })}
                    <div className="absolute inset-8 rounded-full bg-black flex items-center justify-center">
                      <div className="text-center">
                        <DollarSign className="mx-auto text-cyan-400" size={32} />
                        <div className="text-sm text-slate-400">Revenue<br />Streams</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Legend */}
                  <div className="space-y-4">
                    {slides[currentSlide].revenue?.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10"
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: ['#22d3ee', '#a855f7', '#f59e0b', '#10b981', '#6366f1'][i] }}
                          />
                          <span>{item.source}</span>
                        </div>
                        <span className="font-bold text-xl">{item.percent}%</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Slide 7: Traction */}
            {slides[currentSlide].type === "traction" && (
              <div className="py-12 text-center">
                <h2 className="text-5xl md:text-7xl font-black mb-12">
                  {slides[currentSlide].title}
                </h2>
                <div className="grid md:grid-cols-4 gap-6 mb-12">
                  {slides[currentSlide].metrics?.map((metric, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/10"
                    >
                      <div className="text-5xl font-black text-cyan-400 mb-2">{metric.value}</div>
                      <div className="text-slate-400">{metric.label}</div>
                    </motion.div>
                  ))}
                </div>
                <div className="flex flex-wrap justify-center gap-6">
                  {slides[currentSlide].logos?.map((logo, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 font-medium"
                    >
                      {logo}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Slide 8: Competition */}
            {slides[currentSlide].type === "competition" && (
              <div className="py-12">
                <h2 className="text-5xl md:text-7xl font-black mb-12 text-center">
                  {slides[currentSlide].title}
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="p-4 text-left"></th>
                        {["Blockchain", "DAO", "IoT", "Token", "Open Data"].map((feature, i) => (
                          <th key={i} className="p-4 text-center text-slate-400">{feature}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/10 bg-cyan-500/10">
                        <td className="p-4 font-bold text-cyan-400">VODeco</td>
                        {[true, true, true, true, true].map((has, i) => (
                          <td key={i} className="p-4 text-center">
                            <CheckCircle2 className="mx-auto text-cyan-400" size={24} />
                          </td>
                        ))}
                      </tr>
                      {slides[currentSlide].competitors?.map((comp, i) => (
                        <tr key={i} className="border-b border-white/10">
                          <td className="p-4 text-slate-400">{comp.name}</td>
                          {comp.features.map((f, j) => (
                            <td key={j} className="p-4 text-center">
                              {f ? <CheckCircle2 className="mx-auto text-slate-600" size={24} /> : <span className="text-slate-700">—</span>}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Slide 9: Team */}
            {slides[currentSlide].type === "team" && (
              <div className="py-12 text-center">
                <h2 className="text-5xl md:text-7xl font-black mb-12">
                  {slides[currentSlide].title}
                </h2>
                <div className="grid md:grid-cols-4 gap-6">
                  {slides[currentSlide].members?.map((member, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-6 rounded-2xl bg-white/5 border border-white/10"
                    >
                      <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-2xl font-bold mb-4">
                        {member.avatar}
                      </div>
                      <div className="font-bold text-lg mb-1">{member.name}</div>
                      <div className="text-sm text-slate-400">{member.role}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Slide 10: Financials */}
            {slides[currentSlide].type === "financials" && (
              <div className="py-12">
                <h2 className="text-5xl md:text-7xl font-black mb-12 text-center">
                  {slides[currentSlide].title}
                </h2>
                <div className="max-w-2xl mx-auto space-y-6">
                  {slides[currentSlide].allocation?.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{item.category}</span>
                        <span className="font-bold" style={{ color: item.color }}>{item.percent}%</span>
                      </div>
                      <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percent}%` }}
                          transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Slide 11: Roadmap */}
            {slides[currentSlide].type === "roadmap" && (
              <div className="py-12">
                <h2 className="text-5xl md:text-7xl font-black mb-12 text-center">
                  {slides[currentSlide].title}
                </h2>
                <div className="grid md:grid-cols-4 gap-6">
                  {slides[currentSlide].milestones?.map((milestone, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-6 rounded-2xl bg-white/5 border border-white/10 relative"
                    >
                      <div className="absolute -top-3 left-6 px-4 py-1 rounded-full bg-cyan-500 text-black text-sm font-bold">
                        {milestone.quarter}
                      </div>
                      <ul className="mt-4 space-y-3">
                        {milestone.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-slate-300">
                            <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-1" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Slide 12: The Ask */}
            {slides[currentSlide].type === "ask" && (
              <div className="py-12 text-center">
                <h2 className="text-5xl md:text-7xl font-black mb-4">
                  {slides[currentSlide].title}
                </h2>
                <div className="text-2xl text-cyan-400 mb-12">{slides[currentSlide].round}</div>

                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="inline-block p-12 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 mb-12"
                >
                  <div className="text-8xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
                    {slides[currentSlide].amount}
                  </div>
                  <div className="text-xl text-slate-400">{slides[currentSlide].valuation}</div>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  {slides[currentSlide].terms?.map((term, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="px-6 py-3 rounded-full bg-white/5 border border-white/10"
                    >
                      {term}
                    </motion.div>
                  ))}
                </div>

                {/* Buy Token Widget */}
                <div className="max-w-xl mx-auto">
                  <BuyTokenWidget variant="banner" source="investor-presentation" />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide dots */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-40">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              i === currentSlide 
                ? "w-8 bg-cyan-500" 
                : "bg-white/20 hover:bg-white/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}


