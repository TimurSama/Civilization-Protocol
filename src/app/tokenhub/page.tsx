"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search, Filter, Globe,
    Building2, FlaskConical,
    ShieldCheck, Factory,
    ChevronDown, MapPin,
    TrendingUp, FileText,
    ExternalLink, Droplets,
    TreePine, Zap, Heart,
    LayoutGrid
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/i18n";
import BuyTokenWidget from "@/components/BuyTokenWidget";

interface Project {
    id: number;
    title: string;
    region: string;
    author: string;
    authorType: string;
    sector: string;
    type: string;
    cost: string;
    status: string;
    progress: number;
    esg: number;
    isPilot?: boolean;
    hasMemorandum?: boolean;
    description: string;
}

export default function ProjectHubPage() {
    const { t, isRTL } = useLanguage();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("all");
    const [selectedAuthorType, setSelectedAuthorType] = useState("all");
    const [selectedSector, setSelectedSector] = useState("all");

    const projects: Project[] = [
        {
            id: 1,
            title: "Civilization Protocol Core: Global Data Infrastructure",
            region: "global",
            author: "Civilization Protocol Foundation",
            authorType: "industrial",
            sector: "science",
            type: "Infrastructure",
            cost: "$250,000,000",
            status: "Active",
            progress: 45,
            esg: 98,
            isPilot: true,
            hasMemorandum: true,
            description: "The backbone of the Civilization Protocol ecosystem. A decentralized network for secure, transparent data exchange across all sectors."
        },
        {
            id: 2,
            title: "Smart Pumping Network (Central Asia)",
            region: "central_asia",
            author: "VODPROM / UNICAP",
            authorType: "industrial",
            sector: "water",
            type: "Infrastructure",
            cost: "$45,000,000",
            status: "Pilot",
            progress: 15,
            esg: 94,
            isPilot: true,
            hasMemorandum: true,
            description: "Modernization of 19 pumping stations in Uzbekistan using IoT and AI for 30% energy efficiency increase."
        },
        {
            id: 3,
            title: "Civilization Protocol Water: Desalination 2.0",
            region: "middle_east",
            author: "Civilization Protocol Water",
            authorType: "industrial",
            sector: "water",
            type: "R&D",
            cost: "$85,000,000",
            status: "Planning",
            progress: 5,
            esg: 96,
            description: "Next-gen solar-powered desalination plants with zero brine discharge technology."
        },
        {
            id: 4,
            title: "Regen Network: Carbon Credits",
            region: "global",
            author: "Regen Network",
            authorType: "partner",
            sector: "ecology",
            type: "Carbon Credits",
            cost: "$120,000,000",
            status: "Active",
            progress: 85,
            esg: 99,
            description: "Decentralized marketplace for ecological credits. Tokenizing carbon sequestration and biodiversity conservation."
        },
        {
            id: 5,
            title: "Civilization Protocol Energy: P2P Microgrids",
            region: "africa",
            author: "Civilization Protocol Energy",
            authorType: "industrial",
            sector: "energy",
            type: "Grid",
            cost: "$35,000,000",
            status: "Pilot",
            progress: 25,
            esg: 97,
            description: "Community-owned solar microgrids with blockchain-based energy sharing and VOD token payments."
        },
        {
            id: 6,
            title: "Civilization Protocol Health: Bio-Data Vault",
            region: "global",
            author: "Civilization Protocol Health",
            authorType: "industrial",
            sector: "health",
            type: "Data",
            cost: "$15,000,000",
            status: "Beta",
            progress: 60,
            esg: 95,
            description: "Secure, patient-controlled storage for genomic and clinical data, enabling personalized medicine research."
        },
        {
            id: 7,
            title: "Digital Twins Core Engine",
            region: "global",
            author: "Civilization Protocol Foundation",
            authorType: "industrial",
            sector: "science",
            type: "R&D",
            cost: "$85,000,000",
            status: "Active",
            progress: 35,
            esg: 97,
            isPilot: true,
            description: "Движок синхронизации данных блокчейна с 3D-моделями объектов. Позволяет визуализировать состояние водных ресурсов в реальном времени."
        },
        {
            id: 8,
            title: "AI Analytics Engine",
            region: "global",
            author: "Civilization Protocol AI Lab",
            authorType: "industrial",
            sector: "science",
            type: "R&D",
            cost: "$120,000,000",
            status: "Active",
            progress: 42,
            esg: 96,
            description: "Предиктивные модели для анализа дефицита и загрязнения воды. ML-модели с точностью 94% для прогнозирования."
        },
        {
            id: 9,
            title: "DAO Governance Pro",
            region: "global",
            author: "Civilization Protocol Foundation",
            authorType: "industrial",
            sector: "science",
            type: "Infrastructure",
            cost: "$60,000,000",
            status: "Active",
            progress: 68,
            esg: 98,
            description: "Система сложного голосования с делегированием и управлением казной. Поддержка квадратичного голосования."
        },
        {
            id: 10,
            title: "VOD Educational Hub",
            region: "global",
            author: "Civilization Protocol Education",
            authorType: "industrial",
            sector: "science",
            type: "Platform",
            cost: "$55,000,000",
            status: "Beta",
            progress: 55,
            esg: 94,
            description: "Платформа для публикации исследований и распределения грантов. Интеграция с DOI и научными репозиториями."
        },
        {
            id: 11,
            title: "Eco-Gaming Module",
            region: "global",
            author: "Civilization Protocol Gaming",
            authorType: "industrial",
            sector: "science",
            type: "Platform",
            cost: "$90,000,000",
            status: "Planning",
            progress: 12,
            esg: 92,
            description: "Игровые механики (квесты, NFT-награды) для вовлечения молодежи. Геймификация экологических инициатив."
        },
        {
            id: 12,
            title: "VOD Integration SDK",
            region: "global",
            author: "Civilization Protocol Foundation",
            authorType: "industrial",
            sector: "science",
            type: "Infrastructure",
            cost: "$150,000,000",
            status: "Active",
            progress: 28,
            esg: 97,
            description: "Набор инструментов для подключения внешних IoT-систем и гос. реестров. REST API, Python SDK, JavaScript SDK."
        },
        {
            id: 13,
            title: "IoT Sensor Network (VOD-S1)",
            region: "central_asia",
            author: "VODPROM",
            authorType: "industrial",
            sector: "water",
            type: "Infrastructure",
            cost: "$150,000,000",
            status: "Pilot",
            progress: 18,
            esg: 95,
            isPilot: true,
            hasMemorandum: true,
            description: "Сенсорные датчики IoT с блокчейном. Прямая передача данных от датчиков в блокчейн без промежуточных серверов."
        },
        {
            id: 14,
            title: "Blockchain Integration (VOD)",
            region: "global",
            author: "Civilization Protocol Foundation",
            authorType: "industrial",
            sector: "science",
            type: "Infrastructure",
            cost: "$120,000,000",
            status: "Active",
            progress: 38,
            esg: 98,
            description: "Интеграция с EVM-сетями. Смарт-контракты на Solidity для управления токенами и данными."
        },
        {
            id: 15,
            title: "Water Quality Monitoring (Uzbekistan)",
            region: "central_asia",
            author: "Civilization Protocol Water",
            authorType: "industrial",
            sector: "water",
            type: "Monitoring",
            cost: "$25,000,000",
            status: "Active",
            progress: 72,
            esg: 96,
            isPilot: true,
            description: "Система мониторинга качества воды в Узбекистане. 50 точек измерения, данные в реальном времени."
        },
        {
            id: 16,
            title: "Aral Sea Restoration Program",
            region: "central_asia",
            author: "Civilization Protocol Ecology",
            authorType: "industrial",
            sector: "ecology",
            type: "Restoration",
            cost: "$500,000,000",
            status: "Planning",
            progress: 8,
            esg: 99,
            hasMemorandum: true,
            description: "Программа восстановления Аральского моря. Комплексные меры по рекультивации и восстановлению экосистемы."
        },
        {
            id: 17,
            title: "Power Ledger: P2P Energy Trading",
            region: "global",
            author: "Power Ledger",
            authorType: "partner",
            sector: "energy",
            type: "Platform",
            cost: "$80,000,000",
            status: "Active",
            progress: 65,
            esg: 98,
            description: "P2P торговля избыточной солнечной энергией через блокчейн. Интеграция с Civilization Protocol Energy Hub."
        },
        {
            id: 18,
            title: "Medicalchain: Health Data Integration",
            region: "global",
            author: "Medicalchain",
            authorType: "partner",
            sector: "health",
            type: "Integration",
            cost: "$40,000,000",
            status: "Beta",
            progress: 48,
            esg: 95,
            description: "Интеграция медицинских данных с экологическим мониторингом. Отслеживание связи между качеством воды и здоровьем."
        },
        {
            id: 19,
            title: "VOD Check Mobile App",
            region: "global",
            author: "Civilization Protocol Mobile",
            authorType: "industrial",
            sector: "water",
            type: "Mobile",
            cost: "$40,000,000",
            status: "Planning",
            progress: 15,
            esg: 93,
            description: "Мобильное приложение для гражданского мониторинга и валидации данных. iOS и Android версии."
        },
        {
            id: 20,
            title: "UN-Water SDG 6 Integration",
            region: "global",
            author: "Civilization Protocol Global",
            authorType: "industrial",
            sector: "science",
            type: "Integration",
            cost: "$30,000,000",
            status: "Active",
            progress: 52,
            esg: 99,
            description: "Интеграция с UN-Water для автоматической генерации отчетов по SDG 6. Поддержка 12 стран."
        },
        {
            id: 21,
            title: "Scientific Research Grants Program",
            region: "global",
            author: "Civilization Protocol Science",
            authorType: "industrial",
            sector: "science",
            type: "Grants",
            cost: "$50,000,000",
            status: "Active",
            progress: 35,
            esg: 97,
            description: "Программа грантов для научных исследований. Гранты от 10,000 до 50,000 VOD для исследовательских проектов."
        },
        {
            id: 22,
            title: "Smart Irrigation Systems (Fergana)",
            region: "central_asia",
            author: "VODPROM",
            authorType: "industrial",
            sector: "water",
            type: "Infrastructure",
            cost: "$35,000,000",
            status: "Pilot",
            progress: 22,
            esg: 94,
            isPilot: true,
            description: "Умные ирригационные системы в Ферганской долине. Снижение потерь воды на 30%."
        },
        {
            id: 23,
            title: "Carbon Credits Marketplace",
            region: "global",
            author: "Regen Network",
            authorType: "partner",
            sector: "ecology",
            type: "Marketplace",
            cost: "$120,000,000",
            status: "Active",
            progress: 78,
            esg: 99,
            description: "Децентрализованный маркетплейс для углеродных кредитов. Токенизация углеродных секвестров."
        },
        {
            id: 24,
            title: "Desalination Plant (Middle East)",
            region: "middle_east",
            author: "Civilization Protocol Water",
            authorType: "industrial",
            sector: "water",
            type: "Infrastructure",
            cost: "$200,000,000",
            status: "Planning",
            progress: 12,
            esg: 96,
            description: "Солнечная опреснительная установка нового поколения. Технология нулевого сброса рассола."
        },
        {
            id: 25,
            title: "Civilization Protocol Academy Platform",
            region: "global",
            author: "Civilization Protocol Education",
            authorType: "industrial",
            sector: "science",
            type: "Platform",
            cost: "$45,000,000",
            status: "Planning",
            progress: 18,
            esg: 94,
            description: "Образовательная платформа с курсами по устойчивому водопользованию. NFT-сертификаты для студентов."
        }
    ];

    const filteredProjects = projects.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.author.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRegion = selectedRegion === "all" || p.region === selectedRegion;
        const matchesAuthor = selectedAuthorType === "all" || p.authorType === selectedAuthorType;
        const matchesSector = selectedSector === "all" || p.sector === selectedSector;
        return matchesSearch && matchesRegion && matchesAuthor && matchesSector;
    });

    const sectorIcons: Record<string, any> = {
        water: Droplets,
        ecology: TreePine,
        energy: Zap,
        health: Heart,
        science: FlaskConical
    };

    return (
        <div className={cn("min-h-screen bg-ocean-deep py-24 px-4", isRTL && "text-right")}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-5xl font-black text-white mb-4 tracking-tighter">
                        {t("projecthub.title")}
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl">
                        {t("projecthub.subtitle")}
                    </p>
                </div>

                {/* Buy Token Banner */}
                <div className="mb-8">
                    <BuyTokenWidget variant="banner" source="tokenhub" />
                </div>

                {/* Filters Bar */}
                <div className="glass-card p-6 border-white/5 bg-white/[0.02] mb-12">
                    <div className={cn("grid grid-cols-1 md:grid-cols-12 gap-6", isRTL && "direction-rtl")}>
                        {/* Search */}
                        <div className="md:col-span-3 relative">
                            <Search className={cn("absolute top-1/2 -translate-y-1/2 text-slate-500", isRTL ? "right-4" : "left-4")} size={18} />
                            <input
                                type="text"
                                placeholder={t("common.search")}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={cn(
                                    "w-full bg-white/5 border border-white/10 rounded-xl py-3 text-sm focus:outline-none focus:border-cyan-500/50 transition-all",
                                    isRTL ? "pr-12 pl-4" : "pl-12 pr-4"
                                )}
                            />
                        </div>

                        {/* Sector Filter */}
                        <div className="md:col-span-3">
                            <div className="relative">
                                <select
                                    value={selectedSector}
                                    onChange={(e) => setSelectedSector(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm appearance-none focus:outline-none focus:border-cyan-500/50 transition-all"
                                >
                                    <option value="all">{t("common.categories")}: {t("common.all")}</option>
                                    {Object.keys(translations.en.projecthub.sectors).map((key) => (
                                        <option key={key} value={key}>{t(`projecthub.sectors.${key}`)}</option>
                                    ))}
                                </select>
                                <LayoutGrid className={cn("absolute top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none", isRTL ? "left-4" : "right-4")} size={16} />
                            </div>
                        </div>

                        {/* Region Filter */}
                        <div className="md:col-span-3">
                            <div className="relative">
                                <select
                                    value={selectedRegion}
                                    onChange={(e) => setSelectedRegion(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm appearance-none focus:outline-none focus:border-cyan-500/50 transition-all"
                                >
                                    <option value="all">{t("common.regions")}: {t("common.all")}</option>
                                    {Object.keys(translations.en.projecthub.regions).map((key) => (
                                        <option key={key} value={key}>{t(`projecthub.regions.${key}`)}</option>
                                    ))}
                                </select>
                                <Globe className={cn("absolute top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none", isRTL ? "left-4" : "right-4")} size={16} />
                            </div>
                        </div>

                        {/* Author Type Filter */}
                        <div className="md:col-span-3">
                            <div className="relative">
                                <select
                                    value={selectedAuthorType}
                                    onChange={(e) => setSelectedAuthorType(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm appearance-none focus:outline-none focus:border-cyan-500/50 transition-all"
                                >
                                    <option value="all">{t("common.authors")}: {t("common.all")}</option>
                                    {Object.keys(translations.en.projecthub.author_types).map((key) => (
                                        <option key={key} value={key}>{t(`projecthub.author_types.${key}`)}</option>
                                    ))}
                                </select>
                                <ChevronDown className={cn("absolute top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none", isRTL ? "left-4" : "right-4")} size={16} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => {
                            const Icon = sectorIcons[project.sector] || Droplets;
                            return (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="glass-card border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group overflow-hidden flex flex-col"
                                >
                                    {/* Card Header */}
                                    <div className="p-6 border-b border-white/5 relative">
                                        <div className={cn("flex justify-between items-start mb-4", isRTL && "flex-row-reverse")}>
                                            <div className={cn(
                                                "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2",
                                                project.isPilot ? "bg-cyan-500 text-ocean-deep" : "bg-white/10 text-slate-400"
                                            )}>
                                                <Icon size={12} />
                                                {project.isPilot ? t("projecthub.pilot_project") : project.type}
                                            </div>
                                            <div className="flex items-center gap-1 text-emerald-400">
                                                <TrendingUp size={14} />
                                                <span className="text-xs font-black">{project.esg} ESG</span>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-black text-white group-hover:text-cyan-400 transition-colors leading-tight">
                                            {project.title}
                                        </h3>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-6 flex-1 space-y-6">
                                        <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                                            {project.description}
                                        </p>

                                        <div className="space-y-3">
                                            <div className={cn("flex items-center gap-3 text-xs", isRTL && "flex-row-reverse")}>
                                                <MapPin size={14} className="text-slate-500" />
                                                <span className="text-slate-300">{t(`projecthub.regions.${project.region}`)}</span>
                                            </div>
                                            <div className={cn("flex items-center gap-3 text-xs", isRTL && "flex-row-reverse")}>
                                                <Building2 size={14} className="text-slate-500" />
                                                <span className="text-slate-300">{project.author}</span>
                                            </div>
                                        </div>

                                        {/* Progress */}
                                        <div>
                                            <div className={cn("flex justify-between text-[10px] font-black uppercase mb-2", isRTL && "flex-row-reverse")}>
                                                <span className="text-slate-500">Progress</span>
                                                <span className="text-cyan-400">{project.progress}%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${project.progress}%` }}
                                                    className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Footer */}
                                    <div className="p-6 bg-white/[0.02] border-t border-white/5 mt-auto">
                                        <div className={cn("flex justify-between items-center", isRTL && "flex-row-reverse")}>
                                            <div>
                                                <div className="text-[10px] font-black text-slate-500 uppercase">{project.status}</div>
                                                <div className="text-lg font-black text-white">{project.cost}</div>
                                            </div>
                                            <button className="p-3 bg-white/5 rounded-xl hover:bg-cyan-500 hover:text-ocean-deep transition-all group/btn">
                                                <ExternalLink size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
