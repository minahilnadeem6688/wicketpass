import { useState } from "react"
import { useFanPassport } from "../../hooks/useFanPassport"
import Icon from "../shared/Icon"

// Sponsor rewards shown as tear-off coupons
export default function RewardsInbox({ rewards = [], onClaim, onResult, signer, provider, demo }) {
  const { claimReward } = useFanPassport(signer, provider)
  const [claiming, setClaiming] = useState(null)

  async function handleClaim(index) {
    setClaiming(index)
    const result = await claimReward(index)
    setClaiming(null)
    onResult?.(result.success
      ? { ok: true, msg: "Reward claimed.", link: result.wirescan }
      : { ok: false, msg: "Couldn't claim that reward. Try again in a moment." })
    if (result.success) onClaim?.()
  }

  if (!rewards.length) {
    return <p className="empty">No rewards yet. Sponsors drop them to fans after matches.</p>
  }

  return (
    <ul className="coupons">
      {rewards.map((r) => (
        <li className={`coupon ${r.claimed ? "is-claimed" : ""}`} key={r.index}>
          <div className="coupon-ic"><Icon name="gift" size={20} /></div>
          <div className="coupon-body">
            <p className="coupon-title">{r.description}</p>
            <p className="coupon-meta">From {r.sponsor} · {r.timestamp}</p>
          </div>
          {r.claimed ? (
            <span className="chip chip-soft"><Icon name="check" size={14} stroke={2} /> Claimed</span>
          ) : (
            <button className="btn btn-ink btn-sm" disabled={demo || claiming === r.index} onClick={() => handleClaim(r.index)}>
              {claiming === r.index ? "Claiming…" : "Claim"}
            </button>
          )}
        </li>
      ))}
    </ul>
  )
}
