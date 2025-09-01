import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Review } from "../sections/reviews/type";
import { getReviews } from "../api/getReview";

export function useReviewsCarousel(hospedajeId?: string | null, limit?: number) {
  const [currentIndex, setCurrentIndex] = useState(1); // Start at 1 to account for cloned item
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const query = useQuery<Review[]>({
    queryKey: ["reviews", hospedajeId, limit],
    queryFn: async () => {
      const all = await getReviews();
      const filtered = all.filter((r) =>
        hospedajeId === null ? r.hospedajeId == null
        : hospedajeId ? r.hospedajeId === hospedajeId
        : true
      );
      return typeof limit === "number" ? filtered.slice(0, limit) : filtered;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const originalItems = query.data ?? [];
  const loading = query.isLoading && !query.data;
  const count = originalItems.length;
  const canNav = count > 1;

  // Create array with cloned elements for infinite effect
  const items = canNav
    ? [originalItems[count - 1], ...originalItems, originalItems[0]]
    : originalItems;

  const moveToSlide = (index: number, smooth = true) => {
    if (!canNav) return;
    setIsTransitioning(smooth);
    setCurrentIndex(index);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    // If we're at the last clone, jump to first original item
    if (currentIndex >= count + 1) {
      moveToSlide(1, false);
    }
    // If we're at the first clone, jump to last original item
    else if (currentIndex === 0) {
      moveToSlide(count, false);
    }
  };

  const nextSlide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    moveToSlide(currentIndex + 1);
  };

  const prevSlide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    moveToSlide(currentIndex - 1);
  };

  // Touch handling
  const startX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 30 && canNav) { // Umbral reducido para mayor sensibilidad
      if (dx < 0) nextSlide();
      else prevSlide();
    }
    startX.current = null;
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return {
    items,
    loading,
    error: query.isError ? "No se pudo cargar el contenido" : null,
    refetch: query.refetch,
    currentIndex,
    isTransitioning,
    count: items.length,
    canNav,
    nextSlide,
    prevSlide,
    onTouchStart,
    onTouchEnd,
    handleTransitionEnd,
  };
}
