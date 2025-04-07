const express = require("express");
const cors = require("cors");
const db = require("./src/config/db");
const createTables = require("./src/models/createTables");

// Routes
const authRoutes = require("./src/routes/authroutes"); // Authentication routes
const caseRoutes = require("./src/routes/caseroutes"); // Routes for user-reported cases
const adminRoutes = require("./src/routes/adminRoutes"); // Admin manages reported cases
const adminAuthRoutes = require("./src/routes/adminAuthroutes"); // Admin register & login
const resourceRoutes = require("./src/routes/resourceRoutes");
const analyticsRoutes = require("./src/routes/analytics");
const contactRoutes = require("./src/routes/contactRoutes");
const userProfileRoutes = require("./src/routes/userProfileRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Initialize database tables
createTables();

// Use routes
app.use("/auth", authRoutes);
app.use("/cases", caseRoutes);  // This is where the /case-status/:email route is defined
app.use("/admin", adminRoutes);
app.use("/admin-auth", adminAuthRoutes); // Add admin auth route
app.use("/resources", resourceRoutes);
app.use("/analytics", analyticsRoutes);
app.use("/contact", contactRoutes);
app.use("/user-profile", userProfileRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
