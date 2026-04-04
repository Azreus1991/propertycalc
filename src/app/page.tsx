import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PropertyCalc — The Complete Property Platform for Owners, Investors & Pros",
  description:
    "Free calculators, expert guides, community forums, real estate listings, contractor directory, job board, learning center, and more. The all-in-one property resource trusted by homeowners, landlords, and investors nationwide.",
};

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const calculators = [
  {
    title: "Maintenance Budget",
    desc: "Plan annual upkeep costs with precision. Factors in home age, size, location, and condition.",
    href: "/calculators/home-maintenance",
    icon: "M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
    accent: "bg-brand-50 text-brand-600",
  },
  {
    title: "Rental Property ROI",
    desc: "Cash-on-cash return, cap rate, break-even occupancy, and 10-year projections at a glance.",
    href: "/calculators/rental-roi",
    icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    accent: "bg-sage-50 text-sage-600",
  },
  {
    title: "Contractor Quote Analyzer",
    desc: "Is your contractor overcharging? Compare quotes against regional averages for 15+ project types.",
    href: "/calculators/contractor-quote",
    icon: "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z",
    accent: "bg-navy-50 text-navy-600",
  },
  {
    title: "Paint Cost Estimator",
    desc: "Multi-room paint calculator. DIY vs pro costs, paint quality tiers, and full supply lists.",
    href: "/calculators/paint-estimator",
    icon: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42",
    accent: "bg-warm-100 text-warm-700",
  },
  {
    title: "Roof Repair vs Replace",
    desc: "Data-driven recommendation with lifecycle cost comparison, material analysis, and ROI timeline.",
    href: "/calculators/roof-calculator",
    icon: "M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z",
    accent: "bg-red-500/10 text-red-600",
  },
  {
    title: "Mortgage Calculator",
    desc: "Monthly payments, amortization schedule, total interest paid, and early payoff scenarios with PMI.",
    href: "/calculators/mortgage",
    icon: "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21",
    accent: "bg-blue-500/10 text-blue-600",
  },
  {
    title: "Rent vs Buy",
    desc: "Side-by-side comparison of renting versus buying. Break-even timeline, wealth building, and tax implications.",
    href: "/calculators/rent-vs-buy",
    icon: "M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5",
    accent: "bg-sage-50 text-sage-600",
  },
  {
    title: "Renovation ROI",
    desc: "Which home improvements actually pay off? See expected ROI for 30+ renovation projects by region.",
    href: "/calculators/renovation-roi",
    icon: "M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63",
    accent: "bg-brand-50 text-brand-600",
  },
  {
    title: "Property Tax Estimator",
    desc: "Estimate annual property taxes by state, county, and assessment value. Includes exemption calculators.",
    href: "/calculators/property-tax",
    icon: "M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z",
    accent: "bg-navy-50 text-navy-600",
  },
  {
    title: "HVAC Cost Estimator",
    desc: "New system pricing, repair vs replace analysis, energy savings projections, and seasonal maintenance budgets.",
    href: "/calculators/hvac",
    icon: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z",
    accent: "bg-warm-100 text-warm-700",
  },
  {
    title: "Home Insurance Estimator",
    desc: "Estimate premiums based on location, coverage, home value, and risk factors. Compare policy types.",
    href: "/calculators/insurance",
    icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
    accent: "bg-sage-50 text-sage-600",
  },
  {
    title: "Moving Cost Calculator",
    desc: "Local and long-distance moving estimates. DIY vs professional, packing supplies, and timeline planner.",
    href: "/calculators/moving-cost",
    icon: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.143-.504 1.143-1.125v-5.437c0-.396-.158-.776-.438-1.057L14.7 6.375c-.28-.281-.66-.438-1.057-.438H9.375c-.621 0-1.125.504-1.125 1.125v14.063M8.25 18.75h6",
    accent: "bg-blue-500/10 text-blue-600",
  },
];

const platformFeatures = [
  {
    title: "Community Forum",
    desc: "Ask questions, share experiences, and get advice from thousands of homeowners, investors, and property professionals across the country.",
    href: "/forum",
    icon: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155",
    tag: "Active Community",
    tagColor: "badge-sage",
  },
  {
    title: "Real Estate Listings",
    desc: "Browse properties for sale and rent nationwide. Investment properties, fixer-uppers, multi-family units, and commercial spaces.",
    href: "/listings",
    icon: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21",
    tag: "Buy & Sell",
    tagColor: "badge-brand",
  },
  {
    title: "Job Board",
    desc: "Find or post property management, maintenance, construction, and real estate jobs. Employers and job seekers connect directly.",
    href: "/jobs",
    icon: "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z",
    tag: "Hire & Get Hired",
    tagColor: "badge-navy",
  },
  {
    title: "Vendor Directory",
    desc: "Verified contractors, plumbers, electricians, roofers, and more. Read reviews, compare quotes, and hire with confidence.",
    href: "/vendors",
    icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z",
    tag: "Trusted Pros",
    tagColor: "badge-brand",
  },
  {
    title: "Learning Center",
    desc: "Free and premium courses on real estate investing, property management, home maintenance, flipping, and wholesaling.",
    href: "/learn",
    icon: "M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5",
    tag: "Courses",
    tagColor: "badge-sage",
  },
  {
    title: "Property Portfolios",
    desc: "Track your investment portfolio. Monitor maintenance schedules, expenses, cash flow, and property performance in one dashboard.",
    href: "/portfolios",
    icon: "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605",
    tag: "Dashboard",
    tagColor: "badge-navy",
  },
  {
    title: "Guides & Digital Books",
    desc: "In-depth eBooks, downloadable checklists, and expert resources on every aspect of property ownership and investment.",
    href: "/guides",
    icon: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25",
    tag: "Free Resources",
    tagColor: "badge-brand",
  },
  {
    title: "Document Templates",
    desc: "Lease agreements, inspection checklists, move-in/out forms, maintenance logs, and more — ready to download and customize.",
    href: "/templates",
    icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
    tag: "Templates",
    tagColor: "badge-sage",
  },
  {
    title: "Market Reports",
    desc: "Neighborhood-level market data, price trends, rental yield maps, and demand forecasts updated monthly across all 50 states.",
    href: "/market-reports",
    icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
    tag: "Data & Insights",
    tagColor: "badge-navy",
  },
];

const blogPosts = [
  {
    title: "The Ultimate First-Time Homebuyer Checklist for 2026",
    excerpt: "Everything you need to know before buying your first home — from pre-approval to closing day, with insider tips most guides leave out.",
    category: "Homebuying",
    readTime: "12 min",
    date: "Mar 27, 2026",
    featured: true,
  },
  {
    title: "5 Home Renovations That Actually Increase Your Property Value",
    excerpt: "Not all upgrades are created equal. Here's what the data says about which renovations deliver real ROI.",
    category: "Renovations",
    readTime: "8 min",
    date: "Mar 24, 2026",
    featured: false,
  },
  {
    title: "How to Screen Tenants Like a Pro: A Landlord's Complete Guide",
    excerpt: "Protect your investment with a thorough screening process. We cover credit checks, background checks, income verification, and red flags.",
    category: "Landlords",
    readTime: "10 min",
    date: "Mar 20, 2026",
    featured: false,
  },
  {
    title: "Understanding Cap Rates: What Every Real Estate Investor Needs to Know",
    excerpt: "Cap rate is the most important metric in commercial real estate — here's how to calculate it, what's a good one, and when it misleads.",
    category: "Investing",
    readTime: "7 min",
    date: "Mar 17, 2026",
    featured: false,
  },
];

const stats = [
  { value: "12+", label: "Calculators", icon: "M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008H15.75v-.008z" },
  { value: "50", label: "States Covered", icon: "M9 6.75V15m0-8.25a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75V6.75zm.75 6a.75.75 0 01-.75-.75V12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H9.75zM15 6.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75V6.75a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75zm-.75 6a.75.75 0 01-.75-.75V12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { value: "7", label: "User Roles", icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" },
  { value: "Free", label: "Forever", icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
];

const howItWorks = [
  { step: "01", title: "Pick Your Tool", description: "Choose from our library of specialized calculators, each built with real industry data and regional pricing databases.", icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" },
  { step: "02", title: "Enter Your Details", description: "Fill in the basics about your property — size, age, location, and condition. Most calculations take under 60 seconds.", icon: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" },
  { step: "03", title: "Get Actionable Results", description: "Detailed breakdowns, visual charts, expert recommendations, and downloadable reports you can take to the bank.", icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" },
];

const whatYouCanDo = [
  {
    title: "Catch Overpriced Contractor Quotes",
    desc: "Run any quote through the Contractor Quote Analyzer to instantly see how it stacks up against regional averages for 15+ project types — before you sign anything.",
    icon: "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z",
    accent: "bg-brand-50 text-brand-600",
  },
  {
    title: "Model Your Rental Investment",
    desc: "Enter an address, purchase price, and expected rent — get cash-on-cash return, cap rate, break-even occupancy, and a 10-year projection in under 60 seconds.",
    icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    accent: "bg-sage-50 text-sage-600",
  },
  {
    title: "Budget Maintenance the Right Way",
    desc: "Stop guessing. The Maintenance Budget Calculator factors in your home's age, size, location, and condition to give you a defensible annual upkeep number.",
    icon: "M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
    accent: "bg-navy-50 text-navy-600",
  },
];

const pricingTiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Everything you need to get started",
    features: ["All 12+ calculators", "Community forum access", "Browse listings & jobs", "Weekly newsletter", "Basic market data", "5 saved reports/month"],
    cta: "Get Started Free",
    href: "/calculators/home-maintenance",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    desc: "For serious investors and landlords",
    features: ["Everything in Free", "Unlimited saved reports", "Portfolio dashboard", "Advanced analytics", "Priority forum support", "Premium courses", "Document templates", "Ad-free experience", "Export to PDF/Excel"],
    cta: "Start Free Trial",
    href: "/auth/register",
    highlighted: true,
  },
  {
    name: "Business",
    price: "$49",
    period: "/month",
    desc: "For property managers and teams",
    features: ["Everything in Pro", "Team collaboration (5 seats)", "Featured vendor listing", "Branded reports", "API access", "White-label calculators", "Priority support", "Custom integrations", "Job board posting credits"],
    cta: "Contact Sales",
    href: "/support",
    highlighted: false,
  },
];

const affiliatePartners = [
  { name: "Home Insurance", desc: "Compare rates from top providers", icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" },
  { name: "Mortgage Lenders", desc: "Pre-qualify in minutes", icon: "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" },
  { name: "Home Warranty", desc: "Protect your investment", icon: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" },
  { name: "Property Tools", desc: "Recommended products & software", icon: "M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63" },
];

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function HomePage() {
  return (
    <>
      {/* ════════ HERO ════════ */}
      <section className="relative overflow-hidden bg-hero-gradient">
        <div className="absolute inset-0 dotted-bg opacity-[0.04]" />
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-brand-500/[0.07] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-sage-500/[0.05] rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2.5 bg-white/[0.06] border border-white/[0.08] rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
              </span>
              <span className="text-brand-300 text-sm font-medium tracking-wide">
                The all-in-one property platform — free for everyone, nationwide
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-black text-white leading-[1.08] tracking-tight">
              Every tool a property
              <br className="hidden sm:block" />{" "}
              owner needs.{" "}
              <span className="text-gradient">One platform.</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-300/90 leading-relaxed max-w-2xl">
              12+ calculators, community forums, real estate listings, contractor directory,
              job board, learning center, market reports, and portfolio tracking — built for
              homeowners, landlords, investors, and property professionals in all 50 states.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="#calculators" className="btn-primary text-base !py-3.5 !px-7">
                Explore Free Tools
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </Link>
              <Link href="/forum" className="btn-secondary !bg-white/[0.06] !border-white/[0.1] !text-white hover:!bg-white/[0.1] hover:!border-white/[0.2] text-base !py-3.5 !px-7">
                Join the Community
              </Link>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-brand-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">{stat.value}</div>
                  <div className="text-sm text-slate-400 mt-0.5">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ CALCULATORS ════════ */}
      <section id="calculators" className="bg-section-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="badge badge-brand mx-auto mb-4">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008H15.75v-.008z" />
              </svg>
              12+ Free Calculators
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
              Property calculators that actually work
            </h2>
            <p className="mt-4 text-slate-500 text-lg">
              Built with real industry data, regional pricing, and the same methodology
              used by property professionals. Get your answer in under a minute.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {calculators.map((calc) => (
              <Link key={calc.href} href={calc.href} className="card group p-5 hover:border-brand-200">
                <div className={`w-10 h-10 rounded-lg ${calc.accent} flex items-center justify-center mb-3`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d={calc.icon} />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-navy-950 group-hover:text-brand-600 transition-colors">
                  {calc.title}
                </h3>
                <p className="mt-1.5 text-sm text-slate-500 leading-relaxed line-clamp-2">
                  {calc.desc}
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                  Calculate
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ PLATFORM FEATURES ════════ */}
      <section className="bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="badge badge-navy mx-auto mb-4">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.644 1.59a.75.75 0 01.712 0l9.75 5.25a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.712 0l-9.75-5.25a.75.75 0 010-1.32l9.75-5.25z" />
                <path d="M3.265 10.602l7.668 4.129a2.25 2.25 0 002.134 0l7.668-4.13 1.37.739a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.71 0l-9.75-5.25a.75.75 0 010-1.32l1.37-.738z" />
                <path d="M3.265 15.602l7.668 4.129a2.25 2.25 0 002.134 0l7.668-4.13 1.37.739a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.71 0l-9.75-5.25a.75.75 0 010-1.32l1.37-.738z" />
              </svg>
              Complete Platform
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
              More than calculators — a complete{" "}
              <span className="text-gradient">property ecosystem</span>
            </h2>
            <p className="mt-4 text-slate-500 text-lg">
              Whether you&apos;re a first-time homebuyer, seasoned investor, property manager,
              contractor, or real estate agent — there&apos;s something here for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {platformFeatures.map((feature) => (
              <Link key={feature.href} href={feature.href} className="card-elevated group p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center">
                    <svg className="w-6 h-6 text-navy-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
                    </svg>
                  </div>
                  <span className={`badge ${feature.tagColor}`}>{feature.tag}</span>
                </div>
                <h3 className="text-lg font-bold text-navy-950 group-hover:text-brand-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ BLOG PREVIEW ════════ */}
      <section className="bg-section-cool">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
            <div>
              <div className="badge badge-brand mb-4">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l12.15-12.15z" />
                </svg>
                The Property Blog
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
                Expert insights, updated weekly
              </h2>
              <p className="mt-3 text-slate-500 text-lg max-w-xl">
                Actionable advice on maintenance, investing, landlording, market trends,
                and everything in between. New articles every Monday and Thursday.
              </p>
            </div>
            <Link href="/blog" className="btn-secondary mt-6 sm:mt-0 shrink-0">
              View All Articles
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Featured Post */}
            <div className="lg:col-span-7">
              <Link href="/blog" className="card group block h-full p-8 hover:border-brand-200">
                <div className="flex items-center gap-3 mb-4">
                  <span className="badge badge-brand">{blogPosts[0].category}</span>
                  <span className="text-xs text-slate-400">{blogPosts[0].readTime} read</span>
                  <span className="text-xs text-slate-400">{blogPosts[0].date}</span>
                </div>
                <h3 className="text-2xl font-bold text-navy-950 group-hover:text-brand-600 transition-colors leading-tight">
                  {blogPosts[0].title}
                </h3>
                <p className="mt-3 text-slate-500 leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>
                <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                  Read full article
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </Link>
            </div>

            {/* Recent Posts */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {blogPosts.slice(1).map((post) => (
                <Link key={post.title} href="/blog" className="card group p-5 hover:border-brand-200">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="badge badge-sage text-[0.65rem]">{post.category}</span>
                    <span className="text-xs text-slate-400">{post.readTime}</span>
                  </div>
                  <h4 className="text-base font-bold text-navy-950 group-hover:text-brand-600 transition-colors leading-snug">
                    {post.title}
                  </h4>
                  <p className="mt-1.5 text-sm text-slate-500 line-clamp-2">{post.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ HOW IT WORKS ════════ */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">How it works</h2>
            <p className="mt-4 text-slate-500 text-lg">No signup required. No credit card. No nonsense. Just the tools you need.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {howItWorks.map((item, i) => (
              <div key={item.step} className="relative text-center">
                {i < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed border-slate-200" />
                )}
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-lg shadow-slate-900/[0.04] border border-slate-100 mb-6">
                  <svg className="w-7 h-7 text-brand-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-navy-950 text-white text-xs font-bold flex items-center justify-center">{item.step}</span>
                </div>
                <h3 className="text-lg font-bold text-navy-950">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ DEAL ENGINE ════════ */}
      <section className="bg-section-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="badge badge-sage mx-auto mb-4">
              The Deal Engine
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
              More than calculators — a complete operating system
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🐕", title: "Source Deals & Earn", desc: "Find deals, submit them to the platform, and earn finder's fees when they convert. Our engine underwrites and grades every deal automatically." },
              { icon: "📊", title: "Auto-Underwrite Everything", desc: "Every deal gets ROI scoring, cash flow analysis, risk assessment, and an A-F grade. Strategy detection for flip, rental, BRRRR, and wholesale." },
              { icon: "🔄", title: "Route to Matched Investors", desc: "Deals get automatically matched to investors based on criteria, location, and budget. Services are triggered when deals are accepted." },
            ].map((item) => (
              <div key={item.title} className="card p-6 sm:p-8">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-navy-950 mb-2">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/deals" className="btn-primary">Browse the Deal Marketplace →</Link>
          </div>
        </div>
      </section>

      {/* ════════ PRICING ════════ */}
      <section id="pricing" className="bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="badge badge-brand mx-auto mb-4">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Pricing
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
              Free for everyone. Pro for power users.
            </h2>
            <p className="mt-4 text-slate-500 text-lg">
              Most features are completely free. Upgrade for advanced analytics,
              portfolio tracking, premium content, and an ad-free experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-7 ${
                  tier.highlighted
                    ? "bg-navy-950 text-white ring-2 ring-brand-500 shadow-xl shadow-brand-500/10 relative"
                    : "card"
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="badge bg-brand-500 text-white">Most Popular</span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className={`text-lg font-bold ${tier.highlighted ? "text-white" : "text-navy-950"}`}>
                    {tier.name}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className={`text-4xl font-black ${tier.highlighted ? "text-white" : "text-navy-950"}`}>
                      {tier.price}
                    </span>
                    <span className={`text-sm ${tier.highlighted ? "text-slate-400" : "text-slate-500"}`}>
                      {tier.period}
                    </span>
                  </div>
                  <p className={`mt-2 text-sm ${tier.highlighted ? "text-slate-300" : "text-slate-500"}`}>
                    {tier.desc}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <svg className={`w-4 h-4 mt-0.5 shrink-0 ${tier.highlighted ? "text-brand-400" : "text-sage-500"}`} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className={`text-sm ${tier.highlighted ? "text-slate-300" : "text-slate-600"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.href}
                  className={`block text-center py-3 px-6 rounded-[0.625rem] font-semibold text-sm transition-all ${
                    tier.highlighted
                      ? "bg-brand-500 text-white hover:bg-brand-400 shadow-lg shadow-brand-500/25"
                      : "bg-navy-950 text-white hover:bg-navy-900"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ AFFILIATE / PARTNERS ════════ */}
      <section className="bg-section-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="badge badge-sage mb-4">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>
                Trusted Partners
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
                Save money with our vetted partners
              </h2>
              <p className="mt-4 text-slate-500 text-lg leading-relaxed">
                We&apos;ve partnered with industry-leading providers to bring you exclusive rates on
                insurance, mortgages, home warranties, and property tools. Every partner is
                vetted by our team.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {affiliatePartners.map((partner) => (
                <Link key={partner.name} href="/services" className="card p-5 text-center hover:border-brand-200 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d={partner.icon} />
                    </svg>
                  </div>
                  <div className="text-sm font-bold text-navy-950">{partner.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{partner.desc}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ VENDOR CTA ════════ */}
      <section className="bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="badge badge-brand mb-4">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.644 1.59a.75.75 0 01.712 0l9.75 5.25a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.712 0l-9.75-5.25a.75.75 0 010-1.32l9.75-5.25z" />
                </svg>
                For Professionals
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
                Grow your business on PropertyCalc
              </h2>
              <p className="mt-4 text-slate-500 text-lg leading-relaxed">
                Whether you&apos;re a contractor, real estate agent, property manager, or service
                provider — list your business, post jobs, showcase your portfolio, and connect
                with thousands of property owners looking for exactly what you offer.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Free basic listing in our vendor directory",
                  "Featured placement starting at $49/month",
                  "Post unlimited job openings ($29/post)",
                  "Receive qualified leads directly",
                  "Showcase your portfolio and reviews",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-slate-600">
                    <svg className="w-4 h-4 text-sage-500 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/vendors/register" className="btn-primary">
                  Register Your Business
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link href="/vendors" className="btn-secondary">Browse Directory</Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Contractors", count: "500+" },
                { label: "Real Estate Agents", count: "200+" },
                { label: "Property Managers", count: "150+" },
                { label: "Service Pros", count: "300+" },
              ].map((item) => (
                <div key={item.label} className="card p-5 text-center">
                  <div className="text-2xl font-extrabold text-navy-950">{item.count}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ FINAL CTA ════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-hero-gradient rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 dotted-bg opacity-[0.03]" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-[80px]" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to make smarter property decisions?
            </h2>
            <p className="mt-4 text-lg text-slate-300 max-w-xl mx-auto">
              Join thousands of homeowners, investors, and property professionals
              across all 50 states using PropertyCalc to save money, find opportunities,
              and build wealth through real estate.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/calculators/home-maintenance" className="btn-primary text-base !py-3.5 !px-7">
                Try a Free Calculator
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link href="/forum" className="btn-secondary !bg-white/[0.06] !border-white/[0.1] !text-white hover:!bg-white/[0.1] hover:!border-white/[0.2] text-base !py-3.5 !px-7">
                Join the Community
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
