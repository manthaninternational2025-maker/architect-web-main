export interface Resource {
  slug: string;
  title: string;
  category: string;
  publishedDate: string;
  summary: string;
  readTime: string;
  author: string;
  volume: string;
  issue: string;
  pages: string;
  doi: string;
  citationText: string;
  sections: {
    heading: string;
    content: string;
  }[];
}

export const resources: Resource[] = [
  {
    slug: "revival-and-adaptation-confucianism-china",
    title: "Revival and Adaptation: The Role of Confucianism in Contemporary China",
    category: "Philosophy & Cultural Studies",
    publishedDate: "AUGUST 2026",
    summary: "An analytical study investigating the resurgence, institutional adaptation, and state-society dynamics of Confucian philosophy in contemporary Chinese political and cultural discourse.",
    readTime: "7 min read",
    author: "Khem Chand",
    volume: "Vol. 1",
    issue: "Issue 1",
    pages: "pp. 18-23",
    doi: "10.5281/imjsi.2026.01.04",
    citationText: "Chand, K. (2026). Revival and Adaptation: The Role of Confucianism in Contemporary China. Manthan: International Multidisciplinary Journal of Social Inquiry, 1(1), 18–23.",
    sections: [
      {
        heading: "Abstract",
        content: "This paper examines the renewed interest in Confucian ideals within contemporary China. Analyzing state initiatives, educational curricula, and modern socio-cultural practices, the research elucidates how traditional philosophical doctrines are systematically adapted to meet the demands of modern governance and societal harmony."
      },
      {
        heading: "Introduction & Contextual Framework",
        content: "Over the past three decades, Chinese intellectual and political spheres have witnessed a marked revival of classical philosophy. Confucianism, once critiqued during ideological transitions, has been re-conceptualized as a cornerstone of national cultural identity and civil ethics."
      },
      {
        heading: "Conclusion & Theoretical Implications",
        content: "The institutional adaptation of Confucian principles exemplifies how ancient ethical frameworks can be re-engineered within modernized administrative systems to cultivate civic cohesion and cross-generational values."
      }
    ]
  },
  {
    slug: "confucianism-in-india-cross-cultural-philosophical-dialogues",
    title: "Confucianism in India: Cross-Cultural Philosophical Dialogues in the 21st Century",
    category: "Comparative Philosophy",
    publishedDate: "AUGUST 2026",
    summary: "A comparative exploration examining bilateral intellectual intersections between classical Confucian ethics and Indian philosophical paradigms in the contemporary global era.",
    readTime: "6 min read",
    author: "Chanden Kumar Jha",
    volume: "Vol. 1",
    issue: "Issue 1",
    pages: "pp. 13-17",
    doi: "10.5281/imjsi.2026.01.03",
    citationText: "Jha, C. K. (2026). Confucianism in India: Cross-Cultural Philosophical Dialogues in the 21st Century. Manthan: International Multidisciplinary Journal of Social Inquiry, 1(1), 13–17.",
    sections: [
      {
        heading: "Abstract",
        content: "This inquiry focuses on the comparative dimensions of Confucian thought within Indian scholarly discourse. Highlighting parallel themes in moral self-cultivation, social order, and pedagogical ethics, the article establishes an interdisciplinary dialogue between Eastern intellectual traditions."
      },
      {
        heading: "Philosophical Synthesis",
        content: "By analyzing textual intersections between Confucian Ren (benevolence) and Indian concepts of Dharma and Ahimsa, the study outlines a constructive model for 21st-century cross-cultural ethics and multilateral understanding."
      }
    ]
  },
  {
    slug: "reforming-human-nature-xunzi-philosophy",
    title: "Reforming Human Nature: Xunzi’s Ethical and Political Philosophy",
    category: "Classical Political Theory",
    publishedDate: "AUGUST 2026",
    summary: "A critical textual analysis of Xunzi's assertion of inherent human moral ambiguity and the foundational requirement of ritual and institutional discipline for social cohesion.",
    readTime: "8 min read",
    author: "Sakshi Sharma",
    volume: "Vol. 1",
    issue: "Issue 1",
    pages: "pp. 7-12",
    doi: "10.5281/imjsi.2026.01.02",
    citationText: "Sharma, S. (2026). Reforming Human Nature: Xunzi’s Ethical and Political Philosophy. Manthan: International Multidisciplinary Journal of Social Inquiry, 1(1), 7–12.",
    sections: [
      {
        heading: "Abstract",
        content: "Xunzi’s foundational premise that human nature requires intentional ethical refinement presents a profound cornerstone of Warring States political thought. This study deconstructs Xunzi’s doctrine of Xing E (human nature is problematic) and evaluates the role of Li (ritual propriety) and education in statecraft."
      },
      {
        heading: "Ethical & Political Construct",
        content: "Unlike the optimistic Mencian perspective, Xunzi emphasizes systemic institutional guidance and pedagogical discipline, offering timeless insights into the balance between civic laws, moral education, and social order."
      }
    ]
  },
  {
    slug: "critical-analysis-legal-human-rights-undertrial-female-prisoners-india",
    title: "A Critical Analysis of Legal and Human Rights of Undertrial Female Prisoners in India",
    category: "Law & Human Rights",
    publishedDate: "AUGUST 2026",
    summary: "An empirical socio-legal analysis reviewing statutory protections, prison conditions, judicial precedents, and systemic vulnerabilities confronting female undertrial detainees.",
    readTime: "9 min read",
    author: "Rahul Sharma",
    volume: "Vol. 1",
    issue: "Issue 1",
    pages: "pp. 1-6",
    doi: "10.5281/imjsi.2026.01.01",
    citationText: "Sharma, R. (2026). A Critical Analysis of Legal and Human Rights of Undertrial Female Prisoners in India. Manthan: International Multidisciplinary Journal of Social Inquiry, 1(1), 1–6.",
    sections: [
      {
        heading: "Abstract",
        content: "This paper investigates the legal, procedural, and institutional challenges experienced by female undertrial prisoners in India. Drawing upon constitutional guarantees, international human rights conventions, and empirical prison statistics, it evaluates bail accessibility, custodial hygiene, and legal aid efficacy."
      },
      {
        heading: "Judicial Mandates & Policy Imperatives",
        content: "The study articulates actionable policy reforms, urging judicial fast-tracking, decentralized legal aid mechanisms, and specialized institutional rehabilitation to safeguard the dignity and constitutional rights of female detainees."
      }
    ]
  },
  {
    slug: "decline-and-fall-factors-downfall-mughal-empire",
    title: "Decline and Fall: Factors Contributing to the Downfall of the Mughal Empire",
    category: "Historical Inquiries",
    publishedDate: "AUGUST 2026",
    summary: "A historiographical reassessment of the fiscal strains, agrarian distress, regional rebellions, and administrative fragmentation that precipitated the decline of the Mughal Empire in 18th-century South Asia.",
    readTime: "8 min read",
    author: "Aastha Rani",
    volume: "Vol. 1",
    issue: "Issue 1",
    pages: "pp. 38-42",
    doi: "10.5281/imjsi.2026.01.06",
    citationText: "Rani, A. (2026). Decline and Fall: Factors Contributing to the Downfall of the Mughal Empire. Manthan: International Multidisciplinary Journal of Social Inquiry, 1(1), 38–42.",
    sections: [
      {
        heading: "Abstract",
        content: "This paper re-evaluates the multidimensional factors that caused the disintegration of Mughal hegemony. By examining the jagirdari crisis, succession contestations, regional uprisings, and shifting commercial networks, the inquiry critiques single-cause theories of imperial decline."
      },
      {
        heading: "Historiographical Analysis",
        content: "The research demonstrates that economic decentralization and structural fiscal strain, combined with protracted military campaigns, created administrative vulnerabilities that external forces subsequently exploited."
      }
    ]
  },
  {
    slug: "dynamics-of-indian-nationalism-historical-analysis",
    title: "The Dynamics of Indian Nationalism: A Historical Analysis",
    category: "Modern Indian History",
    publishedDate: "AUGUST 2026",
    summary: "A critical historical investigation exploring the multifaceted evolutionary trajectories, subaltern voices, and ideological currents that shaped the anti-colonial nationalist movement in India.",
    readTime: "7 min read",
    author: "Geetanshu",
    volume: "Vol. 1",
    issue: "Issue 1",
    pages: "pp. 33-37",
    doi: "10.5281/imjsi.2026.01.05",
    citationText: "Geetanshu. (2026). The Dynamics of Indian Nationalism: A Historical Analysis. Manthan: International Multidisciplinary Journal of Social Inquiry, 1(1), 33–37.",
    sections: [
      {
        heading: "Abstract",
        content: "This paper analyzes the ideological, social, and economic currents underlying the development of Indian nationalism. It explores how elite constitutional petitions, mass satyagraha mobilizations, and localized peasant movements synthesized into a resilient anti-colonial front."
      },
      {
        heading: "Synthesis of Pluralistic Currents",
        content: "The findings highlight the complex interplay of regional and national identities, documenting how composite cultural traditions informed the constitutional ethos of sovereign modern India."
      }
    ]
  }
];

export function getResourceBySlug(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug);
}
