"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users, Search, UserPlus,
    MessageSquare, Shield, Star,
    MoreVertical, UserCheck, UserMinus,
    Globe, MapPin, Loader2, Check, X,
    RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useFriends } from "@/hooks/useApi";
import Link from "next/link";

interface Friend {
    id: string;
    name: string;
    email?: string;
    role: string;
    status: 'online' | 'offline';
    avatar?: string;
    location?: string;
    reputation: number;
    isVerified: boolean;
    vodBalance?: number;
    friendshipStatus: 'accepted' | 'pending' | 'requested';
}

// Демо-данные
const demoFriends: Friend[] = [
    { id: "1", name: "Alex Rivers", role: "Water Engineer", status: 'online', avatar: "AR", location: "London, UK", reputation: 98, isVerified: true, friendshipStatus: 'accepted' },
    { id: "2", name: "Elena Eco", role: "Environmental Activist", status: 'online', avatar: "EE", location: "Berlin, DE", reputation: 94, isVerified: true, friendshipStatus: 'accepted' },
    { id: "3", name: "Marcus VOD", role: "Data Scientist", status: 'offline', avatar: "MV", location: "San Francisco, US", reputation: 89, isVerified: false, friendshipStatus: 'accepted' },
    { id: "4", name: "Sarah Green", role: "Policy Advisor", status: 'online', avatar: "SG", location: "Ottawa, CA", reputation: 96, isVerified: true, friendshipStatus: 'accepted' },
    { id: "5", name: "Ivan Water", role: "IoT Specialist", status: 'offline', avatar: "IW", location: "Tashkent, UZ", reputation: 92, isVerified: true, friendshipStatus: 'accepted' },
    { id: "6", name: "Dr. Maria Silva", role: "Hydrologist", status: 'online', avatar: "MS", location: "Lisbon, PT", reputation: 97, isVerified: true, friendshipStatus: 'accepted' },
    { id: "7", name: "James Chen", role: "Blockchain Developer", status: 'online', avatar: "JC", location: "Singapore, SG", reputation: 91, isVerified: true, friendshipStatus: 'accepted' },
    { id: "8", name: "Anna Petrova", role: "Ecological Researcher", status: 'offline', avatar: "AP", location: "Moscow, RU", reputation: 93, isVerified: true, friendshipStatus: 'accepted' },
    { id: "9", name: "Mohammed Al-Rashid", role: "Water Policy Expert", status: 'online', avatar: "MA", location: "Dubai, AE", reputation: 95, isVerified: true, friendshipStatus: 'pending' },
    { id: "10", name: "Lisa Thompson", role: "AI Researcher", status: 'online', avatar: "LT", location: "Boston, US", reputation: 90, isVerified: false, friendshipStatus: 'pending' },
];

export default function FriendsPage() {
    const { t, isRTL } = useLanguage();
    const { user, isAuthenticated } = useAuth();
    const { getFriends, sendRequest, acceptRequest, rejectRequest, loading: apiLoading } = useFriends();
    
    const [friends, setFriends] = useState<Friend[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<'all' | 'online' | 'offline'>('all');
    const [tabFilter, setTabFilter] = useState<'all' | 'pending' | 'requests'>('all');
    const [showFindModal, setShowFindModal] = useState(false);
    const [searchUsers, setSearchUsers] = useState("");
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    const loadFriends = useCallback(async () => {
        try {
            const result = await getFriends();
            if (result && result.friends && result.friends.length > 0) {
                setFriends(result.friends);
            } else {
                setFriends(demoFriends);
            }
        } catch (error) {
            console.error('Error loading friends:', error);
            setFriends(demoFriends);
        } finally {
            setLoading(false);
        }
    }, [getFriends]);

    useEffect(() => {
        loadFriends();
    }, [loadFriends]);

    const handleSendRequest = async (userId: string) => {
        setActionLoading(userId);
        const result = await sendRequest(userId);
        if (result) {
            setFriends(prev => prev.map(f => 
                f.id === userId ? { ...f, friendshipStatus: 'pending' as const } : f
            ));
        }
        setActionLoading(null);
    };

    const handleAccept = async (friendshipId: string) => {
        setActionLoading(friendshipId);
        const result = await acceptRequest(friendshipId);
        if (result) {
            setFriends(prev => prev.map(f => 
                f.id === friendshipId ? { ...f, friendshipStatus: 'accepted' as const } : f
            ));
        }
        setActionLoading(null);
    };

    const handleReject = async (friendshipId: string) => {
        setActionLoading(friendshipId);
        const result = await rejectRequest(friendshipId);
        if (result) {
            setFriends(prev => prev.filter(f => f.id !== friendshipId));
        }
        setActionLoading(null);
    };

    const filteredFriends = friends.filter(f => {
        const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            f.role.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || f.status === statusFilter;
        const matchesTab = tabFilter === 'all' ? f.friendshipStatus === 'accepted' :
                          tabFilter === 'pending' ? f.friendshipStatus === 'pending' :
                          f.friendshipStatus === 'requested';
        return matchesSearch && matchesStatus && matchesTab;
    });

    const acceptedCount = friends.filter(f => f.friendshipStatus === 'accepted').length;
    const pendingCount = friends.filter(f => f.friendshipStatus === 'pending').length;
    const requestsCount = friends.filter(f => f.friendshipStatus === 'requested').length;
    const onlineCount = friends.filter(f => f.status === 'online' && f.friendshipStatus === 'accepted').length;

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen py-24 px-4 flex items-center justify-center">
                <div className="text-center glass-card p-12 rounded-2xl">
                    <Users size={64} className="mx-auto mb-6 text-cyan-400" />
                    <h2 className="text-2xl font-black mb-4">Друзья и контакты</h2>
                    <p className="text-slate-400 mb-6">Войдите в аккаунт, чтобы видеть друзей</p>
                </div>
            </div>
        );
    }

    return (
        <div className={cn("min-h-screen py-24 px-4", isRTL && "text-right")}>
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2 tracking-tighter">Друзья и Контакты</h1>
                        <p className="text-slate-400">
                            {acceptedCount} друзей • {onlineCount} онлайн
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={() => loadFriends()}
                            disabled={loading}
                            className="p-3 glass border-white/10 rounded-xl hover:bg-white/5 transition-all"
                        >
                            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                        </button>
                        <button 
                            onClick={() => setShowFindModal(true)}
                            className="px-6 py-3 bg-cyan-500 text-ocean-deep font-black rounded-xl hover:bg-cyan-400 transition-all flex items-center gap-2"
                        >
                            <UserPlus size={18} /> Найти экспертов
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    <button
                        onClick={() => setTabFilter('all')}
                        className={cn(
                            "px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
                            tabFilter === 'all' ? "bg-cyan-500 text-ocean-deep" : "bg-white/5 text-slate-400 hover:bg-white/10"
                        )}
                    >
                        Все друзья ({acceptedCount})
                    </button>
                    <button
                        onClick={() => setTabFilter('pending')}
                        className={cn(
                            "px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap relative",
                            tabFilter === 'pending' ? "bg-cyan-500 text-ocean-deep" : "bg-white/5 text-slate-400 hover:bg-white/10"
                        )}
                    >
                        Отправленные ({pendingCount})
                    </button>
                    <button
                        onClick={() => setTabFilter('requests')}
                        className={cn(
                            "px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap relative",
                            tabFilter === 'requests' ? "bg-cyan-500 text-ocean-deep" : "bg-white/5 text-slate-400 hover:bg-white/10"
                        )}
                    >
                        Входящие ({requestsCount})
                        {requestsCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center">
                                {requestsCount}
                            </span>
                        )}
                    </button>
                </div>

                {/* Search & Filters */}
                <div className="space-y-4 mb-8">
                    <div className="relative">
                        <Search className={cn("absolute top-1/2 -translate-y-1/2 text-slate-500", isRTL ? "right-4" : "left-4")} size={20} />
                        <input
                            type="text"
                            placeholder="Поиск по имени или роли..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={cn(
                                "w-full bg-white/5 border border-white/10 rounded-xl py-3 text-sm focus:outline-none focus:border-cyan-500/50 transition-all",
                                isRTL ? "pr-12 pl-4" : "pl-12 pr-4"
                            )}
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {(['all', 'online', 'offline'] as const).map(status => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={cn(
                                    "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                                    statusFilter === status 
                                        ? "bg-cyan-500 text-ocean-deep" 
                                        : "bg-white/5 text-slate-400 hover:bg-white/10"
                                )}
                            >
                                {status === 'all' ? 'Все' : status === 'online' ? '🟢 Онлайн' : '⚫ Офлайн'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 size={32} className="animate-spin text-cyan-400" />
                    </div>
                )}

                {/* Friends Grid */}
                {!loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <AnimatePresence>
                            {filteredFriends.map((friend, i) => (
                                <motion.div
                                    key={friend.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="glass-card p-5 border-white/5 bg-white/[0.02] flex items-start gap-4 group"
                                >
                                    <div className="relative">
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-lg font-bold shrink-0">
                                            {friend.avatar || friend.name.slice(0, 2).toUpperCase()}
                                        </div>
                                        {friend.status === 'online' && (
                                            <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-ocean-deep" />
                                        )}
                                    </div>
                                    
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-white truncate">{friend.name}</span>
                                            {friend.isVerified && (
                                                <Shield size={14} className="text-cyan-400 shrink-0" />
                                            )}
                                        </div>
                                        <p className="text-sm text-slate-400 mb-2 truncate">{friend.role}</p>
                                        
                                        {friend.location && (
                                            <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">
                                                <MapPin size={12} />
                                                {friend.location}
                                            </div>
                                        )}
                                        
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1 text-xs">
                                                <Star size={12} className="text-yellow-400" />
                                                <span className="text-slate-400">{friend.reputation}</span>
                                            </div>
                                            {friend.vodBalance && (
                                                <div className="text-xs text-cyan-400">
                                                    {friend.vodBalance.toLocaleString()} VOD
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col gap-2 shrink-0">
                                        {friend.friendshipStatus === 'accepted' && (
                                            <>
                                                <Link 
                                                    href="/social/messages"
                                                    className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-all"
                                                >
                                                    <MessageSquare size={16} />
                                                </Link>
                                                <button className="p-2 bg-white/5 text-slate-400 rounded-lg hover:bg-white/10 transition-all">
                                                    <MoreVertical size={16} />
                                                </button>
                                            </>
                                        )}
                                        
                                        {friend.friendshipStatus === 'pending' && (
                                            <span className="text-xs text-yellow-400 bg-yellow-500/10 px-2 py-1 rounded">
                                                Ожидает
                                            </span>
                                        )}
                                        
                                        {friend.friendshipStatus === 'requested' && (
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={() => handleAccept(friend.id)}
                                                    disabled={actionLoading === friend.id}
                                                    className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-all disabled:opacity-50"
                                                >
                                                    {actionLoading === friend.id ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                                                </button>
                                                <button
                                                    onClick={() => handleReject(friend.id)}
                                                    disabled={actionLoading === friend.id}
                                                    className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all disabled:opacity-50"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {/* Empty State */}
                {!loading && filteredFriends.length === 0 && (
                    <div className="text-center py-12">
                        <Users size={64} className="mx-auto mb-6 text-slate-600" />
                        <h3 className="text-xl font-bold text-slate-400 mb-2">Нет результатов</h3>
                        <p className="text-slate-500">Попробуйте изменить параметры поиска</p>
                    </div>
                )}
            </div>

            {/* Find Experts Modal */}
            <AnimatePresence>
                {showFindModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                        onClick={() => setShowFindModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="w-full max-w-md bg-gradient-to-br from-ocean-medium to-ocean-deep rounded-2xl border border-ocean-light/30 shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-white/10">
                                <h3 className="text-xl font-black">Найти экспертов</h3>
                            </div>
                            
                            <div className="p-6 space-y-4">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Поиск по имени, email..."
                                        value={searchUsers}
                                        onChange={(e) => setSearchUsers(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-500/50 outline-none"
                                    />
                                </div>
                                
                                <div className="text-xs text-slate-500 mb-4">Рекомендации</div>
                                
                                {demoFriends.slice(0, 5).filter(f => f.friendshipStatus !== 'accepted').map(user => (
                                    <div key={user.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-sm font-bold">
                                            {user.avatar || user.name.slice(0, 2)}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-bold text-sm">{user.name}</div>
                                            <div className="text-xs text-slate-500">{user.role}</div>
                                        </div>
                                        <button
                                            onClick={() => handleSendRequest(user.id)}
                                            disabled={apiLoading}
                                            className="px-3 py-1.5 bg-cyan-500 text-ocean-deep rounded-lg text-xs font-bold hover:bg-cyan-400 disabled:opacity-50"
                                        >
                                            + Добавить
                                        </button>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="p-6 border-t border-white/10">
                                <button
                                    onClick={() => setShowFindModal(false)}
                                    className="w-full py-3 glass border-white/10 rounded-xl font-bold hover:bg-white/5"
                                >
                                    Закрыть
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
