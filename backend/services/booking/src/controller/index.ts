import { NextFunction, Request, Response } from 'express';
import { ERROR_RESPONSE } from '../_lib/utils';
import { BookingDTO } from '../dto/dto';
import {
    cancelBookingService,
    createBookingService,
    getBookingsByListingService,
    getSearchGlobalBookingService,
    myBookingService,
} from '../services';

/**
 * Handles the creation of a new booking.
 *
 * @param req - Express request object containing booking details.
 * @param res - Express response object for sending the response.
 * @param next - Express next function for error handling.
 * @returns A promise resolving to the booking creation result.
 */
export const createBookingController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { success, error } = BookingDTO.safeParse(req.body);
        if (error) return ERROR_RESPONSE(res, 'Error, please try again', error);

        const response = await createBookingService(req, res);
        return response;
    } catch (error) {
        next(error);
    }
};

export const myBookingController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id } = req.params;
        if (!id) return ERROR_RESPONSE(res, 'No params has been set');
        const response = await myBookingService(req, res);
        return response;
    } catch (error) {
        next(error);
    }
};

// Delete/cancel e booking
export const cancelBookingController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id } = req.params;
        if (!id) return ERROR_RESPONSE(res, 'No params has been set');
        const response = await cancelBookingService(req, res);
        return response;
    } catch (error) {
        next(error);
    }
};

// Get all booking data for a single list
export const getBookingsByListingController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id } = req.params;
        if (!id) return ERROR_RESPONSE(res, 'No params has been set');
        const response = await getBookingsByListingService(req, res);
        return response;
    } catch (error) {
        next(error);
    }
};
export const getSearchGlobalBookingController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const data = req.query;
        if (!data) return ERROR_RESPONSE(res, 'No params has been set');
        const response = await getSearchGlobalBookingService(req, res);
        return response;
    } catch (error) {
        next(error);
    }
};
