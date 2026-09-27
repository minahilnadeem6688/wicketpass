import Icon from "../shared/Icon"

const TIERS = [
  { icon:"rookie", label:"Rookie",   pct:45, fans:"5,410", tone:"var(--sand)"   },
  { icon:"star",   label:"Fan",      pct:30, fans:"3,607", tone:"var(--mint)"   },
  { icon:"medal",  label:"Die-Hard", pct:18, fans:"2,164", tone:"var(--butter)" },
  { icon:"trophy", label:"Legend",   pct:7,  fans:"842",   tone:"var(--pitch)"  },
]

export default function TierDistributionChart() {
  return (
    <article className="panel" data-reveal>
      <header className="panel-head"><h2>Fans by tier</h2><span className="panel-sub">12,023 passports</span></header>
      <ul className="bars">
        {TIERS.map((t, i) => (
          <li key={t.label} style={{ "--w": `${t.pct}%`, "--tone": t.tone, "--i": i }}>
            <span className="bars-label"><Icon name={t.icon} size={15} /> {t.label}</span>
            <span className="bars-track"><span /></span>
            <span className="bars-val"><strong>{t.pct}%</strong><small>{t.fans}</small></span>
          </li>
        ))}
      </ul>
    </article>
  )
}
