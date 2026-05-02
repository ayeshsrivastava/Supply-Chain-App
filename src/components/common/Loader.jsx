// src/components/common/Loader.jsx
import React from 'react'

export default function Loader({ text = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
      <svg className="animate-spin" width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="2.5" strokeDasharray="52" strokeDashoffset="20" strokeLinecap="round"/>
      </svg>
      <span className="text-sm">{text}</span>
    </div>
  )
}
