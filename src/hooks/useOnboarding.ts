"use client";

import { useState, useEffect, useCallback } from "react";

const ONBOARDING_KEY = "vodeco_onboarding_completed";
const ONBOARDING_STEP_KEY = "vodeco_onboarding_step";

export function useOnboarding() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Check if onboarding was completed
    const completed = localStorage.getItem(ONBOARDING_KEY);
    const savedStep = localStorage.getItem(ONBOARDING_STEP_KEY);
    
    if (!completed) {
      setShowOnboarding(true);
      if (savedStep) {
        setCurrentStep(parseInt(savedStep, 10));
      }
    }
    setIsLoading(false);
  }, []);

  const completeOnboarding = useCallback(() => {
    localStorage.setItem(ONBOARDING_KEY, "true");
    localStorage.removeItem(ONBOARDING_STEP_KEY);
    setShowOnboarding(false);
  }, []);

  const resetOnboarding = useCallback(() => {
    localStorage.removeItem(ONBOARDING_KEY);
    localStorage.removeItem(ONBOARDING_STEP_KEY);
    setCurrentStep(0);
    setShowOnboarding(true);
  }, []);

  const saveStep = useCallback((step: number) => {
    localStorage.setItem(ONBOARDING_STEP_KEY, step.toString());
    setCurrentStep(step);
  }, []);

  const skipOnboarding = useCallback(() => {
    localStorage.setItem(ONBOARDING_KEY, "skipped");
    setShowOnboarding(false);
  }, []);

  return {
    showOnboarding,
    isLoading,
    currentStep,
    completeOnboarding,
    resetOnboarding,
    saveStep,
    skipOnboarding,
  };
}



