"use client";

import { Suspense } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/context/WalletContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import MobileShell from "@/components/MobileShell";
import SpiderWeb from "@/components/SpiderWeb";
import OnboardingProvider from "@/components/OnboardingProvider";
import Analytics, { AnalyticsScripts } from "@/components/Analytics";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark" suppressHydrationWarning={true}>
      <head>
        <AnalyticsScripts />
      </head>
      <body className={`${inter.className} antialiased bg-ocean-deep text-white overflow-x-hidden`}>
        <LanguageProvider>
          <AuthProvider>
            <WalletProvider>
              <OnboardingProvider>
                <Suspense fallback={null}>
                  <Analytics />
                </Suspense>
                <SpiderWeb />
                <MobileShell>
                  <Navbar />
                  <main className="pt-20 pb-24 md:pb-0">
                    {children}
                  </main>
                </MobileShell>
              </OnboardingProvider>
            </WalletProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
