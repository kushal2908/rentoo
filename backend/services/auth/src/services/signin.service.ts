import { Request, Response } from 'express';
import { SigninDTO } from '../dto/dto';
import { prisma } from '../prisma';
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from '../_lib/utils';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const signInService = async (req: Request, res: Response): Promise<any> => {
    const ipAddress = (req.headers['x-forwarded-for'] as string) || req.ip || '';
    const userAgent = req.headers['user-agent'] || '';

    const parsedBody = SigninDTO.safeParse(req.body);
    if (!parsedBody.success) {
        return res.status(400).json({ error: parsedBody.error.errors });
    }
    // check if user exist
    const user = await prisma.user.findUnique({
        where: {
            email: parsedBody.data.email,
        },
    });

    if (!user) {
        return ERROR_RESPONSE(res, 'User not found');
    }

    // Match password
    const isValidPassword = await bcrypt.compare(parsedBody.data.password, user.password);
    if (!isValidPassword) {
        return ERROR_RESPONSE(res, 'Invalid password');
    }

    // Check if user is suspended
    if (user.status === 'SUSPENDED') {
        return ERROR_RESPONSE(res, 'User is suspended');
    }

    // Generate access token
    const accessToken = jwt.sign(
        {
            data: {
                userId: user.id,
                role: user.role,
            },
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: '1d',
        }
    );

    // generate refresh token
    const refreshToken = jwt.sign(
        {
            data: {
                userId: user.id,
                role: user.role,
            },
        },
        process.env.JWT_REFRESH_SECRET!,
        {
            expiresIn: '30d',
        }
    );

    await prisma.authHistory.create({
        data: {
            userId: user.id,
            ip: ipAddress,
            device: userAgent,
        },
    });

    return res
        .status(200)
        .cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict', // Recommended: helps prevent CSRF attacks
            maxAge: 1 * 24 * 60 * 60 * 1000, // 1 days
        })
        .cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict', // Recommended: helps prevent CSRF attacks
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        })
        .json({
            message: 'Login successful',
            data: { firstName: user.firstName, lastName: user.lastName, email: user.email, userId: user.id, avatar: user.avatar },
        });
};

export default signInService;
