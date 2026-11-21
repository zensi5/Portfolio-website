type P = { className?: string };

export function ArrowUpRight({ className = "size-4" }: P) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4.5 11.5l7-7M5.5 4.5h6v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowDown({ className = "size-4" }: P) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M8 2.5v11M3.5 9L8 13.5 12.5 9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PauseIcon({ className = "size-3.5" }: P) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <rect x="3.5" y="2.5" width="3" height="11" rx="1" />
      <rect x="9.5" y="2.5" width="3" height="11" rx="1" />
    </svg>
  );
}

export function PlayIcon({ className = "size-3.5" }: P) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M4.5 2.8v10.4a.8.8 0 0 0 1.2.7l8.4-5.2a.8.8 0 0 0 0-1.4L5.7 2.1a.8.8 0 0 0-1.2.7z" />
    </svg>
  );
}

export function Globe({ className = "size-5" }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M4.6 7.5h14.8M4.6 16.5h14.8" />
      <ellipse className="globe__meridian" cx="12" cy="12" rx="4.5" ry="9" />
      <ellipse className="globe__meridian globe__meridian--2" cx="12" cy="12" rx="4.5" ry="9" />
    </svg>
  );
}

export function SocialIcon({ name, className = "size-6" }: { name: string } & P) {
  if (name === "linkedin")
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M21 21h-4v-6.3c0-1.5-.03-3.4-2.08-3.4-2.08 0-2.4 1.62-2.4 3.3V21h-4V8.6h3.84v1.7h.05c.53-1 1.84-2.08 3.79-2.08 4.05 0 4.8 2.67 4.8 6.14V21zM4.07 6.9a2.32 2.32 0 1 1 0-4.65 2.32 2.32 0 0 1 0 4.65zM6.07 21h-4V8.6h4V21z" />
      </svg>
    );
  if (name === "github")
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0 0 12 .3" />
      </svg>
    );
  if (name === "x")
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.63 7.58H.48l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.3 19.5h2.04L6.48 3.24H4.3l13.3 17.4z" />
      </svg>
    );
  // email
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="M3 6.5l9 6.5 9-6.5" strokeLinejoin="round" />
    </svg>
  );
}
