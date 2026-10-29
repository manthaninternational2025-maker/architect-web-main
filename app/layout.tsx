import type { Metadata } from "next";
import { Source_Serif_4, Inter } from "next/font/google";
import "./globals.css";
import { JournalLayoutShell } from "@/components/layout/JournalLayoutShell";

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
      <body className="min-h-full font-sans antialiased">
        <JournalLayoutShell>
          {children}
        </JournalLayoutShell>
      </body>
    </html>
  );
}
