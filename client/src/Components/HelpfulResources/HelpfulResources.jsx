import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HelpfulResources = () => {
  const [dynamicResources, setDynamicResources] = useState([]); // resorces fetched from the database
  const [loading, setLoading] = useState(true); // showing loading state when fetching resources from the database
  const [error, setError] = useState(null); // error desplay when no resource is loaded

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch("http://localhost:5000/resources/all");
        if (!response.ok) {
          throw new Error("Failed to fetch resources");
        }
        const data = await response.json(); // parses respomse body as JSON and returns a promise
        setDynamicResources(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []); // empty dependency

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 p-6">
      <motion.h1
        className="text-4xl font-bold text-gray-800 text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Helpful Resources
      </motion.h1>

      {loading && <div className="text-center text-gray-600">Loading resources...</div>}
      {error && <div className="text-center text-red-500 font-semibold">{error}</div>}

      {!loading && !error && (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dynamicResources.map((resource, index) => (
            <motion.div
              key={index}
              className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0,0,0,0.1)" }}
            >
              {resource.image && (
                <img
                  src={`http://localhost:5000/uploads/${resource.image}`}
                  alt={resource.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h2 className="text-xl font-semibold text-gray-700 mb-2">{resource.title}</h2>
              <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
              <Link
                to={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-white bg-blue-500 px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition"
              >
                View Resource
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HelpfulResources;