import React, { useState } from "react";

const ReportCase = () => {
  const [myFormData, setMyFormData] = useState({
    firstname: "",
    gender: "",
    age: "",
    dateOfIncidence: "",
    caseDescription: "",
    supportNeeded: "",
    email: "" // Added the email field
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const formValidation = () => {
    const today = new Date().toISOString().split("T")[0];
    let temporalErrors = {};

    if (!myFormData.firstname.trim()) temporalErrors.firstname = "Valid name is required";
    if (!myFormData.gender) temporalErrors.gender = "Gender is required";
    if (!myFormData.age || isNaN(myFormData.age)) temporalErrors.age = "Valid age is required";
    if (!myFormData.email.trim()) temporalErrors.email = "Email is required"; // Email validation
    else if (!/\S+@\S+\.\S+/.test(myFormData.email)) temporalErrors.email = "Email is not valid"; // Simple email pattern check

    if (!myFormData.dateOfIncidence) {
      temporalErrors.dateOfIncidence = "Date of incidence is required";
    } else if (myFormData.dateOfIncidence > today) {
      temporalErrors.dateOfIncidence = "Provide a date which is not in the future";
    }

    if (!myFormData.caseDescription.trim()) temporalErrors.caseDescription = "Case description is required";
    if (!myFormData.supportNeeded.trim()) temporalErrors.supportNeeded = "State the support you need";

    setErrors(temporalErrors);
    return Object.keys(temporalErrors).length === 0;
  };

  const handleChange = (e) => {
    setMyFormData({ ...myFormData, [e.target.name]: e.target.value });
  };

  const checkSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
  
    if (!formValidation()) return;
  
    setIsSubmitting(true);
  
    console.log(myFormData);  // Check what is being sent
  
    try {
      const myResponse = await fetch("http://localhost:5000/cases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(myFormData),
      });
  
      const myData = await myResponse.json();
  
      if (myResponse.ok) {
        setSuccessMessage("Case reported successfully");
        localStorage.setItem("caseId", myData.caseId); // Adjusted based on your backend response
        setMyFormData({
          firstname: "",
          gender: "",
          age: "",
          dateOfIncidence: "",
          caseDescription: "",
          supportNeeded: "",
          email: "", // Reset email field
        });
        setErrors({});
      } else {
        setSuccessMessage(myData.message || "Failed to report a case. Try again");
      }
    } catch (error) {
      setSuccessMessage("Something went wrong. Try again");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="max-w-xl mx-auto p-6 shadow-lg rounded-md bg-white">
      <h2 className="text-2xl font-semibold mb-4 text-center">Report a Case</h2>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      <form onSubmit={checkSubmit} noValidate>
        <div className="mb-4">
          <label className="block font-medium">First Name</label>
          <input
            type="text"
            name="firstname"
            value={myFormData.firstname}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
          {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}
        </div>

        <div className="mb-4">
          <label className="block font-medium">Gender</label>
          <select
            name="gender"
            value={myFormData.gender}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          >
            <option value="">-- Select Gender --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
        </div>

        <div className="mb-4">
          <label className="block font-medium">Age</label>
          <input
            type="number"
            name="age"
            value={myFormData.age}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
        </div>

        <div className="mb-4">
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={myFormData.email}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block font-medium">Date of Incidence</label>
          <input
            type="date"
            name="dateOfIncidence"
            value={myFormData.dateOfIncidence}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
          {errors.dateOfIncidence && <p className="text-red-500 text-sm">{errors.dateOfIncidence}</p>}
        </div>

        <div className="mb-4">
          <label className="block font-medium">Case Description</label>
          <textarea
            name="caseDescription"
            value={myFormData.caseDescription}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            rows="4"
          />
          {errors.caseDescription && <p className="text-red-500 text-sm">{errors.caseDescription}</p>}
        </div>

        <div className="mb-4">
          <label className="block font-medium">Support Needed</label>
          <textarea
            name="supportNeeded"
            value={myFormData.supportNeeded}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            rows="3"
          />
          {errors.supportNeeded && <p className="text-red-500 text-sm">{errors.supportNeeded}</p>}
        </div>

        <button
          type="submit"
          className={`w-full p-2 rounded text-white ${isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Report Case"}
        </button>
      </form>
    </div>
  );
};

export default ReportCase;
