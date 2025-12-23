"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
    Globe, Shield, Zap, Droplets,
    ArrowRight, CheckCircle2, Cpu,
    Database, Network, Building2,
    Landmark, TrendingUp, Users,
    ChevronDown, BookOpen, Gamepad2
} from "lucide-react";

const sections = [
    {
        title: "Civilization Protocol: Эволюция Воды",
        subtitle: "Глобальная децентрализованная система управления ресурсами",
        content: "Мы объединяем Блокчейн, IoT и AI для создания прозрачной и эффективной экономики воды на планете Земля.",
        icon: Globe,
        color: "text-cyan-glow",
    },
    {
        title: "Проблема Скарности",
        subtitle: "1.8 млрд человек столкнутся с дефицитом к 2025 году",
        content: "Традиционные системы управления не справляются с климатическими изменениями и ростом потребления. Нам нужно цифровое решение.",
        icon: Droplets,
        color: "text-blue-400",
    },
    {
        title: "Технологический Стек",
        subtitle: "Интеграция Blockchain, IoT и AI",
        content: "Наши датчики передают данные напрямую в блокчейн, а ИИ моделирует изменения для предотвращения катастроф.",
        icon: Cpu,
        color: "text-purple-400",
    },
    {
        title: "Экономика VOD",
        subtitle: "Трехуровневая токеномика",
        content: "VOD (Управление), R-VOD (Ресурсы), P-VOD (Проекты). Эмиссия привязана к реальному объему воды на Земле.",
        icon: Shield,
        color: "text-gold-glow",
    },
    {
        title: "Глобальное Управление",
        subtitle: "Транснациональный контроль",
        content: "Смарт-контракты обеспечивают справедливое распределение ресурсов между государствами, корпорациями и гражданами.",
        icon: Network,
        color: "text-green-400",
    },
    {
        title: "12 Уровней Архитектуры",
        subtitle: "От физического слоя до интеграций",
        content: "Физический слой, IoT, Блокчейн, Экономика, DAO, Интерфейс, AI, Безопасность, Образование, Игры, Социальный слой, Интеграции.",
        icon: Building2,
        color: "text-indigo-400",
    },
    {
        title: "DAO Управление",
        subtitle: "Децентрализованное принятие решений",
        content: "Каждый держатель токенов может участвовать в голосовании. Предложения проходят через прозрачный процесс одобрения.",
        icon: Users,
        color: "text-purple-400",
    },
    {
        title: "IoT Сеть",
        subtitle: "Миллионы датчиков по всему миру",
        content: "Датчики качества воды, спутниковый мониторинг, ручные инструменты VOD Check. Все данные попадают в блокчейн.",
        icon: Database,
        color: "text-cyan-400",
    },
    {
        title: "AI Analytics Engine",
        subtitle: "Предиктивная аналитика",
        content: "Машинное обучение предсказывает кризисы, оптимизирует распределение ресурсов и помогает принимать решения.",
        icon: Zap,
        color: "text-yellow-400",
    },
    {
        title: "TokenHub",
        subtitle: "Инвестиционный маркетплейс",
        content: "Проекты по восстановлению водных ресурсов. Инвестиции через DAO, прозрачное финансирование, отслеживание результатов.",
        icon: TrendingUp,
        color: "text-emerald-400",
    },
    {
        title: "Nexus Exchange",
        subtitle: "Обмен токенов, данных и услуг",
        content: "Обмен VOD/R-VOD/P-VOD, стейкинг с APY до 25%, инвестиционные пулы, маркетплейс услуг и партнерств.",
        icon: Network,
        color: "text-amber-400",
    },
    {
        title: "7 Специализированных Кабинетов",
        subtitle: "Для каждого типа пользователя",
        content: "Граждане, Правительство, Инвесторы, Инфраструктура, Наука, Операторы, Администрация. Каждый кабинет имеет свой функционал.",
        icon: Landmark,
        color: "text-blue-400",
    },
    {
        title: "Социальная Сеть",
        subtitle: "Сообщество экспертов и активистов",
        content: "Посты, комментарии, друзья, группы, сообщения. Обмен знаниями, координация проектов, совместные исследования.",
        icon: Users,
        color: "text-pink-400",
    },
    {
        title: "Геймификация",
        subtitle: "Игровой слой для всех возрастов",
        content: "Квесты, NFT-награды, лидерборды, образовательные игры. Мотивация через игровые механики.",
        icon: Zap,
        color: "text-purple-400",
    },
    {
        title: "Интеграции",
        subtitle: "Связь с внешним миром",
        content: "API для государств, международные организации (UN-Water), партнерства (Regen Network, Power Ledger), SDK для разработчиков.",
        icon: Network,
        color: "text-teal-400",
    },
];

export default function PresentationPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <div ref={containerRef} className="relative min-h-[500vh] bg-ocean-deep">
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-cyan-glow z-[60] origin-left"
                style={{ scaleX }}
            />

            {/* Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-glow/5 rounded-full blur-[120px]" />
            </div>

            {/* Sections */}
            <div className="relative z-10">
                {sections.map((section, i) => (
                    <Section key={i} section={section} index={i} total={sections.length} />
                ))}
            </div>

            {/* Final CTA */}
            <div className="h-screen flex items-center justify-center sticky top-0">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="glass-card text-center max-w-3xl p-20 bg-cyan-glow/5 border-cyan-glow/20"
                >
                    <h2 className="text-5xl font-black mb-8">Готовы изменить мир?</h2>
                    <p className="text-xl text-slate-400 mb-12">
                        Присоединяйтесь к экосистеме Civilization Protocol и станьте частью глобального движения за сохранение водных ресурсов.
                    </p>
                    <div className="flex justify-center gap-6">
                        <button className="px-10 py-5 bg-cyan-glow text-ocean-deep font-bold rounded-2xl hover:scale-105 transition-transform flex items-center gap-3 shadow-[0_0_40px_rgba(34,211,238,0.4)]">
                            Начать сейчас <ArrowRight size={24} />
                        </button>
                        <button className="px-10 py-5 glass text-white font-bold rounded-2xl hover:bg-white/10 transition-colors">
                            Whitepaper PDF
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

function Section({ section, index, total }: any) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
    const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);

    return (
        <motion.section
            ref={ref}
            style={{ opacity, scale, y }}
            className="h-screen flex items-center justify-center sticky top-0 px-4"
        >
            <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                    <div className={`w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center ${section.color} border border-white/10`}>
                        <section.icon size={40} />
                    </div>
                    <div>
                        <h2 className="text-5xl font-black mb-4 leading-tight">{section.title}</h2>
                        <h3 className={`text-xl font-bold ${section.color} mb-6`}>{section.subtitle}</h3>
                        <p className="text-xl text-slate-400 leading-relaxed">
                            {section.content}
                        </p>
                    </div>
                    <div className="flex items-center gap-4 text-slate-500 font-bold">
                        <span className="text-2xl font-black text-white">0{index + 1}</span>
                        <div className="h-px w-12 bg-white/20" />
                        <span className="uppercase tracking-widest text-xs">Раздел {index + 1} из {total}</span>
                    </div>
                </div>

                <div className="relative aspect-square lg:aspect-auto lg:h-[600px] glass-card flex items-center justify-center overflow-hidden group">
                    <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-${section.color.split('-')[1]}-glow/10 opacity-20`} />

                    {/* Visual Asset Simulation */}
                    <motion.div
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className={`w-64 h-64 rounded-full border-2 border-${section.color.split('-')[1]}-glow/20 flex items-center justify-center`}
                    >
                        <div className={`w-48 h-48 rounded-full border border-${section.color.split('-')[1]}-glow/40 flex items-center justify-center`}>
                            <section.icon size={64} className={section.color} />
                        </div>
                    </motion.div>

                    {/* Floating Particles */}
                    {Array.from({ length: 5 }).map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                y: [0, -100, 0],
                                x: [0, (i - 2) * 50, 0],
                                opacity: [0, 0.5, 0]
                            }}
                            transition={{ duration: 5 + i, repeat: Infinity, delay: i }}
                            className={`absolute w-1 h-1 rounded-full bg-${section.color.split('-')[1]}-glow`}
                            style={{
                                left: `${20 + i * 15}%`,
                                top: `${80 - i * 10}%`
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500">
                <span className="text-[10px] font-bold uppercase tracking-widest">Листайте дальше</span>
                <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <ChevronDown size={20} />
                </motion.div>
            </div>
        </motion.section>
    );
}
