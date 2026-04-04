import Link from "next/link";

const calculatorLinks = [
  { name: "Mortgage Calculator", href: "/calculators/mortgage" },
  { name: "Rental Property ROI", href: "/calculators/rental-roi" },
  { name: "Rent vs Buy", href: "/calculators/rent-vs-buy" },
  { name: "Property Tax", href: "/calculators/property-tax" },
  { name: "Renovation ROI", href: "/calculators/renovation-roi" },
  { name: "All Calculators", href: "/calculators" },
];

const platformLinks = [
  { name: "Deal Marketplace", href: "/deals" },
  { name: "Services Network", href: "/services" },
  { name: "Arbitrage Paths", href: "/arbitrage" },
  { name: "Blog", href: "/blog" },
  { name: "Guides", href: "/guides" },
];

const companyLinks = [
  { name: "About", href: "/about" },
  { name: "Pricing", href: "/pricing" },
  { name: "Support", href: "/support" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Newsletter CTA Band */}
      <div className="bg-hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ready to get started?
            </h3>
            <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-lg mx-auto">
              Create a free account to submit deals, track your portfolio,
              access the services marketplace, and use all 12+ calculators.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto justify-center">
              <Link href="/auth/register" className="bg-brand-500 hover:bg-brand-400 text-white font-semibold px-6 py-3 rounded-[0.625rem] transition-all shadow-lg shadow-brand-500/25 hover:shadow-brand-400/35 text-center">
                Create Free Account
              </Link>
              <Link href="/calculators" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-[0.625rem] transition-all text-center">
                Explore Calculators
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-4">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                </div>
                <span className="text-xl font-extrabold text-white tracking-tight">
                  Property<span className="text-brand-500">Calc</span>
                </span>
              </Link>
              <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-xs">
                The real estate operating system. Free calculators, deal sourcing,
                investor matching, services marketplace, and portfolio tracking —
                built for every role in real estate.
              </p>
            </div>

            {/* Calculators */}
            <div className="lg:col-span-3">
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-300 mb-5">Calculators</h4>
              <ul className="space-y-3">
                {calculatorLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-400 hover:text-brand-400 transition-colors">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Platform */}
            <div className="lg:col-span-2">
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-300 mb-5">Platform</h4>
              <ul className="space-y-3">
                {platformLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-400 hover:text-brand-400 transition-colors">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="lg:col-span-3">
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-300 mb-5">Company</h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-400 hover:text-brand-400 transition-colors">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-xs text-slate-500">
              &copy; {new Date().getFullYear()} PropertyCalc. All rights reserved.
            </p>
            <p className="text-xs text-slate-500">
              Calculations are estimates only. Always consult a licensed professional for major financial decisions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
