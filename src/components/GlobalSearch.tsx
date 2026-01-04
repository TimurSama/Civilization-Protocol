"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, X, FileText, Users, Map, Vote, Briefcase, 
  MessageSquare, Target, Award, BarChart3, Droplets,
  ChevronRight, Clock, TrendingUp, Hash, Zap
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

const translations = {
  ru: {
    placeholder: "Поиск по платформе...",
    recentSearches: "Недавние поиски",
    quickLinks: "Быстрые ссылки",
    trending: "В тренде",
    noResults: "Ничего не найдено",
    tryDifferent: "Попробуйте другой запрос",
    pages: "Страницы",
    users: "Пользователи",
    projects: "Проекты",
    discussions: "Обсуждения",
    pressEsc: "ESC для закрытия",
    pressEnter: "Enter для поиска"
  },
  en: {
    placeholder: "Search platform...",
    recentSearches: "Recent searches",
    quickLinks: "Quick links",
    trending: "Trending",
    noResults: "No results found",
    tryDifferent: "Try a different query",
    pages: "Pages",
    users: "Users",
    projects: "Projects",
    discussions: "Discussions",
    pressEsc: "ESC to close",
    pressEnter: "Enter to search"
  },
  ar: {
    placeholder: "البحث في المنصة...",
    recentSearches: "عمليات البحث الأخيرة",
    quickLinks: "روابط سريعة",
    trending: "الشائع",
    noResults: "لم يتم العثور على نتائج",
    tryDifferent: "جرب استعلامًا مختلفًا",
    pages: "الصفحات",
    users: "المستخدمون",
    projects: "المشاريع",
    discussions: "النقاشات",
    pressEsc: "ESC للإغلاق",
    pressEnter: "Enter للبحث"
  }
};

// Search index data
const searchableItems = [
  // Pages
  { type: "page", title: "Dashboard", titleRu: "Панель управления", path: "/dashboard", icon: BarChart3, category: "pages" },
  { type: "page", title: "Map", titleRu: "Карта", path: "/map", icon: Map, category: "pages" },
  { type: "page", title: "DAO Governance", titleRu: "DAO Голосования", path: "/dao", icon: Vote, category: "pages" },
  { type: "page", title: "TokenHub", titleRu: "Проекты", path: "/tokenhub", icon: Briefcase, category: "pages" },
  { type: "page", title: "Social", titleRu: "Социальная сеть", path: "/social", icon: MessageSquare, category: "pages" },
  { type: "page", title: "Missions", titleRu: "Миссии", path: "/missions", icon: Target, category: "pages" },
  { type: "page", title: "Rewards", titleRu: "Награды", path: "/rewards", icon: Award, category: "pages" },
  { type: "page", title: "Nexus Exchange", titleRu: "Биржа Nexus", path: "/nexus", icon: Zap, category: "pages" },
  { type: "page", title: "White Paper", titleRu: "Документация", path: "/whitepaper", icon: FileText, category: "pages" },
  { type: "page", title: "Profile", titleRu: "Профиль", path: "/profile", icon: Users, category: "pages" },
  { type: "page", title: "Interactive Presentation", titleRu: "Интерактивная презентация", path: "/interactive-presentation", icon: Droplets, category: "pages" },
  
  // Cabinets
  { type: "cabinet", title: "Citizen Cabinet", titleRu: "Кабинет гражданина", path: "/cabinets/citizen", icon: Users, category: "cabinets" },
  { type: "cabinet", title: "Government Cabinet", titleRu: "Кабинет правительства", path: "/cabinets/government", icon: Vote, category: "cabinets" },
  { type: "cabinet", title: "Investor Cabinet", titleRu: "Кабинет инвестора", path: "/cabinets/investor", icon: Briefcase, category: "cabinets" },
  { type: "cabinet", title: "Science Cabinet", titleRu: "Научный кабинет", path: "/cabinets/science", icon: Target, category: "cabinets" },
  
  // Projects
  { type: "project", title: "Aral Sea Restoration", titleRu: "Восстановление Аральского моря", path: "/tokenhub/1", icon: Droplets, category: "projects" },
  { type: "project", title: "IoT Sensor Network", titleRu: "Сеть IoT датчиков", path: "/tokenhub/2", icon: Zap, category: "projects" },
  { type: "project", title: "AI Water Analytics", titleRu: "AI аналитика воды", path: "/tokenhub/3", icon: BarChart3, category: "projects" },
  
  // Discussions
  { type: "discussion", title: "DAO Proposal #VOD-124", titleRu: "DAO Предложение #VOD-124", path: "/dao", icon: Vote, category: "discussions" },
  { type: "discussion", title: "Water Crisis 2030", titleRu: "Водный кризис 2030", path: "/social", icon: MessageSquare, category: "discussions" },
];

const trendingSearches = [
  { tag: "#DAO_Voting", count: 234 },
  { tag: "#IoT_Integration", count: 189 },
  { tag: "#WaterCrisis", count: 167 },
  { tag: "#Staking", count: 145 },
];

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.ru;
  
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof searchableItems>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("vodeco_recent_searches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        // Navigate to selected result
        handleResultClick(results[selectedIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  // Search logic
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = searchableItems.filter(item => 
      item.title.toLowerCase().includes(lowerQuery) ||
      item.titleRu.toLowerCase().includes(lowerQuery)
    );
    
    setResults(filtered);
    setSelectedIndex(0);
  }, [query]);

  const handleResultClick = (item: typeof searchableItems[0]) => {
    // Save to recent searches
    const newRecent = [item.title, ...recentSearches.filter(s => s !== item.title)].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem("vodeco_recent_searches", JSON.stringify(newRecent));
    
    onClose();
    // Navigation is handled by Link component
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("vodeco_recent_searches");
  };

  const groupedResults = results.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof searchableItems>);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-[90] flex items-start justify-center pt-[10vh] p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            className="w-full max-w-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="glass-card p-4">
              <div className="flex items-center gap-4">
                <Search className="text-slate-400" size={24} />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder={t.placeholder}
                  className="flex-1 bg-transparent text-lg focus:outline-none placeholder:text-slate-500"
                />
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <kbd className="px-2 py-1 bg-white/5 rounded">ESC</kbd>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg">
                  <X size={20} className="text-slate-400" />
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="mt-2 glass-card p-4 max-h-[60vh] overflow-y-auto">
              {query.length < 2 ? (
                // Show quick links and recent searches
                <div className="space-y-6">
                  {/* Recent searches */}
                  {recentSearches.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-bold text-slate-400 flex items-center gap-2">
                          <Clock size={14} /> {t.recentSearches}
                        </h3>
                        <button 
                          onClick={clearRecentSearches}
                          className="text-xs text-slate-500 hover:text-white"
                        >
                          Clear
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((search, i) => (
                          <button
                            key={i}
                            onClick={() => setQuery(search)}
                            className="px-3 py-1 bg-white/5 rounded-full text-sm hover:bg-white/10"
                          >
                            {search}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Trending */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-400 flex items-center gap-2 mb-3">
                      <TrendingUp size={14} /> {t.trending}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {trendingSearches.map((item, i) => (
                        <button
                          key={i}
                          onClick={() => setQuery(item.tag.replace("#", ""))}
                          className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm hover:bg-cyan-500/20 flex items-center gap-2"
                        >
                          <Hash size={12} /> {item.tag.replace("#", "")}
                          <span className="text-xs text-slate-500">{item.count}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quick links */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-400 mb-3">{t.quickLinks}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {searchableItems.slice(0, 8).map((item, i) => (
                        <Link
                          key={i}
                          href={item.path}
                          onClick={onClose}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                        >
                          <item.icon size={18} className="text-cyan-glow" />
                          <span className="text-sm">
                            {language === "ru" ? item.titleRu : item.title}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : results.length === 0 ? (
                // No results
                <div className="text-center py-8">
                  <Search className="mx-auto mb-4 text-slate-500" size={48} />
                  <p className="text-slate-400">{t.noResults}</p>
                  <p className="text-sm text-slate-500">{t.tryDifferent}</p>
                </div>
              ) : (
                // Show grouped results
                <div className="space-y-4">
                  {Object.entries(groupedResults).map(([category, items]) => (
                    <div key={category}>
                      <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">
                        {t[category as keyof typeof t] || category}
                      </h3>
                      <div className="space-y-1">
                        {items.map((item, i) => {
                          const globalIndex = results.indexOf(item);
                          return (
                            <Link
                              key={i}
                              href={item.path}
                              onClick={() => handleResultClick(item)}
                              className={cn(
                                "flex items-center gap-3 p-3 rounded-lg transition-colors",
                                globalIndex === selectedIndex 
                                  ? "bg-cyan-500/20 border border-cyan-glow/30" 
                                  : "hover:bg-white/5"
                              )}
                            >
                              <item.icon size={18} className="text-cyan-glow flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">
                                  {language === "ru" ? item.titleRu : item.title}
                                </p>
                                <p className="text-xs text-slate-500 truncate">{item.path}</p>
                              </div>
                              <ChevronRight size={16} className="text-slate-500" />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer hints */}
            <div className="mt-2 flex items-center justify-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <kbd className="px-1 bg-white/5 rounded">↑</kbd>
                <kbd className="px-1 bg-white/5 rounded">↓</kbd>
                navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 bg-white/5 rounded">↵</kbd>
                select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-2 bg-white/5 rounded">ESC</kbd>
                close
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}










