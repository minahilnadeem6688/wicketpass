import Icon from "../shared/Icon"
const TIER_STYLES = {
  Legend:   { icon:"trophy", color:"#F2C14E" },
  "Die-Hard":{ icon:"medal", color:"#F2C14E" },
  Fan:      { icon:"star", color:"#C9D3CD"  },
  Rookie:   { icon:"rookie", color:"#888"     },
}

export default function ResaleCard({ item, onBuy }) {
  const tier = TIER_STYLES[item.tier] || TIER_STYLES.Fan

  return (
    <div className="mk-card">
      <div className="mk-card-strip" style={{ background: item.stripColor }} />
      <div className="mk-card-body">
        <div className="mk-card-top">
          <div className="mk-match-name">{item.match}</div>
          <div className="mk-nft-badge">NFT {item.nft}</div>
        </div>
        <div className="mk-card-meta">
          <div className="mk-meta-row"><Icon name="calendar" size={14} /> {item.date}</div>
          <div className="mk-meta-row"><Icon name="pin" size={14} /> {item.venue}</div>
          <div className="mk-meta-row"><Icon name="ticket" size={14} /> Seat {item.seat} • Stand {item.stand}</div>
        </div>
        <div className="mk-seller-row">
          <div className="mk-seller-info">
            <div className="mk-seller-label">Seller</div>
            <div className="mk-seller-tier" style={{ color: tier.color }}>
              <Icon name={tier.icon} /> {item.tier} Fan
            </div>
          </div>
          <div className="mk-trust">
            <div className="mk-trust-label">Trust</div>
            <div className="mk-trust-val">{item.trust}%</div>
          </div>
        </div>
        <div className="mk-price-row">
          <div className="mk-price">PKR {item.price.toLocaleString()}</div>
          <div className="mk-cap">
            Price cap: <span>PKR {item.cap.toLocaleString()}</span>
          </div>
        </div>
        <div className="mk-card-btns">
          <button className="mk-buy-btn" onClick={onBuy}>Buy Now</button>
          <button className="mk-scan-btn">WireScan</button>
        </div>
      </div>
    </div>
  )
}