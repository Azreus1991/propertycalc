import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About PropertyCalc — Our Mission, Team & Methodology",
  description:
    "PropertyCalc is the most trusted free property toolkit in America. Learn about our team, methodology, data sources, and mission to make property ownership smarter for everyone.",
  openGraph: {
    title: "About PropertyCalc — Our Mission, Team & Methodology",
    description:
      "Meet the team behind America's most comprehensive free property calculators. Learn about our methodology, data sources, and commitment to transparency.",
  },
};

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const team = [
  {
    initials: "MR",
    name: "Marcus Rivera",
    title: "CEO & Founder",
    bio: "Former property manager who spent 15 years wishing better tools existed. Built PropertyCalc after one too many spreadsheets broke at 2 AM before a client meeting.",
    accent: "bg-brand-100 text-brand-700",
  },
  {
    initials: "SL",
    name: "Sarah Lindgren",
    title: "Head of Product",
    bio: "Ex-Zillow product lead. Obsessed with making complex real estate math feel effortless. Turned down three FAANG offers to join PropertyCalc at employee #3.",
    accent: "bg-navy-100 text-navy-700",
  },
  {
    initials: "JP",
    name: "James Park",
    title: "Lead Data Analyst",
    bio: "MIT-trained data scientist with a side hustle flipping houses. Builds the pricing models and regional datasets that power every calculator on the platform.",
    accent: "bg-sage-100 text-sage-700",
  },
  {
    initials: "TW",
    name: "Tanya Washington",
    title: "Community Manager",
    bio: "Licensed real estate agent and landlord of 12 units. Runs the forum, vendor vetting process, and makes sure every user question gets a real answer.",
    accent: "bg-warm-200 text-warm-800",
  },
];

const stats = [
  { value: "50,000+", label: "Monthly Users" },
  { value: "12+", label: "Free Calculators" },
  { value: "50", label: "States Covered" },
  { value: "1,200+", label: "Verified Vendors" },
];

const methodology = [
  {
    title: "Real Industry Data",
    desc: "Every calculation references pricing databases updated quarterly from contractor surveys, MLS feeds, government sources, and manufacturer MSRP data across all 50 states.",
    icon: "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125",
  },
  {
    title: "Regional Pricing",
    desc: "National averages lie. Our calculators factor in your specific ZIP code, county labor rates, local permit costs, and regional material availability so you get numbers that actually match your market.",
    icon: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z",
  },
  {
    title: "Professional Methodology",
    desc: "Our formulas mirror the same approaches used by certified appraisers, general contractors, and CPA-prepared investment analyses. No shortcuts, no oversimplifications.",
    icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
  },
  {
    title: "Peer Reviewed",
    desc: "Every calculator is stress-tested by licensed contractors, real estate attorneys, and CPAs before launch. We publish our methodology openly so anyone can verify our work.",
    icon: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
  },
];

const trustSignals = [
  {
    title: "Transparent Data Sources",
    desc: "We cite every data source. Census Bureau, BLS, RSMeans, local MLS feeds, and proprietary contractor surveys. No black boxes.",
  },
  {
    title: "Open Methodology",
    desc: "Our formulas, assumptions, and regional adjustment factors are documented publicly. If we got something wrong, we want to know.",
  },
  {
    title: "Zero Conflicts of Interest",
    desc: "We never take referral fees that influence calculator results. If we recommend a vendor, it is because they earned it through reviews and vetting, not payments.",
  },
  {
    title: "Privacy Commitment",
    desc: "We do not sell your data. Period. Your property details, calculations, and personal information stay between you and PropertyCalc.",
  },
];

const pressFeatures = [
  { name: "Real Estate Weekly", quote: "The Swiss Army knife of property ownership tools." },
  { name: "Property Management Insider", quote: "Finally, institutional-grade calculators that anyone can use for free." },
  { name: "HomeOwner Magazine", quote: "PropertyCalc eliminates the guesswork from every home maintenance budget." },
  { name: "Investor's Digest", quote: "A must-bookmark for anyone serious about rental property analysis." },
];

const faqs = [
  {
    q: "Are PropertyCalc's calculators really free?",
    a: "Yes. Every calculator on the platform is 100% free with no usage limits, no mandatory sign-up, and no paywall gating the results. We offer optional Pro features for power users, but the core tools will always be free.",
  },
  {
    q: "Where does PropertyCalc get its data?",
    a: "Our pricing data comes from a combination of U.S. Census Bureau records, Bureau of Labor Statistics wage data, RSMeans construction cost databases, local MLS feeds, manufacturer pricing, and proprietary surveys of over 3,000 contractors nationwide. Data is refreshed quarterly.",
  },
  {
    q: "How accurate are the calculators?",
    a: "Our calculators are designed to get you within 10-15% of actual costs for most projects and markets. We use regional adjustments down to the ZIP code level. That said, every property is unique. We recommend using our results as an informed starting point and always getting local quotes for major projects.",
  },
  {
    q: "Can I use PropertyCalc for commercial properties?",
    a: "Most of our calculators are optimized for residential properties (1-4 units). However, our Rental ROI, Mortgage, and Property Tax calculators work well for small commercial properties too. We are actively building a dedicated commercial property suite for 2026.",
  },
  {
    q: "How do I report an error or suggest an improvement?",
    a: "We take accuracy seriously. Email us at feedback@propertycalc.com with the calculator name, your inputs, and what you believe the correct output should be. Our data team investigates every report, usually within 48 hours.",
  },
  {
    q: "Does PropertyCalc offer an API or white-label solution?",
    a: "Yes. We offer API access and white-label calculator embeds for property management companies, brokerages, and real estate media sites. Contact partnerships@propertycalc.com for details and pricing.",
  },
];

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────── */}
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
            The most comprehensive free property toolkit in America. Built by property people,
            for property people.
          </p>
        </div>
      </section>

      {/* ── Mission ──────────────────────────────────── */}
      <section className="bg-section-warm py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600 mb-4">Our Mission</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mb-6">
            Making property ownership smarter for everyone in America
          </h2>
          <p className="text-lg text-navy-600 leading-relaxed max-w-3xl mx-auto">
            Every year, American homeowners and investors collectively waste billions on bad
            estimates, surprise repair bills, and uninformed investment decisions. We believe
            that access to accurate, professional-grade property tools should not cost thousands
            in consulting fees or require a real estate license. PropertyCalc exists to close
            that gap permanently.
          </p>
        </div>
      </section>

      {/* ── Our Story ────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-elevated p-8 sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-sage-600 mb-4">Our Story</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 mb-6">
              Born from frustration, built with obsession
            </h2>
            <div className="space-y-4 text-navy-600 leading-relaxed">
              <p>
                PropertyCalc started in 2023 when our founder, Marcus Rivera, was managing a portfolio
                of 40 rental units and realized he was toggling between seven different spreadsheets,
                three outdated websites, and a $200/month software subscription just to answer basic
                questions about his properties.
              </p>
              <p>
                The gap was obvious: scattered, low-quality tools on one side and expensive professional
                advice on the other. Nothing in between for the millions of property owners who just
                need accurate numbers without the overhead.
              </p>
              <p>
                So Marcus built the first calculator on a weekend. Then three more. Then a data pipeline
                that pulled real contractor pricing by region. By the time the prototype had 500 users
                a month, he knew this was bigger than a side project. He recruited Sarah from Zillow
                and James from MIT, and PropertyCalc launched publicly in early 2024.
              </p>
              <p>
                Today, over 50,000 property owners, landlords, and investors use PropertyCalc every
                month. The calculators are still free. The data is still transparent. And we are still
                obsessed with giving you better numbers than the pros charge for.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Stats ────────────────────────────────── */}
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

      {/* ── Team ─────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-600 mb-3">The Team</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900">
              Property people building property tools
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="card-elevated p-6 text-center">
                <div
                  className={`w-16 h-16 rounded-full ${member.accent} flex items-center justify-center text-xl font-bold mx-auto mb-4`}
                >
                  {member.initials}
                </div>
                <h3 className="text-lg font-bold text-navy-900">{member.name}</h3>
                <p className="text-sm font-semibold text-brand-600 mb-3">{member.title}</p>
                <p className="text-sm text-navy-500 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Methodology ──────────────────────────────── */}
      <section className="bg-section-warm py-16 sm:py-20 dotted-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-sage-600 mb-3">Our Methodology</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900">
              How we build calculators you can actually trust
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

      {/* ── Trust Signals ────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-navy-400 mb-3">Why Trust Us</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900">
              Accuracy without the asterisks
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {trustSignals.map((signal) => (
              <div key={signal.title} className="card p-6 border-l-4 border-l-brand-500">
                <h3 className="text-lg font-bold text-navy-900 mb-2">{signal.title}</h3>
                <p className="text-sm text-navy-500 leading-relaxed">{signal.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── In the Press ─────────────────────────────── */}
      <section className="bg-section-cool py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-600 mb-3">In the Press</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900">
              What people are saying
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pressFeatures.map((press) => (
              <div key={press.name} className="card-elevated p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-navy-100 text-navy-600 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-navy-900 mb-2">{press.name}</h3>
                <p className="text-sm text-navy-500 italic leading-relaxed">&ldquo;{press.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600 mb-3">Get in Touch</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mb-6">
            We actually read every email
          </h2>
          <div className="card-elevated p-8 sm:p-10 inline-block text-left">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-navy-400 uppercase tracking-wide font-medium">General Inquiries</p>
                  <p className="text-navy-900 font-semibold">hello@propertycalc.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-sage-100 text-sage-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-navy-400 uppercase tracking-wide font-medium">Feedback & Corrections</p>
                  <p className="text-navy-900 font-semibold">feedback@propertycalc.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-navy-100 text-navy-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-navy-400 uppercase tracking-wide font-medium">Partnerships & API</p>
                  <p className="text-navy-900 font-semibold">partnerships@propertycalc.com</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-navy-100">
              <span className="text-sm text-navy-400 font-medium">Follow us:</span>
              <span className="badge badge-brand">Twitter/X</span>
              <span className="badge badge-navy">LinkedIn</span>
              <span className="badge badge-sage">YouTube</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
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

      {/* ── Bottom CTA ───────────────────────────────── */}
      <section className="bg-hero-gradient py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to make smarter property decisions?
          </h2>
          <p className="text-lg text-navy-200 mb-8 max-w-2xl mx-auto">
            Join 50,000+ property owners who trust PropertyCalc for accurate, free tools
            backed by real data.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/calculators" className="btn-primary">
              Explore Calculators
            </Link>
            <Link href="/forum" className="btn-secondary">
              Join the Community
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
