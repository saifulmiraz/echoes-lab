interface SectionLabelProps {
  children: string;
  /** Numeric marker, e.g. "02" — only when the content is a real sequence. */
  index?: string;
}

/**
 * The recurring structural device: a short pulsing "signal line" before a
 * tracked, uppercased eyebrow. The index is optional and only used where the
 * order genuinely carries meaning (the process timeline).
 */
export default function SectionLabel({ children, index }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="inline-flex h-px w-10 origin-left animate-pulse-line bg-accent" />
      {index && (
        <span className="font-display text-eyebrow tabular-nums text-accent">
          {index}
        </span>
      )}
      <span className="font-display text-eyebrow uppercase text-muted">
        {children}
      </span>
    </div>
  );
}
