import express, { Application } from 'express';
import cors from 'cors'; // CORS read more on it
import morgan from 'morgan';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import cookieParser from 'cookie-parser';
import path from 'path';
import logger from './middleware/logger';
// All Routes ----------------
import { allRoute } from './routes/allRoutes.routes';

// const AppError = require('./utils/appError');
import globalErrorHandler from './middleware/errorController';

const app = express();

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// cookie parser
app.use(cookieParser());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  app.use(logger); // For now just for testing
}
if (process.env.NODE_ENV === 'production') {
  app.use(logger);
}

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// SETTING CORS
app.use(
  cors({
    origin: '*',
    credentials: true, // need to dig deeper
    exposedHeaders: ['set-cookie'], // check more on this option a web usage
  }),
);

// Serving static files

app.use(express.static(`public`));

// 3) ROUTES

// 3.1 API Routes
app.use('/api/v1/user', allRoute.userRoute);

// 3.2 Admin Routes
app.use('/api/v1/admin/log', allRoute.admin.log);

// app.use(globalErrorHandler);
app.use(globalErrorHandler);

export default app;
