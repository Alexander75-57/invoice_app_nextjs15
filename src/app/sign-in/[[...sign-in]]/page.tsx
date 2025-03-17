// import { SignIn } from '@clerk/nextjs';

// import Container from '@/components/Container';

// export default function Page() {
//     return (
//         <Container className="flex justify-center">
//             <SignIn />
//         </Container>
//     );
// }

// ==============================================

'use client';

import * as Clerk from '@clerk/elements/common';
import * as SignIn from '@clerk/elements/sign-in';
import Link from 'next/link';

import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function SignInPage() {
    return (
        <div className="relative grid w-full flex-grow items-center px-4 sm:justify-center">
            <SignIn.Root>
                <SignIn.Step
                    name="start"
                    className="relative isolate w-full space-y-8 rounded-2xl bg-emerald-950 px-4 py-10 shadow-md ring-1 ring-inset ring-white/10 before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-black/50 sm:w-96 sm:px-8"
                >
                    <header className="text-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 40 40"
                            className="mx-auto size-10"
                        >
                            <mask
                                id="a"
                                width="40"
                                height="40"
                                x="0"
                                y="0"
                                maskUnits="userSpaceOnUse"
                            >
                                <circle cx="20" cy="20" r="20" fill="#D9D9D9" />
                            </mask>
                            <g fill="#34D399" mask="url(#a)">
                                <path d="M43.5 3a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46V2ZM43.5 8a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46V7ZM43.5 13a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 18a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 23a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 28a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 33a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 38a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1Z" />
                                <path d="M27 3.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM25 8.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM23 13.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM21.5 18.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM20.5 23.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM22.5 28.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM25 33.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM27 38.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2Z" />
                            </g>
                        </svg>
                        <h1 className="mt-4 text-xl font-medium tracking-tight text-white">
                            Sign in to Training-Invoice-App
                        </h1>
                    </header>
                    <Clerk.GlobalError className="block text-sm text-rose-400" />
                    <Clerk.Field
                        name="identifier"
                        className="group/field relative"
                    >
                        <Clerk.Label className="absolute left-2 top-0 -translate-y-1/2 bg-emerald-950 px-2 font-mono text-xs/4 text-white before:absolute before:inset-0 before:-z-10 before:bg-black/50 group-focus-within/field:text-emerald-300 group-data-[invalid]/field:text-rose-400">
                            Email address
                        </Clerk.Label>
                        <Clerk.Input
                            type="text"
                            required
                            className="w-full rounded-lg bg-transparent px-4 py-2.5 text-sm text-white outline-none ring-1 ring-inset ring-white/20 hover:ring-white/30 focus:shadow-[0_0_6px_0] focus:shadow-emerald-500/20 focus:ring-[1.5px] focus:ring-emerald-300 data-[invalid]:shadow-rose-400/20 data-[invalid]:ring-rose-400"
                        />
                        <Clerk.FieldError className="mt-2 block text-xs text-rose-400" />
                    </Clerk.Field>
                    <Clerk.Field
                        name="password"
                        className="group/field relative"
                    >
                        <Clerk.Label className="absolute left-2 top-0 -translate-y-1/2 bg-emerald-950 px-2 font-mono text-xs/4 text-white before:absolute before:inset-0 before:-z-10 before:bg-black/50 group-focus-within/field:text-emerald-300 group-data-[invalid]/field:text-rose-400">
                            Password
                        </Clerk.Label>
                        <Clerk.Input
                            type="password"
                            required
                            className="w-full rounded-lg bg-transparent px-4 py-2.5 text-sm text-white outline-none ring-1 ring-inset ring-white/20 hover:ring-white/30 focus:shadow-[0_0_6px_0] focus:shadow-emerald-500/20 focus:ring-[1.5px] focus:ring-emerald-300 data-[invalid]:shadow-rose-400/20 data-[invalid]:ring-rose-400"
                        />
                        <Clerk.FieldError className="mt-2 block text-xs text-rose-400" />
                    </Clerk.Field>
                    <SignIn.Action
                        submit
                        className="relative isolate w-full rounded-lg bg-gradient-to-b from-emerald-400 to-emerald-500 px-3.5 py-2.5 text-center text-sm font-medium text-emerald-950 shadow-[0_1px_0_0_theme(colors.white/30%)_inset,0_-1px_1px_0_theme(colors.black/5%)_inset] outline-none before:absolute before:inset-0 before:-z-10 before:rounded-lg before:bg-white/10 before:opacity-0 hover:before:opacity-100 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-white active:text-emerald-950/80 active:before:bg-black/10"
                    >
                        Sign In
                    </SignIn.Action>
                    <p className="text-center">
                        <SignIn.Passkey asChild>
                            <Button className="w-full" variant="outline">
                                Continue with Passkey
                            </Button>
                        </SignIn.Passkey>
                    </p>
                    <p className="text-center text-sm text-white/60">
                        No account?{' '}
                        <Link
                            href={String(
                                process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL
                            )}
                            className="text-white decoration-white/30 underline-offset-4 outline-none hover:underline focus-visible:underline"
                        >
                            Create an account
                        </Link>
                    </p>
                </SignIn.Step>
                <SignIn.Step
                    name="verifications"
                    className="relative isolate w-full space-y-8 rounded-2xl bg-emerald-950 px-4 py-10 shadow-md ring-1 ring-inset ring-white/10 before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-black/50 sm:w-96 sm:px-8"
                >
                    <header className="text-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 40 40"
                            className="mx-auto size-10"
                        >
                            <mask
                                id="a"
                                width="40"
                                height="40"
                                x="0"
                                y="0"
                                maskUnits="userSpaceOnUse"
                            >
                                <circle cx="20" cy="20" r="20" fill="#D9D9D9" />
                            </mask>
                            <g fill="#34D399" mask="url(#a)">
                                <path d="M43.5 3a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46V2ZM43.5 8a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46V7ZM43.5 13a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 18a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 23a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 28a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 33a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 38a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1Z" />
                                <path d="M27 3.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM25 8.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM23 13.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM21.5 18.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM20.5 23.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM22.5 28.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM25 33.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM27 38.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2Z" />
                            </g>
                        </svg>
                        <h1 className="mt-4 text-xl font-medium tracking-tight text-white">
                            Verify phone code
                        </h1>
                    </header>
                    <Clerk.GlobalError className="block text-sm text-rose-400" />
                    <SignIn.Strategy name="phone_code">
                        <Clerk.Field
                            name="code"
                            className="group/field relative"
                        >
                            <Clerk.Label className="absolute left-2 top-0 -translate-y-1/2 bg-emerald-950 px-2 font-mono text-xs/4 text-white before:absolute before:inset-0 before:-z-10 before:bg-black/50 group-focus-within/field:text-emerald-300 group-data-[invalid]/field:text-rose-400">
                                Phone code
                            </Clerk.Label>
                            {/* <Clerk.Input
                                type="otp"
                                required
                                className="w-full rounded-lg bg-transparent px-4 py-2.5 text-sm text-white outline-none ring-1 ring-inset ring-white/20 hover:ring-white/30 focus:shadow-[0_0_6px_0] focus:shadow-emerald-500/20 focus:ring-[1.5px] focus:ring-emerald-300 data-[invalid]:shadow-rose-400/20 data-[invalid]:ring-rose-400"
                            /> */}
                            <Clerk.Input
                                type="otp"
                                required
                                className="flex justify-center gap-1"
                                render={({ value, status }) => (
                                    <div
                                        data-status={status}
                                        className="relative h-9 w-8 rounded-md bg-white ring-1 ring-inset ring-zinc-300 data-[status=selected]:bg-sky-400/10 data-[status=selected]:shadow-[0_0_8px_2px_theme(colors.sky.400/30%)] data-[status=selected]:ring-sky-400"
                                    >
                                        <AnimatePresence>
                                            {value && (
                                                <motion.span
                                                    initial={{
                                                        opacity: 0,
                                                        scale: 0.75,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        scale: 1,
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        scale: 0.75,
                                                    }}
                                                    className="absolute inset-0 flex items-center justify-center text-zinc-950"
                                                >
                                                    {value}
                                                </motion.span>
                                            )}
                                            {value}
                                        </AnimatePresence>
                                        {status === 'cursor' && (
                                            <motion.div
                                                layoutId="otp-input-focus"
                                                transition={{
                                                    ease: [0.2, 0.4, 0, 1],
                                                    duration: 0.2,
                                                }}
                                                className="absolute inset-0 z-10 rounded-[inherit] border border-sky-400 bg-sky-400/10 shadow-[0_0_8px_2px_theme(colors.sky.400/30%)]"
                                            />
                                        )}
                                    </div>
                                )}
                            />
                            {/* ************* */}
                            <Clerk.FieldError className="mt-2 block text-xs text-rose-400" />
                        </Clerk.Field>
                        <SignIn.Action
                            submit
                            className="relative isolate w-full rounded-lg bg-gradient-to-b from-emerald-400 to-emerald-500 px-3.5 py-2.5 text-center text-sm font-medium text-emerald-950 shadow-[0_1px_0_0_theme(colors.white/30%)_inset,0_-1px_1px_0_theme(colors.black/5%)_inset] outline-none before:absolute before:inset-0 before:-z-10 before:rounded-lg before:bg-white/10 before:opacity-0 hover:before:opacity-100 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-white active:text-emerald-950/80 active:before:bg-black/10"
                        >
                            Continue
                        </SignIn.Action>
                    </SignIn.Strategy>
                    <p className="text-center text-sm text-white/60">
                        No account?{' '}
                        <Link
                            href={String(
                                process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL
                            )}
                            className="text-white decoration-white/30 underline-offset-4 outline-none hover:underline focus-visible:underline"
                        >
                            Create an account
                        </Link>
                    </p>
                </SignIn.Step>
            </SignIn.Root>
        </div>
    );
}
