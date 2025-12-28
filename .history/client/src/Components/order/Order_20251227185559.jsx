import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../Context/Context";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Order() {
  const navigate = useNavigate();
  const { user, Authentication } = useContext(Context);
  const [cartItems, setCartItems] = useState([]);

  const [address, setAddress] = useState("");
  const params = useParams();

  // Fetch Cart
  const getCart = async () => {
    try {
      const response = await axios.get(
        `https://cafe-5-07vf.onrender.com/cart/getCart/${user._id}`,
        {
          headers: {
            Authorization: Authentication,
          },
        }
      );
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // Submit Order after Payment
  const postOrder = async (orderData) => {
    try {
      await axios.post(
        `https://cafe-5-07vf.onrender.com/order/order/${params.userId}`,
        orderData,
        {
          headers: {
            Authorization: Authentication,
          },
        }
      );
      navigate("/");
      alert("✅ Order submitted successfully!");
    } catch (error) {
      console.error("❌ Order submission failed:", error);
    }
  };

  // Razorpay Flow
  const razorpayOrder = async () => {
    try {
      const totalAmount = cartItems.reduce(
        (acc, item) => acc + item.totalAmount,
        0
      );

      const response = await axios.post(
        `https://cafe-5-07vf.onrender.com/payment/createRazorOrder`,
        { amount: totalAmount }
      );

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
              `https://cafe-5-07vf.onrender.com/payment/paymentVerification/${params.userId}`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                cart: cartItems.map((item) => item._id),
              }
            );

            // Retrieve payment ID
            const paymentResponse = await axios.post(
              `https://cafe-5-07vf.onrender.com/payment/getPayment`,
              { cart: cartItems.map((item) => item._id) },
              {
                headers: {
                  Authorization: Authentication,
                },
              }
            );
            const paymentId = paymentResponse.data._id;

            // Prepare order data
            const orderData = {
              products: cartItems.flatMap((item) =>
                item.products.map((i) => ({
                  product: i.product._id,
                  quantity: i.quantity,
                }))
              ),

              address: address,
              totalAmount: totalAmount,
              status: "pending",
              payment: paymentId,
            };

            // Submit the order
            await postOrder(orderData);

            alert("✅ Payment Verified & Order Placed!");
          } catch (error) {
            console.error("❌ Payment verification failed:", error);
          }
        },
        prefill: {
          name: user.fullName,
          email: user.email,
          contact: user.phone || "9000090000",
        },
        notes: {
          address: address,
        },
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

  useEffect(() => {
    getCart();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address.trim()) {
      alert("Please enter your address.");
      return;
    }
    razorpayOrder();
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">{`Delivery to ${user.fullName}`}</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-1 font-semibold text-gray-700">
          Address
        </label>
        <textarea
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your delivery address"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Pay & Order
        </button>
      </form>
    </div>
  );
}

export default Order;
