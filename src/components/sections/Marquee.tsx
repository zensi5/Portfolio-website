import { marqueeWords } from "@/data/skills";

/** Endless strip of what I work with. Decorative: the full list lives in Skills. */
export function Marquee() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {marqueeWords.map((w) => (
        <li key={w} className="flex items-center">
          <span className="px-6 text-5xl tracking-[-0.04em] whitespace-nowrap md:px-10 md:text-[5.5rem]">{w}</span>
          <span className="size-3 rounded-full md:size-4" style={{ backgroundImage: "var(--gradient-rule)" }} />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee overflow-hidden border-y border-ink/10 py-6 md:py-10" aria-hidden="true">
      <div className="marquee__track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
