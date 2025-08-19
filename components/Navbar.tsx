/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, ShoppingCartIcon, User2, User2Icon, UserCircle2Icon, X } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { CartSheet } from "./CartTable";
import { TransitionLink } from "./utils/TransitionLink";

const Navbar = () => {
  // Refs for navigation container
  const navContainerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
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
      logoRef.current?.classList.add( "opacity-100");
      
    } else if (currentScrollY > lastScrollYRef.current) {
      // Scrolling down: hide navbar and apply floating-nav
      shouldBeVisible = false;
      navContainerRef.current?.classList.add("floating-nav-black");
      logoRef.current?.classList.remove( "opacity-100");
      
    } else if (currentScrollY < lastScrollYRef.current) {
      // Scrolling up: show navbar with floating-nav
      shouldBeVisible = true;
      navContainerRef.current?.classList.add("floating-nav-black");
      logoRef.current?.classList.remove( "opacity-100");
      
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
        className="fixed top-4 flex items-center z-50 h-16 border-none transition-all duration-700 w-full md:max-w-7xl rounded-lg text-wood-100"
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2 h-full flex items-center justify-center px-4 rounded-full">
          <div ref={logoRef} className="transition-all duration-700 text-wood-50 z-10">
            <TransitionLink href={"/"} className="flex flex-col items-center">
              <p className="font-ragas font-black text-3xl pointer-events-none select-none">
                PIZZA
                <span className="text-transparent bg-gradient-to-r from-anzac-400 to-anzac-300 bg-clip-text">
                  R.3IO
                </span>
              </p>
                
              </TransitionLink>
            </div>
            <nav className="absolute inset-0 flex items-center justify-between px-16">
                <div className="hidden md:flex gap-8 font-abriel text-lg">
                  <TransitionLink href="/menu" className="hover:text-wood-50 transition-all duration-300">Menu</TransitionLink>
                  <TransitionLink href="/about" className="hover:text-wood-50 transition-all duration-300">About</TransitionLink>
                  <TransitionLink href="/contact" className="hover:text-wood-50 transition-all duration-300">Contact</TransitionLink>
                </div>
                <div className="hidden md:flex gap-8 font-abriel text-lg">
                  
                  {isLogged?<Button onClick={handleLogout} asChild className="bg-wood-100 hover:bg-wood-100/90 text-wood-950 font-abriel tracking-wider rounded-full">
                    <Link href="" onClick={handleLogout} className="flex gap-2 items-center">
                      <User2Icon className="w-6 h-6 bg-wood-950 text-wood-100 rounded-full group-hover:bg-wood-900 transition-all duration-300" />
                      <span className="group-hover:text-wood-900 transition-all duration-300">Logout</span>
                    </Link>
                  </Button>:<Button asChild className="bg-wood-100 hover:bg-wood-100/90 text-wood-950 font-abriel tracking-wider rounded-full">
                    <TransitionLink href="/signup" className="flex gap-2 items-center group">
                      <User2Icon className="w-6 h-6 bg-wood-950 text-wood-100 rounded-full group-hover:bg-wood-900 transition-all duration-300" />
                      <span className="group-hover:text-wood-900 transition-all duration-300">Signup</span>
                    </TransitionLink>
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
              <Button onClick={handleLogout} asChild className="bg-persimmon-100 hover:bg-persimmon-100/80 text-russett-800 font-poppins">
                <Link href="" onClick={handleNavigation}>Logout</Link>
              </Button>
            ) : (
              <Button asChild className="bg-persimmon-100 hover:bg-persimmon-100/80 text-razzmatazz-500 font-poppins">
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
