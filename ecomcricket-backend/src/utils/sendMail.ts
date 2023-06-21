import { config } from "../config/config";

const nodemailer = require('nodemailer')


export const sendMail = async (reciever: string, subject: string, text: string, html?: any) => {

    try {
        let transporter = nodemailer.createTransport({
            host: config.email.smtp.host,
            port: config.email.smtp.port,
            secure: true,
            auth: {
                user: config.email.smtp.auth.user,
                pass: config.email.smtp.auth.pass
            }
        });
        let info = await transporter.sendMail({
            from: config.email.smtp.auth.user,
            to: reciever,
            subject: subject,
            text: text,
            html: html,
        })
        return {
            status: true,
            data: info
        };
    } catch (err) {

        return {
            status: false,
            data: err
        }
    }
}