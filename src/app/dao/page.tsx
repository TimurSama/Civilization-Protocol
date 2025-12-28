"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Shield, Users, Vote, MessageSquare,
    ChevronRight, CheckCircle2, Clock,
    AlertCircle, Send, User, Plus, Wallet, TrendingUp, Filter,
    Loader2, RefreshCw, X, ThumbsUp, ThumbsDown, Minus
} from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import { useAuth } from "@/context/AuthContext";
import { useDao } from "@/hooks/useApi";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface Proposal {
    id: string;
    title: string;
    description: string;
    category: string;
    status: string;
    votesFor: number;
    votesAgainst: number;
    votesAbstain: number;
    budgetRequested?: number;
    endDate: string;
    createdAt: string;
    author: {
        id: string;
        name: string;
        avatar?: string;
        verified: boolean;
    };
    userVote?: string | null;
    totalVotes: number;
    votersCount: number;
}

// Демо-предложения когда нет данных в БД
const demoProposals = [
    {
        id: "demo-1",
        title: "Модернизация очистных сооружений в секторе A-1",
        description: "Предложение по внедрению новых графеновых фильтров для повышения эффективности очистки на 25%. Это позволит снизить энергопотребление и улучшить качество воды в жилых районах.",
        status: "active",
        votesFor: 124500,
        votesAgainst: 12000,
        votesAbstain: 5000,
        endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        author: { id: "1", name: "VODPROM", verified: true },
        category: "infrastructure",
        userVote: null,
        totalVotes: 141500,
        votersCount: 1420,
        createdAt: new Date().toISOString(),
    },
    {
        id: "demo-2",
        title: "Снижение тарифов для социально значимых объектов",
        description: "Инициатива по субсидированию водных ресурсов для школ и больниц через фонд DAO. Предлагаем выделить 5M VOD на покрытие разницы в тарифах.",
        status: "active",
        votesFor: 450000,
        votesAgainst: 5000,
        votesAbstain: 2000,
        endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        author: { id: "2", name: "Gov_Dept", verified: true },
        category: "governance",
        userVote: null,
        totalVotes: 457000,
        votersCount: 4500,
        createdAt: new Date().toISOString(),
    },
    {
        id: "demo-3",
        title: "Запуск спутникового мониторинга ледников",
        description: "Проект по развертыванию группировки микроспутников для сверхточного отслеживания таяния льдов и прогнозирования уровня воды.",
        status: "passed",
        votesFor: 890000,
        votesAgainst: 45000,
        votesAbstain: 10000,
        endDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        author: { id: "3", name: "EcoSpace", verified: true },
        category: "research",
        userVote: null,
        totalVotes: 945000,
        votersCount: 9400,
        createdAt: new Date().toISOString(),
    },
];

export default function DAOPage() {
    const { balances, isConnected } = useWallet();
    const { user, isAuthenticated } = useAuth();
    const { getProposals, createProposal, vote, loading: apiLoading } = useDao();
    const { t } = useLanguage();
    
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [voting, setVoting] = useState(false);
    const [voteSuccess, setVoteSuccess] = useState<string | null>(null);

    // Форма создания
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newCategory, setNewCategory] = useState('infrastructure');
    const [newBudget, setNewBudget] = useState('');

    const categories = [
        { id: null, label: "Все" },
        { id: "infrastructure", label: "Инфраструктура" },
        { id: "governance", label: "Управление" },
        { id: "funding", label: "Финансирование" },
        { id: "research", label: "Исследования" },
        { id: "emergency", label: "Экстренные" },
    ];

    const statuses = [
        { id: null, label: "Все" },
        { id: "active", label: "Активные" },
        { id: "passed", label: "Принятые" },
        { id: "rejected", label: "Отклонённые" },
    ];

    const loadProposals = useCallback(async () => {
        try {
            const params: { category?: string; status?: string } = {};
            if (categoryFilter) params.category = categoryFilter;
            if (statusFilter) params.status = statusFilter;
            
            const result = await getProposals(params);
            if (result && result.proposals && result.proposals.length > 0) {
                setProposals(result.proposals);
                if (!selectedProposal) {
                    setSelectedProposal(result.proposals[0]);
                }
            } else {
                // Используем демо-данные
                setProposals(demoProposals);
                if (!selectedProposal) {
                    setSelectedProposal(demoProposals[0]);
                }
            }
        } catch (error) {
            console.error('Error loading proposals:', error);
            setProposals(demoProposals);
            if (!selectedProposal) {
                setSelectedProposal(demoProposals[0]);
            }
        } finally {
            setLoading(false);
        }
    }, [getProposals, categoryFilter, statusFilter, selectedProposal]);

    useEffect(() => {
        loadProposals();
    }, [loadProposals]);

    const handleRefresh = async () => {
        setRefreshing(true);
        await loadProposals();
        setRefreshing(false);
    };

    const handleVote = async (voteType: 'for' | 'against' | 'abstain') => {
        if (!selectedProposal || !isAuthenticated) return;
        
        setVoting(true);
        setVoteSuccess(null);
        
        const result = await vote(selectedProposal.id, voteType);
        
        if (result) {
            setVoteSuccess(result.message || 'Голос учтён!');
            // Обновляем локально
            setProposals(prev => prev.map(p => {
                if (p.id === selectedProposal.id) {
                    const updated = { ...p, userVote: voteType };
                    if (voteType === 'for') updated.votesFor += 1;
                    if (voteType === 'against') updated.votesAgainst += 1;
                    if (voteType === 'abstain') updated.votesAbstain += 1;
                    return updated;
                }
                return p;
            }));
            setSelectedProposal(prev => prev ? { ...prev, userVote: voteType } : null);
            
            setTimeout(() => setVoteSuccess(null), 3000);
        }
        
        setVoting(false);
    };

    const handleCreateProposal = async () => {
        if (!newTitle.trim() || !newDescription.trim()) return;
        
        const result = await createProposal({
            title: newTitle,
            description: newDescription,
            category: newCategory,
            budgetRequested: newBudget ? parseFloat(newBudget) : undefined,
        });
        
        if (result) {
            setShowCreateModal(false);
            setNewTitle('');
            setNewDescription('');
            setNewCategory('infrastructure');
            setNewBudget('');
            loadProposals();
        }
    };

    const formatTimeLeft = (endDate: string) => {
        const end = new Date(endDate);
        const now = new Date();
        const diffMs = end.getTime() - now.getTime();
        
        if (diffMs <= 0) return 'Завершено';
        
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        if (days > 0) return `${days} дн. ${hours} ч.`;
        return `${hours} ч.`;
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'text-cyan-400 bg-cyan-500/10';
            case 'passed': return 'text-emerald-400 bg-emerald-500/10';
            case 'rejected': return 'text-red-400 bg-red-500/10';
            default: return 'text-slate-400 bg-slate-500/10';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'active': return 'Активно';
            case 'passed': return 'Принято';
            case 'rejected': return 'Отклонено';
            case 'draft': return 'Черновик';
            default: return status;
        }
    };

    const getCategoryLabel = (category: string) => {
        const cat = categories.find(c => c.id === category);
        return cat?.label || category;
    };

    const stats = [
        { label: t("dao.treasury"), value: "$42.5M", icon: Wallet, color: "text-emerald-400" },
        { label: t("dao.voters"), value: "12,840", icon: Users, color: "text-blue-400" },
        { label: t("dao.active_proposals"), value: proposals.filter(p => p.status === 'active').length.toString(), icon: Vote, color: "text-cyan-400" },
        { label: "Participation", value: "68%", icon: TrendingUp, color: "text-purple-400" },
    ];

    const totalVotes = selectedProposal ? selectedProposal.votesFor + selectedProposal.votesAgainst + selectedProposal.votesAbstain : 0;
    const forPercent = totalVotes > 0 ? Math.round((selectedProposal?.votesFor || 0) / totalVotes * 100) : 0;
    const againstPercent = totalVotes > 0 ? Math.round((selectedProposal?.votesAgainst || 0) / totalVotes * 100) : 0;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16"
            >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                    <div>
                        <h1 className="text-5xl md:text-6xl font-black mb-4 text-glow-cyan tracking-tighter">{t("dao.title")}</h1>
                        <p className="text-xl text-slate-400 max-w-2xl">{t("dao.subtitle")}</p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={handleRefresh}
                            disabled={refreshing}
                            className="p-3 glass border-white/10 rounded-xl hover:bg-white/5 transition-all disabled:opacity-50"
                        >
                            <RefreshCw size={20} className={refreshing ? 'animate-spin' : ''} />
                        </button>
                        {isAuthenticated && (
                            <button 
                                onClick={() => setShowCreateModal(true)}
                                className="px-6 py-3 bg-cyan-500 text-ocean-deep rounded-xl font-black hover:scale-105 active:scale-95 transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2"
                            >
                                <Plus size={20} />
                                Создать предложение
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 border-white/5 bg-white/[0.02]"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={cn("p-3 rounded-xl bg-white/5", stat.color)}>
                                <stat.icon size={24} />
                            </div>
                        </div>
                        <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</div>
                        <div className="text-2xl md:text-3xl font-black text-white">{stat.value}</div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Proposals List */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-black flex items-center gap-2">
                            <Vote className="text-cyan-500" /> {t("dao.proposals")}
                        </h2>
                        <span className="text-xs text-slate-500">{proposals.length} всего</span>
                    </div>

                    {/* Filters */}
                    <div className="space-y-4 mb-6">
                        <div>
                            <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Категория</div>
                            <div className="flex flex-wrap gap-2">
                                {categories.slice(0, 4).map(cat => (
                                    <button
                                        key={cat.id || 'all'}
                                        onClick={() => setCategoryFilter(cat.id)}
                                        className={cn(
                                            "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                                            categoryFilter === cat.id
                                                ? "bg-cyan-500 text-ocean-deep"
                                                : "bg-white/5 text-slate-500 hover:bg-white/10"
                                        )}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Статус</div>
                            <div className="flex flex-wrap gap-2">
                                {statuses.map(status => (
                                    <button
                                        key={status.id || 'all'}
                                        onClick={() => setStatusFilter(status.id)}
                                        className={cn(
                                            "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                                            statusFilter === status.id
                                                ? "bg-cyan-500 text-ocean-deep"
                                                : "bg-white/5 text-slate-500 hover:bg-white/10"
                                        )}
                                    >
                                        {status.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Loading */}
                    {loading && (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 size={32} className="animate-spin text-cyan-400" />
                        </div>
                    )}

                    {/* Proposals */}
                    {!loading && (
                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                            {proposals.map((p) => (
                                <motion.button
                                    key={p.id}
                                    layout
                                    onClick={() => setSelectedProposal(p)}
                                    className={cn(
                                        "w-full text-left p-5 rounded-2xl border transition-all group",
                                        selectedProposal?.id === p.id
                                            ? "bg-cyan-500/10 border-cyan-500/40"
                                            : "bg-white/[0.02] border-white/5 hover:border-white/20"
                                    )}
                                >
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <span className={cn("px-2 py-0.5 rounded text-[9px] font-black uppercase", getStatusColor(p.status))}>
                                            {getStatusLabel(p.status)}
                                        </span>
                                        {p.userVote && (
                                            <span className="text-[9px] text-emerald-400">✓ Голос учтён</span>
                                        )}
                                    </div>
                                    <h3 className="font-bold text-sm mb-2 group-hover:text-cyan-400 transition-colors leading-tight line-clamp-2">
                                        {p.title}
                                    </h3>
                                    <div className="flex justify-between items-center text-[10px]">
                                        <span className="text-slate-500">{getCategoryLabel(p.category)}</span>
                                        <span className="text-slate-400 flex items-center gap-1">
                                            <Clock size={10} />
                                            {formatTimeLeft(p.endDate)}
                                        </span>
                                    </div>
                                    {/* Mini progress bar */}
                                    <div className="mt-3 h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex">
                                        <div 
                                            className="h-full bg-cyan-500 rounded-full" 
                                            style={{ width: `${forPercent}%` }}
                                        />
                                        <div 
                                            className="h-full bg-red-500 rounded-full" 
                                            style={{ width: `${againstPercent}%` }}
                                        />
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Selected Proposal */}
                <div className="lg:col-span-2 space-y-6">
                    {selectedProposal && (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedProposal.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="glass-card p-6 md:p-8 border-white/5 bg-white/[0.02]"
                            >
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={cn("px-2 py-0.5 rounded text-[10px] font-black uppercase", getStatusColor(selectedProposal.status))}>
                                                {getStatusLabel(selectedProposal.status)}
                                            </span>
                                            <span className="text-[10px] text-slate-500 uppercase">
                                                {getCategoryLabel(selectedProposal.category)}
                                            </span>
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-black leading-tight">{selectedProposal.title}</h2>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 mb-6 text-sm text-slate-400">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-[10px] font-bold">
                                            {selectedProposal.author.name.slice(0, 2).toUpperCase()}
                                        </div>
                                        <span>{selectedProposal.author.name}</span>
                                        {selectedProposal.author.verified && <CheckCircle2 size={14} className="text-cyan-400" />}
                                    </div>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <Clock size={14} />
                                        {formatTimeLeft(selectedProposal.endDate)}
                                    </span>
                                </div>

                                <p className="text-slate-400 mb-8 text-base leading-relaxed">
                                    {selectedProposal.description}
                                </p>

                                {selectedProposal.budgetRequested && (
                                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-6">
                                        <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Запрашиваемый бюджет</div>
                                        <div className="text-2xl font-black text-emerald-400">{selectedProposal.budgetRequested.toLocaleString()} VOD</div>
                                    </div>
                                )}

                                {/* Voting Progress */}
                                <div className="space-y-4 mb-8 p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                                    <div className="flex justify-between text-xs font-black tracking-widest mb-2">
                                        <span className="text-cyan-400 uppercase flex items-center gap-2">
                                            <ThumbsUp size={14} />
                                            ЗА ({selectedProposal.votesFor.toLocaleString()})
                                        </span>
                                        <span className="text-rose-500 uppercase flex items-center gap-2">
                                            ПРОТИВ ({selectedProposal.votesAgainst.toLocaleString()})
                                            <ThumbsDown size={14} />
                                        </span>
                                    </div>
                                    <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden flex border border-white/10">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${forPercent}%` }}
                                            className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400"
                                        />
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${againstPercent}%` }}
                                            className="h-full bg-gradient-to-r from-red-500 to-red-400"
                                        />
                                    </div>
                                    <div className="flex justify-between text-xs text-slate-500">
                                        <span>{forPercent}%</span>
                                        <span className="text-slate-600">Воздержались: {selectedProposal.votesAbstain.toLocaleString()}</span>
                                        <span>{againstPercent}%</span>
                                    </div>
                                    <div className="text-center text-xs text-slate-500 pt-2 border-t border-white/5">
                                        Всего голосов: {totalVotes.toLocaleString()} • Участников: {selectedProposal.votersCount.toLocaleString()}
                                    </div>
                                </div>

                                {/* Vote Success Message */}
                                {voteSuccess && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 mb-6 flex items-center gap-2"
                                    >
                                        <CheckCircle2 size={18} />
                                        {voteSuccess}
                                    </motion.div>
                                )}

                                {/* Already Voted */}
                                {selectedProposal.userVote && (
                                    <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 mb-6 flex items-center gap-2">
                                        <CheckCircle2 size={18} />
                                        Вы уже проголосовали: {selectedProposal.userVote === 'for' ? 'ЗА' : selectedProposal.userVote === 'against' ? 'ПРОТИВ' : 'ВОЗДЕРЖАЛСЯ'}
                                    </div>
                                )}

                                {/* Vote Buttons */}
                                {selectedProposal.status === 'active' && !selectedProposal.userVote && (
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <button 
                                            onClick={() => handleVote('for')}
                                            disabled={voting || !isAuthenticated}
                                            className="flex-1 py-4 bg-cyan-500 text-ocean-deep font-black rounded-xl hover:scale-[1.02] transition-all shadow-xl shadow-cyan-500/20 text-sm uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {voting ? <Loader2 size={18} className="animate-spin" /> : <ThumbsUp size={18} />}
                                            Голосовать ЗА
                                        </button>
                                        <button 
                                            onClick={() => handleVote('against')}
                                            disabled={voting || !isAuthenticated}
                                            className="flex-1 py-4 bg-red-500/20 border border-red-500/30 text-red-400 font-black rounded-xl hover:bg-red-500/30 transition-all text-sm uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {voting ? <Loader2 size={18} className="animate-spin" /> : <ThumbsDown size={18} />}
                                            Голосовать ПРОТИВ
                                        </button>
                                        <button 
                                            onClick={() => handleVote('abstain')}
                                            disabled={voting || !isAuthenticated}
                                            className="py-4 px-6 glass border-white/10 text-slate-400 font-black rounded-xl hover:bg-white/10 transition-all text-sm uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            <Minus size={18} />
                                        </button>
                                    </div>
                                )}

                                {!isAuthenticated && selectedProposal.status === 'active' && (
                                    <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-sm text-center">
                                        Войдите в аккаунт, чтобы голосовать
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    )}

                    {/* User Stats if authenticated */}
                    {isAuthenticated && user && (
                        <div className="glass-card p-6 border-white/5 bg-white/[0.02]">
                            <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                                <Shield className="text-purple-400" />
                                Ваша сила голоса
                            </h3>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center p-4 rounded-xl bg-white/5">
                                    <div className="text-2xl font-black text-cyan-400">{user.vodBalance.toFixed(0)}</div>
                                    <div className="text-xs text-slate-500">VOD баланс</div>
                                </div>
                                <div className="text-center p-4 rounded-xl bg-white/5">
                                    <div className="text-2xl font-black text-purple-400">{user.stakedAmount.toFixed(0)}</div>
                                    <div className="text-xs text-slate-500">Застейкано</div>
                                </div>
                                <div className="text-center p-4 rounded-xl bg-white/5">
                                    <div className="text-2xl font-black text-emerald-400">{(1 + user.stakedAmount / 1000).toFixed(2)}x</div>
                                    <div className="text-xs text-slate-500">Множитель</div>
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 mt-4 text-center">
                                Чем больше VOD застейкано, тем больше вес вашего голоса
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Create Proposal Modal */}
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
                            className="w-full max-w-xl bg-gradient-to-br from-ocean-medium to-ocean-deep rounded-2xl border border-ocean-light/30 shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between p-6 border-b border-white/10">
                                <h3 className="text-xl font-black">Новое предложение</h3>
                                <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-white/10 rounded-lg">
                                    <X size={20} />
                                </button>
                            </div>
                            
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="text-xs text-slate-500 uppercase tracking-widest mb-2 block">Заголовок</label>
                                    <input
                                        type="text"
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                        placeholder="Краткое название предложения"
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-500/50 outline-none"
                                    />
                                </div>
                                
                                <div>
                                    <label className="text-xs text-slate-500 uppercase tracking-widest mb-2 block">Описание</label>
                                    <textarea
                                        value={newDescription}
                                        onChange={(e) => setNewDescription(e.target.value)}
                                        placeholder="Подробное описание предложения..."
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-500/50 outline-none resize-none"
                                    />
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
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
                                    <div>
                                        <label className="text-xs text-slate-500 uppercase tracking-widest mb-2 block">Бюджет (VOD)</label>
                                        <input
                                            type="number"
                                            value={newBudget}
                                            onChange={(e) => setNewBudget(e.target.value)}
                                            placeholder="0"
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-500/50 outline-none"
                                        />
                                    </div>
                                </div>
                                
                                <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-sm">
                                    ⚠️ Для создания предложения требуется минимум 100 VOD на балансе
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
                                    onClick={handleCreateProposal}
                                    disabled={apiLoading || !newTitle.trim() || !newDescription.trim()}
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
