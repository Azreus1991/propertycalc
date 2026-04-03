'use client'

import Link from 'next/link'

const PATHS = [
  {
    icon: '🔄', title: 'Rental Arbitrage', tag: 'No Capital Needed',
    desc: 'Lease a property, then sublease it on Airbnb/VRBO for a profit. You never own the property.',
    steps: ['Find landlord open to subleasing', 'Negotiate master lease', 'Furnish & list on STR platforms', 'Profit from the spread'],
    earnings: '$1,000 - $5,000/mo per unit', risk: 'Low', capital: '$3K-$8K (furnishing)',
    example: 'Lease a 2BR condo at $1,500/mo → Airbnb at $3,800/mo = $2,300/mo profit'
  },
  {
    icon: '🤝', title: 'Co-Hosting', tag: 'Zero Capital',
    desc: 'Manage someone else\'s Airbnb listing. You handle guests, cleaning, pricing — they own the property.',
    steps: ['Find property owners who want passive income', 'Propose a co-hosting agreement', 'Manage listing, guests, and maintenance', 'Earn 20-40% of booking revenue'],
    earnings: '$500 - $3,000/mo per listing', risk: 'Very Low', capital: '$0',
    example: 'Co-host a beachfront condo generating $6K/mo → Your cut at 30% = $1,800/mo'
  },
  {
    icon: '📋', title: 'Contract Assignment (Wholesaling)', tag: 'No Capital',
    desc: 'Get a property under contract, then assign that contract to an investor for a fee.',
    steps: ['Find motivated sellers', 'Negotiate purchase contract', 'Find investor buyer', 'Assign contract for a fee ($5K-$30K+)'],
    earnings: '$5,000 - $30,000 per deal', risk: 'Medium', capital: '$0-$500 (earnest money)',
    example: 'Contract at $120K → Assign to investor at $135K = $15,000 assignment fee'
  },
  {
    icon: '🐕', title: 'Bird-Dogging', tag: 'Zero Capital',
    desc: 'Find deals and submit them to the platform. When they convert, you earn a finder\'s fee.',
    steps: ['Drive neighborhoods, check auctions, network', 'Submit deal to PropertyCalc', 'Platform underwrites and routes to investors', 'Earn $500-$5,000 per converted deal'],
    earnings: '$500 - $5,000 per deal', risk: 'Very Low', capital: '$0',
    example: 'Find off-market duplex → Submit to platform → Investor closes → You earn $3,500'
  },
  {
    icon: '🏗️', title: 'Partner Deals', tag: 'Sweat Equity',
    desc: 'Partner with an investor — you bring the deal and manage the project, they bring the capital.',
    steps: ['Find a great deal', 'Pitch to investor partners', 'Manage the project (rehab, tenanting)', 'Split profits 50/50 (or negotiate)'],
    earnings: '$10,000 - $50,000+ per deal', risk: 'Medium', capital: '$0',
    example: 'Find flip deal → Partner funds $200K → You manage rehab → Split $80K profit = $40K each'
  },
  {
    icon: '🏠', title: 'Property Management', tag: 'Service-Based',
    desc: 'Manage rental properties for investors. Earn 8-12% of rent collected as your fee.',
    steps: ['Get licensed (if required in your state)', 'List services on PropertyCalc', 'Get auto-matched when deals convert', 'Build a portfolio of managed properties'],
    earnings: '$100 - $300/door/month', risk: 'Very Low', capital: '$500-$2,000 (licensing)',
    example: 'Manage 30 doors at avg $1,200 rent × 10% = $3,600/mo passive income'
  },
]

export default function ArbitragePage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-hero-gradient py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="inline-block bg-white/10 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            No Capital Required
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Make Money Without Owning Property</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">Six proven paths to earn real estate income with zero or minimal capital. Start earning today.</p>
          <div className="flex gap-4 justify-center mt-8">
            <Link href="/auth/register" className="btn-primary">Get Started Free →</Link>
            <Link href="/deals" className="btn-secondary !bg-white/10 !text-white hover:!bg-white/20">Browse Deals</Link>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Stat bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Users Earning with $0 Capital', value: '4,200+' },
            { label: 'Total Earned (No Capital)', value: '$8.7M' },
            { label: 'Avg First Payout', value: '23 days' },
            { label: 'Active Arbitrage Deals', value: '847' },
          ].map(s => (
            <div key={s.label} className="text-center card">
              <div className="text-2xl font-black text-navy-950">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Paths */}
        <div className="space-y-8">
          {PATHS.map((path, i) => (
            <div key={path.title} className={`card-elevated ${i === 0 ? 'border-2 border-brand-200 bg-brand-50/30' : ''}`}>
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{path.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-navy-950">{path.title}</h2>
                        <span className="badge-brand text-xs">{path.tag}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{path.desc}</p>

                  <h3 className="text-sm font-bold text-navy-950 mb-2">How It Works</h3>
                  <ol className="space-y-1.5 mb-4">
                    {path.steps.map((step, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="bg-brand-100 text-brand-700 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{j + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>

                  <div className="bg-navy-50 rounded-xl p-3 text-sm">
                    <span className="font-semibold text-navy-950">Example: </span>
                    <span className="text-gray-600">{path.example}</span>
                  </div>
                </div>

                <div className="lg:w-56 flex-shrink-0">
                  <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <div>
                      <div className="text-xs text-gray-500">Earnings Potential</div>
                      <div className="font-bold text-emerald-700">{path.earnings}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Capital Needed</div>
                      <div className="font-bold text-navy-950">{path.capital}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Risk Level</div>
                      <div className={`font-bold ${path.risk === 'Very Low' ? 'text-emerald-600' : path.risk === 'Low' ? 'text-emerald-700' : 'text-yellow-600'}`}>{path.risk}</div>
                    </div>
                    <Link href="/deals/submit" className="btn-primary w-full text-center text-sm block !py-2">Start This Path →</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 card bg-navy-950 text-white text-center py-10">
          <h2 className="text-3xl font-black mb-2">Ready to Start Earning?</h2>
          <p className="text-white/70 max-w-lg mx-auto mb-6">Join thousands of people making real estate income without owning property. Pick a path and submit your first deal today.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/register" className="btn-primary">Create Free Account →</Link>
            <Link href="/deals" className="bg-white/10 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors">Browse Active Deals</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
