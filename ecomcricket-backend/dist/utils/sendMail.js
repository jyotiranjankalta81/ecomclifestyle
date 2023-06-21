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
exports.sendMail = void 0;
const config_1 = require("../config/config");
const nodemailer = require('nodemailer');
const sendMail = (reciever, subject, text, html) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let transporter = nodemailer.createTransport({
            host: config_1.config.email.smtp.host,
            port: config_1.config.email.smtp.port,
            secure: true,
            auth: {
                user: config_1.config.email.smtp.auth.user,
                pass: config_1.config.email.smtp.auth.pass
            }
        });
        let info = yield transporter.sendMail({
            from: config_1.config.email.smtp.auth.user,
            to: reciever,
            subject: subject,
            text: text,
            html: html,
        });
        return {
            status: true,
            data: info
        };
    }
    catch (err) {
        return {
            status: false,
            data: err
        };
    }
});
exports.sendMail = sendMail;
//# sourceMappingURL=sendMail.js.map