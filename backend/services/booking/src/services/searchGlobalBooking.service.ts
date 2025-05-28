import { Request, Response } from 'express';
import { prisma } from '../prisma';
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from '../_lib/utils';
import axios from 'axios';

const getSearchGlobalBooking = async (req: Request, res: Response): Promise<any> => {
    const data = req.query;

    const dateRange: any = (!!data?.date && data?.date) || '';
    let starDate;
    let endDate;
    if (dateRange.includes('to')) {
        starDate = dateRange.split('to')[0];
        endDate = dateRange.split('to')[1];
    }

    // Get all listing for the search query
    const getListing = await axios
        .get(`http://localhost:8003/search?city=${data.city}&country=${data.country}`)
        .then((res) => {
            return res.data.data;
        })
        .catch((err) => {
            console.log(err);
        });

    // Check date availability
    const checkAvailableListing = await prisma.booking.findMany({
        where: {
            listingId: getListing?.map((d: any) => d?.id).toString(','),
            checkIn: {
                equals: starDate,
            },
            checkOut: endDate,
        },
    });
    console.log(checkAvailableListing);
    return SUCCESS_RESPONSE(res, 'success', getListing);
};

export default getSearchGlobalBooking;
