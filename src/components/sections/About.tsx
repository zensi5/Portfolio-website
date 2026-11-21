import { facts, profile } from "@/data/profile";
import { ScrubText } from "../motion/ScrubText";
import { SectionLabel } from "../ui/SectionLabel";

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="px-4 pt-32 pb-24 md:px-8 md:pt-44 md:pb-32">
      <div className="mx-auto max-w-[64rem]">
        <SectionLabel id="about-heading">About me</SectionLabel>
        <div className="mt-10 space-y-6 md:mt-14">
          {profile.about.map((p) => (
            <ScrubText key={p.slice(0, 24)} className="text-xl leading-[1.35] tracking-[-0.02em] md:text-[1.75rem]">
              {p}
            </ScrubText>
          ))}
        </div>

        <dl className="mt-14 grid grid-cols-2 border-t border-ink/10 md:mt-20 md:grid-cols-4">
          {facts.map((f) => (
            <div key={f.term} className="border-b border-ink/10 py-5 pr-4 md:border-b-0">
              <dt className="font-mono text-xs tracking-[0.1em] text-grey-300 uppercase">{f.term}</dt>
              <dd className="mt-2 text-lg tracking-[-0.01em]">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
