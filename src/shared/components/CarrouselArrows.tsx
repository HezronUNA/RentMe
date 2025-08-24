// src/slices/accomodations/components/CarouselArrows.tsx
import { Button } from "@/shared/components/button"
import type { Props } from "../types/CarrouselType"

export default function CarouselArrows({
  onPrev,
  onNext,
  showPrev = true,
  showNext = true,
  className = "",
}: Props) {
  return (
    <div
      className={`pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between ${className}`}
      aria-hidden
    >
      {/* Prev */}
      <div className="pointer-events-auto pl-1">
        <Button
          variant="white"
          onClick={onPrev}
          aria-label="Anterior"
          className={`rounded-full shadow-md backdrop-blur border border-black/10 bg-white/80 hover:bg-white ${
            showPrev ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* ícono inline para no depender de libs */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Button>
      </div>

      {/* Next */}
      <div className="pointer-events-auto pr-1">
        <Button
          variant="white"
          onClick={onNext}
          aria-label="Siguiente"
          className={`rounded-full shadow-md backdrop-blur border border-black/10 bg-white/80 hover:bg-white ${
            showNext ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Button>
      </div>
    </div>
  )
}
