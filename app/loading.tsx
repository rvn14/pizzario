'use client';
import { Pizza } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const Loading = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Set a timer for 500ms
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 500);

    // Clean up the timer
    return () => clearTimeout(timer);
  }, []);

  // If not visible anymore, return null
  if (!isVisible) return null;

  return (
    <div className='w-full h-screen bg-primary flex flex-col items-center justify-center'>
      <div className="flex flex-col items-center justify-center mt-20">
            <div className="animate-spin rounded-full border-8 border-t-tomato border-b-gray-300 border-l-gray-300 border-r-tomato h-24 w-24 mb-6 shadow-lg bg-white/10 flex items-center justify-center">
              <span className="text-tomato text-5xl">
                <Pizza />
              </span>
            </div>
            
          </div>
    </div>
  );
};

export default Loading;