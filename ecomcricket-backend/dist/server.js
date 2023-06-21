"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = require("./config/config");
const morgan_1 = require("./config/morgan");
const rateLimiter_1 = require("./middlewares/rateLimiter");
const error_1 = require("./middlewares/error");
const ApiError_1 = require("./utils/ApiError");
const v1_1 = __importDefault(require("./routes/v1"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = require("./config/passport");
const expressFileUpload = require('express-fileupload');
exports.app = (0, express_1.default)();
if (config_1.config.env !== 'test') {
    exports.app.use(morgan_1.morgans.successHandler);
    exports.app.use(morgan_1.morgans.errorHandler);
}
// app.use(expressFileUpload());
// set security HTTP headers
exports.app.use((0, helmet_1.default)());
// parse json request body
exports.app.use(express_1.default.json());
// parse urlencoded request body
exports.app.use(express_1.default.urlencoded({ extended: true }));
// sanitize request data
// app.use(xss());
// gzip compression
exports.app.use((0, compression_1.default)());
// enable cors
exports.app.use((0, cors_1.default)());
exports.app.options('*', (0, cors_1.default)());
//pasport
exports.app.use(passport_1.default.initialize());
passport_1.default.use('jwt', passport_2.jwtStrategy);
// limit repeated failed requests to auth endpoints
if (config_1.config.env === 'production') {
    exports.app.use('/api/auth', rateLimiter_1.authLimiter);
}
// v1 api routes
exports.app.use('/api', v1_1.default);
//upload image
exports.app.use('*/static', express_1.default.static('public/uploads'));
exports.app.use('*/defaults', express_1.default.static('public/defaults'));
exports.app.use('*/consent', express_1.default.static('public/attachments'));
// send back a 404 error for any unknown api request
exports.app.use((req, res, next) => {
    next(new ApiError_1.ApiError(http_status_1.default.NOT_FOUND, 'Not found'));
});
// convert error to ApiError, if needed
exports.app.use(error_1.errorConverter);
// handle error
exports.app.use(error_1.errorHandler);
//# sourceMappingURL=server.js.map