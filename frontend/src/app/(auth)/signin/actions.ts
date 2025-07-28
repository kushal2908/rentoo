'use server';
import { PUBLIC_API } from '@/lib/axios.config';
import { cookies } from 'next/headers';
export async function signinAction(formData: FormData) {
    try {
        const response = await PUBLIC_API.post('/auth/signin', formData);
        const cookieStore = cookies();
        const accessTokenCookie = response.headers['set-cookie']?.[0];
        const refreshTokenCookie = response.headers['set-cookie']?.[1];

        if (accessTokenCookie) {
            (await cookieStore).set('accessToken', accessTokenCookie);
        }
        if (refreshTokenCookie) {
            (await cookieStore).set('refreshToken', refreshTokenCookie);
        }

        return { success: true, data: response.data?.data, message: response.data?.data.message || 'Login successful!' };
    } catch (error: any) {
        console.error(error);
        if (error.response && error.response.data && error.response.data.message) {
            return { success: false, error: error.response.data.message };
        }
        return { success: false, error: 'An unexpected error occurred. Please try again later.' };
    }
}
