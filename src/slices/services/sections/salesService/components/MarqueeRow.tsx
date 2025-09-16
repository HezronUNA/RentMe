// src/slices/services/sections/salesService/components/MarqueeRow.tsx
import { useMemo } from "react";
import { motion } from "framer-motion";
import type { ServiceItem } from "../../../hooks/useSalesServices";
import { ServiceCard } from "./ServiceCard";

interface MarqueeRowProps {
  items: ServiceItem[];
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

  const cardWidth = 256; // ancho w-64 = 256px
  const visibleCards = 3;
  const containerWidth = (cardWidth + gap) * visibleCards - gap;
  const totalItemWidth = cardWidth + gap;

  const moveDistance = totalItemWidth * items.length;

  const from = direction === "left" ? 0 : -moveDistance;
  const to = direction === "left" ? -moveDistance : 0;

  return (
    <div
      className="relative overflow-hidden mx-auto h-full flex items-center justify-center"
      style={{ width: containerWidth }}
    >
      <motion.div
        className="flex items-center"
        style={{ gap }}
        animate={{ x: [from, to] }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {loopItems.map((it, idx) => (
          <ServiceCard key={`${it.id}-${idx}`} item={it} />
        ))}
      </motion.div>
    </div>
  );
}