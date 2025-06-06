import React from "react";
import { Link } from "react-router-dom";

function AdminPage() {
  return (
    <div className="min-h-screen bg-yellow-50 font-sans p-8">
      <h1 className="text-4xl font-bold text-center text-brown-700 mb-6">
        ☕ Café Admin Dashboard
      </h1>
      <nav className="flex justify-center space-x-6">
        <Link
          to="/createProduct"
          className="bg-yellow-200 hover:bg-yellow-300 text-brown-800 font-semibold py-2 px-4 rounded shadow"
        >
          ➕ Create Product
        </Link>
        <Link
          to="/updateProduct"
          className="bg-yellow-200 hover:bg-yellow-300 text-brown-800 font-semibold py-2 px-4 rounded shadow"
        >
          ✏️ Update Product
        </Link>
        <Link
          to="/adminLogin"
          className="bg-yellow-200 hover:bg-yellow-300 text-brown-800 font-semibold py-2 px-4 rounded shadow"
        >
          🔐 Admin Login
        </Link>
      </nav>
    </div>
  );
}

export default AdminPage;
