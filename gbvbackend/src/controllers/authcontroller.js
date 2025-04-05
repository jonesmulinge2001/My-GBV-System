const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
require("dotenv").config(); 

const JWT_SECRET = process.env.JWT_SECRET || "";

// 📌 Signup Function
const signupUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const checkEmailSQL = "SELECT * FROM users WHERE email = ?";
        db.query(checkEmailSQL, [email], (err, results) => {
            if (err) return res.status(500).json({ message: "Oppss! something went wrong try again" });

            if (results.length > 0) {
                return res.status(400).json({ message: "Email already in use" });
            }

            const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
            db.query(sql, [email, hashedPassword], (err, result) => {
                if (err) return res.status(500).json({ message: "Database error" });

                const token = jwt.sign({ id: result.insertId, email }, JWT_SECRET, { expiresIn: "7d" });

                return res.status(201).json({ message: "Signup successful", token });
            });
        });
    } catch (error) {
        return res.status(500).json({ message: "Error hashing password" });
    }
};

// 📌 Login Function (Includes Case ID)
const loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.error("Database error:", err);  
            return res.status(500).json({ message: "Database error", error: err });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const user = results[0];

        try {
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            // Fetch case ID linked to the user
            const caseSql = "SELECT id FROM cases WHERE id = ?";
            db.query(caseSql, [user.id], (caseErr, caseResults) => {
                if (caseErr) {
                    console.error("Error fetching case ID:", caseErr); 
                    return res.status(500).json({ message: "Database error", error: caseErr });
                }

                const caseId = caseResults.length > 0 ? caseResults[0].id : null;

                const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

                console.log("User logged in:", { id: user.id, email: user.email, caseId }); 

                return res.status(200).json({
                    message: "Login successful",
                    token,
                    user: {
                        id: user.id,
                        email: user.email,
                        caseId: caseId,
                    },
                });
            });

        } catch (error) {
            console.error("Password validation error:", error); 
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    });
};


module.exports = { signupUser, loginUser };
