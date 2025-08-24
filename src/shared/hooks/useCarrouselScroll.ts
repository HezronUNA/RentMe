// src/shared/hooks/useHorizontalCarousel.ts
import { useCallback, useEffect, useRef, useState } from "react"

type Options = {
  slideSelector?: string
  gapPx?: number
  behavior?: ScrollBehavior
  autoplayMs?: number           // p.ej. 4000
  pauseOnHover?: boolean        // true = pausa al hover
  loop?: boolean                // true = vuelve al inicio
}

type BindHover = {
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export default function useHorizontalCarousel({
  slideSelector = "[data-slide]",
  gapPx = 0,
  behavior = "smooth",
  autoplayMs,
  pauseOnHover = true,
  loop = true,
}: Options = {}) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [hovered, setHovered] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  // Lista de slides (se recalcula cuando cambia el DOM via updateState)
  const getSlides = useCallback((): HTMLElement[] => {
    const el = scrollerRef.current
    if (!el) return []
    return Array.from(el.querySelectorAll(slideSelector)) as HTMLElement[]
  }, [slideSelector])

  const getSlideWidth = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return 0
    const first = el.querySelector(slideSelector) as HTMLElement | null
    // si usas basis-full/min-w-full, esto será el ancho del viewport
    return first?.clientWidth ?? Math.round(el.clientWidth)
  }, [slideSelector])

  const updateState = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const width = getSlideWidth()
    if (!width) return
    const idx = Math.round(el.scrollLeft / (width + gapPx))
    setActiveIndex(idx)
  }, [gapPx, getSlideWidth])

  useEffect(() => {
    updateState()
    const el = scrollerRef.current
    if (!el) return

    const onScroll = () => updateState()
    el.addEventListener("scroll", onScroll, { passive: true })

    const ro = new ResizeObserver(() => updateState())
    ro.observe(el)

    // si las imágenes cargan después, recalcula
    const onLoad = () => updateState()
    window.addEventListener("load", onLoad)

    return () => {
      el.removeEventListener("scroll", onScroll)
      ro.disconnect()
      window.removeEventListener("load", onLoad)
    }
  }, [updateState])

  const goTo = useCallback(
    (index: number) => {
      const el = scrollerRef.current
      if (!el) return
      const slides = getSlides()
      if (!slides.length) return
      const width = getSlideWidth()
      const max = slides.length - 1
      const clamped = Math.max(0, Math.min(index, max))
      el.scrollTo({ left: clamped * (width + gapPx), behavior })
      setActiveIndex(clamped)
    },
    [behavior, gapPx, getSlideWidth, getSlides]
  )

  const scrollNext = useCallback(() => {
    const slides = getSlides()
    if (!slides.length) return
    const next = activeIndex + 1
    if (next < slides.length) goTo(next)
    else if (loop) goTo(0)
  }, [activeIndex, getSlides, goTo, loop])

  const scrollPrev = useCallback(() => {
    const slides = getSlides()
    if (!slides.length) return
    const prev = activeIndex - 1
    if (prev >= 0) goTo(prev)
    else if (loop) goTo(slides.length - 1)
  }, [activeIndex, getSlides, goTo, loop])

  // AUTOPLAY
  const startAutoplay = useCallback(() => {
    if (!autoplayMs) return
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      // usar requestAnimationFrame para evitar que se “salte”
      requestAnimationFrame(scrollNext)
    }, autoplayMs)
  }, [autoplayMs, scrollNext])

  const stopAutoplay = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!autoplayMs) return
    if (pauseOnHover && hovered) {
      stopAutoplay()
      return
    }
    startAutoplay()
    return stopAutoplay
  }, [autoplayMs, pauseOnHover, hovered, startAutoplay, stopAutoplay])

  // Reiniciar autoplay cuando cambie cantidad de slides (por renders async)
  useEffect(() => {
    if (!autoplayMs) return
    startAutoplay()
    return stopAutoplay
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getSlides().length])

  const bindHover: BindHover =
    pauseOnHover
      ? {
          onMouseEnter: () => setHovered(true),
          onMouseLeave: () => setHovered(false),
        }
      : {}

  return {
    scrollerRef,
    activeIndex,
    goTo,
    scrollPrev,
    scrollNext,
    bindHover,
    startAutoplay,
    stopAutoplay,
  }
}
