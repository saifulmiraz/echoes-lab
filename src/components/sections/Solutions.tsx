"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TABS = [
  {
    id: "ownership",
    label: "Ownership",
    problem: "Being locked into an agency to change a word",
    answer:
      "You own the finished source code outright. Stay on a care plan or take it in-house whenever you like.",
  },
  {
    id: "pricing",
    label: "Pricing",
    problem: "Quotes full of jargon and moving numbers",
    answer:
      "Fixed tiers, written scope, and a price agreed before a line of code is written. No surprises on the invoice.",
  },
  {
    id: "speed",
    label: "Speed",
    problem: "Slow, fragile builds that age badly",
    answer:
      "A modern Next.js stack tuned for Core Web Vitals — fast on launch day and easy to extend for years after.",
  },
  {
    id: "leads",
    label: "Leads",
    problem: "A site that looks fine but never brings in work",
    answer:
      "Every page is built around one action and measured against it. Layout, copy, and speed all push toward the enquiry.",
  },
];

export default function Solutions() {
  const [active, setActive] = useState(TABS[0].id);
  const current = TABS.find((t) => t.id === active)!;

  return (
    <section className="bg-[#101413] px-6 py-12 md:py-20">
      <div className="mx-auto max-w-5xl">
        {/* Eyebrow */}
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-8 bg-[#FFDE38]" />
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#5C6462]">
            Why most builds fall flat
          </p>
        </div>

        {/* Heading */}
        <h2 className="mb-10 max-w-2xl text-3xl font-bold tracking-tight text-white md:text-5xl">
          A website should earn its keep —{" "}
          <span className="text-[#FFDE38]">not just sit there.</span>
        </h2>

        {/* Tab bar */}
        <div
          role="tablist"
          aria-label="Common problems and our answers"
          className="mb-6 flex flex-wrap gap-2"
        >
          {TABS.map((tab) => {
            const isActive = tab.id === active;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(tab.id)}
                className={`relative rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#101413]"
                    : "border border-[#262C2B] text-[#9BA3A1] hover:border-[#FFDE38]/50 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="solutions-active-tab"
                    className="absolute inset-0 rounded-md bg-[#FFDE38]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div className="rounded-lg border border-[#262C2B] bg-[#181D1C] p-6 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#5C6462]">
                The problem
              </p>
              <p className="mt-2 text-lg font-semibold text-white md:text-2xl">
                {current.problem}
              </p>

              <div className="my-6 h-px w-full bg-[#262C2B]" />

              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#FFDE38]">
                The answer
              </p>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-[#9BA3A1] md:text-lg">
                {current.answer}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}