import { Router } from 'express';
import { signinController, signupController } from './controller';

const serviceRouter = Router();
serviceRouter.post('/signin', signinController);
serviceRouter.post('/signup', signupController);

export default serviceRouter;
