const db = require("../config/db"); // Correct path to db.js

const createTables = () => {
  const usersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    )
  `;

  const casesTable = `
    CREATE TABLE IF NOT EXISTS cases (
      id INT AUTO_INCREMENT PRIMARY KEY,
      firstname VARCHAR(100) NOT NULL,
      gender ENUM('Male', 'Female', 'Other') NOT NULL,
      age INT NOT NULL,
      date_of_incidence DATE NOT NULL,
      case_description TEXT NOT NULL,
      support_needed TEXT NOT NULL,
      status ENUM('pending', 'in-progress', 'resolved') DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  const helpfulResourcesTable = `
    CREATE TABLE IF NOT EXISTS helpfulresources (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      link VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  const messagesTable = `
    CREATE TABLE IF NOT EXISTS messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      fullName VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      response TEXT DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      responded_at TIMESTAMP NULL
    )
  `;

  db.query(usersTable, (err) => {
    if (err) {
      console.error("Error creating users table:", err);
    } else {
      console.log("Users table ready");
    }
  });

  db.query(casesTable, (err) => {
    if (err) {
      console.error("Error creating cases table:", err);
    } else {
      console.log("Cases table ready");
    }
  });

  db.query(helpfulResourcesTable, (err) => {
    if (err) {
      console.error("Error creating helpfulresources table:", err);
    } else {
      console.log("Helpful Resources table ready");
    }
  });

  db.query(messagesTable, (err) => {
    if (err) {
      console.error("Error creating messages table:", err);
    } else {
      console.log("Messages table ready");
    }
  });
};

module.exports = createTables;
