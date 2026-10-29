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
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const STORAGE_KEY = "manthan_admin_user";
const REGISTERED_USERS_KEY = "manthan_registered_admins";

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalView, setAuthModalView] = useState<AuthModalView>("login");

  // Load session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
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

    // Default admin accounts
    const isDefaultAdmin =
      (trimmedId === "admin" ||
        trimmedId === "admin@manthanjournal.com" ||
        trimmedId === "admin@impulseresearchwork.com" ||
        trimmedId === "editor") &&
      (trimmedPass === "admin123" || trimmedPass === "admin" || trimmedPass === "password");

    if (isDefaultAdmin) {
      const user: AdminUser = {
        name: "Journal Administrator",
        username: "admin",
        email: "admin@manthanjournal.com",
        role: "Chief Managing Editor",
      };
      setAdminUser(user);
      setIsAuthenticated(true);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } catch {}
      return { success: true };
    }

    // Check custom registered users
    try {
      const registered = localStorage.getItem(REGISTERED_USERS_KEY);
      if (registered) {
        const users = JSON.parse(registered);
        const match = users.find(
          (u: any) =>
            (u.username.toLowerCase() === trimmedId || u.email.toLowerCase() === trimmedId) &&
            u.password === trimmedPass
        );
        if (match) {
          const user: AdminUser = {
            name: match.name,
            username: match.username,
            email: match.email,
            role: "Editorial Administrator",
          };
          setAdminUser(user);
          setIsAuthenticated(true);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
          return { success: true };
        }
      }
    } catch {}

    return {
      success: false,
      error: "Invalid username/email or password. (Hint: use admin / admin123)",
    };
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

    if (data.password.length < 5) {
      return { success: false, error: "Password must be at least 5 characters long." };
    }

    try {
      const existingStr = localStorage.getItem(REGISTERED_USERS_KEY);
      const existing = existingStr ? JSON.parse(existingStr) : [];

      if (
        existing.some(
          (u: any) =>
            u.username.toLowerCase() === data.username.toLowerCase() ||
            u.email.toLowerCase() === data.email.toLowerCase()
        )
      ) {
        return { success: false, error: "An administrator with this username or email already exists." };
      }

      const newUser = {
        name: data.name.trim(),
        username: data.username.trim(),
        email: data.email.trim(),
        password: data.password.trim(),
      };

      existing.push(newUser);
      localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(existing));

      // Auto sign in the new admin
      const loggedUser: AdminUser = {
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        role: "Editorial Administrator",
      };
      setAdminUser(loggedUser);
      setIsAuthenticated(true);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedUser));

      return { success: true };
    } catch {
      return { success: false, error: "Failed to save registration data." };
    }
  };

  const forgotPassword = async (email: string): Promise<{ success: boolean; message?: string; error?: string }> => {
    if (!email.trim()) {
      return { success: false, error: "Please enter your registered email address." };
    }

    return {
      success: true,
      message: `Password reset instructions and security token have been dispatched to ${email.trim()}. Please verify your inbox.`,
    };
  };

  const logout = () => {
    setAdminUser(null);
    setIsAuthenticated(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
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
