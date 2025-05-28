import { Request, Response } from 'express';
import { prisma } from '../prisma';
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from '../_lib/utils';
const cancelBooking = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    const bookingExist = await prisma.booking.findUnique({
        where: {
            id,
        },
    });

    if (!bookingExist) return ERROR_RESPONSE(res, 'Booking not found');
    if (bookingExist.status === 'CANCELLED') return ERROR_RESPONSE(res, 'Booking already cancelled');

    await prisma.booking.update({
        where: {
            id,
        },
        data: {
            status: 'CANCELLED',
        },
    });
    return SUCCESS_RESPONSE(res, 'Booking cancelled');
};

export default cancelBooking;
