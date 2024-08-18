"use client"
import React, { useEffect, useState } from 'react';
import { Label } from './ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import { BackgroundGradient } from '@/components/magicui/background-gradient';
import { cn } from "@/lib/utils";
import DotPattern from "@/components/magicui/dot-pattern";

interface CountdownProps {
  duration: number; // Duration in seconds
  onComplete: () => void; // Callback when countdown completes
  active: boolean; // Flag to start/pause countdown
  resetTrigger: number; // A value that triggers reset when changed
}

const Countdown: React.FC<CountdownProps> = ({ duration, onComplete, active, resetTrigger }) => {
  const [timeLeft, setTimeLeft] = useState<number>(duration);

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

  const formattedTime = (): string => {
    const seconds = timeLeft % 60;
    return `${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative flex items-center justify-center h-8 w-8 overflow-hidden rounded-full align-middle">
      <Label className="text-2xl text-black rounded-full">
        <AnimatePresence mode="wait">
          <motion.span
            className="inline-block"
            key={timeLeft} // Adding a/ unique key to trigger animation on change
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            {formattedTime()}
          </motion.span>
        </AnimatePresence>
      </Label>
      {/* <DotPattern
        className={cn(
          "[mask-image:radial-gradient(40px_circle_at_center,white,transparent)]",
        )}
      /> */}
    </div>
  );
};

export default Countdown;
