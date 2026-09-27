import { useState } from "react"
import Modal from "../shared/Modal"
import Icon from "../shared/Icon"

const MY_TICKETS = [
  { id:"042", label:"No. 042 · Karachi vs Lahore · B-12",   cap:600  },
  { id:"089", label:"No. 089 · Peshawar vs Quetta · A-05",  cap:1000 },
  { id:"124", label:"No. 124 · Islamabad vs Multan · C-22", cap:1200 },
]

export default function ListTicketModal({ onClose }) {
  const [ticket, setTicket] = useState(MY_TICKETS[0])
  const [price, setPrice] = useState("")
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const n = parseInt(price) || 0
  const over = n > ticket.cap
  const pct = Math.min(100, (n / ticket.cap) * 100)

  function submit() {
    if (!n || over) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setDone(true) }, 1500)
  }

  return (
    <Modal kicker="Resale" title="List your ticket" onClose={onClose}>
      <p className="modal-sub">Set a price up to the cap. The contract won't accept anything higher.</p>

      <div className="field">
        <label className="field-label" htmlFor="tk">Ticket</label>
        <select id="tk" className="input" value={ticket.id} onChange={(e) => setTicket(MY_TICKETS.find((t) => t.id === e.target.value))}>
          {MY_TICKETS.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
        </select>
      </div>

      <div className="field">
        <label className="field-label" htmlFor="pr">Your price (PKR)</label>
        <input id="pr" className="input" type="number" inputMode="numeric" placeholder={`Up to ${ticket.cap}`} value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>

      <div className={`cap-meter light ${over ? "over" : ""}`}>
        <div className="cap-bar"><span style={{ "--w": `${pct}%`, transform: "scaleX(1)" }} /></div>
        <div className="cap-row cap-foot"><span>{over ? "Above the cap" : "Price cap"}</span><span>PKR {ticket.cap.toLocaleString()}</span></div>
      </div>
      {over && <p className="field-err"><Icon name="alert" size={15} /> That's over the cap for this match. Try PKR {ticket.cap.toLocaleString()} or less.</p>}

      {done ? (
        <div className="done-box"><Icon name="check" size={20} stroke={2.2} /> Listed. Fans can buy it now.</div>
      ) : (
        <div className="modal-btns">
          <button className="btn btn-ball btn-lg btn-block" onClick={submit} disabled={loading || !n || over}>{loading ? "Listing on WireFluid…" : "List ticket"}</button>
          <button className="btn btn-ghost btn-lg btn-block" onClick={onClose}>Cancel</button>
        </div>
      )}
    </Modal>
  )
}
