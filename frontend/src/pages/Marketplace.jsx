import { useState } from "react"
import Page from "../components/layout/Page"
import TicketStub from "../components/tickets/TicketStub"
import ListTicketModal from "../components/marketplace/ListTicketModal"
import BuyNowModal from "../components/marketplace/BuyNowModal"
import Icon from "../components/shared/Icon"
import { TIER_ICON } from "../constants/tiers"
import { TEAMS, splitMatch } from "../constants/teams"

const LISTINGS = [
  { id:1,  nft:"042", match:"Karachi vs Lahore",        date:"Tue 14 Apr", venue:"National Stadium, Karachi",  seat:"B-12", stand:"West",  price:450, cap:600,  tier:"Legend",   trust:98  },
  { id:2,  nft:"089", match:"Peshawar vs Quetta",       date:"Wed 15 Apr", venue:"Gaddafi Stadium, Lahore",    seat:"A-05", stand:"North", price:700, cap:1000, tier:"Die-Hard", trust:94  },
  { id:3,  nft:"124", match:"Islamabad vs Multan",      date:"Thu 16 Apr", venue:"Rawalpindi Stadium",         seat:"C-22", stand:"East",  price:900, cap:1200, tier:"Fan",      trust:87  },
  { id:4,  nft:"055", match:"Karachi vs Lahore",        date:"Tue 14 Apr", venue:"National Stadium, Karachi",  seat:"D-08", stand:"South", price:380, cap:600,  tier:"Legend",   trust:100 },
  { id:5,  nft:"201", match:"Lahore vs Peshawar",       date:"Fri 17 Apr", venue:"Gaddafi Stadium, Lahore",    seat:"F-14", stand:"VIP",   price:520, cap:750,  tier:"Die-Hard", trust:91  },
  { id:6,  nft:"178", match:"Quetta vs Rawalpindiz",    date:"Tue 21 Apr", venue:"National Stadium, Karachi",  seat:"B-33", stand:"East",  price:650, cap:900,  tier:"Fan",      trust:82  },
  { id:7,  nft:"210", match:"Hyderabad vs Karachi",     date:"Sat 18 Apr", venue:"National Stadium, Karachi",  seat:"G-11", stand:"West",  price:500, cap:700,  tier:"Die-Hard", trust:89  },
  { id:8,  nft:"233", match:"Rawalpindiz vs Islamabad", date:"Sun 19 Apr", venue:"Rawalpindi Stadium",         seat:"E-07", stand:"North", price:600, cap:850,  tier:"Legend",   trust:96  },
  { id:9,  nft:"251", match:"Multan vs Hyderabad",      date:"Mon 20 Apr", venue:"Multan Cricket Stadium",     seat:"A-15", stand:"South", price:580, cap:800,  tier:"Fan",      trust:85  },
  { id:10, nft:"267", match:"Peshawar vs Lahore",       date:"Wed 22 Apr", venue:"Gaddafi Stadium, Lahore",    seat:"C-09", stand:"East",  price:480, cap:700,  tier:"Legend",   trust:99  },
  { id:11, nft:"289", match:"Islamabad vs Karachi",     date:"Thu 23 Apr", venue:"Rawalpindi Stadium",         seat:"B-20", stand:"West",  price:750, cap:1000, tier:"Die-Hard", trust:92  },
  { id:12, nft:"301", match:"Quetta vs Multan",         date:"Fri 24 Apr", venue:"National Stadium, Karachi",  seat:"D-14", stand:"North", price:420, cap:600,  tier:"Fan",      trust:80  },
].map((l) => ({ ...l, teams: splitMatch(l.match) }))

export default function Marketplace() {
  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("price-asc")
  const [buyItem, setBuyItem] = useState(null)
  const [listOpen, setListOpen] = useState(false)

  const shown = LISTINGS
    .filter((l) => filter === "all" || l.teams.some((t) => t.code.toLowerCase() === filter))
    .sort((a, b) => sortBy === "price-asc" ? a.price - b.price : sortBy === "price-desc" ? b.price - a.price : b.trust - a.trust)

  return (
    <Page>
      <section className="page-head">
        <div data-reveal>
          <p className="eyebrow">Resale</p>
          <h1>Can't make it? <em>Pass it on.</em></h1>
          <p className="page-sub">Every listing sits under a price cap the league sets in the contract, and 10% of each sale goes back to the league. No touts, no markups.</p>
        </div>
        <div className="head-actions" data-reveal style={{ "--d": ".1s" }}>
          <button className="btn btn-ball btn-lg" onClick={() => setListOpen(true)}>List a ticket</button>
        </div>
      </section>

      <section className="page-sec">
        <div className="toolbar" data-reveal>
          <div className="chips-scroll">
            <button className={`fchip ${filter === "all" ? "on" : ""}`} onClick={() => setFilter("all")}>All teams</button>
            {Object.values(TEAMS).map((t) => (
              <button key={t.code} className={`fchip ${filter === t.code.toLowerCase() ? "on" : ""}`} onClick={() => setFilter(t.code.toLowerCase())}>
                <i style={{ background: t.color }} />{t.city}
              </button>
            ))}
          </div>
          <label className="sort">
            <span>Sort</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="price-asc">Lowest price</option>
              <option value="price-desc">Highest price</option>
              <option value="trust">Most trusted seller</option>
            </select>
          </label>
        </div>

        {shown.length === 0 ? (
          <p className="empty">No listings for this team right now.</p>
        ) : (
          <div className="stub-grid">
            {shown.map((item, i) => (
              <div key={item.id} data-reveal style={{ "--d": `${(i % 2) * 0.06}s` }}>
                <TicketStub
                  home={item.teams[0]} away={item.teams[1]} date={item.date} venue={item.venue}
                  seat={item.seat} stand={item.stand} no={item.nft} label="Resale"
                  side={
                    <div className="stub-price">
                      <small>PKR</small><strong>{item.price}</strong>
                      <span>{Math.round((item.price / item.cap) * 100)}% of cap</span>
                    </div>
                  }
                >
                  <span className="seller"><Icon name={TIER_ICON[item.tier]} size={15} /> {item.tier} seller · {item.trust}% trust</span>
                  <button className="btn btn-ink btn-sm" onClick={() => setBuyItem(item)}>Buy</button>
                </TicketStub>
              </div>
            ))}
          </div>
        )}
      </section>

      {buyItem && <BuyNowModal item={buyItem} onClose={() => setBuyItem(null)} />}
      {listOpen && <ListTicketModal onClose={() => setListOpen(false)} />}
    </Page>
  )
}
