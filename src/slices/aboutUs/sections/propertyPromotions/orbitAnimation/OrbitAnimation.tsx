import { motion } from 'framer-motion';
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
  return (
    <div className={`relative ${className}`} style={{ minHeight: containerSize }}>
      {/* Contenido Central */}
      <motion.div 
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6 }}
      >
        {centerContent}
      </motion.div>

      {/* Items en Órbita */}
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