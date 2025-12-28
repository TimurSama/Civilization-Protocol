"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, X, ChevronLeft, ChevronRight, Eye, Heart, 
  MessageCircle, Send, Pause, Play, Volume2, VolumeX,
  Droplets, Globe, Target, Zap, CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

interface Story {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    verified?: boolean;
  };
  slides: {
    id: string;
    type: "text" | "image" | "announcement";
    content: string;
    background?: string;
    link?: { url: string; label: string };
  }[];
  viewers: number;
  createdAt: Date;
  expiresAt: Date;
  seen?: boolean;
}

// Demo stories data
const demoStories: Story[] = [
  {
    id: "1",
    author: { id: "1", name: "VODeco", avatar: "VE", verified: true },
    slides: [
      { 
        id: "1-1", 
        type: "announcement", 
        content: "🚀 Запуск бета-версии платформы! Первые 10,000 пользователей получат статус Pioneer",
        background: "from-cyan-600 to-blue-700",
        link: { url: "/landing", label: "Зарегистрироваться" }
      },
      { 
        id: "1-2", 
        type: "text", 
        content: "💧 Уже 50+ IoT датчиков подключено к платформе в Центральной Азии",
        background: "from-emerald-600 to-cyan-700"
      }
    ],
    viewers: 2345,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000),
    seen: false
  },
  {
    id: "2",
    author: { id: "2", name: "DAO VOD", avatar: "DV", verified: true },
    slides: [
      { 
        id: "2-1", 
        type: "announcement", 
        content: "🗳️ Голосование #VOD-125 открыто! Решаем судьбу проекта мониторинга Каспия",
        background: "from-purple-600 to-pink-600",
        link: { url: "/dao", label: "Голосовать" }
      }
    ],
    viewers: 1567,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + 20 * 60 * 60 * 1000),
    seen: false
  },
  {
    id: "3",
    author: { id: "3", name: "Alex Tech", avatar: "AT", verified: true },
    slides: [
      { 
        id: "3-1", 
        type: "text", 
        content: "Сегодня провели калибровку 15 датчиков на Иссык-Куле. Данные уже в системе! 📊",
        background: "from-amber-600 to-orange-600"
      },
      { 
        id: "3-2", 
        type: "text", 
        content: "Качество воды улучшилось на 12% за последний месяц благодаря новым очистным сооружениям",
        background: "from-green-600 to-emerald-600"
      }
    ],
    viewers: 890,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + 18 * 60 * 60 * 1000),
    seen: true
  },
  {
    id: "4",
    author: { id: "4", name: "EcoGuard", avatar: "EG", verified: true },
    slides: [
      { 
        id: "4-1", 
        type: "text", 
        content: "⚠️ Обнаружено превышение нормы тяжёлых металлов в точке мониторинга #47. Отчёт отправлен.",
        background: "from-red-600 to-rose-600"
      }
    ],
    viewers: 456,
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + 16 * 60 * 60 * 1000),
    seen: true
  },
  {
    id: "5",
    author: { id: "5", name: "WaterLab", avatar: "WL", verified: true },
    slides: [
      { 
        id: "5-1", 
        type: "announcement", 
        content: "📚 Новый курс в VODeco Academy: 'IoT мониторинг водных ресурсов'. Бесплатно!",
        background: "from-indigo-600 to-purple-600",
        link: { url: "/missions", label: "Начать обучение" }
      }
    ],
    viewers: 1234,
    createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + 14 * 60 * 60 * 1000),
    seen: false
  }
];

const translations = {
  ru: {
    yourStory: "Ваша история",
    addStory: "Добавить",
    viewers: "просмотров",
    reply: "Ответить...",
    send: "Отправить",
    hoursLeft: "ч. осталось",
    createStory: "Создать историю",
    storyText: "Текст истории",
    publish: "Опубликовать"
  },
  en: {
    yourStory: "Your story",
    addStory: "Add story",
    viewers: "viewers",
    reply: "Reply...",
    send: "Send",
    hoursLeft: "h left",
    createStory: "Create story",
    storyText: "Story text",
    publish: "Publish"
  },
  ar: {
    yourStory: "قصتك",
    addStory: "إضافة",
    viewers: "مشاهدات",
    reply: "رد...",
    send: "إرسال",
    hoursLeft: "ساعة متبقية",
    createStory: "إنشاء قصة",
    storyText: "نص القصة",
    publish: "نشر"
  }
};

const backgroundOptions = [
  "from-cyan-600 to-blue-700",
  "from-purple-600 to-pink-600",
  "from-emerald-600 to-cyan-700",
  "from-amber-600 to-orange-600",
  "from-red-600 to-rose-600",
  "from-indigo-600 to-purple-600",
  "from-green-600 to-emerald-600",
];

export default function Stories() {
  const { user, isAuthenticated } = useAuth();
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.ru;
  
  const [stories, setStories] = useState<Story[]>(demoStories);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newStoryText, setNewStoryText] = useState("");
  const [selectedBackground, setSelectedBackground] = useState(backgroundOptions[0]);
  const [replyText, setReplyText] = useState("");
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const SLIDE_DURATION = 5000; // 5 seconds per slide

  // Auto-progress for story slides
  useEffect(() => {
    if (!selectedStory || isPaused) return;

    progressIntervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          // Move to next slide or close
          if (currentSlideIndex < selectedStory.slides.length - 1) {
            setCurrentSlideIndex(i => i + 1);
            return 0;
          } else {
            // Move to next story or close
            const currentIndex = stories.findIndex(s => s.id === selectedStory.id);
            if (currentIndex < stories.length - 1) {
              setSelectedStory(stories[currentIndex + 1]);
              setCurrentSlideIndex(0);
              return 0;
            } else {
              setSelectedStory(null);
              return 0;
            }
          }
        }
        return prev + (100 / (SLIDE_DURATION / 100));
      });
    }, 100);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [selectedStory, isPaused, currentSlideIndex, stories]);

  const openStory = (story: Story) => {
    setSelectedStory(story);
    setCurrentSlideIndex(0);
    setProgress(0);
    // Mark as seen
    setStories(prev => prev.map(s => 
      s.id === story.id ? { ...s, seen: true } : s
    ));
  };

  const nextSlide = () => {
    if (!selectedStory) return;
    if (currentSlideIndex < selectedStory.slides.length - 1) {
      setCurrentSlideIndex(i => i + 1);
      setProgress(0);
    } else {
      const currentIndex = stories.findIndex(s => s.id === selectedStory.id);
      if (currentIndex < stories.length - 1) {
        openStory(stories[currentIndex + 1]);
      } else {
        setSelectedStory(null);
      }
    }
  };

  const prevSlide = () => {
    if (!selectedStory) return;
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(i => i - 1);
      setProgress(0);
    } else {
      const currentIndex = stories.findIndex(s => s.id === selectedStory.id);
      if (currentIndex > 0) {
        openStory(stories[currentIndex - 1]);
      }
    }
  };

  const handleCreateStory = () => {
    if (!newStoryText.trim() || !user) return;
    
    const newStory: Story = {
      id: `user-${Date.now()}`,
      author: {
        id: user.id,
        name: user.name,
        avatar: user.avatar || user.name.slice(0, 2).toUpperCase(),
        verified: user.verified
      },
      slides: [{
        id: `user-${Date.now()}-1`,
        type: "text",
        content: newStoryText,
        background: selectedBackground
      }],
      viewers: 0,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      seen: true
    };

    setStories([newStory, ...stories]);
    setNewStoryText("");
    setShowCreateModal(false);
  };

  const getTimeLeft = (expiresAt: Date) => {
    const hours = Math.max(0, Math.floor((expiresAt.getTime() - Date.now()) / (1000 * 60 * 60)));
    return hours;
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Stories Row */}
      <div className="relative mb-6">
        <div 
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Add Story Button */}
          {isAuthenticated && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateModal(true)}
              className="flex-shrink-0 flex flex-col items-center gap-2"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-2 border-dashed border-cyan-500/50 flex items-center justify-center hover:border-cyan-400 transition-colors">
                <Plus size={24} className="text-cyan-400" />
              </div>
              <span className="text-[10px] text-slate-400">{t.addStory}</span>
            </motion.button>
          )}

          {/* Story Circles */}
          {stories.map((story) => (
            <motion.button
              key={story.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openStory(story)}
              className="flex-shrink-0 flex flex-col items-center gap-2"
            >
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center text-lg font-bold relative",
                story.seen 
                  ? "bg-gradient-to-br from-slate-600 to-slate-700" 
                  : "bg-gradient-to-br from-cyan-500 to-blue-600"
              )}>
                {/* Ring for unseen */}
                {!story.seen && (
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-cyan-400 ring-offset-2 ring-offset-ocean-deep animate-pulse" />
                )}
                {story.author.avatar}
                {story.author.verified && (
                  <CheckCircle2 size={12} className="absolute -bottom-1 -right-1 text-cyan-400 bg-ocean-deep rounded-full" />
                )}
              </div>
              <span className="text-[10px] text-slate-400 max-w-16 truncate">{story.author.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Scroll buttons */}
        {stories.length > 5 && (
          <>
            <button 
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-ocean-deep/80 rounded-full flex items-center justify-center text-white hover:bg-ocean-medium transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-ocean-deep/80 rounded-full flex items-center justify-center text-white hover:bg-ocean-medium transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      {/* Story Viewer Modal */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[100] flex items-center justify-center"
            onClick={() => setSelectedStory(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-md h-full max-h-[85vh] mx-4"
              onClick={e => e.stopPropagation()}
            >
              {/* Progress bars */}
              <div className="absolute top-4 left-4 right-4 flex gap-1 z-20">
                {selectedStory.slides.map((_, i) => (
                  <div key={i} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white transition-all duration-100"
                      style={{ 
                        width: i < currentSlideIndex ? "100%" : 
                               i === currentSlideIndex ? `${progress}%` : "0%"
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Header */}
              <div className="absolute top-8 left-4 right-4 flex items-center justify-between z-20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-sm font-bold">
                    {selectedStory.author.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-sm">{selectedStory.author.name}</span>
                      {selectedStory.author.verified && <CheckCircle2 size={12} className="text-cyan-400" />}
                    </div>
                    <span className="text-xs text-white/60">
                      {getTimeLeft(selectedStory.expiresAt)} {t.hoursLeft}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsPaused(!isPaused)}
                    className="p-2 hover:bg-white/10 rounded-full"
                  >
                    {isPaused ? <Play size={20} /> : <Pause size={20} />}
                  </button>
                  <button 
                    onClick={() => setSelectedStory(null)}
                    className="p-2 hover:bg-white/10 rounded-full"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Story Content */}
              <div 
                className={cn(
                  "absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br",
                  selectedStory.slides[currentSlideIndex].background || "from-cyan-600 to-blue-700"
                )}
              >
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <p className="text-xl md:text-2xl font-bold text-center leading-relaxed">
                    {selectedStory.slides[currentSlideIndex].content}
                  </p>
                </div>

                {/* Link button */}
                {selectedStory.slides[currentSlideIndex].link && (
                  <Link
                    href={selectedStory.slides[currentSlideIndex].link!.url}
                    className="absolute bottom-24 left-1/2 -translate-x-1/2 px-6 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform"
                    onClick={() => setSelectedStory(null)}
                  >
                    {selectedStory.slides[currentSlideIndex].link!.label}
                  </Link>
                )}

                {/* Navigation areas */}
                <div 
                  className="absolute left-0 top-0 w-1/3 h-full cursor-pointer"
                  onClick={prevSlide}
                />
                <div 
                  className="absolute right-0 top-0 w-1/3 h-full cursor-pointer"
                  onClick={nextSlide}
                />
              </div>

              {/* Footer - Viewers & Reply */}
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <div className="flex items-center gap-2 mb-3 text-white/60 text-sm">
                  <Eye size={16} />
                  <span>{selectedStory.viewers.toLocaleString()} {t.viewers}</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    placeholder={t.reply}
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-full text-sm focus:outline-none focus:border-white/40"
                    onFocus={() => setIsPaused(true)}
                    onBlur={() => setIsPaused(false)}
                  />
                  <button className="p-3 bg-white/10 rounded-full hover:bg-white/20">
                    <Heart size={20} />
                  </button>
                  <button className="p-3 bg-cyan-500 rounded-full hover:bg-cyan-400">
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Story Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card p-6 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">{t.createStory}</h2>
                <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-white/5 rounded-lg">
                  <X size={20} />
                </button>
              </div>

              {/* Preview */}
              <div className={cn(
                "aspect-[9/16] max-h-64 rounded-xl mb-4 flex items-center justify-center p-6 bg-gradient-to-br",
                selectedBackground
              )}>
                <p className="text-lg font-bold text-center">
                  {newStoryText || t.storyText}
                </p>
              </div>

              {/* Background selector */}
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {backgroundOptions.map(bg => (
                  <button
                    key={bg}
                    onClick={() => setSelectedBackground(bg)}
                    className={cn(
                      "w-10 h-10 rounded-lg flex-shrink-0 bg-gradient-to-br transition-all",
                      bg,
                      selectedBackground === bg && "ring-2 ring-white ring-offset-2 ring-offset-ocean-deep"
                    )}
                  />
                ))}
              </div>

              {/* Text input */}
              <textarea
                value={newStoryText}
                onChange={e => setNewStoryText(e.target.value)}
                placeholder={t.storyText}
                maxLength={280}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl resize-none h-24 focus:outline-none focus:border-cyan-500/50"
              />
              <div className="text-right text-xs text-slate-500 mt-1">
                {newStoryText.length}/280
              </div>

              <button
                onClick={handleCreateStory}
                disabled={!newStoryText.trim()}
                className="w-full mt-4 py-3 bg-cyan-glow text-ocean-deep font-bold rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
              >
                {t.publish}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}



