import { Request, Response } from 'express';
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from '../_lib/utils';
import { prisma } from '../prisma';
export default async function getListingService(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    const listing = await prisma.listing.findUnique({
        where: {
            id,
        },
    });

    if (!listing) return ERROR_RESPONSE(res, 'No listings found for the given criteria');

    return SUCCESS_RESPONSE(res, 'Fetched data', listing);
}
