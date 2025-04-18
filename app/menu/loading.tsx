'use client';
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
      <div className='text-white text-lg mb-4'>Loading</div>
      <div className='w-16 h-16 border-t-4 border-white border-solid rounded-full animate-spin'></div>
    </div>
  );
};

export default Loading;