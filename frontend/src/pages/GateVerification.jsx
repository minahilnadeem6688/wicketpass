import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ethers } from "ethers"
import Navbar from "../components/layout/Navbar"
import { useWalletContext } from "../context/WalletContext"
import { useTicketNFT } from "../hooks/useTicketNFT"
import Icon from "../components/shared/Icon"

const TIER_STYLE = {
  Legend:     { icon:"trophy", color:"#F2C14E" },
  "Die-Hard": { icon:"medal", color:"#F2C14E" },
  Fan:        { icon:"star", color:"#C9D3CD" },
  Rookie:     { icon:"rookie", color:"#888"    },
}

export default function GateVerification() {
  const navigate = useNavigate()
  const { wallet, signer, provider } = useWalletContext()
  const { verifyTicket, scanTicket, loading } = useTicketNFT(signer, provider)

  const [input, setInput]   = useState("")
  const [result, setResult] = useState(null)
  const [scanning, setScanning] = useState(false)
  const [stats, setStats]   = useState({ scanned:0, valid:0, invalid:0 })

  async function scan() {
    const id = input.trim()
    if (!id) return

    setScanning(true)
    const newStats = { ...stats, scanned: stats.scanned + 1 }

    try {
      const tokenId = parseInt(id.replace("NFT-","").replace("#",""))
      if (isNaN(tokenId)) throw new Error("Invalid ticket ID")

      const verification = await verifyTicket(tokenId)

      if (verification.isValid) {
        setResult({ type:"valid", tokenId, ...verification })
        setStats({ ...newStats, valid: newStats.valid + 1 })

        if (wallet) {
          const scanResult = await scanTicket(tokenId)
          if (scanResult.success) {
            setResult(prev => ({ ...prev, txHash: scanResult.txHash, wirescan: scanResult.wirescan }))
          }
        }
      } else {
        setResult({ type: verification.isUsed ? "used" : "invalid", id })
        setStats({ ...newStats, invalid: newStats.invalid + 1 })
      }
    } catch (err) {
      setResult({ type:"invalid", id, error: err.message })
      setStats({ ...newStats, invalid: newStats.invalid + 1 })
    } finally {
      setScanning(false)
    }
  }

  function reset() { setInput(""); setResult(null) }

  return (
    <div className="gv">
      <Navbar active="gate" />

      <div className="gv-body">
        <div className="gv-title">Gate Scanner</div>
        <div className="gv-sub">Scan ticket ID to verify on WireFluid Network</div>

        <div className="gv-stats">
          <div className="gv-stat">
            <div className="gv-stat-num">{stats.scanned}</div>
            <div className="gv-stat-label">Scanned</div>
          </div>
          <div className="gv-stat">
            <div className="gv-stat-num" style={{color:"#E8B530"}}>{stats.valid}</div>
            <div className="gv-stat-label">Valid</div>
          </div>
          <div className="gv-stat">
            <div className="gv-stat-num" style={{color:"#E0463F"}}>{stats.invalid}</div>
            <div className="gv-stat-label">Invalid</div>
          </div>
        </div>

        <div className="gv-scanner-box">
          <div className="gv-scanner-label">Enter Token ID</div>
          <div className="gv-input-row">
            <input
              className="gv-input"
              placeholder="e.g. 1 or NFT-1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && scan()}
            />
            <button className="gv-scan-btn" onClick={scan} disabled={scanning}>
              {scanning ? "Checking..." : "Verify"}
            </button>
          </div>
          <div className="gv-quick">
            <div className="gv-quick-label">Quick test with your minted tickets:</div>
            <div className="gv-quick-btns">
              {[1,2,3,4,5].map(id => (
                <div key={id} className="gv-quick-btn" onClick={() => setInput(String(id))}>
                  Token #{id}
                </div>
              ))}
            </div>
          </div>
        </div>

        {!result && (
          <div className="gv-idle">
            <div className="gv-idle-icon"><Icon name="scan" size={36} /></div>
            <div className="gv-idle-txt">Ready to scan — enter a token ID above</div>
          </div>
        )}

        {result?.type === "valid" && (
          <div className="gv-result gv-valid">
            <div className="gv-result-top">
              <div className="gv-result-icon"><Icon name="check" size={36} /></div>
              <div className="gv-result-status">VALID</div>
              <div className="gv-result-sub">Verified on WireFluid Network</div>
            </div>
            <div className="gv-fan-details">
              {[
                { label:"Token ID",    val:`#${result.tokenId}`,   cls:"green" },
                { label:"Match",       val:result.matchName,        cls:""      },
                { label:"Seat",        val:`${result.seat} • Stand ${result.stand}`, cls:"" },
                { label:"Date",        val:result.date,             cls:""      },
                { label:"Owner",       val:`${result.currentOwner?.slice(0,6)}...${result.currentOwner?.slice(-4)}`, cls:"green" },
              ].map(row => (
                <div className="gv-detail-row" key={row.label}>
                  <div className="gv-detail-label">{row.label}</div>
                  <div className={`gv-detail-val ${row.cls}`}>{row.val}</div>
                </div>
              ))}
            </div>
            {result.txHash && (
              <div className="gv-logged">
                <div className="gv-logged-dot" />
                <div className="gv-logged-txt">
                  Attendance logged on WireFluid •{" "}
                  <a href={result.wirescan} target="_blank" rel="noreferrer" style={{color:"#E8B530"}}>
                    View on WireScan
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        {(result?.type === "invalid" || result?.type === "used") && (
          <div className="gv-result gv-invalid">
            <div className="gv-result-top">
              <div className="gv-result-icon"><Icon name="x" size={36} /></div>
              <div className="gv-result-status">INVALID</div>
              <div className="gv-result-sub">
                {result.type === "used"
                  ? "Ticket already used — entry denied"
                  : "Ticket not found on WireFluid Network"}
              </div>
            </div>
          </div>
        )}

        {result && (
          <button className="gv-reset-btn" onClick={reset}>Scan Next Ticket</button>
        )}
      </div>
    </div>
  )
}