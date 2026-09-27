import { useCallback, useEffect, useState } from "react"
import Page from "../components/layout/Page"
import TicketStub from "../components/tickets/TicketStub"
import BuyTicketModal from "../components/tickets/BuyTicketModal"
import Toast from "../components/shared/Toast"
import Icon from "../components/shared/Icon"
import { useWalletContext } from "../context/WalletContext"
import { useTicketNFT } from "../hooks/useTicketNFT"
import { PSL_MATCHES } from "../constants/matches"
import { TEAMS, team, splitMatch } from "../constants/teams"

// Tickets hub: fixtures you can buy, and the tickets already in your wallet
export default function FanPortal() {
  const { wallet, signer, provider, connect, loading: connecting, shortAddress } = useWalletContext()
  const { getActiveMatches, getMyTickets, buyTicket, loading } = useTicketNFT(signer, provider)

  const [chainMatches, setChainMatches] = useState([])
  const [mine, setMine]       = useState([])
  const [buying, setBuying]   = useState(null)
  const [filter, setFilter]   = useState("all")
  const [toast, setToast]     = useState(null)
  const clearToast = useCallback(() => setToast(null), [])


  async function load() {
    const [m, t] = await Promise.all([getActiveMatches(), getMyTickets(wallet)])
    setChainMatches(m || [])
    setMine(t || [])
  }
  useEffect(() => {
    if (wallet && provider) load()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet, provider])

  const onSale = chainMatches.length > 0
  const fixtures = onSale
    ? chainMatches.map((m) => ({ ...m, priceLabel: `${m.price} WIRE`, currency: "WIRE", amount: m.price, left: m.available }))
    : PSL_MATCHES.map((m) => ({ ...m, priceLabel: `PKR ${m.price.toLocaleString()}`, currency: "PKR", amount: m.price.toLocaleString(), left: m.seats, preview: true }))

  const shown = fixtures.filter((f) => filter === "all" || team(f.team1).code.toLowerCase() === filter || team(f.team2).code.toLowerCase() === filter)

  async function confirm(seat, stand) {
    const r = await buyTicket(buying.id, seat, stand, buying.priceWei)
    setBuying(null)
    if (r.success) { setToast({ ok: true, msg: "Ticket minted to your wallet.", link: r.wirescan }); load() }
    else setToast({ ok: false, msg: "The purchase didn't go through. Check MetaMask and try again." })
  }

  function action(f) {
    if (!wallet) return <button className="btn btn-ink btn-sm" onClick={connect} disabled={connecting}>Connect to buy</button>
    if (f.preview) return <span className="chip chip-soft"><Icon name="clock" size={14} /> Sales open soon</span>
    if (f.left <= 0) return <span className="chip chip-soft">Sold out</span>
    return <button className="btn btn-ink btn-sm" onClick={() => setBuying(f)}>Buy ticket</button>
  }

  return (
    <Page>
      <section className="page-head">
        <div data-reveal>
          <p className="eyebrow"><span className="dot-live" /> Matchday · Season 2026</p>
          <h1>Pick your <em>match.</em></h1>
          <p className="page-sub">Every ticket is minted to your wallet as an NFT, so it can't be forged, copied or sold twice.</p>
        </div>
        <aside className="wallet-card" data-reveal style={{ "--d": ".1s" }}>
          {wallet ? (
            <>
              <p className="wallet-card-k">Signed in as</p>
              <p className="wallet-card-v">{shortAddress(wallet)}</p>
              <p className="wallet-card-foot"><strong>{mine.length}</strong> {mine.length === 1 ? "ticket" : "tickets"} in your wallet</p>
            </>
          ) : (
            <>
              <p className="wallet-card-k">No wallet connected</p>
              <p className="wallet-card-t">Connect MetaMask to buy tickets and see the ones you own.</p>
              <button className="btn btn-ink btn-block" onClick={connect} disabled={connecting}>{connecting ? "Connecting…" : "Connect wallet"}</button>
            </>
          )}
        </aside>
      </section>

      {wallet && mine.length > 0 && (
        <section className="page-sec">
          <h2 className="sec-title" data-reveal>Your tickets</h2>
          <div className="stub-grid">
            {mine.map((t, i) => {
              const [h, a] = splitMatch(t.matchName)
              return (
                <div key={t.tokenId} data-reveal style={{ "--d": `${i * 0.05}s` }}>
                  <TicketStub home={h} away={a} date={t.date} venue={t.venue} seat={t.seat} stand={t.stand}
                    no={String(t.tokenId).padStart(3, "0")} qrValue={`wicketpass:${t.tokenId}`}
                    label={t.isUsed ? "Used at the gate" : t.isListed ? "Listed for resale" : "Admit one"}
                    className={t.isUsed ? "is-used" : ""} />
                </div>
              )
            })}
          </div>
        </section>
      )}

      <section className="page-sec">
        <div className="sec-row" data-reveal>
          <h2 className="sec-title">Fixtures</h2>
          <div className="chips-scroll">
            <button className={`fchip ${filter === "all" ? "on" : ""}`} onClick={() => setFilter("all")}>All teams</button>
            {Object.values(TEAMS).map((t) => (
              <button key={t.code} className={`fchip ${filter === t.code.toLowerCase() ? "on" : ""}`} onClick={() => setFilter(t.code.toLowerCase())}>
                <i style={{ background: t.color }} />{t.city}
              </button>
            ))}
          </div>
        </div>
        {!onSale && (
          <p className="note" data-reveal><Icon name="calendar" size={16} /> This is the published schedule. Tickets go on sale here once the league opens each match on-chain.</p>
        )}
        <div className="stub-grid">
          {shown.map((f, i) => (
            <div key={`${f.id}-${f.team1}`} data-reveal style={{ "--d": `${(i % 2) * 0.06}s` }}>
              <TicketStub home={f.team1} away={f.team2} date={f.date} venue={f.venue}
                label={`Match ${String(f.id).padStart(2, "0")}`}
                side={<div className="stub-price"><small>{f.currency}</small><strong>{f.amount}</strong><span>{f.left} seats left</span></div>}>
                {action(f)}
              </TicketStub>
            </div>
          ))}
        </div>
        {shown.length === 0 && <p className="empty">No fixtures for this team yet.</p>}
      </section>

      {buying && <BuyTicketModal match={buying} loading={loading} onClose={() => setBuying(null)} onConfirm={confirm} />}
      <Toast toast={toast} onDone={clearToast} />
    </Page>
  )
}
