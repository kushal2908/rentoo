import { NextFunction, Request, Response } from 'express';
import { SigninDTO } from '../dto/dto';
import { signInService, signUpService } from '../services';

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
        const { success, error } = SigninDTO.safeParse(req.body);
        if (!success) {
            return res.status(400).json(error);
        }
        const response = await signUpService(req, res);
        return response;
    } catch (error) {
        next(error);
    }
};

export const authHistoryController = async (req: Request, res: Response, next: NextFunction) => {
    return;
};

export const authVerificationController = async (req: Request, res: Response, next: NextFunction) => {
    return;
};

export const logoutController = async (req: Request, res: Response, next: NextFunction) => {
    return;
};

export const verifyTokenController = async (req: Request, res: Response, next: NextFunction) => {
    return;
};
