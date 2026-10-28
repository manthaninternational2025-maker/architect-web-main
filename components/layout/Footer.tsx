import React from "react";
import Link from "next/link";
import { companyInfo } from "@/data/companyInfo";
import { footerLinks } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="bg-sand-50 border-t border-sand-200 text-xs text-academic-muted mt-12 py-8">
      <div className="academic-container space-y-6">
        {/* Navigation Quick Links Bar */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-b border-sand-200 pb-5 text-xs font-semibold text-navy-950 uppercase tracking-wide">
          {footerLinks.journal.map((item, idx) => (
            <Link key={idx} href={item.href} className="hover:text-orange-600 transition-colors">
              {item.label}
            </Link>
          ))}
          {footerLinks.policies.slice(0, 3).map((item, idx) => (
            <Link key={idx} href={item.href} className="hover:text-orange-600 transition-colors">
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className="hover:text-orange-600 transition-colors">
            Contact
          </Link>
        </div>

        {/* Brand Licensing & Copyright (Exact Novalex Press style) */}
        <div className="text-center text-[11px] text-academic-muted leading-relaxed space-y-2">
          <p>
            <strong>{companyInfo.name}</strong> is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
          </p>
          <p>
            Permissions beyond the scope of this license may be available at{" "}
            <a href="https://impulseresearchwork.com" className="text-orange-600 hover:underline">
              https://impulseresearchwork.com
            </a>{" "}
            • Phone / WhatsApp: <span className="font-mono">{companyInfo.phone}</span>
          </p>
          <p className="font-semibold text-navy-950">
            Copyright © 2026 All Rights Reserved, {companyInfo.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
