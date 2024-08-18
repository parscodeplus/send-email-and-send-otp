"use client"
import React, { useState } from 'react';
import TimeCountdown from './time-countdown'; // Adjust the import path as needed

const CustomTimerApp: React.FC = () => {
  const [active, setActive] = useState<boolean>(false);
  const [resetTrigger, setResetTrigger] = useState<number>(0);

  const handleStartPause = () => {
    setActive(!active);
  };

  const handleReset = () => {
    setActive(false);
    setResetTrigger((prev) => prev + 1); // Change resetTrigger to reset the timer
  };

  const handleComplete = () => {
    alert("Time's up!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="mb-4 text-3xl font-bold">Custom Timer</h1>
      <TimeCountdown
        hours={0} // 1 hour
        minutes={2} // 20 minutes
        seconds={36} // 36 seconds
        onComplete={handleComplete}
        active={active}
        resetTrigger={resetTrigger}
      />
      <div className="mt-4">
        <button
          onClick={handleStartPause}
          className="px-4 py-2 mx-2 text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          {active ? "Pause" : "Start"}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 mx-2 text-white bg-red-500 rounded hover:bg-red-700"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default CustomTimerApp;
