import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { QRCodeSVG } from "qrcode.react"
import Page from "../components/layout/Page"
import ConnectWallet from "../components/wallet/ConnectWallet"
import TicketStub from "../components/tickets/TicketStub"
import ReputationRing from "../components/passport/ReputationRing"
import CountUp from "../components/shared/CountUp"
import Icon from "../components/shared/Icon"
import { PSL_MATCHES } from "../constants/matches"
import { team } from "../constants/teams"

const HERO_TICKETS = [
  { home:"Peshawar Zalmi",   away:"Quetta Gladiators", date:"Wed 15 Apr · 7:00 pm", venue:"Gaddafi Stadium",  stand:"North", seat:"A-05", no:"089" },
  { home:"Islamabad United", away:"Multan Sultans",    date:"Thu 16 Apr · 7:00 pm", venue:"Pindi Stadium",    stand:"East",  seat:"C-22", no:"124" },
  { home:"Karachi Kings",    away:"Lahore Qalandars",  date:"Tue 14 Apr · 7:00 pm", venue:"National Stadium", stand:"West",  seat:"B-12", no:"042" },
]

const STEPS = [
  { title:"Connect",  desc:"Your MetaMask wallet is your account. No sign-up form, no password to forget." },
  { title:"Buy",      desc:"Pick a match and a seat. The ticket is minted as an NFT straight to your wallet." },
  { title:"Walk in",  desc:"Show the QR at the gate. The contract checks it and marks it used, so it only works once." },
  { title:"Level up", desc:"Every match you attend adds 35 points to your Fan Passport and moves you up a tier." },
]

const TIERS = [
  { name:"Rookie",   icon:"rookie", pts:"0 pts",   note:"Your first match",   tone:"t-rookie" },
  { name:"Fan",      icon:"star",   pts:"100 pts", note:"About 3 matches",    tone:"t-fan"    },
  { name:"Die-Hard", icon:"medal",  pts:"300 pts", note:"About 10 matches",   tone:"t-die"    },
  { name:"Legend",   icon:"trophy", pts:"700 pts", note:"Seasons, not games", tone:"t-legend" },
]

const CITY = (venue) => venue.split(",").pop().trim().replace(/ Cricket Stadium$/, "")
const SHORT = (d) => d.replace(/,? 2026/, "").replace(/^(\w{3})\w*/, "$1")

export default function Landing() {
  const navigate = useNavigate()
  const artRef = useRef(null)

  function tilt(e) {
    const el = artRef.current
    if (!el || e.pointerType === "touch") return
    const r = el.getBoundingClientRect()
    el.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3))
    el.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3))
  }
  function untilt() {
    artRef.current?.style.setProperty("--mx", 0)
    artRef.current?.style.setProperty("--my", 0)
  }

  const fixtures = [...PSL_MATCHES, ...PSL_MATCHES]

  return (
    <Page className="home">
      {/* HERO */}
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow rise" style={{ "--d": ".05s" }}><span className="dot-live" /> PSL 2026 · On-chain match tickets</p>
          <h1 className="hero-title">
            <span className="line"><span className="rise" style={{ "--d": ".12s" }}>Every seat,</span></span>
            <span className="line"><em className="rise" style={{ "--d": ".26s" }}>verified.</em></span>
          </h1>
          <p className="hero-sub rise" style={{ "--d": ".4s" }}>
            WicketPass turns match tickets into NFTs that can't be copied, keeps resale prices fair,
            and rewards the fans who keep turning up.
          </p>
          <div className="hero-cta rise" style={{ "--d": ".52s" }}>
            <ConnectWallet onConnected={() => navigate("/portal")} label="Get your ticket" />
            <Link className="btn btn-ghost btn-lg" to="/marketplace">Browse resale</Link>
          </div>
          <dl className="hero-proof rise" style={{ "--d": ".64s" }}>
            <div><dt><CountUp to={8} /></dt><dd>franchises</dd></div>
            <div><dt><CountUp to={1} /></dt><dd>scan per ticket</dd></div>
            <div><dt><CountUp to={10} suffix="%" /></dt><dd>royalty to the league</dd></div>
          </dl>
        </div>

        <div className="hero-art" ref={artRef} onPointerMove={tilt} onPointerLeave={untilt}>
          <div className="badge" aria-hidden="true">
            <svg className="badge-spin" viewBox="0 0 200 200">
              <defs><path id="circ" d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" /></defs>
              <text><textPath href="#circ">ADMIT ONE · ON-CHAIN · FAIR RESALE · PSL 2026 ·</textPath></text>
            </svg>
            <span className="badge-core"><Icon name="ball" size={30} stroke={1.4} /></span>
          </div>

          <div className="hero-stack">
            {HERO_TICKETS.map((t, i) => (
              <div className={`hero-ticket ht-${i}`} key={t.no}>
                <TicketStub {...t} />
              </div>
            ))}
          </div>

          <div className="sticker sticker-ok" aria-hidden="true">
            <Icon name="check" size={15} stroke={2.4} /> Verified at gate 4
          </div>
        </div>
      </section>

      {/* FIXTURES RIBBON */}
      <section className="ribbon" aria-label="Upcoming fixtures">
        <div className="ribbon-track">
          {fixtures.map((m, i) => {
            const a = team(m.team1), b = team(m.team2)
            return (
              <span className="ribbon-item" key={i} aria-hidden={i >= PSL_MATCHES.length}>
                <i style={{ background: a.color }} />{a.code}
                <b>v</b>
                <i style={{ background: b.color }} />{b.code}
                <small>{SHORT(m.date)} · {CITY(m.venue)}</small>
                <Icon name="ball" size={14} className="ribbon-sep" />
              </span>
            )
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section how" id="how-it-works">
        <header className="section-head" data-reveal>
          <p className="eyebrow">How it works</p>
          <h2>From the queue to the <em>stands</em> in four steps.</h2>
        </header>
        <ol className="pitch-track" data-reveal>
          <span className="pitch-ball" aria-hidden="true" />
          {STEPS.map((s, i) => (
            <li className="pitch-step" key={s.title} style={{ "--i": i }}>
              <span className="pitch-num">0{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* BENTO */}
      <section className="section">
        <header className="section-head" data-reveal>
          <p className="eyebrow">Why fans switch</p>
          <h2>Built for the people who <em>actually</em> show up.</h2>
        </header>

        <div className="bento">
          <article className="tile tile-pass" data-reveal>
            <div className="tile-copy">
              <p className="tile-kicker">Fan Passport</p>
              <h3>Your loyalty, on the record.</h3>
              <p>Attendance is written to the chain, so a fan who never misses a game finally looks different from one who came once.</p>
              <Link className="btn btn-paper btn-sm" to="/passport">Open a sample passport</Link>
            </div>
            <div className="tile-pass-art">
              <ReputationRing score={847} max={1000} size={170} label="Legend" />
              <ul className="mini-tiers">
                {["Rookie", "Fan", "Die-Hard", "Legend"].map((t, i) => <li key={t} className={i === 3 ? "on" : ""}>{t}</li>)}
              </ul>
            </div>
          </article>

          <article className="tile tile-cap" data-reveal style={{ "--d": ".08s" }}>
            <p className="tile-kicker">Resale</p>
            <h3>Resell without the scalpers.</h3>
            <div className="cap-meter">
              <div className="cap-row"><span>Asking</span><strong>PKR 450</strong></div>
              <div className="cap-bar"><span style={{ "--w": "75%" }} /></div>
              <div className="cap-row cap-foot"><span>Cap set by the league</span><span>PKR 600</span></div>
            </div>
            <p>The contract refuses any listing above the cap. No group-chat markups.</p>
          </article>

          <article className="tile tile-gate" data-reveal style={{ "--d": ".14s" }}>
            <div className="scan-box" aria-hidden="true">
              <QRCodeSVG value="wicketpass:042" size={112} bgColor="transparent" fgColor="currentColor" level="L" />
              <span className="scan-line" />
              <span className="stamp">Admitted</span>
            </div>
            <div>
              <p className="tile-kicker">At the gate</p>
              <h3>Scanned once. Never again.</h3>
              <p>A copied screenshot is worthless: the ticket is marked used the moment it's scanned.</p>
            </div>
          </article>

          <article className="tile tile-royalty" data-reveal style={{ "--d": ".2s" }}>
            <p className="tile-kicker">For the league</p>
            <strong className="big-num"><CountUp to={10} suffix="%" /></strong>
            <h3>of every resale goes back to cricket.</h3>
          </article>
        </div>
      </section>

      {/* TIERS */}
      <section className="section tiers-sec">
        <header className="section-head" data-reveal>
          <p className="eyebrow">Fan tiers</p>
          <h2>Earned in the stands, <em>not bought.</em></h2>
        </header>
        <div className="medals">
          {TIERS.map((t, i) => (
            <article className={`medal ${t.tone}`} key={t.name} data-reveal style={{ "--d": `${i * 0.07}s` }}>
              <div className="medal-disc"><Icon name={t.icon} size={30} stroke={1.5} /></div>
              <h3>{t.name}</h3>
              <p className="medal-pts">{t.pts}</p>
              <p className="medal-note">{t.note}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta" data-reveal>
        <div className="cta-stumps" aria-hidden="true"><i /><i /><i /></div>
        <p className="eyebrow eyebrow-light">Season 2026</p>
        <h2>See you at <em>the ground.</em></h2>
        <p>Connect a wallet on the WireFluid network and your first ticket is two clicks away.</p>
        <div className="cta-btns">
          <ConnectWallet className="btn btn-butter btn-lg" onConnected={() => navigate("/portal")} label="Connect wallet" />
          <Link className="btn btn-outline-light btn-lg" to="/portal">See fixtures</Link>
        </div>
      </section>
    </Page>
  )
}
