import 'dotenv/config';
import * as Joi from 'joi';
import { Config } from '../interfaces/config.interface';
import type { ObjectSchema } from 'joi';


export const envVarsSchema: ObjectSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test'),
    PORT: Joi.number().default(3000).description('server port'),
    DB_DATABASE: Joi.string().description('Mysql DB database name'),
    DB_PORT: Joi.string().description('Mysql DB port'),
    DB_HOST: Joi.string().description('Mysql DB host'),
    DB_USER: Joi.string().description('Mysql DB username'),
    DB_PASSWORD: Joi.string().description('Mysql DB password'),
    JWT_ACCESS_TOKEN: Joi.string().description('JWT Secret Key'),
    STRIPE_SECRET: Joi.string().description('Stripe Secret Key'),
    STRIPE_WEBHOOK_SECRET: Joi.string().description(
      'Stripe Webhook Secret Key'
    ),
    EMAIL_HOST: Joi.string().description('Email Service host'),
    EMAIL_PORT: Joi.string().description('Email Service port'),
    EMAIL_USER: Joi.string().description('Email Service username'),
    EMAIL_PASSWORD: Joi.string().description('Email Service password'),
  })
  .unknown();

const {
  value: envVar,
  error,
}: { value: NodeJS.ProcessEnv | undefined; error: Error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

console.log(process.env.DB_USERNAME);
const config: Config = {
  app: {
    env: envVar.NODE_ENV,
  },
  server: {
    port: +envVar.PORT,
  },
  db: {
    database: envVar.DB_DATABASE,
    port: envVar.DB_PORT,
    host: envVar.DB_HOST,
    username: envVar.DB_USER,
    password: envVar.DB_PASSWORD,
  },
  jwt: {
    secret: envVar.JWT_SECRET_TOKEN,
    expires_in: +envVar.SECRET_EXPIRES_IN * 60 * 1000,
    refresh_secret: envVar.JWT_REFRESH_TOKEN,
    refresh_expires_in: +envVar.REFRESH_TOKEN_EXPIRES_IN * 24 * 60 * 60 * 1000,
  },
  emails: {
    host: envVar.EMAIL_HOST,
    port: envVar.EMAIL_PORT,
    username: envVar.EMAIL_USER,
    password: envVar.EMAIL_PASSWORD,
  },
  stripe: {
    secret: envVar.STRIPE_SECRET,
    webhook: envVar.STRIPE_WEBHOOK_SECRET,
  },
  paypal: {
    secret: envVar.STRIPE_SECRET,
    webhook: envVar.STRIPE_WEBHOOK_SECRET,
  },
};

export default config;
