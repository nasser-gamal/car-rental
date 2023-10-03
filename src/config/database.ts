import { Token, User } from '../entities/index';
import { DataSource } from 'typeorm';
import config from './config';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: config.db.host || 'localhost',
  port: +config.db.port || 3306,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  logging: true,
  synchronize: config.app.env === 'development' ? true : false,
  entities: [User, Token],
});

/**
 * Connects to the database
 * @returns {Promise<DataSource>}
 */

export const connectDB = (): Promise<DataSource> => {
  try {
    const datasource = AppDataSource.initialize();
    console.log('Data Source has been initialized!');
    return datasource;
  } catch (err) {
    console.error('Error during Data Source initialization', err);
  }
};
