"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileSpreadsheet, FileJson, Printer, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { exportToCSV, exportToJSON, exportToPDF } from "@/lib/export-utils";

interface ExportButtonProps {
  data?: Record<string, unknown>[];
  jsonData?: unknown;
  elementId?: string;
  filename: string;
  formats?: ("csv" | "json" | "pdf")[];
  className?: string;
  variant?: "default" | "compact";
}

const translations = {
  export: "Экспорт",
  exportAs: "Экспортировать как",
  csv: "CSV (Таблица)",
  json: "JSON (Данные)",
  pdf: "PDF (Отчёт)",
  exported: "Экспортировано!",
};

export default function ExportButton({
  data,
  jsonData,
  elementId,
  filename,
  formats = ["csv", "json", "pdf"],
  className,
  variant = "default",
}: ExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [exported, setExported] = useState<string | null>(null);

  const handleExport = (format: "csv" | "json" | "pdf") => {
    try {
      switch (format) {
        case "csv":
          if (data && data.length > 0) {
            exportToCSV(data, filename);
            setExported("csv");
          }
          break;
        case "json":
          if (jsonData || data) {
            exportToJSON(jsonData || data, filename);
            setExported("json");
          }
          break;
        case "pdf":
          if (elementId) {
            exportToPDF(elementId, filename);
            setExported("pdf");
          }
          break;
      }
      
      setTimeout(() => {
        setExported(null);
        setIsOpen(false);
      }, 1500);
    } catch (error) {
      console.error("Export error:", error);
    }
  };

  const formatConfig = {
    csv: { icon: FileSpreadsheet, label: translations.csv, color: "text-emerald-400" },
    json: { icon: FileJson, label: translations.json, color: "text-blue-400" },
    pdf: { icon: Printer, label: translations.pdf, color: "text-purple-400" },
  };

  if (variant === "compact") {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "p-2 rounded-lg transition-colors hover:bg-white/10",
            isOpen && "bg-white/10",
            className
          )}
        >
          <Download size={18} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute right-0 top-full mt-2 w-48 glass rounded-xl border border-white/10 overflow-hidden z-50"
            >
              {formats.map(format => {
                const config = formatConfig[format];
                const isExported = exported === format;
                
                return (
                  <button
                    key={format}
                    onClick={() => handleExport(format)}
                    disabled={
                      (format === "csv" && !data?.length) ||
                      (format === "json" && !jsonData && !data) ||
                      (format === "pdf" && !elementId)
                    }
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {isExported ? (
                      <Check size={16} className="text-emerald-400" />
                    ) : (
                      <config.icon size={16} className={config.color} />
                    )}
                    <span className="text-sm">
                      {isExported ? translations.exported : config.label}
                    </span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-xl transition-colors",
          "bg-white/5 hover:bg-white/10 border border-white/10",
          isOpen && "bg-white/10",
          className
        )}
      >
        <Download size={18} />
        <span className="text-sm font-medium">{translations.export}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute right-0 top-full mt-2 w-56 glass rounded-xl border border-white/10 overflow-hidden z-50"
            >
              <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <span className="text-sm font-bold">{translations.exportAs}</span>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/10 rounded-lg"
                >
                  <X size={14} />
                </button>
              </div>
              
              <div className="py-2">
                {formats.map(format => {
                  const config = formatConfig[format];
                  const isExported = exported === format;
                  const isDisabled = 
                    (format === "csv" && !data?.length) ||
                    (format === "json" && !jsonData && !data) ||
                    (format === "pdf" && !elementId);
                  
                  return (
                    <button
                      key={format}
                      onClick={() => handleExport(format)}
                      disabled={isDisabled}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      {isExported ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <Check size={18} className="text-emerald-400" />
                        </motion.div>
                      ) : (
                        <config.icon size={18} className={config.color} />
                      )}
                      <div className="text-left">
                        <div className="text-sm font-medium">
                          {isExported ? translations.exported : format.toUpperCase()}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {config.label}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}






















