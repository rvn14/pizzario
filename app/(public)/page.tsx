import React from 'react'
import Link from 'next/link'
const Home = () => {




  return (
    <main className='w-full min-h-screen bg-primary flex flex-col items-center justify-center bg-cover bg-center hero-bg overflow-x-hidden'>
    <section className='relative w-full min-h-screen bg-primary flex items-center justify-center bg-cover bg-center hero-bg overflow-hidden'>
        
        <div className='absolute inset-0 bg-gradient-to-br from-black/50 via-primary/30 to-black/70 backdrop-blur-[2px]'></div>
        
        
        <div className='relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-6xl mx-auto -mt-30'>
            <div className='mb-8'>
                <p className='text-white/70 font-poppins text-sm md:text-base uppercase tracking-[0.3em] mb-2'>
                    Authentic • Fresh • Delicious
                </p>
                
                <h1 className='text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-ragas text-white font-bold leading-none mb-6 '>
                    PIZZAR.3IO
                </h1>
                
                
            </div>
            
        </div>

        <div className='absolute bottom-8 left-8 text-right max-w-xs'>
            {/* two images */}
            
        </div>
        <div className='absolute bottom-8 right-8 text-left max-w-xs'>
            <p className='text-white/80 font-poppins text-sm mb-3 leading-relaxed'>
                Every pizza on our menu is a blend of premium ingredients, creative flair, and timeless recipes — designed to delight your senses.
            </p>
            <Link href="/menu" >
                <span className='inline-block text-white px-3 py-1 rounded-md bg-white/8 outline-1 outline-white/20 backdrop-blur-md hover:bg-white/15 transition-all duration-300'>View Menu</span>
            </Link>
        </div>
    </section>
    <section className='w-full min-h-screen py-16 flex items-center justify-center relative'>
        <div className='absolute inset-0 bg-gradient-to-br from-black/50 via-primary/30 to-black/70 hero-bg-secondary'></div>
        <div className='relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-6xl mx-auto'>
            <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 font-clash-semibold'>About Us</h1>
            <p className='text-white/80 font-clash text-lg md:text-xl leading-relaxed max-w-3xl mx-auto '>
                Welcome to <span className='font-ragas font-bold'>PIZZAR.3IO</span>, where we bring you the finest pizzas crafted with passion and the freshest ingredients. Our mission is to deliver an unforgettable pizza experience that keeps you coming back for more.
            </p>
        </div>
    </section>
    </main>
  )
}

export default Home