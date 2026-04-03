import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Blog — Expert Insights on Real Estate, Maintenance & Investing",
  description:
    "Actionable advice on home maintenance, real estate investing, landlording, market trends, and property management. New articles every Monday and Thursday.",
};

const categories = [
  { name: "All", slug: "all", count: 48 },
  { name: "Homebuying", slug: "homebuying", count: 8 },
  { name: "Investing", slug: "investing", count: 12 },
  { name: "Maintenance", slug: "maintenance", count: 9 },
  { name: "Landlords", slug: "landlords", count: 7 },
  { name: "Renovations", slug: "renovations", count: 6 },
  { name: "Market Trends", slug: "market-trends", count: 4 },
  { name: "Legal & Tax", slug: "legal-tax", count: 2 },
];

const featuredPost = {
  title: "The Ultimate First-Time Homebuyer Checklist for 2026",
  excerpt: "Everything you need to know before buying your first home — from pre-approval to closing day, with insider tips that most guides leave out. We cover credit scores, down payment strategies, inspection red flags, negotiation tactics, and the hidden costs nobody talks about.",
  category: "Homebuying",
  readTime: "12 min",
  date: "Mar 27, 2026",
  slug: "first-time-homebuyer-checklist-2026",
  author: { name: "PropertyCalc Editorial", initials: "PC" },
};

const posts = [
  {
    title: "5 Home Renovations That Actually Increase Your Property Value",
    excerpt: "Not all upgrades are created equal. Here's what the data says about which renovations deliver real ROI — and which ones are money pits.",
    category: "Renovations",
    readTime: "8 min",
    date: "Mar 24, 2026",
    slug: "renovations-that-increase-value",
  },
  {
    title: "How to Screen Tenants Like a Pro: A Landlord's Complete Guide",
    excerpt: "Protect your investment with a thorough screening process. Credit checks, background checks, income verification, and the red flags experienced landlords watch for.",
    category: "Landlords",
    readTime: "10 min",
    date: "Mar 20, 2026",
    slug: "tenant-screening-guide",
  },
  {
    title: "Understanding Cap Rates: What Every Real Estate Investor Needs to Know",
    excerpt: "Cap rate is the most important metric in commercial real estate. Here's how to calculate it, what counts as good, and the situations where it can be misleading.",
    category: "Investing",
    readTime: "7 min",
    date: "Mar 17, 2026",
    slug: "understanding-cap-rates",
  },
  {
    title: "Spring Home Maintenance Checklist: 25 Tasks to Do Before Summer",
    excerpt: "Winter takes a toll on every home. This comprehensive spring checklist covers roof inspection, HVAC servicing, gutter cleaning, deck repair, and more.",
    category: "Maintenance",
    readTime: "9 min",
    date: "Mar 13, 2026",
    slug: "spring-maintenance-checklist",
  },
  {
    title: "Is a Home Warranty Worth It? An Honest Analysis for 2026",
    excerpt: "Home warranties sound great in theory, but do the numbers actually work out? We crunch the data on claims, coverage gaps, and when a warranty makes financial sense.",
    category: "Homebuying",
    readTime: "8 min",
    date: "Mar 10, 2026",
    slug: "home-warranty-analysis-2026",
  },
  {
    title: "BRRRR Strategy Explained: Buy, Rehab, Rent, Refinance, Repeat",
    excerpt: "The BRRRR method is one of the most powerful wealth-building strategies in real estate. Here's a step-by-step breakdown with real numbers from actual deals.",
    category: "Investing",
    readTime: "14 min",
    date: "Mar 6, 2026",
    slug: "brrrr-strategy-explained",
  },
  {
    title: "How to Handle a Tenant Who Won't Pay Rent: Legal Steps by State",
    excerpt: "Late rent is every landlord's nightmare. Here's what the law says you can (and can't) do, with specific guidance for all 50 states.",
    category: "Landlords",
    readTime: "11 min",
    date: "Mar 3, 2026",
    slug: "tenant-nonpayment-guide",
  },
  {
    title: "2026 Housing Market Forecast: What Experts Are Predicting",
    excerpt: "Interest rates, inventory, prices, and demand — we surveyed 15 market analysts and compiled their 2026 forecasts into one comprehensive outlook.",
    category: "Market Trends",
    readTime: "10 min",
    date: "Feb 27, 2026",
    slug: "2026-housing-market-forecast",
  },
  {
    title: "The True Cost of Home Ownership: Beyond the Mortgage Payment",
    excerpt: "Your mortgage is just the beginning. Property taxes, insurance, maintenance, HOA fees, utilities, and the hidden costs that catch new homeowners off guard.",
    category: "Homebuying",
    readTime: "9 min",
    date: "Feb 24, 2026",
    slug: "true-cost-homeownership",
  },
  {
    title: "How to Negotiate a Contractor Quote: 7 Tactics That Work",
    excerpt: "Getting a fair price doesn't mean being cheap — it means being informed. These negotiation strategies save homeowners an average of 15-25% on contractor work.",
    category: "Maintenance",
    readTime: "7 min",
    date: "Feb 20, 2026",
    slug: "negotiate-contractor-quotes",
  },
  {
    title: "1031 Exchange Rules Simplified: Defer Taxes on Investment Property Sales",
    excerpt: "A 1031 exchange can save you hundreds of thousands in capital gains taxes. Here's how it works, the timeline requirements, and common mistakes to avoid.",
    category: "Legal & Tax",
    readTime: "12 min",
    date: "Feb 17, 2026",
    slug: "1031-exchange-guide",
  },
  {
    title: "The Landlord's Guide to Setting the Right Rent Price",
    excerpt: "Price too high and you sit vacant. Price too low and you leave money on the table. Here's a data-driven approach to finding the sweet spot for any market.",
    category: "Landlords",
    readTime: "8 min",
    date: "Feb 13, 2026",
    slug: "setting-rent-price-guide",
  },
];

const schedule = [
  { day: "Monday", type: "Deep Dive", desc: "In-depth guides, strategies, and how-tos for property owners and investors" },
  { day: "Thursday", type: "Market & Trends", desc: "Market insights, data analysis, news roundups, and industry developments" },
];

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 dotted-bg opacity-[0.04]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-3xl">
            <div className="badge badge-brand mb-4">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l12.15-12.15z" />
              </svg>
              The Property Blog
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Expert insights for smarter property decisions
            </h1>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl">
              Actionable advice on maintenance, investing, landlording, market trends,
              and everything in between. New articles every Monday and Thursday.
            </p>
          </div>
        </div>
      </section>

      {/* Content Schedule */}
      <div className="bg-navy-900 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <span className="text-slate-400 font-medium">Publishing Schedule:</span>
            {schedule.map((s) => (
              <div key={s.day} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-500" />
                <span className="font-semibold text-white">{s.day}</span>
                <span className="text-slate-400">— {s.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-12">
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
              <span className="ml-1.5 text-xs opacity-60">{cat.count}</span>
            </button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="card group block p-8 sm:p-10 hover:border-brand-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="badge badge-brand">Featured</span>
              <span className="badge badge-sage">{featuredPost.category}</span>
              <span className="text-xs text-slate-400">{featuredPost.readTime} read</span>
              <span className="text-xs text-slate-400">{featuredPost.date}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 group-hover:text-brand-600 transition-colors leading-tight">
              {featuredPost.title}
            </h2>
            <p className="mt-4 text-slate-500 leading-relaxed max-w-3xl">
              {featuredPost.excerpt}
            </p>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-navy-100 flex items-center justify-center">
                  <span className="text-xs font-bold text-navy-700">{featuredPost.author.initials}</span>
                </div>
                <span className="text-sm font-medium text-navy-950">{featuredPost.author.name}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                Read full article
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card group p-6 hover:border-brand-200 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="badge badge-sage text-[0.65rem]">{post.category}</span>
                <span className="text-xs text-slate-400">{post.readTime}</span>
              </div>
              <h3 className="text-lg font-bold text-navy-950 group-hover:text-brand-600 transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1">
                {post.excerpt}
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">{post.date}</span>
                <span className="text-sm font-semibold text-brand-600 inline-flex items-center gap-1">
                  Read
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 card p-8 sm:p-12 text-center bg-warm-50 border-warm-200">
          <h3 className="text-2xl font-extrabold text-navy-950">Never miss an article</h3>
          <p className="mt-2 text-slate-500 max-w-lg mx-auto">
            Get our best property insights delivered to your inbox every Monday and Thursday.
            Join 15,000+ homeowners and investors.
          </p>
          <form className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="calc-input flex-1 !bg-white" />
            <button type="submit" className="btn-primary shrink-0">Subscribe Free</button>
          </form>
          <p className="mt-3 text-xs text-slate-400">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </>
  );
}
