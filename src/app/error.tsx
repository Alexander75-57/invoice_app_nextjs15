'use client'; // Error boundaries must be Client Components

import NextError from 'next/error';

export default function Error({ error }: { error: Error }) {
    return <NextError statusCode={500} title={error.message} />;
}
