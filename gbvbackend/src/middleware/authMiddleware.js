const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "5a6827d99d7b09b50043499cc5d8fd2dffdd8dbe418df233a00fac1f007105ba9b5685e7bf52c837300f4b4b93554e86e669e9103a5e561501f72a51c4f149e5";

const authenticateToken = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer"

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach user info to request
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token." });
    }
};

module.exports = authenticateToken;
