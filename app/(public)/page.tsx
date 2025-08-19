import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import Image from "next/image";
import Navbar from '@/components/Navbar';
import { CartSheet } from "@/components/CartTable";
import BackgroundSection from '@/components/BackgroundSection';
import Reservations from "@/components/Reservations";


const Home = () => {



  return (
    <main className="min-h-dvh w-full bg-black relative flex flex-col items-center">
      {<Navbar />}
      <div className='fixed inset-0 overflow-hidden mix-blend-screen select-none pointer-events-none'>
          <Image src="/images/bg.jpg" alt="Hero Background" layout="fill" objectFit="cover" className="object-cover opacity-50" />
      </div>
      <div className='fixed bottom-10 right-10 z-40'>
          <CartSheet />
      </div>
      <Hero />
      <Menu />
      <BackgroundSection image="abbg.png" />
      <Reservations />
    </main>
  );
};



export default Home;