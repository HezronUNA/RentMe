import { useEffect, useMemo, useState } from "react";

interface UsePropertyImageGalleryProps {
  images: string[];
  fallbackImage?: string;
}

export function usePropertyImageGallery({ 
  images, 
  fallbackImage = "https://placehold.co/1200x800" 
}: UsePropertyImageGalleryProps) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(false);

  // Limpiar y filtrar imágenes, agregar fallback si es necesario
  const cleanImages = useMemo(
    () => (images && images.length ? images.filter(Boolean) : [fallbackImage]),
    [images, fallbackImage]
  );

  // Funciones de navegación
  const prev = () => setIndex((i) => (i === 0 ? cleanImages.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === cleanImages.length - 1 ? 0 : i + 1));
  const goTo = (i: number) => setIndex(i);

  // Funciones del modal
  const openModal = (imageIndex?: number) => {
    if (imageIndex !== undefined) setIndex(imageIndex);
    setOpen(true);
    setZoom(false);
  };

  const closeModal = () => {
    setOpen(false);
    setZoom(false);
  };

  const toggleZoom = () => setZoom((z) => !z);

  // Manejo de teclado en modal
  useEffect(() => {
    if (!open) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          closeModal();
          break;
        case "ArrowRight":
          next();
          break;
        case "ArrowLeft":
          prev();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, cleanImages.length]);

  // Handlers para eventos
  const handleImageClick = (imageIndex: number) => {
    openModal(imageIndex);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = fallbackImage;
  };

  const handleModalNavigation = (direction: 'prev' | 'next') => {
    direction === 'prev' ? prev() : next();
  };

  // Estado y propiedades computadas
  const hasMultipleImages = cleanImages.length > 1;
  const hasMoreThan5Images = cleanImages.length > 5;
  const currentImage = cleanImages[index];
  const totalImages = cleanImages.length;

  return {
    // Estado
    index,
    open,
    zoom,
    cleanImages,
    currentImage,
    hasMultipleImages,
    hasMoreThan5Images,
    totalImages,

    // Acciones de navegación
    prev,
    next,
    goTo,

    // Acciones del modal
    openModal,
    closeModal,
    toggleZoom,

    // Handlers
    handleImageClick,
    handleImageError,
    handleModalNavigation,

    // Setters directos (por si se necesitan)
    setIndex,
    setOpen,
    setZoom,
  };
}