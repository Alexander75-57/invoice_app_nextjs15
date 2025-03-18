import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

import { auth } from '@clerk/nextjs/server';
import { and } from 'drizzle-orm';

import { db } from '@/db';
import { Invoices } from '@/db/schema';

import Invoice from '@/app/invoices/[invoiceId]/invoice';

export default async function InvoicePage({
    params,
}: {
    params: { invoiceId: string };
}) {
    const { userId } = await auth();
    if (!userId) return;

    const invoiceId = await parseInt(params.invoiceId);

    const [result] = await db
        .select()
        .from(Invoices)
        .where(and(eq(Invoices.id, invoiceId), eq(Invoices.userId, userId)))
        .limit(1); // Invoices.id - где ищем, invoiceId что ищем

    if (!result) {
        notFound();
    }

    return <Invoice invoice={result} />;
}
