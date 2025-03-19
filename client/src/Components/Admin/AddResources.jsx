import React, { useState } from "react";
import axios from "axios";

const AddResources = ({ onAddResource }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle Image Upload Preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !link || !image) {
      alert("All fields are required!");
      return;
    }

    setLoading(true);

    // Prepare Form Data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("link", link);
    formData.append("image", image);

    try {
      const response = await axios.post("http://localhost:5000/resources/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onAddResource(response.data); // Update UI immediately
      setTitle("");
      setDescription("");
      setLink("");
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error("Error adding resource:", error);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Resource</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" required></textarea>
        <input type="url" placeholder="Resource Link" value={link} onChange={(e) => setLink(e.target.value)} className="w-full p-2 border rounded" required />

        <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2 border rounded" required />
        {preview && <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded-lg mt-2" />}

        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full" disabled={loading}>
          {loading ? "Adding..." : "Add Resource"}
        </button>
      </form>
    </div>
  );
};

export default AddResources;
