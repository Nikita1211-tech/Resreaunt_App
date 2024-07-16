const express = require("express");
const sql = require("mssql");
const app = express();

// const connectionString = "Server=localhost\\MSSQLSERVER02;Database=Restraunt;Trusted_Connection=True;";

let dbConfig = {
  server: "localhost\\MSSQLSERVER02",
  database: "Restraunt",
  user: "AzureAD\NikitaKumari",
  password: "Nicky121102%",
  port: 1433
};

async function connectDB() {
  let conn = await new sql.Connection(dbConfig);
  conn.connect();
}

connectDB();