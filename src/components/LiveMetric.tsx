"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface LiveMetricProps {
  value: number | string;
  label: string;
  unit?: string;
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  icon?: React.ReactNode;
  color?: string;
  animate?: boolean;
  updateInterval?: number;
  onUpdate?: () => Promise<number | string>;
  className?: string;
}

export default function LiveMetric({
  value: initialValue,
  label,
  unit = "",
  trend,
  trendValue,
  icon,
  color = "cyan",
  animate = true,
  updateInterval = 30000, // 30 секунд по умолчанию
  onUpdate,
  className,
}: LiveMetricProps) {
  const [value, setValue] = useState(initialValue);
  const [isUpdating, setIsUpdating] = useState(false);
  const [displayValue, setDisplayValue] = useState(initialValue);

  useEffect(() => {
    if (onUpdate && updateInterval > 0) {
      const interval = setInterval(async () => {
        setIsUpdating(true);
        try {
          const newValue = await onUpdate();
          setValue(newValue);
        } catch (error) {
          console.error("Error updating metric:", error);
        } finally {
          setIsUpdating(false);
        }
      }, updateInterval);

      return () => clearInterval(interval);
    }
  }, [onUpdate, updateInterval]);

  // Анимация изменения значения
  useEffect(() => {
    if (animate && typeof value === "number" && typeof displayValue === "number") {
      const start = displayValue;
      const end = value;
      const duration = 1000;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = start + (end - start) * progress;
        setDisplayValue(current);
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    } else {
      setDisplayValue(value);
    }
  }, [value, animate]);

  const formatValue = (val: number | string): string => {
    if (typeof val === "number") {
      if (val >= 1e12) return `${(val / 1e12).toFixed(2)}T`;
      if (val >= 1e9) return `${(val / 1e9).toFixed(2)}B`;
      if (val >= 1e6) return `${(val / 1e6).toFixed(2)}M`;
      if (val >= 1e3) return `${(val / 1e3).toFixed(2)}K`;
      return val.toFixed(0);
    }
    return val.toString();
  };

  const trendIcons = {
    up: TrendingUp,
    down: TrendingDown,
    stable: Minus,
  };

  const trendColors = {
    up: "text-emerald-400",
    down: "text-red-400",
    stable: "text-slate-400",
  };

  const TrendIcon = trend ? trendIcons[trend] : null;
  const colorClasses = {
    cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    rose: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "glass-card p-6 border rounded-2xl transition-all hover:scale-105 hover:border-opacity-100",
        colorClasses[color as keyof typeof colorClasses] || colorClasses.cyan,
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        {icon && (
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            colorClasses[color as keyof typeof colorClasses] || colorClasses.cyan
          )}>
            {icon}
          </div>
        )}
        {isUpdating && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Activity size={16} className="text-slate-400" />
          </motion.div>
        )}
      </div>

      <div className="space-y-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={displayValue}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-4xl font-black"
          >
            {formatValue(displayValue)}
            {unit && <span className="text-2xl text-slate-400 ml-1">{unit}</span>}
          </motion.div>
        </AnimatePresence>

        <div className="text-sm text-slate-400 font-medium">{label}</div>

        {TrendIcon && trendValue && (
          <div className={cn("flex items-center gap-1 text-xs font-medium", trendColors[trend])}>
            <TrendIcon size={14} />
            <span>{trendValue}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}





