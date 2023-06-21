import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import Joi from "joi";
import ApiStatus from "../utils/apistatus";

export const ProductValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const schema = Joi.object({
    CATEGORY_ID: Joi.string().required(),
    SUBCATEGORY_ID: Joi.string(),
    BRAND_ID: Joi.string().required(),
    PRODUCTSIZE_ID: Joi.any().required(),
    PRODUCTCOLOR_ID: Joi.any().required(),
    PRODUCT_NAME: Joi.string().required(),
    PRODUCT_QUANTITY: Joi.number().required(),
    PRODUCT_DESCRIPTION: Joi.string().required(),
    PRODUCT_PRICE: Joi.number().required(),
    PRODUCT_TAG: Joi.string().required(),
    PRODUCT_BARCODE: Joi.any(),
    COMPANYCODE: Joi.any(),
    PACKAGETYPE: Joi.string().required(),
    WEIGHT: Joi.any().required(),
    BRANCHNAME: Joi.any().required(),
    PRODUCT_DISCOUNTSTATUS: Joi.number(),
    PRODUCT_DISCOUNT: Joi.any(),
    PRODUCT_ID: Joi.any(),
    TECHINFO: Joi.any().required(),
    ADDITINFO: Joi.any().required(),
    PRODUCT_IMAGE: Joi.any().optional(),
    PRODUCT_IMAGE_OLD: Joi.any(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(httpStatus.OK).send(ApiStatus.errormsg(error.message));
  } else {
    return next();
  }
};

export const BannerValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const schema = Joi.object({
    BANNER_DESC: Joi.string().required(),
    BANNER_IMAGE: Joi.any(),
    BANNER_ID: Joi.number().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(httpStatus.OK).send(ApiStatus.errormsg(error.message));
  } else {
    return next();
  }
};

export const ProductDiscountValidation = {
  body: Joi.object({
    PRODUCT_DISCOUNT: Joi.number().required(),
    PRODUCT_ID: Joi.number().required(),
  }),
};
