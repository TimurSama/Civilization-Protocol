"use client";

import { motion } from "framer-motion";
import {
    BookOpen, Zap, Shield,
    Globe, TrendingUp, Users,
    ChevronRight, Play, Info,
    Cpu, Droplets, Database,
    Lock, GraduationCap, Gamepad2,
    Network, Building2, Layers
} from "lucide-react";
import InvestmentScale from "@/components/InvestmentScale";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function WhitePaperPage() {
    const { t, isRTL } = useLanguage();
    const [activeLayer, setActiveLayer] = useState(0);

    const layers = [
        { id: 1, name: "Physical Layer", icon: Globe, desc: "Реальные водные объекты: реки, озера, очистные сооружения и инфраструктура.", color: "text-blue-400", details: "Физический слой включает все реальные водные ресурсы планеты: реки, озера, моря, подземные воды, а также инфраструктуру: насосные станции, очистные комплексы, трубопроводы." },
        { id: 2, name: "Data & IoT Layer", icon: Cpu, desc: "Сеть датчиков и спутников, передающих телеметрию в реальном времени.", color: "text-cyan-400", details: "Цифровой слой собирает данные через IoT-датчики, спутниковый мониторинг, лабораторные станции и унитарные инструменты VOD Check. Данные стандартизируются и валидируются перед записью в блокчейн." },
        { id: 3, name: "Blockchain Layer", icon: Shield, desc: "Слой доверия: неизменяемые данные и смарт-контракты активов.", color: "text-emerald-400", details: "Blockchain слой обеспечивает неизменяемое хранение данных, хэширование, смарт-контракты объектов. Используется собственная сеть VOD и интеграция с TON Network." },
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

    return (
        <div className={cn("min-h-screen bg-ocean-deep", isRTL && "text-right")}>
            {/* Hero Section */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent" />
                <div className="max-w-7xl mx-auto px-4 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-8">
                            <BookOpen size={14} /> {t("nav.whitepaper")} 2.0
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black mb-8 text-glow-cyan tracking-tighter leading-none">
                            Civilization Protocol <br /> <span className="text-white/20">Earth Standard</span>
                        </h1>
                        <p className="text-xl text-slate-400 leading-relaxed mb-12">
                            {t("whitepaper.subtitle")}
                        </p>
                        <div className={cn("flex flex-wrap justify-center gap-4", isRTL && "flex-row-reverse")}>
                            <button className="px-8 py-4 bg-cyan-500 text-ocean-deep rounded-2xl font-black flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-cyan-500/20">
                                <Play size={20} fill="currentColor" className={cn(isRTL && "rotate-180")} /> {t("whitepaper.start_review")}
                            </button>
                            <button className="px-8 py-4 glass border-white/10 rounded-2xl font-black flex items-center gap-3 hover:bg-white/5 transition-all">
                                <Info size={20} /> {t("whitepaper.tech_docs")}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Investment Scale Section */}
            <section className="py-24 border-y border-white/5 bg-white/[0.01]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-16 items-center", isRTL && "direction-rtl")}>
                        <div className={cn(isRTL && "order-last")}>
                            <h2 className="text-4xl font-black mb-6 leading-tight">{t("whitepaper.alpha_path")}</h2>
                            <p className="text-slate-400 mb-8 leading-relaxed">
                                {t("whitepaper.alpha_desc")}
                            </p>
                            <div className="space-y-4">
                                {[
                                    { label: t("whitepaper.invested_mvp"), val: "$150,000", p: "100%" },
                                    { label: t("whitepaper.alpha_goal"), val: "$2,000,000", p: "7.5%" },
                                ].map(item => (
                                    <div key={item.label} className={cn("flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10", isRTL && "flex-row-reverse")}>
                                        <span className="text-sm font-bold text-slate-400">{item.label}</span>
                                        <span className="text-sm font-black text-white">{item.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={cn(isRTL && "order-first")}>
                            <InvestmentScale />
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Layers Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-4">Архитектура платформы (12 уровней)</h2>
                        <p className="text-slate-400">Выберите уровень для детального просмотра</p>
                    </div>

                    <div className={cn("grid grid-cols-1 lg:grid-cols-12 gap-8", isRTL && "direction-rtl")}>
                        <div className={cn("lg:col-span-4 space-y-2", isRTL && "order-last")}>
                            {layers.map((layer, i) => (
                                <button
                                    key={layer.id}
                                    onClick={() => setActiveLayer(i)}
                                    className={cn(
                                        "w-full flex items-center gap-4 px-6 py-5 rounded-2xl transition-all text-left border",
                                        isRTL && "flex-row-reverse text-right",
                                        activeLayer === i
                                            ? "bg-white/10 border-cyan-500/50 shadow-lg"
                                            : "bg-white/[0.02] border-white/5 hover:border-white/20"
                                    )}
                                >
                                    <layer.icon className={cn("shrink-0", activeLayer === i ? layer.color : "text-slate-600")} size={24} />
                                    <span className={cn("font-black text-sm uppercase tracking-widest", activeLayer === i ? "text-white" : "text-slate-500")}>
                                        {layer.name}
                                    </span>
                                    {activeLayer === i && <ChevronRight className={cn(isRTL ? "mr-auto rotate-180" : "ml-auto")} size={20} />}
                                </button>
                            ))}
                        </div>

                        <div className={cn("lg:col-span-8", isRTL && "order-first")}>
                            <motion.div
                                key={activeLayer}
                                initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="glass-card p-12 border-white/5 bg-white/[0.02] h-full relative overflow-hidden"
                            >
                                <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-cyan-500/5 blur-3xl rounded-full" />

                                <div className={cn("w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8", layers[activeLayer].color, isRTL && "mr-auto ml-0")}>
                                    {(() => {
                                        const Icon = layers[activeLayer].icon;
                                        return <Icon size={32} />;
                                    })()}
                                </div>

                                <h3 className="text-3xl font-black mb-6">{layers[activeLayer].name}</h3>
                                <p className="text-xl text-slate-400 leading-relaxed mb-6">
                                    {layers[activeLayer].desc}
                                </p>
                                {layers[activeLayer].details && (
                                    <p className="text-base text-slate-500 leading-relaxed mb-12">
                                        {layers[activeLayer].details}
                                    </p>
                                )}

                                <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6", isRTL && "direction-rtl")}>
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                        <div className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-4">{t("whitepaper.mechanics")}</div>
                                        <ul className="space-y-3">
                                            <li className={cn("text-sm text-slate-300 flex items-center gap-2", isRTL && "flex-row-reverse")}>
                                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" /> Автоматическая валидация
                                            </li>
                                            <li className={cn("text-sm text-slate-300 flex items-center gap-2", isRTL && "flex-row-reverse")}>
                                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" /> Смарт-контракты VOD
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                        <div className="text-[10px] font-black text-purple-500 uppercase tracking-widest mb-4">{t("whitepaper.game_mode")}</div>
                                        <button className={cn("flex items-center gap-2 text-sm font-bold text-white hover:text-purple-400 transition-colors", isRTL && "flex-row-reverse")}>
                                            {t("whitepaper.run_demo")} <Play size={14} fill="currentColor" className={cn(isRTL && "rotate-180")} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tokenomics Section */}
            <section className="py-24 border-t border-white/5 bg-gradient-to-b from-ocean-deep to-ocean-deep/50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-4">Токеномика VOD: 4 фазы развития</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Токен развивается синхронно с платформой — от инструмента участия до элемента ончейн-управления ресурсами
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {[
                            {
                                phase: "Phase I",
                                title: "Participation & Access",
                                desc: "Доступ к платформе, участие в развитии, право голоса в ранних механизмах управления",
                                status: "Активна",
                                color: "border-cyan-500/30 bg-cyan-500/5"
                            },
                            {
                                phase: "Phase II",
                                title: "Staking & Governance",
                                desc: "Стейкинг, участие в DAO, фильтрация решений, формирование доверия",
                                status: "В разработке",
                                color: "border-purple-500/30 bg-purple-500/5"
                            },
                            {
                                phase: "Phase III",
                                title: "Data Anchoring",
                                desc: "Верификация данных, хэширование, фиксация ончейн, связь с цифровыми двойниками",
                                status: "Планируется",
                                color: "border-emerald-500/30 bg-emerald-500/5"
                            },
                            {
                                phase: "Phase IV",
                                title: "Resource-Linked Logic",
                                desc: "Участие в смарт-контрактах объектов, управление доступом к данным, экономические механизмы",
                                status: "Будущее",
                                color: "border-amber-500/30 bg-amber-500/5"
                            }
                        ].map((phase, i) => (
                            <motion.div
                                key={phase.phase}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={cn("glass-card p-6 border-2 rounded-2xl", phase.color)}
                            >
                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{phase.phase}</div>
                                <h3 className="text-lg font-black mb-3">{phase.title}</h3>
                                <p className="text-sm text-slate-400 mb-4 leading-relaxed">{phase.desc}</p>
                                <div className="text-xs font-black text-cyan-400 uppercase tracking-widest">{phase.status}</div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="glass-card p-8 border-cyan-500/20 bg-cyan-500/[0.02]">
                        <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                            <Shield className="text-cyan-400" size={28} />
                            Ключевой принцип
                        </h3>
                        <p className="text-lg text-slate-300 leading-relaxed mb-4">
                            Токен не заменяется и не обменивается принудительно. Он эволюционирует, сохраняя преемственность для ранних участников.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                <div className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-2">Token ≠</div>
                                <div className="text-sm font-bold text-slate-300">Владение водой</div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                <div className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-2">Token ≠</div>
                                <div className="text-sm font-bold text-slate-300">Финансовый инструмент</div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2">Token =</div>
                                <div className="text-sm font-bold text-slate-300">Интерфейс доступа и участия</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ecosystem Section */}
            <section className="py-24 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-4">Экосистема Civilization Protocol</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Комплексная платформа, объединяющая технологии, экономику и сообщество для устойчивого управления водными ресурсами
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "TokenHub",
                                desc: "Инвестиционный маркетплейс для проектов по восстановлению и развитию водных ресурсов. DAO-управляемые инвестиции, прозрачное финансирование, отслеживание результатов.",
                                icon: TrendingUp,
                                color: "text-emerald-400",
                                bg: "bg-emerald-500/10"
                            },
                            {
                                title: "Nexus Exchange",
                                desc: "Децентрализованная инфраструктура для обмена токенов (VOD/R-VOD/P-VOD), стейкинга с APY до 25%, инвестиционных пулов и маркетплейса услуг.",
                                icon: Network,
                                color: "text-purple-400",
                                bg: "bg-purple-500/10"
                            },
                            {
                                title: "VOD Check",
                                desc: "Унитарный инструмент для гражданского мониторинга качества воды. Мобильное приложение с интеграцией в блокчейн и NFT-сертификатами.",
                                icon: Droplets,
                                color: "text-cyan-400",
                                bg: "bg-cyan-500/10"
                            },
                            {
                                title: "7 Специализированных Кабинетов",
                                desc: "Гражданский, Правительственный, Инвестиционный, Инфраструктурный, Научный, Операторский и Административный. Каждый кабинет имеет уникальный функционал.",
                                icon: Building2,
                                color: "text-indigo-400",
                                bg: "bg-indigo-500/10"
                            },
                            {
                                title: "AI Analytics Engine",
                                desc: "Предиктивная аналитика на основе машинного обучения. Прогнозирование кризисов, оптимизация распределения ресурсов, обнаружение аномалий.",
                                icon: Zap,
                                color: "text-yellow-400",
                                bg: "bg-yellow-500/10"
                            },
                            {
                                title: "Социальная Сеть",
                                desc: "Платформа для общения экспертов, активистов и исследователей. Посты, комментарии, группы, сообщения, совместные проекты.",
                                icon: Users,
                                color: "text-pink-400",
                                bg: "bg-pink-500/10"
                            },
                            {
                                title: "DAO Governance",
                                desc: "Децентрализованное управление экосистемой через голосование держателей токенов. Прозрачное распределение ресурсов из казны, аудит предложений.",
                                icon: Shield,
                                color: "text-purple-400",
                                bg: "bg-purple-500/10"
                            },
                            {
                                title: "Gaming Layer",
                                desc: "Геймификация экологических инициатив. Квесты, NFT-награды, лидерборды, образовательные игры для вовлечения молодежи.",
                                icon: Gamepad2,
                                color: "text-rose-400",
                                bg: "bg-rose-500/10"
                            },
                            {
                                title: "IoT Сеть",
                                desc: "Глобальная сеть датчиков качества воды, спутниковый мониторинг, лабораторные станции. Данные в реальном времени попадают в блокчейн.",
                                icon: Cpu,
                                color: "text-teal-400",
                                bg: "bg-teal-500/10"
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card p-6 border-white/5 hover:border-white/20 transition-all"
                            >
                                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-4 ${item.color}`}>
                                    <item.icon size={24} />
                                </div>
                                <h3 className="text-xl font-black mb-3">{item.title}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* DAO Section */}
            <section className="py-24 border-t border-white/5 bg-white/[0.01]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-4">DAO VOD: Децентрализованное Управление</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Прозрачное и демократичное управление экосистемой через голосование держателей токенов
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                        <div className="glass-card p-8 border-purple-500/20 bg-purple-500/[0.02]">
                            <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                                <Users className="text-purple-400" size={28} />
                                Механика голосования
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <div className="text-sm font-black mb-2">Вес голоса</div>
                                    <div className="text-slate-400 text-sm">Пропорционален количеству застейканных VOD токенов. Минимум 1,000 VOD для участия в голосовании.</div>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <div className="text-sm font-black mb-2">Кворум</div>
                                    <div className="text-slate-400 text-sm">Минимум 10% от общего количества застейканных токенов должно проголосовать для принятия решения.</div>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <div className="text-sm font-black mb-2">Период голосования</div>
                                    <div className="text-slate-400 text-sm">Стандартный период — 7 дней. Для критических решений может быть сокращен до 3 дней.</div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-8 border-purple-500/20 bg-purple-500/[0.02]">
                            <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                                <Shield className="text-purple-400" size={28} />
                                Казначейство DAO
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <div className="text-sm font-black mb-2">Управление средствами</div>
                                    <div className="text-slate-400 text-sm">Все средства хранятся в мультисиг-кошельке. Крупные траты (&gt;100,000 VOD) требуют голосования DAO.</div>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <div className="text-sm font-black mb-2">Прозрачность</div>
                                    <div className="text-slate-400 text-sm">Все транзакции казначейства публичны в блокчейне. Ежемесячные отчеты о расходах и доходах.</div>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <div className="text-sm font-black mb-2">Аудит</div>
                                    <div className="text-slate-400 text-sm">Независимый аудит казначейства каждые 6 месяцев. Результаты публикуются в открытом доступе.</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-8 border-purple-500/20 bg-purple-500/[0.02]">
                        <h3 className="text-2xl font-black mb-6">Типы предложений</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { type: "Инфраструктура", desc: "Проекты по строительству и модернизации водной инфраструктуры", examples: "Очистные сооружения, насосные станции, трубопроводы" },
                                { type: "Экология", desc: "Программы восстановления и защиты водных экосистем", examples: "Восстановление рек, очистка озер, защита водных бассейнов" },
                                { type: "Наука", desc: "Финансирование научных исследований и разработок", examples: "Гранты ученым, публикации, исследования" },
                                { type: "Образование", desc: "Образовательные программы и курсы", examples: "Онлайн-курсы, семинары, сертификация" },
                                { type: "Технологии", desc: "Разработка новых технологий и продуктов", examples: "AI модели, IoT датчики, мобильные приложения" },
                                { type: "Партнерство", desc: "Установление партнерств с организациями", examples: "UN-Water, Regen Network, государственные структуры" }
                            ].map((proposal, i) => (
                                <div key={proposal.type} className="p-6 rounded-xl bg-white/5 border border-white/10">
                                    <div className="text-sm font-black mb-2">{proposal.type}</div>
                                    <div className="text-xs text-slate-400 mb-3">{proposal.desc}</div>
                                    <div className="text-[10px] text-slate-500 italic">{proposal.examples}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="py-24 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-4">Продукты и Инструменты</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Комплексные решения для различных типов пользователей и задач
                        </p>
                    </div>

                    <div className="space-y-12">
                        {[
                            {
                                title: "VOD Check",
                                category: "Гражданский мониторинг",
                                desc: "Мобильное приложение для проверки качества воды. Позволяет гражданам самостоятельно измерять параметры воды и получать NFT-сертификаты за верифицированные данные.",
                                features: [
                                    "Измерение pH, кислорода, температуры, загрязнения",
                                    "Интеграция с блокчейном для верификации данных",
                                    "NFT-сертификаты за качественные измерения",
                                    "История измерений и сравнение с другими локациями",
                                    "Экспорт данных в CSV/PDF"
                                ],
                                icon: Droplets,
                                color: "text-cyan-400"
                            },
                            {
                                title: "Dashboard & EarthMap",
                                category: "Визуализация данных",
                                desc: "Интерактивные дашборды и 3D карта Земли для мониторинга водных ресурсов в реальном времени. Переключение между режимами настоящего и будущего (Civilization Protocol 2036).",
                                features: [
                                    "3D глобус с интерактивными точками данных",
                                    "Фильтры по регионам, типам объектов, статусам",
                                    "Экспорт отчетов в CSV и PDF",
                                    "Временные диапазоны: день, неделя, месяц, год",
                                    "Прогнозные модели на основе AI"
                                ],
                                icon: Globe,
                                color: "text-blue-400"
                            },
                            {
                                title: "TokenHub",
                                category: "Инвестиции",
                                desc: "Маркетплейс проектов по восстановлению и развитию водных ресурсов. Инвесторы могут финансировать проекты через DAO-голосование или напрямую.",
                                features: [
                                    "Каталог проектов с детальной информацией",
                                    "Фильтры по регионам, секторам, статусам",
                                    "ESG-рейтинги и прогнозы ROI",
                                    "DAO-управляемые инвестиции",
                                    "Отслеживание прогресса проектов"
                                ],
                                icon: TrendingUp,
                                color: "text-emerald-400"
                            },
                            {
                                title: "Nexus Exchange",
                                category: "Экономика",
                                desc: "Децентрализованная биржа для обмена токенов, стейкинга и инвестиций. Поддержка VOD, R-VOD, P-VOD токенов и обмена данными.",
                                features: [
                                    "Обмен токенов VOD/R-VOD/P-VOD",
                                    "Стейкинг с APY от 5% до 25%",
                                    "Инвестиционные пулы для проектов",
                                    "Маркетплейс услуг и партнерств",
                                    "Обмен верифицированных данных"
                                ],
                                icon: Network,
                                color: "text-purple-400"
                            },
                            {
                                title: "AI Analytics Engine",
                                category: "Аналитика",
                                desc: "Предиктивная аналитика на основе машинного обучения. Прогнозирование кризисов, оптимизация распределения ресурсов, обнаружение аномалий.",
                                features: [
                                    "Прогнозирование качества воды на 30-90 дней",
                                    "Обнаружение аномалий и потенциальных кризисов",
                                    "Оптимизация распределения ресурсов",
                                    "Рекомендации по управлению инфраструктурой",
                                    "Интеграция с IoT датчиками"
                                ],
                                icon: Zap,
                                color: "text-yellow-400"
                            },
                            {
                                title: "7 Специализированных Кабинетов",
                                category: "Интерфейсы",
                                desc: "Уникальные интерфейсы для различных типов пользователей: граждане, правительство, инвесторы, инфраструктура, наука, операторы, администрация.",
                                features: [
                                    "Гражданский кабинет: мониторинг, миссии, социальная сеть",
                                    "Правительственный: управление ресурсами, отчетность",
                                    "Инвестиционный: TokenHub, Nexus, аналитика",
                                    "Инфраструктурный: управление объектами, IoT",
                                    "Научный: исследования, публикации, гранты",
                                    "Операторский: мониторинг датчиков, обслуживание",
                                    "Административный: управление платформой, аудит"
                                ],
                                icon: Building2,
                                color: "text-indigo-400"
                            }
                        ].map((product, i) => (
                            <motion.div
                                key={product.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card p-8 border-white/5 hover:border-white/20 transition-all"
                            >
                                <div className="flex items-start gap-6 mb-6">
                                    <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center ${product.color} shrink-0`}>
                                        <product.icon size={32} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">{product.category}</div>
                                        <h3 className="text-2xl font-black mb-3">{product.title}</h3>
                                        <p className="text-slate-400 leading-relaxed">{product.desc}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {product.features.map((feature, j) => (
                                        <div key={j} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                                            <div className={`w-1.5 h-1.5 rounded-full mt-2 ${product.color.replace('text-', 'bg-')}`} />
                                            <div className="text-sm text-slate-300">{feature}</div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section className="py-24 border-t border-white/5 bg-white/[0.01]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-4">Проекты TokenHub</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Примеры проектов, финансируемых через платформу Civilization Protocol
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Восстановление Аральского моря",
                                region: "Центральная Азия",
                                cost: "$500M",
                                status: "Активен",
                                desc: "Комплексная программа восстановления экосистемы Аральского моря. Установка IoT датчиков, восстановление водных каналов, посадка лесов.",
                                esg: 98
                            },
                            {
                                title: "Smart Pumping Network",
                                region: "Европа",
                                cost: "$45M",
                                status: "Активен",
                                desc: "Создание интеллектуальной сети насосных станций с AI-оптимизацией. Снижение энергопотребления на 30%, автоматическое управление.",
                                esg: 95
                            },
                            {
                                title: "Desalination 2.0",
                                region: "Ближний Восток",
                                cost: "$85M",
                                status: "Планируется",
                                desc: "Разработка новых технологий опреснения воды с использованием возобновляемых источников энергии. Снижение стоимости на 40%.",
                                esg: 92
                            },
                            {
                                title: "Global Water Quality Index",
                                region: "Глобальный",
                                cost: "$10M",
                                status: "Активен",
                                desc: "Разработка единого индекса качества воды для всего мира. Блокчейн-верифицированные данные, стандартизация измерений.",
                                esg: 99
                            },
                            {
                                title: "Citizen Science Water Monitoring",
                                region: "Глобальный",
                                cost: "$5M",
                                status: "Бета",
                                desc: "Мобильное приложение для гражданского мониторинга воды. Верификация данных через AI и консенсус сообщества.",
                                esg: 92
                            },
                            {
                                title: "AI-Powered Leak Detection",
                                region: "Европа",
                                cost: "$20M",
                                status: "Пилот",
                                desc: "Система обнаружения утечек воды с помощью AI. Снижение потерь воды на 40%, раннее предупреждение о проблемах.",
                                esg: 96
                            }
                        ].map((project, i) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card p-6 border-white/5 hover:border-emerald-500/30 transition-all"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="text-xs font-black text-emerald-400 uppercase tracking-widest px-3 py-1 rounded-lg bg-emerald-500/10">
                                        {project.status}
                                    </div>
                                    <div className="text-xs font-black text-slate-500">
                                        ESG: {project.esg}
                                    </div>
                                </div>
                                <h3 className="text-xl font-black mb-2">{project.title}</h3>
                                <div className="text-xs text-slate-500 mb-3">{project.region}</div>
                                <p className="text-sm text-slate-400 mb-4 leading-relaxed">{project.desc}</p>
                                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                                    <div className="text-xs text-slate-500">Стоимость</div>
                                    <div className="text-sm font-black">{project.cost}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Partners & Standards */}
            <section className="py-24 bg-white/[0.01] border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4">
                    <div className={cn("flex flex-col md:flex-row justify-between items-center gap-12", isRTL && "flex-row-reverse")}>
                        <div className={cn("text-center md:text-left", isRTL && "md:text-right")}>
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">{t("common.developed_by")}</div>
                            <div className="text-3xl font-black tracking-tighter">Fractalix.lab</div>
                        </div>
                        <div className="h-12 w-px bg-white/10 hidden md:block" />
                        <div className={cn("flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all", isRTL && "flex-row-reverse")}>
                            <div className="flex items-center gap-3 font-black text-xl">UNICAP</div>
                            <div className="flex items-center gap-3 font-black text-xl">VODPROM</div>
                            <div className="flex items-center gap-3 font-black text-xl">GTTS India</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <Droplets className="text-cyan-500" size={24} />
                        <span className="text-xl font-black tracking-tighter">Civilization Protocol Earth</span>
                    </div>
                    <p className="text-xs text-slate-600 font-bold uppercase tracking-widest">
                        International Standard for Water Resource Management
                    </p>
                </div>
            </footer>
        </div>
    );
}
