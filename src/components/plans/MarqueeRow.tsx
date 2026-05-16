import { useMemo } from "react";
import { ServiceCard } from "./ServiceCard";

interface MarqueeRowProps {
  items: any[];
  direction?: "left" | "right";
  speed?: number;
  gap?: number;
}

export function MarqueeRow({
  items,
  direction = "left",
  speed = 15,
  gap = 28,
}: MarqueeRowProps) {
  const loopItems = useMemo(() => [...items, ...items, ...items, ...items], [items]);

  const cardWidth = 256;
  const visibleCards = 3;
  const containerWidth = (cardWidth + gap) * visibleCards - gap;
  const totalItemWidth = cardWidth + gap;
  const moveDistance = totalItemWidth * items.length;

  return (
    <div
      className="relative overflow-hidden mx-auto h-full flex items-center justify-center"
      style={{ width: containerWidth }}
    >
      <style>{`
        @keyframes marquee-${direction} {
          from { transform: translateX(${direction === "left" ? 0 : -moveDistance}px); }
          to { transform: translateX(${direction === "left" ? -moveDistance : 0}px); }
        }
      `}</style>
      <div
        className="flex items-center"
        style={{
          gap,
          animation: `marquee-${direction} ${speed}s linear infinite`,
        }}
      >
        {loopItems.map((it, idx) => (
          <ServiceCard key={`${it.id}-${idx}`} item={it} />
        ))}
      </div>
    </div>
  );
}
