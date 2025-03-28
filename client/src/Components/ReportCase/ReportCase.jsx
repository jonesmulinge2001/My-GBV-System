import React, { useState } from "react";

const ReportCase = () => {
  const [myFormData, setMyFormData] = useState({
    firstname: "",
    gender: "",
    age: "",
    dateOfIncidence: "",
    caseDescription: "",
    supportNeeded: "",
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(myFormData),
      });

      const myData = await myResponse.json();

      if (myResponse.ok) {
        setSuccessMessage("Case reported successfully");
        localStorage.setItem("caseId", myData.id);
        setMyFormData({
          firstname: "",
          age: "",
          gender: "",
          dateOfIncidence: "",
          caseDescription: "",
          supportNeeded: "",
        });
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
    <div></div>
  );
};

export default ReportCase;
