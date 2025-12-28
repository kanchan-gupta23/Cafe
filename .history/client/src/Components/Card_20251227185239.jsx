import React, { useContext } from "react";
import { MdDelete, MdEditSquare } from "react-icons/md";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../Context/Context";

function Card({ id, url, name, description, price, onDelete }) {
  const { user, Authentication } = useContext(Context);
  const isAdmin = user?.isAdmin === true;

  const deleteProduct = async () => {
    try {
      const res = await axios.delete(
        `https://cafe-5-07vf.onrender.com/product/deleteProduct/${id}`,
        {
          headers: {
            Authorization: Authentication,
          },
        }
      );
      onDelete?.();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const addToCart = async () => {
    try {
      await axios.post(
        `https://cafe-5-07vf.onrender.com/cart/cart`,
        {
          user: user._id,
          products: [{ _id: id }, { quantity: 1 }],
        },
        {
          headers: {
            Authorization: Authentication,
          },
        }
      );
    } catch (error) {
      console.error("Add to cart failed:", error);
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-md border border-[#e0d8cc] rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative group">
      {/* Admin controls */}
      {isAdmin && (
        <div className="absolute top-3 right-3 flex gap-2 z-10">
          <button
            onClick={deleteProduct}
            className="bg-white  p-2 rounded-full shadow"
            title="Delete"
          >
            <MdDelete className="" size={18} />
          </button>
          <Link
            to={`/UpdateProduct/${id}`}
            className="bg-white -100 p-2 rounded-full shadow"
            title="Edit"
          >
            <MdEditSquare className="" size={18} />
          </Link>
        </div>
      )}

      {/* Image */}
      <Link to={`/getProductById/${id}`}>
        <img
          src={url}
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-3xl"
        />
      </Link>

      {/* Info */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-[#3e2723]">{name}</h2>
        <p className="text-sm text-[#6b4c3b] mt-1">{description}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-[#4b2e2e]">₹{price}</span>
          <button
            onClick={addToCart}
            className="bg-[#6f4e37] text-white px-4 py-1 rounded-full text-sm hover:bg-[#533827] transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
