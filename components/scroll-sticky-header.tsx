"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface StickyHeaderProps {
  children: React.ReactNode;
}

const StickyHeader: React.FC<StickyHeaderProps> = ({ children }) => {
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.div
      className={`${
        isSticky ? 'sticky top-0 z-50 bg-white shadow-lg' : ''
      } w-full py-4 px-8`}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: isSticky ? 0 : -50, opacity: isSticky ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default StickyHeader;

