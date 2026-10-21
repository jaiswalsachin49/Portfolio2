import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = { title: "Page not found — Sachin Jaiswal" };

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[80vh] max-w-5xl flex-col items-start justify-center px-4 md:px-8">
      <span className="font-mono text-sm text-accent">404</span>
      <h1 className="mt-2 text-3xl font-medium tracking-tight md:text-4xl">This page doesn&apos;t exist.</h1>
      <p className="mt-3 text-sm text-muted-foreground md:text-base">
        The link may be old or mistyped. Try the home page, or press{" "}
        <kbd className="rounded border border-border px-1 font-mono text-xs">⌘K</kbd> to search.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex h-9 items-center gap-1.5 rounded-lg bg-foreground px-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
      >
        <ArrowLeft size={15} /> Back home
      </Link>
    </main>
  );
}
