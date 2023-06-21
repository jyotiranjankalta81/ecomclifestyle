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
exports.AuthController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const auth_service_1 = require("../service/auth.service");
const catchAsync_1 = require("../utils/catchAsync");
const tokens_1 = require("../utils/tokens");
const jwt_decode_1 = __importDefault(require("jwt-decode"));
class AuthControllerClass {
    constructor() {
        this.CreateUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const checkuser = yield auth_service_1.UserService.GetuserbyEmail(req.body.EMAIL);
                if (checkuser)
                    return res.status(http_status_1.default.BAD_REQUEST).send({
                        success: false,
                        message: "email is already in use",
                        data: [],
                    });
                const createuser = yield auth_service_1.UserService.CreateUser(req.body);
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    message: "User created successfully",
                    data: createuser,
                });
            }
            catch (e) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: e });
            }
        }));
        this.ForgotPassword = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const checkuser = yield auth_service_1.UserService.GetuserbyEmail(req.body.EMAIL);
                if (checkuser) {
                    const checkotp = yield auth_service_1.UserService.checkotp(req.body.EMAIL);
                    if (checkotp) {
                        const createotp = yield auth_service_1.UserService.updateOpt(req.body.EMAIL);
                        return res.status(http_status_1.default.OK).send({
                            success: true,
                            message: "Requested successfully",
                            data: createotp,
                        });
                    }
                    else {
                        const createotp = yield auth_service_1.UserService.createOpt(req.body.EMAIL);
                        return res.status(http_status_1.default.OK).send({
                            success: true,
                            message: "Requested successfully",
                            data: createotp,
                        });
                    }
                }
                else {
                    return res.status(http_status_1.default.BAD_REQUEST).send({
                        success: false,
                        message: "no User Found With this email",
                        data: [],
                    });
                }
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.LoginUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const checkuser = yield auth_service_1.UserService.GetuserbyEmail(req.body.EMAIL);
                if (!checkuser)
                    return res
                        .status(http_status_1.default.BAD_REQUEST)
                        .send({ success: false, message: "user dosenot exist!!", data: [] });
                const loginuserdata = yield auth_service_1.UserService.LoginUser(req.body.EMAIL, req.body.PASSWORD, checkuser.PASSWORD);
                if (!loginuserdata)
                    return res
                        .status(http_status_1.default.BAD_REQUEST)
                        .send({ success: false, message: "invalid passowrd", data: [] });
                const tokens = yield (0, tokens_1.generateAuthTokens)(checkuser.dataValues);
                if (tokens) {
                    const closesession = yield auth_service_1.UserService.CloseOldSession({
                        USERID: checkuser.dataValues.ID,
                    });
                    const insertsession = yield auth_service_1.UserService.CresteSession({
                        USERAGENT: req.get("user-agent"),
                        UERIP: req.ip,
                        USERID: checkuser.dataValues.ID,
                        SESSION_STATUS: true,
                    });
                    if (insertsession) {
                        return res.status(http_status_1.default.OK).send({
                            success: true,
                            message: "login successful",
                            data: {
                                email: checkuser.dataValues.EMAIL,
                                sessionid: insertsession.SESSION_ID,
                                userrole: checkuser.dataValues.USERROLE,
                                tokens: tokens,
                            },
                        });
                    }
                }
            }
            catch (e) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: e });
            }
        }));
        this.LoginWithOtp = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const checkuser = yield auth_service_1.UserService.GetuserbyPhone(req.body.PHONENO);
                if (!checkuser) {
                    const userobj = {
                        FULLNAME: req.body.PHONENO,
                        MOBILENO: req.body.PHONENO,
                        EMAIL: "",
                        PASSWORD: "12345",
                    };
                    const createuser = yield auth_service_1.UserService.CreateUser(userobj);
                    if (createuser) {
                        const createotp = yield auth_service_1.UserService.CreateUserOtp(createuser.ID);
                        return res.status(http_status_1.default.OK).send({
                            success: true,
                            message: "Otp Send successfully",
                            data: {
                                opt: createotp,
                            },
                        });
                    }
                }
                else {
                    const createotp = yield auth_service_1.UserService.UpdateUserOtp(checkuser.ID);
                    return res.status(http_status_1.default.OK).send({
                        success: true,
                        message: "Otp Send successfully",
                        data: {
                            opt: createotp,
                        },
                    });
                }
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.verifyOtp = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const checkuser = yield auth_service_1.UserService.GetuserbyPhone(req.body.PHONENO);
                if (checkuser) {
                    const getotpuser = yield auth_service_1.UserService.GetOtpuser(checkuser.ID);
                    if (getotpuser) {
                        if (getotpuser.OTP === req.body.OTP) {
                            const tokens = yield (0, tokens_1.generateAuthTokens)(checkuser);
                            if (tokens) {
                                const closesession = yield auth_service_1.UserService.CloseOldSession({
                                    USERID: checkuser.ID,
                                });
                                const insertsession = yield auth_service_1.UserService.CresteSession({
                                    USERAGENT: req.get("user-agent"),
                                    UERIP: req.ip,
                                    USERID: checkuser.dataValues.ID,
                                    SESSION_STATUS: true,
                                });
                                if (insertsession) {
                                    return res.status(http_status_1.default.OK).send({
                                        success: true,
                                        message: "login successful",
                                        data: {
                                            email: (_a = checkuser.dataValues) === null || _a === void 0 ? void 0 : _a.EMAIL,
                                            sessionid: insertsession.SESSION_ID,
                                            userrole: checkuser.dataValues.USERROLE,
                                            tokens: tokens,
                                        },
                                    });
                                }
                            }
                        }
                        else {
                            return res
                                .status(http_status_1.default.BAD_REQUEST)
                                .send({ success: false, message: "invalid otp!", data: [] });
                        }
                    }
                }
                else {
                    return res
                        .status(http_status_1.default.BAD_REQUEST)
                        .send({ success: false, message: "Somthing went wrong!", data: [] });
                }
            }
            catch (error) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ success: false, message: "Somthing went wrong!", data: error });
            }
        }));
        this.getUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const getheader = req.header("authorization");
            const users = (0, jwt_decode_1.default)(getheader);
            const datafile = yield auth_service_1.UserService.getUser(req.body, users);
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
        this.getUsers = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const getheader = req.header("authorization");
            const users = (0, jwt_decode_1.default)(getheader);
            const datafile = yield auth_service_1.UserService.getUsers(req.body, users);
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
        this.updateUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const getheader = req.header("authorization");
            const users = (0, jwt_decode_1.default)(getheader);
            const datafile = yield auth_service_1.UserService.updateUser(req.body, users);
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
    }
}
exports.AuthController = new AuthControllerClass();
//# sourceMappingURL=auth.controller.js.map