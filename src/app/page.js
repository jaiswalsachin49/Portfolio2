import Image from "next/image";
import { ArrowUpRight, FileText, Mail, MapPin } from "lucide-react";
import Section, { SubHeading } from "@/components/Section";
import ProjectCard, { AwardBadge, ProjectLinks, Tag } from "@/components/ProjectCard";
import Achievements from "@/components/Achievements";
import GitHubActivity from "@/components/GitHubActivity";
import CopyEmail from "@/components/CopyEmail";
import CountUp from "@/components/CountUp";
import Footer from "@/components/Footer";
import { brandIcons } from "@/components/BrandIcons";
import {
  about,
  achievements,
  cpStats,
  education,
  experience,
  hackathons,
  profile,
  projects,
  skills,
} from "@/data/site";

// Re-fetch GitHub stats at most twice a day.
export const revalidate = 43200;

const iconButton =
  "grid size-10 place-items-center rounded-lg border border-border bg-background/60 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent";

function SocialLinks() {
  return profile.socials.map(({ label, href, icon }) => {
    const Icon = brandIcons[icon];
    return (
      <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={iconButton}>
        <Icon size={16} />
      </a>
    );
  });
}

// Staggered entrance delay for hero elements.
const delay = (ms) => ({ animationDelay: `${ms}ms` });

function Hero() {
  return (
    <section id="home" className="relative pt-16 pb-6 md:pt-44 md:pb-10">
      {/* Background: faint dot grid and a slow orange glow, both fading out */}
      <div
        className="dot-grid pointer-events-none absolute inset-x-[-50vw] top-0 -z-10 h-[520px] animate-[fade-in_1.2s_ease_both] [mask-image:radial-gradient(ellipse_50%_60%_at_50%_30%,black,transparent)]"
        aria-hidden
      />
      <div
        data-dots
        className="dot-glow pointer-events-none absolute inset-x-[-50vw] top-0 -z-10 h-[520px] motion-reduce:hidden"
        aria-hidden
      />
      <div
        className="animate-drift pointer-events-none absolute -top-10 right-0 -z-10 size-72 rounded-full bg-accent/15 blur-3xl md:size-96"
        aria-hidden
      />

      <div className="mb-6 flex items-start gap-6 md:mb-10 md:gap-12">
        <div className="flex-1">
          <a
            href="#experience"
            style={delay(0)}
            className="animate-fade-up mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 py-1 pr-3 pl-2 text-xs text-muted-foreground backdrop-blur transition-colors hover:border-accent/50 hover:text-foreground md:mb-6 md:text-sm"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            <span className="sm:hidden">Intern @ {profile.current.company.split(" ")[0]}</span>
            <span className="hidden sm:inline">
              {profile.current.role} @ {profile.current.company}
            </span>
          </a>
          <h1 className="mb-2 text-4xl font-medium tracking-tight md:mb-3 md:text-6xl lg:text-7xl">
            {profile.name.split(" ").map((w, i) => (
              <span key={w} className="animate-blur-in mr-[0.25em] last:mr-0" style={delay(100 + i * 120)}>
                {w}
              </span>
            ))}
          </h1>
          <p className="animate-fade-up mb-2 text-sm font-medium text-muted-foreground md:text-xl" style={delay(300)}>
            {profile.role}
          </p>
          <p className="animate-fade-up mb-5 flex items-center gap-1.5 text-xs text-muted-foreground md:mb-7 md:text-base" style={delay(380)}>
            <MapPin size={14} /> {profile.location} · Open to remote
          </p>
          <div className="animate-fade-up flex flex-wrap items-center gap-2" style={delay(460)}>
            <a href={`mailto:${profile.email}`} aria-label="Email" className={iconButton}>
              <Mail size={16} />
            </a>
            <SocialLinks />
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-10 items-center gap-1.5 rounded-lg bg-foreground px-4 text-sm font-semibold text-background transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20"
            >
              <FileText size={15} /> Resume
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
        <div
          className="animate-fade-up group relative size-24 shrink-0 overflow-hidden rounded-2xl border border-border shadow-sm md:size-52"
          style={delay(200)}
        >
          <Image
            src={profile.photo}
            alt={profile.name}
            fill
            priority
            sizes="(min-width: 768px) 208px, 96px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>

      <div className="animate-fade-up" style={delay(560)}>
        <p className="mb-6 max-w-3xl text-sm leading-relaxed text-foreground/80 md:mb-8 md:text-lg">{profile.bio}</p>
        <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-border bg-background/60 backdrop-blur sm:grid-cols-4">
          {cpStats.map((s, i) => {
            const inner = (
              <>
                <span className="font-mono text-lg font-semibold tracking-tight md:text-3xl">
                  <CountUp value={s.value} />
                </span>
                <span className="text-[11px] text-muted-foreground md:text-sm">
                  {s.label}
                  {s.note && <span className="hidden md:inline"> · {s.note}</span>}
                </span>
              </>
            );
            const cls = `spotlight flex flex-col gap-0.5 p-3 md:gap-1 md:p-5 ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t sm:border-t-0" : ""} ${i === 2 ? "sm:border-l" : ""} border-border`;
            return s.href ? (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={`${cls} transition-colors hover:bg-muted/50`}>
                {inner}
              </a>
            ) : (
              <div key={s.label} className={cls}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Timeline({ items }) {
  return (
    <ul className="divide-y divide-border rounded-xl border border-border">
      {items.map((item) => (
        <li key={item.title} className="reveal spotlight flex gap-4 p-4 md:gap-5 md:p-6">
          <div className="grid size-10 shrink-0 place-items-center rounded-lg border border-border bg-muted text-sm font-semibold md:size-12 md:text-base text-muted-foreground">
            {item.title[0]}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
              <h3 className="text-[15px] font-semibold md:text-lg">{item.title}</h3>
              <span className="text-xs tabular-nums text-muted-foreground md:text-sm">{item.period}</span>
            </div>
            <p className="text-sm text-muted-foreground md:text-base">
              {item.subtitle} · {item.location}
              {item.note && <> · {item.note}</>}
            </p>
            {item.points?.length > 0 && (
              <ul className="mt-3 space-y-1.5 text-sm text-foreground/80 md:text-[15px] md:leading-relaxed">
                {item.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-accent md:mt-2.5" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            )}
            {item.stack?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <>
      <main className="mx-auto max-w-5xl overflow-x-clip px-4 pb-16 md:px-8">
        <Hero />

        <Section id="about" index="01" title="About">
          <div className="grid gap-8 md:grid-cols-[1fr_260px] md:gap-12">
            <div className="reveal">
              <p className="text-base leading-relaxed text-foreground md:text-xl md:leading-relaxed">{about.intro}</p>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/75 md:mt-5 md:space-y-4 md:text-[17px]">
                {about.story.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
            <dl className="reveal h-fit divide-y divide-border rounded-xl border border-border text-sm md:text-base">
              {about.facts.map((f) => (
                <div key={f.label} className="flex items-baseline justify-between gap-3 px-3.5 py-2.5 md:flex-col md:gap-0.5 md:px-4 md:py-3">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{f.label}</dt>
                  <dd className="text-right font-medium md:text-left">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <ol className="mt-10 grid gap-3 sm:grid-cols-3 md:gap-4">
            {about.principles.map((pr, i) => (
              <li key={pr.title} className="reveal spotlight rounded-xl border border-border p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 md:p-6">
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                <div className="mt-2 text-sm font-semibold md:text-base">{pr.title}</div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground md:text-[15px]">{pr.body}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="experience" index="02" title="Experience">
          <Timeline items={experience.map((e) => ({ title: e.company, subtitle: e.role, ...e }))} />
          <SubHeading>Education</SubHeading>
          <Timeline items={education.map((e) => ({ title: e.school, subtitle: e.degree, ...e }))} />
        </Section>

        <Section
          id="projects"
          index="03"
          title="Featured Projects"
          action={
            <a
              href={`https://github.com/${profile.github}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              All repos <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          }
        >
          <div className="grid gap-4 sm:grid-cols-2 md:gap-6">
            {featured.map((p, i) => (
              <ProjectCard key={p.slug} project={p} priority={i < 2} />
            ))}
          </div>

          <SubHeading>More Projects</SubHeading>
          <ul className="divide-y divide-border rounded-xl border border-border">
            {more.map((p) => (
              <li key={p.slug} className="reveal spotlight flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6 md:p-6">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <h4 className="text-[15px] font-semibold md:text-lg">{p.title}</h4>
                    <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                      {p.category} · {p.date}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground md:text-[15px]">{p.description}</p>
                  {p.award && (
                    <div className="mt-2">
                      <AwardBadge>{p.award}</AwardBadge>
                    </div>
                  )}
                  {p.stack.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {p.stack.map((s) => (
                        <Tag key={s}>{s}</Tag>
                      ))}
                    </div>
                  )}
                </div>
                <div className="shrink-0">
                  <ProjectLinks project={p} />
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="achievements" index="04" title="Achievements">
          <Achievements wins={achievements} others={hackathons} />
        </Section>

        <Section id="github" index="05" title="GitHub Activity">
          <GitHubActivity user={profile.github} />
        </Section>

        <Section id="skills" index="06" title="Skills">
          <dl className="space-y-4 md:space-y-5">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group} className="reveal grid gap-2 sm:grid-cols-[140px_1fr] sm:gap-4">
                <dt className="pt-1 text-sm text-muted-foreground md:text-base">{group}</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {items.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border px-2.5 py-1 text-xs font-medium text-foreground/80 transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent md:px-3 md:py-1.5 md:text-sm"
                    >
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="contact" index="07" title="Let's Work Together">
          <div className="reveal spotlight overflow-hidden rounded-2xl border border-border p-6 md:p-12">
            <div className="dot-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_left,black,transparent_70%)]" aria-hidden />
            <div className="relative">
              <p className="mb-2 text-2xl font-medium tracking-tight md:text-4xl">Have something in mind?</p>
              <p className="max-w-xl text-sm leading-relaxed text-foreground/80 md:text-lg">
                Open to internships, full-time roles and interesting collaborations — full-stack web apps, real-time products or
                AI tooling. Email is the quickest way to reach me.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-2 md:mt-8">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex h-10 items-center gap-2 rounded-lg bg-accent px-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/30"
                >
                  <Mail size={15} /> {profile.email}
                </a>
                <CopyEmail email={profile.email} />
                <SocialLinks />
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
