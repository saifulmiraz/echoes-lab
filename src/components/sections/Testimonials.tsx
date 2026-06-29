import { Quote } from "lucide-react";
import { testimonials, differentiators } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/effects/Reveal";

export default function Testimonials() {
  return (
    <section className="section relative" aria-labelledby="trust-heading">
      <div className="shell">
        <Reveal>
          <SectionLabel>Why clients stay</SectionLabel>
          <h2 id="trust-heading" className="mt-5 max-w-2xl text-display-md font-semibold">
            Built on trust,{" "}
            <span className="text-gradient">priced in plain English.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 0.08}
              className="flex flex-col rounded-xl2 border border-line bg-surface/40 p-7"
            >
              <Quote className="h-6 w-6 text-signal-cyan/60" aria-hidden="true" />
              <p className="mt-4 flex-1 leading-relaxed text-secondary">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-6 border-t border-line pt-4">
                <p className="text-sm font-medium text-primary">{t.name}</p>
                <p className="text-sm text-muted">{t.role}</p>
              </footer>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <ul className="flex flex-wrap justify-center gap-3">
            {differentiators.map((d) => (
              <li
                key={d}
                className="flex items-center gap-2 rounded-full border border-line bg-white/[0.02] px-4 py-2 text-sm text-secondary"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-signal-cyan" />
                {d}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
