import { stats } from "@/lib/content";
import Counter from "@/components/ui/Counter";
import Reveal from "@/components/effects/Reveal";

export default function Stats() {
  return (
    <section className="relative border-y border-line bg-surface/30" aria-label="At a glance">
      <div className="shell grid grid-cols-2 divide-x divide-line py-10 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 0.08}
            className="flex flex-col items-center px-3 py-4 text-center"
          >
            <div className="font-display text-4xl font-semibold text-primary md:text-5xl">
              <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
            </div>
            <p className="mt-2 text-sm text-muted">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
