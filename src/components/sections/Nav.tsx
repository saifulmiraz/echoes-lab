"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navItems, site } from "@/lib/site";
import MagneticButton from "@/components/ui/MagneticButton";

function Wordmark() {
  return (
    <a href="#top" className="group flex items-center gap-2.5" aria-label={`${site.name} — home`}>
      <span className="flex items-end gap-[3px]" aria-hidden="true">
        {[10, 18, 13, 22].map((h, i) => (
          <span
            key={i}
            className="w-[3px] rounded-full bg-signal-cyan transition-all duration-300 group-hover:bg-signal-magenta"
            style={{ height: h }}
          />
        ))}
      </span>
      <span className="font-display text-sm font-semibold tracking-[0.18em] text-primary">
        ECHOZ LAB
      </span>
    </a>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-signal ${
        scrolled ? "glass border-b border-line py-3" : "border-b border-transparent py-5"
      }`}
    >
      <nav className="shell flex items-center justify-between" aria-label="Primary">
        <Wordmark />

        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="relative text-sm text-secondary transition-colors hover:text-primary after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-signal-cyan after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <MagneticButton href={site.bookingUrl} external className="px-5 py-2.5 text-[13px]">
            Book a call
            <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-primary md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="glass border-t border-line md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul className="shell flex flex-col gap-1 py-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-base text-secondary transition-colors hover:bg-white/5 hover:text-primary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <MagneticButton href={site.bookingUrl} external fullWidth>
                  Book a discovery call
                  <ArrowUpRight className="h-4 w-4" />
                </MagneticButton>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
