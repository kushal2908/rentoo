import { NextFunction, Request, Response } from 'express';
import { SigninDTO, SignupDTO } from '../dto/dto';
import { refreshService, signInService, signOutService, signUpService } from '../services';

/**
 * @param req - Express request object containing user credentials in the body.
 * @param res - Express response object used to send the response.
 * @param next - Express next function for error handling.
 * @returns A promise that resolves to the response sent to the client.
 */

export const signinController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { success, error } = SigninDTO.safeParse(req.body);
        if (!success) return res.status(400).json(error);

        const response = await signInService(req, res);
        return response;
    } catch (error) {
        next(error);
    }
};

export const signupController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { success, error } = SignupDTO.safeParse(req.body);
        if (!success) {
            return res.status(400).json(error);
        }
        const response = await signUpService(req, res);
        return response;
    } catch (error) {
        next(error);
    }
};

export const signoutController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const response = await signOutService(req, res);
        return response;
    } catch (error) {
        next(error);
    }
};

export const refreshController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const response = await refreshService(req, res);
        return response;
    } catch (error) {
        next(error);
    }
};

export const authVerificationController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    return;
};

export const authHistoryController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    return;
};
