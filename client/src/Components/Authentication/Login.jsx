import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const chechkLogin = async (e) => {
    e.preventDefault(); // prevents refresh
    setError(null);

    try {
      const myResponse = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const myData = await myResponse.json();

      if (myResponse.ok) {
        localStorage.setItem("token", myData.token);
        localStorage.setItem("user", JSON.stringify({ email }));

        if (myData.user.caseId) {
          localStorage.setItem("caseId", myData.user.caseId);
        }

        alert("Login successful!");
        navigate("/");
      } else {
        setError(myData.message || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:");
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-500 to-purple-600">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">Welcome Back</h2>
        {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm mb-2 text-center">{error}</motion.p>}
        <form onSubmit={chechkLogin} className="space-y-4">
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-full cursor-pointer font-semibold hover:bg-indigo-700 transition"
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
