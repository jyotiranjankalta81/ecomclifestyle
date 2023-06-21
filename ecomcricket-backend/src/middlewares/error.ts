import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status'
import { config } from '../config/config'
import { log } from '../config/logger'
import { ApiError } from '../utils/ApiError';

interface Error {
  isOperational: any;
  stack: string | undefined;
  statusCode?: any;
  code?: number;
  message?: any;
}

export const errorConverter = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let error: any = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message;
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};



export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let { statusCode, message } = err;
  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.env === 'development' && { stack: err.stack }),
  };

  if (config.env === 'development') {
    log.error(err);
  }

  res.status(statusCode).send(response);
};
