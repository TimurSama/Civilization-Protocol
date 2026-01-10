"use client";

import { motion } from "framer-motion";
import {
  Shield, CheckCircle2, AlertTriangle, FileText, Download,
  ExternalLink, Calendar, Building2, ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import InfoPopup from "./InfoPopup";

interface SecurityAudit {
  id: string;
  type: string;
  company: string;
  date: string;
  status: "completed" | "in-progress" | "scheduled";
  reportUrl?: string;
  findings: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    resolved: number;
  };
  details: React.ReactNode;
}

const securityAudits: SecurityAudit[] = [
  {
    id: "smart-contracts",
    type: "Smart Contracts Audit",
    company: "CertiK",
    date: "2024-11-15",
    status: "completed",
    reportUrl: "https://audits.vodeco.io/certik-smart-contracts-2024.pdf",
    findings: {
      critical: 0,
      high: 2,
      medium: 5,
      low: 3,
      resolved: 10,
    },
    details: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          Полный аудит всех смарт-контрактов платформы CivilizationProtocol, проведённый компанией CertiK, 
          одним из ведущих аудиторов безопасности блокчейн-проектов.
        </p>
        <div>
          <h4 className="font-bold mb-2">Найденные проблемы:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li>Критические: 0</li>
            <li>Высокие: 2 (все исправлены)</li>
            <li>Средние: 5 (все исправлены)</li>
            <li>Низкие: 3 (все исправлены)</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Статус:</h4>
          <p className="text-sm text-emerald-400 font-medium">
            ✅ Все проблемы исправлены и проверены повторно
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-2">Оценка безопасности:</h4>
          <p className="text-sm text-slate-400">
            CertiK Score: 95/100 - Отличный уровень безопасности
          </p>
        </div>
        <div className="pt-4 border-t border-white/10">
          <a
            href="https://audits.vodeco.io/certik-smart-contracts-2024.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg transition-colors text-sm font-medium"
          >
            <Download size={16} />
            Скачать отчёт
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    ),
  },
  {
    id: "security",
    type: "Security Audit",
    company: "Trail of Bits",
    date: "2024-10-20",
    status: "completed",
    reportUrl: "https://audits.vodeco.io/trailofbits-security-2024.pdf",
    findings: {
      critical: 0,
      high: 1,
      medium: 3,
      low: 2,
      resolved: 6,
    },
    details: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          Комплексный аудит безопасности всей платформы, включая инфраструктуру, 
          API и интеграции, проведённый Trail of Bits.
        </p>
        <div>
          <h4 className="font-bold mb-2">Области аудита:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li>Блокчейн-инфраструктура</li>
            <li>API и веб-сервисы</li>
            <li>Интеграции с внешними системами</li>
            <li>Хранение данных</li>
            <li>Управление ключами</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Найденные проблемы:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li>Критические: 0</li>
            <li>Высокие: 1 (исправлена)</li>
            <li>Средние: 3 (все исправлены)</li>
            <li>Низкие: 2 (все исправлены)</li>
          </ul>
        </div>
        <div className="pt-4 border-t border-white/10">
          <a
            href="https://audits.vodeco.io/trailofbits-security-2024.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors text-sm font-medium"
          >
            <Download size={16} />
            Скачать отчёт
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    ),
  },
  {
    id: "penetration",
    type: "Penetration Testing",
    company: "Hacken",
    date: "2024-12-01",
    status: "completed",
    reportUrl: "https://audits.vodeco.io/hacken-pentest-2024.pdf",
    findings: {
      critical: 0,
      high: 0,
      medium: 2,
      low: 4,
      resolved: 6,
    },
    details: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          Тестирование на проникновение (penetration testing) для выявления 
          уязвимостей в веб-приложении и инфраструктуре.
        </p>
        <div>
          <h4 className="font-bold mb-2">Тестируемые области:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li>Веб-приложение (OWASP Top 10)</li>
            <li>API endpoints</li>
            <li>Аутентификация и авторизация</li>
            <li>Хранение данных</li>
            <li>Сетевая безопасность</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Результаты:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li>Критические: 0</li>
            <li>Высокие: 0</li>
            <li>Средние: 2 (все исправлены)</li>
            <li>Низкие: 4 (все исправлены)</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Оценка:</h4>
          <p className="text-sm text-emerald-400 font-medium">
            ✅ Платформа прошла все тесты безопасности
          </p>
        </div>
        <div className="pt-4 border-t border-white/10">
          <a
            href="https://audits.vodeco.io/hacken-pentest-2024.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg transition-colors text-sm font-medium"
          >
            <Download size={16} />
            Скачать отчёт
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    ),
  },
];

export default function SecurityAuditDashboard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "in-progress":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="text-emerald-400" size={20} />;
      case "in-progress":
        return <AlertTriangle className="text-amber-400" size={20} />;
      default:
        return <Calendar className="text-blue-400" size={20} />;
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
          <h2 className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
            Аудит безопасности
          </h2>
          <p className="text-slate-400 text-lg">
            Результаты независимых аудитов безопасности платформы CivilizationProtocol
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {securityAudits.map((audit, index) => (
            <motion.div
              key={audit.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <InfoPopup
                title={`${audit.type} - ${audit.company}`}
                content={audit.details}
                trigger={
                  <div
                    className={cn(
                      "glass-card p-6 border rounded-2xl cursor-pointer hover:scale-105 transition-all group relative overflow-hidden",
                      getStatusColor(audit.status)
                    )}
                  >
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                          <Shield className="text-emerald-400" size={24} />
                        </div>
                        <div className={cn("px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1", getStatusColor(audit.status))}>
                          {getStatusIcon(audit.status)}
                          {audit.status === "completed" ? "Завершён" : audit.status === "in-progress" ? "В процессе" : "Запланирован"}
                        </div>
                      </div>

                      <h3 className="text-lg font-black mb-2 group-hover:text-white transition-colors">
                        {audit.type}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
                        <Building2 size={14} />
                        {audit.company}
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">Дата:</span>
                          <span className="text-slate-400">{new Date(audit.date).toLocaleDateString('ru-RU')}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">Проблем найдено:</span>
                          <span className="text-slate-400">
                            {audit.findings.critical + audit.findings.high + audit.findings.medium + audit.findings.low}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">Исправлено:</span>
                          <span className="text-emerald-400 font-medium">
                            {audit.findings.resolved}
                          </span>
                        </div>
                      </div>

                      {audit.reportUrl && (
                        <div className="pt-4 border-t border-white/10">
                          <div className="flex items-center gap-2 text-xs text-cyan-400 group-hover:text-cyan-300 transition-colors">
                            <FileText size={14} />
                            Отчёт доступен
                            <ArrowRight size={12} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                }
                size="lg"
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 border border-white/10 rounded-2xl"
        >
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
              <Shield className="text-emerald-400" size={32} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-black mb-2">Общий статус безопасности</h3>
              <p className="text-slate-400 mb-4">
                Платформа CivilizationProtocol прошла все независимые аудиты безопасности. 
                Все найденные проблемы были исправлены и проверены повторно.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-slate-800/50 rounded-lg">
                  <div className="text-2xl font-black text-emerald-400 mb-1">0</div>
                  <div className="text-xs text-slate-400">Критических</div>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-lg">
                  <div className="text-2xl font-black text-amber-400 mb-1">3</div>
                  <div className="text-xs text-slate-400">Высоких</div>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-lg">
                  <div className="text-2xl font-black text-blue-400 mb-1">10</div>
                  <div className="text-xs text-slate-400">Средних</div>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-lg">
                  <div className="text-2xl font-black text-emerald-400 mb-1">22</div>
                  <div className="text-xs text-slate-400">Всего исправлено</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

