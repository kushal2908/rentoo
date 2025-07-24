import { Request, Response } from 'express';
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from '../_lib/utils';
import { prisma } from '../prisma';
export default async function destinationSearchService(req: Request, res: Response): Promise<any> {
    const { query } = req.query;

    console.log(query);
    return SUCCESS_RESPONSE(res, 'Fetched data');
}
