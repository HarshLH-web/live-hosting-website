'use client';
import { useScroll, useSpring, motion } from 'framer-motion';

const ScrollAnimation = () => {
  // useScroll hook provides scrollYProgress to track the scroll position
  const { scrollYProgress } = useScroll();

  // Use useSpring to animate the scrollYProgress value
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100, // Adjust stiffness for animation speed
    damping: 25, // Adjust damping for smoothness
  });

  return (
    <motion.div
      style={{
        scaleX, // Apply the scaleX value based on the scroll progress
        transformOrigin: '0%', // Ensure the scale happens from the left side
        width: '100%', // Full width element
        height: '2px', // Adjust height as needed
        background: '#DE0402', // Adjust color as needed
      }}
    />
  );
};

export default ScrollAnimation;