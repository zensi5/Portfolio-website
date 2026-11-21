import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { SocialIcon } from "@/components/ui/Icons";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name} about frontend roles or freelance projects.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section id="top" aria-labelledby="contact-heading" className="px-4 pt-32 pb-24 md:px-8 md:pt-44 md:pb-32">
      <div className="mx-auto grid max-w-[72rem] gap-14 md:grid-cols-[1fr_1.2fr] md:gap-20">
        <div>
          <h1 id="contact-heading" className="text-[3rem] leading-none tracking-[-0.03em] md:text-[4.5rem]">
            Let&apos;s talk
          </h1>
          <p className="mt-6 max-w-[28rem] text-lg leading-[1.45] text-grey-400">
            Hiring for a frontend role, or have a project in mind? Send a message and I&apos;ll get back to you.
          </p>

          <dl className="mt-12 flex flex-col gap-6">
            <div>
              <dt className="font-mono text-xs tracking-[0.1em] text-grey-300 uppercase">Email</dt>
              <dd className="mt-1.5 text-xl tracking-[-0.02em]">
                <a href={`mailto:${profile.email}`} className="underline hover:no-underline">
                  {profile.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs tracking-[0.1em] text-grey-300 uppercase">Based in</dt>
              <dd className="mt-1.5 text-xl tracking-[-0.02em]">
                {profile.location}, {profile.country}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs tracking-[0.1em] text-grey-300 uppercase">Elsewhere</dt>
              <dd className="mt-3 flex gap-2">
                {profile.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="grid size-11 place-items-center rounded-full border border-ink/15 transition-colors hover:border-ink"
                  >
                    <SocialIcon name={s.icon} className="size-5" />
                    <span className="sr-only">
                      {s.label} (opens in a new tab)
                    </span>
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
