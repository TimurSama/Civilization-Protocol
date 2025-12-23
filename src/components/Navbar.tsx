"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Menu, Building2, Home, Vote, Target,
    Coins, User, Wallet, LogOut, BookOpen,
    Zap, Globe, TreePine, Heart, FlaskConical,
    ChevronDown
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useWallet } from "@/context/WalletContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
    const pathname = usePathname();
    const { isConnected, address, connect, disconnect } = useWallet();
    const { t, isRTL } = useLanguage();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { name: t("nav.home"), href: "/", icon: Home },
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
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 px-4 py-3">
            <div className="max-w-7xl mx-auto flex items-center justify-between relative">
                {/* Left: Burger Menu */}
                <div className="flex items-center">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-2.5 glass border-white/10 rounded-xl text-slate-400 hover:text-white transition-all hover:scale-105 active:scale-95"
                    >
                        <Menu size={24} />
                    </button>
                </div>

                {/* Center: Logo */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                            <Building2 className="text-white" size={24} />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-glow-cyan hidden sm:block">Civilization Protocol</span>
                    </Link>
                </div>

                {/* Right: Language & Wallet Status */}
                <div className="flex items-center gap-3">
                    <LanguageSwitcher />

                    {isConnected && (
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 glass border-cyan-500/30 rounded-lg">
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
    );
}
