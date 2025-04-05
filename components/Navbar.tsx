"use client"
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";
import { Button } from "./ui/button";






const Navbar = () => {


  // Refs for navigation container
  const navContainerRef = useRef<HTMLDivElement>(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);



  useEffect(() => {
    if (currentScrollY === 0) {
      // Topmost position: show navbar without floating-nav
      setIsNavVisible(true);
      navContainerRef.current?.classList.remove("floating-nav-black");
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down: hide navbar and apply floating-nav
      setIsNavVisible(false);
      navContainerRef.current?.classList.add("floating-nav-black");
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up: show navbar with floating-nav
      setIsNavVisible(true);
      navContainerRef.current?.classList.add("floating-nav-black");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6 py-4 rounded-2xl">
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          {/* Logo and Product button */}
          <div className="flex flex-col items-center ml-5">
            <div className="font-ragas text-blue-50 font-black text-2xl pointer-events-none select-none">PIZZAR.3IO</div>
            <div className="font-chunk text-blue-50 text-xs pointer-events-none select-none -mt-2">EST. 1995</div>

          </div>

          {/* Navigation Links */}
          <div className="flex h-full items-center justify-between mr-5 space-x-5">
            <Link href="/" className="text-white font-poppin text-md nav-hover-btn">Home</Link>
            <Link href="/menu" className="text-white font-poppin text-md nav-hover-btn">Menu</Link>
            <Link href="/contact" className="text-white font-poppin text-md nav-hover-btn">Contact</Link>
            
            <Button asChild variant="outline" className="relative text-tomato bg-transparent border-2 border-tomato rounded-2xl hover:bg-tomato hover:text-primary">
              <Link href="/cart"><ShoppingCartIcon/>
              <div className="red-dot z-20 absolute top-0 -right-1 w-3 h-3 bg-red-500 rounded-full"></div></Link>
            </Button>
            <Button asChild className="bg-tomato hover:bg-tomato/80 text-primary font-poppins">
              <Link href="/login" className="">Signup</Link>
            </Button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
