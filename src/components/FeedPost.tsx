"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageSquare, Share2, MoreHorizontal, CheckCircle2, Globe, ExternalLink, Bookmark, Flag, Repeat2, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

// Emoji reactions configuration
const REACTIONS = [
  { emoji: "👍", name: "like", label: "Нравится" },
  { emoji: "❤️", name: "love", label: "Люблю" },
  { emoji: "😂", name: "haha", label: "Смешно" },
  { emoji: "😮", name: "wow", label: "Удивлён" },
  { emoji: "😢", name: "sad", label: "Грустно" },
  { emoji: "🔥", name: "fire", label: "Огонь" },
  { emoji: "💧", name: "water", label: "Вода" },
];

interface Reaction {
  emoji: string;
  name: string;
  count: number;
}

interface FeedPostProps {
    id?: string;
    author: {
        name: string;
        handle: string;
        avatar: string;
        verified?: boolean;
    };
    content: {
        text: string;
        image?: string;
        tags?: string | string[];
        link?: {
            url: string;
            label: string;
        };
        mentions?: string[];
    };
    stats: {
        likes: number;
        comments: number;
        shares: number;
        reactions?: Reaction[];
    };
    timestamp: string;
    isLiked?: boolean;
    onLike?: () => void;
    onRepost?: () => void;
    onComment?: () => void;
}

export default function FeedPost({ id, author, content, stats, timestamp, isLiked = false, onLike, onRepost, onComment }: FeedPostProps) {
    const { isRTL } = useLanguage();
    const [liked, setLiked] = useState(isLiked);
    const [likesCount, setLikesCount] = useState(stats.likes);
    const [showMenu, setShowMenu] = useState(false);
    const [saved, setSaved] = useState(false);
    const [showReactions, setShowReactions] = useState(false);
    const [selectedReaction, setSelectedReaction] = useState<string | null>(isLiked ? "👍" : null);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [copied, setCopied] = useState(false);
    const [reactions, setReactions] = useState<Reaction[]>(stats.reactions || [
      { emoji: "👍", name: "like", count: Math.floor(stats.likes * 0.6) },
      { emoji: "❤️", name: "love", count: Math.floor(stats.likes * 0.25) },
      { emoji: "🔥", name: "fire", count: Math.floor(stats.likes * 0.15) },
    ]);
    const reactionsRef = useRef<HTMLDivElement>(null);
    const reactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Close reactions menu when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (reactionsRef.current && !reactionsRef.current.contains(event.target as Node)) {
          setShowReactions(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleReactionHover = () => {
      if (reactionTimeoutRef.current) {
        clearTimeout(reactionTimeoutRef.current);
      }
      setShowReactions(true);
    };

    const handleReactionLeave = () => {
      reactionTimeoutRef.current = setTimeout(() => {
        setShowReactions(false);
      }, 300);
    };

    const handleSelectReaction = (emoji: string) => {
      if (selectedReaction === emoji) {
        // Remove reaction
        setSelectedReaction(null);
        setLiked(false);
        setLikesCount(prev => prev - 1);
        setReactions(prev => prev.map(r => 
          r.emoji === emoji ? { ...r, count: Math.max(0, r.count - 1) } : r
        ));
      } else {
        // Add/change reaction
        if (selectedReaction) {
          // Remove old reaction
          setReactions(prev => prev.map(r => 
            r.emoji === selectedReaction ? { ...r, count: Math.max(0, r.count - 1) } : r
          ));
        } else {
          setLikesCount(prev => prev + 1);
        }
        setSelectedReaction(emoji);
        setLiked(true);
        setReactions(prev => {
          const existing = prev.find(r => r.emoji === emoji);
          if (existing) {
            return prev.map(r => r.emoji === emoji ? { ...r, count: r.count + 1 } : r);
          }
          return [...prev, { emoji, name: REACTIONS.find(r => r.emoji === emoji)?.name || "", count: 1 }];
        });
      }
      setShowReactions(false);
      if (onLike) onLike();
    };

    const handleLike = () => {
        handleSelectReaction("👍");
    };

    const handleCopyLink = () => {
      navigator.clipboard.writeText(`https://vodeco.app/post/${id || '1'}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      setShowShareMenu(false);
    };

    const handleRepost = () => {
      if (onRepost) onRepost();
      setShowShareMenu(false);
    };

    const totalReactions = reactions.reduce((sum, r) => sum + r.count, 0);

    // Нормализуем теги
    const tags = Array.isArray(content.tags) 
        ? content.tags 
        : typeof content.tags === 'string' 
            ? content.tags.split(' ').filter(t => t.startsWith('#')).map(t => t.slice(1))
            : [];

    // Форматирование чисел
    const formatNumber = (num: number): string => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    // Рендеринг текста с @mentions и #hashtags
    const renderTextWithMentionsAndHashtags = (text: string) => {
      const parts = text.split(/(@\w+|#\w+)/g);
      return parts.map((part, index) => {
        if (part.startsWith('@')) {
          const username = part.slice(1);
          return (
            <Link
              key={index}
              href={`/profile/${username}`}
              className="text-cyan-400 hover:text-cyan-300 font-medium"
            >
              {part}
            </Link>
          );
        }
        if (part.startsWith('#')) {
          const tag = part.slice(1);
          return (
            <Link
              key={index}
              href={`/search?tag=${tag}`}
              className="text-cyan-500 hover:text-cyan-400"
            >
              {part}
            </Link>
          );
        }
        return part;
      });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn("glass-card border-white/5 bg-white/[0.02] overflow-hidden", isRTL && "text-right")}
        >
            {/* Header */}
            <div className={cn("p-4 flex items-center justify-between", isRTL && "flex-row-reverse")}>
                <div className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-black border border-white/10">
                        {author.avatar}
                    </div>
                    <div className={cn(isRTL && "text-right")}>
                        <div className={cn("flex items-center gap-1", isRTL && "flex-row-reverse")}>
                            <span className="font-bold text-sm">{author.name}</span>
                            {author.verified && <CheckCircle2 size={14} className="text-cyan-400" />}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">@{author.handle} • {timestamp}</div>
                    </div>
                </div>
                <div className="relative">
                    <button 
                        onClick={() => setShowMenu(!showMenu)}
                        className="text-slate-500 hover:text-white transition-colors p-1"
                    >
                        <MoreHorizontal size={20} />
                    </button>
                    
                    {showMenu && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute right-0 top-full mt-1 w-40 glass rounded-xl border border-white/10 overflow-hidden z-10"
                        >
                            <button 
                                onClick={() => { setSaved(!saved); setShowMenu(false); }}
                                className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-white/5 transition-colors text-sm"
                            >
                                <Bookmark size={14} className={saved ? "text-yellow-400 fill-yellow-400" : ""} />
                                {saved ? 'Сохранено' : 'Сохранить'}
                            </button>
                            <button 
                                onClick={() => setShowMenu(false)}
                                className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-white/5 transition-colors text-sm text-red-400"
                            >
                                <Flag size={14} />
                                Пожаловаться
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="px-4 pb-4">
                <p className="text-sm text-slate-300 leading-relaxed mb-4 whitespace-pre-wrap">
                    {renderTextWithMentionsAndHashtags(content.text)}
                </p>

                {tags.length > 0 && (
                    <div className={cn("flex flex-wrap gap-2 mb-4", isRTL && "flex-row-reverse")}>
                        {tags.map(tag => (
                            <Link
                                key={tag}
                                href={`/search?tag=${tag}`}
                                className="text-[10px] font-black text-cyan-500 uppercase tracking-widest hover:text-cyan-400 transition-colors"
                            >
                                #{tag}
                            </Link>
                        ))}
                    </div>
                )}

                {content.link && (
                    <Link
                        href={content.link.url}
                        className={cn(
                            "flex items-center gap-2 p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/10 text-cyan-400 text-xs font-bold hover:bg-cyan-500/10 transition-all mb-4",
                            isRTL && "flex-row-reverse"
                        )}
                    >
                        <Globe size={14} />
                        {content.link.label}
                        <ExternalLink size={12} className={cn(isRTL ? "mr-auto" : "ml-auto")} />
                    </Link>
                )}
            </div>

            {/* Image */}
            {content.image && (
                <div className="relative aspect-video w-full bg-white/5 border-y border-white/5">
                    <div className="absolute inset-0 flex items-center justify-center text-slate-700">
                        <Globe size={48} className="opacity-20" />
                    </div>
                </div>
            )}

            {/* Reactions summary */}
            {totalReactions > 0 && (
              <div className="px-4 py-2 flex items-center gap-2 text-xs text-slate-400">
                <div className="flex -space-x-1">
                  {reactions.filter(r => r.count > 0).slice(0, 3).map((r, i) => (
                    <span key={r.emoji} className="text-sm" style={{ zIndex: 3 - i }}>{r.emoji}</span>
                  ))}
                </div>
                <span>{formatNumber(totalReactions)}</span>
              </div>
            )}

            {/* Actions */}
            <div className={cn("p-4 flex items-center gap-4 border-t border-white/5", isRTL && "flex-row-reverse")}>
                {/* Reaction button with popup */}
                <div 
                  ref={reactionsRef}
                  className="relative"
                  onMouseEnter={handleReactionHover}
                  onMouseLeave={handleReactionLeave}
                >
                  <button 
                      onClick={handleLike}
                      className={cn(
                          "flex items-center gap-2 transition-colors group px-2 py-1 rounded-lg hover:bg-white/5",
                          selectedReaction ? "text-rose-500" : "text-slate-500 hover:text-rose-500",
                          isRTL && "flex-row-reverse"
                      )}
                  >
                      <motion.div
                          whileTap={{ scale: 1.3 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                          {selectedReaction ? (
                            <span className="text-xl">{selectedReaction}</span>
                          ) : (
                            <Heart size={20} />
                          )}
                      </motion.div>
                      <span className="text-xs font-bold">{formatNumber(likesCount)}</span>
                  </button>

                  {/* Reactions popup */}
                  <AnimatePresence>
                    {showReactions && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="absolute bottom-full left-0 mb-2 glass rounded-full px-2 py-1.5 flex items-center gap-1 border border-white/10 shadow-xl"
                        onMouseEnter={handleReactionHover}
                        onMouseLeave={handleReactionLeave}
                      >
                        {REACTIONS.map((reaction, i) => (
                          <motion.button
                            key={reaction.emoji}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.03 }}
                            whileHover={{ scale: 1.3, y: -5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleSelectReaction(reaction.emoji)}
                            className={cn(
                              "text-2xl p-1 rounded-full transition-colors",
                              selectedReaction === reaction.emoji && "bg-white/10"
                            )}
                            title={reaction.label}
                          >
                            {reaction.emoji}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Comment button */}
                <button 
                  onClick={onComment}
                  className={cn("flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors px-2 py-1 rounded-lg hover:bg-white/5", isRTL && "flex-row-reverse")}
                >
                    <MessageSquare size={20} />
                    <span className="text-xs font-bold">{formatNumber(stats.comments)}</span>
                </button>

                {/* Share/Repost button */}
                <div className="relative">
                  <button 
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className={cn("flex items-center gap-2 text-slate-500 hover:text-emerald-400 transition-colors px-2 py-1 rounded-lg hover:bg-white/5", isRTL && "flex-row-reverse")}
                  >
                      <Share2 size={20} />
                      <span className="text-xs font-bold">{formatNumber(stats.shares)}</span>
                  </button>

                  <AnimatePresence>
                    {showShareMenu && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute bottom-full left-0 mb-2 w-48 glass rounded-xl border border-white/10 overflow-hidden z-20"
                      >
                        <button
                          onClick={handleRepost}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-sm"
                        >
                          <Repeat2 size={16} className="text-emerald-400" />
                          Репост
                        </button>
                        <button
                          onClick={handleCopyLink}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-sm"
                        >
                          {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                          {copied ? "Скопировано!" : "Копировать ссылку"}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bookmark button */}
                <button 
                    onClick={() => setSaved(!saved)}
                    className={cn(
                        "ml-auto flex items-center gap-2 transition-colors px-2 py-1 rounded-lg hover:bg-white/5",
                        saved ? "text-yellow-400" : "text-slate-500 hover:text-yellow-400",
                        isRTL && "ml-0 mr-auto"
                    )}
                >
                    <Bookmark size={20} className={saved ? "fill-yellow-400" : ""} />
                </button>
            </div>
        </motion.div>
    );
}
