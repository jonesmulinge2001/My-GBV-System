const db = require("../config/db"); // Database connection
const bcrypt = require("bcrypt");

// 📌 GET User Profile
exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Extract user ID from the token
        const [user] = await db.query("SELECT firstname, email, gender, age FROM users WHERE id = ?", [userId]);

        if (!user.length) return res.status(404).json({ message: "User not found" });

        res.json(user[0]); // Return user details
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// 📌 UPDATE User Profile
exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Extract user ID from token
        const { firstname, email, gender, age, password } = req.body;

        // Encrypt password if updated
        let hashedPassword = null;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // Update user profile
        const query = `
            UPDATE users 
            SET firstname = ?, email = ?, gender = ?, age = ? ${password ? ", password = ?" : ""} 
            WHERE id = ?`;

        const values = password ? [firstname, email, gender, age, hashedPassword, userId] : [firstname, email, gender, age, userId];

        await db.query(query, values);

        res.json({ message: "Profile updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
