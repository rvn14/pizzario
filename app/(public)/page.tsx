import React from 'react'
import Hero from '../../components/Hero'
import About from '@/components/About'




const Home = () => {
  return (
    <div className='w-full bg-gray-50'>
        <Hero/>
        <About/>
    </div>
  )
}

export default Home