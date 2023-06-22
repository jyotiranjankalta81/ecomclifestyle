"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainrouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middlewares/auth");
const main_controller_1 = require("../../controller/main.controller");
const admin_controller_1 = require("../../controller/admin.controller");
const invoice_controller_1 = require("../../controller/invoice.controller");
exports.mainrouter = express_1.default.Router();
exports.mainrouter.get("/product-category", admin_controller_1.AdminController.get_category);
exports.mainrouter.get("/product-subcategory", admin_controller_1.AdminController.get_subcategory);
exports.mainrouter.get("/product-size", admin_controller_1.AdminController.get_productsize);
exports.mainrouter.get("/product-color", admin_controller_1.AdminController.get_productcolor);
exports.mainrouter.get("/product", admin_controller_1.AdminController.get_product);
// top seller --------------------------------------------------------------
exports.mainrouter.get("/top-product", admin_controller_1.AdminController.get_topseller_product);
exports.mainrouter.post("/recommended-product", admin_controller_1.AdminController.recommended_product);
//SALES --------------------------------------------------------------
exports.mainrouter.post("/sales-filter", main_controller_1.MainController.filter_product);
//cart-----------------------------------------------------------------------
exports.mainrouter.get("/get_cart", (0, auth_1.auth)(), main_controller_1.MainController.get_cart);
exports.mainrouter.post("/create_cart", (0, auth_1.auth)(), main_controller_1.MainController.create_cart);
exports.mainrouter.put("/update_cart", (0, auth_1.auth)(), main_controller_1.MainController.update_cart);
exports.mainrouter.delete("/delete_cart", (0, auth_1.auth)(), main_controller_1.MainController.delete_cart);
//order-----------------------------------------------------------------------
exports.mainrouter.post("/create_order", (0, auth_1.auth)(), main_controller_1.MainController.create_order);
exports.mainrouter.post("/create-session", main_controller_1.MainController.create_session);
exports.mainrouter.get("/my_order", (0, auth_1.auth)(), main_controller_1.MainController.get_order);
// contact--------------------------------------------------------------------
exports.mainrouter.post("/contact", main_controller_1.MainController.contact);
exports.mainrouter.get("/contact", (0, auth_1.auth)(), main_controller_1.MainController.get_contact);
// address-----------------------------------------------------------------
exports.mainrouter.post("/address", (0, auth_1.auth)(), main_controller_1.MainController.addAddress);
exports.mainrouter.get("/address", (0, auth_1.auth)(), main_controller_1.MainController.getAddress);
exports.mainrouter.put("/address", (0, auth_1.auth)(), main_controller_1.MainController.updateAddress);
exports.mainrouter.delete("/address", (0, auth_1.auth)(), main_controller_1.MainController.deleteAddress);
// rating and reviews
exports.mainrouter.post("/rating-review", (0, auth_1.auth)(), main_controller_1.MainController.addRatingReview);
exports.mainrouter.get("/rating-review", main_controller_1.MainController.getRatingReview);
///NOTIFICATIONS ------------------------------------------------
exports.mainrouter.post("/notification", (0, auth_1.auth)(), main_controller_1.MainController.createNotification);
exports.mainrouter.get("/notification", main_controller_1.MainController.getNotification);
exports.mainrouter.put("/notification/:id", (0, auth_1.auth)(), main_controller_1.MainController.updateNotification);
//search---------------------------------------------------------------
exports.mainrouter.post("/product-search", main_controller_1.MainController.Produectsearch);
//order payment 
exports.mainrouter.post("/update-payment", main_controller_1.MainController.update_payment);
exports.mainrouter.post("/order-invoice", (0, auth_1.auth)(), invoice_controller_1.orderInvoice);
//# sourceMappingURL=main.routes.js.map