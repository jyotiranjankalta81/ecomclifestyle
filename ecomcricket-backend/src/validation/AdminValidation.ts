import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import Joi from "joi";
import ApiStatus from "../utils/apistatus";

class AdminValidationClass {
    Bulkupload_ProductValidation = (req: Request, res: Response, next: NextFunction) => {
        const schema = Joi.object().keys({
            productcsv: Joi.array().items(Joi.object({
                CATEGORY_ID: Joi.string().required().messages({ 'any.required': 'Opps ! please check your csv , Category Id is required ' }),
                BRAND_ID: Joi.any().required().messages({ 'any.required': 'Opps ! please check your csv , Brand Id is required ' }),
                PRODUCTSIZE_ID: Joi.any().required().messages({ 'any.required': 'Opps ! please check your csv , Brand Id is required ' }),
                PRODUCTCOLOR_ID: Joi.any().required().messages({ 'any.required': 'Opps ! please check your csv , Product Color Id is required ' }),
                PRODUCT_NAME: Joi.string().required().messages({ 'any.required': 'Opps ! please check your csv ,  Product Name is required ' }),
                PRODUCT_QUANTITY: Joi.number().required().messages({ 'any.required': 'Opps ! please check your csv ,  Product Quantity is required ' }),
                PRODUCT_DESCRIPTION: Joi.string().required().messages({ 'any.required': 'Opps ! please check your csv , product description Id is required ' }),
                PRODUCT_PRICE: Joi.number().required().messages({ 'any.required': 'Opps ! please check your csv ,product price is required ' }),
                PRODUCT_DISCOUNTSTATUS: Joi.number().required().messages({ 'any.required': 'Opps ! please check your csv , Product Description  is required ' }),
                PRODUCT_DISCOUNT: Joi.number().required().messages({ 'any.required': 'Opps ! please check your csv , Product Descount is required ' }),
                COMPANYCODE: Joi.string().required().messages({ 'any.required': 'Opps ! please check your csv , Company Code is required ' }),
                WEIGHT: Joi.number().required().messages({ 'any.required': 'Opps ! please check your csv , Weight is required ' }),
                BRANCHNAME: Joi.string().required().required().messages({ 'any.required': 'Opps ! please check your csv ,Branch Name  is required ' }),
                TECHINFO: Joi.string().required().required().messages({ 'any.required': 'Opps ! please check your csv ,Technical Info  is required ' }),
                ADDITINFO: Joi.string().required().messages({ 'any.required': 'Opps ! please check your csv , Additional INformation  is required ' }),
                PRODUCT_IMAGE: Joi.string().allow(''),

            }))
        })
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(httpStatus.OK).send(ApiStatus.errormsg(error.message))
        }
        else {
            return next()
        }
    };
    post_category = (req: Request, res: Response, next: NextFunction): void => {
        const schema = Joi.object().keys({
            CATEGORY_NAME: Joi.string().required(),
            CATEGORY_CODE: Joi.string().required(),
            CATEGORY_IMAGE: Joi.any(),
            CATEGORY_ID: Joi.any(),
        })
        const { error } = schema.validate(req.body);
        if (error) {
            res.status(httpStatus.OK).send(ApiStatus.errormsg(error.message))
        }
        else {
            return next()
        }
    };

    update_category = (req: Request, res: Response, next: NextFunction): void => {
        const schema = Joi.object().keys({
            CATEGORY_NAME: Joi.string().required(),
            CATEGORY_CODE: Joi.string().required(),
            CATEGORY_ID: Joi.number().required(),
            CATEGORY_IMAGE: Joi.any(),
        })
        const { error } = schema.validate(req.body);
        if (error) {
            res.status(httpStatus.OK).send(ApiStatus.errormsg(error.message))
        }
        else {
            return next()
        }
    };



    post_country = (req: Request, res: Response, next: NextFunction): void => {
        const schema = Joi.object().keys({
            COUNTRY_ID: Joi.number().optional(),
            COUNTRY_NAME: Joi.string().required(),
            COUNTRY_CODE: Joi.string().required(),
        })
        const { error } = schema.validate(req.body);
        if (error) {
            res.status(httpStatus.OK).send(ApiStatus.errormsg(error.message))
        }
        else {
            return next()
        }
    };


    post_state = (req: Request, res: Response, next: NextFunction): void => {
        const schema = Joi.object().keys({
            STATE_ID: Joi.number().optional(),
            STATE_NAME: Joi.string().required(),
            COUNTRY_ID: Joi.number().required(),
        })
        const { error } = schema.validate(req.body);
        if (error) {
            res.status(httpStatus.OK).send(ApiStatus.errormsg(error.message))
        }
        else {
            return next()
        }
    };
}


const AdminValidation = new AdminValidationClass();
export default AdminValidation;






