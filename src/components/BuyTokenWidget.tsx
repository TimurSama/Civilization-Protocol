"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import BuyTokenModal from "./BuyTokenModal";

interface BuyTokenWidgetProps {
  variant?: "compact" | "banner" | "card" | "inline";
  className?: string;
  source?: string;
}

const translations = {
  ru: {
    buyTokens: "Купить VOD",
    tokenPrice: "Цена токена",
    change24h: "за 24ч",
    startFrom: "от",
    getBonus: "Получите бонус",
    bonusText: "до +100 VOD при покупке от 1000 токенов",
    investNow: "Инвестировать",
    limited: "Ограниченное предложение"
  },
  en: {
    buyTokens: "Buy VOD",
    tokenPrice: "Token price",
    change24h: "24h",
    startFrom: "from",
    getBonus: "Get bonus",
    bonusText: "up to +100 VOD when buying 1000+ tokens",
    investNow: "Invest Now",
    limited: "Limited offer"
  },
  ar: {
    buyTokens: "شراء VOD",
    tokenPrice: "سعر الرمز",
    change24h: "24 ساعة",
    startFrom: "من",
    getBonus: "احصل على مكافأة",
    bonusText: "حتى +100 VOD عند شراء 1000+ رمز",
    investNow: "استثمر الآن",
    limited: "عرض محدود"
  }
};

export default function BuyTokenWidget({ variant = "card", className, source }: BuyTokenWidgetProps) {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.ru;
  const [showModal, setShowModal] = useState(false);

  const tokenPrice = 0.10;
  const priceChange = 5.2;

  // Compact variant - just a button
  if (variant === "compact") {
    return (
      <>
        <button
          onClick={() => setShowModal(true)}
          className={cn(
            "px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-ocean-deep font-bold rounded-xl",
            "hover:scale-105 transition-transform flex items-center gap-2",
            className
          )}
        >
          <Zap size={16} />
          {t.buyTokens}
        </button>
        <BuyTokenModal isOpen={showModal} onClose={() => setShowModal(false)} source={source} />
      </>
    );
  }

  // Inline variant - for navbars
  if (variant === "inline") {
    return (
      <>
        <button
          onClick={() => setShowModal(true)}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-yellow-500/20 to-orange-500/20",
            "border border-yellow-500/30 text-yellow-400 text-sm font-bold",
            "hover:from-yellow-500/30 hover:to-orange-500/30 transition-all",
            className
          )}
        >
          <Zap size={14} />
          <span className="hidden sm:inline">{t.buyTokens}</span>
          <span className="text-xs opacity-75">${tokenPrice}</span>
        </button>
        <BuyTokenModal isOpen={showModal} onClose={() => setShowModal(false)} source={source} />
      </>
    );
  }

  // Banner variant - wide promotional banner
  if (variant === "banner") {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "relative overflow-hidden rounded-2xl p-6",
            "bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10",
            "border border-yellow-500/20",
            className
          )}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl" />
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded-full">
                  {t.limited}
                </span>
              </div>
              <h3 className="text-2xl font-black mb-2 flex items-center gap-2">
                <Sparkles className="text-yellow-400" />
                {t.getBonus}
              </h3>
              <p className="text-slate-400">{t.bonusText}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs text-slate-500">{t.tokenPrice}</div>
                <div className="text-2xl font-black">${tokenPrice}</div>
                <div className={cn(
                  "text-xs font-bold",
                  priceChange >= 0 ? "text-emerald-400" : "text-red-400"
                )}>
                  {priceChange >= 0 ? "+" : ""}{priceChange}% {t.change24h}
                </div>
              </div>
              
              <button
                onClick={() => setShowModal(true)}
                className="px-6 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-ocean-deep font-black rounded-xl hover:scale-105 transition-transform flex items-center gap-2"
              >
                {t.investNow}
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
        <BuyTokenModal isOpen={showModal} onClose={() => setShowModal(false)} source={source} />
      </>
    );
  }

  // Card variant - default
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          "relative overflow-hidden rounded-2xl p-5",
          "bg-gradient-to-br from-yellow-500/10 to-orange-500/10",
          "border border-yellow-500/20",
          className
        )}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="font-bold flex items-center gap-2">
              <Zap className="text-yellow-400" size={18} />
              {t.buyTokens}
            </h4>
            <div className="text-xs text-slate-500 mt-1">{t.startFrom} $10</div>
          </div>
          <div className="text-right">
            <div className="font-black">${tokenPrice}</div>
            <div className={cn(
              "text-xs flex items-center gap-1",
              priceChange >= 0 ? "text-emerald-400" : "text-red-400"
            )}>
              <TrendingUp size={12} />
              {priceChange >= 0 ? "+" : ""}{priceChange}%
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-ocean-deep font-bold rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
        >
          {t.investNow}
          <ArrowRight size={16} />
        </button>
      </motion.div>
      <BuyTokenModal isOpen={showModal} onClose={() => setShowModal(false)} source={source} />
    </>
  );
}





















