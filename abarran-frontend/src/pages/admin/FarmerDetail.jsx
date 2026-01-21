import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import { fetchFarmerById } from "../../services/api";
import { updateFarmer, deleteFarmer } from "../../services/api";
import Spinner from "../../components/Spinner";

function FarmerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [farmer, setFarmer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  const [saving, setSaving] = useState(false);

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

  useEffect(() => {
  if (farmer) setFormData(farmer);
  }, [farmer]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const res = await updateFarmer(id, formData);
      await updateFarmer(id, formData);
      setSaving(false);
      setFarmer(res.data);
      setEditMode(false);
    } catch {
      alert("Failed to update farmer");
    }
  };

const handleDelete = async () => {
  try {
    await deleteFarmer(id);
    alert("Farmer deleted successfully");
    navigate("/admin/farmers");
  } catch {
    alert("Failed to delete farmer");
  }
};


  return (
    <AdminLayout>
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-green-700 hover:underline"
      >
        ← Back to Farmers
      </button>

      {loading && <Spinner />}
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex gap-3 mb-4">
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Edit
          </button>


        ) : (
          <>
            <button
              onClick={handleSave}
              className="bg-green-700 text-white px-4 py-2 rounded"
              disabled={saving}
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </>
        )}
        <button
          onClick={() => {
            if (
              window.confirm(
                "Are you sure you want to delete this farmer? This action cannot be undone."
              )
            ) {
              handleDelete();
            }
          }}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete Farmer
        </button>

      </div>

      {farmer && (
        <div className="bg-white shadow rounded p-6">
          <h1 className="text-2xl font-bold mb-4">
            {farmer.full_name}
          </h1>

          <div className="grid md:grid-cols-2 gap-4">
            <Detail label="Full Name"
              value={
                editMode ? (
                  <input
                    name="full_name"
                    value={formData.full_name || ""}
                    onChange={handleChange}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  farmer.full_name
                )
              }
            />
            <Detail label="Gender" 
            value={
              editMode ? (
                <select
                  name="gender"
                  value={formData.gender || ""}
                  onChange={handleChange}
                  className="border p-1 rounded w-full"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                farmer.gender
              )
            }
          />
          <Detail label="Age" 
          value={
            editMode ? (
              <input
                name="age"
                type="number"
                value={formData.age || ""}
                onChange={handleChange}
                className="border p-1 rounded w-full"
              />
            ) : (
              farmer.age
            )
          } />
          <Detail label="Phone" 
          value={
            editMode ? (
              <input
                name="phone_number"
                value={formData.phone_number || ""}
                onChange={handleChange}
                className="border p-1 rounded w-full"
              />
            ) : (
              farmer.phone_number
            )
          } />
          <Detail label="District" 
          value={
            editMode ? (
              <input
                name="district"
                value={formData.district || ""}
                onChange={handleChange}
                className="border p-1 rounded w-full"
              />
            ) : (
              farmer.district
            )
          } />
          <Detail label="Sub-county" 
          value={
            editMode ? (
              <input
                name="sub_county"
                value={formData.sub_county || ""}
                onChange={handleChange}
                className="border p-1 rounded w-full"
              />
            ) : (
              farmer.sub_county
            )
          } />
            <Detail label="Village" 
            value={
              editMode ? (
                <input
                  name="village"
                  value={formData.village || ""}
                  onChange={handleChange}
                  className="border p-1 rounded w-full"
                />
              ) : (
                farmer.village
              )
            } />
            <Detail label="Land Size" 
            value={
              editMode ? (
                <input
                  name="land_size"
                  type="number"
                  value={formData.land_size || ""}
                  onChange={handleChange}
                  className="border p-1 rounded w-full"
                />
              ) : (
                `${farmer.land_size} acres`
              )
            } />
            <Detail label="Land Ownership" 
            value={
              editMode ? (
                <input
                  name="land_ownership"
                  value={formData.land_ownership || ""}
                  onChange={handleChange}
                  className="border p-1 rounded w-full"
                />
              ) : (
                farmer.land_ownership
              )
            } />
            <Detail
              label="Registered On"
              value={
                new Date(farmer.registered_at).toLocaleString()
              }
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
