import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../Context/Context";
import axios from "axios";

import { useParams } from "react-router-dom";

function MyBookings() {
  const { user, Authentication } = useContext(Context);
  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);
  const Params = useParams();

  const getBooking = async () => {
    try {
      const response = await axios.get(
        `https://cafe-5-07vf.onrender.com/booking/getBooking/${Params.userId}`,
        {
          headers: { Authorization: Authentication },
        }
      );
      setBookings(response.data.booking);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getBooking();
  }, [user._id]);

  const cancelBooking = async (id) => {
    try {
      await axios.put(
        `https://cafe-5-07vf.onrender.com/booking/updateStatus/${id}`,
        {},
        {
          headers: { Authorization: Authentication },
        }
      );
      getBooking();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#f5f0eb] to-[#e6d4c1] p-8">
      <h1 className="text-4xl font-extrabold text-[#6b4f4f] mb-10 text-center">
        Your Bookings
      </h1>

      {loading ? (
        <p className="text-center text-gray-600 text-lg">
          Loading your bookings...
        </p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-500 text-xl mt-20">
          You have no bookings yet.
        </p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking, idx) => {
            const isCanceled = booking.status === "cancel";

            return (
              <div
                key={booking._id}
                className={`relative bg-white rounded-xl shadow-lg p-6 transition-shadow duration-300 ${
                  isCanceled && user.isAdmin !== true
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:shadow-2xl cursor-pointer"
                }`}
              >
                {isCanceled && (
                  <div className="absolute  top-7 right-13 bg-red-500 text-white font-bold px-3 py-1 rounded-full text-sm select-none">
                    Canceled
                  </div>
                )}

                <div className="flex justify-between items-center w-full">
                  <h2 className="text-2xl font-semibold text-[#6b4f4f] mb-3 border-b border-[#6b4f4f]/30 pb-2">
                    Occasion: {booking.Occassion}
                  </h2>
                  <div className="flex gap-5 items-center">
                    {!isCanceled && (
                      <button
                        onClick={() => cancelBooking(booking._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Theme:</span> {booking.Theme}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(booking.Date).toLocaleDateString(undefined, {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Description:</span>{" "}
                  {booking.Description || "—"}
                </p>
                <p className="text-[#6b4f4f] font-bold text-lg mt-4">
                  Total: ₹{booking.totalAmount}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
