import type { Easing } from 'framer-motion';

const bezier: Easing = [0.42, 0, 0.58, 1];

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    duration: 1,
    transition: {
      staggerChildren: 0.3, // delay between each item
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 5 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1, // Increased duration for each item's animation
    },
  },
};

export const imageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2, // Duration for the fade-in effect
      ease: bezier, // Custom ease (Cubic Bezier)
      delay: 0.2,
    },
  },
};
