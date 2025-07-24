import CheckoutTable from '@/components/CheckoutTable'
import React from 'react'

const page = () => {

  //check if authenticated

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-zinc-900 flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-tomato mb-8 text-center drop-shadow-lg">
          Checkout
        </h1>
        <div className="shadow-2xl rounded-xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-md p-6">
          <CheckoutTable />
        </div>
      </div>
    </div>
  )
}

export default page