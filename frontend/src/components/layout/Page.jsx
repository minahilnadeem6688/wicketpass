import { useEffect, useRef } from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"

// Shared frame for every screen. Elements marked data-reveal fade up as they scroll into view.
export default function Page({ className = "", children }) {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce || !("IntersectionObserver" in window)) {
      root.querySelectorAll("[data-reveal]").forEach(el => el.classList.add("is-in"))
      return
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target) } })
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 })
    const watch = () => root.querySelectorAll("[data-reveal]:not(.is-in)").forEach(el => io.observe(el))
    watch()
    const mo = new MutationObserver(watch)
    mo.observe(root, { childList: true, subtree: true })
    return () => { io.disconnect(); mo.disconnect() }
  }, [])

  return (
    <div className={`wp ${className}`.trim()} ref={ref}>
      <Navbar />
      <main className="wp-main">{children}</main>
      <Footer />
    </div>
  )
}
