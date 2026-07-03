"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { processSteps } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/effects/Reveal";

const timelines: { label: string; weeks: string }[] = [
  { label: "Portfolio & Blog", weeks: "1–2 weeks" },
  { label: "Restaurant & Booking", weeks: "2–3 weeks" },
  { label: "E-commerce & School / Coaching", weeks: "3–5 weeks" },
  { label: "Directory & Job Board", weeks: "4–6 weeks" },
  { label: "Community", weeks: "4–7 weeks" },
  { label: "AI-Powered apps", weeks: "4–8 weeks" },
  { label: "SaaS products", weeks: "8–12 weeks+" },
];

export default function Process() {
  const ref = useRef<HTMLOListElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  return (
    <section id="process" className="section relative scroll-mt-24" aria-labelledby="process-heading">
      <div className="shell">
        <Reveal>
          <SectionLabel>How it works</SectionLabel>
          <h2 id="process-heading" className="mt-5 max-w-2xl text-display-md font-semibold">
            A clear path from first call{" "}
            <span className="text-gradient">to a site that&apos;s live.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          {/* Timeline */}
          <ol ref={ref} className="relative ml-2">
            {/* Track */}
            <span
              className="absolute left-[11px] top-2 h-[calc(100%-1rem)] w-px bg-line"
              aria-hidden="true"
            />
            {/* Progress fill */}
            <motion.span
              className="absolute left-[11px] top-2 w-px origin-top bg-accent"
              style={{ height: "calc(100% - 1rem)", scaleY: progress }}
              aria-hidden="true"
            />
            {processSteps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={0.04} className="relative mb-9 pl-10 last:mb-0">
                <span
                  className="absolute left-0 top-0.5 flex h-6 w-6 items-center justify-center rounded-full border border-line bg-ink text-[11px] font-medium text-accent"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg font-semibold text-primary">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-secondary">{step.detail}</p>
              </Reveal>
            ))}
          </ol>

          {/* Project timelines */}
          <Reveal className="h-fit rounded-xl2 border border-line bg-surface/40 p-7 lg:sticky lg:top-28">
            <h3 className="font-display text-lg font-semibold text-primary">Typical timelines</h3>
            <p className="mt-1.5 text-sm text-muted">
              After deposit and content are received. Final timing depends on scope and
              how quickly content arrives.
            </p>
            <ul className="mt-6 divide-y divide-line">
              {timelines.map((t) => (
                <li key={t.label} className="flex items-center justify-between gap-4 py-3">
                  <span className="text-sm text-secondary">{t.label}</span>
                  <span className="whitespace-nowrap font-display text-sm text-accent">
                    {t.weeks}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
