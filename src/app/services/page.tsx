'use client'

import { useState } from 'react'
import Link from 'next/link'

const CATEGORIES = [
  { key: 'all', label: 'All Services', icon: '🔍' },
  { key: 'contractor', label: 'Contractors', icon: '🔨' },
  { key: 'property_manager', label: 'Property Managers', icon: '🏠' },
  { key: 'lender', label: 'Lenders', icon: '🏦' },
  { key: 'agent', label: 'Agents', icon: '🤝' },
  { key: 'inspector', label: 'Inspectors', icon: '🔎' },
  { key: 'attorney', label: 'Attorneys', icon: '⚖️' },
  { key: 'insurance', label: 'Insurance', icon: '🛡️' },
  { key: 'title_company', label: 'Title Companies', icon: '📋' },
]

interface ServiceListing {
  id: string; name: string; company: string; category: string; tier: 'basic' | 'pro' | 'featured'
  rating: number; reviews: number; deals: number; price: string; areas: string[]
  specialties: string[]; response: string; verified: boolean
}

const SERVICES: ServiceListing[] = [
  { id: '1', name: 'Memphis Pro Rehab', company: 'MPR Construction LLC', category: 'contractor', tier: 'featured', rating: 4.9, reviews: 134, deals: 89, price: '$15K-$80K', areas: ['TN', 'MS', 'AR'], specialties: ['Full Rehab', 'Kitchen', 'BRRRR'], response: 'Same day', verified: true },
  { id: '2', name: 'FastFund Capital', company: 'FastFund Inc', category: 'lender', tier: 'featured', rating: 4.9, reviews: 312, deals: 540, price: '7.5-9.5% rate', areas: ['Nationwide'], specialties: ['Hard Money', 'Bridge', 'DSCR'], response: '2 hours', verified: true },
  { id: '3', name: 'Bluff City Property Mgmt', company: 'BCPM LLC', category: 'property_manager', tier: 'pro', rating: 4.7, reviews: 89, deals: 156, price: '8-10% of rent', areas: ['TN'], specialties: ['SFH', 'Multi-family', 'Section 8'], response: '24 hours', verified: true },
  { id: '4', name: 'TN Home Inspections', company: 'TNHI Corp', category: 'inspector', tier: 'pro', rating: 4.8, reviews: 201, deals: 423, price: '$350-$550', areas: ['TN', 'GA', 'AL'], specialties: ['Pre-purchase', 'Rehab scope', 'Mold'], response: 'Same day', verified: true },
  { id: '5', name: 'Pinnacle Real Estate', company: 'Pinnacle RE Group', category: 'agent', tier: 'featured', rating: 4.8, reviews: 178, deals: 267, price: '2.5-3% commission', areas: ['TN', 'GA'], specialties: ['Investment', 'Off-market', 'Wholesale'], response: '1 hour', verified: true },
  { id: '6', name: 'Heartland Title Services', company: 'HTS Inc', category: 'title_company', tier: 'pro', rating: 4.6, reviews: 67, deals: 890, price: '$800-$1,500', areas: ['TN', 'IN', 'OH'], specialties: ['Investor closings', 'Double close', 'Assignment'], response: '4 hours', verified: true },
  { id: '7', name: 'Shield Property Insurance', company: 'Shield Ins Agency', category: 'insurance', tier: 'basic', rating: 4.5, reviews: 45, deals: 234, price: '$800-$2,000/yr', areas: ['Nationwide'], specialties: ['Landlord', 'Flip', 'Vacancy'], response: 'Same day', verified: false },
  { id: '8', name: 'RE Investor Law', company: 'Johnson & Parks PLLC', category: 'attorney', tier: 'pro', rating: 4.7, reviews: 56, deals: 178, price: '$250-$500/hr', areas: ['TN', 'GA', 'AL', 'MS'], specialties: ['Entity formation', 'Contracts', 'Eviction'], response: '24 hours', verified: true },
  { id: '9', name: 'Buckeye Rehab Crew', company: 'BRC Contracting', category: 'contractor', tier: 'pro', rating: 4.6, reviews: 78, deals: 56, price: '$10K-$60K', areas: ['OH', 'IN', 'MI'], specialties: ['Cosmetic', 'Foundation', 'Electrical'], response: 'Next day', verified: true },
  { id: '10', name: 'National DSCR Lending', company: 'NDSCR Finance', category: 'lender', tier: 'basic', rating: 4.4, reviews: 89, deals: 312, price: '6.5-8.5% rate', areas: ['Nationwide'], specialties: ['DSCR', 'Portfolio', '30-yr fixed'], response: '4 hours', verified: true },
]

const TIER_BADGE = { featured: 'bg-brand-100 text-brand-700 border-brand-200', pro: 'bg-navy-100 text-navy-700 border-navy-200', basic: 'bg-gray-100 text-gray-600 border-gray-200' }

export default function ServicesPage() {
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = SERVICES
    .filter(s => category === 'all' || s.category === category)
    .filter(s => !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.specialties.some(sp => sp.toLowerCase().includes(search.toLowerCase())))
    .sort((a, b) => {
      const tierOrder = { featured: 0, pro: 1, basic: 2 }
      return tierOrder[a.tier] - tierOrder[b.tier]
    })

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-hero-gradient py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-white/70 mb-4">
            <Link href="/" className="hover:text-white">Home</Link><span>/</span>
            <span className="text-white">Services Marketplace</span>
          </div>
          <h1 className="text-4xl font-black text-white mb-2">Services Marketplace</h1>
          <p className="text-white/80 max-w-2xl">Vetted contractors, lenders, agents, and service providers connected directly to your deals. Not standalone listings — these are your execution network.</p>
          <div className="mt-6 max-w-xl">
            <input className="w-full px-5 py-3 rounded-xl text-navy-950 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Search services, specialties..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Categories */}
        <div className="flex overflow-x-auto gap-2 mb-8 pb-2">
          {CATEGORIES.map(c => (
            <button key={c.key} onClick={() => setCategory(c.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                category === c.key ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              <span>{c.icon}</span>{c.label}
            </button>
          ))}
        </div>

        {/* How it connects to deals */}
        <div className="card bg-navy-50 border border-navy-100 mb-8">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <h3 className="font-bold text-navy-950 text-sm">Services are tied to deals, not standalone</h3>
              <p className="text-xs text-gray-600">When a deal is accepted, services are automatically triggered — contractors, lenders, PMs, and agents are matched and notified.</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {filtered.map(svc => (
              <div key={svc.id} className={`card hover:shadow-lg transition-shadow ${svc.tier === 'featured' ? 'border-2 border-brand-200 bg-brand-50/30' : ''}`}>
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-navy-100 flex items-center justify-center text-2xl flex-shrink-0">
                    {CATEGORIES.find(c => c.key === svc.category)?.icon || '🔧'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-navy-950">{svc.name}</h3>
                      {svc.verified && <span className="text-emerald-500 text-xs">✓ Verified</span>}
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border capitalize ${TIER_BADGE[svc.tier]}`}>{svc.tier}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{svc.company} • {svc.areas.join(', ')} • Response: {svc.response}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {svc.specialties.map(s => <span key={s} className="badge-sage text-xs">{s}</span>)}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="text-yellow-500">{'★'.repeat(Math.round(svc.rating))} <span className="text-gray-500">{svc.rating} ({svc.reviews})</span></span>
                      <span>{svc.deals} deals completed</span>
                      <span className="font-semibold text-navy-950">{svc.price}</span>
                    </div>
                  </div>
                  <div className="flex md:flex-col gap-2">
                    <button className="btn-primary text-xs !py-2 !px-4">Request Quote</button>
                    <button className="btn-secondary text-xs !py-2 !px-4">View Profile</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="card-elevated bg-gradient-to-br from-brand-500 to-brand-700 text-white text-center">
              <h3 className="font-bold text-lg mb-1">List Your Services</h3>
              <p className="text-sm text-white/80 mb-4">Get leads directly from active deals. Join our execution network.</p>
              <div className="space-y-2 text-sm text-left mb-4">
                {[
                  { tier: 'Basic', price: 'Free', features: 'Profile + 5 leads/mo' },
                  { tier: 'Pro', price: '$49/mo', features: 'Unlimited leads + priority' },
                  { tier: 'Featured', price: '$199/mo', features: 'Top placement + deal alerts' },
                ].map(t => (
                  <div key={t.tier} className="bg-white/10 rounded-lg p-3">
                    <div className="flex justify-between"><span className="font-bold">{t.tier}</span><span>{t.price}</span></div>
                    <div className="text-xs text-white/70">{t.features}</div>
                  </div>
                ))}
              </div>
              <button className="bg-white text-brand-600 font-bold px-6 py-2 rounded-lg text-sm hover:bg-brand-50 transition-colors">Get Listed →</button>
            </div>

            <div className="card">
              <h3 className="font-bold text-navy-950 mb-3">Platform Stats</h3>
              <div className="space-y-2 text-sm">
                {[['Active Providers', '2,847'], ['Deals Serviced', '12,400+'], ['Avg Response Time', '4.2 hours'], ['Avg Rating', '4.7/5']].map(([l, v]) => (
                  <div key={l} className="flex justify-between"><span className="text-gray-500">{l}</span><span className="font-bold text-navy-950">{v}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
