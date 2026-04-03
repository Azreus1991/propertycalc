'use client'

import { useState } from 'react'
import Link from 'next/link'

type DealType = 'bird_dog' | 'wholesale' | 'arbitrage' | 'flip' | 'rental' | 'brrrr'
type Grade = 'A' | 'B' | 'C' | 'D' | 'F'

interface MockDeal {
  id: string; title: string; city: string; state: string; deal_type: DealType
  grade: Grade; asking_price: number; arv: number; roi: number
  cash_flow: number; status: string; views: number; submitter: string
  bedrooms: number; sqft: number; property_type: string
}

const DEALS: MockDeal[] = [
  { id: '1', title: 'Off-Market Duplex — High Cash Flow', city: 'Memphis', state: 'TN', deal_type: 'bird_dog', grade: 'A', asking_price: 145000, arv: 210000, roi: 24.3, cash_flow: 680, status: 'accepted', views: 342, submitter: 'Marcus T.', bedrooms: 4, sqft: 2200, property_type: 'Multi-family' },
  { id: '2', title: 'Wholesale — Fix & Flip in Suburbs', city: 'Atlanta', state: 'GA', deal_type: 'wholesale', grade: 'B', asking_price: 189000, arv: 285000, roi: 31.2, cash_flow: 0, status: 'routed', views: 218, submitter: 'Sarah K.', bedrooms: 3, sqft: 1800, property_type: 'SFH' },
  { id: '3', title: 'Section 8 SFH — Guaranteed Rent', city: 'Indianapolis', state: 'IN', deal_type: 'rental', grade: 'A', asking_price: 98000, arv: 125000, roi: 18.6, cash_flow: 520, status: 'accepted', views: 456, submitter: 'DeShawn R.', bedrooms: 3, sqft: 1400, property_type: 'SFH' },
  { id: '4', title: 'Rental Arbitrage — Downtown Condo', city: 'Nashville', state: 'TN', deal_type: 'arbitrage', grade: 'B', asking_price: 0, arv: 0, roi: 42.1, cash_flow: 1200, status: 'submitted', views: 89, submitter: 'Priya M.', bedrooms: 2, sqft: 1100, property_type: 'Condo' },
  { id: '5', title: 'BRRRR — Foreclosure w/ Equity', city: 'Cleveland', state: 'OH', deal_type: 'brrrr', grade: 'A', asking_price: 65000, arv: 140000, roi: 38.7, cash_flow: 450, status: 'under_review', views: 167, submitter: 'Jake W.', bedrooms: 4, sqft: 1900, property_type: 'SFH' },
  { id: '6', title: 'Flip Opportunity — Cosmetic Rehab', city: 'Phoenix', state: 'AZ', deal_type: 'flip', grade: 'C', asking_price: 235000, arv: 310000, roi: 15.4, cash_flow: 0, status: 'routed', views: 134, submitter: 'Lisa C.', bedrooms: 3, sqft: 1650, property_type: 'SFH' },
  { id: '7', title: '8-Unit Apartment — Value Add', city: 'Kansas City', state: 'MO', deal_type: 'bird_dog', grade: 'B', asking_price: 420000, arv: 580000, roi: 22.1, cash_flow: 2100, status: 'accepted', views: 523, submitter: 'Anthony B.', bedrooms: 16, sqft: 6400, property_type: 'Multi-family' },
  { id: '8', title: 'Contract Assignment — New Build', city: 'Austin', state: 'TX', deal_type: 'wholesale', grade: 'C', asking_price: 310000, arv: 375000, roi: 12.8, cash_flow: 0, status: 'submitted', views: 76, submitter: 'Rachel H.', bedrooms: 4, sqft: 2400, property_type: 'SFH' },
  { id: '9', title: 'Turnkey Rental — Cash Flowing Day 1', city: 'Birmingham', state: 'AL', deal_type: 'rental', grade: 'A', asking_price: 112000, arv: 135000, roi: 16.9, cash_flow: 580, status: 'accepted', views: 389, submitter: 'Carlos G.', bedrooms: 3, sqft: 1350, property_type: 'SFH' },
  { id: '10', title: 'Co-Hosting STR — Beachfront', city: 'Destin', state: 'FL', deal_type: 'arbitrage', grade: 'B', asking_price: 0, arv: 0, roi: 55.3, cash_flow: 2800, status: 'under_review', views: 201, submitter: 'Megan F.', bedrooms: 3, sqft: 1500, property_type: 'Condo' },
]

const TYPE_LABELS: Record<DealType, string> = {
  bird_dog: 'Bird Dog', wholesale: 'Wholesale', arbitrage: 'Arbitrage',
  flip: 'Flip', rental: 'Rental', brrrr: 'BRRRR'
}

const GRADE_COLORS: Record<Grade, string> = {
  A: 'bg-emerald-100 text-emerald-800', B: 'bg-blue-100 text-blue-800',
  C: 'bg-yellow-100 text-yellow-800', D: 'bg-orange-100 text-orange-800',
  F: 'bg-red-100 text-red-800'
}

const TOP_DOGS = [
  { name: 'Marcus T.', deals: 47, earned: '$34,200', city: 'Memphis' },
  { name: 'DeShawn R.', deals: 38, earned: '$28,100', city: 'Indianapolis' },
  { name: 'Sarah K.', deals: 31, earned: '$22,800', city: 'Atlanta' },
  { name: 'Jake W.', deals: 24, earned: '$18,400', city: 'Cleveland' },
  { name: 'Carlos G.', deals: 19, earned: '$14,600', city: 'Birmingham' },
]

export default function DealsPage() {
  const [typeFilter, setTypeFilter] = useState<DealType | 'all'>('all')
  const [sortBy, setSortBy] = useState<'newest' | 'roi' | 'grade' | 'views'>('newest')
  const [gradeFilter, setGradeFilter] = useState<Grade | 'all'>('all')

  const filtered = DEALS
    .filter(d => typeFilter === 'all' || d.deal_type === typeFilter)
    .filter(d => gradeFilter === 'all' || d.grade === gradeFilter)
    .sort((a, b) => {
      if (sortBy === 'roi') return b.roi - a.roi
      if (sortBy === 'grade') return a.grade.localeCompare(b.grade)
      if (sortBy === 'views') return b.views - a.views
      return parseInt(b.id) - parseInt(a.id)
    })

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-hero-gradient py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-white/70 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white">Deal Marketplace</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Deal Marketplace</h1>
              <p className="text-lg text-white/80 max-w-2xl">Browse vetted deals from bird-dogs, wholesalers, and investors nationwide. Every deal is underwritten and graded.</p>
            </div>
            <Link href="/deals/submit" className="btn-primary whitespace-nowrap text-center">
              Submit a Deal →
            </Link>
          </div>
          <div className="flex gap-6 mt-8">
            {[
              { label: 'Active Deals', value: '1,247' },
              { label: 'Deals Converted', value: '3,891' },
              { label: 'Total Paid Out', value: '$2.4M' },
              { label: 'Avg ROI', value: '23.6%' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black text-white">{s.value}</div>
                <div className="text-xs text-white/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <span className="text-sm font-semibold text-navy-950">Type:</span>
          {(['all', ...Object.keys(TYPE_LABELS)] as (DealType | 'all')[]).map(t => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${typeFilter === t ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {t === 'all' ? 'All Types' : TYPE_LABELS[t]}
            </button>
          ))}
          <span className="text-sm font-semibold text-navy-950 ml-4">Grade:</span>
          {(['all', 'A', 'B', 'C', 'D', 'F'] as (Grade | 'all')[]).map(g => (
            <button key={g} onClick={() => setGradeFilter(g)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${gradeFilter === g ? 'bg-navy-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {g === 'all' ? 'All' : `Grade ${g}`}
            </button>
          ))}
          <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)}
            className="ml-auto calc-input !w-auto !py-1.5 text-sm">
            <option value="newest">Newest First</option>
            <option value="roi">Highest ROI</option>
            <option value="grade">Best Grade</option>
            <option value="views">Most Views</option>
          </select>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Deal Grid */}
          <div className="lg:col-span-3 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map(deal => (
              <Link key={deal.id} href={`/deals/${deal.id}`} className="card hover:shadow-xl transition-all group">
                {/* Image placeholder */}
                <div className="h-36 bg-gradient-to-br from-navy-100 to-navy-200 rounded-t-xl -mx-5 -mt-5 mb-4 flex items-center justify-center">
                  <svg className="w-10 h-10 text-navy-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" /></svg>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${GRADE_COLORS[deal.grade]}`}>
                    {deal.grade}
                  </span>
                  <span className="badge-brand text-xs">{TYPE_LABELS[deal.deal_type]}</span>
                  <span className="text-xs text-gray-400 ml-auto">{deal.views} views</span>
                </div>
                <h3 className="font-bold text-navy-950 text-sm leading-tight mb-1 group-hover:text-brand-600 transition-colors">
                  {deal.title}
                </h3>
                <p className="text-xs text-gray-500 mb-3">{deal.city}, {deal.state} • {deal.property_type} • {deal.bedrooms} bd • {deal.sqft.toLocaleString()} sqft</p>

                <div className="grid grid-cols-2 gap-2 text-center mb-3">
                  {deal.asking_price > 0 && (
                    <div className="bg-gray-50 rounded-lg py-1.5">
                      <div className="text-xs text-gray-500">Asking</div>
                      <div className="font-bold text-navy-950 text-sm">${(deal.asking_price / 1000).toFixed(0)}K</div>
                    </div>
                  )}
                  {deal.arv > 0 && (
                    <div className="bg-gray-50 rounded-lg py-1.5">
                      <div className="text-xs text-gray-500">ARV</div>
                      <div className="font-bold text-navy-950 text-sm">${(deal.arv / 1000).toFixed(0)}K</div>
                    </div>
                  )}
                  <div className="bg-emerald-50 rounded-lg py-1.5">
                    <div className="text-xs text-gray-500">ROI</div>
                    <div className="font-bold text-emerald-700 text-sm">{deal.roi}%</div>
                  </div>
                  {deal.cash_flow > 0 && (
                    <div className="bg-blue-50 rounded-lg py-1.5">
                      <div className="text-xs text-gray-500">Cash Flow</div>
                      <div className="font-bold text-blue-700 text-sm">${deal.cash_flow}/mo</div>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">by {deal.submitter}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${deal.status === 'accepted' ? 'bg-emerald-100 text-emerald-700' : deal.status === 'routed' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {deal.status.replace('_', ' ')}
                  </span>
                </div>
              </Link>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full text-center py-16 text-gray-400">
                <p className="text-lg font-semibold mb-2">No deals match your filters</p>
                <button onClick={() => { setTypeFilter('all'); setGradeFilter('all') }} className="text-brand-600 font-medium hover:underline">Clear all filters</button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Link href="/deals/submit" className="card-elevated block text-center bg-gradient-to-br from-brand-500 to-brand-700 text-white">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-bold text-lg mb-1">Submit a Deal</h3>
              <p className="text-sm text-white/80 mb-3">Found a deal? Submit it and earn finder&apos;s fees when it converts.</p>
              <span className="inline-block bg-white text-brand-600 font-bold px-4 py-2 rounded-lg text-sm">Get Started →</span>
            </Link>

            <div className="card">
              <h3 className="font-bold text-navy-950 mb-4">🏆 Top Bird-Dogs</h3>
              <div className="space-y-3">
                {TOP_DOGS.map((dog, i) => (
                  <div key={dog.name} className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-yellow-100 text-yellow-700' : i === 1 ? 'bg-gray-100 text-gray-600' : i === 2 ? 'bg-orange-100 text-orange-700' : 'bg-gray-50 text-gray-400'}`}>
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-navy-950">{dog.name}</div>
                      <div className="text-xs text-gray-400">{dog.city} • {dog.deals} deals</div>
                    </div>
                    <span className="text-xs font-bold text-emerald-600">{dog.earned}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card bg-navy-950 text-white">
              <h3 className="font-bold mb-2">How It Works</h3>
              <ol className="space-y-2 text-sm text-white/80">
                <li className="flex gap-2"><span className="bg-brand-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0">1</span> Submit a deal with property details</li>
                <li className="flex gap-2"><span className="bg-brand-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0">2</span> Our engine underwrites & grades it</li>
                <li className="flex gap-2"><span className="bg-brand-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0">3</span> Deal gets routed to matched investors</li>
                <li className="flex gap-2"><span className="bg-brand-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0">4</span> When it converts, you get paid</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
