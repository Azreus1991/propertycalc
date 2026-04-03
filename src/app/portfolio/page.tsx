'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Property {
  id: string; address: string; city: string; state: string; type: string
  purchase: number; current: number; mortgage: number; rent: number
  expenses: number; cashFlow: number; capRate: number; roi: number
  acquired: string; strategy: string; status: 'active' | 'sold' | 'pending'
}

const PROPERTIES: Property[] = [
  { id: '1', address: '1847 Autumn Ave', city: 'Memphis', state: 'TN', type: 'Duplex', purchase: 140000, current: 195000, mortgage: 98000, rent: 1500, expenses: 420, cashFlow: 680, capRate: 9.3, roi: 16.4, acquired: 'Jan 2025', strategy: 'BRRRR', status: 'active' },
  { id: '2', address: '422 Oak Ridge Dr', city: 'Indianapolis', state: 'IN', type: 'SFH', purchase: 92000, current: 125000, mortgage: 68000, rent: 1100, expenses: 310, cashFlow: 520, capRate: 10.3, roi: 22.8, acquired: 'Mar 2025', strategy: 'Rental', status: 'active' },
  { id: '3', address: '8901 Peachtree Blvd', city: 'Atlanta', state: 'GA', type: 'SFH', purchase: 185000, current: 245000, mortgage: 0, rent: 0, expenses: 0, cashFlow: 0, capRate: 0, roi: 32.4, acquired: 'Jun 2025', strategy: 'Flip', status: 'sold' },
  { id: '4', address: '1200 MLK Jr Blvd', city: 'Birmingham', state: 'AL', type: 'Triplex', purchase: 165000, current: 210000, mortgage: 122000, rent: 2400, expenses: 680, cashFlow: 820, capRate: 12.5, roi: 19.1, acquired: 'Sep 2025', strategy: 'Rental', status: 'active' },
  { id: '5', address: '567 Cherry Lane', city: 'Cleveland', state: 'OH', type: 'SFH', purchase: 65000, current: 115000, mortgage: 48000, rent: 950, expenses: 280, cashFlow: 450, capRate: 12.4, roi: 31.8, acquired: 'Nov 2025', strategy: 'BRRRR', status: 'active' },
  { id: '6', address: '234 Commerce St', city: 'Nashville', state: 'TN', type: 'Condo', purchase: 210000, current: 0, mortgage: 168000, rent: 2800, expenses: 450, cashFlow: 1200, capRate: 0, roi: 0, acquired: 'Feb 2026', strategy: 'Arbitrage', status: 'pending' },
]

export default function PortfolioPage() {
  const [isPublic, setIsPublic] = useState(false)
  const [view, setView] = useState<'grid' | 'table'>('grid')

  const active = PROPERTIES.filter(p => p.status === 'active')
  const totalValue = active.reduce((s, p) => s + p.current, 0)
  const totalEquity = active.reduce((s, p) => s + (p.current - p.mortgage), 0)
  const totalCashFlow = active.reduce((s, p) => s + p.cashFlow, 0)
  const avgRoi = active.length > 0 ? active.reduce((s, p) => s + p.roi, 0) / active.length : 0

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-hero-gradient py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-white/70 mb-4">
            <Link href="/" className="hover:text-white">Home</Link><span>/</span>
            <Link href="/dashboard" className="hover:text-white">Dashboard</Link><span>/</span>
            <span className="text-white">Portfolio</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-white mb-2">My Portfolio</h1>
              <p className="text-white/80">Track your properties, ROI, and overall performance.</p>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <span className="text-sm text-white/70">Public</span>
                <button onClick={() => setIsPublic(!isPublic)} className={`w-10 h-5 rounded-full transition-colors ${isPublic ? 'bg-emerald-500' : 'bg-white/20'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isPublic ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
                </button>
              </label>
              <button className="btn-primary text-sm">+ Add Property</button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { label: 'Total Value', value: `$${(totalValue / 1000).toFixed(0)}K`, sub: `${active.length} properties` },
              { label: 'Total Equity', value: `$${(totalEquity / 1000).toFixed(0)}K`, sub: `${((totalEquity / totalValue) * 100).toFixed(0)}% equity position` },
              { label: 'Monthly Cash Flow', value: `$${totalCashFlow.toLocaleString()}`, sub: `$${(totalCashFlow * 12).toLocaleString()}/yr` },
              { label: 'Avg ROI', value: `${avgRoi.toFixed(1)}%`, sub: 'Cash-on-cash return' },
            ].map(s => (
              <div key={s.label} className="bg-white/10 rounded-xl p-4">
                <div className="text-2xl font-black text-white">{s.value}</div>
                <div className="text-xs text-white/60">{s.label}</div>
                <div className="text-xs text-white/40 mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* View toggle */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-navy-950">Properties ({PROPERTIES.length})</h2>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
            <button onClick={() => setView('grid')} className={`px-3 py-1.5 rounded-md text-xs font-medium ${view === 'grid' ? 'bg-white shadow-sm text-navy-950' : 'text-gray-500'}`}>Grid</button>
            <button onClick={() => setView('table')} className={`px-3 py-1.5 rounded-md text-xs font-medium ${view === 'table' ? 'bg-white shadow-sm text-navy-950' : 'text-gray-500'}`}>Table</button>
          </div>
        </div>

        {view === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROPERTIES.map(p => (
              <div key={p.id} className={`card hover:shadow-lg transition-shadow ${p.status === 'sold' ? 'opacity-60' : ''}`}>
                <div className="h-28 bg-gradient-to-br from-navy-100 to-navy-200 rounded-xl -mx-5 -mt-5 mb-4 flex items-center justify-center">
                  <span className="text-3xl">{p.type === 'Duplex' || p.type === 'Triplex' ? '🏘️' : p.type === 'Condo' ? '🏢' : '🏠'}</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    p.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                    p.status === 'sold' ? 'bg-gray-100 text-gray-600' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>{p.status}</span>
                  <span className="badge-brand text-xs">{p.strategy}</span>
                </div>
                <h3 className="font-bold text-navy-950 text-sm">{p.address}</h3>
                <p className="text-xs text-gray-500 mb-3">{p.city}, {p.state} • {p.type} • Acq. {p.acquired}</p>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-gray-50 rounded-lg py-1.5">
                    <div className="text-xs text-gray-500">Value</div>
                    <div className="font-bold text-sm text-navy-950">${(p.current / 1000).toFixed(0)}K</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg py-1.5">
                    <div className="text-xs text-gray-500">Equity</div>
                    <div className="font-bold text-sm text-navy-950">${((p.current - p.mortgage) / 1000).toFixed(0)}K</div>
                  </div>
                  {p.cashFlow > 0 && (
                    <div className="bg-emerald-50 rounded-lg py-1.5">
                      <div className="text-xs text-gray-500">Cash Flow</div>
                      <div className="font-bold text-sm text-emerald-700">${p.cashFlow}/mo</div>
                    </div>
                  )}
                  {p.roi > 0 && (
                    <div className="bg-blue-50 rounded-lg py-1.5">
                      <div className="text-xs text-gray-500">ROI</div>
                      <div className="font-bold text-sm text-blue-700">{p.roi}%</div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Add property card */}
            <button className="card border-2 border-dashed border-gray-200 hover:border-brand-300 transition-colors flex flex-col items-center justify-center min-h-[250px] text-gray-400 hover:text-brand-600">
              <span className="text-4xl mb-2">+</span>
              <span className="font-semibold">Add Property</span>
            </button>
          </div>
        ) : (
          <div className="card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {['Property', 'Type', 'Strategy', 'Value', 'Equity', 'Cash Flow', 'Cap Rate', 'ROI', 'Status'].map(h => (
                    <th key={h} className="text-left py-3 px-3 font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PROPERTIES.map(p => (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="py-3 px-3">
                      <div className="font-semibold text-navy-950">{p.address}</div>
                      <div className="text-xs text-gray-400">{p.city}, {p.state}</div>
                    </td>
                    <td className="py-3 px-3 text-gray-600">{p.type}</td>
                    <td className="py-3 px-3"><span className="badge-brand text-xs">{p.strategy}</span></td>
                    <td className="py-3 px-3 font-bold">${(p.current / 1000).toFixed(0)}K</td>
                    <td className="py-3 px-3 font-bold">${((p.current - p.mortgage) / 1000).toFixed(0)}K</td>
                    <td className="py-3 px-3 font-bold text-emerald-600">{p.cashFlow > 0 ? `$${p.cashFlow}/mo` : '—'}</td>
                    <td className="py-3 px-3">{p.capRate > 0 ? `${p.capRate}%` : '—'}</td>
                    <td className="py-3 px-3 font-bold text-blue-600">{p.roi > 0 ? `${p.roi}%` : '—'}</td>
                    <td className="py-3 px-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${
                        p.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                        p.status === 'sold' ? 'bg-gray-100 text-gray-600' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>{p.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}
