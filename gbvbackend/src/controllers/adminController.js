const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = '5a6827d99d7b09b50043499cc5d8fd2dffdd8dbe418df233a00fac1f007105ba9b5685e7bf52c837300f4b4b93554e86e669e9103a5e561501f72a51c4f149e5'

// Admin Signup
// Admin Signup
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  db.query("SELECT * FROM admin WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length > 0) return res.status(400).json({ error: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO admin (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      (err, result) => {
        if (err) return res.status(500).json({ error: "Signup failed" });

        // ✅ Generate JWT token
        const newAdminId = result.insertId;
        const token = jwt.sign(
          { id: newAdminId, email, role: "admin" },
          JWT_SECRET,
          { expiresIn: "1d" }
        );

        res.status(201).json({
          message: "Admin registered successfully",
          token,
          user: { id: newAdminId, name, email }
        });
      }
    );
  });
};


// Admin Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const sql = "SELECT * FROM admin WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
      if (err) {
        console.error("Login error:", err);
        return res.status(500).json({ error: "Database error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // ✅ Create JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: "admin" },
        JWT_SECRET,
        { expiresIn: "1d" }
      );

      // Send the response with the token and user info (not 'admin')
      res.status(200).json({
        message: "Login successful",
        token,  // Send token
        user: { id: user.id, name: user.name, email: user.email },  // Send user details
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
