import { optional, z } from 'zod';

export const SigninDTO = z
    .object({
        email: z.string().email(),
        phone: z.string().min(11),
        password: z.string().min(4),
    })
    .superRefine((val, ctx) => {
        if (!val.email || !val.email) {
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
    phone: z.string().optional(),
    password: z.string().min(4, { message: 'Password must be at least 4 characters' }),
});

export type SignupDtoType = z.infer<typeof SignupDTO>;
