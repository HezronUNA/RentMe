import { useEffect, useRef, useState } from "react";
import type { Review } from "../sections/reviews/type";
import { getReviews } from "../api/getReview";

export function useReviewsCarousel(hospedajeId?: string | null, limit?: number) {
  const [items, setItems] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      const all = await getReviews();
      const filtered = all.filter((r) =>
        hospedajeId === null ? r.hospedajeId == null
        : hospedajeId ? r.hospedajeId === hospedajeId
        : true
      );
      const trimmed = typeof limit === "number" ? filtered.slice(0, limit) : filtered;
      if (alive) {
        setItems(trimmed);
        setIdx(0);
      }
      setLoading(false);
    })();
    return () => { alive = false; };
  }, [hospedajeId, limit]);

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
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!canNav) return;
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % count);
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [canNav, count]);

  return {
    items,
    loading,
    idx,
    setIdx,
    count,
    canNav,
    onTouchStart,
    onTouchEnd,
  };
}
