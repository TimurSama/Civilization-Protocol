"use client";

import { useState, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe, MapPin, Layers, ZoomIn, ZoomOut, Search, Filter,
  Droplets, Factory, Cpu, Building2, Users, TrendingUp,
  ChevronRight, X, Play, Pause, Clock, Activity, BarChart3,
  AlertTriangle, CheckCircle2, ArrowRight, Eye, Calendar,
  Database, Shield, Zap, Target, Radio, Waves, Leaf
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import InfoPopup from "@/components/InfoPopup";

// Dynamic import for 3D Globe
const Globe3D = dynamic(() => import("@/components/Globe3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-900">
      <div className="w-16 h-16 border-4 border-teal-500/30 border-t-teal-500 rounded-full animate-spin" />
    </div>
  ),
});

// Ecosystem layers
const layers = [
  { id: "all", name: "Все слои", icon: <Layers size={18} />, color: "white" },
  { id: "water", name: "Водные объекты", icon: <Droplets size={18} />, color: "cyan" },
  { id: "infrastructure", name: "Инфраструктура", icon: <Factory size={18} />, color: "orange" },
  { id: "sensors", name: "IoT сенсоры", icon: <Cpu size={18} />, color: "green" },
  { id: "projects", name: "Проекты", icon: <Target size={18} />, color: "purple" },
  { id: "research", name: "Исследования", icon: <Building2 size={18} />, color: "blue" },
];

// Zoom levels
const zoomLevels = [
  { level: 1, name: "Планетарный", description: "Глобальная сеть CivilizationProtocol" },
  { level: 2, name: "Региональный", description: "Проекты по странам" },
  { level: 3, name: "Локальный", description: "Конкретные объекты" },
  { level: 4, name: "Детальный", description: "Real-time данные" },
];

// Demo data for ecosystem
const ecosystemData = [
  {
    id: 1,
    name: "Узбекистан — Пилотный проект",
    type: "project",
    region: "central_asia",
    lat: 41.3,
    lng: 69.3,
    status: "active",
    metrics: {
      sensors: 45,
      dataPoints: "1.2M",
      coverage: "340 km²",
      budget: "$2.5M"
    },
    description: "Первый полномасштабный пилот CivilizationProtocol в Ферганской долине"
  },
  {
    id: 2,
    name: "TIIAME Research Hub",
    type: "research",
    region: "central_asia",
    lat: 41.35,
    lng: 69.28,
    status: "active",
    metrics: {
      researchers: 24,
      publications: 15,
      datasets: 8,
      partners: 12
    },
    description: "Научно-исследовательский центр при Ташкентском институте"
  },
  {
    id: 3,
    name: "Aral Sea Monitoring",
    type: "sensors",
    region: "central_asia",
    lat: 45.0,
    lng: 59.0,
    status: "monitoring",
    metrics: {
      sensors: 120,
      lastUpdate: "2 мин назад",
      alerts: 3,
      coverage: "25,000 km²"
    },
    description: "Мониторинг экологической катастрофы Аральского моря"
  },
  {
    id: 4,
    name: "Dubai Water Initiative",
    type: "infrastructure",
    region: "middle_east",
    lat: 25.2,
    lng: 55.3,
    status: "planning",
    metrics: {
      facilities: 8,
      capacity: "50M m³/year",
      investment: "$15M",
      timeline: "Q3 2025"
    },
    description: "Интеграция с системой опреснения ОАЭ"
  },
  {
    id: 5,
    name: "Rhine Basin Network",
    type: "water",
    region: "europe",
    lat: 50.9,
    lng: 6.9,
    status: "active",
    metrics: {
      countries: 9,
      stations: 340,
      quality: "94%",
      flow: "2,300 m³/s"
    },
    description: "Трансграничный мониторинг бассейна Рейна"
  },
];

// Detail modal content
interface EcosystemItem {
  id: number;
  name: string;
  type: string;
  region: string;
  lat: number;
  lng: number;
  status: string;
  metrics: Record<string, string | number | undefined>;
  description: string;
}

export default function EcosystemPresentation() {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeLayer, setActiveLayer] = useState("all");
  const [selectedItem, setSelectedItem] = useState<EcosystemItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showTimeline, setShowTimeline] = useState(false);
  const [timelineYear, setTimelineYear] = useState(2024);

  const filteredData = ecosystemData.filter(item => {
    const matchesLayer = activeLayer === "all" || item.type === activeLayer;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLayer && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-emerald-500";
      case "monitoring": return "bg-cyan-500";
      case "planning": return "bg-yellow-500";
      case "completed": return "bg-blue-500";
      default: return "bg-slate-500";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "project": return <Target size={16} />;
      case "research": return <Building2 size={16} />;
      case "sensors": return <Cpu size={16} />;
      case "infrastructure": return <Factory size={16} />;
      case "water": return <Droplets size={16} />;
      default: return <MapPin size={16} />;
    }
  };

  return (
    <div className="min-h-screen text-white overflow-hidden">
      {/* Header - под главным Navbar */}
      <div className="sticky top-20 left-0 right-0 z-[90] bg-slate-950/90 backdrop-blur-xl border-b border-teal-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/presentations" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
              <Globe size={24} />
            </div>
            <div>
              <div className="font-bold">Карта экосистемы</div>
              <div className="text-xs text-teal-400">Interactive Ecosystem Map</div>
            </div>
          </Link>

          {/* Search */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Поиск объектов..."
                className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl focus:border-teal-500 focus:outline-none w-64"
              />
            </div>
          </div>

          {/* Zoom level indicator */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Уровень:</span>
            <div className="flex gap-1">
              {zoomLevels.map(z => (
                <button
                  key={z.level}
                  onClick={() => setZoomLevel(z.level)}
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center transition-all text-sm font-bold",
                    zoomLevel === z.level
                      ? "bg-teal-500 text-slate-950"
                      : "bg-slate-800 hover:bg-slate-700"
                  )}
                >
                  {z.level}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex h-screen">
        {/* Left sidebar - Layers */}
        <div className="w-64 border-r border-slate-800 p-4 overflow-y-auto hidden lg:block">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Layers size={18} className="text-teal-400" />
            Слои карты
          </h3>
          <div className="space-y-2">
            {layers.map(layer => {
              const layerDetails = {
                all: "Показать все слои экосистемы CivilizationProtocol одновременно. Включает водные объекты, инфраструктуру, IoT-сенсоры, проекты и исследовательские центры.",
                water: "Водные объекты: реки, озёра, водохранилища, подземные воды. Отображает текущее состояние и качество водных ресурсов в реальном времени.",
                infrastructure: "Инфраструктура: станции очистки, насосные станции, водопроводные сети, опреснительные установки. Показывает техническую инфраструктуру водного сектора.",
                sensors: "IoT-сенсоры: точки мониторинга качества воды, уровня, температуры и других параметров. Обеспечивают непрерывный сбор данных в режиме реального времени.",
                projects: "Проекты CivilizationProtocol: активные и планируемые проекты по улучшению водных ресурсов. Включает пилотные программы, масштабные инициативы и партнёрства.",
                research: "Исследовательские центры: научные институты, университеты и лаборатории, работающие с CivilizationProtocol. Показывает места проведения исследований и разработок.",
              };
              
              return (
                <InfoPopup
                  key={layer.id}
                  title={layer.name}
                  content={
                    <div className="space-y-3">
                      <p className="text-sm">{layerDetails[layer.id as keyof typeof layerDetails]}</p>
                      <div>
                        <h4 className="font-bold mb-2">Элементы слоя:</h4>
                        <p className="text-sm text-slate-400">
                          {layer.id === "all" && "Все типы объектов экосистемы"}
                          {layer.id === "water" && "Реки, озёра, водохранилища, подземные воды"}
                          {layer.id === "infrastructure" && "Станции очистки, насосные станции, водопроводные сети"}
                          {layer.id === "sensors" && "IoT-датчики, спутниковые данные, телеметрия"}
                          {layer.id === "projects" && "Пилотные проекты, масштабные инициативы, партнёрства"}
                          {layer.id === "research" && "Научные институты, университеты, исследовательские лаборатории"}
                        </p>
                      </div>
                    </div>
                  }
                  trigger={
                    <button
                      onClick={() => setActiveLayer(layer.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left cursor-pointer group relative overflow-hidden",
                        activeLayer === layer.id
                          ? "bg-teal-500/20 border border-teal-500/50 text-teal-400"
                          : "bg-slate-800/50 hover:bg-slate-800 text-slate-400"
                      )}
                    >
                      {/* Градиентный фон при hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-teal-500/0 to-cyan-500/0 group-hover:from-teal-500/10 group-hover:to-cyan-500/5 transition-all duration-300"
                      />
                      
                      <span className={`text-${layer.color}-400 relative z-10 group-hover:scale-110 transition-transform`}>
                        {layer.icon}
                      </span>
                      <span className="text-sm relative z-10 group-hover:text-white transition-colors">
                        {layer.name}
                      </span>
                      
                      {/* Декоративные элементы */}
                      {activeLayer === layer.id && (
                        <motion.div
                          className="absolute right-2 w-2 h-2 rounded-full bg-teal-400"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </button>
                  }
                  size="md"
                />
              );
            })}
          </div>

          {/* Timeline toggle */}
          <div className="mt-8">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Clock size={18} className="text-teal-400" />
              Timeline
            </h3>
            <button
              onClick={() => setShowTimeline(!showTimeline)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all",
                showTimeline ? "bg-purple-500/20 border border-purple-500/50" : "bg-slate-800/50"
              )}
            >
              <span className="text-sm">{showTimeline ? "Скрыть" : "Показать"} историю</span>
              <ChevronRight className={cn("transition-transform", showTimeline && "rotate-90")} size={16} />
            </button>

            {showTimeline && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4"
              >
                <input
                  type="range"
                  min={2020}
                  max={2030}
                  value={timelineYear}
                  onChange={e => setTimelineYear(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>2020</span>
                  <span className="font-bold text-teal-400">{timelineYear}</span>
                  <span>2030</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Stats */}
          <div className="mt-8 p-4 rounded-xl bg-slate-800/50">
            <h3 className="font-bold mb-4 text-sm">Статистика</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Объектов</span>
                <span className="font-bold text-teal-400">{filteredData.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Стран</span>
                <span className="font-bold">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Сенсоров</span>
                <span className="font-bold text-green-400">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Data points/сек</span>
                <span className="font-bold text-cyan-400">45K</span>
              </div>
            </div>
          </div>
        </div>

        {/* Map area */}
        <div className="flex-1 relative">
          {/* 3D Globe */}
          <div className="absolute inset-0">
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center bg-slate-900">
                <div className="w-16 h-16 border-4 border-teal-500/30 border-t-teal-500 rounded-full animate-spin" />
              </div>
            }>
              <Globe3D />
            </Suspense>
          </div>

          {/* Overlay with zoom info */}
          <div className="absolute top-4 left-4 p-4 rounded-xl bg-slate-900/80 backdrop-blur-xl border border-slate-800">
            <div className="text-xs text-slate-500 mb-1">Текущий уровень</div>
            <div className="font-bold text-lg text-teal-400">
              {zoomLevels.find(z => z.level === zoomLevel)?.name}
            </div>
            <div className="text-sm text-slate-400">
              {zoomLevels.find(z => z.level === zoomLevel)?.description}
            </div>
          </div>

          {/* Zoom controls */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
            <button
              onClick={() => setZoomLevel(Math.min(4, zoomLevel + 1))}
              className="w-10 h-10 rounded-xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 flex items-center justify-center hover:bg-slate-800 transition-colors"
            >
              <ZoomIn size={20} />
            </button>
            <button
              onClick={() => setZoomLevel(Math.max(1, zoomLevel - 1))}
              className="w-10 h-10 rounded-xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 flex items-center justify-center hover:bg-slate-800 transition-colors"
            >
              <ZoomOut size={20} />
            </button>
          </div>

          {/* Data points list (overlay) */}
          <div className="absolute bottom-4 left-4 right-4 lg:left-auto lg:right-4 lg:w-96">
            <div className="p-4 rounded-xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 max-h-64 overflow-y-auto">
              <h3 className="font-bold mb-3 flex items-center justify-between">
                <span>Объекты на карте</span>
                <span className="text-sm text-teal-400">{filteredData.length}</span>
              </h3>
              <div className="space-y-2">
                {filteredData.map(item => (
                  <InfoPopup
                    key={item.id}
                    title={item.name}
                    content={
                      <div className="space-y-3">
                        <p className="text-sm">{item.description}</p>
                        <div>
                          <h4 className="font-bold mb-2">Метрики:</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {Object.entries(item.metrics).map(([key, value]) => (
                              <div key={key} className="p-2 rounded bg-slate-800/50">
                                <div className="text-slate-400 text-xs mb-1">
                                  {key === "sensors" ? "Сенсоров" :
                                   key === "dataPoints" ? "Data Points" :
                                   key === "coverage" ? "Покрытие" :
                                   key === "budget" ? "Бюджет" :
                                   key === "researchers" ? "Исследователей" :
                                   key === "publications" ? "Публикаций" :
                                   key === "datasets" ? "Датасетов" :
                                   key === "partners" ? "Партнёров" :
                                   key === "lastUpdate" ? "Обновление" :
                                   key === "alerts" ? "Алертов" :
                                   key === "facilities" ? "Объектов" :
                                   key === "capacity" ? "Мощность" :
                                   key === "investment" ? "Инвестиции" :
                                   key === "timeline" ? "Сроки" :
                                   key === "countries" ? "Стран" :
                                   key === "stations" ? "Станций" :
                                   key === "quality" ? "Качество" :
                                   key === "flow" ? "Расход" :
                                   key}
                                </div>
                                <div className="font-bold text-white">{String(value)}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold mb-2">Статус:</h4>
                          <p className="text-sm text-slate-400">
                            {item.status === "active" && "Проект активно работает и собирает данные"}
                            {item.status === "monitoring" && "Ведётся постоянный мониторинг состояния"}
                            {item.status === "planning" && "Проект находится в стадии планирования"}
                            {item.status === "completed" && "Проект успешно завершён"}
                          </p>
                        </div>
                      </div>
                    }
                    trigger={
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-all text-left cursor-pointer group relative overflow-hidden"
                      >
                        {/* Градиентный фон при hover */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-teal-500/0 to-cyan-500/0 group-hover:from-teal-500/10 group-hover:to-cyan-500/5 transition-all duration-300"
                        />
                        
                        <motion.div
                          className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform",
                            item.type === "project" ? "bg-purple-500/20 text-purple-400" :
                            item.type === "research" ? "bg-blue-500/20 text-blue-400" :
                            item.type === "sensors" ? "bg-green-500/20 text-green-400" :
                            item.type === "infrastructure" ? "bg-orange-500/20 text-orange-400" :
                            "bg-cyan-500/20 text-cyan-400"
                          )}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          {getTypeIcon(item.type)}
                        </motion.div>
                        <div className="flex-1 min-w-0 relative z-10">
                          <div className="font-medium text-sm truncate group-hover:text-white transition-colors">
                            {item.name}
                          </div>
                          <div className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                            {item.region}
                          </div>
                        </div>
                        <motion.div
                          className={cn("w-2 h-2 rounded-full relative z-10", getStatusColor(item.status))}
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </button>
                    }
                    size="lg"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar - Details */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              className="w-96 border-l border-slate-800 p-6 overflow-y-auto bg-slate-900"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className={cn(
                    "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-2",
                    getStatusColor(selectedItem.status)
                  )}>
                    {selectedItem.status === "active" ? "Активный" :
                     selectedItem.status === "monitoring" ? "Мониторинг" :
                     selectedItem.status === "planning" ? "Планирование" : "Завершён"}
                  </div>
                  <h2 className="text-xl font-bold">{selectedItem.name}</h2>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 hover:bg-slate-800 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Description */}
              <p className="text-slate-400 mb-6">{selectedItem.description}</p>

              {/* Metrics */}
              <div className="mb-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <BarChart3 size={18} className="text-teal-400" />
                  Метрики
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(selectedItem.metrics).map(([key, value]) => (
                    <div key={key} className="p-3 rounded-xl bg-slate-800/50">
                      <div className="text-xs text-slate-500 mb-1">
                        {key === "sensors" ? "Сенсоров" :
                         key === "dataPoints" ? "Data Points" :
                         key === "coverage" ? "Покрытие" :
                         key === "budget" ? "Бюджет" :
                         key === "researchers" ? "Исследователей" :
                         key === "publications" ? "Публикаций" :
                         key === "datasets" ? "Датасетов" :
                         key === "partners" ? "Партнёров" :
                         key === "lastUpdate" ? "Обновление" :
                         key === "alerts" ? "Алертов" :
                         key === "facilities" ? "Объектов" :
                         key === "capacity" ? "Мощность" :
                         key === "investment" ? "Инвестиции" :
                         key === "timeline" ? "Срок" :
                         key === "countries" ? "Стран" :
                         key === "stations" ? "Станций" :
                         key === "quality" ? "Качество" :
                         key === "flow" ? "Поток" : key}
                      </div>
                      <div className="font-bold text-teal-400">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="mb-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <MapPin size={18} className="text-teal-400" />
                  Локация
                </h3>
                <div className="p-4 rounded-xl bg-slate-800/50">
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-400">Широта</span>
                    <span className="font-mono">{selectedItem.lat}°</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Долгота</span>
                    <span className="font-mono">{selectedItem.lng}°</span>
                  </div>
                </div>
              </div>

              {/* Live data (for sensors) */}
              {selectedItem.type === "sensors" && (
                <div className="mb-6">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Activity size={18} className="text-green-400" />
                    Live Data
                  </h3>
                  <div className="p-4 rounded-xl bg-slate-800/50 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">pH</span>
                      <span className="font-bold text-green-400">7.2</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Температура</span>
                      <span className="font-bold">18.5°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Кислород</span>
                      <span className="font-bold text-cyan-400">8.1 mg/L</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Мутность</span>
                      <span className="font-bold text-yellow-400">12 NTU</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-3">
                <Link
                  href={`/map?focus=${selectedItem.id}`}
                  className="w-full py-3 bg-teal-500 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-teal-400 transition-colors"
                >
                  <Eye size={18} /> Открыть на карте
                </Link>
                <Link
                  href={`/tokenhub?project=${selectedItem.id}`}
                  className="w-full py-3 border border-teal-500 text-teal-400 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-teal-500/10 transition-colors"
                >
                  <Target size={18} /> Инвестировать
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex gap-4 p-3 rounded-xl bg-slate-900/90 backdrop-blur-xl border border-slate-800">
        {[
          { color: "bg-emerald-500", label: "Активный" },
          { color: "bg-cyan-500", label: "Мониторинг" },
          { color: "bg-yellow-500", label: "Планирование" },
          { color: "bg-blue-500", label: "Завершён" },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-2 text-xs">
            <div className={cn("w-3 h-3 rounded-full", item.color)} />
            <span className="text-slate-400">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


