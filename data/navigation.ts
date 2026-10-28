export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export const mainNavItems: NavItem[] = [
  { label: "HOME", href: "/" },
  { label: "CURRENT", href: "/current" },
  { label: "ARCHIVES", href: "/archives" },
  { label: "EDITORIAL BOARD", href: "/editorial-board" },
  { label: "INSTRUCTIONS TO AUTHORS", href: "/instructions-to-authors" },
  { label: "PEER REVIEW POLICY", href: "/peer-review-policy" },
  { label: "PLAGIARISM", href: "/plagiarism" },
  {
    label: "ABOUT THE JOURNAL",
    href: "/about",
    children: [
      { label: "About Impulse", href: "/about" },
      { label: "Submissions", href: "/submit" },
      { label: "Privacy Statement", href: "/privacy" },
      { label: "Academic Integrity", href: "/academic-integrity" },
    ],
  },
  { label: "CONTACT", href: "/contact" },
];

export const footerLinks = {
  journal: [
    { label: "Home", href: "/" },
    { label: "Current Issue", href: "/current" },
    { label: "Archives", href: "/archives" },
    { label: "Editorial Board", href: "/editorial-board" },
    { label: "Instructions to Authors", href: "/instructions-to-authors" },
  ],
  policies: [
    { label: "Peer Review Policy", href: "/peer-review-policy" },
    { label: "Plagiarism Policy", href: "/plagiarism" },
    { label: "Academic Integrity", href: "/academic-integrity" },
    { label: "Privacy Statement", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
  support: [
    { label: "Make a Submission", href: "/submit" },
    { label: "Contact Us", href: "/contact" },
    { label: "WhatsApp Consultation", href: "https://wa.me/918527231973" },
  ],
};
