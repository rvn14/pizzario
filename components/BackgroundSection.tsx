"use client"
import React, {  useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);


interface BackgroundSectionProps {
  image?: string;
}

const BackgroundSection: React.FC<BackgroundSectionProps> = ({ image }) => {

    const bgRef = useRef<HTMLDivElement | null>(null)
    const bgContRef = useRef<HTMLElement | null>(null)

    useEffect(() => {
        if (!bgRef.current || !bgContRef.current) return;

        gsap.to(bgRef.current, {
            yPercent: 20, // move the taller image wrapper down as page scrolls
            ease: "none",
            scrollTrigger: {
                trigger: bgContRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                // markers: true, // enable for debugging
            },
        });
  }, []);

  return (
    <section ref={bgContRef} className="w-full  h-[80vh] relative overflow-clip">
      <div className="absolute inset-0 bg-bunting-950/10 backdrop-blur-[1px] z-10"></div>

      {/* taller image wrapper for parallax */}
      <div
        ref={bgRef}
        className="absolute left-0 top-0 w-full h-[130vh] -translate-y-[15vh] overflow-hidden z-0"
        aria-hidden
      >
        <Image
          src={`/images/${image}`}
          alt="Background"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
      </div>

      <div className='absolute inset-0 flex flex-col items-center justify-center w-full h-full z-20'>
        
      </div>
    </section>
  );
};

export default BackgroundSection;
