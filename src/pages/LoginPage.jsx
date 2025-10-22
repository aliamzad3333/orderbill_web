import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api.js";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await loginUser(formData);

      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role || "user");
        navigate(response.data.role === "admin" ? "/admin/dashboard" : "/user/dashboard");
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen items-center justify-center bg-gradient-to-br from-green-100 to-green-200 overflow-hidden">
      {/* Floating shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-300 rounded-full opacity-30 animate-pulse -translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-400 rounded-full opacity-20 animate-pulse translate-x-32 translate-y-32"></div>

      <div className="relative z-10 bg-white rounded-3xl shadow-2xl w-full max-w-md p-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
          Bill Management Login
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm text-center animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              className="peer w-full border border-green-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
            <label className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-[-8px] peer-focus:text-green-600 peer-focus:text-sm">
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder=" "
              className="peer w-full border border-green-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
            <label className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-[-8px] peer-focus:text-green-600 peer-focus:text-sm">
              Password
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="relative w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 active:scale-95 transition"
          >
            {loading ? "Logging in..." : "Login"}
            <span className="absolute inset-0 rounded-xl shadow-inner opacity-0 hover:opacity-20 transition"></span>
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-4">
          Forgot password?{" "}
          <span className="text-green-600 hover:underline cursor-pointer">
            Reset
          </span>
        </p>
      </div>
    </div>
  );
}
