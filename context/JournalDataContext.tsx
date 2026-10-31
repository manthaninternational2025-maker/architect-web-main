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
  role: string; // Journal Editorial Role (e.g. Editor-in-Chief, Associate Editor)
  designation?: string; // Academic Post (e.g. Assistant Professor, Professor)
  affiliation: string;
  email: string;
  specialization?: string;
  photoUrl?: string;
  photoData?: string;
  bio?: string;
  orcid?: string;
  phone?: string;
  websiteUrl?: string; // Official Academic / Faculty Profile Link
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
  coverPageHeading?: string;
  coverImageUrl?: string;
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
  reorderMembers: (newMembers: EditorialMember[]) => void;
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
  {
    id: 1,
    title: "Revival and Adaptation: The Role of Confucianism in Contemporary China",
    authors: "Khem Chand",
    volume: "Vol. 1",
    issue: "Issue 1",
    date: "August 2026",
    status: "Published",
    doi: "10.5281/imjsi.2026.01.01",
    abstract: "An analytical study investigating the resurgence, institutional adaptation, and state-society dynamics of Confucian philosophy in contemporary Chinese political and cultural discourse.",
    pages: "pp. 18-23",
    category: "Philosophy & Cultural Studies",
    views: 142,
    downloads: 5,
  },
  {
    id: 2,
    title: "Confucianism in India: Cross-Cultural Philosophical Dialogues in the 21st Century",
    authors: "Chanden Kumar Jha",
    volume: "Vol. 1",
    issue: "Issue 1",
    date: "August 2026",
    status: "Published",
    doi: "10.5281/imjsi.2026.01.02",
    abstract: "A comparative exploration examining bilateral intellectual intersections between classical Confucian ethics and Indian philosophical paradigms in the contemporary global era.",
    pages: "pp. 13-17",
    category: "Comparative Philosophy",
    views: 169,
    downloads: 4,
  },
  {
    id: 3,
    title: "Reforming Human Nature: Xunzi’s Ethical and Political Philosophy",
    authors: "Dr. Sakshi Sharma",
    volume: "Vol. 1",
    issue: "Issue 1",
    date: "August 2026",
    status: "Published",
    doi: "10.5281/imjsi.2026.01.03",
    abstract: "A critical textual analysis of Xunzi's assertion of inherent human moral ambiguity and the foundational requirement of ritual and institutional discipline for social cohesion.",
    pages: "pp. 7-12",
    category: "Classical Political Theory",
    views: 198,
    downloads: 4,
  },
  {
    id: 4,
    title: "A Critical Analysis of Legal and Human Rights of Undertrial Female Prisoners in India",
    authors: "Rahul Sharma",
    volume: "Vol. 1",
    issue: "Issue 1",
    date: "August 2026",
    status: "Published",
    doi: "10.5281/imjsi.2026.01.04",
    abstract: "An empirical socio-legal analysis reviewing statutory protections, prison conditions, judicial precedents, and systemic vulnerabilities confronting female undertrial detainees.",
    pages: "pp. 1-6",
    category: "Law & Human Rights",
    views: 220,
    downloads: 6,
  },
  {
    id: 5,
    title: "Decline and Fall: Factors Contributing to the Downfall of the Mughal Empire",
    authors: "Aastha Rani",
    volume: "Vol. 1",
    issue: "Issue 1",
    date: "August 2026",
    status: "Published",
    doi: "10.5281/imjsi.2026.01.05",
    abstract: "A historiographical reassessment of the fiscal strains, agrarian distress, regional rebellions, and administrative fragmentation that precipitated the decline of the Mughal Empire in 18th-century South Asia.",
    pages: "pp. 1-12",
    category: "Historical Inquiries",
    views: 165,
    downloads: 3,
  },
  {
    id: 6,
    title: "The Dynamics of Indian Nationalism: A Historical Analysis Age",
    authors: "Geetanshu",
    volume: "Vol. 1",
    issue: "Issue 1",
    date: "August 2026",
    status: "Published",
    doi: "10.5281/imjsi.2026.01.06",
    abstract: "A critical historical investigation exploring the multifaceted evolutionary trajectories, subaltern voices, and ideological currents that shaped the anti-colonial nationalist movement in India.",
    pages: "37-41",
    category: "Modern Indian History",
    views: 184,
    downloads: 2,
  },
  {
    id: 7,
    title: "Digital Financial Inclusion and Rural Empowerment: A Socio-Economic Study",
    authors: "Dr. Neha Verma & Prof. V. K. Rao",
    volume: "Vol. 1",
    issue: "Issue 1",
    date: "August 2026",
    status: "Published",
    doi: "10.5281/imjsi.2026.01.07",
    abstract: "Socio-economic evaluation of digital credit and microfinance initiatives in rural clusters.",
    pages: "pp. 42-49",
    category: "Economics & Commerce",
    views: 110,
    downloads: 1,
  },
  {
    id: 8,
    title: "Interdisciplinary Approaches to Sustainable Development in Developing Nations",
    authors: "Dr. Deepak Setia & Research Fellows",
    volume: "Vol. 1",
    issue: "Issue 1",
    date: "August 2026",
    status: "Published",
    doi: "10.5281/imjsi.2026.01.08",
    abstract: "Integrated frameworks harmonizing environmental resilience and economic policy in emerging economies.",
    pages: "pp. 50-59",
    category: "Multidisciplinary Studies",
    views: 245,
    downloads: 8,
  },
  {
    id: 9,
    title: "Pedagogical Evolution: Integrating AI and Blended Learning in Higher Education",
    authors: "Pooja Malhotra",
    volume: "Vol. 1",
    issue: "Issue 1",
    date: "August 2026",
    status: "Published",
    doi: "10.5281/imjsi.2026.01.09",
    abstract: "Curricular paradigms and ethical considerations in automated, blended higher education delivery.",
    pages: "pp. 60-68",
    category: "Education & Pedagogy",
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
    designation: "Assistant Professor",
    affiliation: "Department of Political Science, Ram Lal Anand College, University of Delhi",
    email: "deepak.polsc@rla.du.ac.in",
    specialization: "Political Science",
    websiteUrl: "https://rlacollege.edu.in",
  },
  {
    id: 2,
    name: "Dr. Archana Kumari",
    role: "Editorial Board Member",
    designation: "Assistant Professor",
    affiliation: "Department of History, Indraprastha College for Women, University of Delhi",
    email: "archana.history@ip.du.ac.in",
    specialization: "History",
    websiteUrl: "https://ipcollege.ac.in",
  },
  {
    id: 3,
    name: "Dr. Vikash Yadav",
    role: "Editorial Board Member",
    designation: "Assistant Professor",
    affiliation: "Department of Political Science at the School of Liberal Education, Galgotias University",
    email: "vikash.yadav@galgotiasuniversity.edu.in",
    specialization: "Political Science",
    websiteUrl: "https://www.galgotiasuniversity.edu.in",
  },
  {
    id: 4,
    name: "Dr. Amarjeet Singh",
    role: "Editorial Board Member",
    designation: "Assistant Professor",
    affiliation: "Department of Zoology, Sri Venkateswara College, University of Delhi",
    email: "amarjeet@svc.ac.in",
    specialization: "Zoology",
    websiteUrl: "https://www.svc.ac.in",
  },
  {
    id: 5,
    name: "Dr. Gajendra",
    role: "Editorial Board Member",
    designation: "Assistant Professor",
    affiliation: "Centre for Diaspora Studies, Central University of Gujarat",
    email: "gajendra@cug.ac.in",
    specialization: "Diaspora Studies",
    websiteUrl: "https://cug.ac.in",
  },
  {
    id: 6,
    name: "Dr. Sudipto Mitra (PhD, London), FRAS",
    role: "Editorial Board Member",
    designation: "Assistant Professor",
    affiliation: "Department of History, Pachhunga University College, Mizoram University",
    email: "sudipto.boulevardier@gmail.com",
    specialization: "History",
    websiteUrl: "https://pucollege.edu.in",
  },
  {
    id: 7,
    name: "Dr. Anisha Kaul",
    role: "Editorial Board Member",
    designation: "Assistant Professor",
    affiliation: "Department of English, Indraprastha College for Women, University of Delhi",
    email: "anishakaul@ip.du.ac.in",
    specialization: "English",
    websiteUrl: "https://ipcollege.ac.in",
  },
  {
    id: 8,
    name: "Dr. Kumar Saurabh",
    role: "Editorial Board Member",
    designation: "Assistant Professor",
    affiliation: "Department of History, Miranda House College, University of Delhi",
    email: "kumar.saurabh@mirandahouse.ac.in",
    specialization: "History",
    websiteUrl: "https://www.mirandahouse.ac.in",
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
  coverPageHeading: "Cover Page",
  coverImageUrl: "/images/manthan-cover-page.png",
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

  // Background server synchronizer so changes on Mobile/PC/Tablet persist everywhere
  const syncToServer = (payload: Record<string, any>) => {
    try {
      if (typeof window !== "undefined") {
        fetch("/api/journal-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }).catch(() => {});
      }
    } catch {}
  };

  // Load saved state from localStorage on mount & synchronize with server
  useEffect(() => {
    try {
      const s = localStorage.getItem(K_SETTINGS);
      if (s) {
        try {
          const parsed = JSON.parse(s);
          if (!parsed.address || parsed.address.includes("New Delhi & NCR")) {
            parsed.address = "GT Karnal Road, Dilkhush Bagh Village, Ashok Vihar, New Delhi, Delhi 110033";
          }
          setSettings(parsed);
        } catch {
          setSettings(JSON.parse(s));
        }
      }

      const a = localStorage.getItem(K_ANNOUNCE);
      if (a) setAnnouncement(JSON.parse(a));

      const h = localStorage.getItem(K_HOMEPAGE);
      if (h) setHomepage(JSON.parse(h));

      const art = localStorage.getItem(K_ARTICLES);
      if (art) {
        try {
          const parsed = JSON.parse(art);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const seenIds = new Set<number>();
            let maxId = 0;
            const sanitized = parsed.map((item: any, idx: number) => {
              let id = typeof item.id === "number" && !isNaN(item.id) && item.id > 0 ? item.id : idx + 1;
              if (seenIds.has(id)) {
                id = maxId + 1;
              }
              seenIds.add(id);
              if (id > maxId) maxId = id;
              let doi = item.doi;
              if (!doi) {
                doi = `10.5281/imjsi.2026.01.${id < 10 ? `0${id}` : id}`;
              }
              return { ...item, id, doi };
            });
            setArticles(sanitized);
          }
        } catch {}
      }

      const iss = localStorage.getItem(K_ISSUES);
      if (iss) setIssues(JSON.parse(iss));

      const m = localStorage.getItem(K_MEMBERS);
      if (m) {
        try {
          const parsed = JSON.parse(m);
          const normalized = parsed.map((item: EditorialMember) => {
            if (item.name.toLowerCase().includes("deepak setia")) {
              return {
                ...item,
                role: "Editor-in-Chief",
                designation: item.designation || "Assistant Professor",
                websiteUrl: item.websiteUrl || "https://rlacollege.edu.in",
              };
            }
            if (!item.designation) {
              item.designation = "Assistant Professor";
            }
            return item;
          });
          setMembers(normalized);
        } catch {
          setMembers(JSON.parse(m));
        }
      }

      const ins = localStorage.getItem(K_INSTRUCT);
      if (ins) setInstructions(JSON.parse(ins));

      const eth = localStorage.getItem(K_ETHICS);
      if (eth) setEthics(JSON.parse(eth));

      const c = localStorage.getItem(K_CONTACT);
      if (c) {
        try {
          const parsed = JSON.parse(c);
          if (!parsed.officeAddress || parsed.officeAddress.includes("New Delhi & NCR")) {
            parsed.officeAddress = "GT Karnal Road, Dilkhush Bagh Village, Ashok Vihar, New Delhi, Delhi 110033";
          }
          setContact(parsed);
        } catch {
          setContact(JSON.parse(c));
        }
      }

      const sb = localStorage.getItem(K_SIDEBAR);
      if (sb) {
        try {
          const parsed = JSON.parse(sb);
          if (!parsed.coverImageUrl) {
            parsed.coverImageUrl = "/images/manthan-cover-page.png";
          }
          if (!parsed.coverPageHeading) {
            parsed.coverPageHeading = "Cover Page";
          }
          setSidebarConfig(parsed);
        } catch {
          setSidebarConfig(JSON.parse(sb));
        }
      }

      const msg = localStorage.getItem(K_MESSAGES);
      if (msg) setMessages(JSON.parse(msg));

      // Fetch live cross-device state from server API
      fetch("/api/journal-data")
        .then((res) => res.json())
        .then((json) => {
          if (json.success && json.data) {
            const d = json.data;
            if (d.settings) {
              setSettings(d.settings);
              try { localStorage.setItem(K_SETTINGS, JSON.stringify(d.settings)); } catch {}
            }
            if (d.announcement) {
              setAnnouncement(d.announcement);
              try { localStorage.setItem(K_ANNOUNCE, JSON.stringify(d.announcement)); } catch {}
            }
            if (d.homepage) {
              setHomepage(d.homepage);
              try { localStorage.setItem(K_HOMEPAGE, JSON.stringify(d.homepage)); } catch {}
            }
            if (d.articles && Array.isArray(d.articles)) {
              setArticles(d.articles);
              try { localStorage.setItem(K_ARTICLES, JSON.stringify(d.articles)); } catch {}
            }
            if (d.issues && Array.isArray(d.issues)) {
              setIssues(d.issues);
              try { localStorage.setItem(K_ISSUES, JSON.stringify(d.issues)); } catch {}
            }
            if (d.members && Array.isArray(d.members)) {
              setMembers(d.members);
              try { localStorage.setItem(K_MEMBERS, JSON.stringify(d.members)); } catch {}
            }
            if (d.instructions) {
              setInstructions(d.instructions);
              try { localStorage.setItem(K_INSTRUCT, JSON.stringify(d.instructions)); } catch {}
            }
            if (d.ethics) {
              setEthics(d.ethics);
              try { localStorage.setItem(K_ETHICS, JSON.stringify(d.ethics)); } catch {}
            }
            if (d.contact) {
              setContact(d.contact);
              try { localStorage.setItem(K_CONTACT, JSON.stringify(d.contact)); } catch {}
            }
            if (d.sidebarConfig) {
              if (!d.sidebarConfig.coverImageUrl) {
                d.sidebarConfig.coverImageUrl = "/images/manthan-cover-page.png";
              }
              if (!d.sidebarConfig.coverPageHeading) {
                d.sidebarConfig.coverPageHeading = "Cover Page";
              }
              setSidebarConfig(d.sidebarConfig);
              try { localStorage.setItem(K_SIDEBAR, JSON.stringify(d.sidebarConfig)); } catch {}
            }
            if (d.messages && Array.isArray(d.messages)) {
              setMessages(d.messages);
              try { localStorage.setItem(K_MESSAGES, JSON.stringify(d.messages)); } catch {}
            }
          }
        })
        .catch(() => {});
    } catch {}
  }, []);

  const updateSettings = (newSettings: Partial<JournalSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem(K_SETTINGS, JSON.stringify(updated));
      } catch {}
      syncToServer({ settings: updated });
      return updated;
    });
  };

  const updateAnnouncement = (newAnn: Partial<AnnouncementData>) => {
    setAnnouncement((prev) => {
      const updated = { ...prev, ...newAnn };
      try {
        localStorage.setItem(K_ANNOUNCE, JSON.stringify(updated));
      } catch {}
      syncToServer({ announcement: updated });
      return updated;
    });
  };

  const updateHomepage = (newData: Partial<HomepageData>) => {
    setHomepage((prev) => {
      const updated = { ...prev, ...newData };
      try {
        localStorage.setItem(K_HOMEPAGE, JSON.stringify(updated));
      } catch {}
      syncToServer({ homepage: updated });
      return updated;
    });
  };

  const addArticle = (art: Omit<ArticleItem, "id" | "views" | "downloads">) => {
    setArticles((prev) => {
      const nextId = prev.length ? Math.max(...prev.map((p) => p.id || 0)) + 1 : 1;
      const newItem: ArticleItem = {
        ...art,
        id: nextId,
        doi: art.doi || `10.5281/imjsi.2026.01.${nextId < 10 ? `0${nextId}` : nextId}`,
        views: 0,
        downloads: 0,
      };
      const updated = [newItem, ...prev];
      try {
        localStorage.setItem(K_ARTICLES, JSON.stringify(updated));
      } catch {}
      syncToServer({ articles: updated });
      return updated;
    });
  };

  const updateArticle = (art: ArticleItem) => {
    setArticles((prev) => {
      const updated = prev.map((p) => (p.id === art.id ? art : p));
      try {
        localStorage.setItem(K_ARTICLES, JSON.stringify(updated));
      } catch {}
      syncToServer({ articles: updated });
      return updated;
    });
  };

  const deleteArticle = (id: number) => {
    setArticles((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      try {
        localStorage.setItem(K_ARTICLES, JSON.stringify(updated));
      } catch {}
      syncToServer({ articles: updated });
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
      syncToServer({ issues: updated });
      return updated;
    });
  };

  const updateIssue = (iss: IssueItem) => {
    setIssues((prev) => {
      const updated = prev.map((p) => (p.id === iss.id ? iss : p));
      try {
        localStorage.setItem(K_ISSUES, JSON.stringify(updated));
      } catch {}
      syncToServer({ issues: updated });
      return updated;
    });
  };

  const deleteIssue = (id: number) => {
    setIssues((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      try {
        localStorage.setItem(K_ISSUES, JSON.stringify(updated));
      } catch {}
      syncToServer({ issues: updated });
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
      syncToServer({ members: updated });
      return updated;
    });
  };

  const updateMember = (m: EditorialMember) => {
    setMembers((prev) => {
      const updated = prev.map((p) => (p.id === m.id ? m : p));
      try {
        localStorage.setItem(K_MEMBERS, JSON.stringify(updated));
      } catch {}
      syncToServer({ members: updated });
      return updated;
    });
  };

  const deleteMember = (id: number) => {
    setMembers((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      try {
        localStorage.setItem(K_MEMBERS, JSON.stringify(updated));
      } catch {}
      syncToServer({ members: updated });
      return updated;
    });
  };

  const reorderMembers = (newMembers: EditorialMember[]) => {
    setMembers(newMembers);
    try {
      localStorage.setItem(K_MEMBERS, JSON.stringify(newMembers));
    } catch {}
    syncToServer({ members: newMembers });
  };

  const updateInstructions = (data: Partial<AuthorInstructionsData>) => {
    setInstructions((prev) => {
      const updated = { ...prev, ...data };
      try {
        localStorage.setItem(K_INSTRUCT, JSON.stringify(updated));
      } catch {}
      syncToServer({ instructions: updated });
      return updated;
    });
  };

  const updateEthics = (data: Partial<PublicationEthicsData>) => {
    setEthics((prev) => {
      const updated = { ...prev, ...data };
      try {
        localStorage.setItem(K_ETHICS, JSON.stringify(updated));
      } catch {}
      syncToServer({ ethics: updated });
      return updated;
    });
  };

  const updateContact = (data: Partial<ContactData>) => {
    setContact((prev) => {
      const updated = { ...prev, ...data };
      try {
        localStorage.setItem(K_CONTACT, JSON.stringify(updated));
      } catch {}
      syncToServer({ contact: updated });
      return updated;
    });
  };

  const updateSidebarConfig = (data: Partial<SidebarConfigData>) => {
    setSidebarConfig((prev) => {
      const updated = { ...prev, ...data };
      try {
        localStorage.setItem(K_SIDEBAR, JSON.stringify(updated));
      } catch {}
      syncToServer({ sidebarConfig: updated });
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
      syncToServer({ messages: updated });
      return updated;
    });
  };

  const toggleMessageRead = (id: number) => {
    setMessages((prev) => {
      const updated = prev.map((m) => (m.id === id ? { ...m, isRead: !m.isRead } : m));
      try {
        localStorage.setItem(K_MESSAGES, JSON.stringify(updated));
      } catch {}
      syncToServer({ messages: updated });
      return updated;
    });
  };

  const deleteMessage = (id: number) => {
    setMessages((prev) => {
      const updated = prev.filter((m) => m.id !== id);
      try {
        localStorage.setItem(K_MESSAGES, JSON.stringify(updated));
      } catch {}
      syncToServer({ messages: updated });
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
    syncToServer({
      settings: initialSettings,
      announcement: initialAnnouncement,
      homepage: initialHomepage,
      articles: initialArticlesList,
      issues: initialIssues,
      members: initialMembers,
      instructions: initialInstructions,
      ethics: initialEthics,
      contact: initialContact,
      sidebarConfig: initialSidebar,
      messages: initialMessages,
    });
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
        reorderMembers,
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
