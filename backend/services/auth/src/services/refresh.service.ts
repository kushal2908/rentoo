import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const refreshService = async (req: Request, res: Response): Promise<any> => {
    // Get refresh token from httpOnly cookie
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
        return res.status(400).json({ error: 'Refresh token is required' });
    }

    try {
        // Verify the refresh token
        const decoded: any = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string);

        // You can add additional checks here (e.g., user existence, token revocation, etc.)
        const userId = decoded.data.userId;
        const role = decoded.data.role;

        // Generate new access token
        const newAccessToken = jwt.sign({ data: { userId, role } }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
        const newRefreshToken = jwt.sign({ data: { userId, role } }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '30d' });

        // Optionally, set the new access token as a cookie
        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
        });
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        return res.status(200).json({ message: 'Tokens refreshed successfully' });
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired refresh token' });
    }
};

export default refreshService;
