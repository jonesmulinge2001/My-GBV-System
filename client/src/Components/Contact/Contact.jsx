import React, { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [responseMessage, setResponseMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage(null);

    try {
      const response = await fetch("http://localhost:5000/contact/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setResponseMessage({ type: "success", text: "Message sent successfully!" });
        setFormData({ fullName: "", email: "", message: "" });
      } else {
        setResponseMessage({ type: "error", text: data.error || "Failed to send message" });
      }
    } catch (error) {
      setResponseMessage({ type: "error", text: "Server error, please try again later" });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-10 rounded-2xl shadow-xl max-w-lg w-full"
      >
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Contact Us</h1>

        {responseMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3 text-center font-medium rounded-md ${
              responseMessage.type === "success" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
            }`}
          >
            {responseMessage.text}
          </motion.div>
        )}

        <form className="space-y-6 mt-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="John Doe"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
              value={formData.fullName}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="johndoe@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Message</label>
            <textarea
              name="message"
              placeholder="Type your message here..."
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
              value={formData.message}
              required
            ></textarea>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg transition hover:bg-blue-700"
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;
