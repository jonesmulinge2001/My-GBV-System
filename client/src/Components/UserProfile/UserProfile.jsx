import React, { useEffect, useState } from "react";

const UserProfile = () => {
    const [profile, setProfile] = useState(null);
    const [notification, setNotification] = useState("");

    const caseId = localStorage.getItem("caseId");

    useEffect(() => {
        if (!caseId) return;

        fetch(`http://localhost:5000/user-profile/${caseId}`)
            .then((res) => res.json())
            .then((data) => setProfile(data))
            .catch((err) => console.error("Error fetching profile:", err));

        fetch(`http://localhost:5000/user-profile/${caseId}/notifications`)
            .then((res) => res.json())
            .then((data) => setNotification(data.message))
            .catch((err) => console.error("Error fetching notification:", err));
    }, [caseId]);

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
