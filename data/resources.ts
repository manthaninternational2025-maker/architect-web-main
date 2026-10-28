export interface Resource {
  slug: string;
  title: string;
  category: string;
  publishedDate: string;
  summary: string;
  readTime: string;
  author: string;
  doi: string;
  pages: string;
  citationText: string;
  sections: {
    heading: string;
    content: string;
  }[];
}

export const resources: Resource[] = [
  {
    slug: "how-to-structure-a-research-proposal",
    title: "How to Structure a Research Proposal: A Practical Academic Framework",
    category: "Methodology & Design",
    publishedDate: "2026-02-10",
    summary: "A systematic step-by-step architectural breakdown of doctoral research proposals, detailing problem statement justification, conceptual frameworks, and methodological feasibility.",
    readTime: "9 min read",
    author: "Academic Advisory Board, Impulse Research Work",
    doi: "10.5281/zenodo.irw.2026.001",
    pages: "01–08",
    citationText: "Impulse Research Work. (2026). How to Structure a Research Proposal: A Practical Academic Framework. IRW Research Guidance Series, 1(1), 01–08.",
    sections: [
      {
        heading: "1. The Foundational Role of the Research Proposal",
        content: "A doctoral research proposal is not merely an administrative prerequisite; it is a scholarly contract defining the boundaries, feasibility, and methodological validity of your prospective inquiry. Departmental research committees evaluate proposals primarily on three dimensions: intellectual significance, conceptual clarity, and operational feasibility. Without a clearly delineated problem statement rooted in demonstrable gaps in contemporary literature, even ambitious inquiries risk immediate departmental rejection."
      },
      {
        heading: "2. Formulating a Defensible Problem Statement",
        content: "A compelling problem statement addresses the tension between what is empirically known and what remains unresolved. Scholars must avoid formulating problems around simple lack of regional data unless theoretical mechanisms are genuinely contingent on local variables. Instead, frame the problem in terms of theoretical incongruities, conflicting empirical findings, or unexamined mediating factors."
      },
      {
        heading: "3. Aligning Theoretical Frameworks with Research Questions",
        content: "Every empirical inquiry must anchor itself within an established body of theory. Your conceptual model must explicitly map independent, dependent, mediating, and moderating constructs. Each research question must logically derive from this conceptual framework, ensuring that statistical hypotheses or qualitative lines of inquiry test specific theoretical relationships."
      },
      {
        heading: "4. Methodological Precision & Feasibility",
        content: "Doctoral committees scrutinize methodology for replicability and rigor. Explicitly articulate your target population, sampling frame, statistical power justification (e.g., G*Power calculations), instrumentation validity, and ethical safeguards. A robust proposal anticipates limitations and demonstrates operational contingency plans."
      }
    ]
  },
  {
    slug: "apa-7-referencing-guide",
    title: "APA 7 Referencing Guide: Complete Core Rules for Academic Manuscripts",
    category: "Referencing & Standards",
    publishedDate: "2026-01-28",
    summary: "Comprehensive reference manual for the American Psychological Association 7th Edition style manual, covering parenthetical citations, narrative formats, and electronic resource DOIs.",
    readTime: "12 min read",
    author: "Editorial Department, Impulse Research Work",
    doi: "10.5281/zenodo.irw.2026.002",
    pages: "09–16",
    citationText: "Impulse Research Work. (2026). APA 7 Referencing Guide: Complete Core Rules for Academic Manuscripts. IRW Research Guidance Series, 1(1), 09–16.",
    sections: [
      {
        heading: "1. Key Evolution from APA 6 to APA 7",
        content: "The 7th edition of the APA Publication Manual introduced crucial simplifications designed for modern scholarly publishing. The requirement for 'Retrieved from' before URLs has been eliminated unless a retrieval date is strictly necessary. Furthermore, publisher location (city/state) is no longer included for book citations, and in-text citations for works with three or more authors immediately abbreviate to the first author followed by 'et al.' from the initial citation."
      },
      {
        heading: "2. Standard In-Text Citation Formats",
        content: "Parenthetical citations place both author and year in parentheses: (Smith, 2024) or (Chen et al., 2025, p. 45). Narrative citations integrate the author directly into sentence syntax: According to Chen et al. (2025), empirical models must account for institutional context. Direct quotations require specific page numbers or paragraph identifiers."
      },
      {
        heading: "3. Journal Article References with DOIs",
        content: "Always format DOIs as secure live hyperlinks (https://doi.org/10.xxxx/xxxxx). Do not place a period following the DOI URL. Include issue numbers in parentheses immediately following the volume number in italics: Author, A. A., & Author, B. B. (Year). Title of article. Title of Periodical, Volume(Issue), Page–Range. https://doi.org/xxxx"
      },
      {
        heading: "4. Multi-Author Lists in the Reference Section",
        content: "Under APA 7, provide surnames and initials for up to 20 authors in the reference list. When a work has 21 or more authors, list the first 19 authors, insert an ellipsis (...), and append the final author's name without an ampersand."
      }
    ]
  },
  {
    slug: "preparing-your-thesis-for-final-submission",
    title: "Preparing Your Thesis for Final Submission: An Institutional Checklist",
    category: "Dissertation & Thesis",
    publishedDate: "2026-01-15",
    summary: "The definitive pre-submission audit protocol for PhD scholars covering front matter formatting, cross-referencing integrity, ethics declarations, and committee binding.",
    readTime: "8 min read",
    author: "Academic Advisory Board, Impulse Research Work",
    doi: "10.5281/zenodo.irw.2026.003",
    pages: "17–24",
    citationText: "Impulse Research Work. (2026). Preparing Your Thesis for Final Submission: An Institutional Checklist. IRW Research Guidance Series, 1(1), 17–24.",
    sections: [
      {
        heading: "1. The Rigor of Pre-Submission Auditing",
        content: "The final weeks before doctoral thesis submission are frequently marred by high stress and oversight of technical presentation details. While examiners judge the intellectual merit of your research, formatting anomalies, broken cross-references, or mismatched bibliographic entries immediately bias review committees toward doubts regarding research thoroughness."
      },
      {
        heading: "2. Front Matter and Institutional Declarations",
        content: "Verify that all certificates of original work, supervisor endorsement sheets, copyright transfers, ethics clearance notices, and acknowledgments conform strictly to institutional templates. Pagination for front matter must employ lower-case Roman numerals (i, ii, iii), transitioning to Arabic numerals (1, 2, 3) at Chapter 1."
      },
      {
        heading: "3. Complete In-Text Citation Audit",
        content: "Perform a bidirectional cross-check: verify that every parenthetical and narrative citation in your chapters exists in the final bibliography with matching dates, and ensure that no orphaned references exist in your bibliography that are never cited in text."
      },
      {
        heading: "4. Visual Assets & Data Tables",
        content: "Every table and figure must have a descriptive academic title, numbered sequentially per chapter (e.g., Table 4.1, Figure 4.2), and accompanied by comprehensive source notes. Confirm that all high-resolution figures render legibly in monochrome print."
      }
    ]
  },
  {
    slug: "understanding-similarity-reports",
    title: "Understanding Similarity Reports: Deconstructing Index Diagnostics",
    category: "Academic Integrity",
    publishedDate: "2025-12-20",
    summary: "Deconstructing similarity percentages, distinguishing between formulaic scholarly phrasing and intellectual overlap, and establishing ethical remediation practices.",
    readTime: "10 min read",
    author: "Research Ethics Directorate, Impulse Research Work",
    doi: "10.5281/zenodo.irw.2026.004",
    pages: "25–32",
    citationText: "Impulse Research Work. (2025). Understanding Similarity Reports: Deconstructing Index Diagnostics. IRW Research Guidance Series, 1(1), 25–32.",
    sections: [
      {
        heading: "1. The Fallacy of the Raw Similarity Percentage",
        content: "Academic similarity indices produced by systems such as Turnitin or Drillbit are diagnostic tools, not definitive arbiters of plagiarism. A raw similarity index of 14% does not automatically indicate 14% unoriginal thought. Methodological sections, standard legislative references, and institutional declaration formulas frequently generate legitimate coincidental matches."
      },
      {
        heading: "2. Analyzing Source Clusters",
        content: "The critical metric is not the composite score, but individual source cluster percentages. A composite similarity of 12% composed of single-sentence matches under 1% across 15 disparate sources is academically benign. Conversely, a single matched source contributing 9% indicates an unacknowledged borrowing of argument structure that requires immediate scholarly synthesis."
      },
      {
        heading: "3. Legitimate Paraphrasing vs Patchwriting",
        content: "Patchwriting—the practice of substituting synonyms into another author's sentence structure—is easily flagged by diagnostic algorithms and represents poor academic craft. Legitimate scholarly synthesis requires digesting the primary finding, closing the source text, and articulating the underlying mechanism in the context of your own conceptual framework."
      },
      {
        heading: "4. Ethical Guidelines for Report Remediation",
        content: "Never rely on automated synonym-replacement tools or AI re-spinners to artificially depress similarity indices. These practices destroy scholarly nuance and frequently introduce absurd terminological distortions. Rigorous intellectual paraphrasing, explicit attribution, and direct quotation with page numbers are the only legitimate solutions."
      }
    ]
  },
  {
    slug: "research-data-analysis-basics",
    title: "Research Data Analysis Basics: Methodological Foundations for Scholars",
    category: "Empirical & Quantitative",
    publishedDate: "2025-11-15",
    summary: "An introduction to choosing appropriate statistical techniques, verifying normality and measurement models, and transparently reporting empirical findings.",
    readTime: "11 min read",
    author: "Quantitative Methods Unit, Impulse Research Work",
    doi: "10.5281/zenodo.irw.2026.005",
    pages: "33–42",
    citationText: "Impulse Research Work. (2025). Research Data Analysis Basics: Methodological Foundations for Scholars. IRW Research Guidance Series, 1(1), 33–42.",
    sections: [
      {
        heading: "1. Statistical Alignment with Research Design",
        content: "Selecting statistical tests begins with research questions, not data packages. Scholars must categorize variables as categorical (nominal/ordinal) or continuous (interval/ratio). Parametric tests (t-tests, ANOVA, linear regression) demand strict adherence to assumptions of normality, homoscedasticity, and absence of multicollinearity."
      },
      {
        heading: "2. Verifying Measurement Models in Survey Research",
        content: "Prior to testing structural relationships between constructs, researchers must establish measurement validity. Cronbach's alpha and Composite Reliability (CR) verify internal consistency, while Average Variance Extracted (AVE) confirms convergent validity. For multi-item constructs, exploratory or confirmatory factor analysis (CFA) is indispensable."
      },
      {
        heading: "3. Choosing Between CB-SEM and PLS-SEM",
        content: "Covariance-Based SEM (e.g., AMOS, LISREL) is optimal for theory testing and confirmation requiring multivariate normal data. Partial Least Squares SEM (PLS-SEM, using SmartPLS) is ideal for exploratory models, complex hierarchical models, non-normal distributions, or research focusing on predictive relevance."
      },
      {
        heading: "4. Transparent Reporting Standards",
        content: "Always report effect sizes (Cohen's d, R², f²) alongside p-values. Disclose data cleaning protocols, outlier management strategies, and missing data imputation procedures in full alignment with APA guidelines."
      }
    ]
  }
];

export function getResourceBySlug(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug);
}
