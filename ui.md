# UI / UX Architecture Specification: Impulse Research Work

## 1. Visual Identity & Brand Philosophy
The design language is informed by Open Journal Systems (OJS) and elite university press publications (Oxford Academic, Cambridge Core, JSTOR, Nature Research), elevated with modern editorial typography, generous whitespace, and crisp 1px borders.

### Color Palette Tokens
| Token | Hex Value | Semantic Usage |
|---|---|---|
| `navy-950` (Primary Dark Navy) | `#07162F` | Main brand headers, hero backgrounds, primary buttons, borders |
| `navy-900` | `#0D2346` | Secondary dark navy, hover states for dark elements |
| `orange-500` (Primary Orange) | `#F4511E` | High-impact CTAs, active badges, accents, subtle underlines |
| `orange-600` | `#D84315` | Hover state for primary orange buttons |
| `sand-50` (Warm Off-White) | `#F7F4EE` | Page canvas background, subtle section bands, callout cards |
| `sand-100` | `#EFECE5` | Secondary border contrast, subtle table row shading |
| `white` | `#FFFFFF` | Card backgrounds, main article reading area, input fields |
| `text-dark` | `#111827` | High-legibility editorial body copy and primary headlines |
| `text-muted` | `#4B5563` | Academic metadata, dates, author notes, citations |
| `border-subtle` | `#E2DDD5` | Crisp 1px academic dividers, tables, card borders |

*Strict prohibition: No neon SaaS gradients, no purple AI styling, no heavy dropshadows, no bubbly rounded cartoon pill buttons.*

## 2. Typography Hierarchy
- **Primary Editorial Heading Font**: `Source Serif 4` / `Merriweather` / `DM Serif Display` (Serif, authoritative, academic weight 600/700).
- **Body & Interface Font**: `Inter` / `Manrope` (Sans-serif, clean metric proportions, high x-height for readability at 14px–16px).
- **Metadata & Monospace/Caps Font**: `JetBrains Mono` / uppercase `Inter` (tracking-wider, 11px-12px, for ISSNs, DOIs, category tags).

### Scale & Weight
- **Banner / H1**: 2.25rem – 2.75rem (36px–44px), serif, tracking-tight, leading-snug.
- **H2 Section Headings**: 1.75rem – 2.0rem (28px–32px), serif, bottom border accent.
- **H3 Service / Issue Titles**: 1.25rem – 1.4rem (20px–22px), serif or medium weight sans-serif.
- **H4 Card Titles**: 1.05rem – 1.15rem (17px–18px), semi-bold serif link.
- **Body Regular**: 1.0rem (16px), line-height 1.65, `#111827`.
- **Academic Meta / Labels**: 0.8125rem (13px), uppercase letter-spacing 0.05em, `#4B5563`.

## 3. Structural Layout: The Academic Multi-Column Grid
Following the inspected reference journal architecture:
- **Max Container Width**: `1240px`, centered with `px-4 sm:px-6 lg:px-8`.
- **Top Utility Header**:
  - Academic metadata (ISSN/Registration tag, scholar assistance line, direct WhatsApp contact `+91 8527231973`).
  - Institutional Quick Links: "Scholar Login", "Submit Requirement".
- **Main Institutional Masthead**:
  - Official brand logo (`/images/impulse-logo.png`), business title, and academic mission banner.
  - Search inquiry bar with instant filter.
- **Primary Navigation Bar**:
  - Clean sticky navbar in dark navy (`#07162F`) or crisp warm-white with active orange underline (`#F4511E`).
  - Items: Home, About Us, Services, Research Resources, Pricing, Our Experts, Contact.
  - Right CTA: "Submit Requirement" button in brand orange (`#F4511E`).
- **Main Portal Canvas (2-Column Grid on Desktop)**:
  - **Main Content Area (68%–72%)**:
    - Section 1: Academic Portal Hero & Scope Statement
    - Section 2: About Impulse & Institutional Credentials Table (modeled on reference journal specs table)
    - Section 3: Research Support Services (Journal-indexed card style)
    - Section 4: Featured Research Support ("Current Issue" format with metadata and "Synopsis / PDF" style badge)
    - Section 5: Methodological 4-Step Process
    - Section 6: Quality & Integrity Standards
    - Section 7: Scholarly Resource Archive
    - Section 8: Consultation Dossier Callout
  - **Academic Sidebar (28%–32%)**:
    - **Widget 1: Submission Action Block**: High-priority "Submit Requirement" action card with direct WhatsApp button.
    - **Widget 2: Scholar Information Portal**: Targeted guidance links for PhD Candidates, Master's Scholars, and Faculty.
    - **Widget 3: Journal & Research Scope Dossier**: Research disciplines accepted (Social Sciences, Humanities, Engineering, Management, Health Sciences).
    - **Widget 4: Research Keyword Cloud**: Interactive research topic keywords (e.g. "SPSS", "PLS-SEM", "APA 7", "Scopus Indexing", "Qualitative Coding").
    - **Widget 5: Helpline & Ethics Verification**: Direct WhatsApp hotline and Academic Integrity Charter stamp.

## 4. Component Design Patterns
- **Academic Article / Service Card**:
  - Crisp 1px border (`#E2DDD5`), white background, 0px or 4px subtle radius.
  - Category / Subject Pill (e.g., `DATA ANALYSIS & MODELING`).
  - Title: Editorial serif, hover transition to `#F4511E`.
  - Metadata row: Scope/Discipline, Delivery Cycle, Review Format.
  - Synopsis summary: 2-3 lines of precise editorial copy.
  - Action row: "Learn More" link and PDF/Dossier galley badge (styled exactly like OJS PDF buttons: bordered button with PDF icon / document icon).
- **Institutional Specification Table**:
  - Modeled directly after the reference website's journal specification table:
  - 2-column alternating borders, bold left labels (e.g., Discipline, Focus, Consultation Format, Phone, Email, WhatsApp, Similarity Diagnostics Tool), clean padding.
- **Buttons**:
  - Primary: `#F4511E` background, white text, 4px border-radius, font-medium, hover `#D84315`.
  - Secondary: `#07162F` background, white text, hover `#0D2346`.
  - Academic Outline: 1px border `#07162F`, dark text, hover bg `#07162F` text white.
  - Galley / Document Badge: 1px border `#07162F`, uppercase 12px, font-bold, tracking-wide.

## 5. Responsive / Mobile Behavior
- **Desktop (1024px+)**: Full 2-column academic layout (Main + Sticky Sidebar).
- **Tablet (768px - 1023px)**: Main content primary, sidebar gracefully wraps beneath main issue section with grid-2 layout.
- **Mobile (<768px)**:
  - Mobile hamburger navigation drawer with slide-out or clean overlay.
  - Prominent top WhatsApp tap-to-call button.
  - Sidebar widgets stack sequentially in priority order.
  - All tables wrapped in smooth horizontal scroll containers (`overflow-x-auto`).
  - No horizontal scrolling or viewport clip.
