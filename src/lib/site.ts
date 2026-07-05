export const site = {
  name: "THE ECHOZ LAB",
  shortName: "Echoz Lab",
  tagline: "Websites & software that grow businesses.",
  description:
    "THE ECHOZ LAB designs and builds premium websites, e-commerce stores, SaaS and AI-powered software in South-West Sydney. Clear plans, fixed prices, source code you own.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://echozlab.com",
  bookingUrl:
    process.env.NEXT_PUBLIC_BOOKING_URL ?? "https://cal.com/echozlab/consultation",
  location: "South-West Sydney, Australia",
  region: "AU-NSW",
  email: "hello@echozlab.com",
  phone: "+61 416041435",
  serviceLine: "Websites • SAAS • E-commerce • Software • AI Solutions",
  social: {
    github: "https://github.com/echozlab",
    linkedin: "https://www.linkedin.com/company/echozlab",
    instagram: "https://www.instagram.com/echozlab",
  },
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];
