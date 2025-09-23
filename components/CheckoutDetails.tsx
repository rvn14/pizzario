/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useFormStore } from '@/lib/formStore'

// Zod schema: required fields and conditional card detail requirement for online payment
const checkoutSchema = z
  .object({
    email: z.string().email(),
    fullName: z.string().min(1),
    address: z.string().min(1),
    street: z.string().optional(),
    city: z.string().min(1),
    province: z.string().optional(),
    zip: z.string().min(1),
    country: z.string().min(1),
    paymentMethod: z.enum(['cod', 'online']),
    cardNumber: z.string().optional(),
    expiration: z.string().optional(),
    cvc: z.string().optional(),
    billingSame: z.boolean().optional(),
  })
  .refine(
    (data) =>
      data.paymentMethod === 'cod' ||
      (data.cardNumber && data.cardNumber.trim() !== '' && data.expiration && data.expiration.trim() !== '' && data.cvc && data.cvc.trim() !== ''),
    {
      message: 'Card details are required for online payment',
      path: ['cardNumber'],
    }
  )

type FormValues = {
  email: string
  fullName: string
  address: string
  street?: string
  city: string
  province?: string
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
    resolver: zodResolver(checkoutSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      fullName: '',
      address: '',
      street: '',
      city: '',
      province: '',
      zip: '',
      country: 'Sri Lanka',
      paymentMethod: 'cod',
      cardNumber: '',
      expiration: '',
      cvc: '',
      billingSame: true,
    },
  })

  const paymentMethod = form.watch('paymentMethod')

  const formStore = useFormStore();

  useEffect(() => {
    const subscription = form.watch((values) => {
      if (form.formState.isValid) {
        formStore.setFormValues(values as FormValues);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, formStore]);

  return (
    <div className="w-full max-w-3xl space-y-6 font-poppins">
      <div className="rounded-md overflow-hidden">
        <div className="bg-wood-900 text-wood-100 px-6 py-3 font-bold text-lg">CUSTOMER INFO <span className="float-right text-xs opacity-80">*</span></div>
        <div className="bg-wood-300 p-6">
          <Form {...form}>
            <form className="space-y-4">
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

      <div className="rounded-md overflow-hidden">
        <div className="bg-wood-900 text-wood-100 px-6 py-3 font-bold text-lg">SHIPPING ADDRESS <span className="float-right text-xs opacity-80">*</span></div>
        <div className="bg-wood-300 p-6 space-y-4">
          <Form {...form}>
            <form className="space-y-4">
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
                name="address"
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
                name="street"
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
                    name="province"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-wood-900">STATE/PROVINCE</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter province" className="rounded-full bg-wood-200 border-amber-600" />
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

              <div className="flex justify-between items-center pt-2">
                <div className="text-sm text-wood-900">* REQUIRED</div>
              </div>
            </form>
          </Form>
        </div>
      </div>

      <div className="rounded-md overflow-hidden">
        <div className="bg-wood-900 text-wood-100 px-6 py-3 font-bold text-lg">PAYMENT INFO <span className="float-right text-xs opacity-80">*</span></div>
        <div className="bg-wood-300 p-6 space-y-4">
          <Form {...form}>
            <form className="space-y-4">
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


