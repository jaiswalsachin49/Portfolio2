import Reveal from "./Reveal";

export default function Section({ id, index, title, action, children }) {
  return (
    <section id={id} className="py-12 md:py-20">
      <Reveal className="mb-6 flex items-center gap-4 md:mb-10">
        <h2 className="flex shrink-0 items-baseline gap-3 text-lg font-semibold tracking-tight md:text-3xl">
          {index && <span className="font-mono text-xs font-normal text-accent md:text-sm">{index}</span>}
          {title}
        </h2>
        <span className="rule-grow dot-rule flex-1" aria-hidden />
        {action}
      </Reveal>
      {children}
    </section>
  );
}

export function SubHeading({ children }) {
  return (
    <h3 className="reveal mt-10 mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground md:mt-14 md:mb-5">
      {children}
    </h3>
  );
}
