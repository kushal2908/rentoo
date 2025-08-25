import { Router } from 'express';
import { protectedRoute } from './auth.middleware';
import { createListingController, getAllListingController, getListingController, getLocationSearchController } from './controller';
import { upload } from './_lib/utils';

/**
 * @description This is the service router for the auth service.
 * It handles the routes for user authentication.
 */

const serviceRouter = Router();
serviceRouter.get('/search', getAllListingController);
serviceRouter.get('/locationSearch', getLocationSearchController);
serviceRouter.post('/create', upload.array('images', 5), protectedRoute, createListingController);
serviceRouter.get('/:id', getListingController);

export default serviceRouter;
