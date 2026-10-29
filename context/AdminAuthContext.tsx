"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface AdminUser {
  name: string;
  username: string;
  email: string;
  role: string;
}

export type AuthModalView = "login" | "signup" | "forgot";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  adminUser: AdminUser | null;
  isAuthModalOpen: boolean;
  authModalView: AuthModalView;
  openAuthModal: (view?: AuthModalView) => void;
  closeAuthModal: () => void;
  setAuthModalView: (view: AuthModalView) => void;
  login: (identifier: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (data: { name: string; username: string; email: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  forgotPassword: (email: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  updateAdminProfile: (data: Partial<AdminUser>) => boolean;
  updateAdminPassword: (newPassword: string) => boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const SESSION_KEY = "manthan_admin_session";
const CREDENTIALS_KEY = "manthan_admin_credentials_store";

// Default credentials
const DEFAULT_ADMIN = {
  name: "Impulse Editorial Board",
  username: "impulse_admin",
  email: "editor@impulseresearchwork.com",
  password: "Impulse@2026#Admin",
  role: "Chief Managing Editor & Publisher",
};

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalView, setAuthModalView] = useState<AuthModalView>("login");

  // Load session from localStorage on mount
  useEffect(() => {
    try {
      // Ensure default credentials exist in storage
      if (!localStorage.getItem(CREDENTIALS_KEY)) {
        localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(DEFAULT_ADMIN));
      }

      const storedSession = localStorage.getItem(SESSION_KEY);
      if (storedSession) {
        const parsed = JSON.parse(storedSession);
        if (parsed && parsed.username) {
          setAdminUser(parsed);
          setIsAuthenticated(true);
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const openAuthModal = (view: AuthModalView = "login") => {
    setAuthModalView(view);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async (identifier: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const trimmedId = identifier.trim().toLowerCase();
    const trimmedPass = password.trim();

    if (!trimmedId || !trimmedPass) {
      return { success: false, error: "Please enter your username/email and password." };
    }

    // 1. Check current configured credentials in localStorage
    let storedAdmin = DEFAULT_ADMIN;
    try {
      const raw = localStorage.getItem(CREDENTIALS_KEY);
      if (raw) {
        storedAdmin = JSON.parse(raw);
      }
    } catch {}

    const isCustomized =
      storedAdmin.password !== DEFAULT_ADMIN.password ||
      storedAdmin.username !== DEFAULT_ADMIN.username;

    // Check against active stored credentials
    const matchesStored =
      (storedAdmin.username.toLowerCase() === trimmedId ||
        storedAdmin.email.toLowerCase() === trimmedId) &&
      storedAdmin.password === trimmedPass;

    // Also allow impulse aliases if password matches the current stored password
    const matchesCurrentPasswordWithAlias =
      (trimmedId === "impulse" ||
        trimmedId === "impulse_admin" ||
        trimmedId === "editor@impulseresearchwork.com" ||
        trimmedId === "manthaninternational2025@gmail.com" ||
        trimmedId === "admin" ||
        trimmedId === "admin@manthanjournal.com") &&
      trimmedPass === storedAdmin.password;

    // Fallback default support (only if credentials haven't been customized)
    const matchesInitialDefaults =
      !isCustomized &&
      (((trimmedId === "impulse" ||
        trimmedId === "impulse_admin" ||
        trimmedId === "editor@impulseresearchwork.com" ||
        trimmedId === "manthaninternational2025@gmail.com") &&
        (trimmedPass === "Impulse@2026#Admin" || trimmedPass === "impulse2026")) ||
        ((trimmedId === "admin" || trimmedId === "admin@manthanjournal.com") &&
          (trimmedPass === "admin123" || trimmedPass === "admin")));

    if (matchesStored || matchesCurrentPasswordWithAlias || matchesInitialDefaults) {
      const user: AdminUser = {
        name: storedAdmin.name || "Impulse Editorial Board",
        username: storedAdmin.username || "impulse_admin",
        email: storedAdmin.email || "editor@impulseresearchwork.com",
        role: storedAdmin.role || "Chief Managing Editor & Publisher",
      };
      setAdminUser(user);
      setIsAuthenticated(true);
      try {
        localStorage.setItem(SESSION_KEY, JSON.stringify(user));
      } catch {}
      return { success: true };
    }

    return {
      success: false,
      error: "Invalid Admin ID or Password. Please check your credentials.",
    };
  };

  const updateAdminProfile = (data: Partial<AdminUser>): boolean => {
    try {
      let storedAdmin = DEFAULT_ADMIN;
      const raw = localStorage.getItem(CREDENTIALS_KEY);
      if (raw) storedAdmin = JSON.parse(raw);

      const updatedCreds = { ...storedAdmin, ...data };
      localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(updatedCreds));

      const updatedUser: AdminUser = {
        name: updatedCreds.name,
        username: updatedCreds.username,
        email: updatedCreds.email,
        role: updatedCreds.role,
      };
      setAdminUser(updatedUser);
      localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));
      return true;
    } catch {
      return false;
    }
  };

  const updateAdminPassword = (newPassword: string): boolean => {
    if (!newPassword || newPassword.length < 5) return false;
    try {
      let storedAdmin = DEFAULT_ADMIN;
      const raw = localStorage.getItem(CREDENTIALS_KEY);
      if (raw) storedAdmin = JSON.parse(raw);

      storedAdmin.password = newPassword.trim();
      localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(storedAdmin));
      return true;
    } catch {
      return false;
    }
  };

  const signup = async (data: {
    name: string;
    username: string;
    email: string;
    password: string;
  }): Promise<{ success: boolean; error?: string }> => {
    if (!data.name.trim() || !data.username.trim() || !data.email.trim() || !data.password.trim()) {
      return { success: false, error: "All fields are required." };
    }
    const newUser = {
      name: data.name.trim(),
      username: data.username.trim(),
      email: data.email.trim(),
      password: data.password.trim(),
      role: "Editorial Administrator",
    };
    try {
      localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(newUser));
      const loggedUser: AdminUser = {
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      };
      setAdminUser(loggedUser);
      setIsAuthenticated(true);
      localStorage.setItem(SESSION_KEY, JSON.stringify(loggedUser));
      return { success: true };
    } catch {
      return { success: false, error: "Failed to save registration data." };
    }
  };

  const forgotPassword = async (email: string): Promise<{ success: boolean; message?: string; error?: string }> => {
    return {
      success: true,
      message: `Password reset instructions have been dispatched to ${email.trim()}.`,
    };
  };

  const logout = () => {
    setAdminUser(null);
    setIsAuthenticated(false);
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {}
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        adminUser,
        isAuthModalOpen,
        authModalView,
        openAuthModal,
        closeAuthModal,
        setAuthModalView,
        login,
        signup,
        forgotPassword,
        updateAdminProfile,
        updateAdminPassword,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
