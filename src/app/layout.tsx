"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/context/WalletContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import MobileShell from "@/components/MobileShell";
import SpiderWeb from "@/components/SpiderWeb";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark" suppressHydrationWarning={true}>
      <body className={`${inter.className} antialiased bg-ocean-deep text-white overflow-x-hidden`}>
        <LanguageProvider>
          <WalletProvider>
            <SpiderWeb />
            <MobileShell>
              <Navbar />
              <main className="pt-20 pb-24 md:pb-0">
                {children}
              </main>
            </MobileShell>
          </WalletProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
