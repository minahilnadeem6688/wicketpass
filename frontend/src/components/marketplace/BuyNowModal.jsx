import { useState } from "react"
import Modal from "../shared/Modal"
import Icon from "../shared/Icon"

export default function BuyNowModal({ item, onClose }) {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [a, b] = item.teams
  const royalty = Math.round(item.price * 0.1)

  function confirm() {
    setLoading(true)
    setTimeout(() => { setLoading(false); setDone(true) }, 1500)
  }

  return (
    <Modal kicker={`Resale · No. ${item.nft}`} title={`${a.city} vs ${b.city}`} onClose={onClose}>
      <p className="modal-sub">{item.date} · {item.venue} · {item.stand} stand, seat {item.seat}</p>
      <dl className="receipt">
        <div><dt>Ticket</dt><dd>PKR {(item.price - royalty).toLocaleString()}</dd></div>
        <div><dt>League royalty (10%)</dt><dd>PKR {royalty.toLocaleString()}</dd></div>
        <div className="receipt-total"><dt>You pay</dt><dd>PKR {item.price.toLocaleString()}</dd></div>
      </dl>
      <div className="cap-meter light">
        <div className="cap-bar"><span style={{ "--w": `${(item.price / item.cap) * 100}%`, transform: "scaleX(1)" }} /></div>
        <div className="cap-row cap-foot"><span>Price cap</span><span>PKR {item.cap.toLocaleString()}</span></div>
      </div>
      {done ? (
        <div className="done-box"><Icon name="check" size={20} stroke={2.2} /> The ticket is yours. It has moved to your wallet.</div>
      ) : (
        <div className="modal-btns">
          <button className="btn btn-ink btn-lg btn-block" onClick={confirm} disabled={loading}>{loading ? "Transferring on WireFluid…" : "Confirm purchase"}</button>
          <button className="btn btn-ghost btn-lg btn-block" onClick={onClose}>Cancel</button>
        </div>
      )}
    </Modal>
  )
}
