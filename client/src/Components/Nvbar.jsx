import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { Context } from "../Context/Context";

const Navbar = () => {
  const { user, cartItem, isAuthenticated } = useContext(Context);
  const { userId } = useParams();

  return (
    <nav className="bg-black/70 backdrop-blur sticky top-0 z-50 text-white px-6 py-4 flex items-center justify-between shadow-lg">
      {/* Logo / Brand */}
      <Link to="/" className="text-2xl font-bold text-yellow-300">
        Koffee with Kanchan
      </Link>

      {/* Nav Links */}
      <div className="flex items-center gap-6 text-sm md:text-base">
        <Link
          to="/"
          className="hover:text-yellow-300 transition-colors duration-200"
        >
          Home
        </Link>

        {!isAuthenticated && (
          <Link
            to="/userRegistration"
            className="hover:text-yellow-300 transition-colors duration-200"
          >
            Registration
          </Link>
        )}

        <Link
          to="/menu"
          className="hover:text-yellow-300 transition-colors duration-200"
        >
          Menu
        </Link>
        <Link
          to="/about"
          className="hover:text-yellow-300 transition-colors duration-200"
        >
          About
        </Link>
        {user.isAdmin !== false && (
          <Link
            to="/adminPage"
            className="hover:text-yellow-300 transition-colors duration-200"
          >
            Admin
          </Link>
        )}

        <Link
          to={`/booking/${user._id}`}
          className="hover:text-yellow-300 transition-colors duration-200"
        >
          Booking
        </Link>
        {user.isAdmin !== false && (
          <Link
            to="/allbookings"
            className="hover:text-yellow-300 transition-colors duration-200"
          >
            All Bookings
          </Link>
        )}

        <Link
          to={`/mybooking/${user._id}`}
          className="hover:text-yellow-300 transition-colors duration-200"
        >
          My Booking
        </Link>

        <Link to={`/allOrder/${user._id}`}>Order</Link>
        {user.isAdmin !== false && (
          <Link
            to="/getallOrder"
            className="hover:text-yellow-300 transition-colors duration-200"
          >
            All Order
          </Link>
        )}

        {/* Cart Icon */}
        <Link to={`/cart/${user._id}`} className="relative">
          <FaShoppingCart className="text-xl hover:text-yellow-300 transition" />
          {cartItem?.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-yellow-300 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartItem.length}
            </span>
          )}
        </Link>

        {/* User Icon / Login */}
        {user ? (
          <Link to="/profile">
            <FaUserAlt className="text-xl hover:text-yellow-300" />
          </Link>
        ) : (
          <Link
            to="/login"
            className="px-3 py-1 rounded-md bg-yellow-300 text-black font-semibold hover:bg-yellow-400"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
