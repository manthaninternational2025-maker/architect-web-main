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
    <nav className="bg-[#700070] text-white sticky top-0 z-50 border-y border-[#550055] shadow-xs">
      <div className="w-full px-2 sm:px-3">
        <div className="flex items-center justify-between min-h-[38px]">
          {/* Mobile Menu Button */}
          <div className="flex items-center justify-between w-full lg:hidden py-1.5">
            <span className="font-bold text-xs uppercase tracking-wider text-gray-100">
              Navigation Menu
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 rounded text-white hover:bg-[#550055] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Desktop Navigation Links — Exact layout like Reference */}
          <div className="hidden lg:flex items-center flex-wrap">
            {navLinks.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-3.5 py-2 text-xs sm:text-[13px] font-semibold transition-colors duration-150 border-r border-[#550055] first:border-l ${
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

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="lg:hidden py-2 border-t border-[#550055] space-y-1">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-1.5 text-xs font-semibold rounded ${
                  pathname === item.href
                    ? "bg-[#550055] text-[#FFD700]"
                    : "text-white hover:bg-[#550055]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
