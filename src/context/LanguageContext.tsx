"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
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

    useEffect(() => {
        const savedLang = localStorage.getItem("Civilization Protocol-lang") as Language;
        if (savedLang && ["en", "ru", "ar", "es", "de", "pt", "pl", "ja", "ko", "zh", "fr"].includes(savedLang)) {
            setLanguage(savedLang);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("Civilization Protocol-lang", language);
        document.documentElement.lang = language;
        document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    }, [language]);

    const t = (path: string) => {
        const keys = path.split(".");
        let current: any = translations[language];

        // Fallback to English if language doesn't exist
        if (!current) {
            current = translations.en;
            console.warn(`Language ${language} not found, falling back to English`);
        }

        for (const key of keys) {
            if (current[key] === undefined) {
                console.warn(`Translation missing for key: ${path} in language: ${language}`);
                return path;
            }
            current = current[key];
        }

        return current;
    };

    const isRTL = language === "ar";

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
