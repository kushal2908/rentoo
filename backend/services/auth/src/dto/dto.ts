import { z } from 'zod';

export const SigninDTO = z
    .object({
        email: z.string().email().optional().or(z.literal('')),
        phone: z.string().min(11).optional().or(z.literal('')),
        password: z.string().min(4),
    })
    .superRefine((val, ctx) => {
        if ((!val.email || val.email === '') && (!val.phone || val.phone === '')) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Please enter email or phone',
                path: ['email', 'phone'],
            });
        }
    });

export const SignupDTO = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email(),
    phone: z
        .string()
        .refine((val) => val === '' || (val.length >= 11 && val.length <= 14), {
            message: 'Phone must be empty or between 11 and 14 characters',
        })
        .optional(),
    password: z.string().min(4, { message: 'Password must be at least 4 characters' }),
});

export type SignupDtoType = z.infer<typeof SignupDTO>;
