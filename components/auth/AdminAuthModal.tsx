"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/context/AdminAuthContext";
import {
  Lock,
  Mail,
  User,
  KeyRound,
  X,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";

export function AdminAuthModal() {
  const router = useRouter();
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalView,
    setAuthModalView,
    login,
    signup,
    forgotPassword,
  } = useAdminAuth();

  // Login Form State
  const [loginIdentifier, setLoginIdentifier] = useState("admin");
  const [loginPassword, setLoginPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);

  // Signup Form State
  const [signupName, setSignupName] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");

  // Forgot Password State
  const [forgotEmail, setForgotEmail] = useState("");

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
      }, 700);
    } else {
      setErrorMsg(res.error || "Login failed. Please check your credentials.");
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFeedback();

    if (signupPassword !== signupConfirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setLoading(true);
    const res = await signup({
      name: signupName,
      username: signupUsername,
      email: signupEmail,
      password: signupPassword,
    });
    setLoading(false);

    if (res.success) {
      setSuccessMsg("Admin account registered successfully! Entering dashboard...");
      setTimeout(() => {
        closeAuthModal();
        router.push("/admin");
      }, 800);
    } else {
      setErrorMsg(res.error || "Signup failed.");
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFeedback();
    setLoading(true);

    const res = await forgotPassword(forgotEmail);
    setLoading(false);

    if (res.success) {
      setSuccessMsg(res.message || "Reset link sent.");
    } else {
      setErrorMsg(res.error || "Failed to process request.");
    }
  };

  const handleQuickDemo = async () => {
    setLoginIdentifier("admin");
    setLoginPassword("admin123");
    resetFeedback();
    setLoading(true);
    const res = await login("admin", "admin123");
    setLoading(false);
    if (res.success) {
      setSuccessMsg("Demo credentials accepted! Entering Admin Panel...");
      setTimeout(() => {
        closeAuthModal();
        router.push("/admin");
      }, 600);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={closeAuthModal}
    >
      <div
        className="relative w-full max-w-md bg-white border-2 border-[#700070] shadow-2xl rounded-sm overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header (Royal Purple Theme) */}
        <div className="bg-[#700070] text-white px-5 py-4 flex items-center justify-between border-b border-[#550055]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#550055] border border-[#FFD700]/40 flex items-center justify-center text-[#FFD700]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial italic font-bold text-lg text-white leading-tight">
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

        {/* Navigation Tabs (Login / Sign Up / Forgot) */}
        <div className="flex border-b border-gray-200 bg-gray-50 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setAuthModalView("login");
              resetFeedback();
            }}
            className={`flex-1 py-2.5 text-center transition-colors border-b-2 ${
              authModalView === "login"
                ? "border-[#700070] text-[#700070] bg-white font-bold"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Admin Login
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthModalView("signup");
              resetFeedback();
            }}
            className={`flex-1 py-2.5 text-center transition-colors border-b-2 ${
              authModalView === "signup"
                ? "border-[#700070] text-[#700070] bg-white font-bold"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Admin Sign Up
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthModalView("forgot");
              resetFeedback();
            }}
            className={`flex-1 py-2.5 text-center transition-colors border-b-2 ${
              authModalView === "forgot"
                ? "border-[#700070] text-[#700070] bg-white font-bold"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Forgot Password
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* Quick Demo Helper Banner */}
          {authModalView === "login" && (
            <div className="bg-purple-50 border border-purple-200 rounded p-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-purple-900">
                <Sparkles className="w-4 h-4 text-[#700070] shrink-0" />
                <span>
                  Demo Credentials: <strong className="font-mono text-[#700070]">admin</strong> / <strong className="font-mono text-[#700070]">admin123</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={handleQuickDemo}
                className="bg-[#700070] hover:bg-[#550055] text-white text-[11px] font-bold px-2 py-1 rounded transition-colors shrink-0"
              >
                1-Click Login
              </button>
            </div>
          )}

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

          {/* ----------------- TAB 1: LOGIN ----------------- */}
          {authModalView === "login" && (
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
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
                    placeholder="e.g. admin or editor@manthanjournal.com"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#700070] focus:ring-1 focus:ring-[#700070]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-gray-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthModalView("forgot");
                      resetFeedback();
                    }}
                    className="text-[11px] text-[#700070] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
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

              <div className="flex items-center justify-between text-xs pt-1">
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
                className="w-full py-2.5 bg-[#700070] hover:bg-[#550055] text-white text-xs font-bold rounded uppercase tracking-wider flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Authenticating..." : "Sign In to Admin Panel"}
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2 text-[11px] text-gray-500">
                Need an administrator profile?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setAuthModalView("signup");
                    resetFeedback();
                  }}
                  className="text-[#700070] font-bold hover:underline"
                >
                  Create Admin Account
                </button>
              </div>
            </form>
          )}

          {/* ----------------- TAB 2: SIGN UP ----------------- */}
          {authModalView === "signup" && (
            <form onSubmit={handleSignupSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="Dr. Deepak Setia / Editorial Manager"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#700070] focus:ring-1 focus:ring-[#700070]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    value={signupUsername}
                    onChange={(e) => setSignupUsername(e.target.value)}
                    placeholder="editor_admin"
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#700070] focus:ring-1 focus:ring-[#700070]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Official Email
                  </label>
                  <input
                    type="email"
                    required
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="admin@manthanjournal.com"
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#700070] focus:ring-1 focus:ring-[#700070]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="Min 5 chars"
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#700070] focus:ring-1 focus:ring-[#700070]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    required
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                    placeholder="Re-enter"
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#700070] focus:ring-1 focus:ring-[#700070]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-[#700070] hover:bg-[#550055] text-white text-xs font-bold rounded uppercase tracking-wider flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer mt-2"
              >
                {loading ? "Registering..." : "Create Admin Account"}
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2 text-[11px] text-gray-500">
                Already registered?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setAuthModalView("login");
                    resetFeedback();
                  }}
                  className="text-[#700070] font-bold hover:underline"
                >
                  Sign In instead
                </button>
              </div>
            </form>
          )}

          {/* ----------------- TAB 3: FORGOT PASSWORD ----------------- */}
          {authModalView === "forgot" && (
            <form onSubmit={handleForgotSubmit} className="space-y-3.5">
              <p className="text-xs text-gray-600 leading-relaxed">
                Enter your registered journal administrator email address. We will transmit an encrypted recovery token and instructions to reset your password.
              </p>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="admin@manthanjournal.com"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#700070] focus:ring-1 focus:ring-[#700070]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-[#700070] hover:bg-[#550055] text-white text-xs font-bold rounded uppercase tracking-wider flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Transmitting..." : "Send Reset Instructions"}
                <KeyRound className="w-4 h-4" />
              </button>

              <div className="text-center pt-2 text-[11px] text-gray-500">
                Remember your password?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setAuthModalView("login");
                    resetFeedback();
                  }}
                  className="text-[#700070] font-bold hover:underline"
                >
                  Back to Sign In
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-gray-50 border-t border-gray-200 text-center text-[11px] text-gray-500">
          Protected editorial area • Impulse Publication Works
        </div>
      </div>
    </div>
  );
}
