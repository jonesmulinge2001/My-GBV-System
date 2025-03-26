const express = require("express");
const cors = require("cors");
const db = require("./src/config/db");
const createTables = require("./src/models/createTables"); // Initializes tables
const authRoutes = require("./src/routes/authroutes"); // Authentication routes
const caseRoutes = require("./src/routes/caseroutes"); // Routes for user-reported cases
const adminRoutes = require("./src/routes/adminRoutes"); // Admin manages reported cases
const resourceRoutes = require("./src/routes/resourceRoutes"); // Routes for managing resources
const analyticsRoutes = require("./src/routes/analytics"); // Case Reporting Analytics
const contactRoutes = require("./src/routes/contactRoutes"); // Contact component routes
const userProfileRoutes = require("./src/routes/userProfileRoutes"); // User Profile Routes

const app = express();

app.use(cors());
app.use(express.json());

// Initialize database tables
createTables();

// Routes
app.use("/auth", authRoutes);
app.use("/cases", caseRoutes); // Users report cases
app.use("/admin", adminRoutes); // Admin manages reported cases
app.use("/resources", resourceRoutes); // Admin manages resources (add, view, delete)
app.use("/analytics", analyticsRoutes); // Analytics for case reporting
app.use("/contact", contactRoutes); // Users send messages, admins view/respond
app.use("/user-profile", userProfileRoutes); // User profile fetches user details & notifications

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
