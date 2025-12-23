"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    X, Home, Vote, Target, Coins, User,
    Building2, Wallet, Brain, Shield,
    BookOpen, Gamepad2, Users, Share2,
    TreePine, Heart, FlaskConical,
    LogOut, MessageSquare, Globe, Zap
} from "lucide-react";
import Link from "next/link";
import { useWallet } from "@/context/WalletContext";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    navItems?: any[];
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const { isConnected, address, connect, disconnect } = useWallet();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isOpen || !mounted) return null;

    return createPortal(
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(0, 8, 20, 0.6)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 9998
                }}
            />

            {/* Menu - Full height glass panel */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: '340px',
                    maxWidth: '90vw',
                    background: 'linear-gradient(135deg, rgba(0, 20, 40, 0.95) 0%, rgba(0, 8, 20, 0.98) 100%)',
                    backdropFilter: 'blur(20px)',
                    borderRight: '1px solid rgba(34, 211, 238, 0.2)',
                    boxShadow: '0 0 40px rgba(34, 211, 238, 0.1)',
                    zIndex: 9999,
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY: 'auto',
                    overflowX: 'hidden'
                }}
            >
                {/* Header */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px',
                    borderBottom: '1px solid rgba(34, 211, 238, 0.15)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Building2 color="#22d3ee" size={24} />
                        <span style={{ fontSize: '20px', fontWeight: 900, color: '#22d3ee', letterSpacing: '-0.5px' }}>Civilization Protocol</span>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '10px',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: 'white',
                            cursor: 'pointer'
                        }}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* All Pages Content */}
                <div style={{ padding: '16px', flex: 1 }}>

                    {/* ОСНОВНОЕ */}
                    <Section title="ОСНОВНОЕ">
                        <MenuItem href="/" icon={<Home size={18} />} label="Главная" onClose={onClose} />
                        <MenuItem href="/dashboard" icon={<Target size={18} />} label="Dashboard" onClose={onClose} />
                        <MenuItem href="/map" icon={<Globe size={18} />} label="Карта" onClose={onClose} />
                        <MenuItem href="/tokenhub" icon={<Coins size={18} />} label="TokenHub" onClose={onClose} />
                        <MenuItem href="/nexus" icon={<Zap size={18} />} label="Nexus" onClose={onClose} />
                    </Section>

                    {/* ЭКОСИСТЕМА */}
                    <Section title="ЭКОСИСТЕМА">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                            <MenuItem href="/ecology" icon={<TreePine size={16} />} label="Экология" onClose={onClose} compact />
                            <MenuItem href="/energy" icon={<Zap size={16} />} label="Энергия" onClose={onClose} compact />
                            <MenuItem href="/health" icon={<Heart size={16} />} label="Здоровье" onClose={onClose} compact />
                            <MenuItem href="/science" icon={<FlaskConical size={16} />} label="Наука" onClose={onClose} compact />
                        </div>
                    </Section>

                    {/* ПРОФЕССИОНАЛЬНОЕ */}
                    <Section title="ПРОФЕССИОНАЛЬНОЕ">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                            <MenuItem href="/cabinets" icon={<Shield size={16} />} label="Кабинеты" onClose={onClose} compact />
                            <MenuItem href="/profile" icon={<User size={16} />} label="Профиль" onClose={onClose} compact />
                        </div>
                    </Section>

                    {/* СООБЩЕСТВО */}
                    <Section title="СООБЩЕСТВО">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                            <MenuItem href="/social" icon={<Users size={16} />} label="Social Hub" onClose={onClose} compact />
                            <MenuItem href="/social/messages" icon={<MessageSquare size={16} />} label="Сообщения" onClose={onClose} compact />
                            <MenuItem href="/social/friends" icon={<Users size={16} />} label="Друзья" onClose={onClose} compact />
                            <MenuItem href="/groups" icon={<Users size={16} />} label="Группы" onClose={onClose} compact />
                        </div>
                    </Section>

                    {/* ФИНАНСЫ */}
                    <Section title="ФИНАНСЫ">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                            <MenuItem href="/exchange" icon={<Coins size={16} />} label="Exchange" onClose={onClose} compact />
                            <MenuItem href="/missions" icon={<Target size={16} />} label="Миссии" onClose={onClose} compact />
                        </div>
                    </Section>

                    {/* УПРАВЛЕНИЕ */}
                    <Section title="УПРАВЛЕНИЕ">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                            <MenuItem href="/dao" icon={<Vote size={16} />} label="DAO" onClose={onClose} compact />
                            <MenuItem href="/governance" icon={<Shield size={16} />} label="Governance" onClose={onClose} compact />
                        </div>
                    </Section>

                    {/* ИНСТРУМЕНТЫ */}
                    <Section title="ИНСТРУМЕНТЫ">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                            <MenuItem href="/ai" icon={<Brain size={16} />} label="AI" onClose={onClose} compact />
                            <MenuItem href="/security" icon={<Shield size={16} />} label="Security" onClose={onClose} compact />
                            <MenuItem href="/education" icon={<BookOpen size={16} />} label="Education" onClose={onClose} compact />
                            <MenuItem href="/gaming" icon={<Gamepad2 size={16} />} label="Gaming" onClose={onClose} compact />
                            <MenuItem href="/integration" icon={<Share2 size={16} />} label="Integration" onClose={onClose} compact />
                        </div>
                    </Section>

                    {/* ДОПОЛНИТЕЛЬНО */}
                    <Section title="ДОПОЛНИТЕЛЬНО">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                            <MenuItem href="/vodcheck" icon={<Shield size={16} />} label="VODCheck" onClose={onClose} compact />
                            <MenuItem href="/standards" icon={<BookOpen size={16} />} label="Standards" onClose={onClose} compact />
                            <MenuItem href="/presentation" icon={<Target size={16} />} label="Presentation" onClose={onClose} compact />
                            <MenuItem href="/whitepaper" icon={<BookOpen size={16} />} label="Whitepaper" onClose={onClose} compact />
                        </div>
                    </Section>
                </div>

                {/* Wallet Section */}
                <div style={{
                    padding: '16px',
                    borderTop: '1px solid rgba(34, 211, 238, 0.15)',
                    marginTop: 'auto'
                }}>
                    {isConnected ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '10px 14px',
                                background: 'rgba(34, 211, 238, 0.1)',
                                borderRadius: '10px',
                                border: '1px solid rgba(34, 211, 238, 0.2)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22d3ee', boxShadow: '0 0 10px #22d3ee' }} />
                                    <span style={{ fontSize: '12px', fontFamily: 'monospace', color: '#22d3ee' }}>
                                        {address?.slice(0, 6)}...{address?.slice(-6)}
                                    </span>
                                </div>
                                <button onClick={disconnect} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}>
                                    <LogOut size={16} />
                                </button>
                            </div>
                            <Link
                                href="/wallet"
                                onClick={onClose}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    padding: '14px',
                                    background: 'linear-gradient(135deg, #22d3ee 0%, #0ea5e9 100%)',
                                    color: '#000814',
                                    borderRadius: '12px',
                                    fontSize: '14px',
                                    fontWeight: 700,
                                    textDecoration: 'none',
                                    boxShadow: '0 4px 20px rgba(34, 211, 238, 0.3)'
                                }}
                            >
                                <Wallet size={18} />
                                Кошелек
                            </Link>
                        </div>
                    ) : (
                        <button
                            onClick={connect}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                width: '100%',
                                padding: '14px',
                                background: 'linear-gradient(135deg, #22d3ee 0%, #0ea5e9 100%)',
                                color: '#000814',
                                borderRadius: '12px',
                                fontSize: '14px',
                                fontWeight: 700,
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: '0 4px 20px rgba(34, 211, 238, 0.3)'
                            }}
                        >
                            <Wallet size={18} />
                            Подключить кошелек
                        </button>
                    )}
                </div>
            </div>
        </>,
        document.body
    );
}

// Section Component
function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div style={{ marginBottom: '16px' }}>
            <div style={{
                fontSize: '10px',
                fontWeight: 800,
                color: '#64748b',
                letterSpacing: '1px',
                marginBottom: '8px',
                paddingLeft: '4px'
            }}>
                {title}
            </div>
            {children}
        </div>
    );
}

// MenuItem Component
function MenuItem({ href, icon, label, onClose, compact = false }: {
    href: string;
    icon: React.ReactNode;
    label: string;
    onClose: () => void;
    compact?: boolean;
}) {
    return (
        <Link
            href={href}
            onClick={onClose}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: compact ? '8px' : '12px',
                padding: compact ? '10px' : '12px 14px',
                borderRadius: '10px',
                color: '#e2e8f0',
                textDecoration: 'none',
                fontSize: compact ? '13px' : '14px',
                fontWeight: 500,
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'all 0.2s ease'
            }}
        >
            <span style={{ color: '#94a3b8' }}>{icon}</span>
            <span>{label}</span>
        </Link>
    );
}
