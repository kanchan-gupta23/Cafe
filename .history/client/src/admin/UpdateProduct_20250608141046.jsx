import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../Context/Context";

function UpdateProduct() {
  const navigate = useNavigate();
  const { Authentication } = useContext(Context);
  const params = useParams();
  const [value, setValue] = useState({
    productName: "",
    category: "",
    price: "",
    file: null,
    description: "",
  });

  const handleChange = async (e) => {
    const file = e.target.files?.[0];
    const name = e.target.name;
    const inputValue = name === "file" ? file : e.target.value;

    setValue((prev) => ({
      ...prev,
      [name]: inputValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("productName", value.productName);
    formData.append("category", value.category);
    formData.append("price", value.price);
    formData.append("file", value.file);
    formData.append("description", value.description);

    try {
      const response = await axios.put(
        `http://localhost:3000/product/updateProduct/${params.id}`,
        formData,
        {
          headers: {
            Authorization: Authentication,
          },
        }
      );
      console.log(response.data);
      alert("product updated successfully");
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const getProductById = async () => {
    const response = await axios.get(
      `http://localhost:3000/product/getProductById/${params.id}`,
      {
        headers: {
          Authorization: Authentication,
        },
      }
    );
    const product = response.data;

    setValue({
      productName: product.productName || "",
      category: product.category || "",
      price: product.price || "",
      file: null, // File can't be set from the backend
      description: product.description || "",
    });
  };
  useEffect(() => {
    getProductById();
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Add New Product
        </h2>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Product Name
          </label>
          <input
            name="productName"
            type="text"
            value={value.productName}
            onChange={handleChange}
            placeholder="e.g. Oreo Shake"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={value.category}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          >
            <option value="">Select Category</option>
            <option value="Bestseller">Bestseller</option>
            <option value="Drinks">Drinks</option>
            <option value="Food">Food</option>
            <option value="ReadyToEat">Ready to Eat</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Price (₹)
          </label>
          <input
            name="price"
            type="number"
            value={value.price}
            onChange={handleChange}
            placeholder="e.g. 120"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Product Image
          </label>
          <input
            name="file"
            type="file"
            onChange={handleChange}
            className="w-full p-2 border rounded-lg bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={value.description}
            onChange={handleChange}
            placeholder="Add a brief description..."
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            rows="3"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg text-lg font-semibold transition duration-200"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
}

export default UpdateProduct;
