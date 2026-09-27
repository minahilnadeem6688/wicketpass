import { useState } from "react"
import Page from "../components/layout/Page"
import TierDistributionChart from "../components/admin/TierDistributionChart"
import TransactionFeed from "../components/admin/TransactionFeed"
import BlacklistTable from "../components/admin/BlacklistTable"
import RewardPushForm from "../components/admin/RewardPushForm"
import CountUp from "../components/shared/CountUp"
import Icon from "../components/shared/Icon"
import { PSL_MATCHES } from "../constants/matches"

const STATS = [
  { icon:"ticket", to:1247, label:"Tickets sold",     delta:"+34 today",        tone:"pitch"  },
  { icon:"coins",  to:45,   label:"Royalties earned", delta:"+PKR 2,400 today", tone:"butter", prefix:"PKR ", suffix:"K" },
  { icon:"resale", to:389,  label:"Resales",          delta:"+12 today",        tone:"paper"  },
  { icon:"shield", to:892,  label:"Gate scans today", delta:"98.2% valid",      tone:"ball"   },
]

export default function AdminPanel() {
  const [match, setMatch]   = useState(`${PSL_MATCHES[0].team1} vs ${PSL_MATCHES[0].team2}`)
  const [count, setCount]   = useState("")
  const [price, setPrice]   = useState("")
  const [minting, setMinting] = useState(false)
  const [done, setDone]     = useState(false)

  function mint() {
    if (!count || !price) return
    setMinting(true)
    setTimeout(() => { setMinting(false); setDone(true) }, 1500)
  }

  return (
    <Page>
      <section className="page-head">
        <div data-reveal>
          <p className="eyebrow">League office</p>
          <h1>The season <em>at a glance.</em></h1>
          <p className="page-sub">Ticket sales, resale royalties and gate scans across every venue. Figures on this screen are demo data.</p>
        </div>
        <span className="chip chip-live" data-reveal style={{ "--d": ".1s" }}><span className="dot-live" /> Live on WireFluid</span>
      </section>

      <section className="page-sec">
        <div className="kpis">
          {STATS.map((s, i) => (
            <article className={`kpi kpi-${s.tone}`} key={s.label} data-reveal style={{ "--d": `${i * 0.06}s` }}>
              <Icon name={s.icon} size={20} />
              <strong><CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} /></strong>
              <span>{s.label}</span>
              <small><Icon name="trend" size={13} /> {s.delta}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="page-sec dash">
        <TierDistributionChart />
        <TransactionFeed />
      </section>

      <section className="page-sec">
        <article className="panel" data-reveal>
          <header className="panel-head"><h2>Mint tickets for a match</h2><span className="chip chip-soft">TicketNFT</span></header>
          <div className="form-grid">
            <div className="field">
              <label className="field-label" htmlFor="m">Match</label>
              <select id="m" className="input" value={match} onChange={(e) => setMatch(e.target.value)}>
                {PSL_MATCHES.map((m) => <option key={m.id}>{m.team1} vs {m.team2}</option>)}
              </select>
            </div>
            <div className="field">
              <label className="field-label" htmlFor="c">Number of tickets</label>
              <input id="c" className="input" type="number" placeholder="e.g. 500" value={count} onChange={(e) => setCount(e.target.value)} />
            </div>
            <div className="field">
              <label className="field-label" htmlFor="p">Price (PKR)</label>
              <input id="p" className="input" type="number" placeholder="e.g. 1000" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
          </div>
          <div className="panel-foot">
            <button className="btn btn-ink btn-lg" onClick={mint} disabled={minting || !count || !price}>{minting ? "Minting on WireFluid…" : "Mint tickets"}</button>
            {done && <span className="done-inline"><Icon name="check" size={16} stroke={2.2} /> {count} tickets minted for {match}.</span>}
          </div>
        </article>
      </section>

      <section className="page-sec dash">
        <BlacklistTable />
        <RewardPushForm />
      </section>
    </Page>
  )
}
