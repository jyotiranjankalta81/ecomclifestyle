"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainService = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const db_connection_1 = require("../db/db-connection");
const sequelize_1 = require("sequelize");
const cart_model_1 = require("../model/cart.model");
const order_model_1 = require("../model/order.model");
const contact_model_1 = require("../model/contact.model");
const address_model_1 = require("../model/address.model");
const RatingReview_model_1 = require("../model/RatingReview.model");
const product_model_1 = require("../model/product.model");
const notification_model_1 = require("../model/notification.model");
const user_model_1 = require("../model/user.model");
dotenv_1.default.config({ path: path_1.default.join(__dirname, "../../.env") });
class mainServiceClass {
    constructor() {
        this.GetCart = (req, user) => __awaiter(this, void 0, void 0, function* () {
            const result = yield db_connection_1.sequelizeDB.query(`SELECT tbl_cart.*,tbl_product.PRODUCT_NAME,tbl_product.PRODUCT_DESCRIPTION,tbl_product.PRODUCT_PRICE,tbl_product.PRODUCT_DISCOUNT,tbl_product.PRODUCT_IMAGE,tbl_product.PRODUCT_DISCOUNTSTATUS,tbl_product.PRODUCT_BARCODE , tbl_Category.CATEGORY_NAME AS CATALOG_NAME , tbl_SubCategory.SUBCATEGORY_NAME AS SUBNAME ,tbl_ProductSize.PRODUCTSIZE_NAME AS PRODUCTSIZE , tbl_ProductColor.PRODUCTCOLOR_NAME AS PRODUCT_COLOR FROM tbl_cart LEFT JOIN tbl_product ON tbl_product.PRODUCT_ID = tbl_cart.CART_PRODUCT_ID  LEFT JOIN tbl_Category ON tbl_Category.CATEGORY_ID = tbl_product.CATEGORY_ID    LEFT JOIN tbl_SubCategory ON tbl_SubCategory.SUBCATEGORY_ID = tbl_product.SUBCATEGORY_ID LEFT JOIN tbl_ProductSize ON tbl_ProductSize.PRODUCTSIZE_ID = tbl_product.PRODUCTSIZE_ID  LEFT JOIN tbl_ProductColor ON tbl_ProductColor.PRODUCTCOLOR_ID = tbl_product.PRODUCTCOLOR_ID WHERE tbl_cart.CART_USER_ID = ${user === null || user === void 0 ? void 0 : user.sub}`, {
                nest: true,
                type: sequelize_1.QueryTypes.SELECT,
            });
            return result;
        });
        this.getCartById = (req, user) => __awaiter(this, void 0, void 0, function* () {
            const result = yield cart_model_1.CartInstance.findOne({
                where: {
                    CART_USER_ID: user.sub,
                    CART_ID: req.CART_ID,
                },
            });
            return result;
        });
        this.getcartbyPID = (req, user) => __awaiter(this, void 0, void 0, function* () {
            const result = yield cart_model_1.CartInstance.findOne({
                where: {
                    CART_USER_ID: user.sub,
                    CART_PRODUCT_ID: req.CART_PRODUCT_ID,
                    CART_PRODUCT_COLOR: req.CART_PRODUCT_COLOR,
                    CART_PRODUCT_QUANTITY: req.CART_PRODUCT_QUANTITY,
                    CART_PRODUCT_SIZE: req.CART_PRODUCT_SIZE,
                },
            });
            return result;
        });
        this.Create_Cart = (req, user) => __awaiter(this, void 0, void 0, function* () {
            const result = yield cart_model_1.CartInstance.create({
                CART_USER_ID: user.sub,
                CART_PRODUCT_ID: req.CART_PRODUCT_ID,
                CART_PRODUCT_COLOR: req.CART_PRODUCT_COLOR,
                CART_PRODUCT_QUANTITY: req.CART_PRODUCT_QUANTITY,
                CART_PRODUCT_SIZE: req.CART_PRODUCT_SIZE,
            });
            return result;
        });
        this.getproductbyid = (productID) => __awaiter(this, void 0, void 0, function* () {
            const result = yield product_model_1.ProductInstance.findOne({
                where: {
                    PRODUCT_ID: productID,
                },
            });
            return result;
        });
        this.get_order = (req, user) => __awaiter(this, void 0, void 0, function* () {
            const result = yield order_model_1.OrderInstance.findAll({
                where: {
                    CREATED_BY: user.sub,
                },
            });
            return result;
        });
        this.create_order = (req, user) => __awaiter(this, void 0, void 0, function* () {
            const result = yield order_model_1.OrderInstance.create({
                CREATED_BY: user.sub,
                ODR_ID: 0,
                USER_ORDER: req.USER_ORDER,
                AMOUNT: req.AMOUNT,
                TYPE_OF_PAYMENT: req.TYPE_OF_PAYMENT,
                USER_ADDRESS: req.USER_ADDRESS,
                ORDER_STATUS: 0,
                ISDELETED: false,
            });
            return result;
        });
        this.clear_cart = (user) => __awaiter(this, void 0, void 0, function* () {
            const result = yield cart_model_1.CartInstance.destroy({
                where: {
                    CART_USER_ID: user.sub,
                },
            });
            return result;
        });
        this.update_CartbyPID = (req, user, olddata) => __awaiter(this, void 0, void 0, function* () {
            const result = yield cart_model_1.CartInstance.update({
                CART_PRODUCT_QUANTITY: olddata.CART_PRODUCT_QUANTITY + req.CART_PRODUCT_QUANTITY,
            }, {
                where: {
                    CART_USER_ID: user.sub,
                    CART_PRODUCT_ID: req.CART_PRODUCT_ID,
                    CART_PRODUCT_COLOR: req.CART_PRODUCT_COLOR,
                    CART_PRODUCT_SIZE: req.CART_PRODUCT_SIZE,
                },
            });
            return result;
        });
        this.update_cart = (req, user) => __awaiter(this, void 0, void 0, function* () {
            const result = yield cart_model_1.CartInstance.update({
                CART_USER_ID: user.sub,
                CART_PRODUCT_ID: req.CART_PRODUCT_ID,
                CART_PRODUCT_COLOR: req.CART_PRODUCT_COLOR,
                CART_PRODUCT_QUANTITY: req.CART_PRODUCT_QUANTITY,
                CART_PRODUCT_SIZE: req.CART_PRODUCT_SIZE,
            }, {
                where: {
                    CART_ID: req.CART_ID,
                },
            });
            return result;
        });
        this.delete_cart = (req, user) => __awaiter(this, void 0, void 0, function* () {
            console.log(req);
            const result = yield cart_model_1.CartInstance.destroy({
                where: {
                    CART_ID: req.CART_ID,
                },
            });
            return result;
        });
        this.contact = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield contact_model_1.ContactInstance.create({
                NAME: req.NAME,
                EMAIL: req.EMAIL,
                PHONE: req.PHONE,
                MESSAGE: req.MESSAGE,
                ISDELETED: false,
            });
            return result;
        });
        this.get_contact = (req, user) => __awaiter(this, void 0, void 0, function* () {
            const result = contact_model_1.ContactInstance.findAll({
                where: {
                    ISDELETED: false,
                },
            });
            return result;
        });
        this.addAddress = (req, user) => __awaiter(this, void 0, void 0, function* () {
            const result = yield address_model_1.AddressInstance.create({
                ADDRESS_USER_ID: user.sub,
                FULLNAME: req.FULLNAME,
                PHONE: req.PHONE,
                FLAT: req.FLAT,
                STREET: req.STREET,
                LANDMARK: req.LANDMARK,
                PIN: req.PIN,
                CITY: req.CITY,
                STATE: req.STATE,
                COUNTRY: req.COUNTRY,
                ISDELETED: false,
            });
            return result;
        });
        this.getAddress = (req, user) => __awaiter(this, void 0, void 0, function* () {
            const result = address_model_1.AddressInstance.findAll({
                where: {
                    ADDRESS_USER_ID: user.sub,
                },
            });
            return result;
        });
        this.updateAddress = (req, user) => __awaiter(this, void 0, void 0, function* () {
            const result = yield address_model_1.AddressInstance.update({
                FULLNAME: req.FULLNAME,
                PHONE: req.PHONE,
                FLAT: req.FLAT,
                STREET: req.STREET,
                LANDMARK: req.LANDMARK,
                PIN: req.PIN,
                CITY: req.CITY,
                STATE: req.STATE,
                COUNTRY: req.COUNTRY,
            }, {
                where: {
                    ADDRESS_ID: req.ADDRESS_ID,
                },
            });
            return result;
        });
        this.deleteAddress = (header) => __awaiter(this, void 0, void 0, function* () {
            const result = yield address_model_1.AddressInstance.destroy({
                where: {
                    ADDRESS_ID: header.ADDRESS_ID,
                },
            });
        });
        this.addRatingReview = (req, user) => __awaiter(this, void 0, void 0, function* () {
            const result = yield RatingReview_model_1.RatingReviewInstance.create({
                CREATED_BY: user.sub,
                PRODUCT_ID: req.PRODUCT_ID,
                RATING: req.RATING,
                REVIEWS: req.REVIEWS,
                ISDELETED: false,
            });
            return result;
        });
        this.getRatingReview = (req, user) => __awaiter(this, void 0, void 0, function* () {
            const result = yield RatingReview_model_1.RatingReviewInstance.findAll({
                where: {
                    PRODUCT_ID: req.PRODUCT_ID,
                },
            });
            return result;
        });
        this.createNotification = (data) => __awaiter(this, void 0, void 0, function* () {
            yield notification_model_1.NotificationInstance.create(data)
                .then((res) => {
                return res;
            })
                .catch((err) => {
                console.log(err);
                return err;
            });
        });
        this.getNotification = (req) => __awaiter(this, void 0, void 0, function* () {
            let { id } = req.query;
            let result;
            if (id) {
                result = yield notification_model_1.NotificationInstance.findAll({
                    where: {
                        NId: id,
                    },
                });
            }
            else {
                result = yield notification_model_1.NotificationInstance.findAll();
            }
            return result;
        });
        this.Produectsearch = (req) => __awaiter(this, void 0, void 0, function* () {
            const query = ` SELECT tbl_product.* , tbl_Category.CATEGORY_NAME AS CATALOG_NAME , tbl_SubCategory.SUBCATEGORY_NAME AS SUBNAME ,tbl_ProductSize.PRODUCTSIZE_NAME AS PRODUCTSIZE , tbl_ProductColor.PRODUCTCOLOR_NAME AS PRODUCT_COLOR FROM tbl_product  LEFT JOIN tbl_Category ON tbl_Category.CATEGORY_ID = tbl_product.CATEGORY_ID    LEFT JOIN tbl_SubCategory ON tbl_SubCategory.SUBCATEGORY_ID = tbl_product.SUBCATEGORY_ID LEFT JOIN tbl_ProductSize ON tbl_ProductSize.PRODUCTSIZE_ID = tbl_product.PRODUCTSIZE_ID  LEFT JOIN tbl_ProductColor ON tbl_ProductColor.PRODUCTCOLOR_ID = tbl_product.PRODUCTCOLOR_ID WHERE tbl_product.PRODUCT_NAME LIKE '%${req.product}%' OR tbl_Category.CATEGORY_NAME LIKE '%${req.product}%' OR tbl_SubCategory.SUBCATEGORY_NAME LIKE '%${req.product}%'`;
            const result = yield db_connection_1.sequelizeDB.query(query, {
                nest: true,
                type: sequelize_1.QueryTypes.SELECT,
            });
            return result;
        });
        this.updateNotification = (data) => __awaiter(this, void 0, void 0, function* () {
            let { id } = data.params;
            let { title, message } = data.body;
            let result = yield notification_model_1.NotificationInstance.update({ TITLE: title, MESSAGE: message }, {
                where: {
                    NId: id,
                },
            });
            return result;
        });
        this.getFilteredProduct = (data) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            const categoryData = ((_a = data === null || data === void 0 ? void 0 : data.CATEGORY_ID) === null || _a === void 0 ? void 0 : _a.length) > 0 ? data === null || data === void 0 ? void 0 : data.CATEGORY_ID : null;
            const subcategoryData = ((_b = data === null || data === void 0 ? void 0 : data.SUBCATEGORY_ID) === null || _b === void 0 ? void 0 : _b.length) > 0 ? data === null || data === void 0 ? void 0 : data.SUBCATEGORY_ID : null;
            const brandData = ((_c = data === null || data === void 0 ? void 0 : data.BRAND_ID) === null || _c === void 0 ? void 0 : _c.length) > 0 ? data === null || data === void 0 ? void 0 : data.BRAND_ID : null;
            const productsizedata = ((_d = data === null || data === void 0 ? void 0 : data.PRODUCTSIZE_ID) === null || _d === void 0 ? void 0 : _d.length) > 0 ? data === null || data === void 0 ? void 0 : data.PRODUCTSIZE_ID : null;
            const productcolorData = ((_e = data === null || data === void 0 ? void 0 : data.PRODUCTCOLOR_ID) === null || _e === void 0 ? void 0 : _e.length) > 0 ? data === null || data === void 0 ? void 0 : data.PRODUCTCOLOR_ID : null;
            if (categoryData ||
                subcategoryData ||
                brandData ||
                productsizedata ||
                productcolorData) {
                const result = yield product_model_1.ProductInstance.findAll({
                    where: {
                        [sequelize_1.Op.or]: [
                            { CATEGORY_ID: categoryData },
                            { SUBCATEGORY_ID: subcategoryData },
                            { BRAND_ID: brandData },
                            { PRODUCTSIZE_ID: { [sequelize_1.Op.like]: `%${productsizedata}%` } },
                            { PRODUCTCOLOR_ID: { [sequelize_1.Op.like]: `%${productcolorData}%` } },
                        ],
                    },
                });
                return result;
            }
            else {
                const result = yield product_model_1.ProductInstance.findAll();
                return result;
            }
        });
        this.getFilteredWithoutProduct = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield product_model_1.ProductInstance.findAll();
            return result;
        });
        this.update_payment = (req) => __awaiter(this, void 0, void 0, function* () {
            const result = yield order_model_1.OrderInstance.update({
                PAYMENT_ID: req.PAYMENT_ID,
                PAYMENT_AT: req.PAYMENT_AT,
            }, {
                where: {
                    ORDER_REFNO: req.ORDER_REFNO,
                }
            });
            return result;
        });
        this.checkpayment = (refno) => __awaiter(this, void 0, void 0, function* () {
            const result = yield db_connection_1.sequelizeDB.query(`SELECT *  FROM tbl_order WHERE ORDER_REFNO = '${refno}' AND PAYMENT_ID IS NOT NULL LIMIT 1;`, {
                nest: true,
                type: sequelize_1.QueryTypes.SELECT,
            });
            return result;
        });
        this.profiledetails = (userid) => __awaiter(this, void 0, void 0, function* () {
            const result = yield user_model_1.UserInstance.findOne({ where: { ID: userid } });
            return result;
        });
    }
}
exports.mainService = new mainServiceClass();
//# sourceMappingURL=main.service.js.map