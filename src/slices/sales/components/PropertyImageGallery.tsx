import { usePropertyImageGallery } from "../hooks/usePropertyImageGallery";

type Props = {
  images: string[];
  alt?: string;
  className?: string;
};

export default function PropertyImageGallery({ images, alt = "Foto de la propiedad", className = "" }: Props) {
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
  } = usePropertyImageGallery({ images });

  // Función auxiliar para renderizar una imagen
  const renderImage = (imageIndex: number, className: string, showMoreIndicator = false) => (
    <div 
      className={`${className} rounded-[10px] relative group cursor-pointer overflow-hidden`}
      onClick={() => handleImageClick(imageIndex)}
    >
      <img
        src={cleanImages[imageIndex]}
        alt={alt}
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
        {/* Imagen principal */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-100 mb-3">
          <img
            src={currentImage}
            alt={alt}
            className="h-full w-full object-cover cursor-pointer"
            onClick={() => handleImageClick(index)}
            onError={handleImageError}
          />
          
          {/* Controles móvil */}
          {hasMultipleImages && (
            <>
              <button
                aria-label="Anterior"
                onClick={(e) => { e.stopPropagation(); handleModalNavigation('prev'); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                aria-label="Siguiente"
                onClick={(e) => { e.stopPropagation(); handleModalNavigation('next'); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
                {index + 1} / {totalImages}
              </div>
            </>
          )}
        </div>
        
        {/* Thumbnails móvil */}
        {hasMultipleImages && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {cleanImages.map((src, i) => (
              <button
                key={src + i}
                onClick={() => goTo(i)}
                className={`h-16 min-w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all
                ${i === index ? "border-blue-500" : "border-zinc-200"}`}
              >
                <img 
                  src={src} 
                  alt={`${alt} miniatura ${i + 1}`} 
                  className="h-full w-full object-cover" 
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeModal}
        >
          <div className="relative max-h-[90vh] max-w-[95vw]" onClick={(e) => e.stopPropagation()}>
            <img
              src={currentImage}
              alt={alt}
              className={`max-h-[90vh] max-w-[95vw] select-none transition-transform duration-200 ${zoom ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"}`}
              onClick={toggleZoom}
            />

            {/* Controles modal */}
            {hasMultipleImages && (
              <>
                <button
                  aria-label="Anterior"
                  onClick={() => handleModalNavigation('prev')}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white hover:bg-white/30 transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  aria-label="Siguiente"
                  onClick={() => handleModalNavigation('next')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white hover:bg-white/30 transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-white">
                  {index + 1} / {totalImages}
                </div>
              </>
            )}

            <button
              aria-label="Cerrar"
              onClick={closeModal}
              className="absolute -right-2 -top-2 rounded-full bg-white p-2 text-zinc-800 shadow hover:bg-gray-100 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}