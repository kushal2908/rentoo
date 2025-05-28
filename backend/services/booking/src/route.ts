import { Router } from 'express';
import { cancelBookingController, createBookingController, getBookingsByListingController, myBookingController } from './controller';
import { protectedRoute } from './auth.middleware';

/**
 * @description This is the service router for the auth service.
 * It handles the routes for user authentication.
 */

const serviceRouter = Router();
serviceRouter.post('/create', createBookingController);
serviceRouter.get('/my-booking/:id', protectedRoute, myBookingController);
serviceRouter.get('/cancel-booking/:id', cancelBookingController);
serviceRouter.get('/listing/:id', getBookingsByListingController);

export default serviceRouter;
