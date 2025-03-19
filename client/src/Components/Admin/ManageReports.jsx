import { useState, useEffect } from "react";
const ManageReports = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch cases from backend
    const fetchCases = async () => {
      setLoading(true)
      const response = await fetch("http://localhost:5000/admin/cases");
      try {
        if(!response.ok){
          throw new Error("Failed to fetch cases");       
        }
        const data = await response.json();
        setCases(data);
      } catch (error) {
        console.log("Error occurred fetching cases",error);
      }finally{
        setLoading(false);
      }
    }

  useEffect(() => {
    fetchCases();
    // Refresh every 5 seconds for real-time updates
    const interval = setInterval(fetchCases, 5000);
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []); 

  // Update case status
  const updateStatus = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/admin/cases/${id}`,{
        method:"put",
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify({status:"Solved"}),
      });
      if(!response.ok){
        throw new Error("Failed to update case Status");
      }

      // Optimistically update the UI instead of waiting for the next fetch
      setCases((prevcases)=>
        prevcases.map((c) => (c.id ===id ? {...c, status:"Solved"}: c))
      );
    } catch (error) {
      console.log("Error updating case status",error);
      
    }
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Reported Cases</h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading cases...</p>
      ) : cases.length === 0 ? (
        <p className="text-center text-gray-500">No reported cases found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md rounded-lg text-sm md:text-base">
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
                <tr key={caseItem.id} className="border-b text-center hover:bg-gray-50">
                  <td className="p-3">{caseItem.firstname}</td>
                  <td className="p-3">{caseItem.gender}</td>
                  <td className="p-3">{caseItem.age}</td>
                  <td className="p-3">{new Date(caseItem.date_of_incidence).toLocaleDateString()}</td>
                  <td className="p-3">{caseItem.case_description}</td>
                  <td className="p-3">{caseItem.support_needed}</td>
                  <td className={`p-3 font-bold ${caseItem.status === "Solved" ? "text-green-600" : "text-red-600"}`}>
                    {caseItem.status}
                  </td>
                  <td className="p-3">
                    {caseItem.status.toLowerCase() === "pending" ? (
                      <button
                        className="bg-green-500 cursor-pointer text-white px-4 py-1 rounded hover:bg-green-700 transition duration-200"
                        onClick={() => updateStatus(caseItem.id)}
                      >
                        Mark as Solved
                      </button>
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
    </div>
  );
};

export default ManageReports;
