"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle, TrendingDown, Shield, FileText, ArrowRight,
  CheckCircle2, XCircle, Clock, Target
} from "lucide-react";
import { cn } from "@/lib/utils";
import InfoPopup from "./InfoPopup";
import Link from "next/link";

interface Risk {
  id: string;
  category: string;
  name: string;
  probability: "low" | "medium" | "high";
  impact: "low" | "medium" | "high";
  status: "active" | "mitigated" | "eliminated";
  description: string;
  mitigation: string[];
  actionPlan: string;
  details: React.ReactNode;
}

const risks: Risk[] = [
  {
    id: "regulatory",
    category: "Регуляторные",
    name: "Изменение регуляторной среды",
    probability: "medium",
    impact: "high",
    status: "active",
    description: "Изменения в законодательстве могут повлиять на работу платформы",
    mitigation: [
      "Активное участие в разработке регуляторных стандартов",
      "Юридическая поддержка в ключевых юрисдикциях",
      "Адаптация платформы под различные регуляторные требования",
      "Партнёрства с регуляторами",
    ],
    actionPlan: "Мониторинг изменений в законодательстве, адаптация платформы, юридическая поддержка",
    details: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          Изменения в регуляторной среде криптовалют и блокчейна могут повлиять на работу платформы, 
          особенно в отношении токенов и децентрализованных организаций.
        </p>
        <div>
          <h4 className="font-bold mb-2">Меры по снижению:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            {[
              "Активное участие в разработке регуляторных стандартов",
              "Юридическая поддержка в ключевых юрисдикциях",
              "Адаптация платформы под различные регуляторные требования",
              "Партнёрства с регуляторами",
            ].map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">План действий при наступлении:</h4>
          <p className="text-sm text-slate-400">
            Немедленный анализ изменений, консультации с юристами, адаптация платформы, 
            уведомление сообщества, при необходимости перерегистрация в других юрисдикциях.
          </p>
        </div>
        <div className="pt-4 border-t border-white/10">
          <Link
            href="/presentations/diplomatic"
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 rounded-lg transition-colors text-sm font-medium"
          >
            Узнать о партнёрствах
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    ),
  },
  {
    id: "technical",
    category: "Технологические",
    name: "Технические сбои и уязвимости",
    probability: "low",
    impact: "high",
    status: "mitigated",
    description: "Потенциальные технические проблемы в блокчейне или смарт-контрактах",
    mitigation: [
      "Регулярные аудиты безопасности",
      "Тестирование на проникновение",
      "Резервное копирование и восстановление",
      "Мониторинг 24/7",
    ],
    actionPlan: "Непрерывный мониторинг, регулярные аудиты, быстрое реагирование на инциденты",
    details: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          Технические сбои, уязвимости в смарт-контрактах или инфраструктуре могут 
          привести к потере средств или данных.
        </p>
        <div>
          <h4 className="font-bold mb-2">Меры по снижению:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            {[
              "Регулярные аудиты безопасности (CertiK, Trail of Bits)",
              "Тестирование на проникновение",
              "Резервное копирование и восстановление",
              "Мониторинг 24/7",
            ].map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Статус:</h4>
          <p className="text-sm text-emerald-400 font-medium">
            ✅ Риск значительно снижен через регулярные аудиты и тестирование
          </p>
        </div>
        <div className="pt-4 border-t border-white/10">
          <Link
            href="/blockchain"
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg transition-colors text-sm font-medium"
          >
            Просмотреть аудиты
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    ),
  },
  {
    id: "market",
    category: "Рыночные",
    name: "Волатильность рынка криптовалют",
    probability: "high",
    impact: "medium",
    status: "active",
    description: "Общая волатильность рынка криптовалют может повлиять на цену токенов",
    mitigation: [
      "Механизмы стабильности VOD (стейблкоин)",
      "Обеспечение реальными активами (водой)",
      "Арбитражные механизмы",
      "Диверсификация доходов",
    ],
    actionPlan: "Поддержание стабильности через механизмы стейблкоина, арбитраж",
    details: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          Общая волатильность рынка криптовалют может повлиять на цену токенов CivilizationProtocol, 
          хотя VOD защищён механизмами стабильности.
        </p>
        <div>
          <h4 className="font-bold mb-2">Меры по снижению:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            {[
              "Механизмы стабильности VOD (стейблкоин)",
              "Обеспечение реальными активами (водой)",
              "Арбитражные механизмы",
              "Диверсификация доходов",
            ].map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="pt-4 border-t border-white/10">
          <Link
            href="/tokenomics"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg transition-colors text-sm font-medium"
          >
            Узнать о стабильности
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    ),
  },
  {
    id: "operational",
    category: "Операционные",
    name: "Операционные риски",
    probability: "medium",
    impact: "medium",
    status: "active",
    description: "Риски, связанные с операционной деятельностью платформы",
    mitigation: [
      "Профессиональная команда",
      "Резервные системы",
      "Страхование",
      "Планы восстановления",
    ],
    actionPlan: "Поддержание профессиональной команды, резервные системы, страхование",
    details: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          Операционные риски включают проблемы с инфраструктурой, человеческий фактор, 
          проблемы с поставщиками услуг.
        </p>
        <div>
          <h4 className="font-bold mb-2">Меры по снижению:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            {[
              "Профессиональная команда с опытом",
              "Резервные системы и инфраструктура",
              "Страхование операционных рисков",
              "Планы восстановления после сбоев",
            ].map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "financial",
    category: "Финансовые",
    name: "Финансовые риски",
    probability: "low",
    impact: "medium",
    status: "active",
    description: "Риски, связанные с финансированием и ликвидностью",
    mitigation: [
      "Диверсификация источников дохода",
      "Резервный фонд",
      "Прозрачное управление финансами",
      "Регулярные финансовые отчёты",
    ],
    actionPlan: "Диверсификация доходов, резервный фонд, прозрачность",
    details: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          Финансовые риски включают проблемы с финансированием, ликвидностью, 
          управлением казначейством.
        </p>
        <div>
          <h4 className="font-bold mb-2">Меры по снижению:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            {[
              "Диверсификация источников дохода",
              "Резервный фонд на 12 месяцев операций",
              "Прозрачное управление финансами через DAO",
              "Регулярные финансовые отчёты",
            ].map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="pt-4 border-t border-white/10">
          <Link
            href="/treasury"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors text-sm font-medium"
          >
            Просмотреть казначейство
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    ),
  },
  {
    id: "competitive",
    category: "Конкурентные",
    name: "Конкурентное давление",
    probability: "medium",
    impact: "low",
    status: "active",
    description: "Появление конкурентов или улучшение существующих решений",
    mitigation: [
      "Уникальное ценностное предложение",
      "Сетевые эффекты",
      "Партнёрства",
      "Непрерывные инновации",
    ],
    actionPlan: "Фокус на уникальности, сетевые эффекты, партнёрства",
    details: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          Появление конкурентов или улучшение существующих решений может повлиять 
          на позицию платформы на рынке.
        </p>
        <div>
          <h4 className="font-bold mb-2">Меры по снижению:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            {[
              "Уникальное ценностное предложение (блокчейн + вода)",
              "Сетевые эффекты через DAO и сообщество",
              "Стратегические партнёрства",
              "Непрерывные инновации и развитие",
            ].map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    ),
  },
];

export default function RiskMatrixDashboard() {
  const [selectedRisk, setSelectedRisk] = useState<string | null>(null);

  const getProbabilityX = (probability: string) => {
    switch (probability) {
      case "low":
        return 0;
      case "medium":
        return 50;
      case "high":
        return 100;
      default:
        return 0;
    }
  };

  const getImpactY = (impact: string) => {
    switch (impact) {
      case "low":
        return 100;
      case "medium":
        return 50;
      case "high":
        return 0;
      default:
        return 0;
    }
  };

  const getRiskColor = (probability: string, impact: string) => {
    const prob = probability === "high" ? 3 : probability === "medium" ? 2 : 1;
    const imp = impact === "high" ? 3 : impact === "medium" ? 2 : 1;
    const score = prob * imp;
    
    if (score >= 6) return "bg-red-500";
    if (score >= 4) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "eliminated":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "mitigated":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    }
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-red-400 to-amber-500 bg-clip-text text-transparent">
            Матрица рисков
          </h2>
          <p className="text-slate-400 text-lg">
            Интерактивная визуализация рисков платформы и мер по их снижению
          </p>
        </motion.div>

        {/* Risk Matrix */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card p-8 border border-white/10 rounded-2xl mb-8"
        >
          <h3 className="text-xl font-black mb-6 flex items-center gap-2">
            <Target className="text-amber-400" size={24} />
            Матрица вероятности и влияния
          </h3>
          <div className="relative h-96">
            <svg viewBox="0 0 400 300" className="w-full h-full">
              {/* Grid */}
              <line x1="50" y1="50" x2="50" y2="250" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
              <line x1="50" y1="250" x2="350" y2="250" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
              
              {/* Labels */}
              <text x="200" y="280" textAnchor="middle" className="text-sm fill-slate-400">Вероятность</text>
              <text x="20" y="150" textAnchor="middle" className="text-sm fill-slate-400" transform="rotate(-90 20 150)">Влияние</text>
              
              {/* Probability labels */}
              <text x="100" y="270" textAnchor="middle" className="text-xs fill-slate-500">Низкая</text>
              <text x="200" y="270" textAnchor="middle" className="text-xs fill-slate-500">Средняя</text>
              <text x="300" y="270" textAnchor="middle" className="text-xs fill-slate-500">Высокая</text>
              
              {/* Impact labels */}
              <text x="30" y="200" textAnchor="middle" className="text-xs fill-slate-500">Низкое</text>
              <text x="30" y="150" textAnchor="middle" className="text-xs fill-slate-500">Среднее</text>
              <text x="30" y="100" textAnchor="middle" className="text-xs fill-slate-500">Высокое</text>
              
              {/* Risk zones */}
              <rect x="50" y="50" width="100" height="200" fill="rgba(16,185,129,0.1)" />
              <rect x="150" y="50" width="100" height="200" fill="rgba(245,158,11,0.1)" />
              <rect x="250" y="50" width="100" height="200" fill="rgba(239,68,68,0.1)" />
              
              {/* Risk points */}
              {risks.map((risk) => {
                const x = 50 + getProbabilityX(risk.probability) * 3;
                const y = 250 - getImpactY(risk.impact) * 2;
                return (
                  <g key={risk.id}>
                    <circle
                      cx={x}
                      cy={y}
                      r="8"
                      fill={getRiskColor(risk.probability, risk.impact)}
                      className="cursor-pointer hover:r-12 transition-all"
                      onClick={() => setSelectedRisk(selectedRisk === risk.id ? null : risk.id)}
                    />
                    {selectedRisk === risk.id && (
                      <text
                        x={x}
                        y={y - 15}
                        textAnchor="middle"
                        className="text-xs fill-white font-medium"
                      >
                        {risk.name}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </motion.div>

        {/* Risk Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {risks.map((risk, index) => (
            <motion.div
              key={risk.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <InfoPopup
                title={`${risk.category}: ${risk.name}`}
                content={risk.details}
                trigger={
                  <div
                    className={cn(
                      "glass-card p-6 border rounded-2xl cursor-pointer hover:scale-105 transition-all group relative overflow-hidden",
                      getStatusColor(risk.status)
                    )}
                  >
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                          <AlertTriangle className="text-amber-400" size={24} />
                        </div>
                        <div className={cn("px-2 py-1 rounded-lg text-xs font-medium", getStatusColor(risk.status))}>
                          {risk.status === "eliminated" ? "Устранён" : risk.status === "mitigated" ? "Снижен" : "Активен"}
                        </div>
                      </div>

                      <div className="mb-2">
                        <div className="text-xs text-slate-500 mb-1">{risk.category}</div>
                        <h3 className="text-lg font-black group-hover:text-white transition-colors">
                          {risk.name}
                        </h3>
                      </div>

                      <p className="text-sm text-slate-400 mb-4 line-clamp-2 group-hover:text-slate-300 transition-colors">
                        {risk.description}
                      </p>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">Вероятность:</span>
                          <span className={cn(
                            "font-medium",
                            risk.probability === "high" && "text-red-400",
                            risk.probability === "medium" && "text-amber-400",
                            risk.probability === "low" && "text-emerald-400"
                          )}>
                            {risk.probability === "high" ? "Высокая" : risk.probability === "medium" ? "Средняя" : "Низкая"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">Влияние:</span>
                          <span className={cn(
                            "font-medium",
                            risk.impact === "high" && "text-red-400",
                            risk.impact === "medium" && "text-amber-400",
                            risk.impact === "low" && "text-emerald-400"
                          )}>
                            {risk.impact === "high" ? "Высокое" : risk.impact === "medium" ? "Среднее" : "Низкое"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">Меры:</span>
                          <span className="text-slate-400">{risk.mitigation.length} мер</span>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                size="lg"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

