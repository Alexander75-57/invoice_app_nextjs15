'use server';

import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { Invoices, Status } from '@/db/schema';
import { db } from '@/db';

export async function createAction(formData: FormData) {
    const { userId, redirectToSignIn } = await auth();

    const value = Math.floor(parseFloat(String(formData.get('value'))) * 100);
    const description = formData.get('descriptions') as string;

    if (!userId) return redirectToSignIn();

    const results = await db
        .insert(Invoices)
        .values({
            value,
            description,
            userId,
            status: 'open',
        })
        .returning({
            id: Invoices.id,
        });

    redirect(`/invoices/${results[0].id}`);
}

export async function updateStatusAction(formData: FormData) {
    const { userId } = await auth();
    if (!userId) return;

    const id = formData.get('id') as string;
    const status = formData.get('status') as Status;

    const results = await db
        .update(Invoices)
        .set({
            status,
        })
        .where(and(eq(Invoices.id, parseInt(id)), eq(Invoices.userId, userId)));

    revalidatePath(`/invoices/${id}`, 'page');
}
