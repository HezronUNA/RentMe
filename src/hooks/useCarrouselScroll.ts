import { useCallback, useEffect, useRef, useState } from "react"

type Options = {
  slideSelector?: string
  gapPx?: number
  behavior?: ScrollBehavior
  autoplayMs?: number
  pauseOnHover?: boolean
  loop?: boolean
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
  const activeIndexRef = useRef(0)
  const cachedWidthRef = useRef(0)
  const [slideCount, setSlideCount] = useState(0)

  const getSlides = useCallback((): HTMLElement[] => {
    const el = scrollerRef.current
    if (!el) return []
    return Array.from(el.querySelectorAll(slideSelector)) as HTMLElement[]
  }, [slideSelector])

  const getSlideWidth = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return cachedWidthRef.current
    const first = el.querySelector(slideSelector) as HTMLElement | null
    const width = first?.clientWidth ?? Math.round(el.clientWidth)
    cachedWidthRef.current = width
    return width
  }, [slideSelector])

  const updateState = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const width = cachedWidthRef.current || getSlideWidth()
    if (!width) return
    const idx = Math.round(el.scrollLeft / (width + gapPx))
    if (idx !== activeIndexRef.current) {
      activeIndexRef.current = idx
      setActiveIndex(idx)
    }
  }, [gapPx, getSlideWidth])

  useEffect(() => {
    cachedWidthRef.current = getSlideWidth()
    setSlideCount(getSlides().length)
    const el = scrollerRef.current
    if (!el) return

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateState()
          ticking = false
        })
        ticking = true
      }
    }
    el.addEventListener("scroll", onScroll, { passive: true })

    const ro = new ResizeObserver(() => {
      cachedWidthRef.current = getSlideWidth()
      updateState()
    })
    ro.observe(el)

    const onLoad = () => {
      cachedWidthRef.current = getSlideWidth()
      updateState()
    }
    window.addEventListener("load", onLoad)

    return () => {
      el.removeEventListener("scroll", onScroll)
      ro.disconnect()
      window.removeEventListener("load", onLoad)
    }
  }, [getSlideWidth, updateState, getSlides])

  const goTo = useCallback(
    (index: number) => {
      const el = scrollerRef.current
      if (!el) return
      const slides = getSlides()
      if (!slides.length) return
      const width = cachedWidthRef.current || getSlideWidth()
      const max = slides.length - 1
      const clamped = Math.max(0, Math.min(index, max))
      el.scrollTo({ left: clamped * (width + gapPx), behavior })
      activeIndexRef.current = clamped
      setActiveIndex(clamped)
    },
    [behavior, gapPx, getSlideWidth, getSlides]
  )

  const scrollNext = useCallback(() => {
    const slides = getSlides()
    if (!slides.length) return
    const next = activeIndexRef.current + 1
    if (next < slides.length) goTo(next)
    else if (loop) goTo(0)
  }, [getSlides, goTo, loop])

  const scrollPrev = useCallback(() => {
    const slides = getSlides()
    if (!slides.length) return
    const prev = activeIndexRef.current - 1
    if (prev >= 0) goTo(prev)
    else if (loop) goTo(slides.length - 1)
  }, [getSlides, goTo, loop])

  const startAutoplay = useCallback(() => {
    if (!autoplayMs) return
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
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
    if (!autoplayMs || slideCount === 0) return
    if (pauseOnHover && hovered) {
      stopAutoplay()
      return
    }
    startAutoplay()
    return stopAutoplay
  }, [autoplayMs, pauseOnHover, hovered, slideCount, startAutoplay, stopAutoplay])

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
