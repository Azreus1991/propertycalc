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
    "Free, accurate calculators for homeowners, landlords, and property managers. Estimate maintenance costs, rental ROI, contractor quotes, and more.",
  keywords: [
    "property maintenance calculator",
    "home maintenance cost estimator",
    "rental property ROI calculator",
    "contractor quote comparison",
    "paint cost estimator",
    "roof replacement calculator",
    "landlord tools",
    "property management calculators",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "PropertyCalc",
    title: "PropertyCalc — Free Property & Maintenance Calculators",
    description:
      "Accurate, free calculators for homeowners and landlords. Budget maintenance, compare quotes, calculate ROI.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
