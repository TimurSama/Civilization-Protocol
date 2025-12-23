"use client";

import { motion } from "framer-motion";

export default function WaterDrop() {
    return (
        <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Main Drop */}
            <motion.div
                animate={{
                    borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 50% 60% 40% 50%", "40% 60% 70% 30% / 40% 50% 60% 50%"],
                    y: [0, -10, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="w-48 h-48 bg-gradient-to-br from-cyan-glow to-blue-600 shadow-[0_0_50px_rgba(34,211,238,0.3)] relative z-10"
            >
                {/* Reflection */}
                <div className="absolute top-4 left-8 w-12 h-6 bg-white/30 rounded-full blur-sm rotate-[-45deg]" />
            </motion.div>

            {/* Ripples */}
            {[1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 1.2,
                        ease: "easeOut",
                    }}
                    className="absolute w-48 h-48 border border-cyan-glow/30 rounded-full"
                />
            ))}
        </div>
    );
}
