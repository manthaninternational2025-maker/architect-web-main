import React from "react";
import Link from "next/link";
import { companyInfo } from "@/data/companyInfo";

export function Footer() {
  const footerLinks = [
    { label: "Home", href: "/" },
    { label: "Editorial Board", href: "/editorial-board" },
    { label: "Archive", href: "/archives" },
    { label: "Instruction to Authors", href: "/instructions-to-authors" },
    { label: "Submit Manuscript", href: "/submit" },
    { label: "Publication Ethics", href: "/academic-integrity" },
    { label: "Peer Review Process", href: "/peer-review-policy" },
    { label: "Plagiarism Policy", href: "/plagiarism" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <footer className="bg-white border-t border-gray-300 text-xs text-gray-700 mt-8 py-6 px-4">
      <div className="w-full space-y-4">
        {/* Navigation Quick Links Bar */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 border-b border-gray-200 pb-3 text-xs font-semibold text-gray-800">
          {footerLinks.map((item, idx) => (
            <React.Fragment key={idx}>
              <Link href={item.href} className="hover:text-[#700070] transition-colors">
                {item.label}
              </Link>
              {idx < footerLinks.length - 1 && <span className="text-gray-400">|</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Brand Licensing & Copyright */}
        <div className="text-center text-[11px] text-gray-600 leading-relaxed space-y-1">
          <p>
            <strong>{companyInfo.journalTitle}</strong> • (ISSN: {companyInfo.issn})
          </p>
          <p>
            Published by <strong>{companyInfo.publisher}</strong> • Licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International.
          </p>
          <p className="font-semibold text-gray-800 pt-1">
            Copyright &copy; 2026 {companyInfo.shortTitle} — All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
