import { useEffect, useRef } from "react"

// Score ring that fills when it first appears
export default function ReputationRing({ score, max = 1000, size = 168, label = "Score" }) {
  const r = 70
  const c = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(1, score / max))
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.transition = "none"
    el.style.strokeDashoffset = c
    void el.getBoundingClientRect()
    el.style.transition = "stroke-dashoffset 1.6s cubic-bezier(.2,.8,.2,1) .15s"
    el.style.strokeDashoffset = c * (1 - pct)
  }, [c, pct])

  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg viewBox="0 0 160 160">
        <circle className="ring-track" cx="80" cy="80" r={r} />
        <circle ref={ref} className="ring-fill" cx="80" cy="80" r={r} style={{ strokeDasharray: c, strokeDashoffset: c }} />
      </svg>
      <div className="ring-center">
        <strong>{score}</strong>
        <span>{label}</span>
      </div>
    </div>
  )
}
