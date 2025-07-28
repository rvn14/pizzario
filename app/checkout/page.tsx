import CheckoutTable from '@/components/CheckoutTable'
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import React from 'react'
import Payment from '@/components/Payment';


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
    <div className="min-h-screen font-general bg-gradient-to-br from-zinc-950 to-zinc-900 flex items-center justify-center px-4 py-28">
      <div className="w-full max-w-7xl h-full grid grid-cols-1 md:grid-cols-5 gap-0 shadow-2xl rounded-xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-md p-0 overflow-hidden">
        {/* Cart Summary */}
        <div className="flex flex-col justify-between bg-zinc-900/90 p-8 md:col-span-3 md:rounded-l-xl h-full">
          <div>
            <h2 className="text-2xl font-clash-semibold text-white/90 mb-6 tracking-wide">
              Shopping Cart
            </h2>
            <CheckoutTable />
          </div>
        </div>
        {/* Payment Section */}
        <div className="md:col-span-2 w-full flex items-stretch h-full">
          <Payment />
        </div>
      </div>
    </div>
  )
}

export default page