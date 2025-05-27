import { Request, Response } from 'express';
import { ERROR_RESPONSE, SUCCESS_RESPONSE, getUserIdFromToken } from '../_lib/utils';
import { prisma } from '../prisma';
import { listingDTO } from '../dto/dto';
import fs from 'fs/promises';

export default async function createListingService(req: Request, res: Response): Promise<any> {
    const uploadedFiles = req.files as Express.Multer.File[];
    try {
        const data = req.body;
        // Parse numbers
        data.pricePerNight = parseFloat(data.pricePerNight);
        data.maxGuests = parseInt(data.maxGuests, 10);
        data.minNights = parseInt(data.minNights, 10);

        const { success, error } = listingDTO.safeParse(req.body);
        if (!success) return res.status(400).json(error);

        const userIdFromToken = getUserIdFromToken(req);

        // prevent duplicate listings
        const existingListing = await prisma.listing.findFirst({
            where: {
                title: data.title,
                city: data.city,
                country: data.country,
            },
        });
        if (existingListing) {
            return ERROR_RESPONSE(res, 'Listing with the same title, city, and country already exists');
        }

        const listing = await prisma.listing.create({
            data: {
                ...data,
                images: uploadedFiles?.map((file) => file.path).join(',') || '', // Store file paths
                userId: userIdFromToken,
            },
        });

        return SUCCESS_RESPONSE(res, '', listing);
    } catch (error) {
        if (uploadedFiles && uploadedFiles.length > 0) {
            await Promise.all(uploadedFiles.map((file) => fs.unlink(file.path)));
        }
        return ERROR_RESPONSE(res, 'Internal server error', error);
    }
}
