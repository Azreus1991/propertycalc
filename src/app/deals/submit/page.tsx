'use client'

import { useState } from 'react'
import Link from 'next/link'
import { underwriteDeal } from '@/lib/underwriting'
import type { DealType } from '@/lib/types'

const DEAL_TYPES: { value: DealType; label: string; icon: string; desc: string }[] = [
  { value: 'bird_dog', label: 'Bird Dog', icon: '🐕', desc: 'Found a deal? Submit it for a finder\'s fee' },
  { value: 'wholesale', label: 'Wholesale', icon: '📋', desc: 'Assign the contract to an investor for a fee' },
  { value: 'arbitrage', label: 'Arbitrage', icon: '🔄', desc: 'Rental arbitrage or co-hosting opportunity' },
  { value: 'flip', label: 'Fix & Flip', icon: '🔨', desc: 'Buy, rehab, and sell for profit' },
  { value: 'rental', label: 'Buy & Hold', icon: '🏠', desc: 'Cash-flowing rental property' },
  { value: 'brrrr', label: 'BRRRR', icon: '♻️', desc: 'Buy, Rehab, Rent, Refinance, Repeat' },
  { value: 'commercial', label: 'Commercial', icon: '🏢', desc: 'Commercial real estate opportunity' },
  { value: 'contract_assignment', label: 'Contract Assignment', icon: '✍️', desc: 'Assign purchase contract to end buyer' },
]

const STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']

const PROPERTY_TYPES = ['SFH', 'Multi-family', 'Condo', 'Townhouse', 'Commercial', 'Land', 'Mixed-Use', 'Mobile Home']

export default function SubmitDealPage() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)

  // Step 1 - Deal type
  const [dealType, setDealType] = useState<DealType | ''>('')

  // Step 2 - Property
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [bathrooms, setBathrooms] = useState('')
  const [sqft, setSqft] = useState('')
  const [yearBuilt, setYearBuilt] = useState('')

  // Step 3 - Financials
  const [askingPrice, setAskingPrice] = useState('')
  const [arv, setArv] = useState('')
  const [repairCost, setRepairCost] = useState('')
  const [monthlyRent, setMonthlyRent] = useState('')
  const [monthlyExpenses, setMonthlyExpenses] = useState('')
  const [description, setDescription] = useState('')

  const [error, setError] = useState('')

  const validate = () => {
    setError('')
    if (step === 1 && !dealType) { setError('Select a deal type'); return false }
    if (step === 2) {
      if (!city || !state) { setError('City and state are required'); return false }
    }
    if (step === 3) {
      if (!askingPrice && dealType !== 'arbitrage') { setError('Asking price is required for this deal type'); return false }
    }
    return true
  }

  const next = () => { if (validate()) setStep(s => Math.min(s + 1, 5)) }
  const prev = () => setStep(s => Math.max(s - 1, 1))

  // Underwriting
  const underwriting = step >= 4 ? underwriteDeal({
    asking_price: parseFloat(askingPrice) || 0,
    arv: parseFloat(arv) || undefined,
    estimated_repair: parseFloat(repairCost) || undefined,
    monthly_rent: parseFloat(monthlyRent) || undefined,
    monthly_expenses: parseFloat(monthlyExpenses) || undefined,
  }) : null

  const handleSubmit = () => {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-white">
        <section className="bg-hero-gradient py-16">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-4xl font-black text-white mb-3">Deal Submitted!</h1>
            <p className="text-lg text-white/80">Your deal has been submitted for review. You&apos;ll be notified when it&apos;s accepted and routed to investors.</p>
          </div>
        </section>
        <div className="max-w-xl mx-auto px-6 py-12">
          <div className="card-elevated text-center">
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 text-sm font-semibold px-4 py-2 rounded-full mb-4">
              <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
              Status: Under Review
            </div>
            <h2 className="text-xl font-bold text-navy-950 mb-2">{dealType ? DEAL_TYPES.find(t => t.value === dealType)?.label : ''} Deal</h2>
            <p className="text-gray-500 mb-1">{address ? address + ', ' : ''}{city}, {state}</p>
            {underwriting && (
              <div className="flex items-center justify-center gap-4 mt-4">
                <div className={`text-2xl font-black ${underwriting.overall_grade === 'A' ? 'text-emerald-600' : underwriting.overall_grade === 'B' ? 'text-blue-600' : 'text-yellow-600'}`}>
                  Grade {underwriting.overall_grade}
                </div>
                <div className="text-sm text-gray-500">ROI Score: {underwriting.roi_score.toFixed(0)}/100</div>
              </div>
            )}
            <div className="flex gap-3 mt-6 justify-center">
              <Link href="/deals" className="btn-secondary">View All Deals</Link>
              <Link href="/dashboard" className="btn-primary">Go to Dashboard</Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-hero-gradient py-12">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-white/70 mb-4">
            <Link href="/" className="hover:text-white">Home</Link><span>/</span>
            <Link href="/deals" className="hover:text-white">Deals</Link><span>/</span>
            <span className="text-white">Submit</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Submit a Deal</h1>
          <p className="text-white/80">Get your deal underwritten, graded, and routed to investors.</p>
        </div>
      </section>

      {/* Progress */}
      <div className="max-w-3xl mx-auto px-6 -mt-5">
        <div className="card-elevated">
          <div className="flex items-center justify-between mb-2">
            {['Deal Type', 'Property', 'Financials', 'Underwriting', 'Review'].map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step > i + 1 ? 'bg-emerald-500 text-white' : step === i + 1 ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-400'
                }`}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span className={`text-sm hidden sm:inline ${step === i + 1 ? 'font-bold text-navy-950' : 'text-gray-400'}`}>{label}</span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div className="bg-brand-600 h-1.5 rounded-full transition-all" style={{ width: `${(step / 5) * 100}%` }}></div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm font-medium">{error}</div>
        )}

        {/* Step 1 — Deal Type */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-navy-950 mb-1">What type of deal is this?</h2>
            <p className="text-gray-500 mb-6">Select the category that best describes your deal.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {DEAL_TYPES.map(t => (
                <button key={t.value} onClick={() => setDealType(t.value)}
                  className={`text-left p-4 rounded-xl border-2 transition-all ${dealType === t.value ? 'border-brand-600 bg-brand-50 shadow-md' : 'border-gray-100 hover:border-gray-200'}`}>
                  <div className="text-2xl mb-1">{t.icon}</div>
                  <div className="font-bold text-navy-950">{t.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 — Property Details */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-navy-950 mb-1">Property Details</h2>
            <p className="text-gray-500 mb-6">Tell us about the property.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-navy-950 mb-1">Address</label>
                <input className="calc-input" placeholder="123 Main St" value={address} onChange={e => setAddress(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-navy-950 mb-1">City *</label>
                  <input className="calc-input" placeholder="Memphis" value={city} onChange={e => setCity(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-950 mb-1">State *</label>
                  <select className="calc-input" value={state} onChange={e => setState(e.target.value)}>
                    <option value="">Select</option>
                    {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-950 mb-1">ZIP</label>
                  <input className="calc-input" placeholder="38101" value={zip} onChange={e => setZip(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-950 mb-1">Property Type</label>
                <div className="flex flex-wrap gap-2">
                  {PROPERTY_TYPES.map(pt => (
                    <button key={pt} onClick={() => setPropertyType(pt)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${propertyType === pt ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      {pt}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-navy-950 mb-1">Bedrooms</label>
                  <input className="calc-input" type="number" placeholder="3" value={bedrooms} onChange={e => setBedrooms(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-950 mb-1">Bathrooms</label>
                  <input className="calc-input" type="number" step="0.5" placeholder="2" value={bathrooms} onChange={e => setBathrooms(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-950 mb-1">Sqft</label>
                  <input className="calc-input" type="number" placeholder="1,800" value={sqft} onChange={e => setSqft(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-950 mb-1">Year Built</label>
                  <input className="calc-input" type="number" placeholder="1985" value={yearBuilt} onChange={e => setYearBuilt(e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3 — Financials */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-navy-950 mb-1">Financial Details</h2>
            <p className="text-gray-500 mb-6">Enter the numbers. Our engine will underwrite the deal.</p>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-navy-950 mb-1">Asking Price {dealType !== 'arbitrage' && '*'}</label>
                  <input className="calc-input" type="number" placeholder="145,000" value={askingPrice} onChange={e => setAskingPrice(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-950 mb-1">After Repair Value (ARV)</label>
                  <input className="calc-input" type="number" placeholder="210,000" value={arv} onChange={e => setArv(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-950 mb-1">Estimated Repair Costs</label>
                <input className="calc-input" type="number" placeholder="25,000" value={repairCost} onChange={e => setRepairCost(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-navy-950 mb-1">Monthly Rent</label>
                  <input className="calc-input" type="number" placeholder="1,500" value={monthlyRent} onChange={e => setMonthlyRent(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-950 mb-1">Monthly Expenses (excl. mortgage)</label>
                  <input className="calc-input" type="number" placeholder="400" value={monthlyExpenses} onChange={e => setMonthlyExpenses(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-950 mb-1">Deal Description</label>
                <textarea className="calc-input !h-24" placeholder="Describe the deal — what makes it a good opportunity?" value={description} onChange={e => setDescription(e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {/* Step 4 — Underwriting */}
        {step === 4 && underwriting && (
          <div>
            <h2 className="text-2xl font-bold text-navy-950 mb-1">Deal Underwriting</h2>
            <p className="text-gray-500 mb-6">Our engine analyzed your deal. Here&apos;s the verdict.</p>

            {/* Grade + Scores */}
            <div className="card-elevated mb-6">
              <div className="flex items-center gap-6">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black ${
                  underwriting.overall_grade === 'A' ? 'bg-emerald-100 text-emerald-700' :
                  underwriting.overall_grade === 'B' ? 'bg-blue-100 text-blue-700' :
                  underwriting.overall_grade === 'C' ? 'bg-yellow-100 text-yellow-700' :
                  underwriting.overall_grade === 'D' ? 'bg-orange-100 text-orange-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {underwriting.overall_grade}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-navy-950">
                    {underwriting.overall_grade === 'A' ? 'Excellent Deal' : underwriting.overall_grade === 'B' ? 'Good Deal' : underwriting.overall_grade === 'C' ? 'Average Deal' : 'Below Average'}
                  </h3>
                  <div className="flex gap-4 mt-2">
                    <div>
                      <div className="text-xs text-gray-500">ROI Score</div>
                      <div className="font-bold text-navy-950">{underwriting.roi_score.toFixed(0)}/100</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Cash Flow Score</div>
                      <div className="font-bold text-navy-950">{underwriting.cash_flow_score.toFixed(0)}/100</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Risk Score</div>
                      <div className="font-bold text-navy-950">{underwriting.risk_score.toFixed(0)}/100</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategy Tags */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-navy-950 mb-2">Detected Strategies</h3>
              <div className="flex gap-2">
                {underwriting.strategy_detected.map(s => (
                  <span key={s} className="badge-brand capitalize">{s.replace('_', ' ')}</span>
                ))}
              </div>
            </div>

            {/* Breakdown */}
            <div className="space-y-2">
              {underwriting.breakdown.map(item => (
                <div key={item.label} className="flex items-center justify-between py-2.5 px-4 rounded-lg bg-gray-50">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-navy-950">{item.value}</span>
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      item.status === 'good' ? 'bg-emerald-500' : item.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 5 — Review */}
        {step === 5 && (
          <div>
            <h2 className="text-2xl font-bold text-navy-950 mb-1">Review & Submit</h2>
            <p className="text-gray-500 mb-6">Confirm everything looks good before submitting.</p>

            <div className="space-y-4">
              <div className="card">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-navy-950">Deal Type</h3>
                  <button onClick={() => setStep(1)} className="text-brand-600 text-sm font-medium hover:underline">Edit</button>
                </div>
                <span className="badge-brand capitalize">{dealType ? dealType.replace('_', ' ') : ''}</span>
              </div>

              <div className="card">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-navy-950">Property</h3>
                  <button onClick={() => setStep(2)} className="text-brand-600 text-sm font-medium hover:underline">Edit</button>
                </div>
                <p className="text-sm text-gray-600">
                  {address && address + ', '}{city}, {state} {zip}<br />
                  {propertyType && <span>{propertyType} • </span>}
                  {bedrooms && <span>{bedrooms} bd • </span>}
                  {bathrooms && <span>{bathrooms} ba • </span>}
                  {sqft && <span>{parseInt(sqft).toLocaleString()} sqft</span>}
                </p>
              </div>

              <div className="card">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-navy-950">Financials</h3>
                  <button onClick={() => setStep(3)} className="text-brand-600 text-sm font-medium hover:underline">Edit</button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {askingPrice && <div><span className="text-gray-500">Asking:</span> <span className="font-bold">${parseInt(askingPrice).toLocaleString()}</span></div>}
                  {arv && <div><span className="text-gray-500">ARV:</span> <span className="font-bold">${parseInt(arv).toLocaleString()}</span></div>}
                  {repairCost && <div><span className="text-gray-500">Repairs:</span> <span className="font-bold">${parseInt(repairCost).toLocaleString()}</span></div>}
                  {monthlyRent && <div><span className="text-gray-500">Rent:</span> <span className="font-bold">${parseInt(monthlyRent).toLocaleString()}/mo</span></div>}
                </div>
              </div>

              {underwriting && (
                <div className="card">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-navy-950">Underwriting</h3>
                    <button onClick={() => setStep(4)} className="text-brand-600 text-sm font-medium hover:underline">View</button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-2xl font-black ${
                      underwriting.overall_grade === 'A' ? 'text-emerald-600' : underwriting.overall_grade === 'B' ? 'text-blue-600' : 'text-yellow-600'
                    }`}>Grade {underwriting.overall_grade}</span>
                    <span className="text-sm text-gray-500">ROI: {underwriting.roi_score.toFixed(0)} • CF: {underwriting.cash_flow_score.toFixed(0)} • Risk: {underwriting.risk_score.toFixed(0)}</span>
                  </div>
                </div>
              )}
            </div>

            <label className="flex items-start gap-3 mt-6 cursor-pointer">
              <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
              <span className="text-sm text-gray-600">
                I confirm this deal information is accurate and I have authorization to submit it. I understand that submitting false information may result in account suspension.
              </span>
            </label>
          </div>
        )}

        {/* Nav */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
          <button onClick={prev} className={`btn-secondary ${step === 1 ? 'invisible' : ''}`}>← Back</button>
          {step < 5 ? (
            <button onClick={next} className="btn-primary">Continue →</button>
          ) : (
            <button onClick={handleSubmit} className="btn-primary">Submit Deal →</button>
          )}
        </div>
      </div>
    </main>
  )
}
