"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Share2, Copy, Check, MessageCircle, Send,
  Facebook, Instagram, Linkedin, Twitter, Globe,
  Gift, Users, Trophy, Sparkles, Link2, Mail,
  QrCode, Download
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { telegramWebApp, generateTelegramShareLink, generateMiniAppLink } from "@/lib/telegram";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareType: "news" | "achievement" | "ecosystem" | "invite" | "referral";
  data?: {
    title?: string;
    description?: string;
    imageUrl?: string;
    url?: string;
  };
}

const translations = {
  ru: {
    shareTitle: "Поделиться",
    inviteTitle: "Пригласить друзей",
    referralTitle: "Реферальная программа",
    yourReferralCode: "Ваш реферальный код",
    yourReferralLink: "Ваша реферальная ссылка",
    inviteFriends: "Пригласите друзей и получите награды",
    copyLink: "Копировать ссылку",
    copied: "Скопировано!",
    shareVia: "Поделиться через",
    telegram: "Telegram",
    whatsapp: "WhatsApp",
    facebook: "Facebook",
    twitter: "Twitter / X",
    linkedin: "LinkedIn",
    instagram: "Instagram Story",
    email: "Email",
    copyCode: "Копировать код",
    sendInvite: "Отправить приглашение",
    rewards: {
      title: "Награды за приглашения",
      perFriend: "за каждого друга",
      bonus: "дополнительный бонус",
      after5: "после 5 друзей"
    },
    stats: {
      invited: "Приглашено",
      registered: "Зарегистрировано",
      earned: "Заработано"
    },
    qrCode: "QR-код",
    downloadQR: "Скачать QR"
  },
  en: {
    shareTitle: "Share",
    inviteTitle: "Invite Friends",
    referralTitle: "Referral Program",
    yourReferralCode: "Your referral code",
    yourReferralLink: "Your referral link",
    inviteFriends: "Invite friends and earn rewards",
    copyLink: "Copy link",
    copied: "Copied!",
    shareVia: "Share via",
    telegram: "Telegram",
    whatsapp: "WhatsApp",
    facebook: "Facebook",
    twitter: "Twitter / X",
    linkedin: "LinkedIn",
    instagram: "Instagram Story",
    email: "Email",
    copyCode: "Copy code",
    sendInvite: "Send invite",
    rewards: {
      title: "Referral Rewards",
      perFriend: "per friend",
      bonus: "additional bonus",
      after5: "after 5 friends"
    },
    stats: {
      invited: "Invited",
      registered: "Registered",
      earned: "Earned"
    },
    qrCode: "QR Code",
    downloadQR: "Download QR"
  },
  ar: {
    shareTitle: "مشاركة",
    inviteTitle: "دعوة الأصدقاء",
    referralTitle: "برنامج الإحالة",
    yourReferralCode: "رمز الإحالة الخاص بك",
    yourReferralLink: "رابط الإحالة الخاص بك",
    inviteFriends: "ادعُ أصدقاءك واحصل على مكافآت",
    copyLink: "نسخ الرابط",
    copied: "تم النسخ!",
    shareVia: "مشاركة عبر",
    telegram: "تيليجرام",
    whatsapp: "واتساب",
    facebook: "فيسبوك",
    twitter: "تويتر / إكس",
    linkedin: "لينكد إن",
    instagram: "انستجرام ستوري",
    email: "البريد الإلكتروني",
    copyCode: "نسخ الرمز",
    sendInvite: "إرسال دعوة",
    rewards: {
      title: "مكافآت الإحالة",
      perFriend: "لكل صديق",
      bonus: "مكافأة إضافية",
      after5: "بعد 5 أصدقاء"
    },
    stats: {
      invited: "المدعوون",
      registered: "المسجلون",
      earned: "المكتسب"
    },
    qrCode: "رمز QR",
    downloadQR: "تحميل QR"
  }
};

export default function ShareModal({ isOpen, onClose, shareType, data }: ShareModalProps) {
  const { user } = useAuth();
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.ru;
  
  const [copied, setCopied] = useState<string | null>(null);
  const [showQR, setShowQR] = useState(false);

  const referralCode = user?.referralCode || "VODECO";
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://vodeco.org';
  const referralLink = `${baseUrl}/register?ref=${referralCode}`;
  
  const shareUrl = data?.url || referralLink;
  const shareTitle = data?.title || "VODeco - Децентрализованная платформа водных ресурсов";
  const shareDescription = data?.description || "Присоединяйтесь к революции управления водными ресурсами!";

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const shareLinks = [
    {
      name: t.telegram,
      icon: Send,
      color: "bg-[#0088cc]",
      onClick: () => {
        if (telegramWebApp.isAvailable()) {
          telegramWebApp.openTelegramLink(generateTelegramShareLink(shareDescription, shareUrl));
        } else {
          window.open(generateTelegramShareLink(shareDescription, shareUrl), '_blank');
        }
      }
    },
    {
      name: t.whatsapp,
      icon: MessageCircle,
      color: "bg-[#25D366]",
      onClick: () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(`${shareTitle}\n\n${shareDescription}\n\n${shareUrl}`)}`, '_blank');
      }
    },
    {
      name: t.twitter,
      icon: Twitter,
      color: "bg-[#1DA1F2]",
      onClick: () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareDescription)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
      }
    },
    {
      name: t.facebook,
      icon: Facebook,
      color: "bg-[#1877F2]",
      onClick: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
      }
    },
    {
      name: t.linkedin,
      icon: Linkedin,
      color: "bg-[#0A66C2]",
      onClick: () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
      }
    },
    {
      name: t.email,
      icon: Mail,
      color: "bg-slate-600",
      onClick: () => {
        window.open(`mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`${shareDescription}\n\n${shareUrl}`)}`, '_blank');
      }
    }
  ];

  const isReferral = shareType === "referral" || shareType === "invite";
  const title = isReferral ? t.inviteTitle : t.shareTitle;

  // Mock stats for referral program
  const referralStats = {
    invited: 12,
    registered: 8,
    earned: 800
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
            className="glass-card p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                {isReferral ? <Gift className="text-yellow-400" /> : <Share2 className="text-cyan-glow" />}
                {title}
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg">
                <X size={20} />
              </button>
            </div>

            {/* Referral Program Info */}
            {isReferral && (
              <>
                {/* Rewards Info */}
                <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 mb-3 flex items-center gap-2">
                    <Trophy size={18} />
                    {t.rewards.title}
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-black text-yellow-400">100</span>
                      <span className="text-slate-400">VOD {t.rewards.perFriend}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-black text-emerald-400">+500</span>
                      <span className="text-slate-400">{t.rewards.bonus}<br/>{t.rewards.after5}</span>
                    </div>
                  </div>
                </div>

                {/* Your Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 rounded-xl bg-white/5">
                    <Users size={20} className="mx-auto mb-2 text-cyan-glow" />
                    <div className="text-lg font-bold">{referralStats.invited}</div>
                    <div className="text-[10px] text-slate-500 uppercase">{t.stats.invited}</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-white/5">
                    <Sparkles size={20} className="mx-auto mb-2 text-emerald-400" />
                    <div className="text-lg font-bold">{referralStats.registered}</div>
                    <div className="text-[10px] text-slate-500 uppercase">{t.stats.registered}</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-white/5">
                    <Gift size={20} className="mx-auto mb-2 text-yellow-400" />
                    <div className="text-lg font-bold">{referralStats.earned}</div>
                    <div className="text-[10px] text-slate-500 uppercase">{t.stats.earned} VOD</div>
                  </div>
                </div>

                {/* Referral Code */}
                <div className="mb-4">
                  <label className="text-xs text-slate-500 mb-2 block">{t.yourReferralCode}</label>
                  <div className="flex gap-2">
                    <div className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl font-mono text-lg tracking-widest text-center">
                      {referralCode}
                    </div>
                    <button
                      onClick={() => handleCopy(referralCode, 'code')}
                      className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                    >
                      {copied === 'code' ? <Check size={20} className="text-emerald-400" /> : <Copy size={20} />}
                    </button>
                  </div>
                </div>

                {/* Referral Link */}
                <div className="mb-6">
                  <label className="text-xs text-slate-500 mb-2 block">{t.yourReferralLink}</label>
                  <div className="flex gap-2">
                    <div className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl font-mono text-xs overflow-x-auto whitespace-nowrap">
                      {referralLink}
                    </div>
                    <button
                      onClick={() => handleCopy(referralLink, 'link')}
                      className="px-4 py-3 bg-cyan-glow text-ocean-deep rounded-xl hover:scale-105 transition-transform"
                    >
                      {copied === 'link' ? <Check size={20} /> : <Link2 size={20} />}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Share Content Preview (for non-referral) */}
            {!isReferral && data?.title && (
              <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-bold mb-2">{data.title}</h3>
                {data.description && (
                  <p className="text-sm text-slate-400">{data.description}</p>
                )}
              </div>
            )}

            {/* Share Buttons */}
            <div className="mb-6">
              <label className="text-xs text-slate-500 mb-3 block">{t.shareVia}</label>
              <div className="grid grid-cols-3 gap-3">
                {shareLinks.map(link => (
                  <button
                    key={link.name}
                    onClick={link.onClick}
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 rounded-xl transition-all hover:scale-105",
                      link.color
                    )}
                  >
                    <link.icon size={24} />
                    <span className="text-xs font-medium">{link.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* QR Code Toggle */}
            {isReferral && (
              <div className="border-t border-white/10 pt-6">
                <button
                  onClick={() => setShowQR(!showQR)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <QrCode size={20} />
                  {t.qrCode}
                </button>

                {showQR && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 text-center"
                  >
                    <div className="inline-block p-4 bg-white rounded-xl">
                      {/* Placeholder for QR code - in production use qrcode.react */}
                      <div className="w-48 h-48 bg-gradient-to-br from-cyan-glow to-blue-600 rounded-lg flex items-center justify-center">
                        <QrCode size={120} className="text-white" />
                      </div>
                    </div>
                    <button className="mt-4 flex items-center gap-2 mx-auto text-sm text-cyan-glow hover:underline">
                      <Download size={16} />
                      {t.downloadQR}
                    </button>
                  </motion.div>
                )}
              </div>
            )}

            {/* Telegram Direct Invite (if in Mini App) */}
            {telegramWebApp.isAvailable() && isReferral && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <button
                  onClick={() => {
                    const miniAppLink = generateMiniAppLink('', referralCode);
                    telegramWebApp.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(miniAppLink)}&text=${encodeURIComponent(`${t.inviteFriends}\n\n🎁 Бонус за регистрацию: 200 VOD`)}`);
                  }}
                  className="w-full py-4 bg-[#0088cc] rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                >
                  <Send size={20} />
                  {t.sendInvite}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Invite Card Image Generator (for social sharing)
export function generateInviteCardSVG(
  username: string,
  referralCode: string,
  stats: { level: number; xp: number; vodBalance: number },
  language: 'ru' | 'en' = 'ru'
): string {
  const isRu = language === 'ru';
  
  return `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a1628"/>
      <stop offset="100%" style="stop-color:#1a2744"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#06b6d4"/>
      <stop offset="100%" style="stop-color:#3b82f6"/>
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  
  <!-- Decorative circles -->
  <circle cx="100" cy="530" r="200" fill="#06b6d4" opacity="0.1"/>
  <circle cx="1100" cy="100" r="150" fill="#3b82f6" opacity="0.1"/>
  
  <!-- Logo -->
  <text x="600" y="120" font-family="Arial" font-size="60" font-weight="bold" fill="url(#accent)" text-anchor="middle">💧 VODeco</text>
  
  <!-- Main text -->
  <text x="600" y="220" font-family="Arial" font-size="36" fill="white" text-anchor="middle">
    ${isRu ? 'Присоединяйся к революции!' : 'Join the revolution!'}
  </text>
  
  <!-- User info -->
  <rect x="350" y="280" width="500" height="160" rx="20" fill="rgba(255,255,255,0.05)" stroke="rgba(6,182,212,0.3)" stroke-width="2"/>
  
  <text x="600" y="330" font-family="Arial" font-size="28" fill="white" text-anchor="middle">
    ${isRu ? 'Приглашение от' : 'Invitation from'} ${username}
  </text>
  
  <text x="600" y="380" font-family="Arial" font-size="20" fill="#94a3b8" text-anchor="middle">
    Level ${stats.level} • ${stats.xp} XP • ${stats.vodBalance} VOD
  </text>
  
  <text x="600" y="420" font-family="monospace" font-size="32" fill="#06b6d4" text-anchor="middle">${referralCode}</text>
  
  <!-- Bonus badge -->
  <rect x="450" y="480" width="300" height="60" rx="30" fill="url(#accent)"/>
  <text x="600" y="520" font-family="Arial" font-size="24" fill="#0a1628" font-weight="bold" text-anchor="middle">
    🎁 ${isRu ? 'Бонус 200 VOD' : 'Bonus 200 VOD'}
  </text>
  
  <!-- Footer -->
  <text x="600" y="600" font-family="Arial" font-size="16" fill="#64748b" text-anchor="middle">vodeco.org</text>
</svg>
`;
}


