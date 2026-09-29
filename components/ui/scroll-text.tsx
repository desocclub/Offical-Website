'use client';

import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';
import type React from 'react';
import type { JSX } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const generateVariants = (direction: Direction): Variants => {
  const axis = direction === 'left' || direction === 'right' ? 'X' : 'Y';
  const value = direction === 'right' || direction === 'down' ? 24 : -24;

  return {
    hidden: {
      filter: 'blur(10px)',
      opacity: 0,
      x: axis === 'X' ? value : 0,
      y: axis === 'Y' ? value : 0,
    },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };
};

const defaultViewport = { amount: 0.2, once: true };

export interface ScrollTextProps {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  viewport?: {
    amount?: number;
    margin?: string;
    once?: boolean;
  };
  variants?: Variants;
  direction?: Direction;
  letterAnime?: boolean;
  lineAnime?: boolean;
}

export default function ScrollText({
  as = 'h2',
  text,
  className = '',
  viewport = defaultViewport,
  variants,
  direction = 'down',
  letterAnime = false,
  lineAnime = false,
}: ScrollTextProps) {
  const baseVariants = variants || generateVariants(direction);

  const MotionComponent = motion[as as keyof typeof motion] as React.ComponentType<
    HTMLMotionProps<any>
  >;

  return (
    <MotionComponent
      whileInView="visible"
      initial="hidden"
      variants={containerVariants}
      viewport={viewport}
      className={`inline-block ${className}`}
    >
      {lineAnime ? (
        <motion.span className="inline-block" variants={baseVariants}>
          {text}
        </motion.span>
      ) : (
        <>
          {text.split(' ').map((word: string, index: number) => (
            <motion.span
              key={`${word}-${index}`}
              className="inline-block me-[0.28em] last:me-0"
              variants={letterAnime ? {} : baseVariants}
            >
              {letterAnime ? (
                <>
                  {word.split('').map((letter: string, letterIndex: number) => (
                    <motion.span
                      key={letterIndex}
                      className="inline-block"
                      variants={baseVariants}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </>
              ) : (
                <>{word}</>
              )}
            </motion.span>
          ))}
        </>
      )}
    </MotionComponent>
  );
}
