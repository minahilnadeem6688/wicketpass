import { useEffect } from "react"
import Icon from "./Icon"

export default function Toast({ toast, onDone }) {
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(onDone, 6000)
    return () => clearTimeout(t)
  }, [toast, onDone])
  if (!toast) return null
  return (
    <div className={`toast ${toast.ok ? "ok" : "err"}`} role="status">
      <Icon name={toast.ok ? "check" : "alert"} size={17} stroke={2} />
      <span>{toast.msg}</span>
      {toast.link && <a href={toast.link} target="_blank" rel="noreferrer">View on WireScan</a>}
    </div>
  )
}
