import Icon from "../shared/Icon"
export default function TrustScore({ score }) {
  return (
    <div className="pp-stat-card">
      <span className="pp-stat-icon"><Icon name="shield" /></span>
      <div className="pp-stat-num">{score}%</div>
      <div className="pp-stat-label">Trust Score</div>
    </div>
  )
}