import Link from "next/link";

const calculatorLinks = [
  { name: "Maintenance Budget Estimator", href: "/calculators/home-maintenance" },
  { name: "Rental Property ROI", href: "/calculators/rental-roi" },
  { name: "Contractor Quote Analyzer", href: "/calculators/contractor-quote" },
  { name: "Paint Cost Estimator", href: "/calculators/paint-estimator" },
  { name: "Roof Repair vs Replace", href: "/calculators/roof-calculator" },
];

const resourceLinks = [
  { name: "Resource Library", href: "/resources" },
  { name: "Homeowner Guides", href: "/guides" },
  { name: "Vendor Directory", href: "/vendors" },
  { name: "Newsletter", href: "/newsletter" },
];

const companyLinks = [
  { name: "About PropertyCalc", href: "/about" },
  { name: "Our Methodology", href: "/about#methodology" },
  { name: "Contact Us", href: "/about#contact" },
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
            <div className="badge badge-brand mb-4 mx-auto">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l12.15-12.15z" />
              </svg>
              Free Weekly Tips
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Property insights, delivered weekly
            </h3>
            <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-lg mx-auto">
              Join thousands of homeowners and investors getting maintenance tips,
              market insights, and money-saving strategies every Thursday.
            </p>
            <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input flex-1"
              />
              <button
                type="submit"
                className="bg-brand-500 hover:bg-brand-400 text-white font-semibold px-6 py-3 rounded-[0.625rem] transition-all shadow-lg shadow-brand-500/25 hover:shadow-brand-400/35 shrink-0"
              >
                Subscribe Free
              </button>
            </form>
            <p className="mt-3 text-xs text-slate-400">
              No spam. Unsubscribe anytime. We respect your inbox.
            </p>
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
                The most comprehensive free property toolkit on the web. Built for
                homeowners, landlords, investors, and property managers who want to
                make smarter decisions backed by real data.
              </p>
              <div className="flex gap-3 mt-6">
                {/* Social placeholders */}
                {["X (Twitter)", "Facebook", "LinkedIn"].map((platform) => (
                  <span
                    key={platform}
                    className="w-9 h-9 rounded-lg bg-navy-900 hover:bg-navy-800 flex items-center justify-center text-slate-400 hover:text-brand-400 transition-colors cursor-pointer"
                    title={platform}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                    </svg>
                  </span>
                ))}
              </div>
            </div>

            {/* Calculators */}
            <div className="lg:col-span-3">
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-300 mb-5">
                Calculators
              </h4>
              <ul className="space-y-3">
                {calculatorLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-brand-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="lg:col-span-2">
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-300 mb-5">
                Resources
              </h4>
              <ul className="space-y-3">
                {resourceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-brand-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="lg:col-span-3">
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-300 mb-5">
                Company
              </h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-brand-400 transition-colors"
                    >
                      {link.name}
                    </Link>
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
              &copy; {new Date().getFullYear()} PropertyCalc. All rights reserved. Built with care for property owners everywhere.
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
