import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/lib/site";
import CursorGlow from "@/components/effects/CursorGlow";
import Preloader from "@/components/effects/Preloader";
import "./globals.css";

const display = localFont({
  src: "./fonts/space-grotesk-variable.woff2",
  variable: "--font-display",
  display: "swap",
  weight: "300 700",
});

const body = localFont({
  src: "./fonts/inter-variable.woff2",
  variable: "--font-body",
  display: "swap",
  weight: "100 900",
});

export const viewport: Viewport = {
  themeColor: "#101413",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Websites & Software That Grow Businesses`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "web development Sydney",
    "website design South-West Sydney",
    "ecommerce development Australia",
    "SaaS development",
    "AI app development",
    "Next.js developer Sydney",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Websites & Software That Grow Businesses`,
    description: site.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Websites & Software That Grow Businesses`,
    description: site.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#business`,
      name: site.name,
      description: site.description,
      url: site.url,
      email: site.email,
      telephone: site.phone,
      areaServed: { "@type": "City", name: "Sydney" },
      address: {
        "@type": "PostalAddress",
        addressRegion: "NSW",
        addressCountry: "AU",
        addressLocality: "South-West Sydney",
      },
      priceRange: "$$",
      knowsAbout: [
        "Web development",
        "E-commerce",
        "SaaS development",
        "AI application development",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      publisher: { "@id": `${site.url}/#business` },
      inLanguage: "en-AU",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={`${display.variable} ${body.variable}`}>
      <body className="relative min-h-screen overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
        >
          Skip to content
        </a>
        <Preloader />
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
