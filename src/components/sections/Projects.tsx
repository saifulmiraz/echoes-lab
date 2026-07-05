"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { projects, type Project } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/effects/Reveal";
import { site } from "@/lib/site";

function Mockup({ project }: { project: Project }) {
  return (
    <div
      className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-surface"
      aria-hidden="true"
    >
      {project.image ? (
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top"
        />
      ) : (
        <>
      <div className="absolute inset-0 bg-navy/35" />
      <div className="absolute inset-x-0 top-0 flex h-9 items-center gap-1.5 border-b border-line px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 h-3 w-40 rounded-full bg-white/[0.06]" />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <span className="font-display text-3xl font-semibold tracking-tight text-primary">
          {project.title}
        </span>
        <span className="flex items-end gap-1">
          {[14, 28, 20, 36, 22, 30, 16].map((h, i) => (
            <span
              key={i}
              className="w-1.5 rounded-full"
              style={{ height: h, background: "#FFDE38", opacity: 0.4 + (h / 36) * 0.6 }}
            />
          ))}
        </span>
      </div>
        </>
      )}
    </div>
  );
}

export default function Projects() {
  return (
    <section id="work" className="section relative scroll-mt-24" aria-labelledby="work-heading">
      <div className="shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>Selected work</SectionLabel>
            <h2 id="work-heading" className="mt-5 max-w-2xl text-display-md font-semibold">
              Real builds, shipped and{" "}
              <span className="text-gradient">running in production.</span>
            </h2>
          </div>
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden items-center gap-1.5 text-sm text-secondary transition-colors hover:text-primary sm:inline-flex"
          >
            Discuss your project
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>

        <div className="mt-14 flex flex-col gap-6">
          {projects.map((p, i) => (
            <Reveal
              key={p.title}
              delay={0.05}
              className="group grid gap-8 rounded-xl2 border border-line bg-surface/40 p-6 transition-all duration-500 hover:border-white/15 hover:shadow-elevate md:grid-cols-2 md:p-8 lg:gap-12"
            >
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <Mockup project={p} />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-sm uppercase tracking-wider text-muted">{p.type}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-primary">
                  {p.title}
                </h3>
                <dl className="mt-5 space-y-3 text-sm">
                  <div>
                    <dt className="text-muted">Challenge</dt>
                    <dd className="mt-1 text-secondary">{p.challenge}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Solution</dt>
                    <dd className="mt-1 text-secondary">{p.solution}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Outcome</dt>
                    <dd className="mt-1 text-secondary">{p.outcome}</dd>
                  </div>
                </dl>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {p.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-line px-3 py-1 text-xs text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
