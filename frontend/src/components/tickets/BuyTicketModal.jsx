import { useState } from "react"
import Modal from "../shared/Modal"
import { team } from "../../constants/teams"

const STANDS = ["West", "East", "North", "South", "VIP"]

export default function BuyTicketModal({ match, onClose, onConfirm, loading }) {
  const [seat, setSeat]   = useState("")
  const [stand, setStand] = useState("West")
  const [err, setErr]     = useState("")
  const a = team(match.team1), b = team(match.team2)

  function confirm() {
    if (!seat.trim()) { setErr("Enter your seat number, for example B-12."); return }
    onConfirm(seat.trim(), stand)
  }

  return (
    <Modal kicker="Buy a ticket" title={`${a.city} vs ${b.city}`} onClose={onClose}>
      <p className="modal-sub">{match.date} · {match.venue}</p>

      <div className="field">
        <label className="field-label">Stand</label>
        <div className="seg">
          {STANDS.map((s) => (
            <button key={s} type="button" className={`seg-btn ${stand === s ? "on" : ""}`} onClick={() => setStand(s)}>{s}</button>
          ))}
        </div>
      </div>

      <div className="field">
        <label className="field-label" htmlFor="seat">Seat number</label>
        <input id="seat" className="input" placeholder="e.g. B-12" value={seat} onChange={(e) => { setSeat(e.target.value); setErr("") }} />
        {err && <p className="field-err">{err}</p>}
      </div>

      <div className="modal-total">
        <span>Total</span>
        <strong>{match.priceLabel}</strong>
      </div>
      <p className="modal-note">The ticket is minted as an NFT to your wallet on the WireFluid network. You'll confirm the payment in MetaMask.</p>

      <div className="modal-btns">
        <button className="btn btn-ink btn-lg btn-block" onClick={confirm} disabled={loading}>
          {loading ? "Minting on WireFluid…" : "Confirm and mint"}
        </button>
        <button className="btn btn-ghost btn-lg btn-block" onClick={onClose}>Cancel</button>
      </div>
    </Modal>
  )
}
