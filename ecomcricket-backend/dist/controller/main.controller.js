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
exports.MainController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const main_service_1 = require("../service/main.service");
const catchAsync_1 = require("../utils/catchAsync");
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const axios_1 = __importDefault(require("axios"));
const querystring_1 = __importDefault(require("querystring"));
const apistatus_1 = __importDefault(require("../utils/apistatus"));
const stripe = require("stripe")("sk_test_51L2wFuSIakMfogRlbY0t1gPUKf7bbZyMkEdWELrX98T6LsBPeOV2Y0R4BkEDWBo7v4sCJ98x5aQBjtqPjsCk7FB400v9cTQOMM");
class MainControllerClass {
    constructor() {
        this.get_cart = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const getheader = req.header("authorization");
            const users = (0, jwt_decode_1.default)(getheader);
            const datafile = yield main_service_1.mainService.GetCart(req.body, users);
            try {
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
        this.create_cart = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const getheader = req.header("authorization");
            const users = (0, jwt_decode_1.default)(getheader);
            const getcartbyPID = yield main_service_1.mainService.getcartbyPID(req.body, users);
            if (!getcartbyPID) {
                const datafile = yield main_service_1.mainService.Create_Cart(req.body, users);
                try {
                    return res.status(http_status_1.default.OK).send({
                        success: true,
                        message: " inserted  successfully",
                        data: datafile,
                    });
                }
                catch (error) {
                    console.log(error);
                    return res.status(http_status_1.default.BAD_REQUEST).send({
                        success: false,
                        message: "Somthing went wrong!",
                        data: error,
                    });
                }
            }
            else {
                const datafile = yield main_service_1.mainService.update_CartbyPID(req.body, users, getcartbyPID);
                try {
                    return res.status(http_status_1.default.OK).send({
                        success: true,
                        message: " updated  successfully",
                        data: datafile,
                    });
                }
                catch (error) {
                    console.log(error);
                    return res.status(http_status_1.default.BAD_REQUEST).send({
                        success: false,
                        message: "Somthing went wrong!",
                        data: error,
                    });
                }
            }
        }));
        this.update_cart = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const getheader = req.header("authorization");
            const users = (0, jwt_decode_1.default)(getheader);
            const getcartbyID = yield main_service_1.mainService.getCartById(req.body, users);
            if (getcartbyID) {
                const datafile = yield main_service_1.mainService.update_cart(req.body, users);
                try {
                    return res.status(http_status_1.default.OK).send({
                        success: true,
                        message: " updated  successfully",
                        data: datafile,
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
                return res.status(http_status_1.default.BAD_REQUEST).send({
                    success: false,
                    message: "invalid id!",
                    data: [],
                });
            }
        }));
        this.delete_cart = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const getheader = req.header("authorization");
            const users = (0, jwt_decode_1.default)(getheader);
            const getcartbyID = yield main_service_1.mainService.getCartById(req.query, users);
            if (getcartbyID) {
                const datafile = yield main_service_1.mainService.delete_cart(req.query, users);
                try {
                    return res.status(http_status_1.default.OK).send({
                        success: true,
                        message: " updated  successfully",
                        data: datafile,
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
                return res.status(http_status_1.default.BAD_REQUEST).send({
                    success: false,
                    message: "invalid id!",
                    data: [],
                });
            }
        }));
        this.get_order = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const getheader = req.header("authorization");
            const users = (0, jwt_decode_1.default)(getheader);
            var datafile = yield main_service_1.mainService.get_order(req.body, users);
            for (let i = 0; i < datafile.length; i++) {
                let userarray = JSON.parse(datafile[i].USER_ORDER);
                let orderarray = [];
                for (let j = 0; j < userarray.length; j++) {
                    let newrpid = JSON.parse(datafile[i].USER_ORDER)[j];
                    let product = yield main_service_1.mainService.getproductbyid(newrpid.product_id);
                    newrpid.product_id = JSON.stringify(product);
                    orderarray.push(newrpid);
                }
                datafile[i].USER_ORDER = orderarray;
            }
            try {
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: " inserted  successfully",
                    data: datafile,
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.create_order = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const getheader = req.header("authorization");
            const users = (0, jwt_decode_1.default)(getheader);
            const datafile = yield main_service_1.mainService.create_order(req.body, users);
            const clearcart = yield main_service_1.mainService.clear_cart(users);
            try {
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: " inserted  successfully",
                    data: datafile,
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.create_session = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    'apiOperation': 'INITIATE_CHECKOUT',
                    'apiPassword': "b78feb6ae32a8bc67f65305510cb3545",
                    'apiUsername': `merchant.TESTQUALITYCRKET`,
                    'merchant': "TESTQUALITYCRKET",
                    'interaction.operation': 'PURCHASE',
                    'interaction.merchant.name': "TEST QUALITYCRKET",
                    'interaction.returnUrl': req.body.RESPONSE_URL,
                    'order.id': req.body.ORDER_ID,
                    'order.amount': req.body.AMOUNT,
                    'order.currency': 'AED',
                    'order.description': "New Order" // replace with the description of your order
                })
            };
            axios_1.default.post('https://rakbankpay.gateway.mastercard.com/api/nvp/version/65', requestOptions.body, {
                headers: requestOptions.headers,
            })
                .then(function (result) {
                console.log(result);
                const Response = querystring_1.default.parse(result.data);
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: "Created  successfully",
                    data: Response['session.id'],
                });
            })
                .catch(function (error) {
                return res.status(http_status_1.default.BAD_REQUEST).send({ success: false, message: "Somthing went wrong!", data: error });
            });
        }));
        this.contact = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const datafile = yield main_service_1.mainService.contact(req.body, res);
            try {
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: " submitted  successfully",
                    data: datafile,
                });
            }
            catch (error) {
                console.log(error);
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.get_contact = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const getheader = req.header("authorization");
            const users = (0, jwt_decode_1.default)(getheader);
            const datafile = yield main_service_1.mainService.get_contact(req.body, users);
            try {
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
        this.addAddress = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const getheader = req.header("authorization");
            const users = (0, jwt_decode_1.default)(getheader);
            const datafile = yield main_service_1.mainService.addAddress(req.body, users);
            try {
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: " submitted  successfully",
                    data: datafile,
                });
            }
            catch (error) {
                console.log(error);
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.getAddress = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const getheader = req.header("authorization");
            const users = (0, jwt_decode_1.default)(getheader);
            const datafile = yield main_service_1.mainService.getAddress(req.body, users);
            try {
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
        this.getRatingReview = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const getheader = req.header("authorization");
            const users = (0, jwt_decode_1.default)(getheader);
            const datafile = yield main_service_1.mainService.getRatingReview(req.body, users);
            try {
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
        this.updateAddress = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const getheader = req.header("authorization");
            const users = (0, jwt_decode_1.default)(getheader);
            const datafile = yield main_service_1.mainService.updateAddress(req.body, users);
            try {
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
        this.deleteAddress = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const getheader = req.header("authorization");
            const users = (0, jwt_decode_1.default)(getheader);
            const header = req.query;
            const datafile = yield main_service_1.mainService.deleteAddress(header);
            try {
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: " deleted successfully",
                    data: datafile,
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.addRatingReview = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const getheader = req.header("authorization");
            const users = (0, jwt_decode_1.default)(getheader);
            const datafile = yield main_service_1.mainService.addRatingReview(req.body, users);
            try {
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: " submitted  successfully",
                    data: datafile,
                });
            }
            catch (error) {
                console.log(error);
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.createNotification = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield main_service_1.mainService.createNotification(req.body);
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: "Notification created successfully",
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.getNotification = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield main_service_1.mainService.getNotification(req);
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: "Success",
                    data,
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.Produectsearch = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield main_service_1.mainService.Produectsearch(req.body);
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: "Success",
                    data,
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.update_payment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const checkpayment = main_service_1.mainService.checkpayment(req.body.ORDER_REFNO);
                if (typeof checkpayment !== 'undefined' && checkpayment.length === 0) {
                    return res.status(http_status_1.default.OK).send(apistatus_1.default.errormsg("Aayment Already complete!"));
                }
                const data = yield main_service_1.mainService.update_payment(req.body);
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: "Success",
                    data,
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.updateNotification = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield main_service_1.mainService.updateNotification(req);
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: "Updated Successfully",
                });
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.filter_product = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield main_service_1.mainService.getFilteredProduct(req.body);
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
    }
}
exports.MainController = new MainControllerClass();
//# sourceMappingURL=main.controller.js.map