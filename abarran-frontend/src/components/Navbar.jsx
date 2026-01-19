import { NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-green-900 text-white">
      <div className="max-w-7xl mx-10px px-4 py-4 flex justify-between items-center">
        <h2 className="text-lg font-bold">🌱Abarran Tree Project</h2>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6">
          <NavLink to="/" end className={({ isActive }) => `px-3 py-2 rounded-md ${
            isActive ? "font-semibold bg-green-600 text-white" : "hover:bg-green-700"}`}
            >Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => `px-3 py-2 rounded-md ${
            isActive ? "font-semibold bg-green-600 text-white" : "hover:bg-green-700"}`}
            >About</NavLink>
          <NavLink to="/register"className={({ isActive }) => `px-3 py-2 rounded-md ${
            isActive ? "font-semibold bg-green-600 text-white" : "hover:bg-green-700"}`}
          >Register</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `px-3 py-2 rounded-md ${
            isActive ? "font-semibold bg-green-600 text-white" : "hover:bg-green-700"}`}
            >Contact</NavLink>
          <NavLink to="/admin/" className={({ isActive }) => `px-3 py-2 rounded-md ${
            isActive ? "font-semibold bg-green-600 text-white" : "hover:bg-green-700"}`}
            >Admin</NavLink>
        </ul>

        {/* Hamburger Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden bg-green-700 px-4 pb-4 space-y-3">
          <li><NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink></li>
          <li><NavLink to="/register" onClick={() => setMenuOpen(false)}>Register</NavLink></li>
          <li><NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink></li>
          <li><NavLink to="/admin/" onClick={() => setMenuOpen(false)}>Admin</NavLink></li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;

