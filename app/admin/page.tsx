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
  ArrowLeft,
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
  // 1. JOURNAL SETTINGS STATE
  // -------------------------------------------------------------
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
    impactFactor: "xxxx*",
    subject: "Humanities, Social Sciences, Economics, Political Science, History, Philosophy, Commerce, Law, Management & Multidisciplinary Studies",
    language: "English / Multilingual",
    startingYear: "2026",
    plagiarismTool: "PlagiarismCheckerX / Turnitin / Drillbit",
  });

  // -------------------------------------------------------------
  // 2. HOMEPAGE SECTIONS STATE
  // -------------------------------------------------------------
  const [homepageState, setHomepageState] = useState({
    callForPapersHeadline: "Call for Papers: Volume 1, Issue 2 (August 2026)",
    callForPapersDeadline: "15 August 2026",
    callForPapersEmail: companyInfo.email,
    callForPapersActive: true,
    introP1: `${companyInfo.journalTitle} (ISSN: ${companyInfo.issn}) is an open access peer reviewed refereed journal.`,
    introP2: `The aim of ${companyInfo.journalTitle} (ISSN: ${companyInfo.issn}) is to encourage scientists, academicians and students to publish their experimental and theoretical details. It provides an advanced knowledge platform for the Social Sciences, Humanities, Management, Commerce, Education & Multidisciplinary Research professionals.`,
    aboutText: `${companyInfo.journalTitle}, refereed, peer reviewed, open access journal. Researches in the field of humanities, social science, Community and Consumer Sciences, Economics, Political Science, Geography, Philosophy, History, Humanity and Languages concerning with social science, Anthropological, Behavioral Sciences, Sociology, Journalism and Role of Media in social science. Educational Sciences: For School Students, Women, Village and Society, Commerce, Law and Management related with humanities and social science.`,
    policyText: "The journal publishes original research papers, review articles, case studies, and book reviews adhering to rigorous peer-review and ethical publishing standards. Authors must ensure work is original and properly cited.",
  });

  // -------------------------------------------------------------
  // 3. ANNOUNCEMENT BAR STATE
  // -------------------------------------------------------------
  const [announcementState, setAnnouncementState] = useState({
    active: true,
    text: "Volume 1, Issue 1 (August 2026) has been published online. Submissions open for next regular issue. Deadline: 15 August 2026.",
    badge: "Call for Papers",
    deadline: "15 August 2026",
    contactEmail: companyInfo.email,
  });

  // -------------------------------------------------------------
  // 4. ARTICLES STATE & EDIT MODALS
  // -------------------------------------------------------------
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
      abstract: r.sections?.[0]?.content || "Abstract content registered.",
      views: 142 + i * 27,
      downloads: Math.max(1, 5 - i),
    })),
    {
      id: 7,
      title: "Reforming Human Nature: Xunzi’s Ethical and Political Philosophy",
      authors: "Dr. Sakshi Sharma",
      volume: "Vol. 1",
      issue: "Issue 1",
      date: "August 2026",
      status: "Published",
      doi: "10.5281/imjsi.2026.01.07",
      abstract: "An exploration of Xunzi's moral philosophy concerning ritual norms and governance.",
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
      abstract: "Empirical socio-legal inquiry into undertrial conditions and institutional reform.",
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
      abstract: "Historiographical reassessment of agrarian crises and administrative decay.",
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
      abstract: "Investigation of regional consciousness and mass mobilization.",
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
      abstract: "Socio-economic evaluation of digital credit and microfinance initiatives.",
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
      abstract: "Integrated frameworks harmonizing environmental resilience and economic policy.",
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
      abstract: "Curricular paradigms and ethical considerations in automated higher education.",
      views: 190,
      downloads: 5,
    },
  ];

  const [articlesList, setArticlesList] = useState(initialArticles);
  const [newArticleModal, setNewArticleModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState<any | null>(null);

  const [newArticleForm, setNewArticleForm] = useState({
    title: "",
    authors: "",
    volume: "Vol. 1",
    issue: "Issue 1",
    doi: `10.5281/imjsi.2026.01.${articlesList.length + 1}`,
    abstract: "",
    status: "Published",
  });

  // -------------------------------------------------------------
  // 5. ARCHIVES & ISSUES STATE
  // -------------------------------------------------------------
  const [issuesList, setIssuesList] = useState([
    {
      id: 1,
      volume: "Volume 1",
      issue: "Issue 1",
      period: "August 2026",
      publicationDate: "2026-08-01",
      status: "Published",
      articlesCount: 13,
      theme: "Inaugural Multidisciplinary Social Inquiry Issue",
      pdfUrl: "/archives/vol1-iss1.pdf",
    },
    {
      id: 2,
      volume: "Volume 1",
      issue: "Issue 2",
      period: "September 2026",
      publicationDate: "2026-09-01",
      status: "Open for Submissions",
      articlesCount: 0,
      theme: "Contemporary Perspectives in Social Governance & Economics",
      pdfUrl: "",
    },
  ]);
  const [newIssueModal, setNewIssueModal] = useState(false);
  const [newIssueForm, setNewIssueForm] = useState({
    volume: "Volume 1",
    issue: "Issue 2",
    period: "September 2026",
    publicationDate: "2026-09-15",
    theme: "General Research Papers",
    status: "Open for Submissions",
  });

  // -------------------------------------------------------------
  // 6. EDITORIAL BOARD STATE
  // -------------------------------------------------------------
  const [editorialMembers, setEditorialMembers] = useState([
    {
      id: 1,
      name: "Dr. Deepak Setia",
      role: "Editor-in-Chief",
      affiliation: "Impulse Publication Works",
      email: "manthaninternational2025@gmail.com",
      specialization: "Social Sciences & Interdisciplinary Inquiry",
    },
    {
      id: 2,
      name: "Dr. S. K. Mukherjee",
      role: "Associate Editor",
      affiliation: "Department of Social Sciences, Delhi",
      email: "associate.editor1@manthanjournal.com",
      specialization: "Economics & Public Policy",
    },
    {
      id: 3,
      name: "Prof. Priya Nair",
      role: "Senior Editorial Advisor",
      affiliation: "Center for Advanced Humanities",
      email: "advisor.sociology@manthanjournal.com",
      specialization: "Sociology & Gender Studies",
    },
    {
      id: 4,
      name: "Dr. Rajeshwar Sharma",
      role: "Editorial Board Member",
      affiliation: "Faculty of Law",
      email: "editorial.law@manthanjournal.com",
      specialization: "Law & Jurisprudence",
    },
    {
      id: 5,
      name: "Dr. Ananya Roy",
      role: "Executive Reviewer",
      affiliation: "Institute of Social Inquiry",
      email: "reviewer.roy@manthanjournal.com",
      specialization: "Political Science & International Relations",
    },
    {
      id: 6,
      name: "Prof. Michael H. Adams",
      role: "International Advisory Board",
      affiliation: "School of Global Cultural Studies",
      email: "adams.intl@manthanjournal.com",
      specialization: "Comparative Philosophy",
    },
    {
      id: 7,
      name: "Dr. Tarun Sen",
      role: "Managing Editorial Secretary",
      affiliation: "Impulse Publication Works",
      email: "editorial.desk@impulseresearchwork.com",
      specialization: "Editorial Management & Scholarly Communications",
    },
  ]);
  const [editingMember, setEditingMember] = useState<any | null>(null);
  const [newMemberModal, setNewMemberModal] = useState(false);
  const [newMemberForm, setNewMemberForm] = useState({
    name: "",
    role: "Editorial Board Member",
    affiliation: "",
    email: "",
    specialization: "",
  });

  // -------------------------------------------------------------
  // 7. AUTHOR INSTRUCTIONS STATE
  // -------------------------------------------------------------
  const [instructionsState, setInstructionsState] = useState({
    manuscriptScope: "Submissions are welcomed in Humanities, Social Sciences, Commerce, Law, Management, Philosophy, Education, and Multidisciplinary Studies.",
    abstractWordLimit: "200 - 250 words",
    keywordsLimit: "4 to 6 keywords separated by semicolons",
    formattingFont: "Times New Roman / Calibri, 12pt font size, 1.5 line spacing, 1-inch margins on all sides.",
    citationStyle: "APA 7th Edition (American Psychological Association) with active DOIs for all reference items.",
    plagiarismThreshold: "Strictly under 10% (excluding references and standard quotations).",
    apcPolicy: "Open Access publication is subsidized. Free submission and processing for Volume 1.",
    checklistItems: [
      "Manuscript is original and has not been published elsewhere.",
      "Title page contains all author affiliations and corresponding email.",
      "Abstract is structured within 250 words with 4-6 keywords.",
      "All references adhere strictly to APA 7th Edition style.",
      "Plagiarism similarity index is verified below 10%.",
      "Figures and tables are numbered with explicit captions and source credits.",
    ],
  });

  // -------------------------------------------------------------
  // 8. PUBLICATION ETHICS STATE
  // -------------------------------------------------------------
  const [ethicsState, setEthicsState] = useState({
    authorshipCriteria: "Authorship must reflect substantial contributions to conception, design, acquisition of data, analysis, drafting, and final approval.",
    peerReviewPolicy: "Double-blind peer review system ensuring impartial critique by at least two independent subject matter referees within 2-3 weeks.",
    plagiarismProtocol: "All submissions undergo rigorous similarity screening prior to editorial assessment using licensed software. Plagiarized texts face immediate rejection.",
    conflictOfInterest: "Authors, editors, and reviewers must disclose any financial, professional, or personal competing interests upon submission.",
    retractionPolicy: "In cases of academic misconduct, data falsification, or copyright violation, articles will be promptly retracted with formal notice.",
    humanEthics: "Research involving human participants must provide institutional ethical review board clearance and informed consent statements.",
  });

  // -------------------------------------------------------------
  // 9. CONTACT STATE
  // -------------------------------------------------------------
  const [contactState, setContactState] = useState({
    officeAddress: companyInfo.address,
    editorialEmail: companyInfo.email,
    publisherEmail: "editor@impulseresearchwork.com",
    helplinePhone: "+91 8527231973 (WhatsApp Consultation Available)",
    officeHours: "Monday to Saturday: 9:00 AM – 6:00 PM IST",
    responseTime: "Editorial replies provided within 24 to 48 working hours.",
  });

  // -------------------------------------------------------------
  // 10. SIDEBAR MENU WIDGETS CONFIG STATE
  // -------------------------------------------------------------
  const [sidebarMenuState, setSidebarMenuState] = useState({
    showEditorialPolicies: true,
    showCoverBox: true,
    coverBoxTitle: "Manthan: International Multidisciplinary Journal of Social Inquiry",
    coverBoxIssn: companyInfo.issn,
    coverBoxUrl: "https://impulseresearchwork.com/",
    showManuscriptStatus: true,
    manuscriptStatusText: "Check Manuscript Status",
    manuscriptStatusLink: "/submit",
    showCreativeCommons: true,
    ccLicenseText: "Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.",
    showImpactFactor: true,
    impactFactorValue: "Impact Factor: xxxx*",
    showSearchBar: true,
  });

  // -------------------------------------------------------------
  // 11. MESSAGES STATE
  // -------------------------------------------------------------
  const [messagesList, setMessagesList] = useState([
    {
      id: 1,
      sender: "Prof. Arindam Das",
      email: "arindam.das@univ.edu",
      subject: "Manuscript Status Query: IMJSI-2026-088",
      date: "28 Oct 2026",
      isRead: true,
      content: "Respected Editor, I have submitted our empirical paper on rural credit unions. Could you confirm the completion of initial peer review?",
    },
    {
      id: 2,
      sender: "Dr. Kavita Menon",
      email: "kavita.m@researchinst.org",
      subject: "Inquiry regarding Special Issue on Gender & Society",
      date: "25 Oct 2026",
      isRead: true,
      content: "Greetings. Our department is interested in organizing a themed issue with Manthan IMJSI in early 2027. Please share guest editorial guidelines.",
    },
    {
      id: 3,
      sender: "Rahul Sen (Research Scholar)",
      email: "rahul.sen@scholar.ac.in",
      subject: "Author Proof Corrections for Volume 1 Issue 1",
      date: "24 Oct 2026",
      isRead: false,
      content: "Dear Editorial Team, please find attached minor typographical corrections on page 24 of our accepted manuscript. Kindly update the online proof.",
    },
  ]);

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
      status: newArticleForm.status,
      doi: newArticleForm.doi,
      abstract: newArticleForm.abstract || "Abstract submitted.",
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
      abstract: "",
      status: "Published",
    });
    showToast("Article added to journal database!");
  };

  const handleSaveEditedArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;
    setArticlesList(
      articlesList.map((a) => (a.id === editingArticle.id ? editingArticle : a))
    );
    setEditingArticle(null);
    showToast(`Article #${editingArticle.id} updated successfully!`);
  };

  const handleAddIssue = (e: React.FormEvent) => {
    e.preventDefault();
    const newIss = {
      id: issuesList.length + 1,
      volume: newIssueForm.volume,
      issue: newIssueForm.issue,
      period: newIssueForm.period,
      publicationDate: newIssueForm.publicationDate,
      status: newIssueForm.status,
      articlesCount: 0,
      theme: newIssueForm.theme,
      pdfUrl: "",
    };
    setIssuesList([...issuesList, newIss]);
    setNewIssueModal(false);
    showToast("New issue created in archive index!");
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberForm.name) return;
    const newM = {
      id: editorialMembers.length + 1,
      name: newMemberForm.name,
      role: newMemberForm.role,
      affiliation: newMemberForm.affiliation,
      email: newMemberForm.email,
      specialization: newMemberForm.specialization,
    };
    setEditorialMembers([...editorialMembers, newM]);
    setNewMemberModal(false);
    setNewMemberForm({
      name: "",
      role: "Editorial Board Member",
      affiliation: "",
      email: "",
      specialization: "",
    });
    showToast("New editorial member added!");
  };

  const handleSaveEditedMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;
    setEditorialMembers(
      editorialMembers.map((m) => (m.id === editingMember.id ? editingMember : m))
    );
    setEditingMember(null);
    showToast("Editorial member updated!");
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
                  showToast("Journal settings updated successfully!");
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

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#700070] hover:bg-[#550055] text-white font-bold rounded flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Journal Settings</span>
                </button>
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
                                setArticlesList(articlesList.filter((a) => a.id !== art.id));
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
                      <span className="text-xs text-slate-500">
                        {issue.articlesCount} Articles Indexed
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mb-2">
                      Theme: <strong>{issue.theme}</strong> • Publication Date: {issue.publicationDate}
                    </p>
                    <div className="flex items-center gap-3 pt-2 border-t border-slate-200 text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          const newStatus =
                            issue.status === "Published" ? "Open for Submissions" : "Published";
                          setIssuesList(
                            issuesList.map((i) =>
                              i.id === issue.id ? { ...i, status: newStatus } : i
                            )
                          );
                          showToast(`Issue status changed to ${newStatus}`);
                        }}
                        className="text-purple-700 hover:underline font-semibold cursor-pointer"
                      >
                        Toggle Status
                      </button>
                      <span className="text-slate-300">|</span>
                      <Link
                        href="/archives"
                        target="_blank"
                        className="text-slate-600 hover:text-slate-900 flex items-center gap-1"
                      >
                        <span>View Public Archive</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
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
                      <div className="text-slate-600 text-xs mt-1">{m.affiliation}</div>
                      <div className="text-slate-500 text-[11px] mt-0.5">
                        Area: <em>{m.specialization}</em>
                      </div>
                      <div className="text-slate-400 font-mono text-[11px] mt-0.5">
                        {m.email}
                      </div>
                    </div>
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
                          setEditorialMembers(editorialMembers.filter((item) => item.id !== m.id));
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
                  showToast("Author instructions updated successfully!");
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
                  showToast("Publication ethics policies updated!");
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
                  showToast("Contact information updated successfully!");
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
                      id: messagesList.length + 1,
                      sender: "Dr. Ankit Srivastava",
                      email: "ankit.s@university.ac.in",
                      subject: "Submission Confirmation for Review Issue",
                      date: "Just now",
                      isRead: false,
                      content: "Inquiry regarding publication timelines for multidisciplinary manuscripts.",
                    };
                    setMessagesList([sample, ...messagesList]);
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
                        onClick={() => {
                          setMessagesList(
                            messagesList.map((m) =>
                              m.id === msg.id ? { ...m, isRead: !m.isRead } : m
                            )
                          );
                        }}
                        className="text-slate-600 hover:text-slate-900"
                      >
                        {msg.isRead ? "Mark Unread" : "Mark Read"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setMessagesList(messagesList.filter((m) => m.id !== msg.id));
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
                  showToast("Sidebar widget configurations saved!");
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
                        Cover Box Title
                      </label>
                      <input
                        type="text"
                        value={sidebarMenuState.coverBoxTitle}
                        onChange={(e) =>
                          setSidebarMenuState({
                            ...sidebarMenuState,
                            coverBoxTitle: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Website Link URL
                      </label>
                      <input
                        type="text"
                        value={sidebarMenuState.coverBoxUrl}
                        onChange={(e) =>
                          setSidebarMenuState({
                            ...sidebarMenuState,
                            coverBoxUrl: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded bg-white"
                      />
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
          ADD ARTICLE MODAL
         ------------------------------------------------------------- */}
      {newArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 max-w-lg w-full p-6 shadow-2xl space-y-4 text-xs max-h-[90vh] overflow-y-auto">
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

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Abstract
                </label>
                <textarea
                  rows={3}
                  placeholder="Paste manuscript abstract here..."
                  value={newArticleForm.abstract}
                  onChange={(e) =>
                    setNewArticleForm({ ...newArticleForm, abstract: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setNewArticleModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#700070] hover:bg-[#550055] text-white font-bold rounded cursor-pointer"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          EDIT ARTICLE MODAL
         ------------------------------------------------------------- */}
      {editingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 max-w-lg w-full p-6 shadow-2xl space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <h3 className="font-editorial italic font-bold text-xl text-slate-900">
              Edit Article #{editingArticle.id}
            </h3>

            <form onSubmit={handleSaveEditedArticle} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Article Title
                </label>
                <input
                  type="text"
                  required
                  value={editingArticle.title}
                  onChange={(e) =>
                    setEditingArticle({ ...editingArticle, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Authors
                </label>
                <input
                  type="text"
                  required
                  value={editingArticle.authors}
                  onChange={(e) =>
                    setEditingArticle({ ...editingArticle, authors: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Status
                  </label>
                  <select
                    value={editingArticle.status}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, status: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070]"
                  >
                    <option value="Published">Published</option>
                    <option value="In Review">In Review</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    DOI
                  </label>
                  <input
                    type="text"
                    value={editingArticle.doi}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, doi: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070]"
                  />
                </div>
              </div>

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
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#700070]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingArticle(null)}
                  className="px-4 py-2 border border-slate-300 rounded text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#700070] hover:bg-[#550055] text-white font-bold rounded cursor-pointer"
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
          ADD MEMBER MODAL
         ------------------------------------------------------------- */}
      {newMemberModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 max-w-md w-full p-6 shadow-2xl space-y-4 text-xs">
            <h3 className="font-editorial italic font-bold text-xl text-slate-900">
              Add Editorial Board Member
            </h3>

            <form onSubmit={handleAddMember} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name &amp; Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Prof. Sunita Rao"
                  value={newMemberForm.name}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Designation / Role</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Associate Editor (Sociology)"
                  value={newMemberForm.role}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, role: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Institutional Affiliation</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Center for Social Research"
                  value={newMemberForm.affiliation}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, affiliation: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Specialization Area</label>
                <input
                  type="text"
                  placeholder="e.g. Gender Studies & Sociology"
                  value={newMemberForm.specialization}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, specialization: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. editor@univ.edu"
                  value={newMemberForm.email}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setNewMemberModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#700070] hover:bg-[#550055] text-white font-bold rounded cursor-pointer"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          EDIT MEMBER MODAL
         ------------------------------------------------------------- */}
      {editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 max-w-md w-full p-6 shadow-2xl space-y-4 text-xs">
            <h3 className="font-editorial italic font-bold text-xl text-slate-900">
              Edit Editorial Member
            </h3>

            <form onSubmit={handleSaveEditedMember} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editingMember.name}
                  onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Role / Position</label>
                <input
                  type="text"
                  required
                  value={editingMember.role}
                  onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Affiliation</label>
                <input
                  type="text"
                  required
                  value={editingMember.affiliation}
                  onChange={(e) => setEditingMember({ ...editingMember, affiliation: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Specialization</label>
                <input
                  type="text"
                  value={editingMember.specialization || ""}
                  onChange={(e) => setEditingMember({ ...editingMember, specialization: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={editingMember.email}
                  onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="px-4 py-2 border border-slate-300 rounded text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#700070] hover:bg-[#550055] text-white font-bold rounded cursor-pointer"
                >
                  Save Member Info
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
