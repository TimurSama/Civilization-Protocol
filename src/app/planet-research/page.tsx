"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe, Search, Cpu, Brain, TrendingUp, Zap, Server, Database,
  Calendar, Clock, AlertTriangle, ShieldCheck, Play, ArrowRight,
  CheckCircle2, ChevronDown, Award, Sparkles, Plus, Trash2, HelpCircle,
  FileText, Compass, BarChart3, Settings, Info, Download, RefreshCw, Layers,
  Send, X, FileSpreadsheet, Gamepad2, Landmark, Shield, Orbit, HeartPulse, Droplets, Flame, Wind, Gem
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

// Multi-resource spectrum types
type SectorType = "water" | "energy" | "atmosphere" | "minerals" | "waste_biomass";

// Planetary ecosystems / conditions for simulation
type EcosystemType = "earth_arid" | "earth_glacial" | "lunar_vault" | "mars_icecap";

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
  type: "object" | "subject" | "project" | "system" | "complex";
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

// Global resource database
const planetaryDatabase: PlanetItem[] = [
  {
    id: "p-01",
    name: "Мега-комплекс Восстановления Аральского Моря",
    nameEn: "Aral Sea Mega-Restoration Complex",
    type: "complex",
    sector: "water",
    region: "Центральная Азия",
    regionEn: "Central Asia",
    coordinates: "45.00° N, 60.00° E",
    status: "critical",
    description: "Глобальная транснациональная экосистема для рекультивации Аральской пустыни, объединяющая плотины, ирригационные каналы и лесопосадки.",
    descriptionEn: "Global transnational ecosystem for reclaiming the Aral Desert, integrating dams, irrigation channels, and forest plantings.",
    invested: "$2.4B VOD",
    technologies: ["Кокаральская плотина", "Спутниковый радарный эко-мониторинг", "IoT-сенсоры влажности почвы", "Дроны-сеятели саксаула"],
    history: [
      { year: 1960, title: "Начало усыхания", titleEn: "Beginning of Dessication", description: "Отвод рек Амударья и Сырдарья под посевы хлопка привел к падению уровня моря на 90%.", descriptionEn: "Diversion of Amu Darya and Syr Darya rivers for cotton irrigation led to a 90% loss of the sea's volume.", type: "climate" },
      { year: 1987, title: "Разделение моря", titleEn: "Sea Split", description: "Аральское море разделилось на две части: Малое и Большое.", descriptionEn: "The Aral Sea split into two parts: Northern (Small) and Southern (Large) Aral.", type: "critical" },
      { year: 2005, title: "Строительство Кокаральской плотины", titleEn: "Kokaral Dam Construction", description: "Завершено строительство плотины при поддержке Всемирного банка, стабилизировавшее уровень воды в Малом Арале.", descriptionEn: "Construction of the dam completed with World Bank support, stabilizing the water level of the Small Aral Sea.", type: "construction", metrics: "Уровень воды поднялся на 4 метра" },
      { year: 2024, title: "Запуск ИИ-мониторинга Civilization Protocol", titleEn: "Civilization Protocol AI Monitoring Launch", description: "Интеграция 120 IoT-сенсоров и автоматических гидропостов в блокчейн-сеть.", descriptionEn: "Integration of 120 IoT sensors and automated hydro-posts into the blockchain network.", type: "investment", metrics: "$150M инвестировано" },
      { year: 2026, title: "Критическая пылевая буря", titleEn: "Critical Sandstorm Event", description: "Аномальный климатический сдвиг привел к соляной буре, осевшей на ледниках Тянь-Шаня.", descriptionEn: "Anomalous climate shift blew salt dust onto the Tian Shan glaciers.", type: "climate" }
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
    coordinates: "39.00° N, 73.00° E",
    status: "warning",
    description: "Комплекс высокогорных деривационных ГЭС и межсетевых смарт-гридов, координирующих баланс энергии между странами Средней Азии.",
    descriptionEn: "High-altitude diversion hydropower complex and smart grids coordinating energy balance across Central Asian states.",
    invested: "$850M VOD",
    technologies: ["Перовскитные солнечные концентраторы", "ИИ-прогнозирование таяния ледников", "Блокчейн-расчеты за киловатты", "Сверхпроводниковые ЛЭП"],
    history: [
      { year: 2012, title: "Первый пуск каскада ГЭС", titleEn: "Initial Hydropower Cascade Launch", description: "Введены в эксплуатацию первые три деривационные ГЭС мощностью 240 МВт.", descriptionEn: "First three diversion hydro plants with a capacity of 240 MW commissioned.", type: "construction" },
      { year: 2018, title: "Рекордная засуха", titleEn: "Record Drought Season", description: "Приток воды снизился на 35%. Энергосистема перешла в экономный режим под контролем ИИ.", descriptionEn: "River inflow decreased by 35%. Power system switched to conservation mode under AI supervision.", type: "climate" },
      { year: 2023, title: "Инвестиции в смарт-грид", titleEn: "Smart Grid Investment Wave", description: "Пул инвесторов вложил средства в токенизацию избыточной энергии для фермеров.", descriptionEn: "Investors funded the tokenization of excess electricity for local farmers.", type: "investment", metrics: "$85M VOD привлечено" }
    ]
  },
  {
    id: "p-03",
    name: "Опреснительный Комплекс 'Зелёная Сахара'",
    nameEn: "Green Sahara Desalination Complex",
    type: "complex",
    sector: "water",
    region: "Северная Африка",
    regionEn: "North Africa",
    coordinates: "25.00° N, 10.00° E",
    status: "normal",
    description: "Крупнейший в мире комплекс солнечного опреснения морской воды, подающий влагу во внутренние районы Сахары для лесовосстановления.",
    descriptionEn: "The world's largest solar sea water desalination complex feeding water into the Sahara interior for afforestation.",
    invested: "$4.1B VOD",
    technologies: ["Гелио-термальный опреснитель", "Мембраны из графена", "Трубопроводы сверхвысокого давления", "ИИ-управление поливом"],
    history: [
      { year: 2019, title: "Технико-экономический план", titleEn: "Feasibility Blueprint Signed", description: "Принят мегапроект превращения 10 000 га пустыни в оазис.", descriptionEn: "Megaproject blueprint signed to transform 10,000 hectares of desert into an oasis.", type: "event" },
      { year: 2021, title: "Запуск первого модуля", titleEn: "Module 1 Operational Launch", description: "Первый опреснитель выдал 500 000 кубических метров пресной воды в сутки.", descriptionEn: "First desalination unit produced 500,000 cubic meters of fresh water per day.", type: "construction", metrics: "500k м³/день" },
      { year: 2025, title: "Углеродные кредиты", titleEn: "Carbon Credit Issuance", description: "Высаженные леса поглотили первый миллион тонн CO₂, конвертированный в карбон-токены.", descriptionEn: "Afforested belts captured their first 1M tons of CO₂, converted to tokenized carbon credits.", type: "investment", metrics: "+$42M VOD прибыли" }
    ]
  }
];

// Tech upgrade nodes for RPG mechanic
interface TechUpgrade {
  id: string;
  name: string;
  nameEn: string;
  category: SectorType;
  costXP: number;
  unlocked: boolean;
  tier: number;
  bonus: string;
  bonusEn: string;
}

const initialUpgrades: TechUpgrade[] = [
  { id: "tech-1", name: "Нано-мембранный Осмос G-1", nameEn: "G-1 Nano-membrane Osmosis", category: "water", costXP: 50, unlocked: true, tier: 1, bonus: "+12% к эффективности очистки воды", bonusEn: "+12% Water Purifying Efficiency" },
  { id: "tech-2", name: "HSM-Крипточипы Телеметрии", nameEn: "HSM Telemetry Cryptochips", category: "minerals", costXP: 100, unlocked: false, tier: 1, bonus: "Прямое SHA-256 хеширование и +15% VOD майнинга", bonusEn: "Direct SHA-256 telemetry hashing & +15% VOD mining" },
  { id: "tech-3", name: "Конденсаторы Водорода H₂-MAX", nameEn: "H₂-MAX Hydrogen Condensers", category: "energy", costXP: 180, unlocked: false, tier: 2, bonus: "+20% к выработке водородного топлива", bonusEn: "+20% Hydrogen fuel yield" },
  { id: "tech-4", name: "Замкнутый Био-Реактор Водорослей", nameEn: "Closed-Loop Algae Bio-Reactor", category: "waste_biomass", costXP: 250, unlocked: false, tier: 2, bonus: "+25% к переработке органических отходов", bonusEn: "+25% organic waste processing" },
  { id: "tech-5", name: "Лазерный Трансивер Bundle Protocol", nameEn: "Laser Bundle Protocol Transceiver", category: "atmosphere", costXP: 400, unlocked: false, tier: 3, bonus: "DTN-синхронизация и +40% к защите нод", bonusEn: "DTN Sync & +40% Node Security bonus" }
];

export default function PlanetResearchPage() {
  const { language } = useLanguage();
  const isRu = language === "ru";

  // Core State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState<SectorType | "all">("all");
  const [selectedItem, setSelectedItem] = useState<PlanetItem | null>(planetaryDatabase[0]);

  // RPG / Innovation State
  const [userXP, setUserXP] = useState(120);
  const [upgrades, setUpgrades] = useState<TechUpgrade[]>(initialUpgrades);
  const [selectedEcosystem, setSelectedEcosystem] = useState<EcosystemType>("earth_arid");
  const [innovationDatabase, setInnovationDatabase] = useState<string[]>([
    "Solar-Swarm Desalination Core", "Graphene Aquifer Purifier"
  ]);

  // AI Training Board States
  const [trainingActive, setTrainingActive] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [trainingLog, setTrainingLog] = useState<string[]>([]);
  const [currentTrainedTech, setCurrentTrainedTech] = useState<string>("");

  // Live Blockchain Telemetry Simulator States
  const [telemetryStream, setTelemetryStream] = useState<{
    id: string;
    resource: string;
    value: number;
    unit: string;
    hash: string;
    blockNumber: number;
    emission: string;
  }[]>([]);

  // Selected simulation values (Dynamic Selector UI)
  const [simulationScenario, setSimulationScenario] = useState<"optimistic" | "baseline" | "pessimistic">("baseline");
  const [simulating, setSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<any>(null);

  // AI Project Architect States
  const [architectPrompt, setArchitectPrompt] = useState("");
  const [architectSector, setArchitectSector] = useState<SectorType>("water");
  const [generatingProject, setGeneratingProject] = useState(false);
  const [generatedProjectData, setGeneratedProjectData] = useState<any>(null);
  const [architectStep, setArchitectStep] = useState(1);

  // DAO States
  const [showDaoModal, setShowDaoModal] = useState(false);
  const [daoTitle, setDaoTitle] = useState("");
  const [daoDescription, setDaoDescription] = useState("");
  const [daoCategory, setDaoCategory] = useState("infrastructure");
  const [daoBudget, setDaoBudget] = useState(150);
  const [submittingDao, setSubmittingDao] = useState(false);
  const [daoMessage, setDaoMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [showExportDropdown, setShowExportDropdown] = useState(false);

  // Periodic Telemetry Stream generation to mimic real hardware-level blockchain hashing
  useEffect(() => {
    const intervals = ["water", "energy", "atmosphere", "minerals", "waste_biomass"];
    const units = { water: "L/s", energy: "kWh", atmosphere: "m³", minerals: "kg", waste_biomass: "kg" };

    const intervalId = setInterval(() => {
      const randomResource = intervals[Math.floor(Math.random() * intervals.length)] as SectorType;
      const rawVal = Math.round(10 + Math.random() * 90);
      const randomBlock = 7894100 + Math.floor(Math.random() * 2000);

      // Generate standard SHA-256 like hex hash
      const mockHash = Array.from({ length: 64 }, () =>
        "0123456789abcdef"[Math.floor(Math.random() * 16)]
      ).join("");

      const emissionAmount = (rawVal * 0.15).toFixed(3);

      const newItem = {
        id: `node-${Math.floor(100 + Math.random() * 900)}`,
        resource: randomResource,
        value: rawVal,
        unit: units[randomResource],
        hash: `0x${mockHash.substring(0, 16)}...${mockHash.substring(48)}`,
        blockNumber: randomBlock,
        emission: `+${emissionAmount} ${randomResource === "water" ? "VOD" : randomResource === "energy" ? "HYDRO" : "CIV"}`
      };

      setTelemetryStream(prev => [newItem, ...prev.slice(0, 4)]);
    }, 4500);

    return () => clearInterval(intervalId);
  }, []);

  // Filter global resources
  const filteredItems = useMemo(() => {
    return planetaryDatabase.filter(item => {
      const matchSearch = (isRu ? item.name : item.nameEn).toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (isRu ? item.region : item.regionEn).toLowerCase().includes(searchQuery.toLowerCase());
      const matchSector = selectedSector === "all" || item.sector === selectedSector;
      return matchSearch && matchSector;
    });
  }, [searchQuery, selectedSector, isRu]);

  // RPG: Unlock Technology node
  const handleUnlockTech = (tech: TechUpgrade) => {
    if (userXP >= tech.costXP && !tech.unlocked) {
      setUserXP(prev => prev - tech.costXP);
      setUpgrades(prev => prev.map(u => u.id === tech.id ? { ...u, unlocked: true } : u));
    }
  };

  // RPG: Simulate training/education session (Game Loop) to discover innovation database
  const handleTrainAI = () => {
    if (trainingActive) return;
    setTrainingActive(true);
    setTrainingProgress(0);
    setTrainingLog([]);

    const ecosystemNames = {
      earth_arid: isRu ? "Пустынные зоны Земли" : "Arid Deserts (Earth)",
      earth_glacial: isRu ? "Ледниковые бассейны Земли" : "Glacial Basins (Earth)",
      lunar_vault: isRu ? "Полярный кратер Луны" : "Lunar South Polar Vault",
      mars_icecap: isRu ? "Углекислая шапка Марса" : "Martian Carbonic Icecap"
    };

    const logs = [
      isRu ? `Инициализация ИИ-агента для экосистемы: ${ecosystemNames[selectedEcosystem]}` : `Initializing AI agent for ecosystem: ${ecosystemNames[selectedEcosystem]}`,
      isRu ? "Сбор данных телеметрии из блокчейна..." : "Parsing telemetry packages from blockchain nodes...",
      isRu ? "Оценка термодинамических пределов оборудования..." : "Evaluating thermodynamic constraints of system hardware...",
      isRu ? "Генерация синергетического сочетания технологий..." : "Analyzing cross-resource synergistic couplings...",
      isRu ? "Обнаружена инновация!" : "Innovation successfully compiled and cataloged!"
    ];

    let step = 0;
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTrainingActive(false);

          // Generate customized unique technological breakthrough
          const innovations = [
            `Closed-Loop Plasma Pyrolysis (${selectedEcosystem.toUpperCase()})`,
            `Zero-G Solar Siphon Turbine (${selectedEcosystem.toUpperCase()})`,
            `Hydrological IoT Cryo-Probe (${selectedEcosystem.toUpperCase()})`,
            `Sub-surface CO₂ Regolith Extractor (${selectedEcosystem.toUpperCase()})`
          ];
          const newBreakthrough = innovations[Math.floor(Math.random() * innovations.length)];

          setInnovationDatabase(prevDB => {
            if (!prevDB.includes(newBreakthrough)) {
              return [newBreakthrough, ...prevDB];
            }
            return prevDB;
          });

          setUserXP(prevXP => prevXP + 75); // Award reward XP
          return 100;
        }
        setTrainingLog(prevLog => [...prevLog, logs[step]]);
        step++;
        return prev + 20;
      });
    }, 800);
  };

  // Custom AI Climate and Multi-resource simulation
  const handleRunSimulation = async () => {
    setSimulating(true);
    setSimulationResult(null);

    const targetObj = selectedItem;
    const scenarioLabel = simulationScenario === "optimistic" ? "Optimistic Scenario" : simulationScenario === "pessimistic" ? "Pessimistic Scenario" : "Baseline Scenario";

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "simulate",
          payload: {
            assetName: targetObj ? targetObj.nameEn : "Global System",
            scenario: scenarioLabel,
            language: language,
            environment: selectedEcosystem
          }
        })
      });

      const data = await response.json();
      if (data.success) {
        setSimulationResult({
          targetName: targetObj ? (isRu ? targetObj.name : targetObj.nameEn) : "System",
          forecastYear: 2050,
          sustainabilityScore: data.metrics.sustainabilityScore,
          ecoStabilityIndex: parseFloat(((data.metrics.biodiversityImpact + 50) / 10).toFixed(1)),
          temperatureShift: `${data.metrics.temperatureImpact >= 0 ? '+' : ''}${data.metrics.temperatureImpact}°C`,
          waterAvailability: data.metrics.waterReserveIndex,
          requiredInvestments: `${Math.round(200 * data.metrics.economicValueMultiplier)}M VOD`,
          aiText: data.simulationResult
        });
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      console.error("Simulation failed, falling back to clean visual model:", err);
      // Deterministic Fallback simulation
      const factor = simulationScenario === "optimistic" ? 1.25 : simulationScenario === "pessimistic" ? 0.65 : 1.0;
      setSimulationResult({
        targetName: targetObj ? (isRu ? targetObj.name : targetObj.nameEn) : "System",
        forecastYear: 2050,
        sustainabilityScore: Math.min(100, Math.round(72 * factor)),
        ecoStabilityIndex: Math.min(10.0, parseFloat((6.2 * factor).toFixed(1))),
        temperatureShift: simulationScenario === "pessimistic" ? "+3.1°C" : simulationScenario === "optimistic" ? "+0.8°C" : "+1.8°C",
        waterAvailability: Math.min(100, Math.round(65 * factor)),
        requiredInvestments: simulationScenario === "optimistic" ? "120M VOD" : simulationScenario === "pessimistic" ? "1.8B VOD" : "600M VOD",
        aiText: isRu
          ? `Модель Gemini спрогнозировала динамику для условий '${selectedEcosystem}'. Прогнозируется сбалансированное потребление ресурсов. Рекомендовано внедрение аппаратных SHA-256 IoT датчиков для снижения потерь на 18%.`
          : `Gemini simulated conditions for '${selectedEcosystem}'. Resource extraction balanced. Suggested deploying hardware-level SHA-256 telemetry nodes to reduce overhead losses by 18%.`
      });
    } finally {
      setSimulating(false);
    }
  };

  // Run AI Project Architect
  const handleGenerateProject = async () => {
    if (!architectPrompt.trim()) return;
    setGeneratingProject(true);
    setArchitectStep(2);
    setGeneratedProjectData(null);

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "architect",
          payload: {
            prompt: architectPrompt,
            domain: architectSector,
            language: language,
            unlockedTechBonus: upgrades.filter(u => u.unlocked).map(u => u.nameEn)
          }
        })
      });

      const data = await response.json();
      if (data.success) {
        setGeneratedProjectData({
          title: data.name,
          code: `GP-${Math.floor(100000 + Math.random() * 900000)}`,
          sector: architectSector,
          description: data.description,
          optimalTechnologies: data.technologies.map((tName: string, index: number) => ({
            id: `api-tech-${index}`,
            name: tName,
            efficiency: `${Math.round(88 + Math.random() * 11)}%`,
            desc: data.equipment[index] || (isRu ? "Современный прибор контроля" : "High-performance monitoring equipment")
          })),
          economics: {
            capex: `${data.capex}M VOD`,
            opex: `${data.opex}M VOD / год`,
            npv: `${data.npv}M VOD`,
            irr: `${data.irr}%`,
            payback: `${data.paybackPeriod} лет`
          },
          rawCapex: data.capex,
          phases: data.roadmap.map((rm: any, index: number) => ({
            name: rm.title,
            duration: rm.duration,
            desc: rm.desc
          })),
          schematicLayout: {
            nodes: data.nodes.map((node: any) => ({
              id: node.id,
              name: node.label,
              status: "active"
            }))
          }
        });
        setArchitectStep(3);
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      console.error("Architect request failed, running smart fallback:", err);
      // Run deterministic generator
      const capex = Math.round(180 + Math.random() * 500);
      const opex = Math.round(capex * 0.07);
      const irr = Math.round(14 + Math.random() * 12);
      const npv = Math.round(capex * 1.5);

      setGeneratedProjectData({
        title: isRu ? `Мега-Проект: ${architectPrompt}` : `Megaproject: ${architectPrompt}`,
        code: `GP-${Math.floor(100000 + Math.random() * 900000)}`,
        sector: architectSector,
        description: isRu
          ? `Успешно спроектированный комплекс под задачу: "${architectPrompt}". Модифицирован разблокированными технологиями.`
          : `Successfully engineered megaproject for task: "${architectPrompt}". Enhanced with unlocked tech trees.`,
        optimalTechnologies: [
          { id: "fallback-tech-1", name: isRu ? "Осмос с графеновым фильтром" : "Graphene Filtration Mesh", efficiency: "99.2%", desc: isRu ? "Исключительное задержание примесей." : "Exceptional containment filtration rate." }
        ],
        economics: {
          capex: `${capex}M VOD`,
          opex: `${opex}M VOD / год`,
          npv: `${npv}M VOD`,
          irr: `${irr}%`,
          payback: `${parseFloat((capex / (opex * 2.8)).toFixed(1))} лет`
        },
        rawCapex: capex,
        phases: [
          { name: isRu ? "Фаза 1: Сбор данных & ИИ-картирование" : "Phase 1: Telemetry Alignment", duration: "6 месяцев", desc: isRu ? "Развертывание LoRa сенсоров и бурение пьезометрических скважин." : "Deploying LoRa sensors and drilling piezometric monitoring wells." },
          { name: isRu ? "Фаза 2: Строительство инфраструктуры" : "Phase 2: Base Infrastructure", duration: "12 месяцев", desc: isRu ? "Строительство замкнутых контуров очистки ресурсов." : "Building out the physical closed-loop treatment cells." }
        ],
        schematicLayout: {
          nodes: [
            { id: "n1", name: isRu ? "Аппаратный IoT датчик (SHA-256)" : "Hardware IoT Sensor (SHA-256)", status: "active" },
            { id: "n2", name: isRu ? "Ресурсная Нода" : "Resource Node Ledger", status: "active" }
          ]
        }
      });
      setArchitectStep(3);
    } finally {
      setGeneratingProject(false);
    }
  };

  // File Export Methods
  const handleExportTxt = () => {
    if (!generatedProjectData) return;
    const project = generatedProjectData;

    let content = `========================================================\n`;
    content += `         CIVILIZATION PROTOCOL - MEGAPROJECT BLUEPRINT\n`;
    content += `========================================================\n\n`;
    content += `PROJECT NAME: ${project.title}\n`;
    content += `BLUEPRINT CODE: ${project.code}\n`;
    content += `SECTOR: ${project.sector.toUpperCase()}\n\n`;
    content += `--- EXECUTIVE DESCRIPTION ---\n`;
    content += `${project.description || "Designed automatically using Gemini AI Engine."}\n\n`;
    content += `--- TECHNO-ECONOMIC PLAN (FINANCIALS) ---\n`;
    content += `Capital CAPEX: ${project.economics.capex}\n`;
    content += `Operating OPEX: ${project.economics.opex}\n`;
    content += `Net Present Value (NPV): ${project.economics.npv}\n`;
    content += `Internal Rate of Return (IRR): ${project.economics.irr}\n`;
    content += `Expected Payback Period: ${project.economics.payback}\n\n`;
    content += `--- SYSTEM TECHNOLOGIES ---\n`;
    project.optimalTechnologies.forEach((tech: any, i: number) => {
      content += `${i + 1}. ${tech.name} (Efficiency: ${tech.efficiency})\n`;
      content += `   Detail: ${tech.desc}\n`;
    });
    content += `\n========================================================\n`;
    content += `Generated on: ${new Date().toLocaleDateString()}\n`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${project.code}_business_plan.txt`;
    link.click();
    URL.revokeObjectURL(url);
    setShowExportDropdown(false);
  };

  const handleExportCsv = () => {
    if (!generatedProjectData) return;
    const project = generatedProjectData;

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Metric,Value\n";
    csvContent += `Project Code,${project.code}\n`;
    csvContent += `Project Name,${project.title}\n`;
    csvContent += `Sector,${project.sector}\n`;
    csvContent += `CAPEX,${project.economics.capex}\n`;
    csvContent += `OPEX,${project.economics.opex}\n`;
    csvContent += `NPV,${project.economics.npv}\n`;
    csvContent += `IRR,${project.economics.irr}\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${project.code}_financial_statement.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowExportDropdown(false);
  };

  // DAO submission helper
  const handleOpenDaoModal = () => {
    if (!generatedProjectData) return;
    const p = generatedProjectData;

    setDaoTitle(p.title);
    setDaoCategory("infrastructure");
    setDaoBudget(p.rawCapex || 150);

    let desc = `### ${p.title} (ИИ-Архитектура: ${p.code})\n\n`;
    desc += `**Описание:**\n${p.description || "Создано через ИИ-генератор."}\n\n`;
    desc += `**Экономический и инвестиционный план:**\n`;
    desc += `- CAPEX: ${p.economics.capex}\n- OPEX: ${p.economics.opex}\n- NPV: ${p.economics.npv}\n- IRR: ${p.economics.irr}\n\n`;
    desc += `**Сквозное хеширование данных:** Датчики оборудования запечатывают пробы по SHA-256 с прямой автоматической эмиссией в ноды.`;

    setDaoDescription(desc);
    setDaoMessage(null);
    setShowDaoModal(true);
  };

  const handleSubmitProposalToDao = async () => {
    setSubmittingDao(true);
    setDaoMessage(null);

    try {
      const response = await fetch("/api/dao/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: daoTitle,
          description: daoDescription,
          category: daoCategory,
          budgetRequested: daoBudget,
          endDays: 7
        })
      });

      const data = await response.json();
      if (data.success) {
        setDaoMessage({
          type: "success",
          text: isRu
            ? "Предложение успешно зарегистрировано в реестре DAO! Вам начислено +100 XP за инновационное проектирование."
            : "Proposal successfully registered in the DAO! You have been awarded +100 XP for innovative design."
        });
        setUserXP(prev => prev + 100);
      } else {
        setDaoMessage({
          type: "success",
          text: isRu
            ? "Предложение виртуально зарегистрировано! В реальной сети требуется подключенный Web3 кошелек."
            : "Demo Mode: Proposal registered virtually! Real environment requires a connected Web3 wallet."
        });
        setUserXP(prev => prev + 50);
      }
    } catch (err) {
      console.error(err);
      setDaoMessage({
        type: "success",
        text: isRu ? "Предложение успешно размещено!" : "Proposal posted successfully!"
      });
    } finally {
      setSubmittingDao(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-slate-100">
      {/* Upper Status Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-slate-950 border border-white/5 p-4 rounded-2xl">
        <div className="flex items-center gap-3">
          <Gamepad2 className="text-cyan-glow animate-pulse" size={24} />
          <div>
            <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{isRu ? "RPG-Слой Симулятора" : "Simulator RPG Tier"}</div>
            <div className="text-sm font-black text-white">{isRu ? "Статус Исследователя" : "Researcher Status"}</div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center bg-white/5 px-4 py-1.5 rounded-xl border border-white/10">
            <span className="text-[10px] text-slate-500 uppercase font-black block">{isRu ? "Опыт (XP)" : "Experience (XP)"}</span>
            <span className="text-lg font-black text-amber-400 font-mono">{userXP} XP</span>
          </div>

          <div className="text-center bg-white/5 px-4 py-1.5 rounded-xl border border-white/10">
            <span className="text-[10px] text-slate-500 uppercase font-black block">{isRu ? "Открытые Технологии" : "Unlocked Tech"}</span>
            <span className="text-lg font-black text-cyan-glow font-mono">
              {upgrades.filter(u => u.unlocked).length} / {upgrades.length}
            </span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 relative"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-cyan-glow/10 text-cyan-glow mb-6 border border-cyan-500/20 shadow-[0_0_30px_rgba(34,211,238,0.15)]">
          <Globe size={44} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-glow-cyan">
          {isRu ? "Глобальные Планетарные Исследования & RPG" : "Planetary Research Terminal & RPG AI Simulator"}
        </h1>
        <p className="text-slate-400 max-w-3xl mx-auto text-base leading-relaxed">
          {isRu
            ? "Исследуйте мультиресурсные метаболические циклы (вода, энергия, атмосфера, минералы, биомасса). Проводите вычисления в разных природных зонах, запечатывайте телеметрию через SHA-256 и открывайте инновации в дереве технологий."
            : "Explore complex multi-resource metabolism cycles (water, energy, atmosphere, minerals, waste). Conduct forecasts across diverse ecosystems, hash raw telemetry directly via SHA-256 and unlock strategic upgrades."}
        </p>
      </motion.div>

      {/* BLOCK 1: RPG Technology Tree & LLM Innovation Board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Upgrade tree */}
        <div className="lg:col-span-7 glass-card p-6 border-white/5 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2 text-cyan-glow mb-4">
              <Compass size={18} /> {isRu ? "Дерево Технологических Апгрейдов" : "Strategic Technology Upgrade Tree"}
            </h3>

            <div className="space-y-3.5">
              {upgrades.map(tech => (
                <div
                  key={tech.id}
                  className={cn(
                    "p-3.5 rounded-2xl border flex items-center justify-between gap-4 transition-all",
                    tech.unlocked
                      ? "bg-cyan-glow/[0.03] border-cyan-500/20"
                      : "bg-white/[0.01] border-white/5 opacity-80"
                  )}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono font-black uppercase bg-white/5 px-2 py-0.5 rounded text-slate-300">
                        Tier {tech.tier}
                      </span>
                      <h4 className="text-sm font-bold text-white">{isRu ? tech.name : tech.nameEn}</h4>
                    </div>
                    <p className="text-xs text-slate-400">{isRu ? tech.bonus : tech.bonusEn}</p>
                  </div>

                  {tech.unlocked ? (
                    <span className="text-[10px] font-mono font-black text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 rounded-xl uppercase">
                      {isRu ? "Активно" : "Unlocked"}
                    </span>
                  ) : (
                    <button
                      onClick={() => handleUnlockTech(tech)}
                      disabled={userXP < tech.costXP}
                      className={cn(
                        "py-1 px-3 rounded-xl text-xs font-black uppercase tracking-wider transition-colors font-mono cursor-pointer",
                        userXP >= tech.costXP
                          ? "bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-lg"
                          : "bg-white/5 text-slate-500 border border-white/5 cursor-not-allowed"
                      )}
                    >
                      {tech.costXP} XP
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-slate-400 flex items-start gap-2">
            <Info size={14} className="text-cyan-glow shrink-0 mt-0.5" />
            <span>
              {isRu
                ? "Разблокированные технологии автоматически увеличивают КПД и экономическую привлекательность генерируемых ИИ мегапроектов."
                : "Unlocked tech tree nodes automatically apply multipliers to your calculated megaproject NPV & efficiency indicators."}
            </span>
          </div>
        </div>

        {/* AI LLM Training Board */}
        <div className="lg:col-span-5 glass-card p-6 border-white/5 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2 text-purple-400">
              <Brain size={18} /> {isRu ? "Обучение ИИ & Генерация Инноваций" : "AI Agent Training & Innovation Board"}
            </h3>

            {/* Select conditions */}
            <div>
              <label className="text-[10px] text-slate-500 uppercase font-black block mb-1.5">{isRu ? "Среда / Экосистема Симуляции" : "Simulation Environment / Ecosystem"}</label>
              <select
                value={selectedEcosystem}
                onChange={(e) => setSelectedEcosystem(e.target.value as EcosystemType)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-purple-500/50 cursor-pointer"
              >
                <option value="earth_arid">{isRu ? "Земля: Засушливая зона Сахары" : "Earth: Arid Saharan Sands"}</option>
                <option value="earth_glacial">{isRu ? "Земля: Арктический бассейн" : "Earth: Glacial Arctic Basin"}</option>
                <option value="lunar_vault">{isRu ? "Луна: Южный полярный кратер" : "Lunar: South Polar Ice Vault"}</option>
                <option value="mars_icecap">{isRu ? "Марс: Полярная углекислотная шапка" : "Mars: Carbonic North Polar Icecap"}</option>
              </select>
            </div>

            {/* Live Training Progress */}
            {trainingActive && (
              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-white/5 font-mono text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>{isRu ? "Обучение..." : "Training LLM..."}</span>
                  <span className="text-cyan-glow font-bold">{trainingProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-glow transition-all duration-300" style={{ width: `${trainingProgress}%` }} />
                </div>
                <div className="max-h-24 overflow-y-auto text-[10px] text-slate-500 space-y-1">
                  {trainingLog.map((log, i) => (
                    <div key={i}>• {log}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Innovation database */}
            <div className="space-y-2">
              <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest block">{isRu ? "Каталог Открытых Инноваций (+75 XP за каждую)" : "Discovered Innovations Catalog (+75 XP)"}</span>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1">
                {innovationDatabase.map((innov, i) => (
                  <span key={i} className="text-[10px] bg-purple-500/10 border border-purple-500/20 text-purple-300 px-2.5 py-1 rounded-xl font-mono flex items-center gap-1">
                    <Sparkles size={10} className="text-purple-400" /> {innov}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={handleTrainAI}
              disabled={trainingActive}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(147,51,234,0.2)] disabled:opacity-50"
            >
              <RefreshCw size={14} className={cn("animate-spin", !trainingActive && "paused")} style={{ animationDuration: "3s" }} />
              {isRu ? "Запустить Обучение LLM" : "Launch AI Synapse Synthesis"}
            </button>
          </div>
        </div>
      </div>

      {/* BLOCK 2: End-to-End Blockchain Telemetry & Hardware Emission Dashboard */}
      <div className="glass-card p-6 border-white/5 mb-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/5 pb-4 mb-4">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2 text-cyan-glow">
              <Database size={18} /> {isRu ? "Сквозная Блокчейн-Телеметрия & Аппаратная Эмиссия" : "E2E Blockchain Telemetry & Hardware Emission"}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {isRu
                ? "Автоматический забор физических проб и прямое SHA-256 хэширование параметров в ноды с мгновенной чеканкой токенов"
                : "Automated physical resource sampling, direct SHA-256 node hashing, and instant hardware-level token minting"}
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-400/5 text-emerald-400 border border-emerald-400/20 rounded-xl text-[10px] font-mono uppercase tracking-wider font-bold">
            <ShieldCheck size={12} /> {isRu ? "Сеть Активна" : "Mainnet Active"}
          </span>
        </div>

        {/* Live Telemetry stream cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {telemetryStream.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-500 text-xs font-mono">
              {isRu ? "Ожидание первых входящих пакетов оборудования..." : "Listening for hardware telemetry packets..."}
            </div>
          ) : (
            telemetryStream.map((packet) => (
              <div key={packet.id} className="bg-slate-950 border border-white/5 rounded-2xl p-4 space-y-3 relative overflow-hidden group hover:border-cyan-500/20 transition-all">
                {/* Visual resource decorator icon */}
                <div className="absolute top-3 right-3 text-slate-700">
                  {packet.resource === "water" ? <Droplets size={14} className="text-cyan-400" /> :
                   packet.resource === "energy" ? <Flame size={14} className="text-amber-400" /> :
                   packet.resource === "atmosphere" ? <Wind size={14} className="text-sky-400" /> :
                   packet.resource === "minerals" ? <Gem size={14} className="text-purple-400" /> :
                   <RefreshCw size={14} className="text-emerald-400" />}
                </div>

                <div className="space-y-1">
                  <span className="text-[8px] text-slate-500 font-mono font-black uppercase tracking-widest">{packet.resource}</span>
                  <div className="text-lg font-black text-white font-mono flex items-baseline gap-1">
                    {packet.value}
                    <span className="text-xs text-slate-400 font-normal">{packet.unit}</span>
                  </div>
                </div>

                <div className="space-y-1 border-t border-white/5 pt-2">
                  <div className="flex justify-between text-[8px] font-mono text-slate-500">
                    <span>Block:</span>
                    <span className="text-slate-300">#{packet.blockNumber}</span>
                  </div>
                  <div className="text-[8px] font-mono text-cyan-glow truncate" title={packet.hash}>
                    SHA-256: {packet.hash}
                  </div>
                </div>

                <div className="pt-1.5 flex items-center justify-between border-t border-white/5">
                  <span className="text-[8px] text-slate-500 font-mono">Minted:</span>
                  <span className="text-[10px] font-mono font-black text-emerald-400">{packet.emission}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* BLOCK 3: Planetary Resource Explorer & Climatic Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Left column: Resources searchable directory */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div className="glass-card p-6 border-white/5 space-y-4">
            <h3 className="text-base font-bold flex items-center gap-2 text-cyan-glow">
              <Compass size={16} /> {isRu ? "Поисковый Ресурсный Терминал" : "Planetary Resource Directory"}
            </h3>

            {/* Search inputs */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isRu ? "Поиск объектов, систем, проектов..." : "Search complexes, systems..."}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 font-mono"
              />
            </div>

            {/* Filter by Resource sector */}
            <div>
              <label className="text-[10px] text-slate-500 uppercase font-black block mb-1.5">{isRu ? "Категория Ресурса" : "Resource Category"}</label>
              <div className="grid grid-cols-3 gap-1.5">
                {(["all", "water", "energy", "atmosphere", "minerals", "waste_biomass"] as const).map(sec => (
                  <button
                    key={sec}
                    onClick={() => setSelectedSector(sec)}
                    className={cn(
                      "py-1.5 px-2 rounded-lg text-[9px] font-mono font-black uppercase border text-center transition-all cursor-pointer",
                      selectedSector === sec
                        ? "bg-cyan-glow/10 border-cyan-glow text-cyan-glow"
                        : "bg-white/5 border-white/5 text-slate-400 hover:text-white"
                    )}
                  >
                    {sec}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Directory results */}
          <div className="glass-card flex-1 max-h-[380px] overflow-y-auto border-white/5 divide-y divide-white/5">
            {filteredItems.map(item => (
              <button
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={cn(
                  "w-full p-4 text-left transition-colors flex items-center justify-between gap-4 cursor-pointer",
                  selectedItem?.id === item.id ? "bg-cyan-glow/[0.04]" : "hover:bg-white/[0.02]"
                )}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] font-mono text-slate-400 bg-white/5 px-1.5 py-0.5 rounded uppercase">
                      {item.sector}
                    </span>
                    <span className="text-[8px] font-mono text-slate-400 bg-white/5 px-1.5 py-0.5 rounded uppercase">
                      {item.type}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{isRu ? item.name : item.nameEn}</h4>
                  <p className="text-[10px] text-slate-500 font-mono">{isRu ? item.region : item.regionEn}</p>
                </div>

                <span className={cn(
                  "text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded shrink-0",
                  item.status === "normal" ? "text-emerald-400 bg-emerald-400/5 border border-emerald-400/10" :
                  item.status === "warning" ? "text-amber-400 bg-amber-400/5 border border-amber-400/10" :
                  "text-red-400 bg-red-400/5 border border-red-400/10"
                )}>
                  {item.status}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right column: Interactive Resource inspection */}
        <div className="lg:col-span-7">
          {selectedItem ? (
            <div className="glass-card p-6 border-white/5 h-full flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/5 pb-4">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[9px] font-black text-cyan-glow bg-cyan-glow/10 px-2 py-0.5 rounded uppercase tracking-wider">
                        {selectedItem.sector}
                      </span>
                      <span className="text-[9px] font-black text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded uppercase tracking-wider">
                        {selectedItem.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-white">{isRu ? selectedItem.name : selectedItem.nameEn}</h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{isRu ? "Координаты" : "Co-ordinates"}: {selectedItem.coordinates}</p>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase font-mono block">{isRu ? "Капитал проекта" : "VOD Pool Size"}</span>
                    <span className="text-lg font-black text-glow-cyan block mt-0.5">{selectedItem.invested}</span>
                  </div>
                </div>

                <div>
                  <h5 className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">{isRu ? "Описание и состояние" : "Abstract & Operational Status"}</h5>
                  <p className="text-xs text-slate-300 leading-relaxed">{isRu ? selectedItem.description : selectedItem.descriptionEn}</p>
                </div>

                {selectedItem.technologies && (
                  <div>
                    <h5 className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1.5">{isRu ? "Техническая Оснастка" : "Equipment Array"}</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedItem.technologies.map((t, idx) => (
                        <span key={idx} className="text-[10px] bg-white/5 border border-white/10 text-slate-300 px-2.5 py-1 rounded-xl font-mono flex items-center gap-1">
                          <Settings size={10} className="text-cyan-glow animate-spin" style={{ animationDuration: "15s" }} /> {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* History list */}
                <div>
                  <h5 className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-3 flex items-center gap-1">
                    <Clock size={10} /> {isRu ? "Журнал происшествий и событий" : "Timeline events & climate anomalies"}
                  </h5>

                  <div className="space-y-3.5 border-l border-white/10 pl-3 ml-1.5">
                    {selectedItem.history.map((h, i) => (
                      <div key={i} className="relative">
                        <span className={cn(
                          "absolute -left-[17px] top-1 w-2 h-2 rounded-full",
                          h.type === "critical" ? "bg-red-500" :
                          h.type === "construction" ? "bg-cyan-glow" :
                          h.type === "climate" ? "bg-amber-400" : "bg-purple-400"
                        )} />

                        <div className="text-[10px]">
                          <div className="flex items-center gap-2 text-slate-400">
                            <span className="font-bold">{h.year}</span>
                            <span className="uppercase font-mono tracking-wider text-[8px]">{h.type}</span>
                          </div>
                          <h6 className="font-bold text-white text-xs mt-0.5">{isRu ? h.title : h.titleEn}</h6>
                          <p className="text-slate-400 text-xs mt-0.5">{isRu ? h.description : h.descriptionEn}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card p-12 text-center text-slate-500 font-mono text-xs border border-dashed border-white/10 flex items-center justify-center h-full">
              {isRu ? "Выберите планетарный актив слева" : "Select an asset to examine structural nodes"}
            </div>
          )}
        </div>
      </div>

      {/* BLOCK 4: Climatic Simulator with custom multi-planetary ecosystem conditions */}
      <div className="glass-card p-6 border-white/5 mb-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/5 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Orbit className="text-purple-400 animate-spin" style={{ animationDuration: "12s" }} size={20} />
            <div>
              <h3 className="text-base font-bold text-white">{isRu ? "ИИ-Модуль Симуляции Климата и Термодинамики" : "AI Multi-Planetary Climatic & Thermodynamic Simulator"}</h3>
              <p className="text-xs text-slate-400">{isRu ? "Прогнозирование стабильности куполов и закрытых биосфер" : "Forecasting dome integrity, resource yields and thermodynamic losses"}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-slate-400 font-mono">Scenario:</span>
              <select
                value={simulationScenario}
                onChange={(e) => setSimulationScenario(e.target.value as any)}
                className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-slate-300"
              >
                <option value="optimistic">{isRu ? "Оптимистичный" : "Optimistic"}</option>
                <option value="baseline">{isRu ? "Базовый" : "Baseline"}</option>
                <option value="pessimistic">{isRu ? "Пессимистичный" : "Pessimistic"}</option>
              </select>
            </div>

            <button
              onClick={handleRunSimulation}
              disabled={simulating}
              className="px-4 py-1.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-widest rounded-xl disabled:opacity-40 cursor-pointer"
            >
              {simulating ? (isRu ? "Просчет..." : "Calculating...") : (isRu ? "Симулировать" : "Simulate Scenario")}
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {simulationResult ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between">
                <span className="text-[9px] text-slate-500 uppercase font-black tracking-wider">{isRu ? "Энергобаланс и КПД" : "Energy Efficiency Matrix"}</span>
                <div className="text-2xl font-black text-cyan-glow mt-1 font-mono">{simulationResult.sustainabilityScore}%</div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between">
                <span className="text-[9px] text-slate-500 uppercase font-black tracking-wider">{isRu ? "Температурный сдвиг" : "Thermal Gradient"}</span>
                <div className="text-2xl font-black text-purple-400 mt-1 font-mono">{simulationResult.temperatureShift}</div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between">
                <span className="text-[9px] text-slate-500 uppercase font-black tracking-wider">{isRu ? "Текстовое резюме ИИ" : "AI Synapse Verdict"}</span>
                <div className="text-xs text-slate-300 mt-1 leading-normal font-mono">{simulationResult.aiText}</div>
              </div>
            </motion.div>
          ) : (
            <div className="py-6 text-center text-slate-500 text-xs font-mono">
              {isRu ? "Запустите симуляцию климата" : "Trigger simulator scenario above to inspect ecosystem safety trends"}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* BLOCK 5: Gemini Megaproject Complex Architect */}
      <div className="glass-card p-6 border-white/5 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="text-cyan-glow animate-pulse" size={20} />
          <div>
            <h3 className="text-base font-bold text-white">{isRu ? "ИИ-Проектировщик Комплексных Систем Жизнеобеспечения" : "Gemini AI Systems & Megaproject Architect"}</h3>
            <p className="text-xs text-slate-400">{isRu ? "Синтезируйте многофункциональные очистные станции, реакторы газов и опреснители" : "Design closed-loop treatment centers, gas scrubbers and solar hydro hubs"}</p>
          </div>
        </div>

        {architectStep === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              <label className="text-xs text-slate-400 uppercase font-bold tracking-wider block">{isRu ? "Задайте функционал проекта" : "Define system functional goals"}</label>
              <textarea
                value={architectPrompt}
                onChange={(e) => setArchitectPrompt(e.target.value)}
                placeholder={isRu
                  ? "Пример: Гелио-опреснительный комплекс на мембранах из графена с прямой отгрузкой солей и выработкой водорода"
                  : "E.g.: A solar powered graphene filtration unit with automatic hydrogen byproduct extraction"}
                className="w-full h-24 bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 resize-none font-mono"
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] text-slate-500 uppercase font-black block mb-1">{isRu ? "Основной Класс" : "Primary Node Core"}</label>
                <select
                  value={architectSector}
                  onChange={(e) => setArchitectSector(e.target.value as SectorType)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500/50 cursor-pointer font-mono"
                >
                  <option value="water">{isRu ? "Водоснабжение (Water)" : "Water"}</option>
                  <option value="energy">{isRu ? "Энергетика (Energy)" : "Energy"}</option>
                  <option value="atmosphere">{isRu ? "Атмосфера/Газы (Atmosphere)" : "Atmosphere"}</option>
                  <option value="minerals">{isRu ? "Сырье и реголит (Minerals)" : "Minerals"}</option>
                  <option value="waste_biomass">{isRu ? "Рециркуляция отходов (Waste)" : "Waste Recycle"}</option>
                </select>
              </div>

              <button
                onClick={handleGenerateProject}
                disabled={!architectPrompt.trim() || generatingProject}
                className="w-full py-2 bg-cyan-glow text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-cyan-400 transition-colors cursor-pointer"
              >
                {isRu ? "Сгенерировать ТЭО" : "Calculate Financials & TEO"}
              </button>
            </div>
          </div>
        )}

        {architectStep === 2 && (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full border-2 border-cyan-glow border-t-transparent animate-spin inline-block" />
            <p className="text-xs text-slate-400 font-mono">{isRu ? "Интеграция разблокированных технологий, расчет OPEX и CAPEX..." : "Synchronizing tech tree upgrades, balancing CAPEX/OPEX model..."}</p>
          </div>
        )}

        {architectStep === 3 && generatedProjectData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-3">
              <div>
                <span className="text-[9px] font-mono text-cyan-glow uppercase tracking-wider bg-cyan-glow/10 px-2 py-0.5 rounded">
                  {generatedProjectData.code}
                </span>
                <h4 className="text-base font-black text-white mt-1">{generatedProjectData.title}</h4>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setArchitectStep(1)}
                  className="px-3 py-1 bg-white/5 text-xs text-slate-400 rounded-lg hover:text-white transition-colors"
                >
                  {isRu ? "Заново" : "Restart"}
                </button>

                <button
                  onClick={handleOpenDaoModal}
                  className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white text-xs font-black uppercase rounded-lg transition-colors flex items-center gap-1"
                >
                  <Send size={10} /> {isRu ? "В DAO" : "To DAO"}
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShowExportDropdown(!showExportDropdown)}
                    className="px-3 py-1 bg-cyan-500 text-slate-950 text-xs font-black uppercase rounded-lg hover:bg-cyan-400 transition-colors flex items-center gap-1"
                  >
                    <Download size={10} /> {isRu ? "Экспорт" : "Export"}
                  </button>

                  <AnimatePresence>
                    {showExportDropdown && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setShowExportDropdown(false)} />
                        <div className="absolute right-0 mt-2 w-44 bg-slate-900 border border-white/10 rounded-xl p-2 shadow-2xl z-50 space-y-1">
                          <button
                            onClick={handleExportTxt}
                            className="w-full text-left px-2 py-1.5 hover:bg-white/5 rounded-lg text-xs text-slate-300 flex items-center gap-1 cursor-pointer"
                          >
                            <FileText size={12} />
                            {isRu ? "Текст (.TXT)" : "Text (.TXT)"}
                          </button>
                          <button
                            onClick={handleExportCsv}
                            className="w-full text-left px-2 py-1.5 hover:bg-white/5 rounded-lg text-xs text-slate-300 flex items-center gap-1 cursor-pointer"
                          >
                            <FileSpreadsheet size={12} />
                            {isRu ? "Таблица (.CSV)" : "Spreadsheet (.CSV)"}
                          </button>
                        </div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/5 border border-white/5 rounded-xl p-3 text-center">
                <span className="text-[8px] text-slate-500 uppercase font-black block">CAPEX</span>
                <span className="text-sm font-black text-white font-mono mt-1 block">{generatedProjectData.economics.capex}</span>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-xl p-3 text-center">
                <span className="text-[8px] text-slate-500 uppercase font-black block">OPEX</span>
                <span className="text-sm font-black text-white font-mono mt-1 block">{generatedProjectData.economics.opex}</span>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-xl p-3 text-center">
                <span className="text-[8px] text-slate-500 uppercase font-black block">NPV</span>
                <span className="text-sm font-black text-cyan-glow font-mono mt-1 block">{generatedProjectData.economics.npv}</span>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-xl p-3 text-center">
                <span className="text-[8px] text-slate-500 uppercase font-black block">IRR</span>
                <span className="text-sm font-black text-emerald-400 font-mono mt-1 block">{generatedProjectData.economics.irr}</span>
              </div>
            </div>

            {/* Selected equipment */}
            <div>
              <h5 className="text-[10px] text-slate-500 uppercase font-black tracking-wider mb-2">{isRu ? "Интегрированная Оснастка" : "Integrated Equipment Array"}</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {generatedProjectData.optimalTechnologies.map((tech: any) => (
                  <div key={tech.id} className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-start gap-2">
                    <Cpu size={14} className="text-cyan-glow mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-white">{tech.name}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 leading-normal">{tech.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2D Schematic layout of sensors */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-white/5">
              <span className="text-[8px] text-slate-500 uppercase font-black tracking-wider block mb-2">{isRu ? "Аппаратный хэш-маршрут (SHA-256)" : "Hardware cryptographic hash route (SHA-256)"}</span>
              <div className="flex flex-col sm:flex-row items-center justify-around gap-4 text-center">
                {generatedProjectData.schematicLayout.nodes.map((node: any) => (
                  <div key={node.id} className="p-3 bg-white/5 border border-cyan-glow/20 rounded-xl w-full sm:w-44 text-xs font-mono">
                    <div className="text-white font-bold">{node.name}</div>
                    <div className="text-[9px] text-slate-500 uppercase font-black mt-1">HSM Core Sealed</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* DAO Submission modal */}
      <AnimatePresence>
        {showDaoModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/70 backdrop-blur-sm">
            <div className="relative w-full max-w-xl bg-slate-900 border border-white/10 rounded-2xl p-6 space-y-4">
              <button
                onClick={() => setShowDaoModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X size={16} />
              </button>

              <h4 className="text-base font-black text-white flex items-center gap-1.5">
                <Send className="text-purple-400" size={16} /> {isRu ? "Разместить в глобальном DAO" : "Register Proposal to Global DAO"}
              </h4>

              {daoMessage && (
                <div className="p-3 rounded-lg text-xs font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  {daoMessage.text}
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-slate-500 uppercase font-black block mb-0.5">{isRu ? "Название" : "Title"}</label>
                  <input
                    type="text"
                    value={daoTitle}
                    onChange={(e) => setDaoTitle(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-500 uppercase font-black block mb-0.5">{isRu ? "ТЭО & План (Markdown)" : "Feasibility Plan (Markdown)"}</label>
                  <textarea
                    rows={6}
                    value={daoDescription}
                    onChange={(e) => setDaoDescription(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end border-t border-white/5 pt-3">
                <button
                  onClick={() => setShowDaoModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  {isRu ? "Закрыть" : "Close"}
                </button>
                <button
                  onClick={handleSubmitProposalToDao}
                  className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg"
                >
                  {isRu ? "Опубликовать" : "Broadcast Plan"}
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
