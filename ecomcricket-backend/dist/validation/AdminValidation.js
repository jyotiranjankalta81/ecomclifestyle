"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const joi_1 = __importDefault(require("joi"));
const apistatus_1 = __importDefault(require("../utils/apistatus"));
class AdminValidationClass {
    constructor() {
        this.Bulkupload_ProductValidation = (req, res, next) => {
            const schema = joi_1.default.object().keys({
                productcsv: joi_1.default.array().items(joi_1.default.object({
                    CATEGORY_ID: joi_1.default.number().required().messages({ 'any.required': 'Opps ! please check your csv , Category Id is required ' }),
                    SUBCATEGORY_ID: joi_1.default.number().required().messages({ 'any.required': 'Opps ! please check your csv , Sub Category Id is required ' }),
                    BRAND_ID: joi_1.default.number().required().messages({ 'any.required': 'Opps ! please check your csv , Brand Id is required ' }),
                    PRODUCTSIZE_ID: joi_1.default.any().required().messages({ 'any.required': 'Opps ! please check your csv , Brand Id is required ' }),
                    PRODUCTCOLOR_ID: joi_1.default.any().required().messages({ 'any.required': 'Opps ! please check your csv , Product Color Id is required ' }),
                    PRODUCT_NAME: joi_1.default.string().required().messages({ 'any.required': 'Opps ! please check your csv ,  Product Name is required ' }),
                    PRODUCT_QUANTITY: joi_1.default.number().required().messages({ 'any.required': 'Opps ! please check your csv ,  Product Quantity is required ' }),
                    PRODUCT_DESCRIPTION: joi_1.default.string().required().messages({ 'any.required': 'Opps ! please check your csv , product description Id is required ' }),
                    PRODUCT_PRICE: joi_1.default.number().required().messages({ 'any.required': 'Opps ! please check your csv ,product price is required ' }),
                    PRODUCT_DISCOUNTSTATUS: joi_1.default.any().required().messages({ 'any.required': 'Opps ! please check your csv , Product Description  is required ' }),
                    PRODUCT_DISCOUNT: joi_1.default.any().required().messages({ 'any.required': 'Opps ! please check your csv , Product Descount is required ' }),
                    COMPANYCODE: joi_1.default.any().required().messages({ 'any.required': 'Opps ! please check your csv , Company Code is required ' }),
                    WEIGHT: joi_1.default.any().required().messages({ 'any.required': 'Opps ! please check your csv , Weight is required ' }),
                    BRANCHNAME: joi_1.default.any().required().required().messages({ 'any.required': 'Opps ! please check your csv ,Branch Name  is required ' }),
                    TECHINFO: joi_1.default.any().required().required().messages({ 'any.required': 'Opps ! please check your csv ,Technical Info  is required ' }),
                    ADDITINFO: joi_1.default.any().required().messages({ 'any.required': 'Opps ! please check your csv , Additional INformation  is required ' })
                }))
            });
            const { error } = schema.validate(req.body);
            if (error) {
                res.status(http_status_1.default.OK).send(apistatus_1.default.errormsg(error.message));
            }
            else {
                return next();
            }
        };
    }
}
const AdminValidation = new AdminValidationClass();
exports.default = AdminValidation;
//# sourceMappingURL=AdminValidation.js.map