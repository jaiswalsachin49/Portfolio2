import { ImageResponse } from "next/og";
import { OgCard, ogSize } from "@/lib/og";
import { profile, projects } from "@/data/site";

export const alt = "Project case study";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.filter((p) => p.caseStudy).map((p) => ({ slug: p.slug }));
}

export default async function OpengraphImage({ params }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return new ImageResponse(
    (
      <OgCard
        kicker={`Case study · ${profile.name}`}
        title={p.title}
        subtitle={p.tagline}
        chips={p.stack.slice(0, 4)}
      />
    ),
    size
  );
}
