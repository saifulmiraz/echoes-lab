"use client";

import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/effects/Reveal";

export default function Services() {
  return (
    <section id="services" className="section relative scroll-mt-24" aria-labelledby="services-heading">
      <div className="absolute inset-0 -z-10 grid-faint" aria-hidden="true" />
      <div className="shell">
        <Reveal>
          <SectionLabel>What I build</SectionLabel>
          <h2 id="services-heading" className="mt-5 max-w-2xl text-display-md font-semibold">
            One studio, eleven kinds of build —{" "}
            <span className="text-gradient">each priced upfront.</span>
          </h2>
          <p className="mt-4 max-w-prose text-secondary">
            From a one-page portfolio to multi-tenant SaaS. Pick the build that fits,
            then choose the tier. Hover a card for the highlights.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal as="li" key={service.name} delay={(i % 3) * 0.06}>
                <a
                  href={`#pricing-${service.pricingSlug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-xl2 border border-line bg-surface/40 p-6 transition-all duration-500 ease-signal hover:-translate-y-1 hover:border-white/15 hover:bg-surface/70 hover:shadow-glow"
                >
                  <span
                    className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/0 blur-2xl transition-all duration-500 group-hover:bg-accent/10"
                    aria-hidden="true"
                  />
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-accent transition-all duration-500 group-hover:scale-110 group-hover:border-accent/30">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 flex items-center gap-1.5 font-display text-lg font-semibold text-primary">
                    {service.name}
                    <ArrowUpRight className="h-4 w-4 -translate-x-1 text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-secondary">
                    {service.description}
                  </p>
                  <div className="mt-auto grid grid-rows-[0fr] pt-0 transition-all duration-500 ease-signal group-hover:grid-rows-[1fr] group-hover:pt-5">
                    <ul className="flex min-h-0 flex-col gap-1.5 overflow-hidden">
                      {service.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2 text-xs text-muted">
                          <span className="h-1 w-1 rounded-full bg-accent" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
