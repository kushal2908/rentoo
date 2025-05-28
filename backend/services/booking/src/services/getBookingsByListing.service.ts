import { Request, Response } from 'express';
import { prisma } from '../prisma';
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from '../_lib/utils';
import axios from 'axios';

const getBookingsByListing = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    // Check if listing exist
    const isListingExist = await prisma.booking.findMany({
        where: {
            listingId: id,
        },
        orderBy: {
            id: 'desc',
        },
        omit: {
            userId: true,
        },
    });
    if (!isListingExist) return ERROR_RESPONSE(res, 'Booking doesnt exist');
    return SUCCESS_RESPONSE(res, 'Success', isListingExist);
};

export default getBookingsByListing;
