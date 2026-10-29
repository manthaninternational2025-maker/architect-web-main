"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { companyInfo as defaultCompanyInfo } from "@/data/companyInfo";
import { resources as defaultResources } from "@/data/resources";

// Types
export interface JournalSettings {
  journalTitle: string;
  shortTitle: string;
  issn: string;
  publisher: string;
  frequency: string;
  editorInChief: string;
  email: string;
  address: string;
  website: string;
  impactFactor: string;
  subject: string;
  language: string;
  startingYear: string;
  plagiarismTool: string;
}

export interface AnnouncementData {
  active: boolean;
  badge: string;
  text: string;
  deadline: string;
  contactEmail: string;
}

export interface HomepageData {
  callForPapersHeadline: string;
  callForPapersDeadline: string;
  callForPapersEmail: string;
  callForPapersActive: boolean;
  introP1: string;
  introP2: string;
  aboutText: string;
  policyText: string;
}

export interface ArticleItem {
  id: number;
  title: string;
  authors: string;
  volume: string;
  issue: string;
  date: string;
  status: string;
  doi: string;
  abstract: string;
  views: number;
  downloads: number;
  pages?: string;
  keywords?: string;
  category?: string;
  fileName?: string;
  fileSize?: string;
  fileData?: string;
  pdfUrl?: string;
}

export interface IssueItem {
  id: number;
  volume: string;
  issue: string;
  period: string;
  publicationDate: string;
  status: string;
  articlesCount: number;
  theme: string;
  pdfUrl?: string;
}

export interface EditorialMember {
  id: number;
  name: string;
  role: string;
  affiliation: string;
  email: string;
  specialization?: string;
}

export interface AuthorInstructionsData {
  manuscriptScope: string;
  abstractWordLimit: string;
  keywordsLimit: string;
  formattingFont: string;
  citationStyle: string;
  plagiarismThreshold: string;
  apcPolicy: string;
  checklistItems: string[];
}

export interface PublicationEthicsData {
  authorshipCriteria: string;
  peerReviewPolicy: string;
  plagiarismProtocol: string;
  conflictOfInterest: string;
  retractionPolicy: string;
  humanEthics: string;
}

export interface ContactData {
  officeAddress: string;
  editorialEmail: string;
  publisherEmail: string;
  helplinePhone: string;
  officeHours: string;
  responseTime: string;
}

export interface SidebarConfigData {
  showEditorialPolicies: boolean;
  showCoverBox: boolean;
  coverBoxTitle: string;
  coverBoxIssn: string;
  coverBoxUrl: string;
  showManuscriptStatus: boolean;
  manuscriptStatusText: string;
  manuscriptStatusLink: string;
  showCreativeCommons: boolean;
  ccLicenseText: string;
  showImpactFactor: boolean;
  impactFactorValue: string;
  showSearchBar: boolean;
}

export interface MessageItem {
  id: number;
  sender: string;
  email: string;
  subject: string;
  date: string;
  isRead: boolean;
  content: string;
}

interface JournalDataContextType {
  settings: JournalSettings;
  updateSettings: (newSettings: Partial<JournalSettings>) => void;
  announcement: AnnouncementData;
  updateAnnouncement: (newAnn: Partial<AnnouncementData>) => void;
  homepage: HomepageData;
  updateHomepage: (newData: Partial<HomepageData>) => void;
  articles: ArticleItem[];
  addArticle: (art: Omit<ArticleItem, "id" | "views" | "downloads">) => void;
  updateArticle: (art: ArticleItem) => void;
  deleteArticle: (id: number) => void;
  issues: IssueItem[];
  addIssue: (iss: Omit<IssueItem, "id" | "articlesCount">) => void;
  updateIssue: (iss: IssueItem) => void;
  deleteIssue: (id: number) => void;
  members: EditorialMember[];
  addMember: (m: Omit<EditorialMember, "id">) => void;
  updateMember: (m: EditorialMember) => void;
  deleteMember: (id: number) => void;
  instructions: AuthorInstructionsData;
  updateInstructions: (data: Partial<AuthorInstructionsData>) => void;
  ethics: PublicationEthicsData;
  updateEthics: (data: Partial<PublicationEthicsData>) => void;
  contact: ContactData;
  updateContact: (data: Partial<ContactData>) => void;
  sidebarConfig: SidebarConfigData;
  updateSidebarConfig: (data: Partial<SidebarConfigData>) => void;
  messages: MessageItem[];
  addMessage: (msg: Omit<MessageItem, "id" | "date" | "isRead">) => void;
  toggleMessageRead: (id: number) => void;
  deleteMessage: (id: number) => void;
  resetToDefaults: () => void;
}

const JournalDataContext = createContext<JournalDataContextType | undefined>(undefined);

// Storage Keys
const K_SETTINGS = "manthan_live_settings";
const K_ANNOUNCE = "manthan_live_announcement";
const K_HOMEPAGE = "manthan_live_homepage";
const K_ARTICLES = "manthan_live_articles";
const K_ISSUES = "manthan_live_issues";
const K_MEMBERS = "manthan_live_members";
const K_INSTRUCT = "manthan_live_instructions";
const K_ETHICS = "manthan_live_ethics";
const K_CONTACT = "manthan_live_contact";
const K_SIDEBAR = "manthan_live_sidebar";
const K_MESSAGES = "manthan_live_messages";

// Defaults
const initialSettings: JournalSettings = {
  journalTitle: defaultCompanyInfo.journalTitle,
  shortTitle: defaultCompanyInfo.shortTitle,
  issn: defaultCompanyInfo.issn,
  publisher: defaultCompanyInfo.publisher,
  frequency: defaultCompanyInfo.frequency,
  editorInChief: defaultCompanyInfo.editorInChief,
  email: defaultCompanyInfo.email,
  address: defaultCompanyInfo.address,
  website: "https://impulseresearchwork.com",
  impactFactor: "xxxx*",
  subject: "Humanities, Social Sciences, Economics, Political Science, History, Philosophy, Commerce, Law, Management & Multidisciplinary Studies",
  language: "English / Multilingual",
  startingYear: "2026",
  plagiarismTool: defaultCompanyInfo.plagiarismTool,
};

const initialAnnouncement: AnnouncementData = {
  active: true,
  badge: "Call for Papers",
  text: "Volume 1, Issue 2 (August 2026) submissions open. Submit original papers by 15 August 2026.",
  deadline: "15 August 2026",
  contactEmail: defaultCompanyInfo.email,
};

const initialHomepage: HomepageData = {
  callForPapersHeadline: "Call for Papers: Volume 1, Issue 2 (August 2026)",
  callForPapersDeadline: "15 August 2026",
  callForPapersEmail: defaultCompanyInfo.email,
  callForPapersActive: true,
  introP1: `${defaultCompanyInfo.journalTitle} (ISSN: ${defaultCompanyInfo.issn}) is an open access peer reviewed refereed journal.`,
  introP2: `The aim of ${defaultCompanyInfo.journalTitle} (ISSN: ${defaultCompanyInfo.issn}) is to encourage scientists, academicians and students to publish their experimental and theoretical details. It provides an advanced knowledge platform for the Social Sciences, Humanities, Management, Commerce, Education & Multidisciplinary Research professionals.`,
  aboutText: `${defaultCompanyInfo.journalTitle}, refereed, peer reviewed, open access journal. Researches in the field of humanities, social science, Community and Consumer Sciences, Economics, Political Science, Geography, Philosophy, History, Humanity and Languages concerning with social science, Anthropological, Behavioral Sciences, Sociology, Journalism and Role of Media in social science. Educational Sciences: For School Students, Women, Village and Society, Commerce, Law and Management related with humanities and social science.`,
  policyText: "The journal publishes original research papers, review articles, case studies, and book reviews adhering to rigorous peer-review and ethical publishing standards. Authors must ensure all cited works are acknowledged properly.",
};

const initialArticlesList: ArticleItem[] = [
  ...defaultResources.map((r, i) => ({
    id: i + 1,
    title: r.title,
    authors: r.author,
    volume: r.volume || "Vol. 1",
    issue: r.issue || "Issue 1",
    date: r.publishedDate || "August 2026",
    status: "Published",
    doi: r.doi || `10.5281/imjsi.2026.01.0${i + 1}`,
    abstract: r.sections?.[0]?.content || "Abstract indexed in journal record.",
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

const initialIssues: IssueItem[] = [
  {
    id: 1,
    volume: "Volume 1",
    issue: "Issue 1",
    period: "August 2026",
    publicationDate: "2026-08-01",
    status: "Published",
    articlesCount: 13,
    theme: "Inaugural Multidisciplinary Social Inquiry Issue",
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
  },
];

const initialMembers: EditorialMember[] = [
  {
    id: 1,
    name: "Dr. Deepak Setia",
    role: "Editor-in-Chief",
    affiliation: "Impulse Publication Works",
    email: defaultCompanyInfo.email,
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
];

const initialInstructions: AuthorInstructionsData = {
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
};

const initialEthics: PublicationEthicsData = {
  authorshipCriteria: "Authorship must reflect substantial contributions to conception, design, acquisition of data, analysis, drafting, and final approval.",
  peerReviewPolicy: "Double-blind peer review system ensuring impartial critique by at least two independent subject matter referees within 2-3 weeks.",
  plagiarismProtocol: "All submissions undergo rigorous similarity screening prior to editorial assessment using licensed software. Plagiarized texts face immediate rejection.",
  conflictOfInterest: "Authors, editors, and reviewers must disclose any financial, professional, or personal competing interests upon submission.",
  retractionPolicy: "In cases of academic misconduct, data falsification, or copyright violation, articles will be promptly retracted with formal notice.",
  humanEthics: "Research involving human participants must provide institutional ethical review board clearance and informed consent statements.",
};

const initialContact: ContactData = {
  officeAddress: defaultCompanyInfo.address,
  editorialEmail: defaultCompanyInfo.email,
  publisherEmail: "editor@impulseresearchwork.com",
  helplinePhone: "+91 8527231973 (WhatsApp Consultation Available)",
  officeHours: "Monday to Saturday: 9:00 AM – 6:00 PM IST",
  responseTime: "Editorial replies provided within 24 to 48 working hours.",
};

const initialSidebar: SidebarConfigData = {
  showEditorialPolicies: true,
  showCoverBox: true,
  coverBoxTitle: "Manthan: International Multidisciplinary Journal of Social Inquiry",
  coverBoxIssn: defaultCompanyInfo.issn,
  coverBoxUrl: "https://impulseresearchwork.com/",
  showManuscriptStatus: true,
  manuscriptStatusText: "Check Manuscript Status",
  manuscriptStatusLink: "/submit",
  showCreativeCommons: true,
  ccLicenseText: "Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.",
  showImpactFactor: true,
  impactFactorValue: "Impact Factor: xxxx*",
  showSearchBar: true,
};

const initialMessages: MessageItem[] = [
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
];

export function JournalDataProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<JournalSettings>(initialSettings);
  const [announcement, setAnnouncement] = useState<AnnouncementData>(initialAnnouncement);
  const [homepage, setHomepage] = useState<HomepageData>(initialHomepage);
  const [articles, setArticles] = useState<ArticleItem[]>(initialArticlesList);
  const [issues, setIssues] = useState<IssueItem[]>(initialIssues);
  const [members, setMembers] = useState<EditorialMember[]>(initialMembers);
  const [instructions, setInstructions] = useState<AuthorInstructionsData>(initialInstructions);
  const [ethics, setEthics] = useState<PublicationEthicsData>(initialEthics);
  const [contact, setContact] = useState<ContactData>(initialContact);
  const [sidebarConfig, setSidebarConfig] = useState<SidebarConfigData>(initialSidebar);
  const [messages, setMessages] = useState<MessageItem[]>(initialMessages);

  // Load saved state from localStorage on mount
  useEffect(() => {
    try {
      const s = localStorage.getItem(K_SETTINGS);
      if (s) setSettings(JSON.parse(s));

      const a = localStorage.getItem(K_ANNOUNCE);
      if (a) setAnnouncement(JSON.parse(a));

      const h = localStorage.getItem(K_HOMEPAGE);
      if (h) setHomepage(JSON.parse(h));

      const art = localStorage.getItem(K_ARTICLES);
      if (art) setArticles(JSON.parse(art));

      const iss = localStorage.getItem(K_ISSUES);
      if (iss) setIssues(JSON.parse(iss));

      const m = localStorage.getItem(K_MEMBERS);
      if (m) setMembers(JSON.parse(m));

      const ins = localStorage.getItem(K_INSTRUCT);
      if (ins) setInstructions(JSON.parse(ins));

      const eth = localStorage.getItem(K_ETHICS);
      if (eth) setEthics(JSON.parse(eth));

      const c = localStorage.getItem(K_CONTACT);
      if (c) setContact(JSON.parse(c));

      const sb = localStorage.getItem(K_SIDEBAR);
      if (sb) setSidebarConfig(JSON.parse(sb));

      const msg = localStorage.getItem(K_MESSAGES);
      if (msg) setMessages(JSON.parse(msg));
    } catch {}
  }, []);

  const updateSettings = (newSettings: Partial<JournalSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem(K_SETTINGS, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const updateAnnouncement = (newAnn: Partial<AnnouncementData>) => {
    setAnnouncement((prev) => {
      const updated = { ...prev, ...newAnn };
      try {
        localStorage.setItem(K_ANNOUNCE, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const updateHomepage = (newData: Partial<HomepageData>) => {
    setHomepage((prev) => {
      const updated = { ...prev, ...newData };
      try {
        localStorage.setItem(K_HOMEPAGE, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const addArticle = (art: Omit<ArticleItem, "id" | "views" | "downloads">) => {
    setArticles((prev) => {
      const newItem: ArticleItem = {
        ...art,
        id: prev.length ? Math.max(...prev.map((p) => p.id)) + 1 : 1,
        views: 0,
        downloads: 0,
      };
      const updated = [newItem, ...prev];
      try {
        localStorage.setItem(K_ARTICLES, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const updateArticle = (art: ArticleItem) => {
    setArticles((prev) => {
      const updated = prev.map((p) => (p.id === art.id ? art : p));
      try {
        localStorage.setItem(K_ARTICLES, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const deleteArticle = (id: number) => {
    setArticles((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      try {
        localStorage.setItem(K_ARTICLES, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const addIssue = (iss: Omit<IssueItem, "id" | "articlesCount">) => {
    setIssues((prev) => {
      const newItem: IssueItem = {
        ...iss,
        id: prev.length ? Math.max(...prev.map((p) => p.id)) + 1 : 1,
        articlesCount: 0,
      };
      const updated = [...prev, newItem];
      try {
        localStorage.setItem(K_ISSUES, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const updateIssue = (iss: IssueItem) => {
    setIssues((prev) => {
      const updated = prev.map((p) => (p.id === iss.id ? iss : p));
      try {
        localStorage.setItem(K_ISSUES, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const deleteIssue = (id: number) => {
    setIssues((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      try {
        localStorage.setItem(K_ISSUES, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const addMember = (m: Omit<EditorialMember, "id">) => {
    setMembers((prev) => {
      const newItem: EditorialMember = {
        ...m,
        id: prev.length ? Math.max(...prev.map((p) => p.id)) + 1 : 1,
      };
      const updated = [...prev, newItem];
      try {
        localStorage.setItem(K_MEMBERS, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const updateMember = (m: EditorialMember) => {
    setMembers((prev) => {
      const updated = prev.map((p) => (p.id === m.id ? m : p));
      try {
        localStorage.setItem(K_MEMBERS, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const deleteMember = (id: number) => {
    setMembers((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      try {
        localStorage.setItem(K_MEMBERS, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const updateInstructions = (data: Partial<AuthorInstructionsData>) => {
    setInstructions((prev) => {
      const updated = { ...prev, ...data };
      try {
        localStorage.setItem(K_INSTRUCT, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const updateEthics = (data: Partial<PublicationEthicsData>) => {
    setEthics((prev) => {
      const updated = { ...prev, ...data };
      try {
        localStorage.setItem(K_ETHICS, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const updateContact = (data: Partial<ContactData>) => {
    setContact((prev) => {
      const updated = { ...prev, ...data };
      try {
        localStorage.setItem(K_CONTACT, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const updateSidebarConfig = (data: Partial<SidebarConfigData>) => {
    setSidebarConfig((prev) => {
      const updated = { ...prev, ...data };
      try {
        localStorage.setItem(K_SIDEBAR, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const addMessage = (msg: Omit<MessageItem, "id" | "date" | "isRead">) => {
    setMessages((prev) => {
      const newItem: MessageItem = {
        ...msg,
        id: prev.length ? Math.max(...prev.map((p) => p.id)) + 1 : 1,
        date: "Just now",
        isRead: false,
      };
      const updated = [newItem, ...prev];
      try {
        localStorage.setItem(K_MESSAGES, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const toggleMessageRead = (id: number) => {
    setMessages((prev) => {
      const updated = prev.map((m) => (m.id === id ? { ...m, isRead: !m.isRead } : m));
      try {
        localStorage.setItem(K_MESSAGES, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const deleteMessage = (id: number) => {
    setMessages((prev) => {
      const updated = prev.filter((m) => m.id !== id);
      try {
        localStorage.setItem(K_MESSAGES, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const resetToDefaults = () => {
    setSettings(initialSettings);
    setAnnouncement(initialAnnouncement);
    setHomepage(initialHomepage);
    setArticles(initialArticlesList);
    setIssues(initialIssues);
    setMembers(initialMembers);
    setInstructions(initialInstructions);
    setEthics(initialEthics);
    setContact(initialContact);
    setSidebarConfig(initialSidebar);
    try {
      localStorage.removeItem(K_SETTINGS);
      localStorage.removeItem(K_ANNOUNCE);
      localStorage.removeItem(K_HOMEPAGE);
      localStorage.removeItem(K_ARTICLES);
      localStorage.removeItem(K_ISSUES);
      localStorage.removeItem(K_MEMBERS);
      localStorage.removeItem(K_INSTRUCT);
      localStorage.removeItem(K_ETHICS);
      localStorage.removeItem(K_CONTACT);
      localStorage.removeItem(K_SIDEBAR);
      localStorage.removeItem(K_MESSAGES);
    } catch {}
  };

  return (
    <JournalDataContext.Provider
      value={{
        settings,
        updateSettings,
        announcement,
        updateAnnouncement,
        homepage,
        updateHomepage,
        articles,
        addArticle,
        updateArticle,
        deleteArticle,
        issues,
        addIssue,
        updateIssue,
        deleteIssue,
        members,
        addMember,
        updateMember,
        deleteMember,
        instructions,
        updateInstructions,
        ethics,
        updateEthics,
        contact,
        updateContact,
        sidebarConfig,
        updateSidebarConfig,
        messages,
        addMessage,
        toggleMessageRead,
        deleteMessage,
        resetToDefaults,
      }}
    >
      {children}
    </JournalDataContext.Provider>
  );
}

export function useJournalData() {
  const context = useContext(JournalDataContext);
  if (!context) {
    throw new Error("useJournalData must be used within a JournalDataProvider");
  }
  return context;
}
