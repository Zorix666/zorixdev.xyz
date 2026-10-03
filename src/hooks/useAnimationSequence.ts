import { useCallback, useRef } from "react";
import type { Variants } from "framer-motion";

/**
 * Non-linear stagger delays using Fibonacci-like sequence.
 * Produces organic, non-uniform staggering — never feels mechanical.
 */
export function fibonacciStagger(index: number, base: number = 40): number {
  const fib = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610];
  return (fib[Math.min(index, fib.length - 1)] ?? index) * base;
}

/**
 * Variant stagger with non-linear exponential spacing.
 */
export function expStagger(index: number, base: number = 30): number {
  return base * Math.pow(1.4, index);
}

/* ── Hub Node Variants ── */
export const hubVariants: Variants = {
  hidden: {
    scale: 0.3,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
      mass: 0.8,
    },
  },
};

/* ── Transit Line Draw Variants ── */
export const lineVariants: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 0.35,
    transition: {
      pathLength: {
        type: "spring",
        stiffness: 40,
        damping: 20,
        delay: 0.3 + i * 0.08,
        duration: 1.5,
      },
      opacity: {
        duration: 0.4,
        delay: 0.3 + i * 0.08,
      },
    },
  }),
};

/* ── Station Card Variants — asymmetric entrances ── */
export const cardVariants: Variants = {
  hidden: (i: number) => {
    // Alternate entrance directions based on index
    const dirs = [
      { x: -80, y: -40 },   // top-left
      { x: 60, y: -30 },    // top-right
      { x: -50, y: 50 },    // bottom-left
      { x: 70, y: 40 },     // bottom-right
      { x: -30, y: -60 },   // far top
      { x: 40, y: 60 },     // far bottom
    ];
    const d = dirs[i % dirs.length];
    return {
      x: d.x,
      y: d.y,
      opacity: 0,
      scale: 0.92,
    };
  },
  visible: (i: number) => ({
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 18,
      mass: 0.6,
      delay: 0.55 + expStagger(i, 45),
    },
  }),
};

/* ── Floating Animation ── */
export const floatingVariants: Variants = {
  animate: (i: number) => ({
    y: [0, -6, 0, 4, 0],
    transition: {
      duration: 5 + (i % 3) * 2,
      repeat: Infinity,
      ease: [0.43, 0.13, 0.23, 0.96], // custom cubic-bezier
      delay: (i * 1.7) % 4,
    },
  }),
};

/* ── Hub Pulse ── */
export const hubPulseVariants: Variants = {
  animate: {
    scale: [1, 1.04, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: [0.45, 0, 0.55, 1],
    },
  },
};

/* ── Fade up for labels / metadata ── */
export const fadeUpVariants: Variants = {
  hidden: {
    y: 12,
    opacity: 0,
  },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0, 0, 1],
      delay: 0.8 + i * 0.06,
    },
  }),
};

/**
 * Hook to compute non-linear animation delays for orchestrated sequences.
 */
export function useAnimationSequence(itemCount: number) {
  const delays = useRef<number[]>(
    Array.from({ length: itemCount }, (_, i) => expStagger(i, 40))
  );

  const getDelay = useCallback(
    (index: number) => delays.current[index] ?? index * 40,
    []
  );

  return { getDelay, delays: delays.current };
}
