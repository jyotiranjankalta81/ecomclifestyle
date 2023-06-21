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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const db_connection_1 = require("../db/db-connection");
const sequelize_1 = require("sequelize");
const category_model_1 = require("../model/category.model");
const subcategory_model_1 = require("../model/subcategory.model");
const ProductSize_model_1 = require("../model/ProductSize.model");
const ProductColor_model_1 = require("../model/ProductColor.model");
const product_model_1 = require("../model/product.model");
const banner_model_1 = require("../model/banner.model");
const order_model_1 = require("../model/order.model");
const coupon_model_1 = require("../model/coupon.model");
const Brand_model_1 = require("../model/Brand.model");
class AdminServiceClass {
    constructor() {
        this.GetCategory = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield category_model_1.CategoryInstance.findAll({
                where: {
                    ISDELETED: false,
                },
            });
            return result;
        });
        this.checkcategorybyname = (data) => __awaiter(this, void 0, void 0, function* () {
            const result = yield category_model_1.CategoryInstance.findOne({
                where: {
                    CATEGORY_NAME: data.CATEGORY_NAME,
                },
            });
            return result;
        });
        this.PostCategory = (data) => __awaiter(this, void 0, void 0, function* () {
            const result = yield category_model_1.CategoryInstance.create({
                CATEGORY_NAME: data.CATEGORY_NAME,
            });
            return result;
        });
        this.PutCategory = (data) => __awaiter(this, void 0, void 0, function* () {
            const result = yield category_model_1.CategoryInstance.update({
                CATEGORY_NAME: data.CATEGORY_NAME,
            }, {
                where: {
                    CATEGORY_ID: data.CATEGORY_ID,
                },
            });
            return result;
        });
        this.DeleteCategory = (data) => __awaiter(this, void 0, void 0, function* () {
            const result = yield category_model_1.CategoryInstance.update({
                ISDELETED: true,
            }, {
                where: {
                    CATEGORY_ID: data.CATEGORY_ID,
                },
            });
            return result;
        });
        this.GetSubCategory = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield db_connection_1.sequelizeDB.query(`SELECT * FROM tbl_SubCategory LEFT JOIN tbl_Category ON tbl_Category.CATEGORY_ID  = tbl_SubCategory.CATEGORY_ID WHERE tbl_SubCategory.ISDELETED = '${false}'`, {
                nest: true,
                type: sequelize_1.QueryTypes.SELECT,
            });
            return result;
        });
        this.PostSubCategory = (data) => __awaiter(this, void 0, void 0, function* () {
            const result = yield subcategory_model_1.SubCategoryInstance.create({
                CATEGORY_ID: data.CATEGORY_ID,
                SUBCATEGORY_NAME: data.SUBCATEGORY_NAME,
            });
            return result;
        });
        this.UpdateSubCategory = (data) => __awaiter(this, void 0, void 0, function* () {
            const result = yield subcategory_model_1.SubCategoryInstance.update({
                // CATEGORY_ID: data.CATEGORY_ID,
                SUBCATEGORY_NAME: data.SUBCATEGORY_NAME,
            }, {
                where: {
                    SUBCATEGORY_ID: data.SUBCATEGORY_ID,
                },
            });
            return result;
        });
        this.CheckSubCategory = (data) => __awaiter(this, void 0, void 0, function* () {
            const result = yield subcategory_model_1.SubCategoryInstance.findOne({
                where: {
                    CATEGORY_ID: data.CATEGORY_ID,
                    SUBCATEGORY_NAME: data.SUBCATEGORY_NAME,
                },
            });
            return result;
        });
        this.deleteSubCategory = (data) => __awaiter(this, void 0, void 0, function* () {
            const result = yield subcategory_model_1.SubCategoryInstance.update({
                ISDELETED: true,
            }, {
                where: {
                    SUBCATEGORY_ID: data.SUBCATEGORY_ID,
                },
            });
            return result;
        });
        this.GetProductSize = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield ProductSize_model_1.ProductSizeInstance.findAll({
                where: {
                    ISDELETED: false,
                },
            });
            return result;
        });
        this.PostProductSize = (data) => __awaiter(this, void 0, void 0, function* () {
            const result = yield ProductSize_model_1.ProductSizeInstance.create({
                PRODUCTSIZE_NAME: data.PRODUCTSIZE_NAME,
            });
            return result;
        });
        this.PostProduct = (data, files) => __awaiter(this, void 0, void 0, function* () {
            let productImage = [];
            let productBarcode = "";
            if (files.length > 0) {
                files.forEach((img) => {
                    productImage.push(img.path.replace("public/uploads", "images"));
                });
            }
            else {
                productImage.push('defaults/images/NoImage.png');
            }
            const result = yield product_model_1.ProductInstance.create({
                CATEGORY_ID: data.CATEGORY_ID,
                SUBCATEGORY_ID: data.SUBCATEGORY_ID,
                BRAND_ID: data.BRAND_ID,
                PRODUCTSIZE_ID: data.PRODUCTSIZE_ID,
                PRODUCTCOLOR_ID: data.PRODUCTCOLOR_ID,
                PRODUCT_NAME: data.PRODUCT_NAME,
                PRODUCT_QUANTITY: data.PRODUCT_QUANTITY,
                PRODUCT_DESCRIPTION: data.PRODUCT_DESCRIPTION,
                PRODUCT_PRICE: data.PRODUCT_PRICE,
                PRODUCT_DISCOUNT: 0,
                PRODUCT_DISCOUNTSTATUS: false,
                PRODUCT_TAG: data.PRODUCT_TAG,
                PRODUCT_IMAGE: JSON.stringify(productImage),
                PRODUCT_BARCODE: productBarcode,
                COMPANYCODE: data.COMPANYCODE,
                WEIGHT: data.WEIGHT,
                PACKAGETYPE: data.PACKAGETYPE,
                BRANCHNAME: data.BRANCHNAME,
                TECHINFO: data.TECHINFO,
                ADDITINFO: data.ADDITINFO,
            });
            return result;
        });
        this.PostBanner = (data, files, userid) => __awaiter(this, void 0, void 0, function* () {
            let BannerImage = files === null || files === void 0 ? void 0 : files.path.replace("public/uploads", "images");
            const result = yield banner_model_1.BannnerInstance.create({
                BANNER_DESC: data.BANNER_DESC,
                BANNER_IMAGE: BannerImage,
                CREATED_BY: userid,
            });
            return result;
        });
        this.UpdateBanner = (data, files, userid) => __awaiter(this, void 0, void 0, function* () {
            let BannerImage = files === null || files === void 0 ? void 0 : files.path.replace("public/uploads", "images");
            const result = yield banner_model_1.BannnerInstance.update({
                BANNER_DESC: data.BANNER_DESC,
                BANNER_IMAGE: BannerImage,
                CREATED_BY: userid,
            }, {
                where: {
                    BANNER_ID: data.BANNER_ID,
                },
            });
            return result;
        });
        this.DeleteBanner = (data, files, userid) => __awaiter(this, void 0, void 0, function* () {
            const result = yield banner_model_1.BannnerInstance.update({
                ISDELETED: true,
            }, {
                where: {
                    BANNER_ID: data.BANNER_ID,
                },
            });
            return result;
        });
        this.UpdateProductSize = (data) => __awaiter(this, void 0, void 0, function* () {
            const result = yield ProductSize_model_1.ProductSizeInstance.update({
                PRODUCTSIZE_NAME: data.PRODUCTSIZE_NAME,
            }, {
                where: {
                    PRODUCTSIZE_ID: data.PRODUCTSIZE_ID,
                },
            });
            return result;
        });
        this.DeleteProductSize = (data) => __awaiter(this, void 0, void 0, function* () {
            const result = yield ProductSize_model_1.ProductSizeInstance.update({
                ISDELETED: true,
            }, {
                where: {
                    PRODUCTSIZE_ID: data.PRODUCTSIZE_ID,
                },
            });
            return result;
        });
        this.GetProductColor = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield ProductColor_model_1.ProductColorInstance.findAll({
                where: {
                    ISDELETED: false,
                },
            });
            return result;
        });
        this.GetAllProduct = () => __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT tbl_product.* , tbl_Category.CATEGORY_NAME AS CATALOG_NAME , tbl_SubCategory.SUBCATEGORY_NAME AS SUBNAME ,tbl_ProductSize.PRODUCTSIZE_NAME AS PRODUCTSIZE , tbl_ProductColor.PRODUCTCOLOR_NAME AS PRODUCT_COLOR FROM `tbl_product` LEFT JOIN tbl_Category ON tbl_Category.CATEGORY_ID = tbl_product.CATEGORY_ID    LEFT JOIN tbl_SubCategory ON tbl_SubCategory.SUBCATEGORY_ID = tbl_product.SUBCATEGORY_ID LEFT JOIN tbl_ProductSize ON tbl_ProductSize.PRODUCTSIZE_ID = tbl_product.PRODUCTSIZE_ID  LEFT JOIN tbl_ProductColor ON tbl_ProductColor.PRODUCTCOLOR_ID = tbl_product.PRODUCTCOLOR_ID  WHERE tbl_product.ISDELETED = false;";
            const result = yield db_connection_1.sequelizeDB.query(query, {
                nest: true,
                type: sequelize_1.QueryTypes.SELECT,
            });
            return result;
        });
        this.get_topseller_product = () => __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT tbl_product.* , tbl_Category.CATEGORY_NAME AS CATALOG_NAME , tbl_SubCategory.SUBCATEGORY_NAME AS SUBNAME ,tbl_ProductSize.PRODUCTSIZE_NAME AS PRODUCTSIZE , tbl_ProductColor.PRODUCTCOLOR_NAME AS PRODUCT_COLOR FROM `tbl_product` LEFT JOIN tbl_Category ON tbl_Category.CATEGORY_ID = tbl_product.CATEGORY_ID    LEFT JOIN tbl_SubCategory ON tbl_SubCategory.SUBCATEGORY_ID = tbl_product.SUBCATEGORY_ID LEFT JOIN tbl_ProductSize ON tbl_ProductSize.PRODUCTSIZE_ID = tbl_product.PRODUCTSIZE_ID  LEFT JOIN tbl_ProductColor ON tbl_ProductColor.PRODUCTCOLOR_ID = tbl_product.PRODUCTCOLOR_ID  WHERE tbl_product.ISDELETED = false ORDER  BY RAND() LIMIT 10;";
            const result = yield db_connection_1.sequelizeDB.query(query, {
                nest: true,
                type: sequelize_1.QueryTypes.SELECT,
            });
            return result;
        });
        this.recommended_product = (catrgoryid) => __awaiter(this, void 0, void 0, function* () {
            const result = yield product_model_1.ProductInstance.findAll({
                where: {
                    CATEGORY_ID: catrgoryid,
                },
            });
            return result;
        });
        this.GetBanner = () => __awaiter(this, void 0, void 0, function* () {
            const result = banner_model_1.BannnerInstance.findAll({
                where: {
                    ISDELETED: false,
                },
            });
            return result;
        });
        this.GetBannerbyID = (BANNER_ID) => __awaiter(this, void 0, void 0, function* () {
            const result = banner_model_1.BannnerInstance.findOne({
                where: {
                    BANNER_ID: BANNER_ID,
                    ISDELETED: false,
                },
            });
            return result;
        });
        this.getProductColorbyname = (data) => __awaiter(this, void 0, void 0, function* () {
            const result = yield ProductColor_model_1.ProductColorInstance.findOne({
                where: {
                    PRODUCTCOLOR_NAME: data.PRODUCTCOLOR_NAME,
                },
            });
            return result;
        });
        this.PostProductColor = (data) => __awaiter(this, void 0, void 0, function* () {
            const result = yield ProductColor_model_1.ProductColorInstance.create({
                PRODUCTCOLOR_NAME: data.PRODUCTCOLOR_NAME,
            });
            return result;
        });
        this.UpdateProductColor = (data) => __awaiter(this, void 0, void 0, function* () {
            const result = yield ProductColor_model_1.ProductColorInstance.update({
                PRODUCTCOLOR_NAME: data.PRODUCTCOLOR_NAME,
            }, {
                where: {
                    PRODUCTCOLOR_ID: data.PRODUCTCOLOR_ID,
                },
            });
            return result;
        });
        this.deleteProductColor = (data) => __awaiter(this, void 0, void 0, function* () {
            const result = yield ProductColor_model_1.ProductColorInstance.update({
                ISDELETED: true,
            }, {
                where: {
                    PRODUCTCOLOR_ID: data.PRODUCTCOLOR_ID,
                },
            });
            return result;
        });
        this.UpdateProduct = (data, files) => __awaiter(this, void 0, void 0, function* () {
            let productImage = JSON.parse(data.PRODUCT_IMAGE_OLD);
            let productBarcode = "";
            if (files.length > 0) {
                files.forEach((img) => {
                    productImage.push(img.path.replace("public/uploads", "images"));
                });
            }
            const result = yield product_model_1.ProductInstance.update({
                CATEGORY_ID: data.CATEGORY_ID,
                SUBCATEGORY_ID: data.SUBCATEGORY_ID,
                BRAND_ID: data.BRAND_ID,
                PRODUCTSIZE_ID: data.PRODUCTSIZE_ID,
                PRODUCTCOLOR_ID: data.PRODUCTCOLOR_ID,
                PRODUCT_NAME: data.PRODUCT_NAME,
                PRODUCT_QUANTITY: data.PRODUCT_QUANTITY,
                PRODUCT_DESCRIPTION: data.PRODUCT_DESCRIPTION,
                PRODUCT_PRICE: data.PRODUCT_PRICE,
                PRODUCT_DISCOUNT: data.PRODUCT_DISCOUNT,
                PRODUCT_DISCOUNTSTATUS: data.PRODUCT_DISCOUNTSTATUS,
                PRODUCT_TAG: data.PRODUCT_TAG,
                PRODUCT_IMAGE: JSON.stringify(productImage),
                PRODUCT_BARCODE: productBarcode,
                COMPANYCODE: data.COMPANYCODE,
                WEIGHT: data.WEIGHT,
                PACKAGETYPE: data.PACKAGETYPE,
                BRANCHNAME: data.BRANCHNAME,
                TECHINFO: data.TECHINFO,
                ADDITINFO: data.ADDITINFO,
            }, {
                where: {
                    PRODUCT_ID: data.PRODUCT_ID,
                },
            });
            return result;
        });
        this.AddDiscount = (data, files) => __awaiter(this, void 0, void 0, function* () {
            const result = yield product_model_1.ProductInstance.update({
                PRODUCT_DISCOUNT: data.PRODUCT_DISCOUNT,
                PRODUCT_DISCOUNTSTATUS: true,
            }, {
                where: {
                    PRODUCT_ID: data.PRODUCT_ID,
                },
            });
            return result;
        });
        this.Remove_Discount = (data, files) => __awaiter(this, void 0, void 0, function* () {
            const result = yield product_model_1.ProductInstance.update({
                PRODUCT_DISCOUNT: 0,
                PRODUCT_DISCOUNTSTATUS: false,
            }, {
                where: {
                    PRODUCT_ID: data.PRODUCT_ID,
                },
            });
            return result;
        });
        this.changeOrderStatus = (data) => __awaiter(this, void 0, void 0, function* () {
            const result = yield order_model_1.OrderInstance.update({
                ORDER_STATUS: data.ORDER_STATUS,
            }, {
                where: {
                    ORDER_ID: data.ORDER_ID,
                },
            });
            return result;
        });
        this.getAllOrder = (data, files) => __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM tbl_order LEFT JOIN tbl_user ON tbl_user.ID = tbl_order.CREATED_BY ORDER BY ORDER_ID DESC";
            const result = yield db_connection_1.sequelizeDB.query(query, {
                nest: true,
                type: sequelize_1.QueryTypes.SELECT,
            });
            return result;
        });
        this.getOrderCount = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield order_model_1.OrderInstance.count();
            return result;
        });
        this.getDashboardrder = () => __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM tbl_order LEFT JOIN tbl_user ON tbl_user.ID = tbl_order.CREATED_BY ORDER BY tbl_order.ORDER_ID DESC LIMIT 10";
            const result = yield db_connection_1.sequelizeDB.query(query, {
                nest: true,
                type: sequelize_1.QueryTypes.SELECT,
            });
            return result;
        });
        this.getEarningCount = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield order_model_1.OrderInstance.findAll({
                attributes: [
                    [db_connection_1.sequelizeDB.fn("sum", db_connection_1.sequelizeDB.col("AMOUNT")), "TOTAL_AMOUNT"],
                ],
                where: {
                    ORDER_STATUS: 4,
                },
            });
            return result;
        });
        this.getSalesCount = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield order_model_1.OrderInstance.count({
                where: {
                    ORDER_STATUS: 4,
                },
            });
            return result;
        });
        this.getRecentOrders = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield order_model_1.OrderInstance.findAll({
                limit: 5,
                where: {
                //your where conditions, or without them if you need ANY entry
                },
                order: [["createdAt", "DESC"]],
            });
            return result;
        });
        this.bulkupload = (data) => __awaiter(this, void 0, void 0, function* () {
            const result = yield product_model_1.ProductInstance.create({
                CATEGORY_ID: data.CATEGORY_ID,
                SUBCATEGORY_ID: data.SUBCATEGORY_ID,
                BRAND_ID: data.BRAND_ID,
                PRODUCTSIZE_ID: data.PRODUCTSIZE_ID,
                PRODUCTCOLOR_ID: data.PRODUCTCOLOR_ID,
                PRODUCT_NAME: data.PRODUCT_NAME,
                PRODUCT_QUANTITY: data.PRODUCT_QUANTITY,
                PRODUCT_DESCRIPTION: data.PRODUCT_DESCRIPTION,
                PRODUCT_PRICE: data.PRODUCT_PRICE,
                PRODUCT_DISCOUNT: data.PRODUCT_DISCOUNT,
                PRODUCT_DISCOUNTSTATUS: data.PRODUCT_DISCOUNTSTATUS === 0 ? false : true,
                PRODUCT_TAG: Math.floor(Math.random() * 1000000000),
                PRODUCT_IMAGE: JSON.stringify(['defaults/images/NoImage.png']),
                COMPANYCODE: data.COMPANYCODE,
                WEIGHT: data.WEIGHT,
                PACKAGETYPE: 'Parcel',
                BRANCHNAME: data.BRANCHNAME,
                TECHINFO: data.TECHINFO,
                ADDITINFO: data.ADDITINFO,
            });
            return result;
        });
        this.createCoupon = (data, files, user) => __awaiter(this, void 0, void 0, function* () {
            let couponimage = files.path.replace("public/uploads", "images") || 'defaults/images/NoImage.png';
            let result = yield coupon_model_1.CouponInstance.create({
                COUPON_IMAGE: couponimage,
                COUPON_CODE: data.COUPON_CODE,
                COUPON_MINPRICE: data.COUPON_MINPRICE,
                COUPON_MAXDISCOUNT: data.COUPON_MAXDISCOUNT,
                COUPON_DISCOUNTPERCENT: data.COUPON_DISCOUNTPERCENT,
                COUPON_MINORDER: data.COUPON_MINORDER,
                COUPON_VALIDITY: data.COUPON_VALIDITY,
                ADDED_BY: user.sub,
            });
            return result;
        });
        this.checkbrandbyname = (name) => __awaiter(this, void 0, void 0, function* () {
            let result = yield Brand_model_1.BrandInstance.findOne({
                where: {
                    BRAND_NAME: name,
                },
            });
            return result;
        });
        this.CreateBrands = (data) => __awaiter(this, void 0, void 0, function* () {
            let uploadbrand = data.file.path && data.file.path.replace("public/uploads", "images") || '';
            let result = yield Brand_model_1.BrandInstance.create({
                BRAND_NAME: data.body.BRAND_NAME,
                BRAND_IMAGE: uploadbrand,
            }).catch((err) => {
                console.error(err);
            });
            return result;
        });
        this.getBrands = () => __awaiter(this, void 0, void 0, function* () {
            let result = yield Brand_model_1.BrandInstance.findAll();
            return result;
        });
        this.getCoupon = (data) => __awaiter(this, void 0, void 0, function* () {
            let { id } = data.query;
            let result;
            if (id) {
                result = yield coupon_model_1.CouponInstance.findAll({
                    where: {
                        COUPON_ID: id,
                    },
                });
                return result;
            }
            result = yield coupon_model_1.CouponInstance.findAll();
            return result;
        });
        this.delCoupon = (data) => __awaiter(this, void 0, void 0, function* () {
            let { COUPON_ID } = data;
            let result = yield coupon_model_1.CouponInstance.destroy({
                where: {
                    COUPON_ID: COUPON_ID,
                },
            });
            return result;
        });
        this.updateCoupon = (data, files, user) => __awaiter(this, void 0, void 0, function* () {
            let couponimage = files.path.replace("public/uploads", "images") || 'defaults/images/NoImage.png';
            let result = yield coupon_model_1.CouponInstance.update({
                COUPON_IMAGE: couponimage,
                COUPON_CODE: data.COUPON_CODE,
                COUPON_MINPRICE: data.COUPON_MINPRICE,
                COUPON_MAXDISCOUNT: data.COUPON_MAXDISCOUNT,
                COUPON_DISCOUNTPERCENT: data.COUPON_DISCOUNTPERCENT,
                COUPON_MINORDER: data.COUPON_MINORDER,
                COUPON_VALIDITY: data.COUPON_VALIDITY,
                COUPON_EXPIRE: data.COUPON_EXPIRE,
                ADDED_BY: user.sub,
                ISDELETED: false,
            }, {
                where: {
                    COUPON_ID: data.COUPON_ID,
                },
            });
            if (result[0] === 0) {
                return false;
            }
            return true;
        });
        this.applyCoupon = (data) => __awaiter(this, void 0, void 0, function* () {
            let coupon = yield coupon_model_1.CouponInstance.findOne({
                where: {
                    COUPON_CODE: data.COUPON_CODE,
                },
                attributes: {
                    exclude: [
                        "ISDELETED",
                        "ADDED_BY",
                        "createdAt",
                        "updatedAt",
                        "COUPON_ID",
                        "COUPON_VALIDITY",
                        "COUPON_EXPIRE",
                    ],
                },
            });
            return coupon;
        });
        this.expireCoupons = (data) => __awaiter(this, void 0, void 0, function* () {
            const now = new Date();
            now.setHours(0);
            now.setMinutes(0);
            now.setSeconds(0);
            now.setMilliseconds(0);
            console.log(now);
            // Find all coupons that are not already expired and have a validity date in the past
            const coupons = yield coupon_model_1.CouponInstance.findAll({
                where: {
                    COUPON_EXPIRE: false,
                    COUPON_VALIDITY: {
                        [sequelize_1.Op.lte]: now,
                    },
                },
            });
            console.log(coupons);
            // Update each coupon to mark it as expired
            yield Promise.all(coupons.map((coupon) => {
                coupon.setDataValue("COUPON_EXPIRE", true);
                return coupon.save();
            }));
            // Return a response indicating how many coupons were marked as expired
            return { expiredCoupons: coupons.length };
        });
        this.updateBrands = (data) => __awaiter(this, void 0, void 0, function* () {
            let upload = data.body.BRAND_IMAGE || data.file.path && data.file.path.replace("public/uploads", "images");
            let result = yield Brand_model_1.BrandInstance.update({
                BRAND_IMAGE: upload,
                BRAND_NAME: data.body.BRAND_NAME,
                BRAND_STATUS: data.body.BRAND_STATUS,
            }, {
                where: {
                    BRAND_ID: data.body.BRAND_ID,
                },
            });
            return true;
        });
        this.delBrands = (data) => __awaiter(this, void 0, void 0, function* () {
            let { id } = data.query;
            let result = yield Brand_model_1.BrandInstance.destroy({
                where: {
                    BRAND_ID: id,
                },
            });
            return result;
        });
        this.CategoryPDF = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield category_model_1.CategoryInstance.findAll({
                attributes: ['CATEGORY_ID', 'CATEGORY_NAME'],
            });
            return result;
        });
    }
}
exports.AdminService = new AdminServiceClass();
//# sourceMappingURL=admin.service.js.map