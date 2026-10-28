"use client";

import React, { useState } from "react";
import { companyInfo } from "@/data/companyInfo";
import { Send, CheckCircle, AlertCircle, MessageSquare } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Name is required.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Valid email address is required.";
    }
    if (!formData.phone.trim()) errs.phone = "Phone or WhatsApp number is required.";
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = "Message must be at least 10 characters.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded border border-sand-200 p-8 text-center shadow-sm">
        <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3 border border-green-200">
          <CheckCircle className="w-6 h-6" />
        </div>
        <h4 className="font-editorial text-lg font-bold text-navy-950 mb-1">
          Inquiry Successfully Dispatched
        </h4>
        <p className="text-xs text-academic-muted max-w-sm mx-auto mb-4">
          Thank you, {formData.name}. Our academic consultation team has received your message and will respond shortly via email or WhatsApp.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-4 py-2 text-xs font-semibold rounded border border-navy-950 text-navy-950 hover:bg-navy-950 hover:text-white transition-colors"
        >
          Send Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded border border-sand-200 p-6 shadow-sm space-y-4"
    >
      <div className="border-b border-sand-200 pb-2.5">
        <h3 className="font-editorial text-base font-bold text-navy-950">
          Academic Inquiry Form
        </h3>
        <p className="text-xs text-academic-muted">
          Inquire regarding consultation availability, methodology reviews, or institutional workshops.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-navy-950 mb-1">
            Your Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Dr. / Prof. / Scholar Name"
            className={`w-full text-xs px-3 py-2 border rounded text-academic-text focus:outline-none focus:border-orange-500 ${
              errors.name ? "border-red-500" : "border-sand-200"
            }`}
          />
          {errors.name && (
            <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy-950 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="scholar@university.edu"
            className={`w-full text-xs px-3 py-2 border rounded text-academic-text focus:outline-none focus:border-orange-500 ${
              errors.email ? "border-red-500" : "border-sand-200"
            }`}
          />
          {errors.email && (
            <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-navy-950 mb-1">
            WhatsApp / Phone Number *
          </label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+91 XXXXX XXXXX"
            className={`w-full text-xs px-3 py-2 border rounded text-academic-text focus:outline-none focus:border-orange-500 ${
              errors.phone ? "border-red-500" : "border-sand-200"
            }`}
          />
          {errors.phone && (
            <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy-950 mb-1">
            Inquiry Subject
          </label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="e.g. Dissertation Review Consultation"
            className="w-full text-xs px-3 py-2 border border-sand-200 rounded text-academic-text focus:outline-none focus:border-orange-500"
          >
          </input>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-navy-950 mb-1">
          Detailed Message *
        </label>
        <textarea
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Share details regarding your research discipline, current progress, or questions..."
          className={`w-full text-xs p-3 border rounded text-academic-text focus:outline-none focus:border-orange-500 ${
            errors.message ? "border-red-500" : "border-sand-200"
          }`}
        />
        {errors.message && (
          <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.message}
          </p>
        )}
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
        <button
          type="submit"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-navy-950 hover:bg-navy-900 text-white text-xs font-semibold transition-colors shadow-sm"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Dispatch Inquiry</span>
        </button>

        <a
          href={companyInfo.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold transition-colors shadow-sm"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp Quick Desk</span>
        </a>
      </div>
    </form>
  );
}
