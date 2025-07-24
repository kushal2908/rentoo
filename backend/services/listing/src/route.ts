import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { protectedRoute } from './auth.middleware';
import { createListingController, destinationSearchController, getAllListingController, getListingController } from './controller';
/**
 * @description This is the service router for the auth service.
 * It handles the routes for user authentication.
 */
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); // Get file extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + ext);
    },
});
const upload = multer({ storage });

const serviceRouter = Router();
serviceRouter.get('/search', getAllListingController);
serviceRouter.post('/create', upload.array('images', 5), protectedRoute, createListingController);
serviceRouter.get('/:id', getListingController);
serviceRouter.get('/destinationSearch', destinationSearchController);
export default serviceRouter;
