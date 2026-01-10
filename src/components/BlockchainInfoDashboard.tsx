"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Network, Database, Shield, Activity, Clock, Users,
  ArrowRight, ExternalLink, CheckCircle2, AlertCircle, Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import InfoPopup from "./InfoPopup";
import Link from "next/link";

interface BlockchainNetwork {
  name: string;
  type: string;
  currentBlock: number;
  validators: number;
  blockTime: number; // секунды
  gasPrice: string;
  totalTransactions: number;
  explorerUrl: string;
}

// Демо-данные (в реальности будут из API)
const networkData: BlockchainNetwork = {
  name: "CivilizationProtocol Chain",
  type: "EVM-compatible",
  currentBlock: 1245678,
  validators: 25,
  blockTime: 2,
  gasPrice: "20 Gwei",
  totalTransactions: 2456789,
  explorerUrl: "https://explorer.vodeco.io",
};

export default function BlockchainInfoDashboard() {
  const [network, setNetwork] = useState(networkData);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Симуляция обновления данных
    const interval = setInterval(() => {
      setIsUpdating(true);
      setTimeout(() => {
        setNetwork(prev => ({
          ...prev,
          currentBlock: prev.currentBlock + 1,
          totalTransactions: prev.totalTransactions + Math.floor(Math.random() * 10),
        }));
        setIsUpdating(false);
      }, 500);
    }, 5000); // Обновление каждые 5 секунд

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-purple-400 to-cyan-500 bg-clip-text text-transparent">
            Блокчейн-сеть
          </h2>
          <p className="text-slate-400 text-lg">
            Информация о блокчейн-сети CivilizationProtocol и её параметрах
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <InfoPopup
            title="Название сети"
            content={
              <div className="space-y-4">
                <p className="text-sm text-slate-300">
                  CivilizationProtocol Chain - это EVM-совместимая блокчейн-сеть, специально разработанная 
                  для платформы CivilizationProtocol с оптимизацией для работы с данными о воде.
                </p>
                <div>
                  <h4 className="font-bold mb-2">Особенности:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
                    <li>EVM-совместимость для работы с существующими инструментами</li>
                    <li>Оптимизация для хранения больших объёмов данных</li>
                    <li>Низкие комиссии за транзакции</li>
                    <li>Высокая пропускная способность</li>
                  </ul>
                </div>
              </div>
            }
            trigger={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card p-6 border border-white/10 rounded-2xl cursor-pointer hover:scale-105 transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Network className="text-purple-400" size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Сеть</div>
                    <div className="text-xl font-black group-hover:text-white transition-colors">
                      {network.name}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors">
                  {network.type}
                </div>
              </motion.div>
            }
            size="md"
          />

          <InfoPopup
            title="Текущий блок"
            content={
              <div className="space-y-4">
                <p className="text-sm text-slate-300">
                  Текущий номер блока в блокчейне. Блоки создаются каждые {network.blockTime} секунды.
                </p>
                <div>
                  <h4 className="font-bold mb-2">Статистика:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
                    <li>Время блока: {network.blockTime} секунды</li>
                    <li>Блоков в день: ~{Math.floor(86400 / network.blockTime)}</li>
                    <li>Скорость создания: {network.blockTime} сек/блок</li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <a
                    href={network.explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg transition-colors text-sm font-medium"
                  >
                    Открыть в Explorer
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            }
            trigger={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card p-6 border border-white/10 rounded-2xl cursor-pointer hover:scale-105 transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                    <Database className="text-cyan-400" size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Текущий блок</div>
                    <div className="text-xl font-black group-hover:text-white transition-colors flex items-center gap-2">
                      {network.currentBlock.toLocaleString()}
                      {isUpdating && (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Activity size={16} className="text-cyan-400" />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors">
                  Обновляется в реальном времени
                </div>
              </motion.div>
            }
            size="md"
          />

          <InfoPopup
            title="Валидаторы"
            content={
              <div className="space-y-4">
                <p className="text-sm text-slate-300">
                  Валидаторы отвечают за создание блоков и поддержание консенсуса в сети.
                </p>
                <div>
                  <h4 className="font-bold mb-2">Требования к валидаторам:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
                    <li>Минимальный стейк: 1,000,000 CivilizationProtocol</li>
                    <li>Технические требования: сервер с высокой доступностью</li>
                    <li>Награды: комиссии с транзакций</li>
                    <li>Штрафы: за простоя или злонамеренное поведение</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Децентрализация:</h4>
                  <p className="text-sm text-slate-400">
                    {network.validators} активных валидаторов обеспечивают децентрализацию сети.
                  </p>
                </div>
              </div>
            }
            trigger={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card p-6 border border-white/10 rounded-2xl cursor-pointer hover:scale-105 transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <Users className="text-emerald-400" size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Валидаторы</div>
                    <div className="text-xl font-black group-hover:text-white transition-colors">
                      {network.validators}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors">
                  Активных узлов
                </div>
              </motion.div>
            }
            size="md"
          />

          <InfoPopup
            title="Время блока"
            content={
              <div className="space-y-4">
                <p className="text-sm text-slate-300">
                  Время создания нового блока в сети. Низкое время блока обеспечивает 
                  быструю обработку транзакций.
                </p>
                <div>
                  <h4 className="font-bold mb-2">Сравнение:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
                    <li>CivilizationProtocol Chain: {network.blockTime} секунды</li>
                    <li>Ethereum: ~12 секунд</li>
                    <li>Bitcoin: ~10 минут</li>
                    <li>Polygon: ~2 секунды</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Преимущества:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
                    <li>Быстрое подтверждение транзакций</li>
                    <li>Высокая пропускная способность</li>
                    <li>Низкие комиссии</li>
                  </ul>
                </div>
              </div>
            }
            trigger={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card p-6 border border-white/10 rounded-2xl cursor-pointer hover:scale-105 transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <Clock className="text-blue-400" size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Время блока</div>
                    <div className="text-xl font-black group-hover:text-white transition-colors">
                      {network.blockTime} сек
                    </div>
                  </div>
                </div>
                <div className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors">
                  Среднее время создания
                </div>
              </motion.div>
            }
            size="md"
          />

          <InfoPopup
            title="Gas Price"
            content={
              <div className="space-y-4">
                <p className="text-sm text-slate-300">
                  Текущая цена газа (комиссия) за транзакцию в сети.
                </p>
                <div>
                  <h4 className="font-bold mb-2">Факторы влияния:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
                    <li>Загрузка сети</li>
                    <li>Сложность транзакций</li>
                    <li>Приоритет пользователя</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Средняя комиссия:</h4>
                  <p className="text-sm text-slate-400">
                    ~$0.001 за стандартную транзакцию (значительно ниже Ethereum)
                  </p>
                </div>
              </div>
            }
            trigger={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card p-6 border border-white/10 rounded-2xl cursor-pointer hover:scale-105 transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                    <Activity className="text-amber-400" size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Gas Price</div>
                    <div className="text-xl font-black group-hover:text-white transition-colors">
                      {network.gasPrice}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors">
                  Текущая цена
                </div>
              </motion.div>
            }
            size="md"
          />

          <InfoPopup
            title="Всего транзакций"
            content={
              <div className="space-y-4">
                <p className="text-sm text-slate-300">
                  Общее количество транзакций, обработанных сетью с момента запуска.
                </p>
                <div>
                  <h4 className="font-bold mb-2">Статистика:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
                    <li>Всего транзакций: {network.totalTransactions.toLocaleString()}</li>
                    <li>Транзакций в день: ~{Math.floor(network.totalTransactions / 365)}</li>
                    <li>Средний размер транзакции: ~2 KB</li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <a
                    href={network.explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg transition-colors text-sm font-medium"
                  >
                    Просмотреть транзакции
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            }
            trigger={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card p-6 border border-white/10 rounded-2xl cursor-pointer hover:scale-105 transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center">
                    <Shield className="text-rose-400" size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Транзакций</div>
                    <div className="text-xl font-black group-hover:text-white transition-colors">
                      {network.totalTransactions.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors">
                  Всего обработано
                </div>
              </motion.div>
            }
            size="md"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 border border-white/10 rounded-2xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black mb-2 flex items-center gap-2">
                <ExternalLink className="text-cyan-400" size={20} />
                Блокчейн-эксплорер
              </h3>
              <p className="text-sm text-slate-400">
                Просматривайте блоки, транзакции и смарт-контракты в реальном времени
              </p>
            </div>
            <a
              href={network.explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-cyan-500 text-ocean-deep font-black rounded-xl hover:bg-cyan-400 transition-all flex items-center gap-2"
            >
              Открыть Explorer
              <ArrowRight size={20} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

