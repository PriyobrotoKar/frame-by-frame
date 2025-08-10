'use client';

import { cn } from '@/lib/utils';
import {
  motion,
  MotionStyle,
  useScroll,
  UseScrollOptions,
  useSpring,
  useTransform,
} from 'motion/react';
import { useRef } from 'react';

export default function Paralax({
  className,
  inputRange,
  outputRangeX = [0, 0],
  outputRangeY = [0, 0],
  offset,
  children,
  axis = 'xy',
}: {
  className?: string;
  inputRange: number[];
  outputRangeX?: number[];
  outputRangeY?: number[];
  offset: UseScrollOptions['offset'];
  children: React.ReactNode;
  axis?: 'x' | 'y' | 'xy';
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const y = useSpring(useTransform(scrollYProgress, inputRange, outputRangeY), {
    stiffness: 100,
    damping: 20,
  });
  const x = useSpring(useTransform(scrollYProgress, inputRange, outputRangeX), {
    stiffness: 100,
    damping: 20,
  });

  const style: MotionStyle = {};

  if (axis === 'x') {
    style.x = x;
  } else if (axis === 'y') {
    style.y = y;
  } else if (axis === 'xy') {
    style.x = x;
    style.y = y;
  }

  return (
    <motion.div ref={ref} style={style} className={cn('', className)}>
      {children}
    </motion.div>
  );
}
