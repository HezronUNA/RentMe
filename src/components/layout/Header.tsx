import { useEffect, useRef, useState } from "react"
import DesktopHeader from "./DesktopHeader"
import MobileHeader from "./MobileHeader"
import { useNavbar } from "@/hooks/useNavbar"

export default function Header() {
  const nav = useNavbar()
  const [scrolled, setScrolled] = useState(false)
  const ticking = useRef(false)

  useEffect(() => {
    setScrolled(window.scrollY > 80)

    if (nav.pathname !== "/") {
      setScrolled(true)
      return
    }

    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 80)
          ticking.current = false
        })
        ticking.current = true
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [nav.pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        nav.open
          ? "bg-gradient-to-b from-gray-100 to-gray-50"
          : "bg-transparent"
      }`}
    >
      <DesktopHeader nav={nav} scrolled={scrolled} />
      <MobileHeader nav={nav} scrolled={scrolled} />
    </header>
  )
}


