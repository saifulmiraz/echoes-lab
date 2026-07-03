import { Github, Linkedin, Instagram, ArrowUpRight } from "lucide-react";
import { site, navItems } from "@/lib/site";

const socials = [
  { label: "GitHub", href: site.social.github, Icon: Github },
  { label: "LinkedIn", href: site.social.linkedin, Icon: Linkedin },
  { label: "Instagram", href: site.social.instagram, Icon: Instagram },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line">
      <div className="shell py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a
              href="#top"
              className="inline-flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-primary"
            >
              <span className="signal-text">THE ECHOZ LAB</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {site.serviceLine}. Built in {site.location} — clear plans, fixed
              prices, source code you own.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="group mt-5 inline-flex items-center gap-1.5 text-sm text-secondary transition-colors hover:text-primary"
            >
              {site.email}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Nav */}
          <nav aria-label="Footer">
            <h2 className="font-display text-eyebrow uppercase text-muted">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-secondary transition-colors hover:text-primary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  className="text-sm text-secondary transition-colors hover:text-primary"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Social */}
          <div>
            <h2 className="font-display text-eyebrow uppercase text-muted">
              Connect
            </h2>
            <ul className="mt-4 flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-md border border-line text-secondary transition-all hover:border-link/40 hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 text-sm text-muted sm:flex-row sm:items-center">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>Designed &amp; built in {site.location}.</p>
        </div>
      </div>
    </footer>
  );
}
