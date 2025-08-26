import CheckoutTable from '@/components/CheckoutTable'
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import React from 'react'
import CheckoutDetails from '@/components/CheckoutDetails';
import { TransitionLink } from '@/components/utils/TransitionLink';
import Image from 'next/image';


const page = async () => {
  try {
    // Check if user token available in cookies
    const cookieStore = await cookies();
    const userToken = cookieStore.get('token')?.value;
    console.log('User token:', userToken);
    
    if (!userToken) {
      console.log('User is not authenticated');
      redirect('/login');
    }

    // If authenticated, render the checkout page
  } catch (error) {
    console.error('Error during authentication check:', error);
    redirect('/login');
  }
  
  return (
    <section className='relative min-h-screen w-full flex flex-col items-center justify-center p-4 bg-white/3'>
      <div className='fixed inset-0 overflow-hidden mix-blend-screen select-none pointer-events-none'>
                <Image src="/images/bg.jpg" alt="Hero Background" layout="fill" objectFit="cover" className="object-cover opacity-50" />
            </div>

      <header className='w-full text-wood-50 p-4'>
        <TransitionLink href={"/"} className="flex flex-col items-center">
        <p className="font-ragas font-black text-3xl pointer-events-none select-none">
          PIZZA
          <span className="text-transparent bg-gradient-to-r from-anzac-400 to-anzac-300 bg-clip-text">
            R.3IO
          </span>
        </p>
          
        </TransitionLink>
      </header>
        <div className='relative flex items-start gap-6 w-full max-w-7xl mt-4'>
          <section className="flex-1">
            <CheckoutDetails />
          </section>
          <section className="flex-1 sticky top-24">
            <CheckoutTable />
            
          </section>

        </div>
    </section>
  )
}

export default page