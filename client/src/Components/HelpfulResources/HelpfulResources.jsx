import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HelpfulResources = () => {
  const [dynamicResources, setDynamicResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const myResponse = await fetch("http://localhost:5000/resources/all");
        if (!myResponse.ok) {
          throw new Error("Failed to fetch resources");
        }
        const data = await myResponse.json();
        setDynamicResources(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const toggleReadMore = (index) => {
    setExpandedCards((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const getPreviewText = (text, isExpanded) => {
    const words = text.split(" ");
    return isExpanded ? text : words.slice(0, 5).join(" ") + (words.length > 5 ? "..." : "");
  };

  return (
    <div className="min-h-screen -mt-10 bg-gradient-to-b from-blue-50 to-gray-100 p-6">
      <motion.h1
        className="text-sm font-bold text-gray-800 text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Resources to help you understand more about gender based violence
      </motion.h1>

      {loading && <div className="text-center text-gray-600">Loading resources...</div>}
      {error && <div className="text-center text-red-500 font-semibold">{error}</div>}

      {!loading && !error && (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
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
              <p className="text-gray-600 text-sm mb-2">
                {getPreviewText(resource.description, expandedCards[index])}
              </p>
              {resource.description.split(" ").length > 5 && (
                <button
                  onClick={() => toggleReadMore(index)}
                  className="text-blue-600 text-xs font-medium mb-2 hover:underline"
                >
                  {expandedCards[index] ? "Read less" : "Read more"}
                </button>
              )}
              <Link
                to={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-white text-xs bg-blue-500 px-3 py-1 rounded-lg font-medium hover:bg-blue-600 transition"
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
