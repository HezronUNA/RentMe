import { motion } from 'framer-motion';
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

  return (
    <motion.div
      className="absolute flex items-center gap-3"
      style={{
        left: '50%',
        top: '50%',
      }}
      initial={{
        x: x,
        y: y,
        scale: 1,
      }}
      animate={{
        x: [x, x + (direction * 15), x], // Movimiento horizontal sutil
        y: [y, y - 20, y + 10, y], // Movimiento vertical como burbuja
        scale: [1, 1.05, 0.95, 1], // Respiración sutil
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.3, 0.7, 1], // Control de timing para movimiento más natural
      }}
    >
      {children}
    </motion.div>
  );
}