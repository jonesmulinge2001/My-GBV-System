const express = require("express");
const router = express.Router();
const db = require("../config/db"); // Import MySQL database connection

// 1 Get Total Cases Reported (Overall & Monthly Trends)
router.get("/total-cases", async (_req, res) => {
    try {
        const totalCasesQuery = "SELECT COUNT(*) AS total FROM cases";
        const monthlyCasesQuery = `
            SELECT MONTH(date_of_incidence) AS month, COUNT(*) AS count 
            FROM cases 
            GROUP BY MONTH(date_of_incidence)`;

        const [totalCases] = await db.promise().query(totalCasesQuery);
        const [monthlyCases] = await db.promise().query(monthlyCasesQuery);

        res.json({
            totalCases: totalCases[0].total,
            monthlyCases,
        });
    } catch (error) {
        res.status(500).json({ error: "Error fetching case analytics" });
    }
});

// 2️ Get Cases by Gender, Age, and Support Needed route
router.get("/cases-by-category", async (_req, res) => {
    try {
        const genderQuery = "SELECT gender, COUNT(*) AS count FROM cases GROUP BY gender";
        const ageQuery = "SELECT age, COUNT(*) AS count FROM cases GROUP BY age";
        const supportQuery = "SELECT support_needed, COUNT(*) AS count FROM cases GROUP BY support_needed";

        const[genderData] = await db.promise().query(genderQuery);
        const[ageData] = await db.promise().query(ageQuery);
        const[supportData] = await db.promise().query(supportQuery)

        res.json({ genderData, ageData, supportData });
    } catch (error) {
        res.status(500).json({ error: "Error fetching cases by category" });
    }
});

// 3️ Get Pending vs. Solved Cases (Status)
router.get("/case-status", async (req, res) => {
    try {
        const statusQuery = "SELECT status, COUNT(*) AS count FROM cases GROUP BY status";
        const[statusData] = await db.promise().query(statusQuery)

        res.json({ statusData });
    } catch (error) {
        res.status(500).json({ error: "Error fetching case status data" });
    }
});

module.exports = router;
