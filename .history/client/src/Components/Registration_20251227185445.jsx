import React, { useState, useContext } from "react";
import axios from "axios";
import { FaCameraRetro } from "react-icons/fa";
import { Context } from "../Context/Context";
import { FaCircleUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Registration() {
  const { getToken } = useContext(Context);
  const navigate = useNavigate();
  const [value, setValue] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    file: null,
    preview: null,
  });

  const changeHandler = (e) => {
    const { name, value: inputValue, files } = e.target;
    if (name === "file") {
      const file = files[0];
      setValue((prev) => ({
        ...prev,
        [name]: file,
        preview: URL.createObjectURL(file),
      }));
    } else {
      setValue((prev) => ({
        ...prev,
        [name]: inputValue,
      }));
    }
  };

  const submitResponse = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", value.fullName);
    formData.append("email", value.email);
    formData.append("password", value.password);
    formData.append("phone", value.phone);
    formData.append("file", value.file);

    try {
      const response = await axios.post(
        `https://cafe-5-07vf.onrender.com/user/userRegistration`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      getToken(response.data.token);
      navigate("/userLogin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f4e1d2] px-4">
      <form
        onSubmit={submitResponse}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg space-y-6 border-2 border-[#d7a86e]"
      >
        <h2 className="text-3xl font-bold text-center text-[#6f4e37] mb-6">
          Welcome to Koffee with Kanchan
        </h2>
        <div className="relative border-2 border-[#6f4e37] rounded-full h-[7vw] w-[7vw] left-1/2 -translate-x-1/2">
          {value.preview ? (
            <img
              src={value.preview}
              alt="Preview"
              className="w-[7vw] h-[7vw] border-2 border-[#6f4e37] absolute left-1/2 -translate-x-1/2 rounded-full object-cover"
            />
          ) : (
            <FaCircleUser className="rounded-full h-[7vw] w-[7vw] absolute left-1/2 -translate-x-1/2 object-cover" />
          )}
          <label
            htmlFor="img"
            className="absolute bottom-[1vh] left-[0%] z-10 text-[#6f4e37]"
          >
            <FaCameraRetro />
          </label>
          <input
            type="file"
            name="file"
            id="img"
            onChange={changeHandler}
            className="hidden"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#6f4e37]">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={value.fullName}
            onChange={changeHandler}
            placeholder="Enter your full name"
            className="w-full mt-1 p-3 border border-[#6f4e37] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6f4e37]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#6f4e37]">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={value.email}
            onChange={changeHandler}
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
            onChange={changeHandler}
            placeholder="Enter your password"
            className="w-full mt-1 p-3 border border-[#6f4e37] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6f4e37]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#6f4e37]">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={value.phone}
            onChange={changeHandler}
            placeholder="Enter your phone number"
            className="w-full mt-1 p-3 border border-[#6f4e37] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6f4e37]"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 bg-[#6f4e37] hover:bg-[#5a3f2e] text-white font-semibold rounded-md transition duration-300"
        >
          Sign Up & Enjoy!
        </button>
      </form>
    </div>
  );
}

export default Registration;
