import { Request, Response } from 'express';
import { SignupDTO, SignupDtoType } from '../dto/dto';
import { prisma } from '../prisma';
import bcrypt from 'bcrypt';
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from '../_lib/utils';

const signUpService = async (req: Request, res: Response): Promise<any> => {
    const body: SignupDtoType | any = SignupDTO.safeParse(req.body);

    // Check user already exist
    const isUserExist = await prisma.user.findUnique({
        where: {
            email: body?.data.email,
        },
    });
    if (isUserExist) {
        return ERROR_RESPONSE(res, 'User already exist');
    }

    //create user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body?.data.password, salt);

    const user = await prisma.user.create({
        data: {
            ...body.data,
            phone: body?.data.phone ?? '',
            password: hashedPassword,
        },
    });

    return SUCCESS_RESPONSE(res, 'User created', user);
};
export default signUpService;
