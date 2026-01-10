"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gamepad2, Heart, Zap, Droplets, TreePine, Factory, Users,
  Star, Trophy, Target, Shield, Cpu, Globe, ArrowRight, ArrowLeft,
  CheckCircle2, XCircle, AlertTriangle, Play, Pause, RotateCcw,
  Award, Gift, Sparkles, Timer, Brain, Waves, Leaf, Sun,
  ThermometerSun, Wind, Cloud, Fish, Bird, Home, ChevronRight
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import InfoPopup from "@/components/InfoPopup";

// Game state types
interface GameState {
  level: number;
  xp: number;
  planetHealth: number;
  waterQuality: number;
  airQuality: number;
  biodiversity: number;
  economy: number;
  sensors: number;
  projects: number;
  decisions: string[];
  role: string | null;
  achievements: string[];
  isPlaying: boolean;
  gameOver: boolean;
  victory: boolean;
}

// Role configurations
const roles = [
  { 
    id: "ecologist", 
    name: "Эколог", 
    icon: <Leaf size={32} />, 
    color: "emerald",
    bonus: "waterQuality",
    description: "Специалист по экосистемам. +20% к качеству воды"
  },
  { 
    id: "engineer", 
    name: "Инженер", 
    icon: <Cpu size={32} />, 
    color: "blue",
    bonus: "sensors",
    description: "Технический эксперт. +20% эффективность сенсоров"
  },
  { 
    id: "politician", 
    name: "Политик", 
    icon: <Users size={32} />, 
    color: "purple",
    bonus: "economy",
    description: "Влияние на политику. +20% к экономике"
  },
  { 
    id: "investor", 
    name: "Инвестор", 
    icon: <Trophy size={32} />, 
    color: "yellow",
    bonus: "projects",
    description: "Финансовый стратег. +20% к проектам"
  },
];

// Level configurations
const levels = [
  {
    id: 1,
    title: "Диагностика",
    subtitle: "Изучите проблемы планеты",
    xpReward: 100,
    description: "Исследуйте текущее состояние водных ресурсов и выявите критические проблемы.",
    tasks: [
      { id: "scan_planet", name: "Сканировать планету", xp: 20 },
      { id: "identify_problems", name: "Выявить проблемы", xp: 30 },
      { id: "analyze_data", name: "Анализ данных", xp: 50 },
    ]
  },
  {
    id: 2,
    title: "Сбор данных",
    subtitle: "Разместите IoT сенсоры",
    xpReward: 200,
    description: "Установите сенсоры мониторинга в критических точках для сбора реальных данных.",
    tasks: [
      { id: "place_sensors", name: "Установить 5 сенсоров", xp: 40 },
      { id: "calibrate", name: "Калибровка сенсоров", xp: 60 },
      { id: "network", name: "Создать сеть", xp: 100 },
    ]
  },
  {
    id: 3,
    title: "Анализ",
    subtitle: "Интерпретируйте данные",
    xpReward: 300,
    description: "Используйте AI для анализа собранных данных и выявления паттернов.",
    tasks: [
      { id: "ai_analysis", name: "AI анализ", xp: 80 },
      { id: "predictions", name: "Прогнозирование", xp: 100 },
      { id: "report", name: "Создать отчёт", xp: 120 },
    ]
  },
  {
    id: 4,
    title: "Решения",
    subtitle: "Предложите проекты",
    xpReward: 500,
    description: "На основе анализа предложите проекты для улучшения экологии.",
    tasks: [
      { id: "draft_projects", name: "Разработать 3 проекта", xp: 150 },
      { id: "budget", name: "Рассчитать бюджет", xp: 150 },
      { id: "submit", name: "Подать на голосование", xp: 200 },
    ]
  },
  {
    id: 5,
    title: "Реализация",
    subtitle: "DAO голосование",
    xpReward: 1000,
    description: "Проведите голосование сообщества и реализуйте выбранные проекты.",
    tasks: [
      { id: "dao_vote", name: "Провести голосование", xp: 300 },
      { id: "implement", name: "Реализовать проекты", xp: 400 },
      { id: "verify", name: "Верифицировать результат", xp: 300 },
    ]
  },
];

// Quiz questions
const quizQuestions = [
  {
    question: "Какой % пресной воды на Земле доступен для использования?",
    options: ["50%", "25%", "3%", "0.5%"],
    correct: 3,
    explanation: "Только 0.5% пресной воды легко доступно для человечества."
  },
  {
    question: "К какому году прогнозируется дефицит воды для 2 млрд людей?",
    options: ["2025", "2030", "2050", "2100"],
    correct: 1,
    explanation: "По данным ООН, к 2030 году 2 млрд человек столкнутся с дефицитом воды."
  },
  {
    question: "Какая технология обеспечивает прозрачность данных в CivilizationProtocol?",
    options: ["AI", "Blockchain", "IoT", "Cloud"],
    correct: 1,
    explanation: "Блокчейн гарантирует неизменность и прозрачность всех данных экосистемы."
  },
];

export default function GamePresentation() {
  const { user } = useAuth();
  
  const [gameState, setGameState] = useState<GameState>({
    level: 0, // 0 = role selection
    xp: 0,
    planetHealth: 30,
    waterQuality: 25,
    airQuality: 40,
    biodiversity: 35,
    economy: 50,
    sensors: 0,
    projects: 0,
    decisions: [],
    role: null,
    achievements: [],
    isPlaying: false,
    gameOver: false,
    victory: false,
  });

  const [currentTask, setCurrentTask] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [particles, setParticles] = useState<{x: number, y: number, type: string}[]>([]);

  // Add particle effect
  const addParticle = useCallback((x: number, y: number, type: string) => {
    const newParticle = { x, y, type };
    setParticles(prev => [...prev.slice(-20), newParticle]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p !== newParticle));
    }, 1000);
  }, []);

  // Select role
  const selectRole = (roleId: string) => {
    setGameState(prev => ({
      ...prev,
      role: roleId,
      level: 1,
      isPlaying: true,
    }));
  };

  // Complete task
  const completeTask = (taskXp: number) => {
    const currentLevel = levels[gameState.level - 1];
    const nextTask = currentTask + 1;
    
    // Calculate bonus based on role
    const role = roles.find(r => r.id === gameState.role);
    const bonusMultiplier = 1.2; // 20% bonus for role specialty
    const finalXp = Math.floor(taskXp * (role ? bonusMultiplier : 1));

    setGameState(prev => {
      const newXp = prev.xp + finalXp;
      const improvements = {
        planetHealth: Math.min(100, prev.planetHealth + 5),
        waterQuality: Math.min(100, prev.waterQuality + (prev.role === "ecologist" ? 8 : 4)),
        biodiversity: Math.min(100, prev.biodiversity + 3),
        economy: Math.min(100, prev.economy + (prev.role === "politician" ? 6 : 3)),
        sensors: prev.sensors + (prev.role === "engineer" ? 2 : 1),
        projects: prev.projects + (prev.role === "investor" ? 2 : 1),
      };

      return {
        ...prev,
        xp: newXp,
        ...improvements,
      };
    });

    // Check if level complete
    if (nextTask >= currentLevel.tasks.length) {
      // Level complete!
      if (gameState.level < 5) {
        setShowQuiz(true);
      } else {
        // Game victory!
        setGameState(prev => ({
          ...prev,
          victory: true,
          achievements: [...prev.achievements, "🏆 Спаситель планеты"],
        }));
      }
    } else {
      setCurrentTask(nextTask);
    }
  };

  // Answer quiz
  const answerQuiz = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    const isCorrect = answerIndex === quizQuestions[quizIndex].correct;
    if (isCorrect) {
      setGameState(prev => ({
        ...prev,
        xp: prev.xp + 50,
        achievements: prev.achievements.includes("🧠 Эрудит") 
          ? prev.achievements 
          : [...prev.achievements, "🧠 Эрудит"],
      }));
    }
  };

  // Next level after quiz
  const nextLevel = () => {
    setShowQuiz(false);
    setShowExplanation(false);
    setSelectedAnswer(null);
    setQuizIndex((quizIndex + 1) % quizQuestions.length);
    setCurrentTask(0);
    setGameState(prev => ({
      ...prev,
      level: prev.level + 1,
    }));
  };

  // Restart game
  const restartGame = () => {
    setGameState({
      level: 0,
      xp: 0,
      planetHealth: 30,
      waterQuality: 25,
      airQuality: 40,
      biodiversity: 35,
      economy: 50,
      sensors: 0,
      projects: 0,
      decisions: [],
      role: null,
      achievements: [],
      isPlaying: false,
      gameOver: false,
      victory: false,
    });
    setCurrentTask(0);
    setShowQuiz(false);
    setQuizIndex(0);
  };

  // Calculate planet color based on health
  const getPlanetColor = () => {
    if (gameState.planetHealth < 30) return "from-red-600 to-orange-600";
    if (gameState.planetHealth < 50) return "from-orange-500 to-yellow-500";
    if (gameState.planetHealth < 70) return "from-yellow-400 to-green-400";
    return "from-green-400 to-emerald-500";
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Particle effects */}
      <AnimatePresence>
        {particles.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 1, scale: 1, x: p.x, y: p.y }}
            animate={{ opacity: 0, scale: 2, y: p.y - 50 }}
            exit={{ opacity: 0 }}
            className="fixed pointer-events-none z-50 text-2xl"
          >
            {p.type === "xp" ? "⭐" : p.type === "heart" ? "💚" : "💧"}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Header HUD - под главным Navbar */}
      <div className="sticky top-20 left-0 right-0 z-[90] bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Gamepad2 className="text-cyan-400" />
            <span className="font-black text-lg">СПАСИ ЭКОЛОГИЮ</span>
          </Link>
          
          {gameState.isPlaying && (
            <div className="flex items-center gap-6">
              {/* XP */}
              <div className="flex items-center gap-2">
                <Star className="text-yellow-400" size={20} />
                <span className="font-bold text-yellow-400">{gameState.xp} XP</span>
              </div>
              
              {/* Level */}
              <div className="flex items-center gap-2">
                <Target className="text-purple-400" size={20} />
                <span className="font-bold">Уровень {gameState.level}/5</span>
              </div>
              
              {/* Restart */}
              <button onClick={restartGame} className="p-2 hover:bg-white/10 rounded-lg">
                <RotateCcw size={20} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="pb-8 px-4">
        <AnimatePresence mode="wait">
          {/* Role Selection Screen */}
          {gameState.level === 0 && (
            <motion.div
              key="role-select"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto text-center"
            >
              {/* Intro */}
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-12"
              >
                <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  СПАСИ ЭКОЛОГИЮ
                </h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                  Интерактивная игра о спасении планеты от водного кризиса.
                  Ваши решения определят будущее Земли.
                </p>
              </motion.div>

              {/* Planet in crisis */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="relative w-64 h-64 mx-auto mb-12"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 to-orange-500 animate-pulse opacity-50 blur-xl" />
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-red-600 to-orange-600 shadow-2xl">
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    {/* Crisis overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-red-900/50 to-transparent" />
                    <AlertTriangle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-200" size={64} />
                  </div>
                </div>
                {/* Health bar */}
                <div className="absolute -bottom-8 left-0 right-0 text-center">
                  <div className="text-sm text-red-400 font-bold">Здоровье планеты: 30%</div>
                  <div className="h-2 bg-red-900 rounded-full overflow-hidden mt-1">
                    <div className="h-full w-[30%] bg-red-500" />
                  </div>
                </div>
              </motion.div>

              {/* Role selection */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="text-2xl font-bold mb-6">Выберите вашу роль</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {roles.map((role, i) => {
                    const roleDetails = {
                      ecologist: {
                        details: "Экологи специализируются на изучении и защите экосистем. В игре вы получите бонус +20% к улучшению качества воды. Ваша роль включает мониторинг водных ресурсов, анализ экологических данных и разработку природоохранных стратегий.",
                        skills: [
                          "Анализ качества воды",
                          "Оценка экосистем",
                          "Разработка природоохранных мер",
                          "Мониторинг биоразнообразия",
                        ],
                      },
                      engineer: {
                        details: "Инженеры отвечают за техническую инфраструктуру. В игре вы получите бонус +20% к эффективности сенсоров. Ваша роль включает установку IoT-устройств, настройку систем мониторинга и оптимизацию технологических процессов.",
                        skills: [
                          "Установка IoT-сенсоров",
                          "Настройка систем мониторинга",
                          "Оптимизация технологий",
                          "Техническая поддержка",
                        ],
                      },
                      politician: {
                        details: "Политики влияют на принятие решений и распределение ресурсов. В игре вы получите бонус +20% к экономике. Ваша роль включает лоббирование экологических инициатив, координацию между ведомствами и привлечение финансирования.",
                        skills: [
                          "Принятие политических решений",
                          "Координация ведомств",
                          "Привлечение финансирования",
                          "Лоббирование инициатив",
                        ],
                      },
                      investor: {
                        details: "Инвесторы обеспечивают финансовую поддержку проектов. В игре вы получите бонус +20% к количеству проектов. Ваша роль включает оценку проектов, инвестирование в экологические решения и управление финансовыми ресурсами.",
                        skills: [
                          "Оценка проектов",
                          "Инвестирование в решения",
                          "Управление финансами",
                          "Анализ ROI",
                        ],
                      },
                    };
                    
                    const details = roleDetails[role.id as keyof typeof roleDetails];
                    
                    return (
                      <InfoPopup
                        key={role.id}
                        title={role.name}
                        content={
                          <div className="space-y-3">
                            <p className="text-sm">{details.details}</p>
                            <div>
                              <h4 className="font-bold mb-2">Навыки:</h4>
                              <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
                                {details.skills.map((skill, j) => (
                                  <li key={j}>{skill}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="pt-2 border-t border-white/10">
                              <p className="text-sm">
                                <strong>Игровой бонус:</strong> {role.description}
                              </p>
                            </div>
                          </div>
                        }
                        trigger={
                          <motion.button
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 0.7 + i * 0.1, type: "spring" }}
                            onClick={() => selectRole(role.id)}
                            whileHover={{ 
                              scale: 1.05,
                              y: -5,
                              transition: { duration: 0.2 }
                            }}
                            className={cn(
                              "p-6 rounded-2xl border-2 transition-all cursor-pointer group relative overflow-hidden",
                              `border-${role.color}-500/30 bg-${role.color}-500/10`,
                              `hover:border-${role.color}-500 hover:bg-${role.color}-500/20`
                            )}
                          >
                            {/* Градиентный фон при hover */}
                            <motion.div
                              className={`absolute inset-0 bg-gradient-to-br from-${role.color}-500/0 to-${role.color}-500/0 group-hover:from-${role.color}-500/10 group-hover:to-${role.color}-500/5 transition-all duration-300`}
                            />
                            
                            <motion.div
                              className={`text-${role.color}-400 mb-3 relative z-10 group-hover:scale-110 transition-transform`}
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.5 }}
                            >
                              {role.icon}
                            </motion.div>
                            <div className="font-bold text-lg relative z-10 group-hover:text-white transition-colors">
                              {role.name}
                            </div>
                            <div className="text-xs text-slate-500 mt-2 relative z-10 group-hover:text-slate-400 transition-colors">
                              {role.description}
                            </div>
                            
                            {/* Декоративные элементы */}
                            <div className={`absolute top-2 right-2 w-2 h-2 rounded-full bg-${role.color}-400 opacity-0 group-hover:opacity-100 transition-opacity`} />
                          </motion.button>
                        }
                        size="md"
                      />
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Game Screen */}
          {gameState.level > 0 && !gameState.victory && !showQuiz && (
            <motion.div
              key={`level-${gameState.level}`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="max-w-6xl mx-auto"
            >
              <div className="grid md:grid-cols-3 gap-8">
                {/* Left: Planet Status */}
                <div className="space-y-4">
                  {/* Planet */}
                  <div className="relative w-48 h-48 mx-auto">
                    <motion.div 
                      className={cn(
                        "absolute inset-0 rounded-full bg-gradient-to-br shadow-2xl",
                        getPlanetColor()
                      )}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Globe className="text-white/30" size={80} />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="glass-card p-4 space-y-3">
                    <StatBar label="Здоровье планеты" value={gameState.planetHealth} color="emerald" icon={<Heart size={16} />} />
                    <StatBar label="Качество воды" value={gameState.waterQuality} color="cyan" icon={<Droplets size={16} />} />
                    <StatBar label="Биоразнообразие" value={gameState.biodiversity} color="green" icon={<TreePine size={16} />} />
                    <StatBar label="Экономика" value={gameState.economy} color="yellow" icon={<Trophy size={16} />} />
                  </div>

                  {/* Resources */}
                  <div className="glass-card p-4 grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <Cpu className="mx-auto text-blue-400 mb-1" size={24} />
                      <div className="text-2xl font-black">{gameState.sensors}</div>
                      <div className="text-xs text-slate-500">Сенсоров</div>
                    </div>
                    <div className="text-center">
                      <Target className="mx-auto text-purple-400 mb-1" size={24} />
                      <div className="text-2xl font-black">{gameState.projects}</div>
                      <div className="text-xs text-slate-500">Проектов</div>
                    </div>
                  </div>
                </div>

                {/* Center: Level Content */}
                <div className="md:col-span-2 space-y-6">
                  {/* Level Header */}
                  <div className="glass-card p-6 border-cyan-500/30">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-sm text-cyan-400 font-bold">УРОВЕНЬ {levels[gameState.level - 1].id}</div>
                        <h2 className="text-3xl font-black">{levels[gameState.level - 1].title}</h2>
                        <p className="text-slate-400">{levels[gameState.level - 1].subtitle}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-slate-500">Награда</div>
                        <div className="text-2xl font-black text-yellow-400">+{levels[gameState.level - 1].xpReward} XP</div>
                      </div>
                    </div>
                    <p className="text-slate-400">{levels[gameState.level - 1].description}</p>
                  </div>

                  {/* Tasks */}
                  <div className="glass-card p-6">
                    <h3 className="font-bold text-lg mb-4">Задания</h3>
                    <div className="space-y-3">
                      {levels[gameState.level - 1].tasks.map((task, i) => {
                        const taskDetails = {
                          scan_planet: "Сканирование планеты позволяет выявить критические проблемы с водными ресурсами. Используйте спутниковые данные и IoT-сенсоры для полного анализа состояния экосистемы.",
                          identify_problems: "Идентификация проблем включает анализ данных о качестве воды, доступности ресурсов и экологических угрозах. Это основа для разработки решений.",
                          analyze_data: "Анализ данных использует AI-алгоритмы для выявления паттернов и прогнозирования тенденций. Это помогает принимать обоснованные решения.",
                          place_sensors: "Установка IoT-сенсоров в критических точках обеспечивает непрерывный мониторинг качества воды, уровня и других параметров в режиме реального времени.",
                          calibrate: "Калибровка сенсоров гарантирует точность измерений. Правильно настроенные сенсоры обеспечивают достоверность данных для принятия решений.",
                          network: "Создание сети сенсоров позволяет объединить все точки мониторинга в единую систему, обеспечивая комплексный анализ водных ресурсов.",
                          ai_analysis: "AI-анализ использует машинное обучение для обработки больших объёмов данных, выявления аномалий и прогнозирования изменений.",
                          predictions: "Прогнозирование помогает предсказать будущие изменения в водных ресурсах, что критично для планирования и предотвращения кризисов.",
                          report: "Создание отчёта структурирует все собранные данные и выводы, делая их доступными для принятия решений и дальнейших действий.",
                          draft_projects: "Разработка проектов включает создание конкретных решений для улучшения экологии, с учётом технических, экономических и экологических факторов.",
                          budget: "Расчёт бюджета определяет необходимые финансовые ресурсы для реализации проектов и обеспечивает их экономическую обоснованность.",
                          submit: "Подача на голосование DAO позволяет сообществу оценить проекты и принять решение о их реализации через демократический процесс.",
                          dao_vote: "Проведение голосования DAO обеспечивает участие всех заинтересованных сторон в принятии решений о водных ресурсах.",
                          implement: "Реализация проектов включает выполнение всех запланированных мероприятий по улучшению экологии и водных ресурсов.",
                          verify: "Верификация результатов подтверждает эффективность реализованных проектов и их влияние на состояние водных ресурсов.",
                        };
                        
                        const detail = taskDetails[task.id as keyof typeof taskDetails] || "Выполните это задание для продвижения к спасению планеты.";
                        
                        return (
                          <InfoPopup
                            key={task.id}
                            title={task.name}
                            content={
                              <div className="space-y-3">
                                <p className="text-sm">{detail}</p>
                                <div>
                                  <h4 className="font-bold mb-2">Награда:</h4>
                                  <p className="text-sm text-slate-400">
                                    За выполнение этого задания вы получите <strong className="text-yellow-400">+{task.xp} XP</strong>.
                                    {gameState.role && " Бонус вашей роли увеличит награду на 20%!"}
                                  </p>
                                </div>
                                <div>
                                  <h4 className="font-bold mb-2">Влияние на планету:</h4>
                                  <p className="text-sm text-slate-400">
                                    Выполнение задания улучшит состояние планеты: здоровье +5%, качество воды +4-8%, биоразнообразие +3%, экономика +3-6%.
                                  </p>
                                </div>
                              </div>
                            }
                            trigger={
                              <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={cn(
                                  "flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer group",
                                  i < currentTask 
                                    ? "border-emerald-500/50 bg-emerald-500/10 hover:border-emerald-500" 
                                    : i === currentTask 
                                      ? "border-cyan-500 bg-cyan-500/10 animate-pulse hover:border-cyan-400" 
                                      : "border-white/10 bg-white/5 opacity-50 hover:opacity-70"
                                )}
                              >
                                <div className="flex items-center gap-3">
                                  {i < currentTask ? (
                                    <CheckCircle2 className="text-emerald-400" size={24} />
                                  ) : i === currentTask ? (
                                    <div className="w-6 h-6 rounded-full border-2 border-cyan-400 animate-spin border-t-transparent" />
                                  ) : (
                                    <div className="w-6 h-6 rounded-full border-2 border-white/30" />
                                  )}
                                  <span className={cn(
                                    i <= currentTask ? "font-bold" : "",
                                    "group-hover:text-white transition-colors"
                                  )}>
                                    {task.name}
                                  </span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-sm text-yellow-400 font-bold group-hover:scale-110 transition-transform">
                                    +{task.xp} XP
                                  </span>
                                  {i === currentTask && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        addParticle(e.clientX, e.clientY, "xp");
                                        completeTask(task.xp);
                                      }}
                                      className="px-4 py-2 bg-cyan-500 text-ocean-deep font-bold rounded-lg hover:bg-cyan-400 transition-colors"
                                    >
                                      Выполнить
                                    </button>
                                  )}
                                </div>
                              </motion.div>
                            }
                            size="md"
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map(lvl => (
                      <div 
                        key={lvl}
                        className={cn(
                          "flex-1 h-2 rounded-full transition-all",
                          lvl < gameState.level 
                            ? "bg-emerald-500" 
                            : lvl === gameState.level 
                              ? "bg-cyan-500" 
                              : "bg-white/10"
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Quiz Screen */}
          {showQuiz && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="glass-card p-8 border-purple-500/30">
                <Brain className="mx-auto text-purple-400 mb-4" size={48} />
                <h2 className="text-2xl font-black mb-2">Бонусный вопрос</h2>
                <p className="text-slate-400 mb-8">Ответьте правильно и получите +50 XP!</p>

                <div className="text-xl font-bold mb-6">
                  {quizQuestions[quizIndex].question}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {quizQuestions[quizIndex].options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => !showExplanation && answerQuiz(i)}
                      disabled={showExplanation}
                      className={cn(
                        "p-4 rounded-xl border-2 font-bold transition-all",
                        showExplanation
                          ? i === quizQuestions[quizIndex].correct
                            ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                            : i === selectedAnswer
                              ? "border-red-500 bg-red-500/20 text-red-400"
                              : "border-white/10 opacity-50"
                          : "border-white/20 hover:border-purple-500 hover:bg-purple-500/10"
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                  >
                    <div className={cn(
                      "p-4 rounded-xl",
                      selectedAnswer === quizQuestions[quizIndex].correct
                        ? "bg-emerald-500/20 border border-emerald-500/30"
                        : "bg-red-500/20 border border-red-500/30"
                    )}>
                      {selectedAnswer === quizQuestions[quizIndex].correct ? (
                        <div className="text-emerald-400 font-bold mb-2">✅ Правильно! +50 XP</div>
                      ) : (
                        <div className="text-red-400 font-bold mb-2">❌ Неверно</div>
                      )}
                      <p className="text-sm text-slate-400">{quizQuestions[quizIndex].explanation}</p>
                    </div>
                  </motion.div>
                )}

                {showExplanation && (
                  <button
                    onClick={nextLevel}
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
                  >
                    Следующий уровень <ChevronRight />
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* Victory Screen */}
          {gameState.victory && (
            <motion.div
              key="victory"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-3xl mx-auto text-center"
            >
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", bounce: 0.5 }}
              >
                <Trophy className="mx-auto text-yellow-400 mb-6" size={80} />
              </motion.div>

              <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-yellow-400 via-green-400 to-cyan-400 bg-clip-text text-transparent">
                🎉 ПОБЕДА!
              </h1>
              <p className="text-xl text-slate-400 mb-8">
                Вы успешно спасли планету от водного кризиса!
              </p>

              {/* Healthy Planet */}
              <div className="relative w-64 h-64 mx-auto mb-8">
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400 to-cyan-400 shadow-2xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">🌍</span>
                </div>
              </div>

              {/* Stats */}
              <div className="glass-card p-8 mb-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <Star className="mx-auto text-yellow-400 mb-2" size={32} />
                    <div className="text-3xl font-black text-yellow-400">{gameState.xp}</div>
                    <div className="text-sm text-slate-500">XP заработано</div>
                  </div>
                  <div>
                    <Cpu className="mx-auto text-blue-400 mb-2" size={32} />
                    <div className="text-3xl font-black text-blue-400">{gameState.sensors}</div>
                    <div className="text-sm text-slate-500">Сенсоров</div>
                  </div>
                  <div>
                    <Target className="mx-auto text-purple-400 mb-2" size={32} />
                    <div className="text-3xl font-black text-purple-400">{gameState.projects}</div>
                    <div className="text-sm text-slate-500">Проектов</div>
                  </div>
                  <div>
                    <Award className="mx-auto text-emerald-400 mb-2" size={32} />
                    <div className="text-3xl font-black text-emerald-400">{gameState.achievements.length}</div>
                    <div className="text-sm text-slate-500">Достижений</div>
                  </div>
                </div>

                {gameState.achievements.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="text-sm text-slate-500 mb-2">Полученные достижения:</div>
                    <div className="flex flex-wrap justify-center gap-2">
                      {gameState.achievements.map((ach, i) => (
                        <span key={i} className="px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-full font-bold">
                          {ach}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={restartGame}
                  className="px-6 py-3 glass rounded-xl font-bold flex items-center gap-2 hover:bg-white/10"
                >
                  <RotateCcw size={18} /> Играть снова
                </button>
                <Link
                  href="/landing"
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl flex items-center gap-2 hover:scale-105 transition-transform"
                >
                  <Gift size={18} /> Получить реальные награды
                </Link>
                <Link
                  href="/presentations"
                  className="px-6 py-3 glass rounded-xl font-bold flex items-center gap-2 hover:bg-white/10"
                >
                  <ArrowRight size={18} /> Другие презентации
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Stat bar component
function StatBar({ label, value, color, icon }: { label: string; value: number; color: string; icon: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-1">
        <span className="flex items-center gap-1 text-slate-400">
          <span className={`text-${color}-400`}>{icon}</span>
          {label}
        </span>
        <span className="font-bold">{value}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-${color}-500`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}









