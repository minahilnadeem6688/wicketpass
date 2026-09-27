// Three stumps and a pair of bails inside a ticket-shaped tile
export function LogoMark({ size = 34 }) {
  return (
    <svg className="wp-mark" width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <path d="M8 4h24a4 4 0 0 1 4 4v9a3 3 0 0 0 0 6v9a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-9a3 3 0 0 0 0-6V8a4 4 0 0 1 4-4z" fill="var(--pitch)" />
      <rect x="13" y="14" width="3" height="16" rx="1.5" fill="var(--paper)" />
      <rect x="18.5" y="14" width="3" height="16" rx="1.5" fill="var(--paper)" />
      <rect x="24" y="14" width="3" height="16" rx="1.5" fill="var(--paper)" />
      <rect x="12" y="10.5" width="7" height="2.2" rx="1.1" fill="var(--ball)" />
      <rect x="21" y="10.5" width="7" height="2.2" rx="1.1" fill="var(--ball)" />
    </svg>
  )
}

export default function Logo({ onClick }) {
  return (
    <button type="button" className="wp-logo" onClick={onClick} aria-label="WicketPass home">
      <LogoMark />
      <span className="wp-logo-word">Wicket<em>Pass</em></span>
    </button>
  )
}
