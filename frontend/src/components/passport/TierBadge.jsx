import Icon from "../shared/Icon"
const TIERS = {
  Rookie:   { icon:"rookie", color:"#888"    },
  Fan:      { icon:"star", color:"#C9D3CD" },
  "Die-Hard":{ icon:"medal", color:"#F2C14E" },
  Legend:   { icon:"trophy", color:"#F2C14E" },
}

export default function TierBadge({ tier }) {
  const t = TIERS[tier] || TIERS.Rookie
  return (
    <div>
      <div className="pp-tier-icon"><Icon name={t.icon} /></div>
      <div className="pp-tier-name" style={{ color: t.color }}>{tier} Tier</div>
    </div>
  )
}