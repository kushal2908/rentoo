import { Router } from 'express';
import { protectedRoute } from './auth.middleware';
import {
    cancelBookingController,
    createBookingController,
    getBookingsByListingController,
    getSearchGlobalBookingController,
    myBookingController,
} from './controller';

/**
 * @description This is the service router for the auth service.
 * It handles the routes for user authentication.
 */

const serviceRouter = Router();
serviceRouter.post('/create', createBookingController);
serviceRouter.get('/my-booking/:id', protectedRoute, myBookingController);
serviceRouter.get('/cancel-booking/:id', cancelBookingController);
serviceRouter.get('/listing/:id', getBookingsByListingController);
serviceRouter.get('/searchGlobal', getSearchGlobalBookingController);

export default serviceRouter;
