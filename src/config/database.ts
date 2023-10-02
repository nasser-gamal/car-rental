import { User } from '../entities/index';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: +process.env.DATABASE_PORT || 3306,
  username: 'root',
  password: '74neverforget',
  database: 'rent',
  logging: true,
  // synchronize: config.app.env === "development" ? true : false,
  synchronize: true,
  entities: [User],
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
