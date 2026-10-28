"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/layout/Sidebar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { companyInfo } from "@/data/companyInfo";
import { User, Mail, Phone, Building, CheckCircle, AlertCircle, Lock } from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    institution: "",
    discipline: "Social Sciences",
    password: "",
    confirmPassword: "",
    agreeTerms: true,
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError("Please fill out all required personal and academic fields.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please verify.");
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
            title="Register as a Scholar / Author"
            subtitle="Create an academic account to submit manuscripts, track peer review, and access research resources."
            badge="Scholar Registration"
          />

          {submitted ? (
            <div className="p-8 text-center bg-sand-50 rounded border border-sand-200 space-y-4">
              <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h2 className="font-editorial text-xl font-bold text-navy-950">
                Scholar Account Successfully Created
              </h2>
              <p className="text-xs text-academic-muted max-w-md mx-auto">
                Welcome, <strong className="text-navy-950">{formData.fullName}</strong>. Your account has been registered with institutional affiliation: <strong className="text-navy-950">{formData.institution || "Independent Researcher"}</strong>.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <Link
                  href="/login"
                  className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
                >
                  Proceed to Login →
                </Link>
                <Link
                  href="/submit"
                  className="px-5 py-2.5 border border-navy-950 text-navy-950 hover:bg-navy-950 hover:text-white rounded text-xs font-semibold transition-colors"
                >
                  Make a Submission
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-950 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Dr. / Mr. / Ms. Full Name"
                      className="w-full text-xs pl-9 pr-3 py-2 border border-sand-200 rounded focus:outline-none focus:border-orange-500 text-navy-950"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-950 mb-1">
                    Academic / Personal Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="author@university.edu"
                      className="w-full text-xs pl-9 pr-3 py-2 border border-sand-200 rounded focus:outline-none focus:border-orange-500 text-navy-950"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-950 mb-1">
                    WhatsApp Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full text-xs pl-9 pr-3 py-2 border border-sand-200 rounded focus:outline-none focus:border-orange-500 text-navy-950"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-950 mb-1">
                    University / Institutional Affiliation
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      placeholder="e.g. Delhi University / IIT / Scholar"
                      className="w-full text-xs pl-9 pr-3 py-2 border border-sand-200 rounded focus:outline-none focus:border-orange-500 text-navy-950"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy-950 mb-1">
                  Primary Research Discipline
                </label>
                <select
                  value={formData.discipline}
                  onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-sand-200 rounded focus:outline-none focus:border-orange-500 text-navy-950 bg-white"
                >
                  {companyInfo.disciplines.map((disc, idx) => (
                    <option key={idx} value={disc}>
                      {disc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-950 mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Minimum 6 characters"
                      className="w-full text-xs pl-9 pr-3 py-2 border border-sand-200 rounded focus:outline-none focus:border-orange-500 text-navy-950"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-950 mb-1">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="Re-enter password"
                      className="w-full text-xs pl-9 pr-3 py-2 border border-sand-200 rounded focus:outline-none focus:border-orange-500 text-navy-950"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="text-xs text-academic-muted">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                    className="rounded text-orange-600 mt-0.5"
                    required
                  />
                  <span>
                    I agree to the <Link href="/terms" className="text-orange-600 underline">Terms of Academic Consultation</Link> and <Link href="/academic-integrity" className="text-orange-600 underline">Academic Integrity Charter</Link>.
                  </span>
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
                >
                  Complete Scholar Registration
                </button>
              </div>

              <div className="pt-4 border-t border-sand-200 text-center text-xs text-academic-muted">
                Already registered with Impulse Research Work?{" "}
                <Link href="/login" className="font-bold text-navy-950 hover:text-orange-600 underline">
                  Login to Scholar Portal →
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
