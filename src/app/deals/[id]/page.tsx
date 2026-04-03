'use client'

import { useState } from 'react'
import Link from 'next/link'

const DEAL = {
  id: '1', title: 'Off-Market Duplex — High Cash Flow', description: 'Motivated seller looking to move quickly. Duplex with both units rented, generating $1,500/mo gross. New roof (2023), updated electrical. Both tenants have 1-year leases. Located in a B+ neighborhood with strong rental demand. Great bird-dog opportunity — this won\'t last.',
  city: 'Memphis', state: 'TN', zip: '38104', address: '1847 Autumn Ave',
  property_type: 'Multi-family', bedrooms: 4, bathrooms: 2, sqft: 2200, year_built: 1978, lot_size: 0.18,
  deal_type: 'bird_dog', status: 'accepted', grade: 'A' as const,
  asking_price: 145000, arv: 210000, estimated_repair: 18000, monthly_rent: 1500, monthly_expenses: 380,
  roi_score: 82, cash_flow_score: 88, risk_score: 15,
  cap_rate: 9.3, cash_on_cash: 16.4, dscr: 1.52, monthly_cash_flow: 680,
  views: 342, submitter: { name: 'Marcus T.', role: 'Bird Dog', deals: 47, trust_score: 94, member_since: 'Jan 2024' },
  strategies: ['rental', 'brrrr'],
  timeline: [
    { date: 'Mar 28, 2026', label: 'Submitted', done: true },
    { date: 'Mar 29, 2026', label: 'Under Review', done: true },
    { date: 'Mar 30, 2026', label: 'Accepted', done: true },
    { date: 'Mar 31, 2026', label: 'Routed to Investors', done: true },
    { date: 'Pending', label: 'Converted', done: false },
  ]
}

const RELATED_SERVICES = [
  { category: 'Contractor', name: 'Memphis Pro Rehab', rating: 4.8, reviews: 67, price: '$15K-$50K' },
  { category: 'Lender', name: 'FastFund Capital', rating: 4.9, reviews: 124, price: '7.5% rate' },
  { category: 'Inspector', name: 'TN Home Inspections', rating: 4.7, reviews: 89, price: '$350-$500' },
  { category: 'Property Manager', name: 'Bluff City PM', rating: 4.6, reviews: 45, price: '8% of rent' },
]

const GRADE_COLORS = {
  A: 'bg-emerald-100 text-emerald-800', B: 'bg-blue-100 text-blue-800',
  C: 'bg-yellow-100 text-yellow-800', D: 'bg-orange-100 text-orange-800', F: 'bg-red-100 text-red-800'
}

export default function DealDetailPage() {
  const [interested, setInterested] = useState(false)
  const d = DEAL

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-hero-gradient py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-white/70 mb-4">
            <Link href="/" className="hover:text-white">Home</Link><span>/</span>
            <Link href="/deals" className="hover:text-white">Deals</Link><span>/</span>
            <span className="text-white">{d.title}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-sm font-bold px-3 py-1 rounded-full ${GRADE_COLORS[d.grade]}`}>Grade {d.grade}</span>
                <span className="badge-brand capitalize">{d.deal_type.replace('_', ' ')}</span>
                <span className="bg-emerald-500/20 text-emerald-100 text-xs font-semibold px-2 py-1 rounded-full capitalize">{d.status}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-1">{d.title}</h1>
              <p className="text-white/70">{d.address}, {d.city}, {d.state} {d.zip} • {d.property_type} • {d.bedrooms} bd / {d.bathrooms} ba • {d.sqft.toLocaleString()} sqft</p>
            </div>
            <div className="flex items-center gap-4 text-center">
              <div>
                <div className="text-2xl font-black text-white">${(d.asking_price / 1000).toFixed(0)}K</div>
                <div className="text-xs text-white/60">Asking</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white">${(d.arv / 1000).toFixed(0)}K</div>
                <div className="text-xs text-white/60">ARV</div>
              </div>
              <div>
                <div className="text-2xl font-black text-emerald-300">${d.monthly_cash_flow}/mo</div>
                <div className="text-xs text-white/60">Cash Flow</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left — Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Image Placeholder */}
            <div className="h-64 bg-gradient-to-br from-navy-100 to-navy-200 rounded-2xl flex items-center justify-center">
              <div className="text-center text-navy-400">
                <svg className="w-12 h-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <p className="text-sm">Property Photos</p>
              </div>
            </div>

            {/* Description */}
            <div className="card">
              <h2 className="text-lg font-bold text-navy-950 mb-3">Deal Description</h2>
              <p className="text-gray-600 leading-relaxed">{d.description}</p>
              <div className="flex gap-2 mt-4">
                {d.strategies.map(s => (
                  <span key={s} className="badge-sage capitalize">{s}</span>
                ))}
              </div>
            </div>

            {/* Underwriting Scores */}
            <div className="card">
              <h2 className="text-lg font-bold text-navy-950 mb-4">Underwriting Analysis</h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-emerald-50 rounded-xl">
                  <div className="text-2xl font-black text-emerald-700">{d.roi_score}</div>
                  <div className="text-xs text-gray-500 mt-1">ROI Score</div>
                  <div className="w-full bg-emerald-200 rounded-full h-1.5 mt-2">
                    <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: `${d.roi_score}%` }}></div>
                  </div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-black text-blue-700">{d.cash_flow_score}</div>
                  <div className="text-xs text-gray-500 mt-1">Cash Flow Score</div>
                  <div className="w-full bg-blue-200 rounded-full h-1.5 mt-2">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${d.cash_flow_score}%` }}></div>
                  </div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl font-black text-green-700">{100 - d.risk_score}</div>
                  <div className="text-xs text-gray-500 mt-1">Safety Score</div>
                  <div className="w-full bg-green-200 rounded-full h-1.5 mt-2">
                    <div className="bg-green-600 h-1.5 rounded-full" style={{ width: `${100 - d.risk_score}%` }}></div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {[
                  { label: 'Cap Rate', value: `${d.cap_rate}%`, good: d.cap_rate >= 8 },
                  { label: 'Cash-on-Cash', value: `${d.cash_on_cash}%`, good: d.cash_on_cash >= 10 },
                  { label: 'DSCR', value: d.dscr.toFixed(2), good: d.dscr >= 1.25 },
                  { label: 'Monthly Cash Flow', value: `$${d.monthly_cash_flow}`, good: d.monthly_cash_flow >= 200 },
                  { label: 'Repair Estimate', value: `$${d.estimated_repair.toLocaleString()}`, good: d.estimated_repair / d.asking_price < 0.15 },
                  { label: 'Equity at Close', value: `$${(d.arv - d.asking_price - d.estimated_repair).toLocaleString()}`, good: (d.arv - d.asking_price - d.estimated_repair) > 0 },
                ].map(m => (
                  <div key={m.label} className="flex items-center justify-between py-2.5 px-4 rounded-lg bg-gray-50">
                    <span className="text-sm text-gray-600">{m.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-navy-950">{m.value}</span>
                      <span className={`w-2.5 h-2.5 rounded-full ${m.good ? 'bg-emerald-500' : 'bg-yellow-500'}`}></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="card">
              <h2 className="text-lg font-bold text-navy-950 mb-4">Deal Timeline</h2>
              <div className="space-y-0">
                {d.timeline.map((t, i) => (
                  <div key={t.label} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full border-2 ${t.done ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-gray-300'}`}></div>
                      {i < d.timeline.length - 1 && <div className={`w-0.5 h-10 ${t.done ? 'bg-emerald-300' : 'bg-gray-200'}`}></div>}
                    </div>
                    <div className="pb-6">
                      <div className={`font-semibold text-sm ${t.done ? 'text-navy-950' : 'text-gray-400'}`}>{t.label}</div>
                      <div className="text-xs text-gray-400">{t.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Services */}
            <div className="card">
              <h2 className="text-lg font-bold text-navy-950 mb-4">Available Services in {d.city}, {d.state}</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {RELATED_SERVICES.map(svc => (
                  <div key={svc.name} className="p-4 border border-gray-100 rounded-xl hover:border-brand-200 transition-colors">
                    <div className="text-xs font-semibold text-brand-600 mb-1">{svc.category}</div>
                    <div className="font-bold text-navy-950 text-sm">{svc.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-yellow-500 text-xs">{'★'.repeat(Math.round(svc.rating))}</span>
                      <span className="text-xs text-gray-400">{svc.rating} ({svc.reviews})</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{svc.price}</div>
                    <button className="text-xs text-brand-600 font-medium mt-2 hover:underline">Request Quote →</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <div className="card-elevated sticky top-24">
              {!interested ? (
                <button onClick={() => setInterested(true)} className="btn-primary w-full mb-3">
                  Express Interest →
                </button>
              ) : (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-3 text-center">
                  <span className="text-emerald-700 font-semibold text-sm">✓ Interest Expressed</span>
                  <p className="text-xs text-emerald-600 mt-1">The submitter has been notified</p>
                </div>
              )}
              <button className="btn-secondary w-full mb-3">Message Submitter</button>
              <button className="btn-secondary w-full mb-3">Request Service</button>
              <button className="btn-secondary w-full text-gray-400">Share Deal</button>

              <div className="border-t border-gray-100 mt-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center text-navy-600 font-bold">
                    {d.submitter.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-navy-950">{d.submitter.name}</div>
                    <div className="text-xs text-gray-400">{d.submitter.role} • {d.submitter.deals} deals</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                  <span>Trust: <strong className="text-navy-950">{d.submitter.trust_score}/100</strong></span>
                  <span>Since: {d.submitter.member_since}</span>
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="card">
              <h3 className="font-bold text-navy-950 mb-3">Property Details</h3>
              <div className="space-y-2 text-sm">
                {[
                  ['Type', d.property_type],
                  ['Bedrooms', d.bedrooms],
                  ['Bathrooms', d.bathrooms],
                  ['Sqft', d.sqft.toLocaleString()],
                  ['Year Built', d.year_built],
                  ['Lot Size', `${d.lot_size} acres`],
                ].map(([label, val]) => (
                  <div key={label as string} className="flex justify-between">
                    <span className="text-gray-500">{label}</span>
                    <span className="font-semibold text-navy-950">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="card bg-navy-950 text-white">
              <h3 className="font-bold mb-3">Financial Summary</h3>
              <div className="space-y-2 text-sm">
                {[
                  ['Asking Price', `$${d.asking_price.toLocaleString()}`],
                  ['ARV', `$${d.arv.toLocaleString()}`],
                  ['Repair Cost', `$${d.estimated_repair.toLocaleString()}`],
                  ['Monthly Rent', `$${d.monthly_rent.toLocaleString()}`],
                  ['Monthly Expenses', `$${d.monthly_expenses.toLocaleString()}`],
                  ['Net Cash Flow', `$${d.monthly_cash_flow.toLocaleString()}/mo`],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-white/60">{label}</span>
                    <span className="font-semibold">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center text-xs text-gray-400">
              {d.views} views • Deal ID: {d.id}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
