import express, { Express } from 'express'
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'
import httpStatus from 'http-status'
import { config } from './config/config'
import { morgans } from './config/morgan'
import { authLimiter } from './middlewares/rateLimiter'
import { errorConverter, errorHandler } from './middlewares/error'
import { ApiError } from './utils/ApiError'
import router from './routes/v1'
import passport from 'passport'
import { jwtStrategy } from './config/passport'
const expressFileUpload = require('express-fileupload');

export const app: Express = express();
if (config.env !== 'test') {
    app.use(morgans.successHandler);
    app.use(morgans.errorHandler);
}

// app.use(expressFileUpload());
// set security HTTP headers
app.use(helmet());
// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
// sanitize request data
// app.use(xss());
// gzip compression
app.use(compression());
// enable cors
app.use(cors());
app.options('*', cors());

//pasport
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
    app.use('/api/auth', authLimiter);
}

// v1 api routes
app.use('/api', router);

//upload image

app.use('*/static', express.static('public/uploads'));
app.use('*/defaults', express.static('public/defaults'));
app.use('*/consent', express.static('public/attachments'));




// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);



