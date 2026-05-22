import { useLocation } from '@tanstack/react-router'
import { useEffect } from 'react'

export default function ScrollToTop() {
  const {pathname} = useLocation();

  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)

    if (isIOS) {
      window.scrollTo({ top: 0, behavior: "auto" })
      return
    }

    const startY = window.scrollY
    const duration = 280
    const startTime = performance.now()

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

    let rafId = 0

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const nextY = startY * (1 - easeOutCubic(progress))
      window.scrollTo({ top: nextY, behavior: "auto" })

      if (progress < 1) {
        rafId = window.requestAnimationFrame(step)
      }
    }

    rafId = window.requestAnimationFrame(step)

    return () => window.cancelAnimationFrame(rafId)
  }, [pathname]);

  return null;
}


