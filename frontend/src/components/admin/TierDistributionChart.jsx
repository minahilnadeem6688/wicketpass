import Icon from "../shared/Icon"
const TIERS = [
  { icon:"rookie", label:"Rookie",    pct:45, color:"#888"                                    },
  { icon:"star", label:"Fan",       pct:30, color:"#C9D3CD"                                 },
  { icon:"medal", label:"Die-Hard",  pct:18, color:"#F2C14E"                                 },
  { icon:"trophy", label:"Legend",    pct:7,  color:"linear-gradient(90deg,#F2C14E,#F6D67A)"  },
]

export default function TierDistributionChart() {
  return (
    <div className="ap-card">
      <div className="ap-card-title">Fan Tier Distribution</div>
      <div className="ap-tier-bars">
        {TIERS.map((t) => (
          <div className="ap-tier-row" key={t.label}>
            <div className="ap-tier-label"><Icon name={t.icon} size={14} /> {t.label}</div>
            <div className="ap-tier-bar-wrap">
              <div
                className="ap-tier-bar-fill"
                style={{ width:`${t.pct}%`, background: t.color }}
              />
            </div>
            <div className="ap-tier-pct">{t.pct}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}