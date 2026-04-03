'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Conversation {
  id: string; name: string; role: string; lastMsg: string; time: string; unread: number; online: boolean; dealId?: string; dealTitle?: string
}

const CONVERSATIONS: Conversation[] = [
  { id: '1', name: 'Marcus T.', role: 'Bird Dog', lastMsg: 'The seller is motivated, they\'ll take $140K', time: '2m ago', unread: 3, online: true, dealId: '1', dealTitle: 'Off-Market Duplex — Memphis' },
  { id: '2', name: 'FastFund Capital', role: 'Lender', lastMsg: 'We can close in 10 days at 7.5%', time: '15m ago', unread: 1, online: true },
  { id: '3', name: 'Sarah Chen', role: 'Investor', lastMsg: 'Interested in the Birmingham property', time: '1h ago', unread: 0, online: false, dealId: '9', dealTitle: 'Turnkey Rental — Birmingham' },
  { id: '4', name: 'Memphis Pro Rehab', role: 'Contractor', lastMsg: 'Scope of work attached. $22K all in.', time: '3h ago', unread: 0, online: false, dealId: '1', dealTitle: 'Off-Market Duplex — Memphis' },
  { id: '5', name: 'Bluff City PM', role: 'Property Manager', lastMsg: 'We can manage at 8%. Both units.', time: '5h ago', unread: 0, online: true },
  { id: '6', name: 'Jake W.', role: 'Bird Dog', lastMsg: 'New lead in Akron, 4-unit, $85K ask', time: '1d ago', unread: 0, online: false },
]

interface ChatMessage {
  id: string; from: 'me' | 'them'; text: string; time: string
}

const MOCK_CHAT: ChatMessage[] = [
  { id: '1', from: 'them', text: 'Hey, I found this duplex off-market. Seller is moving out of state.', time: '10:30 AM' },
  { id: '2', from: 'me', text: 'What\'s the asking price and current rent?', time: '10:32 AM' },
  { id: '3', from: 'them', text: 'Asking $145K. Both units rented at $750/unit. Leases through Dec 2026.', time: '10:33 AM' },
  { id: '4', from: 'me', text: 'That\'s $1,500/mo gross. What condition is it in?', time: '10:35 AM' },
  { id: '5', from: 'them', text: 'Solid B+ condition. New roof 2023, updated electrical. Needs cosmetic work — paint, flooring, fixtures. I\'d estimate $15-20K rehab.', time: '10:36 AM' },
  { id: '6', from: 'me', text: 'Good numbers. ARV estimate?', time: '10:38 AM' },
  { id: '7', from: 'them', text: 'Comps show $200-220K for updated duplexes in this area. I\'d put it at $210K conservatively.', time: '10:39 AM' },
  { id: '8', from: 'them', text: 'The seller is motivated, they\'ll take $140K', time: '10:45 AM' },
]

export default function MessagesPage() {
  const [activeConvo, setActiveConvo] = useState<string>('1')
  const [newMsg, setNewMsg] = useState('')
  const [messages, setMessages] = useState(MOCK_CHAT)

  const active = CONVERSATIONS.find(c => c.id === activeConvo)

  const sendMessage = () => {
    if (!newMsg.trim()) return
    setMessages(prev => [...prev, { id: String(prev.length + 1), from: 'me', text: newMsg, time: 'Just now' }])
    setNewMsg('')
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Mini header */}
      <div className="bg-navy-950 py-3 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-white/70">
            <Link href="/" className="hover:text-white">Home</Link><span>/</span>
            <Link href="/dashboard" className="hover:text-white">Dashboard</Link><span>/</span>
            <span className="text-white">Messages</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge-brand text-xs">Pro Feature</span>
            <span className="text-xs text-white/50">Free users: 5 messages/day</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex" style={{ height: 'calc(100vh - 120px)' }}>
        {/* Sidebar — Conversations */}
        <div className="w-80 border-r border-gray-100 flex flex-col">
          <div className="p-4 border-b border-gray-100">
            <input className="calc-input !py-2 text-sm" placeholder="Search conversations..." />
          </div>
          <div className="flex-1 overflow-y-auto">
            {CONVERSATIONS.map(c => (
              <button key={c.id} onClick={() => setActiveConvo(c.id)}
                className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${activeConvo === c.id ? 'bg-brand-50 border-l-2 border-l-brand-600' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center text-navy-600 font-bold text-sm">
                      {c.name.charAt(0)}
                    </div>
                    {c.online && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-navy-950 truncate">{c.name}</span>
                      <span className="text-xs text-gray-400 ml-2 flex-shrink-0">{c.time}</span>
                    </div>
                    <div className="text-xs text-gray-400">{c.role}</div>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{c.lastMsg}</p>
                  </div>
                  {c.unread > 0 && (
                    <span className="bg-brand-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">{c.unread}</span>
                  )}
                </div>
                {c.dealTitle && (
                  <div className="mt-1 ml-13">
                    <span className="text-xs bg-navy-50 text-navy-600 px-2 py-0.5 rounded-full">📋 {c.dealTitle}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          {active && (
            <div className="px-6 py-3 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-navy-100 flex items-center justify-center text-navy-600 font-bold text-sm">
                  {active.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-sm text-navy-950">{active.name}</div>
                  <div className="text-xs text-gray-400">{active.role} {active.online && '• Online'}</div>
                </div>
              </div>
              {active.dealTitle && (
                <Link href={`/deals/${active.dealId}`} className="badge-brand text-xs hover:bg-brand-200 transition-colors">
                  📋 {active.dealTitle} →
                </Link>
              )}
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-md px-4 py-2.5 rounded-2xl text-sm ${
                  msg.from === 'me'
                    ? 'bg-brand-600 text-white rounded-br-md'
                    : 'bg-gray-100 text-navy-950 rounded-bl-md'
                }`}>
                  <p>{msg.text}</p>
                  <span className={`text-xs mt-1 block ${msg.from === 'me' ? 'text-white/60' : 'text-gray-400'}`}>{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="px-6 py-3 border-t border-gray-100">
            <div className="flex gap-2">
              <input className="calc-input flex-1 !py-2.5" placeholder="Type a message..."
                value={newMsg} onChange={e => setNewMsg(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()} />
              <button onClick={sendMessage} className="btn-primary !py-2.5 !px-6">Send</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
