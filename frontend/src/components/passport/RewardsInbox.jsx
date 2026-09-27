import { useState } from "react"
import { useFanPassport } from "../../hooks/useFanPassport"
import Icon from "../shared/Icon"

export default function RewardsInbox({ rewards = [], onClaim, signer, provider }) {
  const { claimReward } = useFanPassport(signer, provider)
  const [claiming, setClaiming] = useState(null)

  async function handleClaim(index) {
    setClaiming(index)
    const result = await claimReward(index)
    if (result.success) {
      alert("Reward claimed!\nTx: " + result.txHash)
      if (onClaim) onClaim()
    } else {
      alert("Failed: " + result.error)
    }
    setClaiming(null)
  }

  if (!rewards || rewards.length === 0) {
    return (
      <div style={{color:"rgba(245,241,228,0.3)",fontSize:"13px"}}>
        No rewards yet. Attend matches to earn rewards!
      </div>
    )
  }

  return (
    <div className="pp-rewards">
      {rewards.map((r, i) => (
        <div className="pp-reward-item" key={i}>
          <div className="pp-reward-icon gold"><Icon name="gift" /></div>
          <div className="pp-reward-info">
            <div className="pp-reward-title">{r.description}</div>
            <div className="pp-reward-desc">{r.sponsor} • {r.timestamp}</div>
          </div>
          <button
            className="pp-reward-claim"
            onClick={() => handleClaim(r.index)}
            disabled={r.claimed || claiming === r.index}
            style={r.claimed ? { color:"#F6D67A", borderColor:"rgba(246,214,122,0.3)" } : {}}
          >
            {claiming === r.index ? "..." : r.claimed ? "Claimed" : "Claim"}
          </button>
        </div>
      ))}
    </div>
  )
}