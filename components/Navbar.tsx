"use client"
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ShoppingCartIcon, Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  // Refs for navigation container
  const navContainerRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const lastScrollYRef = useRef(0); // New ref to track last scroll position

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  // Remove the lastScrollY state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when navigating
  const handleNavigation = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (currentScrollY === 0) {
      // Topmost position: show navbar without floating-nav
      setIsNavVisible(true);
      navContainerRef.current?.classList.remove("floating-nav-black");
    } else if (currentScrollY > lastScrollYRef.current) {
      // Scrolling down: hide navbar and apply floating-nav
      setIsNavVisible(false);
      navContainerRef.current?.classList.add("floating-nav-black");
    } else if (currentScrollY < lastScrollYRef.current) {
      // Scrolling up: show navbar with floating-nav
      setIsNavVisible(true);
      navContainerRef.current?.classList.add("floating-nav-black");
    }

    // Update the ref instead of state
    lastScrollYRef.current = currentScrollY;
    // Remove lastScrollY from the dependency array
  }, [currentScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  // Animation for mobile menu
  useEffect(() => {
    if (mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, {
        translateY: isMobileMenuOpen ? 0 : '-100%',
        opacity: isMobileMenuOpen ? 1 : 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [isMobileMenuOpen]);

  return (
    <>
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

            {/* Hamburger menu button - visible on mobile */}
            <div className="md:hidden flex items-center gap-4">
            <Button asChild variant="outline" className="relative text-tomato bg-transparent border-2 border-tomato rounded-2xl hover:bg-tomato hover:text-primary">
              <Link href="/cart" onClick={handleNavigation}>
                <ShoppingCartIcon/>
                <div className="red-dot z-20 absolute top-0 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </Link>
            </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMobileMenu}
                className="text-black bg-white"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
              
            </div>

            {/* Navigation Links - visible on desktop */}
            <div className="hidden md:flex h-full items-center justify-between mr-5 space-x-5">
              <Link href="/" className="text-white font-poppin text-md nav-hover-btn">Home</Link>
              <Link href="/menu" className="text-white font-poppin text-md nav-hover-btn">Menu</Link>
              <Link href="/contact" className="text-white font-poppin text-md nav-hover-btn">Contact</Link>
              
              <Button asChild variant="outline" className="relative text-tomato bg-transparent border-2 border-tomato rounded-2xl hover:bg-tomato hover:text-primary">
                <Link href="/cart">
                  <ShoppingCartIcon/>
                  <div className="red-dot z-20 absolute top-0 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </Link>
              </Button>
              <Button asChild className="bg-tomato hover:bg-tomato/80 text-primary font-poppins">
                <Link href="/login">Signup</Link>
              </Button>
            </div>
          </nav>
        </header>
      </div>

      {/* Mobile Menu Panel */}
      <div 
        ref={mobileMenuRef} 
        className="fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center transform -translate-y-full opacity-0"
      >
        <div className="flex flex-col items-center space-y-6 p-8">
          <Link 
            href="/" 
            className="text-white font-poppin text-xl nav-hover-btn"
            onClick={handleNavigation}
          >
            Home
          </Link>
          <Link 
            href="/menu" 
            className="text-white font-poppin text-xl nav-hover-btn"
            onClick={handleNavigation}
          >
            Menu
          </Link>
          <Link 
            href="/contact" 
            className="text-white font-poppin text-xl nav-hover-btn"
            onClick={handleNavigation}
          >
            Contact
          </Link>
          
          <div className="flex gap-4">
            
            <Button asChild className="bg-tomato hover:bg-tomato/80 text-primary font-poppins">
              <Link href="/login" onClick={handleNavigation}>Signup</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
