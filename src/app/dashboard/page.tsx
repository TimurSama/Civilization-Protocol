"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Activity, Droplets, Thermometer, Wind,
    AlertTriangle, TrendingUp, Globe, Info,
    FlaskConical, Zap, Heart, TreePine,
    ChevronRight, Building2, Factory, Waves,
    Download, Calendar, Filter, BarChart3
} from "lucide-react";
import Globe3D from "@/components/Globe3D";
import { useWaterData } from "@/lib/iot-service";
import { waterGISData } from "@/lib/gis-data";
import AIAnalyticsEngine from "@/components/AIAnalyticsEngine";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
    const metrics = useWaterData();
    const [isFutureMode, setIsFutureMode] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState<'global' | 'basin' | 'object'>('global');
    const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('month');
    const [selectedRegion, setSelectedRegion] = useState<string>('all');
    const [selectedType, setSelectedType] = useState<string>('all');
    const [showFilters, setShowFilters] = useState(false);

    const regions = ['all', 'central_asia', 'europe', 'asia', 'africa', 'middle_east', 'americas'];
    const regionLabels: Record<string, string> = {
        all: 'Все регионы',
        central_asia: 'Центральная Азия',
        europe: 'Европа',
        asia: 'Азия',
        africa: 'Африка',
        middle_east: 'Ближний Восток',
        americas: 'Америка'
    };

    const filteredGIS = useMemo(() => {
        let filtered = waterGISData.filter(p => selectedLevel === 'global' || p.level === selectedLevel);
        
        if (selectedRegion !== 'all') {
            // Фильтрация по регионам на основе координат (упрощенная логика)
            filtered = filtered.filter(p => {
                if (selectedRegion === 'central_asia') {
                    return p.lat >= 35 && p.lat <= 55 && p.lon >= 50 && p.lon <= 80;
                }
                // Добавить другие регионы при необходимости
                return true;
            });
        }

        if (selectedType !== 'all') {
            filtered = filtered.filter(p => p.type === selectedType);
        }

        return filtered;
    }, [selectedLevel, selectedRegion, selectedType]);

    const criticalMetrics = metrics.filter(m => m.status === "critical");
    const avgQuality = Math.round(metrics.reduce((acc, m) => acc + m.quality, 0) / metrics.length);

    // Future mode multipliers
    const futureMultiplier = isFutureMode ? 1.4 : 1;
    const futureQuality = Math.min(100, Math.round(avgQuality * (isFutureMode ? 1.2 : 1)));

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black mb-2 text-glow-cyan">
                        {isFutureMode ? "Civilization Protocol 2036: Прогноз" : "Глобальный Мониторинг"}
                    </h1>
                    <p className="text-slate-400">
                        {isFutureMode
                            ? "Визуализация экосистемы будущего с учетом токеномики и глобального восстановления"
                            : "Состояние водных ресурсов планеты в реальном времени"}
                    </p>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={() => setIsFutureMode(!isFutureMode)}
                        className={cn(
                            "glass px-6 py-2.5 rounded-xl flex items-center gap-3 transition-all border-2",
                            isFutureMode
                                ? "border-cyan-500 bg-cyan-500/20 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                                : "border-white/10 hover:border-cyan-500/50"
                        )}
                    >
                        <Zap size={16} className={cn(isFutureMode && "fill-current")} />
                        <span className="text-xs font-black uppercase tracking-widest">Civilization Protocol 2036</span>
                    </button>
                    <div className="glass px-4 py-2 rounded-xl flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-widest">Система активна</span>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                {/* Level Selector */}
                <div className="flex gap-2">
                    {(['global', 'basin', 'object'] as const).map((level) => (
                        <button
                            key={level}
                            onClick={() => setSelectedLevel(level)}
                            className={cn(
                                "px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                                selectedLevel === level
                                    ? "bg-cyan-500 text-ocean-deep"
                                    : "glass text-slate-500 hover:text-white"
                            )}
                        >
                            {level === 'global' ? 'Глобальный' : level === 'basin' ? 'Бассейны' : 'Объекты'}
                        </button>
                    ))}
                </div>

                {/* Time Range Selector */}
                <div className="flex gap-2">
                    {(['day', 'week', 'month', 'year'] as const).map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={cn(
                                "px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
                                timeRange === range
                                    ? "bg-purple-500 text-white"
                                    : "glass text-slate-500 hover:text-white"
                            )}
                        >
                            <Calendar size={12} />
                            {range === 'day' ? 'День' : range === 'week' ? 'Неделя' : range === 'month' ? 'Месяц' : 'Год'}
                        </button>
                    ))}
                </div>

                {/* Filters & Export */}
                <div className="flex gap-2 ml-auto">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="px-4 py-2 glass rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white/10 transition-all"
                    >
                        <Filter size={12} />
                        Фильтры
                    </button>
                    <button
                        onClick={() => {
                            // Экспорт данных
                            const data = filteredGIS.map(p => ({
                                name: p.name,
                                type: p.type,
                                status: p.status,
                                value: p.value,
                                region: p.region || 'N/A',
                                description: p.description
                            }));
                            const csv = [
                                Object.keys(data[0]).join(','),
                                ...data.map(d => Object.values(d).join(','))
                            ].join('\n');
                            const blob = new Blob([csv], { type: 'text/csv' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `Civilization Protocol-dashboard-${timeRange}-${new Date().toISOString().split('T')[0]}.csv`;
                            a.click();
                        }}
                        className="px-4 py-2 glass rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white/10 transition-all"
                    >
                        <Download size={12} />
                        Экспорт CSV
                    </button>
                </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-6 mb-8 border-cyan-500/20"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3 block">
                                Регион
                            </label>
                            <select
                                value={selectedRegion}
                                onChange={(e) => setSelectedRegion(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-cyan-500/50"
                            >
                                {regions.map(region => (
                                    <option key={region} value={region}>
                                        {regionLabels[region]}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3 block">
                                Тип объекта
                            </label>
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-cyan-500/50"
                            >
                                <option value="all">Все типы</option>
                                <option value="river">Реки</option>
                                <option value="basin">Бассейны</option>
                                <option value="dam">Плотины</option>
                                <option value="pumping">Насосные станции</option>
                                <option value="treatment">Очистные сооружения</option>
                                <option value="institute">Институты</option>
                                <option value="industrial">Промышленные объекты</option>
                                <option value="ecology">Экологические объекты</option>
                                <option value="irrigation">Ирригационные системы</option>
                            </select>
                        </div>
                    </div>
                </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Metrics */}
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <MetricCard
                            icon={Droplets}
                            label="Качество воды"
                            value={`${futureQuality}%`}
                            desc={isFutureMode ? "+20% к текущему" : "Средний индекс"}
                            color="text-cyan-glow"
                        />
                        <MetricCard
                            icon={Waves}
                            label="Объекты"
                            value={Math.round(filteredGIS.length * futureMultiplier).toString()}
                            desc="Под мониторингом"
                            color="text-blue-400"
                        />
                        <MetricCard
                            icon={Zap}
                            label="Энергетика"
                            value={isFutureMode ? "142%" : "85%"}
                            desc={isFutureMode ? "Эффективность" : "Средний индекс"}
                            color="text-amber-400"
                        />
                        <MetricCard
                            icon={Heart}
                            label="Качество жизни"
                            value={isFutureMode ? "94%" : "78%"}
                            desc={isFutureMode ? "Прогноз" : "Индекс здоровья"}
                            color="text-rose-400"
                        />
                        <MetricCard
                            icon={TreePine}
                            label="Экология"
                            value={isFutureMode ? "88%" : "72%"}
                            desc={isFutureMode ? "Восстановление" : "Эко-индекс"}
                            color="text-emerald-400"
                        />
                        <MetricCard
                            icon={FlaskConical}
                            label="Наука"
                            value={isFutureMode ? "156" : "98"}
                            desc={isFutureMode ? "Исследования" : "Активные проекты"}
                            color="text-purple-400"
                        />
                    </div>

                    <div className="glass-card">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <AlertTriangle className="text-red-500" size={18} />
                            {isFutureMode ? "Прогноз рисков" : "Критические оповещения"}
                        </h3>
                        <div className="space-y-3">
                            {isFutureMode ? (
                                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex justify-between items-center">
                                    <div className="text-xs font-bold text-emerald-400">Риски снижены на 85%</div>
                                    <TrendingUp size={14} className="text-emerald-400" />
                                </div>
                            ) : (
                                criticalMetrics.map((m) => (
                                    <div key={m.id} className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex justify-between items-center">
                                        <div>
                                            <div className="text-xs font-bold">{m.name}</div>
                                            <div className="text-[10px] text-slate-500">{m.isDemo ? "Симуляция" : "Реальные данные"}</div>
                                        </div>
                                        <div className="text-xs font-black text-red-500">{m.quality}%</div>
                                    </div>
                                ))
                            )}
                            {!isFutureMode && criticalMetrics.length === 0 && (
                                <div className="text-xs text-slate-500 text-center py-4 italic">Критических отклонений не обнаружено</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Center: 3D Globe */}
                <div className="lg:col-span-2 glass-card p-0 overflow-hidden min-h-[500px] relative group">
                    <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                        <div className="flex items-center gap-2 bg-ocean-deep/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                            <Globe className="text-cyan-glow" size={16} />
                            <span className="text-xs font-bold uppercase tracking-widest">
                                {selectedLevel === 'global' ? 'Земля' : selectedLevel === 'basin' ? 'Водные бассейны' : 'Инфраструктура'}
                            </span>
                        </div>
                        {isFutureMode && (
                            <div className="flex items-center gap-2 bg-cyan-500/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-cyan-500/30 text-cyan-400">
                                <TrendingUp size={14} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Токеномика: +140% объектов</span>
                            </div>
                        )}
                    </div>
                    <Globe3D />
                </div>
            </div>

            {/* Infrastructure Details */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
                <div className="lg:col-span-3 glass-card">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold flex items-center gap-3">
                            <Building2 className="text-cyan-400" />
                            {selectedLevel === 'object' ? 'Состояние объектов и субъектов' : 'Аналитика по бассейнам'}
                            <span className="text-xs text-slate-500 font-normal">
                                ({filteredGIS.length} {filteredGIS.length === 1 ? 'объект' : filteredGIS.length < 5 ? 'объекта' : 'объектов'})
                            </span>
                        </h3>
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    // Экспорт PDF (симуляция)
                                    window.print();
                                }}
                                className="text-[10px] font-black uppercase text-slate-500 hover:text-white transition-colors flex items-center gap-2"
                            >
                                <Download size={12} />
                                PDF
                            </button>
                            <button className="text-[10px] font-black uppercase text-slate-500 hover:text-white transition-colors flex items-center gap-2">
                                <BarChart3 size={12} />
                                Графики
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredGIS.map((point) => (
                            <div key={point.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-8 h-8 rounded-lg flex items-center justify-center",
                                            point.status === 'critical' ? "bg-red-500/20 text-red-500" :
                                                point.status === 'warning' ? "bg-yellow-500/20 text-yellow-500" :
                                                    "bg-emerald-500/20 text-emerald-500"
                                        )}>
                                            {point.type === 'institute' ? <FlaskConical size={16} /> :
                                                point.type === 'pumping' ? <Activity size={16} /> :
                                                    point.type === 'treatment' ? <Droplets size={16} /> :
                                                        <Waves size={16} />}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold">{point.name}</div>
                                            <div className="text-[10px] text-slate-500 uppercase font-black tracking-wider">{point.type}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-black">{point.value}%</div>
                                        <div className="text-[8px] text-slate-600 uppercase">Статус</div>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-400 mb-4 line-clamp-1">{point.description}</p>
                                {point.owner && (
                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <div className="text-[10px] text-slate-500">Владелец: <span className="text-slate-300">{point.owner}</span></div>
                                        <ChevronRight size={14} className="text-slate-600 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-6">
                    <AIAnalyticsEngine />
                    <div className="glass-card p-6 border-cyan-500/20 bg-cyan-500/[0.02]">
                        <h4 className="text-sm font-black uppercase tracking-widest text-cyan-400 mb-4">VOD Token Impact</h4>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-400">Циркуляция</span>
                                <span className="text-sm font-black">1.2B VOD</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-400">Стейкинг</span>
                                <span className="text-sm font-black">450M VOD</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mt-4">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "65%" }}
                                    className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MetricCard({ icon: Icon, label, value, desc, color, disabled }: any) {
    return (
        <div className={cn(
            "glass-card p-4 transition-all group relative",
            disabled ? "opacity-50 cursor-not-allowed" : "hover:border-white/20"
        )}>
            {disabled && (
                <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-ocean-deep/80 rounded-2xl">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">В разработке</span>
                </div>
            )}
            <div className={cn(
                "w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 transition-transform",
                color,
                !disabled && "group-hover:scale-110"
            )}>
                <Icon size={20} />
            </div>
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">{label}</div>
            <div className="text-2xl font-black mb-1">{value}</div>
            <div className="text-[10px] text-slate-500">{desc}</div>
        </div>
    );
}
