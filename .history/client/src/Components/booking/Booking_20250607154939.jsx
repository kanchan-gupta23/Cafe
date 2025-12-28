import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../Context/Context";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Booking() {
  const params = useParams();
  const navigate = useNavigate();
  const { user, Authentication } = useContext(Context);
  const [booking, setBooking] = useState([]);

  const [value, setValue] = useState({
    Occassion: "",
    Theme: "",
    Date: "",
    Description: "",
    totalAmount: "",
  });

  const themePrices = {
    romantic: 20000,
    horror: 15000,
    cute: 20000,
    chill: 15000,
    crazy: 25000,
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    if (name === "Theme") {
      const themePrice = themePrices[val] || 0;
      setValue((prev) => ({
        ...prev,
        Theme: val,
        totalAmount: themePrice,
      }));
    } else {
      setValue((prev) => ({ ...prev, [name]: val }));
    }
  };
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0]; // Format: YYYY-MM-DD
  };
  const razorpayOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/payment/createRazorOrder`,
        { amount: value.totalAmount }
      );

      const selectedDate = new Date(value.Date);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // remove time

      if (selectedDate <= today) {
        alert("Please select a date after today.");
        return;
      }

      const postBooking = await axios.post(
        `http://localhost:3000/booking/booking/${params.userId}`,
        value,
        {
          headers: {
            Authorization: Authentication,
          },
        }
      );
      const createdBooking = postBooking.data;
      setBooking(createdBooking.booking._id);
      console.log("booking._id", createdBooking.booking._id);

      const options = {
        key: "rzp_test_rzLp4h0mWCfUnS",
        amount: response.data.order.amount,
        currency: "INR",
        name: "Koffee with Kanchan",
        description: "Order Payment",
        image:
          "https://lh3.googleusercontent.com/a/ACg8ocLT2Ruq643KqDzZ5EE1h_0JeCn98lKRTco_6ulgNziNWkDZmWAQ=s360-c-no",
        order_id: response.data.order.id,
        handler: async function (response) {
          try {
            await axios.post(
              `http://localhost:3000/payment/paymentVerification/${params.userId}`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                booking: createdBooking.booking._id,
              }
            );

            // Retrieve payment ID
            const paymentResponse = await axios.post(
              `http://localhost:3000/payment/getPayment`,
              { booking: createdBooking.booking._id },
              {
                headers: {
                  Authorization: Authentication,
                },
              }
            );
            const paymentId = paymentResponse.data._id;

            alert("Booking Successful!");
            navigate(`/mybooking/${user._id}`);
          } catch (error) {
            console.error("❌ Payment verification failed:", error);
          }
        },
        prefill: {
          name: user?.fullName || "",
          email: user.email,
          contact: user.phone || "9000090000",
        },
        notes: {},
        theme: {
          color: "#21c9eb",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("❌ Error in Razorpay order:", error);
    }
  };
  return (
    <div className="min-h-screen bg-[#f5f0eb] flex items-center justify-center p-6">
      <div className=" h-[90vh] bg-white rounded-2xl shadow-lg w-full max-w-5xl flex flex-col md:flex-row overflow-hidden">
        {/* Left: Image */}
        <div className="md:w-1/2">
          <img
            src="https://i.pinimg.com/736x/3a/82/03/3a820368b42e528f0a0f69c3eb3a5aa6.jpg"
            alt="Cafe"
            className=" h-full w-full object-cover"
          />
        </div>

        {/* Right: Form */}
        <div className="md:w-1/2 p-6 h-[90vh]">
          <h2 className="text-3xl font-semibold text-[#6b4f4f] mb-6 text-center">
            Book Your Cozy Cafe Experience
          </h2>
          <form onSubmit={razorpayOrder} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                value={user?.fullName || ""}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Occasion
              </label>
              <input
                type="text"
                name="Occassion"
                value={value.Occassion}
                onChange={handleChange}
                placeholder="Birthday, Anniversary, etc."
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Theme
              </label>
              <select
                name="Theme"
                value={value.Theme}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="">-- Select Theme --</option>
                <option value="romantic">Romantic</option>
                <option value="horror">Horror</option>
                <option value="cute">Cute</option>
                <option value="chill">Chill</option>
                <option value="crazy">Crazy</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                name="Date"
                value={value.Date}
                min={getTomorrowDate()}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                type="text"
                name="Description"
                value={value.Description}
                onChange={handleChange}
                placeholder="Add some notes..."
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Total Amount (₹)
              </label>
              <input
                type="text"
                name="totalAmount"
                value={value.totalAmount}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>

            <button
              type="submit"
              disabled={!value.totalAmount}
              className="w-full bg-[#6b4f4f] text-white py-2 px-4 rounded-lg hover:bg-[#593f3f] transition"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Booking;
