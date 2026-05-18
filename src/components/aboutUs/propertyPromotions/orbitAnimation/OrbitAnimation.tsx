import { useRef, useEffect, useState } from 'react';
import { OrbitItem } from './OrbitItem';
import type { ReactNode } from 'react';

interface OrbitItemConfig {
  id: string;
  radius: number;
  duration: number;
  delay: number;
  direction: number;
  initialAngle: number;
  content: ReactNode;
}

interface OrbitAnimationProps {
  items?: OrbitItemConfig[];
  centerContent?: ReactNode;
  className?: string;
  containerSize?: number;
}

function useInView(ref: React.RefObject<Element | null>, opts?: { margin?: string }) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: opts?.margin ?? "0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, opts?.margin]);

  return isInView;
}

export function OrbitAnimation({
  items = [],
  centerContent,
  className = "",
  containerSize = 400
}: OrbitAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{ minHeight: containerSize }}
    >
      <div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-[1.6s]"
        style={{
          opacity: isInView ? 1 : 0,
          scale: isInView ? '1' : '0.8',
        }}
      >
        {centerContent}
      </div>

      {items.map((item, index) => (
        <OrbitItem
          key={item.id || index}
          radius={item.radius}
          duration={item.duration}
          delay={item.delay}
          direction={item.direction}
          initialAngle={item.initialAngle}
        >
          {item.content}
        </OrbitItem>
      ))}
    </div>
  );
}

export type { OrbitItemConfig, OrbitAnimationProps };
