export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  featured: boolean;
  category: string;
  deliverables: string[];
  methodology: string;
  turnaround: string;
  targetScholars: string;
  code: string;
}

export const services: Service[] = [
  {
    slug: "research-proposal-synopsis",
    title: "Research Proposal & Synopsis",
    shortDescription: "Formulate rigorous research problem statements, theoretical frameworks, research questions, and methodological blueprints tailored to institutional doctoral committees.",
    fullDescription: "A well-structured research proposal or synopsis forms the foundational pillar of any doctoral or master's journey. Impulse Research Work provides comprehensive structural critique and methodological guidance to help researchers articulate clear research problems, justifiable hypotheses, sound theoretical frameworks, and achievable methodological designs in alignment with university guidelines.",
    featured: true,
    category: "Foundational Research",
    code: "IRW-RPS-01",
    deliverables: [
      "Problem statement refinement & rationale formulation",
      "Literature review mapping & research gap identification",
      "Theoretical and conceptual framework alignment",
      "Methodological blueprint (Sampling, instrumentation, variables)",
      "Institutional submission compliance check"
    ],
    methodology: "Interactive scholarly consultations, rigorous literature synthesis critique, and committee guideline benchmarking.",
    turnaround: "5 – 7 Working Days (Iterative)",
    targetScholars: "PhD Aspirants, M.Phil Candidates, Postgraduate Scholars preparing departmental defense."
  },
  {
    slug: "thesis-dissertation-support",
    title: "Thesis & Dissertation Support",
    shortDescription: "End-to-end substantive chapter-by-chapter academic review, literature gap strengthening, argument coherence, and editorial alignment for doctoral dissertations.",
    fullDescription: "The doctoral dissertation is an exhaustive intellectual endeavor requiring rigorous chapter coherence, methodological precision, and scholarly depth. Our thesis support framework provides comprehensive developmental critique across all five or six traditional chapters, ensuring clarity of arguments, seamless transitions, and strict academic tone without altering your original authorship.",
    featured: true,
    category: "Doctoral Review",
    code: "IRW-TDS-02",
    deliverables: [
      "Complete 5-chapter dissertation structure assessment",
      "Literature synthesis coherence & critical evaluation audit",
      "Data chapter interpretation & discussion alignment",
      "Conclusion, implications & limitation validation",
      "Detailed margin notes and chapter revision report"
    ],
    methodology: "Multi-tier developmental review conducted by discipline-specific academic editors and methodologists.",
    turnaround: "10 – 18 Working Days (Milestone-based)",
    targetScholars: "PhD Scholars at mid-stage, pre-submission, or final dissertation revision stages."
  },
  {
    slug: "research-paper-support",
    title: "Research Paper Support",
    shortDescription: "Draft structuring, abstract crystallization, empirical discussion strengthening, and manuscript refinement for peer-reviewed journal readiness.",
    fullDescription: "Transforming empirical research into an impactful manuscript requires concise academic prose, transparent reporting of findings, and rigorous engagement with contemporary literature. We assist researchers in structuring manuscript sections—IMRAD format (Introduction, Methods, Results, and Discussion)—to meet the demanding criteria of international peer-reviewed journals.",
    featured: true,
    category: "Scholarly Publication",
    code: "IRW-RPS-03",
    deliverables: [
      "IMRAD structure optimization and narrative flow",
      "Abstract and keyword searchability enhancement",
      "Empirical results discussion vs contemporary literature",
      "Clarity of statistical & qualitative disclosures",
      "Reviewer expectation readiness checklist"
    ],
    methodology: "Pre-submission peer review simulation focusing on scholarly contribution and empirical validity.",
    turnaround: "4 – 6 Working Days",
    targetScholars: "Faculty, Postdocs, and Graduate Researchers targeting indexed journal submission."
  },
  {
    slug: "data-analysis",
    title: "Data Analysis",
    shortDescription: "Comprehensive quantitative and qualitative statistical consultation covering SPSS, R, Python, PLS-SEM, AMOS, thematic coding, and APA table formatting.",
    fullDescription: "Empirical rigor depends directly on appropriate statistical modeling and transparent interpretation. Our research methodologists and data analysts support scholars in selecting appropriate statistical tests, validating measurement models, executing structural equation modeling (SEM), and interpreting qualitative corpora using established scientific standards.",
    featured: true,
    category: "Empirical & Quantitative",
    code: "IRW-DAS-04",
    deliverables: [
      "Normality, reliability, and validity testing",
      "Descriptive and inferential statistical modeling",
      "Structural Equation Modeling (PLS-SEM, AMOS / CB-SEM)",
      "Qualitative thematic analysis & framework coding",
      "Standardized APA/IEEE statistical tables & figures with interpretation guides"
    ],
    methodology: "Rigorous analytical pipelines using SPSS, R, SmartPLS, AMOS, Python, and NVivo with complete syntax/data logs.",
    turnaround: "5 – 10 Working Days",
    targetScholars: "Quantitative, qualitative, and mixed-methods researchers requiring empirical support."
  },
  {
    slug: "academic-editing",
    title: "Academic Editing",
    shortDescription: "Substantive editorial refinement, disciplinary tone calibration, syntax precision, and academic voice enhancement for scholarly manuscripts.",
    fullDescription: "Academic writing must balance clarity, academic tone, and precision. Our academic editing service goes beyond surface grammar checks: we assess academic voice, eliminate passive ambiguities, standardize terminology, and enhance sentence cadence to ensure your manuscript conveys complex research insights persuasively.",
    featured: false,
    category: "Language & Style",
    code: "IRW-AES-05",
    deliverables: [
      "Substantive language editing & sentence structure refinement",
      "Disciplinary terminology & academic register calibration",
      "Elimination of redundancies, informal phrasing, and ambiguity",
      "Consistency in US/UK scholarly conventions",
      "Track-changes manuscript with comprehensive editor commentary"
    ],
    methodology: "Dual-editor protocol: primary developmental edit followed by formal academic proofreading pass.",
    turnaround: "3 – 5 Working Days",
    targetScholars: "Scholars, ESL/EFL researchers, and authors preparing manuscripts for global readership."
  },
  {
    slug: "referencing-formatting",
    title: "Referencing & Formatting",
    shortDescription: "Meticulous citation standardization across APA 7th, Harvard, IEEE, Chicago, MLA, and specific institutional thesis guidelines.",
    fullDescription: "Inconsistent citations and improper formatting undermine scholarly credibility and invite desk rejections. Our formatting specialists thoroughly cross-reference in-text citations against the reference list, resolve missing metadata (DOIs, page numbers, volume numbers), and style the entire manuscript to exact university or journal specifications.",
    featured: false,
    category: "Technical Formatting",
    code: "IRW-RFS-06",
    deliverables: [
      "100% in-text vs reference list cross-verification",
      "Citation styling in APA 7, Harvard, IEEE, Chicago, Vancouver, MLA",
      "Resolution of missing DOIs, issue numbers, and publisher metadata",
      "Thesis layout styling (Margins, pagination, font hierarchies, table of contents)",
      "Automated Reference Manager compatibility (Mendeley, Zotero, EndNote)"
    ],
    methodology: "Line-by-line manual audit supported by reference database verification.",
    turnaround: "2 – 4 Working Days",
    targetScholars: "Scholars preparing final thesis binding or author revisions for submission."
  },
  {
    slug: "similarity-review",
    title: "Similarity Review",
    shortDescription: "In-depth similarity index diagnostics using licensed academic plagiarism detection systems, accompanied by targeted paraphrase and citation guidance.",
    fullDescription: "Navigating academic similarity reports requires a nuanced understanding of standard phrases, bibliography flags, and legitimate methodological formulas versus problematic overlaps. We provide thorough diagnostic reviews of similarity reports, identifying problematic clusters and providing scholarly rephrasing and attribution guidance to uphold intellectual integrity.",
    featured: false,
    category: "Academic Integrity",
    code: "IRW-SRS-07",
    deliverables: [
      "Detailed similarity diagnostic report breakdown",
      "Differentiation between coincidental terminology and substantive overlap",
      "Targeted scholarly paraphrase and synthesis guidance",
      "Quotation attribution and block citation correction",
      "Integrity compliance recommendations"
    ],
    methodology: "Ethical diagnostic audit without storing scholar manuscripts in global repositories.",
    turnaround: "24 – 48 Hours",
    targetScholars: "Scholars undergoing pre-submission institutional plagiarism audits."
  },
  {
    slug: "ai-writing-report-guidance",
    title: "AI Writing Report Guidance",
    shortDescription: "Objective assessment of automated AI writing probability scores with academic attribution, voice humanization, and scholarly re-grounding.",
    fullDescription: "With modern academic institutions adopting AI detection metrics, researchers frequently face false positive flags caused by generic syntactic patterns or standardized academic formulas. We analyze AI detection reports, pinpointing robotic cadence patterns, and guide scholars in restoring authentic academic voice, direct empirical evidence, and personal scholarly synthesis.",
    featured: false,
    category: "Academic Integrity",
    code: "IRW-AIR-08",
    deliverables: [
      "Assessment of automated AI detector false positives vs genuine text",
      "Syntactic cadence variation & voice authenticating recommendations",
      "Deep literature grounding with primary empirical citations",
      "Structural re-articulation of formulaic conclusions",
      "Institutional policy compliance guidance"
    ],
    methodology: "In-depth linguistic audit and scholarly synthesis re-grounding.",
    turnaround: "2 – 3 Working Days",
    targetScholars: "Researchers seeking to clarify academic originality and resolve AI suspicion reports."
  },
  {
    slug: "journal-submission-support",
    title: "Journal Submission Support",
    shortDescription: "Strategic journal targeting, scope-fit analysis, author guidelines compliance, and professional cover letter drafting for peer-reviewed journals.",
    fullDescription: "Selecting the wrong journal or failing to follow complex author submission guidelines leads to avoidable desk rejections. Our journal submission support helps researchers identify legitimate, high-fit journals indexed in major scholarly databases, verify author instructions, format submission packages, and draft persuasive cover letters to editors.",
    featured: false,
    category: "Publishing Strategy",
    code: "IRW-JSS-09",
    deliverables: [
      "Target journal scope-matching report (Aims, scope, indexing status)",
      "Strict compliance check against author guidelines and word counts",
      "Compelling academic cover letter addressed to the Editor-in-Chief",
      "Preparation of supplementary files, author declarations & title page",
      "Response-to-reviewers structural template and revision strategy"
    ],
    methodology: "Objective journal metric evaluation and submission package verification.",
    turnaround: "4 – 6 Working Days",
    targetScholars: "Authors preparing submissions to peer-reviewed international journals."
  },
  {
    slug: "ppt-viva-support",
    title: "PPT & Viva Support",
    shortDescription: "Defensible slide deck formulation, research defense narrative design, and mock Viva Voce defense preparation with potential committee queries.",
    fullDescription: "Presenting years of doctoral research in a 20-30 minute Viva Voce presentation requires ruthless condensation, clear visual evidence, and confident command of methodological rationale. We help scholars structure defensible presentation slides, identify likely committee questions, and prepare articulate responses defending their thesis methodology and contributions.",
    featured: false,
    category: "Defense Preparation",
    code: "IRW-PVS-10",
    deliverables: [
      "Executive Viva defense slide deck (25–35 academic slides)",
      "Visual conceptual models, hypothesis matrices & result charts",
      "Anticipated Viva Voce question bank tailored to dissertation methodology",
      "Methodological justification talking points & defense script",
      "Examiner critique handling strategy"
    ],
    methodology: "Academic defense coaching and presentation structure optimization.",
    turnaround: "3 – 5 Working Days",
    targetScholars: "PhD Scholars scheduled for pre-PhD presentation or final Viva Voce defense."
  }
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getFeaturedServices(): Service[] {
  return services.filter((s) => s.featured);
}
