import { z } from 'zod';
export const BookingDTO = z.object({
    userId: z.string(),
    listingId: z.string(),
    checkIn: z.string(),
    checkOut: z.string(),
    noOfPerson: z.number().max(9999),
    totalPrice: z.number(),
});
