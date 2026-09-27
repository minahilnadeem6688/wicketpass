import Icon from "../shared/Icon"
const STATS = [
  { icon:"ticket", num:"1,247", label:"Total Tickets Sold",  color:"#E8B530", change:"+34 today"           },
  { icon:"coins", num:"PKR 45K", label:"Royalties Earned",   color:"#F2C14E", change:"+PKR 2,400 today"    },
  { icon:"resale", num:"389",    label:"Total Resales",       color:"#5FBF8A", change:"+12 today"            },
  { icon:"check", num:"892",    label:"Gate Scans Today",    color:"#B9DCC8", change:"98.2% valid rate"     },
]

export default function StatsOverview() {
  return (
    <div className="ap-stats">
      {STATS.map((s) => (
        <div className="ap-stat" key={s.label}>
          <span className="ap-stat-icon"><Icon name={s.icon} /></span>
          <div className="ap-stat-num" style={{ color: s.color }}>{s.num}</div>
          <div className="ap-stat-label">{s.label}</div>
          <div className="ap-stat-change">{s.change}</div>
        </div>
      ))}
    </div>
  )
}