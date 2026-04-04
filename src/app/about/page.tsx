import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About PropertyCalc — The Real Estate Operating System",
  description:
    "PropertyCalc is a comprehensive real estate platform with free calculators, deal sourcing, investor matching, and a full services marketplace. Built for every role in real estate.",
};

const stats = [
  { value: "12+", label: "Free Calculators" },
  { value: "50", label: "States Covered" },
  { value: "7", label: "User Roles" },
  { value: "40+", label: "Platform Pages" },
];

const methodology = [
  {
    title: "Real Industry Data",
    desc: "Every calculation references pricing databases from contractor surveys, government sources, and manufacturer data across all 50 states.",
    icon: "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125",
  },
  {
    title: "Regional Pricing",
    desc: "National averages are misleading. Our calculators factor in regional labor rates, local permit costs, and material availability so you get numbers that match your market.",
    icon: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z",
  },
  {
    title: "Professional Methodology",
    desc: "Our formulas mirror the approaches used by certified appraisers, general contractors, and CPA-prepared investment analyses. No shortcuts.",
    icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
  },
  {
    title: "Open & Transparent",
    desc: "Every calculator shows its methodology openly. We publish our formulas and assumptions so anyone can verify our work and suggest improvements.",
    icon: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
  },
];

const platformFeatures = [
  { title: "Deal Sourcing & Bird-Dog Economy", desc: "Submit deals, earn finder's fees, and build a track record as a deal sourcer. Every deal gets underwritten and graded automatically." },
  { title: "Deal Underwriting Engine", desc: "Automatic ROI scoring, cash flow analysis, risk assessment, and A-F deal grading. Strategy detection for flip, rental, BRRRR, and wholesale." },
  { title: "Investor Matching & Deal Routing", desc: "Deals get matched to investors based on criteria, location, and budget. The core money flow of the platform." },
  { title: "Services Marketplace", desc: "Contractors, lenders, agents, and inspectors connected directly to deals — not standalone listings. Your execution network." },
  { title: "Multi-Role System", desc: "One platform, seven roles: investor, bird-dog, vendor, agent, lender, contractor, and property manager. Each with a tailored dashboard." },
  { title: "Zero-Capital Pathways", desc: "Rental arbitrage, co-hosting, contract assignment, bird-dogging, and partner deals. Six proven paths to earn without owning property." },
];

const faqs = [
  {
    q: "Are PropertyCalc's calculators really free?",
    a: "Yes. Every calculator is 100% free with no usage limits, no mandatory sign-up, and no paywall gating results. We offer optional Pro features for power users, but the core tools will always be free.",
  },
  {
    q: "How accurate are the calculators?",
    a: "Our calculators are designed to get you within 10-15% of actual costs for most projects and markets. We use regional adjustments and real industry data. We recommend using our results as an informed starting point and always getting local quotes for major projects.",
  },
  {
    q: "What is the deal sourcing system?",
    a: "Anyone can submit a deal they've found. Our engine underwrites it (ROI, cash flow, risk scoring), assigns a grade (A through F), detects the best strategy, and routes it to matched investors. When the deal converts, the submitter earns a finder's fee.",
  },
  {
    q: "How do I make money on PropertyCalc without owning property?",
    a: "Through bird-dogging (finding deals for fees), rental arbitrage, co-hosting, contract assignment, or partnering with investors. Visit our Arbitrage Paths page to see all six zero-capital earning methods.",
  },
  {
    q: "How does the services marketplace work?",
    a: "Services are tied to deals, not standalone listings. When a deal is accepted, the platform automatically triggers service requests to matched contractors, lenders, property managers, and agents in the deal's area.",
  },
  {
    q: "Is PropertyCalc free to join?",
    a: "Yes. Free accounts get access to all calculators, deal browsing, and basic features. Pro membership unlocks premium deal access, unlimited messaging, advanced analytics, and priority deal routing.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-navy-300 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/80">About</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            About <span className="text-gradient">PropertyCalc</span>
          </h1>
          <p className="text-lg sm:text-xl text-navy-200 max-w-3xl mx-auto leading-relaxed">
            More than calculators. A complete real estate operating system — from deal sourcing
            to execution, built for every role in real estate.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-section-warm py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600 mb-4">Our Mission</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mb-6">
            Making real estate accessible, transparent, and profitable for everyone
          </h2>
          <p className="text-lg text-navy-600 leading-relaxed max-w-3xl mx-auto">
            PropertyCalc exists because access to accurate property tools and deal flow
            shouldn&apos;t require thousands in consulting fees or industry connections.
            Whether you&apos;re a first-time buyer running the numbers, a bird-dog sourcing
            deals, or an investor managing a portfolio — this platform is built for you.
          </p>
        </div>
      </section>

      {/* What we built */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-elevated p-8 sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-sage-600 mb-4">What We Built</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 mb-6">
              Not a calculator site. A deal + money + execution engine.
            </h2>
            <div className="space-y-4 text-navy-600 leading-relaxed">
              <p>
                PropertyCalc started as a set of free property calculators — mortgage, rental ROI,
                renovation costs, property tax comparisons. Tools that actually work, with real
                regional data, available to everyone.
              </p>
              <p>
                But calculators are just the beginning. We built a full operating system around
                them: a deal sourcing layer where anyone can submit and earn from deals, an
                underwriting engine that grades every deal automatically, a routing system
                that matches deals to investors, and a services marketplace that connects
                the entire execution chain — contractors, lenders, agents, property managers.
              </p>
              <p>
                The result is a platform where a bird-dog in Memphis can find a deal, submit it,
                have it underwritten and graded in seconds, get it routed to a matched investor
                in Indianapolis, trigger a contractor and lender in the deal&apos;s area, and
                earn a payout when it converts. That&apos;s what we mean by operating system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-section-cool py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="card text-center p-8">
                <p className="text-3xl sm:text-4xl font-extrabold text-gradient mb-2">{s.value}</p>
                <p className="text-sm font-medium text-navy-500 uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-600 mb-3">The Platform</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900">
              Every system works together
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformFeatures.map((f) => (
              <div key={f.title} className="card p-6">
                <h3 className="text-lg font-bold text-navy-900 mb-2">{f.title}</h3>
                <p className="text-sm text-navy-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="bg-section-warm py-16 sm:py-20 dotted-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-sage-600 mb-3">Our Methodology</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900">
              How we build tools you can trust
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {methodology.map((item) => (
              <div key={item.title} className="card p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-sage-100 text-sage-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-navy-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-navy-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Flow */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-navy-400 mb-3">How It All Connects</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mb-8">
            The complete deal lifecycle
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
            {['Bird-Dog Finds Deal', 'Submits to Platform', 'Engine Underwrites', 'Deal Gets Graded', 'Routed to Investors', 'Services Triggered', 'Deal Executes', 'Payout Distributed', 'Property → Portfolio'].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span className="bg-navy-950 text-white px-3 py-1.5 rounded-lg font-medium">{step}</span>
                {i < 8 && <span className="text-brand-600 font-bold">→</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-section-warm py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-600 mb-3">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900">
              Frequently asked questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="card p-6 sm:p-8">
                <h3 className="text-lg font-bold text-navy-900 mb-3">{faq.q}</h3>
                <p className="text-navy-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600 mb-3">Get in Touch</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mb-6">
            Questions or feedback?
          </h2>
          <p className="text-navy-500 mb-8 max-w-lg mx-auto">
            Have a question, found a bug, or want to partner with us? Reach out through our support center and we&apos;ll get back to you.
          </p>
          <Link href="/support" className="btn-primary">Visit Support Center →</Link>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-hero-gradient py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg text-navy-200 mb-8 max-w-2xl mx-auto">
            Create a free account, explore the calculators, browse deals, or submit your first deal today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/register" className="btn-primary">Create Free Account</Link>
            <Link href="/calculators" className="btn-secondary">Explore Calculators</Link>
          </div>
        </div>
      </section>
    </>
  );
}
