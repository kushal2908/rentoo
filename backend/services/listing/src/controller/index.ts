import { NextFunction, Request, Response } from 'express';
import { listingDTO } from '../dto/dto';
import createListingService from '../services/createListing.service';
import getAllListingService from '../services/getAllListing.service';

export const getAllListingController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const response = await getAllListingService(req, res);
        return response;
    } catch (error) {
        next(error);
    }
};

export const createListingController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const response = await createListingService(req, res);
        return response;
    } catch (error) {
        next(error);
    }
};
