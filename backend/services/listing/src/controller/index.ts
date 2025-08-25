import { NextFunction, Request, Response } from 'express';
import createListingService from '../services/createListing.service';
import getAllListingService from '../services/getAllListing.service';
import getListingService from '../services/getLisitng.service';
import { getLocationSearchService } from '../services/getLocationSearch.service';

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

export const getListingController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const response = await getListingService(req, res);
        return response;
    } catch (error) {
        next(error);
    }
};

export const getLocationSearchController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const response = await getLocationSearchService(req, res);
        return response;
    } catch (error) {
        next(error);
    }
};
