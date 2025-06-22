export function LungsIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      {/* Left lung */}
      <path
        d="M8 4C6.5 4 5 5.5 5 7v8c0 2.5 1.5 4 3 4 1.5 0 3-1.5 3-4V7c0-1.5-1.5-3-3-3z"
        fill="currentColor"
        fillOpacity="0.1"
      />
      {/* Right lung */}
      <path
        d="M16 4c1.5 0 3 1.5 3 3v8c0 2.5-1.5 4-3 4-1.5 0-3-1.5-3-4V7c0-1.5 1.5-3 3-3z"
        fill="currentColor"
        fillOpacity="0.1"
      />
      {/* Trachea */}
      <path d="M12 2v6" strokeWidth="2" strokeLinecap="round" />
      {/* Bronchi */}
      <path d="M12 8L8 10" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 8L16 10" strokeWidth="1.5" strokeLinecap="round" />
      {/* Lung details */}
      <path d="M7 9v6" strokeWidth="1" strokeOpacity="0.6" />
      <path d="M9 10v4" strokeWidth="1" strokeOpacity="0.6" />
      <path d="M15 9v6" strokeWidth="1" strokeOpacity="0.6" />
      <path d="M17 10v4" strokeWidth="1" strokeOpacity="0.6" />
    </svg>
  )
}
