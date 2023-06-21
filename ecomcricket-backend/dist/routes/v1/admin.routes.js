"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middlewares/auth");
const admin_controller_1 = require("../../controller/admin.controller");
const validate_1 = require("../../middlewares/validate");
const MainValidation_1 = require("../../validation/MainValidation");
const AdminValidation_1 = __importDefault(require("../../validation/AdminValidation"));
const multar_upload_1 = __importDefault(require("../../utils/multers/multar_upload"));
const adminrouter = express_1.default.Router();
//category--------------------------------------------------
adminrouter.get("/product-category", admin_controller_1.AdminController.get_category);
adminrouter.post("/product-category", (0, auth_1.auth)(), admin_controller_1.AdminController.post_category);
adminrouter.put("/product-category", (0, auth_1.auth)(), admin_controller_1.AdminController.put_category);
adminrouter.put("/delete-product-category", (0, auth_1.auth)(), admin_controller_1.AdminController.delete_category);
//sub category----------------------------------------------------
adminrouter.get("/product-subcategory", admin_controller_1.AdminController.get_subcategory);
adminrouter.post("/product-subcategory", (0, auth_1.auth)(), admin_controller_1.AdminController.post_subcategory);
adminrouter.put("/product-subcategory", (0, auth_1.auth)(), admin_controller_1.AdminController.put_subcategory);
adminrouter.put("/delete-product-subcategory", (0, auth_1.auth)(), admin_controller_1.AdminController.delete_subcategory);
// product size----------------------------------------------------------------------
adminrouter.get("/product-size", admin_controller_1.AdminController.get_productsize);
adminrouter.post("/product-size", (0, auth_1.auth)(), admin_controller_1.AdminController.post_productsize);
adminrouter.put("/product-size", (0, auth_1.auth)(), admin_controller_1.AdminController.put_productsize);
adminrouter.put("/delete-product-size", (0, auth_1.auth)(), admin_controller_1.AdminController.delete_productsize);
// product color----------------------------------------------------------------------
adminrouter.get("/product-color", admin_controller_1.AdminController.get_productcolor);
adminrouter.post("/product-color", (0, auth_1.auth)(), admin_controller_1.AdminController.post_productcolor);
adminrouter.put("/product-color", (0, auth_1.auth)(), admin_controller_1.AdminController.put_productColor);
adminrouter.put("/delete-product-color", (0, auth_1.auth)(), admin_controller_1.AdminController.delete_productcolor);
//product ----------------------------------------------------------------------------------
adminrouter.get("/product", admin_controller_1.AdminController.get_product);
adminrouter.post("/product", (0, auth_1.auth)(), multar_upload_1.default.array('PRODUCT_IMAGE'), MainValidation_1.ProductValidation, admin_controller_1.AdminController.post_product);
adminrouter.put("/product", (0, auth_1.auth)(), multar_upload_1.default.array('PRODUCT_IMAGE'), MainValidation_1.ProductValidation, admin_controller_1.AdminController.put_product);
adminrouter.put("/delete-product-color", (0, auth_1.auth)(), admin_controller_1.AdminController.delete_productcolor);
//bannner----------------------------------------------------------------------
adminrouter.get("/banner", admin_controller_1.AdminController.get_bannner);
adminrouter.post("/banner", (0, auth_1.auth)(), multar_upload_1.default.single('BANNER_IMAGE'), MainValidation_1.BannerValidation, admin_controller_1.AdminController.post_banner);
adminrouter.put("/banner", (0, auth_1.auth)(), multar_upload_1.default.single('BANNER_IMAGE'), MainValidation_1.BannerValidation, admin_controller_1.AdminController.put_banner);
adminrouter.put("/delete-banner", (0, auth_1.auth)(), admin_controller_1.AdminController.delete_banner);
//discount---------------------------------------------
adminrouter.put("/add-discount", (0, auth_1.auth)(), (0, validate_1.validate)(MainValidation_1.ProductDiscountValidation.body), admin_controller_1.AdminController.Add_Discount);
adminrouter.put("/remove-discount", (0, auth_1.auth)(), admin_controller_1.AdminController.Remove_Discount);
//order -------------------------------------------------
adminrouter.get("/allorder", (0, auth_1.auth)(), admin_controller_1.AdminController.getAllOrder);
//order status----------------------------------
adminrouter.put("/chnage-order-status", (0, auth_1.auth)(), admin_controller_1.AdminController.changeOrderStatus);
//Dashboard -------------------------------------------------
adminrouter.get("/dashboard", (0, auth_1.auth)(), admin_controller_1.AdminController.getAllCount);
adminrouter.get("/dashboard-order", admin_controller_1.AdminController.getDashboardrder);
// Bulk upload
adminrouter.post("/bulk-product-upload", (0, auth_1.auth)(), AdminValidation_1.default.Bulkupload_ProductValidation, admin_controller_1.AdminController.BulkProductUpload);
//COUPONS
adminrouter.post("/coupon", (0, auth_1.auth)(), multar_upload_1.default.single('COUPON_IMAGE'), admin_controller_1.AdminController.create_coupon);
adminrouter.get("/coupon", (0, auth_1.auth)(), admin_controller_1.AdminController.getCoupon);
adminrouter.put("/coupon", (0, auth_1.auth)(), multar_upload_1.default.single('COUPON_IMAGE'), admin_controller_1.AdminController.updateCoupon);
adminrouter.delete("/coupon", (0, auth_1.auth)(), admin_controller_1.AdminController.delCoupon);
adminrouter.post("/apply-coupon", (0, auth_1.auth)(), admin_controller_1.AdminController.applyCoupon);
adminrouter.get("/coupon-expire", (0, auth_1.auth)(), admin_controller_1.AdminController.expireCoupons);
//brands
adminrouter.post("/product-brands", (0, auth_1.auth)(), multar_upload_1.default.single("BRAND_IMAGE"), admin_controller_1.AdminController.CreateBrands);
adminrouter.get("/product-brands", admin_controller_1.AdminController.getBrands);
adminrouter.put("/product-brands", (0, auth_1.auth)(), multar_upload_1.default.single("BRAND_IMAGE"), admin_controller_1.AdminController.updateBrands);
adminrouter.delete("/product-brands", (0, auth_1.auth)(), admin_controller_1.AdminController.delBrands);
// ---------------------pdfkit--------------------------
adminrouter.post('/product-csv', (0, auth_1.auth)(), admin_controller_1.AdminController.export_csv);
adminrouter.post('/pfd-category', (0, auth_1.auth)(), admin_controller_1.AdminController.export_Category);
adminrouter.post('/pfd-subcategory', (0, auth_1.auth)(), admin_controller_1.AdminController.export_SubCategory);
adminrouter.post('/pfd-brand', (0, auth_1.auth)(), admin_controller_1.AdminController.export_Brand);
adminrouter.post('/pfd-color', (0, auth_1.auth)(), admin_controller_1.AdminController.export_Color);
adminrouter.post('/pfd-size', (0, auth_1.auth)(), admin_controller_1.AdminController.export_Size);
exports.default = adminrouter;
//# sourceMappingURL=admin.routes.js.map