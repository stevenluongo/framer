import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useVelocity, useScroll, useSpring, useAnimationFrame } from 'framer-motion';
import { wrap } from '@motionone/utils';

interface ParallaxProps {
  children: string;
  baseVelocity: number;
}

const ParallaxText: React.FC<ParallaxProps> = ({ children, baseVelocity = 100 }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });
  const directionFactor = React.useRef<number>(1);

  // State for the number of text repetitions
  const [textRepetitions, setTextRepetitions] = useState(4);

  useEffect(() => {
    const calculateRepetitions = () => {
      // Replace with actual logic to calculate text width
      const viewportWidth = window.innerWidth;
      const textWidth = 200; // Placeholder for actual text width
      const repetitions = Math.ceil(viewportWidth / textWidth);
      setTextRepetitions(repetitions);
    };

    calculateRepetitions();
    window.addEventListener('resize', calculateRepetitions);

    return () => {
      window.removeEventListener('resize', calculateRepetitions);
    };
  }, []);

  // Adjust the x motion value wrapping based on textRepetitions
  const x = useTransform(baseX, (v) => `${wrap(-100 / textRepetitions, -100, v)}%`);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax">
      <motion.div className="scroller" style={{ x }}>
        {Array.from({ length: textRepetitions }, (_, i) => (
          <span key={i}>{children} </span>
        ))}
      </motion.div>
    </div>
  );
};

export default ParallaxText;
