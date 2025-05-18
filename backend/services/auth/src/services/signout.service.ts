import { Request, Response } from 'express';
import { prisma } from '../prisma';
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from '../_lib/utils';

const signOutService = async (req: Request, res: Response): Promise<any> => {
    const { userId } = req.body;

    // check if user exist
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        return ERROR_RESPONSE(res, 'User not found');
    }

    const isUserAlreadySignedOut = await prisma.authHistory.findFirst({
        where: {
            userId: userId,
            status: 'SIGNED_OUT',
        },
    });

    if (isUserAlreadySignedOut) {
        return ERROR_RESPONSE(res, 'User already signed out');
    }

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    // Find the latest authHistory record for this user to update
    const latestAuthHistory = await prisma.authHistory.findFirst({
        where: {
            userId: userId,
        },
        orderBy: {
            signedInAt: 'desc',
        },
    });

    if (!latestAuthHistory) {
        return ERROR_RESPONSE(res, 'Auth history not found for user');
    }

    await prisma.authHistory.update({
        where: {
            id: latestAuthHistory.id,
        },
        data: {
            status: 'SIGNED_OUT',
            signedOutAt: new Date(),
        },
    });

    return SUCCESS_RESPONSE(res, 'Signed out successfully');
};
export default signOutService;
