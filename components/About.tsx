import React from 'react'

const About = () => {
  return (
    <section className='w-full min-h-screen flex px-30 relative items-center '>
      <div className="w-full mx-auto  text-wood-200 select-none">
        <h2 className="text-4xl md:text-6xl font-bold font-abriel ">More Than a Meal, It’s an</h2>

        <h1 className="text-5xl md:text-8xl -rotate-3 font-oi  [text-shadow:0_10px_0_theme(colors.wood.950)]">
          EXPERIENCE
        </h1>
        <p className='mt-16 max-w-3xl font-abriel text-3xl text-wood-300/70 font-bold'>At Pizzario, we’re more than just a restaurant - we’re a place where flavors, laughter, and memories come together. Born from a love of authentic recipes and crafted with passion, our mission is simple, to serve food that feels like home, yet tastes unforgettable.</p>
      </div>
    </section>
  )
}

export default About