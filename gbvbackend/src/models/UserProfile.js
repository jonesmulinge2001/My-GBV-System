const db = require("../config/db");

const UserProfile = {  
  // Get user profile using case ID
  getUserProfileById: (caseId, callback) => {
    db.query(
      "SELECT id, firstname AS fullname, gender, age, status FROM cases WHERE id = ?",
      [caseId],
      (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
      }
    );
  }
};

module.exports = UserProfile;
