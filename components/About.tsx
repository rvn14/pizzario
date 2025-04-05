import React from 'react'
import Scene from './Scene'

const About = () => {
  return (
    <div className='w-full min-h-screen bg-primary grid grid-cols-1 md:grid-cols-2 px-4 sm:px-8 md:px-16 lg:px-28 py-8 md:py-0'>
        <div className='order-1 md:order-1'>
          <div className='w-full h-full flex flex-col justify-center pr-4 md:pr-16 lg:pr-32 py-8 md:py-0'>
                <div className='text-white text-xl sm:text-2xl md:text-3xl font-poppins font-semibold'>Welcome to </div>
                <div className='font-ragas text-tomato text-4xl sm:text-5xl md:text-6xl font-bold'>PIZZAR.3IO</div>
                <div className='text-white font-poppins font-extralight text-sm sm:text-md mt-4 sm:mt-6'>Welcome to <span className='font-ragas'>PIZZAR.3IO</span>, We're all about crafting delicious, hand-tossed pizzas made with fresh ingredients and a whole lot of love. Whether you're here for a classic favorite or something new, every bite is made to delight. Come on in, grab a slice, and let's make your pizza dreams come true!</div>
          </div>
        </div>
        <div className='order-2 md:order-2 h-[500px] md:h-full'>
            <Scene/>
        </div>
    </div>
  )
}

export default About