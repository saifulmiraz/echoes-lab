# THE ECHOZ LAB — Studio Website

A production-ready, single-page agency website for THE ECHOZ LAB. Built as a
premium, conversion-focused lead generator: cinematic scroll, signal/sound-wave
motif, transparent pricing, and a working enquiry form.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS ·
Framer Motion · Lucide. Self-hosted variable fonts (Space Grotesk + Inter) via
`next/font/local`. Zero runtime data dependencies.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm start            # serve the production build
```

Requires Node 18.18+ (Node 20–22 recommended).

---

## Environment variables

Copy `.env.example` to `.env.local`. Everything is optional — the site runs and
the form works (logging submissions to the server console) with no config.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap, Open Graph. Set to your live domain. |
| `NEXT_PUBLIC_BOOKING_URL` | "Book a discovery call" link (Cal.com / Calendly / TidyCal). |
| `RESEND_API_KEY` | Enables email delivery of enquiries via Resend. If unset, leads are logged to the server console instead. |
| `LEAD_INBOX` | Where enquiry emails are sent (defaults to the studio email in `src/lib/site.ts`). |

To send real emails: create a [Resend](https://resend.com) key, set
`RESEND_API_KEY` and `LEAD_INBOX`, and verify your domain in Resend, then change
the `from` address in `src/app/api/contact/route.ts` to that domain (it ships
with Resend's `onboarding@resend.dev` test sender).

---

## Where to edit things

| What | File |
| --- | --- |
| Name, email, phone, social, booking URL | `src/lib/site.ts` |
| **Pricing (authoritative — from the 2026 pricing PDF)** | `src/lib/pricing.ts` |
| Services, projects, stats, process, testimonials, FAQ | `src/lib/content.ts` |
| Design tokens (colours, fonts, shadows, motion) | `tailwind.config.ts` |
| Global styles / utilities | `src/app/globals.css` |
| Section order | `src/app/page.tsx` |

> Pricing is transcribed verbatim from the supplied 2026 pricing document. If
> prices change, update `src/lib/pricing.ts` only.

---

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel: **New Project → Import** the repo. Framework auto-detects as Next.js.
3. Add the env vars above under **Settings → Environment Variables**.
4. Deploy. Set your custom domain and update `NEXT_PUBLIC_SITE_URL` to match.

No build configuration is needed.

---

## What's included

- Interactive sound-wave hero (Canvas 2D, reduced-motion aware), cursor lighting,
  "signal detected" preloader.
- 11 service categories × Silver/Gold/Platinum pricing with a tabbed switcher,
  deep-linkable from the Services grid.
- Animated process timeline, testimonials, objection-removing FAQ.
- Working enquiry form (`/api/contact`) with validation + honeypot.
- SEO: metadata, Open Graph + dynamic OG image, Twitter cards, canonical,
  `robots.txt`, `sitemap.xml`, and Schema.org (ProfessionalService, WebSite, FAQ).
- Accessibility: semantic landmarks, skip link, keyboard-navigable, ARIA on
  interactive elements, full reduced-motion support, themed focus rings.

The source code is yours to own, modify, and deploy.
