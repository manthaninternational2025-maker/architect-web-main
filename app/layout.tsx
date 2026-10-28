import type { Metadata } from "next";
import { Source_Serif_4, Inter } from "next/font/google";
import "./globals.css";
import { TopUtilityBar } from "@/components/layout/TopUtilityBar";
import { Masthead } from "@/components/layout/Masthead";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manthan: International Multidisciplinary Journal of Social Inquiry (ISSN: XXXX-XXXX)",
  description: "Manthan: International Multidisciplinary Journal of Social Inquiry (IMJSI) — An Open Access Peer Reviewed Refereed Journal published by Impulse Publication Works.",
  keywords: "Manthan Journal, IMJSI, multidisciplinary social inquiry, peer reviewed journal, open access, Impulse Publication Works, call for papers, Dr Deepak Setia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sourceSerif.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#700070] text-[#222222] font-sans antialiased selection:bg-[#700070] selection:text-white">
        {/* Skip to Content for Academic Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#700070] focus:text-white focus:font-semibold focus:rounded"
        >
          Skip to main academic content
        </a>

        {/* Central White Journal Sheet Frame (Exact OJS / JISSIS Architecture) */}
        <div className="max-w-[1000px] mx-auto bg-white border-x border-[#333333] shadow-2xl min-h-screen flex flex-col">
          {/* Global Academic Header Banner Hierarchy */}
          <header className="w-full flex flex-col">
            <TopUtilityBar />
            <Masthead />
            <Navbar />
          </header>

          {/* Main Content Area */}
          <main id="main-content" className="flex-1 w-full bg-white px-3 sm:px-6 py-4">
            {children}
          </main>

          {/* Global Academic Footer */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
