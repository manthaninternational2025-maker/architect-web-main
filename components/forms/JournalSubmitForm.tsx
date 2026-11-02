"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useJournalData } from "@/context/JournalDataContext";
import { CheckCircle2, RefreshCw } from "lucide-react";

export function JournalSubmitForm() {
  const { settings, addMessage } = useJournalData();

  const [formData, setFormData] = useState({
    whatsapp: "",
    title: "Dr.",
    firstName: "",
    middleName: "",
    lastName: "",
    degree: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    institute: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    availableAsReviewer: "No",
    agreeTerms: true,
    agreeNewsletter: true,
    captchaInput: "",
  });

  const [captchaCode, setCaptchaCode] = useState("8mcst");
  const [manuscriptFile, setManuscriptFile] = useState<File | null>(null);
  const [undertakingFile, setUndertakingFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Generate random 5-letter lowercase captcha
  const generateCaptcha = () => {
    const chars = "abcdefghjkmnpqrstuvwxyz23456789";
    let code = "";
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.whatsapp.trim()) {
      setErrorMsg("WhatsApp Number is required.");
      return;
    }
    if (!formData.firstName.trim()) {
      setErrorMsg("First Name is required.");
      return;
    }
    if (!formData.lastName.trim()) {
      setErrorMsg("Last Name is required.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMsg("A valid Email address is required.");
      return;
    }
    if (!manuscriptFile) {
      setErrorMsg("Please attach your manuscript file (DOC, DOCX, or PDF).");
      return;
    }
    if (formData.captchaInput.trim().toLowerCase() !== captchaCode.toLowerCase()) {
      setErrorMsg("Incorrect security code! Please enter the lowercase characters shown in the security box.");
      return;
    }

    const fullName = `${formData.title} ${formData.firstName} ${formData.middleName ? formData.middleName + " " : ""}${formData.lastName}`.trim();
    const submissionDetails = `Candidate: ${fullName}
WhatsApp: ${formData.whatsapp}
Phone: ${formData.phone || "N/A"}
Email: ${formData.email}
Degree: ${formData.degree || "N/A"}
Position: ${formData.position || "N/A"}
Department: ${formData.department || "N/A"}
Institute: ${formData.institute || "N/A"}
Location: ${[formData.address, formData.city, formData.state, formData.country].filter(Boolean).join(", ")}
Available as Reviewer: ${formData.availableAsReviewer}
Attached Manuscript: ${manuscriptFile.name} (${(manuscriptFile.size / 1024).toFixed(1)} KB)
${undertakingFile ? `Attached Undertaking: ${undertakingFile.name}` : ""}`;

    addMessage({
      sender: fullName,
      email: formData.email,
      subject: `Manuscript Submission: ${manuscriptFile.name}`,
      content: submissionDetails,
    });

    setSubmitted(true);
  };

  if (submitted) {
    const fullName = `${formData.title} ${formData.firstName} ${formData.lastName}`.trim();
    return (
      <div className="bg-white border border-gray-300 p-6 sm:p-8 text-center space-y-4">
        <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto border border-green-200">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h2 className="font-editorial text-xl sm:text-2xl font-bold text-gray-900">
          Manuscript Successfully Submitted!
        </h2>
        <p className="text-xs sm:text-sm text-gray-700 max-w-lg mx-auto leading-relaxed">
          Thank you, <strong>{fullName}</strong>. Your manuscript file <strong>{manuscriptFile?.name}</strong> has been logged into the editorial intake system. An acknowledgement email and reference number will be sent to <strong>{formData.email}</strong>.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setManuscriptFile(null);
              setUndertakingFile(null);
              generateCaptcha();
            }}
            className="px-4 py-2 bg-[#700070] text-white rounded font-bold text-xs hover:bg-[#550055] transition-colors"
          >
            Submit Another Manuscript
          </button>
          <Link
            href="/"
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded font-semibold text-xs hover:bg-gray-50 transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-300 p-4 sm:p-6 text-xs sm:text-sm text-gray-800 space-y-4 font-sans">
      <h1 className="text-xl sm:text-2xl font-editorial font-bold text-[#111111] border-b border-gray-200 pb-2">
        Submit Manuscript
      </h1>

      <div className="space-y-1.5 text-xs text-gray-700 leading-relaxed">
        <p>
          Authors can submit manuscript through by filling form or mailing it at:{" "}
          <a href={`mailto:${settings.email}`} className="text-[#700070] font-mono font-bold hover:underline break-all">
            {settings.email}
          </a>
        </p>
        <p>
          Authors can use the below pdf files for sending their manuscripts to us:
        </p>
        <div className="flex flex-wrap items-center gap-2 pt-0.5">
          <Link
            href="/instructions-to-authors"
            className="text-[#700070] font-semibold underline hover:text-[#550055]"
          >
            Instruction to authors
          </Link>
          <span className="text-gray-400">|</span>
          <a
            href={`mailto:${settings.email}?subject=Request for Copyright Form`}
            className="text-[#700070] font-semibold underline hover:text-[#550055]"
          >
            Copyright Form
          </a>
          <span className="text-gray-400">|</span>
          <a
            href={`mailto:${settings.email}?subject=Request for Manuscript Template`}
            className="text-[#700070] font-semibold underline hover:text-[#550055]"
          >
            Template of Manuscript
          </a>
        </div>
      </div>

      <div className="pt-2 border-t border-gray-200">
        <h2 className="font-bold text-gray-900 text-sm sm:text-base mb-3">
          Please fill in Following Details to Submit your Manuscript
        </h2>

        {errorMsg && (
          <div className="mb-3 p-2.5 bg-rose-50 border border-rose-300 text-rose-700 rounded text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 sm:gap-3 items-center">
            {/* WhatsApp Number */}
            <label className="sm:col-span-4 text-xs font-semibold text-gray-800">
              WhatsApp Number*
            </label>
            <div className="sm:col-span-8">
              <input
                type="tel"
                required
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 focus:outline-none focus:border-[#700070]"
                placeholder="e.g. +91 9876543210"
              />
            </div>

            {/* Title */}
            <label className="sm:col-span-4 text-xs font-semibold text-gray-800">
              Title
            </label>
            <div className="sm:col-span-8">
              <select
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full sm:w-36 px-2.5 py-1.5 text-xs border border-gray-300 focus:outline-none focus:border-[#700070] bg-white"
              >
                <option value="Mr.">Mr.</option>
                <option value="Ms.">Ms.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Dr.">Dr.</option>
                <option value="Prof.">Prof.</option>
              </select>
            </div>

            {/* First Name */}
            <label className="sm:col-span-4 text-xs font-semibold text-gray-800">
              First Name*
            </label>
            <div className="sm:col-span-8">
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 focus:outline-none focus:border-[#700070]"
              />
            </div>

            {/* Middle Name */}
            <label className="sm:col-span-4 text-xs font-semibold text-gray-800">
              Middle Name
            </label>
            <div className="sm:col-span-8">
              <input
                type="text"
                value={formData.middleName}
                onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 focus:outline-none focus:border-[#700070]"
              />
            </div>

            {/* Last Name */}
            <label className="sm:col-span-4 text-xs font-semibold text-gray-800">
              Last Name*
            </label>
            <div className="sm:col-span-8">
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 focus:outline-none focus:border-[#700070]"
              />
            </div>

            {/* Degree */}
            <label className="sm:col-span-4 text-xs font-semibold text-gray-800">
              Degree
            </label>
            <div className="sm:col-span-8">
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 focus:outline-none focus:border-[#700070]"
                placeholder="e.g. Ph.D. / M.Phil / M.A."
              />
            </div>

            {/* Email */}
            <label className="sm:col-span-4 text-xs font-semibold text-gray-800">
              Email*
            </label>
            <div className="sm:col-span-8">
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 focus:outline-none focus:border-[#700070]"
              />
            </div>

            {/* Phone */}
            <label className="sm:col-span-4 text-xs font-semibold text-gray-800">
              Phone
            </label>
            <div className="sm:col-span-8">
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 focus:outline-none focus:border-[#700070]"
              />
            </div>

            {/* Position */}
            <label className="sm:col-span-4 text-xs font-semibold text-gray-800">
              Position
            </label>
            <div className="sm:col-span-8">
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 focus:outline-none focus:border-[#700070]"
                placeholder="e.g. Assistant Professor / Research Scholar"
              />
            </div>

            {/* Department */}
            <label className="sm:col-span-4 text-xs font-semibold text-gray-800">
              Department
            </label>
            <div className="sm:col-span-8">
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 focus:outline-none focus:border-[#700070]"
              />
            </div>

            {/* Institute */}
            <label className="sm:col-span-4 text-xs font-semibold text-gray-800">
              Institute
            </label>
            <div className="sm:col-span-8">
              <input
                type="text"
                value={formData.institute}
                onChange={(e) => setFormData({ ...formData, institute: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 focus:outline-none focus:border-[#700070]"
              />
            </div>

            {/* Address */}
            <label className="sm:col-span-4 text-xs font-semibold text-gray-800">
              Address
            </label>
            <div className="sm:col-span-8">
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 focus:outline-none focus:border-[#700070]"
              />
            </div>

            {/* City */}
            <label className="sm:col-span-4 text-xs font-semibold text-gray-800">
              City
            </label>
            <div className="sm:col-span-8">
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 focus:outline-none focus:border-[#700070]"
              />
            </div>

            {/* State */}
            <label className="sm:col-span-4 text-xs font-semibold text-gray-800">
              State
            </label>
            <div className="sm:col-span-8">
              <input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 focus:outline-none focus:border-[#700070]"
              />
            </div>

            {/* Country */}
            <label className="sm:col-span-4 text-xs font-semibold text-gray-800">
              Country
            </label>
            <div className="sm:col-span-8">
              <input
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 focus:outline-none focus:border-[#700070]"
              />
            </div>

            {/* Available as Reviewer */}
            <label className="sm:col-span-4 text-xs font-semibold text-gray-800">
              Available as a Reviewer
            </label>
            <div className="sm:col-span-8 flex items-center gap-4">
              <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs">
                <input
                  type="radio"
                  name="reviewer"
                  value="Yes"
                  checked={formData.availableAsReviewer === "Yes"}
                  onChange={() => setFormData({ ...formData, availableAsReviewer: "Yes" })}
                  className="text-[#700070]"
                />
                <span>Yes</span>
              </label>
              <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs">
                <input
                  type="radio"
                  name="reviewer"
                  value="No"
                  checked={formData.availableAsReviewer === "No"}
                  onChange={() => setFormData({ ...formData, availableAsReviewer: "No" })}
                  className="text-[#700070]"
                />
                <span>No</span>
              </label>
            </div>

            {/* Attach Manuscript */}
            <label className="sm:col-span-4 text-xs font-semibold text-gray-800">
              Attach Manuscript*
            </label>
            <div className="sm:col-span-8">
              <input
                type="file"
                required
                accept=".doc,.docx,.pdf,.rtf"
                onChange={(e) => {
                  if (e.target.files?.[0]) setManuscriptFile(e.target.files[0]);
                }}
                className="text-xs text-gray-700 file:mr-3 file:py-1 file:px-3 file:border file:border-gray-300 file:text-xs file:bg-gray-100 hover:file:bg-gray-200 cursor-pointer"
              />
            </div>

            {/* Attach Undertaking */}
            <label className="sm:col-span-4 text-xs font-semibold text-gray-800">
              Attach Undertaking
            </label>
            <div className="sm:col-span-8">
              <input
                type="file"
                accept=".doc,.docx,.pdf,.jpg,.jpeg,.png"
                onChange={(e) => {
                  if (e.target.files?.[0]) setUndertakingFile(e.target.files[0]);
                }}
                className="text-xs text-gray-700 file:mr-3 file:py-1 file:px-3 file:border file:border-gray-300 file:text-xs file:bg-gray-100 hover:file:bg-gray-200 cursor-pointer"
              />
            </div>

            {/* Checkboxes */}
            <label className="sm:col-span-4 text-xs font-semibold text-gray-800 align-top">
              Check All That Apply
            </label>
            <div className="sm:col-span-8 space-y-2 text-[11px] text-gray-700 leading-snug">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  className="mt-0.5 rounded text-[#700070]"
                />
                <span>By clicking on Submit, I agree to the Privacy Policy and Terms of Use.</span>
              </label>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreeNewsletter}
                  onChange={(e) => setFormData({ ...formData, agreeNewsletter: e.target.checked })}
                  className="mt-0.5 rounded text-[#700070]"
                />
                <span>By providing us with your contact information, you&apos;re agreeing to receive newsletters and other insightful information from {settings.journalTitle}. But if you ever change your mind, you can unsubscribe by following the instructions within the email that you receive.</span>
              </label>
            </div>

            {/* Security Code Captcha */}
            <label className="sm:col-span-4 text-xs font-semibold text-gray-800">
              Please enter the security code
            </label>
            <div className="sm:col-span-8 flex items-center gap-3">
              <div
                className="px-4 py-1.5 border border-gray-400 bg-amber-50/50 font-mono text-base font-bold tracking-widest text-slate-800 select-none shadow-2xs inline-block"
                style={{
                  backgroundImage: "radial-gradient(#d1d5db 1px, transparent 1px)",
                  backgroundSize: "6px 6px",
                  letterSpacing: "4px",
                }}
              >
                {captchaCode}
              </div>
              <button
                type="button"
                onClick={generateCaptcha}
                className="p-1 text-gray-500 hover:text-[#700070] text-xs flex items-center gap-1"
                title="Refresh Captcha"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload</span>
              </button>
            </div>

            {/* Captcha Input */}
            <label className="sm:col-span-4 text-xs font-semibold text-gray-800">
              Security Code (lowercase letters)
            </label>
            <div className="sm:col-span-8">
              <input
                type="text"
                required
                value={formData.captchaInput}
                onChange={(e) => setFormData({ ...formData, captchaInput: e.target.value })}
                className="w-full sm:w-48 px-2.5 py-1.5 text-xs font-mono border border-gray-300 focus:outline-none focus:border-[#700070]"
                placeholder="Enter 5 letters"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-3 border-t border-gray-200">
            <button
              type="submit"
              className="px-6 py-2 bg-[#700070] hover:bg-[#550055] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors shadow-xs cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
