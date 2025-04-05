import React from 'react'



const Hero = () => {

    return (
       <section className='relative w-full min-h-screen bg-primary flex items-center justify-center bg-cover bg-center hero-bg'>
        <div className='absolute w-full h-full bg-primary/80'></div>
         <div className='absolute text-center'>
             <h1 className='text-9xl font-ragas text-tomato font-bold'>PIZZAR.3IO</h1>
             <p className='text-white font-chunk text-4xl'>Taste the best pizza in town</p>
         </div>
       </section>
      );
}

export default Hero