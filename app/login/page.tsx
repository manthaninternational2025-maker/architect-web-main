"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/layout/Sidebar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Lock, Mail, Key, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter both your Scholar ID / Email and Password.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <div className="academic-container py-8 lg:py-12 animate-academic-fade">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white border border-sand-200 p-6 sm:p-10 rounded shadow-xs">
          <SectionHeader
            title="Scholar &amp; Author Portal Login"
            subtitle="Access your research submissions, editorial review status, and manuscript proofs."
            badge="Authentication"
          />

          {submitted ? (
            <div className="p-8 text-center bg-sand-50 rounded border border-sand-200 space-y-4">
              <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h2 className="font-editorial text-xl font-bold text-navy-950">
                Welcome to Impulse Scholar Portal
              </h2>
              <p className="text-xs text-academic-muted max-w-md mx-auto">
                You have authenticated successfully as <strong className="text-navy-950">{email}</strong>. Your research track dossier is currently active.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <Link
                  href="/submit"
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  View My Submissions →
                </Link>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 border border-navy-950 text-navy-950 hover:bg-navy-950 hover:text-white rounded text-xs font-semibold transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 pt-2">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy-950 mb-1">
                  Scholar ID / Academic Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="scholar@university.edu"
                    className="w-full text-xs pl-9 pr-3 py-2 border border-sand-200 rounded focus:outline-none focus:border-orange-500 text-navy-950"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy-950 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full text-xs pl-9 pr-3 py-2 border border-sand-200 rounded focus:outline-none focus:border-orange-500 text-navy-950"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-academic-muted">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" className="rounded text-orange-600" />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" className="text-orange-600 hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded bg-navy-950 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
              >
                Sign In to Scholar Portal
              </button>

              <div className="pt-4 border-t border-sand-200 text-center text-xs text-academic-muted">
                Don&apos;t have a scholar account yet?{" "}
                <Link href="/register" className="font-bold text-orange-600 hover:underline">
                  Register as an Author / Scholar →
                </Link>
              </div>
            </form>
          )}
        </div>

        <div className="lg:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
