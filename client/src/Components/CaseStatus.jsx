import { useState } from "react";

const CaseStatus = () => {
  const [email, setEmail] = useState("");
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCaseStatus = async () => {
    if (!email) {
      setError("Email is required.");
      return;
    }

    setLoading(true);
    setError("");
    setCaseData(null);

    try {
      const response = await fetch(`http://localhost:5000/cases/case-status/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Case not found or invalid email");
      }

      const data = await response.json();
      setCaseData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-blue-800 mb-6">
          Check Your Case Status
        </h2>

        <div>
          <label htmlFor="email" className="block text-lg font-medium text-gray-700">
            Your Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <button
          onClick={fetchCaseStatus}
          className="w-full mt-6 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300"
        >
          Check Status
        </button>

        {loading && (
          <div className="mt-4 text-center text-gray-600 animate-pulse">
            Loading...
          </div>
        )}

        {error && (
          <div className="mt-4 text-center text-red-600">
            {error}
          </div>
        )}

        {caseData && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-blue-800">Case Status</h3>
            <div className="mt-2">
              <p className="text-lg font-medium text-gray-700">
                <strong>Status:</strong> {caseData.status}
              </p>
              {caseData.admin_response && (
                <div className="mt-2">
                  <p className="text-lg font-medium text-gray-700">
                    <strong>Admin's Response:</strong>
                  </p>
                  <p className="text-gray-600">{caseData.admin_response}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseStatus;
