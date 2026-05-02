// src/components/timeline/TimelineStep.jsx
import React from 'react'

const DOT = {
  done:    'bg-green-50 dark:bg-green-900/30 border-2 border-green-500',
  active:  'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500',
  delayed: 'bg-red-50 dark:bg-red-900/30 border-2 border-red-500',
  pending: 'bg-gray-50 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600',
}
const LINE = {
  done:    'bg-green-300 dark:bg-green-700',
  active:  'bg-blue-200 dark:bg-blue-800',
  delayed: 'bg-red-200 dark:bg-red-800',
  pending: 'bg-gray-200 dark:bg-gray-700',
}
const LABEL = {
  done:    'text-gray-900 dark:text-white',
  active:  'text-blue-700 dark:text-blue-300 font-semibold',
  delayed: 'text-red-700 dark:text-red-300 font-semibold',
  pending: 'text-gray-400 dark:text-gray-500',
}
const SUB = {
  done:    'Completed',
  active:  'In progress',
  delayed: 'Delayed here',
  pending: 'Pending',
}

export default function TimelineStep({ name, state, isLast }) {
  return (
    <div className="flex gap-4">
      {/* Track */}
      <div className="flex flex-col items-center">
        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${DOT[state]}`}>
          {state === 'done' && (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5l2.5 2.5L8 3" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {(state === 'active' || state === 'delayed') && (
            <div className={`w-2 h-2 rounded-full ${state === 'active' ? 'bg-blue-500' : 'bg-red-500'}`} />
          )}
        </div>
        {!isLast && <div className={`w-0.5 flex-1 min-h-[28px] my-1 ${LINE[state]}`} />}
      </div>

      {/* Content */}
      <div className={`pb-7 flex-1 ${isLast ? 'pb-0' : ''}`}>
        <div className={`text-sm ${LABEL[state]}`}>{name}</div>
        <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{SUB[state]}</div>
      </div>
    </div>
  )
}
