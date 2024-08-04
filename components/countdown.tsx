"use client"
import React, { useEffect, useState } from 'react';
import { Label } from './ui/label';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import { BackgroundGradient } from "@/components/magicui/background-gradient";

interface CountdownProps {
  duration: number; // Duration in seconds
  onComplete: () => void; // Callback when countdown completes
  active: boolean; // Flag to start/pause countdown
  resetTrigger: number; // A value that triggers reset when changed
}

const Countdown: React.FC<CountdownProps> = ({ duration, onComplete, active, resetTrigger }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration); // Reset time when duration or resetTrigger changes
  }, [duration, resetTrigger]);

  useEffect(() => {
    if (active && timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else if (timeLeft === 0) {
      onComplete();
    }
  }, [active, timeLeft, onComplete]);

  const formattedTime = () => {
    const seconds = timeLeft % 60;
    return `${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <BackgroundGradient className='flex items-center justify-center rounded-full m-4 w-3 h-3'>
      <Label className="text-2xl text-white rounded-full">
        <motion.span
          className="inline-block"
          key={timeLeft} // Adding a unique key to trigger animation on change
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          {formattedTime()}
        </motion.span>
      </Label>
    </BackgroundGradient>
  );
};

export default Countdown;
