import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "PropertyCalc — Free Property Maintenance & Real Estate Calculators",
    template: "%s | PropertyCalc",
  },
  description:
    "The most comprehensive free property toolkit on the web. Accurate calculators, expert guides, and resources for homeowners, landlords, investors, and property managers.",
  keywords: [
    "property maintenance calculator",
    "home maintenance cost estimator",
    "rental property ROI calculator",
    "contractor quote comparison",
    "paint cost estimator",
    "roof replacement calculator",
    "landlord tools",
    "property management calculators",
    "real estate investment tools",
    "homeowner resources",
    "property budget planner",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "PropertyCalc",
    title: "PropertyCalc — Free Property & Real Estate Calculators",
    description:
      "Accurate, free calculators and expert resources for homeowners, landlords, and investors. Make smarter property decisions backed by real data.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PropertyCalc — Free Property & Real Estate Calculators",
    description:
      "Make smarter property decisions. Free calculators for maintenance budgets, rental ROI, contractor quotes, and more.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
