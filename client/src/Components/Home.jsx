import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebook,
  FaPhone,
} from "react-icons/fa";
import { Context } from "../Context/Context";
import Navbar from "./Nvbar";

const Home = () => {
  const menus = [
    {
      image:
        "https://familyapp.com/wp-content/uploads/2021/07/untitled_design_-_2021-02-03t135049028.jpg",
      category: "Bestseller",
    },
    {
      image:
        "https://static.toiimg.com/thumb/msid-117060913,width-1280,height-720,resizemode-4/117060913.jpg",
      category: "Drinks",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKb48Ob-qUqmIxR-83-Gl6bGJ7IBctbAO2KA&s",
      category: "Food",
    },
    {
      image:
        "https://royceindia.com/cdn/shop/files/AromachocolatePlate.webp?v=1706515551&width=1080",
      category: "ReadyToEat",
    },
  ];

  const cafevibes = [
    {
      img: "https://lh3.googleusercontent.com/ZaO5ZLYpCEdnKqHnvM5CcJ36a-mc-FsMizFrcJA14j_UEbEXvftyPPak02Ny1kOuFvAN8UJoLdQWcKYJnlPNNXEp1KWlur7Ou9d3ft2F=w1200-rw",
    },
    {
      img: "https://b.zmtcdn.com/data/reviews_photos/e6a/849d4902d0d446ba03cba4bcacabce6a_1725572684.jpg?fit=around|750:500&crop=750:500;*,*",
    },
    {
      img: "https://b.zmtcdn.com/data/pictures/7/20906097/f91e6fa7b53f52c768e144b56b9d59f4.jpeg?fit=around|750:500&crop=750:500;*,*",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyPo5mFz21YRLYLOZqwFb0RBOpIqpoy6pr8Q&s",
    },
  ];

  const { products } = useContext(Context);

  return (
    <div
      className="bg-cover bg-center min-h-screen text-white"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/originals/d3/cd/69/d3cd69d97e448c548f9fcd12d91095e7.jpg')",
      }}
    >
      {/* Navbar Section */}
      <Navbar />

      {/* Hero Section */}
      <section className="flex items-center justify-center min-h-screen px-4 backdrop-blur-sm bg-black/40">
        <div className="text-center space-y-6 max-w-2xl">
          <h1 className="text-5xl font-extrabold">
            Welcome to{" "}
            <span className="text-yellow-300">Koffee with Kanchan</span>
          </h1>
          <p className="text-lg text-white/80">
            Savor the aroma, taste the love. A place to relax, work, or meet up
            with friends over the perfect cup of coffee.
          </p>
          <Link to={`/menu`}>
            <button className="px-6 py-3 bg-yellow-300/80 text-black font-semibold rounded-lg hover:bg-yellow-400 transition">
              Explore Menu
            </button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 bg-white/10 backdrop-blur-md">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <h2 className="text-3xl font-bold text-yellow-300">Our Story</h2>
          <p className="text-white/80">
            Brew Bliss Café began with a passion for bringing people together
            over great coffee. Whether you love espresso, cappuccino, or a cozy
            herbal tea, our space is designed for warmth and community.
          </p>
        </div>
      </section>

      {/* Menu Preview Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-yellow-300 mb-10">
            Signature Brews
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 py-8">
            {menus.map((menu, index) => (
              <div
                key={index}
                className="group backdrop-blur-md bg-white/20 p-6 rounded-2xl border border-white/30 hover:bg-white/30 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Link
                  to={`ProductsByCategory/${menu.category}`}
                  className="flex items-center gap-4"
                >
                  <img
                    className="w-[50px] h-[50px] rounded-full object-cover"
                    src={menu.image}
                    alt={`${menu.category} icon`}
                  />
                  <h3 className="text-xl font-semibold text-white drop-shadow">
                    {menu.category}
                  </h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-6 bg-white/10 backdrop-blur-md">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-yellow-300 mb-10">
            Cafe Vibes
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cafevibes.map((item, index) => (
              <div
                key={index}
                className="h-40 bg-white/30 rounded-xl overflow-hidden"
              >
                <img
                  src={item.img}
                  alt={`Cafe vibe ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-yellow-300">Visit Us</h2>
          <p className="text-white/80 flex items-center justify-center gap-2">
            <FaMapMarkerAlt /> 123 Brew Street, CoffeeTown
          </p>
          <p className="text-white/80 flex items-center justify-center gap-2">
            <FaPhone /> +123 456 7890
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/60 py-6 px-4 text-center text-white text-sm mt-10">
        <div className="flex justify-center gap-6 mb-2">
          <FaInstagram className="text-lg hover:text-yellow-300 cursor-pointer" />
          <FaFacebook className="text-lg hover:text-yellow-300 cursor-pointer" />
        </div>
        <p>
          &copy; {new Date().getFullYear()} Brew Bliss Café. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
