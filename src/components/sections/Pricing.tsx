"use client";

import { useEffect, useState } from "react";
import { Check, ArrowUpRight, Info } from "lucide-react";
import {
  pricing,
  addOns,
  paymentTerms,
  pricingFootnote,
  type Tier,
} from "@/lib/pricing";
import { site } from "@/lib/site";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/effects/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";

function TierCard({ tier, service }: { tier: Tier; service: string }) {
  const popular = tier.popular;
  return (
    <div
      className={`relative flex h-full flex-col rounded-xl2 border p-7 transition-all duration-500 ${
        popular
          ? "border-signal-cyan/40 bg-surface/70 shadow-glow lg:-translate-y-3"
          : "border-line bg-surface/30 hover:border-white/15"
      }`}
    >
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-signal-cyan px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink">
          Most popular
        </span>
      )}
      <div className="flex items-baseline justify-between">
        <h4 className="font-display text-lg font-semibold text-primary">{tier.name}</h4>
        <span className="text-xs uppercase tracking-wider text-muted">{tier.tagline}</span>
      </div>

      <div className="mt-5">
        <div className="flex items-end gap-1.5">
          {tier.from && <span className="pb-1 text-sm text-muted">from</span>}
          <span className="font-display text-4xl font-semibold text-primary">{tier.price}</span>
          <span className="pb-1 text-sm text-muted">one-off</span>
        </div>
        <p className="mt-1.5 text-sm text-secondary">
          + {tier.care} care plan{" "}
          <span className="text-muted">· optional</span>
        </p>
      </div>

      <div className="my-6 signal-rule opacity-40" />

      {tier.inherits && (
        <p className="mb-3 text-sm font-medium text-secondary">{tier.inherits}</p>
      )}
      <ul className="flex flex-1 flex-col gap-2.5">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-secondary">
            <Check
              className={`mt-0.5 h-4 w-4 shrink-0 ${popular ? "text-signal-cyan" : "text-muted"}`}
            />
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-7">
        <MagneticButton
          href={`${site.bookingUrl}?plan=${encodeURIComponent(`${service} · ${tier.name}`)}`}
          external
          variant={popular ? "primary" : "secondary"}
          fullWidth
        >
          Start with {tier.name}
          <ArrowUpRight className="h-4 w-4" />
        </MagneticButton>
      </div>
    </div>
  );
}

export default function Pricing() {
  const [active, setActive] = useState(pricing[0].slug);

  // Allow deep links from the services grid (#pricing-ecommerce) to preselect.
  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash.replace("#pricing-", "");
      if (pricing.some((p) => p.slug === hash)) setActive(hash);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const current = pricing.find((p) => p.slug === active) ?? pricing[0];

  return (
    <section id="pricing" className="section relative scroll-mt-24" aria-labelledby="pricing-heading">
      <div className="shell">
        <Reveal>
          <SectionLabel>Transparent pricing</SectionLabel>
          <h2 id="pricing-heading" className="mt-5 max-w-2xl text-display-md font-semibold">
            Three tiers per build.{" "}
            <span className="text-gradient">No hidden numbers.</span>
          </h2>
          <p className="mt-4 max-w-prose text-secondary">
            Every plan is a one-off build price in AUD — and you own the finished site
            outright. The monthly care plan is optional, covering hosting, security,
            backups, and support.
          </p>
        </Reveal>

        {/* Category switcher */}
        <Reveal className="mt-10">
          <div
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
            role="tablist"
            aria-label="Service categories"
          >
            {pricing.map((p) => {
              const isActive = p.slug === active;
              return (
                <button
                  key={p.slug}
                  id={`pricing-${p.slug}`}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(p.slug)}
                  className={`scroll-mt-28 whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
                    isActive
                      ? "border-signal-cyan/40 bg-signal-cyan/10 text-primary"
                      : "border-line text-muted hover:border-white/15 hover:text-secondary"
                  }`}
                >
                  {p.name.replace(" Websites", "").replace(" Applications", "")}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Active service */}
        <div className="mt-8">
          <Reveal key={current.slug}>
            <div className="mb-8 max-w-2xl">
              <h3 className="font-display text-xl font-semibold text-primary">{current.name}</h3>
              <p className="mt-1.5 text-secondary">{current.blurb}</p>
              <p className="mt-1 text-sm text-muted">For: {current.audience}</p>
            </div>

            <div className="grid items-stretch gap-5 lg:grid-cols-3">
              {current.tiers.map((tier) => (
                <TierCard key={tier.name} tier={tier} service={current.name} />
              ))}
            </div>

            {current.note && (
              <p className="mt-6 flex items-center gap-2 text-sm text-muted">
                <Info className="h-4 w-4 text-signal-cyan" />
                {current.note}
              </p>
            )}
          </Reveal>
        </div>

        {/* Add-ons */}
        <Reveal className="mt-20">
          <h3 className="font-display text-xl font-semibold text-primary">Add-ons & extras</h3>
          <p className="mt-1.5 text-secondary">Mix and match with any plan to tailor it to your business.</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {addOns.map((a) => (
              <li key={a.title} className="rounded-xl border border-line bg-surface/30 p-5">
                <p className="font-medium text-primary">{a.title}</p>
                <p className="mt-1.5 text-sm text-secondary">{a.detail}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Payment terms + footnote */}
        <Reveal className="mt-12 grid gap-8 rounded-xl2 border border-line bg-surface/30 p-7 md:grid-cols-2 md:p-9">
          <div>
            <h3 className="font-display text-lg font-semibold text-primary">Payment terms</h3>
            <ul className="mt-4 space-y-2.5">
              {paymentTerms.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm text-secondary">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal-cyan" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-center border-line md:border-l md:pl-9">
            <p className="text-sm leading-relaxed text-muted">{pricingFootnote}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
