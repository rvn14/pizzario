const About = () => {
  
    



  return (
    <div className='relative w-full min-h-screen bg-primary flex items-center justify-center px-4 sm:px-8 md:px-16 lg:px-28 py-8'>
      <div className="flex flex-col items-center justify-center gap-4 text-white text-lg font-poppin">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="text-center max-w-2xl">
          Welcome to our pizza place! We are passionate about serving the best pizza in town. Our dough is made fresh daily, and we use only the finest ingredients to create delicious pizzas that will satisfy your cravings. Whether you prefer classic cheese, pepperoni, or gourmet toppings, we have something for everyone. Join us for a slice or order online for delivery. Thank you for choosing us as your go-to pizza destination! We look forward to serving you soon!    
        </p>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary to-transparent"></div>
      <div className="absolute top-0 right-0 w-full h-1/2 bg-gradient-to-b from-primary to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-30" style={{ backgroundImage: "url('/images/bg.jpg')" }}></div>
      
    </div>
  )
}

export default About