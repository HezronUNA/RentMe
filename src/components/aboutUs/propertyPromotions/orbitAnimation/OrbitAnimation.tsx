import { useRef, useEffect } from 'react';
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

export function OrbitAnimation({
  items = [],
  centerContent,
  className = "",
  containerSize = 400
}: OrbitAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const center = el.querySelector<HTMLElement>('[data-orbit-center]')
    if (!center) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (center.classList.contains('is-visible')) return
          center.classList.add('is-visible')
          observer.unobserve(el)
        }
      },
      { rootMargin: "-100px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{ minHeight: containerSize }}
    >
      <div
        data-orbit-center
        className="orbit-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
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
