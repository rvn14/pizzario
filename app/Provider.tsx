"use client";
import { ReactLenis } from 'lenis/react';
import Navbar from '@/components/Navbar';
import { usePathname } from 'next/navigation';
import Footer from '@/components/Footer';

export default function Provider({ children }: { children: React.ReactNode }) {
  // If you need to conditionally show Navbar, restore pathname logic here
  const pathname = usePathname();
  const showNavbar = pathname !== '/login' && pathname !== '/signup';


  return (
    <ReactLenis root>
      <div className="overflow-x-hidden w-full">
        {showNavbar && <Navbar />}
        {children}
        <Footer />
      </div>
    </ReactLenis>
  );
}

