/** Text that rolls up character by character on hover/focus of the nearest `.roll-host`. */
export function RollText({ text }: { text: string }) {
  const chars = Array.from(text);
  const row = (key: string) => (
    <span className={`roll__row roll__row--${key}`} aria-hidden="true">
      {chars.map((c, i) => (
        <span key={i} className="roll__char" style={{ "--i": i } as React.CSSProperties}>
          {c}
        </span>
      ))}
    </span>
  );
  return (
    <span className="roll">
      <span className="sr-only">{text}</span>
      {row("1")}
      {row("2")}
    </span>
  );
}
