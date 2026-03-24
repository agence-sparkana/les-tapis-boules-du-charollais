import type { MetadataRoute } from "next";
import { mockArticles } from "@/lib/mock-articles";
// En production :
// import { getAllTapisSlugs, getAllArticleSlugs } from "@/lib/sanity/queries";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://lestapisboules-du-charollais.fr";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Pages statiques
  const staticPages = [
    "",
    "/collection/naturelle",
    "/collection/teintee",
    "/collection/accessoires",
    "/savoir-faire",
    "/blog",
    "/a-propos",
    "/contact",
    "/mentions-legales",
    "/politique-confidentialite",
    "/cgv",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : path === "/blog" ? 0.9 : 0.8,
  }));

  // Pages articles dynamiques
  // En production :
  // const articleSlugs = await getAllArticleSlugs();
  const articleSlugs = mockArticles
    .filter((a) => a.publie)
    .map((a) => ({ slug: a.slug.current }));

  const articlePages = articleSlugs.map((s) => ({
    url: `${baseUrl}/blog/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Pages produits dynamiques
  // En production :
  // const tapisSlugs = await getAllTapisSlugs();
  // const productPages = tapisSlugs.map((s) => ({
  //   url: `${baseUrl}/tapis/${s.slug}`,
  //   lastModified: new Date(),
  //   changeFrequency: "daily" as const,
  //   priority: 0.9,
  // }));

  return [...staticPages, ...articlePages];
}
