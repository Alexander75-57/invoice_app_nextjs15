import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

import { db } from '@/db';
import { Invoices } from '@/db/schema';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default async function InvoicePage({
    params,
}: {
    params: { invoiceId: string };
}) {
    const invoiceId = await parseInt(params.invoiceId);

    const [result] = await db
        .select()
        .from(Invoices)
        .where(eq(Invoices.id, invoiceId))
        .limit(1); // Invoices.id - где ищем, invoiceId что ищем

    if (!result) {
        notFound();
    }

    return (
        <main className="h-full max-w-5xl mx-auto my-12">
            <div className="flex justify-between mb-8">
                <h1 className="flex items-center gap-4 text-3xl font-semibold">
                    Invoice #{invoiceId}
                    <Badge
                        className={cn(
                            'rounded-full capitalize',
                            result.status === 'open' && 'bg-blue-500',
                            result.status === 'paid' && 'bg-green-600',
                            result.status === 'void' && 'bg-zinc-700',
                            result.status === 'uncollectible' && 'bg-red-600'
                        )}
                    >
                        {result.status}
                    </Badge>
                </h1>
                <p></p>
            </div>
            <p className="text-3xl mb-3">${(result.value / 100).toFixed(2)}</p>
            <p className="text-lg mb-8">{result.description}</p>
            <h2 className="font-bold text-lg mb-4">Billing Details</h2>
            <ul className="flex gap-4">
                <li className="flex gap-4">
                    <strong className="block w-28 flex-shrink-0 font-medium text-sm">
                        Invoice ID
                    </strong>
                    <span>{invoiceId}</span>
                </li>
                <li className="flex gap-4">
                    <strong className="block w-28 flex-shrink-0 font-medium text-sm">
                        Invoice Date
                    </strong>
                    <span>
                        {new Date(result.createTS).toLocaleDateString()}
                    </span>
                </li>
                <li className="flex gap-4">
                    <strong className="block w-28 flex-shrink-0 font-medium text-sm">
                        Billing Name
                    </strong>
                    <span></span>
                </li>
                <li className="flex gap-4">
                    <strong className="block w-28 flex-shrink-0 font-medium text-sm">
                        Billing Email
                    </strong>
                    <span></span>
                </li>
            </ul>
        </main>
    );
}
