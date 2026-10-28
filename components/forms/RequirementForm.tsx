"use client";

import React, { useState } from "react";
import { services } from "@/data/services";
import { companyInfo } from "@/data/companyInfo";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Upload,
  MessageSquare,
  Lock,
  FileCheck,
} from "lucide-react";

export function RequirementForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    researchLevel: "PhD Candidate",
    discipline: "Social Sciences & Humanities",
    service: "Thesis & Dissertation Support",
    deadline: "",
    description: "",
  });

  const [fileName, setFileName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = "Full name is required.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "A valid academic or personal email is required.";
    }
    if (!formData.whatsapp.trim() || formData.whatsapp.length < 8) {
      errs.whatsapp = "Valid WhatsApp phone number is required.";
    }
    if (!formData.deadline.trim()) errs.deadline = "Please state your target timeline.";
    if (!formData.description.trim() || formData.description.length < 20) {
      errs.description = "Please provide at least 20 characters describing your research requirements.";
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const generateWhatsAppLink = () => {
    const text = `*New Research Requirement Dossier*\n*Name:* ${formData.fullName}\n*Level:* ${formData.researchLevel}\n*Discipline:* ${formData.discipline}\n*Service:* ${formData.service}\n*Deadline:* ${formData.deadline}\n*Brief:* ${formData.description}${fileName ? `\n*File Attached:* ${fileName}` : ""}`;
    return `https://wa.me/${companyInfo.whatsappRaw}?text=${encodeURIComponent(text)}`;
  };

  if (submitted) {
    return (
      <div className="bg-white rounded border border-sand-200 p-8 sm:p-10 shadow-sm text-center">
        <div className="w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h3 className="font-editorial text-2xl font-bold text-navy-950 mb-2">
          Research Requirement Dossier Received
        </h3>
        <p className="text-sm text-academic-muted max-w-lg mx-auto mb-6 leading-relaxed">
          Thank you, <strong className="text-navy-950">{formData.fullName}</strong>. Your research dossier has been logged into our academic intake queue. A methodologist specializing in <strong className="text-navy-950">{formData.discipline}</strong> will review your scope and contact you within 4 hours.
        </p>

        <div className="p-4 bg-sand-50 rounded border border-sand-200 text-left max-w-md mx-auto text-xs space-y-2 mb-6">
          <div><span className="text-academic-muted">Candidate:</span> <span className="font-semibold text-navy-950">{formData.fullName}</span></div>
          <div><span className="text-academic-muted">Target Service:</span> <span className="font-semibold text-navy-950">{formData.service}</span></div>
          <div><span className="text-academic-muted">Discipline:</span> <span className="font-semibold text-navy-950">{formData.discipline}</span></div>
          <div><span className="text-academic-muted">Timeline:</span> <span className="font-semibold text-navy-950">{formData.deadline}</span></div>
          {fileName && <div><span className="text-academic-muted">Attached Document:</span> <span className="font-mono text-navy-950">{fileName}</span></div>}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={generateWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Connect on WhatsApp for Immediate Priority Review</span>
          </a>

          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setFileName(null);
            }}
            className="px-4 py-2.5 rounded border border-navy-950 text-navy-950 hover:bg-navy-950 hover:text-white text-xs font-semibold transition-colors"
          >
            Submit Another Requirement
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded border border-sand-200 p-6 sm:p-8 shadow-sm space-y-6"
    >
      <div className="border-b border-sand-200 pb-3">
        <h3 className="font-editorial text-xl font-bold text-navy-950">
          Academic Requirement Intake Dossier
        </h3>
        <p className="text-xs text-academic-muted mt-1">
          All submitted manuscripts, proposals, and datasets remain strictly protected under our Academic Non-Disclosure Agreement.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-navy-950 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="Dr. / Mr. / Ms. Full Name"
            className={`w-full text-xs px-3 py-2 border rounded text-academic-text focus:outline-none focus:border-orange-500 ${
              errors.fullName ? "border-red-500 bg-red-50/20" : "border-sand-200"
            }`}
          />
          {errors.fullName && (
            <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.fullName}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-navy-950 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="scholar@university.edu / personal"
            className={`w-full text-xs px-3 py-2 border rounded text-academic-text focus:outline-none focus:border-orange-500 ${
              errors.email ? "border-red-500 bg-red-50/20" : "border-sand-200"
            }`}
          />
          {errors.email && (
            <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.email}
            </p>
          )}
        </div>

        {/* WhatsApp Phone */}
        <div>
          <label className="block text-xs font-semibold text-navy-950 mb-1">
            WhatsApp Number (with Country Code) *
          </label>
          <input
            type="text"
            value={formData.whatsapp}
            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            placeholder="+91 XXXXX XXXXX"
            className={`w-full text-xs px-3 py-2 border rounded text-academic-text focus:outline-none focus:border-orange-500 ${
              errors.whatsapp ? "border-red-500 bg-red-50/20" : "border-sand-200"
            }`}
          />
          {errors.whatsapp && (
            <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.whatsapp}
            </p>
          )}
        </div>

        {/* Target Deadline */}
        <div>
          <label className="block text-xs font-semibold text-navy-950 mb-1">
            Target Submission / Review Deadline *
          </label>
          <input
            type="text"
            value={formData.deadline}
            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            placeholder="e.g., Within 10 Days / End of Month"
            className={`w-full text-xs px-3 py-2 border rounded text-academic-text focus:outline-none focus:border-orange-500 ${
              errors.deadline ? "border-red-500 bg-red-50/20" : "border-sand-200"
            }`}
          />
          {errors.deadline && (
            <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.deadline}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Research Level */}
        <div>
          <label className="block text-xs font-semibold text-navy-950 mb-1">
            Research Level
          </label>
          <select
            value={formData.researchLevel}
            onChange={(e) => setFormData({ ...formData, researchLevel: e.target.value })}
            className="w-full text-xs px-3 py-2 border border-sand-200 rounded text-academic-text bg-white focus:outline-none focus:border-orange-500"
          >
            <option>PhD Candidate</option>
            <option>Postgraduate / Master&apos;s</option>
            <option>Faculty / University Professor</option>
            <option>Postdoctoral Fellow</option>
            <option>Independent Researcher</option>
          </select>
        </div>

        {/* Discipline */}
        <div>
          <label className="block text-xs font-semibold text-navy-950 mb-1">
            Subject / Discipline
          </label>
          <select
            value={formData.discipline}
            onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
            className="w-full text-xs px-3 py-2 border border-sand-200 rounded text-academic-text bg-white focus:outline-none focus:border-orange-500"
          >
            {companyInfo.disciplines.map((d, i) => (
              <option key={i}>{d}</option>
            ))}
          </select>
        </div>

        {/* Required Service */}
        <div>
          <label className="block text-xs font-semibold text-navy-950 mb-1">
            Required Service
          </label>
          <select
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full text-xs px-3 py-2 border border-sand-200 rounded text-academic-text bg-white focus:outline-none focus:border-orange-500"
          >
            {services.map((s, i) => (
              <option key={i} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Project Description */}
      <div>
        <label className="block text-xs font-semibold text-navy-950 mb-1">
          Project Description &amp; Specific Review Requirements *
        </label>
        <textarea
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Please outline the title/topic of your research, specific chapters or data models requiring review, reference style (e.g., APA 7), and any feedback received from supervisors or review panels."
          className={`w-full text-xs p-3 border rounded text-academic-text focus:outline-none focus:border-orange-500 ${
            errors.description ? "border-red-500 bg-red-50/20" : "border-sand-200"
          }`}
        />
        {errors.description && (
          <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.description}
          </p>
        )}
      </div>

      {/* File Upload UI */}
      <div>
        <label className="block text-xs font-semibold text-navy-950 mb-1">
          Upload Draft Synopsis / Thesis Chapter / Dataset (Optional)
        </label>
        <div className="border-2 border-dashed border-sand-200 rounded-lg p-5 text-center hover:border-orange-500 transition-colors bg-sand-50/40">
          <input
            type="file"
            id="file-upload"
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.doc,.docx,.rtf,.odt,.sav,.xlsx"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Upload className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <span className="text-xs font-medium text-navy-950 block">
              {fileName ? (
                <span className="flex items-center justify-center gap-1.5 text-green-700 font-semibold">
                  <FileCheck className="w-4 h-4" /> {fileName}
                </span>
              ) : (
                "Click to select manuscript file or drag & drop (.docx, .pdf, .sav, .xlsx)"
              )}
            </span>
            <span className="text-[10px] text-academic-muted mt-1 block">
              Max file size 25MB. Files are strictly confidential and encrypted.
            </span>
          </label>
        </div>
      </div>

      {/* Academic Ethics Agreement */}
      <div className="bg-sand-50 rounded p-3 text-[11px] text-academic-muted flex items-start gap-2 border border-sand-200">
        <Lock className="w-4 h-4 text-navy-950 shrink-0 mt-0.5" />
        <p>
          By submitting this dossier, you affirm that this inquiry is for legitimate academic advisory, methodological review, developmental editing, or statistical consultation. Impulse Research Work operates in compliance with international research ethics charters.
        </p>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold tracking-wide transition-all shadow-md active:scale-[0.99]"
        >
          <Send className="w-4 h-4" />
          <span>Submit Research Dossier for Methodological Review</span>
        </button>
      </div>
    </form>
  );
}
