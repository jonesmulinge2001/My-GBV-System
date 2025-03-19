const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { addResource, getResources, deleteResource } = require("../controllers/resourceController");

// Multer storage configuration for file uploads
const storage = multer.diskStorage({
  destination: "./uploads/", // Ensure this folder exists
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});
const upload = multer({ storage });

// Routes
router.post("/add", upload.single("image"), addResource); // Add a new resource with an image
router.get("/all", getResources);                         // Get all resources
router.delete("/:id", deleteResource);                   // Delete a resource by ID

module.exports = router;
