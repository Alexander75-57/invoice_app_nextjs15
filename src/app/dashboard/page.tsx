import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { CirclePlus } from 'lucide-react';
import Link from 'next/link';

import { db } from '@/db';
import { Invoices } from '@/db/schema';
import { cn } from '@/lib/utils';
import Container from '@/components/Container';

export default async function Home() {
    const results = await db.select().from(Invoices);
    return (
        <main className="h-full my-12">
            <Container>
                <div className="flex justify-between mb-6">
                    <h1 className="text-3xl font-bold">Invoices</h1>
                    <p>
                        <Button
                            className="inline-flex gap-2"
                            variant="ghost"
                            asChild
                        >
                            <Link href="/invoices/new">
                                <CirclePlus className="h-4 w-4" />
                                Create Invoice
                            </Link>
                        </Button>
                    </p>
                </div>
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px] p-4">
                                Date
                            </TableHead>
                            <TableHead className="p-4">Customer</TableHead>
                            <TableHead className="p-4">Email</TableHead>
                            <TableHead className="text-center p-4">
                                Status
                            </TableHead>
                            <TableHead className="text-right p-4">
                                Value
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {results.map((result) => {
                            return (
                                <TableRow key={result.id}>
                                    <TableCell className="text-left font-medium p-0">
                                        <Link
                                            href={`./invoices/${result.id}`}
                                            className="font-semibold block p-4"
                                        >
                                            {new Date(
                                                result.createTS
                                            ).toLocaleDateString()}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="text-left  p-0">
                                        <Link
                                            href={`./invoices/${result.id}`}
                                            className="font-semibold block p-4"
                                        >
                                            Alex J. F.
                                        </Link>
                                    </TableCell>
                                    <TableCell className="text-left p-0">
                                        <Link
                                            href={`./invoices/${result.id}`}
                                            className="block p-4"
                                        >
                                            alex@mail.com
                                        </Link>
                                    </TableCell>
                                    <TableCell className="text-center p-0">
                                        <Link
                                            href={`./invoices/${result.id}`}
                                            className="block p-4"
                                        >
                                            <Badge
                                                className={cn(
                                                    'rounded-full capitalize',
                                                    result.status === 'open' &&
                                                        'bg-blue-500',
                                                    result.status === 'paid' &&
                                                        'bg-green-600',
                                                    result.status === 'void' &&
                                                        'bg-zinc-700',
                                                    result.status ===
                                                        'uncollectible' &&
                                                        'bg-red-600'
                                                )}
                                            >
                                                {result.status}
                                            </Badge>
                                        </Link>
                                    </TableCell>
                                    <TableCell className="text-right p-0">
                                        <Link
                                            href={`./invoices/${result.id}`}
                                            className="font-semibold block p-4"
                                        >
                                            ${(result.value / 100).toFixed(2)}
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Container>
        </main>
    );
}
