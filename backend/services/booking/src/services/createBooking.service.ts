import { Request, Response } from 'express';
import { ERROR_RESPONSE, SUCCESS_RESPONSE, getUserIdFromToken } from '../_lib/utils';
import { prisma } from '../prisma';

const createBooking = async (req: Request, res: Response): Promise<any> => {
    const { listingId, checkIn, checkOut, ...otherData } = req.body;

    // Check if a booking already exists for the selected date
    const isBooked = await prisma.booking.findFirst({
        where: { listingId, checkIn, checkOut },
        orderBy: {
            id: 'desc',
        },
    });

    if (isBooked) return ERROR_RESPONSE(res, 'Room is not available');

    // validation dates
    if (new Date(checkOut) <= new Date(checkIn)) {
        return ERROR_RESPONSE(res, 'Check-out must be after check-in');
    }

    const booking = await prisma.booking.create({
        data: { listingId, checkIn, checkOut, ...otherData },
    });

    SUCCESS_RESPONSE(res, 'Booked successfully', booking);
};

export default createBooking;
