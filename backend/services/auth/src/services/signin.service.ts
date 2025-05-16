import { Request, Response } from 'express';
import { SignupDTO } from '../dto/dto';
import { prisma } from '../prisma';

const signInService = async (req: Request, res: Response): Promise<any> => {
    const ipAddress = (req.headers['x-forwarded-for'] as string) || req.ip || '';
    const userAgent = req.headers['user-agent'] || '';

    const parsedBody = SignupDTO.safeParse(req.body);
    if (!parsedBody.success) {
        return res.status(400).json({ error: parsedBody.error.errors });
    }
    // check if user exist
    const user = await prisma.user.findUnique({
        where: {
            email: parsedBody.data.email,
        },
    });
    return await res.send('service');
};

export default signInService;
