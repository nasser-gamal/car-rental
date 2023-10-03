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
