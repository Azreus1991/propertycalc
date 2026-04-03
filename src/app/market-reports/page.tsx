import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Market Reports — 2026 Housing Data & Trends",
  description:
    "Free real estate market reports with median home prices, mortgage rates, inventory levels, and top market rankings. Updated monthly with national and city-level housing data.",
  openGraph: {
    title: "Real Estate Market Reports — 2026 Housing Data | PropertyCalc",
    description:
      "Track housing market trends with monthly reports. Median home prices, mortgage rates, days on market, and top 10 hottest markets nationwide.",
  },
};

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const nationalStats = [
  { label: "Median Home Price", value: "$412,300", change: "+3.8%", direction: "up" as const },
  { label: "YoY Price Change", value: "+3.8%", change: "vs +4.2% last year", direction: "neutral" as const },
  { label: "Avg Days on Market", value: "34", change: "-3 days", direction: "down" as const },
  { label: "30-Yr Mortgage Rate", value: "5.87%", change: "+0.12%", direction: "up" as const },
  { label: "Active Inventory", value: "1.28M", change: "+11.4%", direction: "up" as const },
];

type MarketTemp = "Hot" | "Warm" | "Cool";

const topMarkets: {
  rank: number;
  city: string;
  state: string;
  medianPrice: string;
  yoyChange: string;
  changeNum: number;
  daysOnMarket: number;
  temp: MarketTemp;
}[] = [
  { rank: 1, city: "Austin", state: "TX", medianPrice: "$478,500", yoyChange: "+7.2%", changeNum: 7.2, daysOnMarket: 21, temp: "Hot" },
  { rank: 2, city: "Raleigh", state: "NC", medianPrice: "$425,000", yoyChange: "+6.8%", changeNum: 6.8, daysOnMarket: 24, temp: "Hot" },
  { rank: 3, city: "Boise", state: "ID", medianPrice: "$462,700", yoyChange: "+6.1%", changeNum: 6.1, daysOnMarket: 19, temp: "Hot" },
  { rank: 4, city: "Nashville", state: "TN", medianPrice: "$445,200", yoyChange: "+5.7%", changeNum: 5.7, daysOnMarket: 26, temp: "Hot" },
  { rank: 5, city: "Tampa", state: "FL", medianPrice: "$389,900", yoyChange: "+5.3%", changeNum: 5.3, daysOnMarket: 28, temp: "Warm" },
  { rank: 6, city: "Phoenix", state: "AZ", medianPrice: "$438,100", yoyChange: "+4.9%", changeNum: 4.9, daysOnMarket: 30, temp: "Warm" },
  { rank: 7, city: "Charlotte", state: "NC", medianPrice: "$398,600", yoyChange: "+4.5%", changeNum: 4.5, daysOnMarket: 31, temp: "Warm" },
  { rank: 8, city: "Denver", state: "CO", medianPrice: "$572,400", yoyChange: "+3.1%", changeNum: 3.1, daysOnMarket: 37, temp: "Warm" },
  { rank: 9, city: "San Antonio", state: "TX", medianPrice: "$318,700", yoyChange: "+2.4%", changeNum: 2.4, daysOnMarket: 42, temp: "Cool" },
  { rank: 10, city: "Minneapolis", state: "MN", medianPrice: "$362,500", yoyChange: "+1.8%", changeNum: 1.8, daysOnMarket: 45, temp: "Cool" },
];

const tempColors: Record<MarketTemp, string> = {
  Hot: "badge-brand",
  Warm: "badge-sage",
  Cool: "badge-navy",
};

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function MarketReportsPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="bg-hero-gradient py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-navy-300 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/80">Market Reports</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            Real Estate <span className="text-gradient">Market Reports</span>
          </h1>
          <p className="text-lg sm:text-xl text-navy-200 max-w-3xl mx-auto leading-relaxed">
            Free monthly housing market data. National trends, top markets, mortgage rates,
            and inventory levels updated for April 2026.
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <span className="badge badge-brand">April 2026</span>
            <span className="badge badge-sage">Updated Monthly</span>
          </div>
        </div>
      </section>

      {/* ── National Overview ────────────────────────── */}
      <section className="bg-section-warm py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-600 mb-3">National Overview</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900">
              U.S. Housing Market at a Glance
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {nationalStats.map((stat) => (
              <div key={stat.label} className="card-elevated p-5 sm:p-6 text-center">
                <p className="text-2xl sm:text-3xl font-extrabold text-navy-900 mb-1">{stat.value}</p>
                <p className="text-xs font-semibold uppercase tracking-wide text-navy-400 mb-2">
                  {stat.label}
                </p>
                <p
                  className={`text-xs font-medium ${
                    stat.direction === "up"
                      ? "text-brand-600"
                      : stat.direction === "down"
                      ? "text-sage-600"
                      : "text-navy-400"
                  }`}
                >
                  {stat.change}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Top 10 Markets ───────────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-sage-600 mb-3">Rankings</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900">
              Top 10 Markets — April 2026
            </h2>
            <p className="text-navy-500 mt-3 max-w-2xl mx-auto">
              Ranked by year-over-year price appreciation. Market temperature reflects
              price growth rate, days on market, and inventory-to-sales ratio.
            </p>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block card-elevated overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-navy-50 text-left">
                  <th className="px-6 py-4 text-xs font-bold text-navy-500 uppercase tracking-wider">#</th>
                  <th className="px-6 py-4 text-xs font-bold text-navy-500 uppercase tracking-wider">Market</th>
                  <th className="px-6 py-4 text-xs font-bold text-navy-500 uppercase tracking-wider text-right">Median Price</th>
                  <th className="px-6 py-4 text-xs font-bold text-navy-500 uppercase tracking-wider text-right">YoY Change</th>
                  <th className="px-6 py-4 text-xs font-bold text-navy-500 uppercase tracking-wider text-right">Days on Market</th>
                  <th className="px-6 py-4 text-xs font-bold text-navy-500 uppercase tracking-wider text-center">Temperature</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-100">
                {topMarkets.map((market) => (
                  <tr key={market.rank} className="hover:bg-warm-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-navy-300">{market.rank}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-navy-900">{market.city}</span>
                      <span className="text-navy-400 ml-1">{market.state}</span>
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-navy-900">
                      {market.medianPrice}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`font-semibold ${market.changeNum >= 5 ? "text-brand-600" : market.changeNum >= 3 ? "text-sage-600" : "text-navy-500"}`}>
                        {market.yoyChange}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-navy-600">
                      {market.daysOnMarket} days
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`badge ${tempColors[market.temp]}`}>{market.temp}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4">
            {topMarkets.map((market) => (
              <div key={market.rank} className="card-elevated p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-navy-100 text-navy-500 flex items-center justify-center text-sm font-bold">
                      {market.rank}
                    </span>
                    <div>
                      <span className="font-bold text-navy-900">{market.city}</span>
                      <span className="text-navy-400 ml-1 text-sm">{market.state}</span>
                    </div>
                  </div>
                  <span className={`badge ${tempColors[market.temp]}`}>{market.temp}</span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-xs text-navy-400 uppercase tracking-wide">Price</p>
                    <p className="text-sm font-bold text-navy-900">{market.medianPrice}</p>
                  </div>
                  <div>
                    <p className="text-xs text-navy-400 uppercase tracking-wide">YoY</p>
                    <p className={`text-sm font-bold ${market.changeNum >= 5 ? "text-brand-600" : "text-sage-600"}`}>
                      {market.yoyChange}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-navy-400 uppercase tracking-wide">DOM</p>
                    <p className="text-sm font-bold text-navy-600">{market.daysOnMarket}d</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Market Trends ────────────────────────────── */}
      <section className="bg-section-cool py-16 sm:py-20 dotted-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-navy-400 mb-3">Analysis</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900">
              Market Trends — Spring 2026
            </h2>
          </div>
          <div className="space-y-6">
            <div className="card p-6 sm:p-8">
              <h3 className="text-lg font-bold text-navy-900 mb-3">Price Growth Is Decelerating, But Not Declining</h3>
              <p className="text-navy-500 leading-relaxed">
                National home prices rose 3.8% year-over-year in Q1 2026, down from the 4.2% pace
                seen in late 2025. The slowdown is being driven by rising inventory levels, which
                climbed 11.4% nationally as more sellers enter the market after years of holding.
                However, prices remain firmly supported by strong employment numbers and persistent
                housing underbuilding in key metro areas. A price correction is not in the data;
                this is a normalization toward sustainable growth.
              </p>
            </div>
            <div className="card p-6 sm:p-8">
              <h3 className="text-lg font-bold text-navy-900 mb-3">Mortgage Rates Stabilizing in the High-5% Range</h3>
              <p className="text-navy-500 leading-relaxed">
                The 30-year fixed rate has hovered between 5.7% and 6.1% since January 2026, settling
                at 5.87% as of late March. The Fed has signaled a pause in rate adjustments, and bond
                markets appear to be pricing in stability through mid-2026. For buyers, this is a
                significant improvement over the 7%+ rates seen in 2023-2024, though still above the
                sub-3% era that many sellers locked in. The rate spread is keeping existing homeowners
                reluctant to sell, which continues to suppress inventory in the lowest price tiers.
              </p>
            </div>
            <div className="card p-6 sm:p-8">
              <h3 className="text-lg font-bold text-navy-900 mb-3">Sun Belt and Secondary Cities Lead Appreciation</h3>
              <p className="text-navy-500 leading-relaxed">
                Austin, Raleigh, Boise, and Nashville are outperforming the national average
                by 2-3 percentage points. The pattern continues: markets with strong job growth,
                favorable tax environments, and relative affordability compared to coastal metros
                are attracting both domestic migration and investor capital. Meanwhile, high-cost
                metros like San Francisco and New York are seeing flatter appreciation as
                affordability ceilings compress buyer pools. For investors, the spread between
                Sun Belt cap rates and coastal cap rates remains near a 15-year high.
              </p>
            </div>
            <div className="card p-6 sm:p-8">
              <h3 className="text-lg font-bold text-navy-900 mb-3">Inventory Recovery Is Uneven</h3>
              <p className="text-navy-500 leading-relaxed">
                While national active inventory is up 11.4%, the recovery is concentrated in the
                $400K-$700K segment. Entry-level homes (under $300K) remain severely constrained,
                with many markets sitting at under two months of supply. New construction is helping
                but remains focused on the mid-to-upper price points where builder margins are
                healthier. First-time buyers continue to face the tightest conditions, particularly
                in metros where institutional investors absorbed a significant share of starter
                homes during 2020-2023.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Newsletter CTA ───────────────────────────── */}
      <section className="bg-hero-gradient py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Get Monthly Market Reports
          </h2>
          <p className="text-lg text-navy-200 mb-8 max-w-xl mx-auto">
            National data, top market rankings, and trend analysis delivered to your inbox
            on the first Tuesday of every month. Free forever.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="you@email.com"
              className="w-full sm:flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-navy-300 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
            />
            <button className="btn-primary whitespace-nowrap w-full sm:w-auto">Subscribe Free</button>
          </div>
          <p className="text-xs text-navy-300 mt-4">No spam. Unsubscribe anytime. We never share your email.</p>
        </div>
      </section>

      {/* ── Pro Teaser ───────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-elevated p-8 sm:p-12 flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1">
              <span className="badge badge-brand mb-4 inline-block">Pro Feature</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 mb-4">
                Neighborhood-level data available for Pro members
              </h2>
              <p className="text-navy-500 leading-relaxed mb-6">
                Free reports cover national and metro-level data. PropertyCalc Pro unlocks
                ZIP code and neighborhood-level market reports with hyper-local pricing,
                rental yield estimates, and investment scoring for every neighborhood in the
                top 100 metros.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  "ZIP code-level median price and trends",
                  "Rental yield estimates by neighborhood",
                  "Investor score (1-100) for every ZIP",
                  "School district and walkability overlays",
                  "Downloadable CSV data exports",
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-navy-600">
                    <svg className="w-5 h-5 text-sage-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/pro" className="btn-primary">
                Upgrade to Pro
              </Link>
            </div>
            <div className="w-full lg:w-80 flex-shrink-0">
              <div className="bg-navy-50 rounded-2xl p-6 space-y-4">
                <p className="text-xs font-bold text-navy-400 uppercase tracking-wider">Sample: 78701 (Austin, TX)</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-navy-500">Median Price</span>
                    <span className="text-sm font-bold text-navy-900">$542,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-navy-500">Avg Rent (2BR)</span>
                    <span className="text-sm font-bold text-navy-900">$2,180/mo</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-navy-500">Gross Yield</span>
                    <span className="text-sm font-bold text-sage-600">4.83%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-navy-500">Investor Score</span>
                    <span className="text-sm font-bold text-brand-600">78/100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-navy-500">YoY Appreciation</span>
                    <span className="text-sm font-bold text-brand-600">+8.1%</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-navy-200">
                  <div className="h-2 bg-navy-200 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-500 rounded-full" style={{ width: "78%" }} />
                  </div>
                  <p className="text-xs text-navy-400 mt-1 text-center">Investment Score: Strong Buy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────── */}
      <section className="bg-section-warm py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 mb-4">
            Make data-driven property decisions
          </h2>
          <p className="text-navy-500 mb-8 max-w-xl mx-auto">
            Pair market data with our free calculators to analyze deals, budget for
            maintenance, and evaluate investments with confidence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/calculators" className="btn-primary">
              Explore Calculators
            </Link>
            <Link href="/templates" className="btn-secondary">
              Download Templates
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
