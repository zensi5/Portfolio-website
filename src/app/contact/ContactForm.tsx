"use client";

import { useId, useRef, useState } from "react";
import { profile } from "@/data/profile";

type Status = "idle" | "sending" | "sent" | "error";

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
const topics = ["A full-time role", "A freelance project", "Something else"];

const field =
  "mt-2 w-full rounded-xl border border-ink/15 bg-beige px-4 py-3.5 text-base text-ink transition-colors placeholder:text-grey-300 hover:border-ink/40 focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const statusRef = useRef<HTMLParagraphElement>(null);
  const id = useId();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("botcheck")) return;

    // Without a Web3Forms key, fall back to the visitor's own email app
    if (!ACCESS_KEY) {
      const body = `${data.get("message")}\n\n${data.get("name")} · ${data.get("email")}`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`${data.get("topic")}: ${data.get("name")}`)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    data.append("access_key", ACCESS_KEY);
    data.append("subject", `Portfolio: ${data.get("topic")} from ${data.get("name")}`);
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
    statusRef.current?.focus();
  }

  if (status === "sent") {
    return (
      <div className="rounded-[2rem] bg-white p-8 md:p-12">
        <p ref={statusRef} tabIndex={-1} role="status" className="text-[2rem] leading-[1.1] tracking-[-0.02em] outline-none">
          Thanks, your message is on its way.
        </p>
        <p className="mt-4 text-lg text-grey-400">I&apos;ll get back to you soon.</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-8 underline hover:no-underline">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[2rem] bg-white p-6 sm:p-8 md:p-12" noValidate={false}>
      <fieldset>
        <legend className="text-base">I&apos;m reaching out about</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {topics.map((t, i) => (
            <label
              key={t}
              className="cursor-pointer rounded-full border border-ink/15 px-4 py-2.5 text-sm transition-colors hover:border-ink has-checked:border-ink has-checked:bg-ink has-checked:text-white has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-signal"
            >
              <input type="radio" name="topic" value={t} defaultChecked={i === 0} className="sr-only" />
              {t}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`}>Your name</label>
          <input id={`${id}-name`} name="name" type="text" autoComplete="name" required maxLength={120} className={field} />
        </div>
        <div>
          <label htmlFor={`${id}-email`}>Email</label>
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" required maxLength={200} className={field} />
        </div>
      </div>
      <div className="mt-6">
        <label htmlFor={`${id}-message`}>Message</label>
        <textarea
          id={`${id}-message`}
          name="message"
          required
          rows={6}
          maxLength={5000}
          placeholder="A few lines about the role or project, and a timeline if you have one."
          className={`${field} resize-y`}
        />
      </div>

      {/* Spam trap, hidden from people */}
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {status === "error" && (
        <p ref={statusRef} tabIndex={-1} role="alert" className="mt-6 rounded-xl bg-[#fdecea] px-4 py-3 text-[#8a1c12] outline-none">
          Your message didn&apos;t send. Check your connection and try again, or email me at{" "}
          <a href={`mailto:${profile.email}`} className="underline">
            {profile.email}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-8 w-full rounded-full bg-ink px-7 py-4 text-white transition-[background-color,transform] hover:bg-grey-600 active:scale-[0.98] disabled:cursor-wait disabled:bg-grey-400 sm:w-auto"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
