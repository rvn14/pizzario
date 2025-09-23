import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import Order from '@/app/emails/Order';

export async function POST(request: Request) {
	const apiKey = process.env.RESEND_API_KEY;
	if (!apiKey) {
		return NextResponse.json({ error: 'RESEND_API_KEY is not set in environment' }, { status: 500 });
	}

	const resend = new Resend(apiKey);

	try {
		const body = await request.json();
		const { items, subtotal, taxes, totalPrice, formValues } = body;

		const orderId = `ORD-${Date.now()}`;
		const customerName = formValues?.fullName || 'Customer';
		const address = `${formValues?.address || ''}${formValues?.street ? `, ${formValues.street}` : ''}, ${formValues?.city || ''}, ${formValues?.province || ''} ${formValues?.zip || ''}`.trim();

		const data = await resend.emails.send({
			from: process.env.EMAIL_FROM ?? 'Pizzario <onboarding@resend.dev>',
			to: [formValues?.email || 'dasunadithya123@gmail.com'],
			subject: 'Order Confirmation',
			react: Order({
				items,
				orderId,
				customerName,
				address: address || undefined,
				subtotal,
				taxes,
				totalPrice
			}),
		});

		return NextResponse.json(data);
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		const stack = err instanceof Error && err.stack ? err.stack : undefined;
		return NextResponse.json({ error: message, stack }, { status: 500 });
	}
}