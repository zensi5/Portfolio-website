import { experience } from "@/data/experience";
import { ScrubText } from "../motion/ScrubText";
import { SectionLabel } from "../ui/SectionLabel";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-[64rem]">
        <SectionLabel id="experience-heading">Experience</SectionLabel>

        <ol className="mt-12 flex flex-col gap-20 md:mt-16 md:gap-28">
          {experience.map((job) => (
            <li key={job.company} className="grid gap-8 md:grid-cols-[1fr_1.35fr] md:gap-16">
              <div className="md:sticky md:top-28 md:self-start">
                <ScrubText as="h3" className="text-[2rem] leading-[1.05] tracking-[-0.02em] md:text-[2.75rem]" from="#8a8a8a" start="top 85%" end="top 50%">
                  {job.company}
                </ScrubText>
                <p className="mt-3 text-lg tracking-[-0.01em] text-grey-400">
                  {job.role} <span aria-hidden="true">·</span> <span className="whitespace-nowrap">{job.period}</span>
                </p>
                <p className="mt-1 text-grey-300">{job.location}</p>
              </div>
              <ul className="flex flex-col gap-5">
                {job.points.map((point) => (
                  <li key={point} className="flex gap-4 text-lg leading-[1.35] text-grey-500 md:text-xl">
                    <span aria-hidden="true" className="mt-[0.6em] h-[3px] w-5 shrink-0 rounded-full" style={{ backgroundImage: "var(--gradient-rule)" }} />
                    {point}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
