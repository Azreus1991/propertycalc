import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Free, Pro & Business Plans for Property Owners & Professionals",
  description:
    "PropertyCalc is free for everyone. Upgrade to Pro for portfolio tracking, premium content, advanced analytics, and an ad-free experience. Business plans for teams.",
};

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Everything you need to get started with smarter property decisions.",
    features: [
      { text: "All 12+ calculators", included: true },
      { text: "Community forum access", included: true },
      { text: "Browse listings & jobs", included: true },
      { text: "Weekly newsletter", included: true },
      { text: "Basic market data", included: true },
      { text: "5 saved reports/month", included: true },
      { text: "Free guide downloads", included: true },
      { text: "Vendor directory access", included: true },
      { text: "Portfolio dashboard", included: false },
      { text: "Advanced analytics", included: false },
      { text: "Premium courses", included: false },
      { text: "Document templates", included: false },
      { text: "Ad-free experience", included: false },
    ],
    cta: "Get Started Free",
    href: "/calculators",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    annualPrice: "$15",
    desc: "For serious investors and landlords who want the full toolkit.",
    features: [
      { text: "Everything in Free", included: true },
      { text: "Unlimited saved reports", included: true },
      { text: "Portfolio dashboard", included: true },
      { text: "Advanced analytics & charts", included: true },
      { text: "Priority forum support", included: true },
      { text: "All premium courses", included: true },
      { text: "All document templates", included: true },
      { text: "Neighborhood market data", included: true },
      { text: "Export to PDF/Excel", included: true },
      { text: "Ad-free experience", included: true },
      { text: "Early access to new tools", included: true },
      { text: "Email support", included: true },
    ],
    cta: "Start 14-Day Free Trial",
    href: "#",
    highlighted: true,
  },
  {
    name: "Business",
    price: "$49",
    period: "/month",
    annualPrice: "$39",
    desc: "For property management firms, brokerages, and teams.",
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Team collaboration (5 seats)", included: true },
      { text: "Featured vendor listing", included: true },
      { text: "Branded reports & exports", included: true },
      { text: "API access", included: true },
      { text: "White-label calculator widgets", included: true },
      { text: "Priority support", included: true },
      { text: "Custom integrations", included: true },
      { text: "5 job board posting credits/mo", included: true },
      { text: "Team analytics dashboard", included: true },
      { text: "SSO & admin controls", included: true },
      { text: "Dedicated account manager", included: true },
    ],
    cta: "Contact Sales",
    href: "#",
    highlighted: false,
  },
];

const faqs = [
  { q: "Is PropertyCalc really free?", a: "Yes. All 12+ calculators, the community forum, browsing listings and jobs, and basic market data are completely free — forever. We believe everyone deserves access to quality property tools." },
  { q: "What does the 14-day free trial include?", a: "Everything in the Pro plan, no restrictions. You get full access to the portfolio dashboard, all premium courses, document templates, advanced analytics, and the ad-free experience. Cancel anytime during the trial and you won't be charged." },
  { q: "Can I cancel my subscription at any time?", a: "Absolutely. There are no contracts or cancellation fees. Cancel from your account settings and you'll retain access until the end of your billing period." },
  { q: "What payment methods do you accept?", a: "We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover), as well as PayPal. Annual plans are also available at a discounted rate." },
  { q: "Do you offer discounts for annual billing?", a: "Yes. Annual plans save you about 20%. Pro is $15/month (billed annually at $180) and Business is $39/month (billed annually at $468)." },
  { q: "Can I upgrade or downgrade at any time?", a: "Yes. Changes take effect at the start of your next billing cycle. If you upgrade mid-cycle, you'll be prorated for the remaining days." },
];

export default function PricingPage() {
  return (
    <>
      <section className="bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 dotted-bg opacity-[0.04]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <div className="badge badge-brand mx-auto mb-4">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Simple Pricing
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight max-w-2xl mx-auto">
            Free for everyone.{" "}
            <span className="text-gradient">Pro for power users.</span>
          </h1>
          <p className="mt-4 text-lg text-slate-300 max-w-xl mx-auto">
            Most features are completely free. Upgrade for the full toolkit — portfolio
            tracking, premium content, advanced analytics, and more.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl p-7 ${
                tier.highlighted
                  ? "bg-navy-950 text-white ring-2 ring-brand-500 shadow-2xl shadow-brand-500/15 relative scale-[1.02]"
                  : "card"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="badge bg-brand-500 text-white shadow-lg shadow-brand-500/25">Most Popular</span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-lg font-bold ${tier.highlighted ? "text-white" : "text-navy-950"}`}>
                  {tier.name}
                </h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className={`text-5xl font-black ${tier.highlighted ? "text-white" : "text-navy-950"}`}>
                    {tier.price}
                  </span>
                  <span className={`text-sm ${tier.highlighted ? "text-slate-400" : "text-slate-500"}`}>
                    {tier.period}
                  </span>
                </div>
                {"annualPrice" in tier && tier.annualPrice && (
                  <div className={`text-sm mt-1 ${tier.highlighted ? "text-brand-300" : "text-brand-600"}`}>
                    or {tier.annualPrice}/mo billed annually (save 20%)
                  </div>
                )}
                <p className={`mt-3 text-sm leading-relaxed ${tier.highlighted ? "text-slate-300" : "text-slate-500"}`}>
                  {tier.desc}
                </p>
              </div>

              <Link
                href={tier.href}
                className={`block text-center py-3.5 px-6 rounded-[0.625rem] font-semibold text-sm transition-all mb-8 ${
                  tier.highlighted
                    ? "bg-brand-500 text-white hover:bg-brand-400 shadow-lg shadow-brand-500/25"
                    : tier.name === "Free"
                    ? "bg-navy-950 text-white hover:bg-navy-900"
                    : "bg-slate-100 text-navy-950 hover:bg-slate-200"
                }`}
              >
                {tier.cta}
              </Link>

              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-2.5">
                    {feature.included ? (
                      <svg className={`w-4 h-4 mt-0.5 shrink-0 ${tier.highlighted ? "text-brand-400" : "text-sage-500"}`} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 mt-0.5 shrink-0 text-slate-300" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    <span className={`text-sm ${
                      feature.included
                        ? tier.highlighted ? "text-slate-300" : "text-slate-600"
                        : "text-slate-400 line-through"
                    }`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison note */}
      <section className="bg-section-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl font-extrabold text-navy-950">
            Not sure which plan is right for you?
          </h2>
          <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
            Start with Free — it includes everything most homeowners need. If you manage
            multiple properties, invest actively, or want premium content and portfolio tools,
            Pro is the way to go. Business is for teams and property management firms.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white border-y border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 text-center mb-12 tracking-tight">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-b border-slate-100 pb-6">
                <h3 className="text-base font-bold text-navy-950">{faq.q}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-hero-gradient rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 dotted-bg opacity-[0.03]" />
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Start making smarter property decisions today
            </h2>
            <p className="mt-3 text-slate-300 max-w-lg mx-auto">
              Join 50,000+ homeowners and investors already using PropertyCalc.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link href="/calculators" className="btn-primary">
                Get Started Free
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
