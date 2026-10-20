import Reveal from "./Reveal";

export default function Section({ id, index, title, action, children }) {
  return (
    <Reveal as="section" id={id} className="py-12 md:py-14">
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h2 className="flex items-baseline gap-3 text-lg font-semibold tracking-tight">
          {index && <span className="font-mono text-xs font-normal text-accent">{index}</span>}
          {title}
        </h2>
        {action}
      </div>
      {children}
    </Reveal>
  );
}

export function SubHeading({ children }) {
  return <h3 className="mt-10 mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{children}</h3>;
}
