"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const admin_routes_1 = __importDefault(require("./admin.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const main_routes_1 = require("./main.routes");
const payment_routes_1 = __importDefault(require("./payment.routes"));
exports.router = express_1.default.Router();
exports.router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
//api/
exports.router.use('/user', auth_routes_1.default);
exports.router.use('/main', main_routes_1.mainrouter);
exports.router.use('/payment', payment_routes_1.default);
exports.router.use('/admin', admin_routes_1.default);
exports.default = exports.router;
//# sourceMappingURL=index.js.map