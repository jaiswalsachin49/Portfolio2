import { SITE_URL, projects } from "@/data/site";

export default function sitemap() {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    ...projects
      .filter((p) => p.caseStudy)
      .map((p) => ({ url: `${SITE_URL}/projects/${p.slug}`, changeFrequency: "yearly", priority: 0.7 })),
  ];
}
