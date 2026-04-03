import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property & Real Estate Jobs — Find Your Next Career in the Property Industry",
  description:
    "Browse 500+ property industry jobs: property management, maintenance, real estate, construction, leasing, inspection, and more. New listings daily from top employers across all 50 states.",
};

const categories = [
  { name: "All", slug: "all" },
  { name: "Property Management", slug: "property-management" },
  { name: "Maintenance & Repair", slug: "maintenance-repair" },
  { name: "Real Estate Agent", slug: "real-estate-agent" },
  { name: "Construction", slug: "construction" },
  { name: "Leasing", slug: "leasing" },
  { name: "Inspection", slug: "inspection" },
  { name: "Appraisal", slug: "appraisal" },
  { name: "Commercial RE", slug: "commercial-re" },
  { name: "Investment", slug: "investment" },
];

const jobs = [
  {
    title: "Property Manager",
    company: "Greystar Real Estate Partners",
    location: "Austin, TX",
    salary: "$62,000 - $78,000/yr",
    type: "Full-time",
    posted: "2 days ago",
    description:
      "Oversee day-to-day operations of a 240-unit multifamily community. Manage leasing, maintenance coordination, vendor relationships, and resident satisfaction.",
    featured: true,
    category: "Property Management",
  },
  {
    title: "HVAC Technician",
    company: "Comfort Systems USA",
    location: "Denver, CO",
    salary: "$28 - $42/hr",
    type: "Full-time",
    posted: "1 day ago",
    description:
      "Diagnose, repair, and maintain residential and light commercial HVAC systems. EPA Universal certification required. Company vehicle and tools provided.",
    featured: true,
    category: "Maintenance & Repair",
  },
  {
    title: "Real Estate Agent",
    company: "Keller Williams Realty",
    location: "Charlotte, NC",
    salary: "$55,000 - $120,000/yr",
    type: "Full-time",
    posted: "3 days ago",
    description:
      "Join a top-producing team in one of the fastest-growing markets in the Southeast. Leads provided. Ideal for licensed agents with 1+ years of experience.",
    featured: false,
    category: "Real Estate Agent",
  },
  {
    title: "Maintenance Technician",
    company: "Lincoln Property Company",
    location: "Phoenix, AZ",
    salary: "$22 - $30/hr",
    type: "Full-time",
    posted: "4 days ago",
    description:
      "Handle work orders for a 300-unit apartment complex including plumbing, electrical, appliance repair, and unit turns. On-call rotation required.",
    featured: false,
    category: "Maintenance & Repair",
  },
  {
    title: "Construction Project Manager",
    company: "Toll Brothers",
    location: "Raleigh, NC",
    salary: "$85,000 - $110,000/yr",
    type: "Full-time",
    posted: "5 days ago",
    description:
      "Lead ground-up residential construction projects from permitting through closeout. Manage subcontractors, budgets, and schedules for luxury home builds.",
    featured: true,
    category: "Construction",
  },
  {
    title: "Leasing Consultant",
    company: "AvalonBay Communities",
    location: "Seattle, WA",
    salary: "$40,000 - $52,000/yr",
    type: "Full-time",
    posted: "2 days ago",
    description:
      "Drive occupancy by conducting tours, processing applications, and managing move-ins. Weekend availability required. Commission bonus on signed leases.",
    featured: false,
    category: "Leasing",
  },
  {
    title: "Home Inspector",
    company: "Pillar To Post",
    location: "Nashville, TN",
    salary: "$55,000 - $85,000/yr",
    type: "Contract",
    posted: "1 week ago",
    description:
      "Perform comprehensive residential inspections and deliver detailed reports. ASHI-certified or equivalent preferred. Flexible schedule with high earning potential.",
    featured: false,
    category: "Inspection",
  },
  {
    title: "Roofing Estimator",
    company: "ABC Supply Co.",
    location: "Tampa, FL",
    salary: "$60,000 - $90,000/yr",
    type: "Full-time",
    posted: "3 days ago",
    description:
      "Measure and estimate residential and commercial roofing projects using EagleView and Xactimate. Build client relationships and close sales in a growing territory.",
    featured: true,
    category: "Construction",
  },
  {
    title: "Commercial Real Estate Analyst",
    company: "CBRE Group",
    location: "Chicago, IL",
    salary: "$70,000 - $95,000/yr",
    type: "Full-time",
    posted: "6 days ago",
    description:
      "Build financial models, conduct market research, and support acquisitions for a $2B commercial portfolio. Advanced Excel and Argus experience required.",
    featured: false,
    category: "Commercial RE",
  },
  {
    title: "Remote Property Accountant",
    company: "Appfolio",
    location: "Remote",
    salary: "$58,000 - $75,000/yr",
    type: "Remote",
    posted: "4 days ago",
    description:
      "Manage financial reporting, CAM reconciliations, and owner distributions for a portfolio of 50+ commercial and residential properties. CPA preferred.",
    featured: false,
    category: "Investment",
  },
];

function typeBadgeClass(type: string) {
  switch (type) {
    case "Full-time":
      return "badge badge-navy";
    case "Part-time":
      return "badge badge-sage";
    case "Contract":
      return "badge badge-brand";
    case "Remote":
      return "badge badge-sage";
    default:
      return "badge badge-navy";
  }
}

export default function JobsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 dotted-bg opacity-[0.04]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-3xl">
            <div className="badge badge-brand mb-4">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" />
              </svg>
              Job Board
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Property &amp; Real Estate Jobs
            </h1>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl">
              Connecting talented professionals with the best opportunities in property
              management, maintenance, real estate, construction, and beyond. Your next
              career move starts here.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <div className="bg-navy-900 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-3 gap-6 text-center sm:text-left sm:flex sm:items-center sm:gap-12">
            <div>
              <p className="text-2xl sm:text-3xl font-black text-white">500+</p>
              <p className="text-xs sm:text-sm text-slate-400">Active Jobs</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-white">200+</p>
              <p className="text-xs sm:text-sm text-slate-400">Companies Hiring</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-white">50</p>
              <p className="text-xs sm:text-sm text-slate-400">States Covered</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat, i) => (
            <button
              key={cat.slug}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                i === 0
                  ? "bg-navy-950 text-white"
                  : "bg-warm-100 text-slate-600 hover:bg-warm-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {jobs.map((job, i) => (
            <div
              key={i}
              className={`card group p-6 hover:border-brand-200 transition-all ${
                job.featured ? "border-brand-200 bg-brand-50/30 ring-1 ring-brand-100" : ""
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {job.featured && (
                      <span className="badge badge-brand">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Featured
                      </span>
                    )}
                    <span className={typeBadgeClass(job.type)}>{job.type}</span>
                    <span className="text-xs text-slate-400">{job.posted}</span>
                  </div>
                  <h3 className="text-lg font-bold text-navy-950 group-hover:text-brand-600 transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                      </svg>
                      {job.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-navy-950">
                      <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {job.salary}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-500 leading-relaxed line-clamp-2">
                    {job.description}
                  </p>
                </div>
                <div className="sm:ml-6 shrink-0">
                  <button className="btn-primary w-full sm:w-auto">Apply Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="btn-secondary">
            View All 500+ Jobs
            <svg className="w-4 h-4 ml-1.5 inline" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* For Employers */}
      <section className="bg-section-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="badge badge-brand mb-4">For Employers</div>
              <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
                Find your next great hire
              </h2>
              <p className="mt-4 text-lg text-slate-500 leading-relaxed">
                Reach 50,000+ property professionals actively looking for their next
                opportunity. From maintenance techs to portfolio managers, PropertyCalc
                connects you with qualified candidates across the industry.
              </p>
              <div className="mt-8 space-y-4">
                <div className="card p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-warm-100 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-950">Standard Listing &mdash; $29</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      30-day listing with full job description, company branding, and direct
                      applicant notifications. Visible across all search results.
                    </p>
                  </div>
                </div>
                <div className="card-elevated p-5 flex items-start gap-4 border-brand-200 ring-1 ring-brand-100">
                  <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-brand-600" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-navy-950">Featured Listing &mdash; $99</h3>
                      <span className="badge badge-brand text-[0.6rem]">Most Popular</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">
                      Priority placement at the top of search results, highlighted styling,
                      featured badge, and 3x more visibility than standard listings.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Link href="/jobs/post" className="btn-primary">
                  Post a Job
                  <svg className="w-4 h-4 ml-1.5 inline" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="card p-8 sm:p-10 text-center bg-white">
              <div className="text-5xl font-black text-gradient mb-2">50,000+</div>
              <p className="text-slate-500 font-medium">property professionals visit PropertyCalc monthly</p>
              <div className="mt-8 grid grid-cols-2 gap-4 text-left">
                <div className="bg-warm-50 rounded-xl p-4">
                  <p className="text-2xl font-bold text-navy-950">87%</p>
                  <p className="text-xs text-slate-500 mt-1">of listings get applicants within 48 hours</p>
                </div>
                <div className="bg-warm-50 rounded-xl p-4">
                  <p className="text-2xl font-bold text-navy-950">12 days</p>
                  <p className="text-xs text-slate-500 mt-1">average time to fill a position</p>
                </div>
                <div className="bg-warm-50 rounded-xl p-4">
                  <p className="text-2xl font-bold text-navy-950">4.8/5</p>
                  <p className="text-xs text-slate-500 mt-1">employer satisfaction rating</p>
                </div>
                <div className="bg-warm-50 rounded-xl p-4">
                  <p className="text-2xl font-bold text-navy-950">35+</p>
                  <p className="text-xs text-slate-500 mt-1">job categories covered</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Alerts CTA */}
      <section className="bg-section-cool">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="card p-8 sm:p-12 text-center bg-white">
            <div className="badge badge-sage mb-4 mx-auto">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5.85 3.5a.75.75 0 00-1.117-1 9.719 9.719 0 00-2.348 4.876.75.75 0 001.479.248A8.219 8.219 0 015.85 3.5zM19.267 2.5a.75.75 0 10-1.118 1 8.22 8.22 0 011.987 4.124.75.75 0 001.48-.248A9.72 9.72 0 0019.266 2.5z" />
                <path
                  fillRule="evenodd"
                  d="M12 2.25A6.75 6.75 0 005.25 9v.75a8.217 8.217 0 01-2.119 5.52.75.75 0 00.298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 107.48 0 24.583 24.583 0 004.83-1.244.75.75 0 00.298-1.205 8.217 8.217 0 01-2.118-5.52V9A6.75 6.75 0 0012 2.25zM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 004.496 0l.002.1a2.25 2.25 0 01-4.5 0z"
                  clipRule="evenodd"
                />
              </svg>
              Job Alerts
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
              Get Job Alerts Delivered Weekly
            </h2>
            <p className="mt-3 text-slate-500 max-w-lg mx-auto leading-relaxed">
              Never miss the perfect opportunity. Tell us what you&apos;re looking for and
              we&apos;ll send a curated digest of matching jobs every Wednesday morning.
            </p>
            <form className="mt-8 max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="calc-input flex-1 !bg-white"
                />
                <button type="submit" className="btn-primary shrink-0">
                  Get Job Alerts
                </button>
              </div>
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                {["Property Management", "Maintenance", "Real Estate", "Construction"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-warm-100 text-slate-500 cursor-pointer hover:bg-warm-200 transition-colors"
                    >
                      {tag}
                    </span>
                  )
                )}
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-warm-100 text-slate-400 cursor-pointer hover:bg-warm-200 transition-colors">
                  + More
                </span>
              </div>
            </form>
            <p className="mt-4 text-xs text-slate-400">
              Free forever. Unsubscribe with one click. We never share your email.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
