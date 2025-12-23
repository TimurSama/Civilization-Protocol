"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { ReactNode } from "react";

interface MobileShellProps {
    children: ReactNode;
}

export default function MobileShell({ children }: MobileShellProps) {
    const x = useMotionValue(0);
    const opacity = useTransform(x, [-100, 0, 100], [0.5, 1, 0.5]);
    const scale = useTransform(x, [-100, 0, 100], [0.95, 1, 0.95]);

    return (
        <motion.div
            style={{ x, opacity, scale }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
                // Здесь можно добавить логику переключения страниц при сильном свайпе
                if (info.offset.x > 150) {
                    console.log("Swipe Right - Previous Page");
                } else if (info.offset.x < -150) {
                    console.log("Swipe Left - Next Page");
                }
            }}
            className="min-h-screen bg-ocean-deep pt-24 pb-12 overflow-x-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {children}
            </div>

            {/* Background Decorative Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-glow/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />
            </div>
        </motion.div>
    );
}
