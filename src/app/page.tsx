import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PropertyCalc — Free Property Maintenance & Real Estate Calculators",
  description:
    "Free, accurate calculators for homeowners, landlords, and property managers. Estimate maintenance costs, rental ROI, contractor quotes, and more. Trusted by thousands.",
};

const calculators = [
  {
    title: "Home Maintenance Budget",
    description:
      "Estimate your annual maintenance costs based on home age, size, location, and condition. Know exactly what to set aside each year.",
    href: "/calculators/home-maintenance",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    color: "from-amber-500 to-orange-500",
    bgLight: "bg-amber-50",
  },
  {
    title: "Rental Property ROI",
    description:
      "Calculate cash-on-cash return, cap rate, and total ROI for any rental property. Compare investments side by side.",
    href: "/calculators/rental-roi",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    ),
    color: "from-emerald-500 to-teal-500",
    bgLight: "bg-emerald-50",
  },
  {
    title: "Contractor Quote Analyzer",
    description:
      "Paste your contractor quote and get an instant fairness assessment. See how it compares to regional averages for your project type.",
    href: "/calculators/contractor-quote",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15a2.25 2.25 0 0 1 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
      </svg>
    ),
    color: "from-blue-500 to-indigo-500",
    bgLight: "bg-blue-50",
  },
  {
    title: "Paint Cost Estimator",
    description:
      "Calculate exactly how much paint you need and what it will cost. Accounts for room dimensions, coats, trim, ceilings, and waste.",
    href: "/calculators/paint-estimator",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
      </svg>
    ),
    color: "from-purple-500 to-pink-500",
    bgLight: "bg-purple-50",
  },
  {
    title: "Roof Repair vs Replace",
    description:
      "Should you patch it or replace the whole roof? Enter your roof details and get a data-driven recommendation with cost comparison.",
    href: "/calculators/roof-calculator",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
      </svg>
    ),
    color: "from-red-500 to-rose-500",
    bgLight: "bg-red-50",
  },
];

const stats = [
  { value: "5", label: "Free Calculators" },
  { value: "100%", label: "Free Forever" },
  { value: "30sec", label: "Average Calculation" },
  { value: "0", label: "Signups Required" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-amber-400 text-sm font-medium">
                100% Free. No signup. No ads yet.
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
              Property decisions
              <br />
              backed by{" "}
              <span className="gradient-text">real numbers</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
              Stop guessing what maintenance will cost, whether a rental is
              worth it, or if your contractor is overcharging. Our free
              calculators give you the numbers you need in seconds.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="#calculators"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-400/30 transition-all"
              >
                Explore Calculators
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </Link>
              <Link
                href="/calculators/home-maintenance"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/10 transition-all"
              >
                Try Maintenance Budget
              </Link>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Grid */}
      <section id="calculators" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Choose Your Calculator
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            Each tool is built with real industry data and methodology used by
            property professionals. Get your answer in under a minute.
          </p>
        </div>

        <div className="calc-grid">
          {calculators.map((calc) => (
            <Link
              key={calc.href}
              href={calc.href}
              className="result-card group bg-white rounded-2xl p-7 border border-slate-200/80 hover:border-slate-300 shadow-sm"
            >
              <div
                className={`w-14 h-14 rounded-xl ${calc.bgLight} flex items-center justify-center mb-5`}
              >
                <div className={`bg-gradient-to-br ${calc.color} bg-clip-text`}>
                  {calc.icon}
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                {calc.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                {calc.description}
              </p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600">
                Calculate now
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              No signup, no credit card, no nonsense.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                step: "01",
                title: "Enter Your Details",
                description:
                  "Fill in the basics about your property — size, age, location, and condition. Takes about 30 seconds.",
              },
              {
                step: "02",
                title: "Get Your Numbers",
                description:
                  "Our calculator crunches industry data and regional averages to give you an accurate, personalized estimate.",
              },
              {
                step: "03",
                title: "Make Smart Decisions",
                description:
                  "Use your results to budget confidently, negotiate with contractors, or evaluate investments before committing.",
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="text-6xl font-extrabold text-slate-100 mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-10 sm:p-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to stop guessing?
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-xl mx-auto">
            Our calculators use the same methodology trusted by property
            managers, real estate investors, and home inspectors.
          </p>
          <Link
            href="/calculators/home-maintenance"
            className="mt-8 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-8 py-4 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-400/30 transition-all"
          >
            Try the Maintenance Calculator
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
