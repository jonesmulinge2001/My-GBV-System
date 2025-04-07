import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setFeedback("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/admin-auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setFeedback(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // Ensure that 'data.token' and 'data.user' exist before accessing them
      if (data.token && data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("adminEmail", data.user.email);  // Corrected to 'data.user.email'
      } else {
        setFeedback("Login successful, but no user data received.");
      }

      setFeedback("Login successful!");
      setLoading(false);

      // Redirect to admin dashboard or home
      navigate("/admin/manage-reports");

    } catch (error) {
      console.error("Login error:", error);
      setFeedback("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-5"
      >
        <h2 className="text-xl font-semibold text-center text-gray-800">Admin Login</h2>

        {feedback && (
          <p className={`text-center text-sm ${feedback.includes("success") ? "text-green-600" : "text-red-500"}`}>
            {feedback}
          </p>
        )}

        <div>
          <label className="block text-sm text-gray-600">Email</label>
          <input
            type="email"
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Password</label>
          <input
            type="password"
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 text-white rounded-md font-medium transition ${
            loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
