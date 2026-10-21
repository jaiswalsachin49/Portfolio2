"use client";

import { useEffect, useRef } from "react";

// Counts the number inside `value` (e.g. "1700+", "AIR 1068") up from zero when it
// scrolls into view. The server renders the final value, so it reads correctly
// without JavaScript or with reduced motion.
export default function CountUp({ value, duration = 1200 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const match = /\d+/.exec(value);
    if (!el || !match || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = Number(match[0]);
    const [before, after] = [value.slice(0, match.index), value.slice(match.index + match[0].length)];
    const render = (n) => (el.textContent = `${before}${n}${after}`);
    let frame;

    const run = () => {
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        render(Math.round(target * (1 - Math.pow(1 - t, 3))));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    render(0);
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        io.disconnect();
        run();
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return <span ref={ref}>{value}</span>;
}
