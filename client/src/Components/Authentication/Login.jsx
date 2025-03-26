import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify({ email }));

        if (data.user.caseId) {
          localStorage.setItem("caseId", data.user.caseId);
        }

        alert("Login successful!");
        navigate("/");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-500 to-purple-600">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">Welcome Back</h2>
        {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm mb-2 text-center">{error}</motion.p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Login
          </motion.button>
        </form>
        <p className="text-sm mt-4 text-center text-gray-600">
          Don't have an account? <Link to="/signup" className="text-indigo-500 hover:underline">Sign Up</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
