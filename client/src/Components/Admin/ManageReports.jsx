import { useState, useEffect } from "react";
import { CheckCircle, MessageCircle } from "lucide-react";

const ManageReports = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [responseModalOpen, setResponseModalOpen] = useState(false);
  const [adminResponse, setAdminResponse] = useState('');
  const [selectedCaseId, setSelectedCaseId] = useState(null);

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

      if (!response.ok) throw new Error("Failed to fetch cases");

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

  const updateStatus = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:5000/admin/cases/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "resolved" }),
      });

      if (!response.ok) throw new Error("Failed to update case Status");

      setCases((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: "resolved" } : c))
      );
    } catch (error) {
      console.log("Error updating case status", error);
    }
  };

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
        setResponseModalOpen(false);
        setAdminResponse('');
        fetchCases();
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
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">Manage Reported Cases</h2>

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
                  className="border-b text-center hover:bg-gray-100 hover:scale-105 transition-all duration-300"
                >
                  <td className="p-3">{caseItem.firstname}</td>
                  <td className="p-3">{caseItem.gender}</td>
                  <td className="p-3">{caseItem.age}</td>
                  <td className="p-3">
                    {new Date(caseItem.date_of_incidence).toLocaleDateString()}
                  </td>
                  <td className="p-3">{caseItem.case_description}</td>
                  <td className="p-3">{caseItem.support_needed}</td>
                  <td
                    className={`p-3 font-bold ${
                      caseItem.status === "resolved" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {caseItem.status}
                  </td>
                  <td className="p-3">
                    {caseItem.status.toLowerCase() === "pending" ? (
                      <div className="flex justify-center space-x-3">
                        <CheckCircle
                          className="text-green-600 hover:scale-110 transition cursor-pointer"
                          size={24}
                          title="Mark as Solved"
                          onClick={() => updateStatus(caseItem.id)}
                        />
                        <MessageCircle
                          className="text-blue-600 hover:scale-110 transition cursor-pointer"
                          size={24}
                          title="Add Response"
                          onClick={() => {
                            setSelectedCaseId(caseItem.id);
                            setResponseModalOpen(true);
                          }}
                        />
                      </div>
                    ) : (
                      <CheckCircle className="text-gray-500 mx-auto" size={24} title="Solved" />
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
          <div className="bg-white p-8 rounded-lg shadow-xl w-96">
            <h3 className="text-xl font-bold mb-4">Add Response</h3>
            <textarea
              value={adminResponse}
              onChange={(e) => setAdminResponse(e.target.value)}
              rows="4"
              className="w-full p-3 border rounded-md"
              placeholder="Enter your response"
            />
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-full"
                onClick={() => setResponseModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-full"
                onClick={handleResponseSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageReports;
