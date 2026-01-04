"use client";

import { ReactNode } from "react";

interface MobileShellProps {
    children: ReactNode;
}

export default function MobileShell({ children }: MobileShellProps) {
    return (
        <div
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
        </div>
    );
}
