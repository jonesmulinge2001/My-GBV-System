const express = require("express");
const router = express.Router();
const db = require("../config/db"); // Import your database connection

// Route to create a new case report
router.post("/", (req, res) => {
  const { firstname, gender, age, email, dateOfIncidence, caseDescription, supportNeeded } = req.body;

  // Validate that all required fields are present
  if (!firstname || !gender || !age || !dateOfIncidence || !caseDescription || !supportNeeded || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Insert new case into the database
  const sql = "INSERT INTO cases (firstname, gender, age, email, date_of_incidence, case_description, support_needed) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [firstname, gender, age, email, dateOfIncidence, caseDescription, supportNeeded];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database Error:", err.sqlMessage || err);
      return res.status(500).json({ message: "Error reporting case", error: err.sqlMessage || err });
    }
    res.status(201).json({ message: "Case reported successfully", caseId: result.insertId });
  });
});

// Route to get all reported cases
router.get("/", (req, res) => {
  db.query("SELECT * FROM cases", (err, results) => {
    if (err) {
      console.error("Database Error:", err.sqlMessage || err);
      return res.status(500).json({ message: "Error retrieving cases", error: err.sqlMessage || err });
    }
    res.json(results);
  });
});

// Route to get a specific case by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM cases WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Database Error:", err.sqlMessage || err);
      return res.status(500).json({ message: "Error retrieving case", error: err.sqlMessage || err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Case not found" });
    }

    res.status(200).json(results[0]);
  });
});

// Route to update case status
router.put("/:id", (req, res) => {
  const { id } = req.params; // Get the case ID from URL parameters
  const { status } = req.body; // Get the new status from the request body

  if (!status || !['pending', 'in-progress', 'resolved'].includes(status.toLowerCase())) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const sql = "UPDATE cases SET status = ? WHERE id = ?";
  const values = [status, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database Error:", err.sqlMessage || err);
      return res.status(500).json({ message: "Error updating case status", error: err.sqlMessage || err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Case not found" });
    }

    res.status(200).json({ message: "Case status updated successfully", caseId: id, newStatus: status });
  });
});

// New route to check case status by email
router.get("/case-status/:email", (req, res) => {
  const { email } = req.params;
  console.log(`Searching for case with email: ${email}`);  // Log the email parameter

  const sql = "SELECT status, admin_response FROM cases WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error("Database Error:", err.sqlMessage || err);
      return res.status(500).json({ error: "Database error", message: err.sqlMessage || err });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "No case found for this email" });
    }

    const caseData = result[0];
    res.status(200).json({
      status: caseData.status,
      admin_response: caseData.admin_response || "No response yet from the admin."
    });
  });
});


module.exports = router;
