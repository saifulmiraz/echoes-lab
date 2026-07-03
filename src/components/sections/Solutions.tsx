import { solutions } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/effects/Reveal";

export default function Solutions() {
  return (
    <section id="solutions" className="section relative" aria-labelledby="solutions-heading">
      <div className="shell">
        <Reveal>
          <SectionLabel>Why most builds fall flat</SectionLabel>
          <h2 id="solutions-heading" className="mt-5 max-w-2xl text-display-md font-semibold">
            A website should earn its keep —{" "}
            <span className="text-gradient">not just sit there.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl2 border border-line bg-line md:grid-cols-2">
          {solutions.map((s, i) => (
            <Reveal
              key={s.problem}
              delay={(i % 2) * 0.08}
              className="group bg-ink p-8 transition-colors duration-500 hover:bg-surface/60 md:p-10"
            >
              <p className="text-sm font-medium uppercase tracking-wider text-muted">
                The problem
              </p>
              <p className="mt-3 font-display text-xl text-primary">{s.problem}</p>
              <div className="my-6 signal-rule opacity-50 transition-opacity duration-500 group-hover:opacity-100" />
              <p className="text-sm font-medium uppercase tracking-wider text-accent/80">
                The answer
              </p>
              <p className="mt-3 leading-relaxed text-secondary">{s.answer}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
