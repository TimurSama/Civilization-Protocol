"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
    BookOpen, Zap, Shield,
    Globe, TrendingUp, Users,
    ChevronRight, Play, Info,
    Cpu, Droplets, Database,
    Lock, GraduationCap, Gamepad2,
    Network, Building2, Layers,
    Menu, X, ChevronUp, Download,
    FileText, Target, Rocket,
    Award, CheckCircle2
} from "lucide-react";
import InvestmentScale from "@/components/InvestmentScale";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function WhitePaperPage() {
    const { t, isRTL } = useLanguage();
    const [activeLayer, setActiveLayer] = useState(0);
    const [showNav, setShowNav] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [showScrollTop, setShowScrollTop] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    
    const { scrollYProgress } = useScroll();
    const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    // Секции для навигации
    const sections = [
        { id: 'hero', label: 'Введение', icon: BookOpen },
        { id: 'investment', label: 'Инвестиции', icon: TrendingUp },
        { id: 'architecture', label: 'Архитектура', icon: Layers },
        { id: 'tokenomics', label: 'Токеномика', icon: Database },
        { id: 'ecosystem', label: 'Экосистема', icon: Globe },
        { id: 'dao', label: 'DAO', icon: Users },
        { id: 'products', label: 'Продукты', icon: Target },
        { id: 'projects', label: 'Проекты', icon: Rocket },
        { id: 'roadmap', label: 'Дорожная карта', icon: Award },
    ];

    const layers = [
        { id: 1, name: "Physical Layer", icon: Globe, desc: "Реальные водные объекты: реки, озера, очистные сооружения и инфраструктура.", color: "text-blue-400", details: "Физический слой включает все реальные водные ресурсы планеты: реки, озера, моря, подземные воды, а также инфраструктуру: насосные станции, очистные комплексы, трубопроводы." },
        { id: 2, name: "Data & IoT Layer", icon: Cpu, desc: "Сеть датчиков и спутников, передающих телеметрию в реальном времени.", color: "text-cyan-400", details: "Цифровой слой собирает данные через IoT-датчики, спутниковый мониторинг, лабораторные станции и унитарные инструменты VOD Check. Данные стандартизируются и валидируются перед записью в блокчейн." },
        { id: 3, name: "Blockchain Layer", icon: Shield, desc: "Слой доверия: неизменяемые данные и смарт-контракты активов.", color: "text-emerald-400", details: "Blockchain слой обеспечивает неизменяемое хранение данных, хэширование, смарт-контракты объектов. Используется EVM-совместимая сеть с возможностью кросс-чейн интеграции." },
        { id: 4, name: "Economic Layer", icon: TrendingUp, desc: "Токеномика VOD, стейкинг и инвестиционные пулы ProjectHub.", color: "text-amber-400", details: "Экономический слой включает токеномику (VOD, R-VOD, P-VOD), стейкинг, инвестиционные пулы через TokenHub, открытый для пользовательских, государственных и международных программ." },
        { id: 5, name: "DAO Layer", icon: Users, desc: "Децентрализованное управление и прозрачное распределение ресурсов.", color: "text-purple-400", details: "Слой управления обеспечивает децентрализованное принятие решений, казначейство, аудит. DAO VOD позволяет участникам голосовать за предложения и управлять экосистемой." },
        { id: 6, name: "Interface Layer", icon: Building2, desc: "7 специализированных кабинетов и интерактивные дашборды.", color: "text-indigo-400", details: "Пользовательский слой включает 7 кабинетов: Гражданский, Правительственный, Инвестиционный, Инфраструктурный, Научный, Операторский и Административный. Каждый кабинет имеет специализированные инструменты." },
        { id: 7, name: "AI Layer", icon: Zap, desc: "Предиктивная аналитика и оптимизация водных систем через ML.", color: "text-rose-400", details: "Слой ИИ обрабатывает данные, использует машинное обучение для прогнозирования состояний водных систем, обнаружения аномалий и оптимизации распределения ресурсов." },
        { id: 8, name: "Security Layer", icon: Lock, desc: "Защита данных, многофакторная аутентификация, непрерывный аудит безопасности.", color: "text-red-400", details: "Слой безопасности обеспечивает защиту данных, многофакторную аутентификацию, непрерывный аудит безопасности, шифрование и соответствие GDPR и другим стандартам." },
        { id: 9, name: "Educational Layer", icon: GraduationCap, desc: "Обучение, гранты, конкурсы, научные публикации и исследования.", color: "text-yellow-400", details: "Научно-образовательный слой включает платформу для публикации исследований, распределения грантов, образовательные курсы и сертификаты." },
        { id: 10, name: "Gaming Layer", icon: Gamepad2, desc: "Геймификация для всех возрастов, награды за обучение и социальную активность.", color: "text-pink-400", details: "Игровой слой использует геймификацию для вовлечения молодежи: квесты, NFT-награды, лидерборды и образовательные игры." },
        { id: 11, name: "Social Layer", icon: Network, desc: "Социальные сети, форумы, сообщества, конкурсы и совместные исследования.", color: "text-teal-400", details: "Социальный слой объединяет пользователей через социальные сети, форумы, группы, сообщения и совместные проекты." },
        { id: 12, name: "Integration Layer", icon: Layers, desc: "Интеграция с государствами, международными организациями, API, SDK и библиотеки.", color: "text-violet-400", details: "Интеграционный слой обеспечивает подключение к государственным системам, международным организациям (ООН, UN-Water), предоставляет API, SDK и библиотеки для разработчиков." },
    ];

    // Дорожная карта
    const roadmap = [
        { year: "2023", title: "Концепция и MVP", items: ["Разработка концепции", "White Paper v1.0", "Прототип платформы", "Первые партнёрства"] },
        { year: "2024", title: "Альфа-версия", items: ["Запуск альфа-платформы", "Токен VOD", "DAO v1.0", "Первые инвестиции в TokenHub"] },
        { year: "2025", title: "Бета-версия", items: ["Публичная бета", "Мобильное приложение", "AI Analytics", "1000+ пользователей"] },
        { year: "2026", title: "Полный запуск", items: ["Глобальный релиз", "Интеграция с UN-Water", "10,000+ активных пользователей", "100+ проектов в TokenHub"] },
    ];

    // Отслеживание скролла
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 500);
            
            // Определяем активную секцию
            const sectionElements = sections.map(s => document.getElementById(s.id));
            const scrollPosition = window.scrollY + 200;
            
            for (let i = sectionElements.length - 1; i >= 0; i--) {
                const section = sectionElements[i];
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setShowNav(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div ref={containerRef} className={cn("min-h-screen", isRTL && "text-right")}>
            {/* Progress Bar */}
            <motion.div 
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 z-50 origin-left"
                style={{ width: progressWidth }}
            />

            {/* Floating Navigation */}
            <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden xl:block">
                <div className="glass-card p-2 rounded-2xl border-white/10">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center transition-all mb-1 last:mb-0 group relative",
                                activeSection === section.id 
                                    ? "bg-cyan-500 text-ocean-deep" 
                                    : "text-slate-500 hover:text-white hover:bg-white/10"
                            )}
                        >
                            <section.icon size={18} />
                            <span className="absolute left-full ml-2 px-2 py-1 rounded bg-ocean-deep border border-white/10 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                {section.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Mobile Navigation Toggle */}
            <button
                onClick={() => setShowNav(!showNav)}
                className="fixed bottom-24 right-4 z-40 w-12 h-12 rounded-full bg-cyan-500 text-ocean-deep flex items-center justify-center shadow-lg shadow-cyan-500/30 xl:hidden"
            >
                {showNav ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Navigation */}
            {showNav && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fixed bottom-40 right-4 z-40 glass-card p-4 rounded-2xl border-white/10 xl:hidden"
                >
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-2 rounded-xl transition-all mb-1 last:mb-0",
                                activeSection === section.id 
                                    ? "bg-cyan-500/20 text-cyan-400" 
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <section.icon size={16} />
                            <span className="text-sm">{section.label}</span>
                        </button>
                    ))}
                </motion.div>
            )}

            {/* Scroll to Top */}
            {showScrollTop && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={scrollToTop}
                    className="fixed bottom-24 right-20 z-40 w-12 h-12 rounded-full glass border-white/20 flex items-center justify-center hover:bg-white/10 transition-all xl:right-4"
                >
                    <ChevronUp size={24} />
                </motion.button>
            )}

            {/* Hero Section */}
            <section id="hero" className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent" />
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
                <div className="max-w-7xl mx-auto px-4 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-8">
                            <BookOpen size={14} /> White Paper 2.0
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 text-glow-cyan tracking-tighter leading-none">
                            CivilizationProtocol <br /> <span className="text-white/20">Earth Standard</span>
                        </h1>
                        <p className="text-xl text-slate-400 leading-relaxed mb-12">
                            Децентрализованная кибер-физическая платформа для устойчивого управления водными ресурсами планеты
                        </p>
                        <div className={cn("flex flex-wrap justify-center gap-4", isRTL && "flex-row-reverse")}>
                            <Link href="/presentation" className="px-8 py-4 bg-cyan-500 text-ocean-deep rounded-2xl font-black flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-cyan-500/20">
                                <Play size={20} fill="currentColor" /> Презентация
                            </Link>
                            <button className="px-8 py-4 glass border-white/10 rounded-2xl font-black flex items-center gap-3 hover:bg-white/5 transition-all">
                                <Download size={20} /> Скачать PDF
                            </button>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
                            {[
                                { value: "12", label: "Уровней архитектуры" },
                                { value: "7", label: "Типов кабинетов" },
                                { value: "4", label: "Фазы токеномики" },
                                { value: "6", label: "SDG целей ООН" },
                            ].map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + i * 0.1 }}
                                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/5"
                                >
                                    <div className="text-3xl font-black text-cyan-400 mb-1">{stat.value}</div>
                                    <div className="text-xs text-slate-500">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Investment Scale Section */}
            <section id="investment" className="py-24 border-y border-white/5 bg-white/[0.01]">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-black mb-4">Инвестиционный путь</h2>
                        <p className="text-slate-400">От MVP до глобальной платформы</p>
                    </motion.div>

                    <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-16 items-center", isRTL && "direction-rtl")}>
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={cn(isRTL && "order-last")}
                        >
                            <h3 className="text-3xl font-black mb-6 leading-tight">Альфа → Бета → Релиз</h3>
                            <p className="text-slate-400 mb-8 leading-relaxed">
                                Поэтапное развитие платформы с привлечением инвестиций на каждом этапе. 
                                Прозрачное распределение средств через DAO.
                            </p>
                            <div className="space-y-4">
                                {[
                                    { label: "Инвестировано (MVP)", val: "$150,000", p: "100%", color: "text-emerald-400" },
                                    { label: "Цель Alpha", val: "$2,000,000", p: "7.5%", color: "text-cyan-400" },
                                    { label: "Цель Beta", val: "$10,000,000", p: "1.5%", color: "text-purple-400" },
                                ].map(item => (
                                    <div key={item.label} className={cn("flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10", isRTL && "flex-row-reverse")}>
                                        <span className="text-sm font-bold text-slate-400">{item.label}</span>
                                        <span className={cn("text-sm font-black", item.color)}>{item.val}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={cn(isRTL && "order-first")}
                        >
                            <InvestmentScale />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Interactive Layers Section */}
            <section id="architecture" className="py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-black mb-4">12-уровневая архитектура</h2>
                        <p className="text-slate-400">Комплексная система для управления водными ресурсами</p>
                    </motion.div>

                    <div className={cn("grid grid-cols-1 lg:grid-cols-12 gap-8", isRTL && "direction-rtl")}>
                        <div className={cn("lg:col-span-4 space-y-2 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin", isRTL && "order-last")}>
                            {layers.map((layer, i) => (
                                <motion.button
                                    key={layer.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={() => setActiveLayer(i)}
                                    className={cn(
                                        "w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all text-left border",
                                        isRTL && "flex-row-reverse text-right",
                                        activeLayer === i
                                            ? "bg-white/10 border-cyan-500/50 shadow-lg"
                                            : "bg-white/[0.02] border-white/5 hover:border-white/20"
                                    )}
                                >
                                    <layer.icon className={cn("shrink-0", activeLayer === i ? layer.color : "text-slate-600")} size={22} />
                                    <div className="flex-1">
                                        <span className={cn("font-bold text-sm", activeLayer === i ? "text-white" : "text-slate-500")}>
                                            {layer.name}
                                        </span>
                                        {activeLayer === i && (
                                            <p className="text-xs text-slate-400 mt-1">{layer.desc}</p>
                                        )}
                                    </div>
                                    {activeLayer === i && <ChevronRight className={cn(isRTL && "rotate-180")} size={18} />}
                                </motion.button>
                            ))}
                        </div>

                        <div className={cn("lg:col-span-8", isRTL && "order-first")}>
                            <motion.div
                                key={activeLayer}
                                initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="glass-card p-8 md:p-12 border-white/5 bg-white/[0.02] h-full relative overflow-hidden"
                            >
                                <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-cyan-500/5 blur-3xl rounded-full" />

                                <div className={cn("flex items-center gap-4 mb-6", isRTL && "flex-row-reverse")}>
                                    <div className={cn("w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center", layers[activeLayer].color)}>
                                        {(() => {
                                            const Icon = layers[activeLayer].icon;
                                            return <Icon size={32} />;
                                        })()}
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Уровень {activeLayer + 1}</div>
                                        <h3 className="text-2xl md:text-3xl font-black">{layers[activeLayer].name}</h3>
                                    </div>
                                </div>
                                
                                <p className="text-lg text-slate-400 leading-relaxed mb-6">
                                    {layers[activeLayer].desc}
                                </p>
                                
                                <p className="text-base text-slate-500 leading-relaxed mb-8">
                                    {layers[activeLayer].details}
                                </p>

                                <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", isRTL && "direction-rtl")}>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <div className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-3">Ключевые функции</div>
                                        <ul className="space-y-2">
                                            <li className={cn("text-sm text-slate-300 flex items-center gap-2", isRTL && "flex-row-reverse")}>
                                                <CheckCircle2 size={14} className="text-cyan-500" /> Автоматическая валидация
                                            </li>
                                            <li className={cn("text-sm text-slate-300 flex items-center gap-2", isRTL && "flex-row-reverse")}>
                                                <CheckCircle2 size={14} className="text-cyan-500" /> Интеграция с API
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <div className="text-[10px] font-black text-purple-500 uppercase tracking-widest mb-3">Статус</div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-sm text-emerald-400">В разработке</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tokenomics Section */}
            <section id="tokenomics" className="py-24 border-t border-white/5 bg-gradient-to-b from-ocean-deep to-ocean-deep/50">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-black mb-4">Токеномика VOD: 4 фазы</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Эволюция токена вместе с платформой
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {[
                            { phase: "I", title: "Participation & Access", desc: "Доступ, участие, право голоса", status: "Активна", color: "border-cyan-500/30 bg-cyan-500/5" },
                            { phase: "II", title: "Staking & Governance", desc: "Стейкинг, DAO, формирование доверия", status: "В разработке", color: "border-purple-500/30 bg-purple-500/5" },
                            { phase: "III", title: "Data Anchoring", desc: "Верификация, хэширование, ончейн", status: "Планируется", color: "border-emerald-500/30 bg-emerald-500/5" },
                            { phase: "IV", title: "Resource-Linked Logic", desc: "Смарт-контракты объектов", status: "Будущее", color: "border-amber-500/30 bg-amber-500/5" }
                        ].map((phase, i) => (
                            <motion.div
                                key={phase.phase}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={cn("glass-card p-6 border-2 rounded-2xl", phase.color)}
                            >
                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Phase {phase.phase}</div>
                                <h3 className="text-lg font-black mb-3">{phase.title}</h3>
                                <p className="text-sm text-slate-400 mb-4">{phase.desc}</p>
                                <div className="text-xs font-black text-cyan-400 uppercase tracking-widest">{phase.status}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Token Types */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { token: "VOD", desc: "Основной токен участия и управления", color: "from-cyan-500 to-blue-600" },
                            { token: "R-VOD", desc: "Репутационный токен за вклад", color: "from-purple-500 to-pink-600" },
                            { token: "P-VOD", desc: "Проектный токен для инвестиций", color: "from-emerald-500 to-teal-600" },
                        ].map((t, i) => (
                            <motion.div
                                key={t.token}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card p-6 border-white/5"
                            >
                                <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-lg font-black mb-4", t.color)}>
                                    {t.token.charAt(0)}
                                </div>
                                <h4 className="text-xl font-black mb-2">{t.token}</h4>
                                <p className="text-sm text-slate-400">{t.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Ecosystem Section */}
            <section id="ecosystem" className="py-24 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-black mb-4">Экосистема CivilizationProtocol</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Технологии, экономика и сообщество
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: "TokenHub", desc: "Инвестиционный маркетплейс проектов", icon: TrendingUp, color: "text-emerald-400", href: "/tokenhub" },
                            { title: "Nexus Exchange", desc: "Обмен, стейкинг, инвестиции", icon: Network, color: "text-purple-400", href: "/nexus" },
                            { title: "VOD Check", desc: "Гражданский мониторинг воды", icon: Droplets, color: "text-cyan-400", href: "/vodcheck" },
                            { title: "7 Кабинетов", desc: "Специализированные интерфейсы", icon: Building2, color: "text-indigo-400", href: "/cabinets" },
                            { title: "AI Analytics", desc: "Предиктивная аналитика", icon: Zap, color: "text-yellow-400", href: "/ai" },
                            { title: "Social Network", desc: "Сообщество экспертов", icon: Users, color: "text-pink-400", href: "/social" },
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Link href={item.href} className="glass-card p-6 border-white/5 hover:border-white/20 transition-all block group">
                                    <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 ${item.color} group-hover:scale-110 transition-transform`}>
                                        <item.icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-black mb-2 group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                                    <p className="text-sm text-slate-400">{item.desc}</p>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* DAO Section */}
            <section id="dao" className="py-24 border-t border-white/5 bg-white/[0.01]">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-black mb-4">DAO VOD</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Децентрализованное управление экосистемой
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="glass-card p-8 border-purple-500/20 bg-purple-500/[0.02]"
                        >
                            <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                                <Users className="text-purple-400" size={28} />
                                Механика голосования
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <div className="text-sm font-black mb-2">Вес голоса</div>
                                    <div className="text-slate-400 text-sm">Пропорционален застейканным VOD</div>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <div className="text-sm font-black mb-2">Кворум</div>
                                    <div className="text-slate-400 text-sm">Минимум 10% застейканных токенов</div>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <div className="text-sm font-black mb-2">Период</div>
                                    <div className="text-slate-400 text-sm">7 дней (3 дня для критических)</div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="glass-card p-8 border-purple-500/20 bg-purple-500/[0.02]"
                        >
                            <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                                <Shield className="text-purple-400" size={28} />
                                Казначейство
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <div className="text-sm font-black mb-2">Мультисиг</div>
                                    <div className="text-slate-400 text-sm">Крупные траты требуют голосования</div>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <div className="text-sm font-black mb-2">Прозрачность</div>
                                    <div className="text-slate-400 text-sm">Все транзакции публичны</div>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <div className="text-sm font-black mb-2">Аудит</div>
                                    <div className="text-slate-400 text-sm">Каждые 6 месяцев</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <Link href="/dao" className="block glass-card p-6 border-cyan-500/20 bg-cyan-500/[0.02] hover:border-cyan-500/40 transition-all text-center">
                        <span className="text-lg font-black text-cyan-400">Перейти в DAO →</span>
                    </Link>
                </div>
            </section>

            {/* Products Section */}
            <section id="products" className="py-24 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-black mb-4">Продукты</h2>
                        <p className="text-slate-400">Инструменты для всех участников</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { title: "VOD Check", cat: "Мониторинг", desc: "Мобильное приложение для проверки качества воды с NFT-сертификатами", icon: Droplets, color: "text-cyan-400" },
                            { title: "Dashboard", cat: "Визуализация", desc: "3D карта Земли и интерактивные дашборды в реальном времени", icon: Globe, color: "text-blue-400" },
                            { title: "TokenHub", cat: "Инвестиции", desc: "Маркетплейс проектов с ESG-рейтингами и DAO-управлением", icon: TrendingUp, color: "text-emerald-400" },
                            { title: "AI Engine", cat: "Аналитика", desc: "Прогнозирование кризисов и оптимизация ресурсов", icon: Zap, color: "text-yellow-400" },
                        ].map((product, i) => (
                            <motion.div
                                key={product.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card p-6 border-white/5 hover:border-white/20 transition-all"
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center ${product.color} shrink-0`}>
                                        <product.icon size={28} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">{product.cat}</div>
                                        <h3 className="text-xl font-black mb-2">{product.title}</h3>
                                        <p className="text-sm text-slate-400">{product.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-24 border-t border-white/5 bg-white/[0.01]">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-black mb-4">Проекты TokenHub</h2>
                        <p className="text-slate-400">Примеры финансируемых проектов</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: "Восстановление Аральского моря", region: "Центральная Азия", cost: "$500M", esg: 98 },
                            { title: "Smart Pumping Network", region: "Европа", cost: "$45M", esg: 95 },
                            { title: "Desalination 2.0", region: "Ближний Восток", cost: "$85M", esg: 92 },
                        ].map((project, i) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card p-6 border-white/5 hover:border-emerald-500/30 transition-all"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="text-xs font-black text-emerald-400 px-2 py-1 rounded bg-emerald-500/10">
                                        Активен
                                    </div>
                                    <div className="text-xs text-slate-500">ESG: {project.esg}</div>
                                </div>
                                <h3 className="text-lg font-black mb-1">{project.title}</h3>
                                <div className="text-xs text-slate-500 mb-4">{project.region}</div>
                                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                                    <span className="text-xs text-slate-500">Стоимость</span>
                                    <span className="font-black">{project.cost}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <Link href="/tokenhub" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold hover:bg-emerald-500/20 transition-all">
                            Все проекты в TokenHub <ChevronRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Roadmap Section */}
            <section id="roadmap" className="py-24 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-black mb-4">Дорожная карта</h2>
                        <p className="text-slate-400">2023 → 2026</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {roadmap.map((phase, i) => (
                            <motion.div
                                key={phase.year}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={cn(
                                    "glass-card p-6 border-2 rounded-2xl",
                                    i === 1 ? "border-cyan-500/50 bg-cyan-500/5" : "border-white/5"
                                )}
                            >
                                <div className="text-3xl font-black text-cyan-400 mb-2">{phase.year}</div>
                                <h3 className="text-lg font-black mb-4">{phase.title}</h3>
                                <ul className="space-y-2">
                                    {phase.items.map((item, j) => (
                                        <li key={j} className="flex items-center gap-2 text-sm text-slate-400">
                                            <CheckCircle2 size={14} className={i < 1 ? "text-emerald-500" : "text-slate-600"} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/roadmap" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold hover:bg-cyan-500/20 transition-all">
                            Полная дорожная карта <ChevronRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 border-t border-white/5 bg-gradient-to-b from-ocean-deep to-cyan-900/20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-black mb-6">Присоединяйтесь к CivilizationProtocol</h2>
                        <p className="text-xl text-slate-400 mb-8">
                            Станьте частью глобального движения за устойчивое управление водными ресурсами
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/landing" className="px-8 py-4 bg-cyan-500 text-ocean-deep rounded-2xl font-black hover:scale-105 transition-all shadow-xl shadow-cyan-500/20">
                                Стать Pioneer 🏆
                            </Link>
                            <Link href="/invest" className="px-8 py-4 glass border-white/10 rounded-2xl font-black hover:bg-white/5 transition-all">
                                Инвестировать
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <Droplets className="text-cyan-500" size={24} />
                        <span className="text-xl font-black tracking-tighter">CivilizationProtocol</span>
                    </div>
                    <p className="text-xs text-slate-600 font-bold uppercase tracking-widest">
                        International Standard for Water Resource Management
                    </p>
                </div>
            </footer>
        </div>
    );
}
