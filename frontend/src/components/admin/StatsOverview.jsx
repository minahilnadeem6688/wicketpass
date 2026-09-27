const STATS = [
  { icon:"🎟️", num:"1,247", label:"Total Tickets Sold",  color:"#C9A45C", change:"+34 today"           },
  { icon:"💰", num:"PKR 45K", label:"Royalties Earned",   color:"#D9A441", change:"+PKR 2,400 today"    },
  { icon:"🏪", num:"389",    label:"Total Resales",       color:"#6E8B74", change:"+12 today"            },
  { icon:"✅", num:"892",    label:"Gate Scans Today",    color:"#8FA6AE", change:"98.2% valid rate"     },
]

export default function StatsOverview() {
  return (
    <div className="ap-stats">
      {STATS.map((s) => (
        <div className="ap-stat" key={s.label}>
          <span className="ap-stat-icon">{s.icon}</span>
          <div className="ap-stat-num" style={{ color: s.color }}>{s.num}</div>
          <div className="ap-stat-label">{s.label}</div>
          <div className="ap-stat-change">{s.change}</div>
        </div>
      ))}
    </div>
  )
}