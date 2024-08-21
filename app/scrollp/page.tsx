"use client";

import React, { useRef } from 'react';
import StickyHeader from '@/components/scroll-sticky-header'; // ??????? ???? ???? ?? ???? ???? ???

const Page: React.FC = () => {
    const parentRef = useRef<HTMLDivElement>(null);
  
    const section1Ref = useRef<HTMLDivElement>(null);
    const section2Ref = useRef<HTMLDivElement>(null);
    const section3Ref = useRef<HTMLDivElement>(null);
  
    const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth' });
      }
    };
  
    return (
      <div className="min-h-screen">
        <div ref={parentRef} className="p-8">
          <StickyHeader >
            <nav className="flex space-x-4">
              <button onClick={() => scrollToSection(section1Ref)}>Section 1</button>
              <button onClick={() => scrollToSection(section2Ref)}>Section 2</button>
              <button onClick={() => scrollToSection(section3Ref)}>Section 3</button>
            </nav>
          </StickyHeader>
  
          <div ref={section1Ref} id="section-1" className="h-[500px] bg-gray-200">
            <h2>Section 1</h2>
            <p>Content of Section 1...</p>
          </div>
          <div ref={section2Ref} id="section-2" className="h-[500px] bg-gray-300">
            <h2>Section 2</h2>
            <p>Content of Section 2...</p>
          </div>
          <div ref={section3Ref} id="section-3" className="h-[500px] bg-gray-400">
            <h2>Section 3</h2>
            <p>Content of Section 3...</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Page;
  
