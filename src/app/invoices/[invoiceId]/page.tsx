import { eq, isNull } from 'drizzle-orm';
import { notFound } from 'next/navigation';

import { auth } from '@clerk/nextjs/server';
import { and } from 'drizzle-orm';

import { db } from '@/db';
import { Invoices, Customers } from '@/db/schema';

import Invoice from '@/app/invoices/[invoiceId]/invoice';

export default async function InvoicePage({
    params,
}: {
    params: { invoiceId: string };
}) {
    const { userId, orgId } = await auth();
    if (!userId) return;

    const paramsResult = await params;
    const invoiceId = parseInt(paramsResult.invoiceId);

    if (isNaN(invoiceId)) {
        throw new Error('Invalid invoice ID');
    }

    let result;
    if (orgId) {
        [result] = await db
            .select()
            .from(Invoices)
            .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
            .where(
                and(
                    eq(Invoices.id, invoiceId),
                    eq(Invoices.organizationId, orgId)
                )
            )
            .limit(1); // Invoices.id - где ищем, invoiceId что ищем
    } else {
        [result] = await db
            .select()
            .from(Invoices)
            .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
            .where(
                and(
                    eq(Invoices.id, invoiceId),
                    eq(Invoices.userId, userId),
                    isNull(Invoices.organizationId)
                )
            )
            .limit(1); // Invoices.id - где ищем, invoiceId что ищем
    }

    if (!result) {
        notFound();
    }

    const invoiceResult = {
        ...result.invoices,
        customer: result.customers,
    };

    /* return <Invoice invoice={result} />; */
    return <Invoice invoice={invoiceResult} />;
}
