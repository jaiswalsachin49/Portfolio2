import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { AwardBadge, ProjectCover, Tag } from "@/components/ProjectCard";
import { GithubIcon } from "@/components/BrandIcons";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import { profile, projects } from "@/data/site";

const caseStudies = projects.filter((p) => p.caseStudy);

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = caseStudies.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.title} — Case Study · ${profile.name}`,
    description: p.description,
  };
}

function Block({ title, children }) {
  return (
    <Reveal as="section" className="py-8 md:py-10">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{title}</h2>
      {children}
    </Reveal>
  );
}

export default async function CaseStudy({ params }) {
  const { slug } = await params;
  const i = caseStudies.findIndex((p) => p.slug === slug);
  if (i === -1) notFound();
  const p = caseStudies[i];
  const next = caseStudies[(i + 1) % caseStudies.length];
  const cs = p.caseStudy;

  return (
    <>
      <main className="mx-auto max-w-4xl px-4 pb-16 md:px-8">
        <div className="pt-12 md:pt-32">
          <Link href="/#projects" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft size={14} /> All projects
          </Link>
        </div>

        <header className="animate-fade-up pt-8 pb-6">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            <span className="text-accent">{p.category}</span>
            <span aria-hidden>·</span>
            <span>{p.date}</span>
          </div>
          <h1 className="text-4xl font-medium tracking-tight md:text-6xl">{p.title}</h1>
          <p className="mt-3 text-base text-muted-foreground md:text-xl">{p.tagline}</p>
          {(p.award || p.metric) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {p.award && <AwardBadge>{p.award}</AwardBadge>}
              {p.metric && (
                <span className="rounded-full border border-border px-2 py-0.5 text-[11px] font-medium text-foreground/80">{p.metric}</span>
              )}
            </div>
          )}
          <div className="mt-5 flex flex-wrap gap-2">
            {p.links.live && (
              <a
                href={p.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-foreground px-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
              >
                Live demo <ArrowUpRight size={14} />
              </a>
            )}
            {p.links.github && (
              <a
                href={p.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-3.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <GithubIcon size={14} /> Source code
              </a>
            )}
          </div>
        </header>

        {p.image && (
          <div className="relative aspect-[16/9] animate-fade-up overflow-hidden rounded-xl border border-border bg-muted [animation-delay:120ms]">
            <ProjectCover project={p} priority sizes="(min-width: 768px) 720px, 100vw" />
          </div>
        )}

        <Block title="The problem">
          <p className="text-sm leading-relaxed text-foreground/80 md:text-[17px]">{cs.problem}</p>
        </Block>

        <Block title="How it works">
          <ol className="flex flex-col gap-2 md:flex-row md:items-stretch">
            {cs.flow.map((step, n) => (
              <li
                key={step}
                className="flex flex-1 items-center gap-3 rounded-lg border border-border px-3 py-2.5 md:flex-col md:items-start md:gap-1.5"
              >
                <span className="font-mono text-[11px] text-accent">0{n + 1}</span>
                <span className="text-sm font-medium leading-snug">{step}</span>
              </li>
            ))}
          </ol>
        </Block>

        <Block title="What I built">
          <ul className="space-y-2 text-sm leading-relaxed text-foreground/80 md:text-[17px]">
            {cs.built.map((b) => (
              <li key={b} className="flex gap-3">
                <span className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" aria-hidden />
                {b}
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Highlights">
          <div className="grid gap-3 sm:grid-cols-3">
            {cs.highlights.map((h) => (
              <div key={h.title} className="spotlight rounded-xl border border-border p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 md:p-5">
                <div className="text-sm font-semibold">{h.title}</div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground md:text-[15px]">{h.body}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block title="Stack">
          <div className="flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
        </Block>

        <Link
          href={`/projects/${next.slug}`}
          className="spotlight group mt-6 flex items-center justify-between rounded-xl border border-border p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg md:p-6"
        >
          <div>
            <div className="text-xs text-muted-foreground">Next case study</div>
            <div className="mt-0.5 text-base font-semibold">{next.title}</div>
          </div>
          <ArrowRight size={18} className="text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent" />
        </Link>
      </main>
      <Footer />
    </>
  );
}
