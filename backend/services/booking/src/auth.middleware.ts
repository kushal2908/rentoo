// authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Set in env

export const protectedRoute = (req: Request, res: Response, next: NextFunction): any => {
    const token = req.cookies?.accessToken; // Adjust cookie name if different

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email?: string };

        // Attach user info to request
        (req as any).user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};
