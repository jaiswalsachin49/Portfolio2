"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, FileCheck2, X } from "lucide-react";

function CertificateDialog({ item, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${item.title} certificate`}
        onMouseDown={(e) => e.stopPropagation()}
        className="w-full max-w-3xl overflow-hidden rounded-xl border border-border bg-background shadow-2xl"
      >
        <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3">
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">{item.title}</div>
            <div className="truncate text-xs text-muted-foreground">{item.event}</div>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-8 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X size={16} />
          </button>
        </div>
        <div className="relative aspect-[1600/1133] bg-muted">
          <Image src={item.certificate} alt={`${item.title} certificate`} fill unoptimized className="object-contain" />
        </div>
      </div>
    </div>
  );
}

export default function Achievements({ wins, others }) {
  const [open, setOpen] = useState(null);

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 md:gap-4">
        {wins.map((a) => (
          <button
            key={a.title}
            type="button"
            onClick={() => setOpen(a)}
            className="reveal spotlight group flex gap-3 rounded-xl border border-border p-3 text-left transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg md:gap-4 md:p-4"
          >
            <div className="relative aspect-[1600/1133] w-24 shrink-0 overflow-hidden rounded-md md:w-32 border border-border bg-muted">
              {/* Pre-sized static thumbnail, served as-is (no on-the-fly optimisation). */}
              <Image
                src={a.certificate.replace("/certificates/", "/certificates/thumbs/")}
                alt=""
                fill
                unoptimized
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start gap-1.5">
                <Award size={14} className="mt-0.5 shrink-0 text-accent" />
                <span className="text-sm font-semibold leading-snug md:text-base">{a.title}</span>
              </div>
              <div className="mt-1 text-xs text-muted-foreground md:text-sm">{a.event}</div>
              <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground md:mt-2 md:text-xs">
                <span className="tabular-nums">{a.date}</span>
                <span aria-hidden>·</span>
                <span className="underline-offset-2 group-hover:text-foreground group-hover:underline">View certificate</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {wins.some((a) => a.project) && (
        <p className="mt-3 text-xs text-muted-foreground">
          {wins
            .filter((a) => a.project)
            .map((a) => (
              <Link key={a.title} href={`/projects/${a.project}`} className="inline-flex items-center gap-1 hover:text-foreground">
                See the {a.title.split("— ")[1]} entry <ArrowRight size={12} />
              </Link>
            ))}
        </p>
      )}

      <ul className="mt-6 divide-y divide-border rounded-xl border border-border">
        {others.map((a) => (
          <li key={a.title} className="reveal flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-3 md:px-6 md:py-4">
            <div className="min-w-0">
              <span className="text-sm font-medium md:text-base">{a.title}</span>
              <span className="text-sm text-muted-foreground md:text-base"> — {a.event}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground md:text-sm">
              {a.date && <span className="tabular-nums">{a.date}</span>}
              {a.certificate && (
                <button
                  type="button"
                  onClick={() => setOpen(a)}
                  className="inline-flex items-center gap-1 hover:text-foreground"
                >
                  <FileCheck2 size={13} /> Certificate
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {open && <CertificateDialog item={open} onClose={() => setOpen(null)} />}
    </>
  );
}
