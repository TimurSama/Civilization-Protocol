"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface InfoPopupProps {
  title: string;
  content: React.ReactNode;
  trigger: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  position?: "top" | "bottom" | "left" | "right" | "center";
  source?: { name: string; url?: string; year?: number };
  className?: string;
}

export default function InfoPopup({
  title,
  content,
  trigger,
  size = "md",
  position = "center",
  source,
  className,
}: InfoPopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-2xl",
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)} className={cn("cursor-pointer", className)}>
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={cn(
                "fixed z-[10000]",
                position === "center" && "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                position === "top" && "top-20 left-1/2 -translate-x-1/2",
                position === "bottom" && "bottom-20 left-1/2 -translate-x-1/2",
                position === "left" && "left-20 top-1/2 -translate-y-1/2",
                position === "right" && "right-20 top-1/2 -translate-y-1/2",
                sizeClasses[size]
              )}
            >
              <div className="glass-card p-6 max-h-[80vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                      <Info className="text-cyan-400" size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X size={20} className="text-slate-400" />
                  </button>
                </div>

                {/* Content */}
                <div className="text-slate-300 space-y-4">{content}</div>

                {/* Source */}
                {source && (
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <span>Источник:</span>
                      {source.url ? (
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          {source.name}
                          {source.year && ` (${source.year})`}
                          <ExternalLink size={14} />
                        </a>
                      ) : (
                        <span>
                          {source.name}
                          {source.year && ` (${source.year})`}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}







