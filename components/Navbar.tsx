/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, ShoppingCartIcon, X } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { CartSheet } from "./CartTable";
import { TransitionLink } from "./utils/TransitionLink";

const Navbar = () => {
  // Refs for navigation container
  const navContainerRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const lastScrollYRef = useRef(0); // New ref to track last scroll position
  const isNavVisibleRef = useRef(true); // New ref to track visibility without state updates

  const { y: currentScrollY } = useWindowScroll();
  const [isLogged, setIsLogged] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState({})

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when navigating
  const handleNavigation = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    // Only update state if the visibility actually needs to change
    let shouldBeVisible = isNavVisibleRef.current;
    
    if (currentScrollY === 0) {
      // Topmost position: show navbar without floating-nav
      shouldBeVisible = true;
      navContainerRef.current?.classList.remove("floating-nav-black");
    } else if (currentScrollY > lastScrollYRef.current) {
      // Scrolling down: hide navbar and apply floating-nav
      shouldBeVisible = false;
      navContainerRef.current?.classList.add("floating-nav-black");
    } else if (currentScrollY < lastScrollYRef.current) {
      // Scrolling up: show navbar with floating-nav
      shouldBeVisible = true;
      navContainerRef.current?.classList.add("floating-nav-black");
    }

    // Only set state if visibility actually changed
    if (shouldBeVisible !== isNavVisibleRef.current) {
      isNavVisibleRef.current = shouldBeVisible;
      setIsNavVisible(shouldBeVisible);
    }

    lastScrollYRef.current = currentScrollY;
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

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('/api/auth/me', {
          withCredentials: true
        });
        // If backend returns success, user is authenticated
        if (res.data.success && res.data.user) {
          setUserData(res.data.user);
          setIsLogged(true);
        } else {
          setIsLogged(false);
        }
      } catch (error) {
        setIsLogged(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.post('/api/auth/logout', {}, {
        withCredentials: true
      });
      console.log("Logout response: ", res.data);
      setIsLogged(false);
    } catch (error) {
      console.error('Logout failed', error);
    }
  }  
    
  

  return (
    <>
      <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6 py-4 rounded-2xl">
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between p-4">
            {/* Logo and Product button */}
            <TransitionLink href={"/"}>
            <div className="flex flex-col items-center ml-5">
              <div className="font-ragas text-blue-50 font-black text-2xl pointer-events-none select-none">PIZZAR.3IO</div>
              <div className="font-chunk text-blue-50 text-xs pointer-events-none select-none -mt-2">EST. 1995</div>
            </div>
            </TransitionLink>

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
                className="text-black bg-tomato hover:bg-tomato/80 cursor-pointer"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} className="" />}
              </Button>
              
            </div>

            {/* Navigation Links - visible on desktop */}
            <div className="hidden md:flex h-full items-center justify-between mr-5 space-x-5">
              <div className="text-white font-poppin text-md nav-hover-btn">
                <TransitionLink href="/">Home</TransitionLink>
              </div>
              <div className="text-white font-poppin text-md nav-hover-btn">
                <TransitionLink href="/menu">Menu</TransitionLink>
              </div>
              <div className="text-white font-poppin text-md nav-hover-btn">
                <TransitionLink href="/contact">Contact</TransitionLink>
              </div>
              
              <CartSheet />
              {isLogged?<Button onClick={handleLogout} asChild className="bg-tomato hover:bg-tomato/80 text-primary font-poppins">
                <Link href="">Logout</Link>
              </Button>:<Button asChild className="bg-tomato hover:bg-tomato/80 text-primary font-poppins">
                <Link href="/signup">Signup</Link>
              </Button>}
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
          <div className="text-white font-poppin text-xl nav-hover-btn">
          <Link 
            href="/" 
            onClick={handleNavigation}
          >
            Home
          </Link>
          </div>

          <div className="text-white font-poppin text-xl nav-hover-btn">
          <Link 
            href="/menu" 
            onClick={handleNavigation}
          >
            Menu
          </Link>
          </div>

          <div className="text-white font-poppin text-xl nav-hover-btn">
          <Link 
            href="/contact" 
            onClick={handleNavigation}
          >
            Contact
          </Link>
          </div>
          
          <div className="flex gap-4">
            
            {isLogged ? (
              <Button onClick={handleLogout} asChild className="bg-tomato hover:bg-tomato/80 text-primary font-poppins">
                <Link href="" onClick={handleNavigation}>Logout</Link>
              </Button>
            ) : (
              <Button asChild className="bg-tomato hover:bg-tomato/80 text-primary font-poppins">
                <Link href="/signup" onClick={handleNavigation}>Signup</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
