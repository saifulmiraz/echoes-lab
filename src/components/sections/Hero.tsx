"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import WaveCanvas from "@/components/effects/WaveCanvas";
import MagneticButton from "@/components/ui/MagneticButton";
import { site } from "@/lib/site";

const trust = [
  "Australian-owned",
  "Fixed transparent pricing",
  "You own the source code",
];

export default function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 -z-10">
        <WaveCanvas className="opacity-90" />
      </div>
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-ink to-transparent"
        aria-hidden="true"
      />

      <div className="shell">
        <motion.div
          className="max-w-3xl"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item} className="mb-7 flex items-center gap-3">
            <span className="inline-flex h-px w-10 animate-pulse-line bg-gradient-to-r from-signal-cyan to-transparent" />
            <span className="font-display text-eyebrow uppercase text-muted">
              Web development studio · {site.location}
            </span>
          </motion.div>

          <motion.h1
            id="hero-heading"
            variants={item}
            className="text-display-xl font-semibold text-primary"
          >
            Websites & software<br />
            that <span className="signal-text">grow businesses</span>.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-7 max-w-xl text-lg leading-relaxed text-secondary"
          >
            Modern websites, eCommerce, SaaS and AI-powered software — built on a
            fast, secure stack, with transparent pricing and craftsmanship you can
            feel.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton href={site.bookingUrl} external>
              Book a discovery call
              <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton href="#pricing" variant="secondary">
              View pricing
            </MagneticButton>
          </motion.div>

          <motion.ul
            variants={item}
            className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3"
          >
            {trust.map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-signal-cyan" />
                {t}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      <a
        href="#work"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-primary md:flex"
      >
        <ArrowDown className="h-4 w-4 animate-bounce" />
        Scroll
      </a>
    </section>
  );
}
