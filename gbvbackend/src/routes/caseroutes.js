const express = require("express"); // importing express
const router = express.Router(); // express router for routes and endpoints
const db = require("../config/db"); // importing database for creating tables

// Route to create a new case report
router.post("/", (req, res) => {
  const { firstname, gender, age, date_of_incidence, case_description, support_needed } = req.body;

  // verifying whether all fields are provided
  if (!firstname || !gender || !age || !date_of_incidence || !case_description || !support_needed) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "INSERT INTO cases (firstname, gender, age, date_of_incidence, case_description, support_needed) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [firstname, gender, age, date_of_incidence, case_description, support_needed];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database Error:", err.sqlMessage || err);
      return res.status(500).json({ message: "Error reporting case", error: err.sqlMessage || err });
    }
    res.status(201).json({ message: "Case reported successfully", caseId: result.insertId });
  });
});

// Route to get all reported cases
router.get("/cases", (req, res) => {
  db.query("SELECT * FROM cases", (err, results) => {
    if (err) {
      console.error("Database Error:", err.sqlMessage || err);
      return res.status(500).json({ message: "Error retrieving cases", error: err.sqlMessage || err });
    }
    res.json(results);
  });
});

module.exports = router;
