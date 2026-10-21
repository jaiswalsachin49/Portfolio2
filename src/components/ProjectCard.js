import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Award } from "lucide-react";
import { GithubIcon } from "./BrandIcons";

export function Tag({ children }) {
  return (
    <span className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground md:text-xs">
      {children}
    </span>
  );
}

export function ProjectLinks({ project }) {
  const { links, caseStudy, slug } = project;
  return (
    <div className="flex flex-wrap items-center gap-2">
      {caseStudy && (
        <Link
          href={`/projects/${slug}`}
          className="group/cs inline-flex items-center gap-1 rounded-md bg-foreground px-2.5 py-1 text-xs font-medium text-background transition-opacity hover:opacity-85 md:px-3 md:py-1.5 md:text-sm"
        >
          Case study <ArrowRight size={12} className="transition-transform group-hover/cs:translate-x-0.5" />
        </Link>
      )}
      {links.live && (
        <a
          href={links.live}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors md:px-3 md:py-1.5 md:text-sm ${
            caseStudy
              ? "border border-border text-muted-foreground hover:text-foreground"
              : "bg-foreground text-background hover:opacity-85"
          }`}
        >
          Live <ArrowUpRight size={12} />
        </a>
      )}
      {links.github && (
        <a
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground md:px-3 md:py-1.5 md:text-sm"
        >
          <GithubIcon size={12} /> Code
        </a>
      )}
    </div>
  );
}

// Screenshot when there is one; otherwise a typographic cover in the site's style.
export function ProjectCover({ project, priority = false, sizes = "(min-width: 1024px) 480px, (min-width: 640px) 50vw, 100vw", className = "" }) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt=""
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05] ${className}`}
      />
    );
  }
  // No screenshot: draw the project's data flow as a small diagram.
  const flow = project.caseStudy?.flow ?? [];
  return (
    <div className="dot-grid absolute inset-0 flex flex-col bg-accent-soft p-4">
      <span className="font-mono text-[10px] uppercase tracking-wider text-accent">{project.category}</span>
      <ol className="flex flex-1 flex-col items-center justify-center gap-1">
        {flow.map((step, i) => (
          <li key={step} className="flex flex-col items-center gap-1">
            <span className="rounded-md border border-border bg-background px-2.5 py-1 font-mono text-[11px] text-foreground/80 shadow-sm">
              {step}
            </span>
            {i < flow.length - 1 && <span className="h-2 w-px bg-accent/60" aria-hidden />}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function AwardBadge({ children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent">
      <Award size={11} /> {children}
    </span>
  );
}

export default function ProjectCard({ project, priority = false }) {
  const { title, category, date, description, stack, metric, award, caseStudy, slug, links } = project;
  const href = caseStudy ? `/projects/${slug}` : links.live || links.github;
  const external = !caseStudy;

  return (
    <article className="reveal spotlight group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5">
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        tabIndex={-1}
        aria-hidden
        className="relative block aspect-[16/9] overflow-hidden border-b border-border bg-muted"
      >
        <ProjectCover project={project} priority={priority} />
      </a>
      <div className="flex flex-1 flex-col gap-3 p-4 md:gap-4 md:p-6">
        <div>
          <div className="mb-1 flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            <span>{category}</span>
            <span aria-hidden>·</span>
            <span className="tabular-nums">{date}</span>
          </div>
          <h3 className="text-[15px] font-semibold leading-snug md:text-xl">{title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground md:mt-2 md:text-[15px]">{description}</p>
          {(award || metric) && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {award && <AwardBadge>{award.split(" · ")[0]}</AwardBadge>}
              {metric && (
                <span className="rounded-full border border-border px-2 py-0.5 text-[11px] font-medium text-foreground/80">{metric}</span>
              )}
            </div>
          )}
        </div>
        {stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {stack.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
        )}
        <div className="mt-auto pt-1">
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}
