"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Users, Search, Plus, Globe, BookOpen, Briefcase, Droplets, 
    ChevronRight, Loader2, RefreshCw, X, Lock, Unlock,
    MessageSquare, TrendingUp, Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useGroups } from "@/hooks/useApi";
import Link from "next/link";

interface Group {
    id: string;
    name: string;
    type: string;
    description: string;
    memberCount: number;
    projectCount: number;
    activity: string;
    isPrivate: boolean;
    category: string;
    isMember: boolean;
    createdAt: string;
}

// Демо-данные
const demoGroups: Group[] = [
    { id: "1", name: "Исследователи водной экологии", type: "research", description: "Группа ученых и исследователей, занимающихся изучением водных экосистем и разработкой инновационных решений.", memberCount: 156, projectCount: 23, activity: "Высокая", isPrivate: false, category: "science", isMember: false, createdAt: new Date().toISOString() },
    { id: "2", name: "Экологический активизм", type: "community", description: "Сообщество активистов, борющихся за сохранение водных ресурсов и защиту окружающей среды.", memberCount: 342, projectCount: 45, activity: "Очень высокая", isPrivate: false, category: "ecology", isMember: true, createdAt: new Date().toISOString() },
    { id: "3", name: "Водоочистные сооружения Москвы", type: "object", description: "Группа управления и мониторинга водоочистных сооружений в Москве.", memberCount: 28, projectCount: 8, activity: "Средняя", isPrivate: true, category: "infrastructure", isMember: false, createdAt: new Date().toISOString() },
    { id: "4", name: "Инвесторы CivilizationProtocol", type: "business", description: "Сообщество инвесторов и стейкхолдеров платформы CivilizationProtocol.", memberCount: 856, projectCount: 67, activity: "Очень высокая", isPrivate: false, category: "business", isMember: true, createdAt: new Date().toISOString() },
    { id: "5", name: "Центральная Азия Water Network", type: "regional", description: "Сеть специалистов по водным ресурсам Центральной Азии.", memberCount: 234, projectCount: 34, activity: "Высокая", isPrivate: false, category: "regional", isMember: false, createdAt: new Date().toISOString() },
    { id: "6", name: "IoT Sensors Operators", type: "technical", description: "Группа операторов IoT датчиков. Обсуждение технических вопросов.", memberCount: 89, projectCount: 12, activity: "Средняя", isPrivate: false, category: "tech", isMember: false, createdAt: new Date().toISOString() },
    { id: "7", name: "Aral Sea Restoration", type: "ecological", description: "Программа восстановления Аральского моря.", memberCount: 567, projectCount: 15, activity: "Очень высокая", isPrivate: false, category: "ecology", isMember: true, createdAt: new Date().toISOString() },
    { id: "8", name: "DAO Governance Council", type: "governance", description: "Совет по управлению DAO. Обсуждение предложений.", memberCount: 124, projectCount: 8, activity: "Высокая", isPrivate: true, category: "governance", isMember: false, createdAt: new Date().toISOString() },
    { id: "9", name: "Water Quality Analysts", type: "professional", description: "Сообщество аналитиков качества воды.", memberCount: 198, projectCount: 28, activity: "Высокая", isPrivate: false, category: "science", isMember: false, createdAt: new Date().toISOString() },
    { id: "10", name: "Blockchain Developers VOD", type: "technical", description: "Разработчики блокчейн решений для CivilizationProtocol.", memberCount: 67, projectCount: 19, activity: "Средняя", isPrivate: false, category: "tech", isMember: false, createdAt: new Date().toISOString() },
    { id: "11", name: "Education & Training", type: "educational", description: "Образовательные программы по устойчивому водопользованию.", memberCount: 423, projectCount: 14, activity: "Высокая", isPrivate: false, category: "education", isMember: false, createdAt: new Date().toISOString() },
    { id: "12", name: "UN-Water Partnership", type: "partnership", description: "Официальная группа партнерства с UN-Water.", memberCount: 45, projectCount: 6, activity: "Средняя", isPrivate: true, category: "international", isMember: false, createdAt: new Date().toISOString() },
];

const getIcon = (type: string) => {
    switch (type) {
        case 'research':
        case 'educational':
        case 'professional':
            return BookOpen;
        case 'business':
        case 'technical':
            return Briefcase;
        case 'community':
        case 'ecological':
        case 'regional':
        case 'international':
            return Globe;
        case 'object':
            return Droplets;
        default:
            return Users;
    }
};

const getColor = (type: string) => {
    switch (type) {
        case 'research': return 'text-cyan-400';
        case 'community': return 'text-green-400';
        case 'object': return 'text-blue-400';
        case 'business': return 'text-amber-400';
        case 'regional': return 'text-purple-400';
        case 'technical': return 'text-cyan-400';
        case 'ecological': return 'text-emerald-400';
        case 'governance': return 'text-indigo-400';
        case 'professional': return 'text-blue-400';
        case 'educational': return 'text-yellow-400';
        case 'partnership': return 'text-cyan-400';
        case 'international': return 'text-blue-400';
        default: return 'text-cyan-400';
    }
};

export default function GroupsPage() {
    const { user, isAuthenticated } = useAuth();
    const { getGroups, createGroup, joinGroup, loading: apiLoading } = useGroups();
    
    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
    const [tabFilter, setTabFilter] = useState<'all' | 'my' | 'discover'>('all');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [joinLoading, setJoinLoading] = useState<string | null>(null);
    
    // Форма создания группы
    const [newName, setNewName] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newType, setNewType] = useState('community');
    const [newCategory, setNewCategory] = useState('general');
    const [newIsPrivate, setNewIsPrivate] = useState(false);

    const categories = [
        { id: null, label: "Все" },
        { id: "science", label: "Наука" },
        { id: "ecology", label: "Экология" },
        { id: "business", label: "Бизнес" },
        { id: "tech", label: "Технологии" },
        { id: "governance", label: "Управление" },
        { id: "education", label: "Образование" },
        { id: "regional", label: "Региональные" },
    ];

    const loadGroups = useCallback(async () => {
        try {
            const params: { category?: string } = {};
            if (categoryFilter) params.category = categoryFilter;
            
            const result = await getGroups(params);
            if (result && result.groups && result.groups.length > 0) {
                setGroups(result.groups);
            } else {
                setGroups(demoGroups);
            }
        } catch (error) {
            console.error('Error loading groups:', error);
            setGroups(demoGroups);
        } finally {
            setLoading(false);
        }
    }, [getGroups, categoryFilter]);

    useEffect(() => {
        loadGroups();
    }, [loadGroups]);

    const handleJoinGroup = async (groupId: string) => {
        if (!isAuthenticated) return;
        
        setJoinLoading(groupId);
        const result = await joinGroup(groupId);
        if (result) {
            setGroups(prev => prev.map(g => 
                g.id === groupId ? { ...g, isMember: !g.isMember, memberCount: g.isMember ? g.memberCount - 1 : g.memberCount + 1 } : g
            ));
        }
        setJoinLoading(null);
    };

    const handleCreateGroup = async () => {
        if (!newName.trim()) return;
        
        const result = await createGroup({
            name: newName,
            description: newDescription,
            type: newType,
            category: newCategory,
        });
        
        if (result) {
            setShowCreateModal(false);
            setNewName('');
            setNewDescription('');
            setNewType('community');
            setNewCategory('general');
            setNewIsPrivate(false);
            loadGroups();
        }
    };

    const filteredGroups = groups.filter(g => {
        const matchesSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            g.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !categoryFilter || g.category === categoryFilter;
        const matchesTab = tabFilter === 'all' ||
            (tabFilter === 'my' && g.isMember) ||
            (tabFilter === 'discover' && !g.isMember);
        return matchesSearch && matchesCategory && matchesTab;
    });

    const myGroupsCount = groups.filter(g => g.isMember).length;
    const totalMembers = groups.reduce((acc, g) => acc + g.memberCount, 0);

    return (
        <div className="min-h-screen py-24 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2 tracking-tighter">Группы и сообщества</h1>
                        <p className="text-slate-400">
                            {groups.length} групп • {totalMembers.toLocaleString()} участников
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={() => loadGroups()}
                            disabled={loading}
                            className="p-3 glass border-white/10 rounded-xl hover:bg-white/5 transition-all"
                        >
                            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                        </button>
                        {isAuthenticated && (
                            <button 
                                onClick={() => setShowCreateModal(true)}
                                className="px-6 py-3 bg-cyan-500 text-ocean-deep font-black rounded-xl hover:bg-cyan-400 transition-all flex items-center gap-2"
                            >
                                <Plus size={18} /> Создать группу
                            </button>
                        )}
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
                        Все группы ({groups.length})
                    </button>
                    <button
                        onClick={() => setTabFilter('my')}
                        className={cn(
                            "px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
                            tabFilter === 'my' ? "bg-cyan-500 text-ocean-deep" : "bg-white/5 text-slate-400 hover:bg-white/10"
                        )}
                    >
                        Мои группы ({myGroupsCount})
                    </button>
                    <button
                        onClick={() => setTabFilter('discover')}
                        className={cn(
                            "px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
                            tabFilter === 'discover' ? "bg-cyan-500 text-ocean-deep" : "bg-white/5 text-slate-400 hover:bg-white/10"
                        )}
                    >
                        Найти новые
                    </button>
                </div>

                {/* Search & Filters */}
                <div className="space-y-4 mb-8">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                        <input
                            type="text"
                            placeholder="Поиск групп..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-cyan-500/50 transition-all"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat.id || 'all'}
                                onClick={() => setCategoryFilter(cat.id)}
                                className={cn(
                                    "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                                    categoryFilter === cat.id 
                                        ? "bg-cyan-500 text-ocean-deep" 
                                        : "bg-white/5 text-slate-400 hover:bg-white/10"
                                )}
                            >
                                {cat.label}
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

                {/* Groups Grid */}
                {!loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {filteredGroups.map((group, i) => {
                                const Icon = getIcon(group.type);
                                const color = getColor(group.type);
                                
                                return (
                                    <motion.div
                                        key={group.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="glass-card p-6 border-white/5 bg-white/[0.02] group hover:border-cyan-500/30 transition-all"
                                    >
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className={cn("p-3 rounded-xl bg-white/5", color)}>
                                                <Icon size={24} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-bold text-white truncate">{group.name}</h3>
                                                    {group.isPrivate && <Lock size={12} className="text-slate-500" />}
                                                </div>
                                                <p className="text-xs text-slate-500">{group.type}</p>
                                            </div>
                                        </div>
                                        
                                        <p className="text-sm text-slate-400 mb-4 line-clamp-2">{group.description}</p>
                                        
                                        <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                                            <div className="flex items-center gap-1">
                                                <Users size={12} />
                                                {group.memberCount}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <TrendingUp size={12} />
                                                {group.activity}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Briefcase size={12} />
                                                {group.projectCount} проектов
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-2">
                                            {group.isMember ? (
                                                <>
                                                    <Link 
                                                        href={`/groups/${group.id}`}
                                                        className="flex-1 py-2 bg-cyan-500 text-ocean-deep text-center font-bold rounded-xl hover:bg-cyan-400 transition-all text-sm"
                                                    >
                                                        Открыть
                                                    </Link>
                                                    <button
                                                        onClick={() => handleJoinGroup(group.id)}
                                                        disabled={joinLoading === group.id}
                                                        className="px-3 py-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-all text-sm"
                                                    >
                                                        {joinLoading === group.id ? <Loader2 size={16} className="animate-spin" /> : 'Выйти'}
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    onClick={() => handleJoinGroup(group.id)}
                                                    disabled={joinLoading === group.id || !isAuthenticated}
                                                    className="flex-1 py-2 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-all disabled:opacity-50 text-sm flex items-center justify-center gap-2"
                                                >
                                                    {joinLoading === group.id ? (
                                                        <Loader2 size={16} className="animate-spin" />
                                                    ) : (
                                                        <>
                                                            <Plus size={16} />
                                                            {group.isPrivate ? 'Запросить' : 'Вступить'}
                                                        </>
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                )}

                {/* Empty State */}
                {!loading && filteredGroups.length === 0 && (
                    <div className="text-center py-12">
                        <Users size={64} className="mx-auto mb-6 text-slate-600" />
                        <h3 className="text-xl font-bold text-slate-400 mb-2">Нет результатов</h3>
                        <p className="text-slate-500">Попробуйте изменить параметры поиска</p>
                    </div>
                )}
            </div>

            {/* Create Group Modal */}
            <AnimatePresence>
                {showCreateModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                        onClick={() => setShowCreateModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="w-full max-w-md bg-gradient-to-br from-ocean-medium to-ocean-deep rounded-2xl border border-ocean-light/30 shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between p-6 border-b border-white/10">
                                <h3 className="text-xl font-black">Создать группу</h3>
                                <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-white/10 rounded-lg">
                                    <X size={20} />
                                </button>
                            </div>
                            
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="text-xs text-slate-500 uppercase tracking-widest mb-2 block">Название</label>
                                    <input
                                        type="text"
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        placeholder="Название группы"
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-500/50 outline-none"
                                    />
                                </div>
                                
                                <div>
                                    <label className="text-xs text-slate-500 uppercase tracking-widest mb-2 block">Описание</label>
                                    <textarea
                                        value={newDescription}
                                        onChange={(e) => setNewDescription(e.target.value)}
                                        placeholder="Описание группы..."
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-500/50 outline-none resize-none"
                                    />
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-slate-500 uppercase tracking-widest mb-2 block">Тип</label>
                                        <select
                                            value={newType}
                                            onChange={(e) => setNewType(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-500/50 outline-none"
                                        >
                                            <option value="community">Сообщество</option>
                                            <option value="research">Исследовательская</option>
                                            <option value="technical">Техническая</option>
                                            <option value="business">Бизнес</option>
                                            <option value="regional">Региональная</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs text-slate-500 uppercase tracking-widest mb-2 block">Категория</label>
                                        <select
                                            value={newCategory}
                                            onChange={(e) => setNewCategory(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-500/50 outline-none"
                                        >
                                            {categories.filter(c => c.id).map(cat => (
                                                <option key={cat.id} value={cat.id!}>{cat.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
                                    <button
                                        onClick={() => setNewIsPrivate(!newIsPrivate)}
                                        className={cn(
                                            "w-12 h-6 rounded-full transition-all relative",
                                            newIsPrivate ? "bg-cyan-500" : "bg-white/10"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all",
                                            newIsPrivate ? "left-6" : "left-0.5"
                                        )} />
                                    </button>
                                    <div>
                                        <div className="font-bold text-sm flex items-center gap-2">
                                            {newIsPrivate ? <Lock size={14} /> : <Unlock size={14} />}
                                            {newIsPrivate ? 'Закрытая группа' : 'Открытая группа'}
                                        </div>
                                        <p className="text-xs text-slate-500">
                                            {newIsPrivate ? 'Требуется одобрение для вступления' : 'Любой может вступить'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex gap-4 p-6 border-t border-white/10">
                                <button
                                    onClick={() => setShowCreateModal(false)}
                                    className="flex-1 py-3 glass border-white/10 rounded-xl font-bold hover:bg-white/5"
                                >
                                    Отмена
                                </button>
                                <button
                                    onClick={handleCreateGroup}
                                    disabled={apiLoading || !newName.trim()}
                                    className="flex-1 py-3 bg-cyan-500 text-ocean-deep rounded-xl font-bold hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {apiLoading ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
                                    Создать
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
