"use client";
import {
  motion,
  MotionProps,
  MotionStyle,
  UseInViewOptions,
} from "motion/react";
import { Children, ReactNode, useEffect, useRef, useState } from "react";

interface AnimateProps extends MotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  hidden?: MotionStyle;
  visible?: MotionStyle;
  margin?: UseInViewOptions["margin"];
  once?: boolean;
}

export default function Animate({
  children,
  className,
  delay,
  duration,
  margin,
  hidden = {
    opacity: 0,
    y: 20,
  },
  visible = {
    opacity: 1,
    y: 0,
  },
  once = true,
  ...props
}: AnimateProps) {
  const childArray = Children.toArray(children);
  const childRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [inViewStates, setInViewStates] = useState<boolean[]>(
    new Array(childArray.length).fill(false),
  );

  useEffect(() => {
    childRefs.current.forEach((ref, i) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              console.log("set inview true");
              setInViewStates((prev) => {
                const newState = [...prev];
                newState[i] = true;
                return newState;
              });
            } else {
              if (!once) {
                console.log("set inview false");
                setInViewStates((prev) => {
                  const newState = [...prev];
                  newState[i] = false;
                  return newState;
                });
              }
            }
          },
          { rootMargin: margin ?? "0%", threshold: 0.2 },
        );
        observer.observe(ref);
        return () => observer.disconnect();
      }
    });
  }, [margin, once]);

  return (
    <div className={className}>
      {Children.toArray(children).map((child, i) => {
        const isInView = inViewStates[i];
        const initialStyles = isInView ? visible : hidden;
        return (
          <div
            ref={(el) => {
              childRefs.current[i] = el;
            }}
            key={i}
          >
            <motion.div
              style={{
                ...initialStyles,
                transition: `all ${duration ?? 1}s`,
                transitionDelay: `${i * 0.2 + (delay ?? 0)}s`,
              }}
              {...props}
            >
              {child}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
