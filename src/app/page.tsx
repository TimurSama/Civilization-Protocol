"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FeedPost from "@/components/FeedPost";
import NewsSidebar from "@/components/NewsSidebar";
import CreatePostModal from "@/components/CreatePostModal";
import Stories from "@/components/Stories";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { usePosts } from "@/hooks/useApi";
import { Plus, TrendingUp, Users, Globe, Zap, Heart, TreePine, FlaskConical, Loader2, RefreshCw, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Globe3D from "@/components/Globe3D";

interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    role: string;
    verified: boolean;
    isPioneer: boolean;
  };
  content: string;
  tags: string[];
  type: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  viewsCount: number;
  isLiked: boolean;
  createdAt: string;
}

export default function HomePage() {
  const { t, isRTL } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const { getPosts, likePost, loading: postsLoading } = usePosts();
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Демо-посты для показа когда нет постов в БД
  const demoPosts = [
    {
      id: "demo-1",
      author: {
        name: "VODeco Global",
        handle: "vodeco_earth",
        avatar: "VE",
        verified: true
      },
      content: {
        text: "🌍 Добро пожаловать в VODeco! Мы создаём децентрализованную платформу для управления водными ресурсами планеты. Присоединяйтесь к @dao_vod и станьте частью революции в области устойчивого развития! #VODeco #DAO",
        tags: "#VODeco #Water #Sustainability #DAO",
        link: { url: "/whitepaper", label: "Читать White Paper" }
      },
      stats: { likes: 5600, comments: 420, shares: 1200 },
      timestamp: "5m"
    },
    {
      id: "demo-2",
      author: {
        name: "DAO VOD",
        handle: "dao_vod",
        avatar: "DV",
        verified: true
      },
      content: {
        text: "🗳️ Новое предложение в DAO! Финансирование системы мониторинга качества воды реки Нева совместно с @EcoGuard и @WaterLab. Голосование открыто! Спасибо @alex_tech за подготовку документации. #DAO #Voting",
        tags: "#DAO #Voting #Water #Governance",
        link: { url: "/dao", label: "Голосовать" }
      },
      stats: { likes: 3200, comments: 156, shares: 450 },
      timestamp: "1h"
    },
    {
      id: "demo-3",
      author: {
        name: "TokenHub",
        handle: "tokenhub_vod",
        avatar: "TH",
        verified: true
      },
      content: {
        text: "💰 Новый проект на TokenHub: «Восстановление Аральского моря». ESG-рейтинг: 98. Инвестируйте в будущее водных ресурсов и получайте R-VOD токены.",
        tags: "#TokenHub #Investment #ESG #AralSea",
        link: { url: "/tokenhub", label: "Инвестировать" }
      },
      stats: { likes: 4500, comments: 280, shares: 920 },
      timestamp: "3h"
    },
    {
      id: "demo-4",
      author: {
        name: "VOD Check",
        handle: "vodcheck",
        avatar: "VC",
        verified: true
      },
      content: {
        text: "📊 Новые данные: качество воды в регионах Европы улучшилось на 12% за последний квартал! Спасибо всем участникам программы гражданского мониторинга.",
        tags: "#VODCheck #WaterQuality #Monitoring #Europe",
        link: { url: "/vodcheck", label: "Смотреть данные" }
      },
      stats: { likes: 2800, comments: 189, shares: 340 },
      timestamp: "5h"
    },
    {
      id: "demo-5",
      author: {
        name: "VODeco Science",
        handle: "vodeco_science",
        avatar: "VS",
        verified: true
      },
      content: {
        text: "🔬 Исследование: AI-модель VODeco предсказала потенциальный кризис качества воды в Юго-Восточной Азии за 45 дней до события. Точность прогноза — 94%.",
        tags: "#AI #Science #Prediction #WaterCrisis",
        link: { url: "/science", label: "Читать исследование" }
      },
      stats: { likes: 1900, comments: 95, shares: 210 },
      timestamp: "8h"
    },
    {
      id: "demo-6",
      author: {
        name: "Nexus Exchange",
        handle: "nexus_vod",
        avatar: "NX",
        verified: true
      },
      content: {
        text: "🔄 Стейкинг VOD теперь доступен! APY до 25% в пуле Governance. Застейкайте токены и получите право голоса в DAO с увеличенным весом.",
        tags: "#Staking #Nexus #VOD #APY",
        link: { url: "/nexus", label: "Начать стейкинг" }
      },
      stats: { likes: 3200, comments: 245, shares: 580 },
      timestamp: "12h"
    },
    {
      id: "demo-7",
      author: {
        name: "UN-Water Partnership",
        handle: "un_water",
        avatar: "UN",
        verified: true
      },
      content: {
        text: "🤝 VODeco официально признана UN-Water как инновационная платформа для достижения SDG 6 (Чистая вода и санитария). Это огромный шаг вперёд!",
        tags: "#UN #SDG6 #Partnership #CleanWater",
        link: { url: "/whitepaper", label: "Читать White Paper" }
      },
      stats: { likes: 8900, comments: 520, shares: 1200 },
      timestamp: "1d"
    },
    {
      id: "demo-8",
      author: {
        name: "Fractalix.lab",
        handle: "fractalix_lab",
        avatar: "FL",
        verified: true
      },
      content: {
        text: "🚀 Версия 2.0 платформы VODeco запущена! Новые функции: социальная сеть, расширенная аналитика, мобильное приложение VOD Check, улучшенный UI/UX.",
        tags: "#Release #VODeco #Platform #Update",
        link: { url: "/", label: "Обновить профиль" }
      },
      stats: { likes: 7200, comments: 490, shares: 1100 },
      timestamp: "2d"
    }
  ];

  const loadPosts = useCallback(async () => {
    try {
      const result = await getPosts();
      if (result && result.posts && result.posts.length > 0) {
        setPosts(result.posts);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  }, [getPosts]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadPosts();
    setRefreshing(false);
  };

  const handleLike = async (postId: string) => {
    const result = await likePost(postId);
    if (result) {
      setPosts(prev => prev.map(p => 
        p.id === postId 
          ? { 
              ...p, 
              isLiked: result.liked, 
              likesCount: result.liked ? p.likesCount + 1 : p.likesCount - 1 
            } 
          : p
      ));
    }
  };

  const handlePostCreated = () => {
    loadPosts();
  };

  // Форматируем посты из БД для отображения
  const formatDbPost = (post: Post) => ({
    id: post.id,
    author: {
      name: post.author.name,
      handle: post.author.name.toLowerCase().replace(/\s/g, '_'),
      avatar: post.author.avatar || post.author.name.slice(0, 2).toUpperCase(),
      verified: post.author.verified
    },
    content: {
      text: post.content,
      tags: post.tags?.map(t => `#${t}`).join(' ') || '',
    },
    stats: { 
      likes: post.likesCount, 
      comments: post.commentsCount, 
      shares: post.sharesCount || 0 
    },
    timestamp: formatTimestamp(post.createdAt),
    isLiked: post.isLiked,
    onLike: () => handleLike(post.id)
  });

  // Форматирование времени
  const formatTimestamp = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    return `${diffDays}d`;
  };

  // Используем посты из БД если есть, иначе демо
  const displayPosts = posts.length > 0 
    ? posts.map(formatDbPost)
    : demoPosts;

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
              <div className="text-xs font-mono text-slate-500">v2.0.0-beta</div>
            </div>
          </div>

          <div className="glass-card p-6 border-white/5 bg-white/[0.01]">
            {isAuthenticated && user ? (
              <>
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl font-black mb-4 shadow-xl shadow-cyan-500/20">
                    {user.avatar || user.name.slice(0, 2).toUpperCase()}
                  </div>
                  <h3 className="font-black text-lg flex items-center gap-2">
                    {user.name}
                    {user.isPioneer && <span className="text-yellow-400">🏆</span>}
                    {user.verified && <span className="text-water-400 text-sm">✓</span>}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">@{user.email?.split('@')[0] || 'user'}</p>
                  <div className="mt-2 px-2 py-0.5 rounded-full bg-water-500/20 text-water-400 text-[10px] font-bold uppercase">
                    {user.role === 'citizen' ? 'Гражданин' : user.role}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 py-4 border-y border-white/5 mb-6">
                  <div className="text-center">
                    <div className="text-sm font-black">{user.level}</div>
                    <div className="text-[10px] text-slate-600 uppercase font-black">Уровень</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-black">{user.xp}</div>
                    <div className="text-[10px] text-slate-600 uppercase font-black">XP</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-black">{user.reputation}</div>
                    <div className="text-[10px] text-slate-600 uppercase font-black">Репутация</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 py-4 border-b border-white/5 mb-6">
                  <div className="text-center">
                    <div className="text-sm font-black text-cyan-400">{user.vodBalance.toFixed(0)}</div>
                    <div className="text-[10px] text-slate-600 uppercase font-black">VOD</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-black text-emerald-400">{user.stakedAmount.toFixed(0)}</div>
                    <div className="text-[10px] text-slate-600 uppercase font-black">Staked</div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-2xl font-black mb-4">
                    ?
                  </div>
                  <h3 className="font-black text-lg">Гость</h3>
                  <p className="text-xs text-slate-500 mt-2">Войдите для полного доступа</p>
                </div>
                <div className="grid grid-cols-3 gap-4 py-4 border-y border-white/5 mb-6">
                  <div className="text-center">
                    <div className="text-sm font-black">-</div>
                    <div className="text-[10px] text-slate-600 uppercase font-black">{t("common.followers")}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-black">-</div>
                    <div className="text-[10px] text-slate-600 uppercase font-black">{t("common.following")}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-black">-</div>
                    <div className="text-[10px] text-slate-600 uppercase font-black">{t("common.posts")}</div>
                  </div>
                </div>
              </>
            )}
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
          {/* Stories */}
          <Stories />

          {/* Create Post */}
          <div className={cn("glass-card p-4 border-white/5 bg-white/[0.02] flex items-center gap-4", isRTL && "flex-row-reverse")}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-water-400 to-water-600 flex items-center justify-center text-xs font-black shrink-0">
              {isAuthenticated && user ? (user.avatar || user.name.slice(0, 2).toUpperCase()) : '?'}
            </div>
            <button 
              onClick={() => isAuthenticated ? setIsCreateModalOpen(true) : null}
              className={cn(
                "flex-1 bg-white/5 rounded-2xl px-6 py-3 text-slate-500 text-sm text-left hover:bg-white/10 transition-all",
                isRTL && "text-right",
                !isAuthenticated && "cursor-not-allowed opacity-50"
              )}
            >
              {isAuthenticated ? t("common.what_new") : "Войдите, чтобы публиковать"}
            </button>
            <button 
              onClick={() => isAuthenticated ? setIsCreateModalOpen(true) : null}
              disabled={!isAuthenticated}
              className="p-3 bg-cyan-500 text-ocean-deep rounded-xl hover:scale-110 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Plus size={20} />
            </button>
          </div>

          {/* Refresh Button */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-slate-500">
              {posts.length > 0 ? `${posts.length} постов из базы данных` : 'Демо-контент'}
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-white/10 transition-all disabled:opacity-50"
            >
              <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
              Обновить
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 size={32} className="animate-spin text-water-400" />
            </div>
          )}

          {/* Feed */}
          {!loading && (
            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {displayPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: Math.min(index * 0.05, 0.3) }}
                  >
                    <FeedPost {...post} />
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Load More Trigger / End of Feed */}
              {displayPosts.length > 0 && (
                <div className="py-8 flex flex-col items-center gap-4">
                  {displayPosts.length >= 10 ? (
                    <>
                      <button
                        onClick={handleRefresh}
                        className="flex items-center gap-2 px-6 py-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                      >
                        <ChevronDown size={18} />
                        Загрузить ещё
                      </button>
                      <p className="text-xs text-slate-600">
                        Показано {displayPosts.length} публикаций
                      </p>
                    </>
                  ) : (
                    <div className="text-center">
                      <div className="w-12 h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mx-auto mb-4" />
                      <p className="text-xs text-slate-600">
                        Вы дошли до конца ленты
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Sidebar - News & Trends */}
        <div className={cn("hidden lg:block lg:col-span-3", isRTL && "order-first")}>
          <NewsSidebar />
        </div>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onPostCreated={handlePostCreated}
      />
    </div>
  );
}
