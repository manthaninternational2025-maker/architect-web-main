"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Editorial Board", href: "/editorial-board" },
    { label: "Archive", href: "/archives" },
    { label: "Instruction to Authors", href: "/instructions-to-authors" },
    { label: "Submit Manuscript", href: "/submit" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <nav className="bg-[#700070] text-white sticky top-0 z-40 border-y border-[#550055] shadow-xs">
      <div className="w-full px-1 sm:px-3">
        {/* Unified Horizontal Navigation Bar (Visible on Mobile, Tablet & PC) */}
        <div className="flex items-center overflow-x-auto scrollbar-none whitespace-nowrap w-full min-h-[38px]">
          {navLinks.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`px-2.5 sm:px-3.5 py-2 text-xs sm:text-[13px] font-semibold transition-colors duration-150 border-r border-[#550055] first:border-l shrink-0 ${
                  isActive
                    ? "bg-[#550055] text-[#FFD700]"
                    : "text-white hover:bg-[#550055] hover:text-[#FFD700]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
