import { useAccommodationImageGallery } from "../hooks/useAccommodationImageGallery";
import { useEffect, useRef } from "react";

type Props = {
  images: string[];
  alt?: string;
  className?: string;
};

export default function AccommodationImageGallery({ images, alt = "Foto del hospedaje", className = "" }: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const imageRefsRef = useRef<(HTMLDivElement | null)[]>([]);

  const {
    index,
    open,
    zoom,
    cleanImages,
    currentImage,
    hasMultipleImages,
    hasMoreThan5Images,
    totalImages,
    handleImageClick,
    handleImageError,
    handleModalNavigation,
    goTo,
    closeModal,
    toggleZoom,
  } = useAccommodationImageGallery({ images });

  useEffect(() => {
    if (scrollContainerRef.current && imageRefsRef.current[index]) {
      const targetImage = imageRefsRef.current[index];
      if (targetImage) {
        targetImage.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [index]);

  // Función auxiliar para renderizar una imagen
  const renderImage = (imageIndex: number, className: string, showMoreIndicator = false) => (
    <div 
      className={`${className} rounded-[10px] relative group cursor-pointer overflow-hidden`}
      onClick={() => handleImageClick(imageIndex)}
    >
      <img
        src={cleanImages[imageIndex]}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        onError={handleImageError}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      {/* Mostrar "+más" si hay más imágenes */}
      {showMoreIndicator && hasMoreThan5Images && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-[10px]">
          <span className="text-white text-2xl font-semibold">+{totalImages - 5} más</span>
        </div>
      )}
    </div>
  );

  return (
    <div className={`w-full ${className}`}>
      {/* Grid principal - Desktop */}
      <div className="hidden lg:block max-w-full overflow-hidden">
        {/* Layout para 1 imagen */}
        {totalImages === 1 && (
          <div className="w-full h-[400px]">
            {renderImage(0, "w-full h-full")}
          </div>
        )}
        
        {/* Layout para 2 imágenes */}
        {totalImages === 2 && (
          <div className="flex gap-2.5 h-[400px]">
            {renderImage(0, "flex-1 h-full")}
            {renderImage(1, "flex-1 h-full")}
          </div>
        )}
        
        {/* Layout para 3 imágenes */}
        {totalImages === 3 && (
          <div className="flex gap-2.5 h-[400px]">
            {renderImage(0, "flex-1 h-full")}
            <div className="flex-1 flex flex-col gap-2.5">
              {renderImage(1, "h-[192.5px]")}
              {renderImage(2, "h-[192.5px]")}
            </div>
          </div>
        )}
        
        {/* Layout para 4 imágenes */}
        {totalImages === 4 && (
          <div className="grid grid-cols-2 gap-2.5 h-[400px]">
            {renderImage(0, "h-full")}
            {renderImage(1, "h-full")}
            {renderImage(2, "h-full")}
            {renderImage(3, "h-full")}
          </div>
        )}
        
        {/* Layout para 5+ imágenes - diseño original */}
        {totalImages >= 5 && (
          <div className="flex justify-start items-end gap-2.5 max-w-full overflow-hidden">
            {/* Columna izquierda - 2 imágenes apiladas */}
            <div className="w-full max-w-[685px] h-[545px] flex flex-col justify-start items-start gap-2.5">
              {renderImage(0, "self-stretch h-72")}
              {renderImage(1, "self-stretch h-60")}
            </div>
            
            {/* Columna derecha - 3 imágenes */}
            <div className="w-full max-w-[558px] flex flex-col justify-start items-start gap-2.5">
              {/* Fila superior - 2 imágenes lado a lado */}
              <div className="self-stretch flex justify-start items-center gap-2.5">
                {renderImage(2, "flex-1 h-60")}
                {renderImage(3, "flex-1 h-60")}
              </div>
              
              {/* Imagen 5 - Inferior derecha (ancha) */}
              {renderImage(4, "self-stretch h-72", true)}
            </div>
          </div>
        )}
      </div>

      {/* Grid móvil - más simple */}
      <div className="lg:hidden">
        {/* Imagen principal con scroll horizontal */}
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="aspect-[4/3] w-full overflow-x-auto rounded-xl bg-zinc-100 mb-3"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: 'smooth',
              scrollSnapType: 'x mandatory',
              display: 'flex',
            }}
          >
            {cleanImages.map((imgSrc, imgIndex) => (
              <div
                key={imgSrc + imgIndex}
                ref={(el) => { imageRefsRef.current[imgIndex] = el; }}
                className="w-full h-full flex-shrink-0"
                style={{
                  scrollSnapAlign: 'start',
                }}
              >
                <img
                  src={imgSrc}
                  alt={`${alt} ${imgIndex + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover cursor-pointer"
                  onClick={() => handleImageClick(imgIndex)}
                  onError={handleImageError}
                />
              </div>
            ))}
          </div>

          {/* Contador e indicadores */}
          {hasMultipleImages && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white z-10">
              {index + 1} / {totalImages}
            </div>
          )}
        </div>
        
        {/* Thumbnails móvil */}
        {hasMultipleImages && (
          <div 
            className="flex gap-2 pb-2 overflow-x-auto"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: 'smooth',
              scrollSnapType: 'x mandatory',
            }}
          >
            {cleanImages.map((src, i) => (
              <button
                key={src + i}
                onClick={() => goTo(i)}
                className={`h-16 w-20 overflow-hidden rounded-lg border-2 transition-all scroll-snap-align-start
                ${i === index ? "border-blue-500" : "border-zinc-200"}`}
                style={{
                  scrollSnapAlign: 'start',
                  flexShrink: 0,
                }}
              >
                <img 
                  src={src} 
                  alt={`${alt} miniatura ${i + 1}`} 
                  loading="lazy"
                  decoding="async"
                  className="block h-full w-full object-cover" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onError={handleImageError}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal / Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_30px_90px_rgba(0,0,0,0.45)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 text-white/90 sm:px-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">Galería del hospedaje</p>
                <p className="mt-1 text-sm text-white/85">{index + 1} de {totalImages}</p>
              </div>

              <button
                aria-label="Cerrar"
                onClick={closeModal}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            <div className="relative flex items-center justify-center bg-black/40 px-3 py-4 sm:px-6 sm:py-6">
            <img
              src={currentImage}
              alt={alt}
              loading="eager"
              decoding="async"
              className={`max-h-[78vh] w-auto max-w-full select-none rounded-[1.25rem] object-contain transition-all duration-500 ${zoom ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"}`}
              onClick={toggleZoom}
            />

            {/* Controles modal */}
            {hasMultipleImages && (
              <>
                <button
                  aria-label="Anterior"
                  onClick={() => handleModalNavigation('prev')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  aria-label="Siguiente"
                  onClick={() => handleModalNavigation('next')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/45 px-4 py-2 text-sm text-white backdrop-blur-md">
                  {index + 1} / {totalImages}
                </div>
              </>
            )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

