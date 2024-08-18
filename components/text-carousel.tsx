"use client";
import React, { useEffect, useState } from 'react';
import { Label } from './ui/label';
import { motion, AnimatePresence } from 'framer-motion';

interface TextCarouselProps {
  messages: string[];
  interval: number;
  active: boolean;
  resetTrigger: number;
  animationType: 'slide' | 'dust';
}

const TextCarousel: React.FC<TextCarouselProps> = ({ messages, interval, active, resetTrigger, animationType }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [resetTrigger]);

  useEffect(() => {
    if (active) {
      const timerId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
      }, interval * 1000);

      return () => clearInterval(timerId);
    }
  }, [active, interval, messages.length]);

  const animationVariants = {
    slide: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
    dust: {
      initial: { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
      animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
      exit: { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
    }
  };

  return (
    <div className="relative flex items-center justify-center align-middle">
      <Label className="text-2xl text-black">
        <AnimatePresence mode="wait">
          <motion.span
            className="inline-block"
            key={currentIndex}
            initial={animationVariants[animationType].initial}
            animate={animationVariants[animationType].animate}
            exit={animationVariants[animationType].exit}
            transition={{ duration: 0.5 }}
          >
            {messages[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </Label>
    </div>
  );
};

export default TextCarousel;
