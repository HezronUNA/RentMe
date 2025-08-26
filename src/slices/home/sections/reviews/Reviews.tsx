
import ReviewDesktop from "./components/ReviewDesktop"
import ReviewMobile from "./components/ReviewMobile"
import { useReviewsCarousel } from "../../hooks/useReviewsCarousel"
import { Skeleton } from "@/shared/components/Skeleton"

type Props = {
  title?: string
  hospedajeId?: string | null
  limit?: number
  className?: string
}

export default function ReviewsCarousel({
  title = "Lo que dicen nuestros clientes",
  hospedajeId = null,
  limit,
  className = "",
}: Props) {
  const { items, loading, idx, setIdx, count, canNav, onTouchStart, onTouchEnd } = useReviewsCarousel(hospedajeId, limit)

  return (
    <section className={`w-full flex flex-col items-center justify-center ${className}`}>
      <h3
        className="text-center text-2xl md:text-4xl font-title uppercase mb-2"
      >
        {title}
      </h3>

      <div
        className="w-full max-w-[1020px] h-auto md:h-96 relative rounded-[5px] overflow-hidden mx-auto flex items-center justify-center"
        style={{ background: "transparent", backgroundColor: "transparent" }}
        data-mobile-only="true"
      >
        {/* Fondo verde solo para desktop */}
        <div className="hidden md:block absolute inset-0 w-full h-full" style={{ background: "#52655B", zIndex: -1 }}></div>
        {/* Carrusel */}
        <div className="w-full h-full flex items-center justify-center">
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.4,0.2,0.2,1)] will-change-transform w-full h-auto min-h-[400px] md:h-full"
            style={{ transform: `translateX(-${idx * 100}%)` }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {loading ? (
              // 👉 Usamos Skeleton global directamente
              <div className="min-w-full max-w-full flex-shrink-0">
                <div className="mx-auto w-full max-w-[760px] bg-neutral-100 rounded-2xl p-10">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <Skeleton className="w-16 h-16 rounded-full" />
                    {/* Texto */}
                    <div className="flex-1 space-y-3">
                      <Skeleton className="h-4 w-10/12" />
                      <Skeleton className="h-4 w-9/12" />
                      <Skeleton className="h-4 w-7/12" />
                      <Skeleton className="h-4 w-5/12 mt-4" />
                    </div>
                  </div>
                </div>
              </div>
            ) : count === 0 ? (
              <EmptyCard />
            ) : (
              items.map((r) => (
                <div
                  key={r.id}
                  className="min-w-full max-w-full flex-shrink-0 flex items-center justify-center p-4"
                >
                  {/* Versión móvil - visible solo en pantallas pequeñas */}
                  <div className="md:hidden p-4 bg-white rounded-[18px] flex flex-col justify-center items-center w-full max-w-[640px] shadow-[0_4px_16px_rgba(0,0,0,0.15)] border border-gray-100">
                    <ReviewMobile review={r} />
                  </div>
                  
                  {/* Versión desktop - visible solo en pantallas medianas y grandes */}
                  <div className="hidden md:flex p-8 bg-white rounded-[18px] flex-col justify-center items-center w-full max-w-[640px]">
                    <ReviewDesktop review={r} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Flechas - solo visibles en desktop */}
        {canNav && (
          <>
            <button
              aria-label="Anterior"
              className="hidden md:grid absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 place-items-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white hover:scale-105 transition-all shadow-md border border-white hover:cursor-pointer"
              onClick={() => setIdx((i) => (i - 1 + count) % count)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M14.5 7L9.5 12L14.5 17"
                  stroke="#666"
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              aria-label="Siguiente"
              className="hidden md:grid absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 place-items-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white hover:scale-105 transition-all shadow-md border border-white"
              onClick={() => setIdx((i) => (i + 1) % count)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9.5 7L14.5 12L9.5 17"
                  stroke="#666"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </>
        )}
      </div>
    </section>
  )
}

function EmptyCard() {
  return (
    <div className="min-w-full max-w-full flex-shrink-0 p-4">
      {/* Versión móvil */}
      <div className="md:hidden mx-auto w-full max-w-[760px] bg-white rounded-2xl p-6 text-neutral-600 text-sm text-center shadow-[0_4px_16px_rgba(0,0,0,0.15)] border border-gray-100">
        Aún no hay reseñas para mostrar.
      </div>
      
      {/* Versión desktop */}
      <div className="hidden md:block mx-auto w-full max-w-[760px] bg-white rounded-2xl p-10 text-neutral-600 text-sm text-center">
        Aún no hay reseñas para mostrar.
      </div>
    </div>
  )
}
