import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoscroll from 'embla-carousel-auto-scroll';
import { MapPin } from 'lucide-react';
import { useNearbyActivities } from '../hooks/useNearbyActivities';

interface NearbyActivitiesCarouselProps {
  hospedajeId: string;
}

const NearbyActivitiesCarousel: React.FC<NearbyActivitiesCarouselProps> = ({ 
  hospedajeId 
}) => {
  const { actividades, loading, error } = useNearbyActivities(hospedajeId);

  // Configuración de Embla Carousel con auto-scroll
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      skipSnaps: false,
      dragFree: false, // Deshabilitar drag
      watchDrag: false, // Deshabilitar interacciones de drag
    },
    [
      Autoscroll({
        speed: 0.6,
        startDelay: 0,
        stopOnInteraction: false, // No parar en interacciones normales
        stopOnMouseEnter: false, // No parar automáticamente en mouse enter
        stopOnFocusIn: false, // No parar en focus
      })
    ]
  );

  // Funciones para pausar y reanudar el autoscroll
  const pauseAutoScroll = useCallback(() => {
    if (emblaApi) {
      const autoScrollPlugin = emblaApi.plugins().autoScroll;
      if (autoScrollPlugin) {
        autoScrollPlugin.stop();
      }
    }
  }, [emblaApi]);

  const resumeAutoScroll = useCallback(() => {
    if (emblaApi) {
      const autoScrollPlugin = emblaApi.plugins().autoScroll;
      if (autoScrollPlugin) {
        autoScrollPlugin.play();
      }
    }
  }, [emblaApi]);

  // Prevenir clicks en todo el carrusel
  const handleCarouselClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  if (loading) {
    return (
      <section className="mt-10">
        <div className="h-px bg-gray-300" />
        <div className="mt-3 flex items-center gap-3">
          <span className="h-5 w-1 bg-[#52655B]" />
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Actividades y servicios cercanos
          </h3>
        </div>
        <div className="mt-4 flex gap-4 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-none w-80 bg-gray-200 rounded-lg h-64 animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  if (error || !actividades.length) {
    return null;
  }

  // Duplicar actividades para mejor efecto infinito visual si hay pocas
  const duplicatedActividades = actividades.length < 4 
    ? [...actividades, ...actividades] 
    : actividades;

  return (
    <section className="mt-10">
      <div className="h-px bg-gray-300" />
      <div className="mt-3 flex items-center gap-3">
        <span className="h-5 w-1 bg-[#52655B]" />
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
          Actividades y experiencias cercanas
        </h3>
      </div>
      
      <div className="mt-6 relative w-full">
        <div 
          className="embla w-full" 
          ref={emblaRef}
          onMouseEnter={pauseAutoScroll}
          onMouseLeave={resumeAutoScroll}
          onClick={handleCarouselClick}
          style={{ pointerEvents: 'auto' }}
        >
          <div className="embla__container flex gap-6 px-2 py-4">
            {duplicatedActividades.map((actividad, index) => {
              const imagenPrincipal = actividad.imagenes?.[0] || 'https://placehold.co/400x300';

              return (
                <div
                  key={`${actividad.id}-${index}`}
                  className="embla__slide flex-[0_0_auto] w-[300px] sm:w-[340px]"
                  onClick={handleCarouselClick} // Prevenir clicks en slides individuales
                  style={{ pointerEvents: 'none' }} // Deshabilitar todas las interacciones
                >
                  <article className="
                    bg-white rounded-xl overflow-hidden shadow-md
                    border border-zinc-200 bg-gray-50 hover:bg-white hover:shadow-lg 
                    transition-all duration-300 hover:scale-[1.02]
                    h-full select-none
                  ">
                    {/* Imagen */}
                    <div className="relative h-48 group overflow-hidden">
                      <img
                        src={imagenPrincipal}
                        alt={actividad.nombre}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        draggable={false} // Prevenir drag de imagen
                        onDragStart={(e) => e.preventDefault()} // Prevenir drag
                      />
                      
                      {/* Badge de distancia */}
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-gray-700 flex items-center gap-1.5 shadow-sm">
                        <MapPin className="w-3 h-3 text-[#52655B]" />
                        <span>{actividad.distanciaKm} km</span>
                      </div>

                      {/* Indicador de auto-scroll - se desvanece al hacer hover */}
                      <div className="absolute top-4 right-4 opacity-40 group-hover:opacity-0 transition-opacity duration-300">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-lg" />
                      </div>

                      {/* Overlay sutil para mejor contraste del texto */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Info */}
                    <div className="p-4 space-y-2">
                      <h4 className="text-center text-base font-semibold uppercase tracking-wide text-zinc-900 group-hover:text-[#52655B] transition-colors duration-200 line-clamp-1">
                        {actividad.nombre}
                      </h4>
                      <p className="text-sm text-zinc-600 text-center line-clamp-3 leading-relaxed">
                        {actividad.descripcion}
                      </p>
                      
                      {/* Línea decorativa que aparece en hover */}
                      <div className="pt-2 flex justify-center">
                        <div className="h-0.5 bg-gradient-to-r from-transparent via-[#52655B] to-transparent w-0 group-hover:w-full transition-all duration-300" />
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NearbyActivitiesCarousel;