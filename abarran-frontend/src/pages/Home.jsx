import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-green-700 text-white text-center py-20 px-4">
        <h1 className="text-4xl font-bold mb-4">
          <img src={logo} alt="Abarran Logo" className="logo" /><br />Abarran <br /> 1 Billion Tree Project
        </h1>
        <p className="mb-6">
          Empowering farmers through sustainable tree planting
        </p>
        <Link to="/register">
          <button className="bg-white hover:font-bold text-green-700 px-6 py-2 rounded font-semibold">
            Register as a Farmer
          </button>
        </Link>
      </section>

      {/* About */}
      <section className="max-w-5xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-3 text-green-700">
          About the Project
        </h2>
        <p>
          The Abarran Tree Project supports rural farmers by promoting
          tree planting for income generation and environmental conservation.
        </p>
      </section>

      {/* Benefits */}
      <section className="bg-gray-200 p-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-white rounded shadow card">🌱 Free seedlings</div>
          <div className="p-4 bg-white rounded shadow card">📘 Farmer training</div>
          <div className="p-4 bg-white rounded shadow card">💰 Income opportunities</div>
        </div>
      </section>
    </div>
  );
}

export default Home;
