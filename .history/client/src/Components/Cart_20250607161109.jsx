import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context/Context";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Nvbar";

function Cart() {
  const { user, Authentication, setCartItem } = useContext(Context);
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();
  const { userId } = useParams();
  const cart = cartItems;
  // const productname = cartItems.map((item) =>
  //   item.products.map((i) => i.product.productName)
  // );

  console.log("cart", cart);

  const items = Object.values(cart)[0] || []; // Get first array from the object safely

  const total = cart.reduce(
    (acc, item) => acc + item.products.price * item.quantity,
    0
  );
  console.log("total", total);

  const getCart = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/cart/getCart/${userId}`,

        {
          headers: {
            Authorization: Authentication,
          },
        }
      );
      console.log(response.data);
      setCartItems(response.data);
      setCartItem(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCart();
  }, []);

  const updateQuantity = async (productId, quantity) => {
    const response = await axios.put(
      `http://localhost:3000/cart/updatedQuantity/${userId}`,
      {
        productId,
        quantity: Number(quantity),
      },

      {
        headers: {
          Authorization: Authentication,
        },
      }
    );
    getCart();
  };

  const delCartProduct = async (productId) => {
    const response = await axios.put(
      `http://localhost:3000/cart/deleteCart/${userId}`,
      {
        productId,
      },
      {
        headers: {
          Authorization: Authentication,
        },
      }
    );
    getCart();
    console.log(response.data);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div key={index}>
              {/* <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded object-cover"
              /> */}
              {item.products.map((i, index) => (
                <div
                  key={index}
                  className="flex mt-3 items-center gap-4 bg-gray-800 p-4 rounded-lg shadow-md"
                >
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">
                      {i.product?.productName}
                    </h2>
                    <div className="flex items-center gap-2 mt-2">
                      <label htmlFor={`qty-${i.product?.productName}`}>
                        Qty:
                      </label>
                      <select
                        id={`qty-${i._id}`}
                        className="bg-gray-700 p-1 rounded text-white"
                        defaultValue={i.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            i.product._id,
                            parseInt(e.target.value)
                          )
                        }
                      >
                        {Array.from({ length: 100 }, (_, i) => i + 1).map(
                          (num) => (
                            <option key={num} value={num}>
                              {num || i.quantity}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium">
                      ${i.product.price * i.quantity}
                    </p>

                    <button
                      onClick={() => delCartProduct(i.product._id)}
                      className="text-red-500 text-sm mt-2 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex  justify-between items-center border-t border-gray-700 pt-4 mt-">
                <h3 className="text-2xl font-bold">Total Products</h3>
                <p className="text-2xl font-semibold">{item.totalItems}</p>
              </div>
              <div className="flex  justify-between items-center border-t border-gray-700 pt-4 mt-">
                <h3 className="text-2xl font-bold">Subtotal</h3>
                <p className="text-2xl font-semibold">{item.totalAmount}</p>
              </div>
            </div>
          ))}

          <Link to={`/order/${user._id}`}>
            {" "}
            <button className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-bold text-lg transition duration-300">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
