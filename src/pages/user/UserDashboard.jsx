import { useState, useEffect } from "react";
import axios from "axios";

export default function UserDashboard() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user bills from backend
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:8081/api/v1/users/my-bills",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBills(response.data.bills || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch bills.");
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">My Bills</h1>

      {loading && <p>Loading bills...</p>}
      {error && (
        <p className="text-red-600 mb-4 font-semibold">{error}</p>
      )}

      {!loading && bills.length === 0 && <p>No bills found.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bills.map((bill, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition"
          >
            <h2 className="font-semibold text-lg mb-2">{bill.month}</h2>
            <p>Rent: ${bill.rent}</p>
            <p>Gas: ${bill.gas}</p>
            <p>Water: ${bill.water}</p>
            <p>Electricity: ${bill.electricity}</p>
            <p>Other: ${bill.utility}</p>
            <p className="font-bold mt-2">Total: ${bill.total}</p>

            <button className="mt-3 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
              Pay / Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
