"use client";

import Link from "next/link";
import { useState } from "react";

const calculators = [
  { name: "Maintenance Budget", href: "/calculators/home-maintenance" },
  { name: "Rental ROI", href: "/calculators/rental-roi" },
  { name: "Quote Analyzer", href: "/calculators/contractor-quote" },
  { name: "Paint Estimator", href: "/calculators/paint-estimator" },
  { name: "Roof Calculator", href: "/calculators/roof-calculator" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008H15.75v-.008z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-slate-900">
              Property<span className="text-amber-500">Calc</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {calculators.map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
              >
                {calc.name}
              </Link>
            ))}
            <Link
              href="/about"
              className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-slate-700"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-slate-100 mt-2 pt-3">
            <div className="flex flex-col gap-1">
              {calculators.map((calc) => (
                <Link
                  key={calc.href}
                  href={calc.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm font-medium text-slate-700 hover:text-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
                >
                  {calc.name}
                </Link>
              ))}
              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-slate-700 hover:text-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
