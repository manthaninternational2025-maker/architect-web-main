"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/context/AdminAuthContext";
import {
  Lock,
  User,
  X,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";

export function AdminAuthModal() {
  const router = useRouter();
  const {
    isAuthModalOpen,
    closeAuthModal,
    login,
  } = useAdminAuth();

  // Login Form State
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Feedback State
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  if (!isAuthModalOpen) return null;

  const resetFeedback = () => {
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFeedback();
    setLoading(true);

    const res = await login(loginIdentifier, loginPassword);
    setLoading(false);

    if (res.success) {
      setSuccessMsg("Authentication successful! Redirecting to Admin Panel...");
      setTimeout(() => {
        closeAuthModal();
        router.push("/admin");
      }, 600);
    } else {
      setErrorMsg(res.error || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={closeAuthModal}
    >
      <div
        className="relative w-full max-w-md bg-white border-2 border-[#700070] shadow-2xl rounded-sm overflow-hidden max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header (Royal Purple Theme) */}
        <div className="bg-[#700070] text-white px-5 py-4 flex items-center justify-between border-b border-[#550055]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#550055] border border-[#FFD700]/40 flex items-center justify-center text-[#FFD700]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial not-italic font-bold text-lg text-white leading-tight">
                Editorial Admin Portal
              </h3>
              <p className="text-[11px] text-[#FFD700] tracking-wide font-sans">
                Manthan: IMJSI • Impulse Publication Works
              </p>
            </div>
          </div>
          <button
            onClick={closeAuthModal}
            className="text-gray-300 hover:text-white hover:bg-[#550055] p-1.5 rounded transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Only Admin Login */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* Feedback Alerts */}
          {errorMsg && (
            <div className="p-2.5 bg-red-50 border border-red-200 rounded flex items-start gap-2 text-red-700 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-2.5 bg-green-50 border border-green-200 rounded flex items-start gap-2 text-green-700 text-xs">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Admin ID / Email / Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder="Enter admin ID or email"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#700070] focus:ring-1 focus:ring-[#700070]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full pl-9 pr-9 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#700070] focus:ring-1 focus:ring-[#700070]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-0.5">
              <label className="flex items-center gap-1.5 text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded text-[#700070] focus:ring-[#700070]"
                />
                <span>Remember session</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#700070] hover:bg-[#550055] text-white text-xs font-bold rounded uppercase tracking-wider flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
            >
              {loading ? "Authenticating..." : "Sign In to Admin Panel"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-gray-50 border-t border-gray-200 text-center text-[11px] text-gray-500">
          Protected editorial area • Impulse Publication Works
        </div>
      </div>
    </div>
  );
}
