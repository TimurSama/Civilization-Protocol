"use client";

import { motion } from "framer-motion";
import FeedPost from "@/components/FeedPost";
import NewsSidebar from "@/components/NewsSidebar";
import { useLanguage } from "@/context/LanguageContext";
import { Plus, TrendingUp, Users, Globe, Zap, Heart, TreePine, FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Globe3D from "@/components/Globe3D";

export default function HomePage() {
  const { t, isRTL } = useLanguage();

  const posts = [
    {
      id: 1,
      author: {
        name: "Civilization Protocol Global",
        handle: "civprotocol_earth",
        avatar: "VE",
        verified: true
      },
      content: {
        text: "🌍 Мы расширяемся! Civilization Protocol теперь — это единая экосистема ценности данных (Value of Data). \n\nМы интегрируем решения в сфере экологии, энергетики, медицины и науки. Теперь в ProjectHub доступны проекты наших партнеров: Regen Network, Power Ledger и Medicalchain. Вместе мы создаем цифровой двойник планеты.",
        tags: ["GlobalExpansion", "ValueOfData", "Ecosystem", "Partnerships"],
        link: {
          url: "/ecology",
          label: "Узнать больше об экосистеме"
        }
      },
      stats: { likes: 5600, comments: 420, shares: 1200 },
      timestamp: "5m"
    },
    {
      id: 2,
      author: {
        name: "Regen Network",
        handle: "regen_network",
        avatar: "RN",
        verified: true
      },
      content: {
        text: "🌿 Рады присоединиться к экосистеме Civilization Protocol! Наши углеродные кредиты теперь доступны для мониторинга на EarthMap. Совместно мы обеспечим прозрачность экологических инициатив по всему миру.",
        tags: ["Ecology", "CarbonCredits", "Partnership"],
        link: {
          url: "/ecology",
          label: "Смотреть в EcologyHub"
        }
      },
      stats: { likes: 3200, comments: 156, shares: 450 },
      timestamp: "1h"
    },
    {
      id: 3,
      author: {
        name: "Nexus Hub",
        handle: "nexus_civprotocol",
        avatar: "NX",
        verified: true
      },
      content: {
        text: "🎁 Новые задания в Nexus! Теперь вы можете получать вознаграждения за вклад в развитие энергетических сетей и медицинских исследований. Проверьте раздел задач!",
        tags: ["Nexus", "Rewards", "Energy", "Health"],
        link: {
          url: "/nexus",
          label: "Перейти к заданиям"
        }
      },
      stats: { likes: 4500, comments: 280, shares: 920 },
      timestamp: "3h"
    },
    {
      id: 4,
      author: {
        name: "Power Ledger",
        handle: "power_ledger",
        avatar: "PL",
        verified: true
      },
      content: {
        text: "⚡ Интеграция с Civilization Protocol Energy Hub завершена! Теперь пользователи могут торговать избыточной солнечной энергией через блокчейн. Первые P2P сделки уже зафиксированы в Центральной Азии.",
        tags: ["Energy", "P2P", "Blockchain", "Integration"],
        link: {
          url: "/energy",
          label: "Подробнее об Energy Hub"
        }
      },
      stats: { likes: 2800, comments: 189, shares: 340 },
      timestamp: "5h"
    },
    {
      id: 5,
      author: {
        name: "Civilization Protocol Science",
        handle: "civprotocol_science",
        avatar: "VS",
        verified: true
      },
      content: {
        text: "🔬 Открыт доступ к Data Lake для научных исследований! Более 2.5TB верифицированных данных о водных ресурсах доступны через OpenData API. Первые публикации с DOI уже в репозитории.",
        tags: ["Science", "OpenData", "Research", "API"],
        link: {
          url: "/science",
          label: "Доступ к данным"
        }
      },
      stats: { likes: 1900, comments: 95, shares: 210 },
      timestamp: "8h"
    },
    {
      id: 6,
      author: {
        name: "DAO Civilization Protocol",
        handle: "dao_civprotocol",
        avatar: "DV",
        verified: true
      },
      content: {
        text: "🗳️ Новое предложение #VOD-125: Модернизация очистных сооружений в Бухаре. Бюджет: 2.5M VOD. Голосование открыто до 15 января. Участвуйте в управлении экосистемой!",
        tags: ["DAO", "Governance", "Infrastructure", "Voting"],
        link: {
          url: "/dao",
          label: "Голосовать"
        }
      },
      stats: { likes: 4200, comments: 320, shares: 680 },
      timestamp: "12h"
    },
    {
      id: 7,
      author: {
        name: "Medicalchain",
        handle: "medicalchain",
        avatar: "MC",
        verified: true
      },
      content: {
        text: "🏥 Партнерство с Civilization Protocol Health: интеграция медицинских данных с экологическим мониторингом. Теперь можно отслеживать связь между качеством воды и здоровьем населения в реальном времени.",
        tags: ["Health", "MedicalData", "Partnership", "Monitoring"],
        link: {
          url: "/health",
          label: "Узнать больше"
        }
      },
      stats: { likes: 3100, comments: 145, shares: 290 },
      timestamp: "1d"
    },
    {
      id: 8,
      author: {
        name: "Civilization Protocol Water",
        handle: "civprotocol_water",
        avatar: "VW",
        verified: true
      },
      content: {
        text: "💧 Запуск пилотного проекта в Узбекистане: 15 насосных станций подключены к IoT сети. Снижение потерь воды на 23% за первый квартал. Данные доступны в реальном времени на EarthMap.",
        tags: ["Water", "IoT", "Pilot", "Uzbekistan"],
        link: {
          url: "/map",
          label: "Смотреть на карте"
        }
      },
      stats: { likes: 6700, comments: 450, shares: 890 },
      timestamp: "1d"
    },
    {
      id: 9,
      author: {
        name: "UN-Water Partnership",
        handle: "un_water",
        avatar: "UN",
        verified: true
      },
      content: {
        text: "🌐 Civilization Protocol присоединился к инициативе UN-Water по достижению SDG 6. Наша платформа будет использоваться для мониторинга прогресса в 12 странах Центральной Азии и Ближнего Востока.",
        tags: ["UN", "SDG6", "Partnership", "Global"],
        link: {
          url: "/whitepaper",
          label: "Читать White Paper"
        }
      },
      stats: { likes: 8900, comments: 520, shares: 1200 },
      timestamp: "2d"
    },
    {
      id: 10,
      author: {
        name: "Civilization Protocol TokenHub",
        handle: "tokenhub",
        avatar: "TH",
        verified: true
      },
      content: {
        text: "💰 Новый проект в TokenHub: Smart Pumping Network (Центральная Азия). Стоимость: $45M, IRR: 18%, Статус: Пилот. Инвестиции открыты для стейкхолдеров с минимальным порогом 10,000 VOD.",
        tags: ["Investment", "TokenHub", "Infrastructure", "IRR"],
        link: {
          url: "/tokenhub",
          label: "Инвестировать"
        }
      },
      stats: { likes: 5400, comments: 380, shares: 720 },
      timestamp: "2d"
    },
    {
      id: 11,
      author: {
        name: "EcoGuard Community",
        handle: "ecoguard",
        avatar: "EG",
        verified: false
      },
      content: {
        text: "🌳 Гражданская инициатива: очистка малых рек Ферганы. Уже собрано 50,000 VOD через DAO. 120 волонтеров зарегистрировались. Присоединяйтесь к экологическому движению!",
        tags: ["Community", "Ecology", "Volunteers", "DAO"],
        link: {
          url: "/groups",
          label: "Присоединиться"
        }
      },
      stats: { likes: 2300, comments: 180, shares: 450 },
      timestamp: "3d"
    },
    {
      id: 12,
      author: {
        name: "Civilization Protocol AI Lab",
        handle: "ai_lab",
        avatar: "AI",
        verified: true
      },
      content: {
        text: "🤖 Новая ML-модель предсказания дефицита воды: точность 94%. Модель обучена на данных 50+ водных бассейнов. Доступна через AI Analytics Engine для всех пользователей платформы.",
        tags: ["AI", "MachineLearning", "Prediction", "Analytics"],
        link: {
          url: "/ai",
          label: "Попробовать AI"
        }
      },
      stats: { likes: 3800, comments: 210, shares: 560 },
      timestamp: "3d"
    },
    {
      id: 13,
      author: {
        name: "Fractalix.lab",
        handle: "fractalix_lab",
        avatar: "FL",
        verified: true
      },
      content: {
        text: "🚀 Civilization Protocol Platform v2.0: новые кабинеты, улучшенный UX, интеграция с TON Network. Обновление доступно для всех пользователей. Проверьте новые функции в вашем профиле!",
        tags: ["Update", "Platform", "TON", "NewFeatures"],
        link: {
          url: "/profile",
          label: "Обновить профиль"
        }
      },
      stats: { likes: 7200, comments: 490, shares: 1100 },
      timestamp: "4d"
    },
    {
      id: 14,
      author: {
        name: "Civilization Protocol Education",
        handle: "Civilization Protocol_edu",
        avatar: "ED",
        verified: true
      },
      content: {
        text: "📚 Запуск образовательной платформы: курсы по устойчивому водопользованию, блокчейн-технологиям и DAO-управлению. Первые 1000 студентов получат NFT-сертификаты.",
        tags: ["Education", "Courses", "NFT", "Certificates"],
        link: {
          url: "/education",
          label: "Записаться на курс"
        }
      },
      stats: { likes: 2900, comments: 165, shares: 380 },
      timestamp: "5d"
    },
    {
      id: 15,
      author: {
        name: "Civilization Protocol Gaming",
        handle: "Civilization Protocol_gaming",
        avatar: "VG",
        verified: true
      },
      content: {
        text: "🎮 Новый квест в Gaming Hub: 'Спаси Аральское море'. Выполняйте задания, собирайте NFT-награды и вносите реальный вклад в восстановление экосистемы. Топ-100 игроков получат VOD токены!",
        tags: ["Gaming", "Quest", "NFT", "Rewards"],
        link: {
          url: "/gaming",
          label: "Начать квест"
        }
      },
      stats: { likes: 4100, comments: 280, shares: 650 },
      timestamp: "6d"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className={cn("grid grid-cols-1 lg:grid-cols-12 gap-8", isRTL && "direction-rtl")}>
        {/* Left Sidebar - Navigation & Profile Quick View */}
        <div className={cn("hidden lg:block lg:col-span-3 space-y-6", isRTL && "order-last")}>
          <div className="glass-card overflow-hidden border-white/5 bg-white/[0.01] h-[300px] relative group">
            <div className="absolute inset-0 z-0">
              <Globe3D />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-transparent to-transparent z-10" />
            <div className="absolute bottom-4 left-6 z-20">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 mb-1">Live Earth Monitor</div>
              <div className="text-xs font-mono text-slate-500">v1.0.4-stable</div>
            </div>
          </div>

          <div className="glass-card p-6 border-white/5 bg-white/[0.01]">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl font-black mb-4 shadow-xl shadow-cyan-500/20">
                FL
              </div>
              <h3 className="font-black text-lg">Fractalix.lab</h3>
              <p className="text-xs text-slate-500 font-mono">@fractalix_lab</p>
            </div>
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-white/5 mb-6">
              <div className="text-center">
                <div className="text-sm font-black">12.4k</div>
                <div className="text-[10px] text-slate-600 uppercase font-black">{t("common.followers")}</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-black">850</div>
                <div className="text-[10px] text-slate-600 uppercase font-black">{t("common.following")}</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-black">156</div>
                <div className="text-[10px] text-slate-600 uppercase font-black">Посты</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 py-4 border-b border-white/5 mb-6">
              <div className="text-center">
                <div className="text-sm font-black text-cyan-400">8.7k</div>
                <div className="text-[10px] text-slate-600 uppercase font-black">VOD токены</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-black text-emerald-400">Gold</div>
                <div className="text-[10px] text-slate-600 uppercase font-black">Рейтинг</div>
              </div>
            </div>
            <Link href="/profile" className="w-full py-3 glass border-white/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/5 transition-all block text-center">
              {t("common.view_profile")}
            </Link>
          </div>

          <div className="space-y-2">
            {[
              { icon: Globe, label: t("common.explore"), active: true, href: "/" },
              { icon: TreePine, label: t("nav.ecology"), active: false, href: "/ecology" },
              { icon: Zap, label: t("nav.energy"), active: false, href: "/energy" },
              { icon: Heart, label: t("nav.health"), active: false, href: "/health" },
              { icon: FlaskConical, label: t("nav.science"), active: false, href: "/science" },
            ].map(item => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all",
                  isRTL && "flex-row-reverse",
                  item.active ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "text-slate-500 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon size={20} />
                <span className="font-black text-sm uppercase tracking-widest">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Main Feed */}
        <div className="lg:col-span-6 space-y-6">
          {/* Create Post Placeholder */}
          <div className={cn("glass-card p-4 border-white/5 bg-white/[0.02] flex items-center gap-4", isRTL && "flex-row-reverse")}>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xs font-black shrink-0">
              FL
            </div>
            <div className={cn("flex-1 bg-white/5 rounded-2xl px-6 py-3 text-slate-500 text-sm cursor-text hover:bg-white/10 transition-all", isRTL && "text-right")}>
              {t("common.what_new")}
            </div>
            <button className="p-3 bg-cyan-500 text-ocean-deep rounded-xl hover:scale-110 transition-all shadow-lg shadow-cyan-500/20">
              <Plus size={20} />
            </button>
          </div>

          {/* Feed */}
          <div className="space-y-6">
            {posts.map(post => (
              <FeedPost key={post.id} {...post} />
            ))}
          </div>
        </div>

        {/* Right Sidebar - News & Trends */}
        <div className={cn("hidden lg:block lg:col-span-3", isRTL && "order-first")}>
          <NewsSidebar />
        </div>
      </div>
    </div>
  );
}
