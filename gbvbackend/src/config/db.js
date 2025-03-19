const mysql = require("mysql2"); // import mysql

// creating db connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", 
  password: "password", 
  database: "gbv", 
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

module.exports = db;
