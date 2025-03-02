import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres', // or 'mysql', 'sqlite', 'mariadb', 'mssql'
    port: Number(process.env.DB_PORT) || 5432,
  }
);

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default sequelize;