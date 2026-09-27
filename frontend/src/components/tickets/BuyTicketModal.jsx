import { useState } from "react"

export default function BuyTicketModal({ match, onClose, onConfirm, loading }) {
  const [seat, setSeat]   = useState("")
  const [stand, setStand] = useState("West")

  function confirm() {
    if (!seat) { alert("Please enter a seat number"); return }
    onConfirm(seat, stand)
  }

  return (
    <div className="fp-modal-overlay">
      <div className="fp-modal">
        <div style={{fontSize:"32px",marginBottom:"12px"}}>🎟️</div>
        <h3>{match.team1} vs {match.team2}</h3>
        <p>{match.date} • {match.venue}</p>
        <div className="fp-modal-price">
          {match.price ? `PKR ${Number(match.price).toLocaleString()}` : "PKR ~500"}
        </div>

        <div style={{textAlign:"left",marginBottom:"16px"}}>
          <div style={{fontSize:"11px",color:"rgba(236,229,211,0.4)",marginBottom:"6px",textTransform:"uppercase"}}>
            Your Seat Number
          </div>
          <input
            style={{width:"100%",background:"rgba(236,229,211,0.05)",border:"0.5px solid rgba(236,229,211,0.15)",color:"#ECE5D3",borderRadius:"9px",padding:"10px 14px",fontSize:"14px",outline:"none"}}
            placeholder="e.g. B-12"
            value={seat}
            onChange={(e) => setSeat(e.target.value)}
          />
        </div>

        <div style={{textAlign:"left",marginBottom:"20px"}}>
          <div style={{fontSize:"11px",color:"rgba(236,229,211,0.4)",marginBottom:"6px",textTransform:"uppercase"}}>
            Stand
          </div>
          <select
            style={{width:"100%",background:"#181C19",border:"0.5px solid rgba(236,229,211,0.15)",color:"#ECE5D3",borderRadius:"9px",padding:"10px 14px",fontSize:"14px",outline:"none"}}
            value={stand}
            onChange={(e) => setStand(e.target.value)}
          >
            <option>West</option>
            <option>East</option>
            <option>North</option>
            <option>South</option>
            <option>VIP</option>
          </select>
        </div>

        <div style={{fontSize:"12px",color:"rgba(236,229,211,0.3)",marginBottom:"20px"}}>
          NFT will be minted to your wallet on WireFluid Network.
          Transaction verifiable on WireScan.
        </div>

        <div className="fp-modal-btns">
          <button
            className="fp-modal-confirm"
            onClick={confirm}
            disabled={loading}
          >
            {loading ? "Minting on WireFluid..." : "Confirm & Mint NFT"}
          </button>
          <button className="fp-modal-cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}