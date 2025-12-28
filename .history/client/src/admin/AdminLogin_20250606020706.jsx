import axios from "axios";
import React, { useState, useContext } from "react";
import { Context } from "../Context/Context";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const { Authentication } = useContext(Context);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/user/adminLogin`,
        value,
        {
          headers: {
            Authorization: Authentication,
          },
        }
      );
      alert("Admin login successful!");
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8e8dc] to-[#dbc1ac] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-serif text-center text-[#6f4e37] font-bold">
          ☕ Koffee with Kanchan - Admin Login
        </h2>

        <div>
          <label className="block text-[#6f4e37] font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={value.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md bg-[#fdf6f0] border-[#d3b8a3] text-[#5c4033] focus:outline-none focus:ring-2 focus:ring-[#b08968]"
            required
          />
        </div>

        <div>
          <label className="block text-[#6f4e37] font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={value.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md bg-[#fdf6f0] border-[#d3b8a3] text-[#5c4033] focus:outline-none focus:ring-2 focus:ring-[#b08968]"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#6f4e37] hover:bg-[#5a3c2e] text-white font-semibold py-2 rounded-md transition duration-200"
        >
          Login as Admin
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
