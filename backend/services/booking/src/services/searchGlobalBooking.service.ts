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

    // Check listing is booked on that checkin date
    const checkListingBooked = await prisma.booking.findMany({
        where: {
            // listingId: getListing?.map((d: any) => d?.id).toString(','),
            listingId: getListing[0].id,
            checkIn: {
                gte: new Date(`${starDate}T00:00:00.000Z`),
                lte: new Date(`${starDate}T23:59:59.999Z`),
            },
            // checkOut: endDate,
        },
    });

    // filter out the listing that are not available in all listing
    const result = getListing?.filter((allList: any) => checkListingBooked.map((bookedList: any) => bookedList.listingId === allList.id));

    return SUCCESS_RESPONSE(res, 'success', result);
};

export default getSearchGlobalBooking;
