import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Review } from "../sections/reviews/type";
import { getReviews } from "../api/getReview";

export function useReviewsCarousel(hospedajeId?: string | null, limit?: number) {
  const [idx, setIdx] = useState(0);
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
  const items = query.data ?? [];
  const loading = query.isLoading && !query.data;

  const count = items.length;
  const canNav = count > 1;

  // swipe
  const startX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => (startX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 40 && canNav) {
      if (dx < 0) setIdx((i) => (i + 1) % count);
      else setIdx((i) => (i - 1 + count) % count);
    }
    startX.current = null;
  };

  // teclado ← →
  // ...existing code...

  return {
    items,
    loading,
    error: query.isError ? "No se pudo cargar el contenido" : null,
    refetch: query.refetch,
    idx,
    setIdx,
    count,
    canNav,
    onTouchStart,
    onTouchEnd,
  };
}
