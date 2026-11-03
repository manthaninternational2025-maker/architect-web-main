"use client";

import React, { useState, useEffect, useRef } from "react";
import { useJournalData } from "@/context/JournalDataContext";
import { CheckCircle2 } from "lucide-react";

export function ManuscriptStatusForm() {
  const { addMessage } = useJournalData();

  const [whatsapp, setWhatsapp] = useState("");
  const [manuscriptNo, setManuscriptNo] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaCode, setCaptchaCode] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const generateCaptcha = () => {
    const chars = "abcdefhkmnprstuvwxyz23456789";
    let code = "";
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    drawCaptcha(code);
  };

  const drawCaptcha = (code: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

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

    if (!whatsapp.trim()) {
      setErrorMsg("WhatsApp Number is required.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("A valid Email address is required.");
      return;
    }
    if (captchaInput.trim().toLowerCase() !== captchaCode.toLowerCase()) {
      setErrorMsg("Incorrect security code! Please enter the lowercase letters shown in the box.");
      generateCaptcha();
      setCaptchaInput("");
      return;
    }

    addMessage({
      sender: title ? `${title} (Author)` : (email || whatsapp),
      email: email,
      subject: `Manuscript Status Check: ${manuscriptNo || title || whatsapp}`,
      content: `Manuscript Status Inquiry Details:
WhatsApp Number: ${whatsapp}
Manuscript Number: ${manuscriptNo || "Not Provided"}
Title: ${title || "Not Provided"}
Email: ${email}
Submission Date: ${new Date().toLocaleDateString("en-IN")}`,
    });

    setSubmitted(true);
  };

  return (
    <div className="border border-gray-400 bg-white p-5 sm:p-7 text-[#222222]">
      <h1 className="text-xl sm:text-2xl text-[#0000dd] font-normal mb-5 tracking-tight">
        manuscript status check
      </h1>

      <div className="mb-5">
        <h2 className="text-base font-bold text-[#111111] mb-1">
          Manuscript Status
        </h2>
        <p className="text-sm text-[#333333]">
          Please fill the details below:
        </p>
      </div>

      {submitted ? (
        <div className="border border-green-600 bg-green-50 p-5 space-y-3 mt-4">
          <div className="flex items-center gap-2 text-green-800 font-bold text-sm sm:text-base">
            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
            <span>Status Inquiry Received Successfully</span>
          </div>
          <div className="text-xs sm:text-sm text-gray-800 space-y-1 bg-white p-3 border border-green-200">
            <p><strong>Manuscript Number:</strong> {manuscriptNo || "N/A"}</p>
            <p><strong>Title:</strong> {title || "N/A"}</p>
            <p><strong>WhatsApp:</strong> {whatsapp}</p>
            <p><strong>Email:</strong> {email}</p>
            <p className="pt-1">
              <strong>Status:</strong>{" "}
              <span className="font-semibold text-[#700070]">
                Under Review (Initial Editorial Assessment &amp; Peer Review in Progress)
              </span>
            </p>
          </div>
          <p className="text-xs text-gray-600">
            Our editorial assistant has received your status inquiry. The latest tracking details and referee report will also be sent to your WhatsApp and Email shortly.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setManuscriptNo("");
                setTitle("");
                setCaptchaInput("");
                setTimeout(() => generateCaptcha(), 50);
              }}
              className="bg-[#c4c4c4] hover:bg-[#b0b0b0] text-black text-xs sm:text-sm font-medium px-5 py-1.5 border border-gray-400 cursor-pointer"
            >
              Check Another Manuscript
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5 max-w-xl">
          {errorMsg && (
            <div className="bg-red-50 border border-red-300 text-red-700 text-xs sm:text-sm px-3 py-2">
              {errorMsg}
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="w-full sm:w-56 text-sm text-[#222222] shrink-0 mb-1 sm:mb-0">
              Whats App Number*
            </label>
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full sm:w-72 border border-gray-400 px-2 py-1 text-sm bg-white focus:outline-none rounded-none text-gray-900"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="w-full sm:w-56 text-sm text-[#222222] shrink-0 mb-1 sm:mb-0">
              Manuscript Number
            </label>
            <input
              type="text"
              value={manuscriptNo}
              onChange={(e) => setManuscriptNo(e.target.value)}
              className="w-full sm:w-72 border border-gray-400 px-2 py-1 text-sm bg-white focus:outline-none rounded-none text-gray-900"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="w-full sm:w-56 text-sm text-[#222222] shrink-0 mb-1 sm:mb-0">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full sm:w-72 border border-gray-400 px-2 py-1 text-sm bg-white focus:outline-none rounded-none text-gray-900"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="w-full sm:w-56 text-sm text-[#222222] shrink-0 mb-1 sm:mb-0">
              Email*
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-72 border border-gray-400 px-2 py-1 text-sm bg-white focus:outline-none rounded-none text-gray-900"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="w-full sm:w-56 text-sm text-[#222222] shrink-0 mb-1 sm:mb-0">
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

          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="w-full sm:w-56 text-sm text-[#222222] shrink-0 mb-1 sm:mb-0">
              Security Code (lowercase letters)
            </label>
            <input
              type="text"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              className="w-full sm:w-72 border border-gray-400 px-2 py-1 text-sm bg-white focus:outline-none rounded-none text-gray-900"
              required
            />
          </div>

          <div className="pt-2 sm:pt-3">
            <button
              type="submit"
              className="bg-[#c4c4c4] hover:bg-[#b5b5b5] active:bg-[#a6a6a6] text-black text-sm px-7 py-1 border border-gray-400 rounded-none cursor-pointer transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

