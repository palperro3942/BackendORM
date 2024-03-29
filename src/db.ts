import { DataSource } from 'typeorm';
import {User} from "./entities/user.entity"
import { config } from "dotenv";
config();

export const AppDataSource = new DataSource ({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [
    User,
    __dirname + './entities/*.entity.ts'
  ],
  synchronize: true,
  logging: true,
});