import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { fetchFarmers } from "../../services/api";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import ErrorMessage from "../../components/ErrorMessage";

function FarmersList() {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const loadFarmers = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetchFarmers(page, search);

        // ✅ SAFELY normalize backend response
        const results = Array.isArray(res.data?.results)
          ? res.data.results
          : Array.isArray(res.data)
          ? res.data
          : [];

        setFarmers(results);
        setCount(res.data?.count ?? results.length);
      } catch (err) {
        console.error("Farmers fetch error:", err);
        setFarmers([]);
        setCount(0);
        setError("Failed to load farmers");
      } finally {
        setLoading(false);
      }
    };

    loadFarmers();
  }, [page, search]);

  const totalPages = Math.max(1, Math.ceil(count / 10));

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Registered Farmers</h1>

      <input
        type="text"
        placeholder="Search by name, phone or district..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="mb-4 w-full border p-2 rounded"
      />

      {loading && <Spinner />}
      {error && <ErrorMessage message={error} />}

      {!loading && farmers.length === 0 && !error && (
        <p className="text-gray-500 text-center py-6">
          No farmers found.
        </p>
      )}

      {!loading && farmers.length > 0 && (
        <>
          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="min-w-full text-sm">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">District</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {farmers.map((f) => (
                  <tr key={f.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{f.full_name}</td>
                    <td className="p-3">{f.phone_number}</td>
                    <td className="p-3">{f.district}</td>
                    <td className="p-3">
                      <button
                        onClick={() =>
                          navigate(`/admin/farmers/${f.id}`)
                        }
                        className="text-green-700 hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </AdminLayout>
  );
}

export default FarmersList;
