import React, { useContext, useState } from "react";
import axios from "axios";
import { FaCoffee } from "react-icons/fa";
import { Context } from "../Context/Context";

function Login() {
  const { getToken } = useContext(Context);
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value: inputValue } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: inputValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/user/userLogin`,
        value
      );
      getToken(response.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f4e1d2] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg space-y-6 border-2 border-[#d7a86e]"
      >
        <div className="flex justify-center items-center text-[#6f4e37] text-4xl font-bold mb-6">
          <FaCoffee className="mr-3" />
          Koffee Login
        </div>

        <div>
          <label className="block text-sm font-medium text-[#6f4e37]">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={value.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full mt-1 p-3 border border-[#6f4e37] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6f4e37]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#6f4e37]">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={value.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full mt-1 p-3 border border-[#6f4e37] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6f4e37]"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 bg-[#6f4e37] hover:bg-[#5a3f2e] text-white font-semibold rounded-md transition duration-300"
        >
          Login & Sip ☕
        </button>
      </form>
    </div>
  );
}

export default Login;
