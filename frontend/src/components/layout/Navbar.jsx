import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useWalletContext } from "../../context/WalletContext"
import { useFanContext } from "../../context/FanContext"
import Logo from "../brand/Logo"
import Icon from "../shared/Icon"
import { TIER_ICON } from "../../constants/tiers"

const LINKS = [
  { label:"Tickets",  path:"/portal"      },
  { label:"Passport", path:"/passport"    },
  { label:"Resale",   path:"/marketplace" },
  { label:"Gate",     path:"/gate"        },
  { label:"Admin",    path:"/admin"       },
]

export default function Navbar() {
  const navigate = useNavigate()
  const { wallet, connect, loading, shortAddress } = useWalletContext()
  const { passport } = useFanContext()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const tier = passport?.tier || null

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  return (
    <header className={`wp-nav ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <div className="wp-nav-inner">
        <Logo onClick={() => { setOpen(false); navigate("/") }} />

        <nav className="wp-links" aria-label="Main">
          {LINKS.map((l) => (
            <NavLink key={l.path} to={l.path} className={({ isActive }) => `wp-link ${isActive ? "active" : ""}`} onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
          <div className="wp-sheet-foot">
            {wallet ? (
              <span className="chip chip-wallet"><span className="dot-live" /> {shortAddress(wallet)}</span>
            ) : (
              <button className="btn btn-ink btn-lg btn-block" onClick={() => { setOpen(false); connect() }} disabled={loading}>
                {loading ? "Connecting…" : "Connect wallet"}
              </button>
            )}
          </div>
        </nav>

        <div className="wp-nav-right">
          {tier && (
            <span className="chip chip-tier"><Icon name={TIER_ICON[tier] || "star"} size={14} /> {tier}</span>
          )}
          {wallet ? (
            <span className="chip chip-wallet"><span className="dot-live" /> {shortAddress(wallet)}</span>
          ) : (
            <button className="btn btn-ink btn-sm wp-nav-connect" onClick={connect} disabled={loading}>
              {loading ? "Connecting…" : <>Connect<span className="hide-xs">&nbsp;wallet</span></>}
            </button>
          )}
          <button className="wp-burger" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            <Icon name={open ? "close" : "menu"} size={22} />
          </button>
        </div>
      </div>
    </header>
  )
}
