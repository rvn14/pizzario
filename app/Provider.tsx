
"use client";
import { ReactLenis } from 'lenis/react';
import Navbar from '@/components/Navbar';

export default function Provider({ children }: { children: React.ReactNode }) {
  // If you need to conditionally show Navbar, restore pathname logic here
  return (
    <ReactLenis root>
      <div className="overflow-x-hidden w-full">
        <Navbar />
        {children}
      </div>
    </ReactLenis>
  );
}
