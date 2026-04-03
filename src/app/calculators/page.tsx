import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Property Calculators — Free Tools for Homeowners, Investors & Landlords",
  description:
    "12+ free property calculators: mortgage, maintenance budget, rental ROI, contractor quotes, paint estimator, roof analysis, HVAC, property tax, and more.",
};

const calculators = [
  { title: "Home Maintenance Budget", desc: "Estimate annual maintenance costs based on home age, size, location, and condition. Plan ahead and never be caught off guard.", href: "/calculators/home-maintenance", icon: "M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25", accent: "bg-brand-50 text-brand-600", category: "Maintenance" },
  { title: "Rental Property ROI", desc: "Cash-on-cash return, cap rate, break-even occupancy, and 5/10-year projections for any rental property.", href: "/calculators/rental-roi", icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z", accent: "bg-sage-50 text-sage-600", category: "Investing" },
  { title: "Contractor Quote Analyzer", desc: "Compare contractor quotes against regional averages for 15+ project types. Know if you're getting a fair deal.", href: "/calculators/contractor-quote", icon: "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z", accent: "bg-navy-50 text-navy-600", category: "Maintenance" },
  { title: "Paint Cost Estimator", desc: "Multi-room paint calculator with DIY vs professional costs, paint quality tiers, and full supply lists.", href: "/calculators/paint-estimator", icon: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42", accent: "bg-warm-100 text-warm-700", category: "Maintenance" },
  { title: "Roof Repair vs Replace", desc: "Data-driven recommendation with lifecycle cost comparison, material analysis, and 15-year ROI timeline.", href: "/calculators/roof-calculator", icon: "M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63", accent: "bg-red-500/10 text-red-600", category: "Maintenance" },
  { title: "Mortgage Calculator", desc: "Monthly payments, amortization schedule, total interest, PMI, and early payoff scenarios.", href: "/calculators/mortgage", icon: "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21", accent: "bg-blue-500/10 text-blue-600", category: "Buying" },
  { title: "Rent vs Buy", desc: "Side-by-side comparison of renting versus buying. Break-even timeline, wealth building, and tax impact.", href: "/calculators/rent-vs-buy", icon: "M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5", accent: "bg-sage-50 text-sage-600", category: "Buying" },
  { title: "Renovation ROI", desc: "Expected ROI for 30+ home improvement projects by region. Know which upgrades actually pay off.", href: "/calculators/renovation-roi", icon: "M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63", accent: "bg-brand-50 text-brand-600", category: "Renovations" },
  { title: "Property Tax Estimator", desc: "Estimate annual property taxes by state, county, and assessment value. Includes exemption calculators.", href: "/calculators/property-tax", icon: "M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z", accent: "bg-navy-50 text-navy-600", category: "Taxes" },
  { title: "HVAC Cost Estimator", desc: "New system pricing, repair vs replace analysis, energy savings, and seasonal maintenance budgets.", href: "/calculators/hvac", icon: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z", accent: "bg-warm-100 text-warm-700", category: "Maintenance" },
  { title: "Home Insurance Estimator", desc: "Estimate premiums based on location, coverage, home value, and risk factors. Compare policy types.", href: "/calculators/insurance", icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z", accent: "bg-sage-50 text-sage-600", category: "Insurance" },
  { title: "Moving Cost Calculator", desc: "Local and long-distance estimates. DIY vs professional, supplies, and timeline planner.", href: "/calculators/moving-cost", icon: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.143-.504 1.143-1.125v-5.437c0-.396-.158-.776-.438-1.057L14.7 6.375c-.28-.281-.66-.438-1.057-.438H9.375c-.621 0-1.125.504-1.125 1.125v14.063M8.25 18.75h6", accent: "bg-blue-500/10 text-blue-600", category: "Moving" },
];

const categories = ["All", "Buying", "Investing", "Maintenance", "Renovations", "Taxes", "Insurance", "Moving"];

export default function CalculatorsPage() {
  return (
    <>
      <section className="bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 dotted-bg opacity-[0.04]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-3xl">
            <div className="badge badge-brand mb-4">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008H15.75v-.008z" />
              </svg>
              {calculators.length} Free Calculators
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              All Property Calculators
            </h1>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl">
              Every tool you need to make smarter property decisions. Built with real industry
              data and the same methodology used by property professionals nationwide.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                i === 0 ? "bg-navy-950 text-white" : "bg-warm-100 text-slate-600 hover:bg-warm-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {calculators.map((calc) => (
            <Link key={calc.href} href={calc.href} className="card group p-6 hover:border-brand-200">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${calc.accent} flex items-center justify-center`}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d={calc.icon} />
                  </svg>
                </div>
                <span className="badge badge-sage text-[0.65rem]">{calc.category}</span>
              </div>
              <h3 className="text-lg font-bold text-navy-950 group-hover:text-brand-600 transition-colors">
                {calc.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">{calc.desc}</p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                Open Calculator
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 card p-8 sm:p-12 text-center bg-warm-50 border-warm-200">
          <h3 className="text-2xl font-extrabold text-navy-950">Need a calculator we don&apos;t have?</h3>
          <p className="mt-2 text-slate-500 max-w-lg mx-auto">
            We&apos;re constantly adding new tools based on community requests. Tell us what you need.
          </p>
          <div className="mt-6">
            <Link href="/forum" className="btn-primary">
              Request a Calculator
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
