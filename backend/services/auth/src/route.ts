import { Router } from 'express';
import { refreshController, signinController, signoutController, signupController } from './controller';

/**
 * @description This is the service router for the auth service.
 * It handles the routes for user authentication.
 */

const serviceRouter = Router();
serviceRouter.post('/signin', signinController);
serviceRouter.post('/signup', signupController);
serviceRouter.post('/signout', signoutController);
serviceRouter.get('/refresh', refreshController);

export default serviceRouter;
