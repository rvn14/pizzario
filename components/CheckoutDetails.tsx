'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
// Adjust these paths to match your shadcn/ui exports
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

type FormValues = {
  email: string
  fullName: string
  street1: string
  street2?: string
  city: string
  state?: string
  zip: string
  country: string
  paymentMethod: 'cod' | 'online'
  cardNumber?: string
  expiration?: string
  cvc?: string
  billingSame?: boolean
}

export default function CheckoutDetails() {
  const form = useForm<FormValues>({
    defaultValues: {
      email: '',
      fullName: '',
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip: '',
      country: 'United States',
      paymentMethod: 'cod',
      cardNumber: '',
      expiration: '',
      cvc: '',
      billingSame: true,
    },
  })

  const paymentMethod = form.watch('paymentMethod')

  function onSubmit(values: FormValues) {
    // replace with real submit handler
    console.log('checkout details', values)
  }

  return (
    <div className="w-full max-w-3xl space-y-6 font-poppins">
      {/* CUSTOMER INFO */}
      <div className="rounded-md overflow-hidden">
        <div className="bg-wood-900 text-wood-100 px-6 py-3 font-bold text-lg">CUSTOMER INFO <span className="float-right text-xs opacity-80">*</span></div>
        <div className="bg-wood-300 p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-wood-900">EMAIL*</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter email address" className="rounded-full bg-wood-200 " />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>

      {/* SHIPPING ADDRESS */}
      <div className="rounded-md overflow-hidden">
        <div className="bg-wood-900 text-wood-100 px-6 py-3 font-bold text-lg">SHIPPING ADDRESS <span className="float-right text-xs opacity-80">*</span></div>
        <div className="bg-wood-300 p-6 space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-wood-900">FULL NAME*</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter full name" className="rounded-full bg-wood-200 border-amber-600" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="street1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-wood-900">STREET ADDRESS*</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter street address" className="rounded-full bg-wood-200 border-amber-600" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="street2"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="APT, SUITE, ETC. (optional)" className="rounded-full bg-wood-200 border-amber-600" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-5">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-wood-900">CITY*</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter city" className="rounded-full bg-wood-200 border-amber-600" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-4">
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-wood-900">STATE/PROVINCE</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter state" className="rounded-full bg-wood-200 border-amber-600" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-3">
                  <FormField
                    control={form.control}
                    name="zip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-wood-900">ZIP/POSTAL CODE*</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter ZIP" className="rounded-full bg-wood-200 border-amber-600" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-wood-900">COUNTRY*</FormLabel>
                    <FormControl>
                      <Select onValueChange={(v) => field.onChange(v)} defaultValue={field.value}>
                        <SelectTrigger className="rounded-full bg-wood-200 w-full">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="United States">Sri Lanka</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-between items-center pt-2">
                <div className="text-sm text-wood-900">* REQUIRED</div>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* PAYMENT INFO */}
      <div className="rounded-md overflow-hidden">
        <div className="bg-wood-900 text-wood-100 px-6 py-3 font-bold text-lg">PAYMENT INFO <span className="float-right text-xs opacity-80">*</span></div>
        <div className="bg-wood-300 p-6 space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-wood-900">PAYMENT METHOD</FormLabel>
                    <FormControl>
                      <Tabs value={field.value} onValueChange={(v) => field.onChange(v)} className="w-full">
                        <TabsList className="rounded-full bg-wood-200 p-1 inline-flex">
                          <TabsTrigger value="cod" className={`rounded-full px-4 py-2 ${field.value === 'cod' ? 'bg-wood-200 ' : 'bg-transparent'}`}>
                            Cash on Delivery
                          </TabsTrigger>
                          <TabsTrigger value="online" className={`rounded-full px-4 py-2 ${field.value === 'online' ? 'bg-wood-200' : 'bg-transparent'}`}>
                            Online Payment
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </FormControl>
                  </FormItem>
                )}
              />

              {paymentMethod === 'online' && (
                <>
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-wood-900">CARD NUMBER*</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="1234 1234 1234 1234" className="rounded-full bg-wood-200" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                      <FormField
                        control={form.control}
                        name="expiration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm text-wood-900">EXPIRATION DATE*</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="MM / YY" className="rounded-full bg-wood-200" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-6">
                      <FormField
                        control={form.control}
                        name="cvc"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm text-wood-900">SECURITY CODE*</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="CVC" className="rounded-full bg-wood-200" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="billingSame"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={!!field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            className="w-5 h-5 rounded"
                          />
                        </FormControl>
                        <FormLabel className="text-sm text-wood-900">BILLING ADDRESS SAME AS SHIPPING</FormLabel>
                      </FormItem>
                    )}
                  />
                </>
              )}

              <div className="flex justify-between items-center pt-2">
                <div className="text-sm text-wood-900">* REQUIRED</div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

