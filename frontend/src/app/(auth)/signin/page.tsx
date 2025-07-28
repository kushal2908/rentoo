'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { signinAction } from './actions';
import useAuth from '@/hooks/use-auth';

// Schema
const formSchema = z.object({
    email: z.string().email({ message: 'Email is required' }),
    password: z.string().min(1, { message: 'Password is required' }),
});
export default function page() {
    const ath = useAuth();
    console.log(ath);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: any) => {
        const res = await signinAction(data);
        if (res.success) {
            localStorage.setItem('user', JSON.stringify(res.data));
            toast.success(res.message || 'Login successful!');
            return redirect('/');
        }
        if (res.error) {
            return toast.error(res.error);
        }
    };
    // const onSubmit = (data: any) => {
    //     PUBLIC_API.post('/auth/signin', data)
    //         .then((res) => {
    //             localStorage.setItem('user', JSON.stringify(res.data?.data));
    //             toast.success('Login successful!');
    //             redirect('/');
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             if (error.response && error.response.data && error.response.data.message) {
    //                 return toast.error(error.response.data.message);
    //             } else {
    //                 return toast.error('An unexpected error occurred. Please try again later.');
    //             }
    //         });
    // };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => onSubmit(data))} className="space-y-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Password" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">
                    Signin
                </Button>
            </form>
        </Form>
    );
}
