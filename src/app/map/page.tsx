"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Globe, AlertTriangle,
    Factory, Droplets,
    Zap, Search, Layers,
    Satellite, Info, MapPin,
    TreePine, Heart, FlaskConical,
    Waves, Building2, Users,
    TrendingUp, ChevronRight, Maximize2, Minimize2,
    X, ExternalLink, Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { useState, useMemo } from "react";
import Globe3D from "@/components/Globe3D";
import { waterGISData } from "@/lib/gis-data";

export default function WaterMapPage() {
    const { t, isRTL } = useLanguage();
    const [activeLayer, setActiveLayer] = useState("water");
    const [isZoomed, setIsZoomed] = useState(false);
    const [isFutureMode, setIsFutureMode] = useState(false);
    const [selectedPoint, setSelectedPoint] = useState<typeof waterGISData[0] | null>(null);

    const layers = [
        { id: "water", label: "Водный сектор", icon: Droplets, color: "text-cyan-500", description: "Реки, озера, бассейны" },
        { id: "crisis", label: "Кризисные зоны", icon: AlertTriangle, color: "text-rose-500", description: "Критические ситуации" },
        { id: "objects", label: "Объекты и Субъекты", icon: Building2, color: "text-blue-400", description: "Инфраструктура" },
        { id: "research", label: "Исследования", icon: FlaskConical, color: "text-purple-400", description: "Научные институты" },
        { id: "investments", label: "Инвестиции", icon: TrendingUp, color: "text-emerald-400", description: "Проекты TokenHub" },
        { id: "energy", label: "Энергетика", icon: Zap, color: "text-amber-400", description: "Энергетические сети" },
        { id: "satellite", label: "Спутниковый вид", icon: Satellite, color: "text-slate-400", description: "Спутниковые данные" },
    ];

    const filteredPoints = useMemo(() => {
        let points = waterGISData;
        
        if (activeLayer === "water") {
            points = waterGISData.filter(p => ['river', 'basin', 'dam', 'irrigation'].includes(p.type));
        } else if (activeLayer === "crisis") {
            points = waterGISData.filter(p => p.status === 'critical' || p.status === 'warning');
        } else if (activeLayer === "objects") {
            points = waterGISData.filter(p => ['pumping', 'treatment', 'industrial'].includes(p.type));
        } else if (activeLayer === "research") {
            points = waterGISData.filter(p => p.type === 'institute');
        } else if (activeLayer === "investments") {
            // Проекты из TokenHub (симуляция)
            points = waterGISData.filter(p => p.owner && p.owner.includes('Civilization Protocol'));
        } else if (activeLayer === "energy") {
            // Энергетические объекты (симуляция)
            points = waterGISData.filter(p => p.type === 'pumping' || p.type === 'industrial');
        } else if (activeLayer === "satellite") {
            points = waterGISData; // Все точки для спутникового вида
        }

        if (isFutureMode) {
            // Simulate more points in future mode
            return [...points, ...points.map(p => ({ 
                ...p, 
                id: p.id + '-future', 
                lat: p.lat + (Math.random() - 0.5) * 2, 
                lon: p.lon + (Math.random() - 0.5) * 2, 
                status: 'normal' as const, 
                value: Math.min(100, p.value + 20) 
            }))];
        }
        return points;
    }, [activeLayer, isFutureMode]);

    return (
        <div className={cn("h-screen bg-ocean-deep pt-20 flex flex-col overflow-hidden", isRTL && "text-right")}>
            {/* Top Bar */}
            <div className="glass border-b border-white/5 px-6 py-4 flex items-center justify-between z-20">
                <div className={cn("flex items-center gap-4", isRTL && "flex-row-reverse")}>
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                        <Globe size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-black text-white leading-none mb-1">EarthMap 3.0</h1>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                            {isFutureMode ? "Civilization Protocol 2036: Глобальное восстановление" : "Global Ecosystem Monitoring"}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsFutureMode(!isFutureMode)}
                        className={cn(
                            "glass px-4 py-2 rounded-xl flex items-center gap-2 transition-all border",
                            isFutureMode ? "border-cyan-500 text-cyan-400 bg-cyan-500/10" : "border-white/10 text-slate-500"
                        )}
                    >
                        <Zap size={14} className={isFutureMode ? "fill-current" : ""} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Civilization Protocol 2036</span>
                    </button>
                    <div className="relative w-64 hidden md:block">
                        <Search className={cn("absolute top-1/2 -translate-y-1/2 text-slate-500", isRTL ? "right-3" : "left-3")} size={16} />
                        <input
                            type="text"
                            placeholder={t("common.search")}
                            className={cn(
                                "w-full bg-white/5 border border-white/10 rounded-xl py-2 text-xs focus:outline-none focus:border-cyan-500/50",
                                isRTL ? "pr-10 pl-4" : "pl-10 pr-4"
                            )}
                        />
                    </div>
                </div>
            </div>

            <div className={cn("flex-1 relative flex", isRTL && "flex-row-reverse")}>
                {/* Sidebar Controls */}
                <div className="w-80 glass border-r border-white/5 p-6 z-20 overflow-y-auto hidden lg:block">
                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">Слои мониторинга</h3>
                    <div className="space-y-2 mb-6">
                        {layers.map(layer => (
                            <button
                                key={layer.id}
                                onClick={() => setActiveLayer(layer.id)}
                                className={cn(
                                    "w-full flex items-start gap-4 px-4 py-4 rounded-xl transition-all border text-left",
                                    isRTL && "flex-row-reverse text-right",
                                    activeLayer === layer.id
                                        ? "bg-white/10 border-white/10 shadow-lg"
                                        : "bg-transparent border-transparent hover:bg-white/5"
                                )}
                            >
                                <layer.icon className={cn("shrink-0 mt-0.5", activeLayer === layer.id ? layer.color : "text-slate-600")} size={20} />
                                <div className="flex-1">
                                    <span className={cn("text-xs font-bold block", activeLayer === layer.id ? "text-white" : "text-slate-400")}>
                                        {layer.label}
                                    </span>
                                    {layer.description && (
                                        <span className="text-[10px] text-slate-600 mt-1 block">
                                            {layer.description}
                                        </span>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Statistics */}
                    <div className="glass-card p-4 border-white/5 mb-6">
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">
                            Статистика слоя
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-400">Объектов</span>
                                <span className="text-sm font-black text-white">{filteredPoints.length}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-400">Критических</span>
                                <span className="text-sm font-black text-red-500">
                                    {filteredPoints.filter(p => p.status === 'critical').length}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-400">Средний статус</span>
                                <span className="text-sm font-black text-emerald-500">
                                    {Math.round(filteredPoints.reduce((acc, p) => acc + p.value, 0) / filteredPoints.length)}%
                                </span>
                            </div>
                        </div>
                    </div>

                    {isZoomed && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card p-6 border-cyan-500/20 bg-cyan-500/[0.02]"
                        >
                            <h4 className="text-[10px] font-black text-cyan-400 uppercase mb-4 tracking-widest">Детализация региона</h4>
                            <div className="space-y-4">
                                {filteredPoints.slice(0, 3).map(p => (
                                    <div key={p.id} className="flex justify-between items-center">
                                        <span className="text-[10px] text-slate-400">{p.name}</span>
                                        <span className={cn("text-[10px] font-black", p.status === 'critical' ? 'text-rose-500' : 'text-emerald-500')}>
                                            {p.value}%
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Map View */}
                <div className="flex-1 relative bg-ocean-deep overflow-hidden">
                    <AnimatePresence mode="wait">
                        {!isZoomed ? (
                            <motion.div
                                key="globe"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.2 }}
                                className="absolute inset-0 z-0"
                            >
                                <Globe3D />
                                <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/50 via-transparent to-ocean-deep/50 pointer-events-none" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="map"
                                initial={{ opacity: 0, scale: 1.2 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="absolute inset-0 z-0 bg-slate-900"
                            >
                                {/* Simulated 2D Map Grid */}
                                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                                <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 border border-white/5">
                                    {[...Array(144)].map((_, i) => (
                                        <div key={i} className="border border-white/[0.02]" />
                                    ))}
                                </div>

                                {/* 2D Data Points */}
                                {filteredPoints.map((point) => (
                                    <motion.div
                                        key={point.id}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute group cursor-pointer z-10"
                                        style={{
                                            top: `${((90 - point.lat) / 180) * 100}%`,
                                            left: `${((point.lon + 180) / 360) * 100}%`
                                        }}
                                        onClick={() => setSelectedPoint(point)}
                                    >
                                        <div className={cn(
                                            "w-4 h-4 rounded-full animate-pulse transition-all",
                                            point.status === 'critical' ? "bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.8)]" :
                                                point.status === 'warning' ? "bg-yellow-500 shadow-[0_0_15px_rgba(245,158,11,0.8)]" :
                                                    "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]",
                                            "group-hover:scale-150 group-hover:z-20"
                                        )} />
                                        <div className="absolute left-6 top-1/2 -translate-y-1/2 glass px-3 py-2 rounded-lg text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20 border border-white/10">
                                            <div className="font-bold">{point.name}</div>
                                            <div className="text-slate-400">{point.value}%</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Map Controls */}
                    <div className={cn("absolute bottom-8 flex gap-4 z-20", isRTL ? "left-8" : "right-8")}>
                        <button
                            onClick={() => setIsZoomed(!isZoomed)}
                            className="p-4 glass border-white/10 rounded-2xl text-cyan-400 hover:bg-white/10 transition-all shadow-xl"
                        >
                            {isZoomed ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
                        </button>
                        <button className="p-4 glass border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all shadow-xl">
                            <Layers size={24} />
                        </button>
                    </div>

                    {/* Legend */}
                    <div className={cn("absolute top-8 z-20", isRTL ? "left-8" : "right-8")}>
                        <div className="glass p-4 rounded-2xl border-white/5 space-y-3">
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Легенда</div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Критический</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Предупреждение</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Стабильно</span>
                            </div>
                        </div>
                    </div>

                    {/* Point Details Modal */}
                    {selectedPoint && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 z-30 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                            onClick={() => setSelectedPoint(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                onClick={(e) => e.stopPropagation()}
                                className="glass-card p-8 max-w-md w-full mx-4 border-cyan-500/20 relative"
                            >
                                <button
                                    onClick={() => setSelectedPoint(null)}
                                    className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                                >
                                    <X size={20} className="text-slate-400" />
                                </button>

                                <div className="flex items-start gap-4 mb-6">
                                    <div className={cn(
                                        "w-12 h-12 rounded-xl flex items-center justify-center",
                                        selectedPoint.status === 'critical' ? "bg-red-500/20 text-red-500" :
                                            selectedPoint.status === 'warning' ? "bg-yellow-500/20 text-yellow-500" :
                                                "bg-emerald-500/20 text-emerald-500"
                                    )}>
                                        {selectedPoint.type === 'institute' ? <FlaskConical size={24} /> :
                                            selectedPoint.type === 'pumping' ? <Activity size={24} /> :
                                                selectedPoint.type === 'treatment' ? <Droplets size={24} /> :
                                                    selectedPoint.type === 'basin' ? <Waves size={24} /> :
                                                        <Building2 size={24} />}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-black mb-2">{selectedPoint.name}</h3>
                                        <div className="text-xs text-slate-500 uppercase font-black tracking-widest mb-2">
                                            {selectedPoint.type} • {selectedPoint.status}
                                        </div>
                                        <div className="text-2xl font-black text-cyan-400">{selectedPoint.value}%</div>
                                    </div>
                                </div>

                                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                                    {selectedPoint.description}
                                </p>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    {selectedPoint.region && (
                                        <div>
                                            <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Регион</div>
                                            <div className="text-sm font-bold">{selectedPoint.region}</div>
                                        </div>
                                    )}
                                    {selectedPoint.owner && (
                                        <div>
                                            <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Владелец</div>
                                            <div className="text-sm font-bold">{selectedPoint.owner}</div>
                                        </div>
                                    )}
                                    <div>
                                        <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Координаты</div>
                                        <div className="text-sm font-mono text-slate-400">
                                            {selectedPoint.lat.toFixed(2)}, {selectedPoint.lon.toFixed(2)}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Уровень</div>
                                        <div className="text-sm font-bold capitalize">{selectedPoint.level}</div>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button className="flex-1 py-3 bg-cyan-500 text-ocean-deep rounded-xl font-black text-xs uppercase tracking-widest hover:bg-cyan-400 transition-all flex items-center justify-center gap-2">
                                        Подробнее <ExternalLink size={14} />
                                    </button>
                                    <button className="px-4 py-3 glass border-white/10 rounded-xl hover:bg-white/10 transition-all">
                                        <TrendingUp size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
