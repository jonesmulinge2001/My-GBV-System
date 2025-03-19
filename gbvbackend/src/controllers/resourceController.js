const db = require("../config/db");

// Add a resource
exports.addResource = (req, res) => {
  const { title, description, link } = req.body;
  if (!title || !description || !link) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const sql = "INSERT INTO helpfulresources  (title, description, link) VALUES (?, ?, ?)";
  db.query(sql, [title, description, link], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Resource added successfully", id: result.insertId });
  });
};

// Get all resources
exports.getResources = (req, res) => {
  const sql = "SELECT * FROM helpfulresources ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Delete a resource
exports.deleteResource = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM helpfulresources WHERE id = ?";
  
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.status(200).json({ message: "Resource deleted successfully" });
  });
};
