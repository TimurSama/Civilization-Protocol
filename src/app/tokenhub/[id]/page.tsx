"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowLeft, MapPin, Calendar, Users, TrendingUp, Target, Shield,
  Droplets, Zap, Building2, Globe, CheckCircle2, Clock, DollarSign,
  BarChart3, FileText, Share2, Heart, MessageSquare, Star, Award,
  ChevronRight, ExternalLink, Play, Download, Bookmark, Bell
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

// Mock project data
const projectsData: Record<string, any> = {
  "smart-pumping-uzbekistan": {
    id: "smart-pumping-uzbekistan",
    name: "Smart Pumping Network",
    nameRu: "Умная насосная сеть",
    nameAr: "شبكة الضخ الذكية",
    region: "Узбекистан",
    regionEn: "Uzbekistan",
    regionAr: "أوزبكستان",
    sector: "Water Infrastructure",
    sectorRu: "Водная инфраструктура",
    status: "active",
    type: "pilot",
    cost: 45000000,
    raised: 12500000,
    irr: 18,
    esgScore: 92,
    progress: 28,
    startDate: "2024-01-15",
    endDate: "2026-12-31",
    description: "Modernization of 50 pumping stations with IoT sensors, predictive maintenance, and blockchain-based data verification. Expected to reduce water losses by 35% and energy consumption by 25%.",
    descriptionRu: "Модернизация 50 насосных станций с IoT датчиками, предиктивным обслуживанием и верификацией данных на блокчейне. Ожидается снижение потерь воды на 35% и энергопотребления на 25%.",
    descriptionAr: "تحديث 50 محطة ضخ بأجهزة استشعار IoT والصيانة التنبؤية والتحقق من البيانات على blockchain. من المتوقع تقليل فقدان المياه بنسبة 35٪ واستهلاك الطاقة بنسبة 25٪.",
    images: ["/projects/pumping-1.jpg", "/projects/pumping-2.jpg", "/projects/pumping-3.jpg"],
    team: [
      { name: "Dr. Aziz Karimov", role: "Project Lead", avatar: "AK" },
      { name: "Elena Petrova", role: "IoT Engineer", avatar: "EP" },
      { name: "John Smith", role: "Blockchain Dev", avatar: "JS" },
    ],
    milestones: [
      { title: "Project Launch", date: "2024-01-15", status: "completed" },
      { title: "IoT Integration Phase 1", date: "2024-06-01", status: "completed" },
      { title: "Pilot Testing", date: "2024-12-01", status: "active" },
      { title: "Full Deployment", date: "2025-06-01", status: "pending" },
      { title: "Project Completion", date: "2026-12-31", status: "pending" },
    ],
    metrics: {
      waterSaved: "2.5M m³/year",
      energySaved: "15 GWh/year",
      co2Reduced: "8,500 tons/year",
      jobsCreated: 120,
      population: "5M people benefited",
    },
    documents: [
      { name: "Technical Specification", type: "PDF", size: "2.4 MB" },
      { name: "Financial Model", type: "XLSX", size: "1.2 MB" },
      { name: "ESG Report", type: "PDF", size: "3.8 MB" },
    ],
    partners: ["World Bank", "EBRD", "Uzbekistan Ministry of Water"],
    sdgGoals: [6, 9, 11, 13],
    minInvestment: 10000,
    tokenReward: 500,
  },
  "aral-restoration": {
    id: "aral-restoration",
    name: "Aral Sea Restoration Program",
    nameRu: "Программа восстановления Аральского моря",
    nameAr: "برنامج استعادة بحر آرال",
    region: "Казахстан/Узбекистан",
    regionEn: "Kazakhstan/Uzbekistan",
    regionAr: "كازاخستان/أوزبكستان",
    sector: "Ecology",
    sectorRu: "Экология",
    status: "funding",
    type: "memorandum",
    cost: 120000000,
    raised: 28000000,
    irr: 12,
    esgScore: 98,
    progress: 23,
    startDate: "2024-06-01",
    endDate: "2030-12-31",
    description: "Large-scale ecosystem restoration project for the Aral Sea region. Includes afforestation, water management optimization, and community development programs.",
    descriptionRu: "Крупномасштабный проект восстановления экосистемы региона Аральского моря. Включает лесонасаждение, оптимизацию водопользования и программы развития сообществ.",
    descriptionAr: "مشروع استعادة النظام البيئي على نطاق واسع لمنطقة بحر آرال. يشمل التشجير وتحسين إدارة المياه وبرامج تنمية المجتمع.",
    team: [
      { name: "Prof. Nurlan Bekturganov", role: "Director", avatar: "NB" },
      { name: "Dr. Gulnara Ismailova", role: "Ecologist", avatar: "GI" },
    ],
    milestones: [
      { title: "Feasibility Study", date: "2024-06-01", status: "completed" },
      { title: "Memorandum Signing", date: "2024-09-01", status: "completed" },
      { title: "Phase 1 Funding", date: "2025-03-01", status: "active" },
      { title: "Implementation Start", date: "2025-09-01", status: "pending" },
    ],
    metrics: {
      areaRestored: "50,000 hectares",
      treesPlanted: "10M trees",
      waterSaved: "500M m³/year",
      biodiversity: "+40 species",
      population: "2M people benefited",
    },
    documents: [
      { name: "Project Proposal", type: "PDF", size: "5.2 MB" },
      { name: "Environmental Impact", type: "PDF", size: "8.1 MB" },
    ],
    partners: ["UN Environment", "GIZ", "USAID"],
    sdgGoals: [6, 13, 15],
    minInvestment: 5000,
    tokenReward: 1000,
  },
};

// Translations
const t = {
  en: {
    back: "Back to Projects",
    invest: "Invest Now",
    share: "Share",
    bookmark: "Save",
    notify: "Get Updates",
    overview: "Overview",
    milestones: "Milestones",
    team: "Team",
    documents: "Documents",
    impact: "Impact",
    raised: "Raised",
    target: "Target",
    investors: "Investors",
    minInvestment: "Min Investment",
    tokenReward: "Token Reward",
    irr: "Expected IRR",
    esgScore: "ESG Score",
    sdgAlignment: "SDG Alignment",
    partners: "Partners",
    projectNotFound: "Project not found",
    backToProjects: "Back to ProjectHub",
    completed: "Completed",
    active: "Active",
    pending: "Pending",
    projectMetrics: "Project Metrics",
    keyDocuments: "Key Documents",
    download: "Download",
    watchVideo: "Watch Video",
    readMore: "Read More",
    similarProjects: "Similar Projects",
  },
  ru: {
    back: "К списку проектов",
    invest: "Инвестировать",
    share: "Поделиться",
    bookmark: "Сохранить",
    notify: "Уведомления",
    overview: "Обзор",
    milestones: "Этапы",
    team: "Команда",
    documents: "Документы",
    impact: "Влияние",
    raised: "Собрано",
    target: "Цель",
    investors: "Инвесторов",
    minInvestment: "Мин. инвестиция",
    tokenReward: "Награда VOD",
    irr: "Ожидаемая IRR",
    esgScore: "ESG Рейтинг",
    sdgAlignment: "Соответствие SDG",
    partners: "Партнёры",
    projectNotFound: "Проект не найден",
    backToProjects: "Вернуться в ProjectHub",
    completed: "Завершено",
    active: "Активно",
    pending: "Ожидание",
    projectMetrics: "Метрики проекта",
    keyDocuments: "Ключевые документы",
    download: "Скачать",
    watchVideo: "Смотреть видео",
    readMore: "Подробнее",
    similarProjects: "Похожие проекты",
  },
  ar: {
    back: "العودة إلى المشاريع",
    invest: "استثمر الآن",
    share: "مشاركة",
    bookmark: "حفظ",
    notify: "الحصول على التحديثات",
    overview: "نظرة عامة",
    milestones: "المراحل",
    team: "الفريق",
    documents: "المستندات",
    impact: "التأثير",
    raised: "تم جمعه",
    target: "الهدف",
    investors: "المستثمرون",
    minInvestment: "الحد الأدنى للاستثمار",
    tokenReward: "مكافأة VOD",
    irr: "IRR المتوقع",
    esgScore: "تصنيف ESG",
    sdgAlignment: "التوافق مع SDG",
    partners: "الشركاء",
    projectNotFound: "المشروع غير موجود",
    backToProjects: "العودة إلى ProjectHub",
    completed: "مكتمل",
    active: "نشط",
    pending: "معلق",
    projectMetrics: "مقاييس المشروع",
    keyDocuments: "المستندات الرئيسية",
    download: "تحميل",
    watchVideo: "مشاهدة الفيديو",
    readMore: "اقرأ المزيد",
    similarProjects: "مشاريع مماثلة",
  }
};

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  const project = projectsData[projectId];
  const { language } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  
  const tr = t[language as keyof typeof t] || t.en;
  
  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-4xl font-black text-red-500 mb-4">404</h1>
          <p className="text-slate-400">{tr.projectNotFound}</p>
          <Link href="/tokenhub" className="mt-4 inline-block px-6 py-3 bg-cyan-glow text-ocean-deep rounded-xl font-bold">
            {tr.backToProjects}
          </Link>
        </div>
      </div>
    );
  }

  const name = language === 'ru' ? project.nameRu : language === 'ar' ? project.nameAr : project.name;
  const description = language === 'ru' ? project.descriptionRu : language === 'ar' ? project.descriptionAr : project.description;
  const region = language === 'ru' ? project.region : language === 'ar' ? project.regionAr : project.regionEn;
  const sector = language === 'ru' ? project.sectorRu : project.sector;

  const tabs = [
    { id: "overview", label: tr.overview, icon: FileText },
    { id: "milestones", label: tr.milestones, icon: Target },
    { id: "team", label: tr.team, icon: Users },
    { id: "documents", label: tr.documents, icon: FileText },
    { id: "impact", label: tr.impact, icon: BarChart3 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Back Button */}
      <Link href="/tokenhub" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors">
        <ArrowLeft size={20} />
        {tr.back}
      </Link>

      {/* Project Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 blur-[120px] opacity-20 rounded-full bg-cyan-500" />
        
        <div className="relative flex flex-col lg:flex-row gap-8">
          {/* Project Image Placeholder */}
          <div className="w-full lg:w-80 h-48 lg:h-auto rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center">
            <Droplets size={64} className="text-cyan-400" />
          </div>
          
          {/* Project Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={cn("px-3 py-1 rounded-full text-xs font-bold",
                project.status === "active" ? "bg-green-500/20 text-green-400" :
                project.status === "funding" ? "bg-yellow-500/20 text-yellow-400" : "bg-slate-500/20 text-slate-400"
              )}>
                {project.status === "active" ? tr.active : project.status === "funding" ? "Funding" : "Planning"}
              </span>
              {project.type === "pilot" && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-400">
                  Pilot Project
                </span>
              )}
              {project.type === "memorandum" && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400">
                  Memorandum
                </span>
              )}
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-black mb-4">{name}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-4">
              <span className="flex items-center gap-1">
                <MapPin size={16} className="text-cyan-400" />
                {region}
              </span>
              <span className="flex items-center gap-1">
                <Building2 size={16} className="text-cyan-400" />
                {sector}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={16} className="text-cyan-400" />
                {project.startDate} - {project.endDate}
              </span>
            </div>
            
            <p className="text-slate-300 mb-6 max-w-2xl">{description}</p>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity">
                <DollarSign size={20} />
                {tr.invest}
              </button>
              <button className="px-4 py-3 glass rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2">
                <Share2 size={18} />
                {tr.share}
              </button>
              <button className="px-4 py-3 glass rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2">
                <Bookmark size={18} />
                {tr.bookmark}
              </button>
              <button className="px-4 py-3 glass rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2">
                <Bell size={18} />
                {tr.notify}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: tr.raised, value: `$${(project.raised / 1000000).toFixed(1)}M`, sub: `of $${(project.cost / 1000000)}M`, color: "cyan" },
          { label: tr.irr, value: `${project.irr}%`, sub: "Expected", color: "green" },
          { label: tr.esgScore, value: project.esgScore, sub: "A+ Rating", color: "emerald" },
          { label: tr.minInvestment, value: `$${project.minInvestment.toLocaleString()}`, sub: "USD", color: "blue" },
          { label: tr.tokenReward, value: `${project.tokenReward} VOD`, sub: "Bonus", color: "purple" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-5"
          >
            <div className="text-xs text-slate-500 mb-1">{stat.label}</div>
            <div className={cn("text-2xl font-black", `text-${stat.color}-400`)}>{stat.value}</div>
            <div className="text-xs text-slate-500">{stat.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-slate-400">Funding Progress</span>
          <span className="font-bold text-cyan-400">{project.progress}%</span>
        </div>
        <div className="h-4 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${project.progress}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-slate-500">
          <span>${(project.raised / 1000000).toFixed(1)}M raised</span>
          <span>${(project.cost / 1000000)}M target</span>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all",
              activeTab === tab.id
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                : "glass hover:bg-white/5"
            )}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-bold mb-4">Project Description</h3>
              <p className="text-slate-300 leading-relaxed mb-6">{description}</p>
              
              <h4 className="font-bold mb-3">{tr.sdgAlignment}</h4>
              <div className="flex gap-2 mb-6">
                {project.sdgGoals.map((goal: number) => (
                  <span key={goal} className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center font-bold text-cyan-400">
                    {goal}
                  </span>
                ))}
              </div>
              
              <h4 className="font-bold mb-3">{tr.partners}</h4>
              <div className="flex flex-wrap gap-2">
                {project.partners.map((partner: string, i: number) => (
                  <span key={i} className="px-3 py-1 bg-white/5 rounded-lg text-sm">{partner}</span>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "milestones" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-bold mb-6">{tr.milestones}</h3>
              <div className="space-y-4">
                {project.milestones.map((milestone: any, i: number) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                      milestone.status === "completed" ? "bg-green-500/20 text-green-400" :
                      milestone.status === "active" ? "bg-cyan-500/20 text-cyan-400" : "bg-slate-500/20 text-slate-400"
                    )}>
                      {milestone.status === "completed" ? <CheckCircle2 size={20} /> :
                       milestone.status === "active" ? <Clock size={20} /> : <Target size={20} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{milestone.title}</span>
                        <span className={cn("text-xs px-2 py-0.5 rounded",
                          milestone.status === "completed" ? "bg-green-500/20 text-green-400" :
                          milestone.status === "active" ? "bg-cyan-500/20 text-cyan-400" : "bg-slate-500/20 text-slate-400"
                        )}>
                          {milestone.status === "completed" ? tr.completed :
                           milestone.status === "active" ? tr.active : tr.pending}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500">{milestone.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "team" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-bold mb-6">{tr.team}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.team.map((member: any, i: number) => (
                  <div key={i} className="p-4 bg-white/5 rounded-xl flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
                      {member.avatar}
                    </div>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-xs text-slate-500">{member.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "documents" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-bold mb-6">{tr.keyDocuments}</h3>
              <div className="space-y-3">
                {project.documents.map((doc: any, i: number) => (
                  <div key={i} className="p-4 bg-white/5 rounded-xl flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <FileText className="text-cyan-400" size={24} />
                      <div>
                        <div className="font-medium">{doc.name}</div>
                        <div className="text-xs text-slate-500">{doc.type} • {doc.size}</div>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm font-bold hover:bg-cyan-500/30 transition-colors flex items-center gap-2">
                      <Download size={16} />
                      {tr.download}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "impact" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-bold mb-6">{tr.projectMetrics}</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(project.metrics).map(([key, value], i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-xl">
                    <div className="text-2xl font-black text-cyan-400 mb-1">{value as string}</div>
                    <div className="text-xs text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Investment Card */}
          <div className="glass-card p-6 bg-gradient-to-br from-cyan-500/10 to-blue-600/10">
            <h4 className="font-bold mb-4">Investment Details</h4>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-400">{tr.minInvestment}</span>
                <span className="font-bold">${project.minInvestment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{tr.irr}</span>
                <span className="font-bold text-green-400">{project.irr}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{tr.tokenReward}</span>
                <span className="font-bold text-purple-400">{project.tokenReward} VOD</span>
              </div>
              <hr className="border-white/10" />
              <button className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                <DollarSign size={20} />
                {tr.invest}
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="glass-card p-6">
            <h4 className="font-bold mb-4">Quick Stats</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Users className="text-cyan-400" size={20} />
                <div>
                  <div className="font-medium">245 Investors</div>
                  <div className="text-xs text-slate-500">Active participants</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Star className="text-yellow-400" size={20} />
                <div>
                  <div className="font-medium">4.8 Rating</div>
                  <div className="text-xs text-slate-500">Based on 56 reviews</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Award className="text-emerald-400" size={20} />
                <div>
                  <div className="font-medium">ESG Score: {project.esgScore}</div>
                  <div className="text-xs text-slate-500">A+ Certified</div>
                </div>
              </div>
            </div>
          </div>

          {/* Video Placeholder */}
          <div className="glass-card p-6">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center mb-4 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-16 h-16 rounded-full bg-cyan-500/30 flex items-center justify-center">
                <Play className="text-cyan-400" size={32} />
              </div>
            </div>
            <button className="w-full py-3 glass rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
              <Play size={18} />
              {tr.watchVideo}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



