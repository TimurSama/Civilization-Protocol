"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Vote, MessageSquare, TrendingUp, Users, Clock, CheckCircle2, AlertCircle, 
  ChevronRight, Wallet, Plus, X, ThumbsUp, ThumbsDown, Shield, Award,
  FileText, Target, BarChart3, Calendar, Share2, Bell, ExternalLink,
  Zap, Lock, Unlock, Info, History, Filter, Search, ArrowUpRight, 
  ArrowDownRight, ChevronDown, Copy
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import DelegateVotesModal from "@/components/DelegateVotesModal";

interface Proposal {
    id: string;
    title: string;
    titleEn: string;
    titleAr: string;
    desc: string;
    descEn: string;
    descAr: string;
    status: "active" | "passed" | "rejected" | "pending" | "quorum";
    votesFor: number;
    votesAgainst: number;
    abstain: number;
    endTime: string;
    startDate: string;
    endDate: string;
    category: "Infrastructure" | "Economic" | "Ecological" | "Integration" | "Science" | "Technology" | "Partnership" | "Education" | "Governance";
    author: string;
    authorAvatar: string;
    quorum: number;
    quorumReached: boolean;
    totalVoters: number;
    vodRequired: number;
    reward: number;
    discussion: number;
    priority: "low" | "medium" | "high" | "critical";
}

// Translations
const t = {
  en: {
    title: "DAO Governance",
    subtitle: "Shape the future of the ecosystem through decentralized proposals",
    createProposal: "Create Proposal",
    active: "Active",
    all: "All",
    history: "History",
    pending: "Pending",
    totalProposals: "Total Proposals",
    activeVoters: "Active Voters",
    treasury: "Treasury",
    participation: "Participation Rate",
    allCategories: "All Categories",
    newest: "Newest",
    byVotes: "By Votes",
    ending: "Ending Soon",
    voteFor: "Vote For",
    voteAgainst: "Vote Against",
    abstain: "Abstain",
    vote: "Vote",
    remaining: "Remaining",
    author: "Author",
    quorum: "Quorum",
    voters: "Voters",
    reward: "Reward",
    discussion: "Discussion",
    delegate: "Delegate Votes",
    delegateTo: "Delegate to",
    myVotingPower: "My Voting Power",
    delegatedTo: "Delegated to",
    delegations: "Delegations",
    proposalDetails: "Proposal Details",
    timeline: "Timeline",
    results: "Results",
    passed: "Passed",
    rejected: "Rejected",
    inProgress: "In Progress",
    quorumReached: "Quorum Reached",
    quorumNotReached: "Quorum Not Reached",
    submitVote: "Submit Vote",
    cancel: "Cancel",
    yourVote: "Your Vote",
    votingPower: "Voting Power",
    minVodRequired: "Min VOD Required",
    earnReward: "Earn Reward",
    search: "Search proposals...",
    noProposals: "No proposals found",
    createNew: "Create New Proposal",
    proposalTitle: "Title",
    proposalDescription: "Description",
    proposalCategory: "Category",
    submit: "Submit",
    delegateVotes: "Delegate Voting Power",
    delegateAddress: "Delegate Address",
    amount: "Amount",
    confirm: "Confirm Delegation",
    notifications: "Get Notifications",
    share: "Share",
    viewOnChain: "View on Chain"
  },
  ru: {
    title: "DAO Управление",
    subtitle: "Формируйте будущее экосистемы через децентрализованные предложения",
    createProposal: "Создать предложение",
    active: "Активные",
    all: "Все",
    history: "История",
    pending: "Ожидающие",
    totalProposals: "Всего предложений",
    activeVoters: "Активных участников",
    treasury: "Казначейство",
    participation: "Уровень участия",
    allCategories: "Все категории",
    newest: "Новые",
    byVotes: "По голосам",
    ending: "Заканчиваются",
    voteFor: "За",
    voteAgainst: "Против",
    abstain: "Воздержаться",
    vote: "Голосовать",
    remaining: "Осталось",
    author: "Автор",
    quorum: "Кворум",
    voters: "Голосов",
    reward: "Награда",
    discussion: "Обсуждение",
    delegate: "Делегировать",
    delegateTo: "Делегировать",
    myVotingPower: "Мой вес голоса",
    delegatedTo: "Делегировано",
    delegations: "Делегации",
    proposalDetails: "Детали предложения",
    timeline: "Сроки",
    results: "Результаты",
    passed: "Принято",
    rejected: "Отклонено",
    inProgress: "В процессе",
    quorumReached: "Кворум достигнут",
    quorumNotReached: "Кворум не достигнут",
    submitVote: "Подтвердить голос",
    cancel: "Отмена",
    yourVote: "Ваш голос",
    votingPower: "Вес голоса",
    minVodRequired: "Мин. VOD",
    earnReward: "Награда",
    search: "Поиск предложений...",
    noProposals: "Предложения не найдены",
    createNew: "Создать новое предложение",
    proposalTitle: "Заголовок",
    proposalDescription: "Описание",
    proposalCategory: "Категория",
    submit: "Отправить",
    delegateVotes: "Делегировать голоса",
    delegateAddress: "Адрес делегата",
    amount: "Количество",
    confirm: "Подтвердить делегирование",
    notifications: "Уведомления",
    share: "Поделиться",
    viewOnChain: "Смотреть в блокчейне"
  },
  ar: {
    title: "حوكمة DAO",
    subtitle: "شكل مستقبل النظام البيئي من خلال المقترحات اللامركزية",
    createProposal: "إنشاء اقتراح",
    active: "نشط",
    all: "الكل",
    history: "التاريخ",
    pending: "معلق",
    totalProposals: "إجمالي الاقتراحات",
    activeVoters: "المصوتون النشطون",
    treasury: "الخزينة",
    participation: "معدل المشاركة",
    allCategories: "جميع الفئات",
    newest: "الأحدث",
    byVotes: "حسب الأصوات",
    ending: "ينتهي قريباً",
    voteFor: "لصالح",
    voteAgainst: "ضد",
    abstain: "امتناع",
    vote: "تصويت",
    remaining: "المتبقي",
    author: "المؤلف",
    quorum: "النصاب",
    voters: "المصوتون",
    reward: "المكافأة",
    discussion: "النقاش",
    delegate: "تفويض",
    delegateTo: "تفويض إلى",
    myVotingPower: "قوتي التصويتية",
    delegatedTo: "مفوض إلى",
    delegations: "التفويضات",
    proposalDetails: "تفاصيل الاقتراح",
    timeline: "الجدول الزمني",
    results: "النتائج",
    passed: "تم التمرير",
    rejected: "مرفوض",
    inProgress: "قيد التنفيذ",
    quorumReached: "تم الوصول للنصاب",
    quorumNotReached: "لم يتم الوصول للنصاب",
    submitVote: "تأكيد التصويت",
    cancel: "إلغاء",
    yourVote: "تصويتك",
    votingPower: "قوة التصويت",
    minVodRequired: "الحد الأدنى VOD",
    earnReward: "المكافأة",
    search: "بحث الاقتراحات...",
    noProposals: "لم يتم العثور على اقتراحات",
    createNew: "إنشاء اقتراح جديد",
    proposalTitle: "العنوان",
    proposalDescription: "الوصف",
    proposalCategory: "الفئة",
    submit: "إرسال",
    delegateVotes: "تفويض الأصوات",
    delegateAddress: "عنوان المفوض",
    amount: "المبلغ",
    confirm: "تأكيد التفويض",
    notifications: "الإشعارات",
    share: "مشاركة",
    viewOnChain: "عرض على السلسلة"
  }
};

export default function GovernancePage() {
    const { language } = useLanguage();
    const { isAuthenticated, user } = useAuth();
    const tr = t[language as keyof typeof t] || t.en;
    
    const [activeTab, setActiveTab] = useState<"active" | "all" | "history" | "pending">("active");
    const [categoryFilter, setCategoryFilter] = useState<string>("all");
    const [sortBy, setSortBy] = useState<"newest" | "votes" | "ending">("newest");
    const [searchQuery, setSearchQuery] = useState("");
    const [showVoteModal, setShowVoteModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDelegateModal, setShowDelegateModal] = useState(false);
    const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
    const [voteChoice, setVoteChoice] = useState<"for" | "against" | "abstain" | null>(null);

    const categories = ["all", "Infrastructure", "Economic", "Ecological", "Integration", "Science", "Technology", "Partnership", "Education", "Governance"];
    
    const categoryColors: Record<string, string> = {
        Infrastructure: "text-blue-400 border-blue-500/20 bg-blue-500/5",
        Economic: "text-purple-400 border-purple-500/20 bg-purple-500/5",
        Ecological: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
        Integration: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5",
        Science: "text-indigo-400 border-indigo-500/20 bg-indigo-500/5",
        Technology: "text-orange-400 border-orange-500/20 bg-orange-500/5",
        Partnership: "text-pink-400 border-pink-500/20 bg-pink-500/5",
        Education: "text-yellow-400 border-yellow-500/20 bg-yellow-500/5",
        Governance: "text-red-400 border-red-500/20 bg-red-500/5",
    };
    
    const proposals: Proposal[] = [
        {
            id: "VOD-124",
            title: "Модернизация очистных сооружений в Бухаре",
            titleEn: "Bukhara Water Treatment Modernization",
            titleAr: "تحديث محطة معالجة المياه في بخارى",
            desc: "Предложение по замене старых фильтров на новые мембранные системы с IoT-датчиками для снижения энергопотребления на 15%.",
            descEn: "Proposal to replace old filters with new membrane systems with IoT sensors to reduce energy consumption by 15%.",
            descAr: "اقتراح لاستبدال الفلاتر القديمة بأنظمة غشائية جديدة مع أجهزة استشعار IoT لتقليل استهلاك الطاقة بنسبة 15٪.",
            status: "active",
            votesFor: 125400,
            votesAgainst: 12000,
            abstain: 5600,
            endTime: "2 дня",
            startDate: "2024-12-20",
            endDate: "2024-12-28",
            category: "Infrastructure",
            author: "Alex_Guardian",
            authorAvatar: "AG",
            quorum: 100000,
            quorumReached: true,
            totalVoters: 1234,
            vodRequired: 100,
            reward: 50,
            discussion: 45,
            priority: "high"
        },
        {
            id: "VOD-125",
            title: "Интеграция с UN-Water для SDG 6",
            titleEn: "UN-Water Integration for SDG 6",
            titleAr: "التكامل مع UN-Water لـ SDG 6",
            desc: "Подключение платформы Civilization Protocol к системам ООН для автоматической генерации отчетов по Целям устойчивого развития.",
            descEn: "Connect Civilization Protocol platform to UN systems for automatic SDG reporting.",
            descAr: "ربط منصة Civilization Protocol بأنظمة الأمم المتحدة للإبلاغ التلقائي عن أهداف التنمية المستدامة.",
            status: "active",
            votesFor: 680000,
            votesAgainst: 12000,
            abstain: 8000,
            endTime: "4 дня",
            startDate: "2024-12-18",
            endDate: "2024-12-30",
            category: "Integration",
            author: "CivilizationProtocol Global",
            authorAvatar: "VG",
            quorum: 500000,
            quorumReached: true,
            totalVoters: 5678,
            vodRequired: 500,
            reward: 100,
            discussion: 89,
            priority: "critical"
        },
        {
            id: "VOD-126",
            title: "Запуск программы стейкинга",
            titleEn: "Staking Program Launch",
            titleAr: "إطلاق برنامج Staking",
            desc: "Введение системы стейкинга VOD токенов с APY 5-25% в зависимости от срока блокировки.",
            descEn: "Introduction of VOD token staking with 5-25% APY depending on lock period.",
            descAr: "إدخال نظام staking لرموز VOD مع APY 5-25٪ حسب فترة القفل.",
            status: "pending",
            votesFor: 0,
            votesAgainst: 0,
            abstain: 0,
            endTime: "Ожидает",
            startDate: "2025-01-05",
            endDate: "2025-01-20",
            category: "Economic",
            author: "TokenHub",
            authorAvatar: "TH",
            quorum: 300000,
            quorumReached: false,
            totalVoters: 0,
            vodRequired: 250,
            reward: 75,
            discussion: 156,
            priority: "high"
        },
        {
            id: "VOD-123",
            title: "Введение регионального коэффициента для Азии",
            titleEn: "Regional Coefficient for Asia",
            titleAr: "المعامل الإقليمي لآسيا",
            desc: "Корректировка стоимости VOD токена в азиатском регионе с учетом текущих экологических показателей и дефицита ресурсов.",
            descEn: "Adjust VOD token value in Asia based on current ecological indicators and resource deficit.",
            descAr: "تعديل قيمة رمز VOD في آسيا بناءً على المؤشرات البيئية الحالية وعجز الموارد.",
            status: "passed",
            votesFor: 450000,
            votesAgainst: 45000,
            abstain: 15000,
            endTime: "Завершено",
            startDate: "2024-11-01",
            endDate: "2024-11-15",
            category: "Economic",
            author: "Eco_Gov_UZ",
            authorAvatar: "EG",
            quorum: 300000,
            quorumReached: true,
            totalVoters: 4567,
            vodRequired: 100,
            reward: 50,
            discussion: 234,
            priority: "medium"
        },
        {
            id: "VOD-122",
            title: "Программа восстановления малых рек Ферганы",
            titleEn: "Fergana Small Rivers Restoration Program",
            titleAr: "برنامج استعادة الأنهار الصغيرة في فرغانة",
            desc: "Выделение гранта в размере 50,000 VOD на очистку русел рек силами волонтеров и местных сообществ.",
            descEn: "Grant of 50,000 VOD for river cleanup by volunteers and local communities.",
            descAr: "منحة بقيمة 50,000 VOD لتنظيف الأنهار من قبل المتطوعين والمجتمعات المحلية.",
            status: "active",
            votesFor: 85000,
            votesAgainst: 5000,
            abstain: 2000,
            endTime: "5 дней",
            startDate: "2024-12-22",
            endDate: "2025-01-02",
            category: "Ecological",
            author: "Science_Hub",
            authorAvatar: "SH",
            quorum: 50000,
            quorumReached: true,
            totalVoters: 890,
            vodRequired: 50,
            reward: 25,
            discussion: 67,
            priority: "medium"
        },
        {
            id: "VOD-127",
            title: "Создание научного фонда",
            titleEn: "Scientific Research Fund Creation",
            titleAr: "إنشاء صندوق البحث العلمي",
            desc: "Выделение 500,000 VOD на создание фонда для финансирования научных исследований в области водных ресурсов.",
            descEn: "Allocation of 500,000 VOD for scientific research fund in water resources.",
            descAr: "تخصيص 500,000 VOD لصندوق البحث العلمي في مجال الموارد المائية.",
            status: "active",
            votesFor: 420000,
            votesAgainst: 25000,
            abstain: 10000,
            endTime: "6 дней",
            startDate: "2024-12-23",
            endDate: "2025-01-03",
            category: "Science",
            author: "CivilizationProtocol Science",
            authorAvatar: "VS",
            quorum: 300000,
            quorumReached: true,
            totalVoters: 3456,
            vodRequired: 200,
            reward: 80,
            discussion: 123,
            priority: "high"
        },
        {
            id: "VOD-128",
            title: "Модернизация IoT сети в ЦА",
            titleEn: "Central Asia IoT Network Modernization",
            titleAr: "تحديث شبكة IoT في آسيا الوسطى",
            desc: "Установка 500 новых IoT датчиков на ключевых водных объектах Центральной Азии.",
            descEn: "Installation of 500 new IoT sensors at key water facilities in Central Asia.",
            descAr: "تركيب 500 جهاز استشعار IoT جديد في المنشآت المائية الرئيسية في آسيا الوسطى.",
            status: "active",
            votesFor: 380000,
            votesAgainst: 28000,
            abstain: 12000,
            endTime: "8 дней",
            startDate: "2024-12-24",
            endDate: "2025-01-05",
            category: "Infrastructure",
            author: "CivilizationProtocol Infra",
            authorAvatar: "VI",
            quorum: 250000,
            quorumReached: true,
            totalVoters: 2890,
            vodRequired: 150,
            reward: 60,
            discussion: 78,
            priority: "high"
        },
        {
            id: "VOD-130",
            title: "Партнерство с Regen Network",
            titleEn: "Regen Network Partnership",
            titleAr: "شراكة مع Regen Network",
            desc: "Интеграция системы углеродных кредитов Regen Network в экосистему Civilization Protocol.",
            descEn: "Integration of Regen Network carbon credit system into CivilizationProtocol ecosystem.",
            descAr: "دمج نظام أرصدة الكربون Regen Network في نظام CivilizationProtocol البيئي.",
            status: "passed",
            votesFor: 750000,
            votesAgainst: 22000,
            abstain: 8000,
            endTime: "Завершено",
            startDate: "2024-10-15",
            endDate: "2024-10-30",
            category: "Partnership",
            author: "CivilizationProtocol Partners",
            authorAvatar: "VP",
            quorum: 500000,
            quorumReached: true,
            totalVoters: 6789,
            vodRequired: 500,
            reward: 150,
            discussion: 345,
            priority: "critical"
        },
        {
            id: "VOD-131",
            title: "Запуск образовательной платформы",
            titleEn: "Educational Platform Launch",
            titleAr: "إطلاق منصة تعليمية",
            desc: "Создание образовательной платформы с курсами по устойчивому водопользованию. NFT-сертификаты для студентов.",
            descEn: "Educational platform with sustainable water management courses. NFT certificates for students.",
            descAr: "منصة تعليمية مع دورات في إدارة المياه المستدامة. شهادات NFT للطلاب.",
            status: "active",
            votesFor: 340000,
            votesAgainst: 19000,
            abstain: 6000,
            endTime: "10 дней",
            startDate: "2024-12-25",
            endDate: "2025-01-08",
            category: "Education",
            author: "CivilizationProtocol Education",
            authorAvatar: "VE",
            quorum: 200000,
            quorumReached: true,
            totalVoters: 2345,
            vodRequired: 100,
            reward: 45,
            discussion: 89,
            priority: "medium"
        },
        {
            id: "VOD-132",
            title: "Реформа казначейства DAO",
            titleEn: "DAO Treasury Reform",
            titleAr: "إصلاح خزينة DAO",
            desc: "Изменение правил управления казной DAO: увеличение порога для крупных трат до 1M VOD.",
            descEn: "Change DAO treasury rules: increase threshold for large expenses to 1M VOD.",
            descAr: "تغيير قواعد خزينة DAO: زيادة عتبة النفقات الكبيرة إلى 1M VOD.",
            status: "active",
            votesFor: 210000,
            votesAgainst: 35000,
            abstain: 15000,
            endTime: "7 дней",
            startDate: "2024-12-23",
            endDate: "2025-01-02",
            category: "Governance",
            author: "DAO Council",
            authorAvatar: "DC",
            quorum: 150000,
            quorumReached: true,
            totalVoters: 1890,
            vodRequired: 300,
            reward: 100,
            discussion: 234,
            priority: "critical"
        },
        {
            id: "VOD-133",
            title: "Программа восстановления Аральского моря",
            titleEn: "Aral Sea Restoration Program",
            titleAr: "برنامج استعادة بحر آرال",
            desc: "Комплексная программа восстановления экосистемы Аральского моря. Бюджет: 500M VOD.",
            descEn: "Comprehensive Aral Sea ecosystem restoration program. Budget: 500M VOD.",
            descAr: "برنامج شامل لاستعادة النظام البيئي لبحر آرال. الميزانية: 500M VOD.",
            status: "pending",
            votesFor: 0,
            votesAgainst: 0,
            abstain: 0,
            endTime: "Ожидает",
            startDate: "2025-02-01",
            endDate: "2025-03-01",
            category: "Ecological",
            author: "EcoGuard Community",
            authorAvatar: "EC",
            quorum: 1000000,
            quorumReached: false,
            totalVoters: 0,
            vodRequired: 1000,
            reward: 500,
            discussion: 567,
            priority: "critical"
        }
    ];

    const filteredProposals = proposals
        .filter(p => {
            if (activeTab === "active") return p.status === "active";
            if (activeTab === "history") return p.status === "passed" || p.status === "rejected";
            if (activeTab === "pending") return p.status === "pending";
            return true;
        })
        .filter(p => categoryFilter === "all" || p.category === categoryFilter)
        .filter(p => {
            if (!searchQuery) return true;
            const title = language === 'ru' ? p.title : language === 'ar' ? p.titleAr : p.titleEn;
            return title.toLowerCase().includes(searchQuery.toLowerCase());
        })
        .sort((a, b) => {
            if (sortBy === "votes") return (b.votesFor + b.votesAgainst) - (a.votesFor + a.votesAgainst);
            return 0;
        });

    const stats = [
        { label: tr.totalProposals, value: "1,245", icon: MessageSquare, change: "+12" },
        { label: tr.activeVoters, value: "45.2k", icon: Users, change: "+1.2k" },
        { label: tr.treasury, value: "12.4M VOD", icon: Wallet, change: "+500k" },
        { label: tr.participation, value: "68%", icon: TrendingUp, change: "+5%" },
    ];

    const userVotingPower = isAuthenticated ? (user?.vodBalance || 0) * 1.5 : 0;

    const handleVote = (proposal: Proposal) => {
        setSelectedProposal(proposal);
        setVoteChoice(null);
        setShowVoteModal(true);
    };

    const submitVote = () => {
        if (selectedProposal && voteChoice) {
            // API call would go here
            console.log(`Voted ${voteChoice} on ${selectedProposal.id}`);
            setShowVoteModal(false);
        }
    };

    const getProposalTitle = (p: Proposal) => {
        return language === 'ru' ? p.title : language === 'ar' ? p.titleAr : p.titleEn;
    };

    const getProposalDesc = (p: Proposal) => {
        return language === 'ru' ? p.desc : language === 'ar' ? p.descAr : p.descEn;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-glow-cyan mb-2">{tr.title}</h1>
                        <p className="text-slate-400">{tr.subtitle}</p>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={() => setShowDelegateModal(true)}
                            className="px-6 py-3 glass rounded-xl font-bold flex items-center gap-2 hover:bg-white/10 transition-colors"
                        >
                            <Share2 size={18} />
                            {tr.delegate}
                        </button>
                        <button 
                            onClick={() => setShowCreateModal(true)}
                            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:opacity-90 transition-all flex items-center gap-2"
                        >
                            <Plus size={18} />
                            {tr.createProposal}
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Voting Power Card */}
            {isAuthenticated && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-6 mb-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="p-4 rounded-2xl bg-cyan-500/20">
                                <Zap className="text-cyan-400" size={32} />
                            </div>
                            <div>
                                <div className="text-sm text-slate-400">{tr.myVotingPower}</div>
                                <div className="text-3xl font-black text-cyan-400">{userVotingPower.toLocaleString()} VP</div>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="text-center">
                                <div className="text-2xl font-black">12</div>
                                <div className="text-xs text-slate-500">Votes Cast</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-black text-green-400">8</div>
                                <div className="text-xs text-slate-500">{tr.passed}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-black">0</div>
                                <div className="text-xs text-slate-500">{tr.delegatedTo}</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-5"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <stat.icon className="text-cyan-500" size={20} />
                            <span className="text-xs text-green-400 font-bold">{stat.change}</span>
                        </div>
                        <div className="text-2xl font-black">{stat.value}</div>
                        <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
                {/* Tabs */}
                <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl">
                    {[
                        { id: "active", label: tr.active, count: proposals.filter(p => p.status === "active").length },
                        { id: "pending", label: tr.pending, count: proposals.filter(p => p.status === "pending").length },
                        { id: "history", label: tr.history, count: proposals.filter(p => ["passed", "rejected"].includes(p.status)).length },
                        { id: "all", label: tr.all, count: proposals.length },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as "active" | "all" | "history" | "pending")}
                            className={cn(
                                "px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2",
                                activeTab === tab.id
                                    ? "bg-cyan-500/20 text-cyan-400"
                                    : "text-slate-500 hover:text-slate-300"
                            )}
                        >
                            {tab.label}
                            <span className="px-1.5 py-0.5 bg-white/10 rounded text-xs">{tab.count}</span>
                        </button>
                    ))}
                </div>
                
                {/* Search & Filters */}
                <div className="flex items-center gap-3 w-full lg:w-auto">
                    <div className="relative flex-1 lg:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                            type="text"
                            placeholder={tr.search}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-500/50 focus:outline-none"
                        />
                    </div>
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-bold focus:outline-none focus:border-cyan-500/50"
                    >
                        <option value="all">{tr.allCategories}</option>
                        {categories.slice(1).map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as "newest" | "votes" | "ending")}
                        className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-bold focus:outline-none focus:border-cyan-500/50"
                    >
                        <option value="newest">{tr.newest}</option>
                        <option value="votes">{tr.byVotes}</option>
                        <option value="ending">{tr.ending}</option>
                    </select>
                </div>
            </div>

            {/* Proposals List */}
            <div className="space-y-4">
                <AnimatePresence>
                    {filteredProposals.length === 0 ? (
                        <div className="glass-card p-12 text-center">
                            <MessageSquare className="mx-auto mb-4 text-slate-600" size={48} />
                            <h3 className="text-xl font-bold mb-2">{tr.noProposals}</h3>
                            <button 
                                onClick={() => setShowCreateModal(true)}
                                className="mt-4 px-6 py-3 bg-cyan-500/20 text-cyan-400 rounded-xl font-bold hover:bg-cyan-500/30 transition-colors"
                            >
                                {tr.createNew}
                            </button>
                        </div>
                    ) : (
                        filteredProposals.map((proposal, i) => (
                            <motion.div
                                key={proposal.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: i * 0.05 }}
                                className="glass-card p-6 hover:border-cyan-500/30 transition-all group"
                            >
                                <div className="flex flex-col lg:flex-row gap-6">
                                    {/* Left: Info */}
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-2 mb-3">
                                            <span className={cn(
                                                "text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded border",
                                                categoryColors[proposal.category]
                                            )}>
                                                {proposal.category}
                                            </span>
                                            <span className="text-[10px] text-slate-500 font-mono">{proposal.id}</span>
                                            {proposal.priority === "critical" && (
                                                <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-[10px] font-bold rounded">CRITICAL</span>
                                            )}
                                            {proposal.priority === "high" && (
                                                <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 text-[10px] font-bold rounded">HIGH</span>
                                            )}
                                        </div>
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                                            {getProposalTitle(proposal)}
                                        </h3>
                                        <p className="text-slate-400 text-sm mb-4 line-clamp-2">{getProposalDesc(proposal)}</p>
                                        
                                        {/* Meta */}
                                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                                            <div className="flex items-center gap-1">
                                                <Clock size={14} />
                                                {tr.remaining}: {proposal.endTime}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-[10px] text-white font-bold">
                                                    {proposal.authorAvatar}
                                                </div>
                                                {proposal.author}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Users size={14} />
                                                {proposal.totalVoters.toLocaleString()} {tr.voters}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MessageSquare size={14} />
                                                {proposal.discussion} {tr.discussion}
                                            </div>
                                            <div className="flex items-center gap-1 text-green-400">
                                                <Award size={14} />
                                                +{proposal.reward} VOD
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: Voting */}
                                    <div className="w-full lg:w-72 flex flex-col gap-4">
                                        {/* Quorum */}
                                        <div className="flex justify-between items-center text-xs mb-2">
                                            <span className="text-slate-500">{tr.quorum}</span>
                                            <span className={proposal.quorumReached ? "text-green-400" : "text-yellow-400"}>
                                                {proposal.quorumReached ? tr.quorumReached : tr.quorumNotReached}
                                            </span>
                                        </div>
                                        
                                        {/* Vote Bar */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-xs font-bold">
                                                <span className="text-emerald-500 flex items-center gap-1">
                                                    <ThumbsUp size={12} /> {tr.voteFor}
                                                </span>
                                                <span className="text-rose-500 flex items-center gap-1">
                                                    {tr.voteAgainst} <ThumbsDown size={12} />
                                                </span>
                                            </div>
                                            <div className="h-3 bg-white/5 rounded-full overflow-hidden flex">
                                                {proposal.votesFor + proposal.votesAgainst > 0 ? (
                                                    <>
                                                        <div
                                                            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                                                            style={{ width: `${(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst + proposal.abstain)) * 100}%` }}
                                                        />
                                                        <div
                                                            className="h-full bg-slate-500"
                                                            style={{ width: `${(proposal.abstain / (proposal.votesFor + proposal.votesAgainst + proposal.abstain)) * 100}%` }}
                                                        />
                                                        <div
                                                            className="h-full bg-gradient-to-r from-rose-400 to-rose-500"
                                                            style={{ width: `${(proposal.votesAgainst / (proposal.votesFor + proposal.votesAgainst + proposal.abstain)) * 100}%` }}
                                                        />
                                                    </>
                                                ) : (
                                                    <div className="h-full w-full bg-white/10" />
                                                )}
                                            </div>
                                            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                                                <span>{proposal.votesFor.toLocaleString()}</span>
                                                <span className="text-slate-600">{proposal.abstain.toLocaleString()}</span>
                                                <span>{proposal.votesAgainst.toLocaleString()}</span>
                                            </div>
                                        </div>
                                        
                                        {/* Vote Button */}
                                        {proposal.status === "active" ? (
                                            <button 
                                                onClick={() => handleVote(proposal)}
                                                className="w-full py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl font-bold text-sm text-cyan-400 hover:bg-cyan-500 hover:text-ocean-deep transition-all flex items-center justify-center gap-2"
                                            >
                                                <Vote size={16} />
                                                {tr.vote}
                                            </button>
                                        ) : proposal.status === "passed" ? (
                                            <div className="w-full py-3 bg-green-500/20 border border-green-500/30 rounded-xl font-bold text-sm text-green-400 text-center flex items-center justify-center gap-2">
                                                <CheckCircle2 size={16} />
                                                {tr.passed}
                                            </div>
                                        ) : proposal.status === "rejected" ? (
                                            <div className="w-full py-3 bg-red-500/20 border border-red-500/30 rounded-xl font-bold text-sm text-red-400 text-center flex items-center justify-center gap-2">
                                                <AlertCircle size={16} />
                                                {tr.rejected}
                                            </div>
                                        ) : (
                                            <div className="w-full py-3 bg-yellow-500/20 border border-yellow-500/30 rounded-xl font-bold text-sm text-yellow-400 text-center flex items-center justify-center gap-2">
                                                <Clock size={16} />
                                                {tr.pending}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            {/* Vote Modal */}
            <AnimatePresence>
                {showVoteModal && selectedProposal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowVoteModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="glass-card p-8 max-w-lg w-full"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-xl font-black mb-1">{getProposalTitle(selectedProposal)}</h3>
                                    <p className="text-sm text-slate-500">{selectedProposal.id}</p>
                                </div>
                                <button onClick={() => setShowVoteModal(false)} className="p-2 hover:bg-white/10 rounded-lg">
                                    <X size={20} />
                                </button>
                            </div>
                            
                            <div className="space-y-3 mb-6">
                                {[
                                    { id: "for", label: tr.voteFor, icon: ThumbsUp, color: "emerald" },
                                    { id: "against", label: tr.voteAgainst, icon: ThumbsDown, color: "rose" },
                                    { id: "abstain", label: tr.abstain, icon: AlertCircle, color: "slate" },
                                ].map(option => (
                                    <button
                                        key={option.id}
                                        onClick={() => setVoteChoice(option.id as "for" | "against" | "abstain")}
                                        className={cn(
                                            "w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3",
                                            voteChoice === option.id
                                                ? `border-${option.color}-500 bg-${option.color}-500/20`
                                                : "border-white/10 hover:border-white/20"
                                        )}
                                    >
                                        <option.icon className={`text-${option.color}-400`} size={24} />
                                        <span className="font-bold">{option.label}</span>
                                        {voteChoice === option.id && (
                                            <CheckCircle2 className="ml-auto text-cyan-400" size={20} />
                                        )}
                                    </button>
                                ))}
                            </div>
                            
                            <div className="p-4 bg-white/5 rounded-xl mb-6">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-slate-400">{tr.votingPower}</span>
                                    <span className="font-bold text-cyan-400">{userVotingPower.toLocaleString()} VP</span>
                                </div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-slate-400">{tr.minVodRequired}</span>
                                    <span>{selectedProposal.vodRequired} VOD</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">{tr.earnReward}</span>
                                    <span className="text-green-400">+{selectedProposal.reward} VOD</span>
                                </div>
                            </div>
                            
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowVoteModal(false)}
                                    className="flex-1 py-3 glass rounded-xl font-bold hover:bg-white/10 transition-colors"
                                >
                                    {tr.cancel}
                                </button>
                                <button
                                    onClick={submitVote}
                                    disabled={!voteChoice}
                                    className={cn(
                                        "flex-1 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2",
                                        voteChoice
                                            ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90"
                                            : "bg-white/10 text-slate-500 cursor-not-allowed"
                                    )}
                                >
                                    <Vote size={18} />
                                    {tr.submitVote}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Create Proposal Modal */}
            <AnimatePresence>
                {showCreateModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowCreateModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="glass-card p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-black">{tr.createNew}</h3>
                                <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-white/10 rounded-lg">
                                    <X size={20} />
                                </button>
                            </div>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold mb-2">{tr.proposalTitle}</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-500/50 focus:outline-none"
                                        placeholder="Enter proposal title..."
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-bold mb-2">{tr.proposalDescription}</label>
                                    <textarea
                                        rows={5}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-500/50 focus:outline-none resize-none"
                                        placeholder="Describe your proposal..."
                                    />
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold mb-2">{tr.proposalCategory}</label>
                                        <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-500/50 focus:outline-none">
                                            {categories.slice(1).map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold mb-2">Duration</label>
                                        <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-500/50 focus:outline-none">
                                            <option value="7">7 days</option>
                                            <option value="14">14 days</option>
                                            <option value="21">21 days</option>
                                            <option value="30">30 days</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                                    <div className="flex items-start gap-3">
                                        <Info className="text-yellow-400 shrink-0 mt-0.5" size={20} />
                                        <div>
                                            <p className="text-sm text-yellow-400 font-medium">
                                                {language === 'ru' 
                                                    ? 'Создание предложения требует минимум 1,000 VOD. После создания вы получите 100 XP.'
                                                    : language === 'ar'
                                                    ? 'إنشاء اقتراح يتطلب 1,000 VOD كحد أدنى. ستحصل على 100 XP بعد الإنشاء.'
                                                    : 'Creating a proposal requires minimum 1,000 VOD. You will receive 100 XP after creation.'
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowCreateModal(false)}
                                        className="flex-1 py-4 glass rounded-xl font-bold hover:bg-white/10 transition-colors"
                                    >
                                        {tr.cancel}
                                    </button>
                                    <button className="flex-1 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2">
                                        <Plus size={18} />
                                        {tr.submit}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Delegate Modal */}
            <DelegateVotesModal
                isOpen={showDelegateModal}
                onClose={() => setShowDelegateModal(false)}
                votingPower={userVotingPower}
            />
        </div>
    );
}
