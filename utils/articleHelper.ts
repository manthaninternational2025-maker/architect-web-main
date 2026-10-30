import { ArticleItem } from "@/context/JournalDataContext";

/**
 * Generates an unambiguous, unique, SEO-friendly URL for any article.
 * Uses the article's unique ID with the prefix 'art-' so it NEVER collides with DOIs (which start with '10-').
 *
 * Example: /resources/art-6-the-dynamics-of-indian-nationalism-a-historical
 */
export function getArticleUrl(article: Partial<ArticleItem>): string {
  if (article.id) {
    const slug = (article.title || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60);
    return `/resources/art-${article.id}${slug ? `-${slug}` : ""}`;
  }
  if (article.doi) {
    return `/resources/${article.doi.replace(/[^a-zA-Z0-9]/g, "-")}`;
  }
  return "/resources/art-1";
}
