"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import InfoPopup from "./InfoPopup";

interface StatisticCardProps {
  value: string | number;
  label: string;
  description?: string;
  source?: { name: string; url?: string; year?: number };
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  popupContent?: React.ReactNode;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  className?: string;
}

export default function StatisticCard({
  value,
  label,
  description,
  source,
  trend,
  trendValue,
  popupContent,
  icon: Icon,
  className,
}: StatisticCardProps) {
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

  const cardContent = (
    <div
      className={cn(
        "p-4 rounded-xl glass border border-white/10 hover:border-cyan-500/50 transition-all",
        className
      )}
    >
      <div className="flex items-start justify-between mb-2">
        {Icon && (
          <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
            <Icon className="text-cyan-400" size={20} />
          </div>
        )}
        {TrendIcon && trendValue && (
          <div className={cn("flex items-center gap-1 text-xs", trendColors[trend])}>
            <TrendIcon size={14} />
            <span>{trendValue}</span>
          </div>
        )}
      </div>

      <div className="text-3xl font-black text-white mb-1">{value}</div>
      <div className="text-sm text-slate-400">{label}</div>
      {description && (
        <div className="text-xs text-slate-500 mt-2">{description}</div>
      )}
    </div>
  );

  if (popupContent) {
    return (
      <InfoPopup
        title={label}
        content={popupContent}
        trigger={cardContent}
        size="lg"
        source={source}
      />
    );
  }

  return cardContent;
}







