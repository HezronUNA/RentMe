import ReviewSlide from "./ReviewSlide";
import { useReviewsCarousel } from "../../hooks/useReviewsCarousel";

type Props = {
  title?: string;
  hospedajeId?: string | null;
  limit?: number;
  className?: string;
};

export default function ReviewsCarousel({
  title = "Lo que la gente opina de nosotros",
  hospedajeId = null,
  limit,
  className = "",
}: Props) {
  const {
    items,
    loading,
    idx,
    setIdx,
    count,
    canNav,
  } = useReviewsCarousel(hospedajeId, limit);

  return (
    <section className={`w-full flex flex-col items-center justify-center ${className}`}> 
  <h3 className="text-4xl font-bold text-black mb-8 text-center" style={{ fontFamily: 'Work Sans, sans-serif' }}>{title}</h3>
      <div className="w-[1020px] h-96 relative bg-zinc-600 rounded-[5px] overflow-hidden mx-auto flex items-center justify-center" style={{ background: '#52655B' }}>
        {/* Carrusel con layout Figma */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex transition-transform duration-500 ease-[cubic-bezier(0.4,0.2,0.2,1)] will-change-transform w-full h-full" style={{ transform: `translateX(-${idx * 100}%)` }}>
            {loading ? (
              <Skeleton />
            ) : count === 0 ? (
              <EmptyCard />
            ) : (
              items.map((r) => (
                <div key={r.id} className="min-w-full max-w-full flex-shrink-0 flex items-center justify-center">
                  <div className="p-10 bg-neutral-50 rounded-[18px] flex justify-start items-start gap-6 w-[640px] text-left">
                    <ReviewSlide review={r} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {/* Flechas funcionales fuera del card */}
        {canNav && (
          <>
            <button
              aria-label="Anterior"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 grid place-items-center w-12 h-12 rounded-full bg-white/95 hover:bg-white hover:scale-105 transition-all shadow-md border border-white"
              onClick={() => setIdx((i) => (i - 1 + count) % count)}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M14.5 7L9.5 12L14.5 17" stroke="#666" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              aria-label="Siguiente"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 grid place-items-center w-12 h-12 rounded-full bg-white/95 hover:bg-white hover:scale-105 transition-all shadow-md border border-white"
              onClick={() => setIdx((i) => (i + 1) % count)}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M9.5 7L14.5 12L9.5 17" stroke="#666" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
      </div>
    </section>
  );
}

/* Placeholders */
function Skeleton() {
  return (
    <div className="min-w-full max-w-full flex-shrink-0">
      <div className="mx-auto w-full max-w-[760px] bg-neutral-100 rounded-2xl p-10 animate-pulse">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-neutral-200" />
          <div className="flex-1 space-y-3">
            <div className="h-4 bg-neutral-200 rounded w-10/12" />
            <div className="h-4 bg-neutral-200 rounded w-9/12" />
            <div className="h-4 bg-neutral-200 rounded w-7/12" />
            <div className="h-4 bg-neutral-200 rounded w-5/12 mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyCard() {
  return (
    <div className="min-w-full max-w-full flex-shrink-0">
      <div className="mx-auto w-full max-w-[760px] bg-neutral-50 rounded-2xl p-10 text-neutral-600 text-sm text-center">
        Aún no hay reseñas para mostrar.
      </div>
    </div>
  );
}
