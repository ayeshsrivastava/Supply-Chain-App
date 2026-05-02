// src/components/layout/Sidebar.jsx
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const links = [
  { to: '/shipments', label: 'Shipments',    icon: HomeIcon },
  { to: '/dashboard', label: 'Analytics',    icon: ChartIcon },
  { to: '/add',       label: 'Add Shipment', icon: PlusIcon },
]

export default function Sidebar() {
  const { dark, toggle } = useTheme()

  return (
    <aside className="w-[220px] min-w-[220px] bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-100 dark:border-gray-800">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mb-3">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1L15 4.5V11.5L8 15L1 11.5V4.5L8 1Z" stroke="white" strokeWidth="1.3" fill="none"/>
            <path d="M8 1v14M1 4.5l7 3.5 7-3.5" stroke="white" strokeWidth="1.3"/>
          </svg>
        </div>
        <div className="text-sm font-semibold text-gray-900 dark:text-white tracking-tight">ChainView</div>
        <div className="text-[11px] text-gray-400 mt-0.5">Supply Intelligence</div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-2 mb-2">Menu</p>
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm sidebar-link
              ${isActive
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'}`
            }
          >
            <Icon />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Dark mode toggle */}
      <div className="px-3 py-4 border-t border-gray-100 dark:border-gray-800">
        <button
          onClick={toggle}
          className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 sidebar-link"
        >
          {dark ? <SunIcon /> : <MoonIcon />}
          {dark ? 'Light mode' : 'Dark mode'}
          <div className={`ml-auto w-8 h-4 rounded-full relative transition-colors ${dark ? 'bg-blue-500' : 'bg-gray-200'}`}>
            <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-all ${dark ? 'left-4' : 'left-0.5'}`} />
          </div>
        </button>
      </div>
    </aside>
  )
}

function HomeIcon()  { return <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 6.5L7.5 2l5.5 4.5V13H9.5v-3h-4v3H2V6.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg> }
function ChartIcon() { return <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="2" y="8" width="3" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.3"/><rect x="6" y="5" width="3" height="8" rx="0.5" stroke="currentColor" strokeWidth="1.3"/><rect x="10" y="2" width="3" height="11" rx="0.5" stroke="currentColor" strokeWidth="1.3"/></svg> }
function PlusIcon()  { return <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.3"/><path d="M7.5 5v5M5 7.5h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> }
function MoonIcon()  { return <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M12.5 9A6 6 0 016 2.5a6 6 0 100 10 6 6 0 006.5-3.5z" stroke="currentColor" strokeWidth="1.3"/></svg> }
function SunIcon()   { return <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="3" stroke="currentColor" strokeWidth="1.3"/><path d="M7.5 1.5v1M7.5 12.5v1M1.5 7.5h1M12.5 7.5h1M3.4 3.4l.7.7M10.9 10.9l.7.7M3.4 11.6l.7-.7M10.9 4.1l.7-.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> }
