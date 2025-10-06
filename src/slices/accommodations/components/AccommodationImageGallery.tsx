import { useState, useCallback } from "react";

type Props = {
  images: string[];
  alt?: string;
  className?: string;
};

export default function AccommodationImageGallery({ 
  images, 
  alt = "Foto del hospedaje", 
  className = "" 
}: Props) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(false);

  // Limpiar imágenes vacías o inválidas
  const cleanImages = images.filter(img => img && img.trim() !== '');
  const totalImages = cleanImages.length;
  const hasMultipleImages = totalImages > 1;
  const hasMoreThan5Images = totalImages > 5;
  const currentImage = cleanImages[index];

  const handleImageClick = useCallback((imageIndex: number) => {
    setIndex(imageIndex);
    setOpen(true);
    setZoom(false);
  }, []);

  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://placehold.co/600x400/e2e8f0/64748b?text=Imagen+no+disponible';
  }, []);

  const goTo = useCallback((newIndex: number) => {
    setIndex(Math.max(0, Math.min(newIndex, totalImages - 1)));
  }, [totalImages]);

  const closeModal = useCallback(() => {
    setOpen(false);
    setZoom(false);
  }, []);

  const toggleZoom = useCallback(() => {
    setZoom(prev => !prev);
  }, []);

  const handleModalNavigation = useCallback((direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      goTo(index - 1);
    } else {
      goTo(index + 1);
    }
  }, [index, goTo]);

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

  if (totalImages === 0) {
    return (
      <div className={`w-full ${className}`}>
        <div className="w-full h-[400px] bg-gray-200 rounded-[10px] flex items-center justify-center">
          <span className="text-gray-500">No hay imágenes disponibles</span>
        </div>
      </div>
    );
  }

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
          <div className="flex gap-2.5 h-[400px]">
            {renderImage(0, "flex-1 h-full")}
            <div className="flex-1 flex flex-col gap-2.5">
              {renderImage(1, "h-[125px]")}
              {renderImage(2, "h-[125px]")}
              {renderImage(3, "h-[125px]")}
            </div>
          </div>
        )}
        
        {/* Layout para 5 o más imágenes */}
        {totalImages >= 5 && (
          <div className="flex gap-2.5 h-[400px]">
            {renderImage(0, "flex-1 h-full")}
            <div className="flex-1 flex flex-col gap-2.5">
              {renderImage(1, "h-[192.5px]")}
              <div className="flex gap-2.5 h-[192.5px]">
                {renderImage(2, "flex-1")}
                {renderImage(3, "flex-1")}
                {renderImage(4, "flex-1", true)}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Carrusel para móvil y tablet */}
      <div className="lg:hidden">
        <div className="relative h-[300px] rounded-[10px] overflow-hidden">
          <img
            src={currentImage}
            alt={alt}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
          
          {/* Navegación */}
          {hasMultipleImages && (
            <>
              <button
                onClick={() => handleModalNavigation('prev')}
                disabled={index === 0}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full disabled:opacity-50"
              >
                ←
              </button>
              <button
                onClick={() => handleModalNavigation('next')}
                disabled={index === totalImages - 1}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full disabled:opacity-50"
              >
                →
              </button>
              
              {/* Indicador de posición */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {index + 1} / {totalImages}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal de imagen ampliada */}
      {open && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-full max-h-full">
            <img
              src={currentImage}
              alt={alt}
              className={`max-w-full max-h-full object-contain transition-transform duration-300 ${
                zoom ? 'scale-150' : 'scale-100'
              }`}
              onError={handleImageError}
            />
            
            {/* Controles del modal */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70"
            >
              ✕
            </button>
            
            <button
              onClick={toggleZoom}
              className="absolute bottom-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70"
            >
              {zoom ? '🔍-' : '🔍+'}
            </button>
            
            {/* Navegación en modal */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={() => handleModalNavigation('prev')}
                  disabled={index === 0}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 p-3 rounded-full disabled:opacity-50 hover:bg-black/70"
                >
                  ←
                </button>
                <button
                  onClick={() => handleModalNavigation('next')}
                  disabled={index === totalImages - 1}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 p-3 rounded-full disabled:opacity-50 hover:bg-black/70"
                >
                  →
                </button>
                
                {/* Indicador de posición en modal */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full">
                  {index + 1} / {totalImages}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}