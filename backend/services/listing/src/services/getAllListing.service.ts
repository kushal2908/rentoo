import { Request, Response } from 'express';
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from '../_lib/utils';
import { prisma } from '../prisma';

export default async function getAllListingService(req: Request, res: Response): Promise<any> {
    const { city, country } = req.query;

    if (!city && !country) {
        return ERROR_RESPONSE(res, 'City or country must be provided');
    }
    const listing = await prisma.listing.findMany({
        where: {
            city: city ? String(city) : undefined,
            country: country ? String(country) : undefined,
        },
    });

    if (!listing || listing.length === 0) return ERROR_RESPONSE(res, 'No listings found for the given criteria');

    return SUCCESS_RESPONSE(res, 'Fetched all data', listing);
}
