import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource ({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [
    __dirname + '/entities/*.ts'
  ],
  synchronize: true,
});