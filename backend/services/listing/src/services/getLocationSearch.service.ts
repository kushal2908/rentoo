import { Request, Response } from 'express';
import { prisma } from '../prisma';
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from '../_lib/utils';

export const getLocationSearchService = async (req: Request, res: Response): Promise<any> => {
    const { search } = req.query as { search: string };
    const locationList = await prisma.listing.findMany({
        where: {
            OR: [{ city: { contains: search } }, { country: { contains: search } }, { location: { contains: search } }],
        },
        select: {
            id: true,
            city: true,
            country: true,
            location: true,
        },
    });

    if (!locationList || locationList.length === 0) {
        return ERROR_RESPONSE(res, 'No locations found');
    }
    return SUCCESS_RESPONSE(res, 'Locations fetched successfully', locationList);
};
