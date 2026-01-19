import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./pages/admin/Login";


import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import Dashboard from "./pages/admin/Dashboard";
import FarmersList from "./pages/admin/FarmersList";
import FarmerDetail from "./pages/admin/FarmerDetail";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/" element={<AdminLogin />} />
        <Route path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/farmers" element={
            <ProtectedRoute>
              <FarmersList />
            </ProtectedRoute>
          }
          />        
        <Route path="/admin/farmers/:id" element={
            <ProtectedRoute>
              <FarmerDetail />
            </ProtectedRoute>
          }        />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
      

      <Footer />
    </BrowserRouter>
  );
}

export default App;
