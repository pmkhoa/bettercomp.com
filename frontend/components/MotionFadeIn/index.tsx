'use client';
import { useRef } from 'react';
import { imageVariants } from '@/utils/motion-transition';
import { motion, useInView } from 'framer-motion';

const MotionFadeInOnScroll = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      variants={imageVariants}
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={`h-full ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default MotionFadeInOnScroll;
