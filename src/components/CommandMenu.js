"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  ArrowUpRight,
  Briefcase,
  Code2,
  Copy,
  CornerDownLeft,
  FileText,
  FolderGit2,
  LayoutGrid,
  Mail,
  Search,
  SunMoon,
  Trophy,
  User,
  Wrench,
} from "lucide-react";
import { brandIcons } from "./BrandIcons";
import { cpStats, profile, projects, sections } from "@/data/site";
import { OPEN_COMMAND_MENU, toggleTheme } from "@/lib/theme";

const sectionIcons = {
  about: User,
  experience: Briefcase,
  projects: LayoutGrid,
  achievements: Trophy,
  github: Activity,
  skills: Wrench,
  contact: Mail,
};

function buildItems() {
  return [
    ...sections.map((s) => ({ group: "Navigate", label: s.label, icon: sectionIcons[s.id] ?? LayoutGrid, href: `/#${s.id}` })),
    ...projects
      .filter((p) => p.caseStudy)
      .map((p) => ({ group: "Case studies", label: p.title, hint: p.category, icon: FolderGit2, href: `/projects/${p.slug}` })),
    { group: "Actions", label: "Copy email", hint: profile.email, icon: Copy, action: "copy" },
    { group: "Actions", label: "Toggle theme", icon: SunMoon, action: "theme" },
    { group: "Actions", label: "Open resume", icon: FileText, href: profile.resume, external: true },
    ...profile.socials.map((s) => ({ group: "Profiles", label: s.label, icon: brandIcons[s.icon], href: s.href, external: true })),
    ...cpStats
      .filter((c) => c.href)
      .map((c) => ({ group: "Profiles", label: c.label, hint: c.value, icon: c.label === "LeetCode" ? Code2 : Trophy, href: c.href, external: true })),
  ];
}

const items = buildItems();

function Kbd({ children }) {
  return (
    <kbd className="inline-grid h-5 min-w-5 place-items-center rounded border border-border bg-muted px-1 font-mono text-[10px] text-muted-foreground">
      {children}
    </kbd>
  );
}

export default function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [toast, setToast] = useState("");
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const returnFocus = useRef(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.label} ${i.hint ?? ""} ${i.group}`.toLowerCase().includes(q));
  }, [query]);

  const show = useCallback(() => {
    returnFocus.current = document.activeElement;
    setQuery("");
    setIndex(0);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    returnFocus.current?.focus?.();
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) close();
        else show();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_COMMAND_MENU, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_COMMAND_MENU, show);
    };
  }, [open, show, close]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    listRef.current?.querySelector('[data-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [index]);

  const flash = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 1800);
  };

  const run = async (item) => {
    if (!item) return;
    setOpen(false);
    if (item.action === "copy") {
      try {
        await navigator.clipboard.writeText(profile.email);
        flash("Email copied to clipboard");
      } catch {
        window.location.href = `mailto:${profile.email}`;
      }
    } else if (item.action === "theme") {
      toggleTheme();
    } else if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    } else {
      router.push(item.href);
    }
  };

  const onInputKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => (i + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => (i - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(filtered[index]);
    } else if (e.key === "Escape") {
      close();
    }
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 pt-[14vh] backdrop-blur-[2px] animate-[fade-in_120ms_ease]"
          onMouseDown={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            onMouseDown={(e) => e.stopPropagation()}
            className="w-full max-w-[560px] overflow-hidden rounded-2xl border border-border bg-background shadow-2xl shadow-black/30 animate-[pop-in_160ms_ease]"
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search size={16} className="shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIndex(0);
                }}
                onKeyDown={onInputKey}
                placeholder="Type a command or search…"
                aria-label="Search commands"
                role="combobox"
                aria-expanded="true"
                aria-controls="command-list"
                aria-activedescendant={filtered[index] ? `cmd-${index}` : undefined}
                autoComplete="off"
                spellCheck="false"
                className="h-14 flex-1 bg-transparent text-[15px] text-foreground outline-none placeholder:text-muted-foreground focus-visible:outline-none"
              />
              <Kbd>esc</Kbd>
            </div>

            <div className="relative">
              <ul
                id="command-list"
                ref={listRef}
                role="listbox"
                className="max-h-[min(56vh,400px)] overflow-y-auto overscroll-contain px-2 pt-1 pb-3"
              >
                {filtered.length === 0 && (
                  <li className="px-3 py-10 text-center text-sm text-muted-foreground">No results for “{query}”</li>
                )}
                {filtered.map((item, i) => {
                  const header = i === 0 || item.group !== filtered[i - 1].group;
                  const selected = i === index;
                  const Icon = item.icon;
                  return (
                    <li key={`${item.group}-${item.label}`} role="presentation">
                      {header && <div className="px-2 pt-3 pb-1.5 text-[11px] font-medium text-muted-foreground">{item.group}</div>}
                      <div
                        id={`cmd-${i}`}
                        role="option"
                        aria-selected={selected}
                        data-selected={selected}
                        onMouseMove={() => index !== i && setIndex(i)}
                        onClick={() => run(item)}
                        className={`flex h-10 cursor-pointer items-center gap-3 rounded-lg px-2 text-sm transition-colors ${
                          selected ? "bg-muted text-foreground" : "text-foreground/80"
                        }`}
                      >
                        <span
                          className={`grid size-6 shrink-0 place-items-center rounded-md border transition-colors ${
                            selected ? "border-accent/40 bg-accent-soft text-accent" : "border-border text-muted-foreground"
                          }`}
                        >
                          <Icon size={13} />
                        </span>
                        <span className="truncate">{item.label}</span>
                        <span className="ml-auto flex shrink-0 items-center gap-2 pl-3 text-xs text-muted-foreground">
                          {item.hint && <span className="max-w-44 truncate">{item.hint}</span>}
                          {item.external && <ArrowUpRight size={13} />}
                          {selected && !item.external && <CornerDownLeft size={13} />}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-background to-transparent" aria-hidden />
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-border bg-muted/40 px-4 py-2.5 text-[11px] text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Kbd>↑</Kbd>
                  <Kbd>↓</Kbd> navigate
                </span>
                <span className="flex items-center gap-1">
                  <Kbd>↵</Kbd> open
                </span>
              </div>
              <span className="hidden sm:inline">{filtered.length} results</span>
            </div>
          </div>
        </div>
      )}
      <div
        role="status"
        aria-live="polite"
        className={`fixed left-1/2 top-20 z-50 -translate-x-1/2 rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-background shadow-lg transition-opacity ${
          toast ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {toast}
      </div>
    </>
  );
}
