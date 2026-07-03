import { Calendar } from "lucide-react";
import { site } from "@/lib/site";
import SectionLabel from "@/components/ui/SectionLabel";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/effects/Reveal";
import ContactForm from "@/components/sections/ContactForm";

export default function FinalCTA() {
  return (
    <section
      id="contact"
      className="section relative scroll-mt-24 overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Soft signal glow anchoring the close of the page. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-navy/40 blur-[120px]"
      />

      <div className="shell relative">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <Reveal>
            <SectionLabel>Start the conversation</SectionLabel>
            <h2
              id="contact-heading"
              className="mt-5 text-display-md font-semibold leading-[1.02]"
            >
              Ready to build{" "}
              <span className="text-gradient">something exceptional?</span>
            </h2>
            <p className="mt-5 max-w-md text-lg text-secondary">
              Let&apos;s create a website your customers won&apos;t forget. Book a
              free discovery call, or send the details and I&apos;ll reply within
              one business day.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <MagneticButton href={site.bookingUrl} external variant="primary">
                <Calendar className="h-4 w-4" />
                Book a discovery call
              </MagneticButton>
              <MagneticButton href={`mailto:${site.email}`} variant="ghost">
                or email {site.email}
              </MagneticButton>
            </div>

            <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-8">
              <div>
                <dt className="text-sm text-muted">Reply time</dt>
                <dd className="mt-1 font-display text-lg text-primary">&lt; 1 day</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">To begin</dt>
                <dd className="mt-1 font-display text-lg text-primary">50% deposit</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">You own</dt>
                <dd className="mt-1 font-display text-lg text-primary">the code</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
