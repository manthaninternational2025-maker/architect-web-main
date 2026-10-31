"use client";

import React, { Suspense } from "react";
import { usePathname } from "next/navigation";
import { AdminAuthProvider } from "@/context/AdminAuthContext";
import { JournalDataProvider } from "@/context/JournalDataContext";
import { AdminAuthModal } from "@/components/auth/AdminAuthModal";
import { TopUtilityBar } from "@/components/layout/TopUtilityBar";
import { Masthead } from "@/components/layout/Masthead";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

function JournalLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <AdminAuthProvider>
      <JournalDataProvider>
        {isAdminRoute ? (
          // Full width container for Admin Panel Dashboard
          <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans antialiased">
            {children}
            <AdminAuthModal />
          </div>
        ) : (
          // Journal Portal Sheet Format (Royal Purple Background + Centered Sheet)
          <div className="min-h-full bg-[#700070] text-[#222222] font-sans antialiased selection:bg-[#700070] selection:text-white">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#700070] focus:text-white focus:font-semibold focus:rounded"
            >
              Skip to main academic content
            </a>

            <div className="w-full sm:max-w-[1000px] sm:mx-auto bg-white sm:border-x sm:border-[#333333] shadow-2xl min-h-screen flex flex-col">
              <header className="w-full flex flex-col">
                <TopUtilityBar />
                <Masthead />
                <Navbar />
              </header>

              <main id="main-content" className="flex-1 w-full bg-white px-3 sm:px-6 py-4">
                {children}
              </main>

              <Footer />
            </div>

            <AdminAuthModal />
          </div>
        )}
      </JournalDataProvider>
    </AdminAuthProvider>
  );
}

export function JournalLayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#700070]" />}>
      <JournalLayoutContent>{children}</JournalLayoutContent>
    </Suspense>
  );
}
