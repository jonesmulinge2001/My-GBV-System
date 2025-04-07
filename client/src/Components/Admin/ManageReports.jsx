import { useState, useEffect } from "react";

const ManageReports = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [responseModalOpen, setResponseModalOpen] = useState(false);
  const [adminResponse, setAdminResponse] = useState('');
  const [selectedCaseId, setSelectedCaseId] = useState(null);

  // Fetch cases from backend with token
  const fetchCases = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/admin/cases", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cases");
      }

      const data = await response.json();
      setCases(data);
    } catch (error) {
      console.log("Error occurred fetching cases", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
    const interval = setInterval(fetchCases, 5000);
    return () => clearInterval(interval);
  }, []);

  // Update case status with token
  const updateStatus = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:5000/admin/cases/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "resolved" }), // Change the status to 'resolved'
      });

      if (!response.ok) {
        throw new Error("Failed to update case Status");
      }

      // Optimistically update UI
      setCases((prevcases) =>
        prevcases.map((c) =>
          c.id === id ? { ...c, status: "resolved" } : c // Update the status to 'resolved'
        )
      );
    } catch (error) {
      console.log("Error updating case status", error);
    }
  };

  // Handle submitting the admin response
  const handleResponseSubmit = async () => {
    if (!adminResponse) {
      alert("Response is required!");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:5000/admin/cases/${selectedCaseId}/respond`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ adminResponse }),
      });

      if (response.ok) {
        alert("Response added successfully!");
        // Close the modal and reset state
        setResponseModalOpen(false);
        setAdminResponse('');
        fetchCases(); // Re-fetch cases to update response
      } else {
        const data = await response.json();
        alert(data.error || "Error while sending response");
      }
    } catch (error) {
      console.log("Error occurred submitting response:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-800 transition-all duration-300 ease-in-out">
        Manage Reported Cases
      </h2>

      {loading ? (
        <p className="text-center text-gray-600 opacity-75 animate-pulse">Loading cases...</p>
      ) : cases.length === 0 ? (
        <p className="text-center text-gray-500">No reported cases found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse bg-white shadow-lg rounded-lg text-sm md:text-base">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3">Name</th>
                <th className="p-3">Gender</th>
                <th className="p-3">Age</th>
                <th className="p-3">Incident Date</th>
                <th className="p-3">Description</th>
                <th className="p-3">Support Needed</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((caseItem) => (
                <tr
                  key={caseItem.id}
                  className="border-b text-center hover:bg-gray-100 hover:scale-105 transition-all duration-300 ease-in-out"
                >
                  <td className="p-3">{caseItem.firstname}</td>
                  <td className="p-3">{caseItem.gender}</td>
                  <td className="p-3">{caseItem.age}</td>
                  <td className="p-3">{new Date(caseItem.date_of_incidence).toLocaleDateString()}</td>
                  <td className="p-3">{caseItem.case_description}</td>
                  <td className="p-3">{caseItem.support_needed}</td>
                  <td
                    className={`p-3 font-bold transition-all duration-300 ease-in-out ${caseItem.status === "resolved" ? "text-green-600" : "text-red-600"}`}
                  >
                    {caseItem.status}
                  </td>
                  <td className="p-3">
                    {caseItem.status.toLowerCase() === "pending" ? (
                      <>
                        <button
                          className="bg-green-500 cursor-pointer text-white px-4 py-1 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out transform hover:scale-105"
                          onClick={() => updateStatus(caseItem.id)}
                        >
                          Mark as Solved
                        </button>
                        <button
                          className="bg-blue-500 cursor-pointer text-white px-4 py-1 rounded-lg ml-2 hover:bg-blue-700 transition-all duration-300 ease-in-out"
                          onClick={() => {
                            setSelectedCaseId(caseItem.id);
                            setResponseModalOpen(true);
                          }}
                        >
                          Add Response
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-500">✔ Solved</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Admin Response Modal */}
      {responseModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Add Response</h3>
            <textarea
              value={adminResponse}
              onChange={(e) => setAdminResponse(e.target.value)}
              rows="4"
              className="w-full p-3 border rounded-md"
              placeholder="Enter your response"
            />
            <div className="flex justify-between mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={() => setResponseModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handleResponseSubmit}
              >
                Submit Response
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageReports;
