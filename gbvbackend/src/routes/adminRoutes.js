const express = require("express");
const db = require("../config/db"); // Import database connection
const router = express.Router();

// 1. Get all reported cases
router.get("/cases", (req, res) => {
  db.query("SELECT * FROM cases", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// 2. Get a specific case by ID
router.get("/cases/:id", (req, res) => {
  const caseId = req.params.id;

  db.query("SELECT * FROM cases WHERE id = ?", [caseId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Case not found" });
    }
    res.json(result[0]);
  });
});

// 3. Update case status (Pending → Solved)
router.put("/cases/:id", (req, res) => {
  const caseId = req.params.id;
  const { status } = req.body; // Expected values: "Pending" or "Solved"

  if (!status) {
    return res.status(400).json({ error: "Status is required" });
  }

  db.query("UPDATE cases SET status = ? WHERE id = ?", [status, caseId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Case not found" });
    }
    res.json({ message: "Case status updated successfully" });
  });
});

// 4. Delete a reported case by ID
router.delete("/cases/:id", (req, res) => {
  const caseId = req.params.id;

  db.query("DELETE FROM cases WHERE id = ?", [caseId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Case not found" });
    }
    res.json({ message: "Case deleted successfully" });
  });
});

module.exports = router;
