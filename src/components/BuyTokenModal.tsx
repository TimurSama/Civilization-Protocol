"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, CreditCard, Wallet, ArrowRight, Check, Info,
  Zap, Shield, Gift, TrendingUp, Clock, ChevronDown,
  Bitcoin, DollarSign, Euro, AlertCircle, Loader2,
  Sparkles, Trophy, Lock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useWallet } from "@/context/WalletContext";

interface BuyTokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAmount?: number;
  source?: string; // Where the modal was opened from
}

// Token pricing tiers
const PRICING_TIERS = [
  { amount: 100, priceUSD: 10, bonus: 0, popular: false },
  { amount: 500, priceUSD: 45, bonus: 10, popular: false },
  { amount: 1000, priceUSD: 80, bonus: 25, popular: true },
  { amount: 5000, priceUSD: 350, bonus: 40, popular: false },
  { amount: 10000, priceUSD: 600, bonus: 67, popular: false },
  { amount: 50000, priceUSD: 2500, bonus: 100, popular: false },
];

// Payment methods
const PAYMENT_METHODS = {
  fiat: [
    { id: "card", name: "Банковская карта", icon: CreditCard, fees: "2.5%" },
    { id: "paypal", name: "PayPal", icon: DollarSign, fees: "3.5%" },
  ],
  crypto: [
    { id: "ton", name: "TON", icon: Wallet, fees: "0.1%", rate: 5.2 },
    { id: "usdt", name: "USDT (TRC-20)", icon: DollarSign, fees: "1%", rate: 1 },
    { id: "btc", name: "Bitcoin", icon: Bitcoin, fees: "0.5%", rate: 0.000023 },
    { id: "eth", name: "Ethereum", icon: Wallet, fees: "0.5%", rate: 0.00029 },
  ]
};

const translations = {
  ru: {
    title: "Купить VOD токены",
    subtitle: "Инвестируйте в будущее водных ресурсов",
    step1: "Выберите количество",
    step2: "Способ оплаты",
    step3: "Подтверждение",
    custom: "Своя сумма",
    bonus: "Бонус",
    popular: "Популярный",
    fiat: "Фиатные деньги",
    crypto: "Криптовалюта",
    fees: "Комиссия",
    total: "Итого к оплате",
    youGet: "Вы получите",
    continue: "Продолжить",
    back: "Назад",
    confirm: "Подтвердить покупку",
    processing: "Обработка...",
    benefits: {
      title: "Преимущества VOD токена",
      governance: "Голосование в DAO",
      staking: "Стейкинг до 25% APY",
      access: "Доступ к премиум функциям",
      rewards: "Повышенные награды"
    },
    security: "Безопасная транзакция",
    disclaimer: "Криптовалюты являются волатильным активом. Инвестируйте ответственно.",
    minPurchase: "Минимальная покупка: 10 VOD",
    currentPrice: "Текущая цена",
    priceChange: "за 24ч",
    success: "Покупка успешна!",
    successMessage: "Токены зачислены на ваш баланс",
    viewWallet: "Открыть кошелёк"
  },
  en: {
    title: "Buy VOD Tokens",
    subtitle: "Invest in the future of water resources",
    step1: "Select amount",
    step2: "Payment method",
    step3: "Confirmation",
    custom: "Custom amount",
    bonus: "Bonus",
    popular: "Popular",
    fiat: "Fiat currency",
    crypto: "Cryptocurrency",
    fees: "Fee",
    total: "Total to pay",
    youGet: "You will receive",
    continue: "Continue",
    back: "Back",
    confirm: "Confirm purchase",
    processing: "Processing...",
    benefits: {
      title: "VOD Token Benefits",
      governance: "DAO Voting",
      staking: "Staking up to 25% APY",
      access: "Premium features access",
      rewards: "Enhanced rewards"
    },
    security: "Secure transaction",
    disclaimer: "Cryptocurrencies are volatile assets. Invest responsibly.",
    minPurchase: "Minimum purchase: 10 VOD",
    currentPrice: "Current price",
    priceChange: "24h change",
    success: "Purchase successful!",
    successMessage: "Tokens have been added to your balance",
    viewWallet: "View wallet"
  },
  ar: {
    title: "شراء رموز VOD",
    subtitle: "استثمر في مستقبل الموارد المائية",
    step1: "اختر الكمية",
    step2: "طريقة الدفع",
    step3: "التأكيد",
    custom: "مبلغ مخصص",
    bonus: "مكافأة",
    popular: "شائع",
    fiat: "العملات الورقية",
    crypto: "العملات المشفرة",
    fees: "الرسوم",
    total: "إجمالي الدفع",
    youGet: "ستحصل على",
    continue: "متابعة",
    back: "رجوع",
    confirm: "تأكيد الشراء",
    processing: "جاري المعالجة...",
    benefits: {
      title: "مزايا رمز VOD",
      governance: "التصويت في DAO",
      staking: "ستيكينج حتى 25% APY",
      access: "الوصول للميزات المميزة",
      rewards: "مكافآت معززة"
    },
    security: "معاملة آمنة",
    disclaimer: "العملات المشفرة أصول متقلبة. استثمر بمسؤولية.",
    minPurchase: "الحد الأدنى للشراء: 10 VOD",
    currentPrice: "السعر الحالي",
    priceChange: "التغير في 24 ساعة",
    success: "تمت عملية الشراء بنجاح!",
    successMessage: "تمت إضافة الرموز إلى رصيدك",
    viewWallet: "عرض المحفظة"
  }
};

export default function BuyTokenModal({ isOpen, onClose, initialAmount = 1000, source }: BuyTokenModalProps) {
  const { user, isAuthenticated } = useAuth();
  const { isConnected: walletConnected, address: walletAddress } = useWallet();
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.ru;

  const [step, setStep] = useState(1);
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentType, setPaymentType] = useState<"fiat" | "crypto">("fiat");
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Token price info
  const tokenPrice = 0.10; // $0.10 per VOD
  const priceChange = +5.2; // +5.2% in 24h

  // Calculate selected amount and price
  const getSelectedAmount = () => {
    if (selectedTier !== null) {
      return PRICING_TIERS[selectedTier].amount;
    }
    return parseInt(customAmount) || 0;
  };

  const getSelectedPrice = () => {
    if (selectedTier !== null) {
      return PRICING_TIERS[selectedTier].priceUSD;
    }
    return (parseInt(customAmount) || 0) * tokenPrice;
  };

  const getBonus = () => {
    if (selectedTier !== null) {
      return PRICING_TIERS[selectedTier].bonus;
    }
    const amount = parseInt(customAmount) || 0;
    if (amount >= 50000) return 100;
    if (amount >= 10000) return 67;
    if (amount >= 5000) return 40;
    if (amount >= 1000) return 25;
    if (amount >= 500) return 10;
    return 0;
  };

  const getTotalTokens = () => {
    return getSelectedAmount() + getBonus();
  };

  const getFees = () => {
    const method = paymentType === "fiat"
      ? PAYMENT_METHODS.fiat.find(m => m.id === selectedMethod)
      : PAYMENT_METHODS.crypto.find(m => m.id === selectedMethod);
    return method?.fees || "0%";
  };

  const handleConfirm = async () => {
    if (!isAuthenticated) return;

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsSuccess(true);
  };

  const handleClose = () => {
    setStep(1);
    setSelectedTier(null);
    setCustomAmount("");
    setSelectedMethod(null);
    setIsSuccess(false);
    onClose();
  };

  useEffect(() => {
    // Find default tier based on initialAmount
    const tierIndex = PRICING_TIERS.findIndex(t => t.amount === initialAmount);
    if (tierIndex !== -1) {
      setSelectedTier(tierIndex);
    }
  }, [initialAmount]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="glass-card p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {isSuccess ? (
              /* Success State */
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-500 mx-auto mb-6 flex items-center justify-center">
                  <Check size={40} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">{t.success}</h2>
                <p className="text-slate-400 mb-6">{t.successMessage}</p>
                
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 mb-8">
                  <Sparkles className="text-cyan-glow" />
                  <span className="text-2xl font-black text-cyan-glow">+{getTotalTokens()} VOD</span>
                </div>

                <div className="flex gap-4 justify-center">
                  <button
                    onClick={handleClose}
                    className="px-6 py-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    {t.back}
                  </button>
                  <button
                    onClick={() => { handleClose(); window.location.href = '/wallet'; }}
                    className="px-6 py-3 bg-cyan-glow text-ocean-deep rounded-xl font-bold hover:scale-105 transition-transform flex items-center gap-2"
                  >
                    <Wallet size={18} />
                    {t.viewWallet}
                  </button>
                </div>
              </motion.div>
            ) : (
              <>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <Zap className="text-yellow-400" />
                      {t.title}
                    </h2>
                    <p className="text-sm text-slate-400">{t.subtitle}</p>
                  </div>
                  <button onClick={handleClose} className="p-2 hover:bg-white/5 rounded-lg">
                    <X size={20} />
                  </button>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-8">
                  {[1, 2, 3].map(s => (
                    <div key={s} className="flex items-center">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                        step >= s ? "bg-cyan-glow text-ocean-deep" : "bg-white/10 text-slate-500"
                      )}>
                        {step > s ? <Check size={16} /> : s}
                      </div>
                      {s < 3 && (
                        <div className={cn(
                          "w-20 md:w-32 h-1 mx-2 rounded-full transition-all",
                          step > s ? "bg-cyan-glow" : "bg-white/10"
                        )} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Current Price Info */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 mb-6">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">{t.currentPrice}</div>
                    <div className="text-xl font-bold">${tokenPrice.toFixed(2)} <span className="text-sm text-slate-400">/ VOD</span></div>
                  </div>
                  <div className={cn(
                    "px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm font-bold",
                    priceChange >= 0 ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                  )}>
                    <TrendingUp size={14} />
                    {priceChange >= 0 ? "+" : ""}{priceChange}%
                  </div>
                </div>

                {/* Step 1: Select Amount */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h3 className="text-lg font-bold mb-4">{t.step1}</h3>

                    {/* Tier Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                      {PRICING_TIERS.map((tier, index) => (
                        <button
                          key={tier.amount}
                          onClick={() => { setSelectedTier(index); setCustomAmount(""); }}
                          className={cn(
                            "relative p-4 rounded-xl border-2 transition-all text-left",
                            selectedTier === index
                              ? "border-cyan-glow bg-cyan-glow/10"
                              : "border-white/10 bg-white/5 hover:border-white/30"
                          )}
                        >
                          {tier.popular && (
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-yellow-500 text-ocean-deep text-[10px] font-bold rounded-full">
                              {t.popular}
                            </div>
                          )}
                          <div className="text-xl font-black">{tier.amount.toLocaleString()}</div>
                          <div className="text-sm text-slate-400">${tier.priceUSD}</div>
                          {tier.bonus > 0 && (
                            <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1">
                              <Gift size={12} />
                              +{tier.bonus} {t.bonus}
                            </div>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Custom Amount */}
                    <div>
                      <label className="text-sm text-slate-500 mb-2 block">{t.custom}</label>
                      <input
                        type="number"
                        value={customAmount}
                        onChange={(e) => { setCustomAmount(e.target.value); setSelectedTier(null); }}
                        placeholder="10 - 1,000,000"
                        min="10"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-glow/50 focus:outline-none"
                      />
                      <p className="text-xs text-slate-500 mt-1">{t.minPurchase}</p>
                    </div>

                    <button
                      onClick={() => setStep(2)}
                      disabled={getSelectedAmount() < 10}
                      className="w-full mt-6 py-4 bg-cyan-glow text-ocean-deep font-bold rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
                    >
                      {t.continue}
                      <ArrowRight size={18} />
                    </button>
                  </motion.div>
                )}

                {/* Step 2: Payment Method */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h3 className="text-lg font-bold mb-4">{t.step2}</h3>

                    {/* Payment Type Tabs */}
                    <div className="flex gap-2 mb-6">
                      <button
                        onClick={() => { setPaymentType("fiat"); setSelectedMethod(null); }}
                        className={cn(
                          "flex-1 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2",
                          paymentType === "fiat" ? "bg-cyan-glow text-ocean-deep" : "bg-white/5 hover:bg-white/10"
                        )}
                      >
                        <CreditCard size={18} />
                        {t.fiat}
                      </button>
                      <button
                        onClick={() => { setPaymentType("crypto"); setSelectedMethod(null); }}
                        className={cn(
                          "flex-1 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2",
                          paymentType === "crypto" ? "bg-cyan-glow text-ocean-deep" : "bg-white/5 hover:bg-white/10"
                        )}
                      >
                        <Bitcoin size={18} />
                        {t.crypto}
                      </button>
                    </div>

                    {/* Payment Methods */}
                    <div className="space-y-3 mb-6">
                      {(paymentType === "fiat" ? PAYMENT_METHODS.fiat : PAYMENT_METHODS.crypto).map(method => (
                        <button
                          key={method.id}
                          onClick={() => setSelectedMethod(method.id)}
                          className={cn(
                            "w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4",
                            selectedMethod === method.id
                              ? "border-cyan-glow bg-cyan-glow/10"
                              : "border-white/10 bg-white/5 hover:border-white/30"
                          )}
                        >
                          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                            <method.icon size={20} />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="font-bold">{method.name}</div>
                            <div className="text-xs text-slate-500">{t.fees}: {method.fees}</div>
                          </div>
                          {selectedMethod === method.id && (
                            <Check size={20} className="text-cyan-glow" />
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setStep(1)}
                        className="flex-1 py-4 bg-white/5 rounded-xl font-bold hover:bg-white/10 transition-colors"
                      >
                        {t.back}
                      </button>
                      <button
                        onClick={() => setStep(3)}
                        disabled={!selectedMethod}
                        className="flex-1 py-4 bg-cyan-glow text-ocean-deep font-bold rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
                      >
                        {t.continue}
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Confirmation */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h3 className="text-lg font-bold mb-4">{t.step3}</h3>

                    {/* Order Summary */}
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6 space-y-4">
                      <div className="flex justify-between">
                        <span className="text-slate-400">VOD токены</span>
                        <span className="font-bold">{getSelectedAmount().toLocaleString()}</span>
                      </div>
                      {getBonus() > 0 && (
                        <div className="flex justify-between text-emerald-400">
                          <span className="flex items-center gap-1">
                            <Gift size={14} />
                            {t.bonus}
                          </span>
                          <span className="font-bold">+{getBonus()}</span>
                        </div>
                      )}
                      <div className="border-t border-white/10 pt-4 flex justify-between">
                        <span className="text-slate-400">{t.youGet}</span>
                        <span className="text-xl font-black text-cyan-glow">{getTotalTokens().toLocaleString()} VOD</span>
                      </div>
                      <div className="border-t border-white/10 pt-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">{t.fees}</span>
                          <span>{getFees()}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                          <span className="font-bold">{t.total}</span>
                          <span className="text-xl font-black">${getSelectedPrice().toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 mb-6">
                      <h4 className="font-bold mb-3 flex items-center gap-2">
                        <Trophy className="text-yellow-400" />
                        {t.benefits.title}
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Check size={14} className="text-emerald-400" />
                          {t.benefits.governance}
                        </div>
                        <div className="flex items-center gap-2">
                          <Check size={14} className="text-emerald-400" />
                          {t.benefits.staking}
                        </div>
                        <div className="flex items-center gap-2">
                          <Check size={14} className="text-emerald-400" />
                          {t.benefits.access}
                        </div>
                        <div className="flex items-center gap-2">
                          <Check size={14} className="text-emerald-400" />
                          {t.benefits.rewards}
                        </div>
                      </div>
                    </div>

                    {/* Security Notice */}
                    <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
                      <Shield size={16} className="text-emerald-400" />
                      {t.security}
                    </div>

                    {/* Disclaimer */}
                    <div className="flex items-start gap-2 text-xs text-slate-500 mb-6">
                      <AlertCircle size={14} className="shrink-0 mt-0.5" />
                      {t.disclaimer}
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setStep(2)}
                        className="flex-1 py-4 bg-white/5 rounded-xl font-bold hover:bg-white/10 transition-colors"
                      >
                        {t.back}
                      </button>
                      <button
                        onClick={handleConfirm}
                        disabled={isProcessing}
                        className="flex-1 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            {t.processing}
                          </>
                        ) : (
                          <>
                            <Lock size={18} />
                            {t.confirm}
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


