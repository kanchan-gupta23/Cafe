import React, { useContext } from "react";
import Registration from "./Components/Registration";
import Login from "./Components/Login";
import Home from "./Components/Home";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import Reviews from "./Components/Reviews";
import Product from "./admin/Product";
import ProductById from "./Components/ProductById";
import ProductsByCategory from "./Components/ProductsByCategory";
import UpdateProduct from "./admin/UpdateProduct";
import Order from "./Components/order/Order";
import Cart from "./Components/Cart";
import GetOrder from "./Components/order/GetOrder";
import Booking from "./Components/booking/Booking";
import MyBookings from "./Components/booking/MyBookings";
import Menu from "./Components/Menu";
import About from "./Components/About";
import Admin from "./admin/Admin";
import AdminLogin from "./admin/AdminLogin";
import Profile from "./Components/Profile";
import AdminPage from "./admin/AdminPage";
import { Context } from "./Context/Context";

function App() {
  const { isAuthenticated } = useContext(Context);
  return (
    <div className="w-screen h-screen bg-zinc-800">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <Home /> : <Navigate to="/userRegistration" />
            }
          />
          <Route
            path="/ProductsByCategory/:category"
            element={<ProductsByCategory />}
          />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/userRegistration" element={<Registration />} />
          <Route path="/userLogin" element={<Login />} />
          <Route path="/createProduct" element={<Product />} />
          <Route path="/UpdateProduct/:id" element={<UpdateProduct />} />
          <Route path="/getProductById/:id" element={<ProductById />} />
          <Route path="/allOrder/:userId" element={<GetOrder />} />
          <Route path="/booking/:userId" element={<Booking />} />
          <Route path="/mybooking/:userId" element={<MyBookings />} />
          <Route path="/order/:userId" element={<Order />} />
          <Route path="/cart/:userId" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/adminPage" element={<AdminPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
