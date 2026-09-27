import { useWalletContext } from "../../context/WalletContext"

export default function ConnectWallet({ onConnected, className = "btn btn-ink btn-lg", label = "Connect wallet" }) {
  const { wallet, connect, loading, shortAddress } = useWalletContext()

  async function handleClick() {
    if (!wallet) await connect()
    if (onConnected) onConnected()
  }

  return (
    <button onClick={handleClick} className={className} disabled={loading}>
      {loading ? "Connecting…" : wallet ? `Continue as ${shortAddress(wallet)}` : label}
    </button>
  )
}
