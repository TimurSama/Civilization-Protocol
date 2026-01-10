"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Menu, Building2, Home, Vote, Target,
    Coins, User, Wallet, LogOut, BookOpen,
    Zap, Globe, TreePine, Heart, FlaskConical,
    ChevronDown, Search, Bell, FileText, TrendingUp, Map
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useWallet } from "@/context/WalletContext";
import { useAuth } from "@/context/AuthContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
import MobileMenu from "./MobileMenu";
import AuthModal from "./AuthModal";
import GlobalSearch from "./GlobalSearch";
import NotificationCenter from "./NotificationCenter";
import BuyTokenWidget from "./BuyTokenWidget";

export default function Navbar() {
    const pathname = usePathname();
    const { isConnected, address, connect, disconnect } = useWallet();
    const { user, isAuthenticated, logout } = useAuth();
    const { t, isRTL } = useLanguage();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [unreadCount] = useState(3); // Demo unread count

    // Keyboard shortcut for search (Ctrl+K or Cmd+K)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault();
                setIsSearchOpen(true);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const navItems = [
        { name: t("nav.home"), href: "/", icon: Home },
        { name: t("nav.presentation"), href: "/presentation", icon: FileText },
        { name: t("nav.tokenomics"), href: "/tokenomics", icon: TrendingUp },
        { name: t("nav.roadmap"), href: "/roadmap", icon: Map },
        { name: t("nav.whitepaper"), href: "/whitepaper", icon: BookOpen },
        { name: t("nav.map"), href: "/map", icon: Globe },
        { name: t("nav.tokenhub"), href: "/tokenhub", icon: Coins },
        { name: t("nav.nexus"), href: "/nexus", icon: Zap },
    ];

    const ecosystemItems = [
        { name: t("nav.ecology"), href: "/ecology", icon: TreePine, color: "text-emerald-400" },
        { name: t("nav.energy"), href: "/energy", icon: Zap, color: "text-amber-400" },
        { name: t("nav.health"), href: "/health", icon: Heart, color: "text-rose-400" },
        { name: t("nav.science"), href: "/science", icon: FlaskConical, color: "text-purple-400" },
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-[100] glass border-b border-white/5 px-4 py-3">
                <div className="max-w-7xl mx-auto flex items-center justify-between relative">
                    {/* Left: Burger Menu & Search */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="p-2.5 glass border-white/10 rounded-xl text-slate-400 hover:text-white transition-all hover:scale-105 active:scale-95"
                        >
                            <Menu size={24} />
                        </button>
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="hidden sm:flex items-center gap-2 px-3 py-2 glass border-white/10 rounded-xl text-slate-400 hover:text-white transition-all text-sm"
                        >
                            <Search size={16} />
                            <span className="hidden md:inline">Поиск</span>
                            <kbd className="hidden md:inline px-1.5 py-0.5 text-[10px] bg-white/5 rounded">⌘K</kbd>
                        </button>
                    </div>

                    {/* Center: Logo */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                                <Building2 className="text-white" size={24} />
                            </div>
                            <span className="text-xl font-black tracking-tighter text-glow-cyan hidden sm:block">CivilizationProtocol</span>
                        </Link>
                    </div>

                    {/* Right: Notifications, Language, Auth & Wallet Status */}
                    <div className="flex items-center gap-2">
                        {/* Notifications */}
                        <button
                            onClick={() => setIsNotificationsOpen(true)}
                            className="relative p-2 glass border-white/10 rounded-xl text-slate-400 hover:text-white transition-all"
                        >
                            <Bell size={20} />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                    {unreadCount}
                                </span>
                            )}
                        </button>

                        <LanguageSwitcher />

                        {isAuthenticated && user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center gap-2 px-3 py-1.5 glass border-water-500/30 rounded-xl hover:border-water-400/50 transition-all"
                                >
                                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-water-400 to-water-600 flex items-center justify-center text-xs font-bold">
                                        {user.avatar || user.name.slice(0, 2).toUpperCase()}
                                    </div>
                                    <div className="hidden sm:block text-left">
                                        <div className="text-xs font-medium flex items-center gap-1">
                                            {user.name}
                                            {user.isPioneer && <span className="text-yellow-400">🏆</span>}
                                            {user.verified && <span className="text-water-400">✓</span>}
                                        </div>
                                        <div className="text-[10px] text-water-400">{user.vodBalance.toFixed(0)} VOD</div>
                                    </div>
                                    <ChevronDown size={14} className="text-white/50" />
                                </button>

                                <AnimatePresence>
                                    {showUserMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute right-0 top-full mt-2 w-48 glass rounded-xl border border-white/10 overflow-hidden"
                                        >
                                            <Link
                                                href="/profile"
                                                className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                <User size={16} />
                                                <span>Профиль</span>
                                            </Link>
                                            <Link
                                                href="/wallet"
                                                className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                <Wallet size={16} />
                                                <span>Кошелёк</span>
                                            </Link>
                                            <Link
                                                href="/rewards"
                                                className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                <Coins size={16} />
                                                <span>Награды</span>
                                            </Link>
                                            <div className="border-t border-white/10">
                                                <button
                                                    onClick={() => {
                                                        logout();
                                                        setShowUserMenu(false);
                                                    }}
                                                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 text-red-400 transition-colors"
                                                >
                                                    <LogOut size={16} />
                                                    <span>Выйти</span>
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsAuthModalOpen(true)}
                                className="px-4 py-2 glass border-water-500/30 rounded-xl hover:border-water-400/50 transition-all text-sm font-medium flex items-center gap-2"
                            >
                                <User size={16} />
                                <span className="hidden sm:inline">Войти</span>
                            </button>
                        )}

                        {/* Buy Token Widget */}
                        <div className="hidden md:block">
                            <BuyTokenWidget variant="inline" source="navbar" />
                        </div>

                        {isConnected && (
                            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 glass border-cyan-500/30 rounded-lg">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                                <span className="text-[10px] font-mono text-cyan-400">{address?.slice(0, 4)}...{address?.slice(-4)}</span>
                            </div>
                        )}
                    </div>
                </div>

                <MobileMenu
                    isOpen={isMobileMenuOpen}
                    onClose={() => setIsMobileMenuOpen(false)}
                    navItems={[...navItems, ...ecosystemItems]}
                />
            </nav>

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
            />

            <GlobalSearch
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />

            <NotificationCenter
                isOpen={isNotificationsOpen}
                onClose={() => setIsNotificationsOpen(false)}
            />
        </>
    );
}
