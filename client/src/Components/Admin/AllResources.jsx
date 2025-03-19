import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AllResources = () => {
  const [resources, setResources] = useState([]);

  // Fetch all resources from the backend
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch("http://localhost:5000/resources/all");
        if (!response.ok) {
          throw new Error("Failed to fetch resources");
        }
        const data = await response.json();
        setResources(data);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };
  
    fetchResources();
  }, []);
  

  // Handle resource deletion
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/resources/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete resource");
      }
  
      setResources((prevResources) =>
        prevResources.filter((resource) => resource.id !== id)
      );
    } catch (error) {
      console.error("Error deleting resource:", error);
    }
  };
  

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">List of all Resources</h2>

      {resources.length === 0 ? <p className="text-center text-gray-500">No resources available.</p> : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold">{resource.title}</h3>
              <p className="text-sm text-gray-600 my-2">{resource.description}</p>
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Resource
              </a>
              <button
                onClick={() => handleDelete(resource.id)}
                className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllResources;
