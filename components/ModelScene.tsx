import React from 'react'
import Scene from './Scene'

const ModelScene = () => {
  return (
    <section className='w-full h-192 bg-black relative'>
      <div className='absolute top-0 z-10 mt-16 w-full flex flex-col items-center'>
            <h2 className="text-3xl md:text-4xl font-bold font-abriel text-center text-persimmon-500">Ready to Create Your Story?</h2>
            <p className='font-abriel text-lg md:text-xl mt-4 text-center max-w-2xl text-cocoa-200'>
                Join us at Pizzario, where every meal is a memory waiting to be made. Reserve your table today and let the stories unfold!
            </p>
      </div>
      <div className='absolute inset-0'>
        <Scene rotateX={0} />
      </div>
      <div className='absolute bottom-5 flex items-center justify-center w-full z-10'>
        
      </div>
    </section>
  )
}

export default ModelScene