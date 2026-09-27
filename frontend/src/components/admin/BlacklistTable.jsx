import { useState } from "react"

const INITIAL = [
  { wallet:"0xAB12…CD34", reason:"Listed above the cap",  date:"10 Apr" },
  { wallet:"0xEF56…A078", reason:"Fake ticket attempt",   date:"11 Apr" },
  { wallet:"0x1C90…BE12", reason:"Bulk buying",           date:"12 Apr" },
]

export default function BlacklistTable() {
  const [list, setList] = useState(INITIAL)
  const clear = (i) => setList(list.map((item, idx) => (idx === i ? { ...item, cleared: true } : item)))

  return (
    <article className="panel" data-reveal>
      <header className="panel-head"><h2>Blacklist</h2><span className="panel-sub">Flagged wallets stop earning points</span></header>
      <div className="table-wrap">
        <table className="table">
          <thead><tr><th>Wallet</th><th>Reason</th><th>Date</th><th /></tr></thead>
          <tbody>
            {list.map((item, i) => (
              <tr key={i} className={item.cleared ? "is-cleared" : ""}>
                <td className="mono">{item.wallet}</td>
                <td><span className="tag">{item.reason}</span></td>
                <td className="muted">{item.date}</td>
                <td className="right">
                  <button className="btn btn-ghost btn-sm" onClick={() => clear(i)} disabled={item.cleared}>{item.cleared ? "Cleared" : "Clear"}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  )
}
