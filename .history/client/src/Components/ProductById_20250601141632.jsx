import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Context } from "../Context/Context";

import Reviews from "./Reviews";

function ProductById() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const { Authentication } = useContext(Context);

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/product/getProductById/${id}`,
        {
          headers: {
            Authorization: Authentication,
          },
        }
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#6f4e37] text-xl font-serif">
        Brewing your product details... ☕
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7f0] via-[#f7e9da] to-[#f0d9c3] px-4 py-10 font-serif">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden grid md:grid-cols-2 ring-1 ring-white/30 max-h-[45vh]">
        {/* Product Image */}
        <div className=" h-full ">
          <img
            src={product.attachments?.url || "https://via.placeholder.com/500"}
            alt="Product"
            className="w-full h-full "
          />
        </div>

        {/* Product Info */}
        <div className="p-6 text-[#3e2c1c] space-y-3 overflow-auto">
          <h2 className="text-2xl font-bold text-[#6f4e37]">
            {product.productName}
          </h2>
          <p className="text-[#5e3d28] text-sm">{product.description}</p>
          <span className="inline-block bg-[#f5e1ce] px-3 py-1 rounded-full text-xs text-[#4a2e1f] uppercase tracking-wide">
            {product.category}
          </span>
          <p className="text-2xl font-bold text-[#a0522d]">₹{product.price}</p>
          <button className="mt-3 bg-[#6f4e37] hover:bg-[#4b3222] text-white px-4 py-2 rounded-full font-medium shadow-md transition-all duration-300">
            🛒 Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        <Reviews id={id} />
      </div>
    </div>
  );
}

export default ProductById;
