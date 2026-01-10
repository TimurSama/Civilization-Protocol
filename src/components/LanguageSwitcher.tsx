"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Supported languages - English is primary
const languages: Array<{ code: Language; name: string; flag: string; nativeName: string }> = [
    { code: "en", name: "English", flag: "🇺🇸", nativeName: "English" },
    { code: "ru", name: "Русский", flag: "🇷🇺", nativeName: "Русский" },
    { code: "es", name: "Español", flag: "🇪🇸", nativeName: "Español" },
    { code: "fr", name: "Français", flag: "🇫🇷", nativeName: "Français" },
    { code: "ar", name: "العربية", flag: "🇦🇪", nativeName: "العربية" },
    { code: "pl", name: "Polski", flag: "🇵🇱", nativeName: "Polski" },
    { code: "de", name: "Deutsch", flag: "🇩🇪", nativeName: "Deutsch" },
];

export default function LanguageSwitcher() {
    const { language, setLanguage, isRTL } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const currentLang = languages.find(l => l.code === language);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl glass border-white/5 hover:bg-white/10 transition-all text-xs font-bold"
            >
                <Globe size={16} className="text-cyan-400" />
                <span>{currentLang?.flag}</span>
                <span className="uppercase">{language}</span>
                <ChevronDown size={14} className={cn("transition-transform", isOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className={cn(
                                "absolute z-50 mt-2 w-40 glass border-white/10 rounded-2xl overflow-hidden shadow-2xl",
                                isRTL ? "left-0" : "right-0"
                            )}
                        >
                            <div className="p-2 space-y-1">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => {
                                            setLanguage(lang.code);
                                            setIsOpen(false);
                                        }}
                                        className={cn(
                                            "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all relative",
                                            language === lang.code
                                                ? "bg-cyan-500/20 text-cyan-400 font-bold"
                                                : "text-slate-400 hover:bg-white/5 hover:text-white",
                                            lang.code === "en" && "border-l-2 border-l-cyan-400/50"
                                        )}
                                    >
                                        <span className="text-lg">{lang.flag}</span>
                                        <div className="flex-1 flex items-center justify-between">
                                            <span>{lang.nativeName}</span>
                                            {lang.code === "en" && (
                                                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 font-semibold">
                                                    Primary
                                                </span>
                                            )}
                                            {lang.code === language && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="w-2 h-2 rounded-full bg-cyan-400"
                                                />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
