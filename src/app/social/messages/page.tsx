"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MessageSquare, Search, Send,
    MoreVertical, Phone, Video,
    User, Shield, CheckCheck,
    Image as ImageIcon, Paperclip,
    Smile, Mic, Loader2, RefreshCw,
    ArrowLeft, Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useMessages } from "@/hooks/useApi";

interface Chat {
    id: string;
    partner: {
        id: string;
        name: string;
        avatar?: string;
        lastActive: string;
    };
    lastMessage: {
        content: string;
        createdAt: string;
        isRead: boolean;
    };
    unreadCount: number;
}

interface Message {
    id: string;
    content: string;
    createdAt: string;
    sender: {
        id: string;
        name: string;
        avatar?: string;
    };
    isRead: boolean;
}

// Демо-данные
const demoChats: Chat[] = [
    { id: "1", partner: { id: "u1", name: "Alex Rivers", avatar: "AR", lastActive: new Date().toISOString() }, lastMessage: { content: "The water quality data is ready for review.", createdAt: new Date().toISOString(), isRead: false }, unreadCount: 2 },
    { id: "2", partner: { id: "u2", name: "Elena Eco", avatar: "EE", lastActive: new Date().toISOString() }, lastMessage: { content: "Did you see the new petition?", createdAt: new Date(Date.now() - 3600000).toISOString(), isRead: true }, unreadCount: 0 },
    { id: "3", partner: { id: "u3", name: "VODeco Support", avatar: "VS", lastActive: new Date(Date.now() - 86400000).toISOString() }, lastMessage: { content: "Your account has been verified.", createdAt: new Date(Date.now() - 86400000).toISOString(), isRead: true }, unreadCount: 0 },
    { id: "4", partner: { id: "u4", name: "Water Research Team", avatar: "WR", lastActive: new Date().toISOString() }, lastMessage: { content: "New findings from the Aral Sea project", createdAt: new Date(Date.now() - 7200000).toISOString(), isRead: false }, unreadCount: 5 },
    { id: "5", partner: { id: "u5", name: "Sarah Green", avatar: "SG", lastActive: new Date().toISOString() }, lastMessage: { content: "Can we schedule a meeting?", createdAt: new Date(Date.now() - 172800000).toISOString(), isRead: false }, unreadCount: 1 },
    { id: "6", partner: { id: "u6", name: "DAO Council", avatar: "DC", lastActive: new Date(Date.now() - 259200000).toISOString() }, lastMessage: { content: "Voting results for proposal #VOD-125", createdAt: new Date(Date.now() - 259200000).toISOString(), isRead: true }, unreadCount: 0 },
];

const demoMessages: Record<string, Message[]> = {
    "1": [
        { id: "m1", content: "Hello Alex! How is the monitoring going in London?", createdAt: new Date(Date.now() - 900000).toISOString(), sender: { id: "me", name: "You", avatar: "ME" }, isRead: true },
        { id: "m2", content: "Hi! We've just finished the weekly audit. The water quality data is ready for review.", createdAt: new Date().toISOString(), sender: { id: "u1", name: "Alex Rivers", avatar: "AR" }, isRead: true },
        { id: "m3", content: "Great, I'll check it on the EarthMap now.", createdAt: new Date().toISOString(), sender: { id: "me", name: "You", avatar: "ME" }, isRead: false },
    ],
    "4": [
        { id: "m1", content: "We've completed the first phase of the Aral Sea restoration project.", createdAt: new Date(Date.now() - 7200000).toISOString(), sender: { id: "u4", name: "Water Research Team", avatar: "WR" }, isRead: true },
        { id: "m2", content: "Excellent work! Can you share the detailed report?", createdAt: new Date(Date.now() - 3600000).toISOString(), sender: { id: "me", name: "You", avatar: "ME" }, isRead: true },
        { id: "m3", content: "Sure, I'll upload it to the Data Lake.", createdAt: new Date(Date.now() - 3500000).toISOString(), sender: { id: "u4", name: "Water Research Team", avatar: "WR" }, isRead: true },
    ],
};

export default function MessagesPage() {
    const { t, isRTL } = useLanguage();
    const { user, isAuthenticated } = useAuth();
    const { getChats, getMessages, sendMessage, loading: apiLoading } = useMessages();
    
    const [chats, setChats] = useState<Chat[]>([]);
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageInput, setMessageInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState<'all' | 'unread' | 'groups'>('all');
    const [loading, setLoading] = useState(true);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [sending, setSending] = useState(false);
    const [showMobileChat, setShowMobileChat] = useState(false);
    
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const loadChats = useCallback(async () => {
        try {
            const result = await getChats();
            if (result && result.chats && result.chats.length > 0) {
                setChats(result.chats);
            } else {
                setChats(demoChats);
            }
        } catch (error) {
            console.error('Error loading chats:', error);
            setChats(demoChats);
        } finally {
            setLoading(false);
        }
    }, [getChats]);

    useEffect(() => {
        loadChats();
    }, [loadChats]);

    const loadMessages = useCallback(async (partnerId: string) => {
        setLoadingMessages(true);
        try {
            const result = await getMessages(partnerId);
            if (result && result.messages) {
                setMessages(result.messages);
            } else {
                // Демо-сообщения
                setMessages(demoMessages[selectedChat?.id || "1"] || []);
            }
        } catch (error) {
            console.error('Error loading messages:', error);
            setMessages(demoMessages[selectedChat?.id || "1"] || []);
        } finally {
            setLoadingMessages(false);
        }
    }, [getMessages, selectedChat?.id]);

    useEffect(() => {
        if (selectedChat) {
            loadMessages(selectedChat.partner.id);
        }
    }, [selectedChat, loadMessages]);

    const handleSelectChat = (chat: Chat) => {
        setSelectedChat(chat);
        setShowMobileChat(true);
        // Сбрасываем счётчик непрочитанных
        setChats(prev => prev.map(c => 
            c.id === chat.id ? { ...c, unreadCount: 0 } : c
        ));
    };

    const handleSendMessage = async () => {
        if (!messageInput.trim() || !selectedChat) return;
        
        setSending(true);
        
        const result = await sendMessage(selectedChat.partner.id, messageInput);
        
        if (result) {
            // Добавляем сообщение локально
            const newMessage: Message = {
                id: Date.now().toString(),
                content: messageInput,
                createdAt: new Date().toISOString(),
                sender: { id: "me", name: user?.name || "You", avatar: user?.avatar },
                isRead: false,
            };
            setMessages(prev => [...prev, newMessage]);
            setMessageInput("");
            
            // Обновляем lastMessage в списке чатов
            setChats(prev => prev.map(c => 
                c.id === selectedChat.id 
                    ? { ...c, lastMessage: { content: messageInput, createdAt: new Date().toISOString(), isRead: false } }
                    : c
            ));
        }
        
        setSending(false);
    };

    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffMs / 86400000);
        
        if (diffDays === 0) {
            return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
        } else if (diffDays === 1) {
            return 'Вчера';
        } else if (diffDays < 7) {
            return date.toLocaleDateString('ru-RU', { weekday: 'short' });
        } else {
            return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
        }
    };

    const isOnline = (lastActive: string) => {
        const diff = Date.now() - new Date(lastActive).getTime();
        return diff < 5 * 60 * 1000; // 5 минут
    };

    const filteredChats = chats.filter(chat => {
        const matchesSearch = chat.partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            chat.lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterType === 'all' || 
            (filterType === 'unread' && chat.unreadCount > 0) ||
            (filterType === 'groups' && (chat.partner.name.includes('Team') || chat.partner.name.includes('Council')));
        return matchesSearch && matchesFilter;
    });

    if (!isAuthenticated) {
        return (
            <div className="h-screen bg-ocean-deep pt-20 flex items-center justify-center">
                <div className="text-center glass-card p-12 rounded-2xl">
                    <MessageSquare size={64} className="mx-auto mb-6 text-cyan-400" />
                    <h2 className="text-2xl font-black mb-4">Сообщения</h2>
                    <p className="text-slate-400 mb-6">Войдите в аккаунт, чтобы видеть сообщения</p>
                </div>
            </div>
        );
    }

    return (
        <div className={cn("h-screen bg-ocean-deep pt-20 flex overflow-hidden", isRTL && "flex-row-reverse")}>
            {/* Sidebar: Chat List */}
            <div className={cn(
                "w-full md:w-96 glass border-r border-white/5 flex flex-col",
                showMobileChat && "hidden md:flex"
            )}>
                <div className="p-4 md:p-6 border-b border-white/5">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-black text-white tracking-tighter">Сообщения</h1>
                        <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                            <Plus size={20} />
                        </button>
                    </div>
                    
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
                    
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                            type="text"
                            placeholder="Поиск сообщений..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-cyan-500/50"
                        />
                    </div>
                </div>

                {/* Chat List */}
                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 size={32} className="animate-spin text-cyan-400" />
                        </div>
                    ) : filteredChats.length === 0 ? (
                        <div className="text-center py-12 text-slate-500">
                            <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
                            <p>Нет сообщений</p>
                        </div>
                    ) : (
                        <AnimatePresence>
                            {filteredChats.map((chat, i) => (
                                <motion.button
                                    key={chat.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={() => handleSelectChat(chat)}
                                    className={cn(
                                        "w-full p-4 flex items-center gap-4 hover:bg-white/5 transition-all border-b border-white/5",
                                        selectedChat?.id === chat.id && "bg-cyan-500/10"
                                    )}
                                >
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-sm font-bold">
                                            {chat.partner.avatar || chat.partner.name.slice(0, 2).toUpperCase()}
                                        </div>
                                        {isOnline(chat.partner.lastActive) && (
                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-ocean-deep" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0 text-left">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-bold text-sm truncate">{chat.partner.name}</span>
                                            <span className="text-[10px] text-slate-500 shrink-0">{formatTime(chat.lastMessage.createdAt)}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 truncate">{chat.lastMessage.content}</p>
                                    </div>
                                    {chat.unreadCount > 0 && (
                                        <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-[10px] font-bold text-ocean-deep shrink-0">
                                            {chat.unreadCount}
                                        </div>
                                    )}
                                </motion.button>
                            ))}
                        </AnimatePresence>
                    )}
                </div>
            </div>

            {/* Chat Window */}
            <div className={cn(
                "flex-1 flex flex-col",
                !showMobileChat && "hidden md:flex"
            )}>
                {selectedChat ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 md:p-6 border-b border-white/5 flex items-center justify-between glass">
                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={() => setShowMobileChat(false)}
                                    className="md:hidden p-2 hover:bg-white/10 rounded-xl"
                                >
                                    <ArrowLeft size={20} />
                                </button>
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-sm font-bold">
                                        {selectedChat.partner.avatar || selectedChat.partner.name.slice(0, 2).toUpperCase()}
                                    </div>
                                    {isOnline(selectedChat.partner.lastActive) && (
                                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-ocean-deep" />
                                    )}
                                </div>
                                <div>
                                    <h2 className="font-bold">{selectedChat.partner.name}</h2>
                                    <p className="text-xs text-slate-500">
                                        {isOnline(selectedChat.partner.lastActive) ? 'В сети' : `Был(а) ${formatTime(selectedChat.partner.lastActive)}`}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                                    <Phone size={18} />
                                </button>
                                <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                                    <Video size={18} />
                                </button>
                                <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                                    <MoreVertical size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
                            {loadingMessages ? (
                                <div className="flex items-center justify-center py-12">
                                    <Loader2 size={32} className="animate-spin text-cyan-400" />
                                </div>
                            ) : (
                                <>
                                    {messages.map((msg) => {
                                        const isMe = msg.sender.id === "me" || msg.sender.id === user?.id;
                                        return (
                                            <motion.div
                                                key={msg.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className={cn(
                                                    "flex",
                                                    isMe ? "justify-end" : "justify-start"
                                                )}
                                            >
                                                <div className={cn(
                                                    "max-w-[70%] rounded-2xl p-4",
                                                    isMe 
                                                        ? "bg-cyan-500 text-ocean-deep rounded-br-none" 
                                                        : "bg-white/10 text-white rounded-bl-none"
                                                )}>
                                                    <p className="text-sm">{msg.content}</p>
                                                    <div className={cn(
                                                        "flex items-center gap-1 mt-2 text-[10px]",
                                                        isMe ? "text-ocean-deep/60 justify-end" : "text-slate-500"
                                                    )}>
                                                        <span>{formatTime(msg.createdAt)}</span>
                                                        {isMe && <CheckCheck size={12} className={msg.isRead ? "text-ocean-deep" : "opacity-50"} />}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                    <div ref={messagesEndRef} />
                                </>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-white/5 glass">
                            <div className="flex items-center gap-3">
                                <button className="p-2 hover:bg-white/10 rounded-xl transition-colors text-slate-400">
                                    <Paperclip size={20} />
                                </button>
                                <button className="p-2 hover:bg-white/10 rounded-xl transition-colors text-slate-400">
                                    <ImageIcon size={20} />
                                </button>
                                <input
                                    type="text"
                                    placeholder="Написать сообщение..."
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-cyan-500/50"
                                />
                                <button className="p-2 hover:bg-white/10 rounded-xl transition-colors text-slate-400">
                                    <Smile size={20} />
                                </button>
                                <button
                                    onClick={handleSendMessage}
                                    disabled={sending || !messageInput.trim()}
                                    className="p-3 bg-cyan-500 text-ocean-deep rounded-xl hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    {sending ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                            <MessageSquare size={64} className="mx-auto mb-6 text-slate-600" />
                            <h3 className="text-xl font-bold text-slate-400 mb-2">Выберите чат</h3>
                            <p className="text-slate-500">Выберите чат из списка слева</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
