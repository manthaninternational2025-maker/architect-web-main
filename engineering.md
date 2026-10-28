# Engineering Architecture Specification: Impulse Research Work

## 1. Technical Stack & Standards
- **Framework**: Next.js 14+ (App Router architecture with TypeScript)
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS with custom academic design tokens configured in `tailwind.config.ts`
- **Typography**: `@next/font/google` with `Source Serif 4` (editorial serif) and `Inter` (UI sans-serif)
- **Icons**: Lucide React (clean, light, academic-grade iconography; no cartoon icons)
- **Forms**: Pure client components with accessible HTML5 validation, state handling, instant WhatsApp dispatch generator, and file upload mock handler.

## 2. Directory Structure
```
impulse-research-work/
├── app/
│   ├── layout.tsx               # Root layout, Google Fonts, Metadata, Header & Footer
│   ├── page.tsx                 # Main Academic Portal Home Page (Hero, Spec Table, Issues, etc.)
│   ├── about/
│   │   └── page.tsx             # About Us, Academic Standards & Advisory Charter
│   ├── services/
│   │   ├── page.tsx             # Complete 10-Service Academic Directory
│   │   └── [slug]/
│   │       └── page.tsx         # Dynamic Service Specification Page
│   ├── resources/
│   │   ├── page.tsx             # Academic Resources & Archive Listing
│   │   └── [slug]/
│   │       └── page.tsx         # Dynamic Resource / Research Guide Reader
│   ├── pricing/
│   │   └── page.tsx             # Transparent Academic Consultation Framework
│   ├── experts/
│   │   └── page.tsx             # Faculty & Methodological Mentors
│   ├── submit/
│   │   └── page.tsx             # Research Requirement Dossier Form
│   ├── contact/
│   │   └── page.tsx             # Contact Information & Direct WhatsApp Channels
│   ├── privacy/
│   │   └── page.tsx             # Scholar Confidentiality & Data Privacy
│   ├── terms/
│   │   └── page.tsx             # Consultation Terms of Engagement
│   └── academic-integrity/
│       └── page.tsx             # Academic Ethics & Integrity Charter
├── components/
│   ├── layout/
│   │   ├── TopUtilityBar.tsx    # Scholarly helpline, WhatsApp, ISSN/portal tags
│   │   ├── Masthead.tsx         # Logo, Business title, Academic search bar
│   │   ├── Navbar.tsx           # Primary navigation with desktop & mobile drawer
│   │   ├── Sidebar.tsx          # Multi-widget academic sidebar (Submission CTA, Info, Keywords)
│   │   └── Footer.tsx           # 4-Column academic footer with disclaimers
│   ├── ui/
│   │   ├── ServiceCard.tsx      # Academic article/service card with Galley badge
│   │   ├── ResourceCard.tsx     # Resource archive card with citation metadata
│   │   ├── SpecTable.tsx        # Journal-style two-column institutional specification table
│   │   ├── SectionHeader.tsx    # Academic section heading with serif styling & rule
│   │   └── Badge.tsx            # Academic tag pill
│   ├── forms/
│   │   ├── RequirementForm.tsx  # Interactive multi-field requirement submission
│   │   └── ContactForm.tsx      # Contact form with direct WhatsApp dispatch
├── data/
│   ├── services.ts              # Strongly-typed data for all 10 academic services
│   ├── resources.ts             # Strongly-typed scholarly guides and resources
│   ├── companyInfo.ts           # Centralized coordinates, phone, WhatsApp (+91 8527231973)
│   └── navigation.ts            # Navigation items & route mapping
├── public/
│   ├── images/
│   │   ├── impulse-logo.png     # Official Impulse logo placeholder/file
│   │   └── ...                  # Academic hero & research photography
├── styles/
│   └── globals.css              # Custom font utilities, print styles, selection colors
├── tailwind.config.ts           # Academic color palette, serif fonts, container setup
├── tsconfig.json
├── package.json
└── README.md
```

## 3. Data Separation Architecture
All content data is strictly decoupled from presentation:
- `data/services.ts`: Defines `Service` interface with `slug`, `title`, `shortDescription`, `fullDescription`, `keyDeliverables`, `methodology`, `targetResearchers`, `scopePill`, and `estimatedTurnaround`.
- `data/resources.ts`: Defines `Resource` interface with `slug`, `title`, `category`, `publishedDate`, `summary`, `readTime`, `citationText`, and `fullContentMarkdown`.
- `data/companyInfo.ts`: Single source of truth for name, phone, WhatsApp number (`+91 8527231973`), email, office hours, and integrity policies.

## 4. Key Engineering Safeguards
1. **Zero Broken Links**: All routes (`/services/[slug]`, `/resources/[slug]`, `/submit`, `/contact`, `/about`, etc.) have full page implementations with static parameter generation (`generateStaticParams`) or fallback rendering.
2. **SEO & Academic Metadata**:
   - Distinct metadata titles and meta descriptions per page.
   - OpenGraph tags for academic citations.
   - Semantic HTML5 structure (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`).
   - Accessible ARIA labels and skip-to-content links modeled after OJS accessibility standards.
3. **No Horizontal Scroll**:
   - Proper responsive grid configuration (`grid grid-cols-1 lg:grid-cols-12 gap-8`).
   - Tables with responsive container wrappers.
4. **Interactive Validation & Fallback States**:
   - Forms feature immediate field feedback, email regex checks, telephone verification, and dynamic WhatsApp message link generation so scholars can submit their requirements immediately.
