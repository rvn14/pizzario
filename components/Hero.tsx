import React from 'react'


const Hero = () => {
    return (
      <section className="w-full min-h-dvh flex flex-col items-center relative py-36">
            <div className="absolute inset-0 overflow-clip w-full p-2">
              <div className='w-full relative rounded-lg h-[98vh] overflow-clip'>
                <div className="absolute inset-0 bg-wood-950/20 backdrop-blur-[2px] z-10"></div>
                  <video
                    src="/videos/hero.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover object-center rounded-lg select-none pointer-events-none blur-[2px]"
                  />
              </div>
            </div>
          <div className='absolute inset-0 flex flex-col items-center justify-center w-full h-full'>

            <div className="flex flex-col items-center z-10 leading-10 md:leading-none">
              {/* line 1 */}
              <div className="relative w-full flex justify-center pointer-events-none select-none my-1">
                <span aria-hidden className="absolute text-wood-950 translate-y-3 text-[2.5rem] md:text-8xl font-oi">Authentic</span>
                <span className="relative text-transparent bg-clip-text bg-gradient-to-br from-wood-100 to-wood-200 text-[2.5rem] md:text-8xl font-oi">Authentic</span>
              </div>

              {/* line 2 */}
              <div className="relative w-full flex justify-center pointer-events-none select-none my-1">
                <span aria-hidden className="absolute text-wood-950 translate-y-3 text-[2.5rem] md:text-8xl font-oi"> • Fresh • </span>
                <span className="relative text-transparent bg-clip-text bg-gradient-to-br from-wood-100 to-wood-200 text-[2.5rem] md:text-8xl font-oi"> • Fresh • </span>
              </div>

              {/* line 3 */}
              <div className="relative w-full flex justify-center pointer-events-none select-none my-1">
                <span aria-hidden className="absolute text-wood-950 translate-y-3 text-[2.5rem] md:text-8xl font-oi">Delicious</span>
                <span className="relative text-transparent bg-clip-text bg-gradient-to-br from-wood-100 to-wood-200 text-[2.5rem] md:text-8xl font-oi">Delicious</span>
              </div>
            </div>
          </div>

          
      </section>
      );
}

export default Hero