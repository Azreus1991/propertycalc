'use client'

import { useState } from 'react'
import Link from 'next/link'

const PAYOUTS = [
  { id: 'P-001', deal: 'Off-Market Duplex — Memphis', type: 'bird_dog', amount: 3500, status: 'paid', date: 'Mar 30, 2026', paidDate: 'Apr 1, 2026' },
  { id: 'P-002', deal: '8-Unit Apartment — KC', type: 'bird_dog', amount: 8500, status: 'approved', date: 'Mar 29, 2026', paidDate: null },
  { id: 'P-003', deal: 'Wholesale — Fix & Flip Atlanta', type: 'referral', amount: 2200, status: 'processing', date: 'Mar 28, 2026', paidDate: null },
  { id: 'P-004', deal: 'Turnkey Rental — Birmingham', type: 'routing', amount: 1500, status: 'pending', date: 'Mar 27, 2026', paidDate: null },
  { id: 'P-005', deal: 'BRRRR — Foreclosure Cleveland', type: 'bird_dog', amount: 4200, status: 'eligible', date: 'Mar 26, 2026', paidDate: null },
  { id: 'P-006', deal: 'Section 8 SFH — Indianapolis', type: 'split', amount: 1800, status: 'paid', date: 'Mar 20, 2026', paidDate: 'Mar 23, 2026' },
  { id: 'P-007', deal: 'Contract Assignment — Austin', type: 'referral', amount: 5000, status: 'paid', date: 'Mar 15, 2026', paidDate: 'Mar 18, 2026' },
  { id: 'P-008', deal: 'Co-Hosting STR — Destin', type: 'routing', amount: 750, status: 'disputed', date: 'Mar 10, 2026', paidDate: null },
]

const STATUS_STYLES: Record<string, { bg: string; label: string }> = {
  pending: { bg: 'bg-gray-100 text-gray-600', label: 'Pending' },
  eligible: { bg: 'bg-blue-100 text-blue-700', label: 'Eligible' },
  approved: { bg: 'bg-emerald-100 text-emerald-700', label: 'Approved' },
  processing: { bg: 'bg-yellow-100 text-yellow-700', label: 'Processing' },
  paid: { bg: 'bg-emerald-100 text-emerald-700', label: 'Paid' },
  disputed: { bg: 'bg-red-100 text-red-700', label: 'Disputed' },
}

const TYPE_LABELS: Record<string, string> = {
  bird_dog: 'Bird Dog Fee', referral: 'Referral Fee', routing: 'Routing Fee', split: 'Payout Split'
}

export default function PayoutsPage() {
  const [filter, setFilter] = useState('all')

  const totalEarned = PAYOUTS.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount, 0)
  const totalPending = PAYOUTS.filter(p => ['pending', 'eligible', 'approved', 'processing'].includes(p.status)).reduce((s, p) => s + p.amount, 0)

  const filtered = PAYOUTS.filter(p => filter === 'all' || p.status === filter)

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-hero-gradient py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-white/70 mb-4">
            <Link href="/" className="hover:text-white">Home</Link><span>/</span>
            <Link href="/dashboard" className="hover:text-white">Dashboard</Link><span>/</span>
            <span className="text-white">Payouts</span>
          </div>
          <h1 className="text-4xl font-black text-white mb-2">Payout Center</h1>
          <p className="text-white/80">Track your earnings from bird-dog fees, referrals, routing, and deal splits.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { label: 'Total Earned', value: `$${totalEarned.toLocaleString()}`, color: 'bg-white/10' },
              { label: 'Pending Payouts', value: `$${totalPending.toLocaleString()}`, color: 'bg-white/10' },
              { label: 'Deals Converted', value: '12', color: 'bg-white/10' },
              { label: 'Avg Payout', value: `$${Math.round(totalEarned / PAYOUTS.filter(p => p.status === 'paid').length).toLocaleString()}`, color: 'bg-white/10' },
            ].map(s => (
              <div key={s.label} className={`${s.color} rounded-xl p-4 text-center`}>
                <div className="text-2xl font-black text-white">{s.value}</div>
                <div className="text-xs text-white/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Info banner */}
        <div className="card bg-navy-50 border border-navy-100 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-xl">💰</span>
            <div>
              <h3 className="font-bold text-navy-950 text-sm">How Payouts Work</h3>
              <p className="text-xs text-gray-600">When your deal converts, your payout moves from Pending → Eligible → Approved → Processing → Paid. Payments are processed within 3-5 business days after approval.</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['all', 'pending', 'eligible', 'approved', 'processing', 'paid', 'disputed'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize transition-all ${
                filter === f ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {f === 'all' ? 'All' : f}
            </button>
          ))}
        </div>

        {/* Payout table */}
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-4 font-semibold text-gray-500">ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-500">Deal</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-500">Type</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-500">Amount</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-500">Status</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-500">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-3 px-4 font-mono text-xs text-gray-400">{p.id}</td>
                  <td className="py-3 px-4 font-semibold text-navy-950">{p.deal}</td>
                  <td className="py-3 px-4 text-gray-600 text-xs">{TYPE_LABELS[p.type]}</td>
                  <td className="py-3 px-4 text-right font-bold text-navy-950">${p.amount.toLocaleString()}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[p.status]?.bg}`}>
                      {STATUS_STYLES[p.status]?.label}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-xs text-gray-400">
                    {p.paidDate || p.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Payout flow visual */}
        <div className="mt-10">
          <h2 className="text-lg font-bold text-navy-950 mb-4">Payout Flow</h2>
          <div className="flex items-center gap-2 overflow-x-auto pb-4">
            {['Deal Submitted', 'Deal Converted', 'Payout Eligible', 'Payout Approved', 'Processing', 'Paid'].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div className="bg-navy-950 text-white px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap">{step}</div>
                {i < 5 && <span className="text-brand-600 font-bold">→</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
