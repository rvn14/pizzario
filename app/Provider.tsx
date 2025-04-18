"use client";
import { ReactLenis } from 'lenis/react'
import { usePathname } from "next/navigation";
import Navbar from '@/components/Navbar';


export default function Provider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();


  const hideNavFootPaths = ["/login", "/signup"]; 
  
  // Compute whether to show the common components.
  const show = !hideNavFootPaths.includes(pathname);
  // Decide if the Footer should be rendered.


  return (
    <ReactLenis root> 
    <div className="overflow-x-hidden w-full">
      {show && <Navbar />}
      {children}
    </div>
    </ReactLenis>
  );
}
