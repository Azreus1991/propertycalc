import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Portfolio Dashboard — Track Investments, Cash Flow & Performance",
  description:
    "Monitor your entire property portfolio in one dashboard. Track maintenance schedules, expenses, cash flow, occupancy, and property performance across all your investments.",
};

const dashboardFeatures = [
  { title: "Portfolio Overview", desc: "See all your properties at a glance — total value, equity, cash flow, and overall ROI in one unified dashboard.", icon: "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" },
  { title: "Cash Flow Tracking", desc: "Monitor rental income, expenses, vacancies, and net operating income for each property — monthly, quarterly, and annually.", icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { title: "Maintenance Scheduler", desc: "Never miss a maintenance deadline. Set up recurring tasks, track vendor work, and manage budgets by property.", icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" },
  { title: "Expense Reports", desc: "Categorize and track every expense. Export to PDF or Excel for your accountant. Tax-ready reporting built in.", icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" },
  { title: "Performance Analytics", desc: "Track appreciation, cap rate trends, cash-on-cash returns, and compare properties within your portfolio.", icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" },
  { title: "Tenant Management", desc: "Track lease terms, rent collection, tenant contacts, and lease renewal dates. Never miss a critical deadline.", icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" },
];

const sampleProperties = [
  { address: "1247 Oak Street", city: "Austin, TX", type: "Single Family", value: "$385,000", cashFlow: "+$820/mo", occupancy: "100%", status: "Occupied" },
  { address: "892 Pine Avenue, Unit 3B", city: "Denver, CO", type: "Condo", value: "$275,000", cashFlow: "+$540/mo", occupancy: "100%", status: "Occupied" },
  { address: "3401 Magnolia Drive", city: "Charlotte, NC", type: "Duplex", value: "$425,000", cashFlow: "+$1,350/mo", occupancy: "100%", status: "Occupied" },
  { address: "567 Harbor View Ct", city: "Miami, FL", type: "Single Family", value: "$520,000", cashFlow: "+$960/mo", occupancy: "0%", status: "Vacant" },
];

export default function PortfoliosPage() {
  return (
    <>
      <section className="bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 dotted-bg opacity-[0.04]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-3xl">
            <div className="badge badge-brand mb-4">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
              </svg>
              Portfolio Dashboard
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Your entire portfolio. <span className="text-gradient">One dashboard.</span>
            </h1>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl">
              Track cash flow, maintenance schedules, tenant leases, expenses, and performance
              metrics for every property you own. Available with a Pro membership.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/pricing" className="btn-primary">
                Start 14-Day Free Trial
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link href="#features" className="btn-secondary !bg-white/[0.06] !border-white/[0.1] !text-white hover:!bg-white/[0.1]">
                See Features
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="bg-section-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight">
              Dashboard Preview
            </h2>
            <p className="mt-2 text-slate-500">Here&apos;s what your portfolio overview looks like</p>
          </div>

          {/* Mock Dashboard */}
          <div className="card p-6 sm:p-8">
            {/* Top Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Portfolio Value", value: "$1,605,000", change: "+12.3%" },
                { label: "Monthly Cash Flow", value: "$3,670", change: "+8.1%" },
                { label: "Average Cap Rate", value: "7.2%", change: "+0.4%" },
                { label: "Portfolio Occupancy", value: "75%", change: "-25%" },
              ].map((stat) => (
                <div key={stat.label} className="bg-warm-50 rounded-xl p-4">
                  <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
                  <div className="text-xl font-extrabold text-navy-950 mt-1">{stat.value}</div>
                  <div className={`text-xs font-semibold mt-0.5 ${stat.change.startsWith("+") ? "text-sage-600" : "text-red-500"}`}>
                    {stat.change} YoY
                  </div>
                </div>
              ))}
            </div>

            {/* Property Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Property</th>
                    <th className="text-left py-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Type</th>
                    <th className="text-right py-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Value</th>
                    <th className="text-right py-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Cash Flow</th>
                    <th className="text-center py-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleProperties.map((p) => (
                    <tr key={p.address} className="border-b border-slate-100 hover:bg-warm-50/50 transition-colors">
                      <td className="py-3 px-2">
                        <div className="font-semibold text-navy-950">{p.address}</div>
                        <div className="text-xs text-slate-400">{p.city}</div>
                      </td>
                      <td className="py-3 px-2 text-slate-600">{p.type}</td>
                      <td className="py-3 px-2 text-right font-semibold text-navy-950">{p.value}</td>
                      <td className="py-3 px-2 text-right font-semibold text-sage-600">{p.cashFlow}</td>
                      <td className="py-3 px-2 text-center">
                        <span className={`badge ${p.status === "Occupied" ? "badge-sage" : "badge-brand"}`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-400">This is a preview. Sign up for Pro to build your actual portfolio.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
              Everything you need to manage your portfolio
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {dashboardFeatures.map((f) => (
              <div key={f.title} className="card p-6">
                <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-navy-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-navy-950">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-hero-gradient rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 dotted-bg opacity-[0.03]" />
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Start tracking your portfolio today
            </h2>
            <p className="mt-3 text-slate-300 max-w-lg mx-auto">
              The portfolio dashboard is included with every Pro membership. Try it free for 14 days.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link href="/pricing" className="btn-primary">Start Free Trial</Link>
              <Link href="/#pricing" className="btn-secondary !bg-white/[0.06] !border-white/[0.1] !text-white hover:!bg-white/[0.1]">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
