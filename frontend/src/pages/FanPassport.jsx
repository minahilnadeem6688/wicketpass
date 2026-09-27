import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Page from "../components/layout/Page"
import ReputationRing from "../components/passport/ReputationRing"
import RewardsInbox from "../components/passport/RewardsInbox"
import Toast from "../components/shared/Toast"
import Icon from "../components/shared/Icon"
import { TIER_ICON } from "../constants/tiers"
import { useWalletContext } from "../context/WalletContext"
import { useFanPassport } from "../hooks/useFanPassport"
import { splitMatch } from "../constants/teams"

const LADDER = [
  { name:"Rookie",   at:0   },
  { name:"Fan",      at:100 },
  { name:"Die-Hard", at:300 },
  { name:"Legend",   at:700 },
]

// Shown before a wallet is connected, so visitors can see what a passport looks like
const SAMPLE = {
  passport: { tier:"Die-Hard", tierIndex:2, reputationScore:465, matchesAttended:12, trustScore:98, cleanResales:3 },
  wallet: "0x9A18c3F0b2d7E4a1c6B8e5D2f9A0c7E3b1d924a4",
  history: [
    { matchName:"Karachi Kings vs Lahore Qalandars",   timestamp:"14 Apr 2026", pointsEarned:35 },
    { matchName:"Peshawar Zalmi vs Quetta Gladiators", timestamp:"28 Mar 2026", pointsEarned:35 },
    { matchName:"Islamabad United vs Multan Sultans",  timestamp:"15 Mar 2026", pointsEarned:35 },
    { matchName:"Lahore Qalandars vs Peshawar Zalmi",  timestamp:"1 Mar 2026",  pointsEarned:35 },
  ],
  rewards: [
    { index:0, description:"Free upgrade to the VIP enclosure", sponsor:"HBL",  timestamp:"12 Apr 2026", claimed:false },
    { index:1, description:"20% off an official team shirt",    sponsor:"Jazz", timestamp:"2 Apr 2026",  claimed:true  },
  ],
}

export default function FanPassport() {
  const { wallet, signer, provider, connect, loading: connecting } = useWalletContext()
  const { getPassport, getAttendanceHistory, getRewards, createPassport, getNextTierInfo, loading: creating } = useFanPassport(signer, provider)

  const [passport, setPassport] = useState(null)
  const [history, setHistory]   = useState([])
  const [rewards, setRewards]   = useState([])
  const [loading, setLoading]   = useState(false)
  const [toast, setToast]       = useState(null)
  const clearToast = useCallback(() => setToast(null), [])


  async function loadData() {
    setLoading(true)
    const [p, h, r] = await Promise.all([getPassport(wallet), getAttendanceHistory(wallet), getRewards(wallet)])
    setPassport(p); setHistory(h); setRewards(r)
    setLoading(false)
  }
  useEffect(() => {
    if (wallet && provider) loadData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet, provider])

  async function handleCreate() {
    const r = await createPassport()
    if (r.success) { setToast({ ok: true, msg: "Passport created. Welcome to the stands.", link: r.wirescan }); loadData() }
    else setToast({ ok: false, msg: "Couldn't create the passport. Check MetaMask and try again." })
  }

  const demo = !wallet
  const p    = demo ? SAMPLE.passport : passport
  const hist = demo ? SAMPLE.history : history
  const rew  = demo ? SAMPLE.rewards : rewards
  const addr = demo ? SAMPLE.wallet : wallet

  if (!demo && (loading || !passport)) {
    return (
      <Page>
        <section className="page-head page-head-center">
          <div data-reveal>
            <p className="eyebrow">Fan Passport</p>
            {loading ? (
              <h1>Reading your <em>passport…</em></h1>
            ) : (
              <>
                <h1>Start your <em>passport.</em></h1>
                <p className="page-sub">It's free apart from network gas. From then on, every match you attend adds 35 points and moves you towards Legend.</p>
                <div className="hero-cta center">
                  <button className="btn btn-ink btn-lg" onClick={handleCreate} disabled={creating}>{creating ? "Creating on WireFluid…" : "Create my passport"}</button>
                </div>
              </>
            )}
          </div>
        </section>
        <Toast toast={toast} onDone={clearToast} />
      </Page>
    )
  }

  const score = p.reputationScore
  const next  = getNextTierInfo(p.tierIndex, score)
  const ladderPct = Math.min(100, ((p.tierIndex + (p.tierIndex >= 3 ? 0 : next.progress / 100)) / 3) * 100)

  const stats = [
    { icon:"stadium", num:p.matchesAttended, label:"Matches attended" },
    { icon:"shield",  num:`${p.trustScore}%`, label:"Trust score" },
    { icon:"resale",  num:p.cleanResales,     label:"Clean resales" },
    { icon:"gift",    num:rew.filter((r) => !r.claimed).length, label:"Rewards waiting" },
  ]

  return (
    <Page>
      <section className="page-head">
        <div data-reveal>
          <p className="eyebrow">Fan Passport</p>
          <h1>Every match, <em>on the record.</em></h1>
          <p className="page-sub">Attendance is written to the chain when your ticket is scanned. Nobody can buy a tier, and nobody can take one away.</p>
        </div>
        {demo && (
          <aside className="wallet-card" data-reveal style={{ "--d": ".1s" }}>
            <p className="wallet-card-k">You're looking at a sample</p>
            <p className="wallet-card-t">Connect your wallet to open your own passport.</p>
            <button className="btn btn-ink btn-block" onClick={connect} disabled={connecting}>{connecting ? "Connecting…" : "Connect wallet"}</button>
          </aside>
        )}
      </section>

      <section className="page-sec pass-top">
        <article className="booklet" data-reveal>
          <header className="booklet-head">
            <span>WicketPass</span>
            <span>Fan Passport · {demo ? "Sample" : "No. " + addr.slice(2, 8).toUpperCase()}</span>
          </header>
          <div className="booklet-body">
            <ReputationRing score={score} max={1000} size={176} label="Points" />
            <div className="booklet-info">
              <p className="booklet-k">Holder</p>
              <p className="booklet-addr">{addr.slice(0, 6)}…{addr.slice(-4)}</p>
              <p className="booklet-k">Tier</p>
              <p className="booklet-tier"><Icon name={TIER_ICON[p.tier]} size={26} stroke={1.5} /> {p.tier}</p>
              <p className="booklet-next">
                {next.needed > 0 ? <><strong>{next.needed} pts</strong> to {next.name}</> : "Top tier reached"}
              </p>
            </div>
          </div>
          <footer className="booklet-foot">
            <span>WireFluid network · chain 92533</span>
            <span className="booklet-mrz">P&lt;WKP&lt;{addr.slice(2, 12).toUpperCase()}&lt;&lt;{p.tier.toUpperCase().replace("-", "")}</span>
          </footer>
        </article>

        <div className="stat-grid">
          {stats.map((s, i) => (
            <div className="stat" key={s.label} data-reveal style={{ "--d": `${0.06 * i}s` }}>
              <Icon name={s.icon} size={20} />
              <strong>{s.num}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="page-sec">
        <h2 className="sec-title" data-reveal>The road to Legend</h2>
        <div className="ladder" data-reveal style={{ "--p": `${ladderPct}%` }}>
          <div className="ladder-line"><span /></div>
          {LADDER.map((t, i) => (
            <div key={t.name} className={`ladder-stop ${i <= p.tierIndex ? "done" : ""} ${i === p.tierIndex ? "here" : ""}`} style={{ left: `${(i / 3) * 100}%` }}>
              <span className="ladder-dot"><Icon name={TIER_ICON[t.name]} size={16} stroke={1.8} /></span>
              <strong>{t.name}</strong>
              <small>{t.at} pts</small>
            </div>
          ))}
        </div>
      </section>

      <section className="page-sec two-col">
        <div data-reveal>
          <h2 className="sec-title">Matches attended</h2>
          {hist.length === 0 ? (
            <p className="empty">Nothing yet. Your first scanned ticket shows up here.</p>
          ) : (
            <ol className="timeline">
              {hist.map((h, i) => {
                const [a, b] = splitMatch(h.matchName)
                return (
                  <li key={i}>
                    <span className="tl-crests"><i style={{ background: a.color }}>{a.code}</i><i style={{ background: b.color }}>{b.code}</i></span>
                    <span className="tl-body"><strong>{a.city} vs {b.city}</strong><small>{h.timestamp}</small></span>
                    <span className="tl-pts">+{h.pointsEarned}</span>
                  </li>
                )
              })}
            </ol>
          )}
        </div>
        <div data-reveal style={{ "--d": ".08s" }}>
          <h2 className="sec-title">Rewards</h2>
          <RewardsInbox rewards={rew} demo={demo} onClaim={loadData} onResult={setToast} signer={signer} provider={provider} />
          {demo && <p className="note small">Rewards are claimable once you connect. <Link to="/portal">Find a match</Link></p>}
        </div>
      </section>
      <Toast toast={toast} onDone={clearToast} />
    </Page>
  )
}
