"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, ChevronRight, ChevronDown, Search, Menu, Code,
  Copy, Check, ExternalLink, FileText, Layers, Shield, Cpu,
  Database, Users, Coins, Globe, Zap, Lock, Network, BarChart3,
  GitBranch, Terminal, Play, Pause, Download, Share2, X,
  AlertCircle, CheckCircle2, Info, Calculator, Link2
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Chapters structure
const chapters = [
  {
    id: 1,
    title: "Abstract",
    sections: [
      { id: "1.1", title: "Executive Summary" },
      { id: "1.2", title: "Vision & Mission" },
      { id: "1.3", title: "Key Innovations" },
    ]
  },
  {
    id: 2,
    title: "Architecture",
    sections: [
      { id: "2.1", title: "12-Layer Architecture" },
      { id: "2.2", title: "Physical Layer" },
      { id: "2.3", title: "Data & IoT Layer" },
      { id: "2.4", title: "Blockchain Layer" },
      { id: "2.5", title: "Economic Layer" },
      { id: "2.6", title: "DAO Layer" },
      { id: "2.7", title: "Interface Layer" },
      { id: "2.8", title: "AI Layer" },
      { id: "2.9", title: "Security Layer" },
      { id: "2.10", title: "Educational Layer" },
      { id: "2.11", title: "Gaming Layer" },
      { id: "2.12", title: "Social Layer" },
      { id: "2.13", title: "Integration Layer" },
    ]
  },
  {
    id: 3,
    title: "Protocols",
    sections: [
      { id: "3.1", title: "Data Schemas" },
      { id: "3.2", title: "API Specification" },
      { id: "3.3", title: "Event System" },
      { id: "3.4", title: "State Management" },
    ]
  },
  {
    id: 4,
    title: "Blockchain",
    sections: [
      { id: "4.1", title: "Smart Contracts" },
      { id: "4.2", title: "Consensus Mechanism" },
      { id: "4.3", title: "Cross-chain Bridges" },
      { id: "4.4", title: "ZK-Rollups" },
    ]
  },
  {
    id: 5,
    title: "Tokenomics",
    sections: [
      { id: "5.1", title: "Token Architecture" },
      { id: "5.2", title: "Distribution Model" },
      { id: "5.3", title: "Staking Mechanics" },
      { id: "5.4", title: "Governance Rights" },
      { id: "5.5", title: "Value Accrual" },
    ]
  },
  {
    id: 6,
    title: "Security",
    sections: [
      { id: "6.1", title: "Threat Model" },
      { id: "6.2", title: "Cryptographic Primitives" },
      { id: "6.3", title: "Audit Results" },
      { id: "6.4", title: "Bug Bounty" },
    ]
  },
  {
    id: 7,
    title: "Integrations",
    sections: [
      { id: "7.1", title: "IoT Protocols" },
      { id: "7.2", title: "AI/ML Models" },
      { id: "7.3", title: "External APIs" },
      { id: "7.4", title: "SDKs" },
    ]
  },
  {
    id: 8,
    title: "Roadmap",
    sections: [
      { id: "8.1", title: "Technical Milestones" },
      { id: "8.2", title: "Version History" },
      { id: "8.3", title: "Future Roadmap" },
    ]
  },
];

// Code examples
const codeExamples: Record<string, { language: string; code: string }> = {
  "water_data_schema": {
    language: "typescript",
    code: `interface WaterQualityData {
  sensorId: string;
  timestamp: number;
  location: {
    lat: number;
    lng: number;
    altitude?: number;
  };
  metrics: {
    ph: number;           // 0-14
    temperature: number;  // °C
    oxygen: number;       // mg/L
    turbidity: number;    // NTU
    conductivity: number; // µS/cm
  };
  verified: boolean;
  blockchainTx?: string;
}`
  },
  "smart_contract": {
    language: "solidity",
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VODToken is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 10**18;
    
    mapping(address => uint256) public stakingBalance;
    mapping(address => uint256) public rewardBalance;
    
    event Staked(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 amount);
    
    constructor() ERC20("VODeco Token", "VOD") {
        _mint(msg.sender, MAX_SUPPLY * 10 / 100); // 10% initial
    }
    
    function stake(uint256 amount) external {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        _transfer(msg.sender, address(this), amount);
        stakingBalance[msg.sender] += amount;
        emit Staked(msg.sender, amount);
    }
}`
  },
  "api_example": {
    language: "javascript",
    code: `// VODeco API Example
import { VodecoClient } from '@vodeco/sdk';

const client = new VodecoClient({
  apiKey: process.env.VODECO_API_KEY,
  network: 'mainnet'
});

// Fetch water quality data
const data = await client.waterQuality.get({
  region: 'central_asia',
  timeRange: '24h',
  metrics: ['ph', 'temperature', 'oxygen']
});

// Submit sensor reading
const tx = await client.sensors.submitReading({
  sensorId: 'sensor_001',
  metrics: { ph: 7.2, temperature: 18.5 },
  signature: await wallet.sign(payload)
});

console.log('Transaction:', tx.hash);`
  },
};

export default function SmartWhitePaper() {
  const [activeChapter, setActiveChapter] = useState(1);
  const [activeSection, setActiveSection] = useState("1.1");
  const [expandedChapters, setExpandedChapters] = useState<number[]>([1]);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showToc, setShowToc] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const toggleChapter = (chapterId: number) => {
    setExpandedChapters(prev =>
      prev.includes(chapterId)
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className={cn(
      "min-h-screen transition-colors",
      darkMode ? "bg-[#0d1117] text-slate-200" : "bg-white text-slate-800"
    )}>
      {/* Header - под главным Navbar */}
      <div className={cn(
        "sticky top-20 left-0 right-0 z-[90] backdrop-blur-xl border-b",
        darkMode ? "bg-[#0d1117]/90 border-slate-800" : "bg-white/90 border-slate-200"
      )}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowToc(!showToc)}
              className={cn(
                "p-2 rounded-lg transition-colors",
                darkMode ? "hover:bg-slate-800" : "hover:bg-slate-100"
              )}
            >
              <Menu size={20} />
            </button>
            <Link href="/presentations" className="flex items-center gap-2">
              <BookOpen className="text-emerald-500" size={24} />
              <span className="font-bold">VODeco WhitePaper</span>
              <span className={cn("text-xs px-2 py-0.5 rounded-full", darkMode ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-600")}>
                v2.0
              </span>
            </Link>
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search documentation..."
                className={cn(
                  "pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 w-64",
                  darkMode ? "bg-slate-800 border border-slate-700" : "bg-slate-100 border border-slate-200"
                )}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={cn(
                "p-2 rounded-lg transition-colors",
                darkMode ? "hover:bg-slate-800" : "hover:bg-slate-100"
              )}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
            <button className={cn(
              "px-4 py-2 rounded-lg transition-colors flex items-center gap-2",
              darkMode ? "bg-slate-800 hover:bg-slate-700" : "bg-slate-100 hover:bg-slate-200"
            )}>
              <Download size={16} /> PDF
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar TOC */}
        <AnimatePresence>
          {showToc && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className={cn(
                "fixed left-0 top-20 bottom-0 overflow-y-auto border-r z-30",
                darkMode ? "bg-[#0d1117] border-slate-800" : "bg-white border-slate-200"
              )}
            >
              <nav className="p-4">
                <div className="text-xs font-bold text-slate-500 mb-4">TABLE OF CONTENTS</div>
                {chapters.map(chapter => (
                  <div key={chapter.id} className="mb-2">
                    <button
                      onClick={() => toggleChapter(chapter.id)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 rounded-lg text-left font-medium transition-colors",
                        activeChapter === chapter.id
                          ? darkMode ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-600"
                          : darkMode ? "hover:bg-slate-800" : "hover:bg-slate-100"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">{chapter.id}.</span>
                        {chapter.title}
                      </span>
                      <ChevronDown
                        size={16}
                        className={cn(
                          "transition-transform",
                          expandedChapters.includes(chapter.id) && "rotate-180"
                        )}
                      />
                    </button>
                    
                    <AnimatePresence>
                      {expandedChapters.includes(chapter.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="ml-6 mt-1 space-y-1"
                        >
                          {chapter.sections.map(section => (
                            <button
                              key={section.id}
                              onClick={() => {
                                setActiveChapter(chapter.id);
                                setActiveSection(section.id);
                              }}
                              className={cn(
                                "w-full text-left px-3 py-1.5 rounded text-sm transition-colors",
                                activeSection === section.id
                                  ? "text-emerald-400 font-medium"
                                  : darkMode ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-800"
                              )}
                            >
                              {section.id} {section.title}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main content */}
        <main className={cn(
          "flex-1 max-w-4xl mx-auto px-8 py-12",
          showToc && "ml-[280px]"
        )}>
          {/* Chapter 1: Abstract */}
          {activeChapter === 1 && (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl font-black mb-8">1. Abstract</h1>
              
              <section id="1.1" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-slate-700">1.1 Executive Summary</h2>
                <p className={cn("mb-4 leading-relaxed", darkMode ? "text-slate-300" : "text-slate-600")}>
                  VODeco (Value of Data — Water Ecosystem) представляет собой децентрализованную 
                  кибер-физическую платформу для управления водными ресурсами, объединяющую 
                  технологии блокчейн, IoT и AI для создания прозрачной и эффективной системы 
                  мониторинга и управления.
                </p>
                
                <div className={cn("p-4 rounded-xl mb-6", darkMode ? "bg-emerald-500/10 border border-emerald-500/30" : "bg-emerald-50 border border-emerald-200")}>
                  <div className="flex items-start gap-3">
                    <Info className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                    <div>
                      <div className="font-bold text-emerald-400 mb-1">Key Insight</div>
                      <p className={cn("text-sm", darkMode ? "text-slate-300" : "text-slate-600")}>
                        Платформа решает проблему фрагментации данных о водных ресурсах, 
                        объединяя информацию из 1000+ разрозненных систем в единую 
                        верифицируемую базу данных.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="1.2" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-slate-700">1.2 Vision & Mission</h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className={cn("p-6 rounded-xl", darkMode ? "bg-slate-800/50" : "bg-slate-100")}>
                    <h3 className="font-bold text-lg mb-2">Vision</h3>
                    <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-600")}>
                      Глобальная децентрализованная система управления водными ресурсами, 
                      обеспечивающая устойчивое развитие для 8 миллиардов людей.
                    </p>
                  </div>
                  <div className={cn("p-6 rounded-xl", darkMode ? "bg-slate-800/50" : "bg-slate-100")}>
                    <h3 className="font-bold text-lg mb-2">Mission</h3>
                    <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-600")}>
                      Создание открытой, прозрачной и эффективной инфраструктуры данных 
                      для водной экосистемы с использованием передовых технологий.
                    </p>
                  </div>
                </div>
              </section>

              <section id="1.3" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-slate-700">1.3 Key Innovations</h2>
                
                <ul className="space-y-4">
                  {[
                    { icon: <Database size={20} />, title: "Decentralized Data Layer", desc: "Блокчейн-верификация всех данных о водных ресурсах" },
                    { icon: <Cpu size={20} />, title: "IoT Integration", desc: "Прямое подключение сенсоров к блокчейну" },
                    { icon: <Users size={20} />, title: "DAO Governance", desc: "Децентрализованное управление через голосование" },
                    { icon: <Coins size={20} />, title: "Token Economy", desc: "Экономические стимулы для всех участников" },
                  ].map((item, i) => (
                    <li key={i} className={cn("flex items-start gap-4 p-4 rounded-xl", darkMode ? "bg-slate-800/50" : "bg-slate-100")}>
                      <div className="text-emerald-400">{item.icon}</div>
                      <div>
                        <div className="font-bold">{item.title}</div>
                        <div className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-600")}>{item.desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </motion.article>
          )}

          {/* Chapter 3: Protocols */}
          {activeChapter === 3 && (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl font-black mb-8">3. Protocols</h1>
              
              <section id="3.1" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-slate-700">3.1 Data Schemas</h2>
                
                <p className={cn("mb-6", darkMode ? "text-slate-300" : "text-slate-600")}>
                  Все данные в экосистеме VODeco следуют строгим схемам для обеспечения 
                  совместимости и верификации.
                </p>
                
                {/* Code block */}
                <div className={cn("rounded-xl overflow-hidden mb-6", darkMode ? "bg-[#161b22]" : "bg-slate-900")}>
                  <div className="flex items-center justify-between px-4 py-2 bg-black/20">
                    <div className="flex items-center gap-2">
                      <Code size={14} className="text-slate-500" />
                      <span className="text-xs text-slate-400">water_data_schema.ts</span>
                    </div>
                    <button
                      onClick={() => copyCode(codeExamples.water_data_schema.code, "water_data_schema")}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      {copiedCode === "water_data_schema" ? <Check size={14} /> : <Copy size={14} />}
                      {copiedCode === "water_data_schema" ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <pre className="p-4 text-sm overflow-x-auto">
                    <code className="text-slate-300">{codeExamples.water_data_schema.code}</code>
                  </pre>
                </div>
              </section>
            </motion.article>
          )}

          {/* Chapter 4: Blockchain */}
          {activeChapter === 4 && (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl font-black mb-8">4. Blockchain</h1>
              
              <section id="4.1" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-slate-700">4.1 Smart Contracts</h2>
                
                <div className={cn("p-4 rounded-xl mb-6", darkMode ? "bg-yellow-500/10 border border-yellow-500/30" : "bg-yellow-50 border border-yellow-200")}>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="text-yellow-500 shrink-0 mt-0.5" size={20} />
                    <div>
                      <div className="font-bold text-yellow-400 mb-1">Security Note</div>
                      <p className={cn("text-sm", darkMode ? "text-slate-300" : "text-slate-600")}>
                        Все смарт-контракты проходят аудит от CertiK и Trail of Bits 
                        перед деплоем в mainnet.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Code block */}
                <div className={cn("rounded-xl overflow-hidden mb-6", darkMode ? "bg-[#161b22]" : "bg-slate-900")}>
                  <div className="flex items-center justify-between px-4 py-2 bg-black/20">
                    <div className="flex items-center gap-2">
                      <Code size={14} className="text-slate-500" />
                      <span className="text-xs text-slate-400">VODToken.sol</span>
                    </div>
                    <button
                      onClick={() => copyCode(codeExamples.smart_contract.code, "smart_contract")}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      {copiedCode === "smart_contract" ? <Check size={14} /> : <Copy size={14} />}
                      {copiedCode === "smart_contract" ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <pre className="p-4 text-sm overflow-x-auto">
                    <code className="text-slate-300">{codeExamples.smart_contract.code}</code>
                  </pre>
                </div>
              </section>
            </motion.article>
          )}

          {/* Chapter 5: Tokenomics */}
          {activeChapter === 5 && (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl font-black mb-8">5. Tokenomics</h1>
              
              <section id="5.1" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-slate-700">5.1 Token Architecture</h2>
                
                <p className={cn("mb-6", darkMode ? "text-slate-300" : "text-slate-600")}>
                  Экосистема VODeco использует трёхуровневую токеномическую модель:
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  {[
                    { name: "VOD", type: "Governance", supply: "1B", color: "cyan" },
                    { name: "R-VOD", type: "Reputation", supply: "Dynamic", color: "purple" },
                    { name: "P-VOD", type: "Project", supply: "Per Project", color: "green" },
                  ].map((token, i) => (
                    <div key={i} className={cn("p-6 rounded-xl text-center", darkMode ? "bg-slate-800/50" : "bg-slate-100")}>
                      <div className={`text-3xl font-black text-${token.color}-400 mb-2`}>{token.name}</div>
                      <div className="text-sm text-slate-400 mb-1">{token.type} Token</div>
                      <div className="text-xs text-slate-500">Supply: {token.supply}</div>
                    </div>
                  ))}
                </div>
                
                {/* Interactive calculator */}
                <div className={cn("p-6 rounded-xl", darkMode ? "bg-slate-800/50" : "bg-slate-100")}>
                  <div className="flex items-center gap-2 mb-4">
                    <Calculator size={20} className="text-emerald-400" />
                    <h3 className="font-bold">Staking Calculator</h3>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-1">Amount (VOD)</label>
                      <input
                        type="number"
                        defaultValue={10000}
                        className={cn(
                          "w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50",
                          darkMode ? "bg-slate-900 border border-slate-700" : "bg-white border border-slate-200"
                        )}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1">Duration</label>
                      <select className={cn(
                        "w-full px-4 py-2 rounded-lg focus:outline-none",
                        darkMode ? "bg-slate-900 border border-slate-700" : "bg-white border border-slate-200"
                      )}>
                        <option>30 days</option>
                        <option>90 days</option>
                        <option>180 days</option>
                        <option>365 days</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1">Estimated APY</label>
                      <div className="text-2xl font-bold text-emerald-400 py-2">12.5%</div>
                    </div>
                  </div>
                </div>
              </section>
            </motion.article>
          )}

          {/* Default content for other chapters */}
          {(activeChapter === 2 || activeChapter === 6 || activeChapter === 7 || activeChapter === 8) && (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl font-black mb-8">
                {chapters.find(c => c.id === activeChapter)?.id}. {chapters.find(c => c.id === activeChapter)?.title}
              </h1>
              
              <div className={cn("p-8 rounded-xl text-center", darkMode ? "bg-slate-800/50" : "bg-slate-100")}>
                <BookOpen className="mx-auto mb-4 text-slate-500" size={48} />
                <h2 className="text-xl font-bold mb-2">Content Coming Soon</h2>
                <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-600")}>
                  This section is under development. Check back later for detailed documentation.
                </p>
              </div>
            </motion.article>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-16 pt-8 border-t border-slate-700">
            <button
              onClick={() => setActiveChapter(Math.max(1, activeChapter - 1))}
              disabled={activeChapter === 1}
              className={cn(
                "px-4 py-2 rounded-lg flex items-center gap-2 transition-colors",
                activeChapter === 1 
                  ? "opacity-50 cursor-not-allowed" 
                  : darkMode ? "hover:bg-slate-800" : "hover:bg-slate-100"
              )}
            >
              ← Previous Chapter
            </button>
            <button
              onClick={() => setActiveChapter(Math.min(8, activeChapter + 1))}
              disabled={activeChapter === 8}
              className={cn(
                "px-4 py-2 rounded-lg flex items-center gap-2 transition-colors",
                activeChapter === 8 
                  ? "opacity-50 cursor-not-allowed" 
                  : darkMode ? "hover:bg-slate-800" : "hover:bg-slate-100"
              )}
            >
              Next Chapter →
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}









