"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { useJournalData } from "@/context/JournalDataContext";
import { openArticlePdf } from "@/utils/pdfHelper";
import { companyInfo } from "@/data/companyInfo";
import { resources } from "@/data/resources";
import {
  LayoutDashboard,
  Settings,
  Home,
  FileText,
  Layers,
  Users,
  BookOpen,
  Shield,
  Phone,
  Mail,
  Menu,
  Megaphone,
  User,
  LogOut,
  Eye,
  Download,
  Plus,
  Search,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  GripVertical,
  Move,
  Edit3,
  Trash2,
  Save,
  Lock,
  KeyRound,
  FileCheck,
  CheckSquare,
  Globe,
  MapPin,
  Clock,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Send,
  ExternalLink,
  UploadCloud,
  Paperclip,
  X,
  FileUp,
  Camera,
  Image as ImageIcon,
} from "lucide-react";

type NavTab =
  | "dashboard"
  | "settings"
  | "homepage"
  | "articles"
  | "archives"
  | "editorial"
  | "instructions"
  | "ethics"
  | "contact"
  | "messages"
  | "sidebar-menu"
  | "announcement"
  | "profile";

export default function AdminPage() {
  const router = useRouter();
  const {
    isAuthenticated,
    adminUser,
    openAuthModal,
    logout,
    updateAdminProfile,
    updateAdminPassword,
  } = useAdminAuth();

  const [activeTab, setActiveTab] = useState<NavTab>("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // -------------------------------------------------------------
  // PERSISTENT LIVE JOURNAL DATA CONTEXT
  // -------------------------------------------------------------
  const {
    settings,
    updateSettings,
    announcement,
    updateAnnouncement,
    homepage,
    updateHomepage,
    articles: articlesList,
    addArticle,
    updateArticle,
    deleteArticle,
    issues: issuesList,
    addIssue,
    updateIssue,
    deleteIssue,
    members: editorialMembers,
    addMember,
    updateMember,
    deleteMember,
    reorderMembers,
    instructions,
    updateInstructions,
    ethics,
    updateEthics,
    contact,
    updateContact,
    sidebarConfig,
    updateSidebarConfig,
    messages: messagesList,
    addMessage,
    toggleMessageRead,
    deleteMessage,
    resetToDefaults,
  } = useJournalData();

  // Local form states synced with persistent JournalDataContext
  const [settingsForm, setSettingsForm] = useState(settings);
  const [homepageState, setHomepageState] = useState(homepage);
  const [announcementState, setAnnouncementState] = useState(announcement);
  const [instructionsState, setInstructionsState] = useState(instructions);
  const [ethicsState, setEthicsState] = useState(ethics);
  const [contactState, setContactState] = useState(contact);
  const [sidebarMenuState, setSidebarMenuState] = useState(sidebarConfig);

  useEffect(() => { setSettingsForm(settings); }, [settings]);
  useEffect(() => { setHomepageState(homepage); }, [homepage]);
  useEffect(() => { setAnnouncementState(announcement); }, [announcement]);
  useEffect(() => { setInstructionsState(instructions); }, [instructions]);
  useEffect(() => { setEthicsState(ethics); }, [ethics]);
  useEffect(() => { setContactState(contact); }, [contact]);
  useEffect(() => { setSidebarMenuState(sidebarConfig); }, [sidebarConfig]);

  const [newArticleModal, setNewArticleModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState<any | null>(null);
  const [newArticleForm, setNewArticleForm] = useState({
    title: "",
    authors: "",
    volume: "Volume 1",
    issue: "Issue 1",
    doi: `10.5281/imjsi.2026.01.${articlesList.length + 1}`,
    abstract: "",
    status: "Published",
    pages: "pp. 1-12",
    keywords: "",
    category: "Social Sciences",
    date: "August 2026",
    fileName: "",
    fileSize: "",
    fileData: "",
    pdfUrl: "",
  });

  const [newIssueModal, setNewIssueModal] = useState(false);
  const [editingIssue, setEditingIssue] = useState<any | null>(null);
  const [newIssueForm, setNewIssueForm] = useState({
    volume: "Volume 1",
    issue: "Issue 2",
    period: "September 2026",
    publicationDate: "2026-09-15",
    theme: "General Research Papers",
    status: "Open for Submissions",
  });

  const [editingMember, setEditingMember] = useState<any | null>(null);
  const [newMemberModal, setNewMemberModal] = useState(false);
  const [newMemberForm, setNewMemberForm] = useState({
    name: "",
    role: "Editorial Board Member",
    designation: "Assistant Professor",
    affiliation: "",
    email: "",
    specialization: "",
    photoUrl: "",
    photoData: "",
    bio: "",
    orcid: "",
    phone: "",
    websiteUrl: "",
  });

  // -------------------------------------------------------------
  // 12. PROFILE & PASSWORD FORM STATE
  // -------------------------------------------------------------
  const [profileForm, setProfileForm] = useState({
    name: adminUser?.name || "Impulse Editorial Board",
    username: adminUser?.username || "impulse_admin",
    email: adminUser?.email || "editor@impulseresearchwork.com",
    role: adminUser?.role || "Chief Managing Editor & Publisher",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Keep profile form in sync when auth loads
  useEffect(() => {
    if (adminUser) {
      setProfileForm({
        name: adminUser.name || "Impulse Editorial Board",
        username: adminUser.username || "impulse_admin",
        email: adminUser.email || "editor@impulseresearchwork.com",
        role: adminUser.role || "Chief Managing Editor & Publisher",
      });
    }
  }, [adminUser]);

  // Auth gate
  useEffect(() => {
    if (!isAuthenticated) {
      openAuthModal("login");
    }
  }, [isAuthenticated, openAuthModal]);

  // Handlers
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = updateAdminProfile(profileForm);
    if (ok) {
      showToast("Administrator profile updated successfully!");
    } else {
      showToast("Profile update saved.");
    }
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast("Error: New passwords do not match!");
      return;
    }
    if (passwordForm.newPassword.length < 5) {
      showToast("Error: Password must be at least 5 characters.");
      return;
    }
    const ok = updateAdminPassword(passwordForm.newPassword);
    if (ok) {
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      showToast("Admin password updated successfully!");
    } else {
      showToast("Failed to update password.");
    }
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    isEdit: boolean = false
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: 15MB
    if (file.size > 15 * 1024 * 1024) {
      showToast("File is too large! Maximum allowed size is 15MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result as string;
      const formattedSize =
        file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
          : `${Math.round(file.size / 1024)} KB`;

      if (isEdit) {
        setEditingArticle((prev: any) =>
          prev
            ? {
                ...prev,
                fileName: file.name,
                fileSize: formattedSize,
                fileData: base64Data,
              }
            : prev
        );
      } else {
        setNewArticleForm((prev) => ({
          ...prev,
          fileName: file.name,
          fileSize: formattedSize,
          fileData: base64Data,
        }));
      }
      showToast(`Document "${file.name}" attached successfully!`);
    };
    reader.onerror = () => {
      showToast("Failed to read document file.");
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = (isEdit: boolean = false) => {
    if (isEdit) {
      setEditingArticle((prev: any) =>
        prev
          ? {
              ...prev,
              fileName: "",
              fileSize: "",
              fileData: "",
              pdfUrl: "",
            }
          : prev
      );
    } else {
      setNewArticleForm((prev) => ({
        ...prev,
        fileName: "",
        fileSize: "",
        fileData: "",
        pdfUrl: "",
      }));
    }
    showToast("Attached document removed.");
  };

  const handleAddArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArticleForm.title || !newArticleForm.authors) return;
    const newArt = {
      title: newArticleForm.title,
      authors: newArticleForm.authors,
      volume: newArticleForm.volume || "Volume 1",
      issue: newArticleForm.issue || "Issue 1",
      date: newArticleForm.date || "August 2026",
      status: newArticleForm.status || "Published",
      doi: newArticleForm.doi,
      abstract: newArticleForm.abstract || "Abstract submitted.",
      pages: newArticleForm.pages,
      keywords: newArticleForm.keywords,
      category: newArticleForm.category,
      fileName: newArticleForm.fileName,
      fileSize: newArticleForm.fileSize,
      fileData: newArticleForm.fileData,
      pdfUrl: newArticleForm.pdfUrl,
    };
    addArticle(newArt);
    setNewArticleModal(false);
    setNewArticleForm({
      title: "",
      authors: "",
      volume: "Volume 1",
      issue: "Issue 1",
      doi: `10.5281/imjsi.2026.01.${articlesList.length + 2}`,
      abstract: "",
      status: "Published",
      pages: "pp. 1-12",
      keywords: "",
      category: "Social Sciences",
      date: "August 2026",
      fileName: "",
      fileSize: "",
      fileData: "",
      pdfUrl: "",
    });
    showToast("Article published with attached document and live on website!");
  };

  const handleSaveEditedArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;
    updateArticle(editingArticle);
    setEditingArticle(null);
    showToast(`Article #${editingArticle.id} updated and saved live!`);
  };

  const handleAddIssue = (e: React.FormEvent) => {
    e.preventDefault();
    const newIss = {
      volume: newIssueForm.volume,
      issue: newIssueForm.issue,
      period: newIssueForm.period,
      publicationDate: newIssueForm.publicationDate,
      status: newIssueForm.status,
      theme: newIssueForm.theme,
      pdfUrl: "",
    };
    addIssue(newIss);
    setNewIssueModal(false);
    showToast("New issue created in archive index and live on website!");
  };

  const handleSaveEditedIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingIssue) return;
    updateIssue(editingIssue);
    setEditingIssue(null);
    showToast(`Issue "${editingIssue.volume}, ${editingIssue.issue}" updated live!`);
  };

  const handleMemberPhotoUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    isEdit: boolean = false
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast("Photo is too large! Maximum allowed size is 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result as string;
      if (isEdit) {
        setEditingMember((prev: any) =>
          prev ? { ...prev, photoData: base64Data } : prev
        );
      } else {
        setNewMemberForm((prev) => ({
          ...prev,
          photoData: base64Data,
        }));
      }
      showToast("Member profile photo attached successfully!");
    };
    reader.onerror = () => {
      showToast("Failed to read image file.");
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveMemberPhoto = (isEdit: boolean = false) => {
    if (isEdit) {
      setEditingMember((prev: any) =>
        prev ? { ...prev, photoData: "", photoUrl: "" } : prev
      );
    } else {
      setNewMemberForm((prev) => ({
        ...prev,
        photoData: "",
        photoUrl: "",
      }));
    }
    showToast("Profile photo removed.");
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberForm.name) return;
    const newM = {
      name: newMemberForm.name,
      role: newMemberForm.role,
      designation: newMemberForm.designation,
      affiliation: newMemberForm.affiliation,
      email: newMemberForm.email,
      specialization: newMemberForm.specialization,
      photoUrl: newMemberForm.photoUrl,
      photoData: newMemberForm.photoData,
      bio: newMemberForm.bio,
      orcid: newMemberForm.orcid,
      phone: newMemberForm.phone,
      websiteUrl: newMemberForm.websiteUrl,
    };
    addMember(newM);
    setNewMemberModal(false);
    setNewMemberForm({
      name: "",
      role: "Editorial Board Member",
      designation: "Assistant Professor",
      affiliation: "",
      email: "",
      specialization: "",
      photoUrl: "",
      photoData: "",
      bio: "",
      orcid: "",
      phone: "",
      websiteUrl: "",
    });
    showToast("New editorial member added and live on board!");
  };

  const handleSaveEditedMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;
    updateMember(editingMember);
    setEditingMember(null);
    showToast("Editorial member updated and saved live!");
  };

  // -------------------------------------------------------------
  // EDITORIAL BOARD DRAG & DROP & DIRECTIONAL ARRANGE HELPERS
  // -------------------------------------------------------------
  const [draggedMemberIndex, setDraggedMemberIndex] = useState<number | null>(null);
  const [dragOverMemberIndex, setDragOverMemberIndex] = useState<number | null>(null);

  const moveMember = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex || toIndex < 0 || toIndex >= editorialMembers.length) return;
    const updated = [...editorialMembers];
    const [movedItem] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, movedItem);
    reorderMembers(updated);
    showToast(`"${movedItem.name}" position updated (#${toIndex + 1}) live on website!`);
  };

  const moveMemberLeft = (index: number) => {
    if (index > 0) moveMember(index, index - 1);
  };

  const moveMemberRight = (index: number) => {
    if (index < editorialMembers.length - 1) moveMember(index, index + 1);
  };

  const moveMemberUp = (index: number) => {
    const target = index >= 2 ? index - 2 : Math.max(0, index - 1);
    moveMember(index, target);
  };

  const moveMemberDown = (index: number) => {
    const target = index + 2 < editorialMembers.length ? index + 2 : Math.min(editorialMembers.length - 1, index + 1);
    moveMember(index, target);
  };

  const handleMemberDragStart = (e: React.DragEvent, index: number) => {
    setDraggedMemberIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleMemberDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverMemberIndex !== index) {
      setDragOverMemberIndex(index);
    }
  };

  const handleMemberDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedMemberIndex !== null && draggedMemberIndex !== targetIndex) {
      moveMember(draggedMemberIndex, targetIndex);
    }
    setDraggedMemberIndex(null);
    setDragOverMemberIndex(null);
  };

  const handleMemberDragEnd = () => {
    setDraggedMemberIndex(null);
    setDragOverMemberIndex(null);
  };

  // Sidebar navigation configuration
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "settings", label: "Journal Settings", icon: Settings },
    { id: "homepage", label: "Homepage", icon: Home },
    { id: "articles", label: "Articles", icon: FileText, badge: articlesList.length },
    { id: "archives", label: "Archives", icon: Layers, badge: `${issuesList.length} Issues` },
    { id: "editorial", label: "Editorial Board", icon: Users, badge: editorialMembers.length },
    { id: "instructions", label: "Author Instructions", icon: BookOpen },
    { id: "ethics", label: "Publication Ethics", icon: Shield },
    { id: "contact", label: "Contact", icon: Phone },
    { id: "messages", label: "Messages", icon: Mail, badge: messagesList.filter((m) => !m.isRead).length },
    { id: "sidebar-menu", label: "Sidebar Menu", icon: Menu },
    { id: "announcement", label: "Announcement Bar", icon: Megaphone },
  ];

  return (
    <div className="flex h-screen bg-[#f8fafc] text-slate-800 overflow-hidden font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#700070] text-white px-4 py-3 rounded shadow-2xl flex items-center gap-2 text-xs font-semibold border border-[#FFD700]/40 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-[#FFD700]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden animate-in fade-in duration-200"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* -------------------------------------------------------------------
          LEFT SIDEBAR: Exact layout from screenshot with Royal Navy/Purple theme
         ------------------------------------------------------------------- */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-[#1e3a5f] bg-gradient-to-b from-[#1b2a47] to-[#152238] text-white flex flex-col shrink-0 border-r border-[#152238] shadow-2xl md:shadow-lg select-none transform transition-transform duration-200 ease-in-out ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand / Heading */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
          <h1 className="font-editorial italic font-bold text-2xl tracking-wide text-white">
            Admin Panel
          </h1>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono uppercase bg-white/15 px-2 py-0.5 rounded text-[#FFD700] tracking-wider">
              v1.0
            </span>
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden p-1 text-slate-300 hover:text-white"
              aria-label="Close sidebar"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Items (All 12 items) */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5 text-sm custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveTab(item.id as NavTab);
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#2563eb] text-white shadow-xs font-semibold"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? "bg-white/20 text-white" : "bg-white/10 text-slate-300"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer: Signed in info, Profile, Logout */}
        <div className="p-4 border-t border-white/10 bg-black/20 text-xs">
          <div className="text-[11px] text-slate-400 mb-2">
            Signed in as
            <div className="font-bold text-white text-xs tracking-wide truncate">
              {adminUser?.username || "impulse_admin"}
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 text-slate-300">
            <button
              type="button"
              onClick={() => {
                setActiveTab("profile");
                setMobileSidebarOpen(false);
              }}
              className={`flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer ${
                activeTab === "profile" ? "text-[#FFD700] font-bold" : ""
              }`}
            >
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>Profile</span>
            </button>
            <span className="text-white/20">|</span>
            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-1.5 text-rose-300 hover:text-rose-200 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* -------------------------------------------------------------------
          MAIN CONTENT AREA
         ------------------------------------------------------------------- */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-[#f8fafc]">
        {/* Top Operational Header */}
        <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shadow-xs gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-1.5 rounded text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
              aria-label="Open navigation sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-[11px] sm:text-xs font-semibold text-[#700070] bg-purple-50 border border-purple-200 px-2 sm:px-2.5 py-1 rounded truncate">
              {companyInfo.journalTitle} (ISSN: {companyInfo.issn})
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-[#700070] hover:text-white px-2.5 sm:px-3 py-1.5 rounded transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#700070] group-hover:text-white" />
              <span className="hidden sm:inline">Back to</span> HOME
            </Link>
          </div>
        </header>

        {/* Content Container */}
        <div className="p-4 sm:p-6 md:p-8 max-w-6xl w-full">
          {/* =============================================================
              VIEW 1: DASHBOARD (EXACT SCREENSHOT LAYOUT & VALUES)
             ============================================================= */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div>
                <h2 className="font-editorial italic font-bold text-3xl text-slate-900 tracking-tight">
                  Dashboard
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Overview of your journal&apos;s statistics
                </p>
              </div>

              {/* 7 Stat Cards from Screenshot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600 mb-3">
                    <FileText className="w-4 h-4 text-blue-500" />
                    <span>Total Articles</span>
                  </div>
                  <div className="text-3xl font-bold text-slate-900">{articlesList.length}</div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600 mb-3">
                    <Eye className="w-4 h-4 text-emerald-500" />
                    <span>Published Articles</span>
                  </div>
                  <div className="text-3xl font-bold text-slate-900">
                    {articlesList.filter((a) => a.status === "Published").length}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600 mb-3">
                    <BookOpen className="w-4 h-4 text-purple-600" />
                    <span>Total Issues</span>
                  </div>
                  <div className="text-3xl font-bold text-slate-900">{issuesList.length}</div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600 mb-3">
                    <Layers className="w-4 h-4 text-amber-500" />
                    <span>Total Volumes</span>
                  </div>
                  <div className="text-3xl font-bold text-slate-900">1</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600 mb-3">
                    <Users className="w-4 h-4 text-pink-500" />
                    <span>Editorial Members</span>
                  </div>
                  <div className="text-3xl font-bold text-slate-900">{editorialMembers.length}</div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600 mb-3">
                    <Download className="w-4 h-4 text-teal-600" />
                    <span>Downloads</span>
                  </div>
                  <div className="text-3xl font-bold text-slate-900">5</div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600 mb-3">
                    <Mail className="w-4 h-4 text-rose-500" />
                    <span>Unread Messages</span>
                  </div>
                  <div className="text-3xl font-bold text-slate-900">
                    {messagesList.filter((m) => !m.isRead).length}
                  </div>
                </div>
              </div>

              {/* Recent Activity Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs mt-6">
                <h3 className="font-editorial italic font-bold text-xl text-slate-900 mb-2">
                  Recent Activity
                </h3>
                <p className="text-xs text-slate-500">
                  Activity feed coming soon. Use the sidebar to manage articles, issues, and other content.
                </p>

                <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab("articles")}
                    className="p-3 bg-slate-50 hover:bg-purple-50 hover:border-purple-200 border border-slate-200 rounded text-left transition-colors cursor-pointer"
                  >
                    <div className="font-semibold text-xs text-slate-800">
                      Manage Articles ({articlesList.length})
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Edit metadata, DOIs &amp; abstracts
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("settings")}
                    className="p-3 bg-slate-50 hover:bg-purple-50 hover:border-purple-200 border border-slate-200 rounded text-left transition-colors cursor-pointer"
                  >
                    <div className="font-semibold text-xs text-slate-800">
                      Journal Settings
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Update ISSN, publisher &amp; editor
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("profile")}
                    className="p-3 bg-slate-50 hover:bg-purple-50 hover:border-purple-200 border border-slate-200 rounded text-left transition-colors cursor-pointer"
                  >
                    <div className="font-semibold text-xs text-slate-800">
                      Admin Security &amp; Profile
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Change password &amp; admin ID
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =============================================================
              VIEW 2: JOURNAL SETTINGS (FULLY EDITABLE)
             ============================================================= */}
          {activeTab === "settings" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div>
                <h2 className="font-editorial italic font-bold text-2xl text-slate-900">
                  Journal Settings
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Configure journal title, ISSN status, publisher credentials, and academic particulars.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateSettings(settingsForm);
                  showToast("Journal settings updated and saved live!");
                }}
                className="space-y-4 text-xs"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Journal Full Title
                    </label>
                    <input
                      type="text"
                      value={settingsForm.journalTitle}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, journalTitle: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Journal Acronym / Short Title
                    </label>
                    <input
                      type="text"
                      value={settingsForm.shortTitle}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, shortTitle: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      ISSN Status
                    </label>
                    <input
                      type="text"
                      value={settingsForm.issn}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, issn: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Publisher
                    </label>
                    <input
                      type="text"
                      value={settingsForm.publisher}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, publisher: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Chief Editor
                    </label>
                    <input
                      type="text"
                      value={settingsForm.editorInChief}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, editorInChief: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Publication Frequency
                    </label>
                    <input
                      type="text"
                      value={settingsForm.frequency}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, frequency: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Editorial Contact Email
                    </label>
                    <input
                      type="email"
                      value={settingsForm.email}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, email: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Impact Factor (Widget Value)
                    </label>
                    <input
                      type="text"
                      value={settingsForm.impactFactor}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, impactFactor: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Official Website URL
                    </label>
                    <input
                      type="text"
                      value={settingsForm.website}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, website: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Plagiarism Tool
                    </label>
                    <input
                      type="text"
                      value={settingsForm.plagiarismTool}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, plagiarismTool: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Subject / Research Disciplines
                  </label>
                  <input
                    type="text"
                    value={settingsForm.subject}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, subject: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Registered Editorial Address
                  </label>
                  <textarea
                    rows={2}
                    value={settingsForm.address}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, address: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070]"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#700070] hover:bg-[#550055] text-white font-bold rounded flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Journal Settings</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (confirm("Reset all journal data, articles, and settings to original defaults?")) {
                        resetToDefaults();
                        showToast("Journal data restored to default system state.");
                      }
                    }}
                    className="px-4 py-2.5 border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold rounded text-xs transition-colors cursor-pointer"
                  >
                    Reset All to System Defaults
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* =============================================================
              VIEW 3: HOMEPAGE (FULLY DETAILED & EDITABLE)
             ============================================================= */}
          {activeTab === "homepage" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div>
                <h2 className="font-editorial italic font-bold text-2xl text-slate-900">
                  Homepage Content Manager
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Edit the public homepage Call for Papers banner, introduction paragraphs, and About sections.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateHomepage(homepageState);
                  showToast("Homepage content saved and live on website!");
                }}
                className="space-y-4 text-xs"
              >
                {/* Call for papers box */}
                <div className="border border-purple-200 bg-purple-50/50 p-4 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-900 text-sm">
                      Call for Papers Alert Box
                    </span>
                    <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                      <input
                        type="checkbox"
                        checked={homepageState.callForPapersActive}
                        onChange={(e) =>
                          setHomepageState({
                            ...homepageState,
                            callForPapersActive: e.target.checked,
                          })
                        }
                        className="rounded text-[#700070]"
                      />
                      <span>Active on Homepage</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Banner Headline
                      </label>
                      <input
                        type="text"
                        value={homepageState.callForPapersHeadline}
                        onChange={(e) =>
                          setHomepageState({
                            ...homepageState,
                            callForPapersHeadline: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Deadline Date
                      </label>
                      <input
                        type="text"
                        value={homepageState.callForPapersDeadline}
                        onChange={(e) =>
                          setHomepageState({
                            ...homepageState,
                            callForPapersDeadline: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Intro Paragraphs */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Introduction Paragraph 1 (Aims)
                  </label>
                  <textarea
                    rows={2}
                    value={homepageState.introP1}
                    onChange={(e) =>
                      setHomepageState({ ...homepageState, introP1: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Introduction Paragraph 2 (Knowledge Platform)
                  </label>
                  <textarea
                    rows={3}
                    value={homepageState.introP2}
                    onChange={(e) =>
                      setHomepageState({ ...homepageState, introP2: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    About the Journal (Full Scope &amp; Multidisciplinary Coverage)
                  </label>
                  <textarea
                    rows={4}
                    value={homepageState.aboutText}
                    onChange={(e) =>
                      setHomepageState({ ...homepageState, aboutText: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Publication Policy Summary
                  </label>
                  <textarea
                    rows={3}
                    value={homepageState.policyText}
                    onChange={(e) =>
                      setHomepageState({ ...homepageState, policyText: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#700070] hover:bg-[#550055] text-white font-bold rounded flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Homepage Content</span>
                </button>
              </form>
            </div>
          )}

          {/* =============================================================
              VIEW 4: ARTICLES (FULL MANAGEMENT & EDIT MODAL)
             ============================================================= */}
          {activeTab === "articles" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="font-editorial italic font-bold text-2xl text-slate-900">
                    Journal Articles ({articlesList.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Manage research manuscripts, authors, publication status, abstracts, and DOIs.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setNewArticleModal(true)}
                  className="px-3.5 py-2 bg-[#700070] hover:bg-[#550055] text-white text-xs font-bold rounded flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Article</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search articles by title, author, or DOI..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded focus:border-[#700070]"
                />
              </div>

              {/* Articles Table */}
              <div className="overflow-x-auto border border-slate-200 rounded">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-2.5 px-3">#</th>
                      <th className="py-2.5 px-3">Article Title</th>
                      <th className="py-2.5 px-3">Authors</th>
                      <th className="py-2.5 px-3">Issue</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {articlesList
                      .filter(
                        (a) =>
                          a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          a.authors.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((art) => (
                        <tr key={art.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">
                            {art.id}
                          </td>
                          <td className="py-2.5 px-3 font-medium text-slate-800 max-w-sm">
                            <div className="line-clamp-2 leading-snug font-semibold">{art.title}</div>
                            <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-500 font-mono mt-1">
                              <span>DOI: {art.doi}</span>
                              {art.pages && <span>• {art.pages}</span>}
                              {art.category && (
                                <span className="bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded font-sans font-medium">
                                  {art.category}
                                </span>
                              )}
                              <button
                                type="button"
                                onClick={() => openArticlePdf(art, settings)}
                                className="inline-flex items-center gap-1 text-[#700070] bg-purple-50 border border-purple-200 px-1.5 py-0.5 rounded font-sans font-bold hover:bg-[#700070] hover:text-white transition-colors cursor-pointer"
                                title="Open & View PDF Document"
                              >
                                <Paperclip className="w-2.5 h-2.5" />
                                <span>{art.fileName || "View PDF"}</span>
                                {art.fileSize && <span className="text-[9px] opacity-75">({art.fileSize})</span>}
                              </button>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 text-slate-600 font-medium">
                            {art.authors}
                          </td>
                          <td className="py-2.5 px-3 text-slate-500 whitespace-nowrap">
                            {art.volume}, {art.issue}
                          </td>
                          <td className="py-2.5 px-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                art.status === "Published"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                  : "bg-amber-50 text-amber-700 border-amber-200"
                              }`}
                            >
                              {art.status}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-right whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => setEditingArticle({ ...art })}
                              className="text-blue-600 hover:text-blue-800 p-1 mr-1 cursor-pointer"
                              title="Edit Article"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                deleteArticle(art.id);
                                showToast(`Article #${art.id} deleted.`);
                              }}
                              className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                              title="Delete Article"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =============================================================
              VIEW 5: ARCHIVES & ISSUES (FULLY EDITABLE)
             ============================================================= */}
          {activeTab === "archives" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-editorial italic font-bold text-2xl text-slate-900">
                    Archives &amp; Issues Manager
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Manage published volumes, create upcoming issues, and track article distribution.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setNewIssueModal(true)}
                  className="px-3.5 py-2 bg-[#700070] hover:bg-[#550055] text-white text-xs font-bold rounded flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Issue</span>
                </button>
              </div>

              <div className="space-y-3">
                {issuesList.map((issue) => (
                  <div
                    key={issue.id}
                    className="border border-slate-200 rounded-lg p-4 bg-slate-50/70 hover:border-purple-300 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#700070]">
                          {issue.volume}, {issue.issue} ({issue.period})
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            issue.status === "Published"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {issue.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs text-slate-500 font-medium">
                          {issue.articlesCount} Articles Indexed
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete ${issue.volume}, ${issue.issue} (${issue.period})? This cannot be undone.`)) {
                              deleteIssue(issue.id);
                              showToast(`Issue "${issue.volume}, ${issue.issue}" deleted successfully.`);
                            }
                          }}
                          className="px-2.5 py-1 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-600 hover:text-white border border-rose-300 rounded flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                          title="Delete this Issue from Archive"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 mb-2">
                      Theme: <strong>{issue.theme}</strong> • Publication Date: {issue.publicationDate}
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-slate-200 text-xs">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            const newStatus =
                              issue.status === "Published" ? "Open for Submissions" : "Published";
                            updateIssue({ ...issue, status: newStatus });
                            showToast(`Issue status changed to "${newStatus}"`);
                          }}
                          className="text-[#700070] hover:underline font-semibold cursor-pointer"
                        >
                          Toggle Status
                        </button>
                        <span className="text-slate-300">|</span>
                        <Link
                          href="/archives"
                          target="_blank"
                          className="text-slate-600 hover:text-slate-900 flex items-center gap-1 hover:underline"
                        >
                          <span>View Public Archive</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingIssue({ ...issue })}
                          className="px-2.5 py-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 border border-blue-200 rounded font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                          title="Edit Issue Details"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete ${issue.volume}, ${issue.issue} (${issue.period})? This cannot be undone.`)) {
                              deleteIssue(issue.id);
                              showToast(`Issue "${issue.volume}, ${issue.issue}" deleted successfully.`);
                            }
                          }}
                          className="px-2.5 py-1 text-rose-600 hover:text-rose-800 hover:bg-rose-50 border border-rose-200 rounded font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                          title="Delete this Issue from Archive"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =============================================================
              VIEW 6: EDITORIAL BOARD (MANAGE & EDIT MEMBERS)
             ============================================================= */}
          {activeTab === "editorial" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-editorial italic font-bold text-2xl text-slate-900">
                    Editorial Board Members ({editorialMembers.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Add, edit, or remove Chief Editor, Associate Editors, and Advisory Board members.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setNewMemberModal(true)}
                  className="px-3.5 py-2 bg-[#700070] hover:bg-[#550055] text-white text-xs font-bold rounded flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Editorial Member</span>
                </button>
              </div>


              {/* Grid of Draggable Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {editorialMembers.map((m, index) => (
                  <div
                    key={m.id}
                    draggable={true}
                    onDragStart={(e) => handleMemberDragStart(e, index)}
                    onDragOver={(e) => handleMemberDragOver(e, index)}
                    onDrop={(e) => handleMemberDrop(e, index)}
                    onDragEnd={handleMemberDragEnd}
                    className={`rounded-lg p-3.5 transition-all bg-white flex flex-col justify-between select-none relative group ${
                      draggedMemberIndex === index
                        ? "opacity-30 border-2 border-dashed border-[#700070] scale-95 shadow-xl bg-purple-100/50"
                        : dragOverMemberIndex === index
                        ? "border-2 border-[#700070] ring-2 ring-purple-300 bg-purple-50/60 shadow-lg scale-[1.01]"
                        : "border border-slate-200 hover:border-purple-300 hover:shadow-xs"
                    }`}
                  >
                    <div>
                      {/* Top Reordering Bar: Drag Handle + Directional Arrows */}
                      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-100">
                        <div
                          className="flex items-center gap-1.5 cursor-grab active:cursor-grabbing text-slate-400 hover:text-[#700070] transition-colors"
                          title="Click & Drag karke upar, niche, daye, baye drop karein"
                        >
                          <GripVertical className="w-4 h-4 text-slate-400 group-hover:text-[#700070]" />
                          <span className="font-mono text-[10px] font-bold bg-purple-50 text-[#700070] border border-purple-200 px-1.5 py-0.5 rounded">
                            #{index + 1}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
                            Hold to Drag
                          </span>
                        </div>

                        {/* Directional Controls: Left (Baye), Up (Upar), Down (Niche), Right (Daye) */}
                        <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 p-0.5 rounded">
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={(e) => {
                              e.stopPropagation();
                              moveMemberLeft(index);
                            }}
                            className="p-1 text-slate-600 hover:text-[#700070] hover:bg-white rounded disabled:opacity-25 disabled:hover:bg-transparent transition-colors cursor-pointer"
                            title="Baye karein (Move Left)"
                          >
                            <ArrowLeft className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={(e) => {
                              e.stopPropagation();
                              moveMemberUp(index);
                            }}
                            className="p-1 text-slate-600 hover:text-[#700070] hover:bg-white rounded disabled:opacity-25 disabled:hover:bg-transparent transition-colors cursor-pointer"
                            title="Upar karein (Move Up)"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            disabled={index === editorialMembers.length - 1}
                            onClick={(e) => {
                              e.stopPropagation();
                              moveMemberDown(index);
                            }}
                            className="p-1 text-slate-600 hover:text-[#700070] hover:bg-white rounded disabled:opacity-25 disabled:hover:bg-transparent transition-colors cursor-pointer"
                            title="Niche karein (Move Down)"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            disabled={index === editorialMembers.length - 1}
                            onClick={(e) => {
                              e.stopPropagation();
                              moveMemberRight(index);
                            }}
                            className="p-1 text-slate-600 hover:text-[#700070] hover:bg-white rounded disabled:opacity-25 disabled:hover:bg-transparent transition-colors cursor-pointer"
                            title="Daye karein (Move Right)"
                          >
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Member Info */}
                      <div className="flex items-start gap-3">
                        {m.photoData || m.photoUrl ? (
                          <img
                            src={m.photoData || m.photoUrl}
                            alt={m.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-purple-200 shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-purple-100 text-[#700070] flex items-center justify-center font-bold text-sm shrink-0 border border-purple-200">
                            {m.name
                              .replace(/^Dr\.\s*|^Prof\.\s*/i, "")
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center justify-between gap-1">
                            <span className="font-bold text-sm text-slate-900 truncate">{m.name}</span>
                            <div className="flex flex-wrap items-center gap-1 shrink-0">
                              {(m.name.toLowerCase().includes("deepak setia") ||
                                m.role.toLowerCase().includes("editor") ||
                                m.role.toLowerCase().includes("board") ||
                                m.role.toLowerCase().includes("advisor")) && (
                                <span className="text-[10px] font-bold text-white bg-[#700070] px-2 py-0.5 rounded shadow-2xs">
                                  {m.name.toLowerCase().includes("deepak setia")
                                    ? "Editor-in-Chief"
                                    : m.role}
                                </span>
                              )}
                              <span className="text-[10px] text-purple-900 bg-purple-100 border border-purple-200 font-semibold px-2 py-0.5 rounded">
                                {m.designation ||
                                  (m.role.toLowerCase().includes("assistant") ||
                                  m.role.toLowerCase().includes("professor")
                                    ? m.role
                                    : "Assistant Professor")}
                              </span>
                            </div>
                          </div>
                          <div className="text-slate-600 text-xs mt-0.5 font-medium">{m.affiliation}</div>
                          {m.specialization && (
                            <div className="text-slate-500 text-[11px] mt-0.5">
                              Area: <em>{m.specialization}</em>
                            </div>
                          )}
                          {m.email && (
                            <div className="text-slate-400 font-mono text-[11px] mt-0.5">
                              {m.email}
                            </div>
                          )}

                          {/* Official Website Link */}
                          {m.websiteUrl ? (
                            <div className="mt-1">
                              <a
                                href={m.websiteUrl.startsWith("http") ? m.websiteUrl : `https://${m.websiteUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#700070] hover:underline"
                                title={`Visit official website of ${m.name}`}
                              >
                                <Globe className="w-3 h-3 text-[#700070]" />
                                <span>Visit Website ↗</span>
                              </a>
                            </div>
                          ) : (
                            <div className="mt-1">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingMember({ ...m });
                                }}
                                className="inline-flex items-center gap-1 text-[10px] text-slate-400 hover:text-[#700070] border border-dashed border-slate-300 hover:border-[#700070] px-1.5 py-0.5 rounded transition-colors cursor-pointer"
                              >
                                <Globe className="w-2.5 h-2.5" />
                                <span>+ Add Website</span>
                              </button>
                            </div>
                          )}

                          {m.orcid && (
                            <div className="text-purple-700 text-[10px] font-mono mt-0.5 truncate">
                              ORCID: {m.orcid}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="pt-2.5 mt-2 border-t border-slate-100 flex items-center justify-end gap-3 text-[11px]">
                      <button
                        type="button"
                        onClick={() => setEditingMember({ ...m })}
                        className="text-blue-600 hover:underline font-semibold cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          deleteMember(m.id);
                          showToast(`Removed ${m.name}`);
                        }}
                        className="text-rose-500 hover:underline cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =============================================================
              VIEW 7: AUTHOR INSTRUCTIONS (FULLY EDITABLE)
             ============================================================= */}
          {activeTab === "instructions" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div>
                <h2 className="font-editorial italic font-bold text-2xl text-slate-900">
                  Author Instructions &amp; Submission Guidelines
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Configure submission checklist, manuscript structure, citation style, and plagiarism limits.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateInstructions(instructionsState);
                  showToast("Author instructions updated and saved live!");
                }}
                className="space-y-4 text-xs"
              >
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Manuscript Scope &amp; Topics
                  </label>
                  <textarea
                    rows={2}
                    value={instructionsState.manuscriptScope}
                    onChange={(e) =>
                      setInstructionsState({ ...instructionsState, manuscriptScope: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Abstract Word Count Limit
                    </label>
                    <input
                      type="text"
                      value={instructionsState.abstractWordLimit}
                      onChange={(e) =>
                        setInstructionsState({ ...instructionsState, abstractWordLimit: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Keywords Requirement
                    </label>
                    <input
                      type="text"
                      value={instructionsState.keywordsLimit}
                      onChange={(e) =>
                        setInstructionsState({ ...instructionsState, keywordsLimit: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Formatting &amp; Typography Standards
                    </label>
                    <input
                      type="text"
                      value={instructionsState.formattingFont}
                      onChange={(e) =>
                        setInstructionsState({ ...instructionsState, formattingFont: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Referencing &amp; Citation Style
                    </label>
                    <input
                      type="text"
                      value={instructionsState.citationStyle}
                      onChange={(e) =>
                        setInstructionsState({ ...instructionsState, citationStyle: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Anti-Plagiarism Similarity Limit
                    </label>
                    <input
                      type="text"
                      value={instructionsState.plagiarismThreshold}
                      onChange={(e) =>
                        setInstructionsState({ ...instructionsState, plagiarismThreshold: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Article Processing Charge (APC) Policy
                    </label>
                    <input
                      type="text"
                      value={instructionsState.apcPolicy}
                      onChange={(e) =>
                        setInstructionsState({ ...instructionsState, apcPolicy: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Submission Checklist Rules (One per line)
                  </label>
                  <textarea
                    rows={4}
                    value={instructionsState.checklistItems.join("\n")}
                    onChange={(e) =>
                      setInstructionsState({
                        ...instructionsState,
                        checklistItems: e.target.value.split("\n"),
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded font-mono text-[11px]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#700070] hover:bg-[#550055] text-white font-bold rounded flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Author Instructions</span>
                </button>
              </form>
            </div>
          )}

          {/* =============================================================
              VIEW 8: PUBLICATION ETHICS (FULLY EDITABLE)
             ============================================================= */}
          {activeTab === "ethics" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div>
                <h2 className="font-editorial italic font-bold text-2xl text-slate-900">
                  Publication Ethics &amp; Malpractice Statement
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Define peer review standards, anti-plagiarism screening, conflicts of interest, and retractions.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateEthics(ethicsState);
                  showToast("Publication ethics policies updated and saved live!");
                }}
                className="space-y-4 text-xs"
              >
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Authorship &amp; Contributorship Criteria
                  </label>
                  <textarea
                    rows={2}
                    value={ethicsState.authorshipCriteria}
                    onChange={(e) =>
                      setEthicsState({ ...ethicsState, authorshipCriteria: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Peer Review Policy &amp; Confidentiality
                  </label>
                  <textarea
                    rows={2}
                    value={ethicsState.peerReviewPolicy}
                    onChange={(e) =>
                      setEthicsState({ ...ethicsState, peerReviewPolicy: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Anti-Plagiarism &amp; Research Integrity Protocol
                  </label>
                  <textarea
                    rows={2}
                    value={ethicsState.plagiarismProtocol}
                    onChange={(e) =>
                      setEthicsState({ ...ethicsState, plagiarismProtocol: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Conflict of Interest Disclosure
                  </label>
                  <textarea
                    rows={2}
                    value={ethicsState.conflictOfInterest}
                    onChange={(e) =>
                      setEthicsState({ ...ethicsState, conflictOfInterest: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Retraction, Correction &amp; Errata Policy
                  </label>
                  <textarea
                    rows={2}
                    value={ethicsState.retractionPolicy}
                    onChange={(e) =>
                      setEthicsState({ ...ethicsState, retractionPolicy: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#700070] hover:bg-[#550055] text-white font-bold rounded flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Publication Ethics</span>
                </button>
              </form>
            </div>
          )}

          {/* =============================================================
              VIEW 9: CONTACT DETAILS (FULLY EDITABLE)
             ============================================================= */}
          {activeTab === "contact" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div>
                <h2 className="font-editorial italic font-bold text-2xl text-slate-900">
                  Editorial Contact Information
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Manage official contact channels, editorial office address, and support lines.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateContact(contactState);
                  showToast("Contact information updated and saved live!");
                }}
                className="space-y-4 text-xs"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Editorial Office Email
                    </label>
                    <input
                      type="email"
                      value={contactState.editorialEmail}
                      onChange={(e) =>
                        setContactState({ ...contactState, editorialEmail: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Publisher Desk Email
                    </label>
                    <input
                      type="email"
                      value={contactState.publisherEmail}
                      onChange={(e) =>
                        setContactState({ ...contactState, publisherEmail: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Helpline / WhatsApp Number
                    </label>
                    <input
                      type="text"
                      value={contactState.helplinePhone}
                      onChange={(e) =>
                        setContactState({ ...contactState, helplinePhone: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Office Working Hours
                    </label>
                    <input
                      type="text"
                      value={contactState.officeHours}
                      onChange={(e) =>
                        setContactState({ ...contactState, officeHours: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Editorial Office Physical Address
                  </label>
                  <textarea
                    rows={2}
                    value={contactState.officeAddress}
                    onChange={(e) =>
                      setContactState({ ...contactState, officeAddress: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Response Timeline Notice
                  </label>
                  <input
                    type="text"
                    value={contactState.responseTime}
                    onChange={(e) =>
                      setContactState({ ...contactState, responseTime: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#700070] hover:bg-[#550055] text-white font-bold rounded flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Contact Details</span>
                </button>
              </form>
            </div>
          )}

          {/* =============================================================
              VIEW 10: MESSAGES INBOX (INTERACTIVE)
             ============================================================= */}
          {activeTab === "messages" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-editorial italic font-bold text-2xl text-slate-900">
                    Scholar Inquiries &amp; Messages ({messagesList.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Messages received from authors, reviewers, and institutions.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const sample = {
                      sender: "Dr. Ankit Srivastava",
                      email: "ankit.s@university.ac.in",
                      subject: "Submission Confirmation for Review Issue",
                      content: "Inquiry regarding publication timelines for multidisciplinary manuscripts.",
                    };
                    addMessage(sample);
                    showToast("New inquiry logged.");
                  }}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded transition-colors"
                >
                  Simulate New Message
                </button>
              </div>

              <div className="space-y-3">
                {messagesList.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-4 border rounded-lg transition-colors ${
                      msg.isRead
                        ? "border-slate-200 bg-slate-50/50"
                        : "border-purple-300 bg-purple-50/40 shadow-xs"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{msg.sender}</span>
                        {!msg.isRead && (
                          <span className="bg-rose-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase">
                            New
                          </span>
                        )}
                      </div>
                      <span className="text-slate-400 text-[11px]">{msg.date}</span>
                    </div>

                    <div className="text-slate-500 text-[11px] font-mono mt-0.5">
                      {msg.email}
                    </div>

                    <div className="font-semibold text-xs text-purple-950 mt-2">
                      {msg.subject}
                    </div>

                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {msg.content}
                    </p>

                    <div className="pt-3 mt-2 border-t border-slate-200 flex items-center justify-end gap-3 text-xs">
                      <a
                        href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                        className="text-[#700070] hover:underline font-semibold flex items-center gap-1"
                      >
                        <Send className="w-3 h-3" />
                        <span>Reply via Email</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => toggleMessageRead(msg.id)}
                        className="text-slate-600 hover:text-slate-900"
                      >
                        {msg.isRead ? "Mark Unread" : "Mark Read"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          deleteMessage(msg.id);
                          showToast("Message deleted.");
                        }}
                        className="text-rose-500 hover:text-rose-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =============================================================
              VIEW 11: SIDEBAR MENU WIDGETS CONFIG (FULLY EDITABLE)
             ============================================================= */}
          {activeTab === "sidebar-menu" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div>
                <h2 className="font-editorial italic font-bold text-2xl text-slate-900">
                  Public Journal Sidebar Widgets
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Customize the cards, widgets, and links that appear on the right side of the public website.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateSidebarConfig(sidebarMenuState);
                  showToast("Sidebar widget configurations saved live!");
                }}
                className="space-y-4 text-xs"
              >
                {/* Widget 1: Editorial policies */}
                <div className="border border-slate-200 p-4 rounded-lg bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-sm">
                      Widget 1: Editorial Policies Links
                    </span>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sidebarMenuState.showEditorialPolicies}
                        onChange={(e) =>
                          setSidebarMenuState({
                            ...sidebarMenuState,
                            showEditorialPolicies: e.target.checked,
                          })
                        }
                        className="rounded text-[#700070]"
                      />
                      <span>Show on Public Sidebar</span>
                    </label>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Links to Focus &amp; Scope, Publication Ethics, Peer Review Process, and Open Access Policy.
                  </p>
                </div>

                {/* Widget 2: Cover Box */}
                <div className="border border-slate-200 p-4 rounded-lg bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-sm">
                      Widget 2: Purple Journal Cover Card
                    </span>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sidebarMenuState.showCoverBox}
                        onChange={(e) =>
                          setSidebarMenuState({
                            ...sidebarMenuState,
                            showCoverBox: e.target.checked,
                          })
                        }
                        className="rounded text-[#700070]"
                      />
                      <span>Show Cover Card</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Cover Page Heading
                      </label>
                      <input
                        type="text"
                        value={sidebarMenuState.coverPageHeading ?? "Cover Page"}
                        onChange={(e) =>
                          setSidebarMenuState({
                            ...sidebarMenuState,
                            coverPageHeading: e.target.value,
                          })
                        }
                        placeholder="Cover Page"
                        className="w-full px-3 py-2 border border-slate-300 rounded bg-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Cover Image URL
                      </label>
                      <input
                        type="text"
                        value={sidebarMenuState.coverImageUrl ?? "/images/manthan-cover-page.png"}
                        onChange={(e) =>
                          setSidebarMenuState({
                            ...sidebarMenuState,
                            coverImageUrl: e.target.value,
                          })
                        }
                        placeholder="/images/manthan-cover-page.png"
                        className="w-full px-3 py-2 border border-slate-300 rounded bg-white text-sm"
                      />
                    </div>
                  </div>

                  {/* Active Cover Image Preview */}
                  <div className="flex items-center gap-3 p-2.5 bg-white border border-slate-200 rounded">
                    <img
                      src={sidebarMenuState.coverImageUrl || "/images/manthan-cover-page.png"}
                      alt="Cover Preview"
                      className="w-12 h-18 object-contain border border-slate-200 rounded shadow-xs"
                    />
                    <div className="text-xs text-slate-600">
                      <p className="font-semibold text-slate-800">Current Cover: {sidebarMenuState.coverPageHeading || "Cover Page"}</p>
                      <p className="text-slate-500">Rendered under "Editorial Policies" with header banner and framed cover layout.</p>
                    </div>
                  </div>
                </div>

                {/* Widget 3: Manuscript status */}
                <div className="border border-slate-200 p-4 rounded-lg bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-sm">
                      Widget 3: Manuscript Status Button
                    </span>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sidebarMenuState.showManuscriptStatus}
                        onChange={(e) =>
                          setSidebarMenuState({
                            ...sidebarMenuState,
                            showManuscriptStatus: e.target.checked,
                          })
                        }
                        className="rounded text-[#700070]"
                      />
                      <span>Show Status Button</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Button Label
                      </label>
                      <input
                        type="text"
                        value={sidebarMenuState.manuscriptStatusText}
                        onChange={(e) =>
                          setSidebarMenuState({
                            ...sidebarMenuState,
                            manuscriptStatusText: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Destination Link
                      </label>
                      <input
                        type="text"
                        value={sidebarMenuState.manuscriptStatusLink}
                        onChange={(e) =>
                          setSidebarMenuState({
                            ...sidebarMenuState,
                            manuscriptStatusLink: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Widget 4: Impact Factor */}
                <div className="border border-slate-200 p-4 rounded-lg bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-sm">
                      Widget 4: Impact Factor Display
                    </span>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sidebarMenuState.showImpactFactor}
                        onChange={(e) =>
                          setSidebarMenuState({
                            ...sidebarMenuState,
                            showImpactFactor: e.target.checked,
                          })
                        }
                        className="rounded text-[#700070]"
                      />
                      <span>Show Impact Factor</span>
                    </label>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Display Text
                    </label>
                    <input
                      type="text"
                      value={sidebarMenuState.impactFactorValue}
                      onChange={(e) =>
                        setSidebarMenuState({
                          ...sidebarMenuState,
                          impactFactorValue: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#700070] hover:bg-[#550055] text-white font-bold rounded flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Sidebar Configurations</span>
                </button>
              </form>
            </div>
          )}

          {/* =============================================================
              VIEW 12: ANNOUNCEMENT BAR (FULLY EDITABLE)
             ============================================================= */}
          {activeTab === "announcement" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
              <div>
                <h2 className="font-editorial italic font-bold text-2xl text-slate-900">
                  Top Announcement Ticker
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update the live notification banner and submission deadlines across all portal pages.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateAnnouncement(announcementState);
                  showToast("Announcement ticker updated live on public site!");
                }}
                className="space-y-4 text-xs"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="annActive"
                    checked={announcementState.active}
                    onChange={(e) =>
                      setAnnouncementState({ ...announcementState, active: e.target.checked })
                    }
                    className="rounded text-[#700070]"
                  />
                  <label htmlFor="annActive" className="font-bold text-slate-700 cursor-pointer">
                    Enable Top Announcement Ticker Live
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Notification Badge
                    </label>
                    <input
                      type="text"
                      value={announcementState.badge}
                      onChange={(e) =>
                        setAnnouncementState({ ...announcementState, badge: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Deadline Date
                    </label>
                    <input
                      type="text"
                      value={announcementState.deadline}
                      onChange={(e) =>
                        setAnnouncementState({ ...announcementState, deadline: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Announcement Message Text
                  </label>
                  <textarea
                    rows={3}
                    value={announcementState.text}
                    onChange={(e) =>
                      setAnnouncementState({ ...announcementState, text: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#700070] hover:bg-[#550055] text-white font-bold rounded flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Announcement Banner</span>
                </button>
              </form>
            </div>
          )}

          {/* =============================================================
              VIEW 13: PROFILE & SECURITY (CHANGE PASSWORD & CREDENTIALS)
             ============================================================= */}
          {activeTab === "profile" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div>
                <h2 className="font-editorial italic font-bold text-2xl text-slate-900">
                  Administrator Profile &amp; Security
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Manage administrator credentials, contact email, and update login password.
                </p>
              </div>

              {/* Profile Details Form */}
              <form onSubmit={handleSaveProfile} className="space-y-4 text-xs border-b border-slate-200 pb-6">
                <h3 className="font-bold text-sm text-[#700070]">
                  Admin Account Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={profileForm.name}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Admin Username
                    </label>
                    <input
                      type="text"
                      required
                      value={profileForm.username}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, username: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Admin Official Email
                    </label>
                    <input
                      type="email"
                      required
                      value={profileForm.email}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, email: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Designation / Role
                    </label>
                    <input
                      type="text"
                      required
                      value={profileForm.role}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, role: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#700070] hover:bg-[#550055] text-white font-bold rounded flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Profile Info</span>
                </button>
              </form>

              {/* Change Password Form */}
              <form onSubmit={handleUpdatePassword} className="space-y-4 text-xs">
                <h3 className="font-bold text-sm text-[#700070]">
                  Change Admin Password
                </h3>
                <p className="text-slate-500 text-[11px]">
                  Default Credentials: Username: <strong>impulse_admin</strong> • Password: <strong>Impulse@2026#Admin</strong>
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Enter current password"
                      value={passwordForm.currentPassword}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Min 5 characters"
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Re-enter new password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Update Password</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </main>

      {/* -------------------------------------------------------------
          ADD ARTICLE MODAL (CLICKABLE VOLUME/ISSUE + DOCUMENT UPLOAD)
         ------------------------------------------------------------- */}
      {newArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 max-w-2xl w-full p-6 shadow-2xl space-y-4 text-xs max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-editorial italic font-bold text-xl text-slate-900">
                  Add New Research Manuscript
                </h3>
                <p className="text-[11px] text-slate-500">
                  Upload PDF/DOC manuscripts, assign volume &amp; issue, and publish live to journal.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setNewArticleModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddArticle} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Article Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Socio-Economic Impact of Renewable Energy Transitions in Developing Economies"
                  value={newArticleForm.title}
                  onChange={(e) =>
                    setNewArticleForm({ ...newArticleForm, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070] text-xs font-medium"
                />
              </div>

              {/* Authors */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Author Names &amp; Institutional Affiliations <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Ramesh Kumar (Delhi University) & Dr. Suman Sen (JNU)"
                  value={newArticleForm.authors}
                  onChange={(e) =>
                    setNewArticleForm({ ...newArticleForm, authors: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070] text-xs"
                />
              </div>

              {/* Volume & Issue Controls (FULLY CLICKABLE & EDITABLE) */}
              <div className="p-3 bg-purple-50/60 border border-purple-100 rounded-lg space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-900 text-xs flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#700070]" />
                    <span>Volume &amp; Issue Assignment</span>
                  </span>
                  <span className="text-[10px] text-purple-700 font-medium">
                    (Click or type to edit freely)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1 text-[11px]">
                      Quick Select Issue
                    </label>
                    <select
                      onChange={(e) => {
                        const val = e.target.value;
                        if (!val) return;
                        const [vol, iss] = val.split("|");
                        setNewArticleForm({
                          ...newArticleForm,
                          volume: vol || newArticleForm.volume,
                          issue: iss || newArticleForm.issue,
                        });
                      }}
                      className="w-full px-2.5 py-1.5 border border-purple-200 bg-white rounded text-xs text-slate-700 focus:border-[#700070]"
                    >
                      <option value="">-- Choose Existing Issue --</option>
                      {issuesList.map((iss) => (
                        <option key={iss.id} value={`${iss.volume}|${iss.issue}`}>
                          {iss.volume}, {iss.issue} ({iss.period})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1 text-[11px]">
                      Volume Name / No.
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Volume 1"
                      value={newArticleForm.volume}
                      onChange={(e) =>
                        setNewArticleForm({ ...newArticleForm, volume: e.target.value })
                      }
                      className="w-full px-2.5 py-1.5 border border-purple-300 bg-white rounded text-xs text-slate-800 font-medium focus:border-[#700070] focus:ring-1 focus:ring-[#700070]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1 text-[11px]">
                      Issue Number
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Issue 1"
                      value={newArticleForm.issue}
                      onChange={(e) =>
                        setNewArticleForm({ ...newArticleForm, issue: e.target.value })
                      }
                      className="w-full px-2.5 py-1.5 border border-purple-300 bg-white rounded text-xs text-slate-800 font-medium focus:border-[#700070] focus:ring-1 focus:ring-[#700070]"
                    />
                  </div>
                </div>
              </div>

              {/* Research Metadata: DOI, Status, Pages, Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    DOI Identifier
                  </label>
                  <input
                    type="text"
                    value={newArticleForm.doi}
                    onChange={(e) =>
                      setNewArticleForm({ ...newArticleForm, doi: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:border-[#700070] font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Publication Status
                  </label>
                  <select
                    value={newArticleForm.status}
                    onChange={(e) =>
                      setNewArticleForm({ ...newArticleForm, status: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:border-[#700070] text-xs"
                  >
                    <option value="Published">Published</option>
                    <option value="In Review">In Review</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Page Numbers
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. pp. 1-14"
                    value={newArticleForm.pages}
                    onChange={(e) =>
                      setNewArticleForm({ ...newArticleForm, pages: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:border-[#700070] text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Subject / Area
                  </label>
                  <select
                    value={newArticleForm.category}
                    onChange={(e) =>
                      setNewArticleForm({ ...newArticleForm, category: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:border-[#700070] text-xs"
                  >
                    <option value="Social Sciences">Social Sciences</option>
                    <option value="Humanities & Literature">Humanities &amp; Literature</option>
                    <option value="Economics & Commerce">Economics &amp; Commerce</option>
                    <option value="Law & Legal Studies">Law &amp; Legal Studies</option>
                    <option value="Education & Pedagogy">Education &amp; Pedagogy</option>
                    <option value="Management Studies">Management Studies</option>
                    <option value="Multidisciplinary">Multidisciplinary</option>
                  </select>
                </div>
              </div>

              {/* Publication Date & Keywords */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Publication Date / Month
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. August 2026"
                    value={newArticleForm.date}
                    onChange={(e) =>
                      setNewArticleForm({ ...newArticleForm, date: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:border-[#700070] text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Keywords (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Social Policy, India, Economic Survey, Governance"
                    value={newArticleForm.keywords}
                    onChange={(e) =>
                      setNewArticleForm({ ...newArticleForm, keywords: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:border-[#700070] text-xs"
                  />
                </div>
              </div>

              {/* DOCUMENT UPLOAD SECTION (PDF, DOC, DOCX) */}
              <div className="border border-dashed border-[#700070]/40 bg-purple-50/30 p-4 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UploadCloud className="w-4 h-4 text-[#700070]" />
                    <span className="font-bold text-slate-900 text-xs">
                      Upload Manuscript Document (.pdf, .doc, .docx)
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Max size: 15MB
                  </span>
                </div>

                {newArticleForm.fileName || newArticleForm.fileData ? (
                  <div className="flex items-center justify-between bg-white border border-purple-200 p-2.5 rounded-md shadow-xs">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <Paperclip className="w-4 h-4 text-[#700070] shrink-0" />
                      <div className="truncate">
                        <p className="font-bold text-slate-800 text-xs truncate">
                          {newArticleForm.fileName || "Uploaded Document"}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono">
                          {newArticleForm.fileSize || "Ready for download"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {newArticleForm.fileData && (
                        <button
                          type="button"
                          onClick={() => openArticlePdf(newArticleForm, settings)}
                          className="px-2 py-1 text-[11px] font-bold text-[#700070] bg-purple-50 hover:bg-purple-100 rounded border border-purple-200 cursor-pointer"
                        >
                          Open &amp; View PDF
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(false)}
                        className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded"
                        title="Remove Document"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-purple-200 rounded-md bg-white hover:bg-purple-50/50 cursor-pointer transition-colors text-center group">
                    <FileUp className="w-6 h-6 text-[#700070] group-hover:scale-110 transition-transform mb-1" />
                    <span className="text-xs font-bold text-slate-700">
                      Click to choose or drag &amp; drop manuscript file
                    </span>
                    <span className="text-[11px] text-slate-500 mt-0.5">
                      Supports PDF, DOC, DOCX files
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={(e) => handleFileUpload(e, false)}
                      className="hidden"
                    />
                  </label>
                )}

                {/* Optional external PDF URL */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Or Enter Direct Document / PDF URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/papers/manuscript-sample.pdf"
                    value={newArticleForm.pdfUrl}
                    onChange={(e) =>
                      setNewArticleForm({ ...newArticleForm, pdfUrl: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:border-[#700070] text-xs font-mono"
                  />
                </div>
              </div>

              {/* Abstract */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Manuscript Abstract
                </label>
                <textarea
                  rows={4}
                  placeholder="Paste manuscript abstract here summarizing the methodology, findings, and conclusion..."
                  value={newArticleForm.abstract}
                  onChange={(e) =>
                    setNewArticleForm({ ...newArticleForm, abstract: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070] text-xs"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setNewArticleModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded text-slate-600 hover:bg-slate-50 cursor-pointer font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#700070] hover:bg-[#550055] text-white font-bold rounded cursor-pointer shadow-sm transition-all"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          EDIT ARTICLE MODAL (CLICKABLE VOLUME/ISSUE + DOCUMENT UPLOAD)
         ------------------------------------------------------------- */}
      {editingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 max-w-2xl w-full p-6 shadow-2xl space-y-4 text-xs max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-editorial italic font-bold text-xl text-slate-900">
                  Edit Article #{editingArticle.id}
                </h3>
                <p className="text-[11px] text-slate-500">
                  Update article title, authors, volume, issue, documents, and research metadata.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingArticle(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditedArticle} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Article Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingArticle.title}
                  onChange={(e) =>
                    setEditingArticle({ ...editingArticle, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070] text-xs font-medium"
                />
              </div>

              {/* Authors */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Author Names &amp; Affiliations <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingArticle.authors}
                  onChange={(e) =>
                    setEditingArticle({ ...editingArticle, authors: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070] text-xs"
                />
              </div>

              {/* Volume & Issue Controls (FULLY CLICKABLE & EDITABLE) */}
              <div className="p-3 bg-purple-50/60 border border-purple-100 rounded-lg space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-900 text-xs flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#700070]" />
                    <span>Volume &amp; Issue Assignment</span>
                  </span>
                  <span className="text-[10px] text-purple-700 font-medium">
                    (Editable &amp; selectable)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1 text-[11px]">
                      Quick Select Issue
                    </label>
                    <select
                      onChange={(e) => {
                        const val = e.target.value;
                        if (!val) return;
                        const [vol, iss] = val.split("|");
                        setEditingArticle({
                          ...editingArticle,
                          volume: vol || editingArticle.volume,
                          issue: iss || editingArticle.issue,
                        });
                      }}
                      className="w-full px-2.5 py-1.5 border border-purple-200 bg-white rounded text-xs text-slate-700 focus:border-[#700070]"
                    >
                      <option value="">-- Choose Existing Issue --</option>
                      {issuesList.map((iss) => (
                        <option key={iss.id} value={`${iss.volume}|${iss.issue}`}>
                          {iss.volume}, {iss.issue} ({iss.period})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1 text-[11px]">
                      Volume Name / No.
                    </label>
                    <input
                      type="text"
                      required
                      value={editingArticle.volume || "Volume 1"}
                      onChange={(e) =>
                        setEditingArticle({ ...editingArticle, volume: e.target.value })
                      }
                      className="w-full px-2.5 py-1.5 border border-purple-300 bg-white rounded text-xs text-slate-800 font-medium focus:border-[#700070] focus:ring-1 focus:ring-[#700070]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1 text-[11px]">
                      Issue Number
                    </label>
                    <input
                      type="text"
                      required
                      value={editingArticle.issue || "Issue 1"}
                      onChange={(e) =>
                        setEditingArticle({ ...editingArticle, issue: e.target.value })
                      }
                      className="w-full px-2.5 py-1.5 border border-purple-300 bg-white rounded text-xs text-slate-800 font-medium focus:border-[#700070] focus:ring-1 focus:ring-[#700070]"
                    />
                  </div>
                </div>
              </div>

              {/* Research Metadata: DOI, Status, Pages, Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    DOI Identifier
                  </label>
                  <input
                    type="text"
                    value={editingArticle.doi}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, doi: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:border-[#700070] font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Status
                  </label>
                  <select
                    value={editingArticle.status}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, status: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:border-[#700070] text-xs"
                  >
                    <option value="Published">Published</option>
                    <option value="In Review">In Review</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Pages
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. pp. 1-14"
                    value={editingArticle.pages || ""}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, pages: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:border-[#700070] text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Category / Area
                  </label>
                  <select
                    value={editingArticle.category || "Social Sciences"}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, category: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:border-[#700070] text-xs"
                  >
                    <option value="Social Sciences">Social Sciences</option>
                    <option value="Humanities & Literature">Humanities &amp; Literature</option>
                    <option value="Economics & Commerce">Economics &amp; Commerce</option>
                    <option value="Law & Legal Studies">Law &amp; Legal Studies</option>
                    <option value="Education & Pedagogy">Education &amp; Pedagogy</option>
                    <option value="Management Studies">Management Studies</option>
                    <option value="Multidisciplinary">Multidisciplinary</option>
                  </select>
                </div>
              </div>

              {/* Publication Date & Keywords */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Publication Date / Period
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. August 2026"
                    value={editingArticle.date || ""}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, date: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:border-[#700070] text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Keywords
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Social, Economy, Policy"
                    value={editingArticle.keywords || ""}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, keywords: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:border-[#700070] text-xs"
                  />
                </div>
              </div>

              {/* DOCUMENT UPLOAD SECTION (PDF, DOC, DOCX) */}
              <div className="border border-dashed border-[#700070]/40 bg-purple-50/30 p-4 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UploadCloud className="w-4 h-4 text-[#700070]" />
                    <span className="font-bold text-slate-900 text-xs">
                      Manuscript Document (.pdf, .doc, .docx)
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Max size: 15MB
                  </span>
                </div>

                {editingArticle.fileName || editingArticle.fileData ? (
                  <div className="flex items-center justify-between bg-white border border-purple-200 p-2.5 rounded-md shadow-xs">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <Paperclip className="w-4 h-4 text-[#700070] shrink-0" />
                      <div className="truncate">
                        <p className="font-bold text-slate-800 text-xs truncate">
                          {editingArticle.fileName || "Attached Manuscript"}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono">
                          {editingArticle.fileSize || "Ready for download"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {editingArticle.fileData && (
                        <button
                          type="button"
                          onClick={() => openArticlePdf(editingArticle, settings)}
                          className="px-2 py-1 text-[11px] font-bold text-[#700070] bg-purple-50 hover:bg-purple-100 rounded border border-purple-200 cursor-pointer"
                        >
                          Open &amp; View PDF
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(true)}
                        className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded"
                        title="Remove Document"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-purple-200 rounded-md bg-white hover:bg-purple-50/50 cursor-pointer transition-colors text-center group">
                    <FileUp className="w-6 h-6 text-[#700070] group-hover:scale-110 transition-transform mb-1" />
                    <span className="text-xs font-bold text-slate-700">
                      Click to choose or drag &amp; drop manuscript file
                    </span>
                    <span className="text-[11px] text-slate-500 mt-0.5">
                      Supports PDF, DOC, DOCX files
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={(e) => handleFileUpload(e, true)}
                      className="hidden"
                    />
                  </label>
                )}

                {/* Optional external PDF URL */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Or External Document URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/papers/sample.pdf"
                    value={editingArticle.pdfUrl || ""}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, pdfUrl: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:border-[#700070] text-xs font-mono"
                  />
                </div>
              </div>

              {/* Abstract */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Abstract
                </label>
                <textarea
                  rows={4}
                  value={editingArticle.abstract || ""}
                  onChange={(e) =>
                    setEditingArticle({ ...editingArticle, abstract: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070] text-xs"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingArticle(null)}
                  className="px-4 py-2 border border-slate-300 rounded text-slate-600 hover:bg-slate-50 cursor-pointer font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#700070] hover:bg-[#550055] text-white font-bold rounded cursor-pointer shadow-sm transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          ADD ISSUE MODAL
         ------------------------------------------------------------- */}
      {newIssueModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 max-w-md w-full p-6 shadow-2xl space-y-4 text-xs">
            <h3 className="font-editorial italic font-bold text-xl text-slate-900">
              Create New Issue
            </h3>

            <form onSubmit={handleAddIssue} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Volume</label>
                  <input
                    type="text"
                    required
                    value={newIssueForm.volume}
                    onChange={(e) => setNewIssueForm({ ...newIssueForm, volume: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Issue</label>
                  <input
                    type="text"
                    required
                    value={newIssueForm.issue}
                    onChange={(e) => setNewIssueForm({ ...newIssueForm, issue: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Month &amp; Year Period</label>
                <input
                  type="text"
                  required
                  value={newIssueForm.period}
                  onChange={(e) => setNewIssueForm({ ...newIssueForm, period: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Issue Theme / Title</label>
                <input
                  type="text"
                  value={newIssueForm.theme}
                  onChange={(e) => setNewIssueForm({ ...newIssueForm, theme: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setNewIssueModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#700070] hover:bg-[#550055] text-white font-bold rounded cursor-pointer"
                >
                  Create Issue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          EDIT ISSUE MODAL (EDIT VOLUME, ISSUE, PERIOD, THEME, STATUS)
         ------------------------------------------------------------- */}
      {editingIssue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 max-w-md w-full p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h3 className="font-editorial italic font-bold text-xl text-slate-900">
                Edit Issue #{editingIssue.id}
              </h3>
              <button
                type="button"
                onClick={() => setEditingIssue(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEditedIssue} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Volume</label>
                  <input
                    type="text"
                    required
                    value={editingIssue.volume}
                    onChange={(e) => setEditingIssue({ ...editingIssue, volume: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Issue</label>
                  <input
                    type="text"
                    required
                    value={editingIssue.issue}
                    onChange={(e) => setEditingIssue({ ...editingIssue, issue: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Period (Month/Year)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. September 2026"
                    value={editingIssue.period}
                    onChange={(e) => setEditingIssue({ ...editingIssue, period: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Publication Date</label>
                  <input
                    type="text"
                    placeholder="e.g. 2026-09-15"
                    value={editingIssue.publicationDate || ""}
                    onChange={(e) => setEditingIssue({ ...editingIssue, publicationDate: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Publication Status</label>
                <select
                  value={editingIssue.status}
                  onChange={(e) => setEditingIssue({ ...editingIssue, status: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070]"
                >
                  <option value="Published">Published</option>
                  <option value="Open for Submissions">Open for Submissions</option>
                  <option value="In Press">In Press</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Theme / Focus Title</label>
                <input
                  type="text"
                  value={editingIssue.theme}
                  onChange={(e) => setEditingIssue({ ...editingIssue, theme: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070]"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete ${editingIssue.volume}, ${editingIssue.issue}?`)) {
                      deleteIssue(editingIssue.id);
                      setEditingIssue(null);
                      showToast(`Issue "${editingIssue.volume}, ${editingIssue.issue}" deleted.`);
                    }
                  }}
                  className="px-3 py-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 border border-rose-200 rounded font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Issue</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingIssue(null)}
                    className="px-3 py-1.5 border border-slate-300 rounded text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#700070] hover:bg-[#550055] text-white font-bold rounded cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          ADD MEMBER MODAL (PHOTO UPLOAD + COMPLETE DETAILS)
         ------------------------------------------------------------- */}
      {newMemberModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 max-w-lg w-full p-6 shadow-2xl space-y-4 text-xs max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div>
                <h3 className="font-editorial italic font-bold text-xl text-slate-900">
                  Add Editorial Board Member
                </h3>
                <p className="text-[11px] text-slate-500">
                  Upload member portrait, configure designation, institutional affiliation, and contact details.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setNewMemberModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-3.5">
              {/* Photo Upload Section */}
              <div className="flex items-center gap-4 p-3 bg-purple-50/50 border border-purple-100 rounded-lg">
                <div className="relative shrink-0">
                  {newMemberForm.photoData || newMemberForm.photoUrl ? (
                    <img
                      src={newMemberForm.photoData || newMemberForm.photoUrl}
                      alt="Preview"
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#700070] shadow-xs"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-purple-200/70 text-[#700070] flex flex-col items-center justify-center border-2 border-dashed border-purple-300">
                      <Camera className="w-5 h-5 text-[#700070]" />
                      <span className="text-[9px] font-bold mt-0.5">Photo</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 space-y-1.5">
                  <span className="block font-bold text-slate-800 text-xs">
                    Member Portrait / Photo
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="px-2.5 py-1 bg-white border border-purple-300 hover:bg-purple-100/50 text-[#700070] rounded font-semibold text-xs cursor-pointer inline-flex items-center gap-1.5 transition-colors">
                      <Camera className="w-3.5 h-3.5" />
                      <span>{newMemberForm.photoData ? "Change Photo" : "Upload Photo"}</span>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/jpg"
                        onChange={(e) => handleMemberPhotoUpload(e, false)}
                        className="hidden"
                      />
                    </label>

                    {(newMemberForm.photoData || newMemberForm.photoUrl) && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMemberPhoto(false)}
                        className="px-2 py-1 text-rose-600 hover:text-rose-800 hover:bg-rose-50 border border-rose-200 rounded text-xs font-semibold"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <input
                    type="url"
                    placeholder="Or paste direct image URL (optional)"
                    value={newMemberForm.photoUrl}
                    onChange={(e) =>
                      setNewMemberForm({ ...newMemberForm, photoUrl: e.target.value })
                    }
                    className="w-full px-2 py-1 border border-slate-200 rounded text-[11px] font-mono bg-white"
                  />
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Full Name &amp; Academic Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Deepak Setia / Prof. Sunita Rao"
                  value={newMemberForm.name}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070] text-xs font-medium"
                />
              </div>

              {/* Role / Designation */}
              {/* Role & Academic Designation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Journal Role <span className="text-rose-500">*</span>
                  </label>
                  <div className="space-y-1.5">
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          setNewMemberForm({ ...newMemberForm, role: e.target.value });
                        }
                      }}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs bg-white"
                    >
                      <option value="">-- Select Preset Role --</option>
                      <option value="Editor-in-Chief">Editor-in-Chief</option>
                      <option value="Associate Editor">Associate Editor</option>
                      <option value="Editorial Board Member">Editorial Board Member</option>
                      <option value="Senior Advisory Board Member">Senior Advisory Board Member</option>
                      <option value="Executive Reviewer">Executive Reviewer</option>
                    </select>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Editor-in-Chief"
                      value={newMemberForm.role}
                      onChange={(e) => setNewMemberForm({ ...newMemberForm, role: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:border-[#700070] text-xs font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Academic Designation (Post) <span className="text-rose-500">*</span>
                  </label>
                  <div className="space-y-1.5">
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          setNewMemberForm({ ...newMemberForm, designation: e.target.value });
                        }
                      }}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs bg-white"
                    >
                      <option value="">-- Select Academic Post --</option>
                      <option value="Assistant Professor">Assistant Professor</option>
                      <option value="Associate Professor">Associate Professor</option>
                      <option value="Professor">Professor</option>
                      <option value="Professor & Head">Professor & Head</option>
                      <option value="Senior Research Fellow">Senior Research Fellow</option>
                    </select>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Assistant Professor"
                      value={newMemberForm.designation}
                      onChange={(e) => setNewMemberForm({ ...newMemberForm, designation: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:border-[#700070] text-xs font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Institutional Affiliation */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Institutional Affiliation <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Department of Social Sciences, Delhi University / Manthan Journal"
                  value={newMemberForm.affiliation}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, affiliation: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070] text-xs"
                />
              </div>

              {/* Specialization Area & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Specialization / Subject Area</label>
                  <input
                    type="text"
                    placeholder="e.g. Social Sciences & Interdisciplinary Inquiry"
                    value={newMemberForm.specialization}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, specialization: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:border-[#700070] text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Official Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. editor@manthanjournal.com"
                    value={newMemberForm.email}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, email: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:border-[#700070] text-xs font-mono"
                  />
                </div>
              </div>

              {/* Official Website URL */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Official Website / Faculty Profile Link (Optional)
                </label>
                <input
                  type="url"
                  placeholder="e.g. https://rlacollege.edu.in/faculty/dr-deepak-setia"
                  value={newMemberForm.websiteUrl}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, websiteUrl: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:border-[#700070] text-xs font-mono"
                />
              </div>

              {/* ORCID & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">ORCID / Scholar Profile Link</label>
                  <input
                    type="text"
                    placeholder="e.g. https://orcid.org/0000-0002-..."
                    value={newMemberForm.orcid}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, orcid: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:border-[#700070] text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone / Contact (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. +91 98765 43210"
                    value={newMemberForm.phone}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, phone: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:border-[#700070] text-xs"
                  />
                </div>
              </div>

              {/* Bio Summary */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Brief Academic Bio / Profile</label>
                <textarea
                  rows={2}
                  placeholder="Brief scholarly background, notable research contributions, and affiliations..."
                  value={newMemberForm.bio}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, bio: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded focus:border-[#700070] text-xs"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setNewMemberModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#700070] hover:bg-[#550055] text-white font-bold rounded cursor-pointer shadow-xs transition-colors"
                >
                  Add Member to Board
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          EDIT MEMBER MODAL (PHOTO UPLOAD, EDIT DETAILS & DELETE)
         ------------------------------------------------------------- */}
      {editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 max-w-lg w-full p-6 shadow-2xl space-y-4 text-xs max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div>
                <h3 className="font-editorial italic font-bold text-xl text-slate-900">
                  Edit Editorial Member
                </h3>
                <p className="text-[11px] text-slate-500">
                  Update photo, name, role, institutional affiliation, specialization, and credentials.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingMember(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEditedMember} className="space-y-3.5">
              {/* Photo Upload Section */}
              <div className="flex items-center gap-4 p-3 bg-purple-50/50 border border-purple-100 rounded-lg">
                <div className="relative shrink-0">
                  {editingMember.photoData || editingMember.photoUrl ? (
                    <img
                      src={editingMember.photoData || editingMember.photoUrl}
                      alt={editingMember.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#700070] shadow-xs"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-purple-200/70 text-[#700070] flex flex-col items-center justify-center border-2 border-dashed border-purple-300">
                      <Camera className="w-5 h-5 text-[#700070]" />
                      <span className="text-[9px] font-bold mt-0.5">Photo</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 space-y-1.5">
                  <span className="block font-bold text-slate-800 text-xs">
                    Member Portrait / Photo
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="px-2.5 py-1 bg-white border border-purple-300 hover:bg-purple-100/50 text-[#700070] rounded font-semibold text-xs cursor-pointer inline-flex items-center gap-1.5 transition-colors">
                      <Camera className="w-3.5 h-3.5" />
                      <span>{editingMember.photoData ? "Change Photo" : "Upload Photo"}</span>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/jpg"
                        onChange={(e) => handleMemberPhotoUpload(e, true)}
                        className="hidden"
                      />
                    </label>

                    {(editingMember.photoData || editingMember.photoUrl) && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMemberPhoto(true)}
                        className="px-2 py-1 text-rose-600 hover:text-rose-800 hover:bg-rose-50 border border-rose-200 rounded text-xs font-semibold"
                      >
                        Remove Photo
                      </button>
                    )}
                  </div>
                  <input
                    type="url"
                    placeholder="Or paste direct image URL"
                    value={editingMember.photoUrl || ""}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, photoUrl: e.target.value })
                    }
                    className="w-full px-2 py-1 border border-slate-200 rounded text-[11px] font-mono bg-white"
                  />
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Full Name &amp; Academic Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingMember.name}
                  onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070] text-xs font-medium"
                />
              </div>

              {/* Role & Academic Designation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Journal Role <span className="text-rose-500">*</span>
                  </label>
                  <div className="space-y-1.5">
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          setEditingMember({ ...editingMember, role: e.target.value });
                        }
                      }}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs bg-white"
                    >
                      <option value="">-- Choose Role Preset --</option>
                      <option value="Editor-in-Chief">Editor-in-Chief</option>
                      <option value="Associate Editor">Associate Editor</option>
                      <option value="Editorial Board Member">Editorial Board Member</option>
                      <option value="Senior Advisory Board Member">Senior Advisory Board Member</option>
                      <option value="Executive Reviewer">Executive Reviewer</option>
                    </select>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Editor-in-Chief"
                      value={editingMember.role || ""}
                      onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:border-[#700070] text-xs font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Academic Designation (Post) <span className="text-rose-500">*</span>
                  </label>
                  <div className="space-y-1.5">
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          setEditingMember({ ...editingMember, designation: e.target.value });
                        }
                      }}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs bg-white"
                    >
                      <option value="">-- Select Academic Post --</option>
                      <option value="Assistant Professor">Assistant Professor</option>
                      <option value="Associate Professor">Associate Professor</option>
                      <option value="Professor">Professor</option>
                      <option value="Professor & Head">Professor & Head</option>
                      <option value="Senior Research Fellow">Senior Research Fellow</option>
                    </select>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Assistant Professor"
                      value={editingMember.designation || ""}
                      onChange={(e) => setEditingMember({ ...editingMember, designation: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:border-[#700070] text-xs font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Institutional Affiliation */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Institutional Affiliation <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingMember.affiliation || ""}
                  onChange={(e) => setEditingMember({ ...editingMember, affiliation: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070] text-xs"
                />
              </div>

              {/* Specialization & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Specialization / Subject Area</label>
                  <input
                    type="text"
                    value={editingMember.specialization || ""}
                    onChange={(e) => setEditingMember({ ...editingMember, specialization: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:border-[#700070] text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={editingMember.email || ""}
                    onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:border-[#700070] text-xs font-mono"
                  />
                </div>
              </div>

              {/* Official Website URL */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Official Website / Faculty Profile Link (Optional)
                </label>
                <input
                  type="url"
                  placeholder="e.g. https://rlacollege.edu.in/faculty/dr-deepak-setia"
                  value={editingMember.websiteUrl || ""}
                  onChange={(e) => setEditingMember({ ...editingMember, websiteUrl: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:border-[#700070] text-xs font-mono"
                />
              </div>

              {/* ORCID & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">ORCID / Scholar Link</label>
                  <input
                    type="text"
                    placeholder="e.g. https://orcid.org/0000-0002-..."
                    value={editingMember.orcid || ""}
                    onChange={(e) => setEditingMember({ ...editingMember, orcid: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:border-[#700070] text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone / WhatsApp</label>
                  <input
                    type="text"
                    placeholder="e.g. +91 98765 43210"
                    value={editingMember.phone || ""}
                    onChange={(e) => setEditingMember({ ...editingMember, phone: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:border-[#700070] text-xs"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Brief Academic Bio / Profile</label>
                <textarea
                  rows={2}
                  placeholder="Scholarly background, affiliations..."
                  value={editingMember.bio || ""}
                  onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded focus:border-[#700070] text-xs"
                />
              </div>

              {/* Actions with Delete Button */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete ${editingMember.name}? This will remove them from the editorial board.`)) {
                      deleteMember(editingMember.id);
                      setEditingMember(null);
                      showToast(`Removed "${editingMember.name}" from editorial board.`);
                    }
                  }}
                  className="px-3 py-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 border border-rose-200 rounded font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Member</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingMember(null)}
                    className="px-4 py-2 border border-slate-300 rounded text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#700070] hover:bg-[#550055] text-white font-bold rounded cursor-pointer shadow-xs transition-colors"
                  >
                    Save Member Info
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
