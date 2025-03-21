import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublick = createRouteMatcher([
    '/',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/invoices/(.*)/payment',
]);

// const isProtectedRoute = createRouteMatcher([
//     '/dashboard',
//     '/invoices/:invoiceId',
//     '/invoices/new',
// ]);

export default clerkMiddleware((auth, request) => {
    if (!isPublick(request)) {
        auth();
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
