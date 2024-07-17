import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: 'mysql',
  database: 'restaurant_booking',
  username: 'root',
  password: '',
  host: 'localhost',
  port: 3306,
});

sequelize.authenticate().then(() => {
  console.log("Connection to database established successfully");
}).catch((err: Error) => {
  console.log("Unable to connect to database", err);
})

export { sequelize }