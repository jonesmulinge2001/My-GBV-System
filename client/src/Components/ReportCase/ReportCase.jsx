import React, { useState } from "react";

const ReportCase = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    gender: "",
    age: "",
    dateOfIncident: "",
    caseDescription: "",
    supportNeeded: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    let tempErrors = {};
    if (!formData.firstName) tempErrors.firstName = "First Name is required";
    if (!formData.gender) tempErrors.gender = "Gender is required";
    if (!formData.age || isNaN(formData.age)) tempErrors.age = "Valid Age is required";
    if (!formData.dateOfIncident) tempErrors.dateOfIncident = "Date of Incident is required";
    if (!formData.caseDescription) tempErrors.caseDescription = "Case Description is required";
    if (!formData.supportNeeded) tempErrors.supportNeeded = "Please specify the support needed";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setSuccessMessage("");

      const requestData = {
        firstname: formData.firstName,
        gender: formData.gender,
        age: formData.age,
        date_of_incidence: formData.dateOfIncident,
        case_description: formData.caseDescription,
        support_needed: formData.supportNeeded,
      };

      console.log("Submitting Data:", requestData);

      try {
        const response = await fetch("http://localhost:5000/cases", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        });

        const data = await response.json();
        console.log("Response Data:", data);

        if (response.ok) {
          setSuccessMessage("Case reported successfully!");
          setFormData({
            firstName: "",
            gender: "",
            age: "",
            dateOfIncident: "",
            caseDescription: "",
            supportNeeded: "",
          });
        } else {
          setSuccessMessage(data.message || "Failed to report the case. Try again.");
        }
      } catch (error) {
        console.error("Error reporting case:", error);
        setSuccessMessage("An error occurred. Please try again later.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">Report a Case</h2>
        
        {successMessage && (
          <p className="text-center text-green-600 font-semibold my-4">{successMessage}</p>
        )}

        <form className="mt-4" onSubmit={handleSubmit}>
          {Object.entries({
            firstName: "First Name",
            gender: "Gender",
            age: "Age",
            dateOfIncident: "Date of Incident",
            caseDescription: "Case Description",
            supportNeeded: "Support Needed",
          }).map(([field, label]) => (
            <div key={field} className="mb-4">
              <label className="block text-gray-700">{label}</label>
              {field === "gender" ? (
                <select name={field} value={formData[field]} onChange={handleChange} className="w-full p-2 border rounded-lg focus:outline-none">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : field === "caseDescription" || field === "supportNeeded" ? (
                <textarea name={field} value={formData[field]} onChange={handleChange} className="w-full p-2 border rounded-lg focus:outline-none"></textarea>
              ) : (
                <input name={field} value={formData[field]} onChange={handleChange} type={field === "dateOfIncident" ? "date" : "text"} className="w-full p-2 border rounded-lg focus:outline-none" />
              )}
              {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
            </div>
          ))}

          <button type="submit" disabled={isSubmitting} className={`w-full text-white py-2 rounded-lg transition duration-300 ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"}`}>
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportCase;