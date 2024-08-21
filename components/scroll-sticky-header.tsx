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

// "use client";

// import React, { useState, useEffect, useRef } from 'react';
// import { motion } from 'framer-motion';
// import { cn } from '@/lib/utils'; // ???? ???? ???? utils
// import { cva, type VariantProps } from 'class-variance-authority';

// interface StickyHeaderProps extends VariantProps<typeof stickyHeaderVariants> {
//   children: React.ReactNode;
//   sectionRef: React.RefObject<HTMLDivElement>; // ????? ?? ????
//   className?: string; // ????? ???? ???????? ?? className
// }

// // ????? ?????????? ????? ?? cva ???? ???? ?????? ? ?????????
// const stickyHeaderVariants = cva(
//   'w-full py-4 px-8 transition-all duration-300', // ?????????? ???????
//   {
//     variants: {
//       sticky: {
//         true: 'sticky top-0 z-50 bg-white shadow-lg', // ?????? ???? ??????
//         false: '', // ?????? ???? ?????????
//       },
//     },
//     defaultVariants: {
//       sticky: false, // ???? ??????? ?????????
//     },
//   }
// );

// const StickyHeader: React.FC<StickyHeaderProps> = ({ children, sectionRef, className, sticky, ...props }) => {
//   const [isSticky, setIsSticky] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         const entry = entries[0];
//         setIsSticky(!entry.isIntersecting); // ???? ???? ??? ?? ??? ???? ???? ???? ????? ?????? ??????
//       },
//       { threshold: 0 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current); // ????? ?? ???? ???
//     }

//     return () => {
//       if (sectionRef.current) {
//         observer.unobserve(sectionRef.current); // ????? ???? ?????
//       }
//     };
//   }, [sectionRef]);

//   return (
//     <motion.div
//       className={cn(stickyHeaderVariants({ sticky: isSticky }), className)} // ????? ???????? ????
//       initial={{ y: -50, opacity: 0 }}
//       animate={{ y: isSticky ? 0 : -50, opacity: isSticky ? 1 : 0 }} // ??????? ????? ???? ??????
//       transition={{ duration: 0.3 }}
//       {...props}
//     >
//       {children}
//     </motion.div>
//   );
// };

// export default StickyHeader;
