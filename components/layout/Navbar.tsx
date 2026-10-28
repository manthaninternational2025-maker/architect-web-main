"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavItems } from "@/data/navigation";
import { companyInfo } from "@/data/companyInfo";
import { Logo } from "@/components/ui/Logo";
import { Menu, X, Search, ChevronDown, Send } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/archives?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <nav className="bg-white border-t-2 border-navy-950 border-b border-sand-200 shadow-xs sticky top-0 z-50">
      <div className="academic-container">
        <div className="flex items-center justify-between min-h-12 py-1">
          {/* Mobile Menu Button & Brand */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded text-navy-950 hover:bg-sand-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <Logo variant="navbar" />
          </div>

          {/* Desktop Navigation Links — Exact layout like Novalex reference */}
          <div className="hidden lg:flex items-center flex-wrap gap-x-5 xl:gap-x-7 gap-y-2 py-2">
            {mainNavItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              if (item.children) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <Link
                      href={item.href}
                      className={`inline-flex items-center gap-1 text-[11px] xl:text-xs font-bold tracking-wider uppercase transition-colors ${
                        isActive
                          ? "text-orange-600 border-b-2 border-orange-600 pb-0.5"
                          : "text-navy-950 hover:text-orange-600"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="w-3 h-3" />
                    </Link>

                    {dropdownOpen && (
                      <div className="absolute left-0 top-full w-48 bg-white border border-sand-200 shadow-lg rounded py-1 z-50">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-3 py-2 text-xs font-semibold text-navy-950 hover:bg-sand-50 hover:text-orange-600 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[11px] xl:text-xs font-bold tracking-wider uppercase transition-colors ${
                    isActive
                      ? "text-orange-600 border-b-2 border-orange-600 pb-0.5"
                      : "text-navy-950 hover:text-orange-600"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right Action: Search Bar & Submit */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-1.5 text-navy-950 hover:text-orange-600 rounded transition-colors flex items-center gap-1 text-xs font-semibold"
                aria-label="Search Journal"
              >
                <Search className="w-4 h-4" />
                <span className="hidden xl:inline text-[11px] uppercase tracking-wider">Search</span>
              </button>

              {searchOpen && (
                <form
                  onSubmit={handleSearch}
                  className="absolute right-0 top-10 w-64 bg-white rounded shadow-lg border border-sand-200 p-2 z-50 flex items-center gap-1"
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles, guides, topic..."
                    className="w-full text-xs px-2 py-1 border border-sand-200 rounded focus:outline-none focus:border-orange-500"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-2.5 py-1 bg-navy-950 hover:bg-orange-600 text-white rounded text-xs font-semibold"
                  >
                    Go
                  </button>
                </form>
              )}
            </div>

            <Link
              href="/submit"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-orange-600 hover:bg-orange-500 text-white text-[11px] font-bold uppercase tracking-wider transition-colors shadow-xs"
            >
              <Send className="w-3 h-3" />
              <span>Submit</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-sand-200 px-4 py-3 space-y-1">
          {mainNavItems.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-xs font-bold uppercase tracking-wider text-navy-950 hover:text-orange-600"
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="pl-3 py-1 space-y-1 border-l-2 border-sand-200">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setIsOpen(false)}
                      className="block py-1 text-xs text-academic-muted hover:text-orange-600"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="pt-3 border-t border-sand-200">
            <Link
              href="/submit"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded bg-orange-600 text-white text-xs font-bold uppercase tracking-wider"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Make a Submission</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
