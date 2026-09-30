'use client';

import React, { useRef } from 'react';
import { motion, useInView, type Variants, type HTMLMotionProps, type UseInViewOptions } from 'framer-motion';

type TimelineContentProps<T extends keyof HTMLElementTagNameMap> = {
  children?: React.ReactNode;
  animationNum?: number;
  className?: string;
  timelineRef?: React.RefObject<HTMLElement | null>;
  as?: T;
  customVariants?: Variants;
  once?: boolean;
  margin?: UseInViewOptions['margin'];
  amount?: UseInViewOptions['amount'];
} & HTMLMotionProps<T>;

export const TimelineAnimation = <T extends keyof HTMLElementTagNameMap = 'div'>({
  children,
  animationNum = 0,
  timelineRef,
  className,
  as,
  customVariants,
  once = true,
  margin = '0px 0px -15% 0px',
  amount = 0.15,
  ...props
}: TimelineContentProps<T>) => {
  const localRef = useRef<HTMLElement | null>(null);
  const targetRef = timelineRef || localRef;

  const defaultSequenceVariants: Variants = {
    visible: (i: number) => ({
      filter: 'blur(0px)',
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        delay: (i || 0) * 0.1,
        duration: 0.55,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
    hidden: {
      filter: 'blur(16px)',
      y: 32,
      opacity: 0,
      scale: 0.95,
    },
  };

  const sequenceVariants = customVariants || defaultSequenceVariants;

  const isInView = useInView(targetRef, {
    once,
    margin,
    amount,
  });

  const MotionComponent = (motion[as || 'div'] || motion.div) as React.ComponentType<any>;

  return (
    <MotionComponent
      ref={localRef}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={animationNum}
      variants={sequenceVariants}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

export default TimelineAnimation;
