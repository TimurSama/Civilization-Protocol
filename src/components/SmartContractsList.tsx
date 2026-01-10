"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileCode, CheckCircle2, AlertCircle, ExternalLink, Copy, Check,
  Shield, Database, Coins, Vote, FolderKanban, Gift
} from "lucide-react";
import { cn } from "@/lib/utils";
import InfoPopup from "./InfoPopup";

interface SmartContract {
  id: string;
  name: string;
  address: string;
  version: string;
  status: "verified" | "audited" | "pending";
  transactions: number;
  lastActivity: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  githubUrl?: string;
  auditReport?: string;
  abi?: string;
  description: string;
  details: React.ReactNode;
}

const smartContracts: SmartContract[] = [
  {
    id: "vod-token",
    name: "VOD Token Contract",
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    version: "v1.2.0",
    status: "audited",
    transactions: 124567,
    lastActivity: "2 минуты назад",
    icon: Coins,
    color: "cyan",
    githubUrl: "https://github.com/vodeco/contracts/blob/main/VODToken.sol",
    auditReport: "https://audits.vodeco.io/vod-token-2024.pdf",
    description: "Основной контракт токена VOD с механизмами эмиссии и сжигания",
    details: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          Контракт токена VOD реализует стандарт ERC-20 с дополнительными функциями 
          для эмиссии на основе данных о воде и механизмами стабильности.
        </p>
        <div>
          <h4 className="font-bold mb-2">Основные функции:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li>Стандартные функции ERC-20 (transfer, approve, etc.)</li>
            <li>Эмиссия токенов при добавлении данных о воде</li>
            <li>Сжигание токенов при удалении данных</li>
            <li>Механизмы стабильности цены</li>
            <li>Интеграция с арбитражными пулами</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Параметры:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li>Максимальное предложение: 105 квадриллионов VOD</li>
            <li>Базовая цена: $0.005 за токен</li>
            <li>Эмиссия: 1000 VOD за м³ воды</li>
          </ul>
        </div>
        <div className="pt-4 border-t border-white/10 space-y-2">
          <a
            href="https://github.com/vodeco/contracts/blob/main/VODToken.sol"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg transition-colors text-sm font-medium w-full justify-center"
          >
            <FileCode size={16} />
            Исходный код на GitHub
            <ExternalLink size={14} />
          </a>
          <a
            href="https://audits.vodeco.io/vod-token-2024.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg transition-colors text-sm font-medium w-full justify-center"
          >
            <Shield size={16} />
            Отчёт об аудите
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    ),
  },
  {
    id: "vodeco-token",
    name: "CivilizationProtocol Token Contract",
    address: "0x8ba1f109551bD432803012645Hac136c22C1779",
    version: "v1.1.0",
    status: "audited",
    transactions: 89234,
    lastActivity: "5 минут назад",
    icon: Database,
    color: "purple",
    githubUrl: "https://github.com/vodeco/contracts/blob/main/CivilizationProtocolToken.sol",
    auditReport: "https://audits.vodeco.io/vodeco-token-2024.pdf",
    description: "Контракт токена управления CivilizationProtocol для DAO и стейкинга",
    details: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          Контракт токена CivilizationProtocol используется для управления DAO, стейкинга 
          и получения прав на голосование в экосистеме.
        </p>
        <div>
          <h4 className="font-bold mb-2">Основные функции:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li>Управление DAO через голосование</li>
            <li>Стейкинг с наградами</li>
            <li>Делегирование прав голоса</li>
            <li>Вестинг токенов команды и инвесторов</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Параметры:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li>Общее предложение: 1 миллиард CivilizationProtocol</li>
            <li>Распределение: см. Token Distribution Dashboard</li>
            <li>APY стейкинга: 10-25%</li>
          </ul>
        </div>
        <div className="pt-4 border-t border-white/10 space-y-2">
          <a
            href="https://github.com/vodeco/contracts/blob/main/CivilizationProtocolToken.sol"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg transition-colors text-sm font-medium w-full justify-center"
          >
            <FileCode size={16} />
            Исходный код на GitHub
            <ExternalLink size={14} />
          </a>
          <a
            href="https://audits.vodeco.io/vodeco-token-2024.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg transition-colors text-sm font-medium w-full justify-center"
          >
            <Shield size={16} />
            Отчёт об аудите
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    ),
  },
  {
    id: "staking",
    name: "Staking Contract",
    address: "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE",
    version: "v1.0.0",
    status: "audited",
    transactions: 45678,
    lastActivity: "10 минут назад",
    icon: Gift,
    color: "emerald",
    githubUrl: "https://github.com/vodeco/contracts/blob/main/Staking.sol",
    auditReport: "https://audits.vodeco.io/staking-2024.pdf",
    description: "Контракт для стейкинга CivilizationProtocol токенов с различными пулами",
    details: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          Контракт стейкинга позволяет пользователям застейкать токены CivilizationProtocol 
          и получать награды за участие в управлении и поддержке сети.
        </p>
        <div>
          <h4 className="font-bold mb-2">Пулы стейкинга:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li>Governance Pool: 10% APY, права голоса</li>
            <li>Data Access Pool: 12% APY, доступ к премиум данным</li>
            <li>Project Participation: 15% APY, доступ к TokenHub</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Механизм:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li>Минимальный стейк: зависит от пула</li>
            <li>Период блокировки: 30-365 дней</li>
            <li>Награды: автоматическое начисление</li>
            <li>Досрочное снятие: штраф 10%</li>
          </ul>
        </div>
        <div className="pt-4 border-t border-white/10">
          <a
            href="/nexus"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg transition-colors text-sm font-medium"
          >
            Начать стейкинг
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    ),
  },
  {
    id: "dao",
    name: "DAO Governance Contract",
    address: "0x4e3fBD56CD56c3e72c1403e103b45Db9da5B9D2B",
    version: "v1.3.0",
    status: "audited",
    transactions: 23456,
    lastActivity: "15 минут назад",
    icon: Vote,
    color: "blue",
    githubUrl: "https://github.com/vodeco/contracts/blob/main/DAO.sol",
    auditReport: "https://audits.vodeco.io/dao-2024.pdf",
    description: "Контракт управления DAO для голосований и предложений",
    details: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          Контракт DAO управляет всеми процессами децентрализованного управления, 
          включая голосования, предложения и исполнение решений.
        </p>
        <div>
          <h4 className="font-bold mb-2">Функции:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li>Создание и управление предложениями</li>
            <li>Голосование держателей токенов</li>
            <li>Автоматическое исполнение решений</li>
            <li>Делегирование прав голоса</li>
            <li>Кварум и пороги голосования</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Параметры:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li>Минимальный порог: 1% от общего предложения</li>
            <li>Кварум: 10% от общего предложения</li>
            <li>Время голосования: 7 дней</li>
            <li>Время исполнения: 24 часа</li>
          </ul>
        </div>
        <div className="pt-4 border-t border-white/10">
          <a
            href="/dao"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors text-sm font-medium"
          >
            Управление DAO
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    ),
  },
  {
    id: "tokenhub",
    name: "TokenHub Contract",
    address: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    version: "v1.0.0",
    status: "verified",
    transactions: 12345,
    lastActivity: "1 час назад",
    icon: FolderKanban,
    color: "amber",
    githubUrl: "https://github.com/vodeco/contracts/blob/main/TokenHub.sol",
    description: "Контракт для управления проектами и инвестициями в TokenHub",
    details: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          Контракт TokenHub управляет проектами, инвестициями и распределением 
          токенов R-VOD для участников проектов.
        </p>
        <div>
          <h4 className="font-bold mb-2">Функции:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li>Создание и управление проектами</li>
            <li>Приём инвестиций в проекты</li>
            <li>Распределение R-VOD токенов</li>
            <li>Отслеживание прогресса проектов</li>
            <li>Выплата дивидендов инвесторам</li>
          </ul>
        </div>
        <div className="pt-4 border-t border-white/10">
          <a
            href="/tokenhub"
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 rounded-lg transition-colors text-sm font-medium"
          >
            Открыть TokenHub
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    ),
  },
  {
    id: "rewards",
    name: "Rewards Contract",
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    version: "v1.0.0",
    status: "verified",
    transactions: 67890,
    lastActivity: "30 минут назад",
    icon: Gift,
    color: "rose",
    githubUrl: "https://github.com/vodeco/contracts/blob/main/Rewards.sol",
    description: "Контракт для начисления наград пользователям (Learn-to-Earn)",
    details: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          Контракт наград управляет системой Learn-to-Earn, начисляя токены VOD 
          пользователям за изучение платформы и участие в миссиях.
        </p>
        <div>
          <h4 className="font-bold mb-2">Типы наград:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li>Изучение презентаций: 10-50 VOD</li>
            <li>Выполнение миссий: 100-1000 VOD</li>
            <li>Участие в DAO: 25-100 VOD</li>
            <li>Достижения: 50-500 VOD</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Механизм:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li>Автоматическое начисление при выполнении условий</li>
            <li>Верификация через смарт-контракты</li>
            <li>Защита от злоупотреблений</li>
            <li>Лимиты на награды</li>
          </ul>
        </div>
        <div className="pt-4 border-t border-white/10">
          <a
            href="/missions"
            className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 rounded-lg transition-colors text-sm font-medium"
          >
            Выполнить миссии
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    ),
  },
];

export default function SmartContractsList() {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const copyAddress = (address: string, id: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(id);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "audited":
        return <CheckCircle2 className="text-emerald-400" size={20} />;
      case "verified":
        return <CheckCircle2 className="text-blue-400" size={20} />;
      default:
        return <AlertCircle className="text-amber-400" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "audited":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "verified":
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
          <h2 className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Смарт-контракты
          </h2>
          <p className="text-slate-400 text-lg">
            Публичные адреса и информация о всех смарт-контрактах платформы
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {smartContracts.map((contract, index) => (
            <motion.div
              key={contract.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <InfoPopup
                title={contract.name}
                content={contract.details}
                trigger={
                  <div
                    className={cn(
                      "glass-card p-6 border rounded-2xl cursor-pointer hover:scale-105 transition-all group relative overflow-hidden",
                      contract.color === "cyan" && "bg-cyan-500/10 border-cyan-500/30 hover:border-cyan-500/50",
                      contract.color === "purple" && "bg-purple-500/10 border-purple-500/30 hover:border-purple-500/50",
                      contract.color === "emerald" && "bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500/50",
                      contract.color === "blue" && "bg-blue-500/10 border-blue-500/30 hover:border-blue-500/50",
                      contract.color === "amber" && "bg-amber-500/10 border-amber-500/30 hover:border-amber-500/50",
                      contract.color === "rose" && "bg-rose-500/10 border-rose-500/30 hover:border-rose-500/50",
                    )}
                  >
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center",
                          contract.color === "cyan" && "bg-cyan-500/20 text-cyan-400",
                          contract.color === "purple" && "bg-purple-500/20 text-purple-400",
                          contract.color === "emerald" && "bg-emerald-500/20 text-emerald-400",
                          contract.color === "blue" && "bg-blue-500/20 text-blue-400",
                          contract.color === "amber" && "bg-amber-500/20 text-amber-400",
                          contract.color === "rose" && "bg-rose-500/20 text-rose-400",
                        )}>
                          <contract.icon size={24} />
                        </div>
                        <div className={cn("px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1", getStatusColor(contract.status))}>
                          {getStatusIcon(contract.status)}
                          {contract.status === "audited" ? "Аудирован" : contract.status === "verified" ? "Верифицирован" : "Ожидает"}
                        </div>
                      </div>

                      <h3 className="text-lg font-black mb-2 group-hover:text-white transition-colors">
                        {contract.name}
                      </h3>
                      <p className="text-sm text-slate-400 mb-4 line-clamp-2 group-hover:text-slate-300 transition-colors">
                        {contract.description}
                      </p>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">Адрес:</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              copyAddress(contract.address, contract.id);
                            }}
                            className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                          >
                            {copiedAddress === contract.id ? (
                              <>
                                <Check size={12} />
                                Скопировано
                              </>
                            ) : (
                              <>
                                <Copy size={12} />
                                {contract.address.slice(0, 6)}...{contract.address.slice(-4)}
                              </>
                            )}
                          </button>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">Версия:</span>
                          <span className="text-slate-400">{contract.version}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">Транзакций:</span>
                          <span className="text-slate-400">{contract.transactions.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">Активность:</span>
                          <span className="text-slate-400">{contract.lastActivity}</span>
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

