"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MessageSquare, Search, Send,
    MoreVertical, Phone, Video,
    User, Shield, CheckCheck,
    Image as ImageIcon, Paperclip,
    Smile, Mic
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface Chat {
    id: number;
    name: string;
    lastMessage: string;
    time: string;
    unread: number;
    avatar: string;
    status: 'online' | 'offline';
    isVerified: boolean;
}

interface Message {
    id: number;
    text: string;
    time: string;
    sender: 'me' | 'them';
    status: 'sent' | 'delivered' | 'read';
}

export default function MessagesPage() {
    const { t, isRTL } = useLanguage();
    const [selectedChat, setSelectedChat] = useState<number>(1);
    const [messageInput, setMessageInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState<'all' | 'unread' | 'groups'>('all');

    const filteredChats = chats.filter(chat => {
        const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterType === 'all' || 
            (filterType === 'unread' && chat.unread > 0) ||
            (filterType === 'groups' && chat.name.includes('Team') || chat.name.includes('Community'));
        return matchesSearch && matchesFilter;
    });

    const chats: Chat[] = [
        { id: 1, name: "Alex Rivers", lastMessage: "The water quality data is ready for review.", time: "10:45 AM", unread: 2, avatar: "AR", status: 'online', isVerified: true },
        { id: 2, name: "Elena Eco", lastMessage: "Did you see the new petition?", time: "9:30 AM", unread: 0, avatar: "EE", status: 'online', isVerified: true },
        { id: 3, name: "Civilization Protocol Support", lastMessage: "Your account has been verified.", time: "Yesterday", unread: 0, avatar: "VS", status: 'offline', isVerified: true },
        { id: 4, name: "Marcus VOD", lastMessage: "Let's discuss the tokenomics.", time: "Monday", unread: 0, avatar: "MV", status: 'offline', isVerified: false },
        { id: 5, name: "Water Research Team", lastMessage: "New findings from the Aral Sea project", time: "2 hours ago", unread: 5, avatar: "WR", status: 'online', isVerified: true },
        { id: 6, name: "Sarah Green", lastMessage: "Can we schedule a meeting?", time: "Yesterday", unread: 1, avatar: "SG", status: 'online', isVerified: true },
        { id: 7, name: "Ivan Water", lastMessage: "IoT sensors are installed", time: "2 days ago", unread: 0, avatar: "IW", status: 'offline', isVerified: true },
        { id: 8, name: "DAO Council", lastMessage: "Voting results for proposal #VOD-125", time: "3 days ago", unread: 0, avatar: "DC", status: 'offline', isVerified: true },
        { id: 9, name: "EcoGuard Community", lastMessage: "Volunteer event this weekend", time: "4 days ago", unread: 0, avatar: "EC", status: 'offline', isVerified: false },
        { id: 10, name: "Power Ledger Team", lastMessage: "P2P energy trading integration", time: "1 week ago", unread: 0, avatar: "PL", status: 'offline', isVerified: true },
        { id: 11, name: "Regen Network", lastMessage: "Carbon credits data available", time: "1 week ago", unread: 0, avatar: "RN", status: 'offline', isVerified: true },
        { id: 12, name: "Medicalchain", lastMessage: "Health data integration complete", time: "2 weeks ago", unread: 0, avatar: "MC", status: 'offline', isVerified: true },
        { id: 13, name: "UN-Water Partnership", lastMessage: "SDG 6 reporting template", time: "2 weeks ago", unread: 0, avatar: "UN", status: 'offline', isVerified: true },
        { id: 14, name: "Civilization Protocol Science Lab", lastMessage: "New ML model published", time: "3 weeks ago", unread: 0, avatar: "VS", status: 'offline', isVerified: true },
        { id: 15, name: "TokenHub Admin", lastMessage: "Your investment proposal approved", time: "1 month ago", unread: 0, avatar: "TH", status: 'offline', isVerified: true },
    ];

    const messagesByChat: Record<number, Message[]> = {
        1: [
            { id: 1, text: "Hello Alex! How is the monitoring going in London?", time: "10:30 AM", sender: 'me', status: 'read' },
            { id: 2, text: "Hi! We've just finished the weekly audit. The water quality data is ready for review.", time: "10:45 AM", sender: 'them', status: 'read' },
            { id: 3, text: "Great, I'll check it on the EarthMap now.", time: "10:46 AM", sender: 'me', status: 'sent' },
        ],
        5: [
            { id: 1, text: "We've completed the first phase of the Aral Sea restoration project.", time: "2 hours ago", sender: 'them', status: 'read' },
            { id: 2, text: "Excellent work! Can you share the detailed report?", time: "1 hour ago", sender: 'me', status: 'read' },
            { id: 3, text: "Sure, I'll upload it to the Data Lake.", time: "1 hour ago", sender: 'them', status: 'read' },
        ]
    };

    const messages = messagesByChat[selectedChat] || messagesByChat[1];

    return (
        <div className={cn("h-screen bg-ocean-deep pt-20 flex overflow-hidden", isRTL && "flex-row-reverse")}>
            {/* Sidebar: Chat List */}
            <div className="w-80 md:w-96 glass border-r border-white/5 flex flex-col">
                <div className="p-6 border-b border-white/5">
                    <h1 className="text-2xl font-black text-white mb-4 tracking-tighter">Сообщения</h1>
                    
                    {/* Filters */}
                    <div className="flex gap-2 mb-4">
                        {(['all', 'unread', 'groups'] as const).map(filter => (
                            <button
                                key={filter}
                                onClick={() => setFilterType(filter)}
                                className={cn(
                                    "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                                    filterType === filter
                                        ? "bg-cyan-500 text-ocean-deep"
                                        : "bg-white/5 text-slate-500 hover:bg-white/10"
                                )}
                            >
                                {filter === 'all' ? 'Все' : filter === 'unread' ? 'Непрочитанные' : 'Группы'}
                            </button>
                        ))}
                    </div>

                    <div className="relative">
                        <Search className={cn("absolute top-1/2 -translate-y-1/2 text-slate-500", isRTL ? "right-4" : "left-4")} size={18} />
                        <input
                            type="text"
                            placeholder="Поиск чатов..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={cn(
                                "w-full bg-white/5 border border-white/10 rounded-xl py-3 text-sm focus:outline-none focus:border-cyan-500/50 transition-all",
                                isRTL ? "pr-12 pl-4" : "pl-12 pr-4"
                            )}
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {filteredChats.map((chat) => (
                        <button
                            key={chat.id}
                            onClick={() => setSelectedChat(chat.id)}
                            className={cn(
                                "w-full p-4 flex items-center gap-4 transition-all border-b border-white/[0.02] hover:bg-white/[0.02]",
                                selectedChat === chat.id ? "bg-white/5 border-l-2 border-l-cyan-500" : "border-l-2 border-l-transparent",
                                isRTL && "flex-row-reverse text-right"
                            )}
                        >
                            <div className="relative">
                                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center font-black text-white border border-white/10">
                                    {chat.avatar}
                                </div>
                                <div className={cn(
                                    "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-ocean-deep",
                                    chat.status === 'online' ? "bg-emerald-500" : "bg-slate-600"
                                )} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="font-bold text-sm text-white truncate flex items-center gap-1">
                                        {chat.name}
                                        {chat.isVerified && <Shield size={12} className="text-cyan-500" />}
                                    </h3>
                                    <span className="text-[10px] text-slate-500">{chat.time}</span>
                                </div>
                                <p className="text-xs text-slate-500 truncate">{chat.lastMessage}</p>
                            </div>
                            {chat.unread > 0 && (
                                <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-[10px] font-black text-ocean-deep">
                                    {chat.unread}
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main: Chat Window */}
            <div className="flex-1 flex flex-col bg-ocean-deep/50">
                {/* Chat Header */}
                <div className={cn("p-4 border-b border-white/5 flex items-center justify-between bg-ocean-deep/80 backdrop-blur-xl z-10", isRTL && "flex-row-reverse")}>
                    <div className={cn("flex items-center gap-4", isRTL && "flex-row-reverse")}>
                        <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-black text-white border border-white/10">
                            {chats.find(c => c.id === selectedChat)?.avatar}
                        </div>
                        <div>
                            <h2 className="font-bold text-white flex items-center gap-2">
                                {chats.find(c => c.id === selectedChat)?.name}
                                {chats.find(c => c.id === selectedChat)?.isVerified && <Shield size={14} className="text-cyan-500" />}
                            </h2>
                            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">В сети</p>
                        </div>
                    </div>
                    <div className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                        <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                            <Phone size={20} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                            <Video size={20} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                            <MoreVertical size={20} />
                        </button>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={cn(
                                "flex flex-col",
                                msg.sender === 'me' ? (isRTL ? "items-start" : "items-end") : (isRTL ? "items-end" : "items-start")
                            )}
                        >
                            <div className={cn(
                                "max-w-[70%] p-4 rounded-2xl text-sm leading-relaxed",
                                msg.sender === 'me'
                                    ? "bg-cyan-500 text-ocean-deep font-medium rounded-tr-none"
                                    : "bg-white/5 text-slate-200 border border-white/5 rounded-tl-none"
                            )}>
                                {msg.text}
                            </div>
                            <div className={cn(
                                "flex items-center gap-2 mt-2 text-[10px] text-slate-500",
                                msg.sender === 'me' ? (isRTL ? "flex-row" : "flex-row-reverse") : (isRTL ? "flex-row-reverse" : "flex-row")
                            )}>
                                <span>{msg.time}</span>
                                {msg.sender === 'me' && (
                                    <CheckCheck size={12} className={msg.status === 'read' ? "text-cyan-400" : "text-slate-600"} />
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-6 border-t border-white/5 bg-ocean-deep/80 backdrop-blur-xl">
                    <div className={cn("flex items-center gap-4", isRTL && "flex-row-reverse")}>
                        <div className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                            <button className="p-2 text-slate-500 hover:text-cyan-400 transition-colors">
                                <Paperclip size={20} />
                            </button>
                            <button className="p-2 text-slate-500 hover:text-cyan-400 transition-colors">
                                <ImageIcon size={20} />
                            </button>
                        </div>
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="Напишите сообщение..."
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                className={cn(
                                    "w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-cyan-500/50 transition-all",
                                    isRTL && "text-right"
                                )}
                            />
                            <button className={cn("absolute top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors", isRTL ? "left-4" : "right-4")}>
                                <Smile size={18} />
                            </button>
                        </div>
                        <button className="w-12 h-12 bg-cyan-500 text-ocean-deep rounded-xl flex items-center justify-center hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20">
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
