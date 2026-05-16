import type { ReactNode } from 'react';

interface OrbitItemProps {
  children: ReactNode;
  radius?: number;
  duration?: number;
  delay?: number;
  direction?: number;
  initialAngle?: number;
}

export function OrbitItem({
  children,
  radius = 200,
  duration = 10,
  delay = 0,
  direction = 1,
  initialAngle = 0
}: OrbitItemProps) {
  const x = Math.cos(initialAngle * Math.PI / 180) * radius;
  const y = Math.sin(initialAngle * Math.PI / 180) * radius;
  const dx = direction * 15;

  return (
    <div
      className="absolute flex items-center gap-3 orbit-item"
      style={{
        left: '50%',
        top: '50%',
        '--ox': `${x}px`,
        '--oy': `${y}px`,
        '--dx': `${dx}px`,
        '--duration': `${duration}s`,
        '--delay': `${delay}s`,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
