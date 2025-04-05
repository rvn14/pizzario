import React from 'react'
import Link from 'next/link'

const Hero = () => {
    return (
       <section className='relative w-full min-h-screen bg-primary flex items-center justify-center bg-cover bg-center hero-bg'>
        <div className='absolute w-full h-full bg-primary/80'></div>
        
        {/* Pizza decoration elements */}
        <div className='absolute top-20 left-10 w-24 h-24 rounded-full bg-tomato/30 hidden md:block'></div>
        <div className='absolute bottom-20 right-10 w-32 h-32 rounded-full bg-tomato/20 hidden md:block'></div>
        
         <div className='absolute text-center px-4 sm:px-6 md:px-8 max-w-4xl mx-auto'>
             <h1 className='text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-ragas text-tomato font-bold'>PIZZAR.3IO</h1>
             <p className='text-white font-chunk text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-2 mb-6'>Taste the best pizza in town</p>
             
             <p className='text-white/80 font-sans text-sm sm:text-base mx-auto max-w-2xl mb-8'>
               Handcrafted with love using only the freshest ingredients and authentic Italian recipes. 
               Our wood-fired pizzas bring the true taste of Naples right to your table.
             </p>
             
             <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
               <Link href="/menu" className='px-6 py-3 bg-tomato text-white font-chunk rounded-full hover:bg-tomato/80 transition-all duration-300 text-base sm:text-lg'>
                 View Our Menu
               </Link>
               <Link href="/order" className='px-6 py-3 bg-white text-tomato font-chunk rounded-full hover:bg-white/90 transition-all duration-300 text-base sm:text-lg'>
                 Order Now
               </Link>
             </div>
             
             <div className='mt-12 flex items-center justify-center gap-6'>
               <div className='w-10 h-10 rounded-full bg-white/10 flex items-center justify-center'>
                 <span className='text-white'>🍕</span>
               </div>
               <div className='w-10 h-10 rounded-full bg-white/10 flex items-center justify-center'>
                 <span className='text-white'>🧀</span>
               </div>
               <div className='w-10 h-10 rounded-full bg-white/10 flex items-center justify-center'>
                 <span className='text-white'>🍅</span>
               </div>
             </div>
         </div>
         
         <div className='absolute bottom-6 left-0 right-0 text-center'>
           <p className='text-white/70 text-sm'>Open 7 days a week | 11:00 AM - 11:00 PM</p>
         </div>
       </section>
      );
}

export default Hero