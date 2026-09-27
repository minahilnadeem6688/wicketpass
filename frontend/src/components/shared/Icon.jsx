const PATHS = {
  ticket: (
    <>
      <path d="M3.5 7.5h17v3a1.75 1.75 0 0 0 0 3v3h-17v-3a1.75 1.75 0 0 0 0-3z" />
      <path d="M14.5 7.5v1.5M14.5 11.25v1.5M14.5 15v1.5" />
    </>
  ),
  star: <path d="M12 3.8l2.5 5.1 5.6.8-4 3.9 1 5.6-5.1-2.7-5 2.7 1-5.6-4.1-3.9 5.6-.8z" />,
  rookie: <circle cx="12" cy="12" r="6.5" />,
  medal: (
    <>
      <path d="M8 3.5l4 6.5 4-6.5" />
      <circle cx="12" cy="15" r="5" />
      <path d="M12 12.8v4.4" />
    </>
  ),
  trophy: (
    <>
      <path d="M7.5 4h9v5a4.5 4.5 0 0 1-9 0z" />
      <path d="M7.5 6H4.5a3 3 0 0 0 3 4M16.5 6h3a3 3 0 0 1-3 4" />
      <path d="M12 13.5v3.5M8.5 20.5h7M9.5 17h5" />
    </>
  ),
  resale: <path d="M4 8.5h14l-3.5-3.5M20 15.5H6l3.5 3.5" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  x: <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />,
  shield: (
    <>
      <path d="M12 3.5l7 2.8v5.2c0 4.3-2.9 7.6-7 9.5-4.1-1.9-7-5.2-7-9.5V6.3z" />
      <path d="M9 12l2.2 2.2L15.2 10" />
    </>
  ),
  scan: (
    <>
      <path d="M4 8.5V5h3.5M16.5 5H20v3.5M20 15.5V19h-3.5M7.5 19H4v-3.5" />
      <path d="M4 12h16" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="2" />
      <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
    </>
  ),
  stadium: (
    <>
      <ellipse cx="12" cy="8" rx="8.5" ry="3" />
      <path d="M3.5 8v7c0 1.7 3.8 3 8.5 3s8.5-1.3 8.5-3V8M9 17.7v-4.2M15 17.7v-4.2" />
    </>
  ),
  gift: (
    <>
      <rect x="4" y="8.5" width="16" height="4" rx="1" />
      <path d="M5.5 12.5v7.5h13v-7.5M12 8.5V20" />
      <path d="M12 8.5c-1.5-3.5-5-4-5-1.8 0 1.5 2.5 1.8 5 1.8 2.5 0 5-.3 5-1.8 0-2.2-3.5-1.7-5 1.8z" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5.5" width="16" height="14.5" rx="2" />
      <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
    </>
  ),
  pin: (
    <>
      <path d="M12 20.5s-6-5.3-6-10.5a6 6 0 0 1 12 0c0 5.2-6 10.5-6 10.5z" />
      <circle cx="12" cy="10" r="2" />
    </>
  ),
  coins: (
    <>
      <ellipse cx="12" cy="6.5" rx="7" ry="2.5" />
      <path d="M5 6.5v5.5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6.5M5 12v5.5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V12" />
    </>
  ),
  wallet: (
    <>
      <rect x="3.5" y="6" width="17" height="13" rx="2" />
      <path d="M3.5 10h17M15.5 14.5h1.5" />
    </>
  ),
  alert: <path d="M12 4.5l8.5 15h-17zM12 10.5v4M12 17.3v.2" />,
  play: <path d="M8 5.5v13l10.5-6.5z" />,
  bat: (
    <>
      <path d="M15.8 3.2l5 5-10.3 10.3-5-5z" />
      <path d="M8 16l-4.5 4.5" />
      <circle cx="18.5" cy="18.5" r="2.2" />
    </>
  ),
}

export const TIER_ICON = { Rookie: "rookie", Fan: "star", "Die-Hard": "medal", Legend: "trophy" }

export default function Icon({ name, size = 18, stroke = 1.6, className = "", style }) {
  const glyph = PATHS[name]
  if (!glyph) return null
  return (
    <svg
      className={`wp-icon ${className}`.trim()}
      style={style}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {glyph}
    </svg>
  )
}
