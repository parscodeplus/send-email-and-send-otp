import React, { useState } from 'react';
import TextCarousel from './text-carousel';

const MessageShow: React.FC = () => {
  const messages = ['Hello World!', 'Welcome to the App', 'Enjoy your stay', 'Have a great day!'];
  const [active, setActive] = useState<boolean>(true);
  const [resetTrigger, setResetTrigger] = useState<number>(0);
  const [animationType, setAnimationType] = useState<'slide' | 'dust'>('slide');

  const toggleCarousel = () => {
    setActive((prevActive) => !prevActive);
  };

  const resetCarousel = () => {
    setResetTrigger((prevTrigger) => prevTrigger + 1);
  };

  const changeAnimation = () => {
    setAnimationType((prevType) => (prevType === 'slide' ? 'dust' : 'slide'));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <TextCarousel
        messages={messages}
        interval={4}
        active={active}
        resetTrigger={resetTrigger}
        animationType={animationType}
      />
      <div className="mt-4">
        <button onClick={toggleCarousel} className="mr-4 px-4 py-2 bg-blue-500 text-white rounded">
          {active ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetCarousel} className="mr-4 px-4 py-2 bg-red-500 text-white rounded">
          Reset
        </button>
        <button onClick={changeAnimation} className="px-4 py-2 bg-green-500 text-white rounded">
          Change Animation ({animationType})
        </button>
      </div>
    </div>
  );
};

export default MessageShow;
