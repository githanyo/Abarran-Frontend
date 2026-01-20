
import AdminLayout from "../../components/AdminLayout";

function Dashboard() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Total Farmers</p>
          <h2 className="text-2xl font-bold">—</h2>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">New Registrations</p>
          <h2 className="text-2xl font-bold">—</h2>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;
