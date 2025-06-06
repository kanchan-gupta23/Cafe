import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Context } from "../../Context/Context";
import { MdDelete } from "react-icons/md";

function GetOrder() {
  const params = useParams();
  const { user, Authentication } = useContext(Context);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingOrderId, setCancellingOrderId] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/order/getOrder/${params.userId}`,
        {
          headers: {
            Authorization: Authentication,
          },
        }
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const cancelOrder = async (paymentId, orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      setCancellingOrderId(orderId);
      await axios.put(
        `http://localhost:3000/order/updateStatus/${orderId}`,
        { paymentId },
        {
          headers: {
            Authorization: Authentication,
          },
        }
      );
      // Refresh orders after cancellation

      await fetchOrders();
      alert("Order canceled successfully!");
    } catch (error) {
      console.error("Error canceling order:", error);
      alert("Failed to cancel order. Try again later.");
    } finally {
      setCancellingOrderId(null);
    }
  };

  if (loading)
    return (
      <p className="text-center text-gray-600 text-lg mt-10">
        Loading orders...
      </p>
    );

  if (orders.length === 0)
    return (
      <p className="text-center text-gray-500 text-xl mt-20">
        No orders found.
      </p>
    );

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/order/deleteOrder/${id}`, {
        headers: { Authorization: Authentication },
      });
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#f5f0eb] to-[#e6d4c1] p-8">
      <h1 className="text-4xl font-extrabold text-[#6b4f4f] mb-10 text-center">
        Your Orders
      </h1>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {orders.map((order, idx) => (
          <div
            key={order._id}
            className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300  ${
              order.status === "cancel" && user.isAdmin !== true
                ? "opacity-60 cursor-not-allowed"
                : "hover:shadow-2xl cursor-pointer"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-[#6b4f4f]">
                Order #{idx + 1}
              </h2>
              <div className="flex gap-5 items-center">
                <button onClick={() => deleteOrder(order._id)}>
                  <MdDelete size={22} />
                </button>

                <button
                  onClick={() => cancelOrder(order.payment._id, order._id)}
                  disabled={
                    cancellingOrderId === order._id ||
                    (order.status === "cancel" && user.isAdmin !== true)
                  }
                  className={`px-3 py-1 rounded-md text-white text-sm font-semibold ${
                    order.status === "cancel" && user.isAdmin !== true
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {order.status === "cancel"
                    ? "Canceled"
                    : cancellingOrderId === order._id
                    ? "Canceling..."
                    : "Cancel"}
                </button>
              </div>
            </div>

            <p className="text-gray-700 mb-2">
              <span className="font-medium">Customer:</span>{" "}
              {user.fullName || "N/A"}
            </p>

            <p className="text-gray-700 mb-2">
              <span className="font-medium">Items:</span>{" "}
              {order.products?.map((item, index) => (
                <span key={index} className="inline-block mr-2">
                  {item?.product?.productName} x {item.quantity}
                </span>
              )) || "No items"}
            </p>

            <p className="text-gray-700 mb-2">
              <span className="font-medium">Date:</span>{" "}
              {new Date(order.createdAt).toLocaleDateString(undefined, {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>

            <p className="text-[#6b4f4f] font-bold text-lg mt-4">
              Total: ₹{order.totalAmount || order.total || "0"}
            </p>

            <p
              className={`mt-2 font-semibold ${
                order.status === "completed"
                  ? "text-green-600"
                  : order.status === "pending"
                  ? "text-yellow-600"
                  : order.status === "cancel"
                  ? "text-gray-600"
                  : "text-red-600"
              }`}
            >
              Status: {order.status || "Unknown"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GetOrder;
