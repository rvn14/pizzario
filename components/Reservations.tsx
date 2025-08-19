import Image from 'next/image'
import React from 'react'

const Reservations = () => {
  return (
    <section className='max-w-7xl mx-auto px-6 py-20'>
        
        <div className='grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-8 items-center'>
            
            {/* Row 1, Col 1: Image */}
            <div className='relative w-full h-64 md:h-80 overflow-hidden rounded-lg transform rotate-2 scale-95 shadow-xl transition-transform duration-300'>
                <Image className="object-cover" src='/images/cel1.png' alt='Background Image 1' fill style={{ objectFit: 'cover' }} />
            </div>

            {/* Row 1, Col 2: Text block 1 */}
            <div className="max-w-xl text-crown-600 select-none md:pl-6">
                <h2 className="text-3xl md:text-4xl font-bold font-abriel">Every Table Has</h2>
                
                <h1 className="text-4xl md:text-6xl font-oi -rotate-2 text-crown-600 [text-shadow:0_10px_0_theme(colors.crown.950)]">
                    STORIES
                </h1>
                <p className='font-abriel text-lg md:text-xl mt-4 text-cocoa-700'>
                    Where laughter is shared, milestones are celebrated, and memories are made. From the first slice to the last sip, each gathering writes its own chapter in a story of togetherness
                </p>
            </div>

            {/* Row 2, Col 1: Text block 2 */}
            <div className="max-w-xl text-right text-crown-600 select-none md:pr-6">
                <h2 className="text-3xl md:text-4xl font-bold font-abriel">Celebrate Life’s</h2>
                
                <h1 className="text-4xl md:text-6xl font-oi rotate-2 text-crown-600 [text-shadow:0_10px_0_theme(colors.crown.950)]">
                    MOMENTS
                </h1>
                <p className='font-abriel text-lg md:text-xl mt-4 text-cocoa-700'>
                    From intimate dinners to birthdays, anniversaries, and gatherings with friends — Pizzario is the perfect place to turn any meal into an unforgettable memory. Book a table and let us create the atmosphere, flavors, and joy that make your celebrations truly special.
                </p>
            </div>

            {/* Row 2, Col 2: Image */}
            <div className='relative w-full h-64 md:h-80 overflow-hidden rounded-lg transform -rotate-2 scale-95 shadow-xl transition-transform duration-300'>
                <Image className="object-cover" src='/images/bg1.jpg' alt='Background Image 1' fill style={{ objectFit: 'cover' }} />
            </div>
            
        </div>

        <div className='mt-16 w-full flex flex-col items-center'>
            <h2 className="text-3xl md:text-4xl font-bold font-abriel text-center text-crown-800">Ready to Create Your Story?</h2>
            <p className='font-abriel text-lg md:text-xl mt-4 text-center max-w-2xl text-cocoa-700'>
                Join us at Pizzario, where every meal is a memory waiting to be made. Reserve your table today and let the stories unfold!
            </p>
        </div>
    </section>
  )
}

export default Reservations