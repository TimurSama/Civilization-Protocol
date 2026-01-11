"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Users, Search, Check, ChevronRight, Award,
  Shield, TrendingUp, Vote, AlertCircle, Info,
  Loader2, CheckCircle2, UserPlus, History
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

interface DelegateVotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  votingPower?: number;
}

interface Delegate {
  id: string;
  name: string;
  avatar: string;
  role: string;
  votingPower: number;
  delegators: number;
  participationRate: number;
  votesFor: number;
  votesAgainst: number;
  verified: boolean;
  specialization: string[];
  bio: string;
}

// Demo delegates
const demoDelegates: Delegate[] = [
  {
    id: "1",
    name: "Alex Hydro",
    avatar: "AH",
    role: "Эксперт по водным ресурсам",
    votingPower: 125000,
    delegators: 234,
    participationRate: 98,
    votesFor: 45,
    votesAgainst: 3,
    verified: true,
    specialization: ["Экология", "Инфраструктура"],
    bio: "15 лет опыта в управлении водными ресурсами. Бывший консультант UN Water."
  },
  {
    id: "2",
    name: "EcoGuard Foundation",
    avatar: "EG",
    role: "Экологическая организация",
    votingPower: 89000,
    delegators: 567,
    participationRate: 95,
    votesFor: 38,
    votesAgainst: 5,
    verified: true,
    specialization: ["Экология", "Мониторинг"],
    bio: "Международный фонд защиты водных экосистем. Партнёр WWF и Greenpeace."
  },
  {
    id: "3",
    name: "Dr. Marina Chen",
    avatar: "MC",
    role: "Научный исследователь",
    votingPower: 67000,
    delegators: 189,
    participationRate: 100,
    votesFor: 52,
    votesAgainst: 0,
    verified: true,
    specialization: ["Наука", "Технологии"],
    bio: "PhD в гидрологии. Ведущий исследователь института водных ресурсов."
  },
  {
    id: "4",
    name: "WaterTech DAO",
    avatar: "WT",
    role: "Технологический коллектив",
    votingPower: 45000,
    delegators: 312,
    participationRate: 92,
    votesFor: 28,
    votesAgainst: 8,
    verified: true,
    specialization: ["Технологии", "IoT"],
    bio: "Сообщество разработчиков IoT решений для мониторинга воды."
  },
  {
    id: "5",
    name: "Green Investment Fund",
    avatar: "GI",
    role: "Инвестиционный фонд",
    votingPower: 156000,
    delegators: 78,
    participationRate: 88,
    votesFor: 22,
    votesAgainst: 12,
    verified: true,
    specialization: ["Инвестиции", "ESG"],
    bio: "ESG-фонд с фокусом на водную инфраструктуру. Под управлением $50M."
  }
];

const translations = {
  ru: {
    title: "Делегировать голоса",
    subtitle: "Передайте свои голоса доверенному представителю",
    yourVotingPower: "Ваша сила голоса",
    searchPlaceholder: "Поиск делегата...",
    delegate: "Делегировать",
    delegated: "Делегировано",
    revoke: "Отозвать",
    votingPower: "Сила голоса",
    delegators: "Делегаторов",
    participation: "Участие",
    votes: "Голоса",
    for: "За",
    against: "Против",
    specialization: "Специализация",
    confirmDelegation: "Подтвердить делегирование",
    confirmRevoke: "Отозвать делегирование",
    delegationSuccess: "Голоса успешно делегированы!",
    revokeSuccess: "Делегирование отозвано",
    warning: "После делегирования вы не сможете голосовать самостоятельно, пока не отзовёте делегирование",
    currentDelegate: "Текущий делегат",
    noDelegate: "Вы голосуете самостоятельно",
    history: "История делегирования",
    topDelegates: "Топ делегатов",
    allDelegates: "Все делегаты",
    verified: "Верифицирован"
  },
  en: {
    title: "Delegate Votes",
    subtitle: "Transfer your votes to a trusted representative",
    yourVotingPower: "Your voting power",
    searchPlaceholder: "Search delegate...",
    delegate: "Delegate",
    delegated: "Delegated",
    revoke: "Revoke",
    votingPower: "Voting power",
    delegators: "Delegators",
    participation: "Participation",
    votes: "Votes",
    for: "For",
    against: "Against",
    specialization: "Specialization",
    confirmDelegation: "Confirm delegation",
    confirmRevoke: "Revoke delegation",
    delegationSuccess: "Votes delegated successfully!",
    revokeSuccess: "Delegation revoked",
    warning: "After delegation you cannot vote independently until you revoke",
    currentDelegate: "Current delegate",
    noDelegate: "You vote independently",
    history: "Delegation history",
    topDelegates: "Top delegates",
    allDelegates: "All delegates",
    verified: "Verified"
  },
  ar: {
    title: "تفويض الأصوات",
    subtitle: "نقل أصواتك إلى ممثل موثوق",
    yourVotingPower: "قوة تصويتك",
    searchPlaceholder: "بحث عن مفوض...",
    delegate: "تفويض",
    delegated: "مفوض",
    revoke: "إلغاء",
    votingPower: "قوة التصويت",
    delegators: "المفوضون",
    participation: "المشاركة",
    votes: "الأصوات",
    for: "مع",
    against: "ضد",
    specialization: "التخصص",
    confirmDelegation: "تأكيد التفويض",
    confirmRevoke: "إلغاء التفويض",
    delegationSuccess: "تم تفويض الأصوات بنجاح!",
    revokeSuccess: "تم إلغاء التفويض",
    warning: "بعد التفويض لن تتمكن من التصويت بشكل مستقل حتى تقوم بالإلغاء",
    currentDelegate: "المفوض الحالي",
    noDelegate: "أنت تصوت بشكل مستقل",
    history: "تاريخ التفويض",
    topDelegates: "أفضل المفوضين",
    allDelegates: "جميع المفوضين",
    verified: "موثق"
  }
};

export default function DelegateVotesModal({ isOpen, onClose, votingPower = 1000 }: DelegateVotesModalProps) {
  const { user } = useAuth();
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.ru;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDelegate, setSelectedDelegate] = useState<Delegate | null>(null);
  const [currentDelegate, setCurrentDelegate] = useState<Delegate | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"delegates" | "history">("delegates");

  const filteredDelegates = demoDelegates.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.specialization.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleDelegate = async () => {
    if (!selectedDelegate) return;
    
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setCurrentDelegate(selectedDelegate);
    setIsProcessing(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedDelegate(null);
    }, 2000);
  };

  const handleRevoke = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setCurrentDelegate(null);
    setIsProcessing(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="glass-card p-6 max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Users className="text-cyan-glow" />
                  {t.title}
                </h2>
                <p className="text-sm text-slate-400">{t.subtitle}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg">
                <X size={20} />
              </button>
            </div>

            {/* Your Voting Power */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 mb-6">
              <div>
                <div className="text-xs text-slate-500">{t.yourVotingPower}</div>
                <div className="text-2xl font-black text-cyan-glow">{votingPower.toLocaleString()} VOD</div>
              </div>
              {currentDelegate ? (
                <div className="text-right">
                  <div className="text-xs text-slate-500">{t.currentDelegate}</div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold">
                      {currentDelegate.avatar}
                    </div>
                    <span className="font-bold">{currentDelegate.name}</span>
                  </div>
                </div>
              ) : (
                <div className="text-right text-slate-500 text-sm">{t.noDelegate}</div>
              )}
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setActiveTab("delegates")}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-bold transition-all",
                  activeTab === "delegates" ? "bg-cyan-glow text-ocean-deep" : "bg-white/5 hover:bg-white/10"
                )}
              >
                {t.allDelegates}
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2",
                  activeTab === "history" ? "bg-cyan-glow text-ocean-deep" : "bg-white/5 hover:bg-white/10"
                )}
              >
                <History size={14} />
                {t.history}
              </button>
            </div>

            {activeTab === "delegates" && (
              <>
                {/* Search */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-glow/50 focus:outline-none"
                  />
                </div>

                {/* Delegates List */}
                <div className="flex-1 overflow-y-auto space-y-3 max-h-[400px]">
                  {filteredDelegates.map(delegate => (
                    <motion.div
                      key={delegate.id}
                      layout
                      className={cn(
                        "p-4 rounded-xl border-2 transition-all cursor-pointer",
                        selectedDelegate?.id === delegate.id
                          ? "border-cyan-glow bg-cyan-glow/10"
                          : currentDelegate?.id === delegate.id
                            ? "border-emerald-500 bg-emerald-500/10"
                            : "border-white/10 bg-white/5 hover:border-white/30"
                      )}
                      onClick={() => setSelectedDelegate(delegate)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold">
                          {delegate.avatar}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold">{delegate.name}</span>
                            {delegate.verified && (
                              <CheckCircle2 size={14} className="text-cyan-glow" />
                            )}
                            {currentDelegate?.id === delegate.id && (
                              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-full">
                                {t.delegated}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500 mb-2">{delegate.role}</div>
                          
                          <div className="flex flex-wrap gap-1 mb-2">
                            {delegate.specialization.map(spec => (
                              <span key={spec} className="px-2 py-0.5 bg-white/10 text-[10px] rounded-full">
                                {spec}
                              </span>
                            ))}
                          </div>
                          
                          <div className="grid grid-cols-4 gap-2 text-center text-xs">
                            <div>
                              <div className="font-bold text-cyan-glow">{(delegate.votingPower / 1000).toFixed(0)}K</div>
                              <div className="text-slate-600">{t.votingPower}</div>
                            </div>
                            <div>
                              <div className="font-bold">{delegate.delegators}</div>
                              <div className="text-slate-600">{t.delegators}</div>
                            </div>
                            <div>
                              <div className="font-bold text-emerald-400">{delegate.participationRate}%</div>
                              <div className="text-slate-600">{t.participation}</div>
                            </div>
                            <div>
                              <div className="font-bold">
                                <span className="text-emerald-400">{delegate.votesFor}</span>
                                /
                                <span className="text-red-400">{delegate.votesAgainst}</span>
                              </div>
                              <div className="text-slate-600">{t.votes}</div>
                            </div>
                          </div>
                        </div>

                        <ChevronRight size={20} className="text-slate-500" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}

            {activeTab === "history" && (
              <div className="flex-1 overflow-y-auto">
                <div className="text-center py-12 text-slate-500">
                  <History size={48} className="mx-auto mb-4 opacity-50" />
                  <p>История делегирования пуста</p>
                </div>
              </div>
            )}

            {/* Warning */}
            {selectedDelegate && !currentDelegate && (
              <div className="mt-4 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-start gap-2">
                <AlertCircle size={16} className="text-yellow-400 shrink-0 mt-0.5" />
                <p className="text-xs text-yellow-400">{t.warning}</p>
              </div>
            )}

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-white/10">
              {showSuccess ? (
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="flex items-center justify-center gap-2 py-4 text-emerald-400"
                >
                  <Check size={20} />
                  <span className="font-bold">{t.delegationSuccess}</span>
                </motion.div>
              ) : currentDelegate && !selectedDelegate ? (
                <button
                  onClick={handleRevoke}
                  disabled={isProcessing}
                  className="w-full py-4 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl font-bold hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      <X size={18} />
                      {t.confirmRevoke}
                    </>
                  )}
                </button>
              ) : selectedDelegate && selectedDelegate.id !== currentDelegate?.id ? (
                <button
                  onClick={handleDelegate}
                  disabled={isProcessing}
                  className="w-full py-4 bg-cyan-glow text-ocean-deep font-bold rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isProcessing ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      <UserPlus size={18} />
                      {t.confirmDelegation} → {selectedDelegate.name}
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="w-full py-4 bg-white/5 rounded-xl font-bold hover:bg-white/10 transition-colors"
                >
                  Закрыть
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}























