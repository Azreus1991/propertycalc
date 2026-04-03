'use client'

import { useState } from 'react'
import Link from 'next/link'

const TICKETS = [
  { id: 'TK-001', subject: 'Payout not received for Memphis duplex deal', category: 'payout', status: 'in_progress', priority: 'high', created: 'Apr 1, 2026', updated: '2h ago' },
  { id: 'TK-002', subject: 'Vendor listing not showing up in search', category: 'vendor', status: 'waiting', priority: 'medium', created: 'Mar 30, 2026', updated: '1d ago' },
  { id: 'TK-003', subject: 'Deal grade seems incorrect for my submission', category: 'deal_dispute', status: 'open', priority: 'medium', created: 'Mar 29, 2026', updated: '3d ago' },
  { id: 'TK-004', subject: 'Cannot access premium features after upgrade', category: 'billing', status: 'resolved', priority: 'high', created: 'Mar 25, 2026', updated: '5d ago' },
  { id: 'TK-005', subject: 'Account verification stuck in review', category: 'verification', status: 'in_progress', priority: 'medium', created: 'Mar 22, 2026', updated: '1w ago' },
]

const HELP_CATEGORIES = [
  { icon: '🏠', title: 'Getting Started', articles: 12, desc: 'Account setup, roles, first deal' },
  { icon: '🐕', title: 'Bird-Dog Guide', articles: 8, desc: 'Finding deals, submissions, payouts' },
  { icon: '💰', title: 'Payouts & Billing', articles: 6, desc: 'Payment methods, disputes, invoices' },
  { icon: '📊', title: 'Deal Underwriting', articles: 10, desc: 'How grades work, scoring, metrics' },
  { icon: '🔄', title: 'Deal Routing', articles: 7, desc: 'How matching works, investor criteria' },
  { icon: '🏪', title: 'Services & Vendors', articles: 9, desc: 'Listings, leads, pricing tiers' },
  { icon: '✅', title: 'Trust & Verification', articles: 5, desc: 'Getting verified, trust score, reviews' },
  { icon: '⚖️', title: 'Disputes & Policies', articles: 4, desc: 'Deal disputes, refunds, terms' },
]

const STATUS_STYLES: Record<string, string> = {
  open: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-yellow-100 text-yellow-700',
  waiting: 'bg-gray-100 text-gray-600',
  resolved: 'bg-emerald-100 text-emerald-700',
  closed: 'bg-gray-100 text-gray-500',
}

export default function SupportPage() {
  const [tab, setTab] = useState<'help' | 'tickets' | 'new'>('help')
  const [newCategory, setNewCategory] = useState('')
  const [newSubject, setNewSubject] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [newPriority, setNewPriority] = useState('medium')
  const [submitted, setSubmitted] = useState(false)

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-hero-gradient py-14">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-black text-white mb-3">Help & Support</h1>
          <p className="text-white/80 max-w-xl mx-auto mb-6">Search our help center, submit a ticket, or browse common topics.</p>
          <input className="max-w-lg mx-auto w-full px-5 py-3 rounded-xl bg-white text-navy-950 shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Search help articles..." />
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit mb-8">
          {[{ k: 'help' as const, l: 'Help Center' }, { k: 'tickets' as const, l: 'My Tickets' }, { k: 'new' as const, l: 'New Ticket' }].map(t => (
            <button key={t.k} onClick={() => { setTab(t.k); setSubmitted(false) }}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t.k ? 'bg-white text-navy-950 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              {t.l}
            </button>
          ))}
        </div>

        {tab === 'help' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {HELP_CATEGORIES.map(c => (
              <div key={c.title} className="card hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="text-3xl mb-3">{c.icon}</div>
                <h3 className="font-bold text-navy-950 group-hover:text-brand-600 transition-colors">{c.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{c.desc}</p>
                <div className="text-xs text-brand-600 font-medium mt-2">{c.articles} articles →</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'tickets' && (
          <div>
            <div className="card overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 font-semibold text-gray-500">ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-500">Subject</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-500">Category</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-500">Priority</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-500">Status</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-500">Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {TICKETS.map(t => (
                    <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50/50 cursor-pointer">
                      <td className="py-3 px-4 font-mono text-xs text-gray-400">{t.id}</td>
                      <td className="py-3 px-4 font-semibold text-navy-950">{t.subject}</td>
                      <td className="py-3 px-4 text-center"><span className="badge-navy text-xs capitalize">{t.category.replace('_', ' ')}</span></td>
                      <td className="py-3 px-4 text-center">
                        <span className={`text-xs font-semibold capitalize ${t.priority === 'high' ? 'text-red-600' : t.priority === 'urgent' ? 'text-red-800' : 'text-gray-600'}`}>{t.priority}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${STATUS_STYLES[t.status]}`}>{t.status.replace('_', ' ')}</span>
                      </td>
                      <td className="py-3 px-4 text-right text-xs text-gray-400">{t.updated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'new' && !submitted && (
          <div className="max-w-xl">
            <h2 className="text-xl font-bold text-navy-950 mb-4">Submit a Support Ticket</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-navy-950 mb-1">Category</label>
                <select className="calc-input" value={newCategory} onChange={e => setNewCategory(e.target.value)}>
                  <option value="">Select category</option>
                  {['General', 'Deal Dispute', 'Payout', 'Account', 'Vendor', 'Technical', 'Billing', 'Verification'].map(c => (
                    <option key={c} value={c.toLowerCase().replace(' ', '_')}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-950 mb-1">Subject</label>
                <input className="calc-input" placeholder="Brief description of your issue" value={newSubject} onChange={e => setNewSubject(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-950 mb-1">Description</label>
                <textarea className="calc-input !h-32" placeholder="Describe the issue in detail..." value={newDesc} onChange={e => setNewDesc(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-950 mb-1">Priority</label>
                <div className="flex gap-2">
                  {['low', 'medium', 'high', 'urgent'].map(p => (
                    <button key={p} onClick={() => setNewPriority(p)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                        newPriority === p ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => setSubmitted(true)} className="btn-primary">Submit Ticket →</button>
            </div>
          </div>
        )}

        {tab === 'new' && submitted && (
          <div className="max-w-md mx-auto text-center py-12">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-navy-950 mb-2">Ticket Submitted</h2>
            <p className="text-gray-500 mb-4">We&apos;ll get back to you within 24 hours. Check your tickets for updates.</p>
            <button onClick={() => setTab('tickets')} className="btn-primary">View My Tickets →</button>
          </div>
        )}
      </div>
    </main>
  )
}
