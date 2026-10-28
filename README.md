# Impulse Research Work — Academic & Research Support Portal

A high-end, production-ready academic research consultancy portal built for **Impulse Research Work**.

Engineered with Next.js 16 (App Router), TypeScript, and Tailwind CSS, this platform follows the layout architecture, spacing hierarchy, information density, and 2-column editorial structure of international peer-reviewed journals (specifically adapted from Open Journal Systems / GIJHSS), refined with modern typography, generous whitespace, and responsive design.

---

## 🏛️ Brand & Design System

| Element | Specification |
|---|---|
| **Business Name** | Impulse Research Work |
| **Primary Dark Navy** | `#07162F` (`navy-950`) |
| **Primary Orange** | `#F4511E` (`orange-500`) |
| **Warm Off-White** | `#F7F4EE` (`sand-50`) |
| **Dark Text** | `#111827` (`academic-text`) |
| **Hairline Dividers** | `1px solid #E2DDD5` (`academic-border`) |
| **Editorial Heading Font** | `Source Serif 4` (Next.js Google Fonts) |
| **UI & Body Font** | `Inter` (Next.js Google Fonts) |
| **Max Page Width** | `1240px` (Academic container, centered) |
| **WhatsApp Helpline** | `+91 8527231973` |

---

## 📁 Project Architecture

```
impulse-research-work/
├── app/
│   ├── layout.tsx                     # Global RootLayout: Fonts, TopUtilityBar, Masthead, Navbar, Footer
│   ├── page.tsx                       # Home: Hero, About & Spec Table, 10 Services, Featured Issue, Workflow, Pillars, Resources, CTA
│   ├── about/page.tsx                 # About Us & Institutional Profile
│   ├── services/
│   │   ├── page.tsx                   # Comprehensive 10-Service Directory
│   │   └── [slug]/page.tsx           # Dynamic Service Specification Page (Static pre-rendered)
│   ├── resources/
│   │   ├── page.tsx                   # Scholarly Knowledge Archive
│   │   └── [slug]/page.tsx           # Dynamic Article Reader with APA Citation Block
│   ├── pricing/page.tsx               # Transparent Milestone Advisory Tiers
│   ├── experts/page.tsx               # Academic Advisory Board & Methodologists
│   ├── submit/page.tsx                # Research Requirement Intake Dossier & WhatsApp Sync
│   ├── contact/page.tsx               # Contact Desk & Inquiry Form
│   ├── privacy/page.tsx               # Scholar Data Confidentiality & NDA Charter
│   ├── terms/page.tsx                 # Terms of Academic Consultation
│   └── academic-integrity/page.tsx   # Anti-Ghostwriting & Academic Ethics Charter
├── components/
│   ├── layout/
│   │   ├── TopUtilityBar.tsx          # ISSN/Registration tag, Helpline, WhatsApp, Scholar Login
│   │   ├── Masthead.tsx               # Brand logo, Institutional Title, Subtitle, Hours
│   │   ├── Navbar.tsx                 # Sticky navigation, Quick search, Submit Requirement button, Mobile drawer
│   │   ├── Sidebar.tsx                # Academic 5-widget sidebar (Submission, Info, Disciplines, Keywords, Ethics)
│   │   └── Footer.tsx                 # 4-Column academic footer with disclaimers
│   ├── ui/
│   │   ├── Logo.tsx                   # Official logo loader referencing /images/impulse-logo.png with fallback
│   │   ├── ServiceCard.tsx            # Journal-indexed service card with DOSSIER galley badge
│   │   ├── ResourceCard.tsx           # Academic paper archive card with DOI and metadata
│   │   ├── SpecTable.tsx              # Institutional specification table modeled on OJS journal specs
│   │   └── SectionHeader.tsx          # Editorial serif header with hairline border
│   └── forms/
│       ├── RequirementForm.tsx        # Multi-field intake form with validation and WhatsApp sync
│       └── ContactForm.tsx            # Inquiry form with validation and direct WhatsApp desk
├── data/
│   ├── companyInfo.ts                 # Centralized phone, WhatsApp (+91 8527231973), email, address, hours
│   ├── services.ts                    # Strongly-typed data for all 10 academic services
│   ├── resources.ts                   # Strongly-typed scholarly guides, sections, and APA citations
│   └── navigation.ts                  # Header and footer navigation hierarchies
├── public/
│   └── images/
│       ├── impulse-logo.png           # Official logo asset location
│       └── academic-hero.jpg          # Ultra-realistic academic research photography
├── product.md                         # Product vision and functional requirements
├── ui.md                              # UI/UX design tokens and layout architecture
└── engineering.md                     # Engineering standards and routing specifications
```

---

## 🖼️ Official Logo Placement

Place your official **Impulse Research Work** logo in:
```
/public/images/impulse-logo.png
```
- The codebase uses this exact asset path across the Masthead, Navbar, and Footer.
- As per your directive, the code never recolors, redraws, or alters your logo.
- If the file is not yet copied, an elegant academic typographic fallback renders seamlessly until you drop your file.

---

## 🚀 Running Locally

### Prerequisites
- Node.js 18+ or Node.js 20+ installed.

### Commands
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open in your browser
http://localhost:3000

# 4. Build for production (fully static pre-rendering)
npm run build

# 5. Start production server
npm run start
```

---

## ✏️ How to Edit Content & Data

All text, services, guides, and contact details are separated from the UI components:

1. **Company Details & WhatsApp Number**:
   - Edit [data/companyInfo.ts](file:///d:/Impulse/impulse-research-work/data/companyInfo.ts). Updating `whatsapp`, `phone`, or `email` here automatically propagates across all buttons, headers, footers, forms, and WhatsApp URLs.

2. **Services & Turnarounds**:
   - Edit [data/services.ts](file:///d:/Impulse/impulse-research-work/data/services.ts). You can add new services or modify deliverables, turnaround times, and descriptions.

3. **Research Resources & Citations**:
   - Edit [data/resources.ts](file:///d:/Impulse/impulse-research-work/data/resources.ts). Adding a new guide will automatically generate its dynamic page at `/resources/[slug]`.

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)
1. Push this repository to GitHub or GitLab.
2. Import the project into [Vercel](https://vercel.com).
3. The framework preset is automatically detected as **Next.js**.
4. Click **Deploy**. All pages will pre-render statically with zero configuration.

### Deploy to Node.js VPS / Linux Server
```bash
npm run build
npm run start
```
Use `pm2` or `systemd` to keep the process running on port 3000 behind Nginx.

---

## ⚖️ Academic Integrity Standards
Impulse Research Work operates under strict academic ethics:
- Mentorship, developmental critique, and statistical guidance only.
- Strict anti-plagiarism and anti-ghostwriting policies.
- Confidentiality protected under academic Non-Disclosure Agreements.
>>>>>>> fd2efef (Initial commit: Impulse Research Work academic portal codebase)
