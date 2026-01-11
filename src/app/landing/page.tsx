"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Globe, Shield, Zap, Droplets, ArrowRight, CheckCircle2, Cpu,
  Database, Network, Building2, Landmark, TrendingUp, Users,
  ChevronDown, Play, Star, Gift, UserPlus, Coins, Lock,
  Smartphone, BarChart3, Activity, Mail, ExternalLink,
  Twitter, MessageCircle, Send, Copy, Check
} from "lucide-react";
import Link from "next/link";
import BuyTokenWidget from "@/components/BuyTokenWidget";
import { useLanguage } from "@/context/LanguageContext";

export default function LandingPage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState({ days: 45, hours: 12, mins: 30, secs: 0 });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const copyReferral = () => {
    navigator.clipboard.writeText("https://vodeco.app/ref/PIONEER2024");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep via-ocean-deep/90 to-ocean-deep z-10" />
          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(34, 211, 238, 0.15) 0%, transparent 50%),
                               radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 40%),
                               radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 40%)`,
              backgroundSize: "200% 200%",
            }}
          />
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-glow/30 rounded-full"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              }}
              animate={{
                y: [null, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="relative z-20 max-w-6xl mx-auto px-4 text-center">
          {/* Beta Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-glow/20 to-purple-500/20 border border-cyan-glow/30 mb-8"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium">{t("landing.beta_badge")}</span>
            <Gift className="text-cyan-glow" size={16} />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6"
          >
            <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-glow bg-clip-text text-transparent">
              {t("landing.hero_title")}
            </span>
            <br />
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-slate-300">
              {t("landing.hero_subtitle")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-8 px-4"
          >
            {t("landing.hero_description")}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-3 gap-2 sm:gap-4 max-w-2xl mx-auto mb-10 px-4"
          >
            <div className="glass-card p-3 sm:p-4">
              <div className="text-xl sm:text-2xl md:text-3xl font-black text-cyan-glow">$500B</div>
              <div className="text-xs sm:text-sm text-slate-400">{t("landing.stats.losses")}</div>
            </div>
            <div className="glass-card p-3 sm:p-4">
              <div className="text-xl sm:text-2xl md:text-3xl font-black text-cyan-glow">5B+</div>
              <div className="text-xs sm:text-sm text-slate-400">{t("landing.stats.people_at_risk")}</div>
            </div>
            <div className="glass-card p-3 sm:p-4">
              <div className="text-xl sm:text-2xl md:text-3xl font-black text-cyan-glow">60%</div>
              <div className="text-xs sm:text-sm text-slate-400">{t("landing.stats.no_monitoring")}</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4"
          >
            <Link href="/presentation" className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-glow to-blue-500 text-white font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_30px_rgba(34,211,238,0.4)] text-sm sm:text-base">
              <Play size={18} className="sm:w-5 sm:h-5" /> {t("landing.watch_presentation")}
            </Link>
            <button
              onClick={() => document.getElementById('beta-signup')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 sm:px-8 py-3 sm:py-4 glass text-white font-bold rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2 text-sm sm:text-base"
            >
              <UserPlus size={18} className="sm:w-5 sm:h-5" /> {t("landing.join_beta")}
            </button>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center px-4"
          >
            <p className="text-xs sm:text-sm text-slate-500 mb-3">{t("landing.countdown_prefix")}</p>
            <div className="flex justify-center gap-2 sm:gap-4">
              {[
                { value: countdown.days, label: t("landing.countdown.days") },
                { value: countdown.hours, label: t("landing.countdown.hours") },
                { value: countdown.mins, label: t("landing.countdown.mins") },
                { value: countdown.secs, label: t("landing.countdown.secs") },
              ].map((item, i) => (
                <div key={i} className="glass-card px-3 sm:px-4 py-2 min-w-[60px] sm:min-w-[70px]">
                  <div className="text-xl sm:text-2xl font-black text-cyan-glow">{String(item.value).padStart(2, '0')}</div>
                  <div className="text-xs text-slate-500">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1, y: { duration: 2, repeat: Infinity } }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="text-slate-500" size={32} />
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12 sm:mb-16 px-4"
          >
            <h2 className="text-3xl sm:text-4xl font-black mb-4">{t("landing.problem_title")}</h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
              {t("landing.problem_subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: Droplets, title: t("landing.problems.shortage.title"), desc: t("landing.problems.shortage.desc"), color: "text-blue-400" },
              { icon: Building2, title: t("landing.problems.infrastructure.title"), desc: t("landing.problems.infrastructure.desc"), color: "text-orange-400" },
              { icon: Database, title: t("landing.problems.fragmented.title"), desc: t("landing.problems.fragmented.desc"), color: "text-purple-400" },
              { icon: Lock, title: t("landing.problems.transparency.title"), desc: t("landing.problems.transparency.desc"), color: "text-red-400" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="glass-card p-4 sm:p-6 text-center hover:scale-105 transition-transform"
              >
                <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-xl sm:rounded-2xl bg-white/5 flex items-center justify-center mb-3 sm:mb-4 ${item.color}`}>
                  <item.icon size={24} />
                </div>
                <h3 className="font-bold mb-2 text-sm sm:text-base">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-cyan-glow/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12 sm:mb-16 px-4"
          >
            <h2 className="text-3xl sm:text-4xl font-black mb-4">{t("landing.solution_title")}</h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
              {t("landing.solution_subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              { icon: Activity, title: t("landing.solutions.iot.title"), desc: t("landing.solutions.iot.desc"), features: t("landing.solutions.iot.features") },
              { icon: Shield, title: t("landing.solutions.blockchain.title"), desc: t("landing.solutions.blockchain.desc"), features: t("landing.solutions.blockchain.features") },
              { icon: Cpu, title: t("landing.solutions.ai.title"), desc: t("landing.solutions.ai.desc"), features: t("landing.solutions.ai.features") },
              { icon: Users, title: t("landing.solutions.dao.title"), desc: t("landing.solutions.dao.desc"), features: t("landing.solutions.dao.features") },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                className="glass-card p-6 sm:p-8 hover:border-cyan-glow/30 transition-colors"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-cyan-glow/10 flex items-center justify-center text-cyan-glow flex-shrink-0">
                    <item.icon size={24} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-lg sm:text-xl mb-2">{item.title}</h3>
                    <p className="text-slate-400 mb-3 sm:mb-4 text-sm sm:text-base">{item.desc}</p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {item.features.map((f: string, j: number) => (
                        <span key={j} className="px-2 sm:px-3 py-1 rounded-full bg-white/5 text-xs text-slate-300">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12 sm:mb-16 px-4"
          >
            <h2 className="text-3xl sm:text-4xl font-black mb-4">{t("landing.how_it_works_title")}</h2>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 px-4">
            {[
              { step: 1, title: t("landing.steps.connection.title"), desc: t("landing.steps.connection.desc"), icon: Activity },
              { step: 2, title: t("landing.steps.verification.title"), desc: t("landing.steps.verification.desc"), icon: Shield },
              { step: 3, title: t("landing.steps.analysis.title"), desc: t("landing.steps.analysis.desc"), icon: Cpu },
              { step: 4, title: t("landing.steps.governance.title"), desc: t("landing.steps.governance.desc"), icon: Users },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 * i }}
                className="flex items-center gap-2 sm:gap-4"
              >
                <div className="glass-card p-4 sm:p-6 text-center min-w-[150px] sm:min-w-[180px]">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-full bg-cyan-glow/20 flex items-center justify-center text-cyan-glow font-bold text-lg sm:text-xl mb-3">
                    {item.step}
                  </div>
                  <item.icon className="mx-auto mb-2 text-cyan-glow" size={20} />
                  <h4 className="font-bold mb-1 text-sm sm:text-base">{item.title}</h4>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
                {i < 3 && <ArrowRight className="text-cyan-glow hidden md:block" size={20} />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Tiers */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12 sm:mb-16 px-4"
          >
            <h2 className="text-3xl sm:text-4xl font-black mb-4">{t("landing.investment_title")}</h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-400">{t("landing.investment_subtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { tier: t("landing.tiers.seed.name"), amount: "10,000 VOD", price: "$100", benefits: t("landing.tiers.seed.benefits"), popular: false },
              { tier: t("landing.tiers.strategic.name"), amount: "100,000 VOD", price: "$900", benefits: t("landing.tiers.strategic.benefits"), popular: true, popularLabel: t("landing.tiers.strategic.popular") },
              { tier: t("landing.tiers.infrastructure.name"), amount: "500,000 VOD", price: "$4,000", benefits: t("landing.tiers.infrastructure.benefits"), popular: false },
              { tier: t("landing.tiers.institutional.name"), amount: "1,000,000 VOD", price: "$7,500", benefits: t("landing.tiers.institutional.benefits"), popular: false },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className={`glass-card p-6 relative ${item.popular ? 'border-cyan-glow/50 scale-105' : ''}`}
              >
                {item.popular && item.popularLabel && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-glow to-blue-500 rounded-full text-xs font-bold text-white">
                    {item.popularLabel}
                  </div>
                )}
                <h3 className="font-bold text-lg sm:text-xl mb-2">{item.tier}</h3>
                <div className="text-2xl sm:text-3xl font-black text-cyan-glow mb-1">{item.amount}</div>
                <div className="text-xs sm:text-sm text-slate-400 mb-4">≈ {item.price}</div>
                <ul className="space-y-2 mb-6">
                  {item.benefits.map((b: string, j: number) => (
                    <li key={j} className="text-xs sm:text-sm text-slate-300 flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-green-500 flex-shrink-0" /> <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-2.5 sm:py-3 rounded-xl font-bold transition-all text-sm sm:text-base ${
                  item.popular 
                    ? 'bg-gradient-to-r from-cyan-glow to-blue-500 text-white hover:scale-105' 
                    : 'bg-white/5 hover:bg-white/10 text-white'
                }`}>
                  {t("landing.tiers.choose")}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beta Signup */}
      <section id="beta-signup" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass-card p-8 md:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-glow/10 via-transparent to-purple-500/10" />
            
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400 mb-6">
                <Star size={16} /> {t("landing.beta_signup.badge")}
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-black mb-4">{t("landing.beta_signup.title")}</h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                {t("landing.beta_signup.description")}
              </p>

              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                <div className="p-3 sm:p-4 bg-white/5 rounded-xl">
                  <div className="text-xl sm:text-2xl font-black text-cyan-glow">x2</div>
                  <div className="text-xs sm:text-sm text-slate-400">{t("landing.beta_signup.stats.rewards")}</div>
                </div>
                <div className="p-3 sm:p-4 bg-white/5 rounded-xl">
                  <div className="text-xl sm:text-2xl font-black text-purple-400">NFT</div>
                  <div className="text-xs sm:text-sm text-slate-400">{t("landing.beta_signup.stats.nft")}</div>
                </div>
                <div className="p-3 sm:p-4 bg-white/5 rounded-xl">
                  <div className="text-xl sm:text-2xl font-black text-green-400">100%</div>
                  <div className="text-xs sm:text-sm text-slate-400">{t("landing.beta_signup.stats.airdrop")}</div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-3 sm:gap-4 max-w-xl mx-auto mb-4 sm:mb-6 px-4">
                <input
                  type="email"
                  placeholder={t("landing.beta_signup.email_placeholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-glow/50 focus:outline-none transition-colors text-sm sm:text-base"
                />
                <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-glow to-blue-500 text-white font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2 justify-center text-sm sm:text-base">
                  <UserPlus size={18} className="sm:w-5 sm:h-5" /> {t("landing.beta_signup.join")}
                </button>
              </div>

              <div className="text-xs sm:text-sm text-slate-500 px-4">
                <span className="text-green-400 font-bold">847</span> {t("landing.beta_signup.spots_left")}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Referral Program */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-cyan-glow/5 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl sm:text-4xl font-black mb-4 px-4">{t("landing.referral_title")}</h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-6 sm:mb-8 px-4">
              {t("landing.referral_subtitle")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 px-4">
              <div className="glass-card p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl font-black text-cyan-glow mb-2">10%</div>
                <div className="text-xs sm:text-sm text-slate-400">{t("landing.referral_levels.level1")}</div>
              </div>
              <div className="glass-card p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl font-black text-blue-400 mb-2">5%</div>
                <div className="text-xs sm:text-sm text-slate-400">{t("landing.referral_levels.level2")}</div>
              </div>
              <div className="glass-card p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl font-black text-purple-400 mb-2">2%</div>
                <div className="text-xs sm:text-sm text-slate-400">{t("landing.referral_levels.level3")}</div>
              </div>
            </div>

            <div className="glass-card p-4 sm:p-6 inline-flex items-center gap-3 sm:gap-4 flex-wrap justify-center mx-4">
              <span className="text-slate-400 text-sm sm:text-base">{t("landing.referral_link")}</span>
              <code className="px-4 py-2 bg-white/5 rounded-lg text-cyan-glow font-mono text-sm">
                https://vodeco.app/ref/PIONEER2024
              </code>
              <button
                onClick={copyReferral}
                className={`p-2 rounded-lg transition-all ${copied ? 'bg-green-500/20 text-green-400' : 'bg-white/5 hover:bg-white/10'}`}
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Airdrop Programs */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12 sm:mb-16 px-4"
          >
            <h2 className="text-3xl sm:text-4xl font-black mb-4">{t("landing.airdrop_title")}</h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-400">{t("landing.airdrop_subtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4">
            {[
              { role: t("landing.airdrop_roles.ambassador.role"), reward: t("landing.airdrop_roles.ambassador.reward"), desc: t("landing.airdrop_roles.ambassador.desc"), icon: Users },
              { role: t("landing.airdrop_roles.researcher.role"), reward: t("landing.airdrop_roles.researcher.reward"), desc: t("landing.airdrop_roles.researcher.desc"), icon: Database },
              { role: t("landing.airdrop_roles.media.role"), reward: t("landing.airdrop_roles.media.reward"), desc: t("landing.airdrop_roles.media.desc"), icon: MessageCircle },
              { role: t("landing.airdrop_roles.developer.role"), reward: t("landing.airdrop_roles.developer.reward"), desc: t("landing.airdrop_roles.developer.desc"), icon: Cpu },
              { role: t("landing.airdrop_roles.translator.role"), reward: t("landing.airdrop_roles.translator.reward"), desc: t("landing.airdrop_roles.translator.desc"), icon: Globe },
              { role: t("landing.airdrop_roles.moderator.role"), reward: t("landing.airdrop_roles.moderator.reward"), desc: t("landing.airdrop_roles.moderator.desc"), icon: Shield },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="glass-card p-4 sm:p-6 hover:border-cyan-glow/30 transition-colors"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-cyan-glow/10 flex items-center justify-center text-cyan-glow flex-shrink-0">
                    <item.icon size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold mb-1 text-sm sm:text-base">{item.role}</h4>
                    <div className="text-cyan-glow text-xs sm:text-sm font-medium mb-2">{item.reward}</div>
                    <p className="text-xs sm:text-sm text-slate-400">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12 sm:mb-16 px-4"
          >
            <h2 className="text-3xl sm:text-4xl font-black mb-4">{t("landing.roadmap_title")}</h2>
          </motion.div>

          <div className="space-y-4 sm:space-y-6 px-4">
            {[
              { year: t("landing.roadmap_items.mvp.year"), title: t("landing.roadmap_items.mvp.title"), status: "done", items: t("landing.roadmap_items.mvp.items") },
              { year: t("landing.roadmap_items.launch.year"), title: t("landing.roadmap_items.launch.title"), status: "current", items: t("landing.roadmap_items.launch.items") },
              { year: t("landing.roadmap_items.expansion.year"), title: t("landing.roadmap_items.expansion.title"), status: "future", items: t("landing.roadmap_items.expansion.items") },
              { year: t("landing.roadmap_items.global.year"), title: t("landing.roadmap_items.global.title"), status: "future", items: t("landing.roadmap_items.global.items") },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                className={`glass-card p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 ${
                  item.status === 'done' ? 'border-green-500/30' :
                  item.status === 'current' ? 'border-cyan-glow/50' : ''
                }`}
              >
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-xl sm:text-2xl font-black flex-shrink-0 ${
                  item.status === 'done' ? 'bg-green-500/20 text-green-400' :
                  item.status === 'current' ? 'bg-cyan-glow/20 text-cyan-glow' :
                  'bg-white/5 text-slate-400'
                }`}>
                  {item.year}
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="font-bold mb-2 text-sm sm:text-base">{item.title}</h4>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    {item.items.map((it: string, j: number) => (
                      <span key={j} className="px-2 sm:px-3 py-1 rounded-full bg-white/5 text-xs sm:text-sm text-slate-300">
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
                {item.status === 'done' && <CheckCircle2 className="text-green-500" size={20} />}
                {item.status === 'current' && <Activity className="text-cyan-glow animate-pulse" size={20} />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Buy Token Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <BuyTokenWidget variant="banner" source="landing" />
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6 px-4">
              {t("landing.final_cta_title")}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              {t("landing.final_cta_subtitle")}
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 px-4">
              <Link href="/presentation" className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-cyan-glow to-blue-500 text-white font-bold rounded-xl sm:rounded-2xl hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_40px_rgba(34,211,238,0.4)] text-sm sm:text-base">
                <Play size={18} className="sm:w-5 sm:h-5" /> {t("landing.watch_presentation")}
              </Link>
              <Link href="/whitepaper" className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 glass text-white font-bold rounded-xl sm:rounded-2xl hover:bg-white/10 transition-colors text-sm sm:text-base">
                White Paper
              </Link>
              <Link href="/dashboard" className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 glass text-white font-bold rounded-xl sm:rounded-2xl hover:bg-white/10 transition-colors text-sm sm:text-base">
                {t("landing.platform")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <h3 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4">CivilizationProtocol</h3>
              <p className="text-xs sm:text-sm text-slate-400">
                {t("landing.footer.description")}
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">{t("landing.footer.platform_title")}</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                <li><Link href="/dashboard" className="hover:text-cyan-glow">Dashboard</Link></li>
                <li><Link href="/dao" className="hover:text-cyan-glow">DAO</Link></li>
                <li><Link href="/tokenhub" className="hover:text-cyan-glow">TokenHub</Link></li>
                <li><Link href="/nexus" className="hover:text-cyan-glow">Nexus</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">{t("landing.footer.resources_title")}</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                <li><Link href="/whitepaper" className="hover:text-cyan-glow">White Paper</Link></li>
                <li><Link href="/presentation" className="hover:text-cyan-glow">{t("nav.presentation")}</Link></li>
                <li><a href="#" className="hover:text-cyan-glow">{t("landing.footer.documentation")}</a></li>
                <li><a href="#" className="hover:text-cyan-glow">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">{t("landing.footer.contacts_title")}</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                <li className="flex items-center gap-2"><Mail size={14} /> info@vodprom.org</li>
                <li className="flex items-center gap-2"><Globe size={14} /> vodprom.org</li>
                <li className="flex items-center gap-2"><Twitter size={14} /> @vodprom</li>
                <li className="flex items-center gap-2"><Send size={14} /> Telegram</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-6 sm:pt-8 border-t border-white/5 text-xs sm:text-sm text-slate-500">
            <div>{t("landing.footer.copyright")}</div>
            <div className="flex gap-4 sm:gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">{t("landing.footer.terms")}</a>
              <a href="#" className="hover:text-white">{t("landing.footer.privacy")}</a>
              <a href="#" className="hover:text-white">{t("landing.footer.cookies")}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

