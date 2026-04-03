import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Guides & Resources — Free Downloads & Templates | PropertyCalc",
  description:
    "Download free property guides, checklists, templates, and spreadsheets. Covering buying, selling, renting, maintenance, investing, and legal essentials for property owners.",
};

const categories = [
  { name: "All Guides", slug: "all", count: 10 },
  { name: "Buying", slug: "buying", count: 2 },
  { name: "Selling", slug: "selling", count: 1 },
  { name: "Renting", slug: "renting", count: 2 },
  { name: "Maintaining", slug: "maintaining", count: 2 },
  { name: "Investing", slug: "investing", count: 2 },
  { name: "Legal", slug: "legal", count: 1 },
];

const guides = [
  {
    title: "Complete Home Inspection Checklist",
    description:
      "A 150-point checklist covering every system in a home — structural, electrical, plumbing, HVAC, roof, and exterior. Used by professional inspectors.",
    pages: 24,
    format: "PDF",
    category: "Buying",
    slug: "home-inspection-checklist",
  },
  {
    title: "Rental Property Analysis Spreadsheet",
    description:
      "Pre-built spreadsheet for analyzing rental deals. Auto-calculates cash flow, cap rate, cash-on-cash return, and DSCR. Includes 5-year projection tab.",
    pages: 8,
    format: "PDF",
    category: "Investing",
    slug: "rental-property-analysis",
  },
  {
    title: "Lease Agreement Template Pack",
    description:
      "Three professionally drafted lease templates — standard residential, month-to-month, and room rental. State-specific addendum guides included.",
    pages: 32,
    format: "PDF",
    category: "Renting",
    slug: "lease-agreement-templates",
  },
  {
    title: "First-Time Buyer's Roadmap",
    description:
      "A step-by-step visual timeline from saving your first dollar to getting the keys. Covers pre-approval, house hunting, offers, inspections, and closing.",
    pages: 18,
    format: "PDF",
    category: "Buying",
    slug: "first-time-buyer-roadmap",
  },
  {
    title: "Property Tax Appeal Guide",
    description:
      "How to challenge your property tax assessment and win. Includes sample appeal letters, evidence gathering strategies, and hearing preparation tips.",
    pages: 14,
    format: "PDF",
    category: "Legal",
    slug: "property-tax-appeal-guide",
  },
  {
    title: "Landlord's Legal Handbook",
    description:
      "Know your rights and obligations as a landlord. Covers fair housing, eviction procedures, security deposits, habitability standards, and liability protection.",
    pages: 42,
    format: "PDF",
    category: "Renting",
    slug: "landlord-legal-handbook",
  },
  {
    title: "Home Maintenance Calendar",
    description:
      "Month-by-month maintenance schedule so nothing falls through the cracks. Covers HVAC, plumbing, electrical, exterior, appliances, and seasonal prep.",
    pages: 16,
    format: "PDF",
    category: "Maintaining",
    slug: "home-maintenance-calendar",
  },
  {
    title: "Investment Property Due Diligence Kit",
    description:
      "Everything you need to vet a property before buying. Comparable sales worksheet, inspection tracker, financial model, and 50-point due diligence checklist.",
    pages: 28,
    format: "PDF",
    category: "Investing",
    slug: "due-diligence-kit",
  },
  {
    title: "Moving Checklist & Timeline",
    description:
      "An 8-week countdown to a stress-free move. Covers utilities, address changes, packing strategy, moving day logistics, and first-week essentials.",
    pages: 10,
    format: "PDF",
    category: "Buying",
    slug: "moving-checklist-timeline",
  },
  {
    title: "Renovation Budget Planner",
    description:
      "Plan any renovation without blowing your budget. Cost estimation templates for kitchens, bathrooms, basements, and whole-house projects with contractor comparison sheets.",
    pages: 20,
    format: "PDF",
    category: "Maintaining",
    slug: "renovation-budget-planner",
  },
];

const premiumTemplates = [
  { name: "Multi-Property Portfolio Tracker", type: "Spreadsheet" },
  { name: "Tenant Screening Scorecard", type: "Template" },
  { name: "Renovation ROI Calculator", type: "Spreadsheet" },
  { name: "Commercial Lease Comparison Matrix", type: "Spreadsheet" },
  { name: "Property Management SOP Bundle", type: "Template Pack" },
  { name: "Real Estate Partnership Agreement", type: "Legal Template" },
];

function categoryBadge(category: string) {
  switch (category) {
    case "Buying":
      return "badge badge-sage";
    case "Selling":
      return "badge badge-brand";
    case "Renting":
      return "badge badge-navy";
    case "Maintaining":
      return "badge badge-sage";
    case "Investing":
      return "badge badge-brand";
    case "Legal":
      return "badge badge-navy";
    default:
      return "badge badge-sage";
  }
}

export default function GuidesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 dotted-bg opacity-[0.04]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-3xl">
            <div className="badge badge-brand mb-4">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z" clipRule="evenodd" />
                <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
              </svg>
              Guides & Resources
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Property Guides & Resources
            </h1>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl">
              Free downloadable guides, checklists, templates, and spreadsheets for every
              stage of property ownership. Built by professionals, designed for clarity.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <div className="bg-navy-900 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, i) => (
              <span
                key={cat.slug}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  i === 0
                    ? "bg-white text-navy-950"
                    : "bg-navy-800 text-slate-300 hover:bg-navy-700"
                }`}
              >
                {cat.name}
                <span className="ml-1.5 text-xs opacity-60">{cat.count}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Guide Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {guides.map((guide) => (
            <div
              key={guide.slug}
              className="card group p-6 hover:border-brand-200 flex flex-col"
            >
              <div className="flex items-start gap-4">
                {/* PDF Icon */}
                <div className="shrink-0 w-14 h-14 rounded-xl bg-warm-100 flex items-center justify-center">
                  <svg className="w-7 h-7 text-brand-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className={categoryBadge(guide.category)}>{guide.category}</span>
                    <span className="text-xs text-slate-400">{guide.pages} pages</span>
                    <span className="text-xs text-slate-400">{guide.format}</span>
                  </div>
                  <h3 className="text-lg font-bold text-navy-950 group-hover:text-brand-600 transition-colors leading-snug">
                    {guide.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                    {guide.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-sage-700">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Free Download
                </div>
                <Link
                  href={`/guides/${guide.slug}`}
                  className="btn-primary text-sm flex items-center gap-2 px-4 py-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Download Free
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pro Templates Section */}
        <section className="bg-section-warm rounded-2xl overflow-hidden mb-16">
          <div className="p-8 sm:p-12">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="badge badge-brand mb-4">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 1.5a.75.75 0 01.75.75V4.5a.75.75 0 01-1.5 0V2.25A.75.75 0 0112 1.5zM5.636 4.136a.75.75 0 011.06 0l1.592 1.591a.75.75 0 01-1.061 1.06l-1.591-1.59a.75.75 0 010-1.061zm12.728 0a.75.75 0 010 1.06l-1.591 1.592a.75.75 0 11-1.06-1.061l1.59-1.591a.75.75 0 011.061 0z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M12 6.75a5.25 5.25 0 100 10.5 5.25 5.25 0 000-10.5z" clipRule="evenodd" />
                </svg>
                Pro Members Only
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
                Premium Templates & Spreadsheets
              </h2>
              <p className="mt-3 text-slate-500 leading-relaxed">
                Professional-grade tools used by experienced investors and property managers.
                Unlock everything with a Pro membership.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {premiumTemplates.map((tmpl) => (
                <div
                  key={tmpl.name}
                  className="card p-4 flex items-center gap-3 opacity-90"
                >
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy-950">{tmpl.name}</p>
                    <p className="text-xs text-slate-400">{tmpl.type}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/learn" className="btn-primary inline-flex items-center gap-2">
                Unlock with Pro — $19/month
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <div className="card p-8 sm:p-12 text-center bg-warm-50 border-warm-200">
          <h3 className="text-2xl font-extrabold text-navy-950">
            Get new guides delivered to your inbox
          </h3>
          <p className="mt-2 text-slate-500 max-w-lg mx-auto">
            We publish 2-3 new free guides every month. Subscribe and never miss a resource
            that could save you time and money on your next property decision.
          </p>
          <form className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <button type="submit" className="btn-primary shrink-0">Subscribe Free</button>
          </form>
          <p className="mt-3 text-xs text-slate-400">
            Join 15,000+ property owners. No spam, unsubscribe anytime.
          </p>
        </div>
      </div>
    </>
  );
}
