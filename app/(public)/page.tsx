import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import Image from "next/image";
import Navbar from '@/components/Navbar';
import { CartSheet } from "@/components/CartTable";
import BackgroundSection from '@/components/BackgroundSection';
import About from "@/components/About";
import Reservations from "@/components/Reservations";


const Home = () => {



  return (
    <main className="min-h-dvh w-full bg-wood-200 relative flex flex-col items-center">
      {<Navbar />}
      <div className='fixed inset-0 overflow-hidden mix-blend-screen select-none pointer-events-none'>
          <Image src="/images/bg.jpg" alt="Hero Background" layout="fill" objectFit="cover" className="object-cover" />
      </div>
      <div className='fixed bottom-10 right-10 z-40'>
          <CartSheet />
      </div>
      <Hero />
      <About />
      <BackgroundSection image="cel2.png" />
      <Menu />
      <BackgroundSection image="abbg.png" />
      <Reservations />
    </main>
  );
};



export default Home;