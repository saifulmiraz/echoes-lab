import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  UtensilsCrossed,
  CalendarCheck,
  ShoppingBag,
  GraduationCap,
  Users,
  FolderTree,
  BriefcaseBusiness,
  PenLine,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";

/* ---------------------------------------------------------------- Services */

export interface Service {
  name: string;
  icon: LucideIcon;
  description: string;
  /** Maps to a pricing slug so the card can deep-link into Pricing. */
  pricingSlug: string;
  highlights: string[];
}

export const services: Service[] = [
  {
    name: "Portfolio",
    icon: Briefcase,
    description: "Presentation sites that put a person or business online with credibility.",
    pricingSlug: "portfolio",
    highlights: ["Custom brand design", "On-page SEO", "Built to convert enquiries"],
  },
  {
    name: "Restaurant",
    icon: UtensilsCrossed,
    description: "Digital menus, online ordering, table reservations, and delivery info.",
    pricingSlug: "restaurant",
    highlights: ["Online ordering", "Reservations", "Multi-venue ready"],
  },
  {
    name: "Booking",
    icon: CalendarCheck,
    description: "Live-availability scheduling for any business that books clients in.",
    pricingSlug: "booking",
    highlights: ["Calendar sync", "Deposits via Stripe", "SMS reminders"],
  },
  {
    name: "E-commerce",
    icon: ShoppingBag,
    description: "Stores with checkout, Click & Collect, and delivery — single or multi-branch.",
    pricingSlug: "ecommerce",
    highlights: ["Stripe checkout", "Delivery zones", "Admin dashboard"],
  },
  {
    name: "School & Coaching",
    icon: GraduationCap,
    description: "Course listings, online enrolment, student portals, and progress tracking.",
    pricingSlug: "school",
    highlights: ["Enrolment + payments", "Student portal", "Multi-campus"],
  },
  {
    name: "Community",
    icon: Users,
    description: "Forums and social platforms with profiles, messaging, and moderation.",
    pricingSlug: "community",
    highlights: ["Real-time chat", "Memberships", "Roles & gamification"],
  },
  {
    name: "Directory",
    icon: FolderTree,
    description: "Searchable listing platforms with reviews, categories, and claim-your-business.",
    pricingSlug: "directory",
    highlights: ["Featured listings", "Ratings & reviews", "Subscription plans"],
  },
  {
    name: "Job Board",
    icon: BriefcaseBusiness,
    description: "Two-sided platforms where employers post roles and candidates apply.",
    pricingSlug: "job-board",
    highlights: ["Resume uploads", "Smart matching", "Employer plans"],
  },
  {
    name: "Blog",
    icon: PenLine,
    description: "Fast, SEO-friendly publishing platforms with a clean editorial CMS.",
    pricingSlug: "blog",
    highlights: ["Advanced SEO", "Memberships", "Author profiles"],
  },
  {
    name: "SaaS",
    icon: LayoutDashboard,
    description: "Subscription products with accounts, dashboards, billing, and multi-tenancy.",
    pricingSlug: "saas",
    highlights: ["Stripe billing", "Role-based access", "API & webhooks"],
  },
  {
    name: "AI Products",
    icon: Sparkles,
    description: "Apps that turn OpenAI and Claude APIs into smart, billable products.",
    pricingSlug: "ai",
    highlights: ["Credits & metering", "Cost tracking", "Multi-provider"],
  },
];

/* --------------------------------------------------------------- Solutions */

export interface Solution {
  problem: string;
  answer: string;
}

export const solutions: Solution[] = [
  {
    problem: "A site that looks fine but never brings in work",
    answer:
      "Every page is built around one action and measured against it. Layout, copy, and speed all push toward the enquiry.",
  },
  {
    problem: "Quotes full of jargon and moving numbers",
    answer:
      "Fixed tiers, written scope, and a price agreed before a line of code is written. No surprises on the invoice.",
  },
  {
    problem: "Being locked into an agency to change a word",
    answer:
      "You own the finished source code outright. Stay on a care plan or take it in-house whenever you like.",
  },
  {
    problem: "Slow, fragile builds that age badly",
    answer:
      "A modern Next.js stack tuned for Core Web Vitals — fast on launch day and easy to extend for years after.",
  },
];

/* ----------------------------------------------------------------- Stats */

export interface Stat {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
}

export const stats: Stat[] = [
  { value: 100, suffix: "%", label: "Source code you own" },
  { value: 95, suffix: "+", label: "Target Lighthouse score" },
  { value: 11, suffix: "", label: "Build types, one studio" },
  { value: 1, suffix: "–2 wk", label: "From kickoff to a live site" },
];

/* ---------------------------------------------------------------- Projects */

export interface Project {
  title: string;
  type: string;
  challenge: string;
  solution: string;
  outcome: string;
  stack: string[];
  image?: string;
}

export const projects: Project[] = [
  {
    title: "BIG FRESH",
    type: "Multi-branch grocery e-commerce",
    challenge:
      "Seven stores needed one ordering system that knew which branch could actually deliver to each customer.",
    solution:
      "A Next.js storefront with Haversine delivery-radius logic, time-slot collection, and a live admin dashboard across all locations.",
    outcome: "One catalogue, seven branches, delivery and Click & Collect from a single codebase.",
    stack: ["Next.js", "TypeScript", "Prisma", "Stripe", "Supabase"],
    image: "/images/projects/bigfresh.png",
  },
  {
    title: "OrderTrackiz",
    type: "Multi-tenant logistics SaaS",
    challenge:
      "Wholesale produce runs needed live delivery tracking and CHEP pallet returns kept strictly separate per business.",
    solution:
      "Tenant-isolated architecture, driver workflows, pallet reconciliation, and a real-time operations dashboard.",
    outcome: "Drivers, businesses, and admins on one platform with data walled off per tenant.",
    stack: ["Next.js", "Prisma", "PostgreSQL", "Recharts", "Vercel"],
    image: "/images/projects/trackiz.png",
  },
  {
    title: "Village Spice Mart",
    type: "Independent grocer storefront",
    challenge:
      "A local grocer wanted online orders without losing the feel of the shop or paying marketplace commissions.",
    solution:
      "A branded store with 150+ products, Click & Collect scheduling, Stripe checkout, and transactional email.",
    outcome: "A commission-free storefront the owner runs themselves, live in under three weeks.",
    stack: ["Next.js", "Tailwind", "Stripe", "Resend"],
  },
];

/* ----------------------------------------------------------------- Process */

export interface ProcessStep {
  title: string;
  detail: string;
}

export const processSteps: ProcessStep[] = [
  { title: "Discovery", detail: "We map your goals, audience, and the one action the site must drive." },
  { title: "Research", detail: "Competitors, references, and structure — decided before any design starts." },
  { title: "Design", detail: "A custom interface built to your brand, reviewed together before build." },
  { title: "Development", detail: "Built on a fast, secure, modern stack with clean, handover-ready code." },
  { title: "Testing", detail: "Devices, speed, accessibility, and edge cases checked end to end." },
  { title: "Launch", detail: "We go live with training so you can run it from day one." },
  { title: "Ongoing support", detail: "Optional care plan for hosting, updates, backups, and changes." },
];

/* ------------------------------------------------------------- Why us list */

export const differentiators: string[] = [
  "Australian-owned and run",
  "Fast turnaround",
  "Transparent fixed pricing",
  "Premium ongoing support",
  "Modern, fast technology",
  "You own the source code",
  "SEO-ready on launch",
  "Performance-focused builds",
];

/* ------------------------------------------------------------ Testimonials */

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "He took our shop online without the marketplace fees. Orders started the first week and I can manage everything myself.",
    name: "Independent grocer",
    role: "E-commerce, South-West Sydney",
  },
  {
    quote:
      "The price we agreed was the price we paid. Clear scope, no surprises, and the site is genuinely fast.",
    name: "Multi-branch retailer",
    role: "E-commerce, 7 locations",
  },
  {
    quote:
      "We needed delivery tracking that kept each business's data separate. It works, and the dashboard makes the day obvious.",
    name: "Wholesale operator",
    role: "Logistics SaaS, Sydney Markets",
  },
];

/* ------------------------------------------------------------------- FAQ */

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: "How does pricing work?",
    a: "Every service comes in three fixed tiers — Silver, Gold, and Platinum. Each is a one-off build price in AUD, and you own the finished site outright. An optional monthly care plan covers hosting, security, backups, and support.",
  },
  {
    q: "How long does a project take?",
    a: "Portfolio and blog sites take 1–2 weeks; restaurant and booking 2–3; e-commerce and school 3–5; directory and job boards 4–6; community 4–7; AI apps 4–8; and SaaS products from 8–12 weeks. Timelines start once the deposit and your content are in.",
  },
  {
    q: "Do I own the website?",
    a: "Yes. The build price includes full ownership of the finished source code. You can stay on a care plan or take the project in-house at any time.",
  },
  {
    q: "What about hosting and domains?",
    a: "Website plans include one year of hosting and domain setup. After that, a care plan keeps everything hosted and maintained — or you can host it yourself, since the code is yours.",
  },
  {
    q: "What does the care plan cover?",
    a: "Hosting, security updates, backups, and ongoing support so you can stay hands-off. Care plans are billed monthly in advance and can be cancelled anytime.",
  },
  {
    q: "How many revisions are included?",
    a: "Each tier includes a review and refinement stage during design and build. Anything beyond the agreed scope is quoted separately before work begins, so the price never moves on its own.",
  },
  {
    q: "Will my site be good for SEO?",
    a: "Yes. Sites ship SEO-ready with clean metadata and structure. Gold and Platinum tiers add on-page and advanced SEO, sitemaps, and analytics.",
  },
  {
    q: "How do payments and support work?",
    a: "A 50% deposit begins the project and the remaining 50% is due on completion before launch. Support is by email on every plan, with priority and premium support on higher tiers.",
  },
  {
    q: "Can you build something custom?",
    a: "Plans are a starting point — features can be mixed between tiers, and SaaS and AI products are quoted to your specific scope. Tell me what you have in mind and I'll recommend the right plan or put together a custom quote.",
  },
];
