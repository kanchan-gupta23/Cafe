import React from "react";
import { motion } from "framer-motion";

function About() {
  return (
    <div className="bg-[#fffaf5] text-[#4b2e2e] px-6 py-16 font-serif">
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl text-center font-bold text-[#6f4e37]"
        >
          ☕ About{" "}
          <span className="italic text-[#d7a86e]">Koffee with Kanchan</span>
        </motion.h1>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl"
        >
          <img
            src="https://impeccabuild.com.au/wp-content/uploads/2020/08/Cafe-Theme-Ideas-Art-Cafe-Fitout-ImpeccaBuild-2.jpg"
            alt="Cozy cafe"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg leading-8 space-y-6"
        >
          <p>
            Welcome to <strong>Koffee with Kanchan</strong>, a soulful café
            where every sip tells a story. Founded by <strong>Kanchan</strong>,
            this warm little corner is designed for comfort, community, and
            coffee lovers.
          </p>
          <p>
            From handpicked beans to heartwarming ambiance, everything here is
            personal. Whether you're studying, working, catching up with
            friends, or just daydreaming — you belong here.
          </p>
        </motion.div>

        {/* Owner Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col md:flex-row gap-10 items-center"
        >
          <img
            src="https://lh3.googleusercontent.com/a/ACg8ocLT2Ruq643KqDzZ5EE1h_0JeCn98lKRTco_6ulgNziNWkDZmWAQ=s360-c-no"
            alt="Kanchan"
            className="w-64 h-64 object-cover rounded-full border-4 border-[#d7a86e] shadow-lg"
          />
          <div className="text-base leading-7 max-w-xl space-y-4">
            <p>
              “Hi, I'm <strong>Kanchan</strong> — the heart behind this café. I
              started <em>Koffee with Kanchan</em> because I wanted to create a
              space where people could slow down, feel inspired, and enjoy
              something real.”
            </p>
            <p>
              You’ll often see me behind the counter brewing your favorite latte
              or asking how your day went. This place isn’t just a café. It’s a
              feeling — and you’re part of it.
            </p>
            <p className="italic text-sm text-[#a37750]">
              — Kanchan, Owner & Dreamer
            </p>
          </div>
        </motion.div>

        {/* Vibe Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="rounded-3xl overflow-hidden shadow-lg"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5CVUBk_Hkrltt2kQ3el26Sp-tpNFx1hCBGIEe_Bn2L9Krv0EWOLLEA-s7MGVCJgu42L8&usqp=CAU"
            alt="Cafe vibe"
            className="w-full h-96 object-cover"
          />
        </motion.div>

        {/* CTA */}
        <div className="text-center pt-10">
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="/menu"
            className="bg-[#6f4e37] text-white px-8 py-3 rounded-full text-lg font-medium shadow hover:bg-[#5a3f2e] transition"
          >
            Explore Our Menu
          </motion.a>
        </div>
      </div>
    </div>
  );
}

export default About;
