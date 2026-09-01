import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Providers } from "@/providers";
import { Navbar, Footer } from "@/components";
import { getCompanySettings } from "@/services/company";
import "./globals.css";

/**
 * Font Configuration
 * Inter: Body text
 * Playfair Display: Headings and premium display
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

/**
 * Metadata Configuration
 * SEO and social media optimization
 */
export async function generateMetadata(): Promise<Metadata> {
  const company = await getCompanySettings();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: company.companyName,
      template: `%s | ${company.companyName}`,
    },
    description:
      "Next-generation industrial automation and control solutions for enterprise manufacturing. Trusted by 500+ companies worldwide.",
    keywords: [
      "industrial automation",
      "control systems",
      "manufacturing solutions",
      "enterprise software",
      "IoT",
      "real-time monitoring",
    ],
    authors: [{ name: company.companyName }],
    creator: company.companyName,
    publisher: company.companyName,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      siteName: company.companyName,
      title: `${company.companyName} - Enterprise Automation Solutions`,
      description:
        "Next-generation industrial automation and control solutions for enterprise manufacturing.",
      images: [
        {
          url: company.logo || "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: company.companyName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@industrial",
      creator: "@industrial",
    },
    formatDetection: {
      email: false,
      telephone: false,
    },
  };
}

/**
 * Viewport Configuration
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#001014" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const company = await getCompanySettings();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfairDisplay.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Theme Color */}
        <meta name="theme-color" content="#003366" />

        {/* Additional Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </head>
      <body className="antialiased bg-white text-gray-900">
        <Providers>
          <Navbar company={company} />
          <main className="pt-16 md:pt-20 min-h-screen">{children}</main>
          <Footer company={company} />
        </Providers>
      </body>
    </html>
  );
}
