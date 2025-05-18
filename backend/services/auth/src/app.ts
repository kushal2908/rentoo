import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import serviceRouter from './route';

dotenv.config();
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Auth service routes
app.use('/', serviceRouter);

// 404 route
app.get(/(.*)/, (req: Request, res: Response) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
// Error handler
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ error: 'Internal server error' });
    next();
});

export default app;
