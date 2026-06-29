import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const sections = ["", "#work", "#services", "#pricing", "#process", "#faq", "#contact"];
  return sections.map((s) => ({
    url: `${site.url}/${s}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: s === "" ? 1 : 0.7,
  }));
}
