import React, { useContext } from "react";
import { Context } from "../Context/Context";
import { FaUserCircle } from "react-icons/fa";

function Profile() {
  const { user } = useContext(Context);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf6f0] to-[#f2e0d4] flex items-center justify-center p-6">
      <div className="bg-white/80 backdrop-blur-xl border border-[#e6d4c1] rounded-3xl shadow-2xl p-10 w-full max-w-md">
        <div className="flex flex-col items-center">
          {user.attachments?.url ? (
            <img
              className="text-[#6f4e37] mb-4 h-[16vh] w-[16vh] rounded-full border-2 border-[#6f4e37] "
              src={user.attachments?.url}
            />
          ) : (
            <FaUserCircle className="text-[#6f4e37] h-[16vh] w-[16vh] mb-4" />
          )}
          <h1 className="text-3xl font-bold text-[#5c4033]">
            Welcome, {user?.username || "Guest"}!
          </h1>
          <p className="text-[#7a5c3b] text-sm mt-2">
            Here’s your cafe profile ☕
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <div className="text-[#4b2e2e]">
            <span className="font-semibold">Email:</span>{" "}
            {user?.email || "Not provided"}
          </div>
          <div className="text-[#4b2e2e]">
            <span className="font-semibold">Phone:</span>{" "}
            {user?.phone || "Not provided"}
          </div>
          <div className="text-[#4b2e2e]">
            <span className="font-semibold">Role:</span>{" "}
            {user?.isAdmin ? "Admin" : "Customer"}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-[#7a5c3b] italic">
            Thanks for brewing joy with us! ☕✨
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
