'use client';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { handleLogin } from './action';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';

const formSchema = z.object({
    email: z.string().email({ message: 'Email is required' }),
    password: z.string().min(1, { message: 'Password is required' }),
});
export default function page() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: any) => {
        const res: any = await handleLogin(data);
        if (res.error) {
            return toast.error(res.message || 'Login failed. Please try again.');
        }
        toast.success(res.message || 'Login successful!');
        redirect('/');
    };
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
                                <Input type="password" placeholder="Username" {...field} />
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
