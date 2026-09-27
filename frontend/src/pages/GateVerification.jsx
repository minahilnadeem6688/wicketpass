import { useEffect, useRef, useState } from "react"
import Page from "../components/layout/Page"
import Icon from "../components/shared/Icon"
import { useWalletContext } from "../context/WalletContext"
import { useTicketNFT } from "../hooks/useTicketNFT"
import { splitMatch } from "../constants/teams"

export default function GateVerification() {
  const { wallet, signer, provider } = useWalletContext()
  const { verifyTicket, scanTicket } = useTicketNFT(signer, provider)

  const [input, setInput]       = useState("")
  const [result, setResult]     = useState(null)
  const [scanning, setScanning] = useState(false)
  const [stats, setStats]       = useState({ scanned: 0, valid: 0, invalid: 0 })
  const verdictRef = useRef(null)

  // On phones the result sits below the scanner, so bring it into view
  useEffect(() => {
    const el = verdictRef.current
    if (!result || !el) return
    const r = el.getBoundingClientRect()
    if (r.top > window.innerHeight - 120 || r.top < 70) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [result])

  async function scan() {
    const id = input.trim()
    if (!id) return
    setScanning(true)
    setResult(null)
    const next = { ...stats, scanned: stats.scanned + 1 }
    try {
      const tokenId = parseInt(id.replace(/^NFT-?/i, "").replace("#", ""))
      if (isNaN(tokenId)) throw new Error("Invalid ticket ID")
      const v = await verifyTicket(tokenId)
      if (v.isValid) {
        setResult({ type: "valid", tokenId, ...v })
        setStats({ ...next, valid: next.valid + 1 })
        if (wallet) {
          const s = await scanTicket(tokenId)
          if (s.success) setResult((prev) => ({ ...prev, txHash: s.txHash, wirescan: s.wirescan }))
        }
      } else {
        setResult({ type: v.isUsed ? "used" : "invalid", id })
        setStats({ ...next, invalid: next.invalid + 1 })
      }
    } catch {
      setResult({ type: "invalid", id })
      setStats({ ...next, invalid: next.invalid + 1 })
    } finally {
      setScanning(false)
    }
  }

  function reset() { setInput(""); setResult(null) }

  const teams = result?.matchName ? splitMatch(result.matchName) : null

  return (
    <Page>
      <section className="page-head">
        <div data-reveal>
          <p className="eyebrow"><span className="dot-live" /> Gate 4 · Scanner</p>
          <h1>Scan. <em>Check.</em> Admit.</h1>
          <p className="page-sub">Enter a ticket number and the contract confirms who owns it and whether it has already been used.</p>
        </div>
        <dl className="gate-count" data-reveal style={{ "--d": ".1s" }}>
          <div><dt>{stats.scanned}</dt><dd>Scanned</dd></div>
          <div className="ok"><dt>{stats.valid}</dt><dd>Admitted</dd></div>
          <div className="no"><dt>{stats.invalid}</dt><dd>Turned away</dd></div>
        </dl>
      </section>

      <section className="page-sec gate">
        <div className="scanner" data-reveal>
          <div className={`viewfinder ${scanning ? "busy" : ""}`}>
            <span className="vf-corners" />
            <span className="vf-line" />
            <Icon name="scan" size={46} stroke={1.2} />
            <p>{scanning ? "Checking the chain…" : "Point the camera at a ticket, or type its number"}</p>
          </div>
          <label className="field-label light" htmlFor="tid">Ticket number</label>
          <div className="scan-row">
            <input id="tid" className="input input-dark" placeholder="e.g. 1 or NFT-1" value={input}
              onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && scan()} />
            <button className="btn btn-butter" onClick={scan} disabled={scanning || !input.trim()}>{scanning ? "Checking…" : "Verify"}</button>
          </div>
          <div className="quick">
            <span>Try a minted ticket</span>
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} className="quick-btn" onClick={() => setInput(String(n))}>#{n}</button>
            ))}
          </div>
        </div>

        <div className="verdict" ref={verdictRef} data-reveal style={{ "--d": ".08s", scrollMarginTop: 84 }} aria-live="polite">
          {!result && (
            <div className="verdict-idle">
              <div className="idle-ticket"><span /><span /><span /></div>
              <h3>Waiting for the next fan</h3>
              <p>Results show up here with the seat, the match and the owner's wallet.</p>
            </div>
          )}

          {result?.type === "valid" && (
            <div className="verdict-card ok" key={`ok-${result.tokenId}`}>
              <span className="big-stamp">Admitted</span>
              <p className="eyebrow">Ticket No. {String(result.tokenId).padStart(3, "0")}</p>
              <h3>{teams ? `${teams[0].city} vs ${teams[1].city}` : result.matchName}</h3>
              <dl className="receipt">
                <div><dt>Stand</dt><dd>{result.stand}</dd></div>
                <div><dt>Seat</dt><dd>{result.seat}</dd></div>
                <div><dt>Date</dt><dd>{result.date}</dd></div>
                <div><dt>Owner</dt><dd className="mono">{result.currentOwner?.slice(0, 6)}…{result.currentOwner?.slice(-4)}</dd></div>
              </dl>
              {result.txHash ? (
                <p className="logged"><Icon name="check" size={15} stroke={2} /> Attendance logged. <a href={result.wirescan} target="_blank" rel="noreferrer">View on WireScan</a></p>
              ) : !wallet && (
                <p className="logged muted">Connect the gate wallet to log attendance on-chain.</p>
              )}
            </div>
          )}

          {(result?.type === "invalid" || result?.type === "used") && (
            <div className="verdict-card no" key={`no-${result.id}`}>
              <span className="big-stamp">Denied</span>
              <p className="eyebrow">Ticket {result.id}</p>
              <h3>{result.type === "used" ? "Already used." : "Not a valid ticket."}</h3>
              <p className="verdict-why">
                {result.type === "used"
                  ? "This ticket was scanned earlier, so it can't be used to enter again."
                  : "There's no ticket with this number on the WireFluid network."}
              </p>
            </div>
          )}

          {result && <button className="btn btn-ghost btn-block" onClick={reset}>Scan the next ticket</button>}
        </div>
      </section>
    </Page>
  )
}
