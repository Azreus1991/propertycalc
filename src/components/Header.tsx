"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const calcLinks = [
  { name: "Mortgage Calculator", desc: "Monthly payments & amortization", href: "/calculators/mortgage", icon: "M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" },
  { name: "Rental ROI", desc: "Analyze investment returns", href: "/calculators/rental-roi", icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { name: "Rent vs Buy", desc: "Compare renting vs buying", href: "/calculators/rent-vs-buy", icon: "M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" },
  { name: "Property Tax", desc: "All 50 state tax rates", href: "/calculators/property-tax", icon: "M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z" },
  { name: "Renovation ROI", desc: "Rehab return on investment", href: "/calculators/renovation-roi", icon: "M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" },
];

const platformLinks = [
  { name: "Deal Marketplace", desc: "Browse & submit deals", href: "/deals" },
  { name: "Services Network", desc: "Contractors, lenders, agents", href: "/services" },
  { name: "Arbitrage Paths", desc: "Earn with zero capital", href: "/arbitrage" },
  { name: "Blog & Guides", desc: "Market insights & education", href: "/blog" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [calcDropdown, setCalcDropdown] = useState(false);
  const [platformDropdown, setPlatformDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[4.25rem]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-md shadow-brand-500/20 group-hover:shadow-lg group-hover:shadow-brand-500/30 transition-all duration-300">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-navy-950">
                Property<span className="text-brand-500">Calc</span>
              </span>
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-slate-400 -mt-0.5 hidden sm:block">
                Real Estate Operating System
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {/* Calculators Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCalcDropdown(true)}
              onMouseLeave={() => setCalcDropdown(false)}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 hover:text-navy-950 rounded-lg hover:bg-warm-100/60 transition-colors">
                Calculators
                <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${calcDropdown ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {calcDropdown && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[30rem]">
                  <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/8 border border-slate-200/80 p-3 grid grid-cols-1 gap-0.5">
                    {calcLinks.map((calc) => (
                      <Link key={calc.href} href={calc.href}
                        className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-warm-50 transition-colors group/item">
                        <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center shrink-0 group-hover/item:bg-brand-100 transition-colors">
                          <svg className="w-4.5 h-4.5 text-brand-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d={calc.icon} />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-navy-950 group-hover/item:text-brand-600 transition-colors">{calc.name}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{calc.desc}</div>
                        </div>
                      </Link>
                    ))}
                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <Link href="/calculators" className="flex items-center gap-2 p-3 rounded-xl hover:bg-warm-50 transition-colors text-sm font-medium text-brand-600">
                        View all 12 calculators →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Platform Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setPlatformDropdown(true)}
              onMouseLeave={() => setPlatformDropdown(false)}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 hover:text-navy-950 rounded-lg hover:bg-warm-100/60 transition-colors">
                Platform
                <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${platformDropdown ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {platformDropdown && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[24rem]">
                  <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/8 border border-slate-200/80 p-3 grid grid-cols-1 gap-0.5">
                    {platformLinks.map((link) => (
                      <Link key={link.href} href={link.href}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-warm-50 transition-colors group/item">
                        <div>
                          <div className="text-sm font-semibold text-navy-950 group-hover/item:text-brand-600 transition-colors">{link.name}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{link.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/deals" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-navy-950 rounded-lg hover:bg-warm-100/60 transition-colors">
              Deals
            </Link>
            <Link href="/pricing" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-navy-950 rounded-lg hover:bg-warm-100/60 transition-colors">
              Pricing
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/auth/login" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">
              Sign In
            </Link>
            <Link href="/auth/register" className="btn-primary text-sm !py-2 !px-4">
              Get Started Free
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-warm-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-navy-900" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="lg:hidden pb-6 border-t border-slate-100 mt-2 pt-4 animate-fade-in-up" style={{ animationDuration: "0.2s" }}>
            <div className="space-y-1">
              <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Platform</div>
              {[
                { label: "Deal Marketplace", href: "/deals" },
                { label: "Submit a Deal", href: "/deals/submit" },
                { label: "Services Network", href: "/services" },
                { label: "Arbitrage Paths", href: "/arbitrage" },
                { label: "Portfolio", href: "/portfolio" },
                { label: "Messages", href: "/messages" },
              ].map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-navy-950 hover:text-brand-600 rounded-xl hover:bg-warm-50 transition-colors">
                  {link.label}
                </Link>
              ))}

              <div className="border-t border-slate-100 my-3" />
              <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Calculators</div>
              {calcLinks.slice(0, 5).map((calc) => (
                <Link key={calc.href} href={calc.href} onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-navy-950 hover:text-brand-600 rounded-xl hover:bg-warm-50 transition-colors">
                  {calc.name}
                </Link>
              ))}
              <Link href="/calculators" onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-sm font-medium text-brand-600 rounded-xl hover:bg-warm-50 transition-colors">
                View all calculators →
              </Link>

              <div className="border-t border-slate-100 my-3" />
              {[
                { label: "Blog", href: "/blog" },
                { label: "Guides", href: "/guides" },
                { label: "Pricing", href: "/pricing" },
                { label: "Support", href: "/support" },
              ].map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-navy-950 hover:text-brand-600 rounded-xl hover:bg-warm-50 transition-colors">
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 px-3 space-y-2">
                <Link href="/auth/login" onClick={() => setMobileOpen(false)}
                  className="btn-secondary w-full justify-center text-sm">
                  Sign In
                </Link>
                <Link href="/auth/register" onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full justify-center text-sm">
                  Get Started Free
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
