import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Document Templates — Free Lease, Inspection & Financial Forms",
  description:
    "Download free and premium property document templates. Lease agreements, inspection forms, financial spreadsheets, maintenance logs, and legal documents for landlords and property managers.",
  openGraph: {
    title: "Property Document Templates — Free Downloads | PropertyCalc",
    description:
      "Professional property management templates: lease agreements, inspection forms, financial trackers, and legal documents. Free and Pro options available.",
  },
};

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const categories = [
  { name: "All", slug: "all" },
  { name: "Lease Agreements", slug: "lease" },
  { name: "Inspection Forms", slug: "inspection" },
  { name: "Financial Spreadsheets", slug: "financial" },
  { name: "Legal Documents", slug: "legal" },
  { name: "Maintenance Logs", slug: "maintenance" },
  { name: "Checklists", slug: "checklist" },
];

const templates = [
  {
    title: "Residential Lease Agreement",
    description:
      "Comprehensive 12-month lease template covering rent terms, security deposit, maintenance responsibilities, pet policies, and early termination clauses. State-adaptable with built-in addendum sections.",
    format: "DOCX",
    category: "Lease Agreements",
    tier: "free" as const,
    downloads: "12,400+",
  },
  {
    title: "Month-to-Month Rental Agreement",
    description:
      "Flexible rolling lease with 30-day notice provisions, automatic renewal language, and rent adjustment clauses. Ideal for transitional tenants or seasonal rentals.",
    format: "DOCX",
    category: "Lease Agreements",
    tier: "free" as const,
    downloads: "8,200+",
  },
  {
    title: "Move-In/Move-Out Inspection Form",
    description:
      "Room-by-room condition checklist with photo attachment sections, damage grading scale, and tenant signature blocks. Protects your security deposit decisions in court.",
    format: "PDF",
    category: "Inspection Forms",
    tier: "free" as const,
    downloads: "15,300+",
  },
  {
    title: "Rental Application",
    description:
      "Professional tenant screening form with employment verification, income documentation, rental history, references, and authorization for credit/background checks. Fair Housing compliant.",
    format: "PDF",
    category: "Checklists",
    tier: "free" as const,
    downloads: "9,700+",
  },
  {
    title: "Property Condition Report",
    description:
      "Detailed property assessment template covering structural, mechanical, electrical, plumbing, and cosmetic conditions. Includes maintenance priority matrix and estimated repair costs.",
    format: "PDF",
    category: "Inspection Forms",
    tier: "pro" as const,
    downloads: "4,100+",
  },
  {
    title: "Maintenance Request Form",
    description:
      "Tenant-facing maintenance request with urgency classification, photo upload fields, preferred access times, and landlord response tracking. Streamlines your repair workflow.",
    format: "PDF",
    category: "Maintenance Logs",
    tier: "free" as const,
    downloads: "11,800+",
  },
  {
    title: "Rent Collection Tracker",
    description:
      "Multi-unit rent tracking spreadsheet with payment status, late fee calculations, running totals, vacancy tracking, and monthly/annual summaries. Handles up to 50 units.",
    format: "XLSX",
    category: "Financial Spreadsheets",
    tier: "pro" as const,
    downloads: "6,500+",
  },
  {
    title: "Cash Flow Analysis Spreadsheet",
    description:
      "Investment property cash flow model with rental income projections, operating expenses, debt service, cap rate, cash-on-cash return, and 10-year performance forecast.",
    format: "XLSX",
    category: "Financial Spreadsheets",
    tier: "pro" as const,
    downloads: "7,900+",
  },
  {
    title: "Eviction Notice Template",
    description:
      "State-customizable eviction notice covering non-payment, lease violation, and no-cause terminations. Includes proper service documentation and timeline guidance.",
    format: "DOCX",
    category: "Legal Documents",
    tier: "free" as const,
    downloads: "5,600+",
  },
  {
    title: "Security Deposit Return Letter",
    description:
      "Itemized security deposit accounting letter with deduction categories, receipt references, remaining balance calculation, and compliant delivery instructions by state.",
    format: "DOCX",
    category: "Legal Documents",
    tier: "free" as const,
    downloads: "7,300+",
  },
  {
    title: "Annual Property Tax Worksheet",
    description:
      "Track assessed values, exemptions, protest deadlines, and payment schedules across multiple properties. Includes appeal documentation checklist and comparable property analysis.",
    format: "XLSX",
    category: "Financial Spreadsheets",
    tier: "pro" as const,
    downloads: "3,200+",
  },
  {
    title: "Contractor Agreement Template",
    description:
      "Legally protective contractor agreement with scope of work, payment schedule, change order process, insurance requirements, lien waiver, and warranty terms.",
    format: "DOCX",
    category: "Legal Documents",
    tier: "free" as const,
    downloads: "10,100+",
  },
];

const formatColors: Record<string, string> = {
  PDF: "badge-brand",
  DOCX: "badge-navy",
  XLSX: "badge-sage",
};

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function TemplatesPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="bg-hero-gradient py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-navy-300 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/80">Templates</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            Property Document <span className="text-gradient">Templates</span>
          </h1>
          <p className="text-lg sm:text-xl text-navy-200 max-w-3xl mx-auto leading-relaxed">
            Professional, legally-reviewed templates for every stage of property ownership
            and management. Download instantly in PDF, DOCX, or XLSX.
          </p>
        </div>
      </section>

      {/* ── Category Filters ─────────────────────────── */}
      <section className="bg-white border-b border-navy-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <span
                key={cat.slug}
                className={`badge whitespace-nowrap cursor-pointer ${
                  cat.slug === "all" ? "badge-brand" : "badge-navy"
                }`}
              >
                {cat.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Templates Grid ───────────────────────────── */}
      <section className="bg-section-warm py-16 sm:py-20 dotted-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((tpl) => (
              <div key={tpl.title} className="card-elevated p-6 flex flex-col">
                {/* Header badges */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`badge ${formatColors[tpl.format]}`}>{tpl.format}</span>
                  <span
                    className={`badge ${
                      tpl.tier === "free" ? "badge-sage" : "badge-brand"
                    }`}
                  >
                    {tpl.tier === "free" ? "Free" : "Pro"}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-navy-900 mb-2">{tpl.title}</h3>
                <p className="text-sm text-navy-500 leading-relaxed mb-4 flex-1">
                  {tpl.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-navy-100">
                  <div>
                    <p className="text-xs text-navy-400 uppercase tracking-wide font-medium">
                      {tpl.category}
                    </p>
                    <p className="text-xs text-navy-300">{tpl.downloads} downloads</p>
                  </div>
                  {tpl.tier === "free" ? (
                    <button className="btn-primary text-sm px-4 py-2">Download</button>
                  ) : (
                    <button className="btn-secondary text-sm px-4 py-2">Get Pro</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Premium Upsell ───────────────────────────── */}
      <section className="bg-hero-gradient py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block badge badge-brand mb-6 text-sm">PropertyCalc Pro</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Unlock the full template library
          </h2>
          <p className="text-lg text-navy-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            Pro members get instant access to every template, priority updates when laws change,
            state-specific customization, and bulk download for multi-property portfolios.
          </p>

          <div className="card-elevated p-8 sm:p-10 max-w-lg mx-auto mb-8">
            <div className="flex items-baseline justify-center gap-1 mb-2">
              <span className="text-4xl font-extrabold text-navy-900">$9</span>
              <span className="text-navy-400 font-medium">/month</span>
            </div>
            <p className="text-sm text-navy-500 mb-6">
              Billed annually at $108/year. Cancel anytime.
            </p>
            <ul className="space-y-3 text-left mb-8">
              {[
                "All 30+ premium templates",
                "State-specific legal customization",
                "Quarterly updates for law changes",
                "Bulk download (ZIP) for portfolios",
                "Priority email support",
                "Early access to new templates",
              ].map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-navy-600">
                  <svg className="w-5 h-5 text-sage-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button className="btn-primary w-full text-center">Start Free 7-Day Trial</button>
          </div>

          <p className="text-sm text-navy-300">
            Already have 8 free templates? Pro adds 22 more plus state-specific versions.
          </p>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────── */}
      <section className="bg-section-cool py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 mb-4">
            Need a template we do not have?
          </h2>
          <p className="text-navy-500 mb-6 max-w-xl mx-auto">
            We build new templates based on community requests. Tell us what you need and
            we will prioritize the most requested documents.
          </p>
          <Link href="/forum" className="btn-primary">
            Request a Template
          </Link>
        </div>
      </section>
    </>
  );
}
