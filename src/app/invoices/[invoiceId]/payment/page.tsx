import { Customers, Invoices } from '@/db/schema';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Container from '@/components/Container';
import { and, eq, isNull } from 'drizzle-orm';

import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CreditCard, Check } from 'lucide-react';
import { createPayment, updateStatusAction } from '@/app/actions';
import Stripe from 'stripe';

const stripe = new Stripe(String(process.env.STRIPE_API_SECRET_KEY));

interface InvoicePageProps {
    params: { invoiceId: string };
    searchParams: {
        status: string;
        session_id: string;
    };
}

export default async function InvoicePage({
    params, // { invoiceId: string }
    searchParams, // { status: string, session_id: string }
}: /* {params: { invoiceId: string };}*/ InvoicePageProps) {
    const data = await params;
    const invoiceId = parseInt(data.invoiceId);

    const searchParamsResult = await searchParams;

    const sessionId = searchParamsResult.session_id;
    const isSuccess = sessionId && searchParamsResult.status === 'success';
    const isCanceled = searchParamsResult.status === 'canceled';
    const isError = !sessionId;

    if (isNaN(invoiceId)) {
        throw new Error('Invalid invoice ID');
    }

    if (isSuccess) {
        const result = await stripe.checkout.sessions.retrieve(sessionId); // this line from 'https://docs.stripe.com/payments/checkout/custom-success-page?payment-ui=embedded-form&client=react'
        console.log('result', result);

        const formData = new FormData();
        formData.append('id', invoiceId.toString());
        formData.append('status', 'paid');
        await updateStatusAction(formData);
    }

    const [result] = await db
        .select({
            id: Invoices.id,
            status: Invoices.status,
            createTS: Invoices.createTS,
            description: Invoices.description,
            value: Invoices.value,
            name: Customers.name,
        })
        .from(Invoices)
        .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
        .where(eq(Invoices.id, invoiceId))
        .limit(1); // Invoices.id - где ищем, invoiceId что ищем

    if (!result) {
        notFound();
    }

    const invoiceResult = {
        ...result,
        customer: {
            name: result.name,
        },
    };

    return (
        <main className="w-full h-full">
            <Container>
                {isError && (
                    <p className="bg-red-100 text-sm text-red-800 text-center px-3 py-2 rounded-lg mb-6">
                        Something went wrong, please try again
                    </p>
                )}
                <div className="grid grid-cols-2">
                    <div>
                        <div className="flex justify-between mb-8">
                            <h1 className="flex items-center gap-4 text-3xl font-semibold">
                                Invoice #{invoiceResult.id}
                                <Badge
                                    className={cn(
                                        'rounded-full capitalize',
                                        invoiceResult.status === 'open' &&
                                            'bg-blue-500',
                                        invoiceResult.status === 'paid' &&
                                            'bg-green-600',
                                        invoiceResult.status === 'void' &&
                                            'bg-zinc-700',
                                        invoiceResult.status ===
                                            'uncollectible' && 'bg-red-600'
                                    )}
                                >
                                    {invoiceResult.status}
                                </Badge>
                            </h1>
                        </div>
                        <p className="text-3xl mb-3">
                            ${(invoiceResult.value / 100).toFixed(2)}
                        </p>
                        <p className="text-lg mb-8">
                            {invoiceResult.description}
                        </p>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mb-4">
                            Manage Invoice
                        </h2>
                        {invoiceResult.status === 'open' && (
                            <form action={createPayment}>
                                <input
                                    type="hidden"
                                    name="id"
                                    value={invoiceResult.id}
                                />
                                <Button className="flex gap-2 font-bold bg-green-700">
                                    <CreditCard className="w-5 h-auto" />
                                    Pay Invoice
                                </Button>
                            </form>
                        )}
                        {invoiceResult.status === 'paid' && (
                            <p className="flex gap-2 items-center text-xl font-bold">
                                <Check className="w-8 h-auto bg-green-500 rounded-full text-white p-1" />
                                Invoice Paid
                            </p>
                        )}
                    </div>
                </div>

                <h2 className="font-bold text-lg mb-4">Billing Details</h2>
                <ul className="grid gap-4">
                    <li className="flex gap-4">
                        <strong className="block w-28 flex-shrink-0 font-medium text-sm">
                            Invoice ID
                        </strong>
                        <span>{invoiceResult.id}</span>
                    </li>
                    <li className="flex gap-4">
                        <strong className="block w-28 flex-shrink-0 font-medium text-sm">
                            Invoice Date
                        </strong>
                        <span>
                            {new Date(
                                invoiceResult.createTS
                            ).toLocaleDateString()}
                        </span>
                    </li>
                    <li className="flex gap-4">
                        <strong className="block w-28 flex-shrink-0 font-medium text-sm">
                            Billing Name
                        </strong>
                        <span>{invoiceResult.customer.name}</span>
                    </li>
                </ul>
            </Container>
        </main>
    );
}
