import React, { useState } from "react";
import { FiHome, FiUser, FiSettings } from "react-icons/fi";
import DeliveryImg from "../../public/admin.jpg";
import BgImage from "../../public/LandingImg.jpg";
import UserImage from "../../public/user.jpg";
import Chatbot from "../Components/ChatBot";

const PatientDashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div
      className="flex h-screen bg-cover bg-center text-white relative"
      style={{ backgroundImage: `url(${BgImage})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Sidebar */}
      <aside className="relative z-10 w-64 bg-gradient-to-b from-[#246b53] to-[#153029] p-6 rounded-r-3xl shadow-2xl backdrop-blur-lg border border-green-300/20">
        <h1 className="text-2xl font-bold mb-8 text-[#e6f5ed] drop-shadow-md">
          HELLO! USER
        </h1>
        <nav>
          <ul className="space-y-4">
            <li className="flex items-center p-2 rounded-lg transition-all duration-200 hover:bg-green-800 active:scale-110">
              <FiHome className="mr-3" /> Dashboard
            </li>
            <li className="flex items-center p-2 rounded-lg transition-all duration-200 hover:bg-green-800 active:scale-110">
              <FiUser className="mr-3" /> Doctors
            </li>
            <li className="flex items-center p-2 rounded-lg transition-all duration-200 hover:bg-green-800 active:scale-110">
              <FiSettings className="mr-3" /> Settings
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="relative z-10 flex-1 p-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-center bg-[#1f4e3f]/10 p-4 rounded-xl shadow-md border border-green-300/20 backdrop-blur-lg">
          <h2 className="text-xl font-bold tracking-wide flex items-center gap-2 text-[#e6f5ed] drop-shadow-md">
            🔎 <span className="bg-gradient-to-r from-green-400 to-yellow-300 text-transparent bg-clip-text">Search</span>
          </h2>

          {/* Search Bar */}
          <div className="relative flex items-center w-full sm:w-auto mt-3 sm:mt-0">
            <input
              type="text"
              placeholder="Search doctor, categories..."
              className="w-full sm:w-80 border border-gray-300 pl-10 pr-4 py-2 rounded-lg 
      bg-white text-gray-800 placeholder-gray-500 shadow-sm 
      transition-all duration-300 focus:ring-2 focus:ring-green-500 
      hover:shadow-md focus:shadow-lg outline-none"
            />
            <span className="absolute left-3 text-gray-500 text-lg">
              🔍
            </span>
          </div>

          {/* Profile Section */}
          <div className="relative flex items-center gap-4 mt-3 sm:mt-0">
            {/* Profile Image with Dropdown */}
            <div className="relative">
              <button
                className="relative w-12 h-12 rounded-full overflow-hidden shadow-md border border-gray-300 
      bg-white flex items-center justify-center transition-all duration-300 
      hover:shadow-lg"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <img src={UserImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
              </button>

              {/* Sign Out Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-lg 
      shadow-lg border border-gray-200 p-2 transition-all duration-300 z-50">
                  <button
                    className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      console.log("User Signed Out"); // Replace with actual sign-out logic
                    }}
                  >
                    🚪 Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>

        </header>

        {/* Banner Section */}
        <section
          className="relative z-[-10] p-16 rounded-xl mt-6 shadow-lg backdrop-blur-xl border border-green-300/20 bg-[#1f4e3f]/10 text-white flex flex-col justify-center items-center text-center"
          style={{ backgroundImage: `url(${DeliveryImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <div className="absolute inset-0 bg-black/40 rounded-xl"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-semibold bg-gradient-to-r from-green-300 to-yellow-400 text-transparent bg-clip-text">
              Expert Prescription
            </h3>
            <p className="text-lg mt-2">Better treatment at less cost and less time</p>

            <button className="mt-4 z-10 text-[17px] bg-white text-[#1f4e3f] px-4 py-2 rounded-full font-bold transition-all duration-300 ease-in-out 
              hover:bg-[#1f4e3f] hover:text-white hover:scale-105 
              active:scale-95 active:bg-[#163d31]">
              See Previous Prescription
            </button>
          </div>
        </section>

        {/* Specialist Section */}
        <section className="mt-6">
          <h3 className="text-xl font-semibold mb-4 text-green-300">Specialist</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: "Video Consultation", desc: "Instant expert advice via video call", img: DeliveryImg },
              { title: "Gynecology", desc: "Specialist care for women's health", img: DeliveryImg },
              { title: "Child Care", desc: "Expert pediatric consultations", img: DeliveryImg },
            ].map((specialty, index) => (
              <div
                key={index}
                className="relative z-0 p-8 rounded-xl shadow-lg backdrop-blur-xl border border-green-300/20 bg-[#1f4e3f]/10 text-white flex flex-col justify-center items-center text-center"
                style={{
                  backgroundImage: `url(${specialty.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black/40 rounded-xl"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-semibold bg-gradient-to-r from-green-300 to-yellow-400 text-transparent bg-clip-text">
                    {specialty.title}
                  </h3>
                  <p className="text-lg mt-2">{specialty.desc}</p>
                  <button className="mt-4 z-10 text-[17px] bg-white text-[#1f4e3f] px-4 py-2 rounded-full font-bold transition-all duration-300 ease-in-out 
            hover:bg-[#1f4e3f] hover:text-white hover:scale-105 
            active:scale-95 active:bg-[#163d31]">
                    Explore
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        <Chatbot />
      </main>
    </div>
  );
};

export default PatientDashboard;