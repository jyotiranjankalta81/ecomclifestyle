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
exports.orderInvoice = void 0;
const companylogo_1 = require("../image/companylogo");
const main_service_1 = require("../service/main.service");
const http_status_1 = __importDefault(require("http-status"));
const apistatus_1 = __importDefault(require("../utils/apistatus"));
const moment_1 = __importDefault(require("moment"));
const pdfKit = require('pdfkit');
const PDFDocument = require('pdfkit-table');
const fs = require('fs');
const orderInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    try {
        if (!req.body.order_id) {
            return res.status(http_status_1.default.BAD_REQUEST).send(apistatus_1.default.errormsg("order id is required"));
        }
        const checkpayment = yield main_service_1.mainService.checkpayment(req.body.order_id);
        if (typeof checkpayment !== 'undefined' && checkpayment.length === 0) {
            return res.status(http_status_1.default.BAD_REQUEST).send(apistatus_1.default.errormsg(" payment is not done!!"));
        }
        const orderDetails = checkpayment[0];
        const userDetails = yield main_service_1.mainService.profiledetails((_a = checkpayment[0]) === null || _a === void 0 ? void 0 : _a.CREATED_BY);
        let user_address = JSON.parse((_b = checkpayment[0]) === null || _b === void 0 ? void 0 : _b.USER_ADDRESS);
        user_address = JSON.parse(user_address);
        let product_details = JSON.parse((_c = checkpayment[0]) === null || _c === void 0 ? void 0 : _c.USER_ORDER);
        let main_product_details = [];
        for (let i = 0; i < product_details.length; i++) {
            const product_name = yield main_service_1.mainService.getproductbyid(product_details[i].product_id);
            const json = {
                "id": product_name.PRODUCT_ID,
                "name": product_name === null || product_name === void 0 ? void 0 : product_name.PRODUCT_NAME,
                "discount": (_d = product_details[i]) === null || _d === void 0 ? void 0 : _d.discount,
                "qty": (_e = product_details[i]) === null || _e === void 0 ? void 0 : _e.quantity,
                "unitPrice": (_f = product_details[i]) === null || _f === void 0 ? void 0 : _f.price,
                "totalPrice": parseInt((_g = product_details[i]) === null || _g === void 0 ? void 0 : _g.quantity) * parseInt((_h = product_details[i]) === null || _h === void 0 ? void 0 : _h.price),
            };
            main_product_details.push(json);
        }
        let companyLogo = companylogo_1.companylogo;
        let fontNormal = 'Helvetica';
        let fontBold = 'Helvetica-Bold';
        let sellerInfo = {
            "companyName": "Quality Cricket.com",
            "address": "Ajmal Dubai",
            "city": "Mumbai",
            "state": "Maharashtra",
            "pincode": "400017",
            "country": "India",
            "contactNo": "+910000000600"
        };
        let customerInfo = {
            "customerName": userDetails === null || userDetails === void 0 ? void 0 : userDetails.FULLNAME,
            "address": `${user_address === null || user_address === void 0 ? void 0 : user_address.FULLNAME},${user_address === null || user_address === void 0 ? void 0 : user_address.FLAT},`,
            "address1": `${user_address === null || user_address === void 0 ? void 0 : user_address.STREET},`,
            "address2": `${user_address === null || user_address === void 0 ? void 0 : user_address.LANDMARK}`,
            "city": user_address === null || user_address === void 0 ? void 0 : user_address.CITY,
            "state": user_address === null || user_address === void 0 ? void 0 : user_address.STATE,
            "pincode": user_address === null || user_address === void 0 ? void 0 : user_address.PIN,
            "country": user_address === null || user_address === void 0 ? void 0 : user_address.COUNTRY,
            "contactNo": userDetails === null || userDetails === void 0 ? void 0 : userDetails.MOBILENO
        };
        let orderInfo = {
            "orderNo": orderDetails === null || orderDetails === void 0 ? void 0 : orderDetails.ORDER_REFNO,
            "invoiceNo": orderDetails === null || orderDetails === void 0 ? void 0 : orderDetails.ORDER_ID,
            "invoiceDate": (0, moment_1.default)(new Date()).format('YYYY-MM-DD'),
            "invoiceTime": (0, moment_1.default)(new Date()).format('h:mm:ss a'),
            "products": main_product_details,
            "totalValue": orderDetails === null || orderDetails === void 0 ? void 0 : orderDetails.AMOUNT,
        };
        let pdfDoc = new PDFDocument({ margin: 30, size: 'A4' });
        pdfDoc.image(companyLogo, 25, 20, { width: 50, height: 50 });
        pdfDoc.font(fontBold).text('PARALLELCODES', 7, 75);
        pdfDoc.font(fontNormal).fontSize(14).text('Order Invoice/Bill Receipt', 400, 30, { width: 200 });
        pdfDoc.fontSize(10).text('11-MAY-2021 10:24 PM', 400, 46, { width: 200 });
        pdfDoc.font(fontBold).text("Sold by:", 7, 100);
        pdfDoc.font(fontNormal).text(sellerInfo.companyName, 7, 115, { width: 250 });
        pdfDoc.text(sellerInfo.address, 7, 130, { width: 250 });
        pdfDoc.text(sellerInfo.city + " " + sellerInfo.pincode, 7, 145, { width: 250 });
        pdfDoc.text(sellerInfo.state + " " + sellerInfo.country, 7, 160, { width: 250 });
        pdfDoc.font(fontBold).text("Customer details:", 400, 100);
        pdfDoc.font(fontNormal).text(customerInfo.customerName, 400, 115, { width: 250 });
        pdfDoc.text(customerInfo.address, 400, 130, { width: 250 });
        pdfDoc.text(customerInfo.address1, 400, 145, { width: 250 });
        pdfDoc.text(customerInfo.address2, 400, 160, { width: 250 });
        pdfDoc.text(customerInfo.city + " " + customerInfo.pincode, 400, 175, { width: 250 });
        pdfDoc.text(customerInfo.state + " " + customerInfo.country, 400, 190, { width: 250 });
        pdfDoc.text("Order No:" + orderInfo.orderNo, 7, 195, { width: 250 });
        pdfDoc.text("Invoice No:" + orderInfo.invoiceNo, 7, 210, { width: 250 });
        pdfDoc.text("Date:" + orderInfo.invoiceDate + " " + orderInfo.invoiceTime, 7, 225, { width: 250 });
        pdfDoc.rect(7, 250, 560, 20).fill("#3F50B5").stroke("#3F50B5");
        pdfDoc.fillColor("#fff").text("ID", 10, 256, { width: 90 });
        pdfDoc.text("Product", 50, 256, { width: 190 });
        pdfDoc.text("Discount", 210, 256, { width: 190 });
        pdfDoc.text("Qty", 300, 256, { width: 100 });
        pdfDoc.text("Price", 400, 256, { width: 100 });
        pdfDoc.text("Total Price", 500, 256, { width: 100 });
        let productNo = 1;
        orderInfo.products.forEach(element => {
            console.log("adding", element.name);
            let y = 256 + (productNo * 20);
            pdfDoc.fillColor("#000").text(element.id, 10, y, { width: 90 });
            pdfDoc.text(element.name, 50, y, { width: 190 });
            pdfDoc.text(element.discount, 218, y, { width: 190 });
            pdfDoc.text(element.qty, 300, y, { width: 100 });
            pdfDoc.text(element.unitPrice, 400, y, { width: 100 });
            pdfDoc.text(element.totalPrice, 500, y, { width: 100 });
            productNo++;
        });
        pdfDoc.rect(7, 265 + (productNo * 20), 590, 0.2).fillColor("#000").stroke("#000");
        productNo++;
        pdfDoc.font(fontBold).text("Total:", 400, 265 + (productNo * 17));
        pdfDoc.font(fontBold).text(orderInfo.totalValue, 500, 266 + (productNo * 17));
        pdfDoc.pipe(res);
        pdfDoc.end();
    }
    catch (error) {
        console.log("Error occurred", error);
    }
});
exports.orderInvoice = orderInvoice;
//# sourceMappingURL=invoice.controller.js.map