import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../Context/Context";
import Card from "./Card";
import Navbar from "./Nvbar";

function Menu() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { Authentication } = useContext(Context);

  const categories = ["All", "Bestseller", "Drinks", "Food", "ReadyToEat"];

  const getAllProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/product/getAlltProducts`,
        {
          headers: {
            Authorization: Authentication,
          },
        }
      );
      setAllProducts(response.data);
      setFilteredProducts(response.data); // Default to all
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterProducts(selectedCategory, query);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);

    filterProducts(category, searchQuery);
  };

  const filterProducts = (category, query) => {
    let filtered = allProducts;
    if (category !== "All") {
      filtered = allProducts.filter((product) => product.category === category);
    }
    if (query.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.productName.toLowerCase().includes(query.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
  };

  return (
    <div className="max-w-screen h-screen mx-auto px-6 py-10 bg-[#fffaf5]">
      <h1 className="text-4xl font-bold font-serif text-center text-[#5c3a21] mb-10">
        ☕ Our Menu
      </h1>

      {/* Category Tabs */}
      <div className="flex justify-center gap-4 flex-wrap mb-8">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(category)}
            className={`px-5 py-2 rounded-full border font-medium text-sm transition-all duration-300 ${
              selectedCategory === category
                ? "bg-[#6f4e37] text-white border-[#6f4e37]"
                : "bg-white text-[#6f4e37] border-[#6f4e37] hover:bg-[#6f4e37] hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      {/* Search Box */}
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="🔍 Search for drinks, food..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full max-w-md px-4 py-2 rounded-full border border-[#d7a86e] focus:outline-none focus:ring-2 focus:ring-[#6f4e37] transition"
        />
      </div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card
            key={product._id}
            id={product._id}
            url={product.attachments?.url}
            name={product.productName}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No products available in this category.
        </p>
      )}
    </div>
  );
}

export default Menu;
