import dotenv from 'dotenv'
import path from 'path'
import Joi from 'joi'
dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3005),
    //developement
    DB_HOST: Joi.string().required().description('Database host'),
    DEV_DB_URL: Joi.string().required().description('Database name'),
    DEV_DB_USER: Joi.string().required().description('Database Username'),
    DEV_DB_PASSWORD: Joi.string().required().allow('').description('Database Password'),
    //production db
    PROD_DB_HOST: Joi.string().required().description('ORACLE Production host'),
    PROD_DB_URL: Joi.string().required().description('ORACLE Production name'),
    PROD_DB_USER: Joi.string().required().description('Database Production Username'),
    PROD_DB_PASSWORD: Joi.string().required().description('Database Production Password'),
    //jwt keys
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
    CLIENT_NAME: Joi.string().description('the client of the app'),
    BACKENDURL: Joi.string().description('the client of the app'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
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
