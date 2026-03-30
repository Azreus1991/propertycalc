import Link from "next/link";

const tools = [
  { name: "Maintenance Budget Estimator", href: "/calculators/home-maintenance" },
  { name: "Rental Property ROI", href: "/calculators/rental-roi" },
  { name: "Contractor Quote Analyzer", href: "/calculators/contractor-quote" },
  { name: "Paint Cost Estimator", href: "/calculators/paint-estimator" },
  { name: "Roof Repair vs Replace", href: "/calculators/roof-calculator" },
];

const resources = [
  { name: "About PropertyCalc", href: "/about" },
];

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                <svg
                  className="w-4.5 h-4.5 text-white"
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
              <span className="text-lg font-bold text-white">
                Property<span className="text-amber-500">Calc</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Free, accurate calculators built for homeowners, landlords, and
              property managers. Make smarter decisions about your property
              investments.
            </p>
          </div>

          {/* Calculators */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Calculators
            </h3>
            <ul className="space-y-2.5">
              {tools.map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="text-sm hover:text-amber-400 transition-colors"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5">
              {resources.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-amber-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs">
            &copy; {new Date().getFullYear()} PropertyCalc. All rights reserved.
          </p>
          <p className="text-xs">
            Calculations are estimates. Always consult a professional for major
            decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
