import Image from "next/image";
import React from "react";
import MenuButton from "./MenuButton";

const Menu: React.FC = () => {
  return (
    <section className="w-full h-fit py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-24 z-10 flex flex-col items-center relative">
      <div className="max-w-xs sm:max-w-md md:max-w-lg mx-auto text-center text-wood-100 select-none">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-abriel">
          OUR
        </h2>
        {/* single heading with Tailwind arbitrary text-shadow */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-oi -rotate-3 [text-shadow:0_10px_0_theme(colors.wood.950)]">
          MENU
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-wood-300 mt-4 font-abriel font-bold">
          Where time-honored recipes meet new creativity. Discover flavors that
          blend tradition with modern flair.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-10 md:mt-12 w-full max-w-7xl">
        <figure className="flex flex-col items-center">
          <div className="relative w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px] aspect-[3/4] rounded-lg shadow-md hover:scale-95 transition-all duration-500 overflow-hidden">
            <Image
              src="/images/ab1.png"
              alt="Pizza"
              fill
              className="rounded-lg object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          <figcaption className="mt-2 sm:mt-3 text-xs sm:text-sm uppercase tracking-widest font-poppins text-wood-400 select-none">
            Pizza
          </figcaption>
          <p className="mt-1 text-lg sm:text-xl md:text-2xl font-abriel text-wood-300 text-center max-w-[240px] sm:max-w-[260px] px-2">
            Classic wood-fired pizza topped with fresh tomato, mozzarella and
            basil.
          </p>
        </figure>

        <figure className="flex flex-col items-center">
          <div className="relative w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px] aspect-[3/4] rounded-lg shadow-md hover:scale-95 transition-all duration-500 overflow-hidden">
            <Image
              src="/images/ab2.png"
              alt="Burger"
              fill
              className="rounded-lg object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          <figcaption className="mt-2 sm:mt-3 text-xs sm:text-sm uppercase tracking-widest font-poppins text-wood-400 select-none">
            Burger
          </figcaption>
          <p className="mt-1 text-lg sm:text-xl md:text-2xl font-abriel text-wood-300 text-center max-w-[240px] sm:max-w-[260px] px-2">
            Juicy house-seasoned beef patty with crisp lettuce, tomato and
            signature sauce.
          </p>
        </figure>

        <figure className="flex flex-col items-center">
          <div className="relative w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px] aspect-[3/4] rounded-lg shadow-md hover:scale-95 transition-all duration-500 overflow-hidden">
            <Image
              src="/images/ab3.png"
              alt="Desserts"
              fill
              className="rounded-lg object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          <figcaption className="mt-2 sm:mt-3 text-xs sm:text-sm uppercase tracking-widest font-poppins text-wood-400 select-none">
            Desserts
          </figcaption>
          <p className="mt-1 text-lg sm:text-xl md:text-2xl font-abriel text-wood-300 text-center max-w-[240px] sm:max-w-[260px] px-2">
            Indulgent sweets made daily - from tiramisu to seasonal fruit tarts.
          </p>
        </figure>

        <figure className="flex flex-col items-center">
          <div className="relative w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px] aspect-[3/4] rounded-lg shadow-md hover:scale-95 transition-all duration-500 overflow-hidden">
            <Image
              src="/images/ab4.png"
              alt="Drinks"
              fill
              className="rounded-lg object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          <figcaption className="mt-2 sm:mt-3 text-xs sm:text-sm uppercase tracking-widest font-poppins text-wood-400 select-none">
            Drinks
          </figcaption>
          <p className="mt-1 text-lg sm:text-xl md:text-2xl font-abriel text-wood-300 text-center max-w-[240px] sm:max-w-[260px] px-2">
            Refreshing beverages, from classic sodas to crafted mocktails and
            coffee.
          </p>
        </figure>
      </div>
      <div className="mt-8 sm:mt-12 md:mt-16 flex gap-4">
        <MenuButton />
      </div>
    </section>
  );
};

export default Menu;