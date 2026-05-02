// src/components/dashboard/Charts.jsx
import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  LineChart, Line, CartesianGrid,
} from 'recharts'

const CARD = 'bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-5'
const TITLE = 'text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4'

// ── Bar: Delays by carrier ────────────────────────────────────────────────────
export function DelayBarChart({ data }) {
  // data: [{ name, delayed }]
  return (
    <div className={CARD}>
      <p className={TITLE}>Delays by carrier</p>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={data} barSize={28}>
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false}/>
          <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={20}/>
          <Tooltip
            contentStyle={{ background: '#1f2937', border: 'none', borderRadius: 8, fontSize: 12, color: '#f9fafb' }}
            cursor={{ fill: 'rgba(0,0,0,0.05)' }}
          />
          <Bar dataKey="delayed" fill="#60a5fa" radius={[4, 4, 0, 0]} name="Delayed" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// ── Pie: On-time vs Delayed ───────────────────────────────────────────────────
const PIE_COLORS = ['#22c55e', '#f87171']

export function OnTimePieChart({ onTime, delayed }) {
  const data = [
    { name: 'On-time', value: onTime },
    { name: 'Delayed', value: delayed },
  ]
  return (
    <div className={CARD}>
      <p className={TITLE}>On-time vs delayed</p>
      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={44} outerRadius={68} paddingAngle={3} dataKey="value">
            {data.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
          </Pie>
          <Tooltip
            contentStyle={{ background: '#1f2937', border: 'none', borderRadius: 8, fontSize: 12, color: '#f9fafb' }}
          />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

// ── Line: Delivery trends ─────────────────────────────────────────────────────
export function TrendLineChart({ data }) {
  // data: [{ day, delivered, delayed }]
  return (
    <div className={CARD}>
      <p className={TITLE}>Delivery trends — last 7 days</p>
      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false}/>
          <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={20}/>
          <Tooltip
            contentStyle={{ background: '#1f2937', border: 'none', borderRadius: 8, fontSize: 12, color: '#f9fafb' }}
          />
          <Line type="monotone" dataKey="delivered" stroke="#60a5fa" strokeWidth={2} dot={false} name="Delivered" />
          <Line type="monotone" dataKey="delayed"   stroke="#f87171" strokeWidth={2} dot={false} strokeDasharray="4 3" name="Delayed" />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
