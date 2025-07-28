'use client';
import useAuth from '@/hooks/use-auth';
import { redirect } from 'next/navigation';

export default function layout() {
    const isAuthenticated = useAuth();
    if (isAuthenticated) {
        return redirect('/');
    }

    return null;
}
