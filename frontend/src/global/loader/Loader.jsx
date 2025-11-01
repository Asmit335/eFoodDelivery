import React from 'react'

const Loader = ({status}) => {
  return (
    <div
      aria-label="Loading..."
      role="status"
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
    >
      <div className="flex flex-col items-center space-y-4">
        <svg
          className="h-12 w-12 animate-spin stroke-gray-300"
          viewBox="0 0 256 256"
        >
          <line x1="128" y1="32" x2="128" y2="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
          <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
          <line x1="224" y1="128" x2="192" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
          <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
          <line x1="128" y1="224" x2="128" y2="192" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
          <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
          <line x1="32" y1="128" x2="64" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
          <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
        </svg>

        <span className="text-white text-2xl font-semibold">{status}</span>
      </div>
    </div>
  )
}

export default Loader
