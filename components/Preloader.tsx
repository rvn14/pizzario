'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleStartLoading = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 500); // 500ms duration as requested
    };

    handleStartLoading();
  }, [pathname, searchParams]); // Trigger effect when route changes

  if (!isLoading) return null;
  
  return (
    <div className="fixed inset-0 bg-primary z-50 flex items-center justify-center transition-opacity duration-500">
      <div className='text-white font-bold text-6xl'>Loading...</div>
    </div>
  );
}
