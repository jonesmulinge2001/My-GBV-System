const express = require("express");
const router = express.Router();
const UserProfileController = require("../controllers/userProfileController");

// Get user profile details from reported cases
router.get("/:userId", UserProfileController.getUserProfile);

// Check if user has a solved case
router.get("/:userId/notifications", UserProfileController.getCaseNotification);

module.exports = router;
