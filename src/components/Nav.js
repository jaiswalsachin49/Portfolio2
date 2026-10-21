"use client";

import { useEffect, useRef, useState } from "react";
import { Moon, Search, Sun } from "lucide-react";
import { OPEN_COMMAND_MENU, toggleTheme } from "@/lib/theme";

const links = [
  { id: "about", label: "About", desktopOnly: true },
  { id: "experience", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Awards" },
  { id: "contact", label: "Contact" },
];

const iconBtn =
  "flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

export default function Nav() {
  const [active, setActive] = useState("");
  const navRef = useRef(null);
  const pillRef = useRef(null);

  // Slide the highlight pill under the active link.
  useEffect(() => {
    const pill = pillRef.current;
    const link = navRef.current?.querySelector(`a[href="/#${active}"]`);
    if (!pill) return;
    if (!link || link.offsetWidth === 0) {
      pill.style.opacity = "0";
      return;
    }
    pill.style.opacity = "1";
    pill.style.width = `${link.offsetWidth}px`;
    pill.style.transform = `translateX(${link.offsetLeft}px)`;
  }, [active]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 bottom-3 z-40 flex justify-center px-4 pb-[env(safe-area-inset-bottom)] md:top-5 md:bottom-auto">
      <nav
        ref={navRef}
        aria-label="Main"
        className="relative flex items-center gap-0.5 rounded-full border border-border bg-background/80 p-1 shadow-lg shadow-black/5 backdrop-blur-md animate-[pop-in_0.5s_ease_both]"
      >
        <span
          ref={pillRef}
          aria-hidden
          className="absolute top-1 bottom-1 left-0 rounded-full bg-muted opacity-0 transition-all duration-300 ease-out motion-reduce:transition-none"
        />
        {links.map(({ id, label, desktopOnly }) => (
          <a
            key={id}
            href={`/#${id}`}
            aria-current={active === id ? "true" : undefined}
            className={`relative rounded-full px-2.5 py-1.5 text-xs font-medium transition-colors sm:px-3.5 sm:text-sm ${
              desktopOnly ? "hidden sm:block" : ""
            } ${active === id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {label}
          </a>
        ))}
        <span className="mx-1 h-4 w-px bg-border" aria-hidden />
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event(OPEN_COMMAND_MENU))}
          aria-label="Open command menu"
          className={`${iconBtn} md:w-auto md:gap-1.5 md:px-2.5`}
        >
          <Search size={15} />
          <kbd className="hidden font-mono text-[11px] md:inline">⌘K</kbd>
        </button>
        <button type="button" onClick={toggleTheme} aria-label="Toggle dark mode" className={iconBtn}>
          <Sun size={15} className="hidden dark:block" />
          <Moon size={15} className="dark:hidden" />
        </button>
      </nav>
    </header>
  );
}
