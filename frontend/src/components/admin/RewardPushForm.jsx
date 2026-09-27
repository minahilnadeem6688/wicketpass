import { useState } from "react"
import Icon from "../shared/Icon"

const AUDIENCES = ["All fans", "Fan and above", "Die-Hard and above", "Legends only"]

export default function RewardPushForm() {
  const [aud, setAud]         = useState(AUDIENCES[0])
  const [sponsor, setSponsor] = useState("")
  const [reward, setReward]   = useState("")
  const [loading, setLoading] = useState(false)
  const [done, setDone]       = useState(false)

  function send() {
    if (!sponsor || !reward) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setDone(true) }, 1500)
  }

  return (
    <article className="panel" data-reveal style={{ "--d": ".08s" }}>
      <header className="panel-head"><h2>Send a sponsor reward</h2></header>
      <div className="field">
        <span className="field-label">Who gets it</span>
        <div className="seg seg-wrap">
          {AUDIENCES.map((a) => <button key={a} type="button" className={`seg-btn ${aud === a ? "on" : ""}`} onClick={() => setAud(a)}>{a}</button>)}
        </div>
      </div>
      <div className="field">
        <label className="field-label" htmlFor="sp">Sponsor</label>
        <input id="sp" className="input" placeholder="e.g. HBL, Jazz" value={sponsor} onChange={(e) => setSponsor(e.target.value)} />
      </div>
      <div className="field">
        <label className="field-label" htmlFor="rw">Reward</label>
        <input id="rw" className="input" placeholder="e.g. Free upgrade to the VIP enclosure" value={reward} onChange={(e) => setReward(e.target.value)} />
      </div>
      <button className="btn btn-ball btn-lg btn-block" onClick={send} disabled={loading || !sponsor || !reward}>{loading ? "Sending on WireFluid…" : "Send reward"}</button>
      {done && <p className="done-inline"><Icon name="check" size={16} stroke={2.2} /> Sent to {aud.toLowerCase()}.</p>}
    </article>
  )
}
