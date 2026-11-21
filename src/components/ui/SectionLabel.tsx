/** Section heading in the Webflow style: gradient rule + mono caps. It is the real h2, not an eyebrow. */
export function SectionLabel({ id, children, tone = "dark" }: { id: string; children: React.ReactNode; tone?: "dark" | "light" }) {
  return (
    <div className="flex items-center gap-3">
      <span aria-hidden="true" className="h-0.5 w-7 rounded-full md:w-14" style={{ backgroundImage: "var(--gradient-rule)" }} />
      <h2
        id={id}
        className={`font-mono text-xl tracking-[0.05em] uppercase md:text-[1.75rem] md:tracking-[0.1em] ${tone === "light" ? "text-white" : "text-ink"}`}
      >
        {children}
      </h2>
    </div>
  );
}
