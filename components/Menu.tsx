import Image from "next/image";
import React from "react";
import MenuButton from "./MenuButton";

const Menu: React.FC = () => {
  return (
    <section className="w-full h-fit py-24 px-3 md:px-32 z-10 flex flex-col items-center relative">
      <div className="max-w-lg mx-auto text-center text-wood-100 select-none">
        <h2 className="text-4xl md:text-6xl font-bold font-abriel ">OUR</h2>
        {/* single heading with Tailwind arbitrary text-shadow */}
        <h1 className="text-5xl md:text-8xl font-oi -rotate-3 [text-shadow:0_10px_0_theme(colors.wood.950)]">
          MENU
        </h1>
        <p className="text-3xl text-wood-300 mt-4 font-abriel font-bold">
          Where time-honored recipes meet new creativity. Discover flavors that
          blend tradition with modern flair.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-12">
        <figure className="flex flex-col items-center">
          <div className="relative w-[300px] aspect-[3/4] rounded-lg shadow-md hover:scale-95 transition-all duration-500 overflow-hidden">
            <Image
              src="/images/ab1.png"
              alt="Pizza"
              fill
              className="rounded-lg object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          <figcaption className="mt-3 text-sm uppercase tracking-widest font-poppins text-wood-400 select-none">
            Pizza
          </figcaption>
          <p className="mt-1 text-2xl font-abriel text-wood-300 text-center max-w-[260px]">
            Classic wood-fired pizza topped with fresh tomato, mozzarella and
            basil.
          </p>
        </figure>

        <figure className="flex flex-col items-center">
          <div className="relative w-[300px] aspect-[3/4] rounded-lg shadow-md hover:scale-95 transition-all duration-500 overflow-hidden">
            <Image
              src="/images/ab2.png"
              alt="Burger"
              fill
              className="rounded-lg object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          <figcaption className="mt-3 text-sm uppercase tracking-widest font-poppins text-wood-400 select-none">
            Burger
          </figcaption>
          <p className="mt-1 text-2xl font-abriel text-wood-300 text-center max-w-[260px]">
            Juicy house-seasoned beef patty with crisp lettuce, tomato and
            signature sauce.
          </p>
        </figure>

        <figure className="flex flex-col items-center">
          <div className="relative w-[300px] aspect-[3/4] rounded-lg shadow-md hover:scale-95 transition-all duration-500 overflow-hidden">
            <Image
              src="/images/ab3.png"
              alt="Desserts"
              fill
              className="rounded-lg object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          <figcaption className="mt-3 text-sm uppercase tracking-widest font-poppins text-wood-400 select-none">
            Desserts
          </figcaption>
          <p className="mt-1 text-2xl font-abriel text-wood-300 text-center max-w-[260px]">
            Indulgent sweets made daily - from tiramisu to seasonal fruit tarts.
          </p>
        </figure>

        <figure className="flex flex-col items-center">
          <div className="relative w-[300px] aspect-[3/4] rounded-lg shadow-md hover:scale-95 transition-all duration-500 overflow-hidden">
            <Image
              src="/images/ab4.png"
              alt="Drinks"
              fill
              className="rounded-lg object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          <figcaption className="mt-3 text-sm uppercase tracking-widest font-poppins text-wood-400 select-none">
            Drinks
          </figcaption>
          <p className="mt-1 text-2xl font-abriel text-wood-300 text-center max-w-[260px]">
            Refreshing beverages, from classic sodas to crafted mocktails and
            coffee.
          </p>
        </figure>
      </div>
      <div className="mt-16 flex gap-4">
        <MenuButton />
      </div>
    </section>
  );
};

export default Menu;