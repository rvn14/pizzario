
import Navbar from '@/components/Navbar';
import { ReactLenis } from 'lenis/react'


export default function Layout({ children }: Readonly<{ children: React.ReactNode;}>) {
  return (
    <ReactLenis root> 
    <main className="antialiased flex flex-col items-center ">
        <Navbar />
        {children}
    </main>
    </ReactLenis>
  );
}