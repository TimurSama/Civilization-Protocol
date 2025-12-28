"use client";

import { motion } from "framer-motion";
import { Activity, Droplets, Thermometer, Wind, AlertCircle, Search, Filter, TrendingUp, TrendingDown, MapPin, Clock, Download, Share2, Plus, FileText } from "lucide-react";
import { useState } from "react";
import WaterQualityReportForm from "@/components/WaterQualityReportForm";

const qualityMetrics = [
    { label: "pH Level", value: "7.2", status: "Good", color: "text-green-400", icon: Droplets, trend: "+0.1" },
    { label: "Oxygen", value: "8.5 mg/L", status: "Good", color: "text-cyan-glow", icon: Wind, trend: "+0.2" },
    { label: "Temperature", value: "18°C", status: "Normal", color: "text-blue-400", icon: Thermometer, trend: "-1.2" },
    { label: "Pollution", value: "2.3%", status: "Warning", color: "text-gold-glow", icon: AlertCircle, trend: "-0.5" },
    { label: "Turbidity", value: "1.2 NTU", status: "Good", color: "text-emerald-400", icon: Droplets, trend: "-0.3" },
    { label: "Conductivity", value: "450 μS/cm", status: "Normal", color: "text-blue-400", icon: Activity, trend: "+5" },
    { label: "Chlorine", value: "0.8 mg/L", status: "Good", color: "text-green-400", icon: Droplets, trend: "0" },
    { label: "Nitrates", value: "3.2 mg/L", status: "Warning", color: "text-yellow-400", icon: AlertCircle, trend: "+0.4" },
];

export default function VODCheckPage() {
    const [selectedLocation, setSelectedLocation] = useState("Река Волга, Сектор 4");
    const [timeRange, setTimeRange] = useState<'1H' | '24H' | '7D' | '1M'>('24H');
    const [showReportForm, setShowReportForm] = useState(false);

    const locations = [
        { name: "Река Волга, Сектор 4", lat: 56.33, lon: 44.00, status: "Online", quality: 92 },
        { name: "Река Рейн, Сектор 2", lat: 50.11, lon: 8.68, status: "Online", quality: 88 },
        { name: "Река Нил, Сектор 9", lat: 30.06, lon: 31.25, status: "Offline", quality: 75 },
        { name: "Река Амазонка, Сектор 1", lat: -3.46, lon: -58.38, status: "Online", quality: 95 },
        { name: "Озеро Байкал", lat: 53.80, lon: 108.00, status: "Online", quality: 99 },
        { name: "Каспийское море", lat: 42.00, lon: 50.00, status: "Online", quality: 78 },
    ];

    const historyData = [
        { date: "2025-01-15", pH: 7.2, oxygen: 8.5, temp: 18, pollution: 2.3 },
        { date: "2025-01-14", pH: 7.1, oxygen: 8.3, temp: 19, pollution: 2.8 },
        { date: "2025-01-13", pH: 7.0, oxygen: 8.2, temp: 19, pollution: 3.1 },
        { date: "2025-01-12", pH: 6.9, oxygen: 8.0, temp: 20, pollution: 3.5 },
        { date: "2025-01-11", pH: 6.8, oxygen: 7.9, temp: 20, pollution: 3.8 },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Water Quality Report Form */}
            <WaterQualityReportForm
                isOpen={showReportForm}
                onClose={() => setShowReportForm(false)}
                onSubmit={(report) => {
                    console.log("Report submitted:", report);
                    // Here you would send to API
                }}
            />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black mb-2">VOD Check</h1>
                    <p className="text-slate-400">Мониторинг качества и распределения водных ресурсов</p>
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                    <button
                        onClick={() => setShowReportForm(true)}
                        className="px-4 py-2 bg-cyan-glow text-ocean-deep font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2"
                    >
                        <Plus size={18} />
                        <span className="hidden sm:inline">Создать отчёт</span>
                    </button>
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                            type="text"
                            placeholder="Поиск объекта..."
                            className="w-full pl-10 pr-4 py-2 glass rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-cyan-glow/50"
                        />
                    </div>
                    <button className="p-2 glass rounded-xl text-slate-400 hover:text-cyan-glow transition-colors">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            {/* Location Selector */}
            <div className="mb-8">
                <div className="flex flex-wrap gap-3 mb-4">
                    {locations.map(loc => (
                        <button
                            key={loc.name}
                            onClick={() => setSelectedLocation(loc.name)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                                selectedLocation === loc.name
                                    ? 'bg-cyan-500 text-ocean-deep'
                                    : 'glass text-slate-400 hover:text-white'
                            }`}
                        >
                            <MapPin size={14} className="inline mr-2" />
                            {loc.name}
                            <span className={`ml-2 text-xs ${loc.status === 'Online' ? 'text-emerald-400' : 'text-red-400'}`}>
                                {loc.status}
                            </span>
                        </button>
                    ))}
                </div>
                <div className="glass-card p-4 flex items-center justify-between">
                    <div>
                        <div className="text-xs text-slate-500 uppercase font-black tracking-widest mb-1">Текущее местоположение</div>
                        <div className="text-lg font-black">{selectedLocation}</div>
                        <div className="text-xs text-slate-500 mt-1">
                            Качество воды: <span className="text-emerald-400 font-black">
                                {locations.find(l => l.name === selectedLocation)?.quality}%
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 glass rounded-lg hover:bg-white/10 transition-all">
                            <Download size={18} className="text-slate-400" />
                        </button>
                        <button className="p-2 glass rounded-lg hover:bg-white/10 transition-all">
                            <Share2 size={18} className="text-slate-400" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Real-time Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {qualityMetrics.map((metric, i) => (
                    <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${metric.color}`}>
                                <metric.icon size={20} />
                            </div>
                            <div className="text-right">
                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-white/5 ${metric.color} block mb-1`}>
                                    {metric.status}
                                </span>
                                <div className={`text-xs font-black flex items-center gap-1 ${metric.trend?.startsWith('+') ? 'text-emerald-400' : metric.trend?.startsWith('-') ? 'text-red-400' : 'text-slate-500'}`}>
                                    {metric.trend?.startsWith('+') ? <TrendingUp size={12} /> : metric.trend?.startsWith('-') ? <TrendingDown size={12} /> : null}
                                    {metric.trend}
                                </div>
                            </div>
                        </div>
                        <div className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">{metric.label}</div>
                        <div className="text-3xl font-black">{metric.value}</div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart */}
                <div className="lg:col-span-2 glass-card">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="font-bold flex items-center gap-2">
                            <Activity className="text-cyan-glow" size={20} /> Динамика использования
                        </h3>
                        <div className="flex gap-2">
                            {(['1H', '24H', '7D', '1M'] as const).map(t => (
                                <button 
                                    key={t}
                                    onClick={() => setTimeRange(t)}
                                    className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-colors ${timeRange === t ? 'bg-cyan-glow text-ocean-deep' : 'glass text-slate-500 hover:bg-white/5'
                                    }`}>
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="h-64 flex items-end gap-1">
                        {Array.from({ length: 40 }).map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${20 + Math.random() * 80}%` }}
                                transition={{ duration: 1, delay: i * 0.02 }}
                                className="flex-1 bg-gradient-to-t from-cyan-glow/5 to-cyan-glow/40 rounded-t-sm"
                            />
                        ))}
                    </div>

                    <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                        <span>00:00</span>
                        <span>06:00</span>
                        <span>12:00</span>
                        <span>18:00</span>
                        <span>23:59</span>
                    </div>
                </div>

                {/* Active Sensors */}
                <div className="glass-card">
                    <h3 className="font-bold mb-6">Активные датчики</h3>
                    <div className="space-y-4">
                        {[
                            { name: "Sensor #A-102", loc: "Sector 4, Volga", status: "Online", lastUpdate: "2 мин назад", quality: 92 },
                            { name: "Sensor #B-045", loc: "Sector 2, Rhine", status: "Online", lastUpdate: "5 мин назад", quality: 88 },
                            { name: "Sensor #C-088", loc: "Sector 9, Nile", status: "Offline", error: true, lastUpdate: "2 часа назад", quality: 75 },
                            { name: "Sensor #D-112", loc: "Sector 1, Amazon", status: "Online", lastUpdate: "1 мин назад", quality: 95 },
                            { name: "Sensor #E-203", loc: "Lake Baikal", status: "Online", lastUpdate: "3 мин назад", quality: 99 },
                            { name: "Sensor #F-156", loc: "Caspian Sea", status: "Online", lastUpdate: "4 мин назад", quality: 78 },
                            { name: "Sensor #G-089", loc: "Sector 7, Yangtze", status: "Online", lastUpdate: "6 мин назад", quality: 85 },
                            { name: "Sensor #H-234", loc: "Sector 3, Ganges", status: "Online", lastUpdate: "1 мин назад", quality: 72 },
                        ].map((sensor, i) => (
                            <div key={sensor.name} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                                <div className="flex items-center gap-3 flex-1">
                                    <div className={`w-2 h-2 rounded-full ${sensor.error ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
                                    <div className="flex-1">
                                        <div className="text-xs font-bold">{sensor.name}</div>
                                        <div className="text-[10px] text-slate-500">{sensor.loc}</div>
                                        <div className="text-[10px] text-slate-600 mt-1 flex items-center gap-2">
                                            <Clock size={10} />
                                            {sensor.lastUpdate}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-[10px] font-bold mb-1 ${sensor.error ? 'text-red-400' : 'text-emerald-400'}`}>
                                        {sensor.status}
                                    </div>
                                    <div className="text-xs font-black text-cyan-400">
                                        {sensor.quality}%
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-3 glass rounded-xl text-xs font-bold text-cyan-glow hover:bg-cyan-glow/10 transition-colors">
                        Управление сетью
                    </button>
                </div>
            </div>

            {/* History Table */}
            <div className="glass-card mt-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold flex items-center gap-2">
                        <Clock className="text-cyan-glow" size={20} /> История измерений
                    </h3>
                    <button className="px-4 py-2 glass rounded-xl text-xs font-bold text-cyan-glow hover:bg-cyan-glow/10 transition-colors flex items-center gap-2">
                        <Download size={14} />
                        Экспорт CSV
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left py-3 px-4 text-xs font-black uppercase tracking-widest text-slate-500">Дата</th>
                                <th className="text-left py-3 px-4 text-xs font-black uppercase tracking-widest text-slate-500">pH</th>
                                <th className="text-left py-3 px-4 text-xs font-black uppercase tracking-widest text-slate-500">Кислород</th>
                                <th className="text-left py-3 px-4 text-xs font-black uppercase tracking-widest text-slate-500">Температура</th>
                                <th className="text-left py-3 px-4 text-xs font-black uppercase tracking-widest text-slate-500">Загрязнение</th>
                                <th className="text-left py-3 px-4 text-xs font-black uppercase tracking-widest text-slate-500">Статус</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historyData.map((row, i) => (
                                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="py-3 px-4 text-sm font-bold">{row.date}</td>
                                    <td className="py-3 px-4 text-sm">{row.pH}</td>
                                    <td className="py-3 px-4 text-sm">{row.oxygen} mg/L</td>
                                    <td className="py-3 px-4 text-sm">{row.temp}°C</td>
                                    <td className="py-3 px-4 text-sm">
                                        <span className={row.pollution > 3 ? 'text-yellow-400' : 'text-emerald-400'}>
                                            {row.pollution}%
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`text-xs font-bold px-2 py-1 rounded ${row.pollution > 3 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                                            {row.pollution > 3 ? 'Warning' : 'Good'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
