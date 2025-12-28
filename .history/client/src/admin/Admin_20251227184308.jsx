import axios from "axios";
import React, { useContext } from "react";
import { Context } from "../Context/Context";
import { useNavigate } from "react-router-dom";

function Admin() {
  const { user, Authentication } = useContext(Context);
  const navigate = useNavigate();

  const makeAdmin = async (e) => {
    e.preventDefault(); // prevent page refresh
    try {
      const response = await axios.put(
        `https://cafe-5-07vf.onrender.com/user/admin/${user._id}`,
        {},
        {
          headers: {
            Authorization: Authentication,
          },
        }
      );
      alert("You are now an admin!");
      navigate("/adminLogin");
      console.log(response.data);
    } catch (error) {
      console.error("Error making admin:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={makeAdmin}
        className="bg-white p-6 rounded shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Become Admin
        </h2>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Make Me Admin
        </button>
      </form>
    </div>
  );
}

export default Admin;
