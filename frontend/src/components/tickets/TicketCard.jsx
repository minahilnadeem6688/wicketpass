import Icon from "../shared/Icon"
export default function TicketCard({ ticket }) {
  return (
    <div className="fp-ticket">
      <div className="fp-ticket-strip" style={{ background: ticket.color }} />
      <div className="fp-ticket-body">
        <div className="fp-ticket-header">
          <div className="fp-ticket-brand">WicketPass</div>
          <div className="fp-ticket-nft">NFT #{ticket.id}</div>
        </div>
        <div className="fp-ticket-match">{ticket.match}</div>
        <div className="fp-ticket-seat">
          <Icon name="calendar" size={14} /> {ticket.date} • Seat {ticket.seat} • Stand {ticket.stand}
        </div>
        <div className="fp-ticket-bottom">
          <div className="fp-qr">▣</div>
          <div className="fp-ticket-scan">
            Scan at gate<br />
            <span style={{ color: "rgba(232,181,48,0.7)", fontSize: "10px" }}>
              On WireScan
            </span>
          </div>
          <button className="fp-resell-btn">Resell</button>
        </div>
      </div>
    </div>
  )
}