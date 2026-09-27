import { useEffect, useState } from "react"
import Navbar from "../components/layout/Navbar"
import ReputationRing from "../components/passport/ReputationRing"
import TierBadge from "../components/passport/TierBadge"
import TierProgressBar from "../components/passport/TierProgressBar"
import RewardsInbox from "../components/passport/RewardsInbox"
import { useWalletContext } from "../context/WalletContext"
import { useFanPassport } from "../hooks/useFanPassport"
import Icon from "../components/shared/Icon"

const TIERS = [
  { icon:"rookie", name:"Rookie",   req:"0 matches",    color:"#888"    },
  { icon:"star", name:"Fan",      req:"3+ matches",   color:"#C9D3CD" },
  { icon:"medal", name:"Die-Hard", req:"10+ matches",  color:"#F2C14E" },
  { icon:"trophy", name:"Legend",   req:"Multi-season", color:"#F2C14E", current:true },
]

export default function FanPassport() {
  const { wallet, signer, provider }   = useWalletContext()
  const { getPassport, getAttendanceHistory, getRewards, createPassport, getNextTierInfo } = useFanPassport(signer, provider)

  const [passport, setPassport]   = useState(null)
  const [history, setHistory]     = useState([])
  const [rewards, setRewards]     = useState([])
  const [loading, setLoading]     = useState(false)

  useEffect(() => {
    if (wallet && provider) loadData()
  }, [wallet, provider])

  async function loadData() {
    setLoading(true)
    const [p, h, r] = await Promise.all([
      getPassport(wallet),
      getAttendanceHistory(wallet),
      getRewards(wallet),
    ])
    setPassport(p)
    setHistory(h)
    setRewards(r)
    setLoading(false)
  }

  async function handleCreatePassport() {
    const result = await createPassport()
    if (result.success) {
      alert("Passport created!\nTx: " + result.txHash)
      await loadData()
    }
  }

  const score    = passport?.reputationScore || 0
  const tierIdx  = passport?.tierIndex || 0
  const nextTier = passport ? getNextTierInfo(tierIdx, score) : null

  return (
    <div className="pp">
      <div className="pp-glow pp-g1" />
      <div className="pp-glow pp-g2" />
      <Navbar active="passport" />

      <div className="pp-body">
        {!wallet ? (
          <div style={{textAlign:"center",padding:"60px",color:"rgba(245,241,228,0.4)"}}>
            Connect your wallet to view your Fan Passport
          </div>
        ) : loading ? (
          <div style={{textAlign:"center",padding:"60px",color:"#E8B530"}}>
            Loading passport from WireFluid...
          </div>
        ) : !passport ? (
          <div style={{textAlign:"center",padding:"60px"}}>
            <div style={{fontSize:"40px",marginBottom:"16px"}}><Icon name="bat" size={20} /></div>
            <div style={{fontSize:"18px",fontFamily:"Barlow Condensed",fontWeight:"700",marginBottom:"8px"}}>
              No Passport Found
            </div>
            <div style={{fontSize:"14px",color:"rgba(245,241,228,0.4)",marginBottom:"24px"}}>
              Create your Fan Passport to start earning loyalty points
            </div>
            <button className="fp-buy-btn" style={{maxWidth:"240px",margin:"0 auto"}} onClick={handleCreatePassport}>
              Create My Passport
            </button>
          </div>
        ) : (
          <>
            <div className="pp-top">
              <div className="pp-passport-card">
                <ReputationRing score={score} max={1000} />
                <TierBadge tier={passport.tier} />
                <TierProgressBar
                  current={score}
                  max={nextTier?.needed ? score + nextTier.needed : 1000}
                />
                <div className="pp-wallet-addr">
                  {wallet.slice(0,6)}...{wallet.slice(-4)} • WireFluid Network
                </div>
              </div>

              <div className="pp-stats-grid">
                {[
                  { icon:"stadium", num:passport.matchesAttended, label:"Matches Attended", color:"green"  },
                  { icon:"star",  num:score,                    label:"Reputation Score",  color:"gold"   },
                  { icon:"check",  num:`${passport.trustScore}%`,label:"Trust Score",       color:"green"  },
                  { icon:"gift",  num:rewards.filter(r=>!r.claimed).length, label:"Pending Rewards", color:"purple" },
                  { icon:"ticket", num:history.length,           label:"Matches on Chain",  color:"cyan"   },
                  { icon:"resale",  num:passport.cleanResales,   label:"Clean Resales",     color:"gold"   },
                ].map((s) => (
                  <div className={`pp-stat-card ${s.color}`} key={s.label}>
                    <span className="pp-stat-icon"><Icon name={s.icon} /></span>
                    <div className="pp-stat-num">{s.num}</div>
                    <div className="pp-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pp-tiers-row">
              {TIERS.map((t) => (
                <div
                  key={t.name}
                  className={`pp-tier-card ${passport.tier === t.name ? "current" : ""}`}
                >
                  <span className="pp-tier-card-icon"><Icon name={t.icon} /></span>
                  <div className="pp-tier-card-name" style={{ color: t.color }}>{t.name}</div>
                  <div className="pp-tier-card-req">{t.req}</div>
                  {passport.tier === t.name && <div className="pp-current-tag">Your Tier</div>}
                </div>
              ))}
            </div>

            <div className="pp-bottom">
              <div className="pp-section">
                <div className="pp-section-title">Attendance Timeline</div>
                <div className="pp-timeline">
                  {history.length === 0 ? (
                    <div style={{color:"rgba(245,241,228,0.3)",fontSize:"13px"}}>
                      No matches attended yet. Buy a ticket and attend!
                    </div>
                  ) : history.map((h, i) => (
                    <div className="pp-timeline-item" key={i}>
                      <div className="pp-timeline-dot green" />
                      <div className="pp-timeline-info">
                        <div className="pp-timeline-match">{h.matchName}</div>
                        <div className="pp-timeline-date">{h.timestamp}</div>
                      </div>
                      <div className="pp-timeline-badge">+{h.pointsEarned} pts</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pp-section">
                <div className="pp-section-title">Rewards Inbox</div>
                <RewardsInbox rewards={rewards} onClaim={loadData} signer={signer} provider={provider} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}