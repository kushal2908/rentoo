'use client';
import useAuth from '@/hooks/use-auth';
import { redirect } from 'next/navigation';

export default function Layout() {
    const isAuthenticated = useAuth();
    if (!isAuthenticated) {
        return redirect('/signin');
    }

    return null;
}
