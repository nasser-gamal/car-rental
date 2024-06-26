export interface Config {
  app: {
    env: string;
  };
  server: {
    port: number;
  };
  db: {
    database: string;
    port: number | string;
    host: string;
    username: string;
    password: string;
  };
  jwt: {
    secret: string;
    expires_in: number;
    refresh_secret: string;
    refresh_expires_in: number;
  };
  emails: {
    host: string;
    port: number | string;
    username: string;
    password: string;
  };
  stripe: {
    secret: string;
    webhook: string;
  };
  paypal: {
    secret: string;
    webhook: string;
  };
}
