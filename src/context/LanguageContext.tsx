"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { translations, Language, TranslationKeys } from "@/lib/i18n";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (path: string) => any;
    isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialize language from localStorage (client-side only)
    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedLang = localStorage.getItem("Civilization Protocol-lang") as Language;
            if (savedLang && ["en", "ru", "ar", "es", "fr", "pl", "de"].includes(savedLang)) {
                setLanguage(savedLang);
            } else {
                // Default to English (primary language)
                setLanguage("en");
            }
            setIsInitialized(true);
        }
    }, []);

    // Update document attributes when language changes
    useEffect(() => {
        if (typeof window !== "undefined" && isInitialized) {
            localStorage.setItem("Civilization Protocol-lang", language);
            document.documentElement.lang = language;
            // RTL languages: Arabic only
            document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
        }
    }, [language, isInitialized]);

    // Memoize translation function to prevent unnecessary re-renders
    const t = useCallback((path: string) => {
        const keys = path.split(".");
        
        // Always fallback to English (primary language)
        let current: any = translations[language];
        const englishFallback: any = translations.en;

        // If current language doesn't exist, use English directly
        if (!current) {
            current = translations.en;
            console.warn(`Language ${language} not found, using English (primary language)`);
        }

        // Try to get translation in current language first
        let result: any = current;
        let foundInCurrentLang = true;
        
        for (const key of keys) {
            if (result[key] === undefined) {
                foundInCurrentLang = false;
                break;
            }
            result = result[key];
        }

        // If not found in current language, fallback to English
        if (!foundInCurrentLang) {
            result = englishFallback;
            for (const key of keys) {
                if (result[key] === undefined) {
                    console.warn(`Translation missing for key: ${path} in both ${language} and English (primary)`);
                    return path; // Return path if even English doesn't have it
                }
                result = result[key];
            }
            if (language !== "en") {
                console.warn(`Translation missing for key: ${path} in ${language}, using English (primary language)`);
            }
        }

        return result;
    }, [language]);

    const isRTL = useMemo(() => language === "ar", [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
            <div dir={isRTL ? "rtl" : "ltr"} className={isRTL ? "font-arabic" : ""}>
                {children}
            </div>
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
