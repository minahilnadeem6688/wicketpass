const FEED = [
  { kind:"Mint",    txt:"Ticket minted, Karachi vs Lahore",      time:"2s",  hash:"0x1a2b…3c4d" },
  { kind:"Resale",  txt:"No. 089 resold for PKR 700",            time:"18s", hash:"0x5e6f…7a8b" },
  { kind:"Tier",    txt:"0x9A18…24a4 reached Legend",            time:"45s", hash:"0x9c0d…1e2f" },
  { kind:"Gate",    txt:"No. 042 admitted at gate 4",            time:"1m",  hash:"0x3a4b…5c6d" },
  { kind:"Royalty", txt:"PKR 70 royalty paid to the league",     time:"2m",  hash:"0x7e8f…9a0b" },
  { kind:"Mint",    txt:"Ticket minted, Peshawar vs Quetta",     time:"3m",  hash:"0xab12…cd34" },
  { kind:"Reward",  txt:"Sponsor reward sent to Die-Hard fans",  time:"5m",  hash:"0xef56…a178" },
]

export default function TransactionFeed() {
  return (
    <article className="panel" data-reveal style={{ "--d": ".08s" }}>
      <header className="panel-head"><h2>On-chain activity</h2><span className="chip chip-live"><span className="dot-live" /> Live</span></header>
      <ul className="feed">
        {FEED.map((f, i) => (
          <li key={i} style={{ "--i": i }}>
            <span className={`feed-kind k-${f.kind.toLowerCase()}`}>{f.kind}</span>
            <span className="feed-txt">{f.txt}</span>
            <span className="feed-hash">{f.hash}</span>
            <span className="feed-time">{f.time}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}
