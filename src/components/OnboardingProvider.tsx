"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import OnboardingTour from "./OnboardingTour";

const ONBOARDING_KEY = "vodeco_onboarding_completed";

export default function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if onboarding was completed - with a small delay to prevent flash
    const timer = setTimeout(() => {
      const completed = localStorage.getItem(ONBOARDING_KEY);
      if (!completed) {
        setShowOnboarding(true);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleComplete = () => {
    localStorage.setItem(ONBOARDING_KEY, "true");
    setShowOnboarding(false);
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      <AnimatePresence>
        {showOnboarding && (
          <OnboardingTour onComplete={handleComplete} />
        )}
      </AnimatePresence>
    </>
  );
}



