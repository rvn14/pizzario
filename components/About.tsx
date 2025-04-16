import React, { Suspense } from 'react'
import Scene from './Scene'

const About = () => {
  return (
    <div className='relative w-full h-screen bg-primary px-4 sm:px-8 md:px-16 lg:px-28 py-8 md:py-0'>
        <div className='absolute w-full h-full top-0 left-0 z-0'>
          <Suspense>
            <Scene />
          </Suspense>
        </div>
        <div className='z-40'>
          
        </div>          
    </div>
  )
}

export default About