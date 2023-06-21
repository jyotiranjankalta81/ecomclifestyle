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
const express_1 = __importDefault(require("express"));
const paymentrouter = express_1.default.Router();
const path = require("path");
const shortid = require("shortid");
const Razorpay = require("razorpay");
const httpStatus = require("http-status");
const razorpay = new Razorpay({
    key_id: "rzp_test_vDtYuuL3iHbPDn",
    key_secret: "EgUAkPNwpT5l398uKfYvC5a8",
});
paymentrouter.get("/logo.svg", (req, res) => {
    res.sendFile(path.join(__dirname, "logo512.png"));
});
paymentrouter.post("/verification", (req, res) => {
    // do a validation
    const secret = "12345678";
    const crypto = require("crypto");
    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");
    if (digest === req.headers["x-razorpay-signature"]) {
        res.status(httpStatus.OK).send({
            status: 1,
        });
        // require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
    }
    else {
        res.status(httpStatus.OK).send(res.status(httpStatus.OK).send({
            status: 0,
        }));
    }
});
paymentrouter.post("/razorpay", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payment_capture = 1;
    const amounts = req.body.ammount;
    const amount = parseInt(amounts) * 100;
    const currency = "INR";
    const options = {
        amount: amount,
        currency,
        receipt: shortid.generate(),
        payment_capture,
    };
    try {
        const response = yield razorpay.orders.create(options);
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount,
        });
    }
    catch (error) {
        console.log(error);
    }
}));
exports.default = paymentrouter;
//# sourceMappingURL=payment.routes.js.map