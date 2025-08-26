"use client";
import Link, { LinkProps } from "next/link";
import React, { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  href: string;
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const TransitionLink: React.FC<TransitionLinkProps> = ({
  children,
  href,
  ...props
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const navigationPromiseRef = useRef<{
    resolve: () => void;
    targetHref: string;
  } | null>(null);

  // Listen for pathname changes
  useEffect(() => {
    if (navigationPromiseRef.current && pathname === navigationPromiseRef.current.targetHref) {
      // Wait a bit more for React to finish rendering
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          navigationPromiseRef.current?.resolve();
          navigationPromiseRef.current = null;
        });
      });
    }
  }, [pathname]);

  const waitForNavigation = (targetHref: string): Promise<void> => {
    return new Promise((resolve) => {
      navigationPromiseRef.current = { resolve, targetHref };
      
      // Fallback timeout
      setTimeout(() => {
        if (navigationPromiseRef.current?.targetHref === targetHref) {
          navigationPromiseRef.current.resolve();
          navigationPromiseRef.current = null;
        }
      }, 1500);
    });
  };

  const handleTransition = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    
    // Don't transition if we're already on the target page
    if (pathname === href) {
      return;
    }

    const body = document.querySelector("body");

    try {
      // Start transition animation
      body?.classList.add("page-transition");
      await sleep(500); // Animation duration

      // Navigate to new page
      router.push(href);
      
      // Wait for the navigation to complete
      await waitForNavigation(href);

    } catch (error) {
      console.error('Navigation failed:', error);
    } finally {
      // Always remove the transition class
      body?.classList.remove("page-transition");
    }
  };

  return (
    <Link {...props} href={href} onClick={handleTransition}>
      {children}
    </Link>
  );
};