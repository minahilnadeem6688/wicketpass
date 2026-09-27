import { Link } from "react-router-dom"
import { LogoMark } from "../brand/Logo"
import Icon from "../shared/Icon"

export default function Footer() {
  return (
    <footer className="wp-footer">
      <div className="wp-footer-inner">
        <div className="wp-footer-brand">
          <div className="wp-footer-logo"><LogoMark size={30} /> Wicket<em>Pass</em></div>
          <p>Match tickets that can't be copied, resale that stays fair, and a passport that remembers every match you showed up for.</p>
        </div>
        <nav className="wp-footer-cols" aria-label="Footer">
          <div>
            <h4>Fans</h4>
            <Link to="/portal">Tickets</Link>
            <Link to="/passport">Fan Passport</Link>
            <Link to="/marketplace">Resale</Link>
          </div>
          <div>
            <h4>League</h4>
            <Link to="/gate">Gate scanner</Link>
            <Link to="/admin">Admin</Link>
          </div>
          <div>
            <h4>Project</h4>
            <a href="https://github.com/minahilnadeem6688/wicketpass" target="_blank" rel="noreferrer">
              <Icon name="github" size={15} /> Source code
            </a>
            <a href="https://wirefluidscan.com" target="_blank" rel="noreferrer">WireScan explorer</a>
          </div>
        </nav>
      </div>
      <div className="wp-footer-base">
        <span>© 2026 WicketPass</span>
        <span>Runs on the WireFluid network · chain 92533</span>
      </div>
    </footer>
  )
}
