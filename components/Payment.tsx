import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const Payment = () => (
  <div className="bg-zinc-950/90 p-8 flex flex-col justify-between h-full min-h-[400px] md:rounded-r-xl w-full">
    <div className="flex-1 flex flex-col w-full">
      <h2 className="text-2xl font-clash-semibold text-white/90 mb-6 tracking-wide">
        Payment
      </h2>
      <Tabs defaultValue="cod" className="w-full flex-1 flex flex-col">
        <TabsList className="bg-zinc-800/80 w-full">
          <TabsTrigger value="cod" className="w-1/2 text-white data-[state=active]:bg-tomato data-[state=active]:text-zinc-900 cursor-pointer">
            Cash On Delivery
          </TabsTrigger>
          <TabsTrigger value="online" className="w-1/2 text-white data-[state=active]:bg-tomato data-[state=active]:text-zinc-900 cursor-pointer">
            Online Payment
          </TabsTrigger>
        </TabsList>
        <TabsContent value="cod" className="mt-6 w-full">
          <div className="text-zinc-300 mb-8">
            Pay with cash when your order is delivered.
          </div>
        </TabsContent>
        <TabsContent value="online" className="mt-6 w-full">
          <div className="flex gap-4 mb-6 w-full">
            <Button variant="outline" className="flex-1 bg-zinc-800/80 text-white border-zinc-700 hover:bg-zinc-700 min-w-0">
              <svg className="w-5 h-5 mr-2 inline" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10zm-7.5-2.5h-2V7h2v2.5zm0 7h-2v-5h2v5z"/></svg>
              PayPal
            </Button>
            <Button variant="outline" className="flex-1 bg-zinc-800/80 text-white border-zinc-700 hover:bg-zinc-700 min-w-0">
              <svg className="w-8 h-5 mr-2 inline" viewBox="0 0 48 32" fill="none"><rect width="48" height="32" rx="6" fill="#fff"/><text x="24" y="21" textAnchor="middle" fontSize="14" fill="#1a1a1a" fontFamily="Arial">VISA</text></svg>
              Card
            </Button>
          </div>
          <form className="space-y-4 w-full">
            <input type="text" placeholder="Cardholder Name" className="w-full px-4 py-2 rounded bg-zinc-800/80 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-tomato"/>
            <input type="text" placeholder="Card Number" className="w-full px-4 py-2 rounded bg-zinc-800/80 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-tomato"/>
            <div className="flex gap-4 w-full">
              <input type="text" placeholder="Exp. Date" className="flex-1 px-4 py-2 rounded bg-zinc-800/80 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-tomato"/>
              <input type="text" placeholder="CVV" className="flex-1 px-4 py-2 rounded bg-zinc-800/80 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-tomato"/>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </div>
    <Button className="w-full mt-10 bg-tomato hover:bg-tomato/80 text-zinc-900 font-bold py-3 text-lg rounded transition-all cursor-pointer">
      CHECKOUT &rarr;
    </Button>
  </div>
);

export default Payment;
