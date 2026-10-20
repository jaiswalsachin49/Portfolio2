import { ImageResponse } from "next/og";
import { OgCard, ogSize } from "@/lib/og";
import { profile } from "@/data/site";

export const alt = `${profile.name} — ${profile.role}`;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <OgCard
        kicker={`${profile.current.role} @ ${profile.current.company}`}
        title={profile.name}
        subtitle="Full stack developer building real-time web apps and AI agents."
        chips={["MERN · Next.js", "AI agents", "ICPC AIR 1068", "Finalist · IIT Roorkee"]}
      />
    ),
    size
  );
}
