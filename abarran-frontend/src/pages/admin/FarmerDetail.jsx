import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import { fetchFarmerById } from "../../services/api";

function FarmerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [farmer, setFarmer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFarmer = async () => {
      try {
        const res = await fetchFarmerById(id);
        setFarmer(res.data);
      } catch {
        setError("Failed to load farmer details");
      } finally {
        setLoading(false);
      }
    };
    loadFarmer();
  }, [id]);

  return (
    <AdminLayout>
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-green-700 hover:underline"
      >
        ← Back to Farmers
      </button>

      {loading && <p>Loading farmer details...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {farmer && (
        <div className="bg-white shadow rounded p-6">
          <h1 className="text-2xl font-bold mb-4">
            {farmer.full_name}
          </h1>

          <div className="grid md:grid-cols-2 gap-4">
            <Detail label="Gender" value={farmer.gender} />
            <Detail label="Age" value={farmer.age} />
            <Detail label="Phone" value={farmer.phone_number} />
            <Detail label="District" value={farmer.district} />
            <Detail label="Sub-county" value={farmer.sub_county} />
            <Detail label="Village" value={farmer.village} />
            <Detail label="Land Size" value={`${farmer.land_size} acres`} />
            <Detail label="Land Ownership" value={farmer.land_ownership} />
            <Detail
              label="Registered On"
              value={new Date(farmer.registered_at).toLocaleString()}
            />
          </div>

          {farmer.experience && (
            <div className="mt-4">
              <h3 className="font-semibold mb-1">Experience</h3>
              <p className="text-gray-700">{farmer.experience}</p>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

export default FarmerDetail;
