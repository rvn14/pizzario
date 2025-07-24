import CheckoutTable from '@/components/CheckoutTable'
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import React from 'react'

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
    <div className="min-h-screen font-general bg-gradient-to-br from-zinc-950 to-zinc-900 flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl">
        <h1 className="text-5xl font-clash-semibold text-white/80 mb-8 text-center drop-shadow-lg">
          Order Checkout
        </h1>
        <div className="shadow-2xl rounded-xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-md p-6">
          <CheckoutTable />
        </div>
        <div className="mt-4">
        </div>
      </div>
    </div>
  )
}

export default page