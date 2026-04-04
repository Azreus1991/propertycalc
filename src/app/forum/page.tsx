import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Community Forum — PropertyCalc | Connect with 50,000+ Property Owners & Investors",
  description:
    "Join the PropertyCalc community forum. Discuss real estate investing, home maintenance, landlording, market trends, and more with 50,000+ property owners and investors.",
};

const forumStats = [
  { label: "Members", value: "Growing", icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" },
  { label: "Discussions", value: "Active", icon: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" },
  { label: "Active Today", value: "Live", icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" },
  { label: "Answers Given", value: "Helpful", icon: "M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" },
];

const forumCategories = [
  {
    name: "General Discussion",
    description: "Broad property talk, introductions, and anything that doesn\u2019t fit elsewhere.",
    icon: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155",
    threads: 3420,
    members: 18200,
    color: "brand",
  },
  {
    name: "First-Time Homebuyers",
    description: "Questions about mortgages, inspections, closing costs, and navigating your first purchase.",
    icon: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
    threads: 1870,
    members: 12400,
    color: "sage",
  },
  {
    name: "Real Estate Investing",
    description: "Strategies, deal analysis, portfolio growth, BRRRR, house hacking, and syndications.",
    icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z",
    threads: 2140,
    members: 14800,
    color: "brand",
  },
  {
    name: "Landlord & Tenant",
    description: "Lease agreements, tenant screening, rent collection, evictions, and fair housing.",
    icon: "M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z",
    threads: 1560,
    members: 9800,
    color: "navy",
  },
  {
    name: "Home Maintenance & DIY",
    description: "Repair tips, seasonal checklists, tool recommendations, and when to call a pro.",
    icon: "M11.42 15.17l-5.1-5.1a1.5 1.5 0 010-2.12l.88-.88a1.5 1.5 0 012.12 0l.94.94 2.12-2.12a1.5 1.5 0 012.12 0l.88.88a1.5 1.5 0 010 2.12l-5.1 5.1a.75.75 0 01-1.06 0zM2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75",
    threads: 1980,
    members: 15600,
    color: "sage",
  },
  {
    name: "Market Analysis",
    description: "Local and national market trends, price forecasts, interest rate discussions, and data dives.",
    icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
    threads: 890,
    members: 7200,
    color: "navy",
  },
  {
    name: "Renovation & Flipping",
    description: "Project budgets, contractor management, before/afters, and flip deal breakdowns.",
    icon: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182",
    threads: 1340,
    members: 8900,
    color: "brand",
  },
  {
    name: "Legal & Tax Questions",
    description: "1031 exchanges, LLC structures, depreciation, insurance claims, and regulatory changes.",
    icon: "M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z",
    threads: 720,
    members: 5400,
    color: "navy",
  },
  {
    name: "Property Management",
    description: "Software tools, scaling a portfolio, hiring help, maintenance workflows, and PM companies.",
    icon: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21",
    threads: 640,
    members: 4100,
    color: "sage",
  },
  {
    name: "Commercial Real Estate",
    description: "Office, retail, industrial, multifamily 5+, NNN leases, and CRE underwriting.",
    icon: "M2.25 21h19.5M3.75 3v18m16.5-18v18M5.25 3h13.5M5.25 21V6.75c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125V21m4.5-15v15m-4.5-12h4.5m-4.5 3h4.5m-4.5 3h4.5",
    threads: 510,
    members: 3200,
    color: "brand",
  },
];

const trendingDiscussions = [
  {
    title: "Just closed on my first rental property at 24 \u2014 here\u2019s every number from the deal",
    author: "Marcus T.",
    replies: 147,
    category: "Real Estate Investing",
    categoryColor: "brand",
    time: "2 hours ago",
    hot: true,
  },
  {
    title: "Tenant broke lease 3 months early and left the unit trashed. What are my options in Texas?",
    author: "Jennifer K.",
    replies: 89,
    category: "Landlord & Tenant",
    categoryColor: "navy",
    time: "5 hours ago",
    hot: false,
  },
  {
    title: "Is the 1% rule dead in 2026? Let\u2019s look at actual data from 15 markets",
    author: "David Chen",
    replies: 213,
    category: "Market Analysis",
    categoryColor: "navy",
    time: "8 hours ago",
    hot: true,
  },
  {
    title: "DIY bathroom remodel complete \u2014 $4,200 total. Full breakdown + before/after photos",
    author: "Sarah M.",
    replies: 76,
    category: "Renovation & Flipping",
    categoryColor: "brand",
    time: "12 hours ago",
    hot: false,
  },
  {
    title: "My inspector missed a $22K foundation issue. Can I go after their E&O insurance?",
    author: "Robert A.",
    replies: 104,
    category: "First-Time Homebuyers",
    categoryColor: "sage",
    time: "1 day ago",
    hot: false,
  },
];

const topContributors = [
  {
    initials: "KW",
    name: "Karen Whitfield",
    role: "Property Manager \u2022 12yr exp",
    posts: 1840,
    helpful: 4200,
    color: "bg-brand-100 text-brand-700",
  },
  {
    initials: "DC",
    name: "David Chen",
    role: "RE Investor \u2022 38 units",
    posts: 1520,
    helpful: 3800,
    color: "bg-navy-100 text-navy-700",
  },
  {
    initials: "MR",
    name: "Maria Rodriguez",
    role: "Real Estate Attorney",
    posts: 980,
    helpful: 5100,
    color: "bg-sage-100 text-sage-700",
  },
  {
    initials: "JT",
    name: "James Turner",
    role: "GC & Home Inspector",
    posts: 1260,
    helpful: 3400,
    color: "bg-warm-200 text-warm-800",
  },
];

const guidelines = [
  {
    title: "Be Respectful & Constructive",
    description: "Disagree with ideas, not people. No personal attacks, name-calling, or condescension. Everyone was a beginner once.",
  },
  {
    title: "Share Real Experience",
    description: "The best advice comes from people who\u2019ve done it. Back up claims with numbers, data, or specific outcomes from your own deals.",
  },
  {
    title: "No Spam or Self-Promotion",
    description: "Don\u2019t post links to your course, YouTube channel, or coaching program. Helpful resources are fine; pitches are not.",
  },
  {
    title: "Protect Personal Information",
    description: "Never share exact property addresses, tenant names, or sensitive financial details. Use general descriptions instead.",
  },
  {
    title: "Search Before Posting",
    description: "Your question has probably been answered before. Use the search bar first \u2014 you\u2019ll often find a thorough answer faster.",
  },
  {
    title: "Not Legal or Financial Advice",
    description: "Forum members share opinions and experience. For binding legal, tax, or financial guidance, consult a licensed professional.",
  },
];

function formatNumber(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K` : n.toString();
}

export default function ForumPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 dotted-bg opacity-[0.04]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-3xl">
            <div className="badge badge-brand mb-4">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
              Community Forum
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              The PropertyCalc Community
            </h1>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl">
              Where homeowners, landlords, investors, and property pros share hard-won
              knowledge. Ask questions, post deal breakdowns, and learn from people
              who&apos;ve been in your exact situation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/auth/register" className="btn-primary">
                Join the Community
              </Link>
              <Link
                href="/forum"
                className="btn-secondary"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-navy-900 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {forumStats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-navy-800 flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-brand-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                  </svg>
                </div>
                <div>
                  <div className="text-lg font-extrabold text-white leading-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Forum Categories */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 mb-2">
            Forum Categories
          </h2>
          <p className="text-slate-500 mb-8">
            Jump into the conversation. Pick a topic that matches what you&apos;re
            working on.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {forumCategories.map((cat) => (
              <Link
                key={cat.name}
                href={`/forum/${cat.name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                className="card group p-5 hover:border-brand-200 flex gap-4"
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    cat.color === "brand"
                      ? "bg-brand-100"
                      : cat.color === "sage"
                      ? "bg-sage-100"
                      : "bg-navy-100"
                  }`}
                >
                  <svg
                    className={`w-5 h-5 ${
                      cat.color === "brand"
                        ? "text-brand-600"
                        : cat.color === "sage"
                        ? "text-sage-600"
                        : "text-navy-600"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={cat.icon}
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-navy-950 group-hover:text-brand-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">
                    {cat.description}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                      </svg>
                      {formatNumber(cat.threads)} threads
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                      </svg>
                      {formatNumber(cat.members)} members
                    </span>
                  </div>
                </div>
                <svg
                  className="w-5 h-5 text-slate-300 group-hover:text-brand-500 transition-colors shrink-0 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            ))}
          </div>
        </div>

        {/* Trending Discussions */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
                Trending Discussions
              </h2>
              <p className="text-slate-500 mt-1">
                The conversations getting the most engagement right now.
              </p>
            </div>
            <Link
              href="/forum/trending"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
            >
              View all
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
          <div className="space-y-3">
            {trendingDiscussions.map((thread, i) => (
              <Link
                key={i}
                href="/forum/thread"
                className="card group block p-5 hover:border-brand-200"
              >
                <div className="flex items-start gap-4">
                  <div className="hidden sm:flex flex-col items-center gap-0.5 min-w-[3rem] pt-0.5">
                    <span className="text-lg font-extrabold text-navy-950">
                      {thread.replies}
                    </span>
                    <span className="text-[0.65rem] text-slate-400 uppercase tracking-wide">
                      replies
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span
                        className={`badge ${
                          thread.categoryColor === "brand"
                            ? "badge-brand"
                            : thread.categoryColor === "sage"
                            ? "badge-sage"
                            : "badge-navy"
                        } text-[0.6rem]`}
                      >
                        {thread.category}
                      </span>
                      {thread.hot && (
                        <span className="inline-flex items-center gap-0.5 text-[0.6rem] font-semibold text-red-500">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clipRule="evenodd" />
                          </svg>
                          HOT
                        </span>
                      )}
                      <span className="text-xs text-slate-400">
                        {thread.time}
                      </span>
                    </div>
                    <h3 className="font-bold text-navy-950 group-hover:text-brand-600 transition-colors leading-snug">
                      {thread.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
                      <span>by <span className="font-medium text-slate-600">{thread.author}</span></span>
                      <span className="sm:hidden">{thread.replies} replies</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Top Contributors */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 mb-2">
            Top Contributors
          </h2>
          <p className="text-slate-500 mb-8">
            Members who consistently provide the most valuable, experience-backed answers.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topContributors.map((user, i) => (
              <div key={i} className="card-elevated p-6 text-center">
                <div
                  className={`w-14 h-14 rounded-full ${user.color} flex items-center justify-center mx-auto mb-3`}
                >
                  <span className="text-lg font-extrabold">{user.initials}</span>
                </div>
                <h3 className="font-bold text-navy-950">{user.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{user.role}</p>
                <div className="mt-4 flex justify-center gap-4 text-xs">
                  <div>
                    <div className="font-extrabold text-navy-950">
                      {formatNumber(user.posts)}
                    </div>
                    <div className="text-slate-400">Posts</div>
                  </div>
                  <div className="w-px bg-slate-100" />
                  <div>
                    <div className="font-extrabold text-brand-600">
                      {formatNumber(user.helpful)}
                    </div>
                    <div className="text-slate-400">Helpful</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mb-16 card p-8 sm:p-12 text-center bg-warm-50 border-warm-200">
          <div className="badge badge-brand mx-auto mb-4">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5z" clipRule="evenodd" />
            </svg>
            Join Free
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
            Join our community of property owners and investors
          </h3>
          <p className="mt-3 text-slate-500 max-w-xl mx-auto">
            Get answers from people who&apos;ve actually done it. Ask about deals,
            maintenance issues, tenant problems, or anything property-related.
            Premium members earn a{" "}
            <span className="inline-flex items-center gap-1 font-semibold text-brand-600">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
              </svg>
              Priority Support
            </span>{" "}
            badge and faster response times.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/auth/register" className="btn-primary">
              Create Free Account
            </Link>
            <Link href="/pricing" className="btn-secondary">
              See Premium Benefits
            </Link>
          </div>
          <p className="mt-4 text-xs text-slate-400">
            Free forever. No credit card required.
          </p>
        </div>

        {/* Forum Guidelines */}
        <div className="bg-section-cool rounded-2xl p-8 sm:p-10">
          <h2 className="text-2xl font-extrabold text-navy-950 mb-2">
            Community Guidelines
          </h2>
          <p className="text-slate-500 mb-8">
            These keep the forum useful and welcoming. Violating them will result in
            a warning or ban.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {guidelines.map((rule, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-navy-100 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-extrabold text-navy-700">
                    {i + 1}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-navy-950 text-sm">
                    {rule.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {rule.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
