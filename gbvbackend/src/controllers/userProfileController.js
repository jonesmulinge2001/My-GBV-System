const UserProfile = require("../models/UserProfile");

// Get user profile details based on case ID
exports.getUserProfile = (req, res) => {
  const caseId = req.params.userId; // caseId is used since we are fetching by case ID

  UserProfile.getUserProfileById(caseId, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ message: "No profile found" });

    res.json(result[0]);  // Return user profile data
  });
};

// Get notification if case is solved
exports.getCaseNotification = (req, res) => {
  const caseId = req.params.userId;

  UserProfile.getUserProfileById(caseId, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.json({ message: "No case found", notification: false });

    const { status } = result[0];
    if (status === "Solved") {
      return res.json({ message: "Your case has been solved!", notification: true });
    } else {
      return res.json({ message: "No new updates", notification: false });
    }
  });
};
