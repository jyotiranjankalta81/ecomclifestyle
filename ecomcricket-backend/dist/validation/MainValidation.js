"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDiscountValidation = exports.BannerValidation = exports.ProductValidation = void 0;
const http_status_1 = __importDefault(require("http-status"));
const joi_1 = __importDefault(require("joi"));
const apistatus_1 = __importDefault(require("../utils/apistatus"));
const ProductValidation = (req, res, next) => {
    const schema = joi_1.default.object({
        CATEGORY_ID: joi_1.default.number().required(),
        SUBCATEGORY_ID: joi_1.default.number().required(),
        BRAND_ID: joi_1.default.number().required(),
        PRODUCTSIZE_ID: joi_1.default.string().required(),
        PRODUCTCOLOR_ID: joi_1.default.string().required(),
        PRODUCT_NAME: joi_1.default.string().required(),
        PRODUCT_QUANTITY: joi_1.default.number().required(),
        PRODUCT_DESCRIPTION: joi_1.default.string().required(),
        PRODUCT_PRICE: joi_1.default.number().required(),
        PRODUCT_TAG: joi_1.default.string().required(),
        PRODUCT_IMAGE: joi_1.default.any(),
        PRODUCT_BARCODE: joi_1.default.any(),
        COMPANYCODE: joi_1.default.any(),
        WEIGHT: joi_1.default.any().required(),
        PACKAGETYPE: joi_1.default.any().required(),
        BRANCHNAME: joi_1.default.any().required(),
        PRODUCT_DISCOUNTSTATUS: joi_1.default.number(),
        PRODUCT_DISCOUNT: joi_1.default.any(),
        PRODUCT_ID: joi_1.default.any(),
        TECHINFO: joi_1.default.any().required(),
        ADDITINFO: joi_1.default.any().required(),
        PRODUCT_IMAGE_OLD: joi_1.default.any().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(http_status_1.default.OK).send(apistatus_1.default.errormsg(error.message));
    }
    else {
        return next();
    }
};
exports.ProductValidation = ProductValidation;
const BannerValidation = (req, res, next) => {
    const schema = joi_1.default.object({
        BANNER_DESC: joi_1.default.string().required(),
        BANNER_IMAGE: joi_1.default.any(),
        BANNER_ID: joi_1.default.any(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(http_status_1.default.OK).send(apistatus_1.default.errormsg(error.message));
    }
    else {
        return next();
    }
};
exports.BannerValidation = BannerValidation;
exports.ProductDiscountValidation = {
    body: joi_1.default.object({
        PRODUCT_DISCOUNT: joi_1.default.number().required(),
        PRODUCT_ID: joi_1.default.number().required(),
    }),
};
//# sourceMappingURL=MainValidation.js.map