/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <>
    <section className="relative w-full min-h-screen flex items-center justify-center bg-primary bg-cover bg-center hero-bg overflow-hidden">
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-primary/30 to-black/90 backdrop-blur-[2.5px]"></div>

      {/* Floating Pizzas (decorative, add your image paths!) */}
      

      {/* Center Hero */}
      <div className="relative z-30 text-center px-4 sm:px-6 md:px-8 max-w-5xl mx-auto flex flex-col items-center gap-2">
        <motion.p
          className="text-white/70 font-poppins text-xs md:text-lg uppercase tracking-[0.32em] "
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Authentic • Fresh • Delicious
        </motion.p>

        <motion.h1
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[12rem] font-ragas text-white font-extrabold leading-none drop-shadow-xl mb-7"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          PIZZAR.<span className="text-accent">3IO</span>
        </motion.h1>

        <motion.div
          className="mt-8 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <Link href="/menu" passHref>
            <motion.span
              whileHover={{ scale: 1.07, backgroundColor: "rgba(255,255,255,0.18)" }}
              className="inline-block cursor-pointer px-7 py-3 rounded-2xl bg-white/10 outline-1 outline-white/20 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-white/20"
            >
               <span className="">
                 Explore Menu
               </span>
            </motion.span>
          </Link>
          <span className="text-white/60 text-xs mt-1">
            For the crust-lovers, the trendsetters, the flavor explorers.
          </span>
        </motion.div>
      </div>

      {/* Footer Card */}
      <motion.div
        className="absolute bottom-8 right-8 z-30 max-w-xs bg-white/5 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/10"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.4, type: "spring" }}
      >
        <p className="text-white/90 font-poppins text-base leading-relaxed mb-2">
          Every pizza is a remix of premium ingredients, creative flair, and timeless recipes — ready to vibe with your tastebuds.
        </p>
        <Link href="/about" className="text-accent underline underline-offset-4 hover:text-accent/80 transition-colors">
          Learn about our craft →
        </Link>
      </motion.div>
    </section>

    
    <section className="w-full min-h-screen hero-bg-secondary py-10 px-8 sm:py-16 sm:px-4 flex flex-col items-center relative">

        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-primary/30 to-black/60 backdrop-blur-[1px]"></div>
      {/* Section Title */}
      <div className="mb-8 sm:mb-12 text-center z-10">
        <p className="text-gray-300 font-poppins font-light text-xs sm:text-sm tracking-wide italic">
          special moments.
        </p>
        <h2 className="uppercase text-4xl sm:text-4xl md:text-6xl font-clash-bold tracking-widest text-tomato mb-2 letter-spacing-wide">
          About Us
        </h2>
      </div>
      {/* Grid */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {/* Left Image */}
        <motion.div
          className="rounded-xl overflow-hidden shadow-xl bg-white/5 backdrop-blur-md border border-tomato/0 flex-1"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/images/bg2.png"
            alt="Signature dish"
            width={400}
            height={460}
            className="w-full h-[240px] sm:h-[320px] md:h-[400px] lg:h-[480px] object-cover"
          />
        </motion.div>
        {/* Center Text */}
        <motion.div
          className="flex flex-col items-center justify-center gap-2 px-10 sm:px-12 py-8 sm:py-16 rounded-xl bg-white/5 border border-white/40 shadow-2xl backdrop-blur-xs text-center min-h-[280px] sm:min-h-[400px] md:min-h-[480px] flex-[1.3] md:scale-105"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-gray-300 italic mb-2 sm:mb-3 text-sm sm:text-base">Taste perception.</p>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-clash-semibold text-white mb-2 sm:mb-4 leading-snug">
            TRADITIONAL <span className="font-clash-extralight text-tomato">&amp;</span> MODERN
          </h3>
          <p className="text-gray-400 text-sm sm:text-sm mb-4 sm:mb-7 font-general">
            Where time-honored recipes meet new creativity.  
            Discover flavors that blend tradition with modern flair.
          </p>
          <Button
            onClick={() => window.location.href = "/menu"}
            className=" bg-tomato hover:bg-tomato/80 text-white font-general px-4 sm:px-8 py-3  shadow-lg transition-all duration-200 text-base sm:text-base cursor-pointer"
          >
            Read More
          </Button>
        </motion.div>
        {/* Right Image */}
        <motion.div
          className="rounded-xl overflow-hidden shadow-xl bg-white/5 backdrop-blur-md border border-tomato/0 flex-1"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <Image
            src="/images/pic1.png"
            alt="Cooking at our kitchen"
            width={400}
            height={460}
            className="w-full h-[240px] sm:h-[320px] md:h-[400px] lg:h-[480px] object-cover"
          />
        </motion.div>
      </div>
    </section>
    </>
  );
};


export default Home;
