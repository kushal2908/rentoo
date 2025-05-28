import { Request, Response } from 'express';
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from '../_lib/utils';
import { prisma } from '../prisma';
import axios from 'axios';

const myBooking = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    // Check if user has any booking
    const hasBooking = await prisma.booking.findMany({
        where: { userId: id },
        orderBy: {
            id: 'desc',
        },
        omit: {
            id: true,
            userId: true,
            createdAt: true,
        },
    });

    if (!hasBooking || hasBooking.length < 1) return ERROR_RESPONSE(res, 'No booking available');

    // Fetch listing details for each booking
    const bookingsWithListings = await Promise.all(
        hasBooking.map(async (booking) => {
            try {
                const response = await axios.get(`http://localhost:8000/listing/${booking.listingId}`);
                return {
                    ...booking,
                    listingDetails: {
                        title: response.data.data.title,
                        city: response.data.data.city,
                        country: response.data.data.country,
                    },
                };
            } catch (error) {
                console.error(`Failed to fetch listing ${booking.listingId}:`, error);
                return {
                    ...booking,
                    listingDetails: [], // Or handle gracefully
                };
            }
        })
    );

    return SUCCESS_RESPONSE(res, 'Success', bookingsWithListings);
};

export default myBooking;
