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
exports.AdminController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../utils/catchAsync");
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const admin_service_1 = require("../service/admin.service");
const main_service_1 = require("../service/main.service");
const apistatus_1 = __importDefault(require("../utils/apistatus"));
const custom_helpers_1 = __importDefault(require("../utils/custom_helpers"));
const country_model_1 = require("../model/country.model");
const state_model_1 = require("../model/state.model");
const fs = require("fs");
const PDFDocument = require("pdfkit-table");
class AdminControllerClass {
    constructor() {
        this.get_category = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield admin_service_1.AdminService.GetCategory();
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: "Your Form has subbmitted successfully",
                    data: category,
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.post_category = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const checkcategorybyname = yield admin_service_1.AdminService.checkcategorybyname(req.body);
                if (checkcategorybyname) {
                    return res
                        .status(http_status_1.default.BAD_REQUEST)
                        .send(apistatus_1.default.errormsg("Category Code Already Exist!"));
                }
                else {
                    const category = yield admin_service_1.AdminService.PostCategory(req.body, req.file);
                    return res
                        .status(http_status_1.default.OK)
                        .send(apistatus_1.default.successmsg("Category Created Successfully"));
                }
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send(apistatus_1.default.errormsg(error.message));
            }
        }));
        this.put_category = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield admin_service_1.AdminService.PutCategory(req.body, req.file);
                return res
                    .status(http_status_1.default.OK)
                    .send(apistatus_1.default.successmsg("Category Updated successfully"));
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send(apistatus_1.default.errormsg(error === null || error === void 0 ? void 0 : error.message));
            }
        }));
        this.delete_category = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield admin_service_1.AdminService.DeleteCategory(req.body);
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: "Category Updated successfully",
                    data: category,
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.get_subcategory = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield admin_service_1.AdminService.GetSubCategory();
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: "Your Form has subbmitted successfully",
                    data: category,
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.post_subcategory = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const CheckSubCategory = yield admin_service_1.AdminService.CheckSubCategory(req.body);
                if (CheckSubCategory) {
                    return res.status(http_status_1.default.BAD_REQUEST).send({
                        success: false,
                        message: "Sub category product already exist!",
                        data: [],
                    });
                }
                else {
                    const category = yield admin_service_1.AdminService.PostSubCategory(req.body);
                    return res.status(http_status_1.default.OK).send({
                        success: true,
                        message: "SubCategory Created successfully",
                        data: category,
                    });
                }
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.put_subcategory = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield admin_service_1.AdminService.UpdateSubCategory(req.body);
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: "SubCategory Updated successfully",
                    data: category,
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.delete_subcategory = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield admin_service_1.AdminService.deleteSubCategory(req.body);
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: "SubCategory Deleted successfully",
                    data: category,
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.get_productsize = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield admin_service_1.AdminService.GetProductSize();
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: "subbmitted successfully",
                    data: category,
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.post_productsize = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield admin_service_1.AdminService.PostProductSize(req.body);
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: " Created successfully",
                    data: category,
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.put_productsize = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield admin_service_1.AdminService.UpdateProductSize(req.body);
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: " Updated successfully",
                    data: category,
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.delete_productsize = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield admin_service_1.AdminService.DeleteProductSize(req.body);
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: " Updated successfully",
                    data: category,
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.get_productcolor = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield admin_service_1.AdminService.GetProductColor();
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: " fetched successfully",
                    data: category,
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.get_topseller_product = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield admin_service_1.AdminService.get_topseller_product();
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: " fetched successfully",
                    data: category,
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.recommended_product = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield admin_service_1.AdminService.recommended_product(req.body.CATEORY_ID);
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: " fetched successfully",
                    data: category,
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.get_product = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield admin_service_1.AdminService.GetAllProduct();
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: " fetched successfully",
                    data: category,
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.get_bannner = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield admin_service_1.AdminService.GetBanner();
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: " fetched successfully",
                    data: category,
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.post_product = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const category = yield admin_service_1.AdminService.PostProduct(req.body, req.files);
            try {
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: " Created successfully",
                    data: category,
                });
            }
            catch (error) {
                console.log("product", error);
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.post_banner = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.file) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send(apistatus_1.default.errormsg("Banner image is required"));
            }
            const getheader = req.header("authorization");
            const users = (0, jwt_decode_1.default)(getheader);
            const category = yield admin_service_1.AdminService.PostBanner(req.body, req.file, users === null || users === void 0 ? void 0 : users.sub);
            try {
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: " Created successfully",
                    data: category,
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.put_banner = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.file) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send(apistatus_1.default.errormsg("Banner image is required"));
            }
            const getbannerbyid = yield admin_service_1.AdminService.GetBannerbyID(req.body.BANNER_ID);
            if (getbannerbyid) {
                const getheader = req.header("authorization");
                const users = (0, jwt_decode_1.default)(getheader);
                const category = yield admin_service_1.AdminService.UpdateBanner(req.body, req.file, users === null || users === void 0 ? void 0 : users.sub);
                try {
                    return res
                        .status(http_status_1.default.OK)
                        .send(apistatus_1.default.successmsg("Banner Updated successfully"));
                }
                catch (error) {
                    return res.status(http_status_1.default.BAD_REQUEST).send({
                        success: false,
                        message: "Somthing went wrong!",
                        data: error,
                    });
                }
            }
            else {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "invalid Id!", data: [] });
            }
        }));
        this.delete_banner = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const getbannerbyid = yield admin_service_1.AdminService.GetBannerbyID(req.body.BANNER_ID);
            if (getbannerbyid) {
                const getheader = req.header("authorization");
                const users = (0, jwt_decode_1.default)(getheader);
                const category = yield admin_service_1.AdminService.DeleteBanner(req.body, req.files, users === null || users === void 0 ? void 0 : users.sub);
                try {
                    return res.status(http_status_1.default.OK).send({
                        success: true,
                        message: " Created successfully",
                        data: category,
                    });
                }
                catch (error) {
                    return res.status(http_status_1.default.BAD_REQUEST).send({
                        success: false,
                        message: "Somthing went wrong!",
                        data: error,
                    });
                }
            }
            else {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "invalid Id!", data: [] });
            }
        }));
        this.Add_Discount = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield admin_service_1.AdminService.AddDiscount(req.body, req.files);
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: " Created successfully",
                    data: category,
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.Remove_Discount = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield admin_service_1.AdminService.Remove_Discount(req.body, req.files);
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: " Created successfully",
                    data: category,
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.changeOrderStatus = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield admin_service_1.AdminService.changeOrderStatus(req.body);
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: " Created successfully",
                    data: category,
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.getAllOrder = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const datafile = yield admin_service_1.AdminService.getAllOrder(req.body, req.files);
                for (let i = 0; i < datafile.length; i++) {
                    let userarray = JSON.parse((_a = datafile[i]) === null || _a === void 0 ? void 0 : _a.USER_ORDER);
                    let orderarray = [];
                    for (let j = 0; j < userarray.length; j++) {
                        let newrpid = JSON.parse(datafile[i].USER_ORDER)[j];
                        let product = yield main_service_1.mainService.getproductbyid(newrpid.product_id);
                        newrpid.product_id = JSON.stringify(product);
                        orderarray.push(newrpid);
                    }
                    datafile[i].USER_ORDER = orderarray;
                }
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: " fetched successfully",
                    data: datafile,
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.post_productcolor = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const checksizeduplicate = yield admin_service_1.AdminService.getProductColorbyname(req.body);
                if (checksizeduplicate) {
                    return res
                        .status(http_status_1.default.BAD_GATEWAY)
                        .send(apistatus_1.default.errormsg("Color Already exist"));
                }
                else {
                    const category = yield admin_service_1.AdminService.PostProductColor(req.body, req.file);
                    return res.status(http_status_1.default.OK).send({
                        success: true,
                        message: " submitted successfully",
                        data: category,
                    });
                }
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_GATEWAY)
                    .send(apistatus_1.default.errormsg(error === null || error === void 0 ? void 0 : error.message));
            }
        }));
        this.put_productColor = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // const checksizeduplicate: any = await AdminService.getProductColorbyname(req.body as any);
                // if (checksizeduplicate) {
                //   return res.status(httpStatus.BAD_GATEWAY).send(ApiStatus.errormsg("Color Already exist"))
                // }
                const category = yield admin_service_1.AdminService.UpdateProductColor(req.body, req.file);
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: "updated  successfully",
                    data: category,
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_GATEWAY)
                    .send(apistatus_1.default.errormsg(error === null || error === void 0 ? void 0 : error.message));
            }
        }));
        this.put_product = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const datafile = yield admin_service_1.AdminService.UpdateProduct(req.body, req.files);
            try {
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: " updated  successfully",
                    data: datafile,
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.delete_productcolor = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const category = yield admin_service_1.AdminService.deleteProductColor(req.query);
            try {
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: " updated  successfully",
                    data: category,
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.delete_product = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const product = req.query;
                if (!product.PRODUCT_ID) {
                    return res
                        .status(http_status_1.default.BAD_REQUEST)
                        .send(apistatus_1.default.errormsg("Product Id is required"));
                }
                const category = yield admin_service_1.AdminService.delete_product(req.query);
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: " Deleted Successfully",
                    data: category,
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.getAllCount = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const countOrder = yield admin_service_1.AdminService.getOrderCount();
                const totalEarning = yield admin_service_1.AdminService.getEarningCount();
                const countSales = yield admin_service_1.AdminService.getSalesCount();
                const totalProfit = yield admin_service_1.AdminService.getOrderCount();
                const countPurches = yield admin_service_1.AdminService.getOrderCount();
                const recentOrders = yield admin_service_1.AdminService.getRecentOrders();
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: " fetched successfully",
                    data: {
                        countOrder: countOrder,
                        totalEarning: totalEarning,
                        countSales: countSales,
                        totalProfit: totalProfit,
                        countPurches: countPurches,
                        recentOrders: recentOrders,
                    },
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.getDashboardrder = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _b;
            try {
                const datafile = yield admin_service_1.AdminService.getDashboardrder();
                for (let i = 0; i < datafile.length; i++) {
                    let userarray = JSON.parse((_b = datafile[i]) === null || _b === void 0 ? void 0 : _b.USER_ORDER);
                    let orderarray = [];
                    for (let j = 0; j < userarray.length; j++) {
                        let newrpid = JSON.parse(datafile[i].USER_ORDER)[j];
                        let product = yield main_service_1.mainService.getproductbyid(newrpid.product_id);
                        newrpid.product_id = JSON.stringify(product);
                        orderarray.push(newrpid);
                    }
                    datafile[i].USER_ORDER = orderarray;
                }
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: " fetched successfully",
                    data: datafile,
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.BulkProductUpload = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const productcsv = req.body.productcsv;
                if (productcsv.length > 0) {
                    productcsv.forEach((data, index) => __awaiter(this, void 0, void 0, function* () {
                        yield admin_service_1.AdminService.bulkupload(data);
                    }));
                    return res
                        .status(http_status_1.default.OK)
                        .send(apistatus_1.default.successmsg("Product Uploaded Successfully!"));
                }
                else {
                    return res
                        .status(http_status_1.default.OK)
                        .send(apistatus_1.default.errormsg("please ensert data to upload!"));
                }
            }
            catch (error) {
                return res.status(http_status_1.default.OK).send(apistatus_1.default.errormsg(error === null || error === void 0 ? void 0 : error.message));
            }
        }));
        this.create_coupon = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const getheader = req.header("authorization");
                const users = (0, jwt_decode_1.default)(getheader);
                const data = yield admin_service_1.AdminService.createCoupon(req.body, req.file, users)
                    .then(() => {
                    return res.status(http_status_1.default.OK).send({
                        success: true,
                        message: "Coupon created successfully",
                    });
                })
                    .catch((err) => {
                    return res.status(http_status_1.default.BAD_GATEWAY).send({
                        success: false,
                        message: "Failed to create coupon",
                    });
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.getCoupon = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield admin_service_1.AdminService.getCoupon(req);
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    data,
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.delCoupon = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield admin_service_1.AdminService.delCoupon(req.query);
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: "Coupon Deleted Successfully",
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.CreateBrands = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const checkbrand = yield admin_service_1.AdminService.checkbrandbyname(req.body.BRAND_CODE);
                if (!checkbrand) {
                    const data = yield admin_service_1.AdminService.CreateBrands(req);
                    if (data) {
                        return (res
                            .status(http_status_1.default.OK)
                            // .send(ApiStatus.successmsg("Brand Created Successfully"));
                            .send({
                            success: true,
                            message: "Brand Created Succesfully",
                            data: data,
                        }));
                    }
                }
                else {
                    return res
                        .status(http_status_1.default.BAD_REQUEST)
                        .send({ success: false, message: "Brand Already exist!" });
                }
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send(apistatus_1.default.errormsg(error === null || error === void 0 ? void 0 : error.message));
            }
        }));
        this.getBrands = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield admin_service_1.AdminService.getBrands();
                if (data) {
                    return res.status(http_status_1.default.OK).send({
                        success: true,
                        message: "success",
                        data,
                    });
                }
                else {
                    return res
                        .status(http_status_1.default.BAD_REQUEST)
                        .send({ success: false, message: "Somthing went wrong!" });
                }
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send(apistatus_1.default.errormsg(error === null || error === void 0 ? void 0 : error.message));
            }
        }));
        this.updateBrands = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield admin_service_1.AdminService.updateBrands(req);
                if (data) {
                    return res.status(http_status_1.default.OK).send({
                        success: true,
                        message: "Brand updated Successfully",
                    });
                }
                else {
                    return res
                        .status(http_status_1.default.BAD_REQUEST)
                        .send({ success: false, message: "Somthing went wrong!" });
                }
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send(apistatus_1.default.errormsg(error === null || error === void 0 ? void 0 : error.message));
            }
        }));
        this.delBrands = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield admin_service_1.AdminService.delBrands(req);
                if (data) {
                    return res.status(http_status_1.default.OK).send({
                        success: true,
                        message: "Brand delted Successfully",
                    });
                }
                else {
                    return res
                        .status(http_status_1.default.BAD_REQUEST)
                        .send({ success: false, message: "Somthing went wrong!" });
                }
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send(apistatus_1.default.errormsg(error === null || error === void 0 ? void 0 : error.message));
            }
        }));
        this.applyCoupon = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield admin_service_1.AdminService.applyCoupon(req.body);
                if (data) {
                    return res.status(http_status_1.default.OK).send({
                        success: true,
                        message: "success",
                        data,
                    });
                }
                else {
                    return res
                        .status(http_status_1.default.BAD_REQUEST)
                        .send({ success: false, message: "Somthing went wrong!" });
                }
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send(apistatus_1.default.errormsg(error === null || error === void 0 ? void 0 : error.message));
            }
        }));
        this.expireCoupons = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield admin_service_1.AdminService.expireCoupons(req);
                if (data) {
                    return res.status(http_status_1.default.OK).send({
                        success: true,
                        message: "success",
                        data,
                    });
                }
                else {
                    return res
                        .status(http_status_1.default.BAD_REQUEST)
                        .send({ success: false, message: "Somthing went wrong!" });
                }
            }
            catch (error) {
                return res.status(http_status_1.default.BAD_REQUEST).send({
                    success: false,
                    message: "Somthing went wrong!",
                    data: error === null || error === void 0 ? void 0 : error.message,
                });
            }
        }));
        this.updateCoupon = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const getheader = req.header("authorization");
            const users = (0, jwt_decode_1.default)(getheader);
            const data = yield admin_service_1.AdminService.updateCoupon(req.body, req.file, users);
            console.log(data);
            try {
                if (data) {
                    return res.status(http_status_1.default.OK).send({
                        success: true,
                        message: "Coupon updated Successfully",
                        data: data,
                    });
                }
                else {
                    return res.status(http_status_1.default.BAD_REQUEST).send({
                        success: false,
                        message: "Somthing went wrong!",
                        data: data,
                    });
                }
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send(apistatus_1.default.errormsg(error === null || error === void 0 ? void 0 : error.message));
            }
        }));
        this.export_csv = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const ExcelJS = require("exceljs");
                const workbook = new ExcelJS.Workbook();
                const sheet = workbook.addWorksheet("Product Sheet");
                sheet.columns = [
                    { header: "CATEGORY_ID", key: "CATEGORY_ID", width: 20 },
                    { header: "BRAND_ID", key: "BRAND_ID", width: 20 },
                    { header: "PRODUCTSIZE_ID", key: "PRODUCTSIZE_ID", width: 20 },
                    { header: "PRODUCTCOLOR_ID", key: "PRODUCTCOLOR_ID", width: 20 },
                    { header: "PRODUCT_NAME", key: "PRODUCT_NAME", width: 20 },
                    { header: "PRODUCT_QUANTITY", key: "PRODUCT_QUANTITY", width: 20 },
                    {
                        header: "PRODUCT_DESCRIPTION",
                        key: "PRODUCT_DESCRIPTION",
                        width: 20,
                    },
                    { header: "PRODUCT_IMAGE", key: "PRODUCT_IMAGE", width: 80 },
                    { header: "PRODUCT_PRICE", key: "PRODUCT_PRICE", width: 20 },
                    {
                        header: "PRODUCT_DISCOUNTSTATUS",
                        key: "PRODUCT_DISCOUNTSTATUS",
                        width: 20,
                    },
                    { header: "PRODUCT_DISCOUNT", key: "PRODUCT_DISCOUNT", width: 20 },
                    { header: "COMPANYCODE", key: "COMPANYCODE", width: 20 },
                    { header: "WEIGHT", key: "WEIGHT", width: 20 },
                    { header: "BRANCHNAME", key: "BRANCHNAME", width: 20 },
                    { header: "TECHINFO", key: "TECHINFO", width: 20 },
                    { header: "ADDITINFO", key: "ADDITINFO", width: 20 },
                ];
                res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                res.setHeader("Content-Disposition", "attachment; filename=" + "product.csv");
                return workbook.xlsx.write(res).then(function () {
                    res.status(http_status_1.default.OK).end();
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: error.message, data: error });
            }
        }));
        this.export_Category = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const getheader = req.header("authorization");
                const users = (0, jwt_decode_1.default)(getheader);
                const categoryList = yield admin_service_1.AdminService.CategoryPDF();
                let doc = new PDFDocument({ margin: 30, size: "A4" });
                doc.font("Helvetica-Bold");
                doc.fontSize(17);
                doc.text("Category List", { align: "center", underline: true });
                doc.fontSize(12);
                doc.text("please use In in bulk upload", { align: "center" });
                doc.text("  ", { align: "center" });
                let data = [];
                categoryList &&
                    categoryList.forEach((item, index) => {
                        const object = {
                            category_id: item.CATEGORY_ID,
                            category_name: {
                                label: item.CATEGORY_NAME,
                                options: { fontSize: 10 },
                            },
                            category_code: {
                                label: item.CATEGORY_CODE,
                                options: { fontSize: 10 },
                            },
                        };
                        return data.push(object);
                    });
                const table = {
                    headers: [
                        {
                            label: "Category Id",
                            property: "category_id",
                            align: "center",
                            renderer: null,
                        },
                        {
                            label: "Category Name",
                            property: "category_name",
                            align: "center",
                            renderer: null,
                        },
                        {
                            label: "Category Code",
                            property: "category_code",
                            align: "center",
                            renderer: null,
                        },
                    ],
                    datas: data,
                };
                doc.table(table, {
                    padding: {
                        top: 2,
                        bottom: 2,
                        left: 5,
                        right: 5,
                    },
                    prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
                    prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
                        doc.font("Helvetica").fontSize(8);
                        indexColumn === 0 && doc.addBackground(rectRow, "white", 0.15);
                    },
                    align: "center",
                });
                doc.pipe(res);
                doc.end();
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: error.message, data: error });
            }
        }));
        this.export_SubCategory = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const getheader = req.header("authorization");
                const users = (0, jwt_decode_1.default)(getheader);
                const categoryList = yield admin_service_1.AdminService.GetSubCategory();
                let doc = new PDFDocument({ margin: 30, size: "A4" });
                doc.font("Helvetica-Bold");
                doc.fontSize(17);
                doc.text("Sub Category List", { align: "center", underline: true });
                doc.fontSize(12);
                doc.text("please use In in bulk upload", { align: "center" });
                doc.text("  ", { align: "center" });
                let data = [];
                categoryList &&
                    categoryList.forEach((item, index) => {
                        const object = {
                            subcategory_id: item.SUBCATEGORY_ID,
                            category_name: item.CATEGORY_NAME,
                            subcategory_name: item.SUBCATEGORY_NAME,
                        };
                        return data.push(object);
                    });
                const table = {
                    headers: [
                        {
                            label: "Sub Category Id",
                            property: "subcategory_id",
                            align: "center",
                            renderer: null,
                        },
                        {
                            label: "Category Name",
                            property: "category_name",
                            align: "center",
                            renderer: null,
                        },
                        {
                            label: "Sub Category Name",
                            property: "subcategory_name",
                            align: "center",
                            renderer: null,
                        },
                    ],
                    datas: data,
                };
                doc.table(table, {
                    padding: {
                        top: 2,
                        bottom: 2,
                        left: 5,
                        right: 5,
                    },
                    prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
                    prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
                        doc.font("Helvetica").fontSize(8);
                        indexColumn === 0 && doc.addBackground(rectRow, "white", 0.15);
                    },
                    align: "center",
                });
                doc.pipe(res);
                doc.end();
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: error.message, data: error });
            }
        }));
        this.export_Brand = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const getheader = req.header("authorization");
                const users = (0, jwt_decode_1.default)(getheader);
                const brandlist = yield admin_service_1.AdminService.getBrands();
                let doc = new PDFDocument({ margin: 30, size: "A4" });
                doc.font("Helvetica-Bold");
                doc.fontSize(17);
                doc.text("Brand List", { align: "center", underline: true });
                doc.fontSize(12);
                doc.text("please use In in bulk upload", { align: "center" });
                doc.text("  ", { align: "center" });
                let data = [];
                brandlist &&
                    brandlist.forEach((item, index) => {
                        const object = {
                            brand_id: item.BRAND_ID,
                            brand_name: item.BRAND_NAME,
                            brand_code: item.BRAND_CODE,
                        };
                        return data.push(object);
                    });
                const table = {
                    headers: [
                        {
                            label: "brand id",
                            property: "brand_id",
                            align: "center",
                            renderer: null,
                        },
                        {
                            label: "brand name",
                            property: "brand_name",
                            align: "center",
                            renderer: null,
                        },
                        {
                            label: "brand code",
                            property: "brand_code",
                            align: "center",
                            renderer: null,
                        },
                    ],
                    datas: data,
                };
                doc.table(table, {
                    padding: {
                        top: 2,
                        bottom: 2,
                        left: 5,
                        right: 5,
                    },
                    prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
                    prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
                        doc.font("Helvetica").fontSize(8);
                        indexColumn === 0 && doc.addBackground(rectRow, "white", 0.15);
                    },
                    align: "center",
                });
                doc.pipe(res);
                doc.end();
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: error.message, data: error });
            }
        }));
        this.export_Color = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const getheader = req.header("authorization");
                const users = (0, jwt_decode_1.default)(getheader);
                const colorlist = yield admin_service_1.AdminService.GetProductColor();
                let doc = new PDFDocument({ margin: 30, size: "A4" });
                doc.font("Helvetica-Bold");
                doc.fontSize(17);
                doc.text("Product Color List", { align: "center", underline: true });
                doc.fontSize(12);
                doc.text("please use In in bulk upload", { align: "center" });
                doc.text("  ", { align: "center" });
                let data = [];
                colorlist &&
                    colorlist.forEach((item, index) => {
                        const object = {
                            productcolor_id: item.PRODUCTCOLOR_ID,
                            productcolor_name: item.PRODUCTCOLOR_NAME,
                            productcolor_code: item.PRODUCTCOLOR_CODE,
                        };
                        return data.push(object);
                    });
                const table = {
                    headers: [
                        {
                            label: "Color id",
                            property: "productcolor_id",
                            align: "center",
                            renderer: null,
                        },
                        {
                            label: "Color Name",
                            property: "productcolor_name",
                            align: "center",
                            renderer: null,
                        },
                        {
                            label: "Color Code",
                            property: "productcolor_code",
                            align: "center",
                            renderer: null,
                        },
                    ],
                    datas: data,
                };
                doc.table(table, {
                    padding: {
                        top: 2,
                        bottom: 2,
                        left: 5,
                        right: 5,
                    },
                    prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
                    prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
                        doc.font("Helvetica").fontSize(8);
                        indexColumn === 0 && doc.addBackground(rectRow, "white", 0.15);
                    },
                    align: "center",
                });
                doc.pipe(res);
                doc.end();
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: error.message, data: error });
            }
        }));
        this.export_Size = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const getheader = req.header("authorization");
                const users = (0, jwt_decode_1.default)(getheader);
                const colorlist = yield admin_service_1.AdminService.GetProductSize();
                let doc = new PDFDocument({ margin: 30, size: "A4" });
                doc.font("Helvetica-Bold");
                doc.fontSize(17);
                doc.text("Product Size List", { align: "center", underline: true });
                doc.fontSize(12);
                doc.text("please use In in bulk upload", { align: "center" });
                doc.text("  ", { align: "center" });
                let data = [];
                colorlist &&
                    colorlist.forEach((item, index) => {
                        const object = {
                            productsize_id: item.PRODUCTSIZE_ID,
                            productsize_name: item.PRODUCTSIZE_NAME,
                        };
                        return data.push(object);
                    });
                const table = {
                    headers: [
                        {
                            label: "Size id",
                            property: "productsize_id",
                            align: "center",
                            renderer: null,
                        },
                        {
                            label: "Size",
                            property: "productsize_name",
                            align: "center",
                            renderer: null,
                        },
                    ],
                    datas: data,
                };
                doc.table(table, {
                    padding: {
                        top: 2,
                        bottom: 2,
                        left: 5,
                        right: 5,
                    },
                    prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
                    prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
                        doc.font("Helvetica").fontSize(8);
                        indexColumn === 0 && doc.addBackground(rectRow, "white", 0.15);
                    },
                    align: "center",
                });
                doc.pipe(res);
                doc.end();
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: error.message, data: error });
            }
        }));
        this.cloudimage = (req, res) => {
            var _a;
            try {
                const path = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) || "";
                const response = [
                    {
                        url: path,
                    },
                ];
                console.log(response);
                return res.status(http_status_1.default.OK).send({
                    success: false,
                    message: "Success",
                    data: custom_helpers_1.default.file_changepath(path),
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: error.message, data: error });
            }
        };
        this.GetCountry = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const get_country = yield country_model_1.CountryInstance.findAll({
                    where: {
                        ISDELETED: false,
                    },
                });
                return res
                    .status(http_status_1.default.OK)
                    .send(apistatus_1.default.successmsgdata("success", get_country));
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: error.message, data: error });
            }
        }));
        this.PostCountry = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { COUNTRY_NAME, COUNTRY_CODE } = req.body;
                yield country_model_1.CountryInstance.create({ COUNTRY_NAME, COUNTRY_CODE });
                return res
                    .status(http_status_1.default.OK)
                    .send(apistatus_1.default.successmsg("Country Inserted Successfully"));
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: error.message, data: error });
            }
        }));
        this.PostState = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { STATE_NAME, COUNTRY_ID } = req.body;
                yield state_model_1.StateInstance.create({ STATE_NAME, COUNTRY_ID });
                return res
                    .status(http_status_1.default.OK)
                    .send(apistatus_1.default.successmsg("State Inserted Successfully"));
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: error.message, data: error });
            }
        }));
        this.PutCountry = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { COUNTRY_NAME, COUNTRY_CODE, COUNTRY_ID } = req.body;
                yield country_model_1.CountryInstance.update({ COUNTRY_NAME, COUNTRY_CODE }, { where: { COUNTRY_ID } });
                return res
                    .status(http_status_1.default.OK)
                    .send(apistatus_1.default.successmsg("Country Inserted Successfully"));
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: error.message, data: error });
            }
        }));
        this.PutState = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { STATE_ID, STATE_NAME, COUNTRY_ID } = req.body;
                yield state_model_1.StateInstance.update({ STATE_NAME, COUNTRY_ID }, { where: { STATE_ID } });
                return res
                    .status(http_status_1.default.OK)
                    .send(apistatus_1.default.successmsg("State Inserted Successfully"));
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: error.message, data: error });
            }
        }));
        this.DeleteCounrty = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.query.id;
                yield country_model_1.CountryInstance.update({
                    ISDELETED: true,
                }, {
                    where: {
                        COUNTRY_ID: id,
                    },
                });
                return res
                    .status(http_status_1.default.OK)
                    .send(apistatus_1.default.successmsg("Deleted Successfully"));
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: error.message, data: error });
            }
        }));
        this.DeleteState = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.query.id;
                yield state_model_1.StateInstance.update({
                    ISDELETED: true,
                }, {
                    where: {
                        STATE_ID: id,
                    },
                });
                return res
                    .status(http_status_1.default.OK)
                    .send(apistatus_1.default.successmsg("Deleted Successfully"));
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: error.message, data: error });
            }
        }));
        this.GetState = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const get_country = yield state_model_1.StateInstance.findAll({
                    include: [
                        {
                            model: country_model_1.CountryInstance,
                            attributes: ["COUNTRY_NAME", "COUNTRY_CODE"],
                            where: {
                                ISDELETED: false,
                            },
                        },
                    ],
                    where: {
                        ISDELETED: false,
                    },
                });
                return res
                    .status(http_status_1.default.OK)
                    .send(apistatus_1.default.successmsgdata("success", get_country));
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: error.message, data: error });
            }
        }));
    }
}
exports.AdminController = new AdminControllerClass();
//# sourceMappingURL=admin.controller.js.map