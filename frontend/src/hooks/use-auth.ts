'use client';
import { getCookie } from 'cookies-next/client';

export default function useAuth() {
    const accessToken = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');

    const isAuthenticated = accessToken && refreshToken;
    return isAuthenticated;
}
