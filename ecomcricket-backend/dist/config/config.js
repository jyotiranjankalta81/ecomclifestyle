"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const joi_1 = __importDefault(require("joi"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../../.env') });
const envVarsSchema = joi_1.default.object()
    .keys({
    NODE_ENV: joi_1.default.string().valid('production', 'development', 'test').required(),
    PORT: joi_1.default.number().default(3005),
    //developement
    DB_HOST: joi_1.default.string().required().description('Database host'),
    DEV_DB_URL: joi_1.default.string().required().description('Database name'),
    DEV_DB_USER: joi_1.default.string().required().description('Database Username'),
    DEV_DB_PASSWORD: joi_1.default.string().required().allow('').description('Database Password'),
    //production db
    PROD_DB_HOST: joi_1.default.string().required().description('ORACLE Production host'),
    PROD_DB_URL: joi_1.default.string().required().description('ORACLE Production name'),
    PROD_DB_USER: joi_1.default.string().required().description('Database Production Username'),
    PROD_DB_PASSWORD: joi_1.default.string().required().description('Database Production Password'),
    //jwt keys
    JWT_SECRET: joi_1.default.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: joi_1.default.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: joi_1.default.number().default(30).description('days after which refresh tokens expire'),
    SMTP_HOST: joi_1.default.string().description('server that will send the emails'),
    SMTP_PORT: joi_1.default.number().description('port to connect to the email server'),
    SMTP_USERNAME: joi_1.default.string().description('username for email server'),
    SMTP_PASSWORD: joi_1.default.string().description('password for email server'),
    EMAIL_FROM: joi_1.default.string().description('the from field in the emails sent by the app'),
    CLIENT_NAME: joi_1.default.string().description('the client of the app'),
    BACKENDURL: joi_1.default.string().description('the client of the app'),
})
    .unknown();
const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
exports.config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    backendurl: envVars.BACKENDURL,
    db: {
        host: envVars.DB_HOST,
        name: envVars.DEV_DB_URL,
        user: envVars.DEV_DB_USER,
        password: envVars.DEV_DB_PASSWORD,
    },
    proddb: {
        host: envVars.PROD_DB_HOST,
        name: envVars.PROD_DB_URL,
        user: envVars.PROD_DB_USER,
        password: envVars.PROD_DB_PASSWORD,
    },
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: 60,
    },
    email: {
        smtp: {
            host: envVars.SMTP_HOST,
            port: envVars.SMTP_PORT,
            auth: {
                user: envVars.SMTP_USERNAME,
                pass: envVars.SMTP_PASSWORD,
            },
        },
        from: envVars.EMAIL_FROM,
        clientName: envVars.CLIENT_NAME,
    },
};
//# sourceMappingURL=config.js.map