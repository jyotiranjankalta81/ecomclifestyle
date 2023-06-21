import { Request, Response, NextFunction } from "express";
import Joi, { AnySchema } from "joi";
import httpStatus from "http-status";
import pick from "../utils/pick";


// const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

export const validate = (schema: AnySchema) => (req: Request, res: Response, next: NextFunction) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' } })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  return next();
};
