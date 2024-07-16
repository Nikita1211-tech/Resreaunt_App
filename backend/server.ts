import { Sequelize } from '@sequelize/core';
import { MsSqlDialect } from '@sequelize/mssql';

const sequelize = new Sequelize({
  dialect: MsSqlDialect,
  server: 'localhost',
  port: 1433,
  database: 'database',
  authentication: {
    type: 'default',
    options: {
      userName: 'username',
      password: 'password',
    },
  },
});

try {
  if (sequelize) {
    console.log("Database is up and running");
  }
} catch (error) {
  console.log(error);
}