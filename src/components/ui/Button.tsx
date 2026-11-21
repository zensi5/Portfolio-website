import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "dark" | "light";
  size?: "default" | "small";
  icon?: ReactNode;
} & Omit<ComponentProps<"a">, "href" | "children">;

function Balls() {
  return (
    <>
      <span className="btn__ball btn__ball--1" />
      <span className="btn__ball btn__ball--2" />
    </>
  );
}

/** Pill button with two drifting gradient balls, ported from the Webflow original. */
export function Button({ href, children, variant = "dark", size = "default", icon, className = "", ...rest }: Props) {
  const classes = `btn ${variant === "light" ? "btn--light" : ""} ${size === "small" ? "btn--small" : ""} ${className}`;
  const inner = (
    <>
      <span className="btn__inner">
        <span className="btn__balls" aria-hidden="true">
          <Balls />
        </span>
        <span className="btn__text">{children}</span>
        {icon && <span className="btn__text" aria-hidden="true">{icon}</span>}
      </span>
      <span className="btn__glow" aria-hidden="true">
        <Balls />
      </span>
    </>
  );

  const isInternal = href.startsWith("/") && !href.endsWith(".pdf");
  if (isInternal) {
    return (
      <Link href={href} className={classes} {...rest}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} {...rest}>
      {inner}
    </a>
  );
}
