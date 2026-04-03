'use client'

import { useState } from 'react'
import Link from 'next/link'

const INVESTORS = [
  { id: '1', name: 'Blackstone RE Group', type: 'Institutional', criteria: ['Multi-family', 'BRRRR'], states: ['TN', 'GA', 'AL', 'IN'], min: 50000, max: 500000, match: 96, deals_closed: 124, avg_close: '14 days', rating: 4.9 },
  { id: '2', name: 'Sarah Chen Capital', type: 'Private Investor', criteria: ['SFH', 'Rental'], states: ['TN', 'OH', 'IN'], min: 80000, max: 250000, match: 91, deals_closed: 38, avg_close: '21 days', rating: 4.8 },
  { id: '3', name: 'Midwest Flip Co', type: 'Flipper', criteria: ['Flip', 'Wholesale'], states: ['OH', 'IN', 'MI', 'MO'], min: 30000, max: 200000, match: 84, deals_closed: 89, avg_close: '7 days', rating: 4.7 },
  { id: '4', name: 'Daniel Park Investments', type: 'Private Investor', criteria: ['Section 8', 'Rental'], states: ['TN', 'AL', 'MS'], min: 60000, max: 180000, match: 79, deals_closed: 22, avg_close: '28 days', rating: 4.6 },
  { id: '5', name: 'Liberty Hard Money', type: 'Lender', criteria: ['Flip', 'BRRRR', 'Commercial'], states: ['Nationwide'], min: 50000, max: 2000000, match: 72, deals_closed: 340, avg_close: '3 days', rating: 4.9 },
]

const ACTIVE_ROUTES = [
  { deal: 'Off-Market Duplex — Memphis', investor: 'Blackstone RE Group', status: 'interested', sent: 'Mar 31', match: 96 },
  { deal: 'Off-Market Duplex — Memphis', investor: 'Sarah Chen Capital', status: 'viewed', sent: 'Mar 31', match: 91 },
  { deal: 'Wholesale — Fix & Flip Atlanta', investor: 'Midwest Flip Co', status: 'accepted', sent: 'Mar 30', match: 88 },
  { deal: '8-Unit Apartment — KC', investor: 'Blackstone RE Group', status: 'interested', sent: 'Mar 29', match: 94 },
  { deal: 'BRRRR — Foreclosure Cleveland', investor: 'Daniel Park Investments', status: 'pending', sent: 'Apr 1', match: 76 },
  { deal: 'Turnkey Rental — Birmingham', investor: 'Sarah Chen Capital', status: 'accepted', sent: 'Mar 28', match: 89 },
]

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-gray-100 text-gray-600',
  sent: 'bg-blue-100 text-blue-700',
  viewed: 'bg-yellow-100 text-yellow-700',
  interested: 'bg-emerald-100 text-emerald-700',
  accepted: 'bg-brand-100 text-brand-700',
  passed: 'bg-red-100 text-red-700',
}

export default function DealRoutingPage() {
  const [tab, setTab] = useState<'routes' | 'investors'>('routes')

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-hero-gradient py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-white/70 mb-4">
            <Link href="/" className="hover:text-white">Home</Link><span>/</span>
            <Link href="/deals" className="hover:text-white">Deals</Link><span>/</span>
            <span className="text-white">Routing</span>
          </div>
          <h1 className="text-4xl font-black text-white mb-2">Deal Routing Engine</h1>
          <p className="text-white/80 max-w-2xl">Automatically match deals with the right investors, lenders, and service providers. The core money flow of the platform.</p>
          <div className="flex gap-6 mt-6">
            {[{ l: 'Active Routes', v: '847' }, { l: 'Matches Made', v: '3,291' }, { l: 'Conversion Rate', v: '34.2%' }, { l: 'Avg Time to Accept', v: '2.4 days' }].map(s => (
              <div key={s.l} className="text-center">
                <div className="text-xl font-black text-white">{s.v}</div>
                <div className="text-xs text-white/60">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit mb-8">
          {[{ k: 'routes' as const, l: 'Active Routes' }, { k: 'investors' as const, l: 'Investor Network' }].map(t => (
            <button key={t.k} onClick={() => setTab(t.k)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t.k ? 'bg-white text-navy-950 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              {t.l}
            </button>
          ))}
        </div>

        {tab === 'routes' && (
          <div>
            <h2 className="text-xl font-bold text-navy-950 mb-4">Active Deal Routes</h2>
            <div className="card overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 font-semibold text-gray-500">Deal</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-500">Routed To</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-500">Match</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-500">Status</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-500">Sent</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-500">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ACTIVE_ROUTES.map((r, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50">
                      <td className="py-3 px-4 font-semibold text-navy-950">{r.deal}</td>
                      <td className="py-3 px-4 text-gray-600">{r.investor}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`font-bold ${r.match >= 90 ? 'text-emerald-600' : r.match >= 80 ? 'text-blue-600' : 'text-yellow-600'}`}>{r.match}%</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${STATUS_COLORS[r.status] || ''}`}>{r.status}</span>
                      </td>
                      <td className="py-3 px-4 text-center text-gray-400">{r.sent}</td>
                      <td className="py-3 px-4 text-right">
                        <button className="text-brand-600 font-medium text-xs hover:underline">View →</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* How routing works */}
            <div className="mt-10 card bg-navy-950 text-white">
              <h3 className="font-bold text-lg mb-4">How Deal Routing Works</h3>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { step: '1', title: 'Deal Submitted', desc: 'Bird-dog or wholesaler submits deal with property + financial details' },
                  { step: '2', title: 'Underwriting', desc: 'Our engine scores ROI, cash flow, risk and assigns a grade (A-F)' },
                  { step: '3', title: 'Matching', desc: 'Algorithm matches deal to investors based on criteria, location, budget' },
                  { step: '4', title: 'Conversion', desc: 'Investor accepts, services are triggered, bird-dog gets paid' },
                ].map(s => (
                  <div key={s.step}>
                    <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center text-sm font-bold mb-2">{s.step}</div>
                    <h4 className="font-bold mb-1">{s.title}</h4>
                    <p className="text-sm text-white/70">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'investors' && (
          <div>
            <h2 className="text-xl font-bold text-navy-950 mb-4">Investor Network</h2>
            <div className="space-y-4">
              {INVESTORS.map(inv => (
                <div key={inv.id} className="card hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-navy-950">{inv.name}</h3>
                        <span className="badge-navy text-xs">{inv.type}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {inv.criteria.map(c => <span key={c} className="badge-brand text-xs">{c}</span>)}
                      </div>
                      <div className="flex gap-4 text-xs text-gray-500">
                        <span>States: {inv.states.join(', ')}</span>
                        <span>Range: ${(inv.min / 1000).toFixed(0)}K–${(inv.max / 1000).toFixed(0)}K</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-center">
                      <div>
                        <div className="text-lg font-black text-navy-950">{inv.deals_closed}</div>
                        <div className="text-xs text-gray-400">Deals Closed</div>
                      </div>
                      <div>
                        <div className="text-lg font-black text-navy-950">{inv.avg_close}</div>
                        <div className="text-xs text-gray-400">Avg Close</div>
                      </div>
                      <div>
                        <div className="text-lg font-black text-yellow-600">★ {inv.rating}</div>
                        <div className="text-xs text-gray-400">Rating</div>
                      </div>
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-black text-lg ${
                        inv.match >= 90 ? 'bg-emerald-100 text-emerald-700' : inv.match >= 80 ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>{inv.match}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
