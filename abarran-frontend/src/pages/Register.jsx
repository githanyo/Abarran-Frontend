import { useState } from "react";
import { registerFarmer } from "../services/api";

const initialState = {
  full_name: "",
  gender: "",
  age: "",
  phone_number: "",
  district: "",
  sub_county: "",
  village: "",
  land_size: "",
  land_ownership: "",
  experience: "",
  consent: false,
};

function Register() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputClass = (error) =>
    `w-full border p-2 rounded ${
      error ? "border-red-500" : "border-gray-300"
    }`;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear errors as user types
    setErrors({ ...errors, [name]: "" });
    setGeneralError("");
    setSuccess("");
  };

  const validate = () => {
    let newErrors = {};

    if (!form.full_name) newErrors.full_name = "Full name is required";
    if (!form.gender) newErrors.gender = "Select gender";
    if (!form.age || form.age < 18)
      newErrors.age = "Age must be 18 or above";

    if (!form.phone_number)
      newErrors.phone_number = "Phone number is required";
    else if (!/^07\d{8}$/.test(form.phone_number))
      newErrors.phone_number = "Enter a valid phone number";

    if (!form.district) newErrors.district = "District is required";
    if (!form.sub_county) newErrors.sub_county = "Sub-county is required";
    if (!form.village) newErrors.village = "Village is required";

    if (!form.land_size) newErrors.land_size = "Land size is required";
    if (!form.land_ownership)
      newErrors.land_ownership = "Select land ownership";

    if (!form.consent)
      newErrors.consent = "You must agree to participate";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    setGeneralError("");
    setSuccess("");

    if (!validate()) return;

    setLoading(true);

    const payload = { ...form };
    delete payload.consent;

    try {
      const response = await registerFarmer(payload);
      setSuccess(response.data.message || "Registration successful!");
      setForm(initialState);
    } catch (error) {
      if (error.response && error.response.data) {
        const backendErrors = error.response.data;
        let formattedErrors = {};

        for (let key in backendErrors) {
          if (key === "non_field_errors") {
            setGeneralError(backendErrors[key][0]);
          } else {
            formattedErrors[key] = backendErrors[key][0];
          }
        }

        setErrors(formattedErrors);
      } else {
        setGeneralError("Server error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  function Spinner() {
    return (
      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-2xl font-bold mb-4 text-green-700">
        Farmer Registration
      </h2>

      {generalError && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {generalError}
        </div>
      )}

      {success && (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className={inputClass(errors.full_name)}
          name="full_name"
          value={form.full_name}
          placeholder="Full Name"
          onChange={handleChange}
        />
        {errors.full_name && (
          <p className="text-red-500 text-sm">{errors.full_name}</p>
        )}

        <select
          className={inputClass(errors.gender)}
          name="gender"
          value={form.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input
          className={inputClass(errors.age)}
          type="number"
          name="age"
          value={form.age}
          placeholder="Age"
          onChange={handleChange}
        />

        <input
          className={inputClass(errors.phone_number)}
          name="phone_number"
          value={form.phone_number}
          placeholder="Phone Number"
          onChange={handleChange}
        />
        {errors.phone_number && (
          <p className="text-red-500 text-sm">{errors.phone_number}</p>
        )}

        <input
          className={inputClass(errors.district)}
          name="district"
          value={form.district}
          placeholder="District"
          onChange={handleChange}
        />

        <input
          className={inputClass(errors.sub_county)}
          name="sub_county"
          value={form.sub_county}
          placeholder="Sub-county"
          onChange={handleChange}
        />

        <input
          className={inputClass(errors.village)}
          name="village"
          value={form.village}
          placeholder="Village"
          onChange={handleChange}
        />

        <input
          className={inputClass(errors.land_size)}
          type="number"
          name="land_size"
          value={form.land_size}
          placeholder="Land Size (acres)"
          onChange={handleChange}
        />

        <select
          className={inputClass(errors.land_ownership)}
          name="land_ownership"
          value={form.land_ownership}
          onChange={handleChange}
        >
          <option value="">Land Ownership</option>
          <option value="Owned">Owned</option>
          <option value="Leased">Leased</option>
          <option value="Family">Family</option>
        </select>

        <textarea
          className="w-full border p-2 rounded"
          name="experience"
          value={form.experience}
          placeholder="Tree planting experience (optional)"
          onChange={handleChange}
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="consent"
            checked={form.consent}
            onChange={handleChange}
          />
          <span>I agree to participate in the project</span>
        </label>
        {errors.consent && (
          <p className="text-red-500 text-sm">{errors.consent}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center gap-2 py-2 rounded text-white
            ${
              loading
                ? "bg-green-400"
                : "bg-green-700 hover:bg-green-800"
            }`}
        >
          {loading ? <Spinner /> : "Submit Registration"}
        </button>
      </form>
    </div>
  );
}

export default Register;
