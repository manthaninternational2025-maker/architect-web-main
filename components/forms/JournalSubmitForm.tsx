"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useJournalData } from "@/context/JournalDataContext";
import { CheckCircle2, X } from "lucide-react";

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

  const [captchaCode, setCaptchaCode] = useState("");
  const [manuscriptFile, setManuscriptFile] = useState<File | null>(null);
  const [undertakingFile, setUndertakingFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const manuscriptInputRef = useRef<HTMLInputElement | null>(null);
  const undertakingInputRef = useRef<HTMLInputElement | null>(null);

  // Generate random 5-letter lowercase captcha
  const generateCaptcha = () => {
    const chars = "abcdefhkmnprstuvwxyz23456789";
    let code = "";
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    drawCaptcha(code);
  };

  // Draw authentic captcha image matching the reference screenshot
  const drawCaptcha = (code: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // Confetti / specks
    const confettiColors = [
      "#2E7D32", "#1565C0", "#C62828", "#E65100", 
      "#6A1B9A", "#00838F", "#4E342E", "#F57F17", "#00ACC1"
    ];

    for (let i = 0; i < 110; i++) {
      ctx.fillStyle = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      const x = Math.random() * width;
      const y = Math.random() * height;
      const len = Math.random() * 6 + 2;
      const angle = Math.random() * Math.PI * 2;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(angle) * len, y + Math.sin(angle) * len);
      ctx.lineWidth = Math.random() * 1.5 + 0.5;
      ctx.strokeStyle = ctx.fillStyle;
      ctx.stroke();
    }

    // Squiggly characters in reddish-brown tone
    const charSpacing = (width - 30) / code.length;
    for (let i = 0; i < code.length; i++) {
      ctx.save();
      const char = code[i];
      const x = 16 + i * charSpacing + (Math.random() * 4 - 2);
      const y = height / 2 + 8 + (Math.random() * 6 - 3);

      ctx.translate(x, y);
      const rotateAngle = (Math.random() * 24 - 12) * (Math.PI / 180);
      ctx.rotate(rotateAngle);

      ctx.font = "bold 26px 'Georgia', 'Times New Roman', serif";
      ctx.fillStyle = "#8a2424";
      ctx.fillText(char, 0, 0);
      ctx.restore();
    }

    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * 20, Math.random() * height);
      ctx.bezierCurveTo(
        Math.random() * width, Math.random() * height,
        Math.random() * width, Math.random() * height,
        width - Math.random() * 20, Math.random() * height
      );
      ctx.strokeStyle = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      ctx.lineWidth = 1;
      ctx.stroke();
    }
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
      generateCaptcha();
      setFormData((prev) => ({ ...prev, captchaInput: "" }));
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
      sender: fullName || formData.email,
      email: formData.email,
      subject: `Manuscript Submission: ${manuscriptFile.name}`,
      content: submissionDetails,
    });

    setSubmitted(true);
  };

  const journalEmail = settings?.email || "manthaninternational2025@gmail.com";
  const journalTitle = settings?.journalTitle || "Manthan: International Multidisciplinary Journal of Social Inquiry";

  return (
    <div className="border border-gray-400 bg-white p-5 sm:p-7 text-[#222222]">
      {/* Page Title */}
      <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#111111] mb-2">
        Submit Manuscript
      </h1>

      {/* Introductory instructions */}
      <div className="text-xs sm:text-sm text-gray-800 leading-normal mb-4">
        <p>
          Authors can submit manuscript through by filling form or mailing it at:{" "}
          <a
            href={`mailto:${journalEmail}`}
            className="text-[#700070] font-semibold hover:underline"
          >
            {journalEmail}
          </a>
        </p>
        <p className="mt-1">
          Authors can use the below pdf files for sending their manuscripts to us:
        </p>
        <div className="space-y-0.5 text-xs text-[#700070] pt-1 pb-1">
          <div>
            <Link href="/instructions-to-authors" className="hover:underline">
              Instruction to authors
            </Link>
          </div>
          <div>
            <a
              href="/forms/copyright-form.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Manthan-Copyright-Form.pdf"
              className="hover:underline"
            >
              Copyright Form
            </a>
          </div>
          <div>
            <a href="/forms/manuscript-template.docx" download className="hover:underline">
              Template of Manuscript
            </a>
          </div>
        </div>
      </div>

      {/* Section Subheading */}
      <h2 className="text-sm sm:text-base font-bold text-[#111111] mb-4">
        Please fill in Following Details to Submit your Manuscript
      </h2>

      {submitted ? (
        <div className="border border-green-600 bg-green-50 p-6 space-y-4 my-4">
          <div className="flex items-center gap-2 text-green-800 font-bold text-base sm:text-lg">
            <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
            <span>Manuscript Successfully Submitted!</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-800 leading-relaxed">
            Thank you, <strong>{formData.title} {formData.firstName} {formData.lastName}</strong>. Your manuscript file <strong>{manuscriptFile?.name}</strong> has been received by our editorial intake office.
          </p>
          <div className="bg-white border border-green-200 p-3 text-xs text-gray-700 space-y-1">
            <p><strong>Tracking Number:</strong> IMJSI-{Math.floor(100000 + Math.random() * 900000)}</p>
            <p><strong>Primary Contact:</strong> {formData.email} | {formData.whatsapp}</p>
            <p><strong>Status:</strong> Under Initial Editorial Review</p>
          </div>
          <p className="text-xs text-gray-600">
            An acknowledgement receipt and further tracking instructions will be forwarded to your WhatsApp and Email address.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setManuscriptFile(null);
                setUndertakingFile(null);
                setFormData({
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
                setTimeout(() => generateCaptcha(), 50);
              }}
              className="bg-[#c4c4c4] hover:bg-[#b0b0b0] text-black text-xs sm:text-sm font-medium px-5 py-1.5 border border-gray-400 cursor-pointer"
            >
              Submit Another Manuscript
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2.5 max-w-xl">
          {errorMsg && (
            <div className="bg-red-50 border border-red-300 text-red-700 text-xs sm:text-sm px-3 py-2 mb-3">
              {errorMsg}
            </div>
          )}

          {/* 1. Whats App Number* */}
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="w-full sm:w-56 text-xs sm:text-sm text-[#222222] shrink-0 mb-1 sm:mb-0">
              Whats App Number*
            </label>
            <input
              type="text"
              required
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              className="w-full sm:w-72 border border-gray-400 px-2 py-1 text-xs sm:text-sm bg-white focus:outline-none rounded-none text-gray-900"
            />
          </div>

          {/* 2. Title */}
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="w-full sm:w-56 text-xs sm:text-sm text-[#222222] shrink-0 mb-1 sm:mb-0">
              Title
            </label>
            <select
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full sm:w-72 border border-gray-400 px-2 py-1 text-xs sm:text-sm bg-white focus:outline-none rounded-none text-gray-900"
            >
              <option value="Mr.">Mr.</option>
              <option value="Dr.">Dr.</option>
              <option value="Prof.">Prof.</option>
              <option value="Ms.">Ms.</option>
              <option value="Mrs.">Mrs.</option>
            </select>
          </div>

          {/* 3. First Name */}
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="w-full sm:w-56 text-xs sm:text-sm text-[#222222] shrink-0 mb-1 sm:mb-0">
              First Name
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full sm:w-72 border border-gray-400 px-2 py-1 text-xs sm:text-sm bg-white focus:outline-none rounded-none text-gray-900"
            />
          </div>

          {/* 4. Middle Name */}
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="w-full sm:w-56 text-xs sm:text-sm text-[#222222] shrink-0 mb-1 sm:mb-0">
              Middle Name
            </label>
            <input
              type="text"
              value={formData.middleName}
              onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
              className="w-full sm:w-72 border border-gray-400 px-2 py-1 text-xs sm:text-sm bg-white focus:outline-none rounded-none text-gray-900"
            />
          </div>

          {/* 5. Last Name */}
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="w-full sm:w-56 text-xs sm:text-sm text-[#222222] shrink-0 mb-1 sm:mb-0">
              Last Name
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full sm:w-72 border border-gray-400 px-2 py-1 text-xs sm:text-sm bg-white focus:outline-none rounded-none text-gray-900"
            />
          </div>

          {/* 6. Degree */}
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="w-full sm:w-56 text-xs sm:text-sm text-[#222222] shrink-0 mb-1 sm:mb-0">
              Degree
            </label>
            <input
              type="text"
              value={formData.degree}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              className="w-full sm:w-72 border border-gray-400 px-2 py-1 text-xs sm:text-sm bg-white focus:outline-none rounded-none text-gray-900"
            />
          </div>

          {/* 7. Email* */}
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="w-full sm:w-56 text-xs sm:text-sm text-[#222222] shrink-0 mb-1 sm:mb-0">
              Email*
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full sm:w-72 border border-gray-400 px-2 py-1 text-xs sm:text-sm bg-white focus:outline-none rounded-none text-gray-900"
            />
          </div>

          {/* 8. Phone */}
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="w-full sm:w-56 text-xs sm:text-sm text-[#222222] shrink-0 mb-1 sm:mb-0">
              Phone
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full sm:w-72 border border-gray-400 px-2 py-1 text-xs sm:text-sm bg-white focus:outline-none rounded-none text-gray-900"
            />
          </div>

          {/* 9. Position */}
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="w-full sm:w-56 text-xs sm:text-sm text-[#222222] shrink-0 mb-1 sm:mb-0">
              Position
            </label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="w-full sm:w-72 border border-gray-400 px-2 py-1 text-xs sm:text-sm bg-white focus:outline-none rounded-none text-gray-900"
            />
          </div>

          {/* 10. Department */}
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="w-full sm:w-56 text-xs sm:text-sm text-[#222222] shrink-0 mb-1 sm:mb-0">
              Department
            </label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full sm:w-72 border border-gray-400 px-2 py-1 text-xs sm:text-sm bg-white focus:outline-none rounded-none text-gray-900"
            />
          </div>

          {/* 11. Institute */}
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="w-full sm:w-56 text-xs sm:text-sm text-[#222222] shrink-0 mb-1 sm:mb-0">
              Institute
            </label>
            <input
              type="text"
              value={formData.institute}
              onChange={(e) => setFormData({ ...formData, institute: e.target.value })}
              className="w-full sm:w-72 border border-gray-400 px-2 py-1 text-xs sm:text-sm bg-white focus:outline-none rounded-none text-gray-900"
            />
          </div>

          {/* 12. Address */}
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="w-full sm:w-56 text-xs sm:text-sm text-[#222222] shrink-0 mb-1 sm:mb-0">
              Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full sm:w-72 border border-gray-400 px-2 py-1 text-xs sm:text-sm bg-white focus:outline-none rounded-none text-gray-900"
            />
          </div>

          {/* 13. City */}
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="w-full sm:w-56 text-xs sm:text-sm text-[#222222] shrink-0 mb-1 sm:mb-0">
              City
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full sm:w-72 border border-gray-400 px-2 py-1 text-xs sm:text-sm bg-white focus:outline-none rounded-none text-gray-900"
            />
          </div>

          {/* 14. State */}
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="w-full sm:w-56 text-xs sm:text-sm text-[#222222] shrink-0 mb-1 sm:mb-0">
              State
            </label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="w-full sm:w-72 border border-gray-400 px-2 py-1 text-xs sm:text-sm bg-white focus:outline-none rounded-none text-gray-900"
            />
          </div>

          {/* 15. Country */}
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="w-full sm:w-56 text-xs sm:text-sm text-[#222222] shrink-0 mb-1 sm:mb-0">
              Country
            </label>
            <input
              type="text"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="w-full sm:w-72 border border-gray-400 px-2 py-1 text-xs sm:text-sm bg-white focus:outline-none rounded-none text-gray-900"
            />
          </div>

          {/* 16. Available as a Reviewer */}
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="w-full sm:w-56 text-xs sm:text-sm text-[#222222] shrink-0 mb-1 sm:mb-0">
              Available as a Reviewer
            </label>
            <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-800">
              <label className="inline-flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="reviewer"
                  value="Yes"
                  checked={formData.availableAsReviewer === "Yes"}
                  onChange={() => setFormData({ ...formData, availableAsReviewer: "Yes" })}
                  className="accent-[#700070]"
                />
                <span>Yes</span>
              </label>
              <label className="inline-flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="reviewer"
                  value="No"
                  checked={formData.availableAsReviewer === "No"}
                  onChange={() => setFormData({ ...formData, availableAsReviewer: "No" })}
                  className="accent-[#700070]"
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* 17. Attach Manuscript* */}
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="w-full sm:w-56 text-xs sm:text-sm text-[#222222] shrink-0 mb-1 sm:mb-0">
              Attach Manuscript*
            </label>
            <div className="flex items-center gap-2">
              <input
                ref={manuscriptInputRef}
                type="file"
                required
                accept=".doc,.docx,.pdf"
                onChange={(e) => {
                  if (e.target.files?.[0]) setManuscriptFile(e.target.files[0]);
                }}
                className="text-xs text-gray-700 file:mr-2 file:py-0.5 file:px-2.5 file:border file:border-gray-400 file:text-xs file:bg-gray-100 hover:file:bg-gray-200 cursor-pointer"
              />
              {manuscriptFile && (
                <button
                  type="button"
                  onClick={() => {
                    setManuscriptFile(null);
                    if (manuscriptInputRef.current) manuscriptInputRef.current.value = "";
                  }}
                  className="text-gray-500 hover:text-red-600 text-xs px-1"
                  title="Remove file"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* 18. Attach Undertaking */}
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="w-full sm:w-56 text-xs sm:text-sm text-[#222222] shrink-0 mb-1 sm:mb-0">
              Attach Undertaking
            </label>
            <div className="flex items-center gap-2">
              <input
                ref={undertakingInputRef}
                type="file"
                accept=".doc,.docx,.pdf,.jpg,.jpeg,.png"
                onChange={(e) => {
                  if (e.target.files?.[0]) setUndertakingFile(e.target.files[0]);
                }}
                className="text-xs text-gray-700 file:mr-2 file:py-0.5 file:px-2.5 file:border file:border-gray-400 file:text-xs file:bg-gray-100 hover:file:bg-gray-200 cursor-pointer"
              />
              {undertakingFile && (
                <button
                  type="button"
                  onClick={() => {
                    setUndertakingFile(null);
                    if (undertakingInputRef.current) undertakingInputRef.current.value = "";
                  }}
                  className="text-gray-500 hover:text-red-600 text-xs px-1"
                  title="Remove file"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* 19. Check All That Apply */}
          <div className="flex flex-col sm:flex-row sm:items-start pt-1">
            <label className="w-full sm:w-56 text-xs sm:text-sm text-[#222222] shrink-0 mb-1 sm:mb-0">
              Check All That Apply
            </label>
            <div className="w-full sm:max-w-md space-y-1.5 text-[11px] text-gray-700 leading-snug">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  className="mt-0.5"
                />
                <span>By clicking on Submit, I agree to the Privacy Policy and Terms of Use.</span>
              </label>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreeNewsletter}
                  onChange={(e) => setFormData({ ...formData, agreeNewsletter: e.target.checked })}
                  className="mt-0.5"
                />
                <span>
                  By providing us with your contact information, you&apos;re agreeing to receive newsletters and other insightful information from {journalTitle}. But if you ever change your mind, you can unsubscribe by following the instructions within the email that you receive.
                </span>
              </label>
            </div>
          </div>

          {/* 20. Please enter the security code */}
          <div className="flex flex-col sm:flex-row sm:items-center pt-1">
            <label className="w-full sm:w-56 text-xs sm:text-sm text-[#222222] shrink-0 mb-1 sm:mb-0">
              Please enter the security code
            </label>
            <div
              className="border border-gray-500 bg-white cursor-pointer select-none inline-block shadow-2xs"
              onClick={generateCaptcha}
              title="Click to generate new security code"
            >
              <canvas
                ref={canvasRef}
                width={170}
                height={44}
                className="block"
              />
            </div>
          </div>

          {/* 21. Security Code (lowercase letters) */}
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="w-full sm:w-56 text-xs sm:text-sm text-[#222222] shrink-0 mb-1 sm:mb-0">
              Security Code (lowercase letters)
            </label>
            <input
              type="text"
              required
              value={formData.captchaInput}
              onChange={(e) => setFormData({ ...formData, captchaInput: e.target.value })}
              className="w-full sm:w-72 border border-gray-400 px-2 py-1 text-xs sm:text-sm bg-white focus:outline-none rounded-none text-gray-900"
            />
          </div>

          {/* 22. Submit Button */}
          <div className="pt-2 sm:pt-3">
            <button
              type="submit"
              className="bg-[#c4c4c4] hover:bg-[#b5b5b5] active:bg-[#a6a6a6] text-black text-xs sm:text-sm font-medium px-7 py-1 border border-gray-400 rounded-none cursor-pointer transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
