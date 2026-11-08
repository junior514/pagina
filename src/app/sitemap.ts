import type { MetadataRoute } from "next";
import { courses } from "@/data/courses";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: siteConfig.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/cursos`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...courses.map((c) => ({
      url: `${siteConfig.url}/cursos/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
