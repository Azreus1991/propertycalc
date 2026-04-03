import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Contractor & Vendor Directory — Find Trusted Pros | PropertyCalc",
  description:
    "Browse 1,200+ verified contractors, plumbers, electricians, roofers, HVAC techs, and property pros across all 50 states. Read real reviews, compare quotes, and hire with confidence on PropertyCalc.",
};

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const categories = [
  "All",
  "General Contractors",
  "Plumbers",
  "Electricians",
  "Roofers",
  "HVAC",
  "Painters",
  "Landscapers",
  "Handyman",
  "Real Estate Agents",
  "Property Managers",
];

const vendors = [
  {
    name: "Summit Ridge Construction",
    category: "General Contractors",
    rating: 4.9,
    reviews: 312,
    location: "Austin, TX",
    years: 18,
    verified: true,
    featured: true,
    description:
      "Full-service residential and commercial general contractor specializing in renovations, additions, and custom builds. Licensed, bonded, and insured.",
  },
  {
    name: "BlueFlow Plumbing Co.",
    category: "Plumbers",
    rating: 4.8,
    reviews: 248,
    location: "Denver, CO",
    years: 12,
    verified: true,
    featured: true,
    description:
      "Emergency and scheduled plumbing for residential and multi-family properties. Water heater installs, sewer line repair, and repiping specialists.",
  },
  {
    name: "Coastal Electric Services",
    category: "Electricians",
    rating: 4.7,
    reviews: 189,
    location: "Miami, FL",
    years: 22,
    verified: true,
    featured: false,
    description:
      "Licensed master electricians handling panel upgrades, EV charger installs, whole-home rewiring, and commercial build-outs across South Florida.",
  },
  {
    name: "Evergreen Roofing & Exteriors",
    category: "Roofers",
    rating: 5.0,
    reviews: 156,
    location: "Portland, OR",
    years: 15,
    verified: true,
    featured: true,
    description:
      "Roof replacement, storm damage repair, and gutter systems. GAF Master Elite certified. Free inspections and lifetime workmanship warranty.",
  },
  {
    name: "Queen City HVAC",
    category: "HVAC",
    rating: 4.8,
    reviews: 203,
    location: "Charlotte, NC",
    years: 10,
    verified: true,
    featured: false,
    description:
      "Heating and cooling installs, duct cleaning, and maintenance plans for single-family and rental properties. Same-day emergency service available.",
  },
  {
    name: "Precision Painting Pros",
    category: "Painters",
    rating: 4.6,
    reviews: 134,
    location: "Nashville, TN",
    years: 8,
    verified: false,
    featured: false,
    description:
      "Interior and exterior painting for residential and commercial. Cabinet refinishing, deck staining, and color consultations included with every project.",
  },
  {
    name: "Pacific Property Management",
    category: "Property Managers",
    rating: 4.9,
    reviews: 275,
    location: "San Diego, CA",
    years: 14,
    verified: true,
    featured: true,
    description:
      "Full-service property management for single-family, multi-family, and HOAs. Tenant placement, rent collection, maintenance coordination, and financial reporting.",
  },
  {
    name: "Heartland Handyman Services",
    category: "Handyman",
    rating: 4.5,
    reviews: 97,
    location: "Kansas City, MO",
    years: 6,
    verified: true,
    featured: false,
    description:
      "No job too small. Drywall repair, fixture installs, furniture assembly, pressure washing, and general property maintenance for homeowners and landlords.",
  },
];

const trustSignals = [
  {
    title: "Identity Verified",
    description:
      "Every vendor completes a multi-step identity and business verification process before appearing in our directory.",
    icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
  },
  {
    title: "Background Checked",
    description:
      "We run national criminal and civil background checks on business owners and key personnel for your peace of mind.",
    icon: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
  },
  {
    title: "Insurance Verified",
    description:
      "We confirm active general liability and workers' compensation insurance coverage before listing any contractor.",
    icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
  },
  {
    title: "Authentic Reviews",
    description:
      "Every review is tied to a verified project. We use fraud detection to keep ratings honest and trustworthy.",
    icon: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z",
  },
];

const stats = [
  { value: "1,200+", label: "Verified Vendors" },
  { value: "50", label: "States Covered" },
  { value: "15,000+", label: "Verified Reviews" },
  { value: "98%", label: "Satisfaction Rate" },
];

const listingTiers = [
  {
    name: "Basic",
    price: "Free",
    features: [
      "Business profile page",
      "Up to 5 photos",
      "Collect reviews",
      "Category listing",
    ],
  },
  {
    name: "Pro",
    price: "$49/mo",
    features: [
      "Everything in Basic",
      "Priority search ranking",
      "Unlimited photos",
      "Lead notifications",
      "Response time badge",
    ],
  },
  {
    name: "Featured",
    price: "$199/mo",
    features: [
      "Everything in Pro",
      "Homepage featured placement",
      "Category spotlight",
      "Verified badge",
      "Analytics dashboard",
      "Dedicated account rep",
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════ */

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  return (
    <span className="inline-flex items-center gap-0.5 text-amber-400">
      {Array.from({ length: full }).map((_, i) => (
        <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {hasHalf && (
        <svg className="h-4 w-4" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="halfStar">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#d1d5db" />
            </linearGradient>
          </defs>
          <path
            fill="url(#halfStar)"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      )}
      <span className="ml-1 text-sm font-semibold text-slate-700">
        {rating.toFixed(1)}
      </span>
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function VendorsPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-hero-gradient relative overflow-hidden">
        <div className="dotted-bg absolute inset-0 opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <span className="badge badge-brand mb-4 inline-block">
            1,200+ Verified Professionals
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Find Trusted Contractors
            <br />
            <span className="text-gradient">&amp; Service Pros</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Browse verified vendors across every trade. Read real reviews,
            compare qualifications, and get quotes from pros who stand behind
            their work.
          </p>

          {/* Search bar (styled, non-functional) */}
          <div className="max-w-3xl mx-auto">
            <div className="card-elevated flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl">
                <svg
                  className="h-5 w-5 text-slate-400 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
                <span className="text-slate-400 text-left">
                  Search by trade, business name, or city...
                </span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl sm:w-48">
                <svg
                  className="h-5 w-5 text-slate-400 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <span className="text-slate-400">Location</span>
              </div>
              <button className="btn-primary whitespace-nowrap px-8 py-3">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Category Filter Bar ──────────────────────────────── */}
      <section className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-4 overflow-x-auto no-scrollbar">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  i === 0
                    ? "bg-navy-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Bar ────────────────────────────────────────── */}
      <section className="bg-section-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl sm:text-4xl font-extrabold text-navy-700">
                  {s.value}
                </p>
                <p className="text-sm text-slate-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Vendor Cards ────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Top-Rated Vendors
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              Professionals with outstanding track records, verified credentials,
              and consistently high ratings from real property owners.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {vendors.map((v) => (
              <div
                key={v.name}
                className={`card group flex flex-col ${
                  v.featured ? "ring-2 ring-brand-400/40" : ""
                }`}
              >
                {/* Top badges */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="badge badge-navy text-xs">{v.category}</span>
                  {v.featured && (
                    <span className="badge badge-brand text-xs">Featured</span>
                  )}
                  {v.verified && (
                    <span className="badge badge-sage text-xs inline-flex items-center gap-1">
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                        />
                      </svg>
                      Verified
                    </span>
                  )}
                </div>

                {/* Name & rating */}
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                  {v.name}
                </h3>
                <div className="flex items-center gap-3 mt-1.5">
                  <StarRating rating={v.rating} />
                  <span className="text-xs text-slate-400">
                    ({v.reviews} reviews)
                  </span>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                    {v.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {v.years} yrs
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-500 mt-3 line-clamp-3 flex-1">
                  {v.description}
                </p>

                {/* Buttons */}
                <div className="flex gap-2 mt-5">
                  <Link href="/vendors" className="btn-primary text-sm flex-1 text-center">
                    Get a Quote
                  </Link>
                  <Link
                    href="/vendors"
                    className="btn-secondary text-sm flex-1 text-center"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/vendors" className="btn-secondary inline-flex items-center gap-2">
              View All 1,200+ Vendors
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust Signals ────────────────────────────────────── */}
      <section className="bg-section-cool">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-12">
            <span className="badge badge-sage mb-3 inline-block">
              Your Protection
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Every Vendor Is Vetted
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              We go beyond a simple listing. Our four-step verification process
              ensures you&apos;re only connecting with legitimate, qualified
              professionals.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {trustSignals.map((t) => (
              <div key={t.title} className="card-elevated text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sage-50">
                  <svg
                    className="h-7 w-7 text-sage-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={t.icon}
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{t.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {t.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why List Your Business ───────────────────────────── */}
      <section className="bg-white relative overflow-hidden">
        <div className="dotted-bg absolute inset-0 opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — copy */}
            <div>
              <span className="badge badge-brand mb-4 inline-block">
                For Vendors
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6">
                Why List Your Business?
              </h2>
              <p className="text-slate-500 mb-8 text-lg leading-relaxed">
                PropertyCalc connects you directly with property owners,
                investors, and landlords actively searching for your services.
                Stop chasing leads — let them come to you.
              </p>

              <ul className="space-y-4">
                {[
                  {
                    text: "Reach 50,000+ property owners and investors monthly",
                    icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
                  },
                  {
                    text: "Get qualified leads sent directly to your inbox",
                    icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75",
                  },
                  {
                    text: "Showcase your reviews and build social proof",
                    icon: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z",
                  },
                  {
                    text: "Featured placement options from $49 to $199/mo",
                    icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z",
                  },
                  {
                    text: "Free basic listing available — no credit card required",
                    icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                  },
                ].map((item) => (
                  <li
                    key={item.text}
                    className="flex items-start gap-3"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50">
                      <svg
                        className="h-4 w-4 text-brand-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d={item.icon}
                        />
                      </svg>
                    </div>
                    <span className="text-slate-700 font-medium">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Link href="/vendors" className="btn-primary text-center">
                  Register Your Business
                </Link>
                <Link href="/vendors" className="btn-secondary text-center">
                  View Pricing Details
                </Link>
              </div>
            </div>

            {/* Right — pricing tiers */}
            <div className="space-y-5">
              {listingTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`card ${
                    tier.name === "Featured"
                      ? "ring-2 ring-brand-400/50 bg-brand-50/30"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-slate-900">
                      {tier.name} Listing
                    </h3>
                    <span className="text-xl font-extrabold text-navy-700">
                      {tier.price}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-sm text-slate-600"
                      >
                        <svg
                          className="h-4 w-4 text-sage-500 shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section className="bg-hero-gradient relative overflow-hidden">
        <div className="dotted-bg absolute inset-0 opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to Find the Right Pro?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Whether you need a quick repair or a full renovation, our verified
            vendors are ready to deliver quality work at fair prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/vendors"
              className="btn-primary bg-white text-navy-700 hover:bg-slate-100 text-center"
            >
              Browse All Vendors
            </Link>
            <Link
              href="/calculators/contractor-quote"
              className="btn-secondary border-white/30 text-white hover:bg-white/10 text-center"
            >
              Check a Quote First
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
