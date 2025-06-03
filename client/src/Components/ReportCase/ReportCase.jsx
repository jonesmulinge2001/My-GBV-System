import React, { useState } from "react";

const ReportCase = () => {
  const [myFormData, setMyFormData] = useState({
    firstname: "",
    gender: "",
    age: "",
    dateOfIncidence: "",
    caseDescription: "",
    supportNeeded: "",
    email: "",
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
    if (!myFormData.email.trim()) temporalErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(myFormData.email)) temporalErrors.email = "Email is not valid";
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

    try {
      const myResponse = await fetch("http://localhost:5000/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(myFormData),
      });

      const myData = await myResponse.json();

      if (myResponse.ok) {
        setSuccessMessage("Case reported successfully");
        localStorage.setItem("caseId", myData.caseId);
        setMyFormData({
          firstname: "",
          gender: "",
          age: "",
          dateOfIncidence: "",
          caseDescription: "",
          supportNeeded: "",
          email: "",
        });
        setErrors({});
      } else {
        setSuccessMessage(myData.message || "Failed to report a case. Try again");
      }
    } catch {
      setSuccessMessage("Something went wrong. Try again");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-gray-50 py-4 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Report a Case</h2>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 border border-green-300 rounded">
            {successMessage}
          </div>
        )}

        <form onSubmit={checkSubmit} noValidate className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstname"
              value={myFormData.firstname}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors.firstname && <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              value={myFormData.gender}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">-- Select Gender --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={myFormData.age}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={myFormData.email}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Incidence</label>
            <input
              type="date"
              name="dateOfIncidence"
              value={myFormData.dateOfIncidence}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.dateOfIncidence && <p className="text-red-500 text-sm mt-1">{errors.dateOfIncidence}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Case Description</label>
            <textarea
              name="caseDescription"
              value={myFormData.caseDescription}
              onChange={handleChange}
              rows="4"
              className="mt-1 w-full p-1 border border-gray-300 rounded-md"
            />
            {errors.caseDescription && <p className="text-red-500 text-sm mt-1">{errors.caseDescription}</p>}
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Support Needed</label>
            <textarea
              name="supportNeeded"
              value={myFormData.supportNeeded}
              onChange={handleChange}
              rows="2"
              className="mt-1 w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.supportNeeded && <p className="text-red-500 text-sm mt-1">{errors.supportNeeded}</p>}
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-md text-white font-semibold transition ${
                isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Report Case"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportCase;
