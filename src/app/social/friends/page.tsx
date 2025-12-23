"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users, Search, UserPlus,
    MessageSquare, Shield, Star,
    MoreVertical, UserCheck, UserMinus,
    Globe, MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface Friend {
    id: number;
    name: string;
    role: string;
    status: 'online' | 'offline';
    avatar: string;
    location: string;
    reputation: number;
    isVerified: boolean;
}

export default function FriendsPage() {
    const { t, isRTL } = useLanguage();
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [roleFilter, setRoleFilter] = useState("all");

    const friends: Friend[] = [
        { id: 1, name: "Alex Rivers", role: "Water Engineer", status: 'online', avatar: "AR", location: "London, UK", reputation: 98, isVerified: true },
        { id: 2, name: "Elena Eco", role: "Environmental Activist", status: 'online', avatar: "EE", location: "Berlin, DE", reputation: 94, isVerified: true },
        { id: 3, name: "Marcus VOD", role: "Data Scientist", status: 'offline', avatar: "MV", location: "San Francisco, US", reputation: 89, isVerified: false },
        { id: 4, name: "Sarah Green", role: "Policy Advisor", status: 'online', avatar: "SG", location: "Ottawa, CA", reputation: 96, isVerified: true },
        { id: 5, name: "Ivan Water", role: "IoT Specialist", status: 'offline', avatar: "IW", location: "Tashkent, UZ", reputation: 92, isVerified: true },
        { id: 6, name: "Dr. Maria Silva", role: "Hydrologist", status: 'online', avatar: "MS", location: "Lisbon, PT", reputation: 97, isVerified: true },
        { id: 7, name: "James Chen", role: "Blockchain Developer", status: 'online', avatar: "JC", location: "Singapore, SG", reputation: 91, isVerified: true },
        { id: 8, name: "Anna Petrova", role: "Ecological Researcher", status: 'offline', avatar: "AP", location: "Moscow, RU", reputation: 93, isVerified: true },
        { id: 9, name: "Mohammed Al-Rashid", role: "Water Policy Expert", status: 'online', avatar: "MA", location: "Dubai, AE", reputation: 95, isVerified: true },
        { id: 10, name: "Lisa Thompson", role: "AI Researcher", status: 'online', avatar: "LT", location: "Boston, US", reputation: 90, isVerified: false },
        { id: 11, name: "Dr. Rajesh Kumar", role: "Environmental Scientist", status: 'offline', avatar: "RK", location: "Delhi, IN", reputation: 96, isVerified: true },
        { id: 12, name: "Sophie Martin", role: "DAO Governance Specialist", status: 'online', avatar: "SM", location: "Paris, FR", reputation: 94, isVerified: true },
        { id: 13, name: "Carlos Rodriguez", role: "Infrastructure Engineer", status: 'offline', avatar: "CR", location: "Madrid, ES", reputation: 88, isVerified: false },
        { id: 14, name: "Yuki Tanaka", role: "Water Quality Analyst", status: 'online', avatar: "YT", location: "Tokyo, JP", reputation: 92, isVerified: true },
        { id: 15, name: "Ahmed Hassan", role: "Desalination Expert", status: 'online', avatar: "AH", location: "Cairo, EG", reputation: 93, isVerified: true },
        { id: 16, name: "Emma Wilson", role: "Climate Scientist", status: 'offline', avatar: "EW", location: "Melbourne, AU", reputation: 95, isVerified: true },
        { id: 17, name: "Roberto Santos", role: "Water Treatment Specialist", status: 'online', avatar: "RS", location: "São Paulo, BR", reputation: 89, isVerified: false },
        { id: 18, name: "Dr. Kim Soo-Jin", role: "Marine Biologist", status: 'offline', avatar: "KS", location: "Seoul, KR", reputation: 97, isVerified: true },
        { id: 19, name: "Michael Brown", role: "Investment Analyst", status: 'online', avatar: "MB", location: "New York, US", reputation: 91, isVerified: true },
        { id: 20, name: "Fatima Al-Zahra", role: "Water Rights Advocate", status: 'online', avatar: "FA", location: "Amman, JO", reputation: 94, isVerified: true },
    ];

    const filteredFriends = friends.filter(f =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={cn("min-h-screen bg-ocean-deep py-24 px-4", isRTL && "text-right")}>
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2 tracking-tighter">Друзья и Контакты</h1>
                        <p className="text-slate-400">Ваша сеть экспертов и единомышленников в Civilization Protocol.</p>
                    </div>
                    <button className="px-6 py-3 bg-cyan-500 text-ocean-deep font-black rounded-xl hover:bg-cyan-400 transition-all flex items-center gap-2">
                        <UserPlus size={18} /> Найти экспертов
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
                                "w-full bg-white/5 border border-white/10 rounded-2xl py-4 text-sm focus:outline-none focus:border-cyan-500/50 transition-all",
                                isRTL ? "pr-12 pl-4" : "pl-12 pr-4"
                            )}
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as any)}
                            className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold focus:outline-none focus:border-cyan-500/50"
                        >
                            <option value="all">Все статусы</option>
                            <option value="online">Онлайн</option>
                            <option value="offline">Офлайн</option>
                        </select>
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold focus:outline-none focus:border-cyan-500/50"
                        >
                            <option value="all">Все роли</option>
                            <option value="engineer">Инженеры</option>
                            <option value="scientist">Ученые</option>
                            <option value="researcher">Исследователи</option>
                            <option value="specialist">Специалисты</option>
                            <option value="analyst">Аналитики</option>
                        </select>
                    </div>
                </div>

                {/* Friends Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredFriends.map((friend) => (
                            <motion.div
                                key={friend.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="glass-card p-6 border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="relative">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-xl font-black text-white border border-white/10">
                                            {friend.avatar}
                                        </div>
                                        <div className={cn(
                                            "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-ocean-deep",
                                            friend.status === 'online' ? "bg-emerald-500" : "bg-slate-600"
                                        )} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-bold text-white group-hover:text-cyan-400 transition-colors">{friend.name}</h3>
                                            {friend.isVerified && <Shield size={14} className="text-cyan-500" />}
                                        </div>
                                        <p className="text-xs text-slate-500">{friend.role}</p>
                                    </div>
                                    <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-500">
                                        <MoreVertical size={18} />
                                    </button>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest">
                                        <MapPin size={12} /> {friend.location}
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-black uppercase tracking-widest">
                                        <Star size={12} /> Репутация: {friend.reputation}/100
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button className="flex-1 py-2 bg-white/5 hover:bg-cyan-500 hover:text-ocean-deep rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                                        <MessageSquare size={14} /> Сообщение
                                    </button>
                                    <button className="px-4 py-2 bg-white/5 hover:bg-rose-500/10 hover:text-rose-500 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                                        <UserMinus size={14} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
