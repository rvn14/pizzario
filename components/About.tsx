const About = () => {
  
    



  return (
    <section className='w-full min-h-screen py-16 flex items-center justify-center relative'>
        <div className='absolute inset-0 bg-gradient-to-br from-black/50 via-primary/30 to-black/70 hero-bg-secondary'></div>
        <div className='relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-6xl mx-auto'>
            <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6'>About Us</h1>
            <p className='text-white/80 font-poppins text-lg md:text-xl leading-relaxed max-w-3xl mx-auto'>
                Welcome to Pizzar.io, where we bring you the finest pizzas crafted with passion and the freshest ingredients. Our mission is to deliver an unforgettable pizza experience that keeps you coming back for more.
            </p>
        </div>
    </section>
  )
}

export default About