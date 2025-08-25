'use client';
import useAuth from '@/hooks/use-auth';
import { APP_ROUTE } from '@/lib/routes';
import Image from 'next/image';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthenticated = useAuth();
    if (isAuthenticated) {
        redirect('/');
    }
    return (
        <div className="min-h-screen relative flex flex-col justify-center items-center py-36 bg-gray-50">
            <div
                className="absolute inset-0 bg-gradient-to-br from-amber-400/90 to-blue-100/90 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"
                style={{
                    backgroundImage: `
                    url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23e2e8f0' stroke-width='1'%3E%3Cpath d='M40 0H0v40'/%3E%3C/g%3E%3C/svg%3E")
                  `,
                    backgroundSize: '40px 40px',
                }}
            />

            <div className="bg-slate-100 z-1 rounded-lg border border-zinc-200 shadow-lg">
                <div className="w-[300px] md:w-[380px] bg-white z-1 rounded-lg border-b border-zinc-200">
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
                <div className="w-[300px] md:w-[380px] text-center py-6 rounded-bl-lg rounded-br-lg ">
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
            {pathname === APP_ROUTE.SIGNUP && (
                <p className="text-xs mt-6 text-zinc-600 z-1">
                    By Signing up you agree to the{' '}
                    <Link href="#" className="text-blue-400 font-semibold hover:underline">
                        Terms and Conditions
                    </Link>
                </p>
            )}
        </div>
    );
}
