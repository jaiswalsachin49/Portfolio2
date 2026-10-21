"use client";

import { useEffect } from "react";

// Page-wide motion helpers, mounted once in the layout:
// - `.spotlight` elements and `[data-dots]` layers get --mx/--my so a glow and
//   orange dots follow the cursor.
// - `[data-animate]` elements get `data-inview` the first time they scroll into view.
export default function Motion() {
  useEffect(() => {
    // Background dot layers that track the cursor anywhere on the page.
    const dotLayers = document.querySelectorAll("[data-dots]");
    const onMove = (e) => {
      const set = (el) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      };
      const el = e.target instanceof Element && e.target.closest(".spotlight");
      if (el) set(el);
      dotLayers.forEach(set);
    };
    document.addEventListener("pointermove", onMove, { passive: true });

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.setAttribute("data-inview", "");
          io.unobserve(e.target);
        }),
      { threshold: 0.25 }
    );
    document.querySelectorAll("[data-animate]").forEach((el) => io.observe(el));

    return () => {
      document.removeEventListener("pointermove", onMove);
      io.disconnect();
    };
  }, []);

  return null;
}
