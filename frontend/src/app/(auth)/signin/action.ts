'use server';
import { PUBLIC_API } from '@/lib/axios.config';

export async function handleLogin(data: any) {
    try {
        const response = await PUBLIC_API.post('/auth/signin', data);
        if (response?.data?.message) {
            // setCookie('accessToken', response.data.accessToken);
            // setCookie('refreshToken', response.data.refreshToken);
            // localStorage.setItem('user', JSON.stringify(response.data));
            return { error: false, message: response.data.message };
        }
    } catch (error: any) {
        console.error(error);
        if (error.response && error.response.data && error.response.data.message) {
            return { error: true, message: 'Login failed. Please check your credentials and try again.' };
        } else {
            return { error: true, message: 'An unexpected error occurred. Please try again later.' };
        }
    }
}
