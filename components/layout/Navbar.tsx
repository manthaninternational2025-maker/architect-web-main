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
      <div className="w-full px-2 sm:px-3">
        <div className="flex items-center justify-between min-h-[38px]">
          {/* Mobile Menu Button (< md) */}
          <div className="flex items-center justify-between w-full md:hidden py-1.5">
            <span className="font-bold text-xs uppercase tracking-wider text-gray-100 flex items-center gap-1.5">
              <span>Navigation Menu</span>
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded text-white hover:bg-[#550055] focus:outline-none transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Desktop & Tablet Navigation Links (>= md) */}
          <div className="hidden md:flex items-center flex-wrap w-full">
            {navLinks.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-2.5 lg:px-3.5 py-2 text-xs sm:text-[13px] font-semibold transition-colors duration-150 border-r border-[#550055] first:border-l ${
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

        {/* Mobile Dropdown Menu with Smooth Accordion Animation */}
        {isOpen && (
          <div className="md:hidden py-2 border-t border-[#550055] space-y-1 animate-in slide-in-from-top-1 duration-150">
            {navLinks.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 text-xs font-semibold rounded transition-colors ${
                    isActive
                      ? "bg-[#550055] text-[#FFD700]"
                      : "text-white hover:bg-[#550055]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
