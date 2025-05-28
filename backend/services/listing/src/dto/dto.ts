import { z } from 'zod';

export const listingDTO = z.object({
    title: z.string(),
    shortDesctiption: z.string().optional(),
    description: z.string().optional(),
    pricePerNight: z.number(),
    location: z.string(),
    city: z.string().max(200),
    country: z.string().max(200),
    maxGuests: z.number().max(10000000).min(1),
    minNights: z.number().max(1000000).min(1),
    amenities: z.string().optional(),
    images: z.string().optional(),
});
