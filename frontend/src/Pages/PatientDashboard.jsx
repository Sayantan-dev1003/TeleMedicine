import React, { useState } from "react";
import DeliveryImg from "../../public/admin.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import Chatbot from "../Components/ChatBot";
import Sidebar from "../Components/Sidebar";

const PatientDashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div
      className="flex h-screen bg-cover bg-center bg-[#D8EFED] text-white relative poppins">
      <Sidebar />
      <main className="relative z-10 flex-1 p-6">
        <header className="flex flex-col items-end bg-[#1f4e3f]/10 p-4 rounded-xl shadow-md border border-green-300/20 backdrop-blur-lg">
          <div className="relative flex items-center gap-4 mt-3 sm:mt-0">
            <div className="relative flex items-center gap-5" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <span className="text-[#064848] text-lg font-semibold">
                Sayantan Halder
              </span>
              <FontAwesomeIcon icon={faEllipsisV} className="text-[#064848] text-xl cursor-pointer" />

              {isDropdownOpen && (
                <button
                  className="absolute -right-2 top-6 w-2/3 text-left bg-white text-[#064848] px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Log Out
                </button>
              )}
            </div>
          </div>
        </header>

        <section
          className="relative z-[-10] p-16 rounded-xl mt-6 shadow-lg backdrop-blur-xl  bg-[#1f4e3f]/10 text-white flex flex-col justify-center items-center text-center"
          style={{ backgroundImage: `url(${DeliveryImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-white">
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

        <section className="mt-6">
          <h3 className="text-2xl font-bold mb-4 text-[#064848]">Specialist</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: "Video Consultation", desc: "Instant expert advice via video call", img: DeliveryImg },
              { title: "Medicine Recommendation", desc: "Reliable solutions for common health concerns", img: DeliveryImg },
              { title: "Support", desc: "Reliable assistance for all your healthcare needs", img: DeliveryImg },
            ].map((specialty, index) => (
              <div key={index} className="relative z-0 p-8 rounded-xl shadow-lg backdrop-blur-xl bg-gradient-to-b from-[#69afaf] to-[#0e5952] text-white flex flex-col justify-center items-center text-center">
                <div className="absolute inset-0 bg-black/40 rounded-xl"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-semibold text-white">
                    {specialty.title}
                  </h3>
                  <p className=" text-sm mt-2 text-gray-300">{specialty.desc}</p>
                  <button className="mt-4 z-10 text-[17px] bg-white text-[#1f4e3f] px-4 py-2 rounded-full font-bold transition-all duration-300 ease-in-out hover:scale-105">
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