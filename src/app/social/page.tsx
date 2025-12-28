"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, Users, Share2, Globe, MessageCircle, Target, Vote, User, Shield, Award, 
  ChevronRight, Search, Filter, TrendingUp, Clock, Heart, Eye, Plus, Star, Bookmark,
  Hash, Flame, Zap, CheckCircle2, Bell, Settings, Droplets, Building, Leaf, Microscope,
  Cpu, Briefcase, GraduationCap, Lightbulb, Map, BarChart3, Lock, Unlock, Send
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

const translations = {
  ru: {
    title: "Социальный слой",
    subtitle: "Центр взаимодействия сообщества VODeco",
    newTopic: "Новая тема",
    search: "Поиск обсуждений...",
    hot: "Горячее",
    new: "Новое",
    top: "Топ",
    loadMore: "Загрузить ещё",
    trends: "Тренды",
    activeUsers: "Активные участники",
    posts: "постов",
    haveIdea: "Есть идея?",
    createTopicDesc: "Создайте новую тему для обсуждения с сообществом",
    createTopic: "Создать тему",
    pinned: "Закреплено",
    hotBadge: "Горячее",
    messages: "Сообщения",
    friends: "Друзья",
    groups: "Группы",
    dao: "DAO",
    privateChats: "Личные и групповые чаты",
    yourNetwork: "Ваша сеть контактов",
    communities: "Сообщества по интересам",
    proposals: "Голосования и предложения",
    newMessages: "новых",
    active: "активных",
    all: "Все",
    technology: "Технологии",
    ecology: "Экология",
    governance: "Управление",
    investment: "Инвестиции",
    science: "Наука",
    education: "Образование",
    infrastructure: "Инфраструктура",
    regional: "Региональные",
    liveFeed: "Живая лента",
    events: "События",
    announcements: "Анонсы",
    weeklyDigest: "Еженедельный дайджест",
    expertPanel: "Экспертная панель",
    replies: "ответов",
    views: "просмотров",
    likes: "лайков",
    createNewTopic: "Создать новую тему",
    topicTitle: "Заголовок темы",
    topicContent: "Содержание",
    selectCategory: "Выберите категорию",
    addTags: "Добавить теги (через запятую)",
    publish: "Опубликовать",
    cancel: "Отмена",
    loginToCreate: "Войдите, чтобы создать тему"
  },
  en: {
    title: "Social Layer",
    subtitle: "VODeco Community Interaction Center",
    newTopic: "New Topic",
    search: "Search discussions...",
    hot: "Hot",
    new: "New",
    top: "Top",
    loadMore: "Load More",
    trends: "Trends",
    activeUsers: "Active Users",
    posts: "posts",
    haveIdea: "Have an idea?",
    createTopicDesc: "Create a new topic for community discussion",
    createTopic: "Create Topic",
    pinned: "Pinned",
    hotBadge: "Hot",
    messages: "Messages",
    friends: "Friends",
    groups: "Groups",
    dao: "DAO",
    privateChats: "Private & group chats",
    yourNetwork: "Your contact network",
    communities: "Communities by interest",
    proposals: "Voting & proposals",
    newMessages: "new",
    active: "active",
    all: "All",
    technology: "Technology",
    ecology: "Ecology",
    governance: "Governance",
    investment: "Investment",
    science: "Science",
    education: "Education",
    infrastructure: "Infrastructure",
    regional: "Regional",
    liveFeed: "Live Feed",
    events: "Events",
    announcements: "Announcements",
    weeklyDigest: "Weekly Digest",
    expertPanel: "Expert Panel",
    replies: "replies",
    views: "views",
    likes: "likes",
    createNewTopic: "Create New Topic",
    topicTitle: "Topic Title",
    topicContent: "Content",
    selectCategory: "Select Category",
    addTags: "Add tags (comma separated)",
    publish: "Publish",
    cancel: "Cancel",
    loginToCreate: "Login to create a topic"
  },
  ar: {
    title: "الطبقة الاجتماعية",
    subtitle: "مركز تفاعل مجتمع VODeco",
    newTopic: "موضوع جديد",
    search: "البحث في النقاشات...",
    hot: "ساخن",
    new: "جديد",
    top: "الأفضل",
    loadMore: "تحميل المزيد",
    trends: "الاتجاهات",
    activeUsers: "المستخدمون النشطون",
    posts: "منشورات",
    haveIdea: "لديك فكرة؟",
    createTopicDesc: "أنشئ موضوعًا جديدًا للنقاش مع المجتمع",
    createTopic: "إنشاء موضوع",
    pinned: "مثبت",
    hotBadge: "ساخن",
    messages: "الرسائل",
    friends: "الأصدقاء",
    groups: "المجموعات",
    dao: "DAO",
    privateChats: "المحادثات الخاصة والجماعية",
    yourNetwork: "شبكة جهات الاتصال",
    communities: "مجتمعات حسب الاهتمام",
    proposals: "التصويت والمقترحات",
    newMessages: "جديد",
    active: "نشط",
    all: "الكل",
    technology: "التكنولوجيا",
    ecology: "البيئة",
    governance: "الحوكمة",
    investment: "الاستثمار",
    science: "العلوم",
    education: "التعليم",
    infrastructure: "البنية التحتية",
    regional: "إقليمي",
    liveFeed: "البث المباشر",
    events: "الأحداث",
    announcements: "الإعلانات",
    weeklyDigest: "الملخص الأسبوعي",
    expertPanel: "لوحة الخبراء",
    replies: "ردود",
    views: "مشاهدات",
    likes: "إعجابات",
    createNewTopic: "إنشاء موضوع جديد",
    topicTitle: "عنوان الموضوع",
    topicContent: "المحتوى",
    selectCategory: "اختر الفئة",
    addTags: "أضف علامات (مفصولة بفواصل)",
    publish: "نشر",
    cancel: "إلغاء",
    loginToCreate: "سجل الدخول لإنشاء موضوع"
  }
};

const getCategoriesData = (t: typeof translations.ru) => [
  { id: "all", name: t.all, icon: Globe, count: 2456 },
  { id: "technology", name: t.technology, icon: Zap, count: 512 },
  { id: "ecology", name: t.ecology, icon: Leaf, count: 489 },
  { id: "governance", name: t.governance, icon: Vote, count: 656 },
  { id: "investment", name: t.investment, icon: TrendingUp, count: 278 },
  { id: "science", name: t.science, icon: Microscope, count: 310 },
  { id: "education", name: t.education, icon: GraduationCap, count: 189 },
  { id: "infrastructure", name: t.infrastructure, icon: Building, count: 234 },
  { id: "regional", name: t.regional, icon: Map, count: 167 },
];

const discussions = [
  { 
    id: 1,
    title: "Технологии очистки 2025: Мембранные системы vs Обратный осмос",
    excerpt: "Сравнительный анализ эффективности современных технологий очистки воды для промышленного применения...",
    replies: 156, views: 2340, likes: 89, 
    categoryId: "technology", 
    author: { name: "Alex_Tech", avatar: "AT", verified: true, role: "Expert" },
    tags: ["#очистка", "#мембраны", "#технологии"],
    pinned: true,
    hot: true,
    time: "2 часа назад"
  },
  { 
    id: 2,
    title: "Мониторинг водных ресурсов в Центральной Азии: Новые вызовы",
    excerpt: "Обсуждение результатов исследования качества воды в регионе и предложения по улучшению системы мониторинга...",
    replies: 89, views: 1567, likes: 67, 
    categoryId: "ecology", 
    author: { name: "Eco_Guard", avatar: "EG", verified: true, role: "Researcher" },
    tags: ["#мониторинг", "#азия", "#IoT"],
    pinned: false,
    hot: true,
    time: "4 часа назад"
  },
  { 
    id: 3,
    title: "DAO Proposal #VOD-124: Финансирование пилотного проекта в Узбекистане",
    excerpt: "Голосование по выделению 500,000 VOD на реализацию первого пилотного проекта умного водоснабжения...",
    replies: 234, views: 4521, likes: 178, 
    categoryId: "governance", 
    author: { name: "VOD_Admin", avatar: "VA", verified: true, role: "Admin" },
    tags: ["#DAO", "#голосование", "#пилот"],
    pinned: true,
    hot: false,
    time: "6 часов назад"
  },
  { 
    id: 4,
    title: "ESG метрики для водных проектов: Стандарты и практика",
    excerpt: "Как правильно оценивать ESG показатели инвестиционных проектов в водном секторе...",
    replies: 67, views: 890, likes: 45, 
    categoryId: "investment", 
    author: { name: "InvestWater", avatar: "IW", verified: false, role: "Investor" },
    tags: ["#ESG", "#инвестиции", "#метрики"],
    pinned: false,
    hot: false,
    time: "8 часов назад"
  },
  { 
    id: 5,
    title: "AI в прогнозировании водного дефицита: Новые модели",
    excerpt: "Представляем результаты исследования применения machine learning для предсказания кризисных ситуаций...",
    replies: 112, views: 1890, likes: 98, 
    categoryId: "science", 
    author: { name: "DataScientist", avatar: "DS", verified: true, role: "Scientist" },
    tags: ["#AI", "#ML", "#прогнозы"],
    pinned: false,
    hot: true,
    time: "12 часов назад"
  },
  { 
    id: 6,
    title: "Интеграция с IoT датчиками: Опыт внедрения",
    excerpt: "Делюсь опытом подключения 50+ датчиков качества воды к платформе VODeco...",
    replies: 78, views: 1234, likes: 56, 
    categoryId: "technology", 
    author: { name: "IoT_Expert", avatar: "IE", verified: true, role: "Engineer" },
    tags: ["#IoT", "#датчики", "#интеграция"],
    pinned: false,
    hot: false,
    time: "1 день назад"
  },
  { 
    id: 7,
    title: "Токеномика VOD: Вопросы и ответы от команды",
    excerpt: "Официальные разъяснения по механизмам распределения, стейкинга и наград в экосистеме...",
    replies: 345, views: 5678, likes: 234, 
    categoryId: "governance", 
    author: { name: "VOD_Core", avatar: "VC", verified: true, role: "Core Team" },
    tags: ["#токеномика", "#VOD", "#стейкинг"],
    pinned: true,
    hot: true,
    time: "1 день назад"
  },
  { 
    id: 8,
    title: "Углеродные кредиты и вода: Синергия экосистем",
    excerpt: "Как интеграция с Regen Network открывает новые возможности для водных проектов...",
    replies: 56, views: 789, likes: 34, 
    categoryId: "ecology", 
    author: { name: "Carbon_Expert", avatar: "CE", verified: false, role: "Partner" },
    tags: ["#карбон", "#Regen", "#экология"],
    pinned: false,
    hot: false,
    time: "2 дня назад"
  },
  {
    id: 9,
    title: "Образовательная программа VODeco Academy: Набор 2025",
    excerpt: "Открыт набор на бесплатную программу подготовки специалистов по управлению водными ресурсами. Сертификаты и награды за обучение.",
    replies: 234, views: 3456, likes: 189,
    categoryId: "education",
    author: { name: "VOD_Academy", avatar: "VA", verified: true, role: "Education" },
    tags: ["#обучение", "#сертификат", "#карьера"],
    pinned: true,
    hot: true,
    time: "3 часа назад"
  },
  {
    id: 10,
    title: "Модернизация водоканала в Алматы: Кейс внедрения",
    excerpt: "Подробный разбор проекта по цифровизации городской водной инфраструктуры с использованием платформы VODeco.",
    replies: 145, views: 2890, likes: 167,
    categoryId: "infrastructure",
    author: { name: "CityWater_KZ", avatar: "CW", verified: true, role: "Government" },
    tags: ["#инфраструктура", "#кейс", "#Казахстан"],
    pinned: false,
    hot: true,
    time: "5 часов назад"
  },
  {
    id: 11,
    title: "Региональный форум: Водная безопасность Каспийского региона",
    excerpt: "Приглашаем на онлайн-форум с участием экспертов из 5 стран. Регистрация открыта до 15 января.",
    replies: 78, views: 1567, likes: 89,
    categoryId: "regional",
    author: { name: "Caspian_Forum", avatar: "CF", verified: true, role: "Organization" },
    tags: ["#форум", "#Каспий", "#международное"],
    pinned: false,
    hot: false,
    time: "7 часов назад"
  },
  {
    id: 12,
    title: "Научное исследование: Микропластик в пресных водоёмах ЦА",
    excerpt: "Публикуем предварительные результаты годового исследования. Данные доступны для верификации через блокчейн.",
    replies: 189, views: 4123, likes: 234,
    categoryId: "science",
    author: { name: "WaterLab_UZ", avatar: "WL", verified: true, role: "Institute" },
    tags: ["#исследование", "#микропластик", "#данные"],
    pinned: false,
    hot: true,
    time: "10 часов назад"
  },
  {
    id: 13,
    title: "Инвестиционный раунд: Пилотный проект в Таджикистане",
    excerpt: "Открыт раунд софинансирования проекта мониторинга ледников. Минимальный взнос 100 VOD.",
    replies: 256, views: 5678, likes: 345,
    categoryId: "investment",
    author: { name: "VOD_Invest", avatar: "VI", verified: true, role: "Fund" },
    tags: ["#инвестиции", "#ледники", "#Таджикистан"],
    pinned: true,
    hot: true,
    time: "14 часов назад"
  },
  {
    id: 14,
    title: "Опрос сообщества: Приоритеты развития на Q1 2025",
    excerpt: "Голосуйте за направления развития платформы. Каждый голос учитывается в DAO.",
    replies: 456, views: 8901, likes: 567,
    categoryId: "governance",
    author: { name: "VOD_DAO", avatar: "VD", verified: true, role: "DAO" },
    tags: ["#опрос", "#DAO", "#голосование"],
    pinned: true,
    hot: true,
    time: "18 часов назад"
  },
  {
    id: 15,
    title: "Технический вебинар: Настройка IoT датчиков для VODeco",
    excerpt: "Практический мастер-класс по подключению и калибровке датчиков качества воды. Запись доступна.",
    replies: 89, views: 1234, likes: 78,
    categoryId: "technology",
    author: { name: "TechSupport", avatar: "TS", verified: true, role: "Support" },
    tags: ["#вебинар", "#IoT", "#обучение"],
    pinned: false,
    hot: false,
    time: "1 день назад"
  },
  {
    id: 16,
    title: "Экологическая акция: Очистка берегов Иссык-Куля",
    excerpt: "Присоединяйтесь к волонтёрской акции 20 января. Участники получают VOD токены и NFT-сертификат.",
    replies: 167, views: 2345, likes: 234,
    categoryId: "ecology",
    author: { name: "EcoVolunteer", avatar: "EV", verified: true, role: "Volunteer" },
    tags: ["#волонтёрство", "#акция", "#Иссык-Куль"],
    pinned: false,
    hot: true,
    time: "1 день назад"
  },
  {
    id: 17,
    title: "Партнёрство с ЮНЕП: Новые возможности для проектов",
    excerpt: "Официальное объявление о сотрудничестве с программой ООН по окружающей среде. Детали грантовой программы.",
    replies: 278, views: 6789, likes: 456,
    categoryId: "governance",
    author: { name: "VOD_Official", avatar: "VO", verified: true, role: "Official" },
    tags: ["#ООН", "#партнёрство", "#гранты"],
    pinned: true,
    hot: true,
    time: "2 дня назад"
  },
  {
    id: 18,
    title: "Дискуссия: Этика использования AI в экологическом мониторинге",
    excerpt: "Открытое обсуждение этических аспектов применения искусственного интеллекта для принятия решений о водных ресурсах.",
    replies: 123, views: 1890, likes: 89,
    categoryId: "science",
    author: { name: "AI_Ethics", avatar: "AE", verified: false, role: "Researcher" },
    tags: ["#AI", "#этика", "#дискуссия"],
    pinned: false,
    hot: false,
    time: "2 дня назад"
  },
  {
    id: 19,
    title: "Мастер-класс: Создание проекта в TokenHub",
    excerpt: "Пошаговое руководство по оформлению и подаче проекта на финансирование через платформу.",
    replies: 145, views: 2567, likes: 178,
    categoryId: "education",
    author: { name: "ProjectMentor", avatar: "PM", verified: true, role: "Mentor" },
    tags: ["#TokenHub", "#проекты", "#гайд"],
    pinned: false,
    hot: true,
    time: "3 дня назад"
  },
  {
    id: 20,
    title: "Отчёт: Состояние водных ресурсов Аральского региона 2024",
    excerpt: "Комплексный анализ изменений за год. Интерактивные карты и данные датчиков доступны для всех пользователей.",
    replies: 234, views: 4567, likes: 345,
    categoryId: "regional",
    author: { name: "AralMonitor", avatar: "AM", verified: true, role: "Monitor" },
    tags: ["#Арал", "#отчёт", "#мониторинг"],
    pinned: true,
    hot: false,
    time: "3 дня назад"
  },
];

const trendingTopics = [
  { tag: "#DAO_Voting", posts: 456, growth: "+23%" },
  { tag: "#IoT_Integration", posts: 389, growth: "+15%" },
  { tag: "#WaterCrisis2030", posts: 267, growth: "+45%" },
  { tag: "#StakingRewards", posts: 245, growth: "+12%" },
  { tag: "#PilotProject", posts: 223, growth: "+8%" },
  { tag: "#VOD_Academy", posts: 189, growth: "+67%" },
  { tag: "#ESG_Metrics", posts: 156, growth: "+19%" },
  { tag: "#AralSea", posts: 134, growth: "+34%" },
];

const activeUsers = [
  { name: "Alex_Tech", avatar: "AT", posts: 256, verified: true, role: "Expert", xp: 12500 },
  { name: "Eco_Guard", avatar: "EG", posts: 234, verified: true, role: "Researcher", xp: 11200 },
  { name: "VOD_Admin", avatar: "VA", posts: 489, verified: true, role: "Admin", xp: 25000 },
  { name: "DataScientist", avatar: "DS", posts: 198, verified: true, role: "Scientist", xp: 9800 },
  { name: "WaterExpert", avatar: "WE", posts: 187, verified: true, role: "Expert", xp: 8900 },
  { name: "CityWater_KZ", avatar: "CW", posts: 145, verified: true, role: "Government", xp: 7500 },
  { name: "EcoVolunteer", avatar: "EV", posts: 134, verified: true, role: "Volunteer", xp: 6800 },
];

const upcomingEvents = [
  { 
    id: 1, 
    title: "Водный форум 2025", 
    date: "15 Янв", 
    type: "online",
    participants: 234 
  },
  { 
    id: 2, 
    title: "DAO Голосование #VOD-130", 
    date: "18 Янв", 
    type: "governance",
    participants: 567 
  },
  { 
    id: 3, 
    title: "Экспедиция на Иссык-Куль", 
    date: "20 Янв", 
    type: "offline",
    participants: 45 
  },
  { 
    id: 4, 
    title: "AI Workshop: Прогнозирование", 
    date: "25 Янв", 
    type: "online",
    participants: 189 
  },
];

const weeklyStats = {
  newTopics: 156,
  totalReplies: 2345,
  activeUsers: 789,
  vodDistributed: 45000
};

export default function SocialPage() {
  const { language } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const t = translations[language as keyof typeof translations] || translations.ru;
  const categories = getCategoriesData(t);
  
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("hot");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTopic, setNewTopic] = useState({ title: "", content: "", category: "", tags: "" });
  const [likedTopics, setLikedTopics] = useState<number[]>([]);
  const [bookmarkedTopics, setBookmarkedTopics] = useState<number[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);

  const filteredDiscussions = discussions.filter(d => {
    if (activeCategory !== "all" && d.categoryId !== activeCategory) {
      return false;
    }
    if (searchQuery && !d.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const sortedDiscussions = [...filteredDiscussions].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    if (sortBy === "hot") return (b.hot ? 1 : 0) - (a.hot ? 1 : 0);
    if (sortBy === "new") return 0;
    if (sortBy === "top") return b.likes - a.likes;
    return 0;
  });

  const visibleDiscussions = sortedDiscussions.slice(0, visibleCount);

  const handleLike = (id: number) => {
    setLikedTopics(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const handleBookmark = (id: number) => {
    setBookmarkedTopics(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const handleCreateTopic = () => {
    if (!isAuthenticated) return;
    // API call would go here
    console.log("Creating topic:", newTopic);
    setShowCreateModal(false);
    setNewTopic({ title: "", content: "", category: "", tags: "" });
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || categoryId;
  };

  const socialHub = [
    {
      title: t.messages,
      desc: t.privateChats,
      icon: MessageSquare,
      href: "/social/messages",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      stats: `12 ${t.newMessages}`
    },
    {
      title: t.friends,
      desc: t.yourNetwork,
      icon: Users,
      href: "/social/friends",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      stats: "156"
    },
    {
      title: t.groups,
      desc: t.communities,
      icon: Globe,
      href: "/groups",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      stats: "24"
    },
    {
      title: t.dao,
      desc: t.proposals,
      icon: Vote,
      href: "/dao",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      stats: `5 ${t.active}`
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Create Topic Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card p-6 max-w-xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-6">{t.createNewTopic}</h2>
              
              {!isAuthenticated ? (
                <div className="text-center py-8">
                  <Lock className="mx-auto mb-4 text-slate-500" size={48} />
                  <p className="text-slate-400 mb-4">{t.loginToCreate}</p>
                  <Link 
                    href="/profile" 
                    className="px-6 py-3 bg-cyan-glow text-ocean-deep font-bold rounded-xl inline-block"
                  >
                    Login / Register
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">{t.topicTitle}</label>
                    <input
                      type="text"
                      value={newTopic.title}
                      onChange={e => setNewTopic(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-glow/50 focus:outline-none"
                      placeholder="..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">{t.selectCategory}</label>
                    <select
                      value={newTopic.category}
                      onChange={e => setNewTopic(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-glow/50 focus:outline-none"
                    >
                      <option value="">-- {t.selectCategory} --</option>
                      {categories.filter(c => c.id !== "all").map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">{t.topicContent}</label>
                    <textarea
                      value={newTopic.content}
                      onChange={e => setNewTopic(prev => ({ ...prev, content: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-glow/50 focus:outline-none h-32 resize-none"
                      placeholder="..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">{t.addTags}</label>
                    <input
                      type="text"
                      value={newTopic.tags}
                      onChange={e => setNewTopic(prev => ({ ...prev, tags: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-glow/50 focus:outline-none"
                      placeholder="#tag1, #tag2"
                    />
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() => setShowCreateModal(false)}
                      className="flex-1 px-6 py-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                    >
                      {t.cancel}
                    </button>
                    <button
                      onClick={handleCreateTopic}
                      disabled={!newTopic.title || !newTopic.content || !newTopic.category}
                      className="flex-1 px-6 py-3 bg-cyan-glow text-ocean-deep font-bold rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
                    >
                      <Send size={18} /> {t.publish}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-black mb-2">{t.title}</h1>
            <p className="text-slate-400">{t.subtitle}</p>
          </div>
          <div className="flex gap-3">
            <button className="p-3 glass rounded-xl hover:bg-white/10 transition-colors relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">3</span>
            </button>
            <button className="p-3 glass rounded-xl hover:bg-white/10 transition-colors">
              <Settings size={20} />
            </button>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-cyan-glow text-ocean-deep font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2"
            >
              <Plus size={20} /> {t.newTopic}
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* Weekly Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-cyan-glow">{weeklyStats.newTopics}</div>
          <div className="text-xs text-slate-500">New Topics This Week</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-emerald-400">{weeklyStats.totalReplies.toLocaleString()}</div>
          <div className="text-xs text-slate-500">Total Replies</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">{weeklyStats.activeUsers}</div>
          <div className="text-xs text-slate-500">Active Users</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">{weeklyStats.vodDistributed.toLocaleString()}</div>
          <div className="text-xs text-slate-500">VOD Distributed</div>
        </div>
      </motion.div>

      {/* Quick Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        {socialHub.map((item, i) => (
          <Link key={i} href={item.href} className="glass-card p-4 hover:border-cyan-glow/30 transition-all group">
            <div className="flex items-center gap-3">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", item.bg, item.color)}>
                <item.icon size={20} />
              </div>
              <div>
                <div className="font-bold group-hover:text-cyan-glow transition-colors">{item.title}</div>
                <div className="text-xs text-slate-500">{item.stats}</div>
              </div>
            </div>
          </Link>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search & Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-4"
          >
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px] relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="text"
                  placeholder={t.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-glow/50 focus:outline-none"
                />
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setSortBy("hot")}
                  className={cn("px-4 py-2 rounded-xl flex items-center gap-2 transition-colors", 
                    sortBy === "hot" ? "bg-orange-500/20 text-orange-400" : "bg-white/5 hover:bg-white/10"
                  )}
                >
                  <Flame size={16} /> {t.hot}
                </button>
                <button 
                  onClick={() => setSortBy("new")}
                  className={cn("px-4 py-2 rounded-xl flex items-center gap-2 transition-colors",
                    sortBy === "new" ? "bg-cyan-500/20 text-cyan-400" : "bg-white/5 hover:bg-white/10"
                  )}
                >
                  <Clock size={16} /> {t.new}
                </button>
                <button 
                  onClick={() => setSortBy("top")}
                  className={cn("px-4 py-2 rounded-xl flex items-center gap-2 transition-colors",
                    sortBy === "top" ? "bg-yellow-500/20 text-yellow-400" : "bg-white/5 hover:bg-white/10"
                  )}
                >
                  <TrendingUp size={16} /> {t.top}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex gap-2 overflow-x-auto pb-2"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-4 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all",
                  activeCategory === cat.id 
                    ? "bg-cyan-glow text-ocean-deep font-bold" 
                    : "bg-white/5 hover:bg-white/10"
                )}
              >
                <cat.icon size={16} />
                {cat.name}
                <span className="text-xs opacity-70">{cat.count}</span>
              </button>
            ))}
          </motion.div>

          {/* Discussions */}
          <div className="space-y-4">
            {visibleDiscussions.map((topic, i) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * Math.min(i, 5) }}
                className="glass-card p-6 hover:border-cyan-glow/30 transition-all cursor-pointer group"
              >
                <div className="flex gap-4">
                  {/* Author Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {topic.author.avatar}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-bold">{topic.author.name}</span>
                      {topic.author.verified && <CheckCircle2 className="text-cyan-glow" size={14} />}
                      <span className="text-xs px-2 py-0.5 bg-white/5 rounded text-slate-400">{topic.author.role}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-xs text-slate-500">{topic.time}</span>
                      {topic.pinned && (
                        <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">📌 {t.pinned}</span>
                      )}
                      {topic.hot && (
                        <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 text-xs rounded-full">🔥 {t.hotBadge}</span>
                      )}
                    </div>
                    
                    <h3 className="font-bold text-lg mb-2 group-hover:text-cyan-glow transition-colors line-clamp-2">
                      {topic.title}
                    </h3>
                    
                    <p className="text-slate-400 text-sm mb-3 line-clamp-2">{topic.excerpt}</p>
                    
                    <div className="flex items-center gap-4 flex-wrap">
                      <span className="px-3 py-1 bg-white/5 rounded-full text-xs">{getCategoryName(topic.categoryId)}</span>
                      {topic.tags.map((tag, j) => (
                        <span key={j} className="text-xs text-cyan-glow hover:underline cursor-pointer">{tag}</span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1"><MessageCircle size={14} /> {topic.replies}</span>
                      <span className="flex items-center gap-1"><Eye size={14} /> {topic.views}</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleLike(topic.id); }}
                        className={cn(
                          "flex items-center gap-1 transition-colors",
                          likedTopics.includes(topic.id) ? "text-red-400" : "hover:text-red-400"
                        )}
                      >
                        <Heart size={14} fill={likedTopics.includes(topic.id) ? "currentColor" : "none"} /> 
                        {topic.likes + (likedTopics.includes(topic.id) ? 1 : 0)}
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleBookmark(topic.id); }}
                        className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                      >
                        <Bookmark 
                          size={16} 
                          className={cn(
                            "transition-colors",
                            bookmarkedTopics.includes(topic.id) ? "text-yellow-400" : "text-slate-500 hover:text-cyan-glow"
                          )}
                          fill={bookmarkedTopics.includes(topic.id) ? "currentColor" : "none"}
                        />
                      </button>
                      <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                        <Share2 size={16} className="text-slate-500 hover:text-cyan-glow" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          {visibleCount < sortedDiscussions.length && (
            <div className="text-center">
              <button 
                onClick={() => setVisibleCount(prev => prev + 8)}
                className="px-8 py-3 glass rounded-xl hover:bg-white/10 transition-colors"
              >
                {t.loadMore} ({sortedDiscussions.length - visibleCount} more)
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Topics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6"
          >
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="text-cyan-glow" size={18} />
              {t.trends}
            </h3>
            <div className="space-y-3">
              {trendingTopics.map((topic, i) => (
                <div key={i} className="flex items-center justify-between hover:bg-white/5 p-2 -mx-2 rounded-lg cursor-pointer transition-colors">
                  <span className="text-cyan-glow">{topic.tag}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-emerald-400">{topic.growth}</span>
                    <span className="text-xs text-slate-500">{topic.posts} {t.posts}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
            className="glass-card p-6"
          >
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Clock className="text-purple-400" size={18} />
              {t.events}
            </h3>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="hover:bg-white/5 p-2 -mx-2 rounded-lg cursor-pointer transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm line-clamp-1">{event.title}</span>
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded",
                      event.type === "online" ? "bg-cyan-500/20 text-cyan-400" :
                      event.type === "governance" ? "bg-purple-500/20 text-purple-400" :
                      "bg-emerald-500/20 text-emerald-400"
                    )}>
                      {event.type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{event.date}</span>
                    <span>{event.participants} participants</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Active Users */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-6"
          >
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Star className="text-yellow-400" size={18} />
              {t.activeUsers}
            </h3>
            <div className="space-y-3">
              {activeUsers.map((user, i) => (
                <div key={i} className="flex items-center gap-3 hover:bg-white/5 p-2 -mx-2 rounded-lg cursor-pointer transition-colors">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                      {user.avatar}
                    </div>
                    {i < 3 && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center text-[10px] font-bold text-black">
                        {i + 1}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-sm">{user.name}</span>
                      {user.verified && <CheckCircle2 className="text-cyan-glow" size={12} />}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>{user.posts} {t.posts}</span>
                      <span>•</span>
                      <span className="text-yellow-400">{user.xp.toLocaleString()} XP</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Expert Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55 }}
            className="glass-card p-6"
          >
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Shield className="text-emerald-400" size={18} />
              {t.expertPanel}
            </h3>
            <div className="space-y-3 text-sm">
              <Link href="/cabinets/science" className="flex items-center justify-between hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors">
                <span>Scientific Cabinet</span>
                <ChevronRight size={16} className="text-slate-500" />
              </Link>
              <Link href="/cabinets/government" className="flex items-center justify-between hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors">
                <span>Government Cabinet</span>
                <ChevronRight size={16} className="text-slate-500" />
              </Link>
              <Link href="/cabinets/investor" className="flex items-center justify-between hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors">
                <span>Investor Cabinet</span>
                <ChevronRight size={16} className="text-slate-500" />
              </Link>
            </div>
          </motion.div>

          {/* Create Topic CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card p-6 bg-gradient-to-br from-cyan-glow/10 to-purple-500/10"
          >
            <h3 className="font-bold mb-2">{t.haveIdea}</h3>
            <p className="text-sm text-slate-400 mb-4">{t.createTopicDesc}</p>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="w-full py-3 bg-cyan-glow text-ocean-deep font-bold rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              <Plus size={18} /> {t.createTopic}
            </button>
          </motion.div>

          {/* Weekly Digest */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.65 }}
            className="glass-card p-6"
          >
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <BarChart3 className="text-blue-400" size={18} />
              {t.weeklyDigest}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Most discussed</span>
                <span className="text-cyan-glow">#DAO_Voting</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Top contributor</span>
                <span className="text-yellow-400">VOD_Admin</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">New members</span>
                <span className="text-emerald-400">+234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Projects funded</span>
                <span className="text-purple-400">3</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
