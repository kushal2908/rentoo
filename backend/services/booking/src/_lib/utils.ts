import { Response } from 'express';
import jwt from 'jsonwebtoken';
/**
 * Sends a successful response with a given message and optional data.
 *
 * @param res - The Express response object.
 * @param msg - The message to be sent in the response.
 * @param data - Optional data to be sent in the response.
 * @returns The response object.
 */
export const SUCCESS_RESPONSE = (res: Response, msg: string, data?: any) => {
    return res.status(200).json({
        status: 200,
        success: true,
        message: msg,
        data,
    });
};
/**
 * Sends an error response with a given message and optional data.
 *
 * @param res - The Express response object.
 * @param msg - The message to be sent in the response.
 * @param data - Optional data to be sent in the response.
 * @returns The response object.
 */
export const ERROR_RESPONSE = (res: Response, msg: string, data?: any) => {
    return res.status(400).json({
        status: 400,
        success: false,
        message: msg,
        data,
    });
};

export const getUserIdFromToken = (req: any) => {
    const token = req.cookies?.accessToken;
    if (!token) return null;

    const decodedToken = jwt.decode(req.cookies.accessToken);
    if (decodedToken && typeof decodedToken === 'object') {
        const userId = decodedToken.data?.userId;
        return userId;
    }

    return null;
};
