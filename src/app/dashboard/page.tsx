'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import type { UserRole } from '@/lib/types'

// ─── Mock Data ───────────────────────────────────────────────────────────────

const MOCK_NOTIFICATIONS = [
  { id: '1', title: 'New deal routed to you', message: '3/2 SFH in Phoenix, AZ — Grade A deal waiting for your review.', time: '2h ago', type: 'deal', unread: true },
  { id: '2', title: 'Payout approved', message: 'Your $450 referral fee for Deal #8821 has been approved.', time: '1d ago', type: 'payout', unread: true },
  { id: '3', title: 'Deal under review', message: 'Your submitted deal "123 Oak St, Dallas TX" is being reviewed.', time: '2d ago', type: 'status', unread: false },
  { id: '4', title: 'New message from investor', message: 'Marcus T. sent you a message regarding your Tucson deal.', time: '3d ago', type: 'message', unread: false },
]

const MOCK_ACTIVE_DEALS_INVESTOR = [
  { id: 'd1', title: '4/2 Brick Ranch — Memphis, TN', grade: 'A', type: 'rental', askingPrice: 142000, roi: 14.2, matchScore: 94, status: 'routed' },
  { id: 'd2', title: 'Duplex Fixer-Upper — Kansas City, MO', grade: 'B', type: 'brrrr', askingPrice: 98000, roi: 11.8, matchScore: 87, status: 'routed' },
  { id: 'd3', title: 'Section 8 Certified SFH — Detroit, MI', grade: 'A', type: 'rental', askingPrice: 61000, roi: 18.5, matchScore: 91, status: 'viewed' },
]

const MOCK_SUBMITTED_DEALS = [
  { id: 'd4', title: '3/1 SFH — Birmingham, AL', grade: 'B', status: 'accepted', submittedAt: '2026-03-28', payout: 450 },
  { id: 'd5', title: 'Vacant Lot — Huntsville, AL', grade: 'C', status: 'under_review', submittedAt: '2026-03-30', payout: null },
  { id: 'd6', title: '2/1 Rental — Mobile, AL', grade: 'A', status: 'converted', submittedAt: '2026-03-15', payout: 750 },
]

const MOCK_SERVICE_STATS = {
  activeListings: 2,
  leadsReceived: 34,
  avgRating: 4.8,
  dealsCompleted: 12,
  pendingReviews: 3,
}

const MOCK_AGENT_STATS = {
  activeListings: 7,
  dealConnections: 4,
  pipelineValue: 2100000,
  closedThisMonth: 2,
}

const MOCK_LENDER_STATS = {
  fundingOpportunities: 5,
  activeLoans: 8,
  totalDeployed: 1420000,
  avgReturn: 9.2,
}

const MOCK_CONTRACTOR_STATS = {
  openLeads: 6,
  activeProjects: 3,
  completedThisMonth: 4,
  avgRating: 4.9,
}

const MOCK_PM_STATS = {
  propertiesManaged: 14,
  vacantUnits: 2,
  maintenanceOpen: 5,
  tenantsPlaced: 3,
}

const MOCK_EARNINGS_CHART = [320, 450, 275, 680, 420, 750, 580]
const CHART_MONTHS = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr']

// ─── Helpers ─────────────────────────────────────────────────────────────────

function gradeColor(grade: string) {
  const map: Record<string, string> = {
    A: 'bg-emerald-100 text-emerald-700',
    B: 'bg-blue-100 text-blue-700',
    C: 'bg-amber-100 text-amber-700',
    D: 'bg-orange-100 text-orange-700',
    F: 'bg-red-100 text-red-700',
  }
  return map[grade] ?? 'bg-slate-100 text-slate-600'
}

function statusColor(status: string) {
  const map: Record<string, string> = {
    converted: 'badge badge-sage',
    accepted: 'badge badge-brand',
    under_review: 'badge badge-navy',
    submitted: 'badge badge-navy',
    routed: 'badge badge-brand',
    viewed: 'bg-slate-100 text-slate-600 badge',
  }
  return map[status] ?? 'badge badge-navy'
}

function roleLabel(role: UserRole) {
  const map: Record<UserRole, string> = {
    investor: 'Investor',
    bird_dog: 'Bird Dog',
    vendor: 'Vendor',
    agent: 'Agent',
    lender: 'Lender',
    contractor: 'Contractor',
    property_manager: 'Property Manager',
    member: 'Member',
  }
  return map[role] ?? role
}

function formatCurrency(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n.toLocaleString()}`
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatCard({ label, value, sub, icon }: { label: string; value: string | number; sub?: string; icon: string }) {
  return (
    <div className="card p-5 flex items-start gap-4">
      <div className="w-11 h-11 rounded-xl bg-brand-100 flex items-center justify-center text-xl flex-shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-extrabold text-navy-950 leading-tight">{value}</p>
        <p className="text-sm font-medium text-slate-500 mt-0.5">{label}</p>
        {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
      </div>
    </div>
  )
}

function NotificationItem({ n }: { n: typeof MOCK_NOTIFICATIONS[0] }) {
  const icons: Record<string, string> = { deal: '🏠', payout: '💰', status: '📋', message: '💬' }
  return (
    <div className={`flex items-start gap-3 py-3 border-b border-slate-100 last:border-0 ${n.unread ? 'opacity-100' : 'opacity-70'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${n.unread ? 'bg-brand-100' : 'bg-slate-100'}`}>
        {icons[n.type] ?? '🔔'}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold text-navy-950 ${n.unread ? '' : 'font-medium'}`}>{n.title}</p>
        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{n.message}</p>
      </div>
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        <span className="text-xs text-slate-400">{n.time}</span>
        {n.unread && <span className="w-2 h-2 rounded-full bg-brand-500 block" />}
      </div>
    </div>
  )
}

function MiniEarningsChart() {
  const max = Math.max(...MOCK_EARNINGS_CHART)
  return (
    <div className="card p-5">
      <h3 className="text-sm font-bold text-navy-950 mb-4">Monthly Earnings</h3>
      <div className="flex items-end gap-2 h-24">
        {MOCK_EARNINGS_CHART.map((val, i) => (
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            <div
              className="w-full rounded-t-md bg-brand-400 transition-all"
              style={{ height: `${(val / max) * 88}px` }}
            />
            <span className="text-xs text-slate-400">{CHART_MONTHS[i]}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-400 mt-3 text-center">Last 7 months · Total $3,475</p>
    </div>
  )
}

// ─── Role Sections ────────────────────────────────────────────────────────────

function InvestorSection() {
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-navy-950">Deals Routed to You</h2>
          <span className="badge badge-brand">{MOCK_ACTIVE_DEALS_INVESTOR.length} New</span>
        </div>
        <div className="space-y-3">
          {MOCK_ACTIVE_DEALS_INVESTOR.map(deal => (
            <div key={deal.id} className="flex items-center gap-4 p-4 rounded-xl bg-warm-50 border border-slate-100 hover:border-brand-200 transition-colors">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-navy-950 text-sm truncate">{deal.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${gradeColor(deal.grade)}`}>Grade {deal.grade}</span>
                  <span className="text-xs text-slate-500 capitalize">{deal.type}</span>
                  <span className="text-xs text-sage-600 font-semibold">{deal.roi}% ROI</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-navy-950">{formatCurrency(deal.askingPrice)}</p>
                <p className="text-xs text-slate-400">{deal.matchScore}% match</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Link href={`/deals/${deal.id}`} className="btn-primary text-xs py-1.5 px-3">View</Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-base font-bold text-navy-950 mb-4">Portfolio Summary</h3>
          <div className="space-y-3">
            {[
              { label: 'Total Properties', value: '6' },
              { label: 'Portfolio Value', value: '$812,000' },
              { label: 'Monthly Cash Flow', value: '$2,340' },
              { label: 'Avg Cap Rate', value: '8.4%' },
            ].map(item => (
              <div key={item.label} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                <span className="text-sm text-slate-600">{item.label}</span>
                <span className="text-sm font-bold text-navy-950">{item.value}</span>
              </div>
            ))}
          </div>
          <Link href="/portfolios" className="btn-secondary w-full justify-center mt-4 text-sm">View Portfolio</Link>
        </div>

        <div className="card p-6">
          <h3 className="text-base font-bold text-navy-950 mb-4">Investment Criteria</h3>
          <div className="space-y-3">
            {[
              { label: 'Target Markets', value: 'TN, AL, GA, OH' },
              { label: 'Deal Types', value: 'Rental, BRRRR' },
              { label: 'Min ROI', value: '10%' },
              { label: 'Max Price', value: '$250K' },
            ].map(item => (
              <div key={item.label} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                <span className="text-sm text-slate-600">{item.label}</span>
                <span className="text-sm font-semibold text-navy-900">{item.value}</span>
              </div>
            ))}
          </div>
          <button className="btn-secondary w-full justify-center mt-4 text-sm">Edit Criteria</button>
        </div>
      </div>
    </div>
  )
}

function BirdDogSection() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-navy-950">Your Submitted Deals</h2>
            <Link href="/deals/submit" className="btn-primary text-xs py-1.5 px-3">+ Submit Deal</Link>
          </div>
          <div className="space-y-3">
            {MOCK_SUBMITTED_DEALS.map(deal => (
              <div key={deal.id} className="flex items-center gap-3 p-3 rounded-xl bg-warm-50 border border-slate-100">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-navy-950 truncate">{deal.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{deal.submittedAt}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${gradeColor(deal.grade)}`}>
                    {deal.grade}
                  </span>
                  <span className={statusColor(deal.status)}>
                    {deal.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <MiniEarningsChart />
      </div>

      <div className="card p-6 bg-gradient-to-r from-brand-500 to-brand-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-extrabold">Found a hot deal?</h3>
            <p className="text-brand-100 mt-1 text-sm">Submit it in minutes. Earn $250–$1,500 per converted deal.</p>
          </div>
          <Link href="/deals/submit" className="bg-white text-brand-600 font-bold px-5 py-2.5 rounded-xl hover:bg-brand-50 transition-colors text-sm flex-shrink-0">
            Submit Now →
          </Link>
        </div>
      </div>
    </div>
  )
}

function VendorSection() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Listings', value: MOCK_SERVICE_STATS.activeListings, icon: '📋' },
          { label: 'Leads Received', value: MOCK_SERVICE_STATS.leadsReceived, icon: '📥' },
          { label: 'Avg Rating', value: `${MOCK_SERVICE_STATS.avgRating}★`, icon: '⭐' },
          { label: 'Jobs Completed', value: MOCK_SERVICE_STATS.dealsCompleted, icon: '✅' },
        ].map(s => (
          <div key={s.label} className="card p-4 text-center">
            <p className="text-2xl mb-1">{s.icon}</p>
            <p className="text-xl font-extrabold text-navy-950">{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="card p-6">
        <h3 className="text-base font-bold text-navy-950 mb-3">Recent Leads</h3>
        <div className="space-y-3">
          {[
            { name: 'Marcus T.', need: 'General Contractor', location: 'Phoenix, AZ', time: '1h ago' },
            { name: 'Sarah K.', need: 'Property Inspector', location: 'Denver, CO', time: '4h ago' },
            { name: 'James R.', need: 'Hard Money Lender', location: 'Nashville, TN', time: '1d ago' },
          ].map((lead, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-warm-50 border border-slate-100">
              <div>
                <p className="text-sm font-semibold text-navy-950">{lead.name}</p>
                <p className="text-xs text-slate-500">{lead.need} · {lead.location}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">{lead.time}</span>
                <button className="btn-primary text-xs py-1.5 px-3">Reply</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AgentSection() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Listings', value: MOCK_AGENT_STATS.activeListings, icon: '🏠' },
          { label: 'Deal Connections', value: MOCK_AGENT_STATS.dealConnections, icon: '🤝' },
          { label: 'Pipeline Value', value: formatCurrency(MOCK_AGENT_STATS.pipelineValue), icon: '💼' },
          { label: 'Closed This Month', value: MOCK_AGENT_STATS.closedThisMonth, icon: '🔑' },
        ].map(s => (
          <div key={s.label} className="card p-4 text-center">
            <p className="text-2xl mb-1">{s.icon}</p>
            <p className="text-xl font-extrabold text-navy-950">{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="card p-6">
        <h3 className="text-base font-bold text-navy-950 mb-3">Client Pipeline</h3>
        <div className="space-y-2">
          {[
            { name: 'The Johnson Family', stage: 'Pre-Approval', value: '$320K budget', status: 'active' },
            { name: 'David & Priya Chen', stage: 'House Hunting', value: '$550K budget', status: 'active' },
            { name: 'RetireRight LLC', stage: 'Making Offer', value: '4-plex', status: 'hot' },
          ].map((client, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-warm-50 border border-slate-100">
              <div>
                <p className="text-sm font-semibold text-navy-950">{client.name}</p>
                <p className="text-xs text-slate-500">{client.stage} · {client.value}</p>
              </div>
              <span className={client.status === 'hot' ? 'badge badge-brand' : 'badge badge-navy'}>
                {client.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function LenderSection() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Funding Opps', value: MOCK_LENDER_STATS.fundingOpportunities, icon: '💡' },
          { label: 'Active Loans', value: MOCK_LENDER_STATS.activeLoans, icon: '🏦' },
          { label: 'Total Deployed', value: formatCurrency(MOCK_LENDER_STATS.totalDeployed), icon: '💰' },
          { label: 'Avg Return', value: `${MOCK_LENDER_STATS.avgReturn}%`, icon: '📈' },
        ].map(s => (
          <div key={s.label} className="card p-4 text-center">
            <p className="text-2xl mb-1">{s.icon}</p>
            <p className="text-xl font-extrabold text-navy-950">{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="card p-6">
        <h3 className="text-base font-bold text-navy-950 mb-3">Funding Opportunities</h3>
        <div className="space-y-3">
          {[
            { title: 'Fix & Flip — Chattanooga, TN', amount: '$85,000', ltv: '65% LTV', grade: 'A' },
            { title: 'BRRRR — Columbus, OH', amount: '$120,000', ltv: '70% LTV', grade: 'B' },
            { title: 'Land Acquisition — Raleigh, NC', amount: '$45,000', ltv: '55% LTV', grade: 'B' },
          ].map((opp, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-warm-50 border border-slate-100">
              <div>
                <p className="text-sm font-semibold text-navy-950">{opp.title}</p>
                <p className="text-xs text-slate-500">{opp.amount} · {opp.ltv}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${gradeColor(opp.grade)}`}>Grade {opp.grade}</span>
                <button className="btn-primary text-xs py-1.5 px-3">Review</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ContractorSection() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Open Leads', value: MOCK_CONTRACTOR_STATS.openLeads, icon: '📩' },
          { label: 'Active Projects', value: MOCK_CONTRACTOR_STATS.activeProjects, icon: '🔨' },
          { label: 'Completed / Mo', value: MOCK_CONTRACTOR_STATS.completedThisMonth, icon: '✅' },
          { label: 'Avg Rating', value: `${MOCK_CONTRACTOR_STATS.avgRating}★`, icon: '⭐' },
        ].map(s => (
          <div key={s.label} className="card p-4 text-center">
            <p className="text-2xl mb-1">{s.icon}</p>
            <p className="text-xl font-extrabold text-navy-950">{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="card p-6">
        <h3 className="text-base font-bold text-navy-950 mb-3">Active Job Leads</h3>
        <div className="space-y-3">
          {[
            { job: 'Full Kitchen Remodel', location: 'Huntsville, AL', budget: '$18K–$25K', urgency: 'High' },
            { job: 'Roof Replacement', location: 'Birmingham, AL', budget: '$8K–$12K', urgency: 'Medium' },
            { job: 'Foundation Repair', location: 'Mobile, AL', budget: '$5K–$9K', urgency: 'High' },
          ].map((lead, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-warm-50 border border-slate-100">
              <div>
                <p className="text-sm font-semibold text-navy-950">{lead.job}</p>
                <p className="text-xs text-slate-500">{lead.location} · {lead.budget}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={lead.urgency === 'High' ? 'badge badge-brand' : 'badge badge-navy'}>{lead.urgency}</span>
                <button className="btn-primary text-xs py-1.5 px-3">Bid</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PropertyManagerSection() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Properties', value: MOCK_PM_STATS.propertiesManaged, icon: '🏘️' },
          { label: 'Vacant Units', value: MOCK_PM_STATS.vacantUnits, icon: '🔓' },
          { label: 'Maintenance Open', value: MOCK_PM_STATS.maintenanceOpen, icon: '🔧' },
          { label: 'Tenants Placed', value: MOCK_PM_STATS.tenantsPlaced, icon: '👥' },
        ].map(s => (
          <div key={s.label} className="card p-4 text-center">
            <p className="text-2xl mb-1">{s.icon}</p>
            <p className="text-xl font-extrabold text-navy-950">{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="card p-6">
        <h3 className="text-base font-bold text-navy-950 mb-3">Maintenance Requests</h3>
        <div className="space-y-3">
          {[
            { address: '412 Oak Blvd, Unit 3', issue: 'HVAC not cooling', priority: 'Urgent', submitted: '2h ago' },
            { address: '881 Pine St', issue: 'Leaking kitchen faucet', priority: 'Normal', submitted: '1d ago' },
            { address: '204 Elm Dr, Unit 1', issue: 'Broken door lock', priority: 'High', submitted: '2d ago' },
          ].map((req, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-warm-50 border border-slate-100">
              <div>
                <p className="text-sm font-semibold text-navy-950">{req.issue}</p>
                <p className="text-xs text-slate-500">{req.address} · {req.submitted}</p>
              </div>
              <span className={req.priority === 'Urgent' ? 'badge badge-brand' : req.priority === 'High' ? 'badge badge-sage' : 'badge badge-navy'}>
                {req.priority}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function QuickActionsBar({ role }: { role: UserRole }) {
  const actions: Record<UserRole, { label: string; href: string; icon: string; primary?: boolean }[]> = {
    investor: [
      { label: 'Browse Deals', href: '/deals', icon: '🏠', primary: true },
      { label: 'My Portfolio', href: '/portfolios', icon: '📊' },
      { label: 'Find Lenders', href: '/vendors?cat=lender', icon: '🏦' },
      { label: 'Run Calculator', href: '/calculators', icon: '🧮' },
    ],
    bird_dog: [
      { label: 'Submit a Deal', href: '/deals/submit', icon: '➕', primary: true },
      { label: 'My Deals', href: '/deals', icon: '📋' },
      { label: 'Earnings', href: '/dashboard', icon: '💰' },
      { label: 'Learn', href: '/learn', icon: '📚' },
    ],
    vendor: [
      { label: 'View Leads', href: '/dashboard', icon: '📥', primary: true },
      { label: 'My Listings', href: '/vendors', icon: '📋' },
      { label: 'Browse Deals', href: '/deals', icon: '🏠' },
      { label: 'Support', href: '/support', icon: '💬' },
    ],
    agent: [
      { label: 'Deal Feed', href: '/deals', icon: '🔍', primary: true },
      { label: 'My Listings', href: '/listings', icon: '🏠' },
      { label: 'Clients', href: '/dashboard', icon: '👥' },
      { label: 'Market Reports', href: '/market-reports', icon: '📈' },
    ],
    lender: [
      { label: 'Fund a Deal', href: '/deals', icon: '💰', primary: true },
      { label: 'Active Loans', href: '/dashboard', icon: '🏦' },
      { label: 'My Profile', href: '/vendors', icon: '👤' },
      { label: 'Calculators', href: '/calculators', icon: '🧮' },
    ],
    contractor: [
      { label: 'View Leads', href: '/dashboard', icon: '📩', primary: true },
      { label: 'My Projects', href: '/dashboard', icon: '🔨' },
      { label: 'My Listing', href: '/vendors', icon: '📋' },
      { label: 'Estimate Tool', href: '/calculators', icon: '🧮' },
    ],
    property_manager: [
      { label: 'Properties', href: '/dashboard', icon: '🏘️', primary: true },
      { label: 'Maintenance', href: '/dashboard', icon: '🔧' },
      { label: 'Tenant Pipeline', href: '/dashboard', icon: '👥' },
      { label: 'Deal Feed', href: '/deals', icon: '🏠' },
    ],
    member: [
      { label: 'Browse Deals', href: '/deals', icon: '🏠', primary: true },
      { label: 'Calculators', href: '/calculators', icon: '🧮' },
      { label: 'Learn', href: '/learn', icon: '📚' },
      { label: 'Forum', href: '/forum', icon: '💬' },
    ],
  }

  const roleActions = actions[role] ?? actions.member

  return (
    <div className="flex flex-wrap gap-3">
      {roleActions.map((action) => (
        <Link
          key={action.href + action.label}
          href={action.href}
          className={action.primary ? 'btn-primary text-sm' : 'btn-secondary text-sm'}
        >
          <span>{action.icon}</span>
          {action.label}
        </Link>
      ))}
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { profile, loading, isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState<'overview' | 'notifications' | 'activity'>('overview')

  if (loading) {
    return (
      <div className="min-h-screen bg-warm-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin" />
          <p className="text-slate-500 text-sm">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !profile) {
    return (
      <div className="min-h-screen bg-warm-50 flex items-center justify-center">
        <div className="card p-10 text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">
            🔐
          </div>
          <h2 className="text-2xl font-extrabold text-navy-950 mb-2">Sign In Required</h2>
          <p className="text-slate-500 mb-6">You need to be signed in to access your dashboard.</p>
          <Link href="/auth/login" className="btn-primary justify-center w-full">
            Sign In to Continue
          </Link>
          <p className="text-sm text-slate-400 mt-4">
            No account?{' '}
            <Link href="/auth/signup" className="text-brand-600 font-semibold hover:underline">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    )
  }

  const role = profile.primary_role
  const firstName = profile.full_name?.split(' ')[0] ?? 'there'

  const roleSectionMap: Record<UserRole, React.ReactNode> = {
    investor: <InvestorSection />,
    bird_dog: <BirdDogSection />,
    vendor: <VendorSection />,
    agent: <AgentSection />,
    lender: <LenderSection />,
    contractor: <ContractorSection />,
    property_manager: <PropertyManagerSection />,
    member: (
      <div className="card p-8 text-center">
        <p className="text-2xl mb-3">👋</p>
        <h3 className="text-lg font-bold text-navy-950 mb-2">Welcome to PropertyCalc!</h3>
        <p className="text-slate-500 mb-4">Explore deals, run calculators, or upgrade your role to unlock full features.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/deals" className="btn-primary">Browse Deals</Link>
          <Link href="/calculators" className="btn-secondary">Calculators</Link>
        </div>
      </div>
    ),
  }

  return (
    <div className="min-h-screen bg-warm-50">
      {/* Welcome Banner */}
      <div className="bg-hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-brand-500 flex items-center justify-center font-extrabold text-white text-lg">
                  {firstName[0].toUpperCase()}
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold text-white">
                    Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {firstName}
                  </h1>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="badge badge-brand">{roleLabel(role)}</span>
                    {profile.is_verified && (
                      <span className="badge badge-sage">✓ Verified</span>
                    )}
                    <span className="badge badge-navy capitalize">{profile.membership}</span>
                  </div>
                </div>
              </div>
              <p className="text-navy-200 text-sm ml-15">
                {profile.location_city && profile.location_state
                  ? `${profile.location_city}, ${profile.location_state}`
                  : profile.company_name ?? 'PropertyCalc Member'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <QuickActionsBar role={role} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Deals Submitted"
            value={profile.deals_submitted}
            sub="All time"
            icon="📤"
          />
          <StatCard
            label="Deals Converted"
            value={profile.deals_converted}
            sub={`${profile.deals_submitted > 0 ? Math.round((profile.deals_converted / profile.deals_submitted) * 100) : 0}% conversion`}
            icon="✅"
          />
          <StatCard
            label="Total Earnings"
            value={`$${profile.total_earnings.toLocaleString()}`}
            sub="From referral fees"
            icon="💰"
          />
          <StatCard
            label="Trust Score"
            value={`${profile.trust_score}/100`}
            sub={profile.trust_score >= 80 ? 'Excellent' : profile.trust_score >= 60 ? 'Good' : 'Building'}
            icon="⭐"
          />
        </div>

        {/* Tab Bar */}
        <div className="flex gap-1 mb-6 border-b border-slate-200">
          {(['overview', 'notifications', 'activity'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-sm font-semibold capitalize transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? 'border-brand-500 text-brand-600'
                  : 'border-transparent text-slate-500 hover:text-navy-900'
              }`}
            >
              {tab}
              {tab === 'notifications' && MOCK_NOTIFICATIONS.filter(n => n.unread).length > 0 && (
                <span className="ml-1.5 bg-brand-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  {MOCK_NOTIFICATIONS.filter(n => n.unread).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Role Section */}
            <div className="lg:col-span-2">
              {roleSectionMap[role]}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Notifications Peek */}
              <div className="card p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-navy-950">Recent Notifications</h3>
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className="text-xs text-brand-600 font-semibold hover:underline"
                  >
                    View all
                  </button>
                </div>
                <div>
                  {MOCK_NOTIFICATIONS.slice(0, 3).map(n => (
                    <NotificationItem key={n.id} n={n} />
                  ))}
                </div>
              </div>

              {/* Trust Score Card */}
              <div className="card p-5">
                <h3 className="text-sm font-bold text-navy-950 mb-3">Trust Score</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl font-extrabold text-navy-950">{profile.trust_score}</span>
                  <span className="text-sm text-slate-500">/100</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600 transition-all"
                    style={{ width: `${profile.trust_score}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  {profile.trust_score >= 80
                    ? 'Excellent standing — you unlock priority routing.'
                    : profile.trust_score >= 60
                    ? 'Good standing. Submit more deals to increase.'
                    : 'Complete your profile and submit a deal to build trust.'}
                </p>
                {!profile.is_verified && (
                  <button className="btn-secondary w-full justify-center mt-3 text-xs">
                    Get Verified +20 pts
                  </button>
                )}
              </div>

              {/* Upgrade CTA for free tier */}
              {profile.membership === 'free' && (
                <div className="card-elevated p-5 bg-gradient-to-br from-navy-950 to-navy-800 text-white">
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-400 mb-1">Pro Membership</p>
                  <h3 className="text-base font-extrabold mb-2">Unlock Full Access</h3>
                  <ul className="text-xs text-navy-200 space-y-1.5 mb-4">
                    <li>✓ Unlimited deal submissions</li>
                    <li>✓ Priority routing to investors</li>
                    <li>✓ Advanced analytics & reports</li>
                    <li>✓ Featured vendor listing</li>
                  </ul>
                  <Link href="/pricing" className="btn-primary w-full justify-center text-sm">
                    Upgrade to Pro →
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="max-w-2xl">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-navy-950">All Notifications</h2>
                <button className="text-xs text-brand-600 font-semibold hover:underline">
                  Mark all read
                </button>
              </div>
              <div>
                {MOCK_NOTIFICATIONS.map(n => (
                  <NotificationItem key={n.id} n={n} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="max-w-2xl">
            <div className="card p-6">
              <h2 className="text-lg font-bold text-navy-950 mb-5">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  { icon: '📤', text: 'Submitted deal "3/1 SFH — Birmingham, AL"', time: '2026-03-28', color: 'bg-brand-100' },
                  { icon: '👁️', text: 'Viewed deal "4/2 Ranch — Memphis, TN"', time: '2026-03-27', color: 'bg-navy-100' },
                  { icon: '💰', text: 'Payout of $450 approved for Deal #8821', time: '2026-03-25', color: 'bg-sage-100' },
                  { icon: '✅', text: 'Profile verified successfully', time: '2026-03-20', color: 'bg-sage-100' },
                  { icon: '🔑', text: 'Account created', time: '2026-03-15', color: 'bg-navy-100' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-8 h-8 ${item.color} rounded-full flex items-center justify-center text-sm flex-shrink-0`}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-navy-950">{item.text}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
