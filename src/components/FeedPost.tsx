"use client";

import { motion } from "framer-motion";
import { Heart, MessageSquare, Share2, MoreHorizontal, CheckCircle2, Globe, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface FeedPostProps {
    author: {
        name: string;
        handle: string;
        avatar: string;
        verified?: boolean;
    };
    content: {
        text: string;
        image?: string;
        tags?: string[];
        link?: {
            url: string;
            label: string;
        };
    };
    stats: {
        likes: number;
        comments: number;
        shares: number;
    };
    timestamp: string;
}

export default function FeedPost({ author, content, stats, timestamp }: FeedPostProps) {
    const { isRTL } = useLanguage();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn("glass-card border-white/5 bg-white/[0.02] overflow-hidden mb-6", isRTL && "text-right")}
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
                <button className="text-slate-500 hover:text-white transition-colors">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            {/* Content */}
            <div className="px-4 pb-4">
                <p className="text-sm text-slate-300 leading-relaxed mb-4 whitespace-pre-wrap">
                    {content.text}
                </p>

                {content.tags && (
                    <div className={cn("flex flex-wrap gap-2 mb-4", isRTL && "flex-row-reverse")}>
                        {content.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {content.link && (
                    <a
                        href={content.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            "flex items-center gap-2 p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/10 text-cyan-400 text-xs font-bold hover:bg-cyan-500/10 transition-all mb-4",
                            isRTL && "flex-row-reverse"
                        )}
                    >
                        <Globe size={14} />
                        {content.link.label}
                        <ExternalLink size={12} className={cn(isRTL ? "mr-auto" : "ml-auto")} />
                    </a>
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

            {/* Actions */}
            <div className={cn("p-4 flex items-center gap-6 border-t border-white/5", isRTL && "flex-row-reverse")}>
                <button className={cn("flex items-center gap-2 text-slate-500 hover:text-rose-500 transition-colors group", isRTL && "flex-row-reverse")}>
                    <Heart size={20} className="group-active:scale-125 transition-transform" />
                    <span className="text-xs font-bold">{stats.likes}</span>
                </button>
                <button className={cn("flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors", isRTL && "flex-row-reverse")}>
                    <MessageSquare size={20} />
                    <span className="text-xs font-bold">{stats.comments}</span>
                </button>
                <button className={cn("flex items-center gap-2 text-slate-500 hover:text-emerald-400 transition-colors", isRTL && "flex-row-reverse")}>
                    <Share2 size={20} />
                    <span className="text-xs font-bold">{stats.shares}</span>
                </button>
            </div>
        </motion.div>
    );
}
