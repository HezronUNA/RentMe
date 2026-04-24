import { useEffect, useRef, useState } from "react"
import ReviewDesktop from "./ReviewDesktop"
import ReviewMobile from "./ReviewMobile"
import { H2 } from "@/components/ui/Typography"

// Reseñas estáticas de ejemplo - Exportadas para reutilizar en otros componentes
export const STATIC_REVIEWS = [
  {
    id: '1',
    nombreHuesped: 'María González',
    correo: 'maria@ejemplo.com',
    calificacion: 5,
    mensaje: 'Excelente servicio, la propiedad estaba impecable y la atención fue de primera. Definitivamente volveremos.',
    fecha: new Date('2024-01-15'),
    estado: 'aprobado',
    hospedajeId: null
  },
  {
    id: '2',
    nombreHuesped: 'Carlos Ramírez',
    correo: 'carlos@ejemplo.com',
    calificacion: 5,
    mensaje: 'Muy buena experiencia, la ubicación es perfecta y las instalaciones superaron nuestras expectativas.',
    fecha: new Date('2024-02-20'),
    estado: 'aprobado',
    hospedajeId: null
  },
  {
    id: '3',
    nombreHuesped: 'Ana Vargas',
    correo: 'ana@ejemplo.com',
    calificacion: 4,
    mensaje: 'Gran servicio y atención al cliente. La casa era hermosa y cómoda para toda la familia.',
    fecha: new Date('2024-03-10'),
    estado: 'aprobado',
    hospedajeId: null
  }
]

type Props = {
  title?: string
  className?: string
}

export default function ReviewsCarousel({
  title = "Nuestras Reseñas",
  className = "",
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const originalItems = STATIC_REVIEWS
  const count = originalItems.length
  const canNav = count > 1

  // Create array with cloned elements for infinite effect
  const items = canNav
    ? [originalItems[count - 1], ...originalItems, originalItems[0]]
    : originalItems

  const moveToSlide = (index: number, smooth = true) => {
    if (!canNav) return
    setIsTransitioning(smooth)
    setCurrentIndex(index)
  }

  const handleTransitionEnd = () => {
    setIsTransitioning(false)
    if (currentIndex >= count + 1) {
      moveToSlide(1, false)
    } else if (currentIndex === 0) {
      moveToSlide(count, false)
    }
  }

  const nextSlide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    moveToSlide(currentIndex + 1)
  }

  const prevSlide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    moveToSlide(currentIndex - 1)
  }

  // Touch handling
  const startX = useRef<number | null>(null)
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return
    const dx = e.changedTouches[0].clientX - startX.current
    if (Math.abs(dx) > 30 && canNav) {
      if (dx < 0) nextSlide()
      else prevSlide()
    }
    startX.current = null
  }

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <section className={`w-full text-center mx-auto flex flex-col items-center justify-center ${className}`}>
      <H2 className="text-2xl sm:text-4xl font-semibold tracking-[0.14em] uppercase text-zinc-800 mb-4">
        {title}
      </H2>

      <div className="w-full max-w-[1020px] relative mx-auto">
        <div className="relative pb-10">
          <div className="w-full h-auto relative rounded-[5px] overflow-hidden flex items-center justify-center">
            <div className="hidden md:block absolute inset-0 w-full h-full" style={{ background: "#52655B", zIndex: -1 }}></div>
            
            <div className="w-full h-full flex items-center justify-center overflow-hidden">
              <div
                className="flex w-full h-auto touch-pan-y min-h-[400px] md:h-full"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                  transition: isTransitioning ? 'transform 500ms ease-in-out' : 'none'
                }}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                onTransitionEnd={handleTransitionEnd}
              >
                {items.map((r) => (
                  <div
                    key={r.id}
                    className="min-w-full max-w-full flex-shrink-0 flex items-center justify-center p-4"
                  >
                    <div className="md:hidden p-4 bg-white rounded-[18px] flex flex-col justify-center items-center w-full max-w-[640px] shadow-[0_4px_16px_rgba(0,0,0,0.15)] border border-gray-100">
                      <ReviewMobile review={r} />
                    </div>
                    
                    <div className="hidden md:flex p-8 bg-white rounded-[18px] flex-col justify-center items-center w-full max-w-[640px]">
                      <ReviewDesktop review={r} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Indicadores para móvil - 5 puntos con efecto loop */}
          {canNav && (
            <div className="md:hidden absolute bottom-0 left-0 right-0 flex justify-center gap-2 py-2">
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, idx) => {
                  // Calculamos la posición relativa considerando el índice actual
                  let position = ((currentIndex - 1) % count + count) % count; // Asegura número positivo
                  let isActive = false;

                  if (count <= 5) {
                    // Si hay 5 o menos items, mostramos la posición exacta
                    isActive = idx === position;
                  } else {
                    // Para más de 5 items, creamos un efecto de desplazamiento
                    let relativePosition = position % 5;
                    isActive = idx === relativePosition;
                  }

                  return (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        isActive ? 'bg-green-600' : 'bg-gray-300'
                      } shadow-sm`}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Flechas - solo visibles en desktop */}
          {canNav && (
            <>
              <button
                aria-label="Anterior"
                className="hidden md:grid absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 place-items-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white hover:scale-105 transition-all shadow-md border border-white hover:cursor-pointer"
                onClick={prevSlide}
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
                className="hidden md:grid absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 place-items-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white hover:scale-105 transition-all shadow-md border border-white hover:cursor-pointer"
                onClick={nextSlide}
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
      </div>
    </section>
  )
}

