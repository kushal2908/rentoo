'use client';
import { APP_ROUTE } from '@/lib/routes';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="min-h-auto relative flex flex-col justify-center items-center py-36 bg-pattern">
            <div className="absolute inset-0 bg-blue-50/10 backdrop-blur-md flex items-center justify-center" />

            <div className="bg-primary/5 z-1 rounded-lg ">
                <div className="w-[300px] bg-white shadow z-1 rounded-lg">
                    <div className="px-6 py-4 rounded-bl-lg rounded-br-lg">
                        <div className="text-center mt-4 mb-8">
                            <Image src="/logo.png" width={100} height={100} alt="logo" className="mx-auto object-contain mb-4" />
                            <h2 className="text-2xl font-bold text-zinc-800 mb-2">
                                {' '}
                                {pathname === APP_ROUTE.SIGNIN ? 'Signin' : 'Signup'}{' '}
                            </h2>
                            <p className="text-sm font-medium text-zinc-600">
                                {' '}
                                {pathname === APP_ROUTE.SIGNIN
                                    ? 'Welcome back! Please sign in to continue'
                                    : 'Welcome! Please fill in the details to get started.'}
                            </p>
                        </div>
                        {children}
                    </div>
                </div>
                <div className="w-[300px]  text-center shadow-lg py-6 rounded-bl-lg rounded-br-lg">
                    {pathname === APP_ROUTE.SIGNIN ? (
                        <div className="text-sm text-center font-semibold ">
                            <Link href={APP_ROUTE.SIGNUP} className="text-blue-500 hover:underline">
                                Don't have an account? Sign up
                            </Link>
                        </div>
                    ) : (
                        <div className="text-sm text-center font-semibold ">
                            <Link href={APP_ROUTE.SIGNIN} className="text-blue-500 hover:underline">
                                Already have an account? Sign in
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
