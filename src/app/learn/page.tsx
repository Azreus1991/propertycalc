import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Learning Center — Real Estate Courses & Education | PropertyCalc",
  description:
    "Master real estate investing, landlording, house flipping, and property maintenance with expert-led courses. Free and Pro options for every experience level.",
};

const categories = [
  { name: "All Courses", slug: "all", icon: "grid" },
  { name: "Beginner", slug: "beginner", icon: "academic" },
  { name: "Investing", slug: "investing", icon: "chart" },
  { name: "Landlording", slug: "landlording", icon: "key" },
  { name: "Maintenance", slug: "maintenance", icon: "wrench" },
  { name: "Flipping", slug: "flipping", icon: "home" },
  { name: "Commercial", slug: "commercial", icon: "building" },
];

const courses = [
  {
    title: "Real Estate Investing 101",
    description:
      "Build a rock-solid foundation in real estate investing. Learn to analyze deals, understand market cycles, and create your first investment plan with confidence.",
    difficulty: "Beginner",
    lessons: 18,
    hours: 6,
    tier: "Free",
    category: "Investing",
    slug: "real-estate-investing-101",
  },
  {
    title: "First-Time Homebuyer's Guide",
    description:
      "Navigate the entire homebuying process from pre-approval to closing day. Covers credit scores, down payments, inspections, negotiation, and avoiding costly mistakes.",
    difficulty: "Beginner",
    lessons: 14,
    hours: 4.5,
    tier: "Free",
    category: "Beginner",
    slug: "first-time-homebuyer-guide",
  },
  {
    title: "Landlord Mastery",
    description:
      "Everything you need to manage rental properties profitably. Tenant screening, lease creation, maintenance systems, rent collection, and legal compliance across all 50 states.",
    difficulty: "Intermediate",
    lessons: 24,
    hours: 9,
    tier: "Pro",
    category: "Landlording",
    slug: "landlord-mastery",
  },
  {
    title: "House Flipping Blueprint",
    description:
      "Turn distressed properties into profit. Sourcing deals, estimating rehab costs, managing contractors, navigating permits, and timing your exit strategy for maximum ROI.",
    difficulty: "Advanced",
    lessons: 20,
    hours: 8,
    tier: "Pro",
    category: "Flipping",
    slug: "house-flipping-blueprint",
  },
  {
    title: "Property Maintenance Essentials",
    description:
      "Protect your investment and avoid expensive surprises. Seasonal checklists, DIY vs. hiring out, preventive maintenance schedules, and budgeting the right way.",
    difficulty: "Beginner",
    lessons: 12,
    hours: 3.5,
    tier: "Free",
    category: "Maintenance",
    slug: "property-maintenance-essentials",
  },
  {
    title: "Understanding the Market",
    description:
      "Read real estate markets like a pro. Interpret economic indicators, analyze comparable sales, forecast neighborhood trends, and time your buying and selling decisions.",
    difficulty: "Intermediate",
    lessons: 16,
    hours: 5.5,
    tier: "Pro",
    category: "Investing",
    slug: "understanding-the-market",
  },
  {
    title: "Tax Strategies for Investors",
    description:
      "Keep more of what you earn. Depreciation, 1031 exchanges, cost segregation, entity structuring, deductions most investors miss, and working effectively with a CPA.",
    difficulty: "Advanced",
    lessons: 15,
    hours: 6,
    tier: "Pro",
    category: "Investing",
    slug: "tax-strategies-for-investors",
  },
  {
    title: "Commercial RE Fundamentals",
    description:
      "Break into commercial real estate. Understand cap rates, NOI, tenant classes, triple-net leases, financing structures, and how commercial deals differ from residential.",
    difficulty: "Intermediate",
    lessons: 22,
    hours: 8.5,
    tier: "Pro",
    category: "Commercial",
    slug: "commercial-re-fundamentals",
  },
];

const instructors = [
  {
    name: "Marcus Chen",
    initials: "MC",
    credentials: "CPA, Real Estate Investor — 120+ Units",
    bio: "Former Big Four accountant turned full-time investor. Specializes in tax optimization and multi-family acquisitions across the Sun Belt.",
  },
  {
    name: "Rachel Dominguez",
    initials: "RD",
    credentials: "Licensed Broker, Property Manager — 15 Years",
    bio: "Manages 400+ rental units across three states. Known for systemizing landlording so owners can scale without burning out.",
  },
  {
    name: "James Okafor",
    initials: "JO",
    credentials: "General Contractor, House Flipper — 80+ Flips",
    bio: "Started flipping houses in 2012 with a $30K loan. Now runs a renovation company and teaches the systems behind consistent flip profits.",
  },
];

function difficultyBadge(difficulty: string) {
  switch (difficulty) {
    case "Beginner":
      return "badge badge-sage";
    case "Intermediate":
      return "badge badge-navy";
    case "Advanced":
      return "badge badge-brand";
    default:
      return "badge badge-sage";
  }
}

export default function LearnPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 dotted-bg opacity-[0.04]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-3xl">
            <div className="badge badge-brand mb-4">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a.75.75 0 01.573-.065 47.228 47.228 0 015.002 2.025.75.75 0 00.573-1.385 48.962 48.962 0 00-6.043-2.316.75.75 0 01-.53-.872 49.093 49.093 0 00-.09-.647.75.75 0 01.36-.764A60.587 60.587 0 0111.7 2.805z" />
                <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
              </svg>
              Learning Center
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Property Learning Center
            </h1>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl">
              Expert-led courses on real estate investing, property management, house flipping,
              and everything in between. Learn at your own pace, from anywhere.
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
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {courses.map((course) => (
            <Link
              key={course.slug}
              href={`/learn/${course.slug}`}
              className="card group p-6 hover:border-brand-200 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className={difficultyBadge(course.difficulty)}>{course.difficulty}</span>
                <span className="badge badge-sage">{course.category}</span>
                {course.tier === "Free" ? (
                  <span className="ml-auto text-xs font-bold text-sage-700 bg-sage-50 border border-sage-200 px-2.5 py-1 rounded-full">
                    Free
                  </span>
                ) : (
                  <span className="ml-auto text-xs font-bold text-brand-700 bg-brand-50 border border-brand-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 1.5a.75.75 0 01.75.75V4.5a.75.75 0 01-1.5 0V2.25A.75.75 0 0112 1.5zM5.636 4.136a.75.75 0 011.06 0l1.592 1.591a.75.75 0 01-1.061 1.06l-1.591-1.59a.75.75 0 010-1.061zm12.728 0a.75.75 0 010 1.06l-1.591 1.592a.75.75 0 11-1.06-1.061l1.59-1.591a.75.75 0 011.061 0zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zm9.544-1.06a.75.75 0 00-1.06 1.06l1.59 1.591a.75.75 0 101.061-1.06l-1.59-1.591z" clipRule="evenodd" />
                      <path fillRule="evenodd" d="M12 6.75a5.25 5.25 0 100 10.5 5.25 5.25 0 000-10.5z" clipRule="evenodd" />
                    </svg>
                    Pro
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-navy-950 group-hover:text-brand-600 transition-colors leading-snug">
                {course.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed flex-1">
                {course.description}
              </p>

              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                    {course.lessons} lessons
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {course.hours} hours
                  </span>
                </div>
                <span className="text-sm font-semibold text-brand-600 inline-flex items-center gap-1">
                  Start Course
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Become a Pro Member CTA */}
        <section className="bg-section-cool rounded-2xl overflow-hidden mb-16">
          <div className="p-8 sm:p-12 text-center">
            <span className="badge badge-brand mb-4">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 1.5a.75.75 0 01.75.75V4.5a.75.75 0 01-1.5 0V2.25A.75.75 0 0112 1.5zM5.636 4.136a.75.75 0 011.06 0l1.592 1.591a.75.75 0 01-1.061 1.06l-1.591-1.59a.75.75 0 010-1.061zm12.728 0a.75.75 0 010 1.06l-1.591 1.592a.75.75 0 11-1.06-1.061l1.59-1.591a.75.75 0 011.061 0zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M12 6.75a5.25 5.25 0 100 10.5 5.25 5.25 0 000-10.5z" clipRule="evenodd" />
              </svg>
              Unlock Everything
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
              Become a <span className="text-gradient">Pro Member</span>
            </h2>
            <p className="mt-3 text-slate-500 leading-relaxed max-w-xl mx-auto">
              Get unlimited access to all Pro courses, premium templates, exclusive webinars,
              and a private community of serious investors and property owners.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="btn-primary flex items-center gap-2">
                Start Pro — $19/month
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
              <span className="text-sm text-slate-400">Cancel anytime. 7-day free trial.</span>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-sage-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                All 8 courses
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-sage-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Premium templates
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-sage-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Monthly webinars
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-sage-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Private community
              </span>
            </div>
          </div>
        </section>

        {/* Instructor Spotlights */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
              Learn from the best
            </h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              Our instructors are active practitioners with real portfolios, not just theory.
              They teach what they do every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {instructors.map((inst) => (
              <div key={inst.initials} className="card p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-navy-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-black text-navy-700">{inst.initials}</span>
                </div>
                <h3 className="text-lg font-bold text-navy-950">{inst.name}</h3>
                <p className="text-xs font-medium text-brand-600 mt-1">{inst.credentials}</p>
                <p className="mt-3 text-sm text-slate-500 leading-relaxed">{inst.bio}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
