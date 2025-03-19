const bcrypt = require("bcrypt");
const db = require("../config/db");

// Signup function
const signupUser = async (req, res) => {
    const {email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
        db.query(sql, [email, hashedPassword], (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Database error" });
            }
            res.status(201).json({ message: "Signup successful" });
        });
    } catch (error) {
        res.status(500).json({ message: "Error hashing password" });
    }
};

// Login function
const loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database error" });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.status(200).json({ message: "Login successful" });
    });
};

module.exports = { signupUser, loginUser };
