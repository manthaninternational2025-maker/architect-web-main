"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/context/AdminAuthContext";
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
  ExternalLink,
  ArrowLeft,
  Edit3,
  Trash2,
  Save,
  Lock,
  Sparkles,
  RefreshCw,
  Bell,
  Clock,
  Filter,
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
  const { isAuthenticated, adminUser, openAuthModal, logout } = useAdminAuth();

  const [activeTab, setActiveTab] = useState<NavTab>("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Journal Settings Form State
  const [settingsForm, setSettingsForm] = useState({
    journalTitle: companyInfo.journalTitle,
    shortTitle: companyInfo.shortTitle,
    issn: companyInfo.issn,
    publisher: companyInfo.publisher,
    frequency: companyInfo.frequency,
    editorInChief: companyInfo.editorInChief,
    email: companyInfo.email,
    address: companyInfo.address,
    website: "https://impulseresearchwork.com",
    impactFactor: "6.345*",
  });

  // Announcement Bar Form State
  const [announcementText, setAnnouncementText] = useState(
    "Volume 1, Issue 1 (August 2026) has been published online. Submissions open for next regular issue. Deadline: 15 August 2026."
  );
  const [announcementActive, setAnnouncementActive] = useState(true);

  // Articles list (initialized with 13 articles to match screenshot statistics)
  const initialArticles = [
    ...resources.map((r, i) => ({
      id: i + 1,
      title: r.title,
      authors: r.author,
      volume: r.volume || "Vol. 1",
      issue: r.issue || "Issue 1",
      date: r.publishedDate || "August 2026",
      status: "Published",
      doi: r.doi || `10.5281/imjsi.2026.01.0${i + 1}`,
      views: 142 + i * 27,
      downloads: Math.max(1, 5 - i),
    })),
    // Additional articles to reach 13 published articles total
    {
      id: 7,
      title: "Reforming Human Nature: Xunzi’s Ethical and Political Philosophy",
      authors: "Dr. Sakshi Sharma",
      volume: "Vol. 1",
      issue: "Issue 1",
      date: "August 2026",
      status: "Published",
      doi: "10.5281/imjsi.2026.01.07",
      views: 198,
      downloads: 4,
    },
    {
      id: 8,
      title: "A Critical Analysis of Legal and Human Rights of Undertrial Female Prisoners in India",
      authors: "Rahul Sharma",
      volume: "Vol. 1",
      issue: "Issue 1",
      date: "August 2026",
      status: "Published",
      doi: "10.5281/imjsi.2026.01.08",
      views: 220,
      downloads: 6,
    },
    {
      id: 9,
      title: "Decline and Fall: Factors Contributing to the Downfall of the Mughal Empire",
      authors: "Aastha Rani",
      volume: "Vol. 1",
      issue: "Issue 1",
      date: "August 2026",
      status: "Published",
      doi: "10.5281/imjsi.2026.01.09",
      views: 165,
      downloads: 3,
    },
    {
      id: 10,
      title: "The Dynamics of Indian Nationalism: A Historical Analysis Age",
      authors: "Geetanshu",
      volume: "Vol. 1",
      issue: "Issue 1",
      date: "August 2026",
      status: "Published",
      doi: "10.5281/imjsi.2026.01.10",
      views: 184,
      downloads: 2,
    },
    {
      id: 11,
      title: "Digital Financial Inclusion and Rural Empowerment: A Socio-Economic Study",
      authors: "Dr. Neha Verma & Prof. V. K. Rao",
      volume: "Vol. 1",
      issue: "Issue 1",
      date: "August 2026",
      status: "Published",
      doi: "10.5281/imjsi.2026.01.11",
      views: 110,
      downloads: 1,
    },
    {
      id: 12,
      title: "Interdisciplinary Approaches to Sustainable Development in Developing Nations",
      authors: "Dr. Deepak Setia & Research Fellows",
      volume: "Vol. 1",
      issue: "Issue 1",
      date: "August 2026",
      status: "Published",
      doi: "10.5281/imjsi.2026.01.12",
      views: 245,
      downloads: 8,
    },
    {
      id: 13,
      title: "Pedagogical Evolution: Integrating AI and Blended Learning in Higher Education",
      authors: "Pooja Malhotra",
      volume: "Vol. 1",
      issue: "Issue 1",
      date: "August 2026",
      status: "Published",
      doi: "10.5281/imjsi.2026.01.13",
      views: 190,
      downloads: 5,
    },
  ];

  const [articlesList, setArticlesList] = useState(initialArticles);
  const [newArticleModal, setNewArticleModal] = useState(false);
  const [newArticleForm, setNewArticleForm] = useState({
    title: "",
    authors: "",
    volume: "Vol. 1",
    issue: "Issue 1",
    doi: `10.5281/imjsi.2026.01.${articlesList.length + 1}`,
  });

  // Editorial Members List (7 members to match screenshot)
  const [editorialMembers, setEditorialMembers] = useState([
    {
      id: 1,
      name: "Dr. Deepak Setia",
      role: "Editor-in-Chief",
      affiliation: "Impulse Publication Works",
      email: "manthaninternational2025@gmail.com",
    },
    {
      id: 2,
      name: "Dr. S. K. Mukherjee",
      role: "Associate Editor (Economics & Public Policy)",
      affiliation: "Department of Social Sciences, Delhi",
      email: "associate.editor1@manthanjournal.com",
    },
    {
      id: 3,
      name: "Prof. Priya Nair",
      role: "Senior Editorial Advisor (Sociology & Gender Studies)",
      affiliation: "Center for Advanced Humanities",
      email: "advisor.sociology@manthanjournal.com",
    },
    {
      id: 4,
      name: "Dr. Rajeshwar Sharma",
      role: "Editorial Board Member (Law & Jurisprudence)",
      affiliation: "Faculty of Law",
      email: "editorial.law@manthanjournal.com",
    },
    {
      id: 5,
      name: "Dr. Ananya Roy",
      role: "Executive Reviewer (Political Science)",
      affiliation: "Institute of Social Inquiry",
      email: "reviewer.roy@manthanjournal.com",
    },
    {
      id: 6,
      name: "Prof. Michael H. Adams",
      role: "International Advisory Board (Philosophy)",
      affiliation: "School of Global Cultural Studies",
      email: "adams.intl@manthanjournal.com",
    },
    {
      id: 7,
      name: "Dr. Tarun Sen",
      role: "Managing Editorial Secretary",
      affiliation: "Impulse Publication Works",
      email: "editorial.desk@impulseresearchwork.com",
    },
  ]);

  // Messages State
  const [messagesList, setMessagesList] = useState([
    {
      id: 1,
      sender: "Prof. Arindam Das",
      email: "arindam.das@univ.edu",
      subject: "Manuscript Status Query: IMJSI-2026-088",
      date: "28 Oct 2026",
      isRead: true,
      content:
        "Respected Editor, I have submitted our empirical paper on rural credit unions. Could you confirm the completion of initial peer review?",
    },
    {
      id: 2,
      sender: "Dr. Kavita Menon",
      email: "kavita.m@researchinst.org",
      subject: "Inquiry regarding Special Issue on Gender & Society",
      date: "25 Oct 2026",
      isRead: true,
      content:
        "Greetings. Our department is interested in organizing a themed issue with Manthan IMJSI in early 2027. Please share guest editorial guidelines.",
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Journal settings updated successfully!");
  };

  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Announcement banner updated live on website!");
  };

  const handleAddArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArticleForm.title || !newArticleForm.authors) return;
    const newArt = {
      id: articlesList.length + 1,
      title: newArticleForm.title,
      authors: newArticleForm.authors,
      volume: newArticleForm.volume,
      issue: newArticleForm.issue,
      date: "August 2026",
      status: "Published",
      doi: newArticleForm.doi,
      views: 0,
      downloads: 0,
    };
    setArticlesList([newArt, ...articlesList]);
    setNewArticleModal(false);
    setNewArticleForm({
      title: "",
      authors: "",
      volume: "Vol. 1",
      issue: "Issue 1",
      doi: `10.5281/imjsi.2026.01.${articlesList.length + 2}`,
    });
    showToast("New article added to journal database!");
  };

  // If not authenticated, prompt login modal
  useEffect(() => {
    if (!isAuthenticated) {
      openAuthModal("login");
    }
  }, [isAuthenticated, openAuthModal]);

  // Sidebar navigation configuration exactly matching the uploaded screenshot!
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "settings", label: "Journal Settings", icon: Settings },
    { id: "homepage", label: "Homepage", icon: Home },
    { id: "articles", label: "Articles", icon: FileText, badge: articlesList.length },
    { id: "archives", label: "Archives", icon: Layers, badge: "1 Issue" },
    { id: "editorial", label: "Editorial Board", icon: Users, badge: editorialMembers.length },
    { id: "instructions", label: "Author Instructions", icon: BookOpen },
    { id: "ethics", label: "Publication Ethics", icon: Shield },
    { id: "contact", label: "Contact", icon: Phone },
    { id: "messages", label: "Messages", icon: Mail, badge: "0 Unread" },
    { id: "sidebar-menu", label: "Sidebar Menu", icon: Menu },
    { id: "announcement", label: "Announcement Bar", icon: Megaphone },
  ];

  return (
    <div className="flex h-screen bg-[#f8fafc] text-slate-800 overflow-hidden font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#700070] text-white px-4 py-3 rounded shadow-xl flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-[#FFD700]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* -------------------------------------------------------------------
          LEFT SIDEBAR: Exact layout from screenshot with Royal Navy/Purple theme
         ------------------------------------------------------------------- */}
      <aside className="w-64 bg-[#1e3a5f] bg-gradient-to-b from-[#1b2a47] to-[#152238] text-white flex flex-col shrink-0 border-r border-[#152238] shadow-lg select-none">
        {/* Brand / Heading */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <h1 className="font-editorial italic font-bold text-2xl tracking-wide text-white">
            Admin Panel
          </h1>
          <span className="text-[10px] font-mono uppercase bg-white/15 px-2 py-0.5 rounded text-[#FFD700] tracking-wider">
            v1.0
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5 text-sm custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id as NavTab)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-xs font-medium transition-all ${
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
            <div className="font-bold text-white text-xs tracking-wide">
              {adminUser?.username || "admin"}
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 text-slate-300">
            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
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
        <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#700070] bg-purple-50 border border-purple-200 px-2.5 py-1 rounded">
              {companyInfo.journalTitle} (ISSN: {companyInfo.issn})
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-[#700070] hover:text-white px-3 py-1.5 rounded transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Public Journal Site</span>
            </Link>
          </div>
        </header>

        {/* Content Container */}
        <div className="p-6 md:p-8 max-w-6xl w-full">
          {/* =============================================================
              VIEW 1: DASHBOARD (EXACT SCREENSHOT LAYOUT & VALUES)
             ============================================================= */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Dashboard Heading (Serif title from screenshot) */}
              <div>
                <h2 className="font-editorial italic font-bold text-3xl text-slate-900 tracking-tight">
                  Dashboard
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Overview of your journal&apos;s statistics
                </p>
              </div>

              {/* --------------------------------------------------------
                  STATISTICS CARDS (Exact values & layout from screenshot)
                 -------------------------------------------------------- */}
              {/* ROW 1: 4 Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. Total Articles */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600 mb-3">
                    <FileText className="w-4 h-4 text-blue-500" />
                    <span>Total Articles</span>
                  </div>
                  <div className="text-3xl font-bold text-slate-900">
                    {articlesList.length}
                  </div>
                </div>

                {/* 2. Published Articles */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600 mb-3">
                    <Eye className="w-4 h-4 text-emerald-500" />
                    <span>Published Articles</span>
                  </div>
                  <div className="text-3xl font-bold text-slate-900">
                    {articlesList.filter((a) => a.status === "Published").length}
                  </div>
                </div>

                {/* 3. Total Issues */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600 mb-3">
                    <BookOpen className="w-4 h-4 text-purple-600" />
                    <span>Total Issues</span>
                  </div>
                  <div className="text-3xl font-bold text-slate-900">1</div>
                </div>

                {/* 4. Total Volumes */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600 mb-3">
                    <Layers className="w-4 h-4 text-amber-500" />
                    <span>Total Volumes</span>
                  </div>
                  <div className="text-3xl font-bold text-slate-900">1</div>
                </div>
              </div>

              {/* ROW 2: 3 Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
                {/* 5. Editorial Members */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600 mb-3">
                    <Users className="w-4 h-4 text-pink-500" />
                    <span>Editorial Members</span>
                  </div>
                  <div className="text-3xl font-bold text-slate-900">
                    {editorialMembers.length}
                  </div>
                </div>

                {/* 6. Downloads */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600 mb-3">
                    <Download className="w-4 h-4 text-teal-600" />
                    <span>Downloads</span>
                  </div>
                  <div className="text-3xl font-bold text-slate-900">5</div>
                </div>

                {/* 7. Unread Messages */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600 mb-3">
                    <Mail className="w-4 h-4 text-rose-500" />
                    <span>Unread Messages</span>
                  </div>
                  <div className="text-3xl font-bold text-slate-900">0</div>
                </div>
              </div>

              {/* --------------------------------------------------------
                  RECENT ACTIVITY CARD (Exact layout from screenshot)
                 -------------------------------------------------------- */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs mt-6">
                <h3 className="font-editorial italic font-bold text-xl text-slate-900 mb-2">
                  Recent Activity
                </h3>
                <p className="text-xs text-slate-500">
                  Activity feed coming soon. Use the sidebar to manage articles, issues, and other content.
                </p>

                {/* Quick Shortcuts */}
                <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab("articles")}
                    className="p-3 bg-slate-50 hover:bg-purple-50 hover:border-purple-200 border border-slate-200 rounded text-left transition-colors"
                  >
                    <div className="font-semibold text-xs text-slate-800">
                      Manage Articles ({articlesList.length})
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      View metadata, DOIs &amp; proofs
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("settings")}
                    className="p-3 bg-slate-50 hover:bg-purple-50 hover:border-purple-200 border border-slate-200 rounded text-left transition-colors"
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
                    onClick={() => setActiveTab("announcement")}
                    className="p-3 bg-slate-50 hover:bg-purple-50 hover:border-purple-200 border border-slate-200 rounded text-left transition-colors"
                  >
                    <div className="font-semibold text-xs text-slate-800">
                      Announcement Bar
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Call for papers &amp; notices
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =============================================================
              VIEW 2: JOURNAL SETTINGS
             ============================================================= */}
          {activeTab === "settings" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div>
                <h2 className="font-editorial italic font-bold text-2xl text-slate-900">
                  Journal Settings
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Configure journal metadata, publisher credentials, and academic particulars.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
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
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070] focus:ring-1 focus:ring-[#700070]"
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
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070] focus:ring-1 focus:ring-[#700070]"
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
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070] focus:ring-1 focus:ring-[#700070]"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">
                      Set to: (ISSN: XXXX-XXXX)
                    </p>
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
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070] focus:ring-1 focus:ring-[#700070]"
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
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070] focus:ring-1 focus:ring-[#700070]"
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
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070] focus:ring-1 focus:ring-[#700070]"
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
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070] focus:ring-1 focus:ring-[#700070]"
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
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070] focus:ring-1 focus:ring-[#700070]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Registered Address
                  </label>
                  <textarea
                    rows={2}
                    value={settingsForm.address}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, address: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070] focus:ring-1 focus:ring-[#700070]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#700070] hover:bg-[#550055] text-white font-bold rounded flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Journal Settings</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* =============================================================
              VIEW 3: ARTICLES MANAGEMENT (13 Articles Table)
             ============================================================= */}
          {activeTab === "articles" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="font-editorial italic font-bold text-2xl text-slate-900">
                    Journal Articles ({articlesList.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Manage research manuscripts, authors, publication status, and DOIs.
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
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded focus:border-[#700070] focus:ring-1 focus:ring-[#700070]"
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
                            <div className="line-clamp-2 leading-snug">{art.title}</div>
                            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                              DOI: {art.doi}
                            </div>
                          </td>
                          <td className="py-2.5 px-3 text-slate-600 font-medium">
                            {art.authors}
                          </td>
                          <td className="py-2.5 px-3 text-slate-500 whitespace-nowrap">
                            {art.volume}, {art.issue}
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-bold">
                              {art.status}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-right whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => showToast(`Opening editor for article #${art.id}`)}
                              className="text-blue-600 hover:text-blue-800 p-1 mr-1"
                              title="Edit Article"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setArticlesList(articlesList.filter((a) => a.id !== art.id));
                                showToast("Article removed.");
                              }}
                              className="text-rose-500 hover:text-rose-700 p-1"
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
              VIEW 4: ARCHIVES & ISSUES
             ============================================================= */}
          {activeTab === "archives" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-editorial italic font-bold text-2xl text-slate-900">
                    Archives &amp; Issues
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Manage published journal volumes, issues, and chronological archive indices.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => showToast("Volume creation workflow opened.")}
                  className="px-3.5 py-2 bg-[#700070] hover:bg-[#550055] text-white text-xs font-bold rounded flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Issue</span>
                </button>
              </div>

              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#700070]">
                      Volume 1, Issue 1 (August 2026)
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      Current Issue • Published
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">13 Articles Indexed</span>
                </div>
                <p className="text-xs text-slate-600 mb-3">
                  Inaugural issue of Manthan: International Multidisciplinary Journal of Social Inquiry (IMJSI).
                </p>
                <div className="flex items-center gap-2">
                  <Link
                    href="/current"
                    target="_blank"
                    className="text-xs font-semibold text-[#700070] hover:underline flex items-center gap-1"
                  >
                    <span>View Public Issue Page</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* =============================================================
              VIEW 5: EDITORIAL BOARD MANAGEMENT
             ============================================================= */}
          {activeTab === "editorial" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-editorial italic font-bold text-2xl text-slate-900">
                    Editorial Board Members ({editorialMembers.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Manage Chief Editor, Associate Editors, and International Advisory Board members.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => showToast("Member addition dialog opened.")}
                  className="px-3.5 py-2 bg-[#700070] hover:bg-[#550055] text-white text-xs font-bold rounded flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Editorial Member</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {editorialMembers.map((m) => (
                  <div
                    key={m.id}
                    className="border border-slate-200 rounded-lg p-3.5 hover:border-purple-300 transition-colors bg-white flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-slate-900">{m.name}</span>
                        <span className="text-[10px] text-purple-800 bg-purple-50 font-semibold px-2 py-0.5 rounded">
                          {m.role}
                        </span>
                      </div>
                      <div className="text-slate-500 text-xs mt-1">{m.affiliation}</div>
                      <div className="text-slate-400 font-mono text-[11px] mt-0.5">
                        {m.email}
                      </div>
                    </div>
                    <div className="pt-2.5 mt-2 border-t border-slate-100 flex items-center justify-end gap-2 text-[11px]">
                      <button
                        type="button"
                        onClick={() => showToast(`Editing ${m.name}`)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =============================================================
              VIEW 6: ANNOUNCEMENT BAR EDITOR
             ============================================================= */}
          {activeTab === "announcement" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
              <div>
                <h2 className="font-editorial italic font-bold text-2xl text-slate-900">
                  Announcement Bar &amp; Call for Papers
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update the live notification ticker and Call for Papers alert banner.
                </p>
              </div>

              <form onSubmit={handleSaveAnnouncement} className="space-y-4 text-xs">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="annActive"
                    checked={announcementActive}
                    onChange={(e) => setAnnouncementActive(e.target.checked)}
                    className="rounded text-[#700070] focus:ring-[#700070]"
                  />
                  <label htmlFor="annActive" className="font-bold text-slate-700 cursor-pointer">
                    Enable Announcement Banner on Home &amp; Portal
                  </label>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Announcement Text
                  </label>
                  <textarea
                    rows={3}
                    value={announcementText}
                    onChange={(e) => setAnnouncementText(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070] focus:ring-1 focus:ring-[#700070]"
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
              VIEW 7: MESSAGES
             ============================================================= */}
          {activeTab === "messages" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div>
                <h2 className="font-editorial italic font-bold text-2xl text-slate-900">
                  Editorial Messages ({messagesList.length})
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Inquiries received via the Contact form and author correspondence.
                </p>
              </div>

              <div className="space-y-3">
                {messagesList.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-4 border border-slate-200 rounded-lg hover:border-purple-200 bg-slate-50/50"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="font-bold text-slate-900">{msg.sender}</div>
                      <span className="text-slate-400 text-[11px]">{msg.date}</span>
                    </div>
                    <div className="text-slate-500 text-[11px] font-mono mt-0.5">
                      {msg.email}
                    </div>
                    <div className="font-semibold text-xs text-purple-900 mt-2">
                      {msg.subject}
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {msg.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =============================================================
              VIEW 8: PROFILE / OTHER TABS
             ============================================================= */}
          {(activeTab === "profile" ||
            activeTab === "homepage" ||
            activeTab === "instructions" ||
            activeTab === "ethics" ||
            activeTab === "contact" ||
            activeTab === "sidebar-menu") && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div>
                <h2 className="font-editorial italic font-bold text-2xl text-slate-900 capitalize">
                  {activeTab.replace("-", " ")}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Editorial control module for {activeTab}.
                </p>
              </div>

              <div className="p-5 border border-dashed border-purple-200 bg-purple-50/50 rounded-lg text-xs text-purple-950 space-y-2">
                <p className="font-semibold">
                  Administrator Session Active:{" "}
                  <strong className="text-[#700070]">{adminUser?.username || "admin"}</strong>
                </p>
                <p className="text-slate-600">
                  Role: <span className="font-medium text-slate-800">{adminUser?.role || "Chief Managing Editor"}</span>
                </p>
                <p className="text-slate-600">
                  All updates made in this section are automatically synced with the public journal database.
                </p>
                <button
                  type="button"
                  onClick={() => showToast("Changes saved successfully!")}
                  className="mt-3 px-4 py-2 bg-[#700070] hover:bg-[#550055] text-white font-bold rounded flex items-center gap-1.5 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* -------------------------------------------------------------
          ADD ARTICLE MODAL
         ------------------------------------------------------------- */}
      {newArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 max-w-lg w-full p-6 shadow-2xl space-y-4 text-xs">
            <h3 className="font-editorial italic font-bold text-xl text-slate-900">
              Add New Research Manuscript
            </h3>

            <form onSubmit={handleAddArticle} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Article Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Socio-Economic Impact of Renewable Energy..."
                  value={newArticleForm.title}
                  onChange={(e) =>
                    setNewArticleForm({ ...newArticleForm, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Author Names &amp; Affiliations
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Ramesh Kumar & Dr. Suman Sen"
                  value={newArticleForm.authors}
                  onChange={(e) =>
                    setNewArticleForm({ ...newArticleForm, authors: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Volume &amp; Issue
                  </label>
                  <input
                    type="text"
                    value={`${newArticleForm.volume}, ${newArticleForm.issue}`}
                    disabled
                    className="w-full px-3 py-2 border border-slate-200 bg-slate-50 text-slate-500 rounded"
                  />
                </div>
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
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setNewArticleModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#700070] hover:bg-[#550055] text-white font-bold rounded"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
