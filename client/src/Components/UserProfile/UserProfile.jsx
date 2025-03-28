import React, { useEffect, useState } from "react";

const UserProfile = () => {
    const [profile, setProfile] = useState(null);
    const [notification, setNotification] = useState("");

    const caseId = localStorage.getItem("caseId");

    useEffect(() => {
    if (!caseId) {
      return;
    }
  
    // Function to fetch user profile
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user-profile/${caseId}`);
        const profileData = await response.json();
        setProfile(profileData);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
  
    // Function to fetch notifications
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user-profile/${caseId}/notifications`);
        const notificationData = await response.json();
        setNotification(notificationData.message);
      } catch (error) {
        console.error("Error fetching notification:", error);
      }
    };
  
    // Calling the two fns
    fetchUserProfile();
    fetchNotifications();
  
  }, [caseId]); //dependency

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">User Profile</h2>
                {profile ? (
                    <p><strong>Case Status:</strong> {profile.status}</p>
                ) : (
                    <p>Loading...</p>
                )}
                {notification && <p className="text-blue-500 mt-2">{notification}</p>}
            </div>
        </div>
    );
};

export default UserProfile;
