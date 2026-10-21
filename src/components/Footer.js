import { profile } from "@/data/site";

export default function Footer() {
  return (
    <footer className="relative isolate mx-auto flex max-w-5xl flex-col gap-2 border-t border-border px-4 py-8 pb-28 text-xs text-muted-foreground sm:flex-row sm:justify-between md:px-8 md:pb-10 md:text-sm">
      <div
        className="dot-grid pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-full [mask-image:linear-gradient(to_top,black,transparent)]"
        aria-hidden
      />
      <span>
        © {new Date().getFullYear()} {profile.name}
      </span>
      <span>
        Press <kbd className="rounded border border-border px-1 font-mono text-[10px]">⌘K</kbd> to jump anywhere
      </span>
    </footer>
  );
}
