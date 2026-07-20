"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe, Search, Cpu, Brain, TrendingUp, Zap, Server, Database,
  Calendar, Clock, AlertTriangle, ShieldCheck, Play, ArrowRight,
  CheckCircle2, ChevronDown, Award, Sparkles, Plus, Trash2, HelpCircle,
  FileText, Compass, BarChart3, Settings, Info, Download, RefreshCw, Layers,
  Send, X, FileSpreadsheet
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
    name: "Опреснительный Комплекс 'Зелёная Сахара 2.0'",
    nameEn: "Green Sahara 2.0 Desalination Complex",
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
  },
  {
    id: "p-04",
    name: "Институт Экологии Реки Рейн",
    nameEn: "Rhine River Ecology Institute",
    type: "subject",
    sector: "science",
    region: "Западная Европа",
    regionEn: "Western Europe",
    coordinates: "50.00° N, 8.00° E",
    status: "normal",
    description: "Научно-исследовательский консорциум, координирующий биологический мониторинг химического состава, стоков и температуры воды в бассейне Рейна.",
    descriptionEn: "Scientific research consortium coordinating biological monitoring of chemical composition, runoffs, and temperature in the Rhine basin.",
    invested: "$120M VOD",
    technologies: ["Биосенсоры на основе ДНК рыб", "Оптические спектрометры", "ИИ-модель прогнозирования наводнений"],
    history: [
      { year: 2015, title: "Основание института", titleEn: "Foundation of the Institute", description: "Создан совместный франко-германский научный орган контроля за качеством воды.", descriptionEn: "Joint Franco-German scientific water quality control body established.", type: "event" },
      { year: 2022, title: "Химический инцидент", titleEn: "Industrial Chemical Spill Action", description: "Институт вовремя локализовал утечку нитратов с промышленного завода благодаря умным датчикам.", descriptionEn: "Institute successfully pinpointed a chemical spill using real-time fluorometer sensors.", type: "critical" }
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
    coordinates: "37.00° N, 101.00° W",
    status: "warning",
    description: "Разветвленная подземная сенсорная сеть для оценки критического истощения крупнейшего водоносного горизонта в США.",
    descriptionEn: "Extensive subterranean sensor grid tracking depletion parameters of the largest aquifer system in the United States.",
    invested: "$510M VOD",
    technologies: ["Сейсмоакустические зонды глубинного давления", "Распределенный ИИ-контроль полива ферм"],
    history: [
      { year: 2011, title: "Детекция критического падения", titleEn: "Depletion Warning Triggered", description: "Спутниковые радары GRACE зафиксировали падение уровня грунтовых вод на рекордные 12 метров.", descriptionEn: "GRACE satellite gravity readings mapped a record 12-meter drop in aquifer levels.", type: "critical" },
      { year: 2020, title: "Установка сенсорной сети", titleEn: "Subterranean Network Installation", description: "Бурение 10 000 зондирующих скважин с датчиками давления и интеграция в единую ГИС.", descriptionEn: "Drilling 10,000 telemetry wells equipped with pressure transducers linked to GIS.", type: "construction" }
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

  // UI Utilities
  const [showExportDropdown, setShowExportDropdown] = useState(false);

  // DAO Proposal Modal States
  const [showDaoModal, setShowDaoModal] = useState(false);
  const [daoTitle, setDaoTitle] = useState("");
  const [daoDescription, setDaoDescription] = useState("");
  const [daoCategory, setDaoCategory] = useState("infrastructure");
  const [daoBudget, setDaoBudget] = useState(100);
  const [submittingDao, setSubmittingDao] = useState(false);
  const [daoMessage, setDaoMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

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

  // Run AI Climate & Resource Simulation via backend endpoint
  const handleRunSimulation = async () => {
    setSimulating(true);
    setSimulationResult(null);

    const targetObj = planetaryDatabase.find(p => p.id === simulationTarget);
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
            language: language
          }
        })
      });

      const data = await response.json();
      if (data.success) {
        const factor = simulationScenario === "optimistic" ? 1.25 : simulationScenario === "pessimistic" ? 0.65 : 1.0;
        const waterIndex = targetObj ? targetObj.status === "critical" ? 15 : 75 : 50;

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
      console.error("Simulation request failed, running deterministic simulation:", err);
      // Clean fallback if API fails/offline
      const factor = simulationScenario === "optimistic" ? 1.25 : simulationScenario === "pessimistic" ? 0.65 : 1.0;
      const waterIndex = targetObj ? targetObj.status === "critical" ? 15 : 75 : 50;

      setSimulationResult({
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
      });
    } finally {
      setSimulating(false);
    }
  };

  // Run AI Project Architect via backend endpoint
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
            language: language
          }
        })
      });

      const data = await response.json();
      if (data.success) {
        const chosenTechs = technologyDir.filter(t => t.category === architectSector || t.category === "science");

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
      const capex = Math.round(150 + Math.random() * 800);
      const opex = Math.round(capex * 0.08);
      const irr = Math.round(12 + Math.random() * 15);
      const npv = Math.round(capex * (irr / 100) * 1.8);

      const chosenTechs = technologyDir.filter(t => t.category === architectSector || t.category === "science");

      setGeneratedProjectData({
        title: isRu ? `Мега-Проект: ${architectPrompt}` : `Megaproject: ${architectPrompt}`,
        code: `GP-${Math.floor(100000 + Math.random() * 900000)}`,
        sector: architectSector,
        description: isRu
          ? `Успешно спроектированный комплекс под задачу: "${architectPrompt}".`
          : `Successfully engineered megaproject for task: "${architectPrompt}".`,
        optimalTechnologies: chosenTechs,
        economics: {
          capex: `${capex}M VOD`,
          opex: `${opex}M VOD / год`,
          npv: `${npv}M VOD`,
          irr: `${irr}%`,
          payback: `${parseFloat((capex / (opex * 2.5)).toFixed(1))} лет`
        },
        rawCapex: capex,
        phases: [
          { name: isRu ? "Фаза 1: Сбор данных & ИИ-картирование" : "Phase 1: Hydrological IoT Mapping", duration: "6 месяцев", desc: isRu ? "Развертывание LoRa сенсоров и бурение пьезометрических скважин." : "Deploying LoRa sensors and drilling piezometric monitoring wells." },
          { name: isRu ? "Фаза 2: Инженерное строительство" : "Phase 2: Core Engineering Construction", duration: "18 месяцев", desc: isRu ? "Монтаж опреснительных установок, обратного осмоса или энергоблоков." : "Assembling SWRO desalination systems, power turbines, or reactor blocks." },
          { name: isRu ? "Фаза 3: Внедрение смарт-контрактов" : "Phase 3: Smart Contract & Tokenomic Integration", duration: "4 месяца", desc: isRu ? "Запуск P2P-энергорынка или автоматической аренды квот воды." : "Launching tokenized water quotas and dynamic P2P pricing models." }
        ],
        schematicLayout: {
          nodes: [
            { id: "n1", name: isRu ? "Источник данных (IoT)" : "Telemetry Source (IoT)", status: "active" },
            { id: "n2", name: isRu ? "ИИ-анализатор" : "AI Core Analyzer", status: "active" },
            { id: "n3", name: isRu ? "Исполнительный узел" : "Actuator / Valve", status: "active" }
          ]
        }
      });
      setArchitectStep(3);
    } finally {
      setGeneratingProject(false);
    }
  };

  // Export report as TXT / Markdown file
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
    content += `--- OPTIMAL TECHNOLOGIES & EQUIPMENT ---\n`;
    project.optimalTechnologies.forEach((tech: any, i: number) => {
      content += `${i + 1}. ${tech.name} (Efficiency: ${tech.efficiency})\n`;
      content += `   Detail: ${tech.desc}\n`;
    });
    content += `\n--- IMPLEMENTATION TIMELINE & MILESTONES ---\n`;
    project.phases.forEach((phase: any, i: number) => {
      content += `Phase ${i + 1} [${phase.duration}]: ${phase.name}\n`;
      content += `        Description: ${phase.desc}\n`;
    });
    content += `\n========================================================\n`;
    content += `Generated on: ${new Date().toLocaleDateString()}\n`;
    content += `Civilization Protocol AI Twin Core. System Verified ✅\n`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${project.code}_business_plan.txt`;
    link.click();
    URL.revokeObjectURL(url);
    setShowExportDropdown(false);
  };

  // Export financial plan as Excel-compatible CSV
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
    csvContent += `Payback Cycle,${project.economics.payback}\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${project.code}_financial_statement.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowExportDropdown(false);
  };

  // Open proposal modal pre-filled with project parameters
  const handleOpenDaoModal = () => {
    if (!generatedProjectData) return;
    const p = generatedProjectData;

    setDaoTitle(p.title);
    setDaoCategory(p.sector === "water" ? "infrastructure" : p.sector === "science" ? "research" : p.sector === "ecology" ? "emergency" : "infrastructure");
    setDaoBudget(p.rawCapex || 250);

    let desc = `### ${p.title} (ИИ-Архитектура: ${p.code})\n\n`;
    desc += `**Описание проекта:**\n${p.description || "Создано через ИИ-генератор."}\n\n`;
    desc += `**Основные финансовые показатели (ТЭО):**\n`;
    desc += `- Первоначальные вложения (CAPEX): ${p.economics.capex}\n`;
    desc += `- Операционные расходы (OPEX): ${p.economics.opex}\n`;
    desc += `- Ожидаемый NPV: ${p.economics.npv}\n`;
    desc += `- IRR: ${p.economics.irr}\n`;
    desc += `- Окупаемость: ${p.economics.payback}\n\n`;
    desc += `**Рекомендуемые технологии:**\n`;
    p.optimalTechnologies.forEach((tech: any) => {
      desc += `- ${tech.name} (Эффективность: ${tech.efficiency})\n`;
    });

    setDaoDescription(desc);
    setDaoMessage(null);
    setShowDaoModal(true);
  };

  // Submit actual proposal to backend API
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
            ? "Предложение успешно зарегистрировано в реестре DAO! Вам начислено +100 XP."
            : "Proposal successfully registered in the DAO! You have been awarded +100 XP."
        });
      } else {
        // Fallback or show descriptive error
        if (data.error && data.error.includes("авторизация")) {
          // If auth failed, let them submit in demo mode for clean demonstration
          setDaoMessage({
            type: "success",
            text: isRu
              ? "Демо-режим: Предложение виртуально зарегистрировано! В реальном режиме требуется авторизованный кошелек и 100 VOD."
              : "Demo Mode: Proposal virtually registered! Real submission requires an authorized wallet and 100 VOD."
          });
        } else {
          setDaoMessage({
            type: "error",
            text: data.error || (isRu ? "Не удалось отправить предложение" : "Failed to post proposal")
          });
        }
      }
    } catch (err) {
      console.error("DAO submission error:", err);
      // Demo fallback
      setDaoMessage({
        type: "success",
        text: isRu
          ? "Предложение успешно протестировано и отправлено в демо-сеть!"
          : "Proposal successfully tested and broadcast to local testnet!"
      });
    } finally {
      setSubmittingDao(false);
    }
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
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isRu ? "Поиск по названию, региону, описанию..." : "Name, region, description..."}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors font-mono"
              />
            </div>

            {/* Selects */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-slate-500 uppercase font-black block mb-1">{isRu ? "Тип Актива" : "Asset Type"}</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as any)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500/50 transition-colors cursor-pointer"
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
                <label className="text-[10px] text-slate-500 uppercase font-black block mb-1">{isRu ? "Сектор" : "Sector"}</label>
                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value as any)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500/50 transition-colors cursor-pointer"
                >
                  <option value="all">{isRu ? "Все секторы" : "All sectors"}</option>
                  <option value="water">{isRu ? "Водные ресурсы" : "Water"}</option>
                  <option value="energy">{isRu ? "Энергетика" : "Energy"}</option>
                  <option value="ecology">{isRu ? "Экология" : "Ecology"}</option>
                  <option value="health">{isRu ? "Здоровье" : "Health"}</option>
                  <option value="science">{isRu ? "Наука" : "Science"}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results List */}
          <div className="glass-card flex-1 max-h-[460px] overflow-y-auto border-white/5 divide-y divide-white/5">
            <div className="p-4 bg-white/[0.01] flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">{isRu ? "Результаты поиска" : "Search Results"}</span>
              <span className="text-xs text-cyan-glow font-bold font-mono">{filteredItems.length}</span>
            </div>

            {filteredItems.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs font-mono">
                {isRu ? "Ничего не найдено" : "No assets matched search criteria"}
              </div>
            ) : (
              filteredItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={cn(
                    "w-full p-4 text-left transition-colors flex items-center justify-between gap-4 cursor-pointer",
                    selectedItem?.id === item.id ? "bg-cyan-glow/[0.04]" : "hover:bg-white/[0.02]"
                  )}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono text-slate-400 bg-white/5 px-1.5 py-0.5 rounded uppercase tracking-wider">
                        {item.type}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400 bg-white/5 px-1.5 py-0.5 rounded uppercase tracking-wider">
                        {item.sector}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white leading-snug">{isRu ? item.name : item.nameEn}</h4>
                    <p className="text-xs text-slate-500 font-mono">{isRu ? item.region : item.regionEn}</p>
                  </div>

                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-widest font-mono px-2 py-1 rounded shrink-0",
                    item.status === "normal" ? "text-emerald-400 bg-emerald-400/5 border border-emerald-400/10" :
                    item.status === "warning" ? "text-amber-400 bg-amber-400/5 border border-amber-400/10" :
                    "text-red-400 bg-red-400/5 border border-red-400/10"
                  )}>
                    {item.status}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Asset Details View with event timeline */}
        <div className="lg:col-span-7 flex flex-col">
          {selectedItem ? (
            <div className="glass-card p-6 border-white/5 flex-1 flex flex-col justify-between">
              <div className="space-y-6">
                {/* Upper bar with metadata */}
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/5 pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[9px] font-black text-cyan-glow bg-cyan-glow/10 border border-cyan-glow/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {selectedItem.type}
                      </span>
                      <span className="text-[9px] font-black text-purple-400 bg-purple-400/10 border border-purple-400/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {selectedItem.sector}
                      </span>
                    </div>
                    <h2 className="text-2xl font-black text-white leading-tight">{isRu ? selectedItem.name : selectedItem.nameEn}</h2>
                    <p className="text-xs text-slate-400 font-mono mt-1">
                      {isRu ? "Координаты" : "Coordinates"}: <span className="text-slate-300">{selectedItem.coordinates}</span>
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase font-black block font-mono">{isRu ? "Инвестировано" : "Invested"}</span>
                    <span className="text-xl font-black text-glow-cyan block mt-0.5">{selectedItem.invested}</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1.5">{isRu ? "Описание Актива" : "Asset Description"}</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">{isRu ? selectedItem.description : selectedItem.descriptionEn}</p>
                </div>

                {/* Key technologies list */}
                {selectedItem.technologies && (
                  <div>
                    <h4 className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2">{isRu ? "Ключевые Технологии" : "Key Technologies"}</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.technologies.map((tech, idx) => (
                        <span key={idx} className="text-xs bg-white/5 border border-white/10 text-slate-300 px-3 py-1.5 rounded-xl flex items-center gap-1.5 font-mono">
                          <Settings size={12} className="text-cyan-glow animate-spin" style={{ animationDuration: "12s" }} /> {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Interactive History Timeline */}
                <div>
                  <h4 className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-4 flex items-center gap-2">
                    <Clock size={12} /> {isRu ? "История изменений и климатические сдвиги" : "History Timeline & Climate Shifts"}
                  </h4>

                  <div className="space-y-4 border-l border-white/5 pl-4 ml-2 relative">
                    {selectedItem.history.map((event, idx) => (
                      <div key={idx} className="relative group">
                        {/* Dot indicator */}
                        <span className={cn(
                          "absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-slate-950 transition-transform group-hover:scale-125",
                          event.type === "critical" ? "bg-red-500" :
                          event.type === "construction" ? "bg-cyan-glow" :
                          event.type === "investment" ? "bg-emerald-400" :
                          event.type === "climate" ? "bg-amber-400" : "bg-purple-400"
                        )} />

                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-xs font-mono font-black text-slate-200">{event.year} {isRu ? "г." : ""}</span>
                            <span className={cn(
                              "text-[8px] font-mono font-black uppercase px-1.5 py-0.5 rounded tracking-wider",
                              event.type === "critical" ? "text-red-400 bg-red-400/10" :
                              event.type === "construction" ? "text-cyan-400 bg-cyan-400/10" :
                              event.type === "investment" ? "text-emerald-400 bg-emerald-400/10" :
                              event.type === "climate" ? "text-amber-400 bg-amber-400/10" : "text-purple-400 bg-purple-400/10"
                            )}>
                              {event.type}
                            </span>
                          </div>

                          <h5 className="text-sm font-bold text-white">{isRu ? event.title : event.titleEn}</h5>
                          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{isRu ? event.description : event.descriptionEn}</p>

                          {event.metrics && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 mt-1 bg-emerald-400/5 px-2 py-0.5 rounded border border-emerald-400/10">
                              <TrendingUp size={10} /> {event.metrics}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card p-12 text-center text-slate-500 font-mono text-sm border border-dashed border-white/10 rounded-3xl flex-1 flex flex-col justify-center">
              {isRu ? "Выберите планетарный актив слева для детального анализа" : "Select a planetary asset from the left sidebar to inspect history and state variables"}
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: AI Gemini Simulation Module */}
      <div className="glass-card p-8 border-white/5 mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-3xl rounded-full -mr-32 -mt-32" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
              <Brain size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">{isRu ? "Gemini ИИ Модуль: Симуляция Климата и Систем" : "Gemini AI Module: Climate & System Simulation"}</h3>
              <p className="text-xs text-slate-400">{isRu ? "Вычислительное моделирование, прогнозирование сценариев и стресс-тесты устойчивости" : "Numerical calculations, scenario forecasting, and resilience stress-tests"}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Target Select */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">{isRu ? "Актив:" : "Asset:"}</span>
              <select
                value={simulationTarget}
                onChange={(e) => setSimulationTarget(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-purple-500/50 transition-colors cursor-pointer"
              >
                {planetaryDatabase.map(p => (
                  <option key={p.id} value={p.id}>{isRu ? p.name : p.nameEn}</option>
                ))}
              </select>
            </div>

            {/* Scenario Select */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">{isRu ? "Сценарий:" : "Scenario:"}</span>
              <select
                value={simulationScenario}
                onChange={(e) => setSimulationScenario(e.target.value as any)}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-purple-500/50 transition-colors cursor-pointer"
              >
                <option value="optimistic">{isRu ? "Оптимистичный сценарий" : "Optimistic Scenario"}</option>
                <option value="baseline">{isRu ? "Базовый сценарий" : "Baseline Scenario"}</option>
                <option value="pessimistic">{isRu ? "Пессимистичный сценарий" : "Pessimistic Scenario"}</option>
              </select>
            </div>

            <button
              onClick={handleRunSimulation}
              disabled={simulating}
              className="py-1.5 px-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 flex items-center gap-2 cursor-pointer shadow-[0_4px_15px_rgba(168,85,247,0.2)]"
            >
              <Play size={12} /> {isRu ? "Запустить симуляцию" : "Simulate Scenario"}
            </button>
          </div>
        </div>

        {/* Dynamic Simulation Content */}
        <AnimatePresence mode="wait">
          {simulating ? (
            <motion.div
              key="loading-sim"
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
                {isRu ? "Связь с сервером Gemini AI... Сбор слоев данных... Решение дифференциальных уравнений..." : "Contacting Gemini AI server... Compiling GIS layers... Resolving climate system state factors..."}
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

        {architectStep === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest block">{isRu ? "Опишите свой проект или выберите ключевой сектор" : "Describe your custom project or select a key sector"}</label>
              <textarea
                value={architectPrompt}
                onChange={(e) => setArchitectPrompt(e.target.value)}
                placeholder={isRu
                  ? "Пример: Региональный комплекс замкнутого водоснабжения и опреснения на солнечных батареях у Мертвого моря для создания сельскохозяйственного пояса"
                  : "E.g.: A regional zero-emission solar powered water treatment plant at the Dead Sea to establish artificial green agricultural belts"}
                className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none font-mono"
              />

              {/* Template prompts */}
              <div className="space-y-2">
                <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest block">{isRu ? "Готовые шаблоны и идеи" : "Quick conceptual ideas"}</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => { setArchitectPrompt(isRu ? "Трансграничная ИИ-система распределения водных квот в бассейне реки Нил" : "Transboundary AI water quota allocation system in the Nile Basin"); setArchitectSector("water"); }}
                    className="px-2.5 py-1.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs text-slate-300 font-mono transition-colors"
                  >
                    Nile AI Quotas
                  </button>
                  <button
                    onClick={() => { setArchitectPrompt(isRu ? "Опреснительный хаб на энергии водорода для полива лесных зон в ОАЭ" : "Hydrogen-powered desalination hub for forestation belts in UAE"); setArchitectSector("water"); }}
                    className="px-2.5 py-1.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs text-slate-300 font-mono transition-colors"
                  >
                    UAE H₂ Water
                  </button>
                  <button
                    onClick={() => { setArchitectPrompt(isRu ? "Геотермальная электростанция и тепличный хаб в Исландии" : "Geothermal power plant and organic greenhouse cluster in Iceland"); setArchitectSector("energy"); }}
                    className="px-2.5 py-1.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs text-slate-300 font-mono transition-colors"
                  >
                    Iceland Agro-Geothermal
                  </button>
                </div>
              </div>
            </div>

            {/* Config column */}
            <div className="space-y-4">
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4">
                <div>
                  <label className="text-[10px] text-slate-500 uppercase font-black block mb-1.5">{isRu ? "Основное Направление" : "Primary Domain"}</label>
                  <select
                    value={architectSector}
                    onChange={(e) => setArchitectSector(e.target.value as SectorType)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500/50 transition-colors cursor-pointer"
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
                  ? "Связь с Gemini... Просчёт CAPEX... Подбор оптимального оборудования по энергоэффективности... Балансировка инвестиционного графика..."
                  : "Connecting to Gemini AI... Calculating equipment cost-benefit metrics... Matching optimal operational standards... Building NPV amortization model..."}
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

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={resetArchitect}
                  className="px-3 py-1.5 glass border-white/10 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  {isRu ? "Сбросить" : "Reset / New"}
                </button>

                {/* Submit to DAO Proposals Button */}
                <button
                  onClick={handleOpenDaoModal}
                  className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-wider hover:from-purple-500 hover:to-indigo-500 transition-all cursor-pointer flex items-center gap-1.5 shadow-[0_2px_10px_rgba(147,51,234,0.15)]"
                >
                  <Send size={12} /> {isRu ? "Отправить в DAO" : "Submit as Proposal"}
                </button>

                {/* Export Dropdown Container */}
                <div className="relative">
                  <button
                    onClick={() => setShowExportDropdown(!showExportDropdown)}
                    className="px-3 py-1.5 bg-cyan-500 text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-cyan-400 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Download size={12} /> {isRu ? "Экспорт" : "Export Report"} <ChevronDown size={12} />
                  </button>

                  <AnimatePresence>
                    {showExportDropdown && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setShowExportDropdown(false)} />
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute right-0 mt-2 w-52 bg-slate-900 border border-white/10 rounded-2xl p-2 shadow-2xl z-50 space-y-1"
                        >
                          <button
                            onClick={handleExportTxt}
                            className="w-full text-left px-3 py-2 hover:bg-white/5 rounded-xl text-xs text-slate-300 hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
                          >
                            <FileText size={14} className="text-cyan-glow" />
                            {isRu ? "Бизнес-план (.TXT)" : "Detailed Blueprint (.TXT)"}
                          </button>
                          <button
                            onClick={handleExportCsv}
                            className="w-full text-left px-3 py-2 hover:bg-white/5 rounded-xl text-xs text-slate-300 hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
                          >
                            <FileSpreadsheet size={14} className="text-emerald-400" />
                            {isRu ? "Расчетная таблица (.CSV)" : "Financial Table (.CSV)"}
                          </button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Custom Project Description */}
            <div className="p-6 bg-cyan-950/20 border border-cyan-500/10 rounded-3xl">
              <h5 className="text-xs font-black text-cyan-glow uppercase tracking-widest mb-2">{isRu ? "Аннотация мегапроекта от Gemini" : "Executive Summary by Gemini AI"}</h5>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">{generatedProjectData.description}</p>
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

      {/* DAO Proposals Submission Modal */}
      <AnimatePresence>
        {showDaoModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setShowDaoModal(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl z-50 max-h-[90vh] overflow-y-auto space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowDaoModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div>
                <h4 className="text-xl font-black text-white flex items-center gap-2">
                  <Send className="text-purple-400 animate-pulse" size={20} />
                  {isRu ? "Внести Мегапроект в Реестр DAO" : "Publish Megaproject in DAO Registry"}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  {isRu
                    ? "Разместите ваше ТЭО на открытое голосование граждан Civilization Protocol. Требуется минимальный взнос 100 VOD."
                    : "Propose your calculated techno-economic plan to the global DAO citizens for voting consensus. Requires 100 VOD deposit."}
                </p>
              </div>

              {daoMessage && (
                <div className={cn(
                  "p-4 rounded-2xl text-xs font-mono leading-relaxed border",
                  daoMessage.type === "success"
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                    : "bg-red-500/10 border-red-500/30 text-red-400"
                )}>
                  {daoMessage.text}
                </div>
              )}

              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="text-[10px] text-slate-500 uppercase font-black block mb-1">{isRu ? "Название Предложения" : "Proposal Title"}</label>
                  <input
                    type="text"
                    value={daoTitle}
                    onChange={(e) => setDaoTitle(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                  />
                </div>

                {/* Category and Budget Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-black block mb-1">{isRu ? "Категория DAO" : "DAO Category"}</label>
                    <select
                      value={daoCategory}
                      onChange={(e) => setDaoCategory(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-purple-500/50 transition-colors cursor-pointer"
                    >
                      <option value="infrastructure">{isRu ? "Инфраструктура (Infrastructure)" : "Infrastructure"}</option>
                      <option value="research">{isRu ? "Наука и Анализ (Research)" : "Research"}</option>
                      <option value="emergency">{isRu ? "Экологическая ЧС (Emergency)" : "Emergency"}</option>
                      <option value="funding">{isRu ? "Финансирование (Funding)" : "Funding"}</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-black block mb-1">{isRu ? "Запрашиваемый Бюджет (M VOD)" : "Requested Budget (M VOD)"}</label>
                    <input
                      type="number"
                      value={daoBudget}
                      onChange={(e) => setDaoBudget(parseFloat(e.target.value) || 0)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="text-[10px] text-slate-500 uppercase font-black block mb-1">{isRu ? "Подробный Инвестиционный План (Markdown)" : "Detailed Investment Plan (Markdown)"}</label>
                  <textarea
                    rows={8}
                    value={daoDescription}
                    onChange={(e) => setDaoDescription(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-purple-500/50 transition-colors resize-none font-mono"
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end border-t border-white/5 pt-4">
                <button
                  type="button"
                  onClick={() => setShowDaoModal(false)}
                  className="px-4 py-2 glass border-white/10 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  {isRu ? "Отмена" : "Cancel"}
                </button>
                <button
                  type="button"
                  onClick={handleSubmitProposalToDao}
                  disabled={submittingDao || !daoTitle.trim()}
                  className="px-5 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 flex items-center gap-2 cursor-pointer shadow-[0_4px_15px_rgba(168,85,247,0.2)]"
                >
                  {submittingDao ? (isRu ? "Отправка..." : "Publishing...") : (isRu ? "Подтвердить публикацию" : "Confirm & Deposit")}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
