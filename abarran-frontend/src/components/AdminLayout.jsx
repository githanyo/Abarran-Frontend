import { getUserRole } from "../services/user";

const role = getUserRole();

{role === "admin" && (
  <a href="/admin/farmers">Farmers</a>
)}


function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-green-800 text-white p-4">
        <h2 className="font-bold text-lg mb-6">Admin Panel</h2>
        <ul className="space-y-3">
        <li>
            <a href="/admin/dashboard" className="hover:underline">
            Dashboard
            </a>
        </li>
        <li>
            <a href="/admin/farmers" className="hover:underline">
            Farmers
            </a>
        </li>
        </ul>
        <button
        onClick={() => {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            window.location.href = "/admin/login";
        }}
        className="mt-4 text-red-400 hover:underline"
        >
        Logout
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

export default AdminLayout;
