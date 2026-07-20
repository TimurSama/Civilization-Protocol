"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe, Search, Cpu, Brain, TrendingUp, Zap, Server, Database,
  Calendar, Clock, AlertTriangle, ShieldCheck, Play, ArrowRight,
  CheckCircle2, ChevronDown, Award, Sparkles, Plus, Trash2, HelpCircle,
  FileText, Compass, BarChart3, Settings, Info, Download, RefreshCw, Layers
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

// Types of planetary resource components
type PlanetItemType = "object" | "subject" | "project" | "system" | "complex";
type SectorType = "water" | "energy" | "ecology" | "health" | "science";

interface EventHistory {
  year: number;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  type: "construction" | "investment" | "climate" | "critical" | "event";
  metrics?: string;
}

interface PlanetItem {
  id: string;
  name: string;
  nameEn: string;
  type: PlanetItemType;
  sector: SectorType;
  region: string;
  regionEn: string;
  coordinates: string;
  status: "normal" | "warning" | "critical";
  description: string;
  descriptionEn: string;
  invested: string;
  history: EventHistory[];
  technologies?: string[];
}

// Extensive database of planetary elements
const planetaryDatabase: PlanetItem[] = [
  {
    id: "p-01",
    name: "Мега-комплекс Восстановления Аральского Моря",
    nameEn: "Aral Sea Mega-Restoration Complex",
    type: "complex",
    sector: "ecology",
    region: "Центральная Азия",
    regionEn: "Central Asia",
    coordinates: "45.00° N, 60.00° E",
    status: "critical",
    description: "Глобальная транснациональная экосистема для рекультивации Аральской пустыни, объединяющая плотины, ирригационные каналы и лесопосадки.",
    descriptionEn: "Global transnational ecosystem for reclaiming the Aral Desert, integrating dams, irrigation channels, and forest plantings.",
    invested: "$2.4B VOD",
    technologies: ["Кокаральская плотина", "Спутниковый радарный эко-мониторинг", "IoT-сенсоры влажности почвы", "Дроны-сеятели саксаула"],
    history: [
      { year: 1960, title: "Начало усыхания", titleEn: "Beginning of Dessication", description: "Отвод рек Амударья и Сырдарья на орошение хлопчатника привел к потере 90% объема моря.", descriptionEn: "Diversion of Amu Darya and Syr Darya rivers for cotton irrigation led to a 90% loss of the sea's volume.", type: "climate" },
      { year: 1987, title: "Разделение моря", titleEn: "Sea Split", description: "Аральское море разделилось на две части: Северное (Малое) и Южное (Большое).", descriptionEn: "The Aral Sea split into two parts: Northern (Small) and Southern (Large) Aral.", type: "critical" },
      { year: 2005, title: "Строительство Кокаральской плотины", titleEn: "Kokaral Dam Construction", description: "Завершено строительство плотины при поддержке Всемирного банка, стабилизировавшее уровень Малого Арала.", descriptionEn: "Construction of the dam completed with World Bank support, stabilizing the water level of the Small Aral Sea.", type: "construction", metrics: "Уровень воды поднялся на 4 метра" },
      { year: 2024, title: "Запуск ИИ-мониторинга Civilization Protocol", titleEn: "Civilization Protocol AI Monitoring Launch", description: "Интеграция 120 IoT датчиков и автоматических гидропостов в блокчейн-сеть.", descriptionEn: "Integration of 120 IoT sensors and automated hydro-posts into the blockchain network.", type: "investment", metrics: "$150M инвестировано" },
      { year: 2026, title: "Критическая песчаная буря", titleEn: "Critical Sandstorm Event", description: "Аномальный климатический сдвиг принес соляную пыль на ледники Тянь-Шаня.", descriptionEn: "Anomalous climate shift blew salt dust onto the Tian Shan glaciers.", type: "climate" }
    ]
  },
  {
    id: "p-02",
    name: "Трансграничная Энергосистема 'Памир-Гидро'",
    nameEn: "Pamir-Hydro Transboundary Power Grid",
    type: "system",
    sector: "energy",
    region: "Таджикистан / Кыргызстан",
    regionEn: "Tajikistan / Kyrgyzstan",
    coordinates: "38.56° N, 71.50° E",
    status: "warning",
    description: "Интегрированный каскад гидроэлектростанций на ледниковом стоке, распределяющий зеленую энергию через P2P-смарт-грид в Южную Азию.",
    descriptionEn: "An integrated cascade of hydropower plants on glacial runoffs, distributing green energy via P2P smart grids into South Asia.",
    invested: "$1.8B VOD",
    technologies: ["Гироскопические турбины", "Blockchain P2P Энергорынок", "Цифровой двойник каскада Нурек", "ИИ-прогноз ледникового таяния"],
    history: [
      { year: 1980, title: "Запуск Нурекской ГЭС", titleEn: "Nurek HPP Launch", description: "Строительство высочайшей в мире грунтовой плотины для генерации энергии в регионе.", descriptionEn: "Construction of the world's highest earthen dam for regional power generation.", type: "construction" },
      { year: 2018, title: "Прорыв климатической аномалии", titleEn: "Climate Anomaly Burst", description: "Рекордное летнее таяние ледников Памира вызвало паводок, протестировавший прочность водосбросов.", descriptionEn: "Record summer melting of Pamir glaciers caused a flood that tested the spillways' strength limit.", type: "climate", metrics: "Расход воды 3200 м³/с" },
      { year: 2025, title: "Токенизация активов ГЭС через DAO", titleEn: "HPP Asset Tokenization via DAO", description: "Выпуск облигаций P-VOD на платформе Civilization Protocol для модернизации оборудования.", descriptionEn: "Issuance of P-VOD bonds on the Civilization Protocol platform for equipment modernization.", type: "investment", metrics: "$80M собрано" }
    ]
  },
  {
    id: "p-03",
    name: "Опреснительный Комплекс 'Зелёная Сахара 2.0'",
    nameEn: "Green Sahara 2.0 Desalination Complex",
    type: "complex",
    sector: "water",
    region: "Северная Африка",
    regionEn: "North Africa",
    coordinates: "24.00° N, 12.00° W",
    status: "normal",
    description: "Крупнейший в мире комплекс на солнечной энергии для обратного осмоса океанской воды с последующей транспортировкой вглубь Сахары для агро-оазисов.",
    descriptionEn: "The world's largest solar-powered reverse osmosis complex, transporting desalinated ocean water deep into the Sahara for agricultural oases.",
    invested: "$5.2B VOD",
    technologies: ["Концентрированная солнечная энергия (CSP)", "Графеновые мембраны фильтрации", "Трубопроводный ИИ-распределитель", "Автономные поливные комплексы"],
    history: [
      { year: 2012, title: "Первый аридный кризис", titleEn: "First Arid Crisis", description: "Опустынивание Сахеля ускорилось, уничтожив пастбища и вызвав массовую миграцию населения.", descriptionEn: "Sahel desertification accelerated, destroying pastures and causing mass migration.", type: "climate" },
      { year: 2021, title: "Идея Мегапроекта Опреснения", titleEn: "Megaproject Desalination Conception", description: "Запуск первой стадии опреснительной станции на побережье Мавритании.", descriptionEn: "Launch of the first-stage desalination plant on Mauritania's coast.", type: "construction" },
      { year: 2025, title: "Глобальное софинансирование", titleEn: "Global Co-investment", description: "ESG-фонды Европы и Ближнего Востока выкупили 45% NFT-долей комплекса для расширения трубопровода.", descriptionEn: "Europe and Middle East ESG funds acquired 45% NFT shares of the complex to expand the pipeline.", type: "investment", metrics: "$1.2B VOD привлечено" }
    ]
  },
  {
    id: "p-04",
    name: "Институт Экологии Реки Рейн",
    nameEn: "Rhine River Ecology Institute",
    type: "subject",
    sector: "science",
    region: "Западная Европа",
    regionEn: "Western Europe",
    coordinates: "50.94° N, 6.95° E",
    status: "normal",
    description: "Ведущий научный институт, координирующий сбор IoT данных по качеству воды в реках Евросоюза и проводящий трансграничный химический мониторинг.",
    descriptionEn: "A leading scientific institute coordinating IoT water quality data collection across EU rivers and performing transboundary chemical monitoring.",
    invested: "$320M VOD",
    technologies: ["Микрофлюидные ДНК-чипы", "Нейросетевой детектор загрязнений", "Блокчейн-реестр токсинов"],
    history: [
      { year: 1986, title: "Катастрофа на складе Sandoz", titleEn: "Sandoz Warehouse Disaster", description: "Критический выброс токсичных химикатов в Рейн уничтожил фауну реки на сотни километров.", descriptionEn: "A critical toxic chemical spill into the Rhine wiped out river fauna for hundreds of kilometers.", type: "critical" },
      { year: 2000, title: "Программа 'Рейн-2020'", titleEn: "Rhine-2020 Program", description: "Принятие межгосударственной программы восстановления биоразнообразия и биологической очистки.", descriptionEn: "Adoption of an interstate program for biodiversity restoration and biological treatment.", type: "construction" },
      { year: 2024, title: "Открытие OpenData озера данных", titleEn: "OpenData Lake Launch", description: "Институт предоставил полный доступ к сырым данным о качестве воды для Civilization Protocol AI.", descriptionEn: "The institute shared full raw water quality database access with Civilization Protocol AI.", type: "investment" }
    ]
  },
  {
    id: "p-05",
    name: "Система Сенсорного Покрытия Водоноса Огаллала",
    nameEn: "Ogallala Aquifer Sensor Coverage System",
    type: "system",
    sector: "science",
    region: "Северная Америка",
    regionEn: "North America",
    coordinates: "37.00° N, -101.00° W",
    status: "warning",
    description: "Разветвленная система подземных пьезометрических датчиков для мониторинга истощения крупнейшего подземного резервуара США из-за сельского хозяйства.",
    descriptionEn: "An extensive network of underground piezometric sensors monitoring the depletion of the largest USA aquifer due to intensive agriculture.",
    invested: "$850M VOD",
    technologies: ["Пьезодатчики глубокого бурения", "Анализатор гравитации GRACE", "ИИ-балансировщик квот откачки"],
    history: [
      { year: 1950, title: "Начало интенсивного орошения", titleEn: "Intensive Irrigation Kickoff", description: "Массовое внедрение круговых дождевальных установок спровоцировало неконтролируемый отбор подземной воды.", descriptionEn: "Mass introduction of center-pivot irrigation triggered uncontrolled groundwater extraction.", type: "construction" },
      { year: 2015, title: "Достижение критического падения уровней", titleEn: "Critical Aquifer Drop Reached", description: "В некоторых точках Канзаса уровень воды упал на 30 метров ниже исторического.", descriptionEn: "In some Kansas wells, the water level fell 30 meters below the pre-development level.", type: "climate" },
      { year: 2025, title: "Внедрение динамических блокчейн-лимитов", titleEn: "Dynamic Blockchain Quotas Implementation", description: "Казначейство DAO внедрило смарт-контракты для регулирования объемов добычи воды фермерами.", descriptionEn: "DAO Treasury integrated smart contracts to regulate farmers' water extraction limits dynamically.", type: "investment", metrics: "$40M VOD застейкано фермерами" }
    ]
  }
];

// Optimal Technologies Directory
const technologyDir = [
  { id: "tech-1", name: "Мембранный Обратный Осмос (SWRO)", category: "water", cost: "Средний", efficiency: "98.5%", desc: "Удаление до 99.8% солей и примесей из морской воды при давлении до 70 бар." },
  { id: "tech-2", name: "Солнечные испарители с нанопокрытием", category: "water", cost: "Низкий", efficiency: "85%", desc: "Экологичный безнапорный метод дистилляции воды под действием концентрированного солнца." },
  { id: "tech-3", name: "Датчики Telemetry-IoT c автономным питанием", category: "science", cost: "Низкий", efficiency: "99.9%", desc: "Пьезоэлектрические датчики, преобразующие напор воды в энергию для передачи по протоколам LoRaWAN/NB-IoT." },
  { id: "tech-4", name: "Умный P2P Смарт-Грид распределения энергии", category: "energy", cost: "Высокий", efficiency: "96.4%", desc: "Программно-определяемые подстанции на блокчейне для мгновенной балансировки микрогенерации." },
  { id: "tech-5", name: "Борьба с эрозией био-дренированием", category: "ecology", cost: "Низкий", efficiency: "90%", desc: "Посадка засухоустойчивых галофитов для укрепления соленых пылящих почв и поглощения углерода." },
  { id: "tech-6", name: "Очистка стоков водорослевыми реакторами (HRAP)", category: "health", cost: "Средний", efficiency: "92%", desc: "Биологическая очистка промышленных стоков от нитратов и фосфатов с помощью фотобиореакторов." }
];

export default function PlanetResearchPage() {
  const { language } = useLanguage();
  const isRu = language === "ru";

  // State Management
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<PlanetItemType | "all">("all");
  const [selectedSector, setSelectedSector] = useState<SectorType | "all">("all");
  const [selectedItem, setSelectedItem] = useState<PlanetItem | null>(planetaryDatabase[0]);

  // AI Simulation States
  const [simulationTarget, setSimulationTarget] = useState<string>("p-01");
  const [simulationScenario, setSimulationScenario] = useState<"optimistic" | "baseline" | "pessimistic">("baseline");
  const [simulating, setSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<any>(null);

  // AI Project Architect States
  const [architectPrompt, setArchitectPrompt] = useState("");
  const [architectSector, setArchitectSector] = useState<SectorType>("water");
  const [generatingProject, setGeneratingProject] = useState(false);
  const [generatedProjectData, setGeneratedProjectData] = useState<any>(null);
  const [architectStep, setArchitectStep] = useState(1); // 1: prompt, 2: processing animation, 3: result representation

  // Filter planetary list
  const filteredItems = useMemo(() => {
    return planetaryDatabase.filter(item => {
      const matchSearch = (isRu ? item.name : item.nameEn).toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (isRu ? item.region : item.regionEn).toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchType = selectedType === "all" || item.type === selectedType;
      const matchSector = selectedSector === "all" || item.sector === selectedSector;
      return matchSearch && matchType && matchSector;
    });
  }, [searchQuery, selectedType, selectedSector, isRu]);

  // Run AI Climate & Resource Simulation
  const handleRunSimulation = () => {
    setSimulating(true);
    setSimulationResult(null);

    const targetObj = planetaryDatabase.find(p => p.id === simulationTarget);

    setTimeout(() => {
      // Create interesting dynamic forecast metrics depending on scenario and target
      const factor = simulationScenario === "optimistic" ? 1.25 : simulationScenario === "pessimistic" ? 0.65 : 1.0;
      const waterIndex = targetObj ? targetObj.status === "critical" ? 15 : 75 : 50;

      const results = {
        targetName: targetObj ? (isRu ? targetObj.name : targetObj.nameEn) : "System",
        forecastYear: 2050,
        sustainabilityScore: Math.min(100, Math.round(waterIndex * factor * 1.2)),
        ecoStabilityIndex: Math.min(10.0, parseFloat((5.5 * factor).toFixed(1))),
        temperatureShift: simulationScenario === "pessimistic" ? "+3.4°C" : simulationScenario === "optimistic" ? "+1.1°C" : "+2.1°C",
        waterAvailability: Math.min(100, Math.round((waterIndex * 1.5 * factor))),
        requiredInvestments: simulationScenario === "optimistic" ? "450M VOD" : simulationScenario === "pessimistic" ? "2.5B VOD" : "1.2B VOD",
        aiText: isRu
          ? `Модель Gemini спрогнозировала динамику для '${targetObj?.name}'. В сценарии '${simulationScenario}' прогнозируется критическое изменение гидрологического режима. Приоритетная рекомендация: немедленный переход на замкнутые циклы очистки и установка LoRa-датчиков для предупреждения прорыва плотин.`
          : `Gemini Model simulated state variables for '${targetObj?.nameEn}'. In the '${simulationScenario}' scenario, critical hydrological shifts are predicted. Core AI recommendation: immediate transition to closed-loop purification systems and deploying LoRa sensors for early dam failure warnings.`
      };

      setSimulationResult(results);
      setSimulating(false);
    }, 1800);
  };

  // Run AI Project Architect
  const handleGenerateProject = () => {
    if (!architectPrompt.trim()) return;
    setGeneratingProject(true);
    setArchitectStep(2);
    setGeneratedProjectData(null);

    setTimeout(() => {
      // Simulate complex engineering design calculations
      const capex = Math.round(150 + Math.random() * 800);
      const opex = Math.round(capex * 0.08);
      const irr = Math.round(12 + Math.random() * 15);
      const npv = Math.round(capex * (irr / 100) * 1.8);

      // Select matching technologies
      const chosenTechs = technologyDir.filter(t => t.category === architectSector || t.category === "science");

      const projectData = {
        title: isRu ? `Мега-Проект: ${architectPrompt}` : `Megaproject: ${architectPrompt}`,
        code: `GP-${Math.floor(100000 + Math.random() * 900000)}`,
        sector: architectSector,
        optimalTechnologies: chosenTechs,
        economics: {
          capex: `${capex}M VOD`,
          opex: `${opex}M VOD / год`,
          npv: `${npv}M VOD`,
          irr: `${irr}%`,
          payback: `${parseFloat((capex / (opex * 2.5)).toFixed(1))} лет`
        },
        phases: [
          { name: isRu ? "Фаза 1: Сбор данных & ИИ-картирование" : "Phase 1: Hydrological IoT Mapping", duration: "6 месяцев", desc: isRu ? "Развертывание LoRa сенсоров и бурение пьезометрических скважин." : "Deploying LoRa sensors and drilling piezometric monitoring wells." },
          { name: isRu ? "Фаза 2: Инженерное строительство" : "Phase 2: Core Engineering Construction", duration: "18 месяцев", desc: isRu ? "Монтаж опреснительных установок, обратного осмоса или энергоблоков." : "Assembling SWRO desalination systems, power turbines, or reactor blocks." },
          { name: isRu ? "Фаза 3: Внедрение смарт-контрактов" : "Phase 3: Smart Contract & Tokenomic Integration", duration: "4 месяца", desc: isRu ? "Запуск P2P-энергорынка или автоматической аренды квот воды." : "Launching tokenized water quotas and dynamic P2P pricing models." },
          { name: isRu ? "Фаза 4: Эксплуатация под ИИ-контролем" : "Phase 4: Autonomous Operations under AI-Control", duration: "Постоянно", desc: isRu ? "Управление SCADA с помощью нейросети и оптимизация производительности." : "Continuous real-time optimization of membrane cycles via neural networks." }
        ],
        schematicLayout: {
          nodes: [
            { id: "n1", name: isRu ? "Источник данных (IoT)" : "Telemetry Source (IoT)", status: "active", x: 10, y: 50 },
            { id: "n2", name: isRu ? "ИИ-анализатор" : "AI Core Analyzer", status: "active", x: 45, y: 50 },
            { id: "n3", name: isRu ? "Исполнительный узел" : "Actuator / Valve", status: "pending", x: 80, y: 25 },
            { id: "n4", name: isRu ? "Распределенный реестр (P-VOD)" : "Blockchain Quotas", status: "pending", x: 80, y: 75 }
          ],
          connections: [
            { from: "n1", to: "n2", label: "Realtime Telemetry" },
            { from: "n2", to: "n3", label: "Feedback Loop" },
            { from: "n2", to: "n4", label: "State Consensus Proof" }
          ]
        }
      };

      setGeneratedProjectData(projectData);
      setArchitectStep(3);
      setGeneratingProject(false);
    }, 2800);
  };

  // Reset Architect Step
  const resetArchitect = () => {
    setArchitectPrompt("");
    setGeneratedProjectData(null);
    setArchitectStep(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-slate-100">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 relative"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-cyan-glow/10 text-cyan-glow mb-6 border border-cyan-500/20 shadow-[0_0_30px_rgba(34,211,238,0.15)] animate-pulse">
          <Globe size={44} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-glow-cyan">
          {isRu ? "Глобальные Планетарные Исследования" : "Global Planetary Research & AI Twin"}
        </h1>
        <p className="text-slate-400 max-w-3xl mx-auto text-base leading-relaxed">
          {isRu
            ? "Умная система поиска, анализа и долгосрочного прогнозирования планетарных активов. Объединяйте базы данных по водным ресурсам, инфраструктурным проектам, изменению климата и инвестициям с мощными алгоритмами Gemini AI."
            : "An advanced platform for finding, analyzing, and forecasting planetary assets. Connect databases on water resources, infrastructural developments, climate change, and investments utilizing Gemini AI."}
        </p>
      </motion.div>

      {/* Main Grid Layout: Explorer left, Details right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Left Column: Explorer Filter & List */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div className="glass-card p-6 border-white/5 space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2 text-cyan-glow">
              <Compass size={18} /> {isRu ? "Поисковый Терминал" : "Search Terminal"}
            </h3>

            {/* Input query */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder={isRu ? "Имя, регион, описание..." : "Name, region, description..."}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>

            {/* Filters by Type & Sector */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-bold">{isRu ? "Тип Актива" : "Asset Type"}</label>
                <select
                  value={selectedType}
                  onChange={e => setSelectedType(e.target.value as any)}
                  className="w-full px-2 py-1.5 bg-white/5 border border-white/10 rounded-lg text-slate-300 focus:outline-none"
                >
                  <option value="all">{isRu ? "Все типы" : "All types"}</option>
                  <option value="object">{isRu ? "Объект" : "Object"}</option>
                  <option value="subject">{isRu ? "Субъект" : "Subject"}</option>
                  <option value="project">{isRu ? "Проект" : "Project"}</option>
                  <option value="system">{isRu ? "Система" : "System"}</option>
                  <option value="complex">{isRu ? "Комплекс" : "Complex"}</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold">{isRu ? "Сектор" : "Sector"}</label>
                <select
                  value={selectedSector}
                  onChange={e => setSelectedSector(e.target.value as any)}
                  className="w-full px-2 py-1.5 bg-white/5 border border-white/10 rounded-lg text-slate-300 focus:outline-none"
                >
                  <option value="all">{isRu ? "Все секторы" : "All sectors"}</option>
                  <option value="water">{isRu ? "Вода" : "Water"}</option>
                  <option value="energy">{isRu ? "Энергетика" : "Energy"}</option>
                  <option value="ecology">{isRu ? "Экология" : "Ecology"}</option>
                  <option value="health">{isRu ? "Здоровье" : "Health"}</option>
                  <option value="science">{isRu ? "Наука" : "Science"}</option>
                </select>
              </div>
            </div>
          </div>

          {/* List of elements */}
          <div className="glass-card p-4 border-white/5 max-h-[480px] overflow-y-auto space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-500 mb-2 font-black uppercase tracking-wider">
              <span>{isRu ? "Результаты поиска" : "Search Results"}</span>
              <span>{filteredItems.length}</span>
            </div>

            {filteredItems.length === 0 ? (
              <div className="text-center py-8 text-sm text-slate-500">
                {isRu ? "Активов по запросу не найдено" : "No assets matched your search"}
              </div>
            ) : (
              filteredItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={cn(
                    "w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3",
                    selectedItem?.id === item.id
                      ? "bg-cyan-500/10 border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.05)]"
                      : "bg-transparent border-transparent hover:bg-white/5"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-lg shrink-0 mt-0.5",
                    item.status === "critical" ? "bg-red-500/10 text-red-400" :
                    item.status === "warning" ? "bg-yellow-500/10 text-yellow-400" :
                    "bg-emerald-500/10 text-emerald-400"
                  )}>
                    {item.type === "complex" ? <Layers size={16} /> :
                     item.type === "system" ? <Cpu size={16} /> :
                     item.type === "project" ? <TrendingUp size={16} /> :
                     item.type === "subject" ? <Server size={16} /> :
                     <Database size={16} />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-xs font-bold text-slate-400 truncate">
                        {isRu ? item.region : item.regionEn}
                      </span>
                      <span className={cn(
                        "text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded",
                        item.status === "critical" ? "bg-red-500/20 text-red-300" :
                        item.status === "warning" ? "bg-yellow-500/20 text-yellow-300" :
                        "bg-emerald-500/20 text-emerald-300"
                      )}>
                        {item.status}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white leading-snug truncate">
                      {isRu ? item.name : item.nameEn}
                    </h4>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Detail View */}
        <div className="lg:col-span-7">
          {selectedItem ? (
            <div className="glass-card p-6 border-white/5 space-y-6 relative overflow-hidden">
              {/* Futuristic neon overlay depending on status */}
              <div className={cn(
                "absolute top-0 right-0 w-48 h-48 blur-3xl rounded-full -mr-24 -mt-24 opacity-10",
                selectedItem.status === "critical" ? "bg-red-500" :
                selectedItem.status === "warning" ? "bg-yellow-500" : "bg-cyan-glow"
              )} />

              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-black uppercase tracking-widest px-2.5 py-1 bg-white/5 rounded-md text-cyan-glow">
                      {selectedItem.type}
                    </span>
                    <span className="text-xs font-black uppercase tracking-widest px-2.5 py-1 bg-white/5 rounded-md text-slate-400">
                      {selectedItem.sector}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-white">{isRu ? selectedItem.name : selectedItem.nameEn}</h2>
                  <p className="text-xs text-slate-400 font-mono mt-1">{isRu ? "Координаты" : "Coordinates"}: {selectedItem.coordinates}</p>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-slate-500 font-black uppercase tracking-wider">{isRu ? "Инвестировано" : "Invested"}</div>
                  <div className="text-lg font-black text-emerald-400">{selectedItem.invested}</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{isRu ? "Описание Актива" : "Asset Description"}</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {isRu ? selectedItem.description : selectedItem.descriptionEn}
                </p>
              </div>

              {/* Technologies Included */}
              {selectedItem.technologies && selectedItem.technologies.length > 0 && (
                <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{isRu ? "Используемые Технологии" : "Key Technologies"}</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.technologies.map((t, idx) => (
                      <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-cyan-glow/5 border border-cyan-glow/20 text-cyan-glow flex items-center gap-1.5">
                        <Cpu size={12} /> {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Timeline History */}
              <div>
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Clock size={14} /> {isRu ? "Хронология Событий и Изменений" : "History Timeline & Climate Shifts"}
                </h4>

                <div className="relative border-l-2 border-white/5 pl-4 ml-2 space-y-6">
                  {selectedItem.history.map((h, idx) => (
                    <div key={idx} className="relative">
                      {/* Timeline Dot icon representation */}
                      <span className={cn(
                        "absolute -left-[25px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-slate-950 flex items-center justify-center",
                        h.type === "critical" ? "bg-red-500" :
                        h.type === "climate" ? "bg-amber-400" :
                        h.type === "construction" ? "bg-blue-400" : "bg-emerald-400"
                      )} />

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-sm font-black text-white">{h.year} г.</span>
                          <span className={cn(
                            "text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded",
                            h.type === "critical" ? "bg-red-500/15 text-red-400" :
                            h.type === "climate" ? "bg-amber-500/15 text-amber-300" :
                            "bg-white/5 text-slate-300"
                          )}>
                            {h.type}
                          </span>
                        </div>
                        <h5 className="text-sm font-bold text-slate-100">{isRu ? h.title : h.titleEn}</h5>
                        <p className="text-xs text-slate-400 mt-1 leading-normal">{isRu ? h.description : h.descriptionEn}</p>
                        {h.metrics && (
                          <div className="inline-flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold mt-1.5 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">
                            <CheckCircle2 size={10} /> {h.metrics}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card p-12 border-white/5 text-center text-slate-500">
              <Globe size={48} className="mx-auto mb-4 text-slate-600" />
              {isRu ? "Выберите планетарный актив из списка для детального исследования" : "Select a planetary asset from list to start detail examination"}
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: AI Gemini Simulation Module */}
      <div className="glass-card p-8 border-white/5 mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-glow/5 blur-3xl rounded-full -mr-32 -mt-32" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/5 pb-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
              <Brain size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">{isRu ? "Gemini ИИ Модуль: Симуляция Климата и Систем" : "Gemini AI Module: Climate & System Simulation"}</h3>
              <p className="text-xs text-slate-400">{isRu ? "Компьютерные расчеты, прогнозирование сценариев и стресс-тесты" : "Numerical calculations, scenario forecasting, and resilience stress-tests"}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Select Target */}
            <div>
              <select
                value={simulationTarget}
                onChange={e => setSimulationTarget(e.target.value)}
                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-cyan-500/50"
              >
                {planetaryDatabase.map(p => (
                  <option key={p.id} value={p.id}>{isRu ? p.name : p.nameEn}</option>
                ))}
              </select>
            </div>

            {/* Select Scenario */}
            <div>
              <select
                value={simulationScenario}
                onChange={e => setSimulationScenario(e.target.value as any)}
                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-cyan-500/50"
              >
                <option value="optimistic">{isRu ? "Оптимистичный сценарий" : "Optimistic Scenario"}</option>
                <option value="baseline">{isRu ? "Базовый сценарий" : "Baseline Scenario"}</option>
                <option value="pessimistic">{isRu ? "Пессимистичный сценарий" : "Pessimistic Scenario"}</option>
              </select>
            </div>

            {/* Simulation trigger */}
            <button
              onClick={handleRunSimulation}
              disabled={simulating}
              className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.4)]"
            >
              {simulating ? (
                <>
                  <RefreshCw className="animate-spin" size={14} />
                  {isRu ? "Расчет..." : "Calculating..."}
                </>
              ) : (
                <>
                  <Play size={12} className="fill-current" />
                  {isRu ? "Запустить симуляцию" : "Simulate Scenario"}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Simulation Output Area */}
        <AnimatePresence mode="wait">
          {simulating ? (
            <motion.div
              key="sim-loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 text-center"
            >
              <div className="relative inline-block w-16 h-16 mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-purple-500/20" />
                <div className="absolute inset-0 rounded-full border-4 border-t-purple-500 animate-spin" />
              </div>
              <p className="text-sm text-slate-400 font-mono animate-pulse">
                {isRu ? "Сбор геоданных... Анализ тепловых аномалий... Проведение расчетов..." : "Aggregating geospatial layers... Solving partial differential equations... Resolving state factors..."}
              </p>
            </motion.div>
          ) : simulationResult ? (
            <motion.div
              key="sim-results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6"
            >
              {/* Metrics cards */}
              <div className="md:col-span-5 grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
                  <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{isRu ? "Эко-устойчивость" : "Eco-Sustainability"}</span>
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-3xl font-black text-cyan-400">{simulationResult.sustainabilityScore}%</span>
                    <span className="text-xs text-slate-400">/ 100</span>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
                  <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{isRu ? "Стабильность климата" : "Climate Stability"}</span>
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-3xl font-black text-purple-400">{simulationResult.ecoStabilityIndex}</span>
                    <span className="text-xs text-slate-400">/ 10.0</span>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
                  <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{isRu ? "Изменение темп." : "Temp Delta (2050)"}</span>
                  <div className="mt-2">
                    <span className={cn(
                      "text-3xl font-black",
                      simulationScenario === "pessimistic" ? "text-red-400" : "text-emerald-400"
                    )}>{simulationResult.temperatureShift}</span>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
                  <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{isRu ? "Доступность ресурсов" : "Resource Availability"}</span>
                  <div className="mt-2">
                    <span className="text-3xl font-black text-emerald-400">{simulationResult.waterAvailability}%</span>
                  </div>
                </div>
              </div>

              {/* Text interpretation card */}
              <div className="md:col-span-7 bg-purple-500/[0.03] border border-purple-500/20 rounded-2xl p-6 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-purple-400">
                    <Sparkles size={16} />
                    <span className="text-xs font-black uppercase tracking-widest">{isRu ? "ИИ Анализ и Советник" : "AI Analytical Advisor"}</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed font-mono">
                    {simulationResult.aiText}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  <div className="text-xs text-slate-400">
                    {isRu ? "Необходимый объем доп. инвестирования:" : "Required strategic safety allocation:"} <span className="font-bold text-white">{simulationResult.requiredInvestments}</span>
                  </div>
                  <button
                    onClick={() => alert(isRu ? "Отчет сохранен в локальное хранилище" : "Simulated report exported")}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
                  >
                    <Download size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-8 text-slate-500 text-sm font-mono border border-dashed border-white/10 rounded-2xl">
              {isRu ? "Выберите параметры выше и нажмите 'Запустить симуляцию' для просчета ИИ-модели" : "Configure parameters above and click 'Simulate Scenario' to run neural forecast model"}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* SECTION 3: AI Megaproject Architect & Designer */}
      <div className="glass-card p-8 border-white/5 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-glow/5 blur-3xl rounded-full -ml-32 -mb-32" />

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-glow border border-cyan-500/20">
            <Zap size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">{isRu ? "ИИ Архитектор Мегапроектов (Gemini)" : "Gemini Megaproject & Complex Architect"}</h3>
            <p className="text-xs text-slate-400">{isRu ? "Автоматическое планирование, выведение ТЭО, оптимальных технологий и пошаговых планов" : "Automated megaproject planning, optimal equipment select, OPEX/CAPEX forecasting & implementation roadmaps"}</p>
          </div>
        </div>

        {/* Stepwise Flow */}
        {architectStep === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Presets */}
              <div className="md:col-span-2 space-y-4">
                <label className="block text-sm font-bold text-slate-300">{isRu ? "Опишите ваш мегапроект или выберите направление" : "Describe your custom project or select a key sector"}</label>
                <textarea
                  value={architectPrompt}
                  onChange={e => setArchitectPrompt(e.target.value)}
                  placeholder={isRu
                    ? "Например: 'Строительство трансграничного гидроэкологического комплекса для предотвращения обмеления рек в Ферганской долине и запуск автоматической ирригации'"
                    : "E.g.: 'A regional zero-emission solar powered water treatment plant at the Dead Sea to establish artificial green agricultural belts'"
                  }
                  className="w-full h-28 p-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-cyan-500/50 transition-colors text-sm"
                />
              </div>

              {/* Controls */}
              <div className="space-y-4 bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">{isRu ? "Основная сфера" : "Primary Domain"}</label>
                  <select
                    value={architectSector}
                    onChange={e => setArchitectSector(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-slate-300 focus:outline-none"
                  >
                    <option value="water">{isRu ? "Водный сектор" : "Water management"}</option>
                    <option value="energy">{isRu ? "Энергетика" : "Energy infrastructure"}</option>
                    <option value="ecology">{isRu ? "Экология и леса" : "Forestry & Ecology"}</option>
                    <option value="health">{isRu ? "Биобезопасность и здоровье" : "Health & Biosecurity"}</option>
                    <option value="science">{isRu ? "Наука и мониторинг" : "Science & Monitoring"}</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleGenerateProject}
                    disabled={!architectPrompt.trim()}
                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs uppercase tracking-widest rounded-xl transition-all disabled:opacity-40 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_20px_rgba(34,211,238,0.25)]"
                  >
                    <Brain size={14} /> {isRu ? "Сгенерировать в Gemini" : "Generate via Gemini AI"}
                  </button>
                </div>
              </div>
            </div>

            {/* Hint Box */}
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-start gap-3">
              <Info className="text-cyan-glow shrink-0 mt-0.5" size={16} />
              <p className="text-xs text-slate-400 leading-relaxed">
                {isRu
                  ? "Алгоритмы ИИ автоматически проанализируют доступные технологии в реестре Civilization Protocol, сопоставят стоимость и выбросы, выведут IRR / NPV и сформируют интерактивную блок-схему соединений."
                  : "AI algorithms will analyze available hardware registries within Civilization Protocol, calculate emission offsets, simulate IRR & NPV projections, and lay out an interactive system logic flow diagram."}
              </p>
            </div>
          </div>
        )}

        {architectStep === 2 && (
          <div className="py-16 text-center space-y-6">
            <div className="relative inline-block w-20 h-20">
              <div className="absolute inset-0 rounded-full border-4 border-cyan-500/10" />
              <div className="absolute inset-0 rounded-full border-4 border-t-cyan-glow animate-spin" />
              <div className="absolute inset-4 rounded-full bg-cyan-glow/10 flex items-center justify-center text-cyan-glow animate-pulse">
                <Brain size={24} />
              </div>
            </div>
            <div className="max-w-md mx-auto space-y-2">
              <h4 className="text-lg font-black text-white animate-pulse">{isRu ? "Проектирование комплекса..." : "Architecting Megaproject..."}</h4>
              <p className="text-xs text-slate-500 font-mono">
                {isRu
                  ? "Просчёт CAPEX... Подбор оптимального оборудования по энергоэффективности... Балансировка инвестиционного графика..."
                  : "Calculating equipment cost-benefit metrics... Matching optimal operational standards... Building NPV amortization model..."}
              </p>
            </div>
          </div>
        )}

        {architectStep === 3 && generatedProjectData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Results Title bar */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/5 pb-4">
              <div>
                <span className="text-[10px] font-mono text-cyan-glow uppercase tracking-widest bg-cyan-glow/10 px-2.5 py-1 rounded">
                  {generatedProjectData.code} • {isRu ? "ВЕРИФИЦИРОВАНО ИИ" : "AI CONFIRMED MODEL"}
                </span>
                <h4 className="text-xl font-black text-white mt-2">{generatedProjectData.title}</h4>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={resetArchitect}
                  className="px-3 py-1.5 glass border-white/10 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  {isRu ? "Сбросить" : "Reset / New"}
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-cyan-500 text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-cyan-400 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <FileText size={12} /> {isRu ? "Экспорт ТЭО" : "Print Report"}
                </button>
              </div>
            </div>

            {/* Financials & Economic metrics */}
            <div>
              <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">{isRu ? "Технико-Экономический и Инвестиционный План (ТЭО)" : "Techno-Economic & Investment Statement"}</h5>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                  <div className="text-[10px] text-slate-500 uppercase font-black">{isRu ? "Начальный CAPEX" : "Capital CAPEX"}</div>
                  <div className="text-lg font-black text-white mt-1">{generatedProjectData.economics.capex}</div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                  <div className="text-[10px] text-slate-500 uppercase font-black">{isRu ? "Годовой OPEX" : "Yearly OPEX"}</div>
                  <div className="text-lg font-black text-white mt-1">{generatedProjectData.economics.opex}</div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                  <div className="text-[10px] text-slate-500 uppercase font-black">{isRu ? "Ожидаемый NPV" : "Expected NPV"}</div>
                  <div className="text-lg font-black text-cyan-glow mt-1">{generatedProjectData.economics.npv}</div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                  <div className="text-[10px] text-slate-500 uppercase font-black">{isRu ? "Внутренняя норма (IRR)" : "Internal Rate (IRR)"}</div>
                  <div className="text-lg font-black text-emerald-400 mt-1">{generatedProjectData.economics.irr}</div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center col-span-2 sm:col-span-1">
                  <div className="text-[10px] text-slate-500 uppercase font-black">{isRu ? "Окупаемость" : "Payback Cycle"}</div>
                  <div className="text-lg font-black text-amber-400 mt-1">{generatedProjectData.economics.payback}</div>
                </div>
              </div>
            </div>

            {/* Selected equipment and technologies */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">{isRu ? "Оптимальные Технологии и Оборудование" : "Optimal Selected Technologies"}</h5>
                <div className="space-y-3">
                  {generatedProjectData.optimalTechnologies.map((tech: any) => (
                    <div key={tech.id} className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-cyan-glow/10 text-cyan-glow mt-0.5">
                        <Cpu size={16} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h6 className="text-sm font-bold text-white">{tech.name}</h6>
                          <span className="text-[9px] font-mono text-cyan-glow bg-cyan-glow/5 border border-cyan-glow/15 px-1.5 py-0.5 rounded">
                            {tech.efficiency}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 leading-normal">{tech.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Implementation roadmap */}
              <div>
                <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">{isRu ? "Инвестиционный Календарь / Этапы реализации" : "Implementation Roadmap & Milestones"}</h5>
                <div className="space-y-4 relative border-l-2 border-white/5 pl-4 ml-2">
                  {generatedProjectData.phases.map((phase: any, idx: number) => (
                    <div key={idx} className="relative">
                      <span className="absolute -left-[24px] top-1.5 w-3 h-3 rounded-full bg-cyan-glow border-2 border-slate-950" />
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-black text-cyan-glow">{phase.duration}</span>
                        </div>
                        <h6 className="text-sm font-bold text-white leading-tight">{phase.name}</h6>
                        <p className="text-xs text-slate-400 mt-1">{phase.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SECTION: 2D Interactive Schematic Layout Model */}
            <div className="bg-slate-950 border border-white/5 rounded-3xl p-6">
              <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Layers size={14} /> {isRu ? "Интерактивная Схема Архитектуры Системы" : "Interactive System Architecture Schematic"}
              </h5>

              <div className="relative min-h-[180px] bg-black/40 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-around border border-white/5 overflow-hidden">
                {/* SVG Connecting lines */}
                <div className="absolute inset-0 pointer-events-none hidden md:block">
                  <svg className="w-full h-full" style={{ position: "absolute", top: 0, left: 0 }}>
                    <defs>
                      <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#22d3ee" />
                      </marker>
                    </defs>
                    <line x1="20%" y1="50%" x2="45%" y2="50%" stroke="#22d3ee" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow)" />
                    <line x1="55%" y1="50%" x2="75%" y2="28%" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#arrow)" />
                    <line x1="55%" y1="50%" x2="75%" y2="72%" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#arrow)" />
                  </svg>
                </div>

                {/* Simulated Interactive nodes */}
                {generatedProjectData.schematicLayout.nodes.map((node: any) => (
                  <motion.div
                    key={node.id}
                    whileHover={{ scale: 1.05 }}
                    className="z-10 p-4 bg-white/5 border border-cyan-glow/20 rounded-2xl w-48 text-center space-y-1 relative group cursor-pointer my-2 md:my-0"
                  >
                    <div className="w-2 h-2 rounded-full bg-cyan-glow absolute top-3 right-3 animate-pulse" />
                    <div className="text-xs font-bold text-white">{node.name}</div>
                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest font-mono">{node.status}</div>

                    {/* Hover detail info */}
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-slate-900 border border-cyan-glow/30 p-2 rounded-lg text-[9px] text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30 pointer-events-none">
                      {isRu ? "Активно обменивается пакетами данных" : "Active connection stream resolved"}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
