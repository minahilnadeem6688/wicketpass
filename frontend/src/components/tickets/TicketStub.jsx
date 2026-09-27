import { QRCodeSVG } from "qrcode.react"
import { team } from "../../constants/teams"

// A match ticket: main body, a torn perforation, and a stub on the right.
// `side` renders inside the stub; when it's missing the stub shows a QR code.
export default function TicketStub({
  home, away, date, venue, seat, stand, no, label = "Admit one",
  side, children, qrValue, className = "", style,
}) {
  const h = typeof home === "string" ? team(home) : home
  const a = typeof away === "string" ? team(away) : away
  return (
    <article
      className={`stub ${className}`.trim()}
      style={{ "--home": h.color, "--away": a.color, ...style }}
    >
      <div className="stub-paper">
      <div className="stub-main">
        <div className="stub-top">
          <span className="stub-label">{label}</span>
          {no && <span className="stub-no">No. {no}</span>}
        </div>

        <div className="stub-teams">
          <div className="stub-team">
            <span className="crest" style={{ background: h.color, color: h.ink }}>{h.code}</span>
            <span className="stub-city">{h.city}</span>
          </div>
          <span className="stub-vs">vs</span>
          <div className="stub-team">
            <span className="crest" style={{ background: a.color, color: a.ink }}>{a.code}</span>
            <span className="stub-city">{a.city}</span>
          </div>
        </div>

        <div className="stub-meta">
          {date && <span>{date}</span>}
          {venue && <span>{venue}</span>}
        </div>

        {(seat || stand) && (
          <dl className="stub-seat">
            {stand && <div><dt>Stand</dt><dd>{stand}</dd></div>}
            {seat && <div><dt>Seat</dt><dd>{seat}</dd></div>}
          </dl>
        )}

        {children && <div className="stub-actions">{children}</div>}
      </div>

      <div className="stub-tear" aria-hidden="true" />

      <div className="stub-side">
        {side || (
          <div className="stub-qr">
            <QRCodeSVG value={qrValue || `wicketpass:${no || "ticket"}`} size={76} bgColor="transparent" fgColor="currentColor" level="L" />
            <span>Scan at gate</span>
          </div>
        )}
      </div>
      </div>
    </article>
  )
}
