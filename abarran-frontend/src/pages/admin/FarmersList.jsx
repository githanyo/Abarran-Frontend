
import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { fetchFarmers } from "../../services/api";
import { useNavigate } from "react-router-dom";

function FarmersList() {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFarmers = async () => {
      try {
        const res = await fetchFarmers();
        setFarmers(res.data);
      } catch (err) {
        setError("Failed to load farmers");
      } finally {
        setLoading(false);
      }
    };
    loadFarmers();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Registered Farmers</h1>

      {loading && <p>Loading farmers...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full border-collapse">
            <thead className="bg-green-700 text-white">
              <tr key={farmer.id}
              onClick={() => navigate(`/admin/farmers/${farmer.id}`)}
              className="border-b hover:bg-gray-100 cursor-pointer"
              >
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">District</th>
                <th className="p-3 text-left">Land Size</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {farmers.map((farmer) => (
                <tr
                  key={farmer.id}
                  className="border-b hover:bg-gray-100"
                >
                  <td className="p-3">{farmer.full_name}</td>
                  <td className="p-3">{farmer.phone_number}</td>
                  <td className="p-3">{farmer.district}</td>
                  <td className="p-3">{farmer.land_size} acres</td>
                  <td className="p-3">
                    {new Date(farmer.registered_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {farmers.length === 0 && (
            <p className="p-4 text-center text-gray-500">
              No farmers registered yet.
            </p>
          )}
        </div>
      )}
    </AdminLayout>
  );
}

export default FarmersList;
