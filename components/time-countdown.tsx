"use client"
import React, { useEffect, useState } from 'react';
import { Label } from './ui/label';
import { motion, AnimatePresence } from 'framer-motion';

interface TimeCountdownProps {
  hours: number; // Hours
  minutes: number; // Minutes
  seconds: number; // Seconds
  onComplete: () => void; // Callback when countdown completes
  active: boolean; // Flag to start/pause countdown
  resetTrigger: number; // A value that triggers reset when changed
}

const TimeCountdown: React.FC<TimeCountdownProps> = ({ hours, minutes, seconds, onComplete, active, resetTrigger }) => {
  const [timeLeft, setTimeLeft] = useState<number>((hours * 3600) + (minutes * 60) + seconds);

  useEffect(() => {
    setTimeLeft((hours * 3600) + (minutes * 60) + seconds); // Reset time when any input value or resetTrigger changes
  }, [hours, minutes, seconds, resetTrigger]);

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

  const formattedTime = (): { hours: string, minutes: string, seconds: string } => {
    const hrs = Math.floor(timeLeft / 3600);
    const mins = Math.floor((timeLeft % 3600) / 60);
    const secs = timeLeft % 60;
    
    return {
      hours: hrs.toString().padStart(2, '0'),
      minutes: mins.toString().padStart(2, '0'),
      seconds: secs.toString().padStart(2, '0'),
    };
  };

  const { hours: hrs, minutes: mins, seconds: secs } = formattedTime();

  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="relative flex items-center justify-center h-16 w-16 overflow-hidden rounded-lg bg-red-500">
        <Label className="text-2xl text-white">
          <AnimatePresence mode="wait">
            <motion.span
              className="inline-block"
              key={hrs} // Adding a unique key to trigger animation on change
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              {hrs}
            </motion.span>
          </AnimatePresence>
        </Label>
      </div>
      <span className="text-2xl font-bold text-black">:</span>
      <div className="relative flex items-center justify-center h-16 w-16 overflow-hidden rounded-lg bg-red-500">
        <Label className="text-2xl text-white">
          <AnimatePresence mode="wait">
            <motion.span
              className="inline-block"
              key={mins} // Adding a unique key to trigger animation on change
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              {mins}
            </motion.span>
          </AnimatePresence>
        </Label>
      </div>
      <span className="text-2xl font-bold text-black">:</span>
      <div className="relative flex items-center justify-center h-16 w-16 overflow-hidden rounded-lg bg-red-500">
        <Label className="text-2xl text-white">
          <AnimatePresence mode="wait">
            <motion.span
              className="inline-block"
              key={secs} // Adding a unique key to trigger animation on change
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              {secs}
            </motion.span>
          </AnimatePresence>
        </Label>
      </div>
    </div>
  );
};

export default TimeCountdown;
